"use client";

import React, { useState, useEffect } from 'react';
import {
  IconCircleCheck,
  IconCircleX,
  IconExternalLink,
  IconSearch,
  IconX,
  IconArrowsSort,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';

interface ProcessApprovalItem {
  id: string;
  groupKey: 'de-xuat' | 'bao-gia';
  groupName: string;
  badgeStep: 'Chờ QL KD duyệt' | 'Chờ PGĐ duyệt';
  ma: string;
  khachHang: string;
  moTa: string;
  ngayTao: string;
  nguoiLap: string;
}

const INITIAL_PROCESS_ITEMS: ProcessApprovalItem[] = [
  {
    id: '1',
    groupKey: 'de-xuat',
    groupName: 'Đề xuất Báo giá',
    badgeStep: 'Chờ QL KD duyệt',
    ma: 'ĐXBG-009-2026',
    khachHang: 'CÔNG TY CỔ PHẦN THÁI NAM LAND',
    moTa: 'DỰ ÁN IA25 - CIPUTRA',
    ngayTao: '2026-08-03',
    nguoiLap: 'Nguyễn Phú Quang',
  },
  {
    id: '2',
    groupKey: 'bao-gia',
    groupName: 'Báo giá',
    badgeStep: 'Chờ PGĐ duyệt',
    ma: '102.1-2026/BG-MHV',
    khachHang: 'CÔNG TY TNHH MTV THOÁT NƯỚC HÀ NỘI',
    moTa: 'SA BÀN THOÁT NƯỚC TP HÀ NỘI',
    ngayTao: '2026-08-03',
    nguoiLap: '—',
  },
  {
    id: '3',
    groupKey: 'bao-gia',
    groupName: 'Báo giá',
    badgeStep: 'Chờ QL KD duyệt',
    ma: 'Tổng hợp 102.1-102.2/BG-MHV: SA BÀN THOÁT NƯỚC TP HÀ NỘI',
    khachHang: 'CÔNG TY TNHH MTV THOÁT NƯỚC HÀ NỘI',
    moTa: 'SA BÀN THOÁT NƯỚC TP HÀ NỘI',
    ngayTao: '2026-08-03',
    nguoiLap: '—',
  },
];

type FilterStep = 'tat-ca' | 'cho-ql-kd' | 'cho-pgd';
const ITEMS_PER_PAGE = 10;

export default function PheDuyetQuyTrinhTab() {
  const [items, setItems] = useState<ProcessApprovalItem[]>(INITIAL_PROCESS_ITEMS);
  const [filterStep, setFilterStep] = useState<FilterStep>('tat-ca');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<keyof ProcessApprovalItem | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter logic
  const filtered = items.filter((item) => {
    if (filterStep === 'cho-ql-kd' && item.badgeStep !== 'Chờ QL KD duyệt') return false;
    if (filterStep === 'cho-pgd' && item.badgeStep !== 'Chờ PGĐ duyệt') return false;

    const q = searchQuery.toLowerCase();
    return (
      item.ma.toLowerCase().includes(q) ||
      item.khachHang.toLowerCase().includes(q) ||
      item.groupName.toLowerCase().includes(q) ||
      item.moTa.toLowerCase().includes(q) ||
      item.nguoiLap.toLowerCase().includes(q)
    );
  });

  // Sort logic
  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const va = String(a[sortKey] || '').toLowerCase();
    const vb = String(b[sortKey] || '').toLowerCase();
    return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  // Pagination logic
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStep, sortKey, sortDir]);

  const totalFiltered = sorted.length;
  const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalFiltered);
  const paginatedList = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSort = (key: keyof ProcessApprovalItem) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const handleApprove = (id: string, ma: string) => {
    alert(`Đã phê duyệt quy trình thành công: "${ma}"`);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleReject = (id: string, ma: string) => {
    if (confirm(`Bạn có chắc chắn muốn từ chối quy trình: "${ma}"?`)) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const getStepBadgeStyle = (step: ProcessApprovalItem['badgeStep']) => {
    if (step === 'Chờ QL KD duyệt') {
      return 'bg-amber-100 text-amber-800 border-amber-200';
    }
    return 'bg-purple-100 text-purple-800 border-purple-200';
  };

  const SortTh = ({ col, label, align = 'left' }: { col: keyof ProcessApprovalItem; label: string; align?: string }) => (
    <th className={`px-4 py-3 cursor-pointer whitespace-nowrap text-${align}`} onClick={() => handleSort(col)}>
      <span className={`inline-flex items-center gap-1 font-bold text-slate-600 text-[11px] ${align === 'center' ? 'justify-center w-full' : ''}`}>
        {label} <IconArrowsSort size={11} className="text-slate-300" />
      </span>
    </th>
  );

  return (
    <div className="flex-1 flex flex-col h-full space-y-3 min-h-0 overflow-hidden">
      {/* ── 1. Header & Filter Pills Row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Hàng đợi phê duyệt quy trình Kinh doanh
          </h2>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500 text-white shadow-2xs">
            {items.length} chờ duyệt
          </span>
        </div>

        {/* Lọc theo bước */}
        <div className="flex items-center gap-2 text-xs self-start sm:self-auto">
          <span className="text-slate-400 font-medium text-[11px]">Lọc theo bước:</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setFilterStep('tat-ca')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filterStep === 'tat-ca'
                  ? 'bg-[#b58b38] text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Tất cả
            </button>
            <button
              type="button"
              onClick={() => setFilterStep('cho-ql-kd')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filterStep === 'cho-ql-kd'
                  ? 'bg-[#b58b38] text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Chờ QL KD duyệt
            </button>
            <button
              type="button"
              onClick={() => setFilterStep('cho-pgd')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filterStep === 'cho-pgd'
                  ? 'bg-[#b58b38] text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Chờ PGĐ duyệt
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. Compact Search Bar ── */}
      <div className="relative shrink-0">
        <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm theo mã quy trình, khách hàng, mô tả..."
          className="w-full pl-8 pr-8 py-2 bg-white border border-slate-200/80 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] shadow-2xs transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <IconX size={14} />
          </button>
        )}
      </div>

      {/* ── 3. Data Table ── */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-xl shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[950px]">
            <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200">
              <tr>
                <SortTh col="groupName" label="Loại quy trình" />
                <SortTh col="badgeStep" label="Trạng thái" />
                <SortTh col="ma" label="Mã & Khách hàng" />
                <SortTh col="moTa" label="Dự án / Mô tả" />
                <SortTh col="ngayTao" label="Ngày tạo" />
                <SortTh col="nguoiLap" label="Người lập" />
                <th className="px-4 py-3 font-bold text-slate-600 text-[11px] text-center whitespace-nowrap">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-xs text-slate-400">
                    Không có quy trình nào trong hàng đợi.
                  </td>
                </tr>
              ) : (
                paginatedList.map((item, idx) => (
                  <tr key={`${item.id}-${idx}`} className="hover:bg-slate-50/70 transition-colors">
                    {/* Loại quy trình */}
                    <td className="px-4 py-3.5 align-top whitespace-nowrap">
                      <span className="font-bold text-[#406c89] text-xs">
                        {item.groupName}
                      </span>
                    </td>

                    {/* Trạng thái step */}
                    <td className="px-4 py-3.5 align-top whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStepBadgeStyle(
                          item.badgeStep
                        )}`}
                      >
                        {item.badgeStep}
                      </span>
                    </td>

                    {/* Mã & Khách hàng */}
                    <td className="px-4 py-3.5 align-top max-w-[280px]">
                      <span className="font-bold text-slate-900 text-xs leading-snug block">
                        {item.ma}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium leading-snug block mt-0.5">
                        {item.khachHang}
                      </span>
                    </td>

                    {/* Dự án / Mô tả */}
                    <td className="px-4 py-3.5 align-top max-w-[260px]">
                      <span className="text-slate-600 text-[11px] leading-snug block">
                        {item.moTa}
                      </span>
                    </td>

                    {/* Ngày tạo */}
                    <td className="px-4 py-3.5 align-top font-medium text-slate-500 whitespace-nowrap">
                      {item.ngayTao}
                    </td>

                    {/* Người lập */}
                    <td className="px-4 py-3.5 align-top font-semibold text-slate-700 whitespace-nowrap">
                      {item.nguoiLap}
                    </td>

                    {/* Thao tác (Chi tiết, Duyệt, Từ chối) */}
                    <td className="px-4 py-3.5 align-top text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => alert(`Xem chi tiết: ${item.ma}`)}
                          className="text-[#406c89] hover:underline text-[11px] font-semibold flex items-center gap-0.5 cursor-pointer mr-1"
                        >
                          <IconExternalLink size={13} />
                          <span>Chi tiết</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleApprove(item.id, item.ma)}
                          className="flex items-center gap-1 px-2.5 py-1 bg-[#009b63] hover:bg-[#008354] text-white text-[11px] font-bold rounded-lg transition-all cursor-pointer shadow-2xs"
                        >
                          <IconCircleCheck size={13} />
                          <span>Duyệt</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleReject(item.id, item.ma)}
                          className="flex items-center gap-1 px-2.5 py-1 bg-white border border-rose-300 hover:bg-rose-50 text-rose-500 text-[11px] font-semibold rounded-lg transition-all cursor-pointer shadow-2xs"
                        >
                          <IconCircleX size={13} />
                          <span>Từ chối</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── 4. Pagination Footer (Pinned at Bottom) ── */}
        <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
          <div>
            Hiển thị <span className="font-bold text-slate-700">{totalFiltered > 0 ? startIndex + 1 : 0}</span> -{' '}
            <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số{' '}
            <span className="font-bold text-slate-700">{totalFiltered}</span> quy trình
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <IconChevronLeft size={13} />
              <span>Trước</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Sau</span>
              <IconChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
