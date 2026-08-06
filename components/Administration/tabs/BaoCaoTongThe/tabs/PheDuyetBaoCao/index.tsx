"use client";

import React, { useState } from 'react';
import { IconAlertTriangle, IconClipboardList } from '@tabler/icons-react';

import BaoCaoChoDuyet from './tabs/BaoCaoChoDuyet';
import LichSuPheDuyet from './tabs/LichSuPheDuyet';

export default function PheDuyetBaoCao() {
  const [activeTab, setActiveTab] = useState<'canh-bao' | 'tong-hop'>('canh-bao');

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-2 text-left font-sans select-none overflow-hidden">
      {/* 2 SUB-TABS NAVIGATION BAR MATCHING EXACT USER SCREENSHOTS */}
      <div className="border-b border-slate-200/80 pt-1 shrink-0 bg-white px-2 rounded-t-xl shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {/* TAB 1: Cảnh báo công việc quá hạn / chưa báo cáo (1784) */}
          <button
            type="button"
            onClick={() => setActiveTab('canh-bao')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-xs transition-all cursor-pointer border-b-2 whitespace-nowrap shrink-0 ${
              activeTab === 'canh-bao'
                ? 'bg-[#fff1f2] text-[#b91c1c] border-[#b91c1c] font-bold'
                : 'bg-[#fef2f2]/40 text-[#991b1b] hover:bg-[#fef2f2] border-transparent font-medium'
            }`}
          >
            <IconAlertTriangle size={14} className="text-[#b91c1c] shrink-0" />
            <span>Cảnh báo công việc quá hạn / chưa báo cáo (1784)</span>
          </button>

          {/* TAB 2: Tổng hợp Báo cáo công việc — toàn bộ dự án [138 chờ duyệt] */}
          <button
            type="button"
            onClick={() => setActiveTab('tong-hop')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-t-md text-xs transition-all cursor-pointer border-b-2 whitespace-nowrap shrink-0 ${
              activeTab === 'tong-hop'
                ? 'bg-[#ebf3f8] text-[#406c89] border-[#406c89] font-bold'
                : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 border-transparent font-medium'
            }`}
          >
            <IconClipboardList size={14} className={activeTab === 'tong-hop' ? 'text-[#406c89]' : 'text-slate-500'} />
            <span>Tổng hợp Báo cáo công việc — toàn bộ dự án</span>
            <span className="bg-[#f59e0b] text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-2xs">
              138 chờ duyệt
            </span>
          </button>
        </div>
      </div>

      {/* SUB-TAB CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {activeTab === 'canh-bao' ? (
          <BaoCaoChoDuyet />
        ) : (
          <LichSuPheDuyet />
        )}
      </div>
    </div>
  );
}
