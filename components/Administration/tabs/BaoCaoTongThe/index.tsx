"use client";

import React, { useState } from 'react';
import {
  IconFolder,
  IconRefresh,
  IconCircleCheck,
  IconFlag,
  IconUsers,
  IconTrendingUp,
  IconCurrencyDollar,
  IconChartBar,
  IconShieldExclamation
} from '@tabler/icons-react';

import BaoCaoTienDo from './tabs/BaoCaoTienDo';
import NhanSuCongViec from './tabs/NhanSuCongViec';
import ChiPhiPhongBan from './tabs/ChiPhiPhongBan';
import PheDuyetBaoCao from './tabs/PheDuyetBaoCao';
import NghiemThu from './tabs/NghiemThu';
import RaSoatViPham from './tabs/RaSoatViPham';

export default function BaoCaoTongThe() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('tiendo');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const statCards = [
    {
      title: 'Dự án đang triển khai',
      value: '11',
      icon: IconFolder,
      iconColor: 'text-indigo-600',
      valueColor: 'text-indigo-600',
    },
    {
      title: 'Báo cáo chờ duyệt',
      value: '138',
      icon: IconCircleCheck,
      iconColor: 'text-amber-500',
      valueColor: 'text-amber-600',
    },
    {
      title: 'Nghiệm thu chờ BGĐ',
      value: '0',
      icon: IconFlag,
      iconColor: 'text-slate-400',
      valueColor: 'text-slate-600',
    },
    {
      title: 'Phòng có dữ liệu',
      value: '105',
      icon: IconUsers,
      iconColor: 'text-emerald-500',
      valueColor: 'text-emerald-600',
    },
  ];

  const subTabs = [
    { id: 'tiendo', label: 'Báo cáo Tiến độ', icon: IconTrendingUp },
    { id: 'nhansu', label: 'Nhân sự & Công việc', icon: IconUsers },
    { id: 'chiphi', label: 'Chi phí Phòng ban', icon: IconCurrencyDollar },
    { id: 'pheduyet', label: 'Phê duyệt Báo cáo', icon: IconChartBar },
    { id: 'nghiemthu', label: 'Nghiệm thu 80%/100%', icon: IconFlag },
    { id: 'vipham', label: 'Rà soát vi phạm', icon: IconShieldExclamation },
  ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'tiendo':
        return <BaoCaoTienDo />;
      case 'nhansu':
        return <NhanSuCongViec />;
      case 'chiphi':
        return <ChiPhiPhongBan />;
      case 'pheduyet':
        return <PheDuyetBaoCao />;
      case 'nghiemthu':
        return <NghiemThu />;
      case 'vipham':
        return <RaSoatViPham />;
      default:
        return <BaoCaoTienDo />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fafbfc] overflow-hidden select-none p-3 sm:p-4 space-y-3">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left">
        <div className="flex items-start gap-2">
          <IconFolder size={18} className="text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-tight">
              Báo cáo Tổng thể các Dự án
            </h1>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
              Tổng hợp tiến độ, chi phí, nhân sự, phê duyệt & nghiệm thu của toàn bộ dự án đang triển khai
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 text-[11px] font-medium rounded-md shadow-2xs transition-all cursor-pointer"
          >
            <IconRefresh size={13} className={`text-slate-500 ${isRefreshing ? 'animate-spin' : ''}`} />
            Làm mới
          </button>
        </div>
      </div>

      {/* STAT CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx} 
              className="bg-white border border-slate-200/80 rounded-lg p-3 shadow-2xs text-left hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center gap-1.5">
                <Icon size={15} className={card.iconColor} />
                <span className="text-[11px] font-medium text-slate-500">{card.title}</span>
              </div>
              <div className="mt-1.5">
                <span className={`text-xl font-bold tracking-tight ${card.valueColor}`}>
                  {card.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* SUB-TABS NAVIGATION BAR */}
      <div className="border-b border-slate-200/80 pt-1">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-xs font-medium transition-all cursor-pointer border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#ebf3f8] text-[#406c89] border-[#406c89] font-semibold'
                    : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 border-transparent'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-[#406c89]' : 'text-slate-400'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DYNAMIC TAB CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-0 pt-2 overflow-hidden">
        {renderActiveTabContent()}
      </div>
    </div>
  );
}







