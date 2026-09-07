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

import NhapKho from './tabs/NhapKho';
import XuatKho from './tabs/XuatKho';
import TonKho from './tabs/TonKho';

const NHOM_HANG = [
  'Tất cả nhóm hàng',
  'Giấy',
  'Chất kết dính',
  'Hệ thống ánh sáng',
  'Công cụ dụng cụ',
  'Linh kiện điện',
  'Mica',
  'Sơn',
  'Chất phụ gia',
  'Phụ liệu ngành mộc',
  'Phụ liệu cảnh quan',
  'Đóng gói hàng',
  'NVL khác',
  'ACRYLICOS VALLEJO',
  'Gỗ công nghiệp',
  'Kim loại',
  'Sơn & hoá chất',
  'Điện – điện tử',
  'Gỗ & vật liệu xây dựng',
  'Khác',
];

type SubTab = 'nhap-kho' | 'xuat-kho' | 'ton-kho';
const YEARS = ['2024', '2025', '2026'];

/* ─── Component ─────────────────────────────────────────────── */
export default function QuanLyNVL() {
  const [subTab, setSubTab] = useState<SubTab>('nhap-kho');
  const [search, setSearch] = useState('');
  const [nhom, setNhom] = useState('Tất cả nhóm hàng');
  const [year, setYear] = useState('2026');

  const SUB_TABS: { id: SubTab; label: string }[] = [
    { id: 'nhap-kho', label: 'Nhập kho' },
    { id: 'xuat-kho', label: 'Xuất kho' },
    { id: 'ton-kho',  label: 'Tồn kho'  },
  ];

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
              {YEARS.map((y) => <option key={y}>{`Năm ${y}`}</option>)}
            </select>
            <IconChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors font-medium cursor-pointer">
            <IconUpload size={13} />
            Import Excel
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors font-medium cursor-pointer">
            <IconDownload size={13} />
            Xuất Excel
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors font-medium cursor-pointer">
            <IconChartBar size={13} />
            Báo cáo
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold cursor-pointer">
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

      {/* ── Content area by sub-tab ── */}
      {subTab === 'nhap-kho' && <NhapKho search={search} nhom={nhom} />}
      {subTab === 'xuat-kho' && <XuatKho search={search} nhom={nhom} />}
      {subTab === 'ton-kho'  && <TonKho  search={search} nhom={nhom} />}
    </div>
  );
}
