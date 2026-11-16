"use client";

import React from 'react';
import { IconCalendarTime } from '@tabler/icons-react';

export default function DsPhongVan() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
      <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 shadow-xs">
        <IconCalendarTime size={24} />
      </div>
      <h3 className="text-sm font-bold text-slate-700 mb-1">DS Phỏng vấn</h3>
      <p className="text-xs text-slate-400">Danh sách lịch phỏng vấn ứng viên đang được xây dựng.</p>
    </div>
  );
}
