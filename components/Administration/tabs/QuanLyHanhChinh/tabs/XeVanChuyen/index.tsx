"use client";

import React, { useState } from 'react';
import {
  IconTruck,
  IconSearch,
  IconDownload,
  IconPlus,
  IconChevronDown,
  IconMapPin,
} from '@tabler/icons-react';

/* ─── Mock data ─────────────────────────────────────────────── */
const LOAI_XE = ['Tất cả xe', 'Xe tải 1.5 Tấn', 'Xe tải 3.5 Tấn', 'Xe container', 'Xe bán tải công trình'];

const mockXeVanChuyen = [
  { bien_so: '29C-888.99', loai_xe: 'Xe tải 3.5 Tấn', lai_xe: 'Phạm Văn Hùng',   tuyen_duong: 'Hà Nội - Hải Phòng',  trong_tai: '3.5 tấn', trang_thai: 'Đang vận chuyển', ngay: '2026-08-20' },
  { bien_so: '30F-123.45', loai_xe: 'Xe bán tải công trình', lai_xe: 'Lê Văn Nam',  tuyen_duong: 'Nội thành Hà Nội',    trong_tai: '1 tấn',   trang_thai: 'Sẵn sàng',        ngay: '2026-08-20' },
  { bien_so: '15C-456.78', loai_xe: 'Xe container',     lai_xe: 'Trần Đình Trọng',tuyen_duong: 'Hải Phòng - Đà Nẵng', trong_tai: '30 tấn',  trang_thai: 'Đang bảo dưỡng',  ngay: '2026-08-19' },
  { bien_so: '51D-999.11', loai_xe: 'Xe tải 1.5 Tấn', lai_xe: 'Nguyễn Thanh Tùng',tuyen_duong: 'TP.HCM - Bình Dương',trong_tai: '1.5 tấn', trang_thai: 'Đang vận chuyển', ngay: '2026-08-20' },
];

const STATUS_STYLE: Record<string, string> = {
  'Sẵn sàng':         'bg-emerald-50 text-emerald-600',
  'Đang vận chuyển':  'bg-blue-50 text-blue-600',
  'Đang bảo dưỡng':   'bg-amber-50 text-amber-600',
};

/* ─── Component ─────────────────────────────────────────────── */
export default function XeVanChuyenTab() {
  const [search, setSearch] = useState('');
  const [loai, setLoai]     = useState('Tất cả xe');

  const filtered = mockXeVanChuyen.filter((v) =>
    (loai === 'Tất cả xe' || v.loai_xe === loai) &&
    (v.bien_so.toLowerCase().includes(search.toLowerCase()) ||
     v.lai_xe.toLowerCase().includes(search.toLowerCase()) ||
     v.tuyen_duong.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden gap-3">
      {/* ── Header bar ── */}
      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        <div className="flex items-center gap-2 mr-auto">
          <IconTruck size={18} className="text-[#406c89] shrink-0" />
          <span className="text-sm font-bold text-slate-700 whitespace-nowrap">
            Quản lý Xe vận chuyển — Đội xe &amp; Lịch trình
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors font-medium">
            <IconDownload size={13} />
            Xuất Excel
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold">
            <IconPlus size={13} />
            Điều xe mới
          </button>
        </div>
      </div>

      {/* ── Search + Filter row ── */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="relative flex-1">
          <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo biển số, láj xe, tuyến đường..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
          />
        </div>
        <div className="relative shrink-0">
          <select
            value={loai}
            onChange={(e) => setLoai(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 cursor-pointer"
          >
            {LOAI_XE.map((n) => <option key={n}>{n}</option>)}
          </select>
          <IconChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* ── Table ── */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="overflow-auto flex-1">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 sticky top-0 z-10">
              <tr>
                {['Biển số xe', 'Loại xe', 'Lái xe phụ trách', 'Tuyến đường', 'Trọng tải', 'Ngày cập nhật', 'Trạng thái'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr key={v.bien_so} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                  <td className="px-4 py-2.5 font-mono font-bold text-slate-700">{v.bien_so}</td>
                  <td className="px-4 py-2.5 text-slate-600">{v.loai_xe}</td>
                  <td className="px-4 py-2.5 font-semibold text-slate-700 whitespace-nowrap">{v.lai_xe}</td>
                  <td className="px-4 py-2.5">
                    <span className="flex items-center gap-1 text-slate-600 whitespace-nowrap">
                      <IconMapPin size={11} className="text-slate-400" />
                      {v.tuyen_duong}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-slate-600">{v.trong_tai}</td>
                  <td className="px-4 py-2.5 text-slate-400 whitespace-nowrap">{v.ngay}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${STATUS_STYLE[v.trang_thai] ?? 'bg-slate-100 text-slate-500'}`}>
                      {v.trang_thai}
                    </span>
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
