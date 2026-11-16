"use client";

import React from 'react';
import { IconAdjustmentsCheck } from '@tabler/icons-react';

export default function KhungDanhGiaNangLuc() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
      <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 shadow-xs">
        <IconAdjustmentsCheck size={24} />
      </div>
      <h3 className="text-sm font-bold text-slate-700 mb-1">Khung đánh giá năng lực</h3>
      <p className="text-xs text-slate-400">Tiêu chuẩn và khung đánh giá năng lực đang được xây dựng.</p>
    </div>
  );
}
