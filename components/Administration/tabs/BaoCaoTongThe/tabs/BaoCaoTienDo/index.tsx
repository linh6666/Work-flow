"use client";

import React, { useState } from 'react';
import {
  IconChartBar,
  IconPhoto,
} from '@tabler/icons-react';

import { ProjectItem } from './types';
import { INITIAL_PROJECTS } from './data';
import TongHopTienDo from './tabs/TongHopTienDo';
import HinhAnhBaoCao from './tabs/HinhAnhBaoCao';

export default function BaoCaoTienDo() {
  const [projects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [subTab, setSubTab] = useState<'table' | 'remarks'>('table');

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-2.5 text-left font-sans select-none overflow-hidden">
      {/* ── SUB-TABS NAVIGATION BAR ── */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => setSubTab('table')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer select-none ${
            subTab === 'table'
              ? 'bg-[#406c89] text-white shadow-sm ring-2 ring-[#406c89]/40 ring-offset-1'
              : 'bg-[#406c89]/85 hover:bg-[#406c89] text-white/90 hover:text-white shadow-2xs'
          }`}
        >
          <IconChartBar size={15} />
          <span>Tổng hợp tiến độ</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('remarks')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer select-none ${
            subTab === 'remarks'
              ? 'bg-[#406c89] text-white shadow-sm ring-2 ring-[#406c89]/40 ring-offset-1'
              : 'bg-[#406c89]/85 hover:bg-[#406c89] text-white/90 hover:text-white shadow-2xs'
          }`}
        >
          <IconPhoto size={15} />
          <span>Hình ảnh báo cáo</span>
        </button>
      </div>

      {/* ── SUB-TAB CONTENT AREA ── */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {subTab === 'table' ? (
          <TongHopTienDo projects={projects} />
        ) : (
          <HinhAnhBaoCao
            projects={projects}
            searchQuery=""
            evaluationFilter="ALL"
          />
        )}
      </div>
    </div>
  );
}
