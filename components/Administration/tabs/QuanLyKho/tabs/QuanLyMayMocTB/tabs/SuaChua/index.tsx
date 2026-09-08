"use client";

import React, { useState } from 'react';
import { IconSearch, IconPlus, IconEye, IconWrench } from '@tabler/icons-react';

export interface PhieuSuaChuaItem {
  id: string;
  ma_phieu: string;
  thiet_bi: string;
  mo_ta_su_co: string;
  ngay_yeu_cau: string;
  muc_do: 'Khẩn cấp' | 'Cao' | 'Bình thường';
  chi_phi: number;
  don_vi_sua: string;
  trang_thai: 'Đang sửa chữa' | 'Chờ linh kiện' | 'Hoàn thành';
}

const mockSuaChua: PhieuSuaChuaItem[] = [
  { id: '1', ma_phieu: 'SC-2026-08-01', thiet_bi: 'Máy nén khí trục vít Puma 20HP', mo_ta_su_co: 'Hỏng rơ le áp suất, áp lực không đạt chuẩn', ngay_yeu_cau: '05/08/2026', muc_do: 'Khẩn cấp', chi_phi: 4_500_000, don_vi_sua: 'Cty Cơ điện Tân Á', trang_thai: 'Đang sửa chữa' },
  { id: '2', ma_phieu: 'SC-2026-07-02', thiet_bi: 'Máy khoan liên kết 6 giàn', mo_ta_su_co: 'Kẹt mũi khoan trục ngang cụm số 3', ngay_yeu_cau: '28/07/2026', muc_do: 'Cao', chi_phi: 2_800_000, don_vi_sua: 'Đội kỹ thuật nội bộ', trang_thai: 'Chờ linh kiện' },
  { id: '3', ma_phieu: 'SC-2026-07-01', thiet_bi: 'Máy cưa bàn trượt Altendorf F45', mo_ta_su_co: 'Thay ray trượt dẫn hướng và căn chỉnh thước', ngay_yeu_cau: '12/07/2026', muc_do: 'Bình thường', chi_phi: 6_200_000, don_vi_sua: 'Đại diện Hãng Altendorf', trang_thai: 'Hoàn thành' },
];

const MUC_DO_STYLE: Record<PhieuSuaChuaItem['muc_do'], string> = {
  'Khẩn cấp': 'bg-rose-50 text-rose-700 border-rose-300 font-bold',
  'Cao': 'bg-amber-50 text-amber-700 border-amber-300 font-semibold',
  'Bình thường': 'bg-slate-100 text-slate-700 border-slate-200',
};

const TRANG_THAI_STYLE: Record<PhieuSuaChuaItem['trang_thai'], string> = {
  'Đang sửa chữa': 'bg-blue-50 text-blue-700 border-blue-300',
  'Chờ linh kiện': 'bg-amber-50 text-amber-700 border-amber-300',
  'Hoàn thành': 'bg-emerald-50 text-emerald-700 border-emerald-300',
};

export default function SuaChua() {
  const [search, setSearch] = useState('');

  const filtered = mockSuaChua.filter(
    (p) =>
      p.ma_phieu.toLowerCase().includes(search.toLowerCase()) ||
      p.thiet_bi.toLowerCase().includes(search.toLowerCase()) ||
      p.mo_ta_su_co.toLowerCase().includes(search.toLowerCase())
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
            placeholder="Tìm theo mã phiếu, thiết bị, sự cố..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 text-slate-700 placeholder:text-slate-400"
          />
        </div>

        <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold cursor-pointer shrink-0 shadow-xs">
          <IconPlus size={14} />
          Tạo phiếu sửa chữa
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto flex-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <table className="w-full text-xs">
          <thead className="bg-slate-50/80 sticky top-0 z-10 border-b border-slate-100">
            <tr>
              {['Mã phiếu', 'Thiết bị sự cố', 'Mô tả hư hỏng', 'Mức độ', 'Ngày yêu cầu', 'Chi phí ước tính', 'Đơn vị thực hiện', 'Trạng thái', 'Thao tác'].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors">
                <td className="px-4 py-3 font-mono font-semibold text-[#406c89]">{item.ma_phieu}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{item.thiet_bi}</td>
                <td className="px-4 py-3 text-slate-600">{item.mo_ta_su_co}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] border ${MUC_DO_STYLE[item.muc_do]}`}>
                    {item.muc_do}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">{item.ngay_yeu_cau}</td>
                <td className="px-4 py-3 font-bold text-slate-700">{item.chi_phi.toLocaleString()}đ</td>
                <td className="px-4 py-3 text-slate-600">{item.don_vi_sua}</td>
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
