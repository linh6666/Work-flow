"use client";

import React, { useState } from 'react';
import TheoThang from './tabs/TheoThang';
import TongHopTheoNam from './tabs/TongHopTheoNam';

export default function TheoDoiMuaNVLThang() {
  const [viewMode, setViewMode] = useState<'thang' | 'nam'>('nam');

  return (
    <div className="flex-1 flex flex-col gap-3 overflow-hidden">
      {/* ── Top Bar: Chuyển đổi Theo tháng / Tổng hợp theo năm ── */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => setViewMode('thang')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            viewMode === 'thang'
              ? 'bg-[#406c89] text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Theo tháng
        </button>
        <button
          type="button"
          onClick={() => setViewMode('nam')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            viewMode === 'nam'
              ? 'bg-[#406c89] text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Tổng hợp theo năm
        </button>
      </div>

      {/* ── 4 Thẻ thống kê KPI (Tổng số tháng, Chờ duyệt, Đã duyệt, Tổng giá trị) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        {/* Tổng số tháng */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col justify-center min-h-[86px]">
          <span className="text-xs text-slate-500 font-normal">Tổng số tháng</span>
          <span className="text-2xl font-bold text-[#406c89] mt-1.5 tracking-tight">10</span>
        </div>

        {/* Chờ duyệt */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col justify-center min-h-[86px]">
          <span className="text-xs text-slate-500 font-normal">Chờ duyệt</span>
          <span className="text-2xl font-bold text-[#e07718] mt-1.5 tracking-tight">9</span>
        </div>

        {/* Đã duyệt */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col justify-center min-h-[86px]">
          <span className="text-xs text-slate-500 font-normal">Đã duyệt</span>
          <span className="text-2xl font-bold text-[#0d9488] mt-1.5 tracking-tight">1</span>
        </div>

        {/* Tổng giá trị */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col justify-center min-h-[86px]">
          <span className="text-xs text-slate-500 font-normal">Tổng giá trị</span>
          <span className="text-2xl font-bold text-[#406c89] mt-1.5 tracking-tight">1.42 Tỷ</span>
        </div>
      </div>

      {/* ── Nội dung Tab ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {viewMode === 'thang' ? <TheoThang /> : <TongHopTheoNam />}
      </div>
    </div>
  );
}
