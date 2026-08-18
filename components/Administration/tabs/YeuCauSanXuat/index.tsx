"use client";

import React, { useState, useEffect } from 'react';
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
} from '@tabler/icons-react';
import TaoYCSXModal from './modal/TaoYCSX';
import ChinhSuaYCSXModal from './modal/ChinhSuaYCSX';
import XoaYCSXModal from './modal/XoaYCSX';

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

const SAMPLE_YCSX_LIST: YcsxItem[] = [
  { id: '1',  soYcsx: '26-2026/YCSX-MHV',    tenDuAn: 'KIEN GIANG MASTER PLAN PROJECT MODEL',      khachHang: 'CÔNG TY TNHH DAEWOO ENGINEERING & CONSTRUCTION VIỆT NAM', nguoiLap: 'Nguyễn Phú Quang', tyLe: '1/600',   kichThuoc: '2600×1800MM', ngayBatDau: '01/08/2026', ngayKetThuc: '15/09/2026', trangThai: 'PGĐ đã duyệt' },
  { id: '2',  soYcsx: '23-2026/YCSX-MHV',    tenDuAn: 'QUY HOẠCH TỈNH HƯNG YÊN',                  khachHang: 'DATVIETGROUP',                                             nguoiLap: 'Duyên Bùi',         tyLe: '1/25000', kichThuoc: '5500×2900MM', ngayBatDau: '25/07/2026', ngayKetThuc: '13/09/2026', trangThai: 'PGĐ đã duyệt' },
  { id: '3',  soYcsx: '22-2026/YCSX-MHV',    tenDuAn: 'CHỈNH SỬA MÔ HÌNH NEWEB',                  khachHang: 'LICOGI13FC',                                               nguoiLap: 'Nguyễn Phú Quang', tyLe: '1/500',   kichThuoc: '1400×1200MM', ngayBatDau: '28/07/2026', ngayKetThuc: '09/08/2026', trangThai: 'PGĐ đã duyệt' },
  { id: '4',  soYcsx: '03-2026/YCSX-MHV',    tenDuAn: 'MÔ HÌNH DỰ ÁN 22 LIỄU GIAI',              khachHang: 'CĐT 22 LIỄU GIAI',                                        nguoiLap: 'Thảo Phùng',        tyLe: '1/75',    kichThuoc: '1890×1890mm', ngayBatDau: '12/03/2026', ngayKetThuc: '26/04/2026', trangThai: 'PGĐ đã duyệt' },
  { id: '5',  soYcsx: '14.02-2026/YCSX-MHV', tenDuAn: 'THE HERITAGE TÂY NINH - Lắp đặt tại Tây Ninh', khachHang: 'The Heritage Tây Ninh',                             nguoiLap: 'Thảo Phùng',        tyLe: '1/400',   kichThuoc: '4200×1800MM', ngayBatDau: '27/04/2026', ngayKetThuc: '06/06/2026', trangThai: 'PGĐ đã duyệt' },
  { id: '6',  soYcsx: '14.01-2026/YCSX-MHV', tenDuAn: 'THE HERITAGE TÂY NINH - Lắp đặt tại Hà Nội', khachHang: 'The Heritage Tây Ninh',                               nguoiLap: 'Thảo Phùng',        tyLe: '1/400',   kichThuoc: '4200×1800MM', ngayBatDau: '27/04/2026', ngayKetThuc: '06/06/2026', trangThai: 'PGĐ đã duyệt' },
  { id: '7',  soYcsx: '16-2026/YCSX-MHV',    tenDuAn: 'IA25 - CIPUTRA',                           khachHang: 'IA25 - CIPUTRA',                                           nguoiLap: 'Thảo Phùng',        tyLe: '1/100',   kichThuoc: '3400×2400mm', ngayBatDau: '15/05/2026', ngayKetThuc: '29/06/2026', trangThai: 'PGĐ đã duyệt' },
  { id: '8',  soYcsx: '17-2026/YCSX-MHV',    tenDuAn: 'HERITAGE VILLAGE MOC CHAU',                khachHang: 'HERIAGE VILLAGE MOC CHAU',                                 nguoiLap: 'Thảo Phùng',        tyLe: '1/500',   kichThuoc: '1600×1200mm', ngayBatDau: '18/05/2026', ngayKetThuc: '22/06/2026', trangThai: 'PGĐ đã duyệt' },
  { id: '9',  soYcsx: '20-2026/YCSX-MHV',    tenDuAn: "CHỈNH SỬA MÔ HÌNH L'AURORA",              khachHang: "CĐT L'AURORA",                                             nguoiLap: 'Thảo Phùng',        tyLe: '1/150',   kichThuoc: '2200×3000mm', ngayBatDau: '09/06/2026', ngayKetThuc: '14/07/2026', trangThai: 'PGĐ đã duyệt' },
  { id: '10', soYcsx: '21-2026/YCSX-MHV',    tenDuAn: 'VSIP LẠNG SƠN',                           khachHang: 'VSIP Lạng Sơn',                                            nguoiLap: '—',                 tyLe: '1/1000',  kichThuoc: '16.3m²',      ngayBatDau: '16/06/2026', ngayKetThuc: '13/07/2026', trangThai: 'PGĐ đã duyệt' },
];

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
  const [ycsxList, setYcsxList] = useState<YcsxItem[]>(SAMPLE_YCSX_LIST);
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

  const handleSelectStatus = (id: string, newStatus: string) => {
    setYcsxList(prev => prev.map(i => i.id === id ? { ...i, trangThai: newStatus } : i));
    setOpenStatusDropdownId(null);
  };

  const handleDeleteItem = (id: string) => {
    setYcsxList(prev => prev.filter(item => item.id !== id));
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
    <div className="flex flex-col h-full bg-white space-y-3 p-1">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Yêu cầu sản xuất</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            NV KD lập YCSX → Quản lý KD duyệt → Phó GĐ phê duyệt
          </p>
        </div>
        <div className="flex items-center gap-1.5 self-start sm:self-auto flex-wrap">
          <button type="button" onClick={() => setIsTaoModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-md shadow-2xs transition-all cursor-pointer">
            <IconPlus size={14} /><span>Tạo YCSX</span>
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        {[
          { label: 'Tổng YCSX',  value: ycsxList.length, color: 'text-slate-900' },
          { label: 'Chờ duyệt',  value: choDuyet,         color: 'text-amber-600' },
          { label: 'Đã duyệt',   value: daDuyet,           color: 'text-emerald-600' },
          { label: 'Bản nháp',   value: banNhap,           color: 'text-slate-500' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[64px]">
            <p className="text-[11px] text-slate-400 font-semibold mb-0.5">{label}</p>
            <p className={`text-xl font-black tracking-tight ${color}`}>{value}</p>
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
          className="w-full pl-8 pr-8 py-2 bg-white border border-slate-200/80 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] shadow-2xs transition-all"
        />
        {searchTerm && (
          <button type="button" onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
            <IconX size={14} />
          </button>
        )}
      </div>

      {/* ── Table ── */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[1100px]">
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
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-xs text-slate-400">
                    Không tìm thấy yêu cầu sản xuất nào.
                  </td>
                </tr>
              ) : paginatedList.map((item) => {
                const isOpen = openStatusDropdownId === item.id;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Số YCSX */}
                    <td className="px-3 py-3 align-top whitespace-nowrap min-w-[190px]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#406c89] text-[11px] leading-snug cursor-pointer hover:underline">
                          {item.soYcsx}
                        </span>
                        <div className="flex items-center gap-1 text-slate-400">
                          <button
                            type="button"
                            onClick={() => { setSelectedItemToEdit(item); setIsChinhSuaModalOpen(true); }}
                            className="hover:text-slate-700 cursor-pointer transition-colors p-0.5"
                            title="Chỉnh sửa"
                          >
                            <IconPencil size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicateItem(item)}
                            className="hover:text-slate-700 cursor-pointer transition-colors p-0.5"
                            title="Sao chép"
                          >
                            <IconCopy size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => { setSelectedItemToDelete(item); setIsXoaModalOpen(true); }}
                            className="hover:text-rose-600 cursor-pointer transition-colors p-0.5"
                            title="Xóa"
                          >
                            <IconTrash size={13} />
                          </button>
                        </div>
                      </div>
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
                      <div className="relative inline-block">
                        <button type="button"
                          onClick={() => setOpenStatusDropdownId(isOpen ? null : item.id)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold transition-colors cursor-pointer ${getStatusStyle(item.trangThai)}`}>
                          <span>{item.trangThai}</span>
                          <IconChevronDown size={11} className={`opacity-60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <>
                            <div className="fixed inset-0 z-20" onClick={() => setOpenStatusDropdownId(null)} />
                            <div className="absolute left-0 top-full mt-1 z-30 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[180px]">
                              {STATUS_OPTIONS.map((opt) => (
                                <button key={opt} type="button"
                                  onClick={() => handleSelectStatus(item.id, opt)}
                                  className="w-full flex items-center justify-between gap-2 px-3 py-1.5 text-left hover:bg-slate-50 transition-colors cursor-pointer">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-semibold ${getStatusStyle(opt)}`}>{opt}</span>
                                  {item.trangThai === opt && <IconCheck size={12} className="text-[#406c89] shrink-0" />}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
          <div>
            Hiển thị <span className="font-bold text-slate-700">{totalFiltered > 0 ? startIndex + 1 : 0}</span> -{' '}
            <span className="font-bold text-slate-700">{endIndex}</span> trên{' '}
            <span className="font-bold text-slate-700">{totalFiltered}</span> yêu cầu
          </div>
          <div className="flex items-center gap-1">
            <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer">
              <IconChevronLeft size={13} /><span>Trước</span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} type="button" onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer ${currentPage === page ? 'bg-[#406c89] text-white shadow-2xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                {page}
              </button>
            ))}
            <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer">
              <span>Sau</span><IconChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TaoYCSXModal isOpen={isTaoModalOpen} onClose={() => setIsTaoModalOpen(false)} />
      <ChinhSuaYCSXModal
        isOpen={isChinhSuaModalOpen}
        itemData={selectedItemToEdit}
        onClose={() => setIsChinhSuaModalOpen(false)}
        onSaveSuccess={(updatedData) => {
          setYcsxList(prev => prev.map(item => item.id === updatedData.id ? updatedData : item));
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
