"use client";

import React, { useState } from 'react';
import { IconPlus, IconSearch } from '@tabler/icons-react';

const mockNhapKho = [
  { phieu: 'NK-2406001', ngay: '2026-08-15', ncc: 'Công ty Thép Miền Nam', tong: 18_750_000, trang_thai: 'Đã duyệt' },
  { phieu: 'NK-2406002', ngay: '2026-08-16', ncc: 'Nhôm Việt Pháp',        tong: 35_280_000, trang_thai: 'Chờ duyệt' },
  { phieu: 'NK-2406003', ngay: '2026-08-18', ncc: 'Sơn Bạch Tuyết',        tong:  8_160_000, trang_thai: 'Đã duyệt' },
  { phieu: 'NK-2406004', ngay: '2026-08-19', ncc: 'Thiết bị Hùng Phát',    tong: 12_400_000, trang_thai: 'Nháp' },
];

const STATUS_COLOR: Record<string, string> = {
  'Đã duyệt':  'bg-emerald-50 text-emerald-600',
  'Chờ duyệt': 'bg-amber-50 text-amber-600',
  'Nháp':      'bg-slate-100 text-slate-500',
};

export default function NhapKhoTab() {
  const [search, setSearch] = useState('');

  const filtered = mockNhapKho.filter(
    (p) =>
      p.phieu.toLowerCase().includes(search.toLowerCase()) ||
      p.ncc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col gap-4 overflow-auto">
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-2 p-3 border-b border-slate-100">
          <div className="relative flex-1 max-w-sm">
            <IconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm phiếu hoặc nhà cung cấp..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
            />
          </div>
          <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold">
            <IconPlus size={13} />
            Tạo phiếu nhập
          </button>
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 sticky top-0 z-10">
              <tr>
                {['Số phiếu', 'Ngày nhập', 'Nhà cung cấp', 'Tổng giá trị', 'Trạng thái', 'Thao tác'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.phieu} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                  <td className="px-4 py-2.5 font-mono text-[#406c89] font-semibold">{p.phieu}</td>
                  <td className="px-4 py-2.5 text-slate-500">{p.ngay}</td>
                  <td className="px-4 py-2.5 font-medium text-slate-700">{p.ncc}</td>
                  <td className="px-4 py-2.5 font-bold text-slate-700">{p.tong.toLocaleString()}đ</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${STATUS_COLOR[p.trang_thai]}`}>
                      {p.trang_thai}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <button className="text-[#406c89] hover:underline font-medium">Chi tiết</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
