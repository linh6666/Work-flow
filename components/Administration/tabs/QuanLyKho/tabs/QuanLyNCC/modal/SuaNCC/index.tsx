"use client";

import React, { useState } from 'react';
import { IconX } from '@tabler/icons-react';

export interface SupplierEditItem {
  ma_ncc: string;
  ncc: string;
  nhom_nvl: string;
  phan_loai: string;
  tan_suat: string;
  nhom_hang: string;
  nhom_ncc: string;
  chat_luong: string;
  gia_nvl: string;
  tg_giao_dat: string;
  on_dinh: string;
  uu_dai: string;
  tt_toan: string;
  tong_diem: string;
  nguoi_lien_he: string;
  email: string;
  dia_chi: string;
  sdt: string;
  khu_vuc: string;
  nvl_cung_cap: string;
  ghi_chu: string;
}

type EditableSupplier = Partial<SupplierEditItem> & Pick<SupplierEditItem, 'ma_ncc' | 'ncc'>;

interface SuaNCCProps {
  isOpen: boolean;
  item: EditableSupplier | null;
  onClose: () => void;
  onSave: (item: SupplierEditItem) => void;
}

export default function SuaNCC({ isOpen, item, onClose, onSave }: SuaNCCProps) {
  const [formData, setFormData] = useState<SupplierEditItem | null>(item ? {
    ma_ncc: item.ma_ncc,
    ncc: item.ncc,
    nhom_nvl: item.nhom_nvl || '',
    phan_loai: item.phan_loai || '',
    tan_suat: item.tan_suat || '',
    nhom_hang: item.nhom_hang || '',
    nhom_ncc: item.nhom_ncc || '',
    chat_luong: String(item.chat_luong || ''),
    gia_nvl: String(item.gia_nvl || ''),
    tg_giao_dat: String(item.tg_giao_dat || ''),
    on_dinh: String(item.on_dinh || ''),
    uu_dai: String(item.uu_dai || ''),
    tt_toan: String(item.tt_toan || ''),
    tong_diem: String(item.tong_diem || ''),
    nguoi_lien_he: item.nguoi_lien_he || '',
    email: item.email || '',
    dia_chi: item.dia_chi || '',
    sdt: item.sdt || '',
    khu_vuc: item.khu_vuc || '',
    nvl_cung_cap: item.nvl_cung_cap || '',
    ghi_chu: item.ghi_chu || '',
  } : null);

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
  const scoreFields = [
    ['chat_luong', 'Chất lượng (1-6)'],
    ['gia_nvl', 'Giá NVL (1-6)'],
    ['tg_giao_dat', 'Thời gian giao đạt (1-6)'],
    ['on_dinh', 'Độ ổn định (1-6)'],
    ['uu_dai', 'Ưu đãi & Bảo hành (1-6)'],
    ['tt_toan', 'Phương thức TT (1-6)'],
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <div className="max-h-[calc(100vh-2rem)] w-full max-w-[760px] overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-bold text-slate-800">Sửa nhà cung cấp</h2>
          <button type="button" onClick={onClose} aria-label="Đóng" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><IconX size={17} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 px-6 py-5 sm:grid-cols-2">
            <label className={labelClass}>Mã NCC<input required className={inputClass} value={formData.ma_ncc} onChange={(event) => handleChange('ma_ncc', event.target.value)} /></label>
            <label className={labelClass}>Tên NCC<input required className={inputClass} value={formData.ncc} onChange={(event) => handleChange('ncc', event.target.value)} /></label>
            <label className={labelClass}>Phân loại NCC<select className={inputClass} value={formData.phan_loai} onChange={(event) => handleChange('phan_loai', event.target.value)}><option value="">—</option><option>I</option><option>II</option><option>III</option></select></label>
            <label className={labelClass}>Tần suất giao dịch<select className={inputClass} value={formData.tan_suat} onChange={(event) => handleChange('tan_suat', event.target.value)}><option value="">—</option><option>A</option><option>B</option></select></label>
            <label className={labelClass}>Nhóm hàng<select className={inputClass} value={formData.nhom_hang} onChange={(event) => handleChange('nhom_hang', event.target.value)}><option value="">—</option><option>Vật liệu</option><option>Thiết bị</option></select></label>
            <label className={labelClass}>Nhóm NCC<select className={inputClass} value={formData.nhom_ncc} onChange={(event) => handleChange('nhom_ncc', event.target.value)}><option value="">—</option><option>Chiến lược</option><option>Thông thường</option></select></label>
            {scoreFields.map(([field, label]) => (
              <label key={field} className={labelClass}>{label}<input className={inputClass} value={formData[field]} onChange={(event) => handleChange(field, event.target.value)} /></label>
            ))}
            <label className={labelClass}>Tổng điểm<input readOnly className={`${inputClass} bg-slate-50`} value={formData.tong_diem} /></label>
            <label className={labelClass}>Người liên hệ<input className={inputClass} value={formData.nguoi_lien_he} onChange={(event) => handleChange('nguoi_lien_he', event.target.value)} /></label>
            <label className={labelClass}>Điện thoại<input className={inputClass} value={formData.sdt} onChange={(event) => handleChange('sdt', event.target.value)} /></label>
            <label className={labelClass}>Email<input type="email" className={inputClass} value={formData.email} onChange={(event) => handleChange('email', event.target.value)} /></label>
            <label className={labelClass}>Địa chỉ<input className={inputClass} value={formData.dia_chi} onChange={(event) => handleChange('dia_chi', event.target.value)} /></label>
            <label className={labelClass}>Khu vực<input className={inputClass} value={formData.khu_vuc} onChange={(event) => handleChange('khu_vuc', event.target.value)} /></label>
            <label className={labelClass}>NVL cung cấp<input className={inputClass} value={formData.nvl_cung_cap} onChange={(event) => handleChange('nvl_cung_cap', event.target.value)} /></label>
            <label className={labelClass}>Ghi chú<input className={inputClass} value={formData.ghi_chu} onChange={(event) => handleChange('ghi_chu', event.target.value)} /></label>
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
