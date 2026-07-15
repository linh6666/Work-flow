"use client";

import React from 'react';

const textareaClass =
  'w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100';
const labelClass = 'mb-1.5 block text-xs font-medium text-slate-900';

interface DieuKhoanTabProps {
  dieuKhoanThanhToan: string;
  setDieuKhoanThanhToan: (v: string) => void;
}

export default function DieuKhoanTab({ dieuKhoanThanhToan, setDieuKhoanThanhToan }: DieuKhoanTabProps) {
  return (
    <div className="tab-content-active space-y-4">
      <div>
        <label className={labelClass}>Điều khoản thanh toán</label>
        <textarea
          rows={4}
          value={dieuKhoanThanhToan}
          onChange={(e) => setDieuKhoanThanhToan(e.target.value)}
          placeholder="Nhập điều khoản thanh toán..."
          className={`${textareaClass} min-h-[110px]`}
        />
      </div>
      <div>
        <label className={labelClass}>Điều khoản bàn giao</label>
        <textarea
          rows={3}
          placeholder="Mô tả thời gian và điều kiện bàn giao sản phẩm/dịch vụ..."
          className={`${textareaClass} min-h-[90px]`}
        />
      </div>
      <div>
        <label className={labelClass}>Bảo hành &amp; Hỗ trợ sau bán</label>
        <textarea
          rows={3}
          placeholder="Mô tả chính sách bảo hành, thời gian bảo hành, hỗ trợ kỹ thuật..."
          className={`${textareaClass} min-h-[90px]`}
        />
      </div>
    </div>
  );
}
