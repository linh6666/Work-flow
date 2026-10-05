"use client";

import React from 'react';
import {
  IconUsers,
  IconFileText,
  IconSignature,
  IconTrendingUp,
  IconArrowUpRight,
  IconPlus,
  IconFileDescription,
  IconClock,
  IconChecklist,
  IconRefresh,
} from '@tabler/icons-react';

interface TongQuanKinhDoanhProps {
  onNavigateTab?: (tabId: any) => void;
}

export default function TongQuanKinhDoanhTab({ onNavigateTab }: TongQuanKinhDoanhProps) {
  // Demo statistics overview for Kinh Doanh
  const stats = [
    {
      id: 'khach-hang',
      title: 'Tổng Khách hàng',
      value: '48',
      change: '+12% tháng này',
      isPositive: true,
      icon: IconUsers,
      color: 'bg-blue-500',
      lightBg: 'bg-blue-50 text-blue-600',
      borderColor: 'border-blue-100',
    },
    {
      id: 'de-xuat-bao-gia',
      title: 'Đề xuất Báo giá',
      value: '15',
      change: '4 chờ duyệt',
      isPositive: true,
      icon: IconFileDescription,
      color: 'bg-purple-500',
      lightBg: 'bg-purple-50 text-purple-600',
      borderColor: 'border-purple-100',
    },
    {
      id: 'bao-gia',
      title: 'Báo giá đã gửi',
      value: '24',
      change: 'Tổng 3.45 Tỷ',
      isPositive: true,
      icon: IconFileText,
      color: 'bg-amber-500',
      lightBg: 'bg-amber-50 text-amber-600',
      borderColor: 'border-amber-100',
    },
    {
      id: 'hop-dong',
      title: 'Hợp đồng hiệu lực',
      value: '18',
      change: 'Tổng 5.2 Tỷ',
      isPositive: true,
      icon: IconSignature,
      color: 'bg-emerald-500',
      lightBg: 'bg-emerald-50 text-emerald-600',
      borderColor: 'border-emerald-100',
    },
  ];

  // Demo recent activities / quotes / production requests
  const recentActivities = [
    {
      id: 1,
      title: 'Báo giá dự án VSIP Lạng Sơn',
      code: 'BG-2026-089',
      client: 'Công ty CP VSIP',
      amount: '1.250.000.000 đ',
      status: 'Mới tạo',
      statusBg: 'bg-blue-50 text-blue-700 border-blue-200',
      time: '10 phút trước',
    },
    {
      id: 2,
      title: 'Hợp đồng thi công sa bàn 22 Liễu Giai',
      code: 'HĐ-2026-042',
      client: 'Tập đoàn BRG',
      amount: '890.000.000 đ',
      status: 'Đã ký kết',
      statusBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      time: '1 giờ trước',
    },
    {
      id: 3,
      title: 'Yêu cầu sản xuất sa bàn Flamingo Đông Anh',
      code: 'YCSX-2026-015',
      client: 'Flamingo Group',
      amount: '450.000.000 đ',
      status: 'Đang sản xuất',
      statusBg: 'bg-amber-50 text-amber-700 border-amber-200',
      time: '3 giờ trước',
    },
    {
      id: 4,
      title: 'Đề xuất báo giá Khu đô thị Nam Thăng Long',
      code: 'DXBG-2026-104',
      client: 'Ciputra Hanoi',
      amount: '2.100.000.000 đ',
      status: 'Chờ phê duyệt',
      statusBg: 'bg-purple-50 text-purple-700 border-purple-200',
      time: 'Hôm qua',
    },
  ];

  const pendingApprovals = [
    { id: 1, name: 'Phê duyệt báo giá BG-2026-088 (Dự án EcoPark)', author: 'Nguyễn Văn A', date: '05/10/2026' },
    { id: 2, name: 'Đánh giá năng lực Khách hàng Vingroup', author: 'Trần Thị B', date: '04/10/2026' },
    { id: 3, name: 'Duyệt phụ lục hợp đồng HĐ-2026-038', author: 'Lê Văn C', date: '04/10/2026' },
  ];

  return (
    <div className="flex flex-col h-full bg-white space-y-4 p-1 overflow-y-auto">
      {/* 1. TOP STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onNavigateTab && onNavigateTab(item.id)}
              className={`bg-white rounded-xl p-4 border ${item.borderColor} shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${item.lightBg}`}>
                  <IconComp size={20} />
                </div>
                <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-0.5 group-hover:text-[#406c89] transition-colors">
                  {item.change}
                  <IconArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">{item.title}</p>
                <p className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* LEFT & CENTER: RECENT BUSINESS ACTIVITIES */}
        <div className="lg:col-span-2 space-y-5">
          {/* Recent Operations */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-[#eef4f7] text-[#406c89]">
                  <IconTrendingUp size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Hoạt động Kinh doanh gần đây</h3>
                  <p className="text-[11px] text-slate-500">Cập nhật tiến độ báo giá, hợp đồng & sản xuất mới nhất</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab && onNavigateTab('bao-gia')}
                className="text-xs font-semibold text-[#406c89] hover:underline cursor-pointer"
              >
                Xem tất cả
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {recentActivities.map((act) => (
                <div key={act.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 hover:bg-slate-50/60 p-2 rounded-lg transition-colors">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-800 truncate">{act.title}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                        {act.code}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span>{act.client}</span>
                      <span>•</span>
                      <span className="font-semibold text-slate-700">{act.amount}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${act.statusBg}`}>
                      {act.status}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <IconClock size={11} />
                      {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-gradient-to-r from-slate-900 to-[#2c4759] rounded-xl p-5 text-white shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold">Thao tác nhanh Phòng Kinh doanh</h4>
                <p className="text-xs text-slate-300 mt-0.5">Tạo nhanh thông tin khách hàng, báo giá hoặc đề xuất mới</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
              <button
                type="button"
                onClick={() => onNavigateTab && onNavigateTab('khach-hang')}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold backdrop-blur-xs transition-all text-left cursor-pointer"
              >
                <IconPlus size={14} className="text-blue-400" />
                <span>Thêm khách hàng</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab && onNavigateTab('de-xuat-bao-gia')}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold backdrop-blur-xs transition-all text-left cursor-pointer"
              >
                <IconPlus size={14} className="text-purple-400" />
                <span>Tạo đề xuất BG</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab && onNavigateTab('bao-gia')}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold backdrop-blur-xs transition-all text-left cursor-pointer"
              >
                <IconPlus size={14} className="text-amber-400" />
                <span>Lập báo giá mới</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab && onNavigateTab('yeu-cau-san-xuat')}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold backdrop-blur-xs transition-all text-left cursor-pointer"
              >
                <IconPlus size={14} className="text-emerald-400" />
                <span>Tạo YC Sản xuất</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PENDING APPROVALS & SUMMARY METRICS */}
        <div className="space-y-5">
          {/* Pending Approvals */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-amber-50 text-amber-600">
                  <IconChecklist size={18} />
                </div>
                <h3 className="text-sm font-bold text-slate-800">Cần phê duyệt & Đánh giá</h3>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-full">
                {pendingApprovals.length}
              </span>
            </div>

            <div className="space-y-3">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
                  <p className="text-xs font-semibold text-slate-800 leading-snug">{item.name}</p>
                  <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500">
                    <span>Người gửi: {item.author}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab && onNavigateTab('phe-duyet-danh-gia')}
              className="w-full mt-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors text-center block cursor-pointer"
            >
              Chuyển đến Phê duyệt & Đánh giá
            </button>
          </div>

          {/* Quick Business KPI Summary */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-4 sm:p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Chỉ số Kinh doanh chính</h3>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Chỉ tiêu doanh số Q4</span>
                  <span className="text-[#406c89]">75%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-[#406c89] h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Tỷ lệ chốt Báo giá</span>
                  <span className="text-emerald-600">64%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
