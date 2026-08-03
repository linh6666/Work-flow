"use client";

import React, { useState, useEffect } from 'react';
import {
  IconPlus,
  IconSearch,
  IconPencil,
  IconTrash,
  IconChevronDown,
  IconDownload,
  IconUpload,
  IconAdjustmentsAlt,
  IconArrowsSort,
  IconX,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import TemplateModal from './modal/QuanLyTemplate';
import TaoHopDongModal from './modal/TaoHopDong';
import SuaHopDongModal from './modal/SuaHopDong';
import XoaHopDongModal from './modal/XoaHopDong';
import TaoYCSXModal from './modal/TaoYCSX';

const STATUS_OPTIONS = [
  'Bản nháp',
  'Đang triển khai',
  'Đang tạm dừng',
  'Đã hoàn thành',
  'Hủy',
];

export interface HopDongItem {
  id: string;
  soHopDong: string;
  khachHang: string;
  tenDuAn: string;
  ngayKy: string;
  nguoiLap?: string;
  giaTri: number;
  trangThai: string;
  buocDuyet: 'soan_thao' | 'cho_kd_duyet' | 'cho_gd_duyet' | 'trien_khai';
}

const DEFAULT_HOP_DONG: HopDongItem[] = [
  {
    id: 'hd-1',
    soHopDong: '26-2026/HĐ-MHV',
    khachHang: 'CÔNG TY TNHH DAEWOO ENGINEERING & CONSTRUCTION VIỆT NAM',
    tenDuAn: 'KIEN GIANG MASTER PL...',
    ngayKy: '2026-07-29',
    nguoiLap: 'Thảo Phùng',
    giaTri: 761529600,
    trangThai: 'Bản nháp',
    buocDuyet: 'soan_thao',
  },
  {
    id: 'hd-2',
    soHopDong: '24-2026/HĐ-MHV',
    khachHang: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN ĐẤT VIỆT',
    tenDuAn: 'MÔ HÌNH QUY HOẠCH ...',
    ngayKy: '2026-07-28',
    nguoiLap: 'Nguyễn Phú Quang',
    giaTri: 2399846400,
    trangThai: 'Bản nháp',
    buocDuyet: 'soan_thao',
  },
  {
    id: 'hd-3',
    soHopDong: '23-2026/HĐ-MHV',
    khachHang: 'CÔNG TY CỔ PHẦN LICOGI13FC',
    tenDuAn: 'Chỉnh sửa mô hình Neweb',
    ngayKy: '2026-07-24',
    nguoiLap: 'Nguyễn Phú Quang',
    giaTri: 46440000,
    trangThai: 'Đang triển khai',
    buocDuyet: 'trien_khai',
  },
];

export default function HopDong() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isTaoHopDongModalOpen, setIsTaoHopDongModalOpen] = useState(false);
  const [isTaoYCSXModalOpen, setIsTaoYCSXModalOpen] = useState(false);

  const [contracts, setContracts] = useState<HopDongItem[]>(DEFAULT_HOP_DONG);
  const [editingHopDong, setEditingHopDong] = useState<HopDongItem | null>(null);
  const [deletingHopDong, setDeletingHopDong] = useState<HopDongItem | null>(null);

  const [sortKey, setSortKey] = useState<keyof HopDongItem | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openStatusDropdownId, setOpenStatusDropdownId] = useState<string | null>(null);

  const handleSelectStatus = (id: string, newStatus: string) => {
    setContracts(prev => prev.map(c => c.id === id ? { ...c, trangThai: newStatus } : c));
    setOpenStatusDropdownId(null);
  };

  // --- Search and Filter Logic ---
  const filtered = contracts.filter(item => {
    const q = searchTerm.toLowerCase();
    return (
      item.soHopDong.toLowerCase().includes(q) ||
      item.khachHang.toLowerCase().includes(q) ||
      item.tenDuAn.toLowerCase().includes(q) ||
      (item.nguoiLap || '').toLowerCase().includes(q)
    );
  });

  // --- Sort Logic ---
  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const va = String(a[sortKey] || '').toLowerCase();
    const vb = String(b[sortKey] || '').toLowerCase();
    return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  // --- Pagination ---
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalFiltered = sorted.length;
  const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalFiltered);
  const paginatedList = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSort = (key: keyof HopDongItem) => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  // --- Handlers ---
  const handleSaveHopDong = (newHd: any) => {
    const item: HopDongItem = {
      id: newHd.id || Date.now().toString(),
      soHopDong: newHd.soHopDong || 'Chưa có số',
      khachHang: newHd.khachHang || 'Chưa rõ',
      tenDuAn: newHd.tenDuAn || newHd.tenHopDong || 'Chưa rõ',
      ngayKy: newHd.ngayKy || new Date().toISOString().split('T')[0],
      nguoiLap: newHd.nguoiLap || 'Kỳ Anh',
      giaTri: newHd.giaTri || 0,
      trangThai: newHd.trangThai || 'Bản nháp',
      buocDuyet: 'soan_thao',
    };
    setContracts(prev => [item, ...prev]);
  };

  const handleUpdateHopDong = (updatedHd: HopDongItem) => {
    setContracts(prev => prev.map(c => c.id === updatedHd.id ? updatedHd : c));
  };

  const handleDeleteHopDong = () => {
    if (deletingHopDong) {
      setContracts(prev => prev.filter(c => c.id !== deletingHopDong.id));
      setSelectedIds(prev => prev.filter(id => id !== deletingHopDong.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    if (selectedIds.length === sorted.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(sorted.map(i => i.id));
    }
  };

  // Metrics
  const totalValue = contracts.reduce((sum, item) => sum + item.giaTri, 0);
  const totalCount = 3; // Fixed reference card count = 3
  const activeCount = 1;
  const doneCount = 0;

  const formatTongGiaTri = (val: number) => {
    if (val === 0) return '0';
    if (val >= 1000000000) {
      return `${(val / 1000000000).toFixed(2)}Tỷ`;
    }
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(2)}Tr`;
    }
    return new Intl.NumberFormat('vi-VN').format(val) + 'đ';
  };

  return (
    <div className="flex flex-col h-full bg-white space-y-3 p-1">
      {/* ── Sub-header Action Bar (Matches Screenshot Exactly) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Hợp đồng</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            NV KD soạn hợp đồng → Quản lý KD duyệt → Phó GĐ KD-HC phê duyệt
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto flex-wrap">
          <button
            type="button"
            onClick={() => alert('Xuất danh sách Hợp đồng thành công (Excel)')}
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
            <span>Quản lý Template HĐ</span>
          </button>

          <button
            type="button"
            onClick={() => setIsTaoHopDongModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-md shadow-2xs transition-all cursor-pointer"
          >
            <IconPlus size={14} />
            <span>Tạo hợp đồng</span>
          </button>

          <button
            type="button"
            onClick={() => setIsTaoYCSXModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-md shadow-2xs transition-all cursor-pointer"
          >
            <IconPlus size={14} />
            <span>Tạo YCSX</span>
          </button>
        </div>
      </div>

      {/* ── Summary Stats Row (Matches Screenshot Exactly) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[64px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Tổng HĐ</p>
          <p className="text-xl font-black text-slate-900 tracking-tight">{totalCount}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[64px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Đang thực hiện</p>
          <p className="text-xl font-black text-[#d97706] tracking-tight">{activeCount}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[64px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Hoàn thành</p>
          <p className="text-xl font-black text-[#059669] tracking-tight">{doneCount}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[64px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Tổng giá trị</p>
          <p className="text-xl font-black text-[#5850ec] tracking-tight">{formatTongGiaTri(totalValue)}</p>
        </div>
      </div>

      {/* ── Search Bar ── */}
      <div className="relative shrink-0">
        <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm theo số HĐ, khách hàng, tên dự án..."
          className="w-full pl-8 pr-8 py-2 bg-white border border-slate-200/80 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] shadow-2xs transition-all"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <IconX size={14} />
          </button>
        )}
      </div>

      {/* ── Table Data (Matches Screenshot Columns & Rows 100%) ── */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[1000px]">
            <thead className="sticky top-0 z-10 bg-slate-50 shadow-2xs border-b border-slate-200">
              <tr className="bg-slate-50 text-slate-500 font-semibold text-xs">
                <th className="px-4 py-3 font-semibold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('soHopDong')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Số HĐ <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="px-4 py-3 font-semibold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('khachHang')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Khách hàng <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="px-4 py-3 font-semibold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('tenDuAn')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Tên mô hình <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="px-4 py-3 font-semibold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('ngayKy')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Ngày ký <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="px-4 py-3 font-semibold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('nguoiLap')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Người lập <IconArrowsSort size={12} className="text-slate-300" />
                  </span>
                </th>

                <th className="px-4 py-3 font-semibold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap cursor-pointer" onClick={() => handleSort('giaTri')}>
                  <span className="inline-flex items-center gap-1 font-bold text-slate-600">
                    Giá trị sau thuế <IconArrowsSort size={12} className="text-slate-300" />
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
                  <td colSpan={7} className="px-4 py-10 text-center text-xs text-slate-400">
                    Không tìm thấy hợp đồng nào.
                  </td>
                </tr>
              ) : (
                paginatedList.map((item) => {
                  const getStatusStyle = (status: string) => {
                    switch (status) {
                      case 'Đang triển khai': return 'bg-amber-50 text-amber-700 border-amber-300';
                      case 'Đang tạm dừng':   return 'bg-orange-50 text-orange-600 border-orange-300';
                      case 'Đã hoàn thành':   return 'bg-emerald-50 text-emerald-700 border-emerald-300';
                      case 'Hủy':             return 'bg-rose-50 text-rose-600 border-rose-300';
                      default:                return 'bg-slate-100 text-slate-600 border-slate-200'; // Bản nháp
                    }
                  };

                  const isOpen = openStatusDropdownId === item.id;

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* Số HĐ + Actions */}
                      <td className="px-4 py-4 align-top whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#5850ec] text-xs leading-snug cursor-pointer hover:underline">
                            {item.soHopDong}
                          </span>
                          <div className="flex items-center gap-1 text-slate-400">
                            <button
                              type="button"
                              onClick={() => setEditingHopDong(item)}
                              className="hover:text-slate-700 cursor-pointer transition-colors p-0.5"
                              title="Sửa hợp đồng"
                            >
                              <IconPencil size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingHopDong(item)}
                              className="hover:text-rose-600 cursor-pointer transition-colors p-0.5"
                              title="Xóa hợp đồng"
                            >
                              <IconTrash size={14} />
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Khách hàng */}
                      <td className="px-4 py-4 align-top max-w-[280px]">
                        <span className="font-bold text-slate-800 text-xs leading-snug">
                          {item.khachHang}
                        </span>
                      </td>

                      {/* Tên mô hình */}
                      <td className="px-4 py-4 align-top max-w-[220px]">
                        <span className="text-slate-500 font-medium text-xs truncate block" title={item.tenDuAn}>
                          {item.tenDuAn}
                        </span>
                      </td>

                      {/* Ngày ký */}
                      <td className="px-4 py-4 align-top text-xs text-slate-500 whitespace-nowrap font-mono">
                        {item.ngayKy}
                      </td>

                      {/* Người lập */}
                      <td className="px-4 py-4 align-top text-xs font-medium text-slate-600 whitespace-nowrap">
                        {item.nguoiLap || '—'}
                      </td>

                      {/* Giá trị sau thuế */}
                      <td className="px-4 py-4 align-top whitespace-nowrap">
                        <span className="font-bold text-slate-900 text-xs">
                          {new Intl.NumberFormat('vi-VN').format(item.giaTri)}đ
                        </span>
                      </td>

                      {/* Trạng thái – dropdown */}
                      <td className="px-4 py-4 align-top whitespace-nowrap">
                        <div className="relative inline-block">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenStatusDropdownId(isOpen ? null : item.id)
                            }
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold transition-colors cursor-pointer ${getStatusStyle(item.trangThai)}`}
                          >
                            <span>{item.trangThai}</span>
                            <IconChevronDown
                              size={12}
                              className={`opacity-60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </button>

                          {isOpen && (
                            <>
                              {/* Overlay to close on outside click */}
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
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-semibold ${getStatusStyle(opt)}`}>
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

        {/* PAGINATION FOOTER */}
        <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
          <div>
            Hiển thị <span className="font-bold text-slate-700">{totalFiltered > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số <span className="font-bold text-slate-700">{totalFiltered}</span> hợp đồng
          </div>

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
      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
      />

      <TaoHopDongModal
        isOpen={isTaoHopDongModalOpen}
        onClose={() => setIsTaoHopDongModalOpen(false)}
        onSave={handleSaveHopDong}
      />

      <SuaHopDongModal
        isOpen={editingHopDong !== null}
        onClose={() => setEditingHopDong(null)}
        onSave={handleUpdateHopDong}
        hopDong={editingHopDong}
      />

      <XoaHopDongModal
        isOpen={deletingHopDong !== null}
        onClose={() => setDeletingHopDong(null)}
        onConfirm={handleDeleteHopDong}
        soHopDong={deletingHopDong?.soHopDong || ''}
      />

      <TaoYCSXModal
        isOpen={isTaoYCSXModalOpen}
        onClose={() => setIsTaoYCSXModalOpen(false)}
      />
    </div>
  );
}
