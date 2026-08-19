"use client";

import React, { useState } from 'react';
import {
  IconClipboardCheck,
  IconSearch,
  IconDownload,
  IconPlus,
  IconChevronDown,
  IconQrcode,
} from '@tabler/icons-react';

/* ─── Mock data ─────────────────────────────────────────────── */
const NHOM_TAI_SAN = ['Tất cả nhóm', 'Thiết bị IT', 'Máy móc sản xuất', 'Nội thất văn phòng', 'Thiết bị văn phòng', 'Phương tiện'];

const mockTaiSan = [
  { ma: 'TS-001', ten: 'Laptop Dell XPS 15',           nhom: 'Thiết bị IT',           nv_su_dung: 'Nguyễn Văn An',   phong_ban: 'P.Kinh doanh', nam_mua: 2024, nguyen_gia: 35_000_000, kh_luy_ke: 7_000_000, gia_con_lai: 28_000_000, trang_thai: 'Đang sử dụng' },
  { ma: 'TS-002', ten: 'Máy CNC cắt laser 1500W',      nhom: 'Máy móc sản xuất',      nv_su_dung: 'Xưởng SX DN',     phong_ban: 'P.Kỹ thuật',   nam_mua: 2022, nguyen_gia: 850_000_000,kh_luy_ke: 255_000_000,gia_con_lai: 595_000_000,trang_thai: 'Đang sử dụng' },
  { ma: 'TS-003', ten: 'Bộ bàn ghế họp (10 người)',    nhom: 'Nội thất văn phòng',    nv_su_dung: 'Phòng họp T5',    phong_ban: 'P.Hành chính', nam_mua: 2021, nguyen_gia: 45_000_000, kh_luy_ke: 22_500_000,gia_con_lai: 22_500_000, trang_thai: 'Đang sử dụng' },
  { ma: 'TS-004', ten: 'Máy chiếu Epson 4K',           nhom: 'Thiết bị văn phòng',    nv_su_dung: 'Phòng họp T5',    phong_ban: 'P.Hành chính', nam_mua: 2023, nguyen_gia: 18_000_000, kh_luy_ke: 3_600_000, gia_con_lai: 14_400_000, trang_thai: 'Đang sử dụng' },
  { ma: 'TS-005', ten: 'Toyota Innova 51A-12345',       nhom: 'Phương tiện',           nv_su_dung: 'Nguyễn Tài Xế A', phong_ban: 'P.Hành chính', nam_mua: 2021, nguyen_gia: 920_000_000,kh_luy_ke: 460_000_000,gia_con_lai: 460_000_000,trang_thai: 'Đang sử dụng' },
  { ma: 'TS-006', ten: 'Server HP ProLiant DL380',     nhom: 'Thiết bị IT',           nv_su_dung: 'Phòng IT',        phong_ban: 'P.Kỹ thuật',   nam_mua: 2023, nguyen_gia: 280_000_000,kh_luy_ke: 56_000_000, gia_con_lai: 224_000_000,trang_thai: 'Đang sử dụng' },
  { ma: 'TS-007', ten: 'Máy in A3 Xerox',              nhom: 'Thiết bị văn phòng',    nv_su_dung: 'P.Hành chính',   phong_ban: 'P.Hành chính', nam_mua: 2020, nguyen_gia: 55_000_000, kh_luy_ke: 44_000_000,gia_con_lai: 11_000_000, trang_thai: 'Bảo trì'      },
  { ma: 'TS-008', ten: 'Máy hàn TIG Miller 200A',      nhom: 'Máy móc sản xuất',      nv_su_dung: 'Xưởng SX DN',    phong_ban: 'P.Kỹ thuật',   nam_mua: 2019, nguyen_gia: 120_000_000,kh_luy_ke: 96_000_000, gia_con_lai: 24_000_000, trang_thai: 'Đang sử dụng' },
];

const STATUS_STYLE: Record<string, string> = {
  'Đang sử dụng': 'bg-blue-50 text-blue-600',
  'Bảo trì':      'bg-amber-50 text-amber-600',
  'Thanh lý':     'bg-red-50 text-red-600',
  'Lưu kho':      'bg-slate-100 text-slate-500',
};

/* ─── Component ─────────────────────────────────────────────── */
export default function TaiSan() {
  const [search, setSearch] = useState('');
  const [nhom, setNhom]     = useState('Tất cả nhóm');

  const filtered = mockTaiSan.filter((v) =>
    (nhom === 'Tất cả nhóm' || v.nhom === nhom) &&
    (v.ten.toLowerCase().includes(search.toLowerCase()) ||
     v.ma.toLowerCase().includes(search.toLowerCase()) ||
     v.nv_su_dung.toLowerCase().includes(search.toLowerCase()))
  );

  const tongNguyenGia   = filtered.reduce((s, v) => s + v.nguyen_gia, 0);
  const tongGiaConLai   = filtered.reduce((s, v) => s + v.gia_con_lai, 0);

  return (
    <div className="flex-1 flex flex-col overflow-hidden gap-3">

      {/* ── Header bar ── */}
      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        <div className="flex items-center gap-2 mr-auto">
          <IconClipboardCheck size={18} className="text-[#406c89] shrink-0" />
          <span className="text-sm font-bold text-slate-700 whitespace-nowrap">
            Quản lý Tài sản — Theo dõi &amp; Khấu hao tài sản
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors font-medium">
            <IconQrcode size={13} />
            In mã QR
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors font-medium">
            <IconDownload size={13} />
            Xuất Excel
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold">
            <IconPlus size={13} />
            Thêm tài sản
          </button>
        </div>
      </div>

      {/* ── KPIs ── */}
      <div className="flex gap-3 shrink-0">
        {[
          { label: 'Tổng tài sản',    val: `${mockTaiSan.length} tài sản`,                       color: 'text-slate-700' },
          { label: 'Nguyên giá',      val: `${(tongNguyenGia / 1e9).toFixed(2)} tỷ đ`,            color: 'text-[#406c89]' },
          { label: 'Giá trị còn lại', val: `${(tongGiaConLai / 1e9).toFixed(2)} tỷ đ`,            color: 'text-emerald-600' },
          { label: 'Đã khấu hao',     val: `${(((tongNguyenGia - tongGiaConLai) / tongNguyenGia) * 100).toFixed(0)}%`, color: 'text-amber-600' },
        ].map((k) => (
          <div key={k.label} className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 flex flex-col gap-0.5">
            <span className="text-[10px] font-medium text-slate-400">{k.label}</span>
            <span className={`text-sm font-extrabold ${k.color}`}>{k.val}</span>
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
            placeholder="Tìm theo mã TS, tên, người sử dụng..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
          />
        </div>
        <div className="relative shrink-0">
          <select
            value={nhom}
            onChange={(e) => setNhom(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 cursor-pointer"
          >
            {NHOM_TAI_SAN.map((n) => <option key={n}>{n}</option>)}
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
                {['Mã TS', 'Tên tài sản', 'Nhóm', 'NV / Bộ phận sử dụng', 'Phòng ban', 'Năm mua', 'Nguyên giá', 'KH lũy kế', 'Giá còn lại', 'Trạng thái'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => {
                const khPct = Math.round((v.kh_luy_ke / v.nguyen_gia) * 100);
                return (
                  <tr key={v.ma} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                    <td className="px-4 py-2.5 font-mono text-slate-500">{v.ma}</td>
                    <td className="px-4 py-2.5 font-semibold text-slate-700 whitespace-nowrap max-w-[200px] truncate">{v.ten}</td>
                    <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{v.nhom}</td>
                    <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap">{v.nv_su_dung}</td>
                    <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{v.phong_ban}</td>
                    <td className="px-4 py-2.5 text-slate-500 text-center">{v.nam_mua}</td>
                    <td className="px-4 py-2.5 text-slate-700 font-medium text-right whitespace-nowrap">{(v.nguyen_gia / 1e6).toFixed(0)}tr đ</td>
                    <td className="px-4 py-2.5 text-right whitespace-nowrap">
                      <span className={`font-semibold ${khPct >= 80 ? 'text-red-500' : 'text-slate-600'}`}>{(v.kh_luy_ke / 1e6).toFixed(0)}tr đ</span>
                      <span className="text-slate-400 ml-1">({khPct}%)</span>
                    </td>
                    <td className="px-4 py-2.5 font-bold text-[#406c89] text-right whitespace-nowrap">{(v.gia_con_lai / 1e6).toFixed(0)}tr đ</td>
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
