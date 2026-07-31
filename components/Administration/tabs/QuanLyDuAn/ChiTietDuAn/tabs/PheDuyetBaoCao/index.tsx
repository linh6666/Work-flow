"use client";

import React, { useState } from 'react';
import { IconChevronUp, IconChevronDown, IconX, IconUsers, IconFileAnalytics } from '@tabler/icons-react';
import { DuAnItem } from '../../../index';
import NhanSuTab from '../NhanSuTab';
import TongHopBaoCaoTab from '../TongHopBaoCaoTab';

interface PheDuyetBaoCaoTabProps {
  project: DuAnItem;
}

export default function PheDuyetBaoCaoTab({ project }: PheDuyetBaoCaoTabProps) {
  const [isSectionOpen, setIsSectionOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'nhanSu' | 'tongHopBaoCao'>('nhanSu');

  return (
    <div className="bg-[#f8fafc] space-y-5 text-slate-800 font-sans animate-fade-in">
      {isSectionOpen && (
        <div className="space-y-5">

          {/* 3 STAT CARDS: QUÁ HẠN, CHƯA BÁO CÁO, BC CŨ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Card 1: Quá hạn */}
            <div className="bg-[#fff5f5] border border-rose-200/90 rounded-xl py-2 px-3 text-center flex flex-col items-center justify-center shadow-2xs">
              <span className="font-bold text-[11px] text-[#c93b2b]">
                Quá hạn
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-[#c93b2b] tracking-tight leading-tight mt-0.5">
                24
              </span>
            </div>

            {/* Card 2: Chưa báo cáo */}
            <div className="bg-[#fffdf0] border border-amber-200/90 rounded-xl py-2 px-3 text-center flex flex-col items-center justify-center shadow-2xs">
              <span className="font-bold text-[11px] text-[#b58900]">
                Chưa báo cáo
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-[#b58900] tracking-tight leading-tight mt-0.5">
                7
              </span>
            </div>

            {/* Card 3: BC cũ (>2 ngày) */}
            <div className="bg-[#fffbf5] border border-orange-200/90 rounded-xl py-2 px-3 text-center flex flex-col items-center justify-center shadow-2xs">
              <span className="font-bold text-[11px] text-[#d97706]">
                BC cũ (&gt;2 ngày)
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-[#d97706] tracking-tight leading-tight mt-0.5">
                0
              </span>
            </div>
          </div>

          {/* 2 TAB CHUYỂN ĐỔI GIỐNG HÌNH ẢNH MẪU */}
          <div className="space-y-4 pt-1">
            <div className="flex items-center gap-1.5 border-b border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('nhanSu')}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'nhanSu'
                    ? 'bg-[#edf4f9] text-[#2b5278] border-b-2 border-[#2b5278] font-bold'
                    : 'bg-[#f8fafc] text-slate-600 hover:bg-slate-100/80 border-b-2 border-transparent'
                }`}
              >
                <IconUsers size={16} className={activeTab === 'nhanSu' ? 'text-[#2b5278]' : 'text-slate-500'} />
                <span>Nhân sự</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('tongHopBaoCao')}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'tongHopBaoCao'
                    ? 'bg-[#edf4f9] text-[#2b5278] border-b-2 border-[#2b5278] font-bold'
                    : 'bg-[#f8fafc] text-slate-600 hover:bg-slate-100/80 border-b-2 border-transparent'
                }`}
              >
                <IconFileAnalytics size={16} className={activeTab === 'tongHopBaoCao' ? 'text-[#2b5278]' : 'text-slate-500'} />
                <span>Tổng hợp báo cáo công việc</span>
              </button>
            </div>

            {/* NỘI DUNG THEO TAB CHỌN IMPORT TỪ 2 FOLDER RIÊNG */}
            {activeTab === 'nhanSu' && <NhanSuTab />}
            {activeTab === 'tongHopBaoCao' && <TongHopBaoCaoTab project={project} />}
          </div>

        </div>
      )}

    </div>
  );
}
