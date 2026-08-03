"use client";

import React, { useState } from 'react';

interface HoSoKemTheoTabProps {
  danhSachFile: File[];
  setDanhSachFile: React.Dispatch<React.SetStateAction<File[]>>;
}

// ─── Template data ───────────────────────────────────────────────────
interface MauHoSo {
  id: string;
  ten: string;
}

interface NhomMau {
  nhom: string;
  flag: string;
  maus: MauHoSo[];
}

const NHOM_MAU: NhomMau[] = [
  {
    nhom: 'Tiếng Việt',
    flag: 'VN',
    maus: [
      { id: 'vi-tam-ung',        ten: 'Đề nghị Tạm ứng (Việt)' },
      { id: 'vi-bb-kl-1',        ten: 'Biên bản XN khối lượng HT (lần 1) - Việt' },
      { id: 'vi-tt-lan-1',       ten: 'Đề nghị Thanh toán lần 1 (Việt)' },
      { id: 'vi-bb-nghiem-thu',  ten: 'Biên bản Nghiệm thu & Thanh lý HĐ (Việt)' },
      { id: 'vi-tt-cuoi',        ten: 'Đề nghị Thanh toán cuối cùng (Việt)' },
      { id: 'vi-bb-ban-giao',    ten: 'Biên bản Bàn giao Mô hình (Việt)' },
    ],
  },
  {
    nhom: 'English',
    flag: 'GB',
    maus: [
      { id: 'en-advance',        ten: 'Request for Advance Payment (ENG)' },
      { id: 'en-workload-1',     ten: 'Model Completed Workload Confirmation (1st) - ENG' },
      { id: 'en-payment-1',      ten: 'Request for 1st Payment (ENG)' },
      { id: 'en-takeover',       ten: 'Model Check & Take Over and Contract Liquidation (ENG)' },
      { id: 'en-final',          ten: 'Request for Final Payment (ENG)' },
      { id: 'en-delivery',       ten: 'Model Delivery Minutes (ENG)' },
    ],
  },
  {
    nhom: 'Song ngữ',
    flag: 'VNGB',
    maus: [
      { id: 'bi-bao-hanh',       ten: 'Phiếu Bảo hành Mô hình (Việt - ENG)' },
    ],
  },
];

const DEFAULT_CHECKED = new Set<string>();

// ─── Component ───────────────────────────────────────────────────────
export default function HoSoKemTheoTab({ danhSachFile, setDanhSachFile }: HoSoKemTheoTabProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set(DEFAULT_CHECKED));

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalChecked = checked.size;

  return (
    <div className="tab-content-active space-y-4">

      {/* Header instruction */}
      <p className="text-xs text-slate-600">
        Chọn các mẫu hồ sơ để tự động tạo cùng hợp đồng{' '}
        <span className="text-slate-400">(dữ liệu tự điền từ HĐ):</span>
      </p>

      {/* Groups */}
      <div className="space-y-5">
        {NHOM_MAU.map((group) => (
          <div key={group.nhom}>
            {/* Group label */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{group.flag}</span>
              <span className="text-xs font-semibold text-slate-600">{group.nhom}</span>
            </div>

            {/* Template checkboxes */}
            <div className="space-y-1.5">
              {group.maus.map((mau) => {
                const isChecked = checked.has(mau.id);
                return (
                  <label
                    key={mau.id}
                    htmlFor={`mau-${mau.id}`}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg border cursor-pointer transition-all select-none ${
                      isChecked
                        ? 'border-indigo-300 bg-indigo-50/70 text-indigo-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      id={`mau-${mau.id}`}
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggle(mau.id)}
                      className="w-4 h-4 rounded border-slate-300 accent-indigo-600 cursor-pointer shrink-0"
                    />
                    <span className="text-sm font-medium">{mau.ten}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer count */}
      {totalChecked > 0 && (
        <p className="text-xs text-emerald-600 font-medium pt-1">
          ✓ {totalChecked} mẫu sẽ được tạo tự động khi lưu hợp đồng
        </p>
      )}
    </div>
  );
}
