"use client";

import React from 'react';
import { IconCheckbox } from '@tabler/icons-react';

export default function PheDuyetQuyTrinhTab() {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-2xs space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <IconCheckbox size={22} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Phê duyệt quy trình KD</h3>
          <p className="text-[11px] text-slate-400">Thiết lập & kiểm tra quy định phê duyệt các bước kinh doanh (Soạn HĐ → Duyệt KD → Phê duyệt PGĐ).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4">
          <p className="text-[11px] text-slate-500 font-semibold">Quy trình áp dụng</p>
          <p className="text-xl font-black text-[#406c89] mt-1">4 quy trình</p>
        </div>
        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4">
          <p className="text-[11px] text-slate-500 font-semibold">Tỷ lệ tuân thủ</p>
          <p className="text-xl font-black text-emerald-600 mt-1">100%</p>
        </div>
        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4">
          <p className="text-[11px] text-slate-500 font-semibold">Thời gian duyệt TB</p>
          <p className="text-xl font-black text-indigo-600 mt-1">1.5 ngày</p>
        </div>
      </div>
    </div>
  );
}
