"use client";

import React, { useState } from 'react';
import {
  IconUsers,
  IconFileDescription,
  IconFileText,
  IconSignature,
  IconBuildingFactory2,
  IconReportAnalytics,
  IconChartBar,
} from '@tabler/icons-react';

import KhachHangTab from './tabs/KhachHang';
import DeXuatBaoGiaTab from './tabs/DeXuatBaoGia';
import BaoGiaTab from './tabs/BaoGia';
import HopDongTab from './tabs/HopDong';
import YeuCauSanXuatTab from './tabs/YeuCauSanXuat';
import BaoCaoCvKdTab from './tabs/BaoCaoCvKd';
import PheDuyetDanhGiaTab from './tabs/PheDuyetDanhGia';

export default function QuanLyKinhDoanh() {
  const [activeTab, setActiveTab] = useState<
    | 'khach-hang'
    | 'de-xuat-bao-gia'
    | 'bao-gia'
    | 'hop-dong'
    | 'yeu-cau-san-xuat'
    | 'bao-cao-cv-kd'
    | 'phe-duyet-danh-gia'
  >('khach-hang');

  const tabs = [
    { id: 'khach-hang', label: 'Khách hàng', icon: IconUsers },
    { id: 'de-xuat-bao-gia', label: 'Đề xuất báo giá', icon: IconFileDescription },
    { id: 'bao-gia', label: 'Báo giá', icon: IconFileText },
    { id: 'hop-dong', label: 'Hợp đồng', icon: IconSignature },
    { id: 'yeu-cau-san-xuat', label: 'Yêu cầu sản xuất', icon: IconBuildingFactory2 },
    { id: 'bao-cao-cv-kd', label: 'Báo cáo CV KD', icon: IconReportAnalytics },
    { id: 'phe-duyet-danh-gia', label: 'Phê duyệt & Đánh giá', icon: IconChartBar },
  ] as const;

  return (
    <div className="flex-1 flex flex-col bg-[#fafbfc] overflow-hidden select-none">
      {/* 1. TOP HEADER & BREADCRUMB */}
      <div className="sticky top-0 z-10 bg-[#fafbfc] px-4 sm:px-6 pt-3 pb-0 border-b border-slate-200/80 shrink-0">
        <div className="mb-2">
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">Quản lý Kinh doanh</h1>
          <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
            Khách hàng · Đề xuất báo giá · Báo giá · Hợp đồng · Yêu cầu sản xuất · Báo cáo CV KD · Phê duyệt & Đánh giá
          </p>
        </div>

        {/* 2. SUB-TABS NAVIGATION BAR */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar pt-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
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
                <Icon size={14} className={isActive ? 'text-[#406c89]' : 'text-slate-400'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. TAB CONTENT */}
      <div className="flex-1 flex flex-col min-h-0 px-4 sm:px-6 py-3 overflow-hidden">
        {activeTab === 'khach-hang' ? (
          <KhachHangTab />
        ) : activeTab === 'de-xuat-bao-gia' ? (
          <DeXuatBaoGiaTab />
        ) : activeTab === 'bao-gia' ? (
          <BaoGiaTab />
        ) : activeTab === 'hop-dong' ? (
          <HopDongTab />
        ) : activeTab === 'yeu-cau-san-xuat' ? (
          <YeuCauSanXuatTab />
        ) : activeTab === 'bao-cao-cv-kd' ? (
          <BaoCaoCvKdTab />
        ) : (
          <PheDuyetDanhGiaTab />
        )}
      </div>
    </div>
  );
}
