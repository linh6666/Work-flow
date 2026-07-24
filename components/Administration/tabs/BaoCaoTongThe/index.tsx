"use client";

import React, { useState } from 'react';
import {
  IconReportAnalytics,
  IconDownload,
  IconCalendar,
  IconTrendingUp,
  IconFileSpreadsheet,
  IconUsers,
  IconFileText,
  IconSignature
} from '@tabler/icons-react';

export default function BaoCaoTongThe() {
  const [selectedYear, setSelectedYear] = useState('2026');

  const reportModules = [
    { title: 'Báo cáo Kinh doanh & Doanh thu', desc: 'Thống kê tổng hợp doanh số từ Báo giá và Hợp đồng đã ký kết.', count: '48 Hợp đồng', icon: IconTrendingUp, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
    { title: 'Báo cáo Tiến độ Sản xuất & Dự án', desc: 'Theo dõi tổng số lệnh Yêu cầu sản xuất và tiến độ bàn giao.', count: '12 Dự án', icon: IconFileSpreadsheet, color: 'text-[#406c89] bg-blue-50 border-blue-100' },
    { title: 'Báo cáo Nhân sự & Phân công', desc: 'Thống kê khối lượng công việc được giao theo phòng ban và nhân sự.', count: '35 Nhân viên', icon: IconUsers, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { title: 'Báo cáo Đề xuất & Báo giá', desc: 'Tổng hợp tỷ lệ duyệt Đề xuất Báo giá và giá trị dự toán.', count: '86 Đề xuất', icon: IconFileText, color: 'text-amber-600 bg-amber-50 border-amber-100' },
  ];

  const recentReports = [
    { name: 'Báo cáo Tổng hợp Quý II/2026', type: 'PDF / Excel', date: '20/07/2026', size: '2.4 MB', author: 'Quản trị viên' },
    { name: 'Báo cáo Doanh thu & Hợp đồng Tháng 6', type: 'Excel', date: '01/07/2026', size: '1.8 MB', author: 'Phòng Kinh doanh' },
    { name: 'Báo cáo Phân bổ Nhân sự Khối Kỹ thuật', type: 'PDF', date: '25/06/2026', size: '3.1 MB', author: 'Phó GĐ Kỹ thuật' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#fafbfc] overflow-hidden select-none">
      
      {/* 1. STICKY HEADER */}
      <div className="sticky top-0 z-10 bg-[#fafbfc] px-4 sm:px-8 pt-6 pb-4 border-b border-slate-100 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <div>
            <div className="flex items-center gap-2 text-[#406c89]">
              <IconReportAnalytics size={20} className="text-[#406c89] stroke-[2.25]" />
              <span className="text-lg font-bold text-slate-900 tracking-tight">Báo cáo Tổng thể</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Báo cáo tổng hợp hoạt động kinh doanh, nhân sự và dự án toàn công ty
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-[#406c89] hover:bg-[#345a74] text-white text-xs font-bold rounded-lg shadow-2xs transition-all cursor-pointer">
              <IconDownload size={15} />
              Xuất báo cáo Excel
            </button>
          </div>
        </div>
      </div>

      {/* 2. SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-5 space-y-6">
        
        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportModules.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-2xs text-left hover:border-slate-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl border ${item.color}`}>
                      <Icon size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{item.count}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-xs tracking-tight">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#406c89] hover:underline cursor-pointer">Xem báo cáo chi tiết →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Danh sách Báo cáo gần đây */}
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-2xs p-5 text-left space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm tracking-tight">Tài liệu Báo cáo đã xuất gần đây</h3>
          </div>

          <div className="divide-y divide-slate-100">
            {recentReports.map((report, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#406c89] flex items-center justify-center font-bold text-xs shrink-0">
                    <IconFileSpreadsheet size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">{report.name}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">Tạo bởi: {report.author} • Ngày xuất: {report.date} • {report.size}</p>
                  </div>
                </div>

                <button className="flex items-center gap-1 text-xs font-semibold text-[#406c89] hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                  <IconDownload size={14} />
                  Tải về
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
