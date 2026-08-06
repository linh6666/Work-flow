"use client";

import React, { useState } from 'react';
import {
  IconChartBar,
  IconUsers,
  IconAward,
  IconFolder,
} from '@tabler/icons-react';

import TongHopPhongBan from './tabs/TongHopPhongBan';
import TopNhanSuSystem from './tabs/TopNhanSuSystem';
import TheoTungDuAn from './tabs/TheoTungDuAn';
import PercentTheoDuAn from './tabs/PercentTheoDuAn';
import PercentTopNhanSu from './tabs/PercentTopNhanSu';

export default function NhanSuCongViec() {
  const [activeTab, setActiveTab] = useState<
    'tong-hop-phong-ban' | 'top-nhan-su' | 'theo-tung-du-an' | 'percent-theo-du-an' | 'percent-top-nhan-su'
  >('tong-hop-phong-ban');

  const tabs = [
    {
      id: 'tong-hop-phong-ban',
      label: 'Tổng hợp theo Phòng ban',
      icon: IconChartBar,
      iconColor: 'text-[#406c89]',
    },
    {
      id: 'top-nhan-su',
      label: 'Top nhân sự (toàn hệ thống)',
      icon: IconUsers,
      iconColor: 'text-emerald-600',
    },
    {
      id: 'theo-tung-du-an',
      label: 'Khối lượng — Theo từng Dự án',
      icon: IconFolder,
      iconColor: 'text-indigo-600',
    },
    {
      id: 'percent-theo-du-an',
      label: '% Tham gia — Theo từng Dự án',
      icon: IconAward,
      iconColor: 'text-purple-600',
    },
    {
      id: 'percent-top-nhan-su',
      label: '% Tham gia — Top nhân sự',
      icon: IconAward,
      iconColor: 'text-emerald-600',
    },
  ] as const;

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-2 text-left font-sans select-none overflow-hidden">
      {/* 5 SUB-TABS NAVIGATION BAR MATCHING SCREENSHOT EXACTLY */}
      <div className="border-b border-slate-200/80 pt-1 shrink-0 bg-white px-2 rounded-t-xl shadow-2xs">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-xs transition-all cursor-pointer border-b-2 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#ebf3f8] text-[#406c89] border-[#406c89] font-semibold'
                    : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 border-transparent font-normal'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-[#406c89]' : tab.iconColor} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SUB-TAB CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {activeTab === 'tong-hop-phong-ban' ? (
          <TongHopPhongBan />
        ) : activeTab === 'top-nhan-su' ? (
          <TopNhanSuSystem />
        ) : activeTab === 'theo-tung-du-an' ? (
          <TheoTungDuAn />
        ) : activeTab === 'percent-theo-du-an' ? (
          <PercentTheoDuAn />
        ) : (
          <PercentTopNhanSu />
        )}
      </div>
    </div>
  );
}
