"use client";

import React, { useState } from 'react';
import { IconUsers, IconFileAnalytics } from '@tabler/icons-react';
import { DuAnItem } from '../../../index';
import NhanSuTab from '../NhanSuTab';
import TongHopBaoCaoTab from '../TongHopBaoCaoTab';

interface PheDuyetBaoCaoTabProps {
  project: DuAnItem;
}

export default function PheDuyetBaoCaoTab({ project }: PheDuyetBaoCaoTabProps) {
  const [isSectionOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'nhanSu' | 'tongHopBaoCao'>('tongHopBaoCao');

  return (
    <div className="bg-[#f8fafc] space-y-2.5 sm:space-y-3 text-slate-800 font-sans animate-fade-in w-full">
      {isSectionOpen && (
        <div className="space-y-2.5 sm:space-y-3">

          {/* 3 STAT CARDS RESPONSIVE MOBILE & DESKTOP */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {/* Card 1: Quá hạn */}
            <div className="bg-[#fff5f5] border border-rose-200/90 rounded-xl py-2 sm:py-2.5 px-2 sm:px-3 text-center flex flex-col items-center justify-center shadow-2xs transition-all">
              <span className="font-bold text-[10px] sm:text-xs text-[#c93b2b] truncate max-w-full">
                Quá hạn
              </span>
              <span className="text-base sm:text-xl font-black text-[#c93b2b] tracking-tight leading-tight mt-0.5">
                24
              </span>
            </div>

            {/* Card 2: Chưa báo cáo */}
            <div className="bg-[#fffdf0] border border-amber-200/90 rounded-xl py-2 sm:py-2.5 px-2 sm:px-3 text-center flex flex-col items-center justify-center shadow-2xs transition-all">
              <span className="font-bold text-[10px] sm:text-xs text-[#b58900] truncate max-w-full">
                Chưa báo cáo
              </span>
              <span className="text-base sm:text-xl font-black text-[#b58900] tracking-tight leading-tight mt-0.5">
                7
              </span>
            </div>

            {/* Card 3: BC cũ (>2 ngày) */}
            <div className="bg-[#fffbf5] border border-orange-200/90 rounded-xl py-2 sm:py-2.5 px-2 sm:px-3 text-center flex flex-col items-center justify-center shadow-2xs transition-all">
              <span className="font-bold text-[10px] sm:text-xs text-[#d97706] truncate max-w-full">
                BC cũ (&gt;2 ngày)
              </span>
              <span className="text-base sm:text-xl font-black text-[#d97706] tracking-tight leading-tight mt-0.5">
                0
              </span>
            </div>
          </div>

          {/* 2 TAB CHUYỂN ĐỔI RESPONSIVE */}
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex items-center gap-1 sm:gap-1.5 border-b border-slate-200 overflow-x-auto whitespace-nowrap scrollbar-none pb-0.5">
              <button
                type="button"
                onClick={() => setActiveTab('nhanSu')}
                className={`px-3 sm:px-4 py-2 rounded-t-xl text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer shrink-0 ${
                  activeTab === 'nhanSu'
                    ? 'bg-[#edf4f9] text-[#2b5278] border-b-2 border-[#2b5278] font-bold'
                    : 'bg-[#f8fafc] text-slate-600 hover:bg-slate-100/80 border-b-2 border-transparent'
                }`}
              >
                <IconUsers size={15} className={activeTab === 'nhanSu' ? 'text-[#2b5278]' : 'text-slate-500'} />
                <span>Nhân sự</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('tongHopBaoCao')}
                className={`px-3 sm:px-4 py-2 rounded-t-xl text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer shrink-0 ${
                  activeTab === 'tongHopBaoCao'
                    ? 'bg-[#edf4f9] text-[#2b5278] border-b-2 border-[#2b5278] font-bold'
                    : 'bg-[#f8fafc] text-slate-600 hover:bg-slate-100/80 border-b-2 border-transparent'
                }`}
              >
                <IconFileAnalytics size={15} className={activeTab === 'tongHopBaoCao' ? 'text-[#2b5278]' : 'text-slate-500'} />
                <span>Tổng hợp báo cáo công việc</span>
              </button>
            </div>

            {/* NỘI DUNG TAB */}
            {activeTab === 'nhanSu' && <NhanSuTab />}
            {activeTab === 'tongHopBaoCao' && <TongHopBaoCaoTab project={project} />}
          </div>

        </div>
      )}
    </div>
  );
}
