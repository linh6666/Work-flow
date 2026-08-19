"use client";

import React, { useState } from 'react';
import {
  IconBuildingWarehouse,
  IconSearch,
  IconDownload,
  IconUpload,
  IconChartBar,
  IconPlus,
  IconChevronDown,
} from '@tabler/icons-react';

/* ─── Mock data ─────────────────────────────────────────────── */
const NHOM_HANG = ['Tất cả nhóm hàng', 'Kim loại', 'Sơn & hoá chất', 'Điện – điện tử', 'Gỗ & vật liệu xây dựng', 'Khác'];

const mockNhapKho = [
  { ma: 'VT001', ten: 'Thép hộp 40x40',   nhom: 'Kim loại',              dvt: 'kg',    so_luong: 500,  don_gia: 18_500,  thanh_tien: 9_250_000,  ncc: 'Thép Miền Nam',  du_an: 'DA-HN-01', ngay: '2026-08-10' },
  { ma: 'VT002', ten: 'Nhôm tấm 3mm',     nhom: 'Kim loại',              dvt: 'tấm',   so_luong: 30,   don_gia: 420_000, thanh_tien: 12_600_000, ncc: 'Nhôm Việt Pháp', du_an: 'DA-HCM-02', ngay: '2026-08-12' },
  { ma: 'VT003', ten: 'Sơn epoxy xám',    nhom: 'Sơn & hoá chất',        dvt: 'thùng', so_luong: 5,    don_gia: 680_000, thanh_tien: 3_400_000,  ncc: 'Bạch Tuyết',     du_an: 'DA-HN-01', ngay: '2026-08-14' },
  { ma: 'VT004', ten: 'Bu lông M10',      nhom: 'Kim loại',              dvt: 'cái',   so_luong: 1000, don_gia: 2_500,   thanh_tien: 2_500_000,  ncc: 'Thiết bị HP',    du_an: 'DA-DN-03', ngay: '2026-08-15' },
  { ma: 'VT005', ten: 'Dây điện 2.5mm',   nhom: 'Điện – điện tử',        dvt: 'cuộn',  so_luong: 20,   don_gia: 155_000, thanh_tien: 3_100_000,  ncc: 'Cadivi',         du_an: 'DA-HCM-02', ngay: '2026-08-16' },
  { ma: 'VT006', ten: 'Gỗ ván ép 18mm',   nhom: 'Gỗ & vật liệu xây dựng', dvt: 'tấm', so_luong: 50,  don_gia: 320_000, thanh_tien: 16_000_000, ncc: 'Gỗ Thuận Phát',  du_an: 'DA-DN-03', ngay: '2026-08-18' },
];

const mockXuatKho = [
  { ma: 'VT001', ten: 'Thép hộp 40x40',   nhom: 'Kim loại',   dvt: 'kg',    so_luong: 200, don_gia: 18_500,  thanh_tien: 3_700_000,  du_an: 'DA-HN-01',  ngay: '2026-08-11' },
  { ma: 'VT003', ten: 'Sơn epoxy xám',    nhom: 'Sơn & hoá chất', dvt: 'thùng', so_luong: 3, don_gia: 680_000, thanh_tien: 2_040_000, du_an: 'DA-HN-01',  ngay: '2026-08-13' },
  { ma: 'VT005', ten: 'Dây điện 2.5mm',   nhom: 'Điện – điện tử', dvt: 'cuộn', so_luong: 10, don_gia: 155_000, thanh_tien: 1_550_000, du_an: 'DA-HCM-02', ngay: '2026-08-17' },
];

const mockTonKho = [
  { ma: 'VT001', ten: 'Thép hộp 40x40',   nhom: 'Kim loại',              dvt: 'kg',    ton: 1250, min: 500,  gia: 18_500  },
  { ma: 'VT002', ten: 'Nhôm tấm 3mm',     nhom: 'Kim loại',              dvt: 'tấm',   ton: 84,   min: 20,   gia: 420_000 },
  { ma: 'VT003', ten: 'Sơn epoxy xám',    nhom: 'Sơn & hoá chất',        dvt: 'thùng', ton: 12,   min: 10,   gia: 680_000 },
  { ma: 'VT004', ten: 'Bu lông M10',      nhom: 'Kim loại',              dvt: 'cái',   ton: 3200, min: 1000, gia: 2_500   },
  { ma: 'VT005', ten: 'Dây điện 2.5mm',   nhom: 'Điện – điện tử',        dvt: 'cuộn',  ton: 45,   min: 10,   gia: 155_000 },
  { ma: 'VT006', ten: 'Ống PVC Ø27',      nhom: 'Gỗ & vật liệu xây dựng',dvt: 'cây',   ton: 8,    min: 20,   gia: 35_000  },
  { ma: 'VT007', ten: 'Gỗ ván ép 18mm',   nhom: 'Gỗ & vật liệu xây dựng',dvt: 'tấm',   ton: 130,  min: 30,   gia: 320_000 },
];

type SubTab = 'nhap-kho' | 'xuat-kho' | 'ton-kho';
const YEARS = ['2024', '2025', '2026'];

/* ─── Component ─────────────────────────────────────────────── */
export default function QuanLyNVL() {
  const [subTab, setSubTab]   = useState<SubTab>('nhap-kho');
  const [search, setSearch]   = useState('');
  const [nhom, setNhom]       = useState('Tất cả nhóm hàng');
  const [year, setYear]       = useState('2026');

  const SUB_TABS: { id: SubTab; label: string }[] = [
    { id: 'nhap-kho', label: 'Nhập kho' },
    { id: 'xuat-kho', label: 'Xuất kho' },
    { id: 'ton-kho',  label: 'Tồn kho'  },
  ];

  /* filter helper */
  const match = (row: { ma: string; ten: string; nhom: string }) =>
    (nhom === 'Tất cả nhóm hàng' || row.nhom === nhom) &&
    (row.ma.toLowerCase().includes(search.toLowerCase()) ||
     row.ten.toLowerCase().includes(search.toLowerCase()) ||
     row.nhom.toLowerCase().includes(search.toLowerCase()));

  const nhapFiltered = mockNhapKho.filter(match);
  const xuatFiltered = mockXuatKho.filter(match);
  const tonFiltered  = mockTonKho.filter(match);

  return (
    <div className="flex-1 flex flex-col overflow-hidden gap-3">

      {/* ── Header bar ── */}
      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        {/* Title */}
        <div className="flex items-center gap-2 mr-auto">
          <IconBuildingWarehouse size={18} className="text-[#406c89] shrink-0" />
          <span className="text-sm font-bold text-slate-700 whitespace-nowrap">
            Quản lý NVL — Nhập Xuất Tồn theo năm
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Year picker */}
          <div className="relative">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="appearance-none pl-3 pr-7 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 cursor-pointer"
            >
              {YEARS.map((y) => <option key={y}>{y === year ? `Năm ${y}` : `Năm ${y}`}</option>)}
            </select>
            <IconChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors font-medium">
            <IconUpload size={13} />
            Import Excel
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors font-medium">
            <IconDownload size={13} />
            Xuất Excel
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors font-medium">
            <IconChartBar size={13} />
            Báo cáo
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold">
            <IconPlus size={13} />
            Thêm
          </button>
        </div>
      </div>

      {/* ── Sub-tabs ── */}
      <div className="flex items-center gap-1 shrink-0">
        {SUB_TABS.map((t) => {
          const isActive = subTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#406c89] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ── Search + Filter row ── */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="relative flex-1">
          <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo mã, tên, nhóm hàng, NCC, dự án..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
          />
        </div>
        <div className="relative shrink-0">
          <select
            value={nhom}
            onChange={(e) => setNhom(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 cursor-pointer"
          >
            {NHOM_HANG.map((n) => <option key={n}>{n}</option>)}
          </select>
          <IconChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* ── Table area ── */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="overflow-auto flex-1">

          {/* NHẬP KHO table */}
          {subTab === 'nhap-kho' && (
            <table className="w-full text-xs">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  {['Mã VT', 'Tên vật tư', 'Nhóm hàng', 'ĐVT', 'Số lượng', 'Đơn giá', 'Thành tiền', 'NCC', 'Dự án', 'Ngày nhập'].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {nhapFiltered.map((v, i) => (
                  <tr key={`${v.ma}-${i}`} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                    <td className="px-4 py-2.5 font-mono text-slate-500">{v.ma}</td>
                    <td className="px-4 py-2.5 font-semibold text-slate-700 whitespace-nowrap">{v.ten}</td>
                    <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{v.nhom}</td>
                    <td className="px-4 py-2.5 text-slate-500">{v.dvt}</td>
                    <td className="px-4 py-2.5 font-medium text-slate-700 text-right">{v.so_luong.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-slate-600 text-right">{v.don_gia.toLocaleString()}đ</td>
                    <td className="px-4 py-2.5 font-bold text-slate-700 text-right">{v.thanh_tien.toLocaleString()}đ</td>
                    <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{v.ncc}</td>
                    <td className="px-4 py-2.5 text-[#406c89] font-medium">{v.du_an}</td>
                    <td className="px-4 py-2.5 text-slate-400">{v.ngay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* XUẤT KHO table */}
          {subTab === 'xuat-kho' && (
            <table className="w-full text-xs">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  {['Mã VT', 'Tên vật tư', 'Nhóm hàng', 'ĐVT', 'Số lượng', 'Đơn giá', 'Thành tiền', 'Dự án', 'Ngày xuất'].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {xuatFiltered.map((v, i) => (
                  <tr key={`${v.ma}-${i}`} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                    <td className="px-4 py-2.5 font-mono text-slate-500">{v.ma}</td>
                    <td className="px-4 py-2.5 font-semibold text-slate-700 whitespace-nowrap">{v.ten}</td>
                    <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{v.nhom}</td>
                    <td className="px-4 py-2.5 text-slate-500">{v.dvt}</td>
                    <td className="px-4 py-2.5 font-medium text-slate-700 text-right">{v.so_luong.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-slate-600 text-right">{v.don_gia.toLocaleString()}đ</td>
                    <td className="px-4 py-2.5 font-bold text-slate-700 text-right">{v.thanh_tien.toLocaleString()}đ</td>
                    <td className="px-4 py-2.5 text-[#406c89] font-medium">{v.du_an}</td>
                    <td className="px-4 py-2.5 text-slate-400">{v.ngay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* TỒN KHO table */}
          {subTab === 'ton-kho' && (
            <table className="w-full text-xs">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  {['Mã VT', 'Tên vật tư', 'Nhóm hàng', 'ĐVT', 'Tồn kho', 'Tồn tối thiểu', 'Đơn giá', 'Trạng thái'].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tonFiltered.map((v, i) => {
                  const isLow = v.ton <= v.min;
                  return (
                    <tr key={v.ma} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                      <td className="px-4 py-2.5 font-mono text-slate-500">{v.ma}</td>
                      <td className="px-4 py-2.5 font-semibold text-slate-700 whitespace-nowrap">{v.ten}</td>
                      <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{v.nhom}</td>
                      <td className="px-4 py-2.5 text-slate-500">{v.dvt}</td>
                      <td className={`px-4 py-2.5 font-bold text-right ${isLow ? 'text-red-500' : 'text-slate-700'}`}>{v.ton.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-slate-500 text-right">{v.min.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-slate-600 text-right">{v.gia.toLocaleString()}đ</td>
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${isLow ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                          {isLow ? '⚠ Sắp hết' : '✓ Đủ hàng'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  );
}
