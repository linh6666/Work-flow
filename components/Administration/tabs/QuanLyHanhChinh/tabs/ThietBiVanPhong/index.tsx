"use client";

import React, { useState } from 'react';
import {
  IconDeviceDesktop,
  IconSearch,
  IconDownload,
  IconPlus,
  IconChevronDown,
} from '@tabler/icons-react';

/* ─── Mock data ─────────────────────────────────────────────── */
const LOAI_THIET_BI = ['Tất cả loại', 'Máy tính & Laptop', 'Máy in & Photo', 'Bàn ghế văn phòng', 'Điều hòa & Điện lạnh', 'Thiết bị mạng'];

const mockThietBi = [
  { ma: 'TBVP-001', ten: 'Laptop Dell XPS 15 - P.KD01',   loai: 'Máy tính & Laptop',   vi_tri: 'Tầng 3 - P.Kinh doanh', gia_tri: 35_000_000, trang_thai: 'Đang sử dụng' },
  { ma: 'TBVP-002', ten: 'Máy in Canon LBP 2900',        loai: 'Máy in & Photo',      vi_tri: 'Tầng 2 - P.Hành chính', gia_tri: 4_500_000,  trang_thai: 'Đang sử dụng' },
  { ma: 'TBVP-003', ten: 'Bộ bàn ghế họp 12 ghế gõ đỏ',  loai: 'Bàn ghế văn phòng',  vi_tri: 'Tầng 4 - Phòng họp lớn',gia_tri: 45_000_000, trang_thai: 'Đang sử dụng' },
  { ma: 'TBVP-004', ten: 'Điều hòa Daikin 24.000 BTU',    loai: 'Điều hòa & Điện lạnh',vi_tri: 'Tầng 3 - P.Kỹ thuật',   gia_tri: 22_000_000, trang_thai: 'Cần bảo trì' },
  { ma: 'TBVP-005', ten: 'Switch Cisco 24 Port Gigabit',  loai: 'Thiết bị mạng',       vi_tri: 'Tầng 2 - Server Room',  gia_tri: 12_800_000, trang_thai: 'Đang sử dụng' },
];

const STATUS_STYLE: Record<string, string> = {
  'Đang sử dụng': 'bg-emerald-50 text-emerald-600',
  'Cần bảo trì':  'bg-amber-50 text-amber-600',
  'Hỏng / Thanh lý': 'bg-rose-50 text-rose-600',
};

/* ─── Component ─────────────────────────────────────────────── */
export default function ThietBiVanPhongTab() {
  const [search, setSearch] = useState('');
  const [loai, setLoai]     = useState('Tất cả loại');

  const filtered = mockThietBi.filter((v) =>
    (loai === 'Tất cả loại' || v.loai === loai) &&
    (v.ma.toLowerCase().includes(search.toLowerCase()) ||
     v.ten.toLowerCase().includes(search.toLowerCase()) ||
     v.vi_tri.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden gap-3">
      {/* ── Header bar ── */}
      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        <div className="flex items-center gap-2 mr-auto">
          <IconDeviceDesktop size={18} className="text-[#406c89] shrink-0" />
          <span className="text-sm font-bold text-slate-700 whitespace-nowrap">
            Quản lý Thiết bị văn phòng — Danh mục &amp; Cấp phát
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors font-medium">
            <IconDownload size={13} />
            Xuất Excel
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold">
            <IconPlus size={13} />
            Thêm thiết bị
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
            placeholder="Tìm theo mã TB, tên thiết bị, vị trí..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
          />
        </div>
        <div className="relative shrink-0">
          <select
            value={loai}
            onChange={(e) => setLoai(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 cursor-pointer"
          >
            {LOAI_THIET_BI.map((n) => <option key={n}>{n}</option>)}
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
                {['Mã TB', 'Tên thiết bị', 'Loại thiết bị', 'Vị trí bố trí', 'Nguyên giá', 'Trạng thái'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr key={v.ma} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                  <td className="px-4 py-2.5 font-mono text-slate-500">{v.ma}</td>
                  <td className="px-4 py-2.5 font-semibold text-slate-700">{v.ten}</td>
                  <td className="px-4 py-2.5 text-slate-500">{v.loai}</td>
                  <td className="px-4 py-2.5 text-slate-600">{v.vi_tri}</td>
                  <td className="px-4 py-2.5 font-bold text-slate-700">{v.gia_tri.toLocaleString('vi-VN')} đ</td>
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
