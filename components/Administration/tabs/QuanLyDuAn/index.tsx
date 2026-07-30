"use client";

import React, { useState, useEffect } from 'react';
import TaoDuAnModal from './modal/TaoDuAn';
import QuanLyTemplateModal from './modal/QuanLyTemplate';
import XoaDuAnModal from './modal/XoaDuAn';
import ChiTietDuAn from './ChiTietDuAn';
import {
  IconPlus,
  IconSearch,
  IconTrash,
  IconChevronRight,
  IconClipboardList,
  IconArrowRight,
  IconFlag,
  IconBooks,
  IconCopy,
} from '@tabler/icons-react';

export interface MilestoneItem {
  id: string;
  label: string;
  dateText: string;
  positionPercent: number; // e.g. 75 (%)
  color: 'blue' | 'red';
}

export interface DuAnItem {
  id: string;
  maDuAn: string;
  tenDuAn: string;
  moTa: string;
  ngayBatDau: string;
  ngayKetThuc: string;
  tienDo: number; // 0 - 100
  indexText: string; // e.g. "—", "6", "5"
  trangThai: 'Đang thực hiện' | 'Hoàn thành' | 'Tạm dừng' | 'Chưa bắt đầu';
  tienDoText: 'Chưa đánh giá' | 'Đúng tiến độ' | 'Trễ tiến độ' | 'Vượt tiến độ' | 'Chậm tiến độ, lỗi khách quan';
  milestones?: MilestoneItem[];
  diaDiem?: string;
  baselineBatDau?: string;
  baselineKetThuc?: string;
  ycsxId?: string;
  templateId?: string;
  capDoDuAn?: string;
  tyLe?: string;
  kichThuoc?: string;
  khachHang?: string;
  diaDiemLapDat?: string;
  duKienNtLan1?: string;
  duKienNtCuoi?: string;
  duKienVanChuyen?: string;
  duKienLapDat?: string;
  soNvLapDat?: string;
  khoiLuongNtLan1?: string;
}

const DEFAULT_PROJECTS: DuAnItem[] = [
  {
    id: 'da-1',
    maDuAn: 'CT00-2026/DA-MHV',
    tenDuAn: 'BÁO CÁO NGOÀI DỰ ÁN',
    moTa: 'Báo cáo các công việc không thuộc các dự án đã có mã mã dự án triển khai sản xuất',
    ngayBatDau: '2026-07-01',
    ngayKetThuc: '2026-12-31',
    tienDo: 4,
    indexText: '—',
    trangThai: 'Đang thực hiện',
    tienDoText: 'Chưa đánh giá',
    khachHang: 'Nội bộ',
  },
  {
    id: 'da-2',
    maDuAn: '14.02-2026/DA-MHV',
    tenDuAn: 'THE HERITAGE TÂY NINH - Lắp đặt tại Tây Ninh',
    moTa: 'Mô hình QH Khu đô thị lớn. Phong cách kiến trúc đa dạng. Tổng thể chia thành 03 phân khu. Điểm nhấn cảnh quan là công viên trải nghiệm...',
    ngayBatDau: '2026-04-18',
    ngayKetThuc: '2026-08-08',
    tienDo: 28,
    indexText: '6',
    trangThai: 'Đang thực hiện',
    tienDoText: 'Đúng tiến độ',
    khachHang: 'Heritage Group',
    milestones: [
      { id: 'ms-1', label: 'NT lần 1', dateText: '03-08', positionPercent: 80, color: 'blue' },
      { id: 'ms-2', label: 'NT cuối', dateText: '08-08', positionPercent: 92, color: 'red' }
    ]
  },
  {
    id: 'da-3',
    maDuAn: '14.01-2026/DA-MHV',
    tenDuAn: 'THE HERITAGE TÂY NINH - Lắp đặt tại Hà Nội',
    moTa: 'Mô hình QH Khu đô thị lớn. Phong cách kiến trúc đa dạng. Tổng thể chia thành 03 phân khu. Điểm nhấn cảnh quan là công viên trải nghiệm...',
    ngayBatDau: '2026-04-18',
    ngayKetThuc: '2026-07-21',
    tienDo: 71,
    indexText: '5',
    trangThai: 'Đang thực hiện',
    tienDoText: 'Đúng tiến độ',
    khachHang: 'Heritage Group',
    milestones: [
      { id: 'ms-1', label: 'NT lần 1', dateText: '17-07', positionPercent: 88, color: 'blue' },
      { id: 'ms-2', label: 'NT cuối', dateText: '21-07', positionPercent: 95, color: 'red' }
    ]
  },
  {
    id: 'da-4',
    maDuAn: '17-2026/DA-MHV',
    tenDuAn: 'HERITAGE VILLAGE MOC CHAU',
    moTa: 'Mô hình QH KĐT nghỉ dưỡng trên núi',
    ngayBatDau: '2026-05-18',
    ngayKetThuc: '2026-06-22',
    tienDo: 57,
    indexText: '3',
    trangThai: 'Đang thực hiện',
    tienDoText: 'Đúng tiến độ',
    khachHang: 'Heritage Group',
    milestones: [
      { id: 'ms-1', label: 'NT lần 1', dateText: '17-07', positionPercent: 80, color: 'blue' },
      { id: 'ms-2', label: 'NT cuối', dateText: '20-07', positionPercent: 96, color: 'red' }
    ]
  },
  {
    id: 'da-5',
    maDuAn: '16-2026/DA-MHV',
    tenDuAn: 'Dự án IA25 -CIPUTRA',
    moTa: 'Mô hình công trình cao tầng',
    ngayBatDau: '2026-05-15',
    ngayKetThuc: '2026-08-15',
    tienDo: 42,
    indexText: '7',
    trangThai: 'Đang thực hiện',
    tienDoText: 'Đúng tiến độ',
    khachHang: 'Ciputra',
    milestones: [
      { id: 'ms-1', label: 'NT lần 1', dateText: '07-08', positionPercent: 92, color: 'blue' },
      { id: 'ms-2', label: 'NT cuối', dateText: '15-08', positionPercent: 97, color: 'red' }
    ]
  },
  {
    id: 'da-6',
    maDuAn: '20-2026/DA-MHV',
    tenDuAn: "CHỈNH SỬA MÔ HÌNH L'AURORA",
    moTa: 'Thay mới 05 công trình cao tầng 1/150',
    ngayBatDau: '2026-06-09',
    ngayKetThuc: '2026-07-22',
    tienDo: 51,
    indexText: '4',
    trangThai: 'Đang thực hiện',
    tienDoText: 'Đúng tiến độ',
    khachHang: 'L\'Aurora',
    milestones: [
      { id: 'ms-1', label: 'NT lần 1', dateText: '20-07', positionPercent: 90, color: 'blue' },
      { id: 'ms-2', label: 'NT cuối', dateText: '20-07', positionPercent: 96, color: 'red' }
    ]
  },
  {
    id: 'da-7',
    maDuAn: '21-2026/DA-MHV',
    tenDuAn: 'VSIP LẠNG SƠN',
    moTa: 'Mô hình QH KCN',
    ngayBatDau: '2026-06-15',
    ngayKetThuc: '2026-07-22',
    tienDo: 78,
    indexText: '1',
    trangThai: 'Đang thực hiện',
    tienDoText: 'Vượt tiến độ',
    khachHang: 'VSIP',
    milestones: [
      { id: 'ms-1', label: 'NT lần 1', dateText: '03-07', positionPercent: 55, color: 'blue' },
      { id: 'ms-2', label: 'NT cuối', dateText: '13-07', positionPercent: 90, color: 'red' }
    ]
  },
  {
    id: 'da-8',
    maDuAn: '03-2026/DA-MHV',
    tenDuAn: '22 LIỄU GIAI',
    moTa: 'Mô hình công trình cao tầng. Tỷ lệ 1/75. Thể hiện nội thất dạng hình khối đơn giản của 40 căn hộ/ không gian bên trong công trình. Nội thất...',
    ngayBatDau: '2026-03-13',
    ngayKetThuc: '2026-07-22',
    tienDo: 86,
    indexText: '2',
    trangThai: 'Đang thực hiện',
    tienDoText: 'Đúng tiến độ',
    khachHang: '22 Liễu Giai',
    milestones: [
      { id: 'ms-1', label: 'NT lần 1', dateText: '10-06', positionPercent: 80, color: 'blue' },
      { id: 'ms-2', label: 'NT cuối', dateText: '13-07', positionPercent: 90, color: 'red' }
    ]
  },
  {
    id: 'da-9',
    maDuAn: '04-2026/DA-MHV',
    tenDuAn: 'FLAMINGO ĐÔNG ANH',
    moTa: '',
    ngayBatDau: '2026-06-28',
    ngayKetThuc: '2026-08-27',
    tienDo: 9,
    indexText: '8',
    trangThai: 'Đang thực hiện',
    tienDoText: 'Chậm tiến độ, lỗi khách quan',
    khachHang: 'Flamingo',
    milestones: [
      { id: 'ms-1', label: 'NT lần 1', dateText: '07-08', positionPercent: 65, color: 'blue' },
      { id: 'ms-2', label: 'NT cuối', dateText: '27-08', positionPercent: 95, color: 'red' }
    ]
  },
  {
    id: 'da-10',
    maDuAn: '22-2026/DA-MHV',
    tenDuAn: 'ECOPARK HẢI DƯƠNG',
    moTa: 'Mô hình khu đô thị sinh thái ven sông',
    ngayBatDau: '2026-07-01',
    ngayKetThuc: '2026-10-01',
    tienDo: 5,
    indexText: '9',
    trangThai: 'Đang thực hiện',
    tienDoText: 'Đúng tiến độ',
    khachHang: 'Ecopark',
    milestones: [
      { id: 'ms-1', label: 'NT lần 1', dateText: '15-09', positionPercent: 75, color: 'blue' },
      { id: 'ms-2', label: 'NT cuối', dateText: '01-10', positionPercent: 95, color: 'red' }
    ]
  }
];

// Department data for "Chờ khởi tạo theo Phòng ban"
interface DeptItem {
  id: string;
  name: string;
  count: number;
}

const DEPARTMENTS: DeptItem[] = [
  { id: 'bgd', name: 'Ban Giám đốc', count: 1 },
  { id: 'kvp', name: 'Khối Văn phòng', count: 7 },
  { id: 'pkt', name: 'Phòng Khai triển', count: 1 },
  { id: 'pcat', name: 'Phòng Cắt', count: 5 },
  { id: 'pghep', name: 'Phòng Ghép', count: 1 },
  { id: 'pms', name: 'Phòng Mộc Sơn', count: 2 },
  { id: 'pdien', name: 'Phòng Điện', count: 1 },
  { id: 'pcq', name: 'Phòng Cảnh Quan', count: 0 },
  { id: 'pcntkiet', name: 'Phòng Công nghệ và Thiết kế', count: 7 },
];

type SortKeyType = 'maDuAn' | 'tenDuAn' | 'tienDo' | 'indexText' | 'trangThai' | 'khachHang' | 'ngayBatDau' | 'ngayKetThuc' | 'tienDoText' | null;

export default function QuanLyDuAn() {
  const [projects, setProjects] = useState<DuAnItem[]>(DEFAULT_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<DuAnItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKeyType>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  // Sync selected project strictly with URL query parameter (?id=...)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkUrlParam = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const paramId = urlParams.get('id');
      if (paramId) {
        const found = DEFAULT_PROJECTS.find(p => p.id === paramId || p.maDuAn === paramId);
        setSelectedProject(found || null);
      } else {
        setSelectedProject(null);
      }
    };

    checkUrlParam();

    window.addEventListener('popstate', checkUrlParam);
    return () => window.removeEventListener('popstate', checkUrlParam);
  }, []);

  const handleSelectProject = (item: DuAnItem) => {
    setSelectedProject(item);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('id', item.id);
      window.history.pushState({}, '', url.toString());
    }
  };

  const handleBack = () => {
    setSelectedProject(null);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('id');
      window.history.pushState({}, '', url.toString());
    }
  };

  // Modal creation states
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingProject, setDeletingProject] = useState<DuAnItem | null>(null);

  const handleOpenDeleteModal = (item: DuAnItem) => {
    setDeletingProject(item);
    setIsDeleteModalOpen(true);
  };

  // --- Handlers ---
  const handleCreateProject = (data: {
    maDuAn: string;
    tenDuAn: string;
    moTa: string;
    ngayBatDau: string;
    ngayKetThuc: string;
    tienDo: number;
    indexText: string;
    trangThai: 'Đang thực hiện' | 'Hoàn thành' | 'Tạm dừng' | 'Chưa bắt đầu';
    tienDoText: 'Chưa đánh giá' | 'Đúng tiến độ' | 'Trễ tiến độ' | 'Vượt tiến độ' | 'Chậm tiến độ, lỗi khách quan';
    diaDiem?: string;
    baselineBatDau?: string;
    baselineKetThuc?: string;
    ycsxId?: string;
    templateId?: string;
    khachHang?: string;
    tyLe?: string;
    kichThuoc?: string;
    capDoDuAn?: string;
    diaDiemLapDat?: string;
    duKienNtLan1?: string;
    duKienNtCuoi?: string;
    duKienVanChuyen?: string;
    duKienLapDat?: string;
    soNvLapDat?: string;
    khoiLuongNtLan1?: string;
  }) => {
    const newProj: DuAnItem = {
      id: `da-${Date.now()}`,
      ...data,
      milestones: data.tienDoText === 'Đúng tiến độ' ? [
        { id: 'ms-1', label: 'NT lần 1', dateText: '15-08', positionPercent: 70, color: 'blue' },
        { id: 'ms-2', label: 'NT cuối', dateText: '30-08', positionPercent: 90, color: 'red' }
      ] : undefined
    };

    setProjects(prev => [newProj, ...prev]);
    setIsProjectModalOpen(false);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa dự án này?")) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  // --- Filtering & Sorting ---
  const filtered = projects.filter(item => {
    const q = searchQuery.toLowerCase();
    return (
      item.maDuAn.toLowerCase().includes(q) ||
      item.tenDuAn.toLowerCase().includes(q)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    if (sortKey === 'tienDo') {
      return sortDir === 'asc' ? a.tienDo - b.tienDo : b.tienDo - a.tienDo;
    }
    const va = (a[sortKey] ?? '').toString().toLowerCase();
    const vb = (b[sortKey] ?? '').toString().toLowerCase();
    return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  const handleSort = (key: NonNullable<SortKeyType>) => {
    if (sortKey === key) {
      if (sortDir === 'asc') {
        setSortDir('desc');
      } else {
        setSortKey(null);
      }
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  // --- Counters ---
  const countTotal = projects.length;
  const countChoKhoiTao = DEPARTMENTS.reduce((sum, d) => sum + d.count, 0);
  const countDangThucHien = projects.filter(p => p.trangThai === 'Đang thực hiện').length;
  const countHoanThanh = projects.filter(p => p.trangThai === 'Hoàn thành').length;
  const countTamDung = projects.filter(p => p.trangThai === 'Tạm dừng').length;

  // Format Helper for Date
  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parseInt(parts[2])}/${parseInt(parts[1])}/${parts[0]}`;
    }
    return dateString;
  };

  // Helper for progress bar color logic
  const getProgressColorClass = (tienDo: number, evalText: string) => {
    if (evalText === 'Chưa đánh giá') return 'bg-slate-300';
    if (tienDo <= 10) return 'bg-slate-300';
    if (tienDo < 60) return 'bg-[#f97316]';
    return 'bg-blue-600/90';
  };

  const sortButtons: { key: NonNullable<SortKeyType>; label: string }[] = [
    { key: 'maDuAn', label: 'Mã dự án' },
    { key: 'tenDuAn', label: 'Tên dự án' },
    { key: 'tienDo', label: 'KL hoàn thành' },
    { key: 'indexText', label: 'Ưu tiên' },
    { key: 'trangThai', label: 'Trạng thái' },
    { key: 'khachHang', label: 'Khách hàng' },
    { key: 'ngayBatDau', label: 'Ngày bắt đầu' },
    { key: 'ngayKetThuc', label: 'Ngày kết thúc' },
    { key: 'tienDoText', label: 'Đánh giá' },
  ];

  if (selectedProject) {
    return (
      <ChiTietDuAn
        project={selectedProject}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden text-slate-700 w-full bg-slate-50">

      {/* ══ ZONE 1: FIXED TOP HEADER ══ */}
      <div className="shrink-0 bg-slate-50 border-b border-slate-200/80 px-4 sm:px-6 pt-4 pb-3 z-30 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-tight">Quản lý Dự án</h2>
          <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none]">
            <button
              type="button"
              onClick={() => setIsTemplateModalOpen(true)}
              className="flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 bg-[#ba8e3a] hover:bg-[#a87d2f] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm border border-[#a3792c] transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <IconBooks size={16} />
              <span>Quản lý Template DA</span>
            </button>
            <button
              type="button"
              onClick={() => setIsProjectModalOpen(true)}
              className="flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <IconPlus size={15} />
              <span>Tạo Dự án</span>
            </button>
          </div>
        </div>
      </div>

      {/* ══ ZONE 2: SCROLLABLE BODY ══ */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pt-4 pb-6 space-y-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

        {/* 1. Workflow Bar */}
        <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-3 flex items-center gap-2 overflow-x-auto shadow-xs [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {[
            { label: 'Tạo YCSX', color: 'text-purple-700 bg-purple-50 border-purple-200' },
            { label: 'PGD đã duyệt YCSX', color: 'text-orange-600 bg-orange-50 border-orange-200' },
            { label: 'Khởi tạo Dự án từ YCSX', color: 'text-blue-700 bg-blue-50 border-blue-200' },
          ].map((step, i) => (
            <React.Fragment key={i}>
              <span className={`${step.color} border font-semibold px-3 py-1.5 rounded-lg text-xs whitespace-nowrap shrink-0`}>
                {step.label}
              </span>
              <IconArrowRight size={13} className="text-slate-300 shrink-0" />
            </React.Fragment>
          ))}
          <span className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-300 text-indigo-700 font-semibold px-3 py-1.5 rounded-lg text-xs whitespace-nowrap shrink-0">
            Đang thực hiện
            <span className="bg-[#406c89] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{countDangThucHien}</span>
          </span>
          <IconArrowRight size={13} className="text-slate-300 shrink-0" />
          <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 text-emerald-700 font-semibold px-3 py-1.5 rounded-lg text-xs whitespace-nowrap shrink-0">
            Hoàn thành
            <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{countHoanThanh}</span>
          </span>
        </div>

        {/* 2. Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {[
            { label: 'Tổng dự án', value: countTotal, color: 'text-[#406c89]' },
            { label: 'Chờ khởi tạo', value: countChoKhoiTao, color: 'text-orange-500' },
            { label: 'Đang thực hiện', value: countDangThucHien, color: 'text-orange-500' },
            { label: 'Hoàn thành', value: countHoanThanh, color: 'text-emerald-600' },
            { label: 'Tạm dừng', value: countTamDung, color: 'text-orange-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-slate-200/80 rounded-lg px-3 py-2 shadow-xs">
              <p className="text-[10px] text-slate-500 font-medium truncate">{stat.label}</p>
              <p className={`text-xl font-extrabold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* 3. Chờ khởi tạo theo Phòng ban */}
        <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-3 shadow-xs">
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-xs font-bold text-slate-700">Chờ khởi tạo theo Phòng ban</p>
            <p className="text-[10px] text-slate-400">
              Tổng: <span className="font-bold text-orange-500">{countChoKhoiTao}</span> hồ sơ chưa tạo
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {DEPARTMENTS.map(dept => {
              const isSelected = selectedDept === dept.id;
              const isZero = dept.count === 0;
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => setSelectedDept(isSelected ? null : dept.id)}
                  className={`flex flex-col items-start px-2.5 py-1.5 rounded-lg border text-left transition-all cursor-pointer active:scale-95 ${
                    isSelected ? 'bg-emerald-50 border-emerald-400'
                    : isZero ? 'bg-green-50 border-green-200'
                    : 'bg-rose-50 border-rose-200 hover:bg-orange-50 hover:border-orange-300'
                  }`}
                >
                  <span className="text-[10px] font-medium leading-tight text-slate-600">{dept.name}</span>
                  <span className={`text-base font-extrabold ${isSelected ? 'text-emerald-600' : isZero ? 'text-emerald-500' : 'text-orange-500'}`}>
                    {dept.count}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-slate-400 mt-2">
            * Bấm vào ô phòng của bạn (nổi bật màu cam) để xem &amp; khởi tạo.
          </p>
        </div>

        {/* 4. Search & Sort (In original position, sticky on scroll gaplessly) */}
        <div className="sticky top-0 z-20 bg-slate-50 -mt-4 pt-2.5 pb-2.5 space-y-2 border-b border-slate-200/80 -mx-4 sm:-mx-6 px-4 sm:px-6 shadow-xs">
          <div className="bg-white border border-slate-200/80 rounded-xl px-3.5 py-2 flex items-center gap-2 shadow-sm">
            <IconSearch size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên hoặc mã dự án..."
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
          <div className="overflow-x-auto [scrollbar-width:none]">
            <div className="flex items-center gap-1.5 text-xs select-none min-w-max">
              <span className="text-slate-400 font-medium shrink-0">Sắp xếp:</span>
              {sortButtons.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleSort(key)}
                  className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-medium whitespace-nowrap ${
                    sortKey === key
                      ? 'bg-[#406c89] text-white border-transparent'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {label}{sortKey === key && (sortDir === 'asc' ? ' ↑' : ' ↓')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Project Cards */}
        <div className="space-y-3 pb-4">

          {sorted.length === 0 ? (
            <div className="bg-white border border-slate-200/80 rounded-2xl py-20 flex flex-col items-center justify-center text-center shadow-xs">
              <IconClipboardList size={48} className="text-slate-300 stroke-[1.25] mb-2" />
              <p className="text-xs text-slate-400 font-medium">Chưa có dự án nào.</p>
            </div>
          ) : (
            sorted.map(item => {
              const hasGreenBorder = item.tienDoText === 'Đúng tiến độ' || item.tienDoText === 'Vượt tiến độ';
              const hasRedBorder = item.tienDoText === 'Chậm tiến độ, lỗi khách quan' || item.tienDoText === 'Trễ tiến độ';
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl p-5 shadow-xs flex flex-col gap-2.5 transition-all border ${
                    hasGreenBorder ? 'border-emerald-500/60'
                    : hasRedBorder ? 'border-rose-300/60'
                    : 'border-slate-200/80'
                  }`}
                >
                  {/* Card header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold font-mono bg-[#406c89]/10 text-[#406c89] border border-[#406c89]/20">
                        {item.maDuAn}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#fffbeb] text-[#d97706] border border-[#fde68a]">
                        {item.trangThai}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                        item.tienDoText === 'Vượt tiến độ' ? 'bg-[#2fa047] text-white'
                        : hasGreenBorder ? 'bg-[#22863a] text-white'
                        : hasRedBorder ? 'bg-rose-50 text-rose-600 border border-rose-200/50'
                        : 'bg-slate-50 text-slate-400 border border-slate-200/50'
                      }`}>
                        {item.tienDoText}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          const copied: DuAnItem = {
                            ...item,
                            id: `da-${Date.now()}`,
                            maDuAn: `${item.maDuAn}-SAO`,
                            tenDuAn: `${item.tenDuAn} (Bản sao)`,
                          };
                          setProjects(prev => [copied, ...prev]);
                        }}
                        className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Sao chép dự án"
                      >
                        <IconCopy size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenDeleteModal(item)}
                        className="p-1.5 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Xóa dự án"
                      >
                        <IconTrash size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectProject(item)}
                        className="flex items-center gap-1 bg-[#406c89] hover:bg-[#345972] text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer shadow-xs transition-all ml-1"
                      >
                        Chi tiết
                        <IconChevronRight size={12} stroke={2.5} />
                      </button>
                    </div>
                  </div>

                  {/* Title row */}
                  <div className="flex items-center gap-2.5">
                    <div className="bg-slate-100 border border-slate-200 text-slate-500 font-semibold px-2 py-0.5 rounded text-[11px] min-w-[28px] text-center select-none shrink-0">
                      {item.indexText}
                    </div>
                    <h3
                      onClick={() => handleSelectProject(item)}
                      className="text-sm font-extrabold text-[#406c89] hover:underline cursor-pointer tracking-tight leading-snug"
                    >
                      {item.tenDuAn}
                    </h3>
                  </div>

                  {/* Description */}
                  {item.moTa && (
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{item.moTa}</p>
                  )}

                  {/* Dates */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                    <div className="flex gap-4">
                      <span>Bắt đầu: {formatDateDisplay(item.ngayBatDau)}</span>
                      <span>Kết thúc: {formatDateDisplay(item.ngayKetThuc)}</span>
                    </div>
                  </div>

                  {/* Progress bar + Milestones Displayed Directly ABOVE Tick Line */}
                  <div className="space-y-1 pt-1">
                    {/* Milestone Flags Positioned Directly ABOVE Ticks */}
                    {item.milestones && item.milestones.length > 0 && (
                      <div className="relative h-4 w-full pr-11">
                        {item.milestones.map(ms => (
                          <div
                            key={ms.id}
                            className={`absolute bottom-0 -translate-x-1/2 flex items-center gap-0.5 text-[11px] font-bold whitespace-nowrap ${
                              ms.color === 'blue' ? 'text-blue-600' : 'text-rose-500'
                            }`}
                            style={{ left: `${ms.positionPercent}%` }}
                          >
                            <IconFlag size={12} />
                            <span>{ms.dateText}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Progress Bar & Tick Lines */}
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1 bg-slate-100 rounded-full h-2">
                        <div
                          className={`h-full rounded-full transition-all duration-500 bg-[#406c89]`}
                          style={{ width: `${item.tienDo}%` }}
                        />
                        {item.milestones?.map(ms => (
                          <div
                            key={ms.id}
                            className={`absolute top-0 bottom-0 w-0.5 z-10 -translate-x-1/2 ${
                              ms.color === 'blue' ? 'bg-blue-600' : 'bg-red-500'
                            }`}
                            style={{ left: `${ms.positionPercent}%` }}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-400 font-bold w-8 text-right select-none">{item.tienDo}%</span>
                    </div>

                    {/* Milestone Bottom Legend */}
                    {item.milestones && item.milestones.length > 0 && (
                      <div className="flex items-center gap-4 text-[11px] pt-1">
                        {item.milestones.map(ms => (
                          <div key={ms.id} className="flex items-center gap-1 font-bold">
                            <span className={`w-0.5 h-3 inline-block rounded-full ${ms.color === 'blue' ? 'bg-blue-600' : 'bg-red-500'}`} />
                            <span className={ms.color === 'blue' ? 'text-blue-700' : 'text-rose-600'}>{ms.label}</span>
                            <span className="text-slate-400 font-mono">({ms.dateText})</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* MODALS */}
      <TaoDuAnModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSubmit={handleCreateProject}
      />

      <QuanLyTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
      />

      <XoaDuAnModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        project={deletingProject}
        onConfirmDelete={(id) => setProjects(prev => prev.filter(p => p.id !== id))}
      />
    </div>
  );
}


