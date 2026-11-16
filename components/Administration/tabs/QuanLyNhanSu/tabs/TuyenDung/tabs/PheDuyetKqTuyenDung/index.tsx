"use client";

import React from 'react';
import { IconClipboardCheck } from '@tabler/icons-react';

export default function PheDuyetKqTuyenDung() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 shadow-xs">
        <IconClipboardCheck size={24} />
      </div>
      <h3 className="text-sm font-bold text-slate-700 mb-1">Phê duyệt KQ tuyển dụng</h3>
      <p className="text-xs text-slate-400">Danh sách và quy trình phê duyệt kết quả tuyển dụng đang được xây dựng.</p>
    </div>
  );
}
