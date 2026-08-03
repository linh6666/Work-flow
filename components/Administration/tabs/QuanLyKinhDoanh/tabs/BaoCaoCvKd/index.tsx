"use client";

import React from 'react';

export default function BaoCaoCvKdTab() {
  return (
    <div className="bg-white border border-slate-200/80 rounded-lg p-5 shadow-2xs space-y-3">
      <h3 className="text-sm font-bold text-slate-800">Báo cáo CV Kinh doanh</h3>
      <p className="text-[11px] text-slate-400">Tổng hợp doanh thu, tiến độ hợp đồng & chỉ số kinh doanh tháng này.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        <div className="bg-slate-50 border border-slate-200/60 rounded-md p-3">
          <p className="text-[11px] text-slate-500 font-semibold">Doanh thu mục tiêu</p>
          <p className="text-xl font-extrabold text-blue-600 mt-0.5">2.4 Tỷ</p>
        </div>
        <div className="bg-slate-50 border border-slate-200/60 rounded-md p-3">
          <p className="text-[11px] text-slate-500 font-semibold">Tỷ lệ chốt Hợp đồng</p>
          <p className="text-xl font-extrabold text-emerald-600 mt-0.5">68.5%</p>
        </div>
        <div className="bg-slate-50 border border-slate-200/60 rounded-md p-3">
          <p className="text-[11px] text-slate-500 font-semibold">Số đề xuất chờ duyệt</p>
          <p className="text-xl font-extrabold text-amber-600 mt-0.5">8</p>
        </div>
      </div>
    </div>
  );
}
