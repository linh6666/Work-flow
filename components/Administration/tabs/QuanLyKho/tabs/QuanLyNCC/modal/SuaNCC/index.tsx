"use client";

import React, { useState } from 'react';
import { IconX } from '@tabler/icons-react';

export interface SupplierEditItem {
  ma_ncc: string;
  ncc: string;
  nhom_nvl: string;
  dia_chi: string;
  sdt: string;
  nvl_cung_cap: string;
  ghi_chu: string;
}

interface SuaNCCProps {
  isOpen: boolean;
  item: SupplierEditItem | null;
  onClose: () => void;
  onSave: (item: SupplierEditItem) => void;
}

export default function SuaNCC({ isOpen, item, onClose, onSave }: SuaNCCProps) {
  const [formData, setFormData] = useState<SupplierEditItem | null>(item);

  if (!isOpen || !formData) return null;

  const handleChange = (field: keyof SupplierEditItem, value: string) => {
    setFormData((current) => current ? { ...current, [field]: value } : current);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(formData);
  };

  const inputClass = 'mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-[#406c89] focus:outline-none focus:ring-1 focus:ring-[#406c89]';
  const labelClass = 'block text-xs font-medium text-slate-600';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <div className="w-full max-w-[620px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-bold text-slate-800">Sửa nhà cung cấp</h2>
          <button type="button" onClick={onClose} aria-label="Đóng" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><IconX size={17} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 px-6 py-5 sm:grid-cols-2">
            <label className={labelClass}>Mã NCC<input required className={inputClass} value={formData.ma_ncc} onChange={(event) => handleChange('ma_ncc', event.target.value)} /></label>
            <label className={labelClass}>Tên NCC<input required className={inputClass} value={formData.ncc} onChange={(event) => handleChange('ncc', event.target.value)} /></label>
            <label className={labelClass}>Nhóm vật liệu<input className={inputClass} value={formData.nhom_nvl} onChange={(event) => handleChange('nhom_nvl', event.target.value)} /></label>
            <label className={labelClass}>Địa chỉ<input className={inputClass} value={formData.dia_chi} onChange={(event) => handleChange('dia_chi', event.target.value)} /></label>
            <label className={labelClass}>Số điện thoại<input className={inputClass} value={formData.sdt} onChange={(event) => handleChange('sdt', event.target.value)} /></label>
            <label className={labelClass}>NVL cung cấp<input className={inputClass} value={formData.nvl_cung_cap} onChange={(event) => handleChange('nvl_cung_cap', event.target.value)} /></label>
            <label className="block text-xs font-medium text-slate-600 sm:col-span-2">Ghi chú<textarea rows={2} className={`${inputClass} resize-none`} value={formData.ghi_chu} onChange={(event) => handleChange('ghi_chu', event.target.value)} /></label>
          </div>
          <div className="flex justify-end gap-2.5 border-t border-slate-100 px-6 py-4">
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Hủy</button>
            <button type="submit" className="rounded-lg bg-[#406c89] px-6 py-2 text-sm font-semibold text-white hover:bg-[#345870]">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
}
