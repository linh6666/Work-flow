"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import ThemBaoGiaModal from './modal/ThemBaoGiaModal';
import SuaBaoGiaModal from './modal/SuaBaoGia';
import XoaBaoGiaModal from './modal/XoaBaoGia';
import XemChiTietBaoGiaModal from './modal/XemChiTiet';
import QuanLyTemplateModal from './modal/QuanLyTemplate';
import Pagination from '@/common/pagination';
import {
  getQuotationList,
  createQuotation,
  updateQuotation,
  deleteQuotation,
  QuotationRecord,
} from '@/api/apiGetQuotation';
import {
  IconPlus,
  IconSearch,
  IconPencil,
  IconTrash,
  IconCopy,
  IconEye,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconX,
  IconDownload,
  IconUpload,
  IconAdjustmentsAlt,
  IconArrowsSort,
  IconCheck,
  IconLoader2,
  IconRefresh,
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

const INITIAL_DATA: BaoGiaItem[] = [];

export default function BaoGia() {
  const [items, setItems] = useState<BaoGiaItem[]>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof BaoGiaItem | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  // Form active data
  const [editingItem, setEditingItem] = useState<BaoGiaItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<BaoGiaItem | null>(null);
  const [viewingItem, setViewingItem] = useState<BaoGiaItem | null>(null);

  // Hàm map record từ API sang BaoGiaItem
  const mapApiToBaoGiaItem = (rec: QuotationRecord): BaoGiaItem => {
    let trangThai: BaoGiaItem['trangThai'] = 'Bản nháp';
    const statusRaw = (rec.status || rec.approval_status || '').toLowerCase();
    if (statusRaw.includes('đã gửi') || statusRaw.includes('sent')) trangThai = 'Đã gửi';
    else if (statusRaw.includes('đang theo dõi') || statusRaw.includes('following')) trangThai = 'Đang theo dõi';
    else if (statusRaw.includes('đã chốt') || statusRaw.includes('closed') || statusRaw.includes('đã duyệt')) trangThai = 'Đã chốt';
    else if (statusRaw.includes('từ chối') || statusRaw.includes('rejected')) trangThai = 'Đã từ chối';
    else if (statusRaw.includes('chờ') || statusRaw.includes('pending')) trangThai = 'Chờ duyệt';
    else if (statusRaw.includes('soạn') || statusRaw.includes('drafting')) trangThai = 'Đang soạn';

    const numTotal = typeof rec.total_after_tax === 'number' 
      ? rec.total_after_tax 
      : parseFloat(String(rec.total_after_tax || 0).replace(/[^\d.-]/g, '')) || 0;

    return {
      id: rec.id || String(Math.random()),
      soBg: rec.quote_number || rec.code || rec.project_name || 'Báo giá',
      loai: rec.quote_type || rec.type || 'Mô hình Quy hoạch',
      khachHang: rec.customer_name || '—',
      ngay: rec.date || rec.quote_date || rec.created_at?.split('T')[0] || rec.created_date?.split('T')[0] || new Date().toISOString().split('T')[0],
      nguoiLap: rec.pgd_approver_name || rec.creator_name || rec.created_by || '—',
      tyLe: rec.scale || '—',
      kichThuoc: rec.size || '—',
      tongSauThue: numTotal,
      trangThai,
    };
  };

  // Fetch danh sách Quotation từ API
  const fetchQuotations = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getQuotationList(200);
      if (Array.isArray(data) && data.length > 0) {
        const mapped = data.map(mapApiToBaoGiaItem);
        setItems(mapped);
      }
    } catch (err) {
      console.warn('Lỗi khi fetch danh sách Quotation:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuotations();
  }, [fetchQuotations]);

  // Form inputs
  const [formSoBg, setFormSoBg] = useState('');
  const [formLoai, setFormLoai] = useState('Mô hình Quy hoạch');
  const [formKhachHang, setFormKhachHang] = useState('');
  const [formNgay, setFormNgay] = useState('');
  const [formTongSauThue, setFormTongSauThue] = useState('');
  const [formTrangThai, setFormTrangThai] = useState<BaoGiaItem['trangThai']>('Bản nháp');

  // Summary Cards values tính tự động từ items
  const totalCount = items.length;
  const pendingCount = items.filter(i => i.trangThai === 'Bản nháp' || i.trangThai === 'Chờ duyệt' || i.trangThai === 'Đang soạn').length;
  const chotCount = items.filter(i => i.trangThai === 'Đã chốt').length;
  const closedValue = items
    .filter(i => i.trangThai === 'Đã chốt')
    .reduce((sum, i) => sum + (i.tongSauThue || 0), 0);

  // Drag-to-scroll table state & handlers
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = tableContainerRef.current;
    if (!container) return;
    // Don't trigger drag on interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button, input, select, a, textarea')) return;

    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeftState(container.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !tableContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - tableContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    tableContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

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

  const handleSaveNewItem = async (newItemData: Omit<BaoGiaItem, 'id'>) => {
    try {
      const res = await createQuotation({
        quote_number: newItemData.soBg,
        project_name: newItemData.soBg,
        type: newItemData.loai,
        customer_name: newItemData.khachHang,
        quote_date: newItemData.ngay,
        creator_name: newItemData.nguoiLap || 'Kỳ Anh',
        scale: newItemData.tyLe || '1/500',
        size: newItemData.kichThuoc || '2000x1500mm',
        total_after_tax: newItemData.tongSauThue,
        approval_status: newItemData.trangThai,
      });

      if (res.success && res.data?.id) {
        await fetchQuotations();
        return;
      }
    } catch (err) {
      console.warn('Lỗi khi gọi API tạo báo giá:', err);
    }

    // Fallback local update
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
    setIsEditModalOpen(true);
  };

  const handleOpenDetailModal = (item: BaoGiaItem) => {
    setViewingItem(item);
    setIsDetailModalOpen(true);
  };

  const handleSaveEditItem = async (updatedItem: BaoGiaItem) => {
    try {
      const res = await updateQuotation(updatedItem.id, {
        quote_number: updatedItem.soBg,
        project_name: updatedItem.soBg,
        type: updatedItem.loai,
        customer_name: updatedItem.khachHang,
        quote_date: updatedItem.ngay,
        creator_name: updatedItem.nguoiLap,
        scale: updatedItem.tyLe,
        size: updatedItem.kichThuoc,
        total_after_tax: updatedItem.tongSauThue,
        approval_status: updatedItem.trangThai,
      });

      if (res.success) {
        await fetchQuotations();
      }
    } catch (err) {
      console.warn('Lỗi khi gọi API cập nhật báo giá:', err);
    }

    setItems(prev => prev.map(i => (i.id === updatedItem.id ? updatedItem : i)));
    setIsEditModalOpen(false);
    setEditingItem(null);
  };

  const handleOpenDeleteModal = (item: BaoGiaItem) => {
    setDeletingItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    try {
      await deleteQuotation(deletingItem.id);
      await fetchQuotations();
    } catch (err) {
      console.warn('Lỗi khi gọi API xóa báo giá:', err);
    }

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
    <div className="flex-1 flex flex-col min-h-0 bg-white space-y-2.5 sm:space-y-3 p-1">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* ── Sub-header Action Bar (Matches Screenshot Exactly) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Báo giá</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            NV KD soạn báo giá → Quản lý KD duyệt → Phó GĐ KD-HC phê duyệt
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto w-full sm:w-auto">
          <button
            type="button"
            onClick={fetchQuotations}
            disabled={isLoading}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-2.5 py-1.5 sm:py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-md shadow-2xs transition-colors cursor-pointer active:scale-95 disabled:opacity-60"
            title="Tải lại danh sách từ server"
          >
            <IconRefresh size={13} className={`text-slate-500 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Đang tải...' : 'Làm mới'}</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Xuất danh sách báo giá thành công (Excel)')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-2.5 py-1.5 sm:py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-md shadow-2xs transition-colors cursor-pointer active:scale-95"
          >
            <IconDownload size={13} className="text-slate-500" />
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Vui lòng chọn file Excel để Import')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-2.5 py-1.5 sm:py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-md shadow-2xs transition-colors cursor-pointer active:scale-95"
          >
            <IconUpload size={13} className="text-slate-500" />
            <span>Import</span>
          </button>

          <button
            type="button"
            onClick={() => setIsTemplateModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-2.5 py-1.5 sm:py-1 bg-[#b58b38] hover:bg-[#a17a2e] text-white text-[11px] sm:text-xs font-bold rounded-md shadow-2xs transition-all cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <IconAdjustmentsAlt size={14} />
            <span>Template</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="w-full sm:w-auto flex items-center justify-center gap-1 px-3 py-1.5 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-md shadow-2xs transition-all cursor-pointer active:scale-95"
          >
            <IconPlus size={14} />
            <span>Tạo báo giá</span>
          </button>
        </div>
      </div>

      {/* ── Summary Stats Row (Compact Size) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2.5 shrink-0">
        <div className="bg-white border border-slate-200/80 rounded-lg p-2 sm:px-3 sm:py-2 shadow-2xs flex flex-col justify-center min-h-[46px] sm:min-h-[50px]">
          <p className="text-[10px] text-slate-400 font-semibold mb-0.5 truncate">Tổng báo giá</p>
          <p className="text-sm sm:text-base font-black text-[#406c89] tracking-tight leading-none">{totalCount}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-lg p-2 sm:px-3 sm:py-2 shadow-2xs flex flex-col justify-center min-h-[46px] sm:min-h-[50px]">
          <p className="text-[10px] text-slate-400 font-semibold mb-0.5 truncate">Đang chờ</p>
          <p className="text-sm sm:text-base font-black text-[#d97706] tracking-tight leading-none">{pendingCount}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-lg p-2 sm:px-3 sm:py-2 shadow-2xs flex flex-col justify-center min-h-[46px] sm:min-h-[50px]">
          <p className="text-[10px] text-slate-400 font-semibold mb-0.5 truncate">Đã chốt</p>
          <p className="text-sm sm:text-base font-black text-[#059669] tracking-tight leading-none">{chotCount}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-lg p-2 sm:px-3 sm:py-2 shadow-2xs flex flex-col justify-center min-h-[46px] sm:min-h-[50px]">
          <p className="text-[10px] text-slate-400 font-semibold mb-0.5 truncate">Giá trị đã chốt</p>
          <p className="text-sm sm:text-base font-black text-[#406c89] tracking-tight leading-none truncate">
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
          className="w-full pl-8 pr-8 py-1.5 bg-white border border-slate-200/80 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] shadow-2xs transition-all"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full cursor-pointer"
            title="Xóa tìm kiếm"
          >
            <IconX size={14} />
          </button>
        )}
      </div>

      {/* MOBILE SCROLL HINT */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 sm:hidden">
        <span className="italic">← Vuốt ngang bảng để xem thêm thông tin & trạng thái →</span>
      </div>

      {/* ── Table Data (Matches Screenshot Columns & Rows 100%) ── */}
      <div className="flex-1 flex flex-col min-h-[350px] sm:min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div
          ref={tableContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex-1 overflow-x-auto sm:overflow-auto min-h-0 overscroll-x-contain [-webkit-overflow-scrolling:touch] select-none no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          <table className="w-full text-xs text-left border-collapse min-w-[960px] sm:min-w-[1100px]">
            <thead className="sticky top-0 z-20 bg-[#f8fafc] border-b border-slate-200 shadow-2xs">
              <tr className="bg-[#f8fafc] text-slate-500 font-semibold text-xs">
                <th className="sticky top-0 z-20 px-4 py-3 font-semibold text-xs bg-[#f8fafc] border-b border-slate-200 min-w-[280px] max-w-[380px] cursor-pointer" onClick={() => handleSort('soBg')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-700">
                    Số BG <IconArrowsSort size={12} className="text-slate-400" />
                  </span>
                </th>

                <th className="sticky top-0 z-20 px-4 py-3 font-semibold text-xs bg-[#f8fafc] border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('loai')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Loại <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="sticky top-0 z-20 px-4 py-3 font-semibold text-xs bg-[#f8fafc] border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('khachHang')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Khách hàng <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="sticky top-0 z-20 px-4 py-3 font-semibold text-xs bg-[#f8fafc] border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('ngay')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Ngày <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="sticky top-0 z-20 px-4 py-3 font-semibold text-xs bg-[#f8fafc] border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('nguoiLap')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Người lập <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="sticky top-0 z-20 px-4 py-3 font-semibold text-xs bg-[#f8fafc] border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('tyLe')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Tỷ lệ <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="sticky top-0 z-20 px-4 py-3 font-semibold text-xs bg-[#f8fafc] border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('kichThuoc')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Kích thước <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="sticky top-0 z-20 px-4 py-3 font-semibold text-xs bg-[#f8fafc] border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('tongSauThue')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Tổng sau thuế <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="sticky top-0 z-20 px-4 py-3 font-semibold text-xs bg-[#f8fafc] border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('trangThai')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Trạng thái <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="sticky top-0 z-20 px-4 py-3 font-semibold text-xs bg-[#f8fafc] border-b border-slate-200 whitespace-nowrap text-center">
                  <span className="font-bold text-slate-700">Thao tác</span>
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
                      {/* Số BG */}
                      <td className="px-4 py-4 align-top min-w-[280px] max-w-[380px]">
                        <span className="font-bold text-[#406c89] text-xs leading-relaxed cursor-pointer hover:underline break-words">
                          {item.soBg}
                        </span>
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
                                className="px-1.5 py-0.5 rounded border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[10px] font-bold flex items-center gap-0.5 transition-colors cursor-pointer active:scale-95"
                              >
                                <IconCheck size={11} />
                                <span>Duyệt</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRejectInline(item.id)}
                                className="px-1.5 py-0.5 rounded border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 text-[10px] font-bold flex items-center gap-0.5 transition-colors cursor-pointer active:scale-95"
                              >
                                <IconX size={11} />
                                <span>Từ chối</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Thao tác */}
                      <td className="px-4 py-4 align-top whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2 text-slate-400">
                          <button
                            type="button"
                            onClick={() => handleOpenDetailModal(item)}
                            className="p-1 rounded hover:bg-slate-100 hover:text-slate-700 cursor-pointer transition-colors active:scale-95"
                            title="Xem chi tiết"
                          >
                            <IconEye size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1 rounded hover:bg-slate-100 hover:text-[#406c89] cursor-pointer transition-colors active:scale-95"
                            title="Sửa"
                          >
                            <IconPencil size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenDeleteModal(item)}
                            className="p-1 rounded hover:bg-rose-50 hover:text-rose-600 cursor-pointer transition-colors active:scale-95"
                            title="Xóa"
                          >
                            <IconTrash size={15} />
                          </button>
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalFiltered}
          itemsPerPage={ITEMS_PER_PAGE}
          itemName="báo giá"
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modals */}
      <ThemBaoGiaModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveNewItem}
        suggestedSoBg={getSuggestedSoBg()}
      />

      <SuaBaoGiaModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEditItem}
        editingItem={editingItem}
      />

      <XoaBaoGiaModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        deletingItem={deletingItem}
      />

      <XemChiTietBaoGiaModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        item={viewingItem}
      />

      <QuanLyTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
      />
    </div>
  );
}
