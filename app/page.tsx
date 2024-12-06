"use client";

import { useState } from 'react';
import { ArrowUp} from 'lucide-react';

type PromptType = '프로젝트 팀 구성' | '스킬 기반 검색' | '경력자 추천' | '부서별 검색';

export default function RightPanel() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // TODO: 인재 검색 로직
    setSearchQuery('');
    window.location.href = '/';
  };

  const promptExamples: Record<PromptType, string> = {
    '프로젝트 팀 구성': '스마트팩토리 프로젝트를 위한 팀 구성: 머신러닝 엔지니어 2명(3년 이상, 공정 자동화 경험), 데이터 사이언티스트 1명(5년 이상, 공정 데이터 분석), PM 1명(7년 이상, 제조업 도메인)',
    '스킬 기반 검색': 'Java, Spring Boot 기반 백엔드 개발자. MSA, Kubernetes 경험 필수. Redis, Kafka 활용 경험자 우대. 대규모 트래픽 처리 경험 보유.',
    '경력자 추천': '프론트엔드 개발 7년 이상. React, TypeScript, Next.js 프로젝트 리딩 경험 필수. 디자인시스템 구축, 성능 최적화 경험 우대.',
    '부서별 검색': 'AI연구소 컴퓨터비전팀 연구원. PyTorch 기반 딥러닝 모델링, OpenCV 능숙. 제철 공정 결함 탐지 모델 개발 경험자.'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#212121] text-white p-8">
      <h1 className="text-2xl mb-5 font-bold">
        당신의 Keyman을 찾아보세요
      </h1>
      <div className="w-full max-w-xl">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="rounded-2xl bg-[#2F2F2F] p-3">
            <div className="relative w-full">
              <textarea
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                rows={2}
                placeholder="필요한 인재의 조건을 입력해 주세요 (예: Java 개발자, 5년 이상 경력, 프로젝트 리딩 경험)"
                className="w-full text-[13px] bg-transparent
                  text-white placeholder-[#B4B4B4] resize-none
                  border-none focus:outline-none min-h-[48px] max-h-[120px]
                  scrollbar-thin scrollbar-thumb-[#3A3A3A] scrollbar-track-transparent
                  hover:scrollbar-thumb-[#4A4A4A]"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#3A3A3A transparent',
                  height: 'auto',
                  overflow: 'hidden'
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
                }}
              />
            </div>
            <div className="flex justify-end">
              <button 
                type="submit"
                className="p-1.5 bg-white hover:brightness-75
                  rounded-full transition-all duration-200
                  active:scale-95 flex items-center justify-center"
                aria-label="검색"
              >
                <ArrowUp size={16} className="text-[#212121]" />
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex flex-wrap justify-center gap-1.5 mt-5 max-w-xl">
        {[
          { label: '프로젝트 팀 구성' as const, icon: '👥' },
          { label: '스킬 기반 검색' as const, icon: '💼' },
          { label: '경력자 추천' as const, icon: '⭐' },
          { label: '부서별 검색' as const, icon: '🏢' },
        ].map(({label, icon}) => (
          <button 
            key={label} 
            onClick={() => {
              setSearchQuery(promptExamples[label]);
            }}
            className="px-3 py-2 rounded-lg bg-[#2F2F2F] text-xs text-gray-200 
              hover:bg-[#3A3A3A] transition-all duration-200 flex items-center gap-1.5
              hover:text-white"
          >
            <span>{icon}</span>
            {label}
          </button>
        ))}
      </div>
      <p className="text-[#B4B4B4] text-[11px] text-center fixed bottom-3">
        검색 결과를 모델을 훈련하는 데 사용하지 않습니다. Keyman은 테스트 버전으로 실수를 할 수 있습니다.
      </p>
    </div>
  );
}
