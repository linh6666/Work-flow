"use client";

import React, { useState, useMemo } from 'react';
import {
  IconSettings,
  IconPrinter,
  IconArrowsMaximize,
  IconChevronDown,
  IconPlus,
  IconArrowsUpDown,
  IconPencil,
  IconCloudDownload,
  IconArrowsExchange,
  IconCheck,
  IconX,
  IconTrash,
} from '@tabler/icons-react';

// ─── Constants & Types ────────────────────────────────────────────────────────

export interface TaskPlanItem {
  id: string;
  stt: number;
  phuTrach: string;
  maDa: string;
  tenCv: string;
  gioDk: number;
  ngayBd: string;
  ngayKt: string;
  statusKey: 'CB' | 'DT' | 'HT' | 'TD';
  startDay: number;
  endDay: number;
  projectName?: string;
  groupName?: string;
}

const WEEKS_IN_NOV = [
  { label: 'T1', daysCount: 7, startDay: 1, endDay: 7 },
  { label: 'T2', daysCount: 7, startDay: 8, endDay: 14 },
  { label: 'T3', daysCount: 7, startDay: 15, endDay: 21 },
  { label: 'T4', daysCount: 9, startDay: 22, endDay: 30 },
];

const TOTAL_DAYS = 30;

const DEPARTMENTS = [
  { id: 'vp',    label: 'Khối Văn phòng',          color: 'border-indigo-300 text-indigo-800 bg-indigo-50',          activeColor: 'bg-[#2f2b7c] text-white border-[#2f2b7c] shadow-2xs font-bold rounded-lg' },
  { id: 'kt',    label: 'Phòng Khai triển',          color: 'border-pink-300 text-pink-700 bg-pink-50 rounded-full',    activeColor: 'bg-pink-600 text-white border-pink-600 rounded-full shadow-2xs font-bold' },
  { id: 'cat',   label: 'Phòng Cắt',                 color: 'border-amber-300 text-amber-700 bg-amber-50 rounded-full', activeColor: 'bg-amber-500 text-white border-amber-500 rounded-full shadow-2xs font-bold' },
  { id: 'ghep',  label: 'Phòng Ghép',                color: 'border-blue-300 text-blue-700 bg-blue-50 rounded-full',    activeColor: 'bg-blue-600 text-white border-blue-600 rounded-full shadow-2xs font-bold' },
  { id: 'ms',    label: 'Phòng Mộc Sơn',             color: 'border-slate-300 text-slate-700 bg-slate-50 rounded-full', activeColor: 'bg-slate-600 text-white border-slate-600 rounded-full shadow-2xs font-bold' },
  { id: 'dien',  label: 'Phòng Điện',                color: 'border-purple-300 text-purple-700 bg-purple-50 rounded-full', activeColor: 'bg-purple-600 text-white border-purple-600 rounded-full shadow-2xs font-bold' },
  { id: 'cq',    label: 'Phòng Cảnh Quan',           color: 'border-orange-300 text-orange-700 bg-orange-50 rounded-full', activeColor: 'bg-orange-500 text-white border-orange-500 rounded-full shadow-2xs font-bold' },
  { id: 'cntk',  label: 'Phòng Công nghệ và Thiết kế', color: 'border-cyan-300 text-cyan-700 bg-cyan-50 rounded-full', activeColor: 'bg-cyan-600 text-white border-cyan-600 rounded-full shadow-2xs font-bold' },
];

const LEGEND = [
  { key: 'DT', label: 'Đang thực hiện', color: 'bg-emerald-500 text-white' },
  { key: 'HT', label: 'Hoàn thành',     color: 'bg-blue-500 text-white' },
  { key: 'TD', label: 'Tạm dừng',       color: 'bg-amber-400 text-white' },
  { key: 'CB', label: 'Chưa bắt đầu',   color: 'bg-[#8fa4b8] text-slate-800 border border-slate-300' },
];

// Initial 87 tasks dataset matching the user's requirement ("87 CV" / "87 công việc")
const INITIAL_87_TASKS: TaskPlanItem[] = [
  // ── Project 1: KIEN GIANG MASTER PLAN PROJECT MODEL (26-2026/DA-MHV) [STT 1-20] ──
  { id: 'kg-1', stt: 1, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'GỬI BỘ MẪU MÀU SẮC CHO KHÁCH HÀNG', gioDk: 1, ngayBd: '01/11/2026', ngayKt: '01/11/2026', statusKey: 'CB', startDay: 0, endDay: 0 },
  { id: 'kg-2', stt: 2, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'GỬI BỘ MẪU CÂY CẢNH QUAN VÀ ÁNH SÁNG CHO KH', gioDk: 1, ngayBd: '01/11/2026', ngayKt: '01/11/2026', statusKey: 'CB', startDay: 0, endDay: 0 },
  { id: 'kg-3', stt: 3, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'GỬI THÔNG BÁO TỚI KHÁCH HÀNG VỀ VIỆC XÁC NHẬN ĐÚNG TIẾN ĐỘ', gioDk: 1, ngayBd: '03/11/2026', ngayKt: '03/11/2026', statusKey: 'CB', startDay: 3, endDay: 5 },
  { id: 'kg-4', stt: 4, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'THEO DÕI XÁC NHẬN CỦA KH ĐÚNG TIẾN ĐỘ', gioDk: 1, ngayBd: '03/11/2026', ngayKt: '03/11/2026', statusKey: 'CB', startDay: 3, endDay: 5 },
  { id: 'kg-5', stt: 5, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'GỬI THÔNG TIN XÁC NHẬN CỦA KH TỚI CÁC BỘ PHẬN', gioDk: 1, ngayBd: '05/11/2026', ngayKt: '05/11/2026', statusKey: 'CB', startDay: 3, endDay: 5 },
  { id: 'kg-6', stt: 6, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'THEO DÕI HỌP TRIỂN KHAI DỰ ÁN', gioDk: 1, ngayBd: '15/11/2026', ngayKt: '15/11/2026', statusKey: 'CB', startDay: 14, endDay: 16 },
  { id: 'kg-7', stt: 7, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'THEO DÕI TIẾN ĐỘ DỰ ÁN TUẦN 1', gioDk: 1, ngayBd: '16/11/2026', ngayKt: '16/11/2026', statusKey: 'CB', startDay: 16, endDay: 19 },
  { id: 'kg-8', stt: 8, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'THEO DÕI TIẾN ĐỘ DỰ ÁN TUẦN 2', gioDk: 1, ngayBd: '17/11/2026', ngayKt: '17/11/2026', statusKey: 'CB', startDay: 16, endDay: 19 },
  { id: 'kg-9', stt: 9, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'THEO DÕI TIẾN ĐỘ DỰ ÁN TUẦN 3', gioDk: 1, ngayBd: '18/11/2026', ngayKt: '18/11/2026', statusKey: 'CB', startDay: 16, endDay: 19 },
  { id: 'kg-10', stt: 10, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'THEO DÕI TIẾN ĐỘ DỰ ÁN MỨC NGHIỆM THU 80%', gioDk: 1, ngayBd: '19/11/2026', ngayKt: '19/11/2026', statusKey: 'CB', startDay: 16, endDay: 19 },
  { id: 'kg-11', stt: 11, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'GỬI MẪU BIÊN BẢN NGHIỆM THU 80% VÀ 100% TỚI KHÁCH HÀNG', gioDk: 1, ngayBd: '20/11/2026', ngayKt: '20/11/2026', statusKey: 'CB', startDay: 16, endDay: 19 },
  { id: 'kg-12', stt: 12, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'IN BIÊN BẢN NGHIỆM THU 80% ĐÃ THỐNG NHẤT VỚI KH', gioDk: 1, ngayBd: '21/11/2026', ngayKt: '21/11/2026', statusKey: 'CB', startDay: 16, endDay: 19 },
  { id: 'kg-13', stt: 13, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'TỔ CHỨC NGHIỆM THU 80%', gioDk: 1, ngayBd: '22/11/2026', ngayKt: '22/11/2026', statusKey: 'CB', startDay: 16, endDay: 19 },
  { id: 'kg-14', stt: 14, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'LẬP BIÊN BẢN NGHIỆM THU VÀ PHÊ DUYỆT NỘI BỘ', gioDk: 1, ngayBd: '22/11/2026', ngayKt: '22/11/2026', statusKey: 'CB', startDay: 22, endDay: 24 },
  { id: 'kg-15', stt: 15, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'GỬI BIÊN BẢN NGHIỆM THU 80% TỚI KH VÀ CÁC BỘ PHẬN', gioDk: 1, ngayBd: '23/11/2026', ngayKt: '23/11/2026', statusKey: 'CB', startDay: 23, endDay: 25 },
  { id: 'kg-16', stt: 16, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'THEO DÕI THANH TOÁN 80%', gioDk: 1, ngayBd: '24/11/2026', ngayKt: '24/11/2026', statusKey: 'CB', startDay: 24, endDay: 26 },
  { id: 'kg-17', stt: 17, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'THEO DÕI TIẾN ĐỘ DỰ ÁN MỨC NGHIỆM THU 100%', gioDk: 1, ngayBd: '25/11/2026', ngayKt: '25/11/2026', statusKey: 'CB', startDay: 25, endDay: 28 },
  { id: 'kg-18', stt: 18, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'IN BIÊN BẢN NGHIỆM THU 100% ĐÃ THỐNG NHẤT VỚI KH', gioDk: 1, ngayBd: '26/11/2026', ngayKt: '26/11/2026', statusKey: 'CB', startDay: 26, endDay: 28 },
  { id: 'kg-19', stt: 19, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'TỔ CHỨC NGHIỆM THU 100%', gioDk: 1, ngayBd: '27/11/2026', ngayKt: '27/11/2026', statusKey: 'CB', startDay: 27, endDay: 29 },
  { id: 'kg-20', stt: 20, phuTrach: 'Nguyễn Phú Quang', maDa: '26-2026/DA-MHV', tenCv: 'GỬI THƯ CẢM ƠN KH KHI NHẬN ĐỦ THANH TOÁN 100%', gioDk: 1, ngayBd: '28/11/2026', ngayKt: '28/11/2026', statusKey: 'CB', startDay: 28, endDay: 30 },

  // ── Project 2: DỰ ÁN THE HERITAGE TÂY NINH (14.02-2026/DA-MHV) [STT 21-42] ──
  ...Array.from({ length: 22 }, (_, idx) => {
    const stt = 21 + idx;
    const day = (idx % 28) + 1;
    return {
      id: `heritage-${stt}`,
      stt,
      phuTrach: 'Nguyễn Phú Quang',
      maDa: '14.02-2026/DA-MHV',
      tenCv: `THE HERITAGE - HẠNG MỤC CÔNG VIỆC #${idx + 1} TRIỂN KHAI SX`,
      gioDk: 1,
      ngayBd: `${String(day).padStart(2, '0')}/11/2026`,
      ngayKt: `${String(Math.min(30, day + 2)).padStart(2, '0')}/11/2026`,
      statusKey: 'CB' as const,
      startDay: day,
      endDay: Math.min(30, day + 2),
    };
  }),

  // ── Project 3: MÔ HÌNH QUY HOẠCH KĐT VSIP (21-2026/DA-MHV) [STT 43-64] ──
  ...Array.from({ length: 22 }, (_, idx) => {
    const stt = 43 + idx;
    const day = (idx % 27) + 2;
    return {
      id: `vsip-${stt}`,
      stt,
      phuTrach: 'Nguyễn Phú Quang',
      maDa: '21-2026/DA-MHV',
      tenCv: `VSIP KCN - BÁO CÁO CÔNG VIỆC PHÂN KHU #${idx + 1}`,
      gioDk: 1,
      ngayBd: `${String(day).padStart(2, '0')}/11/2026`,
      ngayKt: `${String(Math.min(30, day + 3)).padStart(2, '0')}/11/2026`,
      statusKey: 'CB' as const,
      startDay: day,
      endDay: Math.min(30, day + 3),
    };
  }),

  // ── Project 4: DỰ ÁN FLAMINGO ĐÔNG ANH (04-2026/DA-MHV) [STT 65-76] ──
  ...Array.from({ length: 12 }, (_, idx) => {
    const stt = 65 + idx;
    const day = (idx % 25) + 3;
    return {
      id: `flamingo-${stt}`,
      stt,
      phuTrach: 'Nguyễn Phú Quang',
      maDa: '04-2026/DA-MHV',
      tenCv: `FLAMINGO ĐÔNG ANH - PHỐI HỢP KỸ THUẬT #${idx + 1}`,
      gioDk: 1,
      ngayBd: `${String(day).padStart(2, '0')}/11/2026`,
      ngayKt: `${String(Math.min(30, day + 2)).padStart(2, '0')}/11/2026`,
      statusKey: 'CB' as const,
      startDay: day,
      endDay: Math.min(30, day + 2),
    };
  }),

  // ── Project 5: DỰ ÁN ECOPARK HẢI DƯƠNG (22-2026/DA-MHV) [STT 77-87] ──
  ...Array.from({ length: 11 }, (_, idx) => {
    const stt = 77 + idx;
    const day = (idx % 24) + 4;
    return {
      id: `ecopark-${stt}`,
      stt,
      phuTrach: 'Nguyễn Phú Quang',
      maDa: '22-2026/DA-MHV',
      tenCv: `ECOPARK HẢI DƯƠNG - HỒ SƠ PHÊ DUYỆT BÀN GIAO #${idx + 1}`,
      gioDk: 1,
      ngayBd: `${String(day).padStart(2, '0')}/11/2026`,
      ngayKt: `${String(Math.min(30, day + 2)).padStart(2, '0')}/11/2026`,
      statusKey: 'CB' as const,
      startDay: day,
      endDay: Math.min(30, day + 2),
    };
  }),
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function KeHoachCongViec() {
  const [activeDept, setActiveDept] = useState('vp');
  const [period, setPeriod]         = useState('T10-T11-T12/2026');
  const [duration, setDuration]     = useState('1 tháng');
  const [tasks, setTasks]           = useState<TaskPlanItem[]>(INITIAL_87_TASKS);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [sortField, setSortField]   = useState<keyof TaskPlanItem | null>(null);
  const [sortAsc, setSortAsc]       = useState(true);

  // Date filters from user screenshot
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter]     = useState('');

  const activeDeptLabel = DEPARTMENTS.find(d => d.id === activeDept)?.label ?? 'Khối Văn phòng';

  // Sorting
  const handleSort = (field: keyof TaskPlanItem) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // Date filter helper (convert DD/MM/YYYY to timestamp)
  const parseDateToMs = (dateStr: string) => {
    if (!dateStr) return 0;
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
    }
    return new Date(dateStr).getTime() || 0;
  };

  // Filter tasks by date range
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (!startDateFilter && !endDateFilter) return true;
      const taskStartMs = parseDateToMs(task.ngayBd);
      const startFilterMs = startDateFilter ? new Date(startDateFilter).getTime() : -Infinity;
      const endFilterMs = endDateFilter ? new Date(endDateFilter).getTime() + 86400000 : Infinity;
      return taskStartMs >= startFilterMs && taskStartMs <= endFilterMs;
    });
  }, [tasks, startDateFilter, endDateFilter]);

  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      if (!sortField) return a.stt - b.stt;
      const aVal = a[sortField] ?? '';
      const bVal = b[sortField] ?? '';
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortAsc ? aVal - bVal : bVal - aVal;
      }
      return sortAsc
        ? String(aVal).localeCompare(String(bVal), 'vi')
        : String(bVal).localeCompare(String(aVal), 'vi');
    });
  }, [filteredTasks, sortField, sortAsc]);

  // Edit Mode Actions
  const handleToggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };

  const handleSaveEdit = () => {
    setIsEditMode(false);
    alert('Đã lưu thành công các thay đổi trong bảng kế hoạch công việc!');
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handleUpdateTaskField = (id: string, field: keyof TaskPlanItem, value: any) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa dòng công việc này khỏi kế hoạch?')) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleAddNewTask = () => {
    const taskName = prompt('Nhập tên công việc mới:');
    if (!taskName) return;
    const nextStt = tasks.length > 0 ? Math.max(...tasks.map(t => t.stt)) + 1 : 1;
    const newTask: TaskPlanItem = {
      id: `task-${Date.now()}`,
      stt: nextStt,
      phuTrach: 'Nguyễn Phú Quang',
      maDa: '26-2026/DA-MHV',
      tenCv: taskName.trim().toUpperCase(),
      gioDk: 1,
      ngayBd: '01/11/2026',
      ngayKt: '01/11/2026',
      statusKey: 'CB',
      startDay: 1,
      endDay: 3,
    };
    setTasks(prev => [newTask, ...prev]);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 text-left font-sans select-none overflow-hidden space-y-2">

      {/* ── ROW 1: Title + Period dropdowns ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Kế hoạch công việc — T11/2026
        </h2>
        <div className="flex items-center gap-2">
          {/* Period selector */}
          <div className="relative">
            <select
              value={period}
              onChange={e => setPeriod(e.target.value)}
              className="appearance-none pl-2.5 pr-6 py-1 text-[11px] font-medium bg-white border border-slate-200 rounded-md text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-400 cursor-pointer shadow-2xs"
            >
              <option>T10-T11-T12/2026</option>
              <option>T7-T8-T9/2026</option>
              <option>T4-T5-T6/2026</option>
            </select>
            <IconChevronDown size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          {/* Duration selector */}
          <div className="relative">
            <select
              value={duration}
              onChange={e => setDuration(e.target.value)}
              className="appearance-none pl-2.5 pr-6 py-1 text-[11px] font-medium bg-white border border-slate-200 rounded-md text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-400 cursor-pointer shadow-2xs"
            >
              <option>1 tháng</option>
              <option>3 tháng</option>
            </select>
            <IconChevronDown size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── ROW 2: Department pills + NÚT SỬA BẢNG KẾ HOẠCH (AS SHOWN IN USER IMAGE) ── */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {DEPARTMENTS.map(dept => (
          <button
            key={dept.id}
            onClick={() => setActiveDept(dept.id)}
            className={`px-3 py-1 text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
              activeDept === dept.id ? dept.activeColor : dept.color
            }`}
          >
            {dept.label}
          </button>
        ))}

        {/* ── NÚT SỬA BẢNG KẾ HOẠCH NẰM BÊN PHẢI (RIGHT-ALIGNED) ── */}
        {!isEditMode ? (
          <button
            type="button"
            onClick={handleToggleEditMode}
            className="ml-auto flex items-center gap-1.5 px-3.5 py-1.5 bg-[#406c89] hover:bg-[#345972] active:scale-95 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
            title="Nhấp để bật chế độ chỉnh sửa bảng kế hoạch"
          >
            <IconPencil size={14} />
            <span>Sửa bảng kế hoạch</span>
          </button>
        ) : (
          <div className="ml-auto flex items-center gap-1.5 whitespace-nowrap">
            <button
              type="button"
              onClick={handleSaveEdit}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <IconCheck size={14} />
              <span>Lưu bảng</span>
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
            >
              <IconX size={14} />
              <span>Hủy</span>
            </button>
          </div>
        )}
      </div>

      {/* ── ROW 3: Action buttons (Đồng bộ chi tiết TĐ, Đồng bộ KH Kinh doanh, Quản lý nhóm) ── */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => alert('Đang đồng bộ chi tiết tiến độ dự án...')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200/90 rounded-lg text-slate-700 hover:bg-slate-50 transition-all shadow-2xs cursor-pointer"
        >
          <IconCloudDownload size={14} className="text-slate-500" />
          <span>Đồng bộ chi tiết TĐ</span>
        </button>

        <button
          type="button"
          onClick={() => alert('Đang đồng bộ kế hoạch kinh doanh...')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200/90 rounded-lg text-slate-700 hover:bg-slate-50 transition-all shadow-2xs cursor-pointer"
        >
          <IconArrowsExchange size={14} className="text-slate-500" />
          <span>Đồng bộ KH Kinh doanh</span>
        </button>

        <button
          type="button"
          onClick={() => alert('Mở cấu hình quản lý nhóm')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200/90 rounded-lg text-slate-700 hover:bg-slate-50 transition-all shadow-2xs cursor-pointer"
        >
          <IconSettings size={14} className="text-slate-500" />
          <span>Quản lý nhóm</span>
        </button>
      </div>

      {/* ── MAIN PANEL ── */}
      <div className="flex-1 flex flex-col min-h-0 border border-slate-200 rounded-lg bg-white overflow-hidden shadow-2xs">

        {/* Panel header (Kế hoạch công việc — Khối Văn phòng (87 CV) + In PDF / Toàn màn hình) */}
        <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-200 shrink-0">
          <span className="text-sm font-bold text-slate-800 tracking-tight">
            Kế hoạch công việc — {activeDeptLabel} ({filteredTasks.length} CV)
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-all shadow-2xs cursor-pointer"
            >
              <IconPrinter size={14} className="text-slate-500" />
              <span>In PDF</span>
            </button>
            <button
              type="button"
              onClick={() => alert('Chế độ toàn màn hình')}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-all shadow-2xs cursor-pointer"
            >
              <IconArrowsMaximize size={14} className="text-slate-500" />
              <span>Toàn màn hình</span>
            </button>
          </div>
        </div>

        {/* Date Filter Bar (Lọc công việc theo ngày: mm/dd/yyyy -> mm/dd/yyyy - hiển thị 87 công việc) */}
        <div className="flex flex-wrap items-center gap-2 px-3.5 py-2 border-b border-slate-100 bg-slate-50/60 text-xs text-slate-600">
          <span className="font-semibold text-slate-700">Lọc công việc theo ngày:</span>
          <div className="flex items-center gap-1.5">
            <input
              type="date"
              value={startDateFilter}
              onChange={(e) => setStartDateFilter(e.target.value)}
              className="px-2.5 py-1 text-xs bg-white border border-slate-200 rounded-md text-slate-700 focus:outline-none focus:border-indigo-500 shadow-2xs cursor-pointer"
            />
            <span className="text-slate-400 font-semibold">→</span>
            <input
              type="date"
              value={endDateFilter}
              onChange={(e) => setEndDateFilter(e.target.value)}
              className="px-2.5 py-1 text-xs bg-white border border-slate-200 rounded-md text-slate-700 focus:outline-none focus:border-indigo-500 shadow-2xs cursor-pointer"
            />
          </div>
          <span className="text-slate-500">
            — hiển thị <strong className="text-slate-800">{filteredTasks.length}</strong> công việc
          </span>
          {(startDateFilter || endDateFilter) && (
            <button
              type="button"
              onClick={() => {
                setStartDateFilter('');
                setEndDateFilter('');
              }}
              className="text-xs text-rose-500 hover:underline font-semibold ml-1 cursor-pointer"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Legend row & Edit mode notification */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100 shrink-0 flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {LEGEND.map(item => (
              <span
                key={item.key}
                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${item.color}`}
              >
                {item.key} = {item.label}
              </span>
            ))}
            <span className="text-[11px] text-slate-500 font-medium ml-2">
              Phụ trách chính: <strong className="text-slate-800">Nguyễn Phú Quang</strong>
            </span>
          </div>

          {isEditMode && (
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full animate-pulse">
              ✏️ Chế độ chỉnh sửa đang bật — Bạn có thể chỉnh sửa trực tiếp nội dung trên bảng
            </span>
          )}
        </div>

        {/* Gantt table */}
        <div className="flex-1 overflow-auto min-h-0 [scrollbar-width:thin]">
          <table className="w-full border-collapse text-[11px] min-w-[1250px]">
            <thead className="sticky top-0 z-20">
              {/* Title row */}
              <tr>
                <th
                  colSpan={(isEditMode ? 8 : 7) + TOTAL_DAYS}
                  className="bg-[#1a4a6b] text-white text-center py-2 font-bold text-[12px] tracking-wider uppercase shadow-xs"
                >
                  BẢNG KẾ HOẠCH CÔNG VIỆC THÁNG 11 NĂM 2026 — {activeDeptLabel.toUpperCase()}
                </th>
              </tr>

              {/* Column headers row 1 */}
              <tr className="bg-[#dce8f0] border-b border-slate-300 select-none">
                <th className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-700 w-9" rowSpan={2}>
                  STT
                </th>
                <th
                  onClick={() => handleSort('phuTrach')}
                  className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-700 min-w-[130px] cursor-pointer hover:bg-[#cfdfec] transition-colors"
                  rowSpan={2}
                >
                  <span className="flex items-center justify-center gap-0.5">
                    PHỤ TRÁCH <IconArrowsUpDown size={10} className="text-slate-400" />
                  </span>
                </th>
                <th
                  onClick={() => handleSort('maDa')}
                  className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-700 min-w-[110px] cursor-pointer hover:bg-[#cfdfec] transition-colors"
                  rowSpan={2}
                >
                  <span className="flex items-center justify-center gap-0.5">
                    MÃ DA <IconArrowsUpDown size={10} className="text-slate-400" />
                  </span>
                </th>
                <th
                  onClick={() => handleSort('tenCv')}
                  className="border border-slate-300 px-3 py-1.5 text-center font-bold text-slate-700 min-w-[280px] cursor-pointer hover:bg-[#cfdfec] transition-colors"
                  rowSpan={2}
                >
                  <span className="flex items-center justify-center gap-0.5">
                    TÊN CV <IconArrowsUpDown size={10} className="text-slate-400" />
                  </span>
                </th>
                <th
                  onClick={() => handleSort('gioDk')}
                  className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-700 w-14 cursor-pointer hover:bg-[#cfdfec] transition-colors"
                  rowSpan={2}
                >
                  <span className="flex items-center justify-center gap-0.5">
                    GIỜ DK <IconArrowsUpDown size={10} className="text-slate-400" />
                  </span>
                </th>
                <th
                  onClick={() => handleSort('ngayBd')}
                  className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-700 w-22 cursor-pointer hover:bg-[#cfdfec] transition-colors"
                  rowSpan={2}
                >
                  <span className="flex items-center justify-center gap-0.5">
                    NGÀY BĐ <IconArrowsUpDown size={10} className="text-slate-400" />
                  </span>
                </th>
                <th
                  onClick={() => handleSort('ngayKt')}
                  className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-700 w-22 cursor-pointer hover:bg-[#cfdfec] transition-colors"
                  rowSpan={2}
                >
                  <span className="flex items-center justify-center gap-0.5">
                    NGÀY KT <IconArrowsUpDown size={10} className="text-slate-400" />
                  </span>
                </th>

                {/* Extra Thao Tác column in Edit Mode */}
                {isEditMode && (
                  <th className="border border-slate-300 px-2 py-1.5 text-center font-bold text-rose-600 bg-rose-50 w-16" rowSpan={2}>
                    THAO TÁC
                  </th>
                )}

                <th
                  colSpan={TOTAL_DAYS}
                  className="border border-slate-300 px-2 py-1 text-center font-bold text-slate-800 bg-[#f5c518]/40"
                >
                  THÁNG 11/2026
                </th>
              </tr>

              {/* Week columns row */}
              <tr className="bg-[#f5c518]/25 select-none border-b border-slate-300">
                {WEEKS_IN_NOV.map((w) => (
                  <th
                    key={w.label}
                    colSpan={w.daysCount}
                    className="border border-slate-300 text-center font-bold text-slate-700 py-0.5 text-[10px]"
                  >
                    {w.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Row: + Thêm dòng (top action) */}
              <tr className="border-b border-slate-200 bg-white hover:bg-slate-50/60 transition-colors">
                <td colSpan={(isEditMode ? 8 : 7) + TOTAL_DAYS} className="px-3 py-1.5 text-left">
                  <button
                    type="button"
                    onClick={handleAddNewTask}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-sky-700 cursor-pointer transition-colors"
                  >
                    <IconPlus size={12} className="text-slate-400" />
                    <span>Thêm dòng</span>
                  </button>
                </td>
              </tr>

              {/* Section Header: II - DỰ ÁN ĐANG TRIỂN KHAI */}
              <tr className="bg-[#1f5429] text-white">
                <td
                  colSpan={(isEditMode ? 8 : 7) + TOTAL_DAYS}
                  className="px-3 py-1 font-bold text-[11px] tracking-wide uppercase select-none border-t border-b border-[#173e1f]"
                >
                  II - DỰ ÁN ĐANG TRIỂN KHAI
                </td>
              </tr>

              {/* Project Subheader: KIEN GIANG MASTER PLAN PROJECT MODEL */}
              <tr className="bg-[#b38828] text-white">
                <td
                  colSpan={(isEditMode ? 8 : 7) + TOTAL_DAYS}
                  className="px-3 py-1 font-bold text-[11px] tracking-wider uppercase select-none border-b border-[#96711f]"
                >
                  KIEN GIANG MASTER PLAN PROJECT MODEL | 26-2026/DA-MHV | 2600X1800MM | 1/600
                </td>
              </tr>

              {/* Data Rows */}
              {sortedTasks.map((task) => (
                <tr
                  key={task.id}
                  className={`border-b border-slate-200 transition-colors ${
                    isEditMode ? 'hover:bg-amber-50/40 bg-amber-50/10' : 'hover:bg-slate-50/70 bg-white'
                  }`}
                >
                  {/* STT */}
                  <td className="border-r border-slate-200 px-1 py-1 text-center font-medium text-slate-700">
                    {task.stt}
                  </td>

                  {/* PHỤ TRÁCH (Blue block as shown in user's image) */}
                  <td className="border-r border-slate-200 px-1.5 py-1 text-center">
                    <div className="bg-[#2c6596] text-white text-[10.5px] font-semibold py-1 px-2 rounded text-center whitespace-nowrap shadow-2xs">
                      {task.phuTrach}
                    </div>
                  </td>

                  {/* MÃ DA */}
                  <td className="border-r border-slate-200 px-2 py-1 text-center font-mono text-slate-700 text-[10.5px] whitespace-nowrap">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={task.maDa}
                        onChange={(e) => handleUpdateTaskField(task.id, 'maDa', e.target.value)}
                        className="w-full text-center font-mono text-[10.5px] px-1 py-0.5 border border-slate-300 rounded focus:border-indigo-500 bg-white"
                      />
                    ) : (
                      task.maDa
                    )}
                  </td>

                  {/* TÊN CV */}
                  <td className="border-r border-slate-200 px-2.5 py-1 text-left font-bold text-slate-800 text-[10.5px] leading-tight">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={task.tenCv}
                        onChange={(e) => handleUpdateTaskField(task.id, 'tenCv', e.target.value)}
                        className="w-full font-bold text-slate-800 text-[10.5px] px-2 py-0.5 border border-slate-300 rounded focus:border-indigo-500 bg-white"
                      />
                    ) : (
                      task.tenCv
                    )}
                  </td>

                  {/* GIỜ DK */}
                  <td className="border-r border-slate-200 px-1 py-1 text-center font-semibold text-slate-700">
                    {isEditMode ? (
                      <input
                        type="number"
                        min={0}
                        value={task.gioDk}
                        onChange={(e) => handleUpdateTaskField(task.id, 'gioDk', parseInt(e.target.value) || 0)}
                        className="w-12 text-center font-semibold text-slate-700 px-1 py-0.5 border border-slate-300 rounded focus:border-indigo-500 bg-white"
                      />
                    ) : (
                      task.gioDk
                    )}
                  </td>

                  {/* NGÀY BĐ */}
                  <td className="border-r border-slate-200 px-1.5 py-1 text-center font-mono text-[10.5px] text-slate-600 whitespace-nowrap">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={task.ngayBd}
                        onChange={(e) => handleUpdateTaskField(task.id, 'ngayBd', e.target.value)}
                        className="w-20 text-center font-mono text-[10.5px] px-1 py-0.5 border border-slate-300 rounded focus:border-indigo-500 bg-white"
                      />
                    ) : (
                      task.ngayBd
                    )}
                  </td>

                  {/* NGÀY KT */}
                  <td className="border-r border-slate-200 px-1.5 py-1 text-center font-mono text-[10.5px] text-slate-600 whitespace-nowrap">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={task.ngayKt}
                        onChange={(e) => handleUpdateTaskField(task.id, 'ngayKt', e.target.value)}
                        className="w-20 text-center font-mono text-[10.5px] px-1 py-0.5 border border-slate-300 rounded focus:border-indigo-500 bg-white"
                      />
                    ) : (
                      task.ngayKt
                    )}
                  </td>

                  {/* THAO TÁC (in edit mode) */}
                  {isEditMode && (
                    <td className="border-r border-slate-200 px-1 py-1 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                        title="Xóa công việc"
                      >
                        <IconTrash size={13} />
                      </button>
                    </td>
                  )}

                  {/* 30 Day Columns for Gantt Timeline */}
                  {Array.from({ length: TOTAL_DAYS }, (_, idx) => {
                    const day = idx + 1;
                    const isInsideBar = task.startDay > 0 && day >= task.startDay && day <= task.endDay;
                    const isStartCell = day === task.startDay;

                    return (
                      <td
                        key={day}
                        className={`border-r border-slate-200/80 text-center p-0 h-7 min-w-[18px] ${
                          isInsideBar
                            ? 'bg-[#8fa4b8] border-t border-b border-slate-300'
                            : 'bg-white'
                        }`}
                      >
                        {isInsideBar && isStartCell && (
                          <div className="flex items-center justify-center w-full h-full">
                            <span className="text-[9px] font-bold text-slate-900 select-none">
                              {task.statusKey}
                            </span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Bottom Add Row for current project */}
              <tr className="border-b border-slate-200 bg-white hover:bg-slate-50/50 transition-colors">
                <td colSpan={(isEditMode ? 8 : 7) + TOTAL_DAYS} className="px-3 py-1">
                  <button
                    type="button"
                    onClick={handleAddNewTask}
                    className="flex items-center gap-1 text-[11px] text-sky-600 hover:text-sky-700 font-medium cursor-pointer transition-colors"
                  >
                    <IconPlus size={12} />
                    <span>Thêm dòng</span>
                  </button>
                </td>
              </tr>

              {/* Other Project Groups (Placeholders for full workflow) */}
              {[
                { id: 'III', label: 'III - DỰ ÁN DỰ KIẾN TRIỂN KHAI', bg: 'bg-[#1f5429]' },
                { id: 'V',   label: 'V - DỰ ÁN ĐÃ BÁO GIÁ VÀ ĐANG THEO DÕI', bg: 'bg-[#7d8c2e]' },
                { id: 'VI',  label: 'VI - DỰ ÁN MỚI LIÊN HỆ VÀ ĐANG BÁO GIÁ', bg: 'bg-[#8c8c8c]' },
              ].map(group => (
                <React.Fragment key={group.id}>
                  <tr className={`${group.bg} text-white`}>
                    <td
                      colSpan={(isEditMode ? 8 : 7) + TOTAL_DAYS}
                      className="px-3 py-1 font-bold text-[11px] tracking-wide uppercase select-none"
                    >
                      {group.label}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td colSpan={(isEditMode ? 8 : 7) + TOTAL_DAYS} className="px-3 py-1">
                      <button
                        type="button"
                        onClick={handleAddNewTask}
                        className="flex items-center gap-1 text-[11px] text-sky-600 hover:text-sky-700 font-medium cursor-pointer transition-colors"
                      >
                        <IconPlus size={12} />
                        <span>Thêm dòng</span>
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
