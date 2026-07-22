"use client";

import React, { useState } from 'react';
import TaoDuAnModal from './modal/TaoDuAn';
import {
  IconPlus,
  IconSearch,
  IconTrash,
  IconChevronDown,
  IconChevronRight,
  IconCheck,
  IconX,
  IconClipboardList,
  IconSignature,
  IconArrowRight,
  IconDownload,
  IconFlag,
  IconUpload
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
    milestones: [
      { id: 'ms-1', label: 'NT lần 1', dateText: '07-08', positionPercent: 92, color: 'blue' },
      { id: 'ms-2', label: 'NT cuối', dateText: '15-08', positionPercent: 97, color: 'red' }
    ]
  },
  {
    id: 'da-6',
    maDuAn: '20-2026/DA-MHV',
    tenDuAn: 'CHỈNH SỬA MÔ HÌNH L\'AURORA',
    moTa: 'Thay mới 05 công trình cao tầng 1/150',
    ngayBatDau: '2026-06-09',
    ngayKetThuc: '2026-07-22',
    tienDo: 51,
    indexText: '4',
    trangThai: 'Đang thực hiện',
    tienDoText: 'Đúng tiến độ',
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
    milestones: [
      { id: 'ms-1', label: 'NT lần 1', dateText: '07-08', positionPercent: 65, color: 'blue' },
      { id: 'ms-2', label: 'NT cuối', dateText: '27-08', positionPercent: 95, color: 'red' }
    ]
  }
];

export default function QuanLyDuAn() {
  const [projects, setProjects] = useState<DuAnItem[]>(DEFAULT_PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<'maDuAn' | 'tenDuAn' | 'tienDo' | 'indexText' | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

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
      // Default sample milestones for simulation if correct status
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

  const handleImportExcel = () => {
    alert("Nhập khẩu Excel thành công! Đã thêm dự án mẫu.");
    const newProj: DuAnItem = {
      id: `da-${Date.now()}`,
      maDuAn: '14.03-2026/DA-MHV',
      tenDuAn: 'Dự án nhập từ Excel mẫu',
      moTa: 'Dự án mẫu được tạo tự động từ việc nhập khẩu file Excel kiểm tra tiến độ.',
      ngayBatDau: '2026-05-01',
      ngayKetThuc: '2026-10-30',
      tienDo: 50,
      indexText: '7',
      trangThai: 'Đang thực hiện',
      tienDoText: 'Đúng tiến độ',
      milestones: [
        { id: 'ms-1', label: 'NT lần 1', dateText: '10-09', positionPercent: 65, color: 'blue' },
        { id: 'ms-2', label: 'NT cuối', dateText: '25-09', positionPercent: 88, color: 'red' }
      ]
    };
    setProjects(prev => [newProj, ...prev]);
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
    const va = a[sortKey].toLowerCase();
    const vb = b[sortKey].toLowerCase();
    return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  const handleSort = (key: 'maDuAn' | 'tenDuAn' | 'tienDo' | 'indexText') => {
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

  // --- Process bar counters ---
  const countStep1 = 0; // HĐ ký kết
  const countStep2 = 0; // Khởi tạo Dự án
  const countStep3 = projects.filter(p => p.trangThai === 'Đang thực hiện').length; // Đang thực hiện
  const countStep4 = projects.filter(p => p.trangThai === 'Hoàn thành').length; // Hoàn thành

  // Format Helper for Date
  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parseInt(parts[2])}/${parseInt(parts[1])}/${parts[0]}`;
    }
    return dateString;
  };

  // Helper for progress bar color logic matching screenshot rules
  const getProgressColorClass = (tienDo: number, evalText: string) => {
    if (evalText === 'Chưa đánh giá') return 'bg-slate-300';
    if (tienDo <= 10) return 'bg-slate-300';
    if (tienDo < 60) return 'bg-[#f97316]'; // orange/amber
    return 'bg-blue-600/90'; // blue
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden p-5 md:p-6 space-y-5 animate-fade-in text-slate-700 w-full bg-slate-50">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Quản lý Dự án</h2>
          <p className="text-sm text-slate-400 mt-0.5">Quản lý tiến độ các dự án</p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleImportExcel}
            className="flex items-center gap-2 px-4 py-2 bg-[#BB8D38] hover:bg-[#a77c2f] text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer"
          >
            <IconUpload size={16} />
            <span>Import Excel</span>
          </button>

          <button
            type="button"
            onClick={() => setIsProjectModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer"
          >
            <IconPlus size={16} />
            <span>Tạo Dự án</span>
          </button>
        </div>
      </div>

      {/* 2. Process Workflow Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 flex items-center gap-2 overflow-x-auto shadow-xs">
        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-slate-100 border border-transparent text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs">
            Hợp đồng ký kết <span className="font-normal text-slate-400">PGĐ đã duyệt HĐ</span>
          </span>
          <IconArrowRight size={14} className="text-slate-400" />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-slate-100 border border-transparent text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs">
            Khởi tạo Dự án <span className="font-normal text-slate-400 font-mono">từ hợp đồng</span>
          </span>
          <IconArrowRight size={14} className="text-slate-400" />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            countStep3 > 0
              ? 'bg-indigo-50/50 border-indigo-200 text-indigo-700'
              : 'bg-slate-100 border-transparent text-slate-700'
          }`}>
            <span>Đang thực hiện</span>
            {countStep3 > 0 && (
              <span className="bg-[#406c89] text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                {countStep3}
              </span>
            )}
          </span>
          <IconArrowRight size={14} className="text-slate-400" />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-slate-100 border border-transparent text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs">
            Hoàn thành <span className="font-normal text-slate-400">({countStep4} dự án)</span>
          </span>
        </div>
      </div>

      {/* 3. Search & Sort Bar */}
      <div className="space-y-4">
        {/* Search */}
        <div className="bg-white border border-slate-200/80 rounded-xl px-3.5 py-2.5 flex items-center gap-2 shadow-xs">
          <IconSearch size={18} className="text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên hoặc mã dự án..."
            className="w-full bg-transparent text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        {/* Sorting row */}
        <div className="flex items-center gap-2 text-xs select-none">
          <span className="text-slate-400 font-medium mr-1">Sắp xếp:</span>
          
          <button
            onClick={() => handleSort('maDuAn')}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-medium ${
              sortKey === 'maDuAn' ? 'bg-[#406c89] text-white border-transparent' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Mã dự án {sortKey === 'maDuAn' && (sortDir === 'asc' ? '↑' : '↓')}
          </button>

          <button
            onClick={() => handleSort('tenDuAn')}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-medium ${
              sortKey === 'tenDuAn' ? 'bg-[#406c89] text-white border-transparent' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Tên dự án {sortKey === 'tenDuAn' && (sortDir === 'asc' ? '↑' : '↓')}
          </button>

          <button
            onClick={() => handleSort('tienDo')}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-medium ${
              sortKey === 'tienDo' ? 'bg-[#406c89] text-white border-transparent' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            KL hoàn thành {sortKey === 'tienDo' && (sortDir === 'asc' ? '↑' : '↓')}
          </button>

          <button
            onClick={() => handleSort('indexText')}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-medium ${
              sortKey === 'indexText' ? 'bg-[#406c89] text-white border-transparent' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Ưu tiên {sortKey === 'indexText' && (sortDir === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      {/* 4. Projects Cards Container */}
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
                <div className="flex items-center justify-between">
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
                  </div>

                  <div className="flex items-center gap-2.5">
                    {/* Trash delete button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(item.id)}
                      className="p-1.5 rounded text-slate-400 hover:text-[#406c89] hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Xóa dự án"
                    >
                      <IconTrash size={18} />
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
                <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-[800px]">
                  {item.moTa}
                </p>

                {/* Dates and Flag milestones */}
                <div className="flex items-center justify-between text-xs select-none">
                  {/* Dates */}
                  <div className="text-slate-400 font-medium">
                    Bắt đầu: {formatDateDisplay(item.ngayBatDau)} &nbsp;&nbsp;&nbsp; Kết thúc: {formatDateDisplay(item.ngayKetThuc)}
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

      {/* 5. MODAL: TẠO DỰ ÁN MỚI */}
      <TaoDuAnModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  );
}
