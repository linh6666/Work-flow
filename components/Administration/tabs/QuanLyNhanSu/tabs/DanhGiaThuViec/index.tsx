"use client";

import React from 'react';
import { IconStarFilled } from '@tabler/icons-react';

export default function DanhGiaThuViecTab() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-6">
      <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-3 shadow-xs">
        <IconStarFilled size={24} />
      </div>
      <h3 className="text-sm font-bold text-slate-700 mb-1">Đánh giá Thử việc</h3>
      <p className="text-xs text-slate-400">Nội dung tab đang được hoàn thiện.</p>
    </div>
  );
}
