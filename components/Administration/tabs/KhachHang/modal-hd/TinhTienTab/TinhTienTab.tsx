"use client";

import React from 'react';

const textareaClass =
  'w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100';
const labelClass = 'mb-1.5 block text-xs font-medium text-slate-900';

interface TinhTienTabProps {
  ghiChu: string;
  setGhiChu: (v: string) => void;
}

export default function TinhTienTab({ ghiChu, setGhiChu }: TinhTienTabProps) {
  return (
    <div className="tab-content-active space-y-4">
      <div>
        <label className={labelClass}>Ghi chú hợp đồng</label>
        <textarea
          rows={6}
          placeholder="Ghi chú thêm về điều khoản giao hàng, phạt vi phạm hợp đồng, bảo hành..."
          value={ghiChu}
          onChange={(e) => setGhiChu(e.target.value)}
          className={`${textareaClass} min-h-[160px]`}
        />
      </div>
    </div>
  );
}
