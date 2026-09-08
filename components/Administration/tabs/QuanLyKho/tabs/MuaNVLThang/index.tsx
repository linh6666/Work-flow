"use client";

import React, { useState } from 'react';
import { IconShoppingCart } from '@tabler/icons-react';

import TheoDoiMuaNVLThang from './tabs/TheoDoiMuaNVLThang';
import TheoDoiMuaNVLDuAn  from './tabs/TheoDoiMuaNVLDuAn';
import DXDatHangNCC        from './tabs/DXDatHangNCC';

type SubTab = 'theo-doi-thang' | 'theo-doi-du-an' | 'dx-dat-hang-ncc';

const SUB_TABS: { id: SubTab; label: string }[] = [
  { id: 'theo-doi-thang',   label: 'Theo dõi Mua NVL tháng' },
  { id: 'theo-doi-du-an',   label: 'Theo dõi Mua NVL Dự án' },
  { id: 'dx-dat-hang-ncc',  label: 'ĐX Đặt hàng từ NCC'     },
];

export default function MuaNVLThangTab() {
  const [subTab, setSubTab] = useState<SubTab>('theo-doi-thang');

  return (
    <div className="flex-1 flex flex-col gap-3 overflow-hidden">
      {/* ── Header & Sub-tabs ── */}
      <div className="flex flex-col gap-1.5 shrink-0 pb-0.5">
        {/* Title */}
        <div className="flex items-center gap-1.5">
          <IconShoppingCart size={15} className="text-[#406c89] shrink-0" />
          <span className="text-sm font-bold text-slate-800 tracking-tight">Mua NVL Tháng</span>
        </div>

        {/* Sub-tab buttons */}
        <div className="flex items-center gap-1 flex-wrap">
          {SUB_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id)}
              className={`px-3 py-1 text-[11px] rounded-md transition-all cursor-pointer font-semibold ${
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
      {subTab === 'theo-doi-thang'  && <TheoDoiMuaNVLThang />}
      {subTab === 'theo-doi-du-an'  && <TheoDoiMuaNVLDuAn />}
      {subTab === 'dx-dat-hang-ncc' && <DXDatHangNCC />}
    </div>
  );
}
