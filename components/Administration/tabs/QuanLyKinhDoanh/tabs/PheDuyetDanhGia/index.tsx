"use client";

import React, { useState } from 'react';
import {
  IconRefresh,
  IconTrendingUp,
  IconUsers,
  IconCurrencyDollar,
  IconChartBar,
  IconCheckbox,
} from '@tabler/icons-react';

import BaoCaoTienDoTab from './tabs/BaoCaoTienDo';
import NhanSuCongViecTab from './tabs/NhanSuCongViec';
import ChiPhiPhongBanTab from './tabs/ChiPhiPhongBan';
import PheDuyetBaoCaoTab from './tabs/PheDuyetBaoCao';
import PheDuyetQuyTrinhTab from './tabs/PheDuyetQuyTrinh';

type SubTabKey = 'tiendo' | 'nhansu' | 'chiphi' | 'pheduyet' | 'quytrinh';

const SUB_TABS: { key: SubTabKey; label: string; icon: React.ElementType }[] = [
  { key: 'tiendo', label: 'Báo cáo Tiến độ', icon: IconTrendingUp },
  { key: 'nhansu', label: 'Nhân sự & Công việc', icon: IconUsers },
  { key: 'chiphi', label: 'Chi phí Phòng ban', icon: IconCurrencyDollar },
  { key: 'pheduyet', label: 'Phê duyệt Báo cáo', icon: IconChartBar },
  { key: 'quytrinh', label: 'Phê duyệt quy trình KD', icon: IconCheckbox },
];

export default function PheDuyetDanhGiaTab() {
  const [activeSubTab, setActiveSubTab] = useState<SubTabKey>('tiendo');

  return (
    <div className="flex flex-col h-full bg-white space-y-4 p-1">
      {/* ── 1. Header Section ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Phê duyệt & Đánh giá — Phòng Kinh doanh
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Tổng hợp tiến độ, nhân sự, chi phí & phê duyệt báo cáo công việc Kinh doanh
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Đã làm mới dữ liệu')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer self-start sm:self-auto shrink-0"
        >
          <IconRefresh size={14} className="text-slate-500" />
          <span>Làm mới</span>
        </button>
      </div>

      {/* ── 2. Sub-Tabs Navigation Bar ── */}
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

      {/* ── 3. Tab Content View ── */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {activeSubTab === 'tiendo' && <BaoCaoTienDoTab />}
        {activeSubTab === 'nhansu' && <NhanSuCongViecTab />}
        {activeSubTab === 'chiphi' && <ChiPhiPhongBanTab />}
        {activeSubTab === 'pheduyet' && <PheDuyetBaoCaoTab />}
        {activeSubTab === 'quytrinh' && <PheDuyetQuyTrinhTab />}
      </div>
    </div>
  );
}
