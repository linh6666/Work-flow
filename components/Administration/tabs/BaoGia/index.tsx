"use client";

import React, { useState, useEffect } from 'react';
import ThemBaoGiaModal from './modal/ThemBaoGiaModal';
import XoaBaoGiaModal from './modal/XoaBaoGia';
import QuanLyTemplateModal from './modal/QuanLyTemplate';
import {
  IconPlus,
  IconSearch,
  IconPencil,
  IconTrash,
  IconCopy,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconX,
  IconDownload,
  IconUpload,
  IconAdjustmentsAlt,
  IconArrowsSort,
  IconCheck,
} from '@tabler/icons-react';

// ─── DATA TYPES ──────────────────────────────────────────────────────────────
export interface BaoGiaItem {
  id: string;
  soBg: string;
  loai: string;
  khachHang: string;
  ngay: string;
  nguoiLap?: string;
  tyLe?: string;
  kichThuoc?: string;
  tongSauThue: number;
  trangThai: 'Bản nháp' | 'Đang soạn' | 'Chờ duyệt' | 'Đã gửi' | 'Đã chốt' | 'Đã từ chối' | 'Đang theo dõi';
}

const INITIAL_DATA: BaoGiaItem[] = [
  {
    id: '1',
    soBg: 'Tổng hợp 102.1-102.2 BG-MHV: SA BÀN THOÁT NƯỚC TP HÀ NỘI',
    loai: 'Mô hình Quy hoạch',
    khachHang: 'CÔNG TY TNHH MTV THOÁT NƯỚC HÀ NỘI',
    ngay: '2026-08-03',
    nguoiLap: 'Kỳ Anh',
    tyLe: '1/32000',
    kichThuoc: '3200×2500',
    tongSauThue: 1187827200,
    trangThai: 'Bản nháp',
  },
  {
    id: '2',
    soBg: '102.1-2026 BG-MHV',
    loai: 'Mô hình Quy hoạch',
    khachHang: 'CÔNG TY TNHH MTV THOÁT NƯỚC HÀ NỘI',
    ngay: '2026-08-03',
    nguoiLap: 'Kỳ Anh',
    tyLe: '1/32000',
    kichThuoc: '3200×2500',
    tongSauThue: 663487200,
    trangThai: 'Bản nháp',
  },
  {
    id: '3',
    soBg: '06-2026 BG-MHV',
    loai: 'Mô hình Quy hoạch',
    khachHang: 'CÔNG TY CỔ PHẦN ĐẦU TƯ PHÁT TRIỂN ĐÔ THỊ AHA VIỆT NAM',
    ngay: '2026-08-03',
    nguoiLap: 'Bùi Phương Uyên',
    tyLe: '1/400',
    kichThuoc: '4400X2000 MM',
    tongSauThue: 1446901920,
    trangThai: 'Bản nháp',
  },
  {
    id: '4',
    soBg: '06.03-2026 BG-MHV',
    loai: 'Mô hình Quy hoạch',
    khachHang: 'CÔNG TY CỔ PHẦN ĐẦU TƯ PHÁT TRIỂN ĐÔ THỊ AHA VIỆT NAM',
    ngay: '2026-08-01',
    nguoiLap: 'Bùi Phương Uyên',
    tyLe: '1/400',
    kichThuoc: '4400X2000 MM',
    tongSauThue: 48060000,
    trangThai: 'Đã gửi',
  },
  {
    id: '5',
    soBg: '102.2-2026 BG-MHV',
    loai: 'Lựa chọn Projection Mapping',
    khachHang: 'CÔNG TY TNHH MTV THOÁT NƯỚC HÀ NỘI',
    ngay: '2026-08-01',
    nguoiLap: 'Kỳ Anh',
    tyLe: '1/32000',
    kichThuoc: '3200×2500mm',
    tongSauThue: 524340000,
    trangThai: 'Bản nháp',
  },
  {
    id: '6',
    soBg: '111-2026 BG-MHV',
    loai: 'Mô hình Quy hoạch',
    khachHang: 'CÔNG TY CP - TỔNG CÔNG TY HỢP TÁC KINH TẾ VIỆT LÀO',
    ngay: '2026-08-01',
    nguoiLap: 'Bùi Thị Duyên',
    tyLe: '1/500 & 1/2000',
    kichThuoc: '3800X3800MM & 1000×1000MM',
    tongSauThue: 246780000,
    trangThai: 'Bản nháp',
  },
  {
    id: '7',
    soBg: '06.02-2026 BG-MHV',
    loai: 'Mô hình Quy hoạch',
    khachHang: 'CÔNG TY CỔ PHẦN ĐẦU TƯ PHÁT TRIỂN ĐÔ THỊ AHA VIỆT NAM',
    ngay: '2026-04-28',
    nguoiLap: 'Bùi Phương Uyên',
    tyLe: '1/400',
    kichThuoc: '4400X2000 MM',
    tongSauThue: 699420960,
    trangThai: 'Đã gửi',
  },
  {
    id: '8',
    soBg: '06.01-2026 BG-MHV',
    loai: 'Mô hình Quy hoạch',
    khachHang: 'CÔNG TY CỔ PHẦN ĐẦU TƯ PHÁT TRIỂN ĐÔ THỊ AHA VIỆT NAM',
    ngay: '2026-04-28',
    nguoiLap: 'Bùi Phương Uyên',
    tyLe: '1/400',
    kichThuoc: '4400X2000 MM',
    tongSauThue: 699420960,
    trangThai: 'Đã gửi',
  },
  {
    id: '9',
    soBg: '14-2026 BG-MHV',
    loai: 'Mô hình Quy hoạch',
    khachHang: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN T&T',
    ngay: '2026-07-29',
    nguoiLap: 'Nguyễn Phú Quang',
    tyLe: '1/200',
    kichThuoc: '2968X4118MM',
    tongSauThue: 870258643,
    trangThai: 'Đang theo dõi',
  },
  {
    id: '10',
    soBg: '107.01-2026 BG-MHV',
    loai: 'Masterplan Model Quotation (ENG)',
    khachHang: 'WORLDBRIDGE GROUP',
    ngay: '2026-07-22',
    nguoiLap: 'Bùi Phương Uyên',
    tyLe: '1/1000',
    kichThuoc: '3600X2400',
    tongSauThue: 29141,
    trangThai: 'Đã gửi',
  },
  {
    id: '11',
    soBg: '87-2026 BG-MHV',
    loai: 'Building Model Quotation (ENG)',
    khachHang: 'CÔNG TY TNHH DAEWOO ENGINEERING & CONSTRUCTION VIỆT NAM',
    ngay: '2026-07-27',
    nguoiLap: 'Nguyễn Phú Quang',
    tyLe: '1/600',
    kichThuoc: '2600X1800MM',
    tongSauThue: 0,
    trangThai: 'Đã gửi',
  },
  {
    id: '12',
    soBg: '107.02-2026 BG-MHV',
    loai: 'Masterplan Model Quotation (ENG)',
    khachHang: 'WORLDBRIDGE GROUP',
    ngay: '2026-07-22',
    nguoiLap: 'Bùi Phương Uyên',
    tyLe: '1/1000',
    kichThuoc: '3600X2400',
    tongSauThue: 27065.25,
    trangThai: 'Đã gửi',
  },
  {
    id: '13',
    soBg: '84-2026 BG-MHV',
    loai: 'Mô hình Quy hoạch',
    khachHang: 'CÔNG TY CỔ PHẦN LICOGI13FC',
    ngay: '2026-06-18',
    nguoiLap: 'Bùi Thị Duyên',
    tyLe: '1/500',
    kichThuoc: '1400×1200MM',
    tongSauThue: 46440000,
    trangThai: 'Đã gửi',
  },
  {
    id: '14',
    soBg: '09-2026 BG-MHV',
    loai: 'Mô hình Quy hoạch',
    khachHang: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN ĐẤT VIỆT',
    ngay: '2026-07-25',
    nguoiLap: 'Nguyễn Phú Quang',
    tyLe: '1/25000',
    kichThuoc: '5.5m x 2.9m',
    tongSauThue: 2399846400,
    trangThai: 'Bản nháp',
  },
  {
    id: '15',
    soBg: '110.1-2026 BGG-MHV',
    loai: 'Mô hình Biệt thự - Nội thất',
    khachHang: 'CÔNG TY CP - TỔNG CÔNG TY HỢP TÁC KINH TẾ VIỆT LÀO',
    ngay: '2026-07-24',
    nguoiLap: 'Bùi Thị Duyên',
    tyLe: '1/90',
    kichThuoc: '1400×1600mm',
    tongSauThue: 963090000,
    trangThai: 'Đã gửi',
  },
  {
    id: '16',
    soBg: '110-2026 BGG-MHV',
    loai: 'Mô hình Biệt thự - Nội thất',
    khachHang: 'CÔNG TY CP - TỔNG CÔNG TY HỢP TÁC KINH TẾ VIỆT LÀO',
    ngay: '2026-07-24',
    nguoiLap: 'Bùi Thị Duyên',
    tyLe: '',
    kichThuoc: '',
    tongSauThue: 943650000,
    trangThai: 'Đã gửi',
  },
  {
    id: '17',
    soBg: '110.3.1-2026 BG-MHV',
    loai: 'Mô hình Biệt thự - Nội thất',
    khachHang: 'CÔNG TY CP - TỔNG CÔNG TY HỢP TÁC KINH TẾ VIỆT LÀO',
    ngay: '2026-07-24',
    nguoiLap: 'Bùi Thị Duyên',
    tyLe: '1/90',
    kichThuoc: '1400×1600mm',
    tongSauThue: 290530800,
    trangThai: 'Đã gửi',
  },
  {
    id: '18',
    soBg: '110.4-2026 BG-MHV',
    loai: 'Mô hình Biệt thự - Nội thất',
    khachHang: 'CÔNG TY CP - TỔNG CÔNG TY HỢP TÁC KINH TẾ VIỆT LÀO',
    ngay: '2026-07-22',
    nguoiLap: 'Bùi Thị Duyên',
    tyLe: '',
    kichThuoc: '',
    tongSauThue: 32400000,
    trangThai: 'Đã gửi',
  },
  {
    id: '19',
    soBg: '110.3-2026 BG-MHV',
    loai: 'Mô hình Biệt thự - Nội thất',
    khachHang: 'CÔNG TY CP - TỔNG CÔNG TY HỢP TÁC KINH TẾ VIỆT LÀO',
    ngay: '2026-07-22',
    nguoiLap: 'Bùi Thị Duyên',
    tyLe: '1/100',
    kichThuoc: '1400×1600mm',
    tongSauThue: 271090800,
    trangThai: 'Đã gửi',
  },
  {
    id: '20',
    soBg: '110.2-2026 BG-MHV',
    loai: 'Mô hình Biệt thự - Nội thất',
    khachHang: 'CÔNG TY CP - TỔNG CÔNG TY HỢP TÁC KINH TẾ VIỆT LÀO',
    ngay: '2026-07-22',
    nguoiLap: 'Bùi Thị Duyên',
    tyLe: '1/30',
    kichThuoc: '1300×1100mm',
    tongSauThue: 313615800,
    trangThai: 'Đã gửi',
  },
  {
    id: '21',
    soBg: '110.1-2026 BG-MHV',
    loai: 'Mô hình Biệt thự - Nội thất',
    khachHang: 'CÔNG TY CP - TỔNG CÔNG TY HỢP TÁC KINH TẾ VIỆT LÀO',
    ngay: '2026-07-22',
    nguoiLap: 'Bùi Thị Duyên',
    tyLe: '1/30',
    kichThuoc: '1300×1100mm',
    tongSauThue: 326543400,
    trangThai: 'Đã gửi',
  },
  {
    id: '22',
    soBg: '96-2026 BG-MHV',
    loai: 'Mô hình Quy hoạch',
    khachHang: 'TỔNG CÔNG TY MBLAND',
    ngay: '2026-07-17',
    nguoiLap: 'Thảo Phùng',
    tyLe: '1/500',
    kichThuoc: '3600X3600',
    tongSauThue: 1252271988,
    trangThai: 'Đã gửi',
  },
];

export default function BaoGia() {
  const [items, setItems] = useState<BaoGiaItem[]>(INITIAL_DATA);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof BaoGiaItem | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  // Form active data
  const [editingItem, setEditingItem] = useState<BaoGiaItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<BaoGiaItem | null>(null);

  // Form inputs
  const [formSoBg, setFormSoBg] = useState('');
  const [formLoai, setFormLoai] = useState('Mô hình Quy hoạch');
  const [formKhachHang, setFormKhachHang] = useState('');
  const [formNgay, setFormNgay] = useState('');
  const [formTongSauThue, setFormTongSauThue] = useState('');
  const [formTrangThai, setFormTrangThai] = useState<BaoGiaItem['trangThai']>('Bản nháp');

  // Summary Cards values
  const totalCount = 22; // Matching screenshot 22 total
  const pendingCount = 16;
  const chotCount = 0;
  const closedValue = 0;

  const formatCurrency = (amount: number) => {
    if (amount === 0) return '—';
    if (amount % 1 !== 0) {
      const parts = amount.toFixed(2).split('.');
      const integerPart = parseInt(parts[0]).toLocaleString('vi-VN');
      return `VND ${integerPart},${parts[1]}`;
    }
    return `VND ${amount.toLocaleString('vi-VN')}`;
  };

  const getSuggestedSoBg = () => {
    return `112-2026 BG-MHV`;
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleSaveNewItem = (newItemData: Omit<BaoGiaItem, 'id'>) => {
    const newItem: BaoGiaItem = {
      id: Date.now().toString(),
      ...newItemData,
      nguoiLap: newItemData.nguoiLap || 'Kỳ Anh',
      tyLe: newItemData.tyLe || '1/500',
      kichThuoc: newItemData.kichThuoc || '2000x1500mm',
    };
    setItems(prev => [newItem, ...prev]);
  };

  const handleOpenEditModal = (item: BaoGiaItem) => {
    setEditingItem(item);
    setFormSoBg(item.soBg);
    setFormLoai(item.loai);
    setFormKhachHang(item.khachHang);
    setFormNgay(item.ngay);
    setFormTongSauThue(item.tongSauThue.toString());
    setFormTrangThai(item.trangThai);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !formSoBg.trim() || !formKhachHang.trim()) return;

    setItems(prev =>
      prev.map(i =>
        i.id === editingItem.id
          ? {
              ...i,
              soBg: formSoBg.trim(),
              loai: formLoai,
              khachHang: formKhachHang.trim(),
              ngay: formNgay,
              tongSauThue: parseFloat(formTongSauThue) || 0,
              trangThai: formTrangThai,
            }
          : i
      )
    );
    setIsEditModalOpen(false);
    setEditingItem(null);
  };

  const handleOpenDeleteModal = (item: BaoGiaItem) => {
    setDeletingItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deletingItem) return;
    setItems(prev => prev.filter(i => i.id !== deletingItem.id));
    setSelectedIds(prev => prev.filter(id => id !== deletingItem.id));
    setIsDeleteModalOpen(false);
    setDeletingItem(null);
  };

  const handleDuplicate = (item: BaoGiaItem) => {
    const duplicatedItem: BaoGiaItem = {
      ...item,
      id: Date.now().toString(),
      soBg: `${item.soBg} (Bản sao)`,
      trangThai: 'Bản nháp',
    };
    setItems(prev => [duplicatedItem, ...prev]);
  };

  const handleApproveInline = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, trangThai: 'Đã gửi' } : item));
  };

  const handleRejectInline = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, trangThai: 'Đã từ chối' } : item));
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    if (selectedIds.length === filteredItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredItems.map(i => i.id));
    }
  };

  const handleSort = (key: keyof BaoGiaItem) => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Search & Filter
  const filteredItems = items.filter(item => {
    const q = search.toLowerCase();
    return (
      item.soBg.toLowerCase().includes(q) ||
      item.khachHang.toLowerCase().includes(q) ||
      item.loai.toLowerCase().includes(q) ||
      (item.nguoiLap || '').toLowerCase().includes(q)
    );
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = String(a[sortKey] || '').toLowerCase();
    const valB = String(b[sortKey] || '').toLowerCase();
    return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  const totalFiltered = sortedItems.length;
  const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalFiltered);
  const paginatedList = sortedItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col h-full bg-white space-y-3 p-1">
      {/* ── Sub-header Action Bar (Matches Screenshot Exactly) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Báo giá</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            NV KD soạn báo giá → Quản lý KD duyệt → Phó GĐ KD-HC phê duyệt
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => alert('Xuất danh sách báo giá thành công (Excel)')}
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
            onClick={() => setIsTemplateModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#b58b38] hover:bg-[#a17a2e] text-white text-xs font-bold rounded-md shadow-2xs transition-all cursor-pointer"
          >
            <IconAdjustmentsAlt size={14} />
            <span>Quản lý Template</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-md shadow-2xs transition-all cursor-pointer"
          >
            <IconPlus size={14} />
            <span>Tạo báo giá</span>
          </button>
        </div>
      </div>

      {/* ── Summary Stats Row (Matches Screenshot Exactly) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[64px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Tổng báo giá</p>
          <p className="text-xl font-black text-[#406c89] tracking-tight">{totalCount}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[64px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Đang chờ</p>
          <p className="text-xl font-black text-[#d97706] tracking-tight">{pendingCount}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[64px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Đã chốt</p>
          <p className="text-xl font-black text-[#059669] tracking-tight">{chotCount}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[64px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Giá trị đã chốt</p>
          <p className="text-xl font-black text-[#406c89] tracking-tight">
            {chotCount > 0 ? `${closedValue.toLocaleString('vi-VN')} đ` : '—'}
          </p>
        </div>
      </div>

      {/* ── Search Bar ── */}
      <div className="relative shrink-0">
        <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo số BG, khách hàng, tên dự án..."
          className="w-full pl-8 pr-8 py-2 bg-white border border-slate-200/80 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] shadow-2xs transition-all"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <IconX size={14} />
          </button>
        )}
      </div>

      {/* ── Table Data (Matches Screenshot Columns & Rows 100%) ── */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[1100px]">
            <thead className="sticky top-0 z-10 bg-slate-50 shadow-2xs border-b border-slate-200">
              <tr className="bg-slate-50 text-slate-500 font-semibold text-xs">
                <th className="px-3 py-3 w-10 text-center bg-slate-50 border-b border-slate-200">
                  <input
                    type="checkbox"
                    checked={sortedItems.length > 0 && selectedIds.length === sortedItems.length}
                    onChange={handleToggleAll}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-[#406c89] focus:ring-[#406c89] cursor-pointer"
                  />
                </th>

                <th className="px-4 py-3 font-semibold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('soBg')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Số BG <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="px-4 py-3 font-semibold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('loai')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Loại <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="px-4 py-3 font-semibold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('khachHang')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Khách hàng <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="px-4 py-3 font-semibold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('ngay')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Ngày <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="px-4 py-3 font-semibold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('nguoiLap')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Người lập <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="px-4 py-3 font-semibold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('tyLe')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Tỷ lệ <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="px-4 py-3 font-semibold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('kichThuoc')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Kích thước <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="px-4 py-3 font-semibold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('tongSauThue')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Tổng sau thuế <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="px-4 py-3 font-semibold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('trangThai')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Trạng thái <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-10 text-center text-xs text-slate-400">
                    Không tìm thấy báo giá nào.
                  </td>
                </tr>
              ) : (
                paginatedList.map((item) => {
                  const isSelected = selectedIds.includes(item.id);

                  let statusBadge = 'bg-slate-100 text-slate-600 border-slate-200';
                  if (item.trangThai === 'Đã gửi') statusBadge = 'bg-sky-50 text-[#406c89] border-sky-200';
                  if (item.trangThai === 'Đang theo dõi') statusBadge = 'bg-cyan-50 text-cyan-700 border-cyan-300';
                  if (item.trangThai === 'Đã chốt') statusBadge = 'bg-emerald-50 text-emerald-700 border-emerald-300';
                  if (item.trangThai === 'Đã từ chối') statusBadge = 'bg-rose-50 text-rose-700 border-rose-300';

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/70 transition-colors group ${isSelected ? 'bg-slate-50' : ''}`}
                    >
                      {/* Checkbox */}
                      <td className="px-3.5 py-4 text-center align-middle">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(item.id)}
                          className="w-3.5 h-3.5 rounded border-slate-300 text-[#406c89] focus:ring-[#406c89] cursor-pointer"
                        />
                      </td>

                      {/* Số BG + Actions */}
                      <td className="px-4 py-4 align-top max-w-[220px]">
                        <div className="flex flex-col gap-1.5">
                          <span className="font-bold text-[#406c89] text-xs leading-snug cursor-pointer hover:underline">
                            {item.soBg}
                          </span>
                          <div className="flex items-center gap-2 text-slate-400">
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(item)}
                              className="hover:text-slate-700 cursor-pointer transition-colors"
                              title="Sửa"
                            >
                              <IconPencil size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDuplicate(item)}
                              className="hover:text-slate-700 cursor-pointer transition-colors"
                              title="Nhân bản"
                            >
                              <IconCopy size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenDeleteModal(item)}
                              className="hover:text-rose-600 cursor-pointer transition-colors"
                              title="Xóa"
                            >
                              <IconTrash size={14} />
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Loại */}
                      <td className="px-4 py-4 align-top whitespace-nowrap">
                        <span className="inline-block px-2.5 py-1 rounded bg-sky-50 border border-sky-200 text-[#406c89] font-medium text-[11px]">
                          {item.loai}
                        </span>
                      </td>

                      {/* Khách hàng */}
                      <td className="px-4 py-4 align-top max-w-[240px]">
                        <span className="font-bold text-slate-800 text-xs leading-snug">
                          {item.khachHang}
                        </span>
                      </td>

                      {/* Ngày */}
                      <td className="px-4 py-4 align-top text-xs text-slate-500 whitespace-nowrap">
                        {item.ngay}
                      </td>

                      {/* Người lập */}
                      <td className="px-4 py-4 align-top text-xs font-medium text-slate-600 whitespace-nowrap">
                        {item.nguoiLap || '—'}
                      </td>

                      {/* Tỷ lệ */}
                      <td className="px-4 py-4 align-top text-xs text-slate-600 whitespace-nowrap">
                        {item.tyLe || '—'}
                      </td>

                      {/* Kích thước */}
                      <td className="px-4 py-4 align-top text-xs text-slate-600 whitespace-nowrap font-mono">
                        {item.kichThuoc || '—'}
                      </td>

                      {/* Tổng sau thuế */}
                      <td className="px-4 py-4 align-top whitespace-nowrap">
                        <span className="font-bold text-slate-900 text-xs">
                          {formatCurrency(item.tongSauThue)}
                        </span>
                      </td>

                      {/* Trạng thái */}
                      <td className="px-4 py-4 align-top whitespace-nowrap">
                        <div className="flex flex-col gap-1.5 items-start">
                          <button
                            type="button"
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold transition-colors cursor-pointer ${statusBadge}`}
                          >
                            <span>{item.trangThai}</span>
                            <IconChevronDown size={12} className="opacity-60" />
                          </button>

                          {item.trangThai === 'Bản nháp' && (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <button
                                type="button"
                                onClick={() => handleApproveInline(item.id)}
                                className="px-1.5 py-0.5 rounded border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[10px] font-bold flex items-center gap-0.5 transition-colors cursor-pointer"
                              >
                                <IconCheck size={11} />
                                <span>Duyệt</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRejectInline(item.id)}
                                className="px-1.5 py-0.5 rounded border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 text-[10px] font-bold flex items-center gap-0.5 transition-colors cursor-pointer"
                              >
                                <IconX size={11} />
                                <span>Từ chối</span>
                              </button>
                            </div>
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
            Hiển thị <span className="font-bold text-slate-700">{totalFiltered > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số <span className="font-bold text-slate-700">{totalFiltered}</span> báo giá
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

      {/* Modals */}
      <ThemBaoGiaModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveNewItem}
        suggestedSoBg={getSuggestedSoBg()}
      />

      {isEditModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 transition-all">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800">Chỉnh sửa Báo giá</h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Số BG</label>
                <input
                  type="text"
                  value={formSoBg}
                  onChange={(e) => setFormSoBg(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-slate-50/60 focus:border-[#406c89] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Khách hàng</label>
                <input
                  type="text"
                  value={formKhachHang}
                  onChange={(e) => setFormKhachHang(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-slate-50/60 focus:border-[#406c89] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Loại mô hình</label>
                <select
                  value={formLoai}
                  onChange={(e) => setFormLoai(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white focus:border-[#406c89] outline-none"
                >
                  <option value="Mô hình Quy hoạch">Mô hình Quy hoạch</option>
                  <option value="Mô hình Kiến trúc">Mô hình Kiến trúc</option>
                  <option value="Mô hình Nội thất">Mô hình Nội thất</option>
                  <option value="Lựa chọn Projection Mapping">Lựa chọn Projection Mapping</option>
                  <option value="Masterplan Model Quotation (ENG)">Masterplan Model Quotation (ENG)</option>
                  <option value="Building Model Quotation (ENG)">Building Model Quotation (ENG)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ngày</label>
                <input
                  type="date"
                  value={formNgay}
                  onChange={(e) => setFormNgay(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-slate-50/60 focus:border-[#406c89] outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tổng sau thuế (VND)</label>
                <input
                  type="number"
                  value={formTongSauThue}
                  onChange={(e) => setFormTongSauThue(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-slate-50/60 focus:border-[#406c89] outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Trạng thái</label>
                <select
                  value={formTrangThai}
                  onChange={(e) => setFormTrangThai(e.target.value as BaoGiaItem['trangThai'])}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white focus:border-[#406c89] outline-none"
                >
                  <option value="Bản nháp">Bản nháp</option>
                  <option value="Đã gửi">Đã gửi</option>
                  <option value="Đang theo dõi">Đang theo dõi</option>
                  <option value="Đã chốt">Đã chốt</option>
                  <option value="Đã từ chối">Đã từ chối</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#406c89] hover:bg-[#345972] text-white font-bold cursor-pointer"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <XoaBaoGiaModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        deletingItem={deletingItem}
      />

      <QuanLyTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
      />
    </div>
  );
}
