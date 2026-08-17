"use client";

import React, { useState } from 'react';
import {
  IconClipboardList,
  IconUsers,
  IconFileText,
  IconStarFilled,
  IconArrowsLeftRight,
  IconUserPlus,
  IconCurrencyDollar,
  IconChartBar,
} from '@tabler/icons-react';

import NhanSuDuAnTab from './tabs/NhanSuDuAn';
import DanhSachNhanSuTab from './tabs/DanhSachNhanSu';
import HopDongLdTab from './tabs/HopDongLd';
import DanhGiaThuViecTab from './tabs/DanhGiaThuViec';
import NvVaoRaTab from './tabs/NvVaoRa';
import TuyenDungTab from './tabs/TuyenDung';
import BacLuongTab from './tabs/BacLuong';
import BaoCaoThamNienTab from './tabs/BaoCaoThamNien';

// ─── Tab definitions ──────────────────────────────────────────────────
export type TabKey =
  | 'nhan-su-du-an'
  | 'danh-sach-nhan-su'
  | 'hop-dong-ld'
  | 'danh-gia-thu-viec'
  | 'nv-vao-ra'
  | 'tuyen-dung'
  | 'bac-luong'
  | 'bao-cao-tham-nien';

interface Tab {
  key: TabKey;
  label: string;
  icon: React.ReactNode;
}

const TABS: Tab[] = [
  { key: 'nhan-su-du-an', label: 'Nhân sự Dự án', icon: <IconClipboardList size={14} /> },
  { key: 'danh-sach-nhan-su', label: 'Danh sách Nhân sự', icon: <IconUsers size={14} /> },
  { key: 'hop-dong-ld', label: 'Hợp đồng LĐ', icon: <IconFileText size={14} /> },
  { key: 'danh-gia-thu-viec', label: 'Đánh giá thử việc', icon: <IconStarFilled size={14} /> },
  { key: 'nv-vao-ra', label: 'NV vào/ra', icon: <IconArrowsLeftRight size={14} /> },
  { key: 'tuyen-dung', label: 'Tuyển dụng', icon: <IconUserPlus size={14} /> },
  { key: 'bac-luong', label: 'Bậc lương', icon: <IconCurrencyDollar size={14} /> },
  { key: 'bao-cao-tham-nien', label: 'Báo cáo thâm niên', icon: <IconChartBar size={14} /> },
];

export default function QuanLyNhanSu() {
  const [activeTab, setActiveTab] = useState<TabKey>('nhan-su-du-an');

  return (
    <div className="flex flex-col h-full bg-white">
      {/* ── Top-level Module Header ── */}
      <div className="px-5 pt-2.5 pb-2 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-1.5">
          <IconUsers size={16} className="text-indigo-600" />
          <h1 className="text-sm font-bold text-slate-800">Quản lý Nhân sự</h1>
          <span className="text-[11px] text-slate-400 ml-1 hidden sm:inline">
            Nhân sự dự án · Danh sách · Hợp đồng · Đánh giá · Tuyển dụng · Bậc lương
          </span>
        </div>
      </div>

      {/* ── Tab Navigation ── */}
      <div className="px-5 pt-2 border-b border-slate-100 shrink-0">
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {TABS.map(tab => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              style={
                activeTab === tab.key
                  ? { color: '#406c89', borderBottomColor: '#406c89', backgroundColor: '#eef4f7' }
                  : {}
              }
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-t-lg text-[11.5px] font-semibold transition-all cursor-pointer border-b-2 whitespace-nowrap shrink-0 ${
                activeTab === tab.key
                  ? 'border-b-2'
                  : 'text-slate-600 bg-slate-50 border-transparent hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        {activeTab === 'nhan-su-du-an' && <NhanSuDuAnTab />}
        {activeTab === 'danh-sach-nhan-su' && <DanhSachNhanSuTab />}
        {activeTab === 'hop-dong-ld' && <HopDongLdTab />}
        {activeTab === 'danh-gia-thu-viec' && <DanhGiaThuViecTab />}
        {activeTab === 'nv-vao-ra' && <NvVaoRaTab />}
        {activeTab === 'tuyen-dung' && <TuyenDungTab />}
        {activeTab === 'bac-luong' && <BacLuongTab />}
        {activeTab === 'bao-cao-tham-nien' && <BaoCaoThamNienTab />}
      </div>
    </div>
  );
}
