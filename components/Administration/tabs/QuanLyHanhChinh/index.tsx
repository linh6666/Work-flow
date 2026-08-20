"use client";

import React, { useState } from 'react';
import {
  IconBriefcase,
  IconWallet,
  IconShirt,
  IconTruck,
  IconDeviceDesktop,
  IconPigMoney,
  IconPhone,
} from '@tabler/icons-react';

import DeXuatHachToanTab   from './tabs/DeXuatHachToan';
import AoDongPhucTab       from './tabs/AoDongPhuc';
import XeVanChuyenTab      from './tabs/XeVanChuyen';
import ThietBiVanPhongTab  from './tabs/ThietBiVanPhong';
import QuyDuPhongTab       from './tabs/QuyDuPhong';
import LienHeVanChuyenTab  from './tabs/LienHeVanChuyen';

type TabId =
  | 'de-xuat-hach-toan'
  | 'ao-dong-phuc'
  | 'xe-van-chuyen'
  | 'thiet-bi-van-phong'
  | 'quy-du-phong'
  | 'lien-he-van-chuyen';

export default function QuanLyHanhChinh() {
  const [activeTab, setActiveTab] = useState<TabId>('de-xuat-hach-toan');

  const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: 'de-xuat-hach-toan',   label: 'Đề xuất & Hạch toán', icon: IconWallet        },
    { id: 'ao-dong-phuc',       label: 'Áo đồng phục',       icon: IconShirt         },
    { id: 'xe-van-chuyen',      label: 'Xe vận chuyển',      icon: IconTruck         },
    { id: 'thiet-bi-van-phong', label: 'Thiết bị văn phòng', icon: IconDeviceDesktop },
    { id: 'quy-du-phong',       label: 'Quỹ dự phòng',       icon: IconPigMoney      },
    { id: 'lien-he-van-chuyen', label: 'Liên hệ vận chuyển', icon: IconPhone         },
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
              Đề xuất & Hạch toán · Áo đồng phục · Xe vận chuyển · Thiết bị văn phòng · Quỹ dự phòng · Liên hệ vận chuyển
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
        {activeTab === 'de-xuat-hach-toan'   ? <DeXuatHachToanTab />   :
         activeTab === 'ao-dong-phuc'        ? <AoDongPhucTab />       :
         activeTab === 'xe-van-chuyen'       ? <XeVanChuyenTab />      :
         activeTab === 'thiet-bi-van-phong'  ? <ThietBiVanPhongTab />  :
         activeTab === 'quy-du-phong'        ? <QuyDuPhongTab />       :
                                               <LienHeVanChuyenTab />}
      </div>
    </div>
  );
}

