"use client";

import React, { useState } from 'react';
import { IconSearch, IconPlus, IconEye, IconTool } from '@tabler/icons-react';

export interface MayMocItem {
  id: string;
  ma: string;
  ten: string;
  loai: string;
  vi_tri: string;
  nam_sx: number;
  ngay_bao_duong_gan_nhat: string;
  nguoi_phu_trach: string;
  trang_thai: 'Đang hoạt động' | 'Đang bảo dưỡng' | 'Chờ sửa chữa' | 'Ngừng hoạt động';
}

const mockDanhSachMay: MayMocItem[] = [
  { id: '1', ma: 'MM-CNC-01', ten: 'Máy cắt CNC Router 4 đầu', loai: 'Máy cắt gỗ', vi_tri: 'Xưởng sản xuất 1', nam_sx: 2022, ngay_bao_duong_gan_nhat: '15/07/2026', nguoi_phu_trach: 'Nguyễn Văn Hùng', trang_thai: 'Đang hoạt động' },
  { id: '2', ma: 'MM-DC-02', ten: 'Máy dán cạnh tự động KDT 650', loai: 'Máy dán cạnh', vi_tri: 'Xưởng sản xuất 1', nam_sx: 2023, ngay_bao_duong_gan_nhat: '02/08/2026', nguoi_phu_trach: 'Trần Đình Trọng', trang_thai: 'Đang hoạt động' },
  { id: '3', ma: 'MM-KH-03', ten: 'Máy khoan liên kết 6 giàn', loai: 'Máy khoan', vi_tri: 'Xưởng sản xuất 2', nam_sx: 2021, ngay_bao_duong_gan_nhat: '20/06/2026', nguoi_phu_trach: 'Lê Hoàng Nam', trang_thai: 'Đang bảo dưỡng' },
  { id: '4', ma: 'MM-CB-04', ten: 'Máy cưa bàn trượt Altendorf F45', loai: 'Máy cưa', vi_tri: 'Xưởng sản xuất 1', nam_sx: 2020, ngay_bao_duong_gan_nhat: '10/08/2026', nguoi_phu_trach: 'Vũ Đức Thịnh', trang_thai: 'Đang hoạt động' },
  { id: '5', ma: 'MM-NK-05', ten: 'Máy nén khí trục vít Puma 20HP', loai: 'Hệ thống khí nén', vi_tri: 'Khu kỹ thuật', nam_sx: 2022, ngay_bao_duong_gan_nhat: '28/07/2026', nguoi_phu_trach: 'Phạm Minh Tuấn', trang_thai: 'Chờ sửa chữa' },
  { id: '6', ma: 'MM-SP-06', ten: 'Hệ thống phòng sơn màng nước', loai: 'Thiết bị sơn', vi_tri: 'Khu vực sơn hoàn thiện', nam_sx: 2023, ngay_bao_duong_gan_nhat: '05/08/2026', nguoi_phu_trach: 'Đỗ Văn Toàn', trang_thai: 'Đang hoạt động' },
];

const STATUS_STYLE: Record<MayMocItem['trang_thai'], string> = {
  'Đang hoạt động': 'bg-emerald-50 text-emerald-700 border-emerald-300',
  'Đang bảo dưỡng': 'bg-blue-50 text-blue-700 border-blue-300',
  'Chờ sửa chữa': 'bg-amber-50 text-amber-700 border-amber-300',
  'Ngừng hoạt động': 'bg-rose-50 text-rose-700 border-rose-300',
};

export default function DanhSachMay() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockDanhSachMay.filter((m) => {
    const matchSearch =
      m.ma.toLowerCase().includes(search.toLowerCase()) ||
      m.ten.toLowerCase().includes(search.toLowerCase()) ||
      m.loai.toLowerCase().includes(search.toLowerCase()) ||
      m.vi_tri.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || m.trang_thai === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 p-3 border-b border-slate-100 flex-wrap">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo mã máy, tên máy, vị trí..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 text-slate-700 placeholder:text-slate-400"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 cursor-pointer font-medium"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="Đang hoạt động">Đang hoạt động</option>
            <option value="Đang bảo dưỡng">Đang bảo dưỡng</option>
            <option value="Chờ sửa chữa">Chờ sửa chữa</option>
            <option value="Ngừng hoạt động">Ngừng hoạt động</option>
          </select>
        </div>

        <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold cursor-pointer shrink-0 shadow-xs">
          <IconPlus size={14} />
          Thêm máy mới
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto flex-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <table className="w-full text-xs">
          <thead className="bg-slate-50/80 sticky top-0 z-10 border-b border-slate-100">
            <tr>
              {['Mã máy', 'Tên thiết bị / máy móc', 'Phân loại', 'Vị trí đặt', 'Năm SX', 'Bảo dưỡng gần nhất', 'Người phụ trách', 'Trạng thái', 'Thao tác'].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors">
                <td className="px-4 py-3 font-mono font-semibold text-[#406c89]">{item.ma}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{item.ten}</td>
                <td className="px-4 py-3 text-slate-600">{item.loai}</td>
                <td className="px-4 py-3 text-slate-600">{item.vi_tri}</td>
                <td className="px-4 py-3 text-slate-500">{item.nam_sx}</td>
                <td className="px-4 py-3 text-slate-500">{item.ngay_bao_duong_gan_nhat}</td>
                <td className="px-4 py-3 text-slate-700 font-medium">{item.nguoi_phu_trach}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${STATUS_STYLE[item.trang_thai]}`}>
                    {item.trang_thai}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="inline-flex items-center gap-1 text-[#406c89] hover:underline font-medium cursor-pointer">
                    <IconEye size={13} />
                    Chi tiết
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
