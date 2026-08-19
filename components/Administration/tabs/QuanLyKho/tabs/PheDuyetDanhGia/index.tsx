"use client";

import React, { useState } from 'react';
import {
  IconSearch,
  IconClipboardCheck,
  IconCircleCheck,
  IconHourglassHigh,
  IconX,
} from '@tabler/icons-react';

const mockPheDuyet = [
  { ma: 'PD-2406-01', noi_dung: 'Duyệt mua thép hộp 40x40 (1.200kg)',    nguoi_yc: 'Nguyễn Văn A', ngay: '2026-08-10', trang_thai: 'Đã duyệt',    diem: 4.5 },
  { ma: 'PD-2406-02', noi_dung: 'Duyệt xuất kho sơn epoxy cho DA HN',   nguoi_yc: 'Trần Thị B',   ngay: '2026-08-12', trang_thai: 'Đã duyệt',    diem: 4.0 },
  { ma: 'PD-2406-03', noi_dung: 'Duyệt mua nhôm tấm 3mm (120 tấm)',     nguoi_yc: 'Lê Văn C',     ngay: '2026-08-15', trang_thai: 'Chờ duyệt',   diem: null },
  { ma: 'PD-2406-04', noi_dung: 'Đánh giá NCC Công ty Thép Miền Nam',   nguoi_yc: 'Phạm Thị D',   ngay: '2026-08-16', trang_thai: 'Đang đánh giá',diem: null },
  { ma: 'PD-2406-05', noi_dung: 'Duyệt thanh lý máy cắt tole cũ',       nguoi_yc: 'Hoàng Văn E',  ngay: '2026-08-18', trang_thai: 'Từ chối',     diem: null },
  { ma: 'PD-2406-06', noi_dung: 'Đánh giá chất lượng NVL nhập T8',      nguoi_yc: 'Vũ Thị F',     ngay: '2026-08-19', trang_thai: 'Chờ duyệt',   diem: null },
];

const STATUS_META: Record<string, { color: string; icon: React.ElementType }> = {
  'Đã duyệt':    { color: 'bg-emerald-50 text-emerald-600', icon: IconCircleCheck   },
  'Chờ duyệt':   { color: 'bg-amber-50 text-amber-600',     icon: IconHourglassHigh },
  'Đang đánh giá':{ color: 'bg-blue-50 text-blue-600',      icon: IconClipboardCheck},
  'Từ chối':     { color: 'bg-red-50 text-red-600',         icon: IconX             },
};

function StarRating({ score }: { score: number | null }) {
  if (score === null) return <span className="text-slate-300 text-[10px]">—</span>;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`text-[13px] ${s <= Math.round(score) ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
      ))}
      <span className="text-[10px] text-slate-400 ml-1">{score}</span>
    </div>
  );
}

export default function PheDuyetDanhGiaTab() {
  const [search, setSearch] = useState('');

  const filtered = mockPheDuyet.filter(
    (p) =>
      p.ma.toLowerCase().includes(search.toLowerCase()) ||
      p.noi_dung.toLowerCase().includes(search.toLowerCase()) ||
      p.nguoi_yc.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { label: 'Tổng yêu cầu',  value: mockPheDuyet.length,                                              color: 'text-sky-600',    bg: 'bg-sky-50'    },
    { label: 'Đã duyệt',      value: mockPheDuyet.filter(p => p.trang_thai === 'Đã duyệt').length,      color: 'text-emerald-600',bg: 'bg-emerald-50'},
    { label: 'Chờ duyệt',     value: mockPheDuyet.filter(p => p.trang_thai === 'Chờ duyệt').length,     color: 'text-amber-600',  bg: 'bg-amber-50'  },
    { label: 'Từ chối',       value: mockPheDuyet.filter(p => p.trang_thai === 'Từ chối').length,       color: 'text-red-600',    bg: 'bg-red-50'    },
  ];

  return (
    <div className="flex-1 flex flex-col gap-4 overflow-auto">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 shrink-0">
        {stats.map((c) => (
          <div key={c.label} className={`${c.bg} rounded-xl p-4 flex flex-col gap-1 border border-white shadow-sm`}>
            <span className="text-[11px] font-medium text-slate-500">{c.label}</span>
            <span className={`text-2xl font-extrabold ${c.color}`}>{c.value}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="flex items-center gap-2 p-3 border-b border-slate-100">
          <div className="relative flex-1 max-w-sm">
            <IconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm yêu cầu hoặc người yêu cầu..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
            />
          </div>
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 sticky top-0 z-10">
              <tr>
                {['Mã YC', 'Nội dung', 'Người yêu cầu', 'Ngày', 'Trạng thái', 'Đánh giá', 'Thao tác'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const meta = STATUS_META[p.trang_thai];
                const StatusIcon = meta.icon;
                return (
                  <tr key={p.ma} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                    <td className="px-4 py-2.5 font-mono text-[#406c89] font-semibold">{p.ma}</td>
                    <td className="px-4 py-2.5 font-medium text-slate-700 max-w-[220px] truncate" title={p.noi_dung}>{p.noi_dung}</td>
                    <td className="px-4 py-2.5 text-slate-500">{p.nguoi_yc}</td>
                    <td className="px-4 py-2.5 text-slate-500">{p.ngay}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${meta.color}`}>
                        <StatusIcon size={11} />
                        {p.trang_thai}
                      </span>
                    </td>
                    <td className="px-4 py-2.5"><StarRating score={p.diem} /></td>
                    <td className="px-4 py-2.5">
                      <button className="text-[#406c89] hover:underline font-medium">Chi tiết</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
