"use client";

import React from 'react';
import { IconX } from '@tabler/icons-react';
import type { BacLuongTangBacItem } from '../../index';

interface XemBacLuongModalProps {
  isOpen: boolean;
  item: BacLuongTangBacItem | null;
  onClose: () => void;
}

export default function XemBacLuongModal({ isOpen, item, onClose }: XemBacLuongModalProps) {
  if (!isOpen || !item) return null;

  const formattedSalary = `${(item.mucLuongHienTai || 0).toLocaleString('vi-VN')} đ`;
  const boxClass =
    'w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs text-slate-700 font-medium';
  const labelClass = 'mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-slate-500';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <h2 className="text-base font-bold text-slate-800">Chi tiết bậc lương</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-5 space-y-4">
          <div className="rounded-xl bg-[#40627c] px-5 py-4 text-white flex items-center gap-4">
            <div className="h-11 w-11 shrink-0 rounded-full bg-white/15 flex items-center justify-center text-base font-bold">
              {(item.hoTen || '?').charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold truncate">{item.hoTen}</div>
              <div className="text-xs text-white/80 truncate">{item.phongBan}</div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-medium">Đang làm việc</span>
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-medium">{item.phongBan}</span>
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-medium">
                  {item.bacLuongHienTai} · {formattedSalary}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3.5">
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700">MỨC LƯƠNG HIỆN TẠI</h3>
              <span className="text-xs text-slate-400">Bậc lương và các thành phần thu nhập</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <span className={labelClass}>BẬC LƯƠNG HIỆN TẠI</span>
                <div className={boxClass}>{item.bacLuongHienTai || '—'}</div>
              </div>
              <div>
                <span className={labelClass}>MỨC LƯƠNG HIỆN TẠI (VNĐ)</span>
                <div className={boxClass}>{formattedSalary}</div>
              </div>
              <div>
                <span className={labelClass}>MỨC LƯƠNG CỨNG</span>
                <div className={boxClass}>0</div>
              </div>
              <div>
                <span className={labelClass}>MỨC LƯƠNG MỀM</span>
                <div className={boxClass}>0</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <span className={labelClass}>TỔNG LƯƠNG CƠ BẢN</span>
                <div className={boxClass}>{formattedSalary}</div>
              </div>
              <div>
                <span className={labelClass}>TỔNG TRỢ CẤP</span>
                <div className={boxClass}>0</div>
              </div>
              <div>
                <span className={labelClass}>ĐIỀU CHỈNH GẦN NHẤT</span>
                <div className={boxClass}>{item.thoiDiemTangLuongGanNhat || '—'}</div>
              </div>
              <div>
                <span className={labelClass}>TĂNG BẬC DỰ KIẾN</span>
                <div className={boxClass}>{item.thoiDiemTangBacDuKien || '—'}</div>
              </div>
            </div>

            <div>
              <span className={labelClass}>GHI CHÚ LƯƠNG</span>
              <div className={boxClass}>{item.ghiChu || '—'}</div>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-100 bg-white px-6 py-3.5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#406c89] px-5 py-2 text-xs font-semibold text-white hover:bg-[#345a73] cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
