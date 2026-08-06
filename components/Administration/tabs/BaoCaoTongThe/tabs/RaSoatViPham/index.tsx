"use client";

import React from 'react';
import { IconShieldExclamation } from '@tabler/icons-react';

export default function RaSoatViPham() {
  const issues = [
    { code: 'VP-001', title: 'Thiếu hóa đơn chứng từ vật tư phát sinh tháng 7', department: 'Phòng Vật tư', severity: 'Cao', severityColor: 'bg-rose-50 text-rose-600 border-rose-200', status: 'Đang xử lý' },
    { code: 'VP-002', title: 'Chậm nộp báo cáo tiến độ tuần 30 quá 24h', department: 'Khối Thi công', severity: 'Thấp', severityColor: 'bg-slate-50 text-slate-600 border-slate-200', status: 'Đã nhắc nhở' },
    { code: 'VP-003', title: 'Dự toán phát sinh chi phí chưa qua phê duyệt', department: 'Phòng Kỹ thuật', severity: 'Trung bình', severityColor: 'bg-amber-50 text-amber-600 border-amber-200', status: 'Đang rà soát' },
  ];

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconShieldExclamation size={16} className="text-[#406c89]" />
          <h3 className="text-xs font-bold text-slate-800 tracking-tight">Rà soát Vi phạm & Tuân thủ Quy trình</h3>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">Ghi nhận: 3 trường hợp</span>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">Mã VP</th>
                <th className="py-2.5 px-3">Nội dung rà soát</th>
                <th className="py-2.5 px-3">Bộ phận liên quan</th>
                <th className="py-2.5 px-3">Mức độ cảnh báo</th>
                <th className="py-2.5 px-3">Xử lý</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {issues.map((issue, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-700">{issue.code}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">{issue.title}</td>
                  <td className="py-2.5 px-3 text-slate-600">{issue.department}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${issue.severityColor}`}>
                      {issue.severity}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 font-medium">{issue.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
