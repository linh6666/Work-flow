"use client";

import React, { useState } from 'react';
import {
  IconBuildingWarehouse,
  IconPackage,
  IconArrowsTransferDown,
  IconClipboardList,
  IconChartBar,
} from '@tabler/icons-react';

import TonKhoTab from './tabs/TonKho';
import NhapKhoTab from './tabs/NhapKho';
import XuatKhoTab from './tabs/XuatKho';
import KiemKeTab from './tabs/KiemKe';
import BaoCaoKhoTab from './tabs/BaoCaoKho';

type TabId = 'ton-kho' | 'nhap-kho' | 'xuat-kho' | 'kiem-ke' | 'bao-cao-kho';

export default function QuanLyKho() {
  const [activeTab, setActiveTab] = useState<TabId>('ton-kho');

  const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: 'ton-kho',    label: 'Tồn kho',       icon: IconBuildingWarehouse },
    { id: 'nhap-kho',   label: 'Nhập kho',       icon: IconPackage },
    { id: 'xuat-kho',   label: 'Xuất kho',       icon: IconArrowsTransferDown },
    { id: 'kiem-ke',    label: 'Kiểm kê',        icon: IconClipboardList },
    { id: 'bao-cao-kho',label: 'Báo cáo Kho',    icon: IconChartBar },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden p-5 md:p-6 space-y-4 text-slate-700 w-full bg-slate-50">
      {/* Header & Sub-tabs */}
      <div className="space-y-3 shrink-0">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Quản lý Kho</h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Tồn kho · Nhập kho · Xuất kho · Kiểm kê · Báo cáo kho
          </p>
        </div>

        {/* Tab Navigation Bar */}
        <div className="border-b border-slate-200/80 pt-1">
          <div className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-t-lg text-xs transition-all cursor-pointer border-b-[2.5px] whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#ebf4f8] text-[#406c89] border-[#406c89] font-bold'
                      : 'bg-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-100/60 border-transparent font-medium'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-[#406c89]' : 'text-slate-400'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Tab Content Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {activeTab === 'ton-kho'     ? <TonKhoTab />     :
         activeTab === 'nhap-kho'    ? <NhapKhoTab />    :
         activeTab === 'xuat-kho'    ? <XuatKhoTab />    :
         activeTab === 'kiem-ke'     ? <KiemKeTab />     :
                                       <BaoCaoKhoTab />}
      </div>
    </div>
  );
}
