"use client";

import React, { useEffect, useState } from 'react';
import type { AoDongPhucRecord } from '../SuaAoDongPhucModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newRecord: AoDongPhucRecord) => void;
  defaultData?: Partial<AoDongPhucRecord> | null;
}

const emptyForm: AoDongPhucRecord = {
  ma: '',
  nam: 0,
  ten_san_pham: '',
  size: '',
  nhap_ban_dau: 0,
  ton_dau_ky: 0,
  nhap_trong_ky: 0,
  xuat_trong_ky: 0,
  ton_cuoi_ky: 0,
  tong_con: 0,
  tra_trong_ky: 0,
};

/* ─── Input classes ─────────────────────────────────────────── */
const inputCls =
  'w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#406c89]/20 focus:border-[#406c89] transition-all';

/* ─── Component ─────────────────────────────────────────────── */
export default function TaoMoiAoDongPhucModal({
  isOpen,
  onClose,
  onSave,
  defaultData,
}: Props) {
  const [form, setForm] = useState<AoDongPhucRecord>(emptyForm);

  useEffect(() => {
    if (isOpen) {
      if (defaultData) {
        setForm({
          ...emptyForm,
          ...defaultData,
          tra_trong_ky: defaultData.tra_trong_ky ?? 0,
        });
      } else {
        setForm({ ...emptyForm });
      }
    }
  }, [isOpen, defaultData]);

  if (!isOpen) return null;

  const setStr = (field: keyof AoDongPhucRecord, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const setNum = (field: keyof AoDongPhucRecord, value: string) => {
    const val = value === '' ? 0 : Number(value);
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Panel */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[540px] p-6 flex flex-col gap-4 animate-[fadeSlideUp_0.18s_ease-out]">
        {/* Title */}
        <h2 className="text-sm font-bold text-slate-800">
          Tạo mới áo đồng phục
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Row 1: Năm (Nửa cột trái) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-700">
                Năm <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className={inputCls}
                value={form.nam}
                onChange={(e) => setNum('nam', e.target.value)}
              />
            </div>
          </div>

          {/* Row 2: Tên sản phẩm */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-700">
              Tên sản phẩm <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={inputCls}
              value={form.ten_san_pham}
              onChange={(e) => setStr('ten_san_pham', e.target.value)}
            />
          </div>

          {/* Row 3: Mã & Size */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-700">
                Mã <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={inputCls}
                value={form.ma}
                onChange={(e) => setStr('ma', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-700">
                Size
              </label>
              <input
                type="text"
                className={inputCls}
                value={form.size}
                onChange={(e) => setStr('size', e.target.value)}
              />
            </div>
          </div>

          {/* Row 4: Nhập ban đầu & Tồn đầu kỳ */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-700">
                Nhập ban đầu
              </label>
              <input
                type="number"
                className={inputCls}
                value={form.nhap_ban_dau}
                onChange={(e) => setNum('nhap_ban_dau', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-700">
                Tồn đầu kỳ
              </label>
              <input
                type="number"
                className={inputCls}
                value={form.ton_dau_ky}
                onChange={(e) => setNum('ton_dau_ky', e.target.value)}
              />
            </div>
          </div>

          {/* Row 5: Nhập trong kỳ & Xuất trong kỳ */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-700">
                Nhập trong kỳ
              </label>
              <input
                type="number"
                className={inputCls}
                value={form.nhap_trong_ky}
                onChange={(e) => setNum('nhap_trong_ky', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-700">
                Xuất trong kỳ
              </label>
              <input
                type="number"
                className={inputCls}
                value={form.xuat_trong_ky}
                onChange={(e) => setNum('xuat_trong_ky', e.target.value)}
              />
            </div>
          </div>

          {/* Row 6: Tồn cuối kỳ & Tổng còn */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-700">
                Tồn cuối kỳ
              </label>
              <input
                type="number"
                className={inputCls}
                value={form.ton_cuoi_ky}
                onChange={(e) => setNum('ton_cuoi_ky', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-700">
                Tổng còn
              </label>
              <input
                type="number"
                className={inputCls}
                value={form.tong_con}
                onChange={(e) => setNum('tong_con', e.target.value)}
              />
            </div>
          </div>

          {/* Row 7: Trả trong kỳ (Nửa cột trái) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-700">
                Trả trong kỳ
              </label>
              <input
                type="number"
                className={inputCls}
                value={form.tra_trong_ky ?? 0}
                onChange={(e) => setNum('tra_trong_ky', e.target.value)}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-4 mt-1 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors shadow-sm"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
