"use client";

import React, { useState } from 'react';
import {
  IconFileText,
  IconPlus,
  IconArrowRight,
  IconSearch,
  IconSelector,
  IconPencil,
  IconCopy,
  IconTrash
} from '@tabler/icons-react';
import TaoYCSXModal from './modal/TaoYCSX';
import ChinhSuaYCSXModal from './modal/ChinhSuaYCSX';
import XoaYCSXModal from './modal/XoaYCSX';

export interface YcsxItem {
  id: string;
  soYcsx: string;
  tenDuAn: string;
  khachHangMaDa: string;
  tyLe: string;
  ngayTao: string;
  trangThai: string;
}

const SAMPLE_YCSX_LIST: YcsxItem[] = [
  {
    id: '1',
    soYcsx: '03-2026/YCSX-MHV',
    tenDuAn: 'MÔ HÌNH DỰ ÁN 22 LIỄU GIAI',
    khachHangMaDa: 'CĐT 22 LIỄU GIAI · 03-2026/DA-MHV',
    tyLe: '1/75',
    ngayTao: '7/7/2026',
    trangThai: 'QL KD đã duyệt',
  },
  {
    id: '2',
    soYcsx: '14.02-2026/YCSX-MHV',
    tenDuAn: 'THE HERITAGE TÂY NINH - Lắp đặt tại Tây Ninh',
    khachHangMaDa: 'The Heritage Tây Ninh · 14.02-2026/DA-MHV',
    tyLe: '1/400',
    ngayTao: '7/7/2026',
    trangThai: 'QL KD đã duyệt',
  },
  {
    id: '3',
    soYcsx: '14.01-2026/YCSX-MHV',
    tenDuAn: 'THE HERITAGE TÂY NINH - Lắp đặt tại Hà Nội',
    khachHangMaDa: 'The Heritage Tây Ninh · 14.01-2026/DA-MHV',
    tyLe: '1/400',
    ngayTao: '7/7/2026',
    trangThai: 'QL KD đã duyệt',
  },
  {
    id: '4',
    soYcsx: '16-2026/YCSX-MHV',
    tenDuAn: 'IA25 -CIPUTRA',
    khachHangMaDa: 'IA25 -CIPUTRA · 16-2026/DA-MHV',
    tyLe: '1/100',
    ngayTao: '7/7/2026',
    trangThai: 'QL KD đã duyệt',
  },
  {
    id: '5',
    soYcsx: '17-2026/YCSX-MHV',
    tenDuAn: 'HERITAGE VILLAGE MOC CHAU',
    khachHangMaDa: 'HERIAGE VILLAGE MOC CHAU · 17-2026/DA-MHV',
    tyLe: '1/500',
    ngayTao: '7/7/2026',
    trangThai: 'QL KD đã duyệt',
  },
  {
    id: '6',
    soYcsx: '20-2026/YCSX-MHV',
    tenDuAn: "CHỈNH SỬA MÔ HÌNH L'AURORA",
    khachHangMaDa: "CĐT L'AURORA · 20-2026/DA-MHV",
    tyLe: '1/150',
    ngayTao: '7/7/2026',
    trangThai: 'QL KD đã duyệt',
  },
  {
    id: '7',
    soYcsx: '21-2026/YCSX-MHV',
    tenDuAn: 'VSIP LẠNG SƠN',
    khachHangMaDa: 'VSIP Lạng Sơn · 21-2026/DA-MHV',
    tyLe: '1/1000',
    ngayTao: '7/7/2026',
    trangThai: 'QL KD đã duyệt',
  },
  {
    id: '8',
    soYcsx: '04-2026/YCSX-MHV',
    tenDuAn: 'Flamingo Đông Anh',
    khachHangMaDa: 'Công ty CP Flamingo · 04-2026/DA-MHV',
    tyLe: '1/500',
    ngayTao: '2/7/2026',
    trangThai: 'QL KD đã duyệt',
  },
];

export default function YeuCauSanXuat() {
  const [ycsxList, setYcsxList] = useState<YcsxItem[]>(SAMPLE_YCSX_LIST);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTaoModalOpen, setIsTaoModalOpen] = useState(false);
  const [selectedItemToEdit, setSelectedItemToEdit] = useState<YcsxItem | null>(null);
  const [isChinhSuaModalOpen, setIsChinhSuaModalOpen] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState<YcsxItem | null>(null);
  const [isXoaModalOpen, setIsXoaModalOpen] = useState(false);

  const filteredList = ycsxList.filter(
    (item) =>
      item.tenDuAn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.soYcsx.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.khachHangMaDa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteItem = (id: string) => {
    setYcsxList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDuplicateItem = (item: YcsxItem) => {
    const newItem: YcsxItem = {
      ...item,
      id: `ycsx-${Date.now()}`,
      soYcsx: `${item.soYcsx}-COPY`,
    };
    setYcsxList((prev) => [newItem, ...prev]);
  };

  return (
    <div className="p-6 space-y-5 animate-fade-in max-w-[1600px] mx-auto w-full">
      
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#406c89]/10 text-[#406c89] flex items-center justify-center shrink-0">
            <IconFileText size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Yêu cầu Sản xuất Mô hình
            </h2>
            <p className="text-xs text-slate-400 font-normal">
              Quản lý và phê duyệt yêu cầu sản xuất theo quy trình
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsTaoModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <IconPlus size={18} />
          <span>Tạo YCSX</span>
        </button>
      </div>

      {/* 2. Process Workflow Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-2 overflow-x-auto shadow-2xs select-none">
        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-slate-100 text-slate-700 font-semibold px-3.5 py-1.5 rounded-xl text-xs">
            NV Kinh doanh <span className="font-normal text-slate-400">lập YCSX</span>
          </span>
          <IconArrowRight size={16} className="text-slate-300" />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-slate-100 text-slate-800 font-bold px-3.5 py-1.5 rounded-xl text-xs">
            Quản lý Kinh doanh <span className="font-normal text-slate-400">duyệt</span>
          </span>
          <IconArrowRight size={16} className="text-slate-300" />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-slate-100 text-slate-500 font-semibold px-3.5 py-1.5 rounded-xl text-xs">
            Phó GĐ KD-HC <span className="font-normal text-slate-400">phê duyệt cuối</span>
          </span>
          <IconArrowRight size={16} className="text-slate-300" />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-slate-100 text-slate-500 font-semibold px-3.5 py-1.5 rounded-xl text-xs">
            Triển khai SX <span className="font-normal text-slate-400">(0 đã duyệt)</span>
          </span>
        </div>
      </div>

      {/* 3. Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
        {/* Card 1: Tổng YCSX */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between h-24 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400">Tổng YCSX</span>
          <span className="text-2xl font-bold text-slate-900">{ycsxList.length}</span>
        </div>

        {/* Card 2: Chờ duyệt */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between h-24 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400">Chờ duyệt</span>
          <span className="text-2xl font-bold text-amber-600">0</span>
        </div>

        {/* Card 3: Đã phê duyệt */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between h-24 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400">Đã phê duyệt</span>
          <span className="text-2xl font-bold text-emerald-600">0</span>
        </div>

        {/* Card 4: Từ chối */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between h-24 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400">Từ chối</span>
          <span className="text-2xl font-bold text-rose-600">0</span>
        </div>
      </div>

      {/* 4. Search Filter Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-2xs">
        <IconSearch size={20} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm theo tên dự án, khách hàng, mã dự án..."
          className="w-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
        />
      </div>

      {/* 5. Data Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto overflow-y-auto max-h-[500px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-100 shadow-2xs">
              <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none">
                <th className="py-3 px-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-slate-600">
                    <span>SỐ YCSX</span>
                    <IconSelector size={16} className="text-slate-300" />
                  </div>
                </th>
                <th className="py-3 px-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-slate-600">
                    <span>DỰ ÁN / KHÁCH HÀNG</span>
                    <IconSelector size={16} className="text-slate-300" />
                  </div>
                </th>
                <th className="py-3 px-4 text-center">TỶ LỆ</th>
                <th className="py-3 px-4 text-center">NGÀY TẠO</th>
                <th className="py-3 px-4 text-center">TRẠNG THÁI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* SỐ YCSX & Actions */}
                  <td className="py-3.5 px-4 font-semibold text-[#406c89] whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span>{item.soYcsx}</span>
                      <div className="flex items-center gap-1 text-slate-400">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedItemToEdit(item);
                            setIsChinhSuaModalOpen(true);
                          }}
                          className="hover:text-[#406c89] transition-colors p-0.5 cursor-pointer"
                          title="Chỉnh sửa"
                        >
                          <IconPencil size={17} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDuplicateItem(item)}
                          className="hover:text-[#406c89] transition-colors p-0.5 cursor-pointer"
                          title="Sao chép"
                        >
                          <IconCopy size={17} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedItemToDelete(item);
                            setIsXoaModalOpen(true);
                          }}
                          className="hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                          title="Xóa"
                        >
                          <IconTrash size={17} />
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* DỰ ÁN / KHÁCH HÀNG */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-900 text-xs">
                        {item.tenDuAn}
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal">
                        {item.khachHangMaDa}
                      </div>
                    </div>
                  </td>

                  {/* TỶ LỆ */}
                  <td className="py-3.5 px-4 text-center font-medium text-slate-600 whitespace-nowrap">
                    {item.tyLe}
                  </td>

                  {/* NGÀY TẠO */}
                  <td className="py-3.5 px-4 text-center font-medium text-slate-600 whitespace-nowrap">
                    {item.ngayTao}
                  </td>

                  {/* TRẠNG THÁI */}
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span className="bg-[#406c89]/10 border border-[#406c89]/20 text-[#406c89] px-2.5 py-1 rounded-lg text-[11px] font-bold inline-block">
                      {item.trangThai}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400 text-xs font-normal">
                    Không tìm thấy yêu cầu sản xuất nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tao YCSX Modal */}
      <TaoYCSXModal
        isOpen={isTaoModalOpen}
        onClose={() => setIsTaoModalOpen(false)}
        onSubmitSuccess={(newData) => {
          setYcsxList((prev) => [newData, ...prev]);
        }}
      />

      {/* Chinh Sua YCSX Modal */}
      <ChinhSuaYCSXModal
        isOpen={isChinhSuaModalOpen}
        itemData={selectedItemToEdit}
        onClose={() => setIsChinhSuaModalOpen(false)}
        onSaveSuccess={(updatedData) => {
          setYcsxList((prev) =>
            prev.map((item) => (item.id === updatedData.id ? updatedData : item))
          );
        }}
      />

      {/* Xoa YCSX Modal */}
      <XoaYCSXModal
        isOpen={isXoaModalOpen}
        itemData={selectedItemToDelete}
        onClose={() => setIsXoaModalOpen(false)}
        onConfirmDelete={(id) => {
          handleDeleteItem(id);
        }}
      />

    </div>
  );
}
