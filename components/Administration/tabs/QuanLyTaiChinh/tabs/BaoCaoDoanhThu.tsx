"use client";

import React from 'react';
import { IconFileText, IconFileSpreadsheet, IconBuildingBank } from '@tabler/icons-react';

export default function BaoCaoDoanhThuTab() {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <IconFileText size={16} className="text-[#406c89]" />
            <p className="text-[11px] font-semibold text-slate-500">Thu từ Hợp đồng</p>
          </div>
          <p className="text-xl font-extrabold text-slate-800">1.560.000.000đ</p>
          <p className="text-[10px] text-slate-400 mt-1">Chiếm 98% tổng thu</p>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <IconFileSpreadsheet size={16} className="text-amber-500" />
            <p className="text-[11px] font-semibold text-slate-500">Thu từ Báo giá lẻ</p>
          </div>
          <p className="text-xl font-extrabold text-slate-800">15.000.000đ</p>
          <p className="text-[10px] text-slate-400 mt-1">Dịch vụ tư vấn & phát sinh</p>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <IconBuildingBank size={16} className="text-emerald-500" />
            <p className="text-[11px] font-semibold text-slate-500">Thu tài chính khác</p>
          </div>
          <p className="text-xl font-extrabold text-slate-800">0đ</p>
          <p className="text-[10px] text-slate-400 mt-1">Lãi tiền gửi / Khác</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-800 mb-3">Chi tiết báo cáo doanh thu Quý 3/2026</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold">
              <tr>
                <th className="p-2.5">Hạng mục</th>
                <th className="p-2.5">Số lượng HĐ</th>
                <th className="p-2.5">Doanh thu dự kiến</th>
                <th className="p-2.5">Thực nhận</th>
                <th className="p-2.5">Tỷ lệ hoàn thành</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              <tr>
                <td className="p-2.5 font-bold">Dự án Mô hình Kiến trúc</td>
                <td className="p-2.5">4</td>
                <td className="p-2.5">4.230.000.000đ</td>
                <td className="p-2.5 text-emerald-600 font-bold">1.560.000.000đ</td>
                <td className="p-2.5">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 font-bold">36.8%</span>
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">Dịch vụ Tư vấn Thiết kế</td>
                <td className="p-2.5">2</td>
                <td className="p-2.5">45.000.000đ</td>
                <td className="p-2.5 text-emerald-600 font-bold">15.000.000đ</td>
                <td className="p-2.5">
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 font-bold">33.3%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
