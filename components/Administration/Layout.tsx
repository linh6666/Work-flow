"use client";


import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  IconPlus,
  IconSearch,
  IconSettings,
  IconLogout,
  IconSun,
  IconMoon,
  IconFolder,
  IconHome,
  IconChevronDown,
  IconChevronRight,
  IconChevronLeft,
  IconClock,
  IconAlertCircle,
  IconCheck,
  IconX,
  IconNotebook,
  IconHierarchy,
  IconLayoutGrid,
  IconFilter,
  IconEye,
  IconUser,
  IconUsers,
  IconHelp,
  IconNews,
  IconBug,
  IconTrash,
  IconBell,
  IconFilePlus,
  IconClipboardList,
  IconFileText,
  IconSignature,
  IconBuildingFactory2,
  IconShieldCheck
} from '@tabler/icons-react';

interface Project {
  id: string;
  name: string;
  color: string; // CSS bullet indicator color class
  isOpen?: boolean;
}

interface Task {
  id: string;
  projectId: string;
  title: string;
  status: 'reprocess' | 'draft' | 'progress' | 'review' | 'rejected';
  date: string;
  priority: 'Khẩn cấp' | 'Cao' | 'Bình thường';
  tag?: string;
  countdown?: string;
  assignees: { name: string; avatarBg: string }[];
}

export default function AdministrationLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const pathParts = pathname.split('/');
  const tabFromPath = pathParts[pathParts.length - 1];
  
  const menuIds = ['tong-quan', 'khach-hang', 'de-xuat-bao-gia', 'nhan-su-du-an', 'bao-gia', 'hop-dong', 'yeu-cau-san-xuat', 'quan-ly-du-an', 'quan-tri-user'];
  
  const activeMenu = menuIds.includes(tabFromPath) ? tabFromPath : 'tong-quan';

  const menuItems = [
    { id: 'tong-quan', name: 'Tổng quan', icon: IconLayoutGrid },
    { id: 'khach-hang', name: 'Khách hàng', icon: IconUsers },
    { id: 'de-xuat-bao-gia', name: 'Đề xuất Báo giá', icon: IconFilePlus },
    { id: 'nhan-su-du-an', name: 'Nhân sự Dự án', icon: IconClipboardList },
    { id: 'bao-gia', name: 'Báo giá', icon: IconFileText },
    { id: 'hop-dong', name: 'Hợp đồng', icon: IconSignature },
    { id: 'yeu-cau-san-xuat', name: 'Yêu cầu Sản xuất', icon: IconBuildingFactory2 },
    { id: 'quan-ly-du-an', name: 'Quản lý Dự án', icon: IconFolder },
    { id: 'quan-tri-user', name: 'Quản trị user', icon: IconShieldCheck },
  ];

  const currentMenuItem = menuItems.find(item => item.id === activeMenu) || menuItems[0];

  // Sidebar Collapse State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-slate-50 font-sans overflow-hidden text-slate-800 antialiased">
      
      {/* 1. LEFT SIDEBAR */}
      <aside className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} bg-white text-slate-700 flex flex-col h-full shrink-0 border-r border-slate-200 select-none z-20 transition-all duration-300`}>
        
        {/* Workspace Brand Dropdown */}
        <div className="px-0 py-2 border-b border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer overflow-hidden">
          <Image 
            src="/logo/MHV_VN_SOLOGAN_H.png" 
            alt="Logo WorkFlow" 
            width={560} 
            height={140} 
            className="h-[240px] w-full object-contain -my-[85px] scale-115" 
            priority 
          />
        </div>


        {/* Projects Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 scrollbar-thin scrollbar-thumb-slate-200">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeMenu;
            return (
              <button
                key={item.id}
                onClick={() => router.push(`/Administration/${item.id}`)}
                className={`w-full flex items-center cursor-pointer ${
                  isSidebarCollapsed ? 'justify-center py-2.5' : 'gap-3 px-3.5 py-2.5'
                } rounded-lg text-white transition-all duration-150 ${
                  isActive 
                    ? 'bg-[#BB8D38] font-bold shadow-sm' 
                    : 'bg-[#406c89] hover:bg-[#BB8D38] font-semibold'
                }`}
                title={item.name}
              >
                <Icon size={16} className="shrink-0 text-white" />
                {!isSidebarCollapsed && (
                  <span className="text-xs tracking-wide text-left">
                    {item.name}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Area */}
        <div className="p-3 border-t border-slate-100 space-y-2">
          {/* <div className={`flex items-center gap-2.5 ${isSidebarCollapsed ? 'justify-center p-1' : 'px-2 py-1'} bg-white/5 border border-white/10 rounded-lg`}>
            <div className="w-5.5 h-5.5 rounded-full bg-sky-400/20 border border-sky-400/30 flex items-center justify-center text-[10px] font-bold text-sky-300 shrink-0">
              L
            </div>
            {!isSidebarCollapsed && (
              <span className="text-[11px] font-semibold text-slate-300 truncate" title="lecongchien2472002@gmail.com">
                lecongchien2472002@gmail.com
              </span>
            )}
          </div> */}

          <a 
            href="/workspace-selection" 
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center py-2' : 'gap-2 px-2 py-1.5'} hover:bg-rose-50 hover:text-rose-500 rounded text-slate-500 text-xs font-semibold transition-all`}
            title="Đăng xuất"
          >
            <IconLogout size={14} className="shrink-0" />
            {!isSidebarCollapsed && "Đăng xuất"}
          </a>
        </div>
      </aside>

      {/* 2. MAIN LAYOUT CONTAINER */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-14 bg-white border-b border-slate-100 px-6 flex items-center justify-between shrink-0 select-none z-15">
          {/* Breadcrumbs & Title */}
          <div className="flex items-center gap-2.5 text-xs text-slate-400 font-semibold">
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="mr-1.5 p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors cursor-pointer flex items-center justify-center"
              title={isSidebarCollapsed ? "Mở rộng menu" : "Thu gọn menu"}
            >
              {isSidebarCollapsed ? <IconChevronRight size={16} /> : <IconChevronLeft size={16} />}
            </button>
            <a href="/workspace-selection" className="hover:text-slate-600 transition-colors p-1 hover:bg-slate-50 rounded">
              <IconHome size={15} />
            </a>
            <span>/</span>
            <span>Dự án</span>
            <span>/</span>
            <span className="text-slate-800 font-bold bg-slate-100 px-2 py-0.5 rounded-md">
              {currentMenuItem.name}
            </span>
          </div>

          {/* Controls & Nav */}
          <div className="flex items-center gap-4">
            {/* Ẩn Bản tin theo yêu cầu
            <button className="flex items-center gap-1.5 text-xs text-indigo-600 font-bold px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full hover:bg-indigo-100/50 transition-all cursor-pointer">
              <IconNews size={13} />
              Bản tin
            </button>
            */}

            {/* Ẩn Tìm kiếm toàn cục theo yêu cầu
            <div className="relative w-44 md:w-56 group">
              <input 
                type="text" 
                placeholder="Tìm kiếm..."
                className="w-full text-xs font-medium bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-full pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all"
              />
              <IconSearch size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
            </div>
            */}

            {/* Icons */}
            <div className="flex items-center gap-1 text-slate-400">
              {/* Ẩn Hướng dẫn (?) và Giao diện theo yêu cầu
              <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer" title="Hướng dẫn">
                <IconHelp size={16} />
              </button>
              <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer" title="Giao diện">
                <IconSun size={16} />
              </button>
              */}
              <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer" title="Thông báo">
                <IconBell size={16} />
              </button>
            </div>

            {/* User Account Button/Pill */}
            <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100/50 transition-all cursor-pointer">
              <div className="w-5.5 h-5.5 rounded-full bg-sky-400/20 border border-sky-400/30 flex items-center justify-center text-[10px] font-bold text-sky-600 shrink-0">
                L
              </div>
              <span className="text-[11px] font-semibold text-slate-600 truncate max-w-[180px] hidden sm:inline-block" title="lecongchien2472002@gmail.com">
                lecongchien2472002@gmail.com
              </span>
            </div>
          </div>
        </header>

        {/* WORKSPACE CONTENT AREA */}
        <main className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
