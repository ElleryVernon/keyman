// SearchInput.tsx (Client Component)
"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { Session } from "next-auth";

type SearchPromptType = "프로젝트 팀 구성" | "스킬 기반 검색" | "경력자 추천" | "부서별 검색";

const PROMPT_EXAMPLES: Record<SearchPromptType, string> = {
	"프로젝트 팀 구성":
		"스마트팩토리 프로젝트를 위한 팀 구성: 머신러닝 엔지니어 2명(3년 이상, 공정 자동화 경험), 데이터 사이언티스트 1명(5년 이상, 공정 데이터 분석), PM 1명(7년 이상, 제조업 도메인)",
	"스킬 기반 검색":
		"Java, Spring Boot 기반 백엔드 개발자. MSA, Kubernetes 경험 필수. Redis, Kafka 활용 경험자 우대. 대규모 트래픽 처리 경험 보유.",
	"경력자 추천":
		"프론트엔드 개발 7년 이상. React, TypeScript, Next.js 프로젝트 리딩 경험 필수. 디자인시스템 구축, 성능 최적화 경험 우대.",
	"부서별 검색":
		"AI연구소 컴퓨터비전팀 연구원. PyTorch 기반 딥러닝 모델링, OpenCV 능숙. 제철 공정 결함 탐지 모델 개발 경험자.",
};

const PROMPT_BUTTONS: { label: SearchPromptType; icon: string }[] = [
	{ label: "프로젝트 팀 구성", icon: "👥" },
	{ label: "스킬 기반 검색", icon: "💼" },
	{ label: "경력자 추천", icon: "⭐" },
	{ label: "부서별 검색", icon: "🏢" },
];

interface SearchInputProps {
	onSubmit: (formData: FormData) => Promise<void>;
	session: Session | null;
}

export default function SearchInput({ onSubmit, session }: SearchInputProps) {
	const [query, setQuery] = useState("");

	return (
		<div className="w-full max-w-xl">
			<form action={onSubmit} className="w-full">
				<div className="rounded-2xl bg-[#2E2E2E] p-3">
					<div className="relative w-full">
						<textarea
							name="query"
							rows={2}
							disabled={!session}
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder={
								session
									? "필요한 인재의 조건을 입력해 주세요 (예: Java 개발자, 5년 이상 경력, 프로젝트 리딩 경험)"
									: "검색하려면 로그인이 필요합니다"
							}
							className="w-full text-[13px] bg-transparent
                  text-white placeholder-[#9A9A9A] resize-none
                  border-none focus:outline-none min-h-[48px] max-h-[120px]
                  scrollbar-thin scrollbar-thumb-[#383838] scrollbar-track-transparent
                  hover:scrollbar-thumb-[#454545] disabled:opacity-50 disabled:cursor-not-allowed"
							style={{
								scrollbarWidth: "thin",
								scrollbarColor: "#383838 transparent",
								height: "auto",
								overflow: "hidden",
							}}
						/>
					</div>
					<div className="flex justify-end">
						<button
							type="submit"
							disabled={!session || !query.trim()}
							className="p-1.5 bg-white hover:brightness-75
                rounded-full transition-all duration-200
                active:scale-95 flex items-center justify-center
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100"
							aria-label="검색"
						>
							<ArrowUp size={16} className="text-[#212121]" />
						</button>
					</div>
				</div>
			</form>
			<div className="flex flex-wrap justify-center gap-1.5 mt-5 max-w-xl">
				{PROMPT_BUTTONS.map(({ label, icon }) => (
					<button
						key={label}
						type="button"
						disabled={!session}
						onClick={() => setQuery(PROMPT_EXAMPLES[label])}
						className={`px-3 py-2 rounded-lg bg-[#2A2A2A] text-xs text-gray-200 
              transition-all duration-200 flex items-center gap-1.5
              ${session ? "hover:bg-[#383838] hover:text-white" : "opacity-50 cursor-not-allowed"}`}
					>
						<span>{icon}</span>
						{label}
					</button>
				))}
			</div>
		</div>
	);
}
