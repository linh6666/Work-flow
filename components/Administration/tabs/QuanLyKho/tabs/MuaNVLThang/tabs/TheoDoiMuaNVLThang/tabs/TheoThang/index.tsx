"use client";

import React, { useState } from 'react';
import {
  IconSearch,
  IconCopy,
  IconTrash,
  IconArrowsSort,
  IconArrowDown,
} from '@tabler/icons-react';

export interface TheoThangItem {
  id: string;
  thang: string;
  nam: number;
  so_mat_hang: number;
  tong_tien: string;
  trang_thai: 'Chờ QL KD duyệt' | 'PGĐ đã duyệt' | 'Chờ PGĐ duyệt';
}

export const mockTheoThangData: TheoThangItem[] = [
  { id: '1', thang: 'Tháng 9', nam: 2026, so_mat_hang: 56, tong_tien: '215.496.334 đ', trang_thai: 'Chờ QL KD duyệt' },
  { id: '2', thang: 'Tháng 8', nam: 2026, so_mat_hang: 62, tong_tien: '218.911.677,176 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: '3', thang: 'Tháng 7', nam: 2026, so_mat_hang: 265, tong_tien: '49.843.021,666 đ', trang_thai: 'Chờ QL KD duyệt' },
  { id: '4', thang: 'Tháng 6', nam: 2026, so_mat_hang: 268, tong_tien: '152.240.000 đ', trang_thai: 'Chờ PGĐ duyệt' },
  { id: '5', thang: 'Tháng 5', nam: 2026, so_mat_hang: 265, tong_tien: '108.137.800 đ', trang_thai: 'Chờ PGĐ duyệt' },
  { id: '6', thang: 'Tháng 4', nam: 2026, so_mat_hang: 262, tong_tien: '140.045.400 đ', trang_thai: 'Chờ PGĐ duyệt' },
  { id: '7', thang: 'Tháng 2', nam: 2026, so_mat_hang: 246, tong_tien: '40.620.000 đ', trang_thai: 'Chờ QL KD duyệt' },
  { id: '8', thang: 'Tháng 1', nam: 2026, so_mat_hang: 240, tong_tien: '296.589.050 đ', trang_thai: 'Chờ QL KD duyệt' },
  { id: '9', thang: 'Tháng 5', nam: 2025, so_mat_hang: 70, tong_tien: '19.407.000 đ', trang_thai: 'Chờ QL KD duyệt' },
  { id: '10', thang: 'Tháng 4', nam: 2025, so_mat_hang: 266, tong_tien: '177.760.200 đ', trang_thai: 'Chờ QL KD duyệt' },
];

const STATUS_CONFIG: Record<TheoThangItem['trang_thai'], string> = {
  'Chờ QL KD duyệt': 'bg-amber-50/80 text-amber-700 border-amber-300',
  'PGĐ đã duyệt': 'bg-emerald-50/80 text-emerald-700 border-emerald-300',
  'Chờ PGĐ duyệt': 'bg-purple-50/80 text-purple-700 border-purple-300',
};

export default function TheoThang() {
  const [search, setSearch] = useState('');

  const filtered = mockTheoThangData.filter(
    (p) =>
      p.thang.toLowerCase().includes(search.toLowerCase()) ||
      p.nam.toString().includes(search.toLowerCase()) ||
      p.trang_thai.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
      {/* Search Bar */}
      <div className="p-3 border-b border-slate-100">
        <div className="relative max-w-sm">
          <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tháng, năm..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50/40 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto flex-1">
        <table className="w-full text-xs">
          <thead className="bg-white sticky top-0 z-10 border-b border-slate-100">
            <tr>
              {/* THÁNG */}
              <th className="text-left px-5 py-3 font-semibold text-slate-500 whitespace-nowrap">
                <div className="inline-flex items-center gap-1 cursor-pointer select-none hover:text-slate-700">
                  <span>THÁNG</span>
                  <IconArrowsSort size={11} className="text-slate-400" />
                </div>
              </th>

              {/* NĂM */}
              <th className="text-left px-5 py-3 font-semibold text-slate-500 whitespace-nowrap">
                <div className="inline-flex items-center gap-1 cursor-pointer select-none hover:text-slate-700">
                  <span>NĂM</span>
                  <IconArrowDown size={12} className="text-slate-600" />
                </div>
              </th>

              {/* SỐ MẶT HÀNG */}
              <th className="text-right px-6 py-3 font-semibold text-slate-500 whitespace-nowrap">
                <div className="inline-flex items-center justify-end gap-1 cursor-pointer select-none hover:text-slate-700 w-full">
                  <span>SỐ MẶT HÀNG</span>
                  <IconArrowsSort size={11} className="text-slate-400" />
                </div>
              </th>

              {/* TỔNG TIỀN */}
              <th className="text-right px-8 py-3 font-semibold text-slate-500 whitespace-nowrap">
                <div className="inline-flex items-center justify-end gap-1 cursor-pointer select-none hover:text-slate-700 w-full">
                  <span>TỔNG TIỀN</span>
                  <IconArrowsSort size={11} className="text-slate-400" />
                </div>
              </th>

              {/* TRẠNG THÁI DUYỆT */}
              <th className="text-left px-6 py-3 font-semibold text-slate-500 whitespace-nowrap">
                <div className="inline-flex items-center gap-1 cursor-pointer select-none hover:text-slate-700">
                  <span>TRẠNG THÁI DUYỆT</span>
                  <IconArrowsSort size={11} className="text-slate-400" />
                </div>
              </th>

              {/* THAO TÁC */}
              <th className="text-center px-4 py-3 font-semibold text-slate-500 whitespace-nowrap">
                THAO TÁC
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors"
              >
                {/* Tháng */}
                <td className="px-5 py-3.5 font-medium text-[#406c89] hover:underline cursor-pointer">
                  {row.thang}
                </td>

                {/* Năm */}
                <td className="px-5 py-3.5 text-slate-600">
                  {row.nam}
                </td>

                {/* Số mặt hàng */}
                <td className="px-6 py-3.5 text-right font-medium text-slate-700">
                  {row.so_mat_hang}
                </td>

                {/* Tổng tiền */}
                <td className="px-8 py-3.5 text-right font-bold text-slate-800">
                  {row.tong_tien}
                </td>

                {/* Trạng thái duyệt */}
                <td className="px-6 py-3.5">
                  <span
                    className={`inline-flex px-3 py-0.5 rounded-full text-[11px] font-medium border ${
                      STATUS_CONFIG[row.trang_thai]
                    }`}
                  >
                    {row.trang_thai}
                  </span>
                </td>

                {/* Thao tác */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-center gap-2.5">
                    <button
                      type="button"
                      title="Nhân bản / Sao chép"
                      className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      <IconCopy size={15} />
                    </button>
                    <button
                      type="button"
                      title="Xóa"
                      className="text-rose-400 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <IconTrash size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
