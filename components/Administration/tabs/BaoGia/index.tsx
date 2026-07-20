"use client";

import React, { useState } from 'react';
import ThemBaoGiaModal from './modal/ThemBaoGiaModal';
import XoaBaoGiaModal from './modal/XoaBaoGia';
import {
  IconPlus,
  IconSearch,
  IconPencil,
  IconTrash,
  IconCopy,
  IconChevronUp,
  IconChevronDown,
  IconArrowRight,
  IconFileText,
  IconNotebook,
  IconX,
  IconCheck,
  IconTemplate,
  IconTrashX,
  IconBooks
} from '@tabler/icons-react';

// ─── DATA TYPES ──────────────────────────────────────────────────────────────
export interface BaoGiaItem {
  id: string;
  soBg: string;
  loai: string;
  khachHang: string;
  ngay: string;
  tongSauThue: number;
  trangThai: 'Đang soạn' | 'Chờ duyệt' | 'Đã gửi' | 'Đã chốt' | 'Đã từ chối';
}

const INITIAL_DATA: BaoGiaItem[] = [
  {
    id: '1',
    soBg: '96-2026/BG-MHV',
    loai: 'Mô hình Quy hoạch',
    khachHang: 'TỔNG CÔNG TY MBLAND',
    ngay: '2026-07-17',
    tongSauThue: 1252271988,
    trangThai: 'Đã gửi',
  }
];

// ─── MOCK TEMPLATES ──────────────────────────────────────────────────────────
const MOCK_TEMPLATES = [
  { id: 't1', name: 'Mô hình Quy hoạch Đô thị (Standard)', desc: 'Áp dụng cho các dự án quy hoạch phân khu, quy hoạch chi tiết 1/500.', cost: '800,000,000' },
  { id: 't2', name: 'Mô hình Kiến trúc Chung cư (Premium)', desc: 'Áp dụng cho tòa nhà cao tầng, chung cư cao cấp có đèn LED thông minh.', cost: '1,200,000,000' },
  { id: 't3', name: 'Mô hình Nội thất Căn hộ (Luxury)', desc: 'Thể hiện chi tiết không gian nội thất, lát sàn, tủ bếp, bàn ghế tỉ lệ 1/20.', cost: '350,000,000' },
];

export default function BaoGia() {
  const [items, setItems] = useState<BaoGiaItem[]>(INITIAL_DATA);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'soBg' | 'khachHang' | null>(null);
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
  const [formTrangThai, setFormTrangThai] = useState<BaoGiaItem['trangThai']>('Đang soạn');

  // ─── DYNAMIC STATISTICS ────────────────────────────────────────────────────
  const totalCount = items.length;
  const pendingCount = items.filter(i => ['Đang soạn', 'Chờ duyệt', 'Đã gửi'].includes(i.trangThai)).length;
  const chotCount = items.filter(i => i.trangThai === 'Đã chốt').length;
  const closedValue = items.filter(i => i.trangThai === 'Đã chốt').reduce((sum, i) => sum + i.tongSauThue, 0);

  // ─── HELPERS ───────────────────────────────────────────────────────────────
  const getSuggestedSoBg = () => {
    const nums = items.map(item => {
      const match = item.soBg.match(/^(\d+)-/);
      return match ? parseInt(match[1]) : 0;
    });
    const maxNum = Math.max(...nums, 0);
    return `${maxNum + 1}-2026/BG-MHV`;
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleSaveNewItem = (newItemData: Omit<BaoGiaItem, 'id'>) => {
    const newItem: BaoGiaItem = {
      id: Date.now().toString(),
      ...newItemData,
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
    // Generate copy name
    const numPart = item.soBg.split('-')[0];
    const restPart = item.soBg.substring(numPart.length);
    const nextNum = parseInt(numPart) ? parseInt(numPart) + 1 : 99;
    const duplicatedBg = `${nextNum}${restPart}`;

    const duplicatedItem: BaoGiaItem = {
      ...item,
      id: Date.now().toString(),
      soBg: duplicatedBg,
      trangThai: 'Đang soạn',
    };
    setItems(prev => [duplicatedItem, ...prev]);
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

  const handleSort = (key: 'soBg' | 'khachHang') => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  // ─── SEARCH & FILTER ───────────────────────────────────────────────────────
  const filteredItems = items.filter(item => {
    const q = search.toLowerCase();
    return (
      item.soBg.toLowerCase().includes(q) ||
      item.khachHang.toLowerCase().includes(q) ||
      item.loai.toLowerCase().includes(q)
    );
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey].toLowerCase();
    const valB = b[sortKey].toLowerCase();
    return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  function SortIcon({ k }: { k: 'soBg' | 'khachHang' }) {
    if (sortKey !== k) {
      return (
        <span className="inline-flex flex-col ml-1 opacity-40">
          <IconChevronUp size={9} />
          <IconChevronDown size={9} className="-mt-1" />
        </span>
      );
    }
    return sortDir === 'asc' ? (
      <IconChevronUp size={11} className="ml-1 text-[#406c89]" />
    ) : (
      <IconChevronDown size={11} className="ml-1 text-[#406c89]" />
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#fafbfc] overflow-hidden select-none">
      {/* 1. STICKY HEADER */}
      <div className="sticky top-0 z-10 bg-[#fafbfc] px-8 pt-6 pb-4 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2.5 text-[#406c89] font-bold mb-2">
          <div className="w-9 h-9 rounded-lg bg-[#406c89]/10 border border-[#406c89]/20 flex items-center justify-center text-[#406c89]">
            <IconFileText size={20} />
          </div>
          <span className="text-slate-800 text-lg font-black">Báo giá</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Danh sách Báo giá</h1>
            <p className="text-[11px] text-slate-400 font-medium">Tạo và quản lý báo giá sản xuất mô hình</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTemplateModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#b88d3d] hover:bg-[#a57d34] border border-[#a27b32] text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <IconBooks size={15} />
              Quản lý Template
            </button>
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#406c89] hover:bg-[#345972] border border-[#375d77] text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <IconPlus size={15} />
              Tạo báo giá
            </button>
          </div>
        </div>
      </div>

      {/* 2. SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto px-8 py-5 flex flex-col gap-5">
        
        {/* Process Flow Stepper */}
        <div className="bg-white border border-slate-200/50 rounded-xl p-3 flex flex-wrap items-center gap-3 shadow-xs">
          <div className="bg-slate-50 border border-slate-200/50 px-3.5 py-1.5 rounded-lg flex items-center gap-1 text-xs">
            <span className="font-bold text-slate-700">NV Kinh doanh</span>
            <span className="text-slate-400 font-medium">soạn báo giá</span>
          </div>
          <IconArrowRight size={14} className="text-slate-300 shrink-0" />

          <div className="bg-slate-50 border border-slate-200/50 px-3.5 py-1.5 rounded-lg flex items-center gap-1 text-xs">
            <span className="font-bold text-slate-700">Quản lý Kinh doanh</span>
            <span className="text-slate-400 font-medium">duyệt</span>
          </div>
          <IconArrowRight size={14} className="text-slate-300 shrink-0" />

          <div className="bg-slate-50 border border-slate-200/50 px-3.5 py-1.5 rounded-lg flex items-center gap-1 text-xs">
            <span className="font-bold text-slate-700">Phó GĐ KD-HC</span>
            <span className="text-slate-400 font-medium">phê duyệt cuối</span>
          </div>
          <IconArrowRight size={14} className="text-slate-300 shrink-0" />

          <div className="bg-slate-50 border border-slate-200/50 px-3.5 py-1.5 rounded-lg flex items-center gap-1 text-xs">
            <span className="font-bold text-slate-700">Gửi khách & chốt</span>
            <span className="text-slate-400 font-medium">({chotCount} đã chốt)</span>
          </div>
        </div>

        {/* Dynamic Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200/50 rounded-xl p-4 flex flex-col justify-between h-[88px] shadow-xs hover:shadow-sm transition-shadow">
            <span className="text-xs font-semibold text-slate-400">Tổng báo giá</span>
            <span className="text-2xl font-extrabold text-[#406c89] leading-none">{totalCount}</span>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200/50 rounded-xl p-4 flex flex-col justify-between h-[88px] shadow-xs hover:shadow-sm transition-shadow">
            <span className="text-xs font-semibold text-slate-400">Đang chờ</span>
            <span className="text-2xl font-extrabold text-[#BB8D38] leading-none">{pendingCount}</span>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200/50 rounded-xl p-4 flex flex-col justify-between h-[88px] shadow-xs hover:shadow-sm transition-shadow">
            <span className="text-xs font-semibold text-slate-400">Đã chốt</span>
            <span className="text-2xl font-extrabold text-emerald-600 leading-none">{chotCount}</span>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-200/50 rounded-xl p-4 flex flex-col justify-between h-[88px] shadow-xs hover:shadow-sm transition-shadow">
            <span className="text-xs font-semibold text-slate-400">Giá trị đã chốt</span>
            <span className="text-lg font-extrabold text-slate-800 leading-none truncate" title={chotCount > 0 ? `VND ${closedValue.toLocaleString('vi-VN')}` : ""}>
              {chotCount > 0 ? `VND ${closedValue.toLocaleString('vi-VN')}` : "—"}
            </span>
          </div>
        </div>

        {/* Filter Input */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo số BG, khách hàng, tên dự án..."
            className="w-full text-xs font-medium bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all"
          />
          <IconSearch size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <IconX size={14} />
            </button>
          )}
        </div>

        {/* Table Data */}
        <div className="bg-white border border-slate-200/50 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/60 text-slate-400 font-bold select-none uppercase tracking-wide">
                  <th className="p-3.5 w-12 text-center">
                    <input
                      type="checkbox"
                      checked={sortedItems.length > 0 && selectedIds.length === sortedItems.length}
                      onChange={handleToggleAll}
                      className="w-3.5 h-3.5 rounded border-slate-300 text-[#406c89] focus:ring-[#406c89] cursor-pointer"
                    />
                  </th>
                  <th className="p-3.5 cursor-pointer hover:bg-slate-100/70 transition-colors" onClick={() => handleSort('soBg')}>
                    <div className="flex items-center gap-0.5">
                      Số BG
                      <SortIcon k="soBg" />
                    </div>
                  </th>
                  <th className="p-3.5">LOẠI</th>
                  <th className="p-3.5 cursor-pointer hover:bg-slate-100/70 transition-colors" onClick={() => handleSort('khachHang')}>
                    <div className="flex items-center gap-0.5">
                      Khách hàng
                      <SortIcon k="khachHang" />
                    </div>
                  </th>
                  <th className="p-3.5">NGÀY</th>
                  <th className="p-3.5">TỔNG SAU THUẾ</th>
                  <th className="p-3.5">TRẠNG THÁI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {sortedItems.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/40 transition-colors ${isSelected ? 'bg-slate-50/60' : ''}`}
                    >
                      <td className="p-3.5 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(item.id)}
                          className="w-3.5 h-3.5 rounded border-slate-300 text-[#406c89] focus:ring-[#406c89] cursor-pointer"
                        />
                      </td>
                      <td className="p-3.5 font-semibold text-[#406c89]">
                        <div className="flex items-center gap-3">
                          <span>{item.soBg}</span>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => handleOpenEditModal(item)}
                              className="p-1 hover:bg-slate-100 rounded text-[#406c89] hover:text-[#345972] transition-all cursor-pointer"
                              title="Sửa"
                            >
                              <IconPencil size={15} />
                            </button>
                            <button
                              onClick={() => handleDuplicate(item)}
                              className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
                              title="Nhân bản"
                            >
                              <IconCopy size={15} />
                            </button>
                            <button
                              onClick={() => handleOpenDeleteModal(item)}
                              className="p-1 hover:bg-red-50 rounded text-red-500 hover:text-red-700 transition-all cursor-pointer"
                              title="Xóa"
                            >
                              <IconTrash size={15} />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100/60 text-[10px] font-bold">
                          {item.loai}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-slate-700 uppercase">
                        {item.khachHang}
                      </td>
                      <td className="p-3.5 text-slate-500 font-medium">
                        {item.ngay}
                      </td>
                      <td className="p-3.5 font-bold text-slate-800">
                        VND {item.tongSauThue.toLocaleString('vi-VN')}
                      </td>
                      <td className="p-3.5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${
                          item.trangThai === 'Đã gửi'
                            ? 'bg-[#406c89]/10 text-[#406c89] border-[#406c89]/20'
                            : item.trangThai === 'Đã chốt'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                            : item.trangThai === 'Đang soạn'
                            ? 'bg-blue-50 text-blue-600 border-blue-100'
                            : item.trangThai === 'Chờ duyệt'
                            ? 'bg-amber-50 text-amber-600 border-amber-100'
                            : 'bg-red-50 text-red-600 border-red-100'
                        }`}>
                          {item.trangThai}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {sortedItems.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-10 text-center text-slate-400 font-medium">
                      Không tìm thấy báo giá nào phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ─── MODAL: TẠO BÁO GIÁ MỚI ────────────────────────────────────────── */}
      <ThemBaoGiaModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveNewItem}
        suggestedSoBg={getSuggestedSoBg()}
      />

      {/* ─── MODAL: SỬA BÁO GIÁ ───────────────────────────────────────────── */}
      {isEditModalOpen && editingItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col transform transition-all animate-scale-up">
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">Cập nhật báo giá</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 cursor-pointer">
                <IconX size={16} />
              </button>
            </div>
            
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Số BG</label>
                <input
                  type="text"
                  required
                  value={formSoBg}
                  onChange={(e) => setFormSoBg(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Loại mô hình</label>
                <select
                  value={formLoai}
                  onChange={(e) => setFormLoai(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                >
                  <option value="Mô hình Quy hoạch">Mô hình Quy hoạch</option>
                  <option value="Mô hình Kiến trúc">Mô hình Kiến trúc</option>
                  <option value="Mô hình Nội thất">Mô hình Nội thất</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Khách hàng</label>
                <input
                  type="text"
                  required
                  value={formKhachHang}
                  onChange={(e) => setFormKhachHang(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ngày lập</label>
                  <input
                    type="date"
                    required
                    value={formNgay}
                    onChange={(e) => setFormNgay(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Trạng thái</label>
                  <select
                    value={formTrangThai}
                    onChange={(e) => setFormTrangThai(e.target.value as BaoGiaItem['trangThai'])}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                  >
                    <option value="Đang soạn">Đang soạn</option>
                    <option value="Chờ duyệt">Chờ duyệt</option>
                    <option value="Đã gửi">Đã gửi</option>
                    <option value="Đã chốt">Đã chốt</option>
                    <option value="Đã từ chối">Đã từ chối</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tổng sau thuế (VND)</label>
                <input
                  type="number"
                  required
                  value={formTongSauThue}
                  onChange={(e) => setFormTongSauThue(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#406c89] hover:bg-[#406c89]/90 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: XÁC NHẬN XÓA BÁO GIÁ (Folder riêng XoaBaoGia) ───────── */}
      <XoaBaoGiaModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        deletingItem={deletingItem}
        onConfirm={handleConfirmDelete}
      />

      {/* ─── MODAL: QUẢN LÝ TEMPLATE ──────────────────────────────────────── */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col transform transition-all animate-scale-up">
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2">
                <IconTemplate className="text-[#BB8D38]" size={18} />
                <h3 className="text-base font-bold text-slate-800">Quản lý Template Báo giá</h3>
              </div>
              <button onClick={() => setIsTemplateModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 cursor-pointer">
                <IconX size={16} />
              </button>
            </div>
            
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <p className="text-xs text-slate-500 mb-2 leading-relaxed">
                Danh sách các mẫu báo giá được cấu hình sẵn. Bạn có thể sử dụng các mẫu này để tăng tốc lập báo giá.
              </p>
              
              <div className="space-y-3">
                {MOCK_TEMPLATES.map((tmpl) => (
                  <div key={tmpl.id} className="p-4 border border-slate-200/60 rounded-xl hover:bg-slate-50/50 hover:border-slate-300 transition-all flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">{tmpl.name}</span>
                      <span className="text-[10px] font-bold text-[#BB8D38] bg-[#BB8D38]/10 px-2 py-0.5 rounded-full">Mẫu chuẩn</span>
                    </div>
                    <p className="text-xs text-slate-400">{tmpl.desc}</p>
                    <div className="flex items-center justify-between mt-1 text-[11px] font-medium border-t border-slate-100 pt-2 text-slate-500">
                      <span>Định giá ước lượng:</span>
                      <span className="font-bold text-slate-700">~ VND {tmpl.cost}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setIsTemplateModalOpen(false)}
                className="px-4 py-2 bg-[#BB8D38] hover:bg-[#BB8D38]/90 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
