"use client";

import React, { useState, useEffect } from 'react';
import {
  IconCircleCheck,
  IconCircleX,
  IconSearch,
  IconX,
  IconArrowsSort,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';

interface PendingReportItem {
  id: string;
  loai: 'Báo giá' | 'Khách hàng' | 'Theo tháng';
  tieuDe: string;
  moTa: string;
  soCv: number;
  hoanThanh: string;
  pctTb: string;
  nguoiLap: string;
}

const INITIAL_PENDING_LIST: PendingReportItem[] = [
  {
    id: '1',
    loai: 'Báo giá',
    tieuDe: 'BC CV KD - 102-2026/MÔ HÌNH SA BÀN THOÁT NƯỚC HÀ NỘI',
    moTa: 'MÔ HÌNH SA BÀN THOÁT NƯỚC HÀ NỘI',
    soCv: 80,
    hoanThanh: '0/80',
    pctTb: '0%',
    nguoiLap: 'Kỳ Anh',
  },
  {
    id: '2',
    loai: 'Báo giá',
    tieuDe: 'BC CV KD - 87-2026/BG-MHV',
    moTa: '87-2026/BG-MHV',
    soCv: 68,
    hoanThanh: '0/68',
    pctTb: '0%',
    nguoiLap: 'Nguyễn Phú Quang',
  },
  {
    id: '3',
    loai: 'Khách hàng',
    tieuDe: 'BC CV KD - 20-2026/BG-MHV: 22 LIỄU GIAI',
    moTa: 'CÔNG TY TNHH ĐẦU TƯ VÀ KINH DOANH BẤT ĐỘNG SẢN VIỆT – ÚC',
    soCv: 78,
    hoanThanh: '0/78',
    pctTb: '0%',
    nguoiLap: 'Kỳ Anh',
  },
  {
    id: '4',
    loai: 'Khách hàng',
    tieuDe: 'BC CV KD - 77-2026/BG-MHV',
    moTa: 'CÔNG TY CỔ PHẦN CLOUD PROPERTY',
    soCv: 78,
    hoanThanh: '0/78',
    pctTb: '0%',
    nguoiLap: 'Thảo Phùng',
  },
  {
    id: '5',
    loai: 'Theo tháng',
    tieuDe: 'BC CV KD - Tháng 07/2026',
    moTa: 'Báo cáo tổng hợp tháng 07/2026',
    soCv: 1,
    hoanThanh: '0/1',
    pctTb: '0%',
    nguoiLap: 'Bùi Thị Duyên',
  },
];

const ITEMS_PER_PAGE = 10;

export default function PheDuyetBaoCaoTab() {
  const [dataList, setDataList] = useState<PendingReportItem[]>(INITIAL_PENDING_LIST);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<keyof PendingReportItem | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter
  const filtered = dataList.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.tieuDe.toLowerCase().includes(q) ||
      item.moTa.toLowerCase().includes(q) ||
      item.nguoiLap.toLowerCase().includes(q) ||
      item.loai.toLowerCase().includes(q)
    );
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const va = String(a[sortKey] || '').toLowerCase();
    const vb = String(b[sortKey] || '').toLowerCase();
    return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  // Pagination
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortKey, sortDir]);

  const totalFiltered = sorted.length;
  const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalFiltered);
  const paginatedList = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSort = (key: keyof PendingReportItem) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const handleApprove = (id: string, tieuDe: string) => {
    alert(`Đã phê duyệt báo cáo thành công: "${tieuDe}"`);
    setDataList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReject = (id: string, tieuDe: string) => {
    if (confirm(`Bạn có chắc chắn muốn từ chối báo cáo: "${tieuDe}"?`)) {
      setDataList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const getPhamViBadgeStyle = (loai: PendingReportItem['loai']) => {
    switch (loai) {
      case 'Khách hàng':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Báo giá':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Theo tháng':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const SortTh = ({ col, label, align = 'left' }: { col: keyof PendingReportItem; label: string; align?: string }) => (
    <th className={`px-4 py-3 cursor-pointer whitespace-nowrap text-${align}`} onClick={() => handleSort(col)}>
      <span className={`inline-flex items-center gap-1 font-bold text-slate-600 text-[11px] ${align === 'center' ? 'justify-center w-full' : ''}`}>
        {label} <IconArrowsSort size={11} className="text-slate-300" />
      </span>
    </th>
  );

  return (
    <div className="flex-1 flex flex-col h-full space-y-3 min-h-0 overflow-hidden">
      {/* ── 1. Header Row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Hàng đợi phê duyệt — Báo cáo CV Kinh doanh
          </h2>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500 text-white shadow-2xs">
            {dataList.length} chờ duyệt
          </span>
        </div>
      </div>

      {/* ── 2. Compact Search Bar ── */}
      <div className="relative shrink-0">
        <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm theo tiêu đề, người lập, nội dung..."
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
          <table className="w-full text-xs text-left border-collapse min-w-[900px]">
            <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200">
              <tr>
                <SortTh col="loai" label="Phạm vi" />
                <SortTh col="tieuDe" label="Tiêu đề & Nội dung" />
                <SortTh col="soCv" label="Số CV" align="center" />
                <SortTh col="hoanThanh" label="Hoàn thành" align="center" />
                <SortTh col="pctTb" label="%TB" align="center" />
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
                    Không có báo cáo nào trong hàng đợi phê duyệt.
                  </td>
                </tr>
              ) : (
                paginatedList.map((item, idx) => (
                  <tr key={`${item.id}-${idx}`} className="hover:bg-slate-50/70 transition-colors">
                    {/* Phạm vi */}
                    <td className="px-4 py-3.5 align-top whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getPhamViBadgeStyle(
                          item.loai
                        )}`}
                      >
                        {item.loai}
                      </span>
                    </td>

                    {/* Tiêu đề & Nội dung */}
                    <td className="px-4 py-3.5 align-top max-w-[340px]">
                      <span className="font-bold text-slate-900 text-xs leading-snug block">
                        {item.tieuDe}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium leading-relaxed block mt-0.5">
                        {item.moTa}
                      </span>
                    </td>

                    {/* Số CV */}
                    <td className="px-4 py-3.5 align-top text-center font-semibold text-slate-700 whitespace-nowrap">
                      {item.soCv}
                    </td>

                    {/* Hoàn thành */}
                    <td className="px-4 py-3.5 align-top text-center font-bold text-emerald-600 whitespace-nowrap">
                      {item.hoanThanh}
                    </td>

                    {/* %TB */}
                    <td className="px-4 py-3.5 align-top text-center font-bold text-indigo-700 whitespace-nowrap">
                      {item.pctTb}
                    </td>

                    {/* Người lập */}
                    <td className="px-4 py-3.5 align-top font-semibold text-slate-700 whitespace-nowrap">
                      {item.nguoiLap}
                    </td>

                    {/* Thao tác (Duyệt & Từ chối) */}
                    <td className="px-4 py-3.5 align-top text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleApprove(item.id, item.tieuDe)}
                          className="flex items-center gap-1 px-2.5 py-1 bg-[#009b63] hover:bg-[#008354] text-white text-[11px] font-bold rounded-lg transition-all cursor-pointer shadow-2xs"
                          title="Duyệt báo cáo"
                        >
                          <IconCircleCheck size={13} />
                          <span>Duyệt</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleReject(item.id, item.tieuDe)}
                          className="flex items-center gap-1 px-2.5 py-1 bg-white border border-rose-300 hover:bg-rose-50 text-rose-500 text-[11px] font-semibold rounded-lg transition-all cursor-pointer shadow-2xs"
                          title="Từ chối báo cáo"
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
            <span className="font-bold text-slate-700">{totalFiltered}</span> báo cáo
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
