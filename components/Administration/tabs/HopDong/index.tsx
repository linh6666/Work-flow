"use client";

import React, { useState } from 'react';
import {
  IconSignature,
  IconPlus,
  IconSearch,
  IconArrowRight,
  IconAdjustmentsHorizontal,
  IconPencil,
  IconTrash,
  IconChevronUp,
  IconChevronDown
} from '@tabler/icons-react';
import TemplateModal from './modal/QuanLyTemplate';
import TaoHopDongModal from './modal/TaoHopDong';
import SuaHopDongModal from './modal/SuaHopDong';
import XoaHopDongModal from './modal/XoaHopDong';

export interface HopDongItem {
  id: string;
  soHopDong: string;
  khachHang: string;
  tenDuAn: string;
  ngayKy: string;
  giaTri: number;
  trangThai: string;
  buocDuyet: 'soan_thao' | 'cho_kd_duyet' | 'cho_gd_duyet' | 'trien_khai';
}

const DEFAULT_HOP_DONG: HopDongItem[] = [
  {
    id: 'hd-1',
    soHopDong: '01-2026/HD-MHV',
    khachHang: 'CÔNG TY TNHH VIETDUTCH THẮNG LONG',
    tenDuAn: 'CÔNG TY TNHH VIETDUTCH THẮNG LONG',
    ngayKy: '2026-07-21',
    giaTri: 984495600,
    trangThai: 'Bản nháp',
    buocDuyet: 'cho_gd_duyet',
  }
];

export default function HopDong() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isTaoHopDongModalOpen, setIsTaoHopDongModalOpen] = useState(false);

  const [contracts, setContracts] = useState<HopDongItem[]>(DEFAULT_HOP_DONG);
  const [editingHopDong, setEditingHopDong] = useState<HopDongItem | null>(null);
  const [deletingHopDong, setDeletingHopDong] = useState<HopDongItem | null>(null);

  const [sortKey, setSortKey] = useState<'soHopDong' | 'tenDuAn' | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // --- Search and Filter Logic ---
  const filtered = contracts.filter(item => {
    const q = searchTerm.toLowerCase();
    return (
      item.soHopDong.toLowerCase().includes(q) ||
      item.khachHang.toLowerCase().includes(q) ||
      item.tenDuAn.toLowerCase().includes(q)
    );
  });

  // --- Sort Logic ---
  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const va = a[sortKey].toLowerCase();
    const vb = b[sortKey].toLowerCase();
    return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  const handleSort = (key: 'soHopDong' | 'tenDuAn') => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  function SortIcon({ k }: { k: 'soHopDong' | 'tenDuAn' }) {
    if (sortKey !== k) {
      return (
        <span className="inline-flex flex-col ml-1 opacity-30 shrink-0">
          <IconChevronUp size={9} />
          <IconChevronDown size={9} className="-mt-1" />
        </span>
      );
    }
    return sortDir === 'asc'
      ? <IconChevronUp size={11} className="ml-1 text-[#406c89] shrink-0" />
      : <IconChevronDown size={11} className="ml-1 text-[#406c89] shrink-0" />;
  }

  // --- Handlers ---
  const handleSaveHopDong = (newHd: any) => {
    const item: HopDongItem = {
      id: newHd.id,
      soHopDong: newHd.soHopDong || 'Chưa có số',
      khachHang: newHd.khachHang || 'Chưa rõ',
      tenDuAn: newHd.tenDuAn || newHd.tenHopDong || 'Chưa rõ',
      ngayKy: newHd.ngayKy || new Date().toISOString().split('T')[0],
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
    }
  };

  // --- Step & Metrics Calculations ---
  const countStep1 = contracts.filter(c => c.buocDuyet === 'soan_thao').length;
  const countStep2 = contracts.filter(c => c.buocDuyet === 'cho_kd_duyet').length;
  const countStep3 = contracts.filter(c => c.buocDuyet === 'cho_gd_duyet').length;
  const countStep4 = contracts.filter(c => c.buocDuyet === 'trien_khai').length;

  const totalValue = contracts.reduce((sum, item) => sum + item.giaTri, 0);

  const formatTongGiaTri = (val: number) => {
    if (val === 0) return '0';
    if (val >= 100000000) {
      return `${(val / 1000000000).toFixed(2)}Tỷ`;
    }
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(2)}Tr`;
    }
    return new Intl.NumberFormat('vi-VN').format(val) + 'đ';
  };

  return (
    <div className="p-5 md:p-6 space-y-5 animate-fade-in text-slate-700 w-full">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <IconSignature size={30} className="text-slate-800 stroke-[2]" />
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Hợp đồng</h2>
          </div>
          <div className="mt-3">
            <h3 className="font-bold text-slate-800 text-base">Danh sách Hợp đồng</h3>
            <p className="text-sm text-slate-400 mt-0.5">Quản lý hợp đồng sản xuất mô hình</p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsTemplateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#BB8D38] hover:bg-[#a77c2f] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <IconAdjustmentsHorizontal size={16} />
            <span>Quản lý Template HĐ</span>
          </button>

          <button
            type="button"
            onClick={() => setIsTaoHopDongModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <IconPlus size={16} />
            <span>Tạo hợp đồng</span>
          </button>
        </div>
      </div>

      {/* 2. Process Workflow Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 flex items-center gap-2 overflow-x-auto shadow-xs">
        <div className="flex items-center gap-2 shrink-0">
          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            countStep1 > 0 
              ? 'bg-[#406c89]/10 border-[#406c89]/20 text-[#406c89]' 
              : 'bg-slate-100 border-transparent text-slate-700'
          }`}>
            <span>NV Kinh doanh <span className={`font-normal ${countStep1 > 0 ? 'text-[#406c89]/60' : 'text-slate-400'}`}>soạn hợp đồng</span></span>
            {countStep1 > 0 && (
              <span className="bg-[#406c89] text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                {countStep1}
              </span>
            )}
          </span>
          <IconArrowRight size={14} className="text-slate-400" />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            countStep2 > 0 
              ? 'bg-[#406c89]/10 border-[#406c89]/20 text-[#406c89]' 
              : 'bg-slate-100 border-transparent text-slate-700'
          }`}>
            <span>Quản lý Kinh doanh <span className={`font-normal ${countStep2 > 0 ? 'text-[#406c89]/60' : 'text-slate-400'}`}>duyệt</span></span>
            {countStep2 > 0 && (
              <span className="bg-[#406c89] text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                {countStep2}
              </span>
            )}
          </span>
          <IconArrowRight size={14} className="text-slate-400" />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            countStep3 > 0 
              ? 'bg-[#406c89]/10 border-[#406c89]/20 text-[#406c89]' 
              : 'bg-slate-100 border-transparent text-slate-700'
          }`}>
            <span>Phó GĐ KD-HC <span className={`font-normal ${countStep3 > 0 ? 'text-[#406c89]/60' : 'text-slate-400'}`}>phê duyệt cuối</span></span>
            {countStep3 > 0 && (
              <span className="bg-[#406c89] text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                {countStep3}
              </span>
            )}
          </span>
          <IconArrowRight size={14} className="text-slate-400" />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            countStep4 > 0 
              ? 'bg-[#406c89]/10 border-[#406c89]/20 text-[#406c89]' 
              : 'bg-slate-100 border-transparent text-slate-700'
          }`}>
            <span>Triển khai HĐ <span className="font-normal text-slate-400">({countStep4} đang TK)</span></span>
            {countStep4 > 0 && (
              <span className="bg-[#406c89] text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                {countStep4}
              </span>
            )}
          </span>
        </div>
      </div>

      {/* 3. Metrics / Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Tổng HĐ */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between h-24 shadow-xs">
          <span className="text-xs font-semibold text-slate-400">Tổng HĐ</span>
          <span className="text-2xl font-bold text-[#2C4159]">{contracts.length}</span>
        </div>

        {/* Card 2: Đang thực hiện */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between h-24 shadow-xs">
          <span className="text-xs font-semibold text-slate-400">Đang thực hiện</span>
          <span className="text-2xl font-bold text-amber-600">
            {contracts.filter(c => c.trangThai === 'Đang thực hiện').length}
          </span>
        </div>

        {/* Card 3: Hoàn thành */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between h-24 shadow-xs">
          <span className="text-xs font-semibold text-slate-400">Hoàn thành</span>
          <span className="text-2xl font-bold text-emerald-600">
            {contracts.filter(c => c.trangThai === 'Hoàn thành').length}
          </span>
        </div>

        {/* Card 4: Tổng giá trị */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between h-24 shadow-xs">
          <span className="text-xs font-semibold text-slate-400">Tổng giá trị</span>
          <span className="text-2xl font-bold text-[#406c89]">{formatTongGiaTri(totalValue)}</span>
        </div>
      </div>

      {/* 4. Search Filter Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl px-3.5 py-2.5 flex items-center gap-2 shadow-xs">
        <IconSearch size={18} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm theo số HĐ, khách hàng, tên dự án..."
          className="w-full bg-transparent text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      {/* 5. Main Content / Table or Empty State */}
      {sorted.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-2xl py-20 px-4 flex flex-col items-center justify-center min-h-[300px] text-center shadow-xs">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-slate-300 mb-2">
            <IconSignature size={48} className="stroke-[1.25]" />
          </div>
          <p className="text-xs text-slate-400 font-medium">Chưa có hợp đồng nào.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="px-5 py-3">
                    <button
                      type="button"
                      onClick={() => handleSort('soHopDong')}
                      className="flex items-center hover:text-slate-700 transition-colors font-bold uppercase cursor-pointer"
                    >
                      <span>Số HĐ</span>
                      <SortIcon k="soHopDong" />
                    </button>
                  </th>
                  <th className="px-5 py-3 font-bold uppercase text-slate-400">
                    Khách hàng
                  </th>
                  <th className="px-5 py-3">
                    <button
                      type="button"
                      onClick={() => handleSort('tenDuAn')}
                      className="flex items-center hover:text-slate-700 transition-colors font-bold uppercase cursor-pointer"
                    >
                      <span>Tên mô hình</span>
                      <SortIcon k="tenDuAn" />
                    </button>
                  </th>
                  <th className="px-5 py-3 font-bold uppercase text-slate-400">
                    Ngày ký
                  </th>
                  <th className="px-5 py-3 font-bold uppercase text-slate-400">
                    Giá trị sau thuế
                  </th>
                  <th className="px-5 py-3 font-bold uppercase text-slate-400">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {sorted.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    {/* Số HĐ */}
                    <td className="px-5 py-3.5 font-medium text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#406c89] hover:underline font-semibold font-mono cursor-pointer text-sm">
                          {item.soHopDong}
                        </span>
                        
                        {/* Edit & Delete Action Buttons */}
                        <div className="flex items-center gap-0.5">
                          <button
                            type="button"
                            onClick={() => setEditingHopDong(item)}
                            className="p-1 rounded text-slate-400 hover:text-[#406c89] hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Sửa hợp đồng"
                          >
                            <IconPencil size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingHopDong(item)}
                            className="p-1 rounded text-slate-400 hover:text-[#406c89] hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Xóa hợp đồng"
                          >
                            <IconTrash size={18} />
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Khách hàng */}
                    <td className="px-5 py-3.5 text-slate-700 font-semibold uppercase leading-snug">
                      {item.khachHang}
                    </td>

                    {/* Tên mô hình */}
                    <td className="px-5 py-3.5 text-slate-500 font-medium truncate max-w-[220px]" title={item.tenDuAn}>
                      {item.tenDuAn}
                    </td>

                    {/* Ngày ký */}
                    <td className="px-5 py-3.5 text-slate-400 font-mono">
                      {item.ngayKy}
                    </td>

                    {/* Giá trị sau thuế */}
                    <td className="px-5 py-3.5 text-slate-800 font-bold">
                      {new Intl.NumberFormat('vi-VN').format(item.giaTri)}đ
                    </td>

                    {/* Trạng thái */}
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${
                        item.trangThai === 'Bản nháp'
                          ? 'bg-slate-50 text-slate-500 border-slate-200'
                          : item.trangThai === 'Đang thực hiện'
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      }`}>
                        {item.trangThai}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FOOTER COUNT */}
      {sorted.length > 0 && (
        <p className="text-[11px] text-slate-400 font-medium text-center mt-4">
          Hiển thị {sorted.length} / {contracts.length} hợp đồng
        </p>
      )}

      {/* Modal Quản lý Template */}
      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
      />

      {/* Modal Tạo Hợp đồng mới */}
      <TaoHopDongModal
        isOpen={isTaoHopDongModalOpen}
        onClose={() => setIsTaoHopDongModalOpen(false)}
        onSave={handleSaveHopDong}
      />

      {/* Modal Sửa Hợp đồng */}
      <SuaHopDongModal
        isOpen={editingHopDong !== null}
        onClose={() => setEditingHopDong(null)}
        onSave={handleUpdateHopDong}
        hopDong={editingHopDong}
      />

      {/* Modal Xóa Hợp đồng */}
      <XoaHopDongModal
        isOpen={deletingHopDong !== null}
        onClose={() => setDeletingHopDong(null)}
        onConfirm={handleDeleteHopDong}
        soHopDong={deletingHopDong?.soHopDong || ''}
      />
    </div>
  );
}


