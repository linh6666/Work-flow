"use client";

import React from 'react';
import { IconUsers, IconBriefcase, IconChecklist } from '@tabler/icons-react';

export default function NhanSuCongViec() {
  const departments = [
    { name: 'Khối Thiết kế & Ý tưởng', staffCount: 12, totalTasks: 45, completedTasks: 38, efficiency: '84%' },
    { name: 'Khối Sản xuất & Chế tạo', staffCount: 18, totalTasks: 62, completedTasks: 51, efficiency: '82%' },
    { name: 'Khối Kinh doanh & Dự án', staffCount: 8, totalTasks: 28, completedTasks: 25, efficiency: '89%' },
    { name: 'Phòng Hành chính Nhân sự', staffCount: 5, totalTasks: 19, completedTasks: 18, efficiency: '94%' },
  ];

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconUsers size={16} className="text-[#406c89]" />
          <h3 className="text-xs font-bold text-slate-800 tracking-tight">Phân bổ Nhân sự & Công việc Phòng ban</h3>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">Tổng cộng: 43 Nhân sự</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {departments.map((dep, idx) => (
          <div key={idx} className="bg-white border border-slate-200/80 rounded-lg p-3.5 shadow-2xs hover:border-slate-300 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800">{dep.name}</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-[#406c89] rounded-full">
                {dep.staffCount} Nhân sự
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              <span>Nhiệm vụ được giao: <strong className="text-slate-700">{dep.totalTasks}</strong></span>
              <span>Đã xong: <strong className="text-emerald-600">{dep.completedTasks}</strong></span>
              <span>Hiệu suất: <strong className="text-indigo-600">{dep.efficiency}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
