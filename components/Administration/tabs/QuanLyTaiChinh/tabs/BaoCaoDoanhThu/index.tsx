"use client";

import React, { useState } from 'react';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconScale,
  IconRefresh,
  IconCalendar,
  IconStack2,
  IconUsers,
  IconFileText,
  IconUserCircle,
} from '@tabler/icons-react';

import DoanhThuTheoNam from './tabs/DoanhThuTheoNam';
import DoanhThuTheoLoaiDA from './tabs/DoanhThuTheoLoaiDA';
import DoanhThuThucTeTheoKH from './tabs/DoanhThuThucTeTheoKH';
import DoanhThuHopDongTheoKH from './tabs/DoanhThuHopDongTheoKH';
import ChanDungKhachHang from './tabs/ChanDungKhachHang';

type SubTabType = 'nam' | 'loai-da' | 'tt-kh' | 'hd-kh' | 'chan-dung-kh';

export default function BaoCaoDoanhThuTab() {
  const [selectedNam, setSelectedNam] = useState<string>('2026');
  const [activeTab, setActiveTab] = useState<SubTabType>('nam');

  // KPI Metrics
  const doanhThu = 0;
  const thuNoiBo = 0;
  const chiNoiBo = 0;
  const canDoiNB = 0;

  const handleRefresh = () => {
    setSelectedNam('2026');
    setActiveTab('nam');
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-3 text-slate-700 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* ── Top Bar: Năm báo cáo & Làm mới ── */}
      <div className="shrink-0 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500">Năm báo cáo:</span>
          <select
            value={selectedNam}
            onChange={(e) => setSelectedNam(e.target.value)}
            className="bg-white border border-[#9333ea]/50 hover:border-[#9333ea] focus:border-[#9333ea] rounded-lg px-3 py-1 text-xs font-semibold text-slate-700 shadow-2xs focus:outline-none cursor-pointer transition-all"
          >
            <option value="2026">Năm 2026</option>
            <option value="2025">Năm 2025</option>
            <option value="2024">Năm 2024</option>
            <option value="2023">Năm 2023</option>
            <option value="2022">Năm 2022</option>
            <option value="2021">Năm 2021</option>
            <option value="2020">Năm 2020</option>
            <option value="2019">Năm 2019</option>
            <option value="2018">Năm 2018</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
        >
          <IconRefresh size={13} className="text-slate-500" />
          <span>Làm mới</span>
        </button>
      </div>

      {/* ── 4 KPI Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        {/* Card 1: DOANH THU */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center gap-1.5 mb-1.5">
            <IconTrendingUp size={15} className="text-emerald-600" />
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide">
              DOANH THU {selectedNam}
            </span>
          </div>
          <p className="text-xl font-black text-emerald-700">
            {doanhThu} <u className="underline decoration-emerald-700 font-bold text-lg">đ</u>
          </p>
        </div>

        {/* Card 2: THU NỘI BỘ */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center gap-1.5 mb-1.5">
            <IconTrendingUp size={15} className="text-emerald-600" />
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide">
              THU NỘI BỘ
            </span>
          </div>
          <p className="text-xl font-black text-emerald-700">
            {thuNoiBo} <u className="underline decoration-emerald-700 font-bold text-lg">đ</u>
          </p>
        </div>

        {/* Card 3: CHI NỘI BỘ */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center gap-1.5 mb-1.5">
            <IconTrendingDown size={15} className="text-[#dc2626]" />
            <span className="text-[11px] font-bold text-[#dc2626] uppercase tracking-wide">
              CHI NỘI BỘ
            </span>
          </div>
          <p className="text-xl font-black text-[#dc2626]">
            {chiNoiBo} <u className="underline decoration-[#dc2626] font-bold text-lg">đ</u>
          </p>
        </div>

        {/* Card 4: CÂN ĐỐI NB */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center gap-1.5 mb-1.5">
            <IconScale size={15} className="text-[#b45309]" />
            <span className="text-[11px] font-bold text-[#b45309] uppercase tracking-wide">
              CÂN ĐỐI NB
            </span>
          </div>
          <p className="text-xl font-black text-[#b45309]">
            {canDoiNB} <u className="underline decoration-[#b45309] font-bold text-lg">đ</u>
          </p>
        </div>
      </div>

      {/* ── Sub-tabs Navigation Bar ── */}
      <div className="shrink-0 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('nam')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'nam'
              ? 'bg-[#3e566d] text-white shadow-2xs'
              : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600 hover:text-slate-800'
          }`}
        >
          <IconCalendar size={14} />
          <span>DT theo Năm</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('loai-da')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'loai-da'
              ? 'bg-[#3e566d] text-white shadow-2xs'
              : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600 hover:text-slate-800'
          }`}
        >
          <IconStack2 size={14} />
          <span>DT theo Loại DA</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tt-kh')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'tt-kh'
              ? 'bg-[#3e566d] text-white shadow-2xs'
              : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600 hover:text-slate-800'
          }`}
        >
          <IconUsers size={14} />
          <span>DT thực tế theo KH</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hd-kh')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'hd-kh'
              ? 'bg-[#3e566d] text-white shadow-2xs'
              : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600 hover:text-slate-800'
          }`}
        >
          <IconFileText size={14} />
          <span>DT HĐ theo KH</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('chan-dung-kh')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'chan-dung-kh'
              ? 'bg-[#3e566d] text-white shadow-2xs'
              : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600 hover:text-slate-800'
          }`}
        >
          <IconUserCircle size={14} />
          <span>Chân dung KH</span>
        </button>
      </div>

      {/* ── Sub-tab Content Area ── */}
      <div className="flex-1 flex flex-col min-h-0">
        {activeTab === 'nam' && <DoanhThuTheoNam selectedNam={selectedNam} />}
        {activeTab === 'loai-da' && <DoanhThuTheoLoaiDA selectedNam={selectedNam} />}
        {activeTab === 'tt-kh' && <DoanhThuThucTeTheoKH selectedNam={selectedNam} />}
        {activeTab === 'hd-kh' && <DoanhThuHopDongTheoKH selectedNam={selectedNam} />}
        {activeTab === 'chan-dung-kh' && <ChanDungKhachHang selectedNam={selectedNam} />}
      </div>
    </div>
  );
}
