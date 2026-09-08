"use client";

import React, { useState } from 'react';
import { IconSearch, IconPlus } from '@tabler/icons-react';

const mockDXDatHangNCC = [
  { ma: 'DX-NCC-2408-01', ncc: 'Công ty Thép Miền Nam', noi_dung: 'Đặt hàng Thép cuộn & Thép hộp đợt 2 T8', tong_tien: 145_000_000, ngay_gui: '2026-08-20', nguoi_duyet: 'Lê Hoàng Nam', trang_thai: 'Đã duyệt' },
  { ma: 'DX-NCC-2408-02', ncc: 'Cty Sơn Kova Việt Nam', noi_dung: 'Đặt bổ sung Sơn phủ ngoại thất', tong_tien: 38_000_000, ngay_gui: '2026-08-22', nguoi_duyet: 'Trần Minh Tuấn', trang_thai: 'Chờ duyệt' },
  { ma: 'DX-NCC-2408-03', ncc: 'Cty Gỗ An Cường', noi_dung: 'Đề xuất đặt hàng Gỗ công nghiệp MFC', tong_tien: 89_000_000, ngay_gui: '2026-08-24', nguoi_duyet: 'Phạm Thị Mai', trang_thai: 'Thương lượng' },
  { ma: 'DX-NCC-2408-04', ncc: 'Hafele Việt Nam', noi_dung: 'Đặt hàng phụ kiện cửa & bản lề cao cấp', tong_tien: 52_000_000, ngay_gui: '2026-08-25', nguoi_duyet: 'Nguyễn Văn A', trang_thai: 'Đã duyệt' },
];

const STATUS_STYLE: Record<string, string> = {
  'Đã duyệt': 'bg-emerald-50 text-emerald-600 border border-emerald-200',
  'Chờ duyệt': 'bg-amber-50 text-amber-600 border border-amber-200',
  'Thương lượng': 'bg-purple-50 text-purple-600 border border-purple-200',
};

export default function DXDatHangNCC() {
  const [search, setSearch] = useState('');

  const filtered = mockDXDatHangNCC.filter(
    (p) =>
      p.ma.toLowerCase().includes(search.toLowerCase()) ||
      p.ncc.toLowerCase().includes(search.toLowerCase()) ||
      p.noi_dung.toLowerCase().includes(search.toLowerCase())
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
            placeholder="Tìm kiếm mã, NCC, nội dung..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
          />
        </div>

        <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold cursor-pointer">
          <IconPlus size={13} />
          Tạo đề xuất đặt hàng
        </button>
      </div>

      {/* Content Table */}
      <div className="overflow-auto flex-1">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              {['Mã ĐX', 'Nhà cung cấp', 'Nội dung đặt hàng', 'Tổng tiền', 'Ngày gửi', 'Người duyệt', 'Trạng thái', 'Thao tác'].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
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
