"use client";

import React from 'react';
import { IconFlag, IconCheck, IconClock } from '@tabler/icons-react';

export default function NghiemThu() {
  const items = [
    { project: 'VSIP Lạng Sơn - Giai đoạn 1', stage: 'Nghiệm thu 80%', value: '1.2 Tỷ', status: 'Đã nghiệm thu', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { project: 'VSIP Lạng Sơn - Giai đoạn 2', stage: 'Nghiệm thu 100%', value: '1.5 Tỷ', status: 'Chờ duyệt BGĐ', color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { project: 'Flamingo Đông Anh', stage: 'Nghiệm thu 80%', value: '850 Triệu', status: 'Đã nghiệm thu', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { project: 'Tòa nhà 22 Liễu Giai', stage: 'Nghiệm thu 100%', value: '2.1 Tỷ', status: 'Đang rà soát hồ sơ', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  ];

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconFlag size={16} className="text-[#406c89]" />
          <h3 className="text-xs font-bold text-slate-800 tracking-tight">Báo cáo Nghiệm thu Dự án (80% / 100%)</h3>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">Tổng giá trị: 5.65 Tỷ</span>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">Hạng mục Dự án</th>
                <th className="py-2.5 px-3">Giai đoạn nghiệm thu</th>
                <th className="py-2.5 px-3">Giá trị nghiệm thu</th>
                <th className="py-2.5 px-3">Trạng thái phê duyệt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-800">{item.project}</td>
                  <td className="py-2.5 px-3 text-slate-600">{item.stage}</td>
                  <td className="py-2.5 px-3 font-bold text-[#406c89]">{item.value}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.color}`}>
                      {item.status}
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
