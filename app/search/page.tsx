/**
 * @fileoverview 인재 검색 결과를 표시하는 페이지 컴포넌트
 * @author AI Assistant
 * @version 2.0.0
 * @since 2024-12-07
 */

"use client";

import { useState } from 'react';
import { ArrowLeft, Filter, Search, Briefcase, Building } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface SearchResult {
  id: string;
  name: string;
  position: string;
  skills: string[];
  experience: number;
  department: string;
  projects: string[];
  profileImage?: string;
  highlights: string[];
  availability: 'available' | 'busy' | 'unavailable';
}

const MOCK_RESULTS: SearchResult[] = [
  {
    id: '1',
    name: '김개발',
    position: '시니어 백엔드 개발자',
    skills: ['Java', 'Spring Boot', 'MSA', 'Kubernetes'],
    experience: 7,
    department: '플랫폼개발팀',
    projects: ['대규모 커머스 플랫폼 개발', '결제 시스템 MSA 전환'],
    highlights: ['AWS 인증 전문가', '마이크로서비스 설계 전문가'],
    availability: 'available',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '2', 
    name: '이엔지니어',
    position: '머신러닝 엔지니어', 
    skills: ['Python', 'PyTorch', 'TensorFlow', 'MLOps'],
    experience: 5,
    department: 'AI연구소',
    projects: ['이상 탐지 모델 개발', '추천 시스템 고도화'],
    highlights: ['Google ML 전문가', 'AI 논문 다수 게재'],
    availability: 'busy',
    profileImage: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: '3',
    name: '박프론트',
    position: '시니어 프론트엔드 개발자',
    skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
    experience: 6,
    department: '웹서비스개발팀',
    projects: ['디자인시스템 구축', '프론트엔드 성능 최적화'],
    highlights: ['웹 성능 최적화 전문가', 'React 컨퍼런스 발표자'],
    availability: 'available',
    profileImage: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: '4',
    name: '최데브옵스',
    position: 'DevOps 엔지니어',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Jenkins'],
    experience: 8,
    department: '인프라운영팀',
    projects: ['클라우드 인프라 구축', 'CI/CD 파이프라인 개선'],
    highlights: ['AWS 솔루션스 아키텍트', 'Kubernetes 전문가'],
    availability: 'unavailable',
    profileImage: 'https://randomuser.me/api/portraits/men/4.jpg'
  },
  {
    id: '5',
    name: '정보안',
    position: '보안 엔지니어',
    skills: ['Security+', 'CISSP', 'Penetration Testing', 'Security Audit'],
    experience: 9,
    department: '정보보안팀',
    projects: ['보안 시스템 구축', '취약점 진단 및 조치'],
    highlights: ['정보보안 기술사', 'White Hacker'],
    availability: 'busy',
    profileImage: 'https://randomuser.me/api/portraits/women/5.jpg'
  },
  {
    id: '6',
    name: '한데이터',
    position: '데이터 엔지니어',
    skills: ['Hadoop', 'Spark', 'Kafka', 'Airflow'],
    experience: 4,
    department: '데이터플랫폼팀',
    projects: ['데이터 파이프라인 구축', '실시간 데이터 처리 시스템 개발'],
    highlights: ['빅데이터 처리 전문가', 'Apache Committer'],
    availability: 'available',
    profileImage: 'https://randomuser.me/api/portraits/men/6.jpg'
  },
  {
    id: '7',
    name: '임모바일',
    position: '시니어 모바일 개발자',
    skills: ['Swift', 'Kotlin', 'Flutter', 'React Native'],
    experience: 6,
    department: '모바일개발팀',
    projects: ['크로스플랫폼 앱 개발', '모바일 성능 최적화'],
    highlights: ['애플 개발자 인증', '구글 개발자 전문가'],
    availability: 'busy',
    profileImage: 'https://randomuser.me/api/portraits/women/7.jpg'
  },
  {
    id: '8',
    name: '송풀스택',
    position: '풀스택 개발자',
    skills: ['Node.js', 'React', 'MongoDB', 'Docker'],
    experience: 5,
    department: '서비스개발팀',
    projects: ['신규 서비스 개발', '레거시 시스템 현대화'],
    highlights: ['JavaScript 전문가', 'MEAN 스택 전문가'],
    availability: 'available',
    profileImage: 'https://randomuser.me/api/portraits/men/8.jpg'
  },
  {
    id: '9',
    name: '강품질',
    position: 'QA 엔지니어',
    skills: ['Selenium', 'JUnit', 'Jenkins', 'TestNG'],
    experience: 7,
    department: '품질관리팀',
    projects: ['테스트 자동화 구축', '품질 프로세스 개선'],
    highlights: ['ISTQB 인증', '테스트 자동화 전문가'],
    availability: 'unavailable',
    profileImage: 'https://randomuser.me/api/portraits/women/9.jpg'
  },
  {
    id: '10',
    name: '윤블록체인',
    position: '블록체인 개발자',
    skills: ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts'],
    experience: 3,
    department: '블록체인연구소',
    projects: ['스마트 컨트랙트 개발', 'DeFi 플랫폼 구축'],
    highlights: ['블록체인 개발 전문가', 'DeFi 프로토콜 설계자'],
    availability: 'available',
    profileImage: 'https://randomuser.me/api/portraits/men/10.jpg'
  }
];

export default function SearchResultsPage() {
  const [results] = useState<SearchResult[]>(MOCK_RESULTS);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedView, setSelectedView] = useState<'card' | 'list'>('card');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search logic
  };

  const getAvailabilityInfo = (availability: SearchResult['availability']) => {
    switch (availability) {
      case 'available':
        return {
          text: '투입 가능',
          color: 'bg-green-500/20',
          dotColor: 'bg-green-500/50',
          textColor: 'text-green-300'
        };
      case 'busy':
        return {
          text: '진행중',
          color: 'bg-yellow-500/20',
          dotColor: 'bg-yellow-500/50',
          textColor: 'text-yellow-300'
        };
      case 'unavailable':
        return {
          text: '투입 불가',
          color: 'bg-red-500/20',
          dotColor: 'bg-red-500/50',
          textColor: 'text-red-300'
        };
      default:
        return {
          text: '',
          color: '',
          dotColor: '',
          textColor: ''
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white">
      <nav className="sticky top-0 z-10 bg-[#212121]/90 border-b border-[#2F2F2F] px-3 py-2">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center text-[#B4B4B4] hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-xs">메인으로</span>
          </Link>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-2 py-1 bg-[#2F2F2F] rounded-lg text-xs hover:bg-[#3A3A3A]"
            >
              <Filter className="w-3 h-3 mr-1" />
              <span>필터</span>
            </button>
            <div className="flex bg-[#2F2F2F] rounded-lg p-0.5">
              <button
                onClick={() => setSelectedView('card')}
                className={`px-2 py-1 rounded-md text-xs ${
                  selectedView === 'card' ? 'bg-[#3A3A3A]' : ''
                }`}
              >
                카드뷰
              </button>
              <button
                onClick={() => setSelectedView('list')}
                className={`px-2 py-1 rounded-md text-xs ${
                  selectedView === 'list' ? 'bg-[#3A3A3A]' : ''
                }`}
              >
                리스트뷰
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-3 py-3">
        <form onSubmit={handleSearchSubmit} className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center">
              <Search className="w-3.5 h-3.5 text-[#B4B4B4]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="필요한 인재의 조건을 입력해 주세요"
              className="w-full pl-7 pr-2 py-1.5 bg-[#2F2F2F] border border-[#3A3A3A] rounded-lg
                text-xs placeholder-[#B4B4B4] focus:outline-none focus:border-[#4A4A4A]"
            />
          </div>
        </form>

        <div className="flex items-center justify-between mb-3">
          <h1 className="text-sm font-medium">
            검색 결과 <span className="text-[#B4B4B4]">({results.length}명)</span>
          </h1>
          <select className="bg-[#2F2F2F] border border-[#3A3A3A] rounded-lg px-2 py-1 text-xs">
            <option>최신순</option>
            <option>경력순</option>
            <option>이름순</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {results.map((result) => (
            <div
              key={result.id}
              className="group bg-[#2F2F2F] border border-[#3A3A3A] rounded-2xl p-3 
                hover:bg-[#3A3A3A]"
            >
              <div className="flex items-start space-x-3">
                {result.profileImage ? (
                  <Image
                    src={result.profileImage}
                    alt={result.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#3A3A3A] flex items-center justify-center text-sm font-medium">
                    {result.name.slice(0, 1)}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-medium group-hover:text-blue-400">
                        {result.name}
                      </h3>
                      <div className="flex items-center space-x-1.5 mt-0.5">
                        <Building className="w-3 h-3 text-[#B4B4B4]" />
                        <p className="text-xs text-[#B4B4B4]">{result.department}</p>
                      </div>
                      <div className="flex items-center space-x-1.5 mt-0.5">
                        <Briefcase className="w-3 h-3 text-[#B4B4B4]" />
                        <p className="text-xs text-[#B4B4B4]">{result.position}</p>
                      </div>
                      <div className="flex items-center space-x-1.5 mt-0.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${getAvailabilityInfo(result.availability).dotColor}`} />
                        <p className={`text-xs ${getAvailabilityInfo(result.availability).textColor}`}>
                          {getAvailabilityInfo(result.availability).text}
                        </p>
                      </div>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                      result.availability === 'available' ? 'bg-green-900/10 text-green-300/90' :
                      result.availability === 'busy' ? 'bg-yellow-900/10 text-yellow-300/90' :
                      'bg-red-900/10 text-red-300/90'
                    }`}>
                      {result.experience}년차
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-[10px] font-medium mb-1">주요 강점</p>
                      <div className="flex flex-wrap gap-1">
                        {result.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="flex items-center space-x-1 bg-[#3A3A3A] px-1.5 py-0.5 rounded text-[10px]"
                          >
                            <span>{highlight}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-medium mb-1">보유 스킬</p>
                      <div className="flex flex-wrap gap-1">
                        {result.skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-[#3A3A3A] px-1.5 py-0.5 rounded text-[10px]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-medium mb-1">주요 프로젝트</p>
                      <ul className="space-y-0.5 text-[10px] text-[#B4B4B4]">
                        {result.projects.map((project) => (
                          <li key={project} className="flex items-center space-x-1">
                            <span className="w-0.5 h-0.5 rounded-full bg-[#4A4A4A]" />
                            <span>{project}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
