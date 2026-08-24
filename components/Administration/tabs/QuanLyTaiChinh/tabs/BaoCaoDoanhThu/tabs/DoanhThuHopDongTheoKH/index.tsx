"use client";

import React from 'react';
import { IconFileText, IconFileSpreadsheet } from '@tabler/icons-react';

interface DoanhThuHopDongTheoKHProps {
  selectedNam: string;
}

export default function DoanhThuHopDongTheoKH({ selectedNam }: DoanhThuHopDongTheoKHProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-3">
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <IconFileText size={16} className="text-[#3e566d]" />
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Doanh thu Hợp đồng theo Khách hàng — Năm {selectedNam}
            </h4>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Đơn vị: VNĐ</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-100">
                <th className="py-2.5 px-3">Số HĐ</th>
                <th className="py-2.5 px-3">Tên Dự án / Công trình</th>
                <th className="py-2.5 px-3">Khách hàng</th>
                <th className="py-2.5 px-3 text-right">Giá trị HĐ</th>
                <th className="py-2.5 px-3 text-right">Phát sinh</th>
                <th className="py-2.5 px-3 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600 text-[11px]">
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  <IconFileSpreadsheet size={28} className="mx-auto mb-1.5 text-slate-300" />
                  <span>Chưa có hợp đồng phát sinh trong năm {selectedNam}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
