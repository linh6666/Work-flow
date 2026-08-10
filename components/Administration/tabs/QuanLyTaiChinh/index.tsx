"use client";

import React, { useState } from 'react';
import {
  IconWallet,
  IconTrendingUp,
  IconChartBar,
  IconCash,
  IconFileCheck,
} from '@tabler/icons-react';

import ThuChiNoiBoTab from './tabs/ThuChiNoiBo';
import TheoDoiDoanhThuTab from './tabs/TheoDoiDoanhThu';
import BaoCaoDoanhThuTab from './tabs/BaoCaoDoanhThu';
import BaoCaoTienLuongTab from './tabs/BaoCaoTienLuong';
import DeXuatDuyetChiTab from './tabs/DeXuatDuyetChi';

export default function QuanLyTaiChinh() {
  const [activeTab, setActiveTab] = useState<
    'thu-chi' | 'theo-doi-doanh-thu' | 'bao-cao-doanh-thu' | 'bao-cao-tien-luong' | 'de-xuat-duyet-chi'
  >('thu-chi');

  const TABS = [
    { id: 'thu-chi', label: 'Thu chi Nội Bộ', icon: IconWallet },
    { id: 'theo-doi-doanh-thu', label: 'Theo dõi Doanh thu', icon: IconTrendingUp },
    { id: 'bao-cao-doanh-thu', label: 'Báo cáo Doanh thu', icon: IconChartBar },
    { id: 'bao-cao-tien-luong', label: 'Báo cáo tiền Lương', icon: IconCash },
    { id: 'de-xuat-duyet-chi', label: 'Đề xuất duyệt chi/tạm ứng', icon: IconFileCheck },
  ] as const;

  return (
    <div className="flex-1 flex flex-col overflow-hidden p-5 md:p-6 space-y-4 text-slate-700 w-full bg-slate-50">
      {/* Header & Sub-tabs */}
      <div className="space-y-3 shrink-0">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Quản lý Tài chính</h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Thu chi nội bộ · Doanh thu · Cân đối thu chi · Tiền lương · Đề xuất duyệt chi/tạm ứng
          </p>
        </div>

        {/* Tab Navigation Bar (Flat Underline Tabs matching image) */}
        <div className="border-b border-slate-200/80 pt-1">
          <div className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
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
        {activeTab === 'thu-chi' ? (
          <ThuChiNoiBoTab />
        ) : activeTab === 'theo-doi-doanh-thu' ? (
          <TheoDoiDoanhThuTab />
        ) : activeTab === 'bao-cao-doanh-thu' ? (
          <BaoCaoDoanhThuTab />
        ) : activeTab === 'bao-cao-tien-luong' ? (
          <BaoCaoTienLuongTab />
        ) : (
          <DeXuatDuyetChiTab />
        )}
      </div>
    </div>
  );
}
