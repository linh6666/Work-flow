"use client";

import React from 'react';
import { IconX } from '@tabler/icons-react';
import type { ThanNhanItem } from '../../index';

interface XemThanNhanModalProps {
  isOpen: boolean;
  item: ThanNhanItem | null;
  onClose: () => void;
}

export default function XemThanNhanModal({ isOpen, item, onClose }: XemThanNhanModalProps) {
  if (!isOpen || !item) return null;

  const isChild = item.moiQuanHe === 'Con';
  const childCount = isChild ? 1 : 0;
  const dependentCount = item.laNguoiPhuThuoc ? 1 : 0;

  const fieldBoxClass =
    'w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs text-slate-700 font-medium';
  const labelClass = 'mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-slate-500';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <h2 className="text-base font-bold text-slate-800">Chi tiết thân nhân</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 pb-5 space-y-4">
          {/* Top Slate-Blue Banner */}
          <div className="rounded-xl bg-[#40627c] px-5 py-4 text-white flex items-center gap-4">
            <div className="h-11 w-11 shrink-0 rounded-full bg-white/15 flex items-center justify-center text-base font-bold">
              {(item.hoTenNV || '?').charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold truncate">{item.hoTenNV || 'Nhân sự'}</div>
              <div className="text-xs text-white/80 truncate">{item.phongBan || 'Chưa phân phòng'}</div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-medium">Đang làm việc</span>
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-medium">
                  {item.phongBan || 'Chưa phân phòng'}
                </span>
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-medium">
                  {item.maNV || 'Chưa có mã NV'}
                </span>
              </div>
            </div>
          </div>

          {/* Card 1: VỢ / CHỒNG */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3.5">
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700">VỢ / CHỒNG</h3>
              <span className="text-xs text-slate-400">Tình trạng hôn nhân và giấy tờ của vợ/chồng</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className={labelClass}>TÌNH TRẠNG HÔN NHÂN</span>
                <div className={fieldBoxClass}>
                  {item.moiQuanHe === 'Vợ' || item.moiQuanHe === 'Chồng' ? 'Đã lập gia đình' : item.ghiChu || '—'}
                </div>
              </div>
              <div>
                <span className={labelClass}>SỐ CMT/CCCD</span>
                <div className={fieldBoxClass}>—</div>
              </div>
              <div>
                <span className={labelClass}>NGÀY CẤP</span>
                <div className={fieldBoxClass}>—</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className={labelClass}>NƠI CẤP</span>
                <div className={fieldBoxClass}>—</div>
              </div>
            </div>
          </div>

          {/* Card 2: NGƯỜI THÂN LIÊN HỆ */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700">NGƯỜI THÂN LIÊN HỆ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className={labelClass}>HỌ TÊN & QUAN HỆ</span>
                <div className={fieldBoxClass}>
                  {item.hoTenThanNhan} - {item.moiQuanHe}
                </div>
              </div>
              <div>
                <span className={labelClass}>SỐ ĐIỆN THOẠI</span>
                <div className={fieldBoxClass}>{item.soDienThoai || '—'}</div>
              </div>
            </div>
          </div>

          {/* Card 3: CON */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700">CON</h3>
                <span className="text-xs text-slate-400">Danh sách con và người phụ thuộc</span>
              </div>
              <span className="rounded-full bg-amber-50 border border-amber-200/70 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
                {childCount} con · {dependentCount} người phụ thuộc
              </span>
            </div>

            {!isChild ? (
              <div className="rounded-lg border border-slate-200 px-3 py-2.5 text-xs text-slate-400">
                Chưa khai báo con.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-3 text-xs">
                <div>
                  <span className={labelClass}>HỌ TÊN CON</span>
                  <div className="font-semibold text-slate-800">{item.hoTenThanNhan}</div>
                </div>
                <div>
                  <span className={labelClass}>NGÀY SINH</span>
                  <div className="text-slate-700">{item.ngaySinh || '—'}</div>
                </div>
                <div>
                  <span className={labelClass}>MÃ SỐ THUẾ NPT</span>
                  <div className="font-mono text-slate-700">{item.maSoThueNPT || '—'}</div>
                </div>
                <div>
                  <span className={labelClass}>NGƯỜI PHỤ THUỘC</span>
                  <div className="font-semibold text-slate-700">
                    {item.laNguoiPhuThuoc ? 'Có' : 'Không'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
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
