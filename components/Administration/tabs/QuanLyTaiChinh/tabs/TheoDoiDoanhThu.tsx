"use client";

import React from 'react';
import { formatCurrency } from '../types';

export default function TheoDoiDoanhThuTab() {
  const duAnData = [
    { ten: 'VSIP LẠNG SƠN', tong: 850_000_000, daThu: 320_000_000, conLai: 530_000_000, tienDo: 38 },
    { ten: '22 LIỄU GIAI', tong: 1_200_000_000, daThu: 450_000_000, conLai: 750_000_000, tienDo: 37.5 },
    { ten: 'THE HERITAGE TÂY NINH', tong: 1_500_000_000, daThu: 580_000_000, conLai: 920_000_000, tienDo: 38.6 },
    { ten: 'FLAMINGO ĐÔNG ANH', tong: 680_000_000, daThu: 210_000_000, conLai: 470_000_000, tienDo: 30.8 },
  ];

  return (
    <div className="flex-1 overflow-y-auto space-y-4 pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Doanh thu mục tiêu</p>
          <p className="text-xl font-extrabold text-slate-800 mt-1">4.23 Tỷ</p>
          <span className="text-[10px] text-emerald-600 font-semibold">+12% so với tháng trước</span>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Đã thực nhận</p>
          <p className="text-xl font-extrabold text-emerald-600 mt-1">1.56 Tỷ</p>
          <span className="text-[10px] text-slate-400">36.8% tổng giá trị</span>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Còn phải thu</p>
          <p className="text-xl font-extrabold text-amber-500 mt-1">2.67 Tỷ</p>
          <span className="text-[10px] text-amber-600 font-medium">4 hợp đồng đang thực hiện</span>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Tỷ lệ thu hồi nợ</p>
          <p className="text-xl font-extrabold text-[#406c89] mt-1">85.4%</p>
          <span className="text-[10px] text-slate-400">Tốt</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-800 mb-3">Theo dõi dòng tiền thu theo dự án</h3>
        <div className="space-y-4">
          {duAnData.map((d, i) => (
            <div key={i} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold text-slate-700">{d.ten}</span>
                <span className="text-slate-500">
                  <strong className="text-emerald-600">{formatCurrency(d.daThu)}</strong> / {formatCurrency(d.tong)}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                <div
                  className="bg-[#406c89] h-full rounded-full transition-all duration-500"
                  style={{ width: `${d.tienDo}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
