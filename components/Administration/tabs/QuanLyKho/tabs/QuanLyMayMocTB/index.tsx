"use client";

import React, { useState } from 'react';
import { IconTool } from '@tabler/icons-react';

import DanhSachMay from './tabs/DanhSachMay';
import SuaChua from './tabs/SuaChua';
import VeSinhBaoDuong from './tabs/VeSinhBaoDuong';

type SubTab = 'danh-sach-may' | 'sua-chua' | 've-sinh-bao-duong';

const SUB_TABS: { id: SubTab; label: string }[] = [
  { id: 'danh-sach-may', label: 'Danh sách máy' },
  { id: 'sua-chua', label: 'Sửa chữa' },
  { id: 've-sinh-bao-duong', label: 'Vệ sinh bảo dưỡng' },
];

export default function QuanLyMayMocTBTab() {
  const [subTab, setSubTab] = useState<SubTab>('danh-sach-may');

  return (
    <div className="flex-1 flex flex-col gap-3 overflow-hidden">
      {/* ── Header & Sub-tabs ── */}
      <div className="flex flex-col gap-2 shrink-0 pb-0.5">
        {/* Title */}
        <div className="flex items-center gap-2">
          <IconTool size={16} className="text-[#406c89] shrink-0" />
          <span className="text-sm font-bold text-slate-800 tracking-tight">
            Quản lý máy móc & Thiết bị
          </span>
        </div>

        {/* Sub-tab buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {SUB_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id)}
              className={`px-3.5 py-1.5 text-xs rounded-lg transition-all cursor-pointer font-semibold ${
                subTab === t.id
                  ? 'bg-[#406c89] text-white shadow-sm'
                  : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ── */}
      {subTab === 'danh-sach-may' && <DanhSachMay />}
      {subTab === 'sua-chua' && <SuaChua />}
      {subTab === 've-sinh-bao-duong' && <VeSinhBaoDuong />}
    </div>
  );
}
