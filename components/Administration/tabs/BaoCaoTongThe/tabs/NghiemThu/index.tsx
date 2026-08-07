"use client";

import React, { useState } from 'react';
import { IconCheck, IconPercentage } from '@tabler/icons-react';
import NghiemThu80 from './tabs/NghiemThu80';
import NghiemThu100 from './tabs/NghiemThu100';

export default function NghiemThu() {
  const [activeTab, setActiveTab] = useState<'80%' | '100%'>('80%');

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-3 text-left font-sans select-none overflow-hidden">
      {/* TAB NAVIGATION STRIP */}
      <div className="border-b border-slate-200/80 pt-1 shrink-0 bg-white px-2 rounded-t-xl shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {/* TAB 1: Nghiệm thu 80% */}
          <button
            type="button"
            onClick={() => setActiveTab('80%')}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-xs transition-all cursor-pointer border-b-2 whitespace-nowrap shrink-0 ${
              activeTab === '80%'
                ? 'bg-[#ebf3f8] text-[#406c89] border-[#406c89] font-bold shadow-2xs'
                : 'bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-transparent font-medium'
            }`}
          >
            <IconPercentage size={15} className={activeTab === '80%' ? 'text-[#406c89]' : 'text-slate-400'} />
            <span>Nghiệm thu 80%</span>
            <span className="bg-[#406c89] text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-2xs">
              22
            </span>
          </button>

          {/* TAB 2: Nghiệm thu 100% */}
          <button
            type="button"
            onClick={() => setActiveTab('100%')}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-xs transition-all cursor-pointer border-b-2 whitespace-nowrap shrink-0 ${
              activeTab === '100%'
                ? 'bg-[#e6f4ea] text-[#137333] border-[#137333] font-bold shadow-2xs'
                : 'bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-transparent font-medium'
            }`}
          >
            <IconCheck size={15} className={activeTab === '100%' ? 'text-[#137333]' : 'text-slate-400'} />
            <span>Nghiệm thu 100%</span>
            <span className="bg-[#137333] text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-2xs">
              15
            </span>
          </button>
        </div>
      </div>

      {/* TAB CONTENT RENDER */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {activeTab === '80%' ? <NghiemThu80 /> : <NghiemThu100 />}
      </div>
    </div>
  );
}


