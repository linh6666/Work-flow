"use client";

import React, { useState } from 'react';
import TaoDuAnModal from './modal/TaoDuAn';
import {
  IconPlus,
  IconSearch,
  IconTrash,
  IconChevronRight,
  IconClipboardList,
  IconArrowRight,
  IconFlag,
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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKeyType>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  // Modal creation states
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

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

  return (
    <div className="flex-1 flex flex-col overflow-hidden p-3 sm:p-5 md:p-6 space-y-4 animate-fade-in text-slate-700 w-full bg-slate-50">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Quản lý Dự án</h2>
        </div>
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsProjectModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-sm font-semibold rounded-lg shadow-xs transition-all cursor-pointer"
          >
            <IconPlus size={16} />
            <span>Tạo Dự án</span>
          </button>
        </div>
      </div>

      {/* 2. Process Workflow Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-3 flex items-center gap-2 overflow-x-auto shadow-xs flex-wrap">
        {/* Step 1 */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-purple-50 border border-purple-200 text-purple-700 font-semibold px-3 py-1.5 rounded-lg text-xs whitespace-nowrap">
            Tạo YCSX
          </span>
          <IconArrowRight size={14} className="text-slate-400" />
        </div>

        {/* Step 2 */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-orange-50 border border-orange-200 text-orange-600 font-semibold px-3 py-1.5 rounded-lg text-xs whitespace-nowrap">
            PGD đã duyệt YCSX
          </span>
          <IconArrowRight size={14} className="text-slate-400" />
        </div>

        {/* Step 3 */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-blue-50 border border-blue-200 text-blue-700 font-semibold px-3 py-1.5 rounded-lg text-xs whitespace-nowrap">
            Khởi tạo Dự án từ YCSX
          </span>
          <IconArrowRight size={14} className="text-slate-400" />
        </div>

        {/* Step 4 - Active */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-300 text-indigo-700 font-semibold px-3 py-1.5 rounded-lg text-xs whitespace-nowrap">
            Đang thực hiện
            <span className="bg-[#406c89] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none">
              {countDangThucHien}
            </span>
          </span>
          <IconArrowRight size={14} className="text-slate-400" />
        </div>

        {/* Step 5 */}
        <div className="shrink-0">
          <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 text-emerald-700 font-semibold px-3 py-1.5 rounded-lg text-xs whitespace-nowrap">
            Hoàn thành
            <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none">
              {countHoanThanh}
            </span>
          </span>
        </div>
      </div>

      {/* 3. Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        <div className="bg-white border border-slate-200/80 rounded-lg px-3 py-2 shadow-xs">
          <p className="text-[10px] text-slate-500 font-medium">Tổng dự án</p>
          <p className="text-xl font-extrabold text-blue-600">{countTotal}</p>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-lg px-3 py-2 shadow-xs">
          <p className="text-[10px] text-slate-500 font-medium">Chờ khởi tạo</p>
          <p className="text-xl font-extrabold text-orange-500">{countChoKhoiTao}</p>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-lg px-3 py-2 shadow-xs">
          <p className="text-[10px] text-slate-500 font-medium">Đang thực hiện</p>
          <p className="text-xl font-extrabold text-orange-500">{countDangThucHien}</p>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-lg px-3 py-2 shadow-xs">
          <p className="text-[10px] text-slate-500 font-medium">Hoàn thành</p>
          <p className="text-xl font-extrabold text-emerald-600">{countHoanThanh}</p>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-lg px-3 py-2 shadow-xs">
          <p className="text-[10px] text-slate-500 font-medium">Tạm dừng</p>
          <p className="text-xl font-extrabold text-orange-500">{countTamDung}</p>
        </div>
      </div>

      {/* 4. Chờ khởi tạo theo Phòng ban */}
      <div className="bg-white border border-slate-200/80 rounded-xl px-3.5 py-2.5 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-slate-700">Chờ khởi tạo theo Phòng ban</p>
          <p className="text-[10px] text-slate-500">
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
                className={`flex flex-col items-start px-2.5 py-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-400'
                    : isZero
                    ? 'bg-green-50 border-green-200'
                    : 'bg-rose-50 border-rose-200 hover:bg-orange-50 hover:border-orange-300'
                }`}
              >
                <span className="text-[10px] font-medium leading-tight text-slate-600">{dept.name}</span>
                <span className={`text-base font-extrabold ${
                  isSelected ? 'text-emerald-600' : isZero ? 'text-emerald-500' : 'text-orange-500'
                }`}>
                  {dept.count}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
          * Số dự án mà phòng ban chưa tạo Hồ sơ quản lý dự án. Bấm vào ô phòng của ban (nổi bật màu cam) để xem &amp; khởi tạo.
        </p>
      </div>

      {/* 5. Search & Sort Bar */}
      <div className="space-y-3">
        {/* Search */}
        <div className="bg-white border border-slate-200/80 rounded-xl px-3.5 py-2.5 flex items-center gap-2 shadow-xs">
          <IconSearch size={18} className="text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên hoặc mã dự án..."
            className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        {/* Sorting row */}
        <div className="overflow-x-auto pb-0.5">
          <div className="flex items-center gap-2 text-xs select-none min-w-max">
            <span className="text-slate-400 font-medium shrink-0">Sắp xếp:</span>
          {sortButtons.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleSort(key)}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-medium whitespace-nowrap ${
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

      {/* 6. Projects Cards Container */}
      <div className="flex-1 overflow-y-auto space-y-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {sorted.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-2xl py-20 px-4 flex flex-col items-center justify-center min-h-[300px] text-center shadow-xs">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-slate-300 mb-2">
              <IconClipboardList size={48} className="stroke-[1.25]" />
            </div>
            <p className="text-xs text-slate-400 font-medium">Chưa có dự án nào.</p>
          </div>
        ) : (
          sorted.map(item => {
            const hasGreenBorder = item.tienDoText === 'Đúng tiến độ' || item.tienDoText === 'Vượt tiến độ';
            const hasRedBorder = item.tienDoText === 'Chậm tiến độ, lỗi khách quan' || item.tienDoText === 'Trễ tiến độ';

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-5 md:p-6 shadow-xs flex flex-col gap-3.5 transition-all border ${
                  hasGreenBorder
                    ? 'border-emerald-600/60'
                    : hasRedBorder
                    ? 'border-rose-300/60'
                    : 'border-slate-200/80'
                }`}
              >
                {/* Header row of card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Code badge */}
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold font-mono bg-[#406c89]/10 text-[#406c89] border border-[#406c89]/20">
                      {item.maDuAn}
                    </span>

                    {/* Status badge 1 */}
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200/50">
                      {item.trangThai}
                    </span>

                    {/* Status badge 2 (tienDoText) */}
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${
                      item.tienDoText === 'Đúng tiến độ' || item.tienDoText === 'Vượt tiến độ'
                        ? 'bg-emerald-600 text-white border-transparent'
                        : item.tienDoText === 'Chậm tiến độ, lỗi khách quan' || item.tienDoText === 'Trễ tiến độ'
                        ? 'bg-rose-50 text-rose-600 border-rose-200/50'
                        : 'bg-slate-50 text-slate-400 border-slate-200/50'
                    }`}>
                      {item.tienDoText}
                    </span>

                    {/* Khách hàng badge */}
                    {item.khachHang && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-medium bg-slate-50 text-slate-500 border border-slate-200/50">
                        {item.khachHang}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5">
                    {/* Trash delete button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(item.id)}
                      className="p-1.5 rounded text-slate-400 hover:text-[#406c89] hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Xóa dự án"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                    </button>

                    {/* Details button */}
                    <button
                      type="button"
                      className="flex items-center gap-1 bg-[#406c89] hover:bg-[#345972] text-white px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
                    >
                      <span>Chi tiết</span>
                      <IconChevronRight size={12} stroke={2.5} />
                    </button>
                  </div>
                </div>

                {/* Index and Title Row */}
                <div className="flex items-center gap-2.5">
                  {/* Sequence box */}
                  <div className="bg-slate-100 border border-slate-200 text-slate-500 font-semibold px-2 py-0.5 rounded text-[11px] min-w-[24px] text-center select-none">
                    {item.indexText}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-extrabold text-[#406c89] hover:underline cursor-pointer tracking-tight">
                    {item.tenDuAn}
                  </h3>
                </div>

                {/* Description */}
                {item.moTa && (
                  <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-[800px]">
                    {item.moTa}
                  </p>
                )}

                {/* Dates and Flag milestones */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs select-none">
                  {/* Dates */}
                  <div className="text-slate-400 font-medium flex flex-wrap gap-x-4 gap-y-1">
                    <span>Bắt đầu: {formatDateDisplay(item.ngayBatDau)}</span>
                    <span>Kết thúc: {formatDateDisplay(item.ngayKetThuc)}</span>
                  </div>

                  {/* Flags (milestones summary) */}
                  {item.milestones && item.milestones.length > 0 && (
                    <div className="flex items-center gap-3 font-bold font-mono">
                      {item.milestones.map((ms) => (
                        <div
                          key={ms.id}
                          className={`flex items-center gap-0.5 ${
                            ms.color === 'blue' ? 'text-blue-500' : 'text-red-500'
                          }`}
                        >
                          <IconFlag size={13} className="shrink-0" />
                          <span>{ms.dateText}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Progress bar and milestone markers */}
                <div className="flex items-center gap-3">
                  <div className="relative flex-1 bg-slate-100 rounded-full h-2">
                    {/* Fill */}
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${getProgressColorClass(item.tienDo, item.tienDoText)}`}
                      style={{ width: `${item.tienDo}%` }}
                    />

                    {/* Milestones markers tick lines */}
                    {item.milestones?.map(ms => (
                      <div
                        key={ms.id}
                        className={`absolute top-0 bottom-0 w-0.5 z-10 ${
                          ms.color === 'blue' ? 'bg-blue-500' : 'bg-red-500'
                        }`}
                        style={{ left: `${ms.positionPercent}%` }}
                      />
                    ))}
                  </div>

                  {/* Progress percentage label */}
                  <span className="text-xs text-slate-400 font-bold w-7 text-right select-none">
                    {item.tienDo}%
                  </span>
                </div>

                {/* Milestones detailed labels bottom row */}
                {item.milestones && item.milestones.length > 0 && (
                  <div className="flex items-center gap-4 text-[10px] font-bold font-mono select-none pt-0.5 border-t border-slate-50 mt-0.5">
                    {item.milestones.map(ms => (
                      <span
                        key={ms.id}
                        className={ms.color === 'blue' ? 'text-blue-500/80' : 'text-red-500/80'}
                      >
                        | {ms.label} ({ms.dateText})
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* MODAL: TẠO DỰ ÁN MỚI */}
      <TaoDuAnModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  );
}
