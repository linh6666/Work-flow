"use client";

import React, { useState } from 'react';
import {
  IconChartBar,
  IconFolder,
  IconClock,
  IconCheck,
  IconAlertTriangle,
  IconTrendingUp,
  IconFilter,
  IconCalendar
} from '@tabler/icons-react';

export default function TongQuatDuAn() {
  const [filterPeriod, setFilterPeriod] = useState('thang-nay');

  const stats = [
    { label: 'Tổng dự án', count: '18', change: '+2 so với tháng trước', icon: IconFolder, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { label: 'Đang triển khai', count: '12', change: '8 đúng tiến độ', icon: IconClock, color: 'text-amber-600 bg-amber-50 border-amber-100' },
    { label: 'Đã hoàn thành', count: '5', change: '100% đạt nghiệm thu', icon: IconCheck, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { label: 'Cần chú ý', count: '1', change: 'Chậm tiến độ 2 ngày', icon: IconAlertTriangle, color: 'text-rose-600 bg-rose-50 border-rose-100' },
  ];

  const projectProgressList = [
    { name: 'Dự án Căn hộ Cao cấp Vinhomes Central', code: 'DA-2026-001', category: 'Thiết kế & Khai triển', progress: 75, leader: 'Trần Văn A', status: 'Đúng tiến độ', dueDate: '30/08/2026' },
    { name: 'Khách sạn Resort Novaworld Phan Thiết', code: 'DA-2026-002', category: 'Mộc Sơn & Công nghệ', progress: 45, leader: 'Nguyễn Thị B', status: 'Đúng tiến độ', dueDate: '15/09/2026' },
    { name: 'Showroom Nội thất cao cấp Sun Group', code: 'DA-2026-003', category: 'Thi công Cảnh quan', progress: 90, leader: 'Lê Hoàng C', status: 'Sắp hoàn thành', dueDate: '10/08/2026' },
    { name: 'Biệt thự Đảo Ecopark Hưng Yên', code: 'DA-2026-004', category: 'Cắt & Ghép sản xuất', progress: 30, leader: 'Phạm Minh D', status: 'Cần chú ý', dueDate: '05/10/2026' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#fafbfc] overflow-hidden select-none">
      
      {/* 1. STICKY HEADER */}
      <div className="sticky top-0 z-10 bg-[#fafbfc] px-4 sm:px-8 pt-6 pb-4 border-b border-slate-100 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <div>
            <div className="flex items-center gap-2 text-[#406c89]">
              <IconChartBar size={20} className="text-[#406c89] stroke-[2.25]" />
              <span className="text-lg font-bold text-slate-900 tracking-tight">Tổng quát Dự án</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Thống kê tổng quan tiến độ, chi phí và trạng thái các dự án
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-2xs">
              <IconCalendar size={14} className="text-slate-400" />
              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="thang-nay">Tháng này</option>
                <option value="quyt-nay">Quý này</option>
                <option value="nam-nay">Năm 2026</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-5 space-y-6">
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-2xs flex flex-col justify-between text-left hover:border-slate-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">{item.label}</span>
                  <div className={`p-2 rounded-lg border ${item.color}`}>
                    <Icon size={16} />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-2xl font-bold text-slate-800 tracking-tight">{item.count}</span>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{item.change}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tiến độ chi tiết từng dự án */}
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-2xs p-5 text-left space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm tracking-tight">Tiến độ thực hiện các dự án trọng điểm</h3>
            <span className="text-xs font-semibold text-[#406c89] hover:underline cursor-pointer">Xem tất cả ({projectProgressList.length})</span>
          </div>

          <div className="space-y-4 divide-y divide-slate-100">
            {projectProgressList.map((item, idx) => (
              <div key={idx} className={`${idx > 0 ? 'pt-4' : ''} space-y-2`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-xs">{item.name}</span>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{item.code}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">Phân loại: {item.category} • QLDA: {item.leader}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      item.status === 'Sắp hoàn thành' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      item.status === 'Cần chú ý' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                      'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {item.status}
                    </span>
                    <span className="text-xs font-bold text-slate-700 w-12 text-right">{item.progress}%</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.progress >= 90 ? 'bg-emerald-500' :
                      item.progress < 40 ? 'bg-amber-500' : 'bg-[#406c89]'
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
