"use client";

import React, { useState } from 'react';
import {
  IconPigMoney,
  IconSearch,
  IconDownload,
  IconPlus,
  IconChevronDown,
} from '@tabler/icons-react';

/* ─── Mock data ─────────────────────────────────────────────── */
const LOAI_QUY = ['Tất cả quỹ', 'Quỹ sự cố công trình', 'Quỹ từ thiện / An sinh', 'Quỹ khen thưởng khẩn cấp', 'Quỹ rủi ro hành chính'];

const mockQuyDuPhong = [
  { ma: 'QDP-001', ten_quy: 'Quỹ sự cố công trình Q3/2026',    loai: 'Quỹ sự cố công trình',    han_muc: 200_000_000, da_chi: 45_000_000,  con_lai: 155_000_000, trang_thai: 'Hoạt động' },
  { ma: 'QDP-002', ten_quy: 'Quỹ khen thưởng khẩn cấp T8',    loai: 'Quỹ khen thưởng khẩn cấp',han_muc: 50_000_000,  da_chi: 12_000_000,  con_lai: 38_000_000,  trang_thai: 'Hoạt động' },
  { ma: 'QDP-003', ten_quy: 'Quỹ rủi ro phát sinh hành chính', loai: 'Quỹ rủi ro hành chính',   han_muc: 100_000_000, da_chi: 88_000_000,  con_lai: 12_000_000,  trang_thai: 'Cảnh báo hạn mức' },
  { ma: 'QDP-004', ten_quy: 'Quỹ an sinh & từ thiện 2026',     loai: 'Quỹ từ thiện / An sinh',  han_muc: 80_000_000,  da_chi: 30_000_000,  con_lai: 50_000_000,  trang_thai: 'Hoạt động' },
];

const STATUS_STYLE: Record<string, string> = {
  'Hoạt động':         'bg-emerald-50 text-emerald-600',
  'Cảnh báo hạn mức': 'bg-amber-50 text-amber-600',
  'Đã khóa':           'bg-rose-50 text-rose-600',
};

/* ─── Component ─────────────────────────────────────────────── */
export default function QuyDuPhongTab() {
  const [search, setSearch] = useState('');
  const [loai, setLoai]     = useState('Tất cả quỹ');

  const filtered = mockQuyDuPhong.filter((v) =>
    (loai === 'Tất cả quỹ' || v.loai === loai) &&
    (v.ma.toLowerCase().includes(search.toLowerCase()) ||
     v.ten_quy.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden gap-3">
      {/* ── Header bar ── */}
      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        <div className="flex items-center gap-2 mr-auto">
          <IconPigMoney size={18} className="text-[#406c89] shrink-0" />
          <span className="text-sm font-bold text-slate-700 whitespace-nowrap">
            Quản lý Quỹ dự phòng — Hạn mức &amp; Giải ngân
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors font-medium">
            <IconDownload size={13} />
            Xuất Excel
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold">
            <IconPlus size={13} />
            Tạo quỹ mới
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
            placeholder="Tìm theo mã quỹ, tên quỹ dự phòng..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
          />
        </div>
        <div className="relative shrink-0">
          <select
            value={loai}
            onChange={(e) => setLoai(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 cursor-pointer"
          >
            {LOAI_QUY.map((n) => <option key={n}>{n}</option>)}
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
                {['Mã Quỹ', 'Tên quỹ dự phòng', 'Loại quỹ', 'Hạn mức phê duyệt', 'Đã giải ngân', 'Còn lại', 'Trạng thái'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr key={v.ma} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                  <td className="px-4 py-2.5 font-mono text-slate-500">{v.ma}</td>
                  <td className="px-4 py-2.5 font-semibold text-slate-700">{v.ten_quy}</td>
                  <td className="px-4 py-2.5 text-slate-500">{v.loai}</td>
                  <td className="px-4 py-2.5 font-bold text-slate-700">{v.han_muc.toLocaleString('vi-VN')} đ</td>
                  <td className="px-4 py-2.5 text-rose-600 font-semibold">{v.da_chi.toLocaleString('vi-VN')} đ</td>
                  <td className="px-4 py-2.5 text-emerald-600 font-bold">{v.con_lai.toLocaleString('vi-VN')} đ</td>
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
