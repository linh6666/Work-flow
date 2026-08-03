"use client";

import React, { useState, useEffect } from 'react';
import {
  IconSearch,
  IconX,
  IconArrowsSort,
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
  IconCheck,
} from '@tabler/icons-react';

interface ReportProgressItem {
  id: string;
  tieuDe: string;
  phamVi: 'Khách hàng' | 'Báo giá' | 'Theo tháng';
  doiTuong: string;
  soCv: number;
  hoanThanh: string;
  pctTb: string;
  trangThai: string;
}

const INITIAL_DATA: ReportProgressItem[] = [
  {
    id: '1',
    tieuDe: 'BC CV KD - 20-2026/BG-MHV: 22 LIỄU GIAI',
    phamVi: 'Khách hàng',
    doiTuong: 'CÔNG TY TNHH ĐẦU TƯ VÀ KINH DOANH BẤT ĐỘNG SẢN VIỆT – ÚC',
    soCv: 78,
    hoanThanh: '0/78',
    pctTb: '0%',
    trangThai: 'Bản nháp',
  },
  {
    id: '2',
    tieuDe: 'BC CV KD - 77-2026/BG-MHV',
    phamVi: 'Khách hàng',
    doiTuong: 'CÔNG TY CỔ PHẦN CLOUD PROPERTY',
    soCv: 78,
    hoanThanh: '0/78',
    pctTb: '0%',
    trangThai: 'Bản nháp',
  },
  {
    id: '3',
    tieuDe: 'BC CV KD - 84-2026/BG-MHV: CS MÔ HÌNH NHÀ MÁY NEWEB',
    phamVi: 'Báo giá',
    doiTuong: '84-2026/BG-MHV',
    soCv: 64,
    hoanThanh: '0/64',
    pctTb: '0%',
    trangThai: 'Bản nháp',
  },
  {
    id: '4',
    tieuDe: 'BC CV KD - 102-2026/MÔ HÌNH SA BÀN THOÁT NƯỚC HÀ NỘI',
    phamVi: 'Báo giá',
    doiTuong: 'MÔ HÌNH SA BÀN THOÁT NƯỚC HÀ NỘI',
    soCv: 80,
    hoanThanh: '0/80',
    pctTb: '0%',
    trangThai: 'Chờ QL KD duyệt',
  },
  {
    id: '5',
    tieuDe: 'BC CV KD - 87-2026/BG-MHV',
    phamVi: 'Báo giá',
    doiTuong: '87-2026/BG-MHV',
    soCv: 68,
    hoanThanh: '0/68',
    pctTb: '0%',
    trangThai: 'Chờ QL KD duyệt',
  },
  {
    id: '6',
    tieuDe: 'BC CV KD - 110.1-2026/BGG-MHV',
    phamVi: 'Báo giá',
    doiTuong: '110.1-2026/BGG-MHV',
    soCv: 78,
    hoanThanh: '0/78',
    pctTb: '0%',
    trangThai: 'PGĐ đã duyệt',
  },
  {
    id: '7',
    tieuDe: 'BC CV KD - Tháng 07/2026',
    phamVi: 'Theo tháng',
    doiTuong: '07/2026',
    soCv: 1,
    hoanThanh: '0/1',
    pctTb: '0%',
    trangThai: 'PGĐ đã duyệt',
  },
];

const STATUS_OPTIONS = ['Bản nháp', 'Chờ QL KD duyệt', 'PGĐ đã duyệt'];
const ITEMS_PER_PAGE = 10;

export default function BaoCaoTienDoTab() {
  const [dataList, setDataList] = useState<ReportProgressItem[]>(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<keyof ReportProgressItem | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [openStatusDropdownId, setOpenStatusDropdownId] = useState<string | null>(null);

  // Metrics calculation
  const totalCount = dataList.length;
  const choPheDuyet = dataList.filter((i) => i.trangThai.toLowerCase().includes('chờ')).length;
  const daDuyet = dataList.filter((i) => i.trangThai.toLowerCase().includes('duyệt')).length;

  // Filter
  const filtered = dataList.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.tieuDe.toLowerCase().includes(q) ||
      item.doiTuong.toLowerCase().includes(q) ||
      item.phamVi.toLowerCase().includes(q)
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

  const handleSort = (key: keyof ReportProgressItem) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const handleSelectStatus = (id: string, newStatus: string) => {
    setDataList((prev) => prev.map((i) => (i.id === id ? { ...i, trangThai: newStatus } : i)));
    setOpenStatusDropdownId(null);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa mục này?')) {
      setDataList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const getPhamViBadgeStyle = (phamVi: ReportProgressItem['phamVi']) => {
    switch (phamVi) {
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

  const getTrangThaiBadgeStyle = (trangThai: string) => {
    switch (trangThai) {
      case 'Bản nháp':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'Chờ QL KD duyệt':
        return 'bg-amber-50 text-amber-600 border-amber-300';
      case 'PGĐ đã duyệt':
        return 'bg-emerald-50 text-emerald-600 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const SortTh = ({ col, label, align = 'left' }: { col: keyof ReportProgressItem; label: string; align?: string }) => (
    <th className={`px-4 py-3 cursor-pointer whitespace-nowrap text-${align}`} onClick={() => handleSort(col)}>
      <span className={`inline-flex items-center gap-1 font-bold text-slate-600 text-[11px] ${align === 'center' ? 'justify-center w-full' : ''}`}>
        {label} <IconArrowsSort size={11} className="text-slate-300" />
      </span>
    </th>
  );

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 space-y-3 overflow-hidden">
      {/* ── 1. Summary Stats Cards (Row of 4) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[64px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Tổng báo cáo</p>
          <p className="text-xl font-black text-slate-900 tracking-tight">{totalCount}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[64px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Chờ phê duyệt</p>
          <p className="text-xl font-black text-amber-600 tracking-tight">{choPheDuyet}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[64px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">%TB Tiến độ</p>
          <p className="text-xl font-black text-indigo-700 tracking-tight">0%</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[64px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Đã PGĐ duyệt</p>
          <p className="text-xl font-black text-emerald-600 tracking-tight">{daDuyet}</p>
        </div>
      </div>

      {/* ── 2. Compact Search Bar ── */}
      <div className="relative shrink-0">
        <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm theo tiêu đề, đối tượng, phạm vi..."
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

      {/* ── 3. Data Table (Fixed Pagination at Bottom) ── */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[950px]">
            <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200">
              <tr>
                <SortTh col="tieuDe" label="Tiêu đề" />
                <SortTh col="phamVi" label="Phạm vi" />
                <SortTh col="doiTuong" label="Đối tượng" />
                <SortTh col="soCv" label="Số CV" align="center" />
                <SortTh col="hoanThanh" label="Hoàn thành" align="center" />
                <SortTh col="pctTb" label="%TB" align="center" />
                <SortTh col="trangThai" label="Trạng thái" />
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-xs text-slate-400">
                    Không tìm thấy dữ liệu nào.
                  </td>
                </tr>
              ) : (
                paginatedList.map((item, idx) => {
                  const isOpen = openStatusDropdownId === item.id;
                  return (
                    <tr key={`${item.id}-${idx}`} className="hover:bg-slate-50/70 transition-colors group">
                      {/* Tiêu đề */}
                      <td className="px-4 py-3.5 align-top max-w-[280px]">
                        <span className="font-bold text-slate-800 text-xs leading-snug cursor-pointer hover:text-[#406c89] block">
                          {item.tieuDe}
                        </span>
                      </td>

                      {/* Phạm vi */}
                      <td className="px-4 py-3.5 align-top whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getPhamViBadgeStyle(
                            item.phamVi
                          )}`}
                        >
                          {item.phamVi}
                        </span>
                      </td>

                      {/* Đối tượng */}
                      <td className="px-4 py-3.5 align-top max-w-[320px]">
                        <span className="text-slate-500 font-medium text-[11px] leading-snug block">
                          {item.doiTuong}
                        </span>
                      </td>

                      {/* Số CV */}
                      <td className="px-4 py-3.5 align-top text-center font-medium text-slate-700 whitespace-nowrap">
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

                      {/* Trạng thái dropdown */}
                      <td className="px-4 py-3.5 align-top whitespace-nowrap">
                        <div className="relative inline-block">
                          <button
                            type="button"
                            onClick={() => setOpenStatusDropdownId(isOpen ? null : item.id)}
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold transition-colors cursor-pointer ${getTrangThaiBadgeStyle(
                              item.trangThai
                            )}`}
                          >
                            <span>{item.trangThai}</span>
                            <IconChevronDown
                              size={12}
                              className={`opacity-60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </button>

                          {isOpen && (
                            <>
                              <div
                                className="fixed inset-0 z-20"
                                onClick={() => setOpenStatusDropdownId(null)}
                              />
                              <div className="absolute left-0 top-full mt-1 z-30 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[160px]">
                                {STATUS_OPTIONS.map((opt) => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => handleSelectStatus(item.id, opt)}
                                    className="w-full flex items-center justify-between gap-2 px-3 py-1.5 text-left text-xs font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                                  >
                                    <span
                                      className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-semibold ${getTrangThaiBadgeStyle(
                                        opt
                                      )}`}
                                    >
                                      {opt}
                                    </span>
                                    {item.trangThai === opt && (
                                      <IconCheck size={13} className="text-[#406c89] shrink-0" />
                                    )}
                                  </button>
                                ))}
                              </div>
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

        {/* ── 4. Pagination Footer ── */}
        <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
          <div>
            Hiển thị <span className="font-bold text-slate-700">{totalFiltered > 0 ? startIndex + 1 : 0}</span> -{' '}
            <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số{' '}
            <span className="font-bold text-slate-700">{totalFiltered}</span> mục
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
