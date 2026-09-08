"use client";

import React, { useState } from 'react';
import { IconArrowsSort, IconArrowDown } from '@tabler/icons-react';

export interface TongHopNamItem {
  id: string;
  nam: number;
  so_thang: number;
  so_mat_hang: number;
  tong_tien_de_xuat: string;
  tong_tien_da_goi_mua: string;
  tien_con_lai: string;
}

export const mockTongHopNam: TongHopNamItem[] = [
  {
    id: '1',
    nam: 2026,
    so_thang: 8,
    so_mat_hang: 1664,
    tong_tien_de_xuat: '1.221.883.282,842 đ',
    tong_tien_da_goi_mua: '1.402.687.261,176 đ',
    tien_con_lai: '—',
  },
  {
    id: '2',
    nam: 2025,
    so_thang: 2,
    so_mat_hang: 336,
    tong_tien_de_xuat: '197.167.200 đ',
    tong_tien_da_goi_mua: '197.167.200 đ',
    tien_con_lai: '—',
  },
];

export default function TongHopTheoNam() {
  const [data] = useState<TongHopNamItem[]>(mockTongHopNam);

  return (
    <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
      {/* Table */}
      <div className="overflow-auto flex-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <table className="w-full text-xs">
          <thead className="bg-white sticky top-0 z-10 border-b border-slate-100">
            <tr>
              {/* NĂM */}
              <th className="text-left px-6 py-3.5 font-semibold text-slate-500 whitespace-nowrap">
                <div className="inline-flex items-center gap-1 cursor-pointer select-none hover:text-slate-700">
                  <span>NĂM</span>
                  <IconArrowDown size={12} className="text-slate-600" />
                </div>
              </th>

              {/* SỐ THÁNG */}
              <th className="text-right px-6 py-3.5 font-semibold text-slate-500 whitespace-nowrap">
                <div className="inline-flex items-center justify-end gap-1 cursor-pointer select-none hover:text-slate-700 w-full">
                  <span>SỐ THÁNG</span>
                  <IconArrowsSort size={11} className="text-slate-400" />
                </div>
              </th>

              {/* SỐ MẶT HÀNG */}
              <th className="text-right px-6 py-3.5 font-semibold text-slate-500 whitespace-nowrap">
                <div className="inline-flex items-center justify-end gap-1 cursor-pointer select-none hover:text-slate-700 w-full">
                  <span>SỐ MẶT HÀNG</span>
                  <IconArrowsSort size={11} className="text-slate-400" />
                </div>
              </th>

              {/* TỔNG TIỀN ĐỀ XUẤT */}
              <th className="text-right px-6 py-3.5 font-semibold text-slate-500 whitespace-nowrap">
                <div className="inline-flex items-center justify-end gap-1 cursor-pointer select-none hover:text-slate-700 w-full">
                  <span>TỔNG TIỀN ĐỀ XUẤT</span>
                  <IconArrowsSort size={11} className="text-slate-400" />
                </div>
              </th>

              {/* TỔNG TIỀN ĐÃ GỌI MUA */}
              <th className="text-right px-6 py-3.5 font-semibold text-slate-500 whitespace-nowrap">
                <div className="inline-flex items-center justify-end gap-1 cursor-pointer select-none hover:text-slate-700 w-full">
                  <span>TỔNG TIỀN ĐÃ GỌI MUA</span>
                  <IconArrowsSort size={11} className="text-slate-400" />
                </div>
              </th>

              {/* TIỀN CÒN LẠI */}
              <th className="text-right px-6 py-3.5 font-semibold text-slate-500 whitespace-nowrap">
                <div className="inline-flex items-center justify-end gap-1 cursor-pointer select-none hover:text-slate-700 w-full">
                  <span>TIỀN CÒN LẠI</span>
                  <IconArrowsSort size={11} className="text-slate-400" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors"
              >
                {/* Năm */}
                <td className="px-6 py-4 font-semibold text-[#406c89] hover:underline cursor-pointer">
                  {row.nam}
                </td>

                {/* Số tháng */}
                <td className="px-6 py-4 text-right text-slate-700 font-medium">
                  {row.so_thang}
                </td>

                {/* Số mặt hàng */}
                <td className="px-6 py-4 text-right text-slate-700 font-medium">
                  {row.so_mat_hang}
                </td>

                {/* Tổng tiền đề xuất */}
                <td className="px-6 py-4 text-right font-bold text-slate-900">
                  {row.tong_tien_de_xuat}
                </td>

                {/* Tổng tiền đã gọi mua */}
                <td className="px-6 py-4 text-right text-slate-700 font-medium">
                  {row.tong_tien_da_goi_mua}
                </td>

                {/* Tiền còn lại */}
                <td className="px-6 py-4 text-right text-slate-400 font-medium">
                  {row.tien_con_lai}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
