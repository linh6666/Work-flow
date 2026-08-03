"use client";

import React, { useState, useEffect } from 'react';
import {
  IconPlus,
  IconSearch,
  IconPencil,
  IconTrash,
  IconChevronDown,
  IconArrowsSort,
  IconCheck,
  IconDownload,
  IconUpload,
  IconClock,
  IconChevronLeft,
  IconChevronRight,
  IconPhone,
  IconX,
} from '@tabler/icons-react';
import CreateProposalModal from './modal/CreateProposalModal';
import EditProposalModal from './edit/EditProposalModal';
import DeleteConfirmModal from './delete/DeleteConfirmModal';
import TrienKhaiHoanTatModal from './trienKhaiHoanTat/TrienKhaiHoanTatModal';
import TrienKhaiChuaLamModal from './trienKhaiChuaLam/TrienKhaiChuaLamModal';

// ─── Types ────────────────────────────────────────────────────────────
export type TrangThai =
  | 'cho-tp'
  | 'tp-duyet'
  | 'tp-tu-choi'
  | 'cho-pgd'
  | 'pgd-duyet'
  | 'pgd-tu-choi';

export interface DeXuat {
  id: string;
  soDX: string;
  maPhu?: string;
  tenDuAn?: string;
  donViLienHe: string;
  nguoiLienHe: string;
  dienThoai?: string;
  nguoiLap: string;
  ngay: string;
  trangThai: TrangThai;
  buocHoanTat: number;
  tongBuoc: number;
  lyDoTuChoi?: string;
  khachHangCrm?: string;
  noiDungYeuCau?: string;
  tyLeMoHinh?: string;
  kichThuocDuKien?: string;
  diaDiemLapDat?: string;
  loaiChan?: string;
  kinh?: string;
  anhSang?: string[];
  congNghe?: string[];
  tinhTrangHoSo?: string;
  thoiGianBaoGia?: string;
  thoiGianMoHinh?: string;
  duongDanHoSo?: string;
  ghiChu?: string;
}

// ─── Mock data matching screenshot data 100% ──────
const MOCK: DeXuat[] = [
  {
    id: '1',
    soDX: 'ĐXBG-009-2026',
    maPhu: '',
    tenDuAn: 'DỰ ÁN IA25 - CIPUTRA',
    donViLienHe: 'CÔNG TY CỔ PHẦN THÁI NAM LAND',
    nguoiLienHe: 'Chị Dương',
    dienThoai: '0376943469',
    nguoiLap: 'Nguyễn Phú Quang',
    ngay: '2026-08-03',
    trangThai: 'cho-tp',
    buocHoanTat: 0,
    tongBuoc: 2,
  },
  {
    id: '2',
    soDX: '008-2026',
    maPhu: 'ĐXBG-MHV',
    tenDuAn: 'Tiện ích dự án Hanoi Parkcentric',
    donViLienHe: 'CÔNG TY CỔ PHẦN THƯƠNG MẠI DƯƠNG PHÚC THẮNG',
    nguoiLienHe: 'Bà Nguyễn Phương Mi',
    dienThoai: '0983324492',
    nguoiLap: 'Bùi Phương Uyên',
    ngay: '2026-08-01',
    trangThai: 'pgd-tu-choi',
    buocHoanTat: 0,
    tongBuoc: 2,
    lyDoTuChoi: 'Chưa có hình ảnh kèm t...',
  },
  {
    id: '3',
    soDX: 'ĐXBG-007-2026',
    maPhu: '',
    tenDuAn: 'CHỈNH SỬA MÔ HÌNH MARINA PHÚ QUỐC',
    donViLienHe: 'CÔNG TY TNHH BIM KIÊN GIANG',
    nguoiLienHe: 'Phạm Thanh Hằng',
    dienThoai: '0913393935',
    nguoiLap: 'Bùi Thị Duyên',
    ngay: '2026-07-28',
    trangThai: 'pgd-duyet',
    buocHoanTat: 1,
    tongBuoc: 2,
  },
  {
    id: '4',
    soDX: '006-2026',
    maPhu: 'ĐXBG-MHV',
    tenDuAn: 'MÔ HÌNH QUY HOẠCH TỈNH HƯNG YÊN',
    donViLienHe: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN ĐẤT VIỆT',
    nguoiLienHe: 'Chị Vân',
    dienThoai: '0973139830',
    nguoiLap: 'Nguyễn Phú Quang',
    ngay: '2026-07-24',
    trangThai: 'pgd-duyet',
    buocHoanTat: 2,
    tongBuoc: 2,
  },
  {
    id: '5',
    soDX: '005-2026',
    maPhu: 'ĐXBG-MHV',
    tenDuAn: 'KHU CHUNG CƯ THÀNH CÔNG HARBOR VIEW',
    donViLienHe: 'Công ty Cổ phần Liên Tinh',
    nguoiLienHe: 'Đào Minh Thư',
    dienThoai: '0986918703',
    nguoiLap: 'Nguyễn Phú Quang',
    ngay: '2026-07-23',
    trangThai: 'pgd-duyet',
    buocHoanTat: 1,
    tongBuoc: 2,
  },
  {
    id: '6',
    soDX: '004-2026',
    maPhu: 'ĐXBG-MHV',
    tenDuAn: 'HỆ THỐNG THOÁT NƯỚC TP HÀ NỘI',
    donViLienHe: 'CÔNG TY TNHH MTV THOÁT NƯỚC TP HÀ NỘI',
    nguoiLienHe: 'LẠI VĂN HIẾU',
    dienThoai: '',
    nguoiLap: 'Nguyễn Phú Quang',
    ngay: '2026-07-22',
    trangThai: 'pgd-duyet',
    buocHoanTat: 1,
    tongBuoc: 2,
  },
  {
    id: '7',
    soDX: '003.02-2026',
    maPhu: 'ĐXBG-MHV',
    tenDuAn: 'MẪU BIỆT THỰ, CĂN HỘ ECOPARK-VINH',
    donViLienHe: 'CÔNG TY CP - TỔNG CÔNG TY HỢP TÁC KINH TẾ VIỆT LÀO',
    nguoiLienHe: 'Thùy',
    dienThoai: '',
    nguoiLap: 'Bùi Thị Duyên',
    ngay: '2026-07-22',
    trangThai: 'pgd-duyet',
    buocHoanTat: 0,
    tongBuoc: 2,
  },
  {
    id: '8',
    soDX: '002-2026',
    maPhu: 'ĐXBG-MHV',
    tenDuAn: 'INDUSTRIAL ZONE PHNOM PENH',
    donViLienHe: 'WORLDBRIDGE GROUP',
    nguoiLienHe: 'Mr. Jonathan Lee',
    dienThoai: '',
    nguoiLap: 'Bùi Phương Uyên',
    ngay: '2026-07-11',
    trangThai: 'pgd-duyet',
    buocHoanTat: 1,
    tongBuoc: 2,
  },
  {
    id: '9',
    soDX: '003.01-2026',
    maPhu: 'ĐXBG-MHV',
    tenDuAn: 'CHỈNH SỬA MH ECOPARK-VINH',
    donViLienHe: 'CÔNG TY CP - TỔNG CÔNG TY HỢP TÁC KINH TẾ VIỆT LÀO',
    nguoiLienHe: 'Thùy',
    dienThoai: '',
    nguoiLap: 'Bùi Thị Duyên',
    ngay: '2026-07-22',
    trangThai: 'pgd-duyet',
    buocHoanTat: 1,
    tongBuoc: 2,
  },
];

// ─── Status config ────────────────────────────────────────────────────
const STATUS_CONFIG: Record<TrangThai, { label: string; color: string }> = {
  'cho-tp':      { label: 'Chờ QL KD duyệt',      color: 'text-amber-700 bg-amber-50 border-amber-300' },
  'tp-duyet':    { label: 'TP đã duyệt',          color: 'text-[#406c89] bg-sky-50 border-sky-200' },
  'tp-tu-choi':  { label: 'TP từ chối',           color: 'text-rose-600 bg-rose-50 border-rose-200' },
  'cho-pgd':     { label: 'Chờ PGĐ duyệt',       color: 'text-purple-600 bg-purple-50 border-purple-200' },
  'pgd-duyet':   { label: 'PGĐ KD-HC đã duyệt',  color: 'text-emerald-700 bg-emerald-50 border-emerald-300' },
  'pgd-tu-choi': { label: 'PGĐ KD-HC từ chối',   color: 'text-rose-700 bg-rose-50 border-rose-300' },
};

const FILTER_TABS: { key: TrangThai | 'all'; label: string }[] = [
  { key: 'all',        label: 'Tất cả' },
  { key: 'cho-tp',     label: 'Chờ TP duyệt' },
  { key: 'tp-duyet',   label: 'TP đã duyệt' },
  { key: 'tp-tu-choi', label: 'TP từ chối' },
  { key: 'cho-pgd',    label: 'Chờ PGĐ duyệt' },
  { key: 'pgd-duyet',  label: 'PGĐ đã duyệt' },
  { key: 'pgd-tu-choi',label: 'PGĐ từ chối' },
];

const ITEMS_PER_PAGE = 10;

// ─── Component ────────────────────────────────────────────────────────
export default function DeXuatBaoGia() {
  const [search, setSearch]   = useState('');
  const [filter, setFilter]   = useState<TrangThai | 'all'>('all');
  const [data, setData]       = useState<DeXuat[]>(MOCK);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProposalForEdit, setSelectedProposalForEdit] = useState<DeXuat | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProposalForDelete, setSelectedProposalForDelete] = useState<DeXuat | null>(null);

  const [isTrienKhaiHoanTatModalOpen, setIsTrienKhaiHoanTatModalOpen] = useState(false);
  const [isTrienKhaiChuaLamModalOpen, setIsTrienKhaiChuaLamModalOpen] = useState(false);
  const [selectedProposalForTrienKhai, setSelectedProposalForTrienKhai] = useState<DeXuat | null>(null);

  // Reset page to 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const handleCreateProposal = (newDX: Omit<DeXuat, 'id' | 'buocHoanTat' | 'tongBuoc'>) => {
    const newId = (data.length + 1).toString();
    const fullNewDX: DeXuat = {
      ...newDX,
      id: newId,
      tenDuAn: newDX.tenDuAn || 'Mô hình dự án mới',
      buocHoanTat: newDX.trangThai === 'pgd-duyet' ? 2 : (newDX.trangThai === 'tp-duyet' ? 1 : 0),
      tongBuoc: 2,
    };
    setData([fullNewDX, ...data]);
  };

  const handleEditProposal = (updatedDX: DeXuat) => {
    setData(prev => prev.map(item => item.id === updatedDX.id ? updatedDX : item));
  };

  const handleDeleteConfirm = () => {
    if (selectedProposalForDelete) {
      setData(prev => prev.filter(item => item.id !== selectedProposalForDelete.id));
      setSelectedProposalForDelete(null);
    }
  };

  const handleApprove = (id: string) => {
    setData(prev => prev.map(item => item.id === id ? { ...item, trangThai: 'pgd-duyet', buocHoanTat: 1 } : item));
  };

  const handleReject = (id: string) => {
    setData(prev => prev.map(item => item.id === id ? { ...item, trangThai: 'tp-tu-choi', lyDoTuChoi: 'Từ chối phê duyệt' } : item));
  };

  const handleUpdateSteps = (proposalId: string, steps: number) => {
    setData(prev => prev.map(item => {
      if (item.id === proposalId) {
        return { ...item, buocHoanTat: steps };
      }
      return item;
    }));
    setSelectedProposalForTrienKhai(prev => {
      if (prev && prev.id === proposalId) {
        const updated = { ...prev, buocHoanTat: steps };
        if (steps === 2) {
          setIsTrienKhaiChuaLamModalOpen(false);
          setIsTrienKhaiHoanTatModalOpen(true);
        }
        return updated;
      }
      return prev;
    });
  };

  const filtered = data.filter((d) => {
    const matchSearch =
      d.soDX.toLowerCase().includes(search.toLowerCase()) ||
      d.donViLienHe.toLowerCase().includes(search.toLowerCase()) ||
      d.nguoiLienHe.toLowerCase().includes(search.toLowerCase()) ||
      (d.tenDuAn || '').toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || d.trangThai === filter;
    return matchSearch && matchFilter;
  });

  // Stats
  const total     = data.length;
  const choTP     = data.filter((d) => d.trangThai === 'cho-tp').length;
  const choPGD    = data.filter((d) => d.trangThai === 'cho-pgd').length;
  const daHoanTat = data.filter((d) => d.trangThai === 'pgd-duyet').length;

  // Pagination calculation
  const totalFiltered = filtered.length;
  const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalFiltered);
  const paginatedList = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col h-full bg-white space-y-3 p-1">

      {/* ── Sub-header Action Bar (Matches Screenshot Exactly) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Đề xuất Báo giá</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            NV KD lập đề xuất → Quản lý KD duyệt → Phó GĐ KD-Hành chính duyệt
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => alert('Xuất danh sách đề xuất báo giá thành công (Excel)')}
            className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-md shadow-2xs transition-colors cursor-pointer"
          >
            <IconDownload size={13} className="text-slate-500" />
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Vui lòng chọn file Excel để Import')}
            className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-md shadow-2xs transition-colors cursor-pointer"
          >
            <IconUpload size={13} className="text-slate-500" />
            <span>Import</span>
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-md shadow-2xs transition-all cursor-pointer"
          >
            <IconPlus size={14} />
            <span>Lập đề xuất</span>
          </button>
        </div>
      </div>

      {/* ── Stats cards Row (Matches Screenshot Exactly) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[64px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Tổng đề xuất</p>
          <p className="text-xl font-black text-[#406c89] tracking-tight">{total}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[64px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Chờ TP duyệt</p>
          <p className="text-xl font-black text-[#d97706] tracking-tight">{choTP}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[64px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Chờ PGĐ duyệt</p>
          <p className="text-xl font-black text-[#406c89] tracking-tight">{choPGD}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[64px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Đã duyệt hoàn tất</p>
          <p className="text-xl font-black text-[#059669] tracking-tight">{daHoanTat}</p>
        </div>
      </div>

      {/* ── Warning Alert Banner (Matches Screenshot Exactly) ── */}
      {choTP > 0 && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#fffdf0] border border-[#fef08a] rounded-xl text-xs text-[#92400e] shadow-2xs shrink-0">
          <IconClock size={16} className="text-[#d97706] shrink-0" />
          <span>
            Có <strong className="font-bold text-[#b45309]">{choTP}</strong> đề xuất đang chờ bạn phê duyệt.
          </span>
        </div>
      )}

      {/* ── Search + Filter tabs ── */}
      <div className="flex items-center gap-3 flex-wrap shrink-0 pt-1">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo công ty, người liên hệ, số đề xuất..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200/80 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] shadow-2xs transition-all"
          />
        </div>
        {/* Tabs */}
        <div className="flex items-center gap-1 flex-wrap">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key as TrangThai | 'all')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                filter === tab.key
                  ? 'bg-[#406c89] text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-[#406c89] hover:text-[#406c89]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table (Matches Screenshot Columns & Data 100%) ── */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[960px]">
            <thead className="sticky top-0 z-10 bg-slate-50 shadow-2xs border-b border-slate-200">
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-4 py-3 font-bold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">Số ĐX <IconArrowsSort size={12} className="text-slate-300" /></span>
                </th>
                <th className="px-4 py-3 font-bold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">Tên mô hình / dự án <IconArrowsSort size={12} className="text-slate-300" /></span>
                </th>
                <th className="px-4 py-3 font-bold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">Đơn vị liên hệ <IconArrowsSort size={12} className="text-slate-300" /></span>
                </th>
                <th className="px-4 py-3 font-bold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">Người liên hệ <IconArrowsSort size={12} className="text-slate-300" /></span>
                </th>
                <th className="px-4 py-3 font-bold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">Người lập <IconArrowsSort size={12} className="text-slate-300" /></span>
                </th>
                <th className="px-4 py-3 font-bold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">Ngày <IconArrowsSort size={12} className="text-slate-300" /></span>
                </th>
                <th className="px-4 py-3 font-bold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">Trạng thái <IconArrowsSort size={12} className="text-slate-300" /></span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-xs text-slate-400">
                    Không tìm thấy đề xuất nào.
                  </td>
                </tr>
              ) : (
                paginatedList.map((row) => {
                  const st = STATUS_CONFIG[row.trangThai];
                  return (
                    <tr key={row.id} className="hover:bg-slate-50/70 transition-colors group">
                      {/* Số ĐX (Vd: 008-2026 ĐXBG-MHV) */}
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="text-[#406c89] font-bold text-xs hover:underline cursor-pointer">
                              {row.soDX}
                            </p>
                            {row.maPhu && (
                              <p className="text-[#406c89] font-bold text-xs leading-tight">
                                {row.maPhu}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-1 ml-1 shrink-0">
                            <button 
                              type="button" 
                              onClick={() => {
                                setSelectedProposalForEdit(row);
                                setIsEditModalOpen(true);
                              }}
                              className="p-1 rounded border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                              title="Sửa"
                            >
                              <IconPencil size={13} />
                            </button>
                            <button 
                              type="button" 
                              onClick={() => {
                                setSelectedProposalForDelete(row);
                                setIsDeleteModalOpen(true);
                              }}
                              className="p-1 rounded border border-slate-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                              title="Xóa"
                            >
                              <IconTrash size={13} />
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Tên mô hình / dự án */}
                      <td className="px-4 py-3.5 align-middle font-medium text-slate-700 text-xs max-w-[220px] leading-snug">
                        {row.tenDuAn}
                      </td>

                      {/* Đơn vị liên hệ */}
                      <td className="px-4 py-3.5 align-middle font-bold text-slate-800 text-xs max-w-[220px] leading-snug">
                        {row.donViLienHe}
                      </td>

                      {/* Người liên hệ */}
                      <td className="px-4 py-3.5 align-middle text-xs">
                        <p className="font-medium text-slate-600">{row.nguoiLienHe || '—'}</p>
                        {row.dienThoai && (
                          <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                            <IconPhone size={11} className="text-slate-400 shrink-0" />
                            <span>{row.dienThoai}</span>
                          </p>
                        )}
                      </td>

                      {/* Người lập */}
                      <td className="px-4 py-3.5 align-middle text-xs font-medium text-slate-600 whitespace-nowrap">
                        {row.nguoiLap}
                      </td>

                      {/* Ngày */}
                      <td className="px-4 py-3.5 align-middle text-xs text-slate-500 whitespace-nowrap">
                        {row.ngay}
                      </td>

                      {/* Trạng thái */}
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                        <div className="flex flex-col gap-1.5 items-start">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold border rounded-full px-2.5 py-0.5 ${st.color}`}>
                            {row.trangThai === 'cho-tp' ? (
                              <IconClock size={11} />
                            ) : row.trangThai.includes('tu-choi') ? (
                              <IconX size={11} strokeWidth={2.5} />
                            ) : (
                              <IconCheck size={11} strokeWidth={2.5} />
                            )}
                            {st.label}
                          </span>

                          {/* Action Buttons for Chờ QL KD duyệt */}
                          {row.trangThai === 'cho-tp' && (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <button
                                type="button"
                                onClick={() => handleApprove(row.id)}
                                className="px-2 py-0.5 rounded border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[10px] font-bold flex items-center gap-0.5 transition-colors cursor-pointer"
                              >
                                <IconCheck size={11} />
                                <span>Duyệt</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleReject(row.id)}
                                className="px-2 py-0.5 rounded border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 text-[10px] font-bold flex items-center gap-0.5 transition-colors cursor-pointer"
                              >
                                <IconX size={11} />
                                <span>Từ chối</span>
                              </button>
                            </div>
                          )}

                          {/* Reason for Rejection */}
                          {row.trangThai.includes('tu-choi') && row.lyDoTuChoi && (
                            <p className="text-[10px] text-rose-600 font-medium leading-tight">
                              ✗ {row.lyDoTuChoi}
                            </p>
                          )}

                          {/* Approved Status & Steps */}
                          {row.trangThai === 'pgd-duyet' && (
                            <>
                              <span className="text-[10px] font-semibold text-emerald-600">
                                {row.buocHoanTat === row.tongBuoc ? (
                                  <span>✓ Hoàn tất {row.tongBuoc} bước</span>
                                ) : (
                                  <span>{row.buocHoanTat}/{row.tongBuoc} bước</span>
                                )}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedProposalForTrienKhai(row);
                                  if (row.buocHoanTat === 2) {
                                    setIsTrienKhaiHoanTatModalOpen(true);
                                  } else {
                                    setIsTrienKhaiChuaLamModalOpen(true);
                                  }
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded border border-sky-300 bg-white text-[#406c89] hover:bg-sky-50 text-[10px] font-bold transition-all cursor-pointer shadow-2xs"
                              >
                                Triển khai
                                <IconChevronDown size={11} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
          <div>
            Hiển thị <span className="font-bold text-slate-700">{totalFiltered > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số <span className="font-bold text-slate-700">{totalFiltered}</span> đề xuất
          </div>

          {/* Page Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <IconChevronLeft size={13} />
              <span>Trước</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#406c89] text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Sau</span>
              <IconChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      <CreateProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProposal}
      />

      <EditProposalModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProposalForEdit(null);
        }}
        onSubmit={handleEditProposal}
        proposal={selectedProposalForEdit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedProposalForDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        proposalCode={selectedProposalForDelete?.soDX || ''}
      />

      <TrienKhaiHoanTatModal
        isOpen={isTrienKhaiHoanTatModalOpen}
        onClose={() => {
          setIsTrienKhaiHoanTatModalOpen(false);
          setSelectedProposalForTrienKhai(null);
        }}
        proposal={selectedProposalForTrienKhai}
      />

      <TrienKhaiChuaLamModal
        isOpen={isTrienKhaiChuaLamModalOpen}
        onClose={() => {
          setIsTrienKhaiChuaLamModalOpen(false);
          setSelectedProposalForTrienKhai(null);
        }}
        onUpdateSteps={handleUpdateSteps}
        proposal={selectedProposalForTrienKhai}
      />
    </div>
  );
}
