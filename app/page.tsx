/**
 * @fileoverview 인재 검색을 위한 메인 검색 컴포넌트
 * @author 한성민
 * @version 1.0.0
 * @since 2024-12-07
 */

"use client";

import { useState } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * 검색 프롬프트의 타입을 정의합니다.
 */
type SearchPromptType = '프로젝트 팀 구성' | '스킬 기반 검색' | '경력자 추천' | '부서별 검색';

/**
 * 검색 프롬프트 버튼의 속성을 정의합니다.
 */
interface PromptButton {
  label: SearchPromptType;
  icon: string;
}

/**
 * 검색 프롬프트 예시를 정의합니다.
 */
const PROMPT_EXAMPLES: Record<SearchPromptType, string> = {
  '프로젝트 팀 구성': '스마트팩토리 프로젝트를 위한 팀 구성: 머신러닝 엔지니어 2명(3년 이상, 공정 자동화 경험), 데이터 사이언티스트 1명(5년 이상, 공정 데이터 분석), PM 1명(7년 이상, 제조업 도메인)',
  '스킬 기반 검색': 'Java, Spring Boot 기반 백엔드 개발자. MSA, Kubernetes 경험 필수. Redis, Kafka 활용 경험자 우대. 대규모 트래픽 처리 경험 보유.',
  '경력자 추천': '프론트엔드 개발 7년 이상. React, TypeScript, Next.js 프로젝트 리딩 경험 필수. 디자인시스템 구축, 성능 최적화 경험 우대.',
  '부서별 검색': 'AI연구소 컴퓨터비전팀 연구원. PyTorch 기반 딥러닝 모델링, OpenCV 능숙. 제철 공정 결함 탐지 모델 개발 경험자.'
};

const PROMPT_BUTTONS: PromptButton[] = [
  { label: '프로젝트 팀 구성', icon: '👥' },
  { label: '스킬 기반 검색', icon: '💼' },
  { label: '경력자 추천', icon: '⭐' },
  { label: '부서별 검색', icon: '🏢' },
];

/**
 * 인재 검색을 위한 메인 컴포넌트입니다.
 * 사용자가 원하는 인재의 조건을 입력하고 검색할 수 있는 인터페이스를 제공합니다.
 */
export default function TalentSearchPanel() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidSearchQuery(searchQuery)) return;
    
    executeSearch();
    resetSearchQuery();
  };

  const isValidSearchQuery = (query: string): boolean => {
    return query.trim().length > 0;
  };

  const executeSearch = () => {
    // TODO: 인재 검색 로직 구현
    window.location.href = '/';
  };

  const resetSearchQuery = () => {
    setSearchQuery('');
  };

  const handleTextareaResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
  };

  const handlePromptSelect = (promptType: SearchPromptType) => {
    setSearchQuery(PROMPT_EXAMPLES[promptType]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#212121] text-white p-8">
      <h1 className="text-2xl mb-5 font-bold">
        당신의 Keyman을 찾아보세요
      </h1>
      <div className="w-full max-w-xl">
        <form onSubmit={handleSearchSubmit} className="w-full">
          <div className="rounded-2xl bg-[#2F2F2F] p-3">
            <div className="relative w-full">
              <textarea
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onInput={handleTextareaResize}
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
        {PROMPT_BUTTONS.map(({label, icon}) => (
          <button 
            key={label} 
            onClick={() => handlePromptSelect(label)}
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
