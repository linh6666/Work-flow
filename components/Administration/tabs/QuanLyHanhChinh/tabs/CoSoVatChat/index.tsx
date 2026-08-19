"use client";

import React, { useState } from 'react';
import {
  IconTools,
  IconSearch,
  IconDownload,
  IconPlus,
  IconChevronDown,
  IconAlertTriangle,
} from '@tabler/icons-react';

/* ─── Mock data ─────────────────────────────────────────────── */
const LOAI_CSVC = ['Tất cả loại', 'Văn phòng', 'Xưởng sản xuất', 'Kho bãi', 'Phòng họp', 'Căn tin'];

const mockCSVC = [
  { ma: 'CS-001', ten: 'Văn phòng tầng 1 – HN',       loai: 'Văn phòng',       dien_tich: 250,  vi_tri: 'Tầng 1, Tòa nhà A, Hà Nội',   so_nv_su_dung: 35, phi_thue: 45_000_000, trang_thai: 'Đang sử dụng', het_han: '2027-12-31' },
  { ma: 'CS-002', ten: 'Xưởng sản xuất – DN',          loai: 'Xưởng sản xuất', dien_tich: 1200, vi_tri: 'Khu CN Hòa Khánh, Đà Nẵng',   so_nv_su_dung: 80, phi_thue: 120_000_000,trang_thai: 'Đang sử dụng', het_han: '2028-06-30' },
  { ma: 'CS-003', ten: 'Kho NVL – HCM',                loai: 'Kho bãi',        dien_tich: 600,  vi_tri: 'Bình Dương',                   so_nv_su_dung: 10, phi_thue: 35_000_000, trang_thai: 'Đang sử dụng', het_han: '2026-12-31' },
  { ma: 'CS-004', ten: 'Phòng họp tầng 5',             loai: 'Phòng họp',      dien_tich: 80,   vi_tri: 'Tầng 5, Tòa nhà A, Hà Nội',   so_nv_su_dung: 20, phi_thue: 0,          trang_thai: 'Sẵn sàng',     het_han: '—'          },
  { ma: 'CS-005', ten: 'Văn phòng chi nhánh – HCM',    loai: 'Văn phòng',      dien_tich: 180,  vi_tri: 'Q.Bình Thạnh, TP.HCM',         so_nv_su_dung: 25, phi_thue: 38_000_000, trang_thai: 'Đang sử dụng', het_han: '2026-09-30' },
  { ma: 'CS-006', ten: 'Kho thành phẩm – DN',          loai: 'Kho bãi',        dien_tich: 400,  vi_tri: 'Khu CN Hòa Khánh, Đà Nẵng',   so_nv_su_dung: 5,  phi_thue: 18_000_000, trang_thai: 'Sửa chữa',     het_han: '2027-06-30' },
  { ma: 'CS-007', ten: 'Căn tin nhân viên',             loai: 'Căn tin',        dien_tich: 120,  vi_tri: 'Tầng B1, Tòa nhà A, Hà Nội',  so_nv_su_dung: 150,phi_thue: 0,          trang_thai: 'Đang sử dụng', het_han: '—'          },
];

const STATUS_STYLE: Record<string, string> = {
  'Đang sử dụng': 'bg-blue-50 text-blue-600',
  'Sẵn sàng':     'bg-emerald-50 text-emerald-600',
  'Sửa chữa':     'bg-amber-50 text-amber-600',
  'Ngừng hoạt động': 'bg-red-50 text-red-600',
};

/* ─── Component ─────────────────────────────────────────────── */
export default function CoSoVatChat() {
  const [search, setSearch] = useState('');
  const [loai, setLoai]     = useState('Tất cả loại');

  const filtered = mockCSVC.filter((v) =>
    (loai === 'Tất cả loại' || v.loai === loai) &&
    (v.ten.toLowerCase().includes(search.toLowerCase()) ||
     v.vi_tri.toLowerCase().includes(search.toLowerCase()) ||
     v.ma.toLowerCase().includes(search.toLowerCase()))
  );

  // Cảnh báo hết hạn trong 3 tháng
  const now = new Date();
  const in3Months = new Date(now);
  in3Months.setMonth(in3Months.getMonth() + 3);

  const soHetHanSom = filtered.filter(v => {
    if (v.het_han === '—') return false;
    return new Date(v.het_han) <= in3Months;
  }).length;

  return (
    <div className="flex-1 flex flex-col overflow-hidden gap-3">

      {/* ── Header bar ── */}
      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        <div className="flex items-center gap-2 mr-auto">
          <IconTools size={18} className="text-[#406c89] shrink-0" />
          <span className="text-sm font-bold text-slate-700 whitespace-nowrap">
            Cơ sở vật chất — Mặt bằng &amp; Tài sản cố định
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {soHetHanSom > 0 && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
              <IconAlertTriangle size={13} />
              {soHetHanSom} hợp đồng sắp hết hạn
            </div>
          )}
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors font-medium">
            <IconDownload size={13} />
            Xuất Excel
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold">
            <IconPlus size={13} />
            Thêm cơ sở
          </button>
        </div>
      </div>

      {/* ── KPIs ── */}
      <div className="flex gap-3 shrink-0">
        {[
          { label: 'Tổng cơ sở',    val: `${mockCSVC.length} cơ sở`,                  color: 'text-slate-700' },
          { label: 'Tổng diện tích', val: `${mockCSVC.reduce((s,v)=>s+v.dien_tich,0).toLocaleString()} m²`, color: 'text-[#406c89]' },
          { label: 'Tổng phí thuê/tháng', val: `${(mockCSVC.reduce((s,v)=>s+v.phi_thue,0)/1e6).toFixed(0)}tr đ`, color: 'text-emerald-600' },
          { label: 'Sắp hết hạn HĐ', val: `${soHetHanSom} cơ sở`,                    color: 'text-amber-600' },
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
            placeholder="Tìm theo mã, tên, vị trí..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
          />
        </div>
        <div className="relative shrink-0">
          <select
            value={loai}
            onChange={(e) => setLoai(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 cursor-pointer"
          >
            {LOAI_CSVC.map((n) => <option key={n}>{n}</option>)}
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
                {['Mã CS', 'Tên cơ sở', 'Loại', 'Diện tích', 'Vị trí', 'NV sử dụng', 'Phí thuê/tháng', 'Hết hạn HĐ', 'Trạng thái'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => {
                const soonExpire = v.het_han !== '—' && new Date(v.het_han) <= in3Months;
                return (
                  <tr key={v.ma} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                    <td className="px-4 py-2.5 font-mono text-slate-500">{v.ma}</td>
                    <td className="px-4 py-2.5 font-semibold text-slate-700 whitespace-nowrap">{v.ten}</td>
                    <td className="px-4 py-2.5 text-slate-500">{v.loai}</td>
                    <td className="px-4 py-2.5 text-slate-600 text-right">{v.dien_tich.toLocaleString()} m²</td>
                    <td className="px-4 py-2.5 text-slate-500">{v.vi_tri}</td>
                    <td className="px-4 py-2.5 text-slate-600 text-center">{v.so_nv_su_dung}</td>
                    <td className="px-4 py-2.5 font-bold text-slate-700 text-right">
                      {v.phi_thue > 0 ? `${v.phi_thue.toLocaleString()}đ` : '—'}
                    </td>
                    <td className={`px-4 py-2.5 whitespace-nowrap ${soonExpire ? 'text-amber-600 font-semibold' : 'text-slate-400'}`}>
                      {soonExpire && <IconAlertTriangle size={11} className="inline mr-1" />}
                      {v.het_han}
                    </td>
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
