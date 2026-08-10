"use client";

import React from 'react';
import { formatCurrency } from '../types';

export default function BaoCaoTienLuongTab() {
  const luongList = [
    { phong: 'Phòng Mộc Sơn', soNguoi: 12, quyLuong: 120_000_000, trangThai: 'Chờ thanh toán', ngay: '31/07/2026' },
    { phong: 'Phòng Thiết kế & Mô hình', soNguoi: 8, quyLuong: 95_000_000, trangThai: 'Đã thanh toán', ngay: '05/07/2026' },
    { phong: 'Phòng Kinh doanh & Dự án', soNguoi: 5, quyLuong: 65_000_000, trangThai: 'Đã thanh toán', ngay: '05/07/2026' },
    { phong: 'Ban Giám đốc & Hành chính', soNguoi: 4, quyLuong: 70_000_000, trangThai: 'Đã thanh toán', ngay: '05/07/2026' },
  ];

  return (
    <div className="flex-1 overflow-y-auto space-y-4 pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Tổng quỹ lương T7</p>
          <p className="text-xl font-extrabold text-slate-800 mt-1">350.000.000đ</p>
          <span className="text-[10px] text-slate-400">29 Nhân sự</span>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Đã chi trả</p>
          <p className="text-xl font-extrabold text-emerald-600 mt-1">230.000.000đ</p>
          <span className="text-[10px] text-emerald-600 font-medium">3 phòng ban</span>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Chờ thanh toán</p>
          <p className="text-xl font-extrabold text-amber-500 mt-1">120.000.000đ</p>
          <span className="text-[10px] text-amber-600 font-medium">Lương SX T7</span>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Trung bình/nhân sự</p>
          <p className="text-xl font-extrabold text-[#406c89] mt-1">12.06M</p>
          <span className="text-[10px] text-slate-400">VNĐ/tháng</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-800 mb-3">Danh sách Chi trả Lương theo Phòng Ban</h3>
        <div className="divide-y divide-slate-100">
          {luongList.map((item, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-700">{item.phong}</p>
                <p className="text-[10px] text-slate-400">
                  {item.soNguoi} nhân sự · Kỳ lương: {item.ngay}
                </p>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-slate-800">{formatCurrency(item.quyLuong)}</p>
                <span
                  className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${
                    item.trangThai === 'Đã thanh toán'
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      : 'bg-amber-50 text-amber-600 border-amber-200'
                  }`}
                >
                  {item.trangThai}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
