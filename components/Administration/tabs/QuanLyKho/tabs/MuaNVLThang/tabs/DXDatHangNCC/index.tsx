"use client";

import React, { useState } from 'react';
import { IconSearch, IconPlus, IconChartBar } from '@tabler/icons-react';

export interface DXDatHangItem {
  ma: string;
  ncc: string;
  noi_dung: string;
  tong_tien: number;
  ngay_gui: string;
  nguoi_duyet: string;
  trang_thai: string;
}

export default function DXDatHangNCC() {
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState<DXDatHangItem[]>([]);

  const filtered = orders.filter(
    (p) =>
      p.ma.toLowerCase().includes(search.toLowerCase()) ||
      p.ncc.toLowerCase().includes(search.toLowerCase()) ||
      p.noi_dung.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col gap-3 overflow-hidden">
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between gap-3 shrink-0">
        {/* Search */}
        <div className="relative w-64 sm:w-72">
          <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm đơn đặt hàng..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 text-slate-700 placeholder:text-slate-400"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium cursor-pointer shadow-xs"
          >
            <IconChartBar size={14} className="text-slate-600" />
            <span>Báo cáo</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-medium cursor-pointer shadow-xs"
          >
            <IconPlus size={14} />
            <span>Tạo đơn đặt hàng</span>
          </button>
        </div>
      </div>

      {/* ── Content Card (Empty State or Table) ── */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-12 min-h-[160px]">
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Chưa có đơn đặt hàng.
            </p>
          </div>
        ) : (
          <div className="overflow-auto flex-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-100">
                <tr>
                  {['Mã đơn', 'Nhà cung cấp', 'Nội dung', 'Tổng tiền', 'Ngày gửi', 'Người duyệt', 'Trạng thái', 'Thao tác'].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.ma} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                    <td className="px-4 py-2.5 font-mono text-[#406c89] font-semibold">{p.ma}</td>
                    <td className="px-4 py-2.5 font-semibold text-slate-800">{p.ncc}</td>
                    <td className="px-4 py-2.5 text-slate-600">{p.noi_dung}</td>
                    <td className="px-4 py-2.5 font-bold text-slate-700">{p.tong_tien.toLocaleString()}đ</td>
                    <td className="px-4 py-2.5 text-slate-500">{p.ngay_gui}</td>
                    <td className="px-4 py-2.5 text-slate-600">{p.nguoi_duyet}</td>
                    <td className="px-4 py-2.5">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                        {p.trang_thai}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <button className="text-[#406c89] hover:underline font-medium cursor-pointer">Chi tiết</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
