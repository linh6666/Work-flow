"use client";

import React from 'react';
import { formatCurrency } from '../types';

export default function DeXuatDuyetChiTab() {
  const deXuatData = [
    {
      id: 'DX-01',
      ten: 'Tạm ứng mua vật liệu mô hình nhựa Mica',
      nguoi: 'Nguyễn Văn A (Mộc Sơn)',
      soTien: 25_000_000,
      ngay: '10/08/2026',
      trangThai: 'Chờ duyệt',
    },
    {
      id: 'DX-02',
      ten: 'Thanh toán phí xe tải vận chuyển mô hình Lạng Sơn',
      nguoi: 'Trần Văn B (Vận tải)',
      soTien: 18_500_000,
      ngay: '08/08/2026',
      trangThai: 'Đã duyệt',
    },
    {
      id: 'DX-03',
      ten: 'Chi phí tiếp khách dự án 22 Liễu Giai',
      nguoi: 'Lê Thị C (Kinh doanh)',
      soTien: 5_200_000,
      ngay: '07/08/2026',
      trangThai: 'Đã duyệt',
    },
    {
      id: 'DX-04',
      ten: 'Tạm ứng phụ cấp thi công công trường Tây Ninh',
      nguoi: 'Hoàng Văn D (Kỹ thuật)',
      soTien: 15_000_000,
      ngay: '05/08/2026',
      trangThai: 'Từ chối',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto space-y-4 pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Tổng đề xuất T8</p>
          <p className="text-xl font-extrabold text-slate-800 mt-1">63.700.000đ</p>
          <span className="text-[10px] text-slate-400">4 đề xuất phát sinh</span>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Đang chờ duyệt</p>
          <p className="text-xl font-extrabold text-amber-500 mt-1">25.000.000đ</p>
          <span className="text-[10px] text-amber-600 font-medium">1 yêu cầu tạm ứng</span>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Đã duyệt chi</p>
          <p className="text-xl font-extrabold text-emerald-600 mt-1">23.700.000đ</p>
          <span className="text-[10px] text-emerald-600 font-medium">2 đề xuất đã chi</span>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Tạm ứng chưa hoàn ứng</p>
          <p className="text-xl font-extrabold text-[#406c89] mt-1">40.000.000đ</p>
          <span className="text-[10px] text-slate-400">2 nhân sự</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-800 mb-3">Danh sách Đề xuất Duyệt chi & Tạm ứng</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold">
              <tr>
                <th className="p-2.5">Mã DX</th>
                <th className="p-2.5">Nội dung đề xuất</th>
                <th className="p-2.5">Người đề xuất</th>
                <th className="p-2.5">Số tiền</th>
                <th className="p-2.5">Ngày</th>
                <th className="p-2.5">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {deXuatData.map((dx) => (
                <tr key={dx.id} className="hover:bg-slate-50/60">
                  <td className="p-2.5 font-bold text-[#406c89]">{dx.id}</td>
                  <td className="p-2.5 font-semibold text-slate-800">{dx.ten}</td>
                  <td className="p-2.5 text-slate-500">{dx.nguoi}</td>
                  <td className="p-2.5 font-bold text-slate-900">{formatCurrency(dx.soTien)}</td>
                  <td className="p-2.5 text-slate-400">{dx.ngay}</td>
                  <td className="p-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        dx.trangThai === 'Đã duyệt'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                          : dx.trangThai === 'Chờ duyệt'
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : 'bg-rose-50 text-rose-600 border-rose-200'
                      }`}
                    >
                      {dx.trangThai}
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
