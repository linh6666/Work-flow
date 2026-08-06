"use client";

import React from 'react';
import { IconChartBar, IconCheck, IconX, IconClock } from '@tabler/icons-react';

export default function PheDuyetBaoCao() {
  const reports = [
    { title: 'Báo cáo Vật tư Phát sinh - Dự án VSIP', sender: 'Đội trưởng Thi công', date: '05/08/2026', priority: 'Cao', priorityColor: 'bg-rose-50 text-rose-600 border-rose-200' },
    { title: 'Báo cáo Tiến độ Tuần 31 - Khối Kỹ thuật', sender: 'Trưởng phòng Kỹ thuật', date: '04/08/2026', priority: 'Trung bình', priorityColor: 'bg-amber-50 text-amber-600 border-amber-200' },
    { title: 'Báo cáo Đề xuất Báo giá Flamingo', sender: 'Phòng Kinh doanh', date: '03/08/2026', priority: 'Thấp', priorityColor: 'bg-slate-50 text-slate-600 border-slate-200' },
  ];

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconChartBar size={16} className="text-[#406c89]" />
          <h3 className="text-xs font-bold text-slate-800 tracking-tight">Danh sách Báo cáo chờ BGĐ Phê duyệt</h3>
        </div>
        <span className="text-[11px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
          Chờ duyệt: {reports.length}
        </span>
      </div>

      <div className="divide-y divide-slate-100 bg-white border border-slate-200/80 rounded-lg shadow-2xs">
        {reports.map((r, idx) => (
          <div key={idx} className="p-3 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-slate-800">{r.title}</h4>
                <span className={`text-[10px] font-bold px-2 py-0.2 rounded border ${r.priorityColor}`}>
                  Mức độ: {r.priority}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Gửi bởi: <span className="text-slate-600 font-medium">{r.sender}</span> • Ngày gửi: {r.date}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded cursor-pointer transition-colors">
                <IconCheck size={13} />
                Duyệt
              </button>
              <button className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-[11px] font-bold rounded cursor-pointer transition-colors border border-slate-200">
                <IconX size={13} />
                Từ chối
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
