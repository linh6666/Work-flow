"use client";

import React, { useState, useMemo } from 'react';
import { IconPlus, IconX } from '@tabler/icons-react';
import { NewHopDongForm, DEFAULT_NEW_FORM } from '../types';

interface ThemHopDongModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (form: NewHopDongForm) => void;
}

const PHAN_LOAI_OPTIONS = [
  'Khác',
  'Căn hộ',
  'Biệt thự',
  'Shophouse',
  'Khu đô thị',
  'Nghỉ dưỡng',
  'Văn phòng',
];

const NAM_OPTIONS = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'];

export default function ThemHopDongModal({ open, onClose, onSubmit }: ThemHopDongModalProps) {
  const [form, setForm] = useState<NewHopDongForm>(DEFAULT_NEW_FORM);

  const setThang = (idx: number, val: string) => {
    const updated = [...form.doanhThuThang];
    updated[idx] = val;
    setForm({ ...form, doanhThuThang: updated });
  };

  const tongDaThu = useMemo(
    () => form.doanhThuThang.reduce((s, v) => s + (parseFloat(v) || 0), 0),
    [form.doanhThuThang]
  );
  const tongConPhaiThu = useMemo(
    () => Math.max(0, (parseFloat(form.tongGTHD) || 0) + (parseFloat(form.gtPhatSinh) || 0) - tongDaThu),
    [form.tongGTHD, form.gtPhatSinh, tongDaThu]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.tenCongTrinh) return;
    onSubmit(form);
    setForm(DEFAULT_NEW_FORM);
  };

  const handleClose = () => {
    setForm(DEFAULT_NEW_FORM);
    onClose();
  };

  if (!open) return null;

  const inputCls =
    'w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-[#406c89] text-xs text-slate-700 placeholder-slate-300';
  const labelCls = 'block text-[11px] font-semibold text-slate-600 mb-1';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
          <h4 className="text-sm font-bold text-slate-800">
            Thêm dòng theo dõi doanh thu
          </h4>
          <button
            type="button"
            onClick={handleClose}
            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3 text-xs max-h-[80vh] overflow-y-auto">

          {/* Row 1: Số HĐ + Năm theo dõi */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Số HĐ (liên kết Hợp đồng)</label>
              <input
                type="text"
                placeholder=""
                value={form.soHD}
                onChange={(e) => setForm({ ...form, soHD: e.target.value })}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Năm theo dõi</label>
              <select
                value={form.namTheoDoi}
                onChange={(e) => setForm({ ...form, namTheoDoi: e.target.value })}
                className={inputCls + ' cursor-pointer'}
              >
                {NAM_OPTIONS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Tên công trình / mô hình */}
          <div>
            <label className={labelCls}>Tên công trình / mô hình</label>
            <input
              type="text"
              required
              value={form.tenCongTrinh}
              onChange={(e) => setForm({ ...form, tenCongTrinh: e.target.value })}
              className={inputCls}
            />
          </div>

          {/* Row 3: Khách hàng + Mã KH */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>
                Khách hàng <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={form.tenKH}
                onChange={(e) => setForm({ ...form, tenKH: e.target.value })}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Mã KH</label>
              <input
                type="text"
                value={form.maKH}
                onChange={(e) => setForm({ ...form, maKH: e.target.value })}
                className={inputCls}
              />
            </div>
          </div>

          {/* Row 4: Kích thước + Tỷ lệ */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Kích thước (MM)</label>
              <input
                type="text"
                value={form.kichThuoc}
                onChange={(e) => setForm({ ...form, kichThuoc: e.target.value })}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Tỷ lệ</label>
              <input
                type="text"
                value={form.tyLe}
                onChange={(e) => setForm({ ...form, tyLe: e.target.value })}
                className={inputCls}
              />
            </div>
          </div>

          {/* Row 5: Tổng GT HĐ + GT Phát sinh */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Tổng GT HĐ</label>
              <input
                type="number"
                placeholder="0"
                value={form.tongGTHD}
                onChange={(e) => setForm({ ...form, tongGTHD: e.target.value })}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>GT Phát sinh</label>
              <input
                type="number"
                placeholder="0"
                value={form.gtPhatSinh}
                onChange={(e) => setForm({ ...form, gtPhatSinh: e.target.value })}
                className={inputCls}
              />
            </div>
          </div>

          {/* Row 6: DT năm cũ + Phân loại dự án */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-amber-600 mb-1">DT năm cũ</label>
              <input
                type="number"
                placeholder="0"
                value={form.dtNamCu}
                onChange={(e) => setForm({ ...form, dtNamCu: e.target.value })}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Phân loại dự án</label>
              <select
                value={form.phanLoaiDuAn}
                onChange={(e) => setForm({ ...form, phanLoaiDuAn: e.target.value })}
                className={inputCls + ' cursor-pointer'}
              >
                {PHAN_LOAI_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Doanh thu theo tháng */}
          <div>
            <label className="block text-[11px] font-semibold text-emerald-600 mb-2">
              Doanh thu theo tháng (nhập số tiền thu từng tháng)
            </label>
            <div className="grid grid-cols-6 gap-1.5">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i}>
                  <div className="text-[10px] text-slate-400 font-medium mb-0.5 text-center">T{i + 1}</div>
                  <input
                    type="number"
                    placeholder=""
                    value={form.doanhThuThang[i]}
                    onChange={(e) => setThang(i, e.target.value)}
                    className="w-full px-1.5 py-1.5 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-[#406c89] text-[11px] text-slate-700 text-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row: Tổng đã thu + Tổng còn phải thu (computed, read-only) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-emerald-600 mb-1">Tổng đã thu</label>
              <input
                type="text"
                readOnly
                value={tongDaThu === 0 ? '0' : tongDaThu.toLocaleString('vi-VN')}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-emerald-700 font-semibold cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-rose-600 mb-1">Tổng còn phải thu</label>
              <input
                type="text"
                readOnly
                value={tongConPhaiThu === 0 ? '0' : tongConPhaiThu.toLocaleString('vi-VN')}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-rose-600 font-semibold cursor-not-allowed"
              />
            </div>
          </div>

          {/* Ghi chú */}
          <div>
            <label className={labelCls}>Ghi chú</label>
            <textarea
              rows={3}
              value={form.ghiChu}
              onChange={(e) => setForm({ ...form, ghiChu: e.target.value })}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-[#406c89] text-xs text-slate-700 resize-none"
            />
          </div>

          {/* Footer buttons */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold rounded-md transition-colors cursor-pointer text-xs"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 bg-[#406c89] hover:bg-[#33566e] text-white font-bold rounded-md shadow-sm transition-colors cursor-pointer text-xs"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
