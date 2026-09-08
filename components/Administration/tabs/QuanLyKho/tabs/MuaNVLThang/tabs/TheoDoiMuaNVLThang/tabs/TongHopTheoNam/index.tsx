"use client";

import React, { useState } from 'react';
import { IconSearch, IconPlus, IconDownload } from '@tabler/icons-react';

export interface TongHopNamItem {
  nam: string;
  ma_nvl: string;
  ten_nvl: string;
  don_vi: string;
  tong_sl: string;
  tong_tien: number;
  ty_trong: string;
  ncc_chinh: string;
  so_lan_mua: number;
  trang_thai: string;
}

export const mockTongHopNam: TongHopNamItem[] = [
  { nam: '2026', ma_nvl: 'NVL-TH40', ten_nvl: 'Thép hộp 40x40 (1.2mm)', don_vi: 'kg', tong_sl: '12,500 kg', tong_tien: 275_000_000, ty_trong: '19.4%', ncc_chinh: 'Công ty Thép Miền Nam', so_lan_mua: 8, trang_thai: 'Đang thực hiện' },
  { nam: '2026', ma_nvl: 'NVL-GAC18', ten_nvl: 'Gỗ An Cường MFC 18mm', don_vi: 'tấm', tong_sl: '2,800 tấm', tong_tien: 384_000_000, ty_trong: '27.0%', ncc_chinh: 'Cty Gỗ An Cường', so_lan_mua: 10, trang_thai: 'Đang thực hiện' },
  { nam: '2026', ma_nvl: 'NVL-SKV55', ten_nvl: 'Sơn Epoxy Kova K-5500', don_vi: 'lít', tong_sl: '3,200 lít', tong_tien: 288_000_000, ty_trong: '20.3%', ncc_chinh: 'Công ty Sơn Kova', so_lan_mua: 6, trang_thai: 'Đang thực hiện' },
  { nam: '2026', ma_nvl: 'NVL-MC05', ten_nvl: 'Mica Trong Kính 5mm', don_vi: 'tấm', tong_sl: '850 tấm', tong_tien: 201_400_000, ty_trong: '14.2%', ncc_chinh: 'Nhà cung cấp Mica Việt', so_lan_mua: 7, trang_thai: 'Đang thực hiện' },
  { nam: '2026', ma_nvl: 'NVL-PKHF', ten_nvl: 'Phụ kiện bản lề Hafele', don_vi: 'bộ', tong_sl: '6,500 bộ', tong_tien: 271_600_000, ty_trong: '19.1%', ncc_chinh: 'Hafele Việt Nam', so_lan_mua: 6, trang_thai: 'Đang thực hiện' },
  { nam: '2025', ma_nvl: 'NVL-TH40', ten_nvl: 'Thép hộp 40x40 (1.2mm)', don_vi: 'kg', tong_sl: '15,000 kg', tong_tien: 315_000_000, ty_trong: '22%', ncc_chinh: 'Công ty Thép Miền Nam', so_lan_mua: 12, trang_thai: 'Hoàn thành' },
  { nam: '2025', ma_nvl: 'NVL-GAC18', ten_nvl: 'Gỗ An Cường MFC 18mm', don_vi: 'tấm', tong_sl: '3,100 tấm', tong_tien: 840_000_000, ty_trong: '42%', ncc_chinh: 'Cty Gỗ An Cường', so_lan_mua: 14, trang_thai: 'Hoàn thành' },
];

const STATUS_STYLE: Record<string, string> = {
  'Đã duyệt': 'bg-emerald-50 text-emerald-600 border border-emerald-200',
  'Hoàn thành': 'bg-blue-50 text-blue-600 border border-blue-200',
  'Chờ duyệt': 'bg-amber-50 text-amber-600 border border-amber-200',
  'Đang thực hiện': 'bg-indigo-50 text-indigo-600 border border-indigo-200',
};

export default function TongHopTheoNam() {
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('2026');

  const filtered = mockTongHopNam.filter(
    (p) =>
      (selectedYear === 'all' || p.nam === selectedYear) &&
      (p.ten_nvl.toLowerCase().includes(search.toLowerCase()) ||
        p.ma_nvl.toLowerCase().includes(search.toLowerCase()) ||
        p.ncc_chinh.toLowerCase().includes(search.toLowerCase()))
  );

  const totalTien = filtered.reduce((sum, item) => sum + item.tong_tien, 0);

  return (
    <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 p-3 border-b border-slate-100 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <IconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm năm, mã NVL, tên NVL, NCC..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-1">
            <span className="text-xs text-slate-500 font-medium">Năm:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 cursor-pointer font-medium"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="all">Tất cả năm</option>
            </select>
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold cursor-pointer shrink-0">
            <IconDownload size={13} />
            Xuất báo cáo
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold cursor-pointer shrink-0">
            <IconPlus size={13} />
            Thêm kế hoạch năm
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto flex-1 flex flex-col no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              {['Năm', 'Mã NVL', 'Tên nguyên vật liệu', 'ĐVT', 'Tổng SL cả năm', 'Tổng giá trị cả năm', 'Tỷ trọng', 'Nhà cung cấp chính', 'Số đợt mua', 'Trạng thái', 'Thao tác'].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={`${p.nam}-${p.ma_nvl}-${i}`} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                <td className="px-4 py-2.5 font-bold text-slate-700">{p.nam}</td>
                <td className="px-4 py-2.5 font-mono text-[#406c89] font-semibold">{p.ma_nvl}</td>
                <td className="px-4 py-2.5 font-medium text-slate-800">{p.ten_nvl}</td>
                <td className="px-4 py-2.5 text-slate-600">{p.don_vi}</td>
                <td className="px-4 py-2.5 font-semibold text-slate-700">{p.tong_sl}</td>
                <td className="px-4 py-2.5 font-bold text-slate-800">{p.tong_tien.toLocaleString()}đ</td>
                <td className="px-4 py-2.5">
                  <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#406c89]/10 text-[#406c89]">
                    {p.ty_trong}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-slate-600">{p.ncc_chinh}</td>
                <td className="px-4 py-2.5 text-center font-medium text-slate-600">{p.so_lan_mua} đợt</td>
                <td className="px-4 py-2.5">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${STATUS_STYLE[p.trang_thai] || 'bg-slate-100 text-slate-600'}`}>
                    {p.trang_thai}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <button className="text-[#406c89] hover:underline font-medium cursor-pointer">Chi tiết</button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* Tổng cộng footer */}
          <tfoot className="bg-slate-50 border-t border-slate-200 sticky bottom-0 font-semibold text-slate-700">
            <tr>
              <td colSpan={5} className="px-4 py-2.5 text-right font-bold">Tổng cộng:</td>
              <td className="px-4 py-2.5 font-bold text-[#406c89]">{totalTien.toLocaleString()}đ</td>
              <td colSpan={5}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
