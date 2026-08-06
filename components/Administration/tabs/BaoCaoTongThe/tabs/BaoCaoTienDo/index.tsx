"use client";

import React from 'react';
import { IconTrendingUp, IconCheck, IconAlertTriangle, IconClock } from '@tabler/icons-react';

export default function BaoCaoTienDo() {
  const projects = [
    { id: 1, name: 'Dự án VSIP Lạng Sơn', manager: 'Nguyễn Văn A', progress: 75, deadline: '30/08/2026', status: 'Đúng tiến độ', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    { id: 2, name: 'Tòa nhà 22 Liễu Giai', manager: 'Trần Thị B', progress: 45, deadline: '15/09/2026', status: 'Chậm tiến độ', statusColor: 'bg-rose-50 text-rose-600 border-rose-200' },
    { id: 3, name: 'Flamingo Đông Anh', manager: 'Lê Văn C', progress: 90, deadline: '20/08/2026', status: 'Sắp hoàn thành', statusColor: 'bg-blue-50 text-blue-600 border-blue-200' },
    { id: 4, name: 'KĐT Vinhomes Ocean Park', manager: 'Phạm Minh D', progress: 30, deadline: '10/10/2026', status: 'Đúng tiến độ', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  ];

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconTrendingUp size={16} className="text-[#406c89]" />
          <h3 className="text-xs font-bold text-slate-800 tracking-tight">Báo cáo Tiến độ Dự án</h3>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">Cập nhật: Hôm nay</span>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">Tên Dự án</th>
                <th className="py-2.5 px-3">Người phụ trách</th>
                <th className="py-2.5 px-3">Tiến độ (%)</th>
                <th className="py-2.5 px-3">Hạn hoàn thành</th>
                <th className="py-2.5 px-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-800">{p.name}</td>
                  <td className="py-2.5 px-3 text-slate-600">{p.manager}</td>
                  <td className="py-2.5 px-3 w-44">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            p.progress >= 80 ? 'bg-emerald-500' : p.progress >= 50 ? 'bg-indigo-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-600 w-8">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">{p.deadline}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${p.statusColor}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
