"use client";

import React from 'react';
import { IconDownload, IconUpload, IconFileText } from '@tabler/icons-react';

interface DoanhThuThucTeTheoKHProps {
  selectedNam?: string;
}

export default function DoanhThuThucTeTheoKH({ selectedNam = '2026' }: DoanhThuThucTeTheoKHProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-2.5">
      {/* Action Buttons on top right */}
      <div className="flex justify-end items-center gap-1.5 shrink-0">
        <button
          type="button"
          className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
        >
          <IconDownload size={13} className="text-slate-500" />
          <span>Export</span>
        </button>

        <button
          type="button"
          className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
        >
          <IconUpload size={13} className="text-slate-500" />
          <span>Import</span>
        </button>

        <button
          type="button"
          className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
        >
          <IconFileText size={13} className="text-slate-500" />
          <span>Mẫu</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200/90 rounded-xl shadow-2xs overflow-hidden flex flex-col min-h-[160px]">
        <div className="p-3.5 border-b border-slate-100 bg-slate-50/40">
          <h3 className="text-xs font-bold text-slate-800">
            Doanh thu thực tế theo khách hàng {selectedNam} (DOANH THU THỰC TẾ THEO KH)
          </h3>
        </div>

        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <p className="text-xs text-slate-500 font-normal">Chưa có dữ liệu.</p>
        </div>
      </div>
    </div>
  );
}
