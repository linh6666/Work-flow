"use client";

import React from 'react';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconBuildingWarehouse,
  IconPackage,
} from '@tabler/icons-react';

const months = ['T3', 'T4', 'T5', 'T6', 'T7', 'T8'];
const nhapData = [42, 58, 51, 67, 73, 61];
const xuatData = [38, 44, 48, 55, 60, 53];
const maxVal = 80;

export default function BaoCaoKhoTab() {
  const cards = [
    { label: 'Tổng nhập tháng này',  value: '61',      unit: 'phiếu',   color: 'text-sky-600',    bg: 'bg-sky-50',    icon: IconTrendingUp },
    { label: 'Tổng xuất tháng này',  value: '53',      unit: 'phiếu',   color: 'text-violet-600', bg: 'bg-violet-50', icon: IconTrendingDown },
    { label: 'Tổng giá trị tồn kho', value: '4.8',     unit: 'tỷ đồng', color: 'text-emerald-600',bg: 'bg-emerald-50',icon: IconBuildingWarehouse },
    { label: 'Mặt hàng sắp hết',     value: '2',       unit: 'mã hàng', color: 'text-red-600',    bg: 'bg-red-50',    icon: IconPackage },
  ];

  return (
    <div className="flex-1 flex flex-col gap-4 overflow-auto">
      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 shrink-0">
        {cards.map((c) => (
          <div key={c.label} className={`${c.bg} rounded-xl p-4 flex flex-col gap-1 border border-white shadow-sm`}>
            <span className="text-[11px] font-medium text-slate-500">{c.label}</span>
            <div className={`text-2xl font-extrabold ${c.color}`}>
              {c.value} <span className="text-xs font-semibold">{c.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4 overflow-hidden">
        <div>
          <h3 className="text-sm font-bold text-slate-700">Biến động nhập / xuất kho (6 tháng gần nhất)</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Số lượng phiếu nhập và xuất theo tháng</p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#406c89] inline-block" />Nhập kho</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-violet-400 inline-block" />Xuất kho</span>
        </div>

        {/* Chart */}
        <div className="flex-1 flex items-end gap-3 pb-2 overflow-x-auto">
          {months.map((m, i) => (
            <div key={m} className="flex flex-col items-center gap-1.5 flex-1 min-w-[48px]">
              <div className="flex items-end gap-1 h-40 w-full">
                {/* Nhập bar */}
                <div
                  className="flex-1 bg-[#406c89] rounded-t-md transition-all hover:opacity-80"
                  style={{ height: `${(nhapData[i] / maxVal) * 100}%` }}
                  title={`Nhập: ${nhapData[i]}`}
                />
                {/* Xuất bar */}
                <div
                  className="flex-1 bg-violet-400 rounded-t-md transition-all hover:opacity-80"
                  style={{ height: `${(xuatData[i] / maxVal) * 100}%` }}
                  title={`Xuất: ${xuatData[i]}`}
                />
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
