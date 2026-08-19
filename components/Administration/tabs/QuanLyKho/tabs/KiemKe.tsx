"use client";

import React, { useState } from 'react';
import { IconPlus, IconSearch } from '@tabler/icons-react';

const mockKiemKe = [
  { dot: 'KK-2406-01', ngay: '2026-08-01', kho: 'Kho A',    ket_qua: 'Chênh lệch -3 VT', trang_thai: 'Hoàn thành' },
  { dot: 'KK-2406-02', ngay: '2026-08-10', kho: 'Kho B',    ket_qua: 'Khớp 100%',         trang_thai: 'Hoàn thành' },
  { dot: 'KK-2406-03', ngay: '2026-08-19', kho: 'Kho tổng', ket_qua: 'Đang thực hiện',   trang_thai: 'Đang kiểm' },
];

const STATUS_COLOR: Record<string, string> = {
  'Hoàn thành': 'bg-emerald-50 text-emerald-600',
  'Đang kiểm':  'bg-blue-50 text-blue-600',
  'Chờ duyệt':  'bg-amber-50 text-amber-600',
};

export default function KiemKeTab() {
  const [search, setSearch] = useState('');

  const filtered = mockKiemKe.filter(
    (k) =>
      k.dot.toLowerCase().includes(search.toLowerCase()) ||
      k.kho.toLowerCase().includes(search.toLowerCase())
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
              placeholder="Tìm đợt kiểm kê hoặc kho..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
            />
          </div>
          <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold">
            <IconPlus size={13} />
            Tạo đợt kiểm kê
          </button>
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 sticky top-0 z-10">
              <tr>
                {['Đợt kiểm kê', 'Ngày thực hiện', 'Kho', 'Kết quả', 'Trạng thái', 'Thao tác'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((k, i) => (
                <tr key={k.dot} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                  <td className="px-4 py-2.5 font-mono text-[#406c89] font-semibold">{k.dot}</td>
                  <td className="px-4 py-2.5 text-slate-500">{k.ngay}</td>
                  <td className="px-4 py-2.5 font-medium text-slate-700">{k.kho}</td>
                  <td className="px-4 py-2.5 text-slate-600">{k.ket_qua}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${STATUS_COLOR[k.trang_thai]}`}>
                      {k.trang_thai}
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
