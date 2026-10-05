"use client";

import React, { useState } from 'react';
import {
  IconCalendarEvent,
  IconLayoutDashboard,
} from '@tabler/icons-react';

import BangKhCongViecKdTab from './tabs/BangKhCongViecKd';
import TongQuanKinhDoanhTab from './tabs/TongQuanKinhDoanh';

interface TongQuanTabProps {
  onNavigateTab?: (tabId: any) => void;
}

type SubTabKey = 'bang-kh' | 'tong-quan-kd';

const SUB_TABS: { key: SubTabKey; label: string; icon: React.ElementType }[] = [
  { key: 'bang-kh', label: 'Bảng KH công việc KD', icon: IconCalendarEvent },
  { key: 'tong-quan-kd', label: 'Tổng quan Kinh doanh', icon: IconLayoutDashboard },
];

export default function TongQuanTab({ onNavigateTab }: TongQuanTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<SubTabKey>('bang-kh');

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-1">
      {/* ── 1. SUB-TABS NAVIGATION BAR ── */}
      <div className="flex gap-1 overflow-x-auto no-scrollbar pt-1 border-b border-slate-200/80 shrink-0">
        {SUB_TABS.map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeSubTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveSubTab(tab.key)}
              style={
                isActive
                  ? { color: '#406c89', borderBottomColor: '#406c89', backgroundColor: '#eef4f7' }
                  : {}
              }
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg text-xs font-semibold transition-all cursor-pointer border-b-2 whitespace-nowrap shrink-0 ${
                isActive
                  ? 'font-bold border-b-2'
                  : 'text-slate-600 bg-slate-50 border-transparent hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              <IconComp size={14} className={isActive ? 'text-[#406c89]' : 'text-slate-400'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── 2. SUB-TAB CONTENT VIEW ── */}
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        {activeSubTab === 'bang-kh' && <BangKhCongViecKdTab />}
        {activeSubTab === 'tong-quan-kd' && (
          <TongQuanKinhDoanhTab onNavigateTab={onNavigateTab} />
        )}
      </div>
    </div>
  );
}
