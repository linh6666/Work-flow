"use client";

import React, { useState, useEffect } from 'react';
import {
  IconPlus,
  IconTrash,
  IconArrowsSort,
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
  IconCheck,
} from '@tabler/icons-react';
import KhoiTaoBaoCaoModal from './modal/KhoiTaoBaoCao';

export interface BaoCaoCvKdItem {
  id: string;
  loai: 'Khách hàng' | 'Báo giá' | 'Theo tháng';
  tieuDe: string;
  moTa: string;
  nguoiTao: string;
  ngayTao: string;
  trangThai: string;
}

const SAMPLE_REPORTS: BaoCaoCvKdItem[] = [
  {
    id: '1',
    loai: 'Khách hàng',
    tieuDe: 'BC CV KD - 20-2026/BG-MHV: 22 LIỄU GIAI',
    moTa: 'CÔNG TY TNHH ĐẦU TƯ VÀ KINH DOANH BẤT ĐỘNG SẢN VIỆT – ÚC',
    nguoiTao: 'Kỳ Anh',
    ngayTao: '2026-08-03',
    trangThai: 'Bản nháp',
  },
  {
    id: '2',
    loai: 'Khách hàng',
    tieuDe: 'BC CV KD - 77-2026/BG-MHV',
    moTa: 'CÔNG TY CỔ PHẦN CLOUD PROPERTY',
    nguoiTao: 'Kỳ Anh',
    ngayTao: '2026-08-03',
    trangThai: 'Bản nháp',
  },
  {
    id: '3',
    loai: 'Báo giá',
    tieuDe: 'BC CV KD - 84-2026/BG-MHV: CS MÔ HÌNH NHÀ MÁY NEWEB',
    moTa: '84-2026/BG-MHV',
    nguoiTao: 'Kỳ Anh',
    ngayTao: '2026-08-03',
    trangThai: 'Bản nháp',
  },
  {
    id: '4',
    loai: 'Báo giá',
    tieuDe: 'BC CV KD - 102-2026/MÔ HÌNH SA BÀN THOÁT NƯỚC HÀ NỘI',
    moTa: 'MÔ HÌNH SA BÀN THOÁT NƯỚC HÀ NỘI',
    nguoiTao: 'Kỳ Anh',
    ngayTao: '2026-08-01',
    trangThai: 'Chờ QL KD duyệt',
  },
  {
    id: '5',
    loai: 'Báo giá',
    tieuDe: 'BC CV KD - 87-2026/BG-MHV',
    moTa: '87-2026/BG-MHV',
    nguoiTao: 'Nguyễn Phú Quang',
    ngayTao: '2026-07-31',
    trangThai: 'Chờ QL KD duyệt',
  },
  {
    id: '6',
    loai: 'Báo giá',
    tieuDe: 'BC CV KD - 110.1-2026/BGG-MHV',
    moTa: '110.1-2026/BGG-MHV',
    nguoiTao: 'Thảo Phùng',
    ngayTao: '2026-07-25',
    trangThai: 'PGĐ đã duyệt',
  },
  {
    id: '7',
    loai: 'Theo tháng',
    tieuDe: 'BC CV KD - Tháng 07/2026',
    moTa: '07/2026',
    nguoiTao: 'Thảo Phùng',
    ngayTao: '2026-07-25',
    trangThai: 'PGĐ đã duyệt',
  },
];

const PHAM_VI_OPTIONS = ['Tất cả phạm vi', 'Khách hàng', 'Báo giá', 'Theo tháng'];
const TRANG_THAI_OPTIONS = ['Tất cả trạng thái', 'Bản nháp', 'Chờ QL KD duyệt', 'PGĐ đã duyệt'];
const ITEMS_PER_PAGE = 10;

const getLoaiBadgeStyle = (loai: BaoCaoCvKdItem['loai']) => {
  switch (loai) {
    case 'Khách hàng':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Báo giá':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'Theo tháng':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

const getTrangThaiBadgeStyle = (trangThai: string) => {
  switch (trangThai) {
    case 'Bản nháp':
      return 'bg-slate-100 text-slate-600 border-slate-200';
    case 'Chờ QL KD duyệt':
      return 'bg-amber-50 text-amber-700 border-amber-300';
    case 'PGĐ đã duyệt':
      return 'bg-emerald-50 text-emerald-700 border-emerald-300';
    default:
      return 'bg-slate-100 text-slate-600 border-slate-200';
  }
};

export default function BaoCaoCvKdTab() {
  const [reports, setReports] = useState<BaoCaoCvKdItem[]>(SAMPLE_REPORTS);
  const [selectedPhamVi, setSelectedPhamVi] = useState('Tất cả phạm vi');
  const [selectedTrangThai, setSelectedTrangThai] = useState('Tất cả trạng thái');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<keyof BaoCaoCvKdItem | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [openStatusDropdownId, setOpenStatusDropdownId] = useState<string | null>(null);
  const [isKhoiTaoModalOpen, setIsKhoiTaoModalOpen] = useState(false);

  // Filter logic
  const filtered = reports.filter((item) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      item.tieuDe.toLowerCase().includes(q) ||
      item.moTa.toLowerCase().includes(q) ||
      item.nguoiTao.toLowerCase().includes(q);
    const matchPhamVi = selectedPhamVi === 'Tất cả phạm vi' || item.loai === selectedPhamVi;
    const matchTrangThai = selectedTrangThai === 'Tất cả trạng thái' || item.trangThai === selectedTrangThai;
    return matchSearch && matchPhamVi && matchTrangThai;
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
  }, [searchTerm, selectedPhamVi, selectedTrangThai]);

  const totalFiltered = sorted.length;
  const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalFiltered);
  const paginatedList = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSort = (key: keyof BaoCaoCvKdItem) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa báo cáo này?')) {
      setReports((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleSelectStatus = (id: string, newStatus: string) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, trangThai: newStatus } : r)));
    setOpenStatusDropdownId(null);
  };

  const SortTh = ({ col, label }: { col: keyof BaoCaoCvKdItem; label: string }) => (
    <th className="px-4 py-3 cursor-pointer whitespace-nowrap" onClick={() => handleSort(col)}>
      <span className="inline-flex items-center gap-1 font-bold text-slate-600 text-[11px]">
        {label} <IconArrowsSort size={11} className="text-slate-300" />
      </span>
    </th>
  );

  return (
    <div className="flex flex-col h-full bg-white space-y-3 p-1">
      {/* ── Header Section ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Báo cáo CV KD</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            NV KD lập báo cáo → Quản lý KD duyệt → Phó GĐ KD-HC duyệt
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsKhoiTaoModalOpen(true)}
          className="flex items-center gap-1 px-3 py-1.5 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-md shadow-2xs transition-all cursor-pointer self-start sm:self-auto shrink-0"
        >
          <IconPlus size={14} />
          <span>Khởi tạo báo cáo</span>
        </button>
      </div>

      {/* ── Filter Toolbar Row ── */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Phạm vi filter */}
        <div className="relative">
          <select
            value={selectedPhamVi}
            onChange={(e) => setSelectedPhamVi(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-lg px-3 py-1.5 pr-8 text-xs font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer shadow-2xs transition-all"
          >
            {PHAM_VI_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <IconChevronDown
            size={14}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>

        {/* Trạng thái filter */}
        <div className="relative">
          <select
            value={selectedTrangThai}
            onChange={(e) => setSelectedTrangThai(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-lg px-3 py-1.5 pr-8 text-xs font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer shadow-2xs transition-all"
          >
            {TRANG_THAI_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <IconChevronDown
            size={14}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>
      </div>

      {/* ── Table Area ── */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[900px]">
            <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200">
              <tr>
                <SortTh col="loai" label="Phạm vi" />
                <SortTh col="tieuDe" label="Tiêu đề báo cáo / Thông tin" />
                <SortTh col="nguoiTao" label="Người tạo" />
                <SortTh col="ngayTao" label="Ngày tạo" />
                <SortTh col="trangThai" label="Trạng thái" />
                <th className="px-4 py-3 font-bold text-slate-600 text-[11px] text-center whitespace-nowrap">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-xs text-slate-400">
                    Không tìm thấy báo cáo nào.
                  </td>
                </tr>
              ) : (
                paginatedList.map((item) => {
                  const isOpen = openStatusDropdownId === item.id;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Phạm vi badge */}
                      <td className="px-4 py-3.5 align-top whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${getLoaiBadgeStyle(
                            item.loai
                          )}`}
                        >
                          {item.loai}
                        </span>
                      </td>

                      {/* Tiêu đề báo cáo */}
                      <td className="px-4 py-3.5 align-top max-w-[360px]">
                        <div className="space-y-0.5">
                          <div className="font-bold text-slate-900 text-xs leading-snug cursor-pointer hover:text-[#406c89]">
                            {item.tieuDe}
                          </div>
                          <div className="text-[11px] text-slate-400 font-normal leading-normal truncate">
                            {item.moTa}
                          </div>
                        </div>
                      </td>

                      {/* Người tạo */}
                      <td className="px-4 py-3.5 align-top text-xs text-slate-700 font-medium whitespace-nowrap">
                        {item.nguoiTao}
                      </td>

                      {/* Ngày tạo */}
                      <td className="px-4 py-3.5 align-top text-xs text-slate-500 font-mono whitespace-nowrap">
                        {item.ngayTao}
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
                              <div className="absolute left-0 top-full mt-1 z-30 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[170px]">
                                {TRANG_THAI_OPTIONS.filter((o) => o !== 'Tất cả trạng thái').map((opt) => (
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

                      {/* Thao tác */}
                      <td className="px-4 py-3.5 align-top text-center whitespace-nowrap">
                        <div className="flex items-center justify-center text-slate-400">
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="hover:text-rose-600 cursor-pointer transition-colors p-1"
                            title="Xóa"
                          >
                            <IconTrash size={14} />
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

        {/* ── Pagination Footer ── */}
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

      {/* Khoi Tao Bao Cao Modal */}
      <KhoiTaoBaoCaoModal
        isOpen={isKhoiTaoModalOpen}
        onClose={() => setIsKhoiTaoModalOpen(false)}
        onSubmitSuccess={(newReport) => {
          setReports((prev) => [newReport, ...prev]);
        }}
      />
    </div>
  );
}
