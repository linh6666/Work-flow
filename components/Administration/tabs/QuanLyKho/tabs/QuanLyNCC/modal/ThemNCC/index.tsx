"use client";

import React, { useState } from 'react';
import { IconX } from '@tabler/icons-react';

export interface NewSupplierData {
  nhom_nvl: string;
  nhom_hang: string;
  nhom_ncc: string;
  phan_loai: string;
  tan_suat: string;
  chat_luong: number;
  gia_nvl: number;
  tg_giao_dat: number;
  on_dinh: number;
  uu_dai: number;
  tt_toan: number;
  tong_diem: number;
  ma_ncc: string;
  ncc: string;
  nguoi_lien_he: string;
  email: string;
  dia_chi: string;
  sdt: string;
  khu_vuc: string;
  nvl_cung_cap: string;
  ghi_chu: string;
}

interface ThemNCCProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: NewSupplierData) => void;
}

const initialForm: NewSupplierData = {
  nhom_nvl: '',
  nhom_hang: '',
  nhom_ncc: '',
  phan_loai: 'I',
  tan_suat: 'A',
  chat_luong: 1,
  gia_nvl: 1,
  tg_giao_dat: 1,
  on_dinh: 1,
  uu_dai: 1,
  tt_toan: 1,
  tong_diem: 6,
  ma_ncc: '',
  ncc: '',
  nguoi_lien_he: '',
  email: '',
  dia_chi: '',
  sdt: '',
  khu_vuc: '',
  nvl_cung_cap: '',
  ghi_chu: '',
};

export default function ThemNCC({ isOpen, onClose, onSave }: ThemNCCProps) {
  const [formData, setFormData] = useState<NewSupplierData>(initialForm);

  if (!isOpen) return null;

  const handleChange = <K extends keyof NewSupplierData>(field: K, value: NewSupplierData[K]) => {
    setFormData((current) => {
      const next = { ...current, [field]: value };
      if (['chat_luong', 'gia_nvl', 'tg_giao_dat', 'on_dinh', 'uu_dai', 'tt_toan'].includes(field)) {
        next.tong_diem = next.chat_luong + next.gia_nvl + next.tg_giao_dat + next.on_dinh + next.uu_dai + next.tt_toan;
      }
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(formData);
    setFormData(initialForm);
  };

  const inputClass = 'mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-[#406c89] focus:outline-none focus:ring-1 focus:ring-[#406c89]';
  const labelClass = 'block text-xs font-medium text-slate-600';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <div className="max-h-[calc(100vh-2rem)] w-full max-w-[760px] overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-bold text-slate-800">Thêm nhà cung cấp</h2>
          <button type="button" onClick={onClose} aria-label="Đóng" className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
            <IconX size={17} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 px-6 py-5 sm:grid-cols-2">
            <label className={labelClass}>Mã nhà cung cấp<input required value={formData.ma_ncc} onChange={(event) => handleChange('ma_ncc', event.target.value)} className={inputClass} placeholder="VD: NCC_VN_MB_034" /></label>
            <label className={labelClass}>Tên nhà cung cấp<input required value={formData.ncc} onChange={(event) => handleChange('ncc', event.target.value)} className={inputClass} /></label>
            <label className={labelClass}>Phân loại NCC<select value={formData.phan_loai} onChange={(event) => handleChange('phan_loai', event.target.value)} className={inputClass}><option>I</option><option>II</option><option>III</option></select></label>
            <label className={labelClass}>Tần suất giao dịch<select value={formData.tan_suat} onChange={(event) => handleChange('tan_suat', event.target.value)} className={inputClass}><option>A</option><option>B</option></select></label>
            <label className={labelClass}>Nhóm hàng<select value={formData.nhom_hang} onChange={(event) => handleChange('nhom_hang', event.target.value)} className={inputClass}><option value="">—</option><option>Vật liệu</option><option>Thiết bị</option></select></label>
            <label className={labelClass}>Nhóm NCC<select value={formData.nhom_ncc} onChange={(event) => handleChange('nhom_ncc', event.target.value)} className={inputClass}><option value="">—</option><option>Chiến lược</option><option>Thông thường</option></select></label>
            {([
              ['chat_luong', 'Chất lượng (1-6)'],
              ['gia_nvl', 'Giá NVL (1-6)'],
              ['tg_giao_dat', 'Thời gian giao đạt (1-6)'],
              ['on_dinh', 'Độ ổn định (1-6)'],
              ['uu_dai', 'Ưu đãi & Bảo hành (1-6)'],
              ['tt_toan', 'Phương thức TT (1-6)'],
            ] as const).map(([field, label]) => (
              <label key={field} className={labelClass}>{label}<input type="number" min="1" max="6" value={formData[field]} onChange={(event) => handleChange(field, Number(event.target.value) || 1)} className={inputClass} /></label>
            ))}
            <label className={labelClass}>Tổng điểm<input readOnly value={formData.tong_diem} className={`${inputClass} bg-slate-50`} /></label>
            <label className={labelClass}>Người liên hệ<input value={formData.nguoi_lien_he} onChange={(event) => handleChange('nguoi_lien_he', event.target.value)} className={inputClass} /></label>
            <label className={labelClass}>Điện thoại<input value={formData.sdt} onChange={(event) => handleChange('sdt', event.target.value)} className={inputClass} /></label>
            <label className={labelClass}>Email<input type="email" value={formData.email} onChange={(event) => handleChange('email', event.target.value)} className={inputClass} /></label>
            <label className={labelClass}>Địa chỉ<input value={formData.dia_chi} onChange={(event) => handleChange('dia_chi', event.target.value)} className={inputClass} /></label>
            <label className={labelClass}>Khu vực<input value={formData.khu_vuc} onChange={(event) => handleChange('khu_vuc', event.target.value)} className={inputClass} /></label>
            <label className={labelClass}>NVL cung cấp<input value={formData.nvl_cung_cap} onChange={(event) => handleChange('nvl_cung_cap', event.target.value)} className={inputClass} /></label>
            <label className={labelClass}>Ghi chú<input value={formData.ghi_chu} onChange={(event) => handleChange('ghi_chu', event.target.value)} className={inputClass} /></label>
          </div>
          <div className="flex justify-end gap-2.5 border-t border-slate-100 px-6 py-4">
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">Hủy</button>
            <button type="submit" className="rounded-lg bg-[#406c89] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#345870]">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
}
