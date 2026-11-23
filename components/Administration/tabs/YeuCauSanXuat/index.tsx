"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  IconPlus,
  IconSearch,
  IconPencil,
  IconTrash,
  IconArrowsSort,
  IconX,
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
  IconCheck,
  IconCopy,
  IconLoader2,
  IconRefresh,
  IconCircleCheck,
  IconCircleX,
} from '@tabler/icons-react';
import TaoYCSXModal from './modal/TaoYCSX';
import ChinhSuaYCSXModal from './modal/ChinhSuaYCSX';
import XoaYCSXModal from './modal/XoaYCSX';
import { getYcsxList, updateYcsxStatus, deleteYcsx } from '@/api/apiGetYcsx';
import { NotificationExtension } from '@/common/extension/NotificationExtension';

export interface YcsxItem {
  id: string;
  soYcsx: string;
  tenDuAn: string;
  khachHang: string;
  khachHangMaDa?: string;
  nguoiLap: string;
  tyLe: string;
  kichThuoc: string;
  ngayBatDau: string;
  ngayKetThuc: string;
  trangThai: string;
}

const STATUS_OPTIONS = [
  'Bản nháp',
  'Chờ duyệt QL KD',
  'QL KD đã duyệt',
  'Chờ duyệt Phó GĐ',
  'PGĐ đã duyệt',
  'Từ chối',
];

export const SAMPLE_YCSX_LIST: YcsxItem[] = [];

const ITEMS_PER_PAGE = 10;

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'PGĐ đã duyệt':      return 'bg-emerald-50 text-emerald-700 border-emerald-300';
    case 'QL KD đã duyệt':    return 'bg-blue-50 text-blue-700 border-blue-300';
    case 'Chờ duyệt QL KD':   return 'bg-amber-50 text-amber-700 border-amber-300';
    case 'Chờ duyệt Phó GĐ':  return 'bg-purple-50 text-purple-700 border-purple-300';
    case 'Từ chối':            return 'bg-rose-50 text-rose-600 border-rose-300';
    default:                   return 'bg-slate-100 text-slate-600 border-slate-200';
  }
};

export default function YeuCauSanXuat() {
  const [ycsxList, setYcsxList] = useState<YcsxItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<keyof YcsxItem | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [openStatusDropdownId, setOpenStatusDropdownId] = useState<string | null>(null);

  const [isTaoModalOpen, setIsTaoModalOpen] = useState(false);
  const [selectedItemToEdit, setSelectedItemToEdit] = useState<YcsxItem | null>(null);
  const [isChinhSuaModalOpen, setIsChinhSuaModalOpen] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState<YcsxItem | null>(null);
  const [isXoaModalOpen, setIsXoaModalOpen] = useState(false);

  // ── Drag to scroll ngang bằng chuột (Giữ chuột lướt bảng) ──
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Không bắt đầu drag nếu click vào button, input, select hoặc link
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('a') || target.closest('[role="button"]')) {
      return;
    }
    if (!tableContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - tableContainerRef.current.offsetLeft);
    setScrollLeftState(tableContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !tableContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - tableContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Hệ số cuộn mượt
    tableContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  // Fetch dữ liệu từ API Backend ProductionRequest
  const fetchYcsxData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getYcsxList({ limit: 200 });
      setYcsxList(res);
    } catch (err) {
      console.warn('Lỗi tải danh sách YCSX:', err);
      setYcsxList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchYcsxData();
  }, [fetchYcsxData]);

  const filtered = ycsxList.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      item.soYcsx.toLowerCase().includes(q) ||
      item.tenDuAn.toLowerCase().includes(q) ||
      item.khachHang.toLowerCase().includes(q) ||
      item.nguoiLap.toLowerCase().includes(q)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const va = String(a[sortKey] || '').toLowerCase();
    const vb = String(b[sortKey] || '').toLowerCase();
    return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  useEffect(() => { setCurrentPage(1); }, [searchTerm]);

  const totalFiltered = sorted.length;
  const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalFiltered);
  const paginatedList = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSort = (key: keyof YcsxItem) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const handleSelectStatus = async (id: string, newStatus: string) => {
    // Cập nhật UI ngay lập tức
    setYcsxList(prev => prev.map(i => i.id === id ? { ...i, trangThai: newStatus } : i));
    setOpenStatusDropdownId(null);
    // Gửi cập nhật lên backend
    const ok = await updateYcsxStatus(id, newStatus);
    if (ok) {
      NotificationExtension.Success(`Cập nhật trạng thái thành "${newStatus}" thành công!`, 'Thành công');
    } else {
      NotificationExtension.Fails('Cập nhật trạng thái thất bại!', 'Lỗi');
      fetchYcsxData();
    }
  };

  const handleQuickApprove = async (id: string) => {
    const item = ycsxList.find(i => i.id === id);
    let nextStatus = 'QL KD đã duyệt';
    if (item?.trangThai === 'QL KD đã duyệt' || item?.trangThai === 'Chờ duyệt Phó GĐ') {
      nextStatus = 'PGĐ đã duyệt';
    }
    await handleSelectStatus(id, nextStatus);
  };

  const handleQuickReject = async (id: string) => {
    await handleSelectStatus(id, 'Từ chối');
  };

  const handleDeleteItem = async (id: string) => {
    const ok = await deleteYcsx(id);
    if (ok) {
      setYcsxList(prev => prev.filter(item => item.id !== id));
      NotificationExtension.Success('Đã xóa Yêu cầu sản xuất thành công!', 'Thành công');
    } else {
      NotificationExtension.Fails('Xóa Yêu cầu sản xuất thất bại!', 'Lỗi');
    }
  };

  const handleDuplicateItem = (item: YcsxItem) => {
    const newItem: YcsxItem = {
      ...item,
      id: `ycsx-${Date.now()}`,
      soYcsx: `${item.soYcsx}-COPY`,
    };
    setYcsxList((prev) => [newItem, ...prev]);
  };

  const choDuyet = ycsxList.filter(i => i.trangThai.toLowerCase().includes('chờ')).length;
  const daDuyet  = ycsxList.filter(i => i.trangThai.toLowerCase().includes('duyệt')).length;
  const banNhap  = ycsxList.filter(i => i.trangThai.toLowerCase().includes('nháp')).length;

  const SortTh = ({ col, label }: { col: keyof YcsxItem; label: string }) => (
    <th className="px-3 py-3 cursor-pointer whitespace-nowrap" onClick={() => handleSort(col)}>
      <span className="inline-flex items-center gap-1 font-bold text-slate-600 text-[11px]">
        {label} <IconArrowsSort size={11} className="text-slate-300" />
      </span>
    </th>
  );

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white space-y-2.5 sm:space-y-3 p-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Yêu cầu sản xuất</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            NV KD lập YCSX → Quản lý KD duyệt → Phó GĐ phê duyệt
          </p>
        </div>
        <div className="flex items-center gap-1.5 self-start sm:self-auto w-full sm:w-auto">
          <button type="button" onClick={() => setIsTaoModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-1 px-3 py-1.5 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-md shadow-2xs transition-all cursor-pointer active:scale-95">
            <IconPlus size={14} /><span>Tạo YCSX</span>
          </button>
        </div>
      </div>

      {/* ── Stats (2x2 on Mobile, 4 Cols on Desktop) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-3 shrink-0">
        {[
          { label: 'Tổng YCSX',  value: ycsxList.length, color: 'text-slate-900' },
          { label: 'Chờ duyệt',  value: choDuyet,         color: 'text-amber-600' },
          { label: 'Đã duyệt',   value: daDuyet,           color: 'text-emerald-600' },
          { label: 'Bản nháp',   value: banNhap,           color: 'text-slate-500' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-slate-200/80 rounded-xl p-2.5 sm:p-3.5 shadow-2xs flex flex-col justify-center min-h-[54px] sm:min-h-[64px]">
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-semibold mb-0.5 truncate">{label}</p>
            <p className={`text-base sm:text-xl font-black tracking-tight ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* ── Search Bar ── */}
      <div className="relative shrink-0">
        <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm theo số YCSX, khách hàng, tên dự án..."
          className="w-full pl-8 pr-8 py-1.5 bg-white border border-slate-200/80 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] shadow-2xs transition-all"
        />
        {searchTerm && (
          <button type="button" onClick={() => setSearchTerm('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full cursor-pointer"
            title="Xóa tìm kiếm">
            <IconX size={14} />
          </button>
        )}
      </div>

      {/* MOBILE SCROLL HINT */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 sm:hidden">
        <span className="italic">← Vuốt ngang bảng để xem thêm thông tin & trạng thái →</span>
      </div>

      {/* ── Table ── */}
      <div className="flex-1 flex flex-col min-h-[350px] sm:min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div
          ref={tableContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex-1 overflow-x-auto sm:overflow-auto min-h-0 overscroll-x-contain [-webkit-overflow-scrolling:touch] no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
        >
          <table className="w-full text-xs text-left border-collapse min-w-[960px] sm:min-w-[1100px]">
            <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200">
              <tr>
                <SortTh col="soYcsx"     label="Số YCSX" />
                <SortTh col="khachHang"  label="Khách hàng" />
                <SortTh col="tenDuAn"    label="Dự án / Mô hình" />
                <SortTh col="nguoiLap"   label="Người lập" />
                <SortTh col="tyLe"       label="Tỷ lệ" />
                <SortTh col="kichThuoc"  label="Kích thước" />
                <SortTh col="ngayBatDau" label="Ngày bắt đầu" />
                <SortTh col="ngayKetThuc" label="Ngày kết thúc" />
                <SortTh col="trangThai"  label="Trạng thái" />
                <th className="px-3 py-3 text-center whitespace-nowrap">
                  <span className="font-bold text-slate-600 text-[11px]">Hành động</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={10} className="px-4 py-16 text-center text-xs text-slate-400">
                    <IconLoader2 size={28} className="mx-auto mb-2 text-[#406c89] animate-spin" />
                    <p className="font-semibold text-slate-600">Đang tải danh sách Yêu cầu sản xuất...</p>
                  </td>
                </tr>
              ) : paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-10 text-center text-xs text-slate-400">
                    Không tìm thấy yêu cầu sản xuất nào.
                  </td>
                </tr>
              ) : paginatedList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Số YCSX */}
                    <td className="px-3 py-3 align-top whitespace-nowrap min-w-[150px]">
                      <span className="font-bold text-[#406c89] text-[11px] leading-snug cursor-pointer hover:underline">
                        {item.soYcsx}
                      </span>
                    </td>

                    {/* Khách hàng */}
                    <td className="px-3 py-3 align-top max-w-[160px]">
                      <span className="font-semibold text-amber-600 text-[11px] leading-snug block">
                        {item.khachHang}
                      </span>
                    </td>

                    {/* Dự án / Mô hình */}
                    <td className="px-3 py-3 align-top max-w-[180px]">
                      <span className="font-semibold text-[#406c89] text-[11px] leading-snug block">
                        {item.tenDuAn}
                      </span>
                    </td>

                    {/* Người lập */}
                    <td className="px-3 py-3 align-top whitespace-nowrap">
                      <span className="text-[11px] text-slate-600 font-medium">{item.nguoiLap}</span>
                    </td>

                    {/* Tỷ lệ */}
                    <td className="px-3 py-3 align-top whitespace-nowrap">
                      <span className="text-[11px] text-slate-600 font-medium">{item.tyLe}</span>
                    </td>

                    {/* Kích thước */}
                    <td className="px-3 py-3 align-top whitespace-nowrap">
                      <span className="text-[11px] text-slate-600 font-medium">{item.kichThuoc}</span>
                    </td>

                    {/* Ngày bắt đầu */}
                    <td className="px-3 py-3 align-top whitespace-nowrap">
                      <span className="text-[11px] text-slate-500 font-mono">{item.ngayBatDau}</span>
                    </td>

                    {/* Ngày kết thúc */}
                    <td className="px-3 py-3 align-top whitespace-nowrap">
                      <span className="text-[11px] text-slate-500 font-mono">{item.ngayKetThuc}</span>
                    </td>

                    {/* Trạng thái */}
                    <td className="px-3 py-3 align-top whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-semibold ${getStatusStyle(item.trangThai)}`}>
                        {item.trangThai}
                      </span>
                    </td>

                    {/* Hành động */}
                    <td className="px-3 py-3 align-top whitespace-nowrap text-center">
                      <div className="inline-flex items-center justify-center gap-1 text-slate-400">
                        <button
                          type="button"
                          onClick={() => { setSelectedItemToEdit(item); setIsChinhSuaModalOpen(true); }}
                          className="hover:text-amber-600 hover:bg-amber-50 p-1.5 rounded transition-colors cursor-pointer active:scale-95"
                          title="Chỉnh sửa"
                        >
                          <IconPencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => { setSelectedItemToDelete(item); setIsXoaModalOpen(true); }}
                          className="hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded transition-colors cursor-pointer active:scale-95"
                          title="Xóa"
                        >
                          <IconTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div className="shrink-0 border-t border-slate-100 px-3 sm:px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
          <div className="text-center sm:text-left">
            Hiển thị <span className="font-bold text-slate-700">{totalFiltered > 0 ? startIndex + 1 : 0}</span> -{' '}
            <span className="font-bold text-slate-700">{endIndex}</span> trên{' '}
            <span className="font-bold text-slate-700">{totalFiltered}</span> yêu cầu
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1">
            <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer active:scale-95">
              <IconChevronLeft size={13} /><span>Trước</span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} type="button" onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer active:scale-95 ${currentPage === page ? 'bg-[#406c89] text-white shadow-2xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                {page}
              </button>
            ))}
            <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer active:scale-95">
              <span>Sau</span><IconChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TaoYCSXModal
        isOpen={isTaoModalOpen}
        onClose={() => setIsTaoModalOpen(false)}
        onSubmitSuccess={() => fetchYcsxData()}
      />
      <ChinhSuaYCSXModal
        isOpen={isChinhSuaModalOpen}
        itemData={selectedItemToEdit}
        onClose={() => setIsChinhSuaModalOpen(false)}
        onSaveSuccess={(updatedData) => {
          setYcsxList(prev => prev.map(item => item.id === updatedData.id ? updatedData : item));
          fetchYcsxData();
        }}
      />
      <XoaYCSXModal
        isOpen={isXoaModalOpen}
        itemData={selectedItemToDelete}
        onClose={() => setIsXoaModalOpen(false)}
        onConfirmDelete={(id) => handleDeleteItem(id)}
      />
    </div>
  );
}
