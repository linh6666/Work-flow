"use client";

import React, { useState } from 'react';
import { IconSearch, IconPlus } from '@tabler/icons-react';

const mockMuaNVLDuAn = [
  { ma: 'DA-2026-01', du_an: 'Dự án Cầu Thắng VP Hà Nội', hang_muc: 'Khung thép & Hệ thống chiếu sáng', tien_do: '85%', kinh_phi: 120_000_000, trang_thai: 'Đang giao hàng', nguoi_phu_trach: 'Nguyễn Văn A' },
  { ma: 'DA-2026-02', du_an: 'Showroom Nội thất Q7', hang_muc: 'Vách kính cường lực & Gỗ nội thất', tien_do: '100%', kinh_phi: 185_000_000, trang_thai: 'Đã hoàn thành', nguoi_phu_trach: 'Trần Thị B' },
  { ma: 'DA-2026-03', du_an: 'Sửa chữa và mở rộng Kho B', hang_muc: 'Tôn lợp mái & Sơn chống gỉ', tien_do: '40%', kinh_phi: 45_000_000, trang_thai: 'Chờ nhập kho', nguoi_phu_trach: 'Lê Văn C' },
  { ma: 'DA-2026-04', du_an: 'Lắp đặt hệ thống điện P.2', hang_muc: 'Dây cáp điện CADIVI & Tủ điện', tien_do: '20%', kinh_phi: 62_000_000, trang_thai: 'Đang lập ĐX', nguoi_phu_trach: 'Phạm Văn D' },
];

const STATUS_STYLE: Record<string, string> = {
  'Đang giao hàng': 'bg-indigo-50 text-indigo-600 border border-indigo-200',
  'Đã hoàn thành': 'bg-blue-50 text-blue-600 border border-blue-200',
  'Chờ nhập kho': 'bg-orange-50 text-orange-600 border border-orange-200',
  'Đang lập ĐX': 'bg-slate-100 text-slate-600 border border-slate-200',
};

export default function TheoDoiMuaNVLDuAn() {
  const [search, setSearch] = useState('');

  const filtered = mockMuaNVLDuAn.filter(
    (p) =>
      p.ma.toLowerCase().includes(search.toLowerCase()) ||
      p.du_an.toLowerCase().includes(search.toLowerCase()) ||
      p.hang_muc.toLowerCase().includes(search.toLowerCase())
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
            placeholder="Tìm kiếm dự án, hạng mục..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
          />
        </div>

        <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold cursor-pointer">
          <IconPlus size={13} />
          Thêm mua NVL dự án
        </button>
      </div>

      {/* Content Table */}
      <div className="overflow-auto flex-1">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              {['Mã YC', 'Dự án', 'Hạng mục NVL', 'Kinh phí', 'Tiến độ', 'Người phụ trách', 'Trạng thái', 'Thao tác'].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.ma} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                <td className="px-4 py-2.5 font-mono text-[#406c89] font-semibold">{p.ma}</td>
                <td className="px-4 py-2.5 font-semibold text-slate-800">{p.du_an}</td>
                <td className="px-4 py-2.5 text-slate-600">{p.hang_muc}</td>
                <td className="px-4 py-2.5 font-bold text-slate-700">{p.kinh_phi.toLocaleString()}đ</td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#406c89] h-1.5 rounded-full" style={{ width: p.tien_do }}></div>
                    </div>
                    <span className="text-[11px] font-medium text-slate-600">{p.tien_do}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-slate-600">{p.nguoi_phu_trach}</td>
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
