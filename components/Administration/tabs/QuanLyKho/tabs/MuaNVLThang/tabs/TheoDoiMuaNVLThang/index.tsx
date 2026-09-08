"use client";

import React, { useState } from 'react';
import { IconSearch, IconPlus } from '@tabler/icons-react';

const mockMuaNVLThang = [
  { ma: 'MNVL-2026-08-01', thang: '08/2026', ten_nvl: 'Thép hộp 40x40 (1.2mm)', soluong: '1,500 kg', tong_tien: 33_000_000, ncc: 'Công ty Thép Miền Nam', trang_thai: 'Đã duyệt', ngay: '2026-08-01' },
  { ma: 'MNVL-2026-08-02', thang: '08/2026', ten_nvl: 'Sơn Epoxy Kova K-5500', soluong: '500 lít', tong_tien: 45_000_000, ncc: 'Công ty Sơn Kova', trang_thai: 'Hoàn thành', ngay: '2026-08-05' },
  { ma: 'MNVL-2026-08-03', thang: '08/2026', ten_nvl: 'Mica Trong Kính 5mm', soluong: '120 tấm', tong_tien: 28_400_000, ncc: 'Nhà cung cấp Mica Việt', trang_thai: 'Chờ duyệt', ngay: '2026-08-10' },
  { ma: 'MNVL-2026-07-01', thang: '07/2026', ten_nvl: 'Gỗ An Cường MFC 18mm', soluong: '350 tấm', tong_tien: 98_000_000, ncc: 'Cty Gỗ An Cường', trang_thai: 'Hoàn thành', ngay: '2026-07-12' },
  { ma: 'MNVL-2026-07-02', thang: '07/2026', ten_nvl: 'Phụ kiện bản lề Hafele', soluong: '1,000 bộ', tong_tien: 42_500_000, ncc: 'Hafele Việt Nam', trang_thai: 'Hoàn thành', ngay: '2026-07-18' },
];

const STATUS_STYLE: Record<string, string> = {
  'Đã duyệt': 'bg-emerald-50 text-emerald-600 border border-emerald-200',
  'Hoàn thành': 'bg-blue-50 text-blue-600 border border-blue-200',
  'Chờ duyệt': 'bg-amber-50 text-amber-600 border border-amber-200',
};

export default function TheoDoiMuaNVLThang() {
  const [search, setSearch] = useState('');

  const filtered = mockMuaNVLThang.filter(
    (p) =>
      p.ma.toLowerCase().includes(search.toLowerCase()) ||
      p.ten_nvl.toLowerCase().includes(search.toLowerCase()) ||
      p.ncc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-3 border-b border-slate-100">
        <div className="relative flex-1 max-w-sm">
          <IconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm mã, tên NVL, NCC..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
          />
        </div>

        <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold cursor-pointer">
          <IconPlus size={13} />
          Thêm kế hoạch tháng
        </button>
      </div>

      {/* Content Table */}
      <div className="overflow-auto flex-1">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              {['Mã kế hoạch', 'Tháng', 'Tên NVL', 'Số lượng', 'Tổng giá trị', 'Nhà cung cấp', 'Ngày tạo', 'Trạng thái', 'Thao tác'].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.ma} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                <td className="px-4 py-2.5 font-mono text-[#406c89] font-semibold">{p.ma}</td>
                <td className="px-4 py-2.5 font-medium text-slate-700">{p.thang}</td>
                <td className="px-4 py-2.5 font-medium text-slate-800">{p.ten_nvl}</td>
                <td className="px-4 py-2.5 text-slate-600">{p.soluong}</td>
                <td className="px-4 py-2.5 font-bold text-slate-700">{p.tong_tien.toLocaleString()}đ</td>
                <td className="px-4 py-2.5 text-slate-600">{p.ncc}</td>
                <td className="px-4 py-2.5 text-slate-500">{p.ngay}</td>
                <td className="px-4 py-2.5">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${STATUS_STYLE[p.trang_thai] || 'bg-slate-100 text-slate-600'}`}>
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
    </div>
  );
}
