"use client";

import React, { useState } from 'react';

interface YearStat {
  nam: number;
  nhap_trong_ky: number;
  xuat_trong_ky: number;
  ton_cuoi_ky: number;
}

const DEFAULT_DATA: YearStat[] = [
  { nam: 2026, nhap_trong_ky: 606, xuat_trong_ky: 208, ton_cuoi_ky: 676 },
  { nam: 2025, nhap_trong_ky: 416, xuat_trong_ky: 328, ton_cuoi_ky: 264 },
  { nam: 2024, nhap_trong_ky: 12,  xuat_trong_ky: 54,  ton_cuoi_ky: 170 },
  { nam: 2023, nhap_trong_ky: 0,   xuat_trong_ky: 26,  ton_cuoi_ky: 8 },
  { nam: 2022, nhap_trong_ky: 0,   xuat_trong_ky: 8,   ton_cuoi_ky: 40 },
];

interface Props {
  onBack?: () => void;
  data?: any[];
}

export default function BaoCaoTongHopView({ onBack }: Props) {
  const [showChart, setShowChart] = useState(true);
  const [hoveredYear, setHoveredYear] = useState<number | null>(2022);

  const stats = DEFAULT_DATA;
  const maxVal = 800;

  const totalNhap = stats.reduce((acc, c) => acc + c.nhap_trong_ky, 0);
  const totalXuat = stats.reduce((acc, c) => acc + c.xuat_trong_ky, 0);
  const totalTon  = stats.reduce((acc, c) => acc + c.ton_cuoi_ky, 0);

  const activeStat = stats.find((s) => s.nam === hoveredYear) || stats[stats.length - 1];

  return (
    <div className="flex-1 flex flex-col overflow-y-auto gap-2.5 p-3 bg-slate-50/50 min-h-full">
      {/* ── Nút Quay lại ── */}
      <div className="shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <span>&larr;</span>
          <span>Quay lại dữ liệu</span>
        </button>
      </div>

      {/* ── Tiêu đề + Nút Ẩn/Hiện biểu đồ ── */}
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">
          Báo cáo tổng hợp áo đồng phục
        </h2>
        <button
          type="button"
          onClick={() => setShowChart(!showChart)}
          className="px-2.5 py-0.5 text-[11px] font-normal text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          {showChart ? 'Ẩn biểu đồ' : 'Hiện biểu đồ'}
        </button>
      </div>

      {/* ── Biểu đồ nằm ngang (Horizontal Bar Chart) ── */}
      {showChart && (
        <div className="relative bg-white rounded-lg border border-slate-200 p-3.5 shadow-2xs shrink-0 transition-all">
          {/* Tooltip hiển thị */}
          {activeStat && (
            <div className="absolute right-1/4 top-8 z-20 bg-white/95 border border-slate-200 rounded shadow-md p-2.5 text-[11px] flex flex-col gap-0.5 min-w-[125px] pointer-events-none">
              <span className="font-bold text-slate-700 text-xs">{activeStat.nam}</span>
              <span className="text-[#3b5998] font-medium">
                Nhập trong kỳ : {activeStat.nhap_trong_ky}
              </span>
              <span className="text-[#e67e22] font-medium">
                Xuất trong kỳ : {activeStat.xuat_trong_ky}
              </span>
              <span className="text-slate-500 font-medium">
                Tồn cuối kỳ : {activeStat.ton_cuoi_ky}
              </span>
            </div>
          )}

          {/* Chart Canvas Area */}
          <div className="relative pl-10 pr-3 pt-2 pb-5">
            {/* Trục Y và Grid dọc */}
            <div className="absolute left-10 right-3 top-0 bottom-5 flex justify-between pointer-events-none">
              {[0, 200, 400, 600, 800].map((val) => (
                <div key={val} className="relative h-full flex flex-col items-center">
                  <div className="h-full border-r border-dashed border-slate-200" />
                  <span className="absolute -bottom-4 text-[10px] text-slate-400">
                    {val}
                  </span>
                </div>
              ))}
            </div>

            {/* Trục chính & Các thanh bar */}
            <div className="relative flex flex-col gap-2.5 z-10 border-l border-slate-300">
              {stats.map((item) => (
                <div
                  key={item.nam}
                  className="relative flex items-center group cursor-pointer"
                  onMouseEnter={() => setHoveredYear(item.nam)}
                >
                  {/* Nhãn năm (Trục Y) */}
                  <span className="absolute -left-10 text-[10px] font-medium text-slate-600 text-right w-8">
                    {item.nam}
                  </span>

                  {/* Nhóm 3 thanh bar nằm ngang */}
                  <div className="flex flex-col gap-0.5 w-full py-0.5">
                    {/* Nhập trong kỳ (Xanh lam) */}
                    <div
                      className="h-2 bg-[#4169e1] rounded-r-xs transition-all duration-200"
                      style={{ width: `${Math.max(item.nhap_trong_ky > 0 ? 3 : 0, (item.nhap_trong_ky / maxVal) * 100)}%` }}
                      title={`Nhập: ${item.nhap_trong_ky}`}
                    />
                    {/* Xuất trong kỳ (Cam) */}
                    <div
                      className="h-2 bg-[#e67e22] rounded-r-xs transition-all duration-200"
                      style={{ width: `${Math.max(item.xuat_trong_ky > 0 ? 3 : 0, (item.xuat_trong_ky / maxVal) * 100)}%` }}
                      title={`Xuất: ${item.xuat_trong_ky}`}
                    />
                    {/* Tồn cuối kỳ (Xám) */}
                    <div
                      className="h-2 bg-[#94a3b8] rounded-r-xs transition-all duration-200"
                      style={{
                        width: item.nam === 2022 ? '100%' : `${Math.max(item.ton_cuoi_ky > 0 ? 3 : 0, (item.ton_cuoi_ky / maxVal) * 100)}%`,
                      }}
                      title={`Tồn: ${item.ton_cuoi_ky}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Legend chú thích ở dưới biểu đồ ── */}
          <div className="flex items-center justify-center gap-5 pt-2 border-t border-slate-100 mt-2 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-2 bg-[#4169e1] rounded-xs" />
              <span>Nhập trong kỳ</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-2 bg-[#e67e22] rounded-xs" />
              <span>Xuất trong kỳ</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-2 bg-[#94a3b8] rounded-xs" />
              <span>Tồn cuối kỳ</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Bảng số liệu tổng hợp ── */}
      <div className="rounded-lg overflow-hidden border border-slate-200 shadow-2xs shrink-0">
        <table className="w-full text-xs border-collapse">
          {/* Header xanh đậm */}
          <thead className="bg-[#4169e1] text-white">
            <tr>
              <th className="py-1.5 px-3.5 text-left font-bold border-r border-blue-400/40 w-1/4">
                Năm
              </th>
              <th className="py-1.5 px-5 text-right font-bold border-r border-blue-400/40 w-1/4">
                Nhập trong kỳ
              </th>
              <th className="py-1.5 px-5 text-right font-bold border-r border-blue-400/40 w-1/4">
                Xuất trong kỳ
              </th>
              <th className="py-1.5 px-5 text-right font-bold w-1/4">
                Tồn cuối kỳ
              </th>
            </tr>
          </thead>

          {/* Dữ liệu các năm */}
          <tbody className="bg-white">
            {stats.map((row) => (
              <tr
                key={row.nam}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <td className="py-1.5 px-3.5 text-slate-800 font-medium border-r border-slate-100">
                  {row.nam}
                </td>
                <td className="py-1.5 px-5 text-right tabular-nums text-slate-700 border-r border-slate-100">
                  {row.nhap_trong_ky.toLocaleString('vi-VN')}
                </td>
                <td className="py-1.5 px-5 text-right tabular-nums text-slate-700 border-r border-slate-100">
                  {row.xuat_trong_ky.toLocaleString('vi-VN')}
                </td>
                <td className="py-1.5 px-5 text-right tabular-nums text-slate-700">
                  {row.ton_cuoi_ky.toLocaleString('vi-VN')}
                </td>
              </tr>
            ))}
          </tbody>

          {/* Dòng Tổng cộng nền nâu/vàng đồng */}
          <tfoot className="bg-[#a37946] text-white font-bold">
            <tr>
              <td className="py-1.5 px-3.5 text-left uppercase tracking-wider border-r border-amber-600/30">
                TỔNG CỘNG
              </td>
              <td className="py-1.5 px-5 text-right tabular-nums border-r border-amber-600/30">
                {totalNhap.toLocaleString('vi-VN')}
              </td>
              <td className="py-1.5 px-5 text-right tabular-nums border-r border-amber-600/30">
                {totalXuat.toLocaleString('vi-VN')}
              </td>
              <td className="py-1.5 px-5 text-right tabular-nums">
                {totalTon.toLocaleString('vi-VN')}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
