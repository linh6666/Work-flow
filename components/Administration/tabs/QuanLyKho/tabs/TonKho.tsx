"use client";

import React, { useState } from 'react';
import {
  IconSearch,
  IconFilter,
  IconBuildingWarehouse,
  IconAlertTriangle,
  IconPackage,
} from '@tabler/icons-react';

const mockTonKho = [
  { ma: 'VT001', ten: 'Thép hộp 40x40', dvt: 'kg',   ton: 1250,  min: 500,  gia: 18500  },
  { ma: 'VT002', ten: 'Nhôm tấm 3mm',   dvt: 'tấm',  ton: 84,    min: 20,   gia: 420000 },
  { ma: 'VT003', ten: 'Sơn epoxy xám',  dvt: 'thùng', ton: 12,   min: 10,   gia: 680000 },
  { ma: 'VT004', ten: 'Bu lông M10',    dvt: 'cái',   ton: 3200,  min: 1000, gia: 2500   },
  { ma: 'VT005', ten: 'Dây điện 2.5mm', dvt: 'cuộn',  ton: 45,    min: 10,   gia: 155000 },
  { ma: 'VT006', ten: 'Ống PVC Ø27',   dvt: 'cây',   ton: 8,     min: 20,   gia: 35000  },
  { ma: 'VT007', ten: 'Gỗ ván ép 18mm', dvt: 'tấm',  ton: 130,   min: 30,   gia: 320000 },
];

export default function TonKhoTab() {
  const [search, setSearch] = useState('');

  const filtered = mockTonKho.filter(
    (v) =>
      v.ma.toLowerCase().includes(search.toLowerCase()) ||
      v.ten.toLowerCase().includes(search.toLowerCase())
  );

  const lowStock = mockTonKho.filter((v) => v.ton <= v.min);

  return (
    <div className="flex-1 flex flex-col gap-4 overflow-auto">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 shrink-0">
        {[
          { label: 'Tổng mã hàng',    value: mockTonKho.length,   color: 'text-sky-600',    bg: 'bg-sky-50',    icon: IconPackage },
          { label: 'Sắp hết hàng',    value: lowStock.length,     color: 'text-red-600',    bg: 'bg-red-50',    icon: IconAlertTriangle },
          { label: 'Kho đang quản lý', value: 3,                  color: 'text-violet-600', bg: 'bg-violet-50', icon: IconBuildingWarehouse },
          { label: 'Tổng giá trị (M₫)', value: (mockTonKho.reduce((s, v) => s + v.ton * v.gia, 0) / 1_000_000).toFixed(1), color: 'text-emerald-600', bg: 'bg-emerald-50', icon: IconPackage },
        ].map((c) => (
          <div key={c.label} className={`${c.bg} rounded-xl p-4 flex flex-col gap-1 border border-white shadow-sm`}>
            <span className="text-[11px] font-medium text-slate-500">{c.label}</span>
            <span className={`text-2xl font-extrabold ${c.color}`}>{c.value}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-2 p-3 border-b border-slate-100">
          <div className="relative flex-1 max-w-sm">
            <IconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm mã hoặc tên vật tư..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
            <IconFilter size={13} />
            Lọc
          </button>
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 sticky top-0 z-10">
              <tr>
                {['Mã VT', 'Tên vật tư', 'ĐVT', 'Tồn kho', 'Tồn tối thiểu', 'Đơn giá', 'Trạng thái'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => {
                const isLow = v.ton <= v.min;
                return (
                  <tr key={v.ma} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                    <td className="px-4 py-2.5 font-mono text-slate-500">{v.ma}</td>
                    <td className="px-4 py-2.5 font-semibold text-slate-700">{v.ten}</td>
                    <td className="px-4 py-2.5 text-slate-500">{v.dvt}</td>
                    <td className={`px-4 py-2.5 font-bold ${isLow ? 'text-red-500' : 'text-slate-700'}`}>{v.ton.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-slate-500">{v.min.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-slate-600">{v.gia.toLocaleString()}đ</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${isLow ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {isLow ? '⚠ Sắp hết' : '✓ Đủ hàng'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
