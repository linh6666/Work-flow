"use client";

import React from 'react';
import { IconCurrencyDollar, IconReceiptTax, IconBuilding } from '@tabler/icons-react';

export default function ChiPhiPhongBan() {
  const budgets = [
    { department: 'Phòng Kỹ thuật & Sản xuất', allocated: '450 Triệu', spent: '320 Triệu', remaining: '130 Triệu', status: 'Trong hạn mức', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { department: 'Phòng Kinh doanh & Marketing', allocated: '280 Triệu', spent: '210 Triệu', remaining: '70 Triệu', status: 'Trong hạn mức', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { department: 'Phòng Vật tư & Thiết bị', allocated: '600 Triệu', spent: '580 Triệu', remaining: '20 Triệu', status: 'Gần vượt mức', color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { department: 'Hành chính & Quản trị', allocated: '150 Triệu', spent: '110 Triệu', remaining: '40 Triệu', status: 'Trong hạn mức', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  ];

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconCurrencyDollar size={16} className="text-[#406c89]" />
          <h3 className="text-xs font-bold text-slate-800 tracking-tight">Thống kê Chi phí & Ngân sách Phòng ban</h3>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">Đơn vị: VNĐ</span>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">Phòng ban</th>
                <th className="py-2.5 px-3">Ngân sách giao</th>
                <th className="py-2.5 px-3">Đã giải ngân</th>
                <th className="py-2.5 px-3">Còn lại</th>
                <th className="py-2.5 px-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {budgets.map((b, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-800">{b.department}</td>
                  <td className="py-2.5 px-3 text-slate-600">{b.allocated}</td>
                  <td className="py-2.5 px-3 text-indigo-600 font-medium">{b.spent}</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-medium">{b.remaining}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${b.color}`}>
                      {b.status}
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
