"use client";

import React, { useState } from 'react';
import {
  IconShirt,
  IconSearch,
  IconDownload,
  IconPlus,
  IconChevronDown,
} from '@tabler/icons-react';

/* ─── Mock data ─────────────────────────────────────────────── */
const PHONG_BAN = ['Tất cả phòng ban', 'P.Kinh doanh', 'P.Kỹ thuật', 'P.Nhân sự', 'P.Tài chính', 'P.Hành chính'];

const mockAoDongPhuc = [
  { ma: 'DP-001', nhan_vien: 'Nguyễn Văn An',   phong_ban: 'P.Kinh doanh', loai_ao: 'Áo sơ mi nam',   size: 'L',  so_luong: 2, ngay_cap: '2026-08-01', trang_thai: 'Đã cấp phát' },
  { ma: 'DP-002', nhan_vien: 'Trần Thị Bích',    phong_ban: 'P.Kỹ thuật',  loai_ao: 'Áo polo nữ',    size: 'M',  so_luong: 3, ngay_cap: '2026-08-05', trang_thai: 'Đã cấp phát' },
  { ma: 'DP-003', nhan_vien: 'Lê Công Chiến',    phong_ban: 'Ban giám đốc', loai_ao: 'Áo vest cao cấp', size: 'XL', so_luong: 1, ngay_cap: '2026-08-10', trang_thai: 'Chờ nhận'    },
  { ma: 'DP-004', nhan_vien: 'Phạm Thị Dung',    phong_ban: 'P.Tài chính', loai_ao: 'Áo sơ mi nữ',   size: 'S',  so_luong: 2, ngay_cap: '2026-08-12', trang_thai: 'Đã cấp phát' },
  { ma: 'DP-005', nhan_vien: 'Hoàng Minh Tuấn',  phong_ban: 'P.Kỹ thuật',  loai_ao: 'Áo bảo hộ lao động', size: 'L', so_luong: 2, ngay_cap: '2026-08-15', trang_thai: 'Chờ sản xuất' },
];

const STATUS_STYLE: Record<string, string> = {
  'Đã cấp phát':  'bg-emerald-50 text-emerald-600',
  'Chờ nhận':     'bg-blue-50 text-blue-600',
  'Chờ sản xuất': 'bg-amber-50 text-amber-600',
};

/* ─── Component ─────────────────────────────────────────────── */
export default function AoDongPhucTab() {
  const [search, setSearch]     = useState('');
  const [phongBan, setPhongBan] = useState('Tất cả phòng ban');

  const filtered = mockAoDongPhuc.filter((v) =>
    (phongBan === 'Tất cả phòng ban' || v.phong_ban === phongBan) &&
    (v.nhan_vien.toLowerCase().includes(search.toLowerCase()) ||
     v.loai_ao.toLowerCase().includes(search.toLowerCase()) ||
     v.ma.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden gap-3">
      {/* ── Header bar ── */}
      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        <div className="flex items-center gap-2 mr-auto">
          <IconShirt size={18} className="text-[#406c89] shrink-0" />
          <span className="text-sm font-bold text-slate-700 whitespace-nowrap">
            Quản lý Áo đồng phục — Cấp phát &amp; Khái toán
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors font-medium">
            <IconDownload size={13} />
            Xuất Excel
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold">
            <IconPlus size={13} />
            Đăng ký đồng phục
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
            placeholder="Tìm theo tên nhân viên, loại áo, mã cấp phát..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
          />
        </div>
        <div className="relative shrink-0">
          <select
            value={phongBan}
            onChange={(e) => setPhongBan(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 cursor-pointer"
          >
            {PHONG_BAN.map((n) => <option key={n}>{n}</option>)}
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
                {['Mã ĐK', 'Nhân viên', 'Phòng ban', 'Loại áo', 'Kích cỡ (Size)', 'Số lượng', 'Ngày cấp', 'Trạng thái'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr key={v.ma} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                  <td className="px-4 py-2.5 font-mono text-slate-500">{v.ma}</td>
                  <td className="px-4 py-2.5 font-semibold text-slate-700 whitespace-nowrap">{v.nhan_vien}</td>
                  <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{v.phong_ban}</td>
                  <td className="px-4 py-2.5 text-slate-600">{v.loai_ao}</td>
                  <td className="px-4 py-2.5 font-bold text-slate-700">{v.size}</td>
                  <td className="px-4 py-2.5 text-slate-600">{v.so_luong}</td>
                  <td className="px-4 py-2.5 text-slate-400 whitespace-nowrap">{v.ngay_cap}</td>
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
