"use client";

import "../../app/globals.css";
import React, { useState } from 'react';
import Image from 'next/image';

interface Workspace {
  id: string;
  name: string;
  owner: string;
  code: string;
  date: string;
  projectsCount: number;
  membersCount: number;
  role: string;
  color: string; // Tailwind bg/text colors
  letter: string;
}

export default function WorkspaceSelection() {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data parsed directly from the screenshot
  const workspaces: Workspace[] = [
    {
      id: '1',
      name: 'QLT_CNTT',
      owner: 'NGUYỄN KHẮC HỢP',
      code: 'QLT_CNTT',
      date: '04 thg 3, 2026',
      projectsCount: 12,
      membersCount: 11,
      role: 'SUPERADMIN',
      color: 'from-emerald-400 to-teal-500 shadow-emerald-500/20 text-emerald-500 bg-emerald-50',
      letter: 'Q'
    },
    {
      id: '2',
      name: 'QLT_KE_TOAN',
      owner: 'Nguyễn Thị Mai',
      code: 'QLT_KE_TOAN',
      date: '11 thg 3, 2026',
      projectsCount: 2,
      membersCount: 4,
      role: 'SUPERADMIN',
      color: 'from-amber-400 to-orange-500 shadow-amber-500/20 text-amber-500 bg-amber-50',
      letter: 'Q'
    },
    {
      id: '3',
      name: 'QLT_SEO',
      owner: 'linhmai',
      code: 'VR061CT20',
      date: '20 thg 3, 2026',
      projectsCount: 1,
      membersCount: 3,
      role: 'SUPERADMIN',
      color: 'from-sky-400 to-blue-500 shadow-sky-500/20 text-sky-500 bg-sky-50',
      letter: 'Q'
    },
    {
      id: '4',
      name: 'QLT_TTS_CNTT',
      owner: 'Nguyễn Thị Mai',
      code: 'QLT_TTS_CNTT',
      date: '12 thg 3, 2026',
      projectsCount: 1,
      membersCount: 4,
      role: 'SUPERADMIN',
      color: 'from-rose-400 to-pink-500 shadow-rose-500/20 text-rose-500 bg-rose-50',
      letter: 'Q'
    },
    {
      id: '5',
      name: 'Sale',
      owner: 'Nguyễn Văn Mạnh',
      code: 'FHS6CU2I',
      date: '19 thg 3, 2026',
      projectsCount: 1,
      membersCount: 1,
      role: 'SUPERADMIN',
      color: 'from-amber-300 to-yellow-500 shadow-yellow-500/20 text-yellow-600 bg-yellow-50',
      letter: 'S'
    },
    {
      id: '6',
      name: 'Task anh Dinh',
      owner: 'NGUYỄN TIẾN DINH',
      code: '1L4QAPCS',
      date: '14 thg 3, 2026',
      projectsCount: 2,
      membersCount: 8,
      role: 'SUPERADMIN',
      color: 'from-indigo-400 to-blue-600 shadow-indigo-500/20 text-indigo-500 bg-indigo-50',
      letter: 'T'
    }
  ];

  // Filtering based on search query
  const filteredWorkspaces = workspaces.filter(ws => 
    ws.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ws.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ws.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectWorkspace = (workspace: Workspace) => {
    alert(`Đã chọn không gian làm việc: ${workspace.name}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col antialiased">
      
      {/* KHU VỰC TOP BANNER & HEADER */}
      <div className="bg-[#111e2e] text-white relative pb-14 pt-4 px-2 sm:px-8 lg:px-16">
        
        {/* Khung chứa các thành phần background để overflow-hidden hoạt động mà không che mất thanh tìm kiếm */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {/* Lưới nền tinh tế */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full text-white" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Glow hiệu ứng tròn */}
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
        </div>

        <header className="relative z-20 h-28 flex items-center justify-between border-b border-white/5 max-w-7xl mx-auto">
          {/* Logo WorkFlow */}
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <Image 
              src="/logo/logo1.png" 
              alt="WorkFlow Logo" 
              width={560} 
              height={140} 
              className="h-[260px] w-auto object-contain -my-[90px]" 
              priority 
            />
          </div>

          {/* Navigation & Controls */}
          <div className="flex items-center gap-6">
            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-5">
              <a href="#" className="flex items-center gap-2 text-slate-300 hover:text-white transition-all text-sm font-medium py-1.5 px-3 rounded-lg hover:bg-white/5">
                <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                Quản trị
              </a>
              <a href="#" className="flex items-center gap-2 text-slate-300 hover:text-white transition-all text-sm font-medium py-1.5 px-3 rounded-lg hover:bg-white/5">
                <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                Báo cáo
              </a>
            </nav>

            {/* Divider */}
            <div className="hidden md:block w-px h-5 bg-white/10" />

            {/* Dark/Light mode button */}
            <button className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </button>

            {/* User Account Button */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-sky-400/20 border border-sky-400/30 flex items-center justify-center text-[11px] font-bold text-sky-300">
                L
              </div>
              <span className="text-xs font-semibold text-slate-200 hidden sm:inline-block max-w-[150px] truncate">
                lecongchien2472002@gm...
              </span>
            </div>

            {/* Logout link */}
            <a href="/sign-in" className="flex items-center gap-1.5 text-slate-400 hover:text-rose-400 transition-colors text-sm font-medium py-1 px-2.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
              <span className="hidden sm:inline">Đăng xuất</span>
            </a>
          </div>
        </header>

        {/* HERO CONTENT SECTION */}
        <div className="relative z-10 max-w-7xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Title Content */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-full text-[11px] font-medium tracking-wide">
              <span>✨</span> Chọn không gian để bắt đầu làm việc
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Không gian làm việc
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg">
              Truy cập dự án, theo dõi tiến độ, và cộng tác với team — tất cả trong một nền tảng.
            </p>

            {/* Statistics Row */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-slate-200">
                <svg className="w-4.5 h-4.5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                10 workspace
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-slate-200">
                <svg className="w-4.5 h-4.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M12 6v6l4 2" />
                </svg>
                33 dự án
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-slate-200">
                <svg className="w-4.5 h-4.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                57 thành viên
              </span>
            </div>
          </div>

          {/* Right SVG Connected Nodes Graphic */}
          <div className="lg:col-span-5 flex justify-center items-center relative h-[180px] w-full hidden lg:block">
            <Image 
              src="/logo/svgviewer.svg" 
              alt="Connected Workspaces" 
              width={260} 
              height={180} 
              className="w-full max-w-[260px] object-contain select-none" 
              priority 
            />
          </div>
        </div>

        {/* CẮT GÓC WAVE TRUYỀN THỐNG BẰNG SVG */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none select-none">
          <svg className="relative block w-full h-[40px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 Q600,120 1200,60 L1200,120 L0,120 Z" className="fill-slate-50"></path>
          </svg>
        </div>

        {/* TÌM KIẾM WORKSPACE FLOATING SEARCH BAR */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 w-full max-w-xl px-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full blur-md opacity-25 group-focus-within:opacity-40 transition-all duration-300" />
            <div className="relative bg-white rounded-full border border-slate-100 shadow-xl px-5 py-3.5 flex items-center gap-3">
              <svg className="w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Tìm kiếm workspace..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none bg-transparent"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                >
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* KHU VỰC DANH SÁCH WORKSPACE CARDS */}
      <main className="flex-1 max-w-7xl mx-auto w-full pt-16 pb-24 px-4 sm:px-8 lg:px-16">
        
        {filteredWorkspaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkspaces.map((ws) => (
              <div 
                key={ws.id}
                onClick={() => handleSelectWorkspace(ws)}
                className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer group relative overflow-hidden active:scale-[0.99] border-t-4 border-t-slate-200 hover:border-t-sky-400"
              >
                
                {/* Header card details */}
                <div className="flex gap-4">
                  {/* Styled Avatar/Icon */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-white text-lg bg-gradient-to-br ${ws.color.split(' ').slice(0, 2).join(' ')} shadow-md`}>
                    {ws.letter}
                  </div>

                  {/* Title & Owner */}
                  <div className="text-left flex-1 min-w-0">
                    <h3 className="text-base font-extrabold text-slate-800 tracking-tight truncate group-hover:text-sky-600 transition-colors duration-200">
                      {ws.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">
                      Chủ sở hữu: <span className="text-slate-600 font-semibold">{ws.owner}</span>
                    </p>
                  </div>
                </div>

                {/* Sub details block */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {ws.code}
                  </span>
                  <span className="text-xs text-slate-400 font-medium select-none">
                    {ws.date}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-100 my-4 w-full" />

                {/* Bottom stats row */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                      </svg>
                      {ws.projectsCount} dự án
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                      </svg>
                      {ws.membersCount} thành viên
                    </span>
                  </div>

                  {/* SuperAdmin Role Badge */}
                  <span className="bg-sky-50 text-[#0091ff] border border-sky-100/70 px-2 py-0.5 rounded text-[9px] font-bold tracking-wider select-none uppercase">
                    {ws.role}
                  </span>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center max-w-sm mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-slate-700">Không tìm thấy không gian</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Không tìm thấy workspace nào trùng khớp với từ khóa &ldquo;{searchQuery}&rdquo;.
            </p>
          </div>
        )}

      </main>

      {/* NÚT THÊM FLOATING ACTION BUTTON */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer z-50">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

    </div>
  );
}
