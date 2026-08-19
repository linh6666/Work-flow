"use client";

import React, { useState } from 'react';
import {
  IconBriefcase,
  IconFileText,
  IconCalendarEvent,
  IconCar,
  IconTools,
  IconClipboardCheck,
} from '@tabler/icons-react';

import VanBanTab       from './tabs/VanBan';
import CongTacTab      from './tabs/CongTac';
import XeConTab        from './tabs/XeCon';
import CoSoVatChatTab  from './tabs/CoSoVatChat';
import TaiSanTab       from './tabs/TaiSan';

type TabId = 'van-ban' | 'cong-tac' | 'xe-con' | 'co-so-vat-chat' | 'tai-san';

export default function QuanLyHanhChinh() {
  const [activeTab, setActiveTab] = useState<TabId>('van-ban');

  const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: 'van-ban',        label: 'Văn bản',          icon: IconFileText       },
    { id: 'cong-tac',      label: 'Công tác',          icon: IconCalendarEvent  },
    { id: 'xe-con',        label: 'Xe con',             icon: IconCar            },
    { id: 'co-so-vat-chat',label: 'Cơ sở vật chất',   icon: IconTools          },
    { id: 'tai-san',       label: 'Tài sản',            icon: IconClipboardCheck },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden p-5 md:p-6 space-y-4 text-slate-700 w-full bg-slate-50">
      {/* Header & Sub-tabs */}
      <div className="space-y-3 shrink-0">
        <div className="flex items-center gap-2">
          <IconBriefcase size={18} className="text-[#406c89] shrink-0" />
          <div>
            <h2 className="text-base font-extrabold text-slate-800 tracking-tight">Quản lý hành chính</h2>
            <p className="text-[10px] font-medium text-slate-400 mt-0.5">
              Văn bản · Công tác · Xe con · Cơ sở vật chất · Tài sản
            </p>
          </div>
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
        {activeTab === 'van-ban'         ? <VanBanTab />       :
         activeTab === 'cong-tac'        ? <CongTacTab />      :
         activeTab === 'xe-con'          ? <XeConTab />        :
         activeTab === 'co-so-vat-chat'  ? <CoSoVatChatTab /> :
                                           <TaiSanTab />}
      </div>
    </div>
  );
}
