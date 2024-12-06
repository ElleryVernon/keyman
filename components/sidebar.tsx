"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, Users, ChevronLeft, ChevronRight, Settings } from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface FavoriteItem {
  id: string;
  name: string;
  position: string;
  department: string;
}

interface TeamItem {
  id: string;
  name: string;
  memberCount: number;
  department: string;
}

const navItems: NavItem[] = [
  {
    icon: <Search size={16} />,
    label: "인재 검색",
    href: "/",
  }
];

const favoriteTeams: TeamItem[] = [
  {
    id: "t1",
    name: "WX 해커톤 키맨",
    memberCount: 6,
    department: "POSCO"
  },
  {
    id: "t2",
    name: "데이터 분석팀",
    memberCount: 6,
    department: "데이터팀"
  }
];

const favoriteItems: FavoriteItem[] = [
    {
        id: "1",
        name: "조서영",
        position: "포스코 DX",
        department: "IT 사업실 철강 프로"
      },
  {
    id: "2", 
    name: "황혁기",
    position: "수석연구원",
    department: "RIST"
  },
  {
    id: "3",
    name: "이혜민",
    position: "수석연구원",
    department: "AI로봇융합연구소"
  },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`
      flex flex-col
      h-screen
      bg-[#1E1E1E]
      ${isCollapsed ? 'w-[50px]' : 'w-[220px]'}
      transition-all duration-200 ease-in-out
      py-3 px-1.5
      border-r border-[#2A2A2A]
      font-[family-name:var(--font-geist-sans)]
      shadow-md
      overflow-hidden
    `}>
      <div className="flex items-center justify-between mb-4 px-1.5">
        {!isCollapsed && (
          <h1 className="text-[#025D87] text-base font-extrabold tracking-tight whitespace-nowrap">POSCO Keyman</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-[#2A2A2A] rounded-lg transition-colors duration-150
            active:scale-95 ml-auto"
        >
          {isCollapsed ? (
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5 text-gray-300" />
          )}
        </button>
      </div>

     
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`
              flex items-center
              px-2.5 py-2
              text-gray-300
              hover:bg-[#2A2A2A]
              rounded-lg
              transition-all duration-150
              group
              ${isCollapsed ? 'justify-center' : 'justify-start'}
              hover:text-white
              whitespace-nowrap
            `}
          >
            <span className="text-gray-400 group-hover:text-white">{item.icon}</span>
            {!isCollapsed && (
              <span className="ml-2.5 text-xs font-medium">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>

      {!isCollapsed && (
        <div className="flex-1 space-y-4 pt-6 mt-6 border-t border-[#2A2A2A]">
          <div className="px-1.5">
            <h2 className="text-[10px] font-semibold text-gray-400 mb-2 uppercase tracking-wider whitespace-nowrap">즐겨찾기한 팀</h2>
            <div className="space-y-1.5">
              {favoriteTeams.map((team) => (
                <Link
                  key={team.id}
                  href="/"
                  className="block p-1.5 rounded-lg hover:bg-[#2A2A2A] transition-colors duration-150 group"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-[#2A2A2A] rounded-lg flex items-center justify-center text-gray-300 group-hover:bg-[#3A3A3A] flex-shrink-0">
                      <Users size={14} className="group-hover:text-white" />
                    </div>
                    <div className="ml-2.5 min-w-0">
                      <p className="text-white text-xs font-medium group-hover:text-gray-100 truncate">{team.name}</p>
                      <p className="text-gray-400 text-[10px] truncate">{team.memberCount}명 · {team.department}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="px-1.5">
            <h2 className="text-[10px] font-semibold text-gray-400 mb-2 uppercase tracking-wider whitespace-nowrap">즐겨찾기한 인재</h2>
            <div className="space-y-1.5">
              {favoriteItems.map((item) => (
                <Link
                  key={item.id}
                  href="/"
                  className="block p-1.5 rounded-lg hover:bg-[#2A2A2A] transition-colors duration-150 group"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-[#2A2A2A] rounded-full flex items-center justify-center text-gray-300 group-hover:bg-[#3A3A3A] flex-shrink-0">
                      <User size={14} className="group-hover:text-white" />
                    </div>
                    <div className="ml-2.5 min-w-0">
                      <p className="text-white text-xs font-medium group-hover:text-gray-100 truncate">{item.name}</p>
                      <p className="text-gray-400 text-[10px] truncate">{item.position} · {item.department}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
 {!isCollapsed && (
        <div className="mb-4 px-1.5">
          <Link href="/" className="block p-1.5 rounded-lg hover:bg-[#2A2A2A] transition-colors duration-150 group">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-[#2A2A2A] rounded-full flex items-center justify-center text-gray-300 group-hover:bg-[#3A3A3A] flex-shrink-0">
                <User size={14} className="group-hover:text-white" />
              </div>
              <div className="ml-2.5 min-w-0">
                <p className="text-white text-xs font-medium group-hover:text-gray-100 truncate">한성민</p>
                <p className="text-gray-400 text-[10px] truncate">멘토 · 협력업체</p>
              </div>
            </div>
          </Link>
        </div>
      )}

      <nav>
        <Link
          href="/"
          className={`
            flex items-center
            px-2.5 py-2
            text-gray-300
            hover:bg-[#2A2A2A]
            rounded-lg
            transition-all duration-150
            group
            active:scale-[0.98]
            ${isCollapsed ? 'justify-center' : 'justify-start'}
            hover:text-white
            whitespace-nowrap
          `}
        >
          <span className="text-gray-400 group-hover:text-white"><Settings size={14} /></span>
          {!isCollapsed && (
            <span className="ml-2.5 text-xs font-medium">설정</span>
          )}
        </Link>
      </nav>
    </aside>
  );
}
