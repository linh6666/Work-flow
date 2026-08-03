"use client";

import React from 'react';
import { IconChartBar } from '@tabler/icons-react';

export default function PheDuyetBaoCaoTab() {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-2xs space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
          <IconChartBar size={22} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Phê duyệt Báo cáo</h3>
          <p className="text-[11px] text-slate-400">Danh sách các báo cáo tuần, báo cáo tháng chờ Trưởng phòng & PGĐ phê duyệt.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4">
          <p className="text-[11px] text-slate-500 font-semibold">Báo cáo chờ duyệt</p>
          <p className="text-xl font-black text-amber-600 mt-1">2 báo cáo</p>
        </div>
        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4">
          <p className="text-[11px] text-slate-500 font-semibold">Báo cáo đã duyệt</p>
          <p className="text-xl font-black text-emerald-600 mt-1">15 báo cáo</p>
        </div>
        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4">
          <p className="text-[11px] text-slate-500 font-semibold">Báo cáo bị trả lại</p>
          <p className="text-xl font-black text-rose-600 mt-1">0</p>
        </div>
      </div>
    </div>
  );
}
