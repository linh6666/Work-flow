"use client";

import React, { useState } from 'react';
import {
  IconBuildingWarehouse,
  IconTruckDelivery,
  IconShoppingCart,
  IconPuzzle,
  IconTool,
  IconChartBar,
  IconClipboardCheck,
} from '@tabler/icons-react';

import QuanLyNVLTab       from './tabs/QuanLyNVL';
import QuanLyNCCTab       from './tabs/QuanLyNCC';
import MuaNVLThangTab     from './tabs/MuaNVLThang';
import PhuKienMHTab       from './tabs/QuanLyPhuKienMH';
import MayMocTBTab        from './tabs/QuanLyMayMocTB';
import KeHoachBaoCaoTab   from './tabs/KeHoachBaoCao';
import PheDuyetDanhGiaTab from './tabs/PheDuyetDanhGia';

type TabId =
  | 'quan-ly-nvl'
  | 'quan-ly-ncc'
  | 'mua-nvl-thang'
  | 'quan-ly-phu-kien'
  | 'quan-ly-may-moc'
  | 'ke-hoach-bao-cao'
  | 'phe-duyet-danh-gia';

export default function QuanLyKho() {
  const [activeTab, setActiveTab] = useState<TabId>('quan-ly-nvl');

  const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: 'quan-ly-nvl',        label: 'Quản lý NVL',          icon: IconBuildingWarehouse },
    { id: 'quan-ly-ncc',        label: 'Quản lý NCC',          icon: IconTruckDelivery     },
    { id: 'mua-nvl-thang',      label: 'Mua NVL Tháng',        icon: IconShoppingCart      },
    { id: 'quan-ly-phu-kien',   label: 'Quản lý Phụ kiện MH',  icon: IconPuzzle            },
    { id: 'quan-ly-may-moc',    label: 'Quản lý máy móc TB',   icon: IconTool              },
    { id: 'ke-hoach-bao-cao',   label: 'Kế hoạch & Báo cáo',   icon: IconChartBar          },
    { id: 'phe-duyet-danh-gia', label: 'Phê duyệt & Đánh giá', icon: IconClipboardCheck    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden p-5 md:p-6 space-y-4 text-slate-700 w-full bg-slate-50">
      {/* Header & Sub-tabs */}
      <div className="space-y-3 shrink-0">
        <div>
          <h2 className="text-base font-extrabold text-slate-800 tracking-tight">Quản lý Kho</h2>
          <p className="text-[10px] font-medium text-slate-400 mt-0.5">
            NVL · NCC · Mua NVL tháng · Phụ kiện MH · Máy móc TB · Kế hoạch & Báo cáo · Phê duyệt
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
        {activeTab === 'quan-ly-nvl'        ? <QuanLyNVLTab />        :
         activeTab === 'quan-ly-ncc'        ? <QuanLyNCCTab />        :
         activeTab === 'mua-nvl-thang'      ? <MuaNVLThangTab />      :
         activeTab === 'quan-ly-phu-kien'   ? <PhuKienMHTab />        :
         activeTab === 'quan-ly-may-moc'    ? <MayMocTBTab />         :
         activeTab === 'ke-hoach-bao-cao'   ? <KeHoachBaoCaoTab />    :
                                              <PheDuyetDanhGiaTab />}
      </div>
    </div>
  );
}
