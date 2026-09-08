"use client";

import React, { useState } from 'react';
import { IconSearch, IconPlus, IconEye, IconCalendarTime } from '@tabler/icons-react';

export interface BaoDuongItem {
  id: string;
  ma_lich: string;
  thiet_bi: string;
  hang_muc: string;
  chu_ky: string;
  ngay_thuc_hien: string;
  ngay_tiep_theo: string;
  nguoi_thuc_hien: string;
  trang_thai: 'Đã hoàn thành' | 'Đến hạn' | 'Sắp tới';
}

const mockBaoDuong: BaoDuongItem[] = [
  { id: '1', ma_lich: 'BD-2026-08', thiet_bi: 'Máy cắt CNC Router 4 đầu', hang_muc: 'Tra mỡ vòng bi trục Z, vệ sinh quạt hút bụi', chu_ky: 'Hàng tháng', ngay_thuc_hien: '15/07/2026', ngay_tiep_theo: '15/08/2026', nguoi_thuc_hien: 'Nguyễn Văn Hùng', trang_thai: 'Đến hạn' },
  { id: '2', ma_lich: 'BD-2026-07', thiet_bi: 'Máy dán cạnh tự động KDT 650', hang_muc: 'Vệ sinh nồi keo, kiểm tra dao gọt chỉ', chu_ky: '2 tuần/lần', ngay_thuc_hien: '02/08/2026', ngay_tiep_theo: '16/08/2026', nguoi_thuc_hien: 'Trần Đình Trọng', trang_thai: 'Sắp tới' },
  { id: '3', ma_lich: 'BD-2026-06', thiet_bi: 'Hệ thống phòng sơn màng nước', hang_muc: 'Thay màng lọc bụi sơn, xả cặn bể nước', chu_ky: 'Hàng tuần', ngay_thuc_hien: '05/08/2026', ngay_tiep_theo: '12/08/2026', nguoi_thuc_hien: 'Đỗ Văn Toàn', trang_thai: 'Đã hoàn thành' },
];

const TRANG_THAI_STYLE: Record<BaoDuongItem['trang_thai'], string> = {
  'Đến hạn': 'bg-rose-50 text-rose-700 border-rose-300 font-bold',
  'Sắp tới': 'bg-amber-50 text-amber-700 border-amber-300 font-medium',
  'Đã hoàn thành': 'bg-emerald-50 text-emerald-700 border-emerald-300',
};

export default function VeSinhBaoDuong() {
  const [search, setSearch] = useState('');

  const filtered = mockBaoDuong.filter(
    (p) =>
      p.ma_lich.toLowerCase().includes(search.toLowerCase()) ||
      p.thiet_bi.toLowerCase().includes(search.toLowerCase()) ||
      p.hang_muc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 p-3 border-b border-slate-100 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm thiết bị, hạng mục bảo dưỡng..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 text-slate-700 placeholder:text-slate-400"
          />
        </div>

        <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold cursor-pointer shrink-0 shadow-xs">
          <IconPlus size={14} />
          Thêm lịch bảo dưỡng
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto flex-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <table className="w-full text-xs">
          <thead className="bg-slate-50/80 sticky top-0 z-10 border-b border-slate-100">
            <tr>
              {['Mã lịch', 'Thiết bị', 'Hạng mục bảo dưỡng / Vệ sinh', 'Chu kỳ', 'Lần gần nhất', 'Kỳ tiếp theo', 'Người phụ trách', 'Trạng thái', 'Thao tác'].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors">
                <td className="px-4 py-3 font-mono font-semibold text-[#406c89]">{item.ma_lich}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{item.thiet_bi}</td>
                <td className="px-4 py-3 text-slate-600">{item.hang_muc}</td>
                <td className="px-4 py-3 text-slate-500">{item.chu_ky}</td>
                <td className="px-4 py-3 text-slate-500">{item.ngay_thuc_hien}</td>
                <td className="px-4 py-3 font-semibold text-slate-700">{item.ngay_tiep_theo}</td>
                <td className="px-4 py-3 text-slate-600 font-medium">{item.nguoi_thuc_hien}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${TRANG_THAI_STYLE[item.trang_thai]}`}>
                    {item.trang_thai}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="inline-flex items-center gap-1 text-[#406c89] hover:underline font-medium cursor-pointer">
                    <IconEye size={13} />
                    Xem
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
