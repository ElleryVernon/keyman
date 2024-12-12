// app/api/search/route.ts

import { NextRequest, NextResponse } from "next/server";
import { OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { Document } from "langchain/document";
import fs from "fs";
import path from "path";

// -----------------------------
// 내부에서 사용할 글로벌 변수를 선언
let employeeData: any[] = [];
let vectorStore: FaissStore | null = null;

// -----------------------------
// employee_data.json 로드 및 변환 함수
async function loadEmployeeData(fileName: string = "employee_data.json") {
	const filePath = path.join(process.cwd(), "app", fileName);
	let data: any;

	try {
		const raw = fs.readFileSync(filePath, "utf-8");
		data = JSON.parse(raw).employees;
	} catch (e) {
		console.error(`File ${fileName} not found or parsing error.`, e);
		return [];
	}

	const transformed_data = data.map((record: any) => {
		const technical_skills = (record.skills?.technical ?? [])
			.map((skill: any) => `${skill.name} (${skill.proficiency || "N/A"})`)
			.join(", ");

		const soft_skills = (record.skills?.soft ?? []).join(", ");

		const projects_summary = (record.distinctions ?? [])
			.map(
				(proj: any) =>
					`${proj.name} (${proj.role ?? "N/A"}, 기술: ${(proj.technologies_or_skills || []).join(
						", "
					)}, 성과: ${(proj.achievements || []).join(", ")})`
			)
			.join("; ");

		const work_experience_summary = (record.workExps ?? [])
			.map((work: any) => `${work.name} (기간: ${work.duration_from} ~ ${work.duration_to})`)
			.join("; ");

		const description =
			`${record.personalInfo.name}은(는) ${record.professionalInfo.department} 부서에서 ` +
			`${record.professionalInfo.position}으로 근무 중입니다. ` +
			`${record.professionalInfo.academic_major} 전공으로 ${record.professionalInfo.degree_last} 학위를 보유하고 있으며, ` +
			`${record.professionalInfo.joinDate}에 입사하여 현재까지 ${record.professionalInfo.yearsOfExperience}년의 경력을 보유하고 있습니다. ` +
			`주요 기술은 ${technical_skills}이며, 소프트 스킬로는 ${soft_skills}를 보유하고 있습니다. ` +
			`주요 업무 경험으로는 ${work_experience_summary} 등이 있으며, ` +
			`참여한 주요 프로젝트로는 ${projects_summary} 등이 있습니다. ` +
			`관련 주요 키워드는 ${(record.businessKeywords || []).join(", ")}입니다.`;

		return {
			id: record.id,
			name: record.personalInfo.name,
			position: record.professionalInfo.position,
			skills: (record.skills?.technical ?? []).map((s: any) => s.name),
			experience: record.professionalInfo.yearsOfExperience,
			description,
			json: record,
		};
	});

	console.log(`Loaded and transformed ${transformed_data.length} employee records.`);
	return transformed_data;
}

// -----------------------------
// query 필터링 함수 (개인정보 및 부적절한 검색어)
async function filterQueryWithAPI(query: string): Promise<boolean> {
	// 여기에 OpenAI API를 호출하거나 로직 추가 가능.
	// 예제에서는 항상 true를 반환.
	return true;
}

// -----------------------------
// FAISS 벡터스토어 초기화 함수
async function initializeVectorStore() {
	if (vectorStore !== null) {
		return vectorStore;
	}

	// employee_data 로드
	employeeData = await loadEmployeeData("keyman_10samples.json");

	const docs = employeeData.map((record) => {
		return new Document({
			pageContent: record.description,
			metadata: {
				id: record.id,
				name: record.name,
				position: record.position,
				skills: record.skills,
				experience: record.experience,
				json: record.json,
			},
		});
	});

	const embeddings = new OpenAIEmbeddings({
		openAIApiKey: process.env.OPENAI_API_KEY,
		// 실제 사용 가능한 모델명인지 확인 필요. 일반적으로 text-embedding-ada-002 사용
		modelName: "text-embedding-ada-002",
	});

	vectorStore = await FaissStore.fromDocuments(docs, embeddings);
	console.log(`Initialized FAISS with ${employeeData.length} records.`);
	return vectorStore;
}

// -----------------------------
// employeeData 접근 함수
function getEmployeeData() {
	return employeeData;
}

// -----------------------------
// 실제 요청 처리 핸들러
export async function POST(request: NextRequest) {
	const { query } = await request.json();
	if (!query) {
		return NextResponse.json({ error: "No query provided." }, { status: 400 });
	}

	const isValid = await filterQueryWithAPI(query);
	if (!isValid) {
		return NextResponse.json(
			{
				detail: "The query is either inappropriate or contains restricted content.",
			},
			{ status: 400 }
		);
	}

	const vectorStore = await initializeVectorStore();
	const results = await vectorStore.similaritySearch(query, 5);
	if (!results || results.length === 0) {
		return NextResponse.json({ detail: "No matching employees found." }, { status: 404 });
	}

	// 여기서 거리 또는 score를 활용하고자 한다면 similaritySearchVectorWithScore 사용
	// queryEmbedding을 만들어 score를 계산
	const embeddings = new OpenAIEmbeddings({
		openAIApiKey: process.env.OPENAI_API_KEY,
		// 요청한 모델명 그대로 사용 (실제 지원 여부 확인 필요)
		modelName: "text-embedding-3-large",
	});
	const queryEmbedding = await embeddings.embedQuery(query);
	const searchResults = await vectorStore.similaritySearchVectorWithScore(queryEmbedding, 5);

	const finalResults = searchResults.map(([doc, score]) => {
		const metadata: any = doc.metadata;
		return {
			name: metadata.name,
			position: metadata.position,
			skills: metadata.skills,
			reason: `Match score: ${(1 - score).toFixed(2)}`,
		};
	});

	return NextResponse.json({ results: finalResults });
}
