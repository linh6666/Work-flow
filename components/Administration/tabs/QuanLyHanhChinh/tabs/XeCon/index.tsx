"use client";

import React, { useState } from 'react';
import {
  IconCar,
  IconSearch,
  IconDownload,
  IconPlus,
  IconChevronDown,
  IconTool,
} from '@tabler/icons-react';

/* ─── Mock data ─────────────────────────────────────────────── */
const TRANG_THAI_XE = ['Tất cả trạng thái', 'Đang sử dụng', 'Sẵn sàng', 'Bảo dưỡng', 'Hỏng'];

const mockXe = [
  { bien_so: '51A-12345', loai: 'Toyota Innova 7 chỗ',  nam_sx: 2021, nguoi_phu_trach: 'Nguyễn Tài Xế A',  km_hien_tai: 45_200, bao_duong_tiep: 50_000, trang_thai: 'Đang sử dụng', du_an: 'DA-HN-01',  bao_hiem_het: '2026-12-31' },
  { bien_so: '30H-67890', loai: 'Ford Transit 16 chỗ',  nam_sx: 2020, nguoi_phu_trach: 'Trần Tài Xế B',    km_hien_tai: 78_500, bao_duong_tiep: 80_000, trang_thai: 'Sẵn sàng',     du_an: '—',          bao_hiem_het: '2026-10-15' },
  { bien_so: '43C-54321', loai: 'Mitsubishi Xpander',   nam_sx: 2022, nguoi_phu_trach: 'Lê Tài Xế C',     km_hien_tai: 22_800, bao_duong_tiep: 25_000, trang_thai: 'Bảo dưỡng',    du_an: '—',          bao_hiem_het: '2027-03-20' },
  { bien_so: '92F-11223', loai: 'Toyota HiAce Van',     nam_sx: 2019, nguoi_phu_trach: 'Phạm Tài Xế D',   km_hien_tai: 112_300,bao_duong_tiep: 120_000,trang_thai: 'Hỏng',          du_an: '—',          bao_hiem_het: '2026-08-30' },
  { bien_so: '51G-98765', loai: 'Kia Sorento 7 chỗ',   nam_sx: 2023, nguoi_phu_trach: 'Hoàng Tài Xế E',  km_hien_tai: 15_600, bao_duong_tiep: 20_000, trang_thai: 'Đang sử dụng', du_an: 'DA-HCM-02', bao_hiem_het: '2027-06-30' },
  { bien_so: '75A-44556', loai: 'Hyundai Starex',       nam_sx: 2020, nguoi_phu_trach: 'Võ Tài Xế F',     km_hien_tai: 63_400, bao_duong_tiep: 70_000, trang_thai: 'Sẵn sàng',     du_an: '—',          bao_hiem_het: '2026-11-20' },
];

const STATUS_STYLE: Record<string, string> = {
  'Đang sử dụng': 'bg-blue-50 text-blue-600',
  'Sẵn sàng':     'bg-emerald-50 text-emerald-600',
  'Bảo dưỡng':    'bg-amber-50 text-amber-600',
  'Hỏng':         'bg-red-50 text-red-600',
};

/* ─── Component ─────────────────────────────────────────────── */
export default function XeCon() {
  const [search, setSearch]         = useState('');
  const [trangThai, setTrangThai]   = useState('Tất cả trạng thái');

  const filtered = mockXe.filter((v) =>
    (trangThai === 'Tất cả trạng thái' || v.trang_thai === trangThai) &&
    (v.bien_so.toLowerCase().includes(search.toLowerCase()) ||
     v.loai.toLowerCase().includes(search.toLowerCase()) ||
     v.nguoi_phu_trach.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden gap-3">

      {/* ── Header bar ── */}
      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        <div className="flex items-center gap-2 mr-auto">
          <IconCar size={18} className="text-[#406c89] shrink-0" />
          <span className="text-sm font-bold text-slate-700 whitespace-nowrap">
            Quản lý Xe con — Phương tiện &amp; lịch sử sử dụng
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors font-medium">
            <IconTool size={13} />
            Lịch bảo dưỡng
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors font-medium">
            <IconDownload size={13} />
            Xuất Excel
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold">
            <IconPlus size={13} />
            Thêm xe
          </button>
        </div>
      </div>

      {/* ── KPIs ── */}
      <div className="flex gap-3 shrink-0">
        {[
          { label: 'Tổng số xe', val: mockXe.length,                                       color: 'text-slate-700'   },
          { label: 'Đang sử dụng', val: mockXe.filter(x => x.trang_thai === 'Đang sử dụng').length, color: 'text-blue-600'    },
          { label: 'Sẵn sàng',    val: mockXe.filter(x => x.trang_thai === 'Sẵn sàng').length,     color: 'text-emerald-600' },
          { label: 'Bảo dưỡng / Hỏng', val: mockXe.filter(x => ['Bảo dưỡng','Hỏng'].includes(x.trang_thai)).length, color: 'text-amber-600' },
        ].map((k) => (
          <div key={k.label} className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 flex flex-col gap-0.5">
            <span className="text-[10px] font-medium text-slate-400">{k.label}</span>
            <span className={`text-lg font-extrabold ${k.color}`}>{k.val}</span>
          </div>
        ))}
      </div>

      {/* ── Search + Filter row ── */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="relative flex-1">
          <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo biển số, loại xe, lái xe..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
          />
        </div>
        <div className="relative shrink-0">
          <select
            value={trangThai}
            onChange={(e) => setTrangThai(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 cursor-pointer"
          >
            {TRANG_THAI_XE.map((n) => <option key={n}>{n}</option>)}
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
                {['Biển số', 'Loại xe', 'Năm SX', 'Người phụ trách', 'KM hiện tại', 'Bảo dưỡng tiếp', 'Bảo hiểm đến', 'Đang dùng cho', 'Trạng thái'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => {
                const needsMaintenance = v.km_hien_tai >= v.bao_duong_tiep - 3000;
                return (
                  <tr key={v.bien_so} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                    <td className="px-4 py-2.5 font-mono font-bold text-slate-700">{v.bien_so}</td>
                    <td className="px-4 py-2.5 font-semibold text-slate-700 whitespace-nowrap">{v.loai}</td>
                    <td className="px-4 py-2.5 text-slate-500">{v.nam_sx}</td>
                    <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap">{v.nguoi_phu_trach}</td>
                    <td className={`px-4 py-2.5 font-medium text-right ${needsMaintenance ? 'text-amber-600' : 'text-slate-700'}`}>{v.km_hien_tai.toLocaleString()} km</td>
                    <td className="px-4 py-2.5 text-slate-400 text-right">{v.bao_duong_tiep.toLocaleString()} km</td>
                    <td className="px-4 py-2.5 text-slate-400 whitespace-nowrap">{v.bao_hiem_het}</td>
                    <td className="px-4 py-2.5 text-[#406c89] font-medium">{v.du_an}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${STATUS_STYLE[v.trang_thai] ?? 'bg-slate-100 text-slate-500'}`}>
                        {v.trang_thai}
                      </span>
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
