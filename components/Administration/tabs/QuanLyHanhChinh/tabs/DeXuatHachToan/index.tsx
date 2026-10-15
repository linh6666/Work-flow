"use client";

import React, { useState } from 'react';
import {
  IconSearch,
  IconChartBar,
  IconPlus,
  IconPencil,
  IconTrash,
  IconSelector,
  IconChevronLeft,
  IconChevronRight,
  IconCopy,
} from '@tabler/icons-react';

import ThemDeXuatModal, { MonthRecordData } from './modals/ThemDeXuatModal';
import SuaDeXuatModal from './modals/SuaDeXuatModal';
import LapHachToanModal from './modals/LapHachToanModal';
import XoaDeXuatModal from './modals/XoaDeXuatModal';
import type { DeXuatHachToanItem } from './types';

export type { DeXuatHachToanItem };

/* ─── Initial Mock Data Từ Hình Ảnh Thực Tế ────────────────────────── */
const initialMockData: any[] = [
  // ── THÁNG 10/2026 ──────────────────────────────────────────────
  {
    id: 'dx-41-2026',
    soDeXuat: '41-2026/ĐXDC-HC',
    thang: 'Tháng 10',
    nam: 2026,
    dienGiai: 'ĐXDC DỰ KIẾN CHI PHÍ CÔNG TÁC HƯNG YÊN',
    soMuc: 3,
    tongTien: '4.000.000 đ',
    trangThaiDuyet: 'Chờ PGĐ duyệt',
    soHT: '+ Lập hạch toán',
    tongTienHT: '—',
    trangThaiHT: '—',
    loai: ['Đề xuất duyệt chi'],
    soBanGhi: 3,
  },
  {
    id: 'dx-40-2026',
    soDeXuat: '40-2026/ĐXDC-HC',
    thang: 'Tháng 10',
    nam: 2026,
    dienGiai: 'ĐXDC SIM DATA 12 THÁNG',
    soMuc: 1,
    tongTien: '1.047.500 đ',
    trangThaiDuyet: 'Chờ PGĐ duyệt',
    soHT: '40-2026/HT-HC',
    tongTienHT: '1.047.500 đ',
    trangThaiHT: 'Chờ QL KD duyệt',
    loai: ['Đề xuất duyệt chi', 'Hạch toán'],
    soBanGhi: 1,
  },
  {
    id: 'dx-39-2026',
    soDeXuat: '39-2026/ĐXDC-HC',
    thang: 'Tháng 10',
    nam: 2026,
    dienGiai: 'ĐXDC CHI PHÍ VẬN CHUYỂN DỰ ÁN TÂY NINH (HÀ NỘI)',
    soMuc: 1,
    tongTien: '1.100.000 đ',
    trangThaiDuyet: 'PGĐ đã duyệt',
    soHT: '39-2026/HT-HC',
    tongTienHT: '1.100.000 đ',
    trangThaiHT: 'Chờ QL KD duyệt',
    loai: ['Đề xuất duyệt chi', 'Hạch toán'],
    soBanGhi: 1,
  },
  {
    id: 'dx-38-2026',
    soDeXuat: '38-2026/ĐXDC-HC',
    thang: 'Tháng 10',
    nam: 2026,
    dienGiai: 'ĐXDC ĐỒ ĂN CA TỐI',
    soMuc: 1,
    tongTien: '3.000.000 đ',
    trangThaiDuyet: 'Chờ PGĐ duyệt',
    soHT: '+ Lập hạch toán',
    tongTienHT: '—',
    trangThaiHT: '—',
    loai: ['Đề xuất duyệt chi'],
    soBanGhi: 1,
  },
  {
    id: 'dx-37-2026',
    soDeXuat: '37-2026/ĐXDC-HC',
    thang: 'Tháng 10',
    nam: 2026,
    dienGiai: 'ĐXDC HÀNH CHÍNH THÁNG 10',
    soMuc: 27,
    tongTien: '11.746.001 đ',
    trangThaiDuyet: 'PGĐ đã duyệt',
    soHT: '37-2026/HT-HC',
    tongTienHT: '11.746.001 đ',
    trangThaiHT: 'Chờ QL KD duyệt',
    loai: ['Đề xuất duyệt chi', 'Hạch toán'],
    soBanGhi: 27,
  },

  // ── THÁNG 9/2026 ───────────────────────────────────────────────
  {
    id: 'dx-36-2026',
    soDeXuat: '36-2026/ĐXDC-HC',
    thang: 'Tháng 9',
    nam: 2026,
    dienGiai: 'ĐỀ XUẤT DUYỆT CHI',
    soMuc: 1,
    tongTien: '2.000.000 đ',
    trangThaiDuyet: 'PGĐ đã duyệt',
    soHT: '36-2026/HT-HC',
    tongTienHT: '2.000.000 đ',
    trangThaiHT: 'PGĐ đã duyệt',
    loai: ['Đề xuất duyệt chi', 'Hạch toán'],
    soBanGhi: 1,
  },
  {
    id: 'dx-35-2026',
    soDeXuat: '35-2026/ĐXDC-HC',
    thang: 'Tháng 9',
    nam: 2026,
    dienGiai: 'ĐỀ XUẤT DUYỆT CHI',
    soMuc: 1,
    tongTien: '4.190.000 đ',
    trangThaiDuyet: 'PGĐ đã duyệt',
    soHT: '35-2026/HT-HC',
    tongTienHT: '4.190.000 đ',
    trangThaiHT: 'PGĐ đã duyệt',
    loai: ['Đề xuất duyệt chi', 'Hạch toán'],
    soBanGhi: 1,
  },
  {
    id: 'dx-34-2026',
    soDeXuat: '34-2026/ĐXDC-HC',
    thang: 'Tháng 9',
    nam: 2026,
    dienGiai: 'ĐXDC HÀNH CHÍNH THÁNG 09',
    soMuc: 22,
    tongTien: '8.532.000 đ',
    trangThaiDuyet: 'PGĐ đã duyệt',
    soHT: '34-2026/HT-HC',
    tongTienHT: '8.315.315 đ',
    trangThaiHT: 'Chờ QL KD duyệt',
    loai: ['Đề xuất duyệt chi', 'Hạch toán'],
    soBanGhi: 22,
  },
  {
    id: 'ht-34-2026-sub',
    soDeXuat: '—',
    thang: 'Tháng 9',
    nam: 2026,
    dienGiai: '—',
    soMuc: '—',
    tongTien: '—',
    trangThaiDuyet: '—',
    soHT: '34-2026/HT-HC',
    tongTienHT: '8.479.315 đ',
    trangThaiHT: 'Chờ QL KD duyệt',
    loai: ['Hạch toán'],
    soBanGhi: 1,
  },

  // ── THÁNG 8/2026 ───────────────────────────────────────────────
  {
    id: 'dx-33-2026',
    soDeXuat: '33-2026/ĐXDC-HC',
    thang: 'Tháng 8',
    nam: 2026,
    dienGiai: 'ĐỀ XUẤT DUYỆT CHI',
    soMuc: 1,
    tongTien: '3.490.000 đ',
    trangThaiDuyet: 'PGĐ đã duyệt',
    soHT: '33-2026/HT-HC',
    tongTienHT: '3.490.000 đ',
    trangThaiHT: 'Chờ QL KD duyệt',
    loai: ['Đề xuất duyệt chi', 'Hạch toán'],
    soBanGhi: 1,
  },
  {
    id: 'dx-32-2026',
    soDeXuat: '32-2026/ĐXDC-HC',
    thang: 'Tháng 8',
    nam: 2026,
    dienGiai: 'ĐỀ XUẤT DUYỆT CHI',
    soMuc: 2,
    tongTien: '4.100.000 đ',
    trangThaiDuyet: 'PGĐ đã duyệt',
    soHT: '+ Lập hạch toán',
    tongTienHT: '—',
    trangThaiHT: '—',
    loai: ['Đề xuất duyệt chi'],
    soBanGhi: 2,
  },
  {
    id: 'dx-31-2026',
    soDeXuat: '31-2026/ĐXDC-HC',
    thang: 'Tháng 8',
    nam: 2026,
    dienGiai: 'ĐỀ NGHỊ DUYỆT CHI THÁNG 8',
    soMuc: 25,
    tongTien: '14.740.450 đ',
    trangThaiDuyet: 'PGĐ đã duyệt',
    soHT: '+ Lập hạch toán',
    tongTienHT: '—',
    trangThaiHT: '—',
    loai: ['Đề xuất duyệt chi'],
    soBanGhi: 25,
  },
  {
    id: 'ht-17-2026',
    soDeXuat: '—',
    thang: 'Tháng 8',
    nam: 2026,
    dienGiai: '—',
    soMuc: '—',
    tongTien: '—',
    trangThaiDuyet: '—',
    soHT: '17-2026/HT-HC',
    tongTienHT: '—',
    trangThaiHT: 'Chờ QL KD duyệt',
    loai: ['Hạch toán'],
    soBanGhi: 1,
  },
  {
    id: 'ht-16-2026',
    soDeXuat: '—',
    thang: 'Tháng 8',
    nam: 2026,
    dienGiai: '—',
    soMuc: '—',
    tongTien: '—',
    trangThaiDuyet: '—',
    soHT: '16-2026/HT-HC',
    tongTienHT: '—',
    trangThaiHT: 'Chờ QL KD duyệt',
    loai: ['Hạch toán'],
    soBanGhi: 1,
  },
  {
    id: 'ht-15-2026',
    soDeXuat: '—',
    thang: 'Tháng 8',
    nam: 2026,
    dienGiai: '—',
    soMuc: '—',
    tongTien: '—',
    trangThaiDuyet: '—',
    soHT: '15-2026/HT-HC',
    tongTienHT: '—',
    trangThaiHT: 'Chờ PGĐ duyệt',
    loai: ['Hạch toán'],
    soBanGhi: 1,
  },
  {
    id: 'ht-14-2026',
    soDeXuat: '—',
    thang: 'Tháng 8',
    nam: 2026,
    dienGiai: '—',
    soMuc: '—',
    tongTien: '—',
    trangThaiDuyet: '—',
    soHT: '14-2026/HT-HC',
    tongTienHT: '10.039.043 đ',
    trangThaiHT: 'Chờ QL KD duyệt',
    loai: ['Hạch toán'],
    soBanGhi: 1,
  },
  {
    id: 'ht-13-2026',
    soDeXuat: '—',
    thang: 'Tháng 8',
    nam: 2026,
    dienGiai: '—',
    soMuc: '—',
    tongTien: '—',
    trangThaiDuyet: '—',
    soHT: '13-2026/HT-HC',
    tongTienHT: '—',
    trangThaiHT: 'Chờ PGĐ duyệt',
    loai: ['Hạch toán'],
    soBanGhi: 1,
  },
  {
    id: 'ht-12-2026',
    soDeXuat: '—',
    thang: 'Tháng 8',
    nam: 2026,
    dienGiai: '—',
    soMuc: '—',
    tongTien: '—',
    trangThaiDuyet: '—',
    soHT: '12-2026/HT-HC',
    tongTienHT: '—',
    trangThaiHT: 'Chờ PGĐ duyệt',
    loai: ['Hạch toán'],
    soBanGhi: 1,
  },

  // ── THÁNG 7/2026 ───────────────────────────────────────────────
  {
    id: 'dx-01-2026',
    soDeXuat: '01-2026/ĐXDC-HC',
    thang: 'Tháng 7',
    nam: 2026,
    dienGiai: 'ĐỀ NGHỊ DUYỆT CHI THÁNG 7',
    soMuc: 23,
    tongTien: '10.417.000 đ',
    trangThaiDuyet: 'Chờ QL KD duyệt',
    soHT: '+ Lập hạch toán',
    tongTienHT: '—',
    trangThaiHT: '—',
    loai: ['Đề xuất duyệt chi'],
    soBanGhi: 23,
  },
  {
    id: 'ht-11-2026',
    soDeXuat: '—',
    thang: 'Tháng 7',
    nam: 2026,
    dienGiai: '—',
    soMuc: '—',
    tongTien: '—',
    trangThaiDuyet: '—',
    soHT: '11-2026/HT-HC',
    tongTienHT: '36.248.486 đ',
    trangThaiHT: 'Chờ QL KD duyệt',
    loai: ['Hạch toán'],
    soBanGhi: 1,
  },
  {
    id: 'ht-05-2026',
    soDeXuat: '—',
    thang: 'Tháng 7',
    nam: 2026,
    dienGiai: '—',
    soMuc: '—',
    tongTien: '—',
    trangThaiDuyet: '—',
    soHT: '05-2026/HT-HC',
    tongTienHT: '—',
    trangThaiHT: 'Chờ QL KD duyệt',
    loai: ['Hạch toán'],
    soBanGhi: 1,
  },
  {
    id: 'dx-29-2026',
    soDeXuat: '29-2026/ĐXDC-HC',
    thang: 'Tháng 7',
    nam: 2026,
    dienGiai: 'CHI PHÍ THỰC TẾ SỬA ĐIỀU HÒA',
    soMuc: 36,
    tongTien: '23.050.000 đ',
    trangThaiDuyet: 'Chờ QL KD duyệt',
    soHT: '+ Lập hạch toán',
    tongTienHT: '—',
    trangThaiHT: '—',
    loai: ['Đề xuất duyệt chi', 'Chi thực tế'],
    soBanGhi: 36,
  },
  {
    id: 'dx-07-2026',
    soDeXuat: '07-2026/ĐXDC-HC',
    thang: 'Tháng 7',
    nam: 2026,
    dienGiai: 'ĐNDC MUA GPS',
    soMuc: 1,
    tongTien: '2.740.000 đ',
    trangThaiDuyet: 'Chờ QL KD duyệt',
    soHT: '+ Lập hạch toán',
    tongTienHT: '—',
    trangThaiHT: '—',
    loai: ['Đề xuất duyệt chi'],
    soBanGhi: 1,
  },
  {
    id: 'dx-25-2026',
    soDeXuat: '25-2026/ĐXDC-HC',
    thang: 'Tháng 7',
    nam: 2026,
    dienGiai: 'ĐNDC DỤNG CỤ RỬA XE',
    soMuc: 8,
    tongTien: '804.800 đ',
    trangThaiDuyet: 'Chờ QL KD duyệt',
    soHT: '+ Lập hạch toán',
    tongTienHT: '—',
    trangThaiHT: '—',
    loai: ['Đề xuất duyệt chi'],
    soBanGhi: 8,
  },
];

type FilterTab = 'Tất cả' | 'Đề xuất duyệt chi' | 'Hạch toán' | 'Chi thực tế';

/* ─── Main Component ─────────────────────────────────────────── */
export default function DeXuatHachToanTab() {
  const [dataList, setDataList] = useState<DeXuatHachToanItem[]>(initialMockData as any);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<DeXuatHachToanItem | null>(null);
  const [isLapHachToanOpen, setIsLapHachToanOpen] = useState(false);
  const [selectedLapHachToanRecord, setSelectedLapHachToanRecord] = useState<DeXuatHachToanItem | null>(null);

  const filterTabs: FilterTab[] = ['Tất cả', 'Đề xuất duyệt chi', 'Hạch toán', 'Chi thực tế'];

  // Filter records based on selected tab and search term
  const filteredData = dataList.filter((row) => {
    const matchesFilter =
      activeFilter === 'Tất cả' || row.loai.includes(activeFilter as any);
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      row.soDeXuat.toLowerCase().includes(q) ||
      row.dienGiai.toLowerCase().includes(q) ||
      row.soHT.toLowerCase().includes(q) ||
      row.thang.toLowerCase().includes(q) ||
      row.nam.toString().includes(q);
    return matchesFilter && matchesSearch;
  });

  // Calculate pagination values
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const handleFilterChange = (tab: FilterTab) => {
    setActiveFilter(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Modal Action Handlers
  const handleOpenAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (record: DeXuatHachToanItem) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (record: DeXuatHachToanItem) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const handleOpenLapHachToan = (record: DeXuatHachToanItem) => {
    setSelectedLapHachToanRecord(record);
    setIsLapHachToanOpen(true);
  };

  const handleConfirmLapHachToan = (updatedRecord: DeXuatHachToanItem) => {
    setDataList((prev) =>
      prev.map((item) => (item.id === updatedRecord.id ? updatedRecord : item))
    );
  };

  const handleCreateRecord = (newRecordData: MonthRecordData) => {
    const newRecord: DeXuatHachToanItem = {
      id: `dx-${Date.now()}`,
      soDeXuat: `${Math.floor(42 + Math.random() * 50)}-2026/ĐXDC-HC`,
      dienGiai: `Đề xuất chi phí tháng ${newRecordData.thang}/${newRecordData.nam}`,
      soMuc: newRecordData.soBanGhi || 1,
      tongTien: newRecordData.tongTien || '0 đ',
      trangThaiDuyet: 'Chờ PGĐ duyệt',
      soHT: '+ Lập hạch toán',
      tongTienHT: '—',
      trangThaiHT: '—',
      thang: newRecordData.thang.startsWith('Tháng') ? newRecordData.thang : `Tháng ${newRecordData.thang}`,
      nam: newRecordData.nam,
      loai: newRecordData.loai,
      soBanGhi: newRecordData.soBanGhi,
    };
    setDataList((prev) => [newRecord, ...prev]);
  };

  const handleUpdateRecord = (updatedRecord: DeXuatHachToanItem) => {
    setDataList((prev) =>
      prev.map((item) => (item.id === updatedRecord.id ? updatedRecord : item))
    );
  };

  const handleDeleteRecord = (id: string) => {
    setDataList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden gap-3.5 bg-slate-50 p-1">
      {/* ── Top Bar Controls ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
        
        {/* Left: Filter Pill Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => handleFilterChange(tab)}
                className={`px-3.5 py-1.5 text-xs rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#406c89] text-white font-medium shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-100/60 font-normal'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Right: Search Input & Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Tìm theo số đề xuất, diễn giải..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
            />
          </div>

          {/* Report Analytics Button */}
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200/90 text-slate-700 text-xs font-normal rounded-lg hover:bg-slate-50 transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
          >
            <IconChartBar size={14} className="text-slate-500" />
            <span>Báo cáo tổng hợp</span>
          </button>

          {/* Create New Button */}
          <button
            type="button"
            onClick={handleOpenAdd}
            className="flex items-center gap-1 px-3.5 py-1.5 bg-[#406c89] text-white text-xs font-medium rounded-lg hover:bg-[#345870] transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
          >
            <IconPlus size={14} />
            <span>Tạo mới</span>
          </button>
        </div>
      </div>

      {/* ── Table Container ── */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col overflow-hidden">
        <div className="overflow-auto flex-1">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-[#f8fafc] border-b border-slate-200/90 sticky top-0 z-10">
              <tr>
                {/* SỐ ĐỀ XUẤT */}
                <th className="py-3 px-5 font-semibold text-slate-500 uppercase tracking-wider text-[11px] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span>SỐ ĐỀ XUẤT</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>

                {/* THÁNG */}
                <th className="py-3 px-5 font-semibold text-slate-500 uppercase tracking-wider text-[11px] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span>THÁNG</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>

                {/* NĂM */}
                <th className="py-3 px-5 font-semibold text-slate-500 uppercase tracking-wider text-[11px] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span>NĂM</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>

                {/* DIỄN GIẢI */}
                <th className="py-3 px-5 font-semibold text-slate-500 uppercase tracking-wider text-[11px] whitespace-nowrap min-w-[200px]">
                  DIỄN GIẢI
                </th>

                {/* SỐ MỤC */}
                <th className="py-3 px-5 font-semibold text-slate-500 uppercase tracking-wider text-[11px] whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-1 cursor-pointer select-none">
                    <span>SỐ MỤC</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>

                {/* TỔNG TIỀN */}
                <th className="py-3 px-5 font-semibold text-slate-500 uppercase tracking-wider text-[11px] whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1 cursor-pointer select-none">
                    <span>TỔNG TIỀN</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>

                {/* TRẠNG THÁI DUYỆT */}
                <th className="py-3 px-5 font-semibold text-slate-500 uppercase tracking-wider text-[11px] whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-1 cursor-pointer select-none">
                    <span>TRẠNG THÁI DUYỆT</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>

                {/* SỐ HT */}
                <th className="py-3 px-5 font-semibold text-slate-500 uppercase tracking-wider text-[11px] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span>SỐ HT</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>

                {/* TỔNG TIỀN HT */}
                <th className="py-3 px-5 font-semibold text-slate-500 uppercase tracking-wider text-[11px] whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1 cursor-pointer select-none">
                    <span>TỔNG TIỀN HT</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>

                {/* TRẠNG THÁI HT */}
                <th className="py-3 px-5 font-semibold text-slate-500 uppercase tracking-wider text-[11px] whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-1 cursor-pointer select-none">
                    <span>TRẠNG THÁI HT</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>

                {/* THAO TÁC */}
                <th className="py-3 px-5 font-semibold text-slate-500 uppercase tracking-wider text-[11px] whitespace-nowrap text-center">
                  THAO TÁC
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  {/* SỐ ĐỀ XUẤT */}
                  <td className="py-3.5 px-5 font-semibold text-[#406c89] whitespace-nowrap">
                    {row.soDeXuat !== '—' ? (
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(row)}
                        className="text-[#6366f1] hover:text-[#4f46e5] hover:underline cursor-pointer font-semibold"
                      >
                        {row.soDeXuat}
                      </button>
                    ) : (
                      <span className="text-slate-400 italic">—</span>
                    )}
                  </td>

                  {/* THÁNG */}
                  <td className="py-3.5 px-5 text-slate-700 font-medium whitespace-nowrap">
                    {row.thang}
                  </td>

                  {/* NĂM */}
                  <td className="py-3.5 px-5 text-slate-600 font-medium whitespace-nowrap">
                    {row.nam}
                  </td>

                  {/* DIỄN GIẢI */}
                  <td className="py-3.5 px-5 text-slate-600">
                    {row.dienGiai}
                  </td>

                  {/* SỐ MỤC */}
                  <td className="py-3.5 px-5 text-slate-700 font-medium text-center whitespace-nowrap">
                    {row.soMuc}
                  </td>

                  {/* TỔNG TIỀN */}
                  <td className="py-3.5 px-5 text-slate-900 font-bold text-right whitespace-nowrap">
                    {row.tongTien}
                  </td>

                  {/* TRẠNG THÁI DUYỆT */}
                  <td className="py-3.5 px-5 text-center whitespace-nowrap">
                    {row.trangThaiDuyet === '—' ? (
                      <span className="text-slate-400 italic">—</span>
                    ) : (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-normal border ${
                          row.trangThaiDuyet.includes('đã duyệt')
                            ? 'bg-[#ecfdf5] text-[#059669] border-[#a7f3d0]'
                            : row.trangThaiDuyet.includes('PGĐ')
                            ? 'bg-[#f5f3ff] text-[#7c3aed] border-[#ddd6fe]'
                            : 'bg-[#fffbe6] text-[#d97706] border-[#fef08a]'
                        }`}
                      >
                        {row.trangThaiDuyet}
                      </span>
                    )}
                  </td>

                  {/* SỐ HT */}
                  <td className="py-3.5 px-5 text-slate-700 font-medium whitespace-nowrap">
                    {row.soHT === '+ Lập hạch toán' ? (
                      <button
                        type="button"
                        onClick={() => handleOpenLapHachToan(row)}
                        className="px-2 py-0.5 rounded text-[10.5px] bg-[#fffbe6] text-[#d97706] border border-[#fde047] font-medium hover:bg-[#fef9c3] transition-colors cursor-pointer"
                        title="Lập chứng từ hạch toán"
                      >
                        + Lập hạch toán
                      </button>
                    ) : row.soHT !== '—' ? (
                      <span className="font-semibold text-slate-800">{row.soHT}</span>
                    ) : (
                      <span className="text-slate-400 italic">—</span>
                    )}
                  </td>

                  {/* TỔNG TIỀN HT */}
                  <td className="py-3.5 px-5 text-slate-900 font-bold text-right whitespace-nowrap">
                    {row.tongTienHT}
                  </td>

                  {/* TRẠNG THÁI HT */}
                  <td className="py-3.5 px-5 text-center whitespace-nowrap">
                    {row.trangThaiHT === '—' ? (
                      <span className="text-slate-400 italic">—</span>
                    ) : (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-normal border ${
                          row.trangThaiHT.includes('đã duyệt')
                            ? 'bg-[#ecfdf5] text-[#059669] border-[#a7f3d0]'
                            : row.trangThaiHT.includes('PGĐ')
                            ? 'bg-[#f5f3ff] text-[#7c3aed] border-[#ddd6fe]'
                            : 'bg-[#fffbe6] text-[#d97706] border-[#fef08a]'
                        }`}
                      >
                        {row.trangThaiHT}
                      </span>
                    )}
                  </td>

                  {/* THAO TÁC */}
                  <td className="py-3.5 px-5 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      {/* Icon Sao chép */}
                      <button
                        type="button"
                        className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        title="Sao chép bản ghi"
                      >
                        <IconCopy size={15} />
                      </button>

                      {/* Icon Sửa */}
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(row)}
                        className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        title="Chỉnh sửa bản ghi"
                      >
                        <IconPencil size={15} />
                      </button>

                      {/* Icon Xóa */}
                      <button
                        type="button"
                        onClick={() => handleOpenDelete(row)}
                        className="p-1 rounded hover:bg-rose-50 text-rose-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Xóa bản ghi"
                      >
                        <IconTrash size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-slate-400">
                    Không tìm thấy dữ liệu phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Bottom Pagination Bar ── */}
        <div className="shrink-0 z-10 bg-white border-t border-slate-200/90 px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs select-none">
          <div className="flex items-center gap-3 text-slate-500 font-medium text-xs">
            <div>
              Hiển thị{' '}
              <span className="font-bold text-slate-800">
                {totalItems > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + pageSize, totalItems)}
              </span>{' '}
              trên <span className="font-bold text-slate-800">{totalItems}</span> bản ghi
            </div>
            <div className="flex items-center gap-1.5 ml-2 border-l border-slate-200 pl-3">
              <span>Hiển thị:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-xs text-slate-700 font-medium focus:outline-none cursor-pointer"
              >
                <option value={5}>5 bản ghi</option>
                <option value={10}>10 bản ghi</option>
                <option value={20}>20 bản ghi</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-lg border transition-all ${
                currentPage === 1
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer'
              }`}
              title="Trang trước"
            >
              <IconChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                  currentPage === pageNum
                    ? 'bg-[#406c89] text-white shadow-2xs font-bold'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-1.5 rounded-lg border transition-all ${
                currentPage === totalPages
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer'
              }`}
              title="Trang sau"
            >
              <IconChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      <ThemDeXuatModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateRecord}
      />

      <SuaDeXuatModal
        isOpen={isEditModalOpen}
        record={selectedRecord}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedRecord(null);
        }}
        onSubmit={handleUpdateRecord}
      />

      <LapHachToanModal
        isOpen={isLapHachToanOpen}
        record={selectedLapHachToanRecord}
        onClose={() => {
          setIsLapHachToanOpen(false);
          setSelectedLapHachToanRecord(null);
        }}
        onSubmit={handleConfirmLapHachToan}
      />

      <XoaDeXuatModal
        isOpen={isDeleteModalOpen}
        record={selectedRecord}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedRecord(null);
        }}
        onConfirm={handleDeleteRecord}
      />
    </div>
  );
}
