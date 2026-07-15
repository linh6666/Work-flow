"use client";

import React from 'react';

const inputClass =
  'h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-xs outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100';
const labelClass = 'mb-1.5 block text-xs font-medium text-slate-900';

interface HangMucGiaTriTabProps {
  giaTriHopDong: number;
  setGiaTriHopDong: (v: number) => void;
  vatPercent: number;
  setVatPercent: (v: number) => void;
  vatAmount: number;
  tongThanhToan: number;
  formatCurrency: (amount: number) => string;
}

export default function HangMucGiaTriTab({
  giaTriHopDong,
  setGiaTriHopDong,
  vatPercent,
  setVatPercent,
  vatAmount,
  tongThanhToan,
  formatCurrency,
}: HangMucGiaTriTabProps) {
  return (
    <div className="tab-content-active space-y-4">
      <div className="grid grid-cols-3 gap-3 items-end">
        <div className="col-span-2">
          <label className={labelClass}>Giá trị hợp đồng (trước thuế) *</label>
          <input
            type="number"
            required
            min="0"
            value={giaTriHopDong || ''}
            onChange={(e) => setGiaTriHopDong(parseFloat(e.target.value) || 0)}
            placeholder="VND"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>VAT (%)</label>
          <select
            value={vatPercent}
            onChange={(e) => setVatPercent(parseInt(e.target.value) || 0)}
            className={inputClass}
          >
            <option value="0">0%</option>
            <option value="5">5%</option>
            <option value="8">8%</option>
            <option value="10">10%</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Giá trị hợp đồng:</span>
          <strong className="text-slate-900">{formatCurrency(giaTriHopDong)}</strong>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Thuế VAT ({vatPercent}%):</span>
          <span className="text-slate-700">{formatCurrency(vatAmount)}</span>
        </div>
        <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
          <span className="text-base font-extrabold text-slate-800">Tổng giá trị thanh toán:</span>
          <strong className="text-base font-extrabold text-emerald-600">{formatCurrency(tongThanhToan)}</strong>
        </div>
      </div>
    </div>
  );
}
