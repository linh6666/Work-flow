"use client";

import React, { useState } from 'react';
import {
  IconClipboardList,
  IconPlus,
  IconEye,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';

interface YearlyPlanRow {
  id: string;
  nam: string;
  nguoiLap: string;
  ngayLap: string;
  viTriTuyenDung: number;
  tongChiPhi: string;
  trangThai: string;
}

const mockYearlyPlans: YearlyPlanRow[] = [
  {
    id: '1',
    nam: 'Năm 2026',
    nguoiLap: 'Thao Phung',
    ngayLap: '24/10/2026',
    viTriTuyenDung: 41,
    tongChiPhi: '36.200.000',
    trangThai: 'Chờ QL KD duyệt',
  },
];

export default function KeHoachNhanSuTheoNam() {
  const [plans, setPlans] = useState<YearlyPlanRow[]>(mockYearlyPlans);

  return (
    <div className="flex-1 min-h-0 flex flex-col p-4 space-y-3 bg-white select-none overflow-auto">
      {/* ── Top Header Section ── */}
      <div className="flex items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[#3b5998]">
              <IconClipboardList size={18} />
            </span>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">
              Kế hoạch Nhân sự theo năm
            </h2>
          </div>
          <p className="text-[11.5px] text-slate-500 mt-0.5">
            Khối Văn phòng lập bảng kế hoạch nhân sự hằng năm và trình Ban Giám đốc phê duyệt.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#406c89] hover:bg-[#345970] text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer shrink-0"
        >
          <IconPlus size={15} />
          <span>Tạo kế hoạch năm mới</span>
        </button>
      </div>

      {/* ── Table Container ── */}
      <div className="w-full border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#244b62] text-white text-[11px] font-bold tracking-wider">
                <th className="py-2.5 px-4 font-bold">NĂM</th>
                <th className="py-2.5 px-4 font-bold">NGƯỜI LẬP</th>
                <th className="py-2.5 px-4 font-bold">NGÀY LẬP</th>
                <th className="py-2.5 px-4 font-bold text-center">VỊ TRÍ TUYỂN DỤNG</th>
                <th className="py-2.5 px-4 font-bold text-center">TỔNG CHI PHÍ (VNĐ)</th>
                <th className="py-2.5 px-4 font-bold text-center">TRẠNG THÁI</th>
                <th className="py-2.5 px-4 text-center w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {plans.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Cột NĂM */}
                  <td className="py-2.5 px-4 font-semibold whitespace-nowrap">
                    <span className="text-blue-600 hover:text-blue-800 underline cursor-pointer">
                      {row.nam}
                    </span>
                  </td>

                  {/* Cột NGƯỜI LẬP */}
                  <td className="py-2.5 px-4 text-slate-700 whitespace-nowrap">
                    {row.nguoiLap}
                  </td>

                  {/* Cột NGÀY LẬP */}
                  <td className="py-2.5 px-4 text-slate-600 whitespace-nowrap">
                    {row.ngayLap}
                  </td>

                  {/* Cột VỊ TRÍ TUYỂN DỤNG */}
                  <td className="py-2.5 px-4 text-center font-medium text-slate-700 whitespace-nowrap">
                    {row.viTriTuyenDung}
                  </td>

                  {/* Cột TỔNG CHI PHÍ */}
                  <td className="py-2.5 px-4 text-center font-medium text-slate-700 whitespace-nowrap">
                    {row.tongChiPhi}
                  </td>

                  {/* Cột TRẠNG THÁI */}
                  <td className="py-2.5 px-4 text-center whitespace-nowrap">
                    <span className="inline-block px-3 py-0.5 rounded-full text-[10.5px] font-medium bg-[#fef9c3] text-[#a16207] border border-[#fef08a]">
                      {row.trangThai}
                    </span>
                  </td>

                  {/* Cột THAO TÁC */}
                  <td className="py-2.5 px-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                      <button
                        type="button"
                        className="hover:text-slate-700 transition-colors p-1 rounded hover:bg-slate-100 cursor-pointer"
                        title="Xem chi tiết"
                      >
                        <IconEye size={15} />
                      </button>
                      <button
                        type="button"
                        className="hover:text-blue-600 transition-colors p-1 rounded hover:bg-slate-100 cursor-pointer"
                        title="Chỉnh sửa"
                      >
                        <IconPencil size={15} />
                      </button>
                      <button
                        type="button"
                        className="hover:text-red-600 transition-colors p-1 rounded hover:bg-slate-100 cursor-pointer"
                        title="Xoá"
                      >
                        <IconTrash size={15} />
                      </button>
                    </div>
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
