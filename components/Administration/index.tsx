"use client";

import "../../app/globals.css";
import React, { useState } from 'react';
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
  IconTrash
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

export default function Administration() {
  // State for Projects List (Dynamic Sidebar)
  const [projects, setProjects] = useState<Project[]>([
    { id: 'pos-mobile', name: 'Dự án Mobile POS', color: 'bg-indigo-500', isOpen: true },
    { id: 'pos', name: 'Dự án Pos', color: 'bg-red-500', isOpen: false },
    { id: 'seo', name: 'Dự án SEO', color: 'bg-pink-500', isOpen: false },
    { id: 'web', name: 'Dự án Web', color: 'bg-teal-500', isOpen: true },
    { id: 'webcam', name: 'Dự án Webcam', color: 'bg-orange-500', isOpen: false },
    { id: 'qlt-mobile', name: 'QLT Mobile', color: 'bg-purple-500', isOpen: false },
  ]);

  // State for active project & submenu item
  const [activeProjectId, setActiveProjectId] = useState<string>('web');
  const [activeSubMenu, setActiveSubMenu] = useState<'tasks' | 'process' | 'modules'>('tasks');

  // State for Tasks
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'WFR-164',
      projectId: 'web',
      title: 'Test Module Task',
      status: 'reprocess',
      date: '18/06',
      priority: 'Khẩn cấp',
      assignees: [{ name: 'L', avatarBg: 'bg-sky-400 text-sky-950' }]
    },
    {
      id: 'WFR-165',
      projectId: 'web',
      title: 'QUY TRÌNH NGHIỆP VỤ CHƯƠNG TRÌNH "THU PHÍ DỊCH VỤ"',
      status: 'draft',
      date: '18/06 - 30/06',
      priority: 'Khẩn cấp',
      countdown: 'Còn: 10d 10h 19m',
      assignees: [
        { name: 'M', avatarBg: 'bg-emerald-400 text-emerald-950' },
        { name: 'H', avatarBg: 'bg-amber-400 text-amber-950' }
      ]
    },
    {
      id: 'WFR-160',
      projectId: 'web',
      title: 'Bỏ các chữ "Nhất Thị Trường" ở màn hình trang chủ',
      status: 'rejected',
      date: '11/06 - 11/06',
      priority: 'Khẩn cấp',
      assignees: [{ name: 'H', avatarBg: 'bg-pink-400 text-pink-950' }]
    },
    {
      id: 'WFR-151',
      projectId: 'web',
      title: 'Bổ sung thêm border và style các nút của bảng thống kê doanh số',
      status: 'rejected',
      date: '04/05 - 04/05',
      priority: 'Khẩn cấp',
      assignees: [
        { name: 'A', avatarBg: 'bg-violet-400 text-violet-950' },
        { name: 'B', avatarBg: 'bg-amber-400 text-amber-950' }
      ]
    },
    {
      id: 'WFR-149',
      projectId: 'web',
      title: 'Check lỗi import dữ liệu từ file Excel phiên bản cũ',
      status: 'rejected',
      date: '04/06',
      priority: 'Cao',
      tag: 'Bug',
      assignees: [{ name: 'C', avatarBg: 'bg-rose-400 text-rose-950' }]
    },
    {
      id: 'WFR-148',
      projectId: 'web',
      title: 'Thêm tải file mẫu import tài khoản khách hàng',
      status: 'rejected',
      date: '04/06',
      priority: 'Bình thường',
      assignees: [{ name: 'D', avatarBg: 'bg-teal-400 text-teal-950' }]
    },
    {
      id: 'WFR-133',
      projectId: 'web',
      title: 'Bổ sung thêm scroll khi click vào Chart chi tiết doanh thu năm',
      status: 'rejected',
      date: '26/05 - 27/05',
      priority: 'Khẩn cấp',
      assignees: [{ name: 'E', avatarBg: 'bg-blue-400 text-blue-950' }]
    }
  ]);

  // Modal State for "Tạo dự án" (Create Project)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectColor, setNewProjectColor] = useState('bg-indigo-500');

  // Modal State for "Tạo công việc" (Create Task)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedColumnForNewTask, setSelectedColumnForNewTask] = useState<Task['status']>('reprocess');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('Bình thường');
  const [newTaskTag, setNewTaskTag] = useState('');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [taskSearchQuery, setTaskSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'me'>('all');

  // Sidebar Collapse State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Project Collapse/Expand Handler
  const toggleProjectCollapse = (id: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, isOpen: !p.isOpen } : p));
  };

  // Add Project Submit
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    const newId = `project-${Date.now()}`;
    const newProj: Project = {
      id: newId,
      name: newProjectName.trim(),
      color: newProjectColor,
      isOpen: true
    };

    setProjects([...projects, newProj]);
    setActiveProjectId(newId);
    setNewProjectName('');
    setIsProjectModalOpen(false);
  };

  // Add Task Submit
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newId = `WFR-${Math.floor(100 + Math.random() * 900)}`;
    const newTask: Task = {
      id: newId,
      projectId: activeProjectId,
      title: newTaskTitle.trim(),
      status: selectedColumnForNewTask,
      date: 'Hôm nay',
      priority: newTaskPriority,
      tag: newTaskTag.trim() || undefined,
      assignees: [{ name: 'L', avatarBg: 'bg-sky-400 text-sky-950' }]
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setNewTaskTag('');
    setNewTaskPriority('Bình thường');
    setIsTaskModalOpen(false);
  };

  // Get active project details
  const currentProject = projects.find(p => p.id === activeProjectId) || projects[0];

  // Filter tasks based on project, status, and search query
  const getFilteredTasks = (status: Task['status']) => {
    return tasks.filter(t => 
      t.projectId === activeProjectId && 
      t.status === status &&
      t.title.toLowerCase().includes(taskSearchQuery.toLowerCase())
    );
  };

  // Column definitions
  const columns: { key: Task['status']; title: string; colorClass: string }[] = [
    { key: 'reprocess', title: 'XỬ LÝ LẠI', colorClass: 'text-amber-500 bg-amber-500/10 border-amber-500' },
    { key: 'draft', title: 'NHÁP', colorClass: 'text-slate-500 bg-slate-500/10 border-slate-500' },
    { key: 'progress', title: 'ĐANG XỬ LÝ', colorClass: 'text-blue-500 bg-blue-500/10 border-blue-500' },
    { key: 'review', title: 'CHỜ DUYỆT', colorClass: 'text-purple-500 bg-purple-500/10 border-purple-500' },
    { key: 'rejected', title: 'TỪ CHỐI', colorClass: 'text-rose-500 bg-rose-500/10 border-rose-500' }
  ];

  // Colors available for new projects
  const colorOptions = [
    { class: 'bg-indigo-500', name: 'Indigo' },
    { class: 'bg-red-500', name: 'Red' },
    { class: 'bg-pink-500', name: 'Pink' },
    { class: 'bg-teal-500', name: 'Teal' },
    { class: 'bg-orange-500', name: 'Orange' },
    { class: 'bg-purple-500', name: 'Purple' },
    { class: 'bg-emerald-500', name: 'Emerald' }
  ];

  return (
    <div className="flex h-screen w-screen bg-slate-50 font-sans overflow-hidden text-slate-800 antialiased">
      
      {/* 1. LEFT SIDEBAR */}
      <aside className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} bg-[#111e2e] text-slate-300 flex flex-col h-full shrink-0 border-r border-white/5 select-none z-20 transition-all duration-300`}>
        
        {/* Workspace Brand Dropdown */}
        <div className={`px-0 py-2 border-b border-white/5 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} hover:bg-white/5 transition-colors cursor-pointer`}>
          {isSidebarCollapsed ? (
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-extrabold flex items-center justify-center text-lg shadow-md shadow-emerald-500/15 shrink-0">
              Q
            </div>
          ) : (
            <Image 
              src="/logo/logo1.png" 
              alt="Logo WorkFlow" 
              width={560} 
              height={140} 
              className="h-[240px] w-full object-contain -my-[85px] scale-115" 
              priority 
            />
          )}
        </div>


        {/* Projects Navigation List */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
          {!isSidebarCollapsed && (
            <div className="px-2 pb-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
              <span>Dự án của bạn ({projects.length})</span>
            </div>
          )}

          {projects.map((proj) => {
            const isProjectActive = proj.id === activeProjectId;
            return (
              <div key={proj.id} className="space-y-0.5">
                {/* Project Header Row */}
                <div 
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center py-2.5' : 'justify-between py-2'} px-2 rounded-lg cursor-pointer transition-all duration-150 ${
                    isProjectActive ? 'bg-white/5 text-white' : 'hover:bg-white/5 text-slate-400 hover:text-slate-200'
                  }`}
                  onClick={() => setActiveProjectId(proj.id)}
                  title={isSidebarCollapsed ? proj.name : undefined}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${proj.color}`} />
                    {!isSidebarCollapsed && <span className="text-xs font-bold truncate leading-none">{proj.name}</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleProjectCollapse(proj.id);
                      }}
                      className="p-0.5 hover:bg-white/10 rounded text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {proj.isOpen ? <IconChevronDown size={14} /> : <IconChevronRight size={14} />}
                    </button>
                  )}
                </div>

                {/* Submenu items (Expanded only) */}
                {!isSidebarCollapsed && proj.isOpen && (
                  <div className="pl-6 pr-2 space-y-0.5 border-l border-white/5 ml-3">
                    <button 
                      onClick={() => {
                        setActiveProjectId(proj.id);
                        setActiveSubMenu('tasks');
                      }}
                      className={`w-full flex items-center gap-2 py-1.5 px-2 rounded text-[11px] font-semibold text-left transition-all ${
                        isProjectActive && activeSubMenu === 'tasks'
                          ? 'text-sky-400 bg-sky-500/10'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <IconNotebook size={13} />
                      Công việc
                    </button>
                    <button 
                      onClick={() => {
                        setActiveProjectId(proj.id);
                        setActiveSubMenu('process');
                      }}
                      className={`w-full flex items-center gap-2 py-1.5 px-2 rounded text-[11px] font-semibold text-left transition-all ${
                        isProjectActive && activeSubMenu === 'process'
                          ? 'text-sky-400 bg-sky-500/10'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <IconHierarchy size={13} />
                      Quy trình (DEMO)
                    </button>
                    <button 
                      onClick={() => {
                        setActiveProjectId(proj.id);
                        setActiveSubMenu('modules');
                      }}
                      className={`w-full flex items-center gap-2 py-1.5 px-2 rounded text-[11px] font-semibold text-left transition-all ${
                        isProjectActive && activeSubMenu === 'modules'
                          ? 'text-sky-400 bg-sky-500/10'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <IconLayoutGrid size={13} />
                      Modules
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Area */}
        <div className="p-3 border-t border-white/5 space-y-2">
          <div className={`flex items-center gap-2.5 ${isSidebarCollapsed ? 'justify-center p-1' : 'px-2 py-1'} bg-white/5 border border-white/10 rounded-lg`}>
            <div className="w-5.5 h-5.5 rounded-full bg-sky-400/20 border border-sky-400/30 flex items-center justify-center text-[10px] font-bold text-sky-300 shrink-0">
              L
            </div>
            {!isSidebarCollapsed && (
              <span className="text-[11px] font-semibold text-slate-300 truncate">
                lecongchien247
              </span>
            )}
          </div>

          <a 
            href="/workspace-selection" 
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center py-2' : 'gap-2 px-2 py-1.5'} hover:bg-rose-500/10 hover:text-rose-400 rounded text-slate-400 text-xs font-semibold transition-all`}
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
              {currentProject.name}
            </span>
          </div>

          {/* Controls & Nav */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-xs text-indigo-600 font-bold px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full hover:bg-indigo-100/50 transition-all cursor-pointer">
              <IconNews size={13} />
              Bản tin
            </button>

            {/* Global Search */}
            <div className="relative w-44 md:w-56 group">
              <input 
                type="text" 
                placeholder="Tìm kiếm..."
                className="w-full text-xs font-medium bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-full pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all"
              />
              <IconSearch size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-1 text-slate-400">
              <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer" title="Hướng dẫn">
                <IconHelp size={16} />
              </button>
              <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer" title="Giao diện">
                <IconSun size={16} />
              </button>
              <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer" title="Cấu hình">
                <IconSettings size={16} />
              </button>
            </div>

            {/* User Avatar Stack */}
            <div className="w-8 h-8 rounded-full border border-sky-400 bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-xs select-none">
              L
            </div>
          </div>
        </header>

        {/* WORKSPACE CONTENT AREA */}
        <main className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
          
          {/* Submenu Task filters toolbar (Only visible for 'tasks' submenu) */}
          {activeSubMenu === 'tasks' && (
            <div className="bg-white border-b border-slate-100/90 py-2.5 px-6 flex flex-wrap items-center justify-between gap-3 shrink-0 select-none">
              <div className="flex items-center gap-2">
                {/* Board selector */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors">
                  <span className="w-2 h-2 rounded bg-sky-500" />
                  Board
                  <IconChevronDown size={12} className="text-slate-400" />
                </div>
                
                {/* General Filter Buttons */}
                <button className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 transition-colors cursor-pointer">
                  <IconFilter size={13} />
                  Lọc
                </button>
                <button className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 transition-colors cursor-pointer">
                  <IconEye size={13} />
                  Hiển thị
                </button>

                <div className="w-px h-5 bg-slate-200 mx-1" />

                {/* Me / All filters */}
                <div className="flex bg-slate-100 rounded-lg p-0.5">
                  <button 
                    onClick={() => setActiveFilter('me')}
                    className={`px-2.5 py-0.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      activeFilter === 'me' 
                        ? 'bg-white text-slate-800 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Tôi
                  </button>
                  <button 
                    onClick={() => setActiveFilter('all')}
                    className={`px-2.5 py-0.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      activeFilter === 'all' 
                        ? 'bg-white text-slate-800 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Tất cả
                  </button>
                </div>
              </div>

              {/* Task search input within Project */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Tìm việc..."
                    value={taskSearchQuery}
                    onChange={(e) => setTaskSearchQuery(e.target.value)}
                    className="w-36 md:w-44 text-xs font-medium border border-slate-200 rounded-lg pl-8 pr-3 py-1 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  />
                  <IconSearch size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                
                <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                  {tasks.filter(t => t.projectId === activeProjectId).length} công việc
                </span>
              </div>
            </div>
          )}

          {/* Kanban Columns (Dynamic Board View) */}
          <div className="flex-1 overflow-x-auto overflow-y-hidden p-6 select-none">
            {activeSubMenu === 'tasks' ? (
              <div className="flex gap-4 h-full items-start min-w-[1000px]">
                {columns.map((col) => {
                  const colTasks = getFilteredTasks(col.key);
                  return (
                    <div key={col.key} className="w-1/5 max-w-[260px] bg-slate-100/60 border border-slate-200/50 rounded-2xl flex flex-col max-h-full">
                      {/* Column Header */}
                      <div className="p-3 pb-2 flex items-center justify-between border-b border-slate-200/20">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${col.key === 'reprocess' ? 'bg-amber-500' : col.key === 'draft' ? 'bg-slate-400' : col.key === 'progress' ? 'bg-blue-500' : col.key === 'review' ? 'bg-purple-500' : 'bg-rose-500'}`} />
                          <h3 className="text-xs font-black text-slate-700 tracking-tight">{col.title}</h3>
                          <span className="text-[10px] font-bold bg-slate-200/70 text-slate-500 px-1.5 py-0.2 rounded-full">
                            {colTasks.length}
                          </span>
                        </div>
                        <div className="flex gap-0.5">
                          <button 
                            onClick={() => {
                              setSelectedColumnForNewTask(col.key);
                              setIsTaskModalOpen(true);
                            }}
                            className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-700 cursor-pointer"
                          >
                            <IconPlus size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Tasks List */}
                      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin">
                        {colTasks.length > 0 ? (
                          colTasks.map((task) => (
                            <div 
                              key={task.id}
                              className="bg-white border border-slate-100 shadow-sm rounded-xl p-3.5 hover:shadow hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer text-left border-t-3 border-t-slate-300 hover:border-t-sky-400"
                            >
                              {/* Task header ID & Date */}
                              <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 mb-1.5">
                                <span className="text-sky-600 font-bold bg-sky-50 px-1.5 py-0.2 rounded">
                                  {task.id}
                                </span>
                                <span>{task.date}</span>
                              </div>

                              {/* Task title */}
                              <p className="text-xs font-bold text-slate-700 line-clamp-3 leading-snug mb-3">
                                {task.title}
                              </p>

                              {/* Extra countdown timer (like draft) */}
                              {task.countdown && (
                                <div className="mb-2.5 flex items-center gap-1 text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md w-max">
                                  <IconClock size={11} />
                                  {task.countdown}
                                </div>
                              )}

                              {/* Footer details (Priority badge, Assignee avatars) */}
                              <div className="flex items-center justify-between border-t border-slate-50 pt-2.5 mt-2">
                                <div className="flex items-center gap-1.5">
                                  <span className={`w-1.5 h-1.5 rounded-full ${task.priority === 'Khẩn cấp' ? 'bg-red-500 animate-pulse' : task.priority === 'Cao' ? 'bg-orange-500' : 'bg-slate-400'}`} />
                                  <span className={`text-[9px] font-extrabold tracking-wide uppercase ${task.priority === 'Khẩn cấp' ? 'text-red-500' : task.priority === 'Cao' ? 'text-orange-500' : 'text-slate-400'}`}>
                                    {task.priority}
                                  </span>
                                  {task.tag && (
                                    <span className="text-[9px] font-black text-rose-500 bg-rose-50 border border-rose-100 rounded px-1.5 leading-none py-0.5">
                                      {task.tag}
                                    </span>
                                  )}
                                </div>

                                <div className="flex -space-x-1.5">
                                  {task.assignees.map((as, idx) => (
                                    <div 
                                      key={idx} 
                                      className={`w-5 h-5 rounded-full ${as.avatarBg} font-extrabold flex items-center justify-center text-[9px] border border-white`}
                                    >
                                      {as.name}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="py-6 text-center text-slate-400 text-[10px] font-medium border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                            Chưa có công việc
                          </div>
                        )}

                        {/* Add Task Quick Trigger */}
                        <button 
                          onClick={() => {
                            setSelectedColumnForNewTask(col.key);
                            setIsTaskModalOpen(true);
                          }}
                          className="w-full py-2 hover:bg-white/80 border border-dashed border-slate-200 hover:border-slate-300 rounded-xl text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <IconPlus size={12} />
                          Thêm công việc
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Empty states for Demo views
              <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-400 shadow-sm border border-slate-200/50">
                  {activeSubMenu === 'process' ? <IconHierarchy size={28} /> : <IconLayoutGrid size={28} />}
                </div>
                <h3 className="font-bold text-slate-700 text-sm">
                  {activeSubMenu === 'process' ? 'Phân hệ Quy trình (DEMO)' : 'Phân hệ Modules'}
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
                  Giao diện cho phân hệ này đang được phát triển. Nhấp chọn mục **Công việc** ở danh mục dự án để làm việc với Kanban Board.
                </p>
              </div>
            )}
          </div>

        </main>
      </div>

      {/* 3. MODAL: TẠO DỰ ÁN MỚI */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 bg-[#070e17]/60 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in p-4 select-none">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all scale-100 animate-scale-up">
            
            {/* Modal header */}
            <div className="bg-[#111e2e] text-white px-5 py-4 flex items-center justify-between">
              <h3 className="text-sm font-extrabold tracking-tight">Tạo dự án mới</h3>
              <button 
                onClick={() => setIsProjectModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>

            {/* Modal form body */}
            <form onSubmit={handleCreateProject} className="p-5 space-y-4 text-left">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                  Tên dự án
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Nhập tên dự án..."
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all text-slate-800"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                  Màu sắc đại diện
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {colorOptions.map((opt) => (
                    <button
                      key={opt.class}
                      type="button"
                      onClick={() => setNewProjectColor(opt.class)}
                      className={`w-7 h-7 rounded-full ${opt.class} flex items-center justify-center shadow-sm cursor-pointer transition-all ${
                        newProjectColor === opt.class ? 'ring-3 ring-sky-300 ring-offset-2 scale-110' : 'hover:scale-105'
                      }`}
                      title={opt.name}
                    >
                      {newProjectColor === opt.class && <IconCheck size={14} className="text-white" stroke={3} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 bg-gradient-to-r from-sky-400 to-blue-500 hover:opacity-95 text-white rounded-lg text-xs font-bold shadow-md shadow-sky-500/10 transition-all cursor-pointer"
                >
                  Tạo dự án
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. MODAL: TẠO CÔNG VIỆC MỚI */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-[#070e17]/60 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in p-4 select-none">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all scale-100 animate-scale-up">
            
            {/* Modal header */}
            <div className="bg-[#111e2e] text-white px-5 py-4 flex items-center justify-between">
              <h3 className="text-sm font-extrabold tracking-tight">Thêm công việc mới</h3>
              <button 
                onClick={() => setIsTaskModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>

            {/* Modal form body */}
            <form onSubmit={handleCreateTask} className="p-5 space-y-4 text-left">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                  Tiêu đề công việc
                </label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Nhập tiêu đề hoặc nội dung công việc..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all text-slate-800 resize-none"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                    Cột Trạng thái
                  </label>
                  <select
                    value={selectedColumnForNewTask}
                    onChange={(e) => setSelectedColumnForNewTask(e.target.value as Task['status'])}
                    className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 text-slate-700 transition-all"
                  >
                    {columns.map(col => (
                      <option key={col.key} value={col.key}>{col.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                    Độ khẩn cấp
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as Task['priority'])}
                    className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 text-slate-700 transition-all"
                  >
                    <option value="Bình thường">Bình thường</option>
                    <option value="Cao">Cao</option>
                    <option value="Khẩn cấp">Khẩn cấp</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                  Nhãn (Tag) - Tùy chọn
                </label>
                <input 
                  type="text" 
                  placeholder="Ví dụ: Bug, Review..."
                  value={newTaskTag}
                  onChange={(e) => setNewTaskTag(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all text-slate-800"
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 bg-gradient-to-r from-sky-400 to-blue-500 hover:opacity-95 text-white rounded-lg text-xs font-bold shadow-md shadow-sky-500/10 transition-all cursor-pointer"
                >
                  Thêm công việc
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
