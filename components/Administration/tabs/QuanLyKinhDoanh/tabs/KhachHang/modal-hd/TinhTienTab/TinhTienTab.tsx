"use client";

import React, { useState, useEffect } from 'react';

const inputClass =
  'h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-xs outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100';
const labelClass = 'mb-0.5 block text-xs text-slate-500';

interface TinhTienTabProps {
  tongThanhToan: number;
  formatCurrency: (amount: number) => string;
}

interface DotThanhToan {
  ten: string;
  tyLe: number;
  dieuKien: string;
  codieuKien: boolean;
}

const DEFAULT_DOTS: DotThanhToan[] = [
  { ten: 'Tạm ứng',            tyLe: 40, dieuKien: '',                                          codieuKien: false },
  { ten: 'Thanh toán lần 1',   tyLe: 40, dieuKien: 'sau khi đạt 90% khối lượng công việc',     codieuKien: true  },
  { ten: 'Thanh toán cuối cùng', tyLe: 10, dieuKien: 'sau khi bàn giao và nghiệm thu hoàn thành', codieuKien: true  },
];

export default function TinhTienTab({ tongThanhToan, formatCurrency }: TinhTienTabProps) {
  const [dots, setDots] = useState<DotThanhToan[]>(DEFAULT_DOTS);

  const updateDot = (idx: number, field: keyof DotThanhToan, value: string | number | boolean) => {
    setDots((prev) =>
      prev.map((d, i) => (i === idx ? { ...d, [field]: value } : d))
    );
  };

  return (
    <div className="tab-content-active space-y-4">

      {/* Tổng giá trị HĐ */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-xs text-slate-500 mb-1">Tổng giá trị HĐ (sau thuế)</p>
        <p className="text-2xl font-extrabold text-slate-800">{formatCurrency(tongThanhToan)}</p>
      </div>

      {/* Từng đợt thanh toán */}
      {dots.map((dot, idx) => {
        const sotien = Math.round(tongThanhToan * (dot.tyLe / 100));
        return (
          <div key={idx} className="rounded-lg border border-slate-200 bg-white p-4 space-y-2.5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-800">{dot.ten}</span>
              <span className="text-sm font-extrabold text-indigo-600">{dot.tyLe}%</span>
            </div>

            {/* Số tiền (readonly, tính từ tỷ lệ) */}
            <input
              type="text"
              readOnly
              value={sotien.toLocaleString('vi-VN')}
              className={`${inputClass} bg-slate-50 text-slate-600 cursor-default`}
            />

            {/* Tỷ lệ */}
            <div>
              <label className={labelClass}>Tỷ lệ:</label>
              <input
                type="number"
                min={0}
                max={100}
                value={dot.tyLe}
                onChange={(e) => updateDot(idx, 'tyLe', parseFloat(e.target.value) || 0)}
                className={inputClass}
              />
            </div>

            {/* Điều kiện (nếu có) */}
            {dot.codieuKien && (
              <div>
                <label className={labelClass}>Điều kiện:</label>
                <input
                  type="text"
                  value={dot.dieuKien}
                  onChange={(e) => updateDot(idx, 'dieuKien', e.target.value)}
                  className={inputClass}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
