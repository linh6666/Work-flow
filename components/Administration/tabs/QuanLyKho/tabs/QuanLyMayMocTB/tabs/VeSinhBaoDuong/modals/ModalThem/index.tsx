"use client";

import React, { useState } from 'react';
import type { PhieuVeSinhBaoDuongItem } from '../../index';

interface ModalThemProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: PhieuVeSinhBaoDuongItem) => void;
}

type MaintenanceForm = {
  phong_ban: string;
  ma_may: string;
  ten_may: string;
  nam: string;
  loai: string;
  tan_suat: string;
  ngay_thuc_hien: string;
  noi_dung: string;
  nguoi_thuc_hien: string;
  ghi_chu: string;
};

const initialForm: MaintenanceForm = {
  phong_ban: '', ma_may: '', ten_may: '', nam: String(new Date().getFullYear()), loai: '', tan_suat: '', ngay_thuc_hien: '', noi_dung: '', nguoi_thuc_hien: '', ghi_chu: '',
};

export default function ModalThem({ isOpen, onClose, onSave }: ModalThemProps) {
  const [formData, setFormData] = useState<MaintenanceForm>(initialForm);

  if (!isOpen) return null;

  const handleChange = <K extends keyof MaintenanceForm>(field: K, value: MaintenanceForm[K]) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({
      id: `maintenance-${Date.now()}`,
      phong_ban: formData.phong_ban,
      ma_may: formData.ma_may,
      ten_may: formData.ten_may,
      nam: formData.nam,
      ngay_bao_loi: formData.ngay_thuc_hien,
      tinh_trang_bao_loi: formData.loai,
      nguoi_bao_loi: formData.nguoi_thuc_hien,
      phuong_an_xu_ly: formData.tan_suat,
      ngay_thay_linh_kien: '',
      noi_dung: formData.noi_dung,
      don_vi_tinh: '',
      so_luong: 0,
      don_gia: 0,
      thue_vat: 0,
      thanh_tien: 0,
      ghi_chu: formData.ghi_chu,
    });
    setFormData(initialForm);
  };

  const inputClass = 'mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-[#406c89] focus:outline-none focus:ring-1 focus:ring-[#406c89]';
  const labelClass = 'block text-xs font-medium text-slate-500';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-1 backdrop-blur-sm sm:p-2">
      <div className="max-h-[calc(100vh-1rem)] w-full max-w-[680px] overflow-y-auto rounded-lg border border-slate-200/80 bg-white shadow-2xl sm:max-h-[calc(100vh-2rem)]">
        <div className="px-6 pt-6 pb-2"><h3 className="text-sm font-bold text-slate-800">Thêm bản ghi bảo dưỡng</h3></div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-2 gap-y-3 px-6 py-5 sm:grid-cols-2">
            <label className={labelClass}>Phòng ban<input required className={inputClass} value={formData.phong_ban} onChange={(event) => handleChange('phong_ban', event.target.value)} /></label>
            <label className={labelClass}>Mã máy<input required className={inputClass} value={formData.ma_may} onChange={(event) => handleChange('ma_may', event.target.value)} /></label>
            <label className={labelClass}>Tên máy<input required className={inputClass} value={formData.ten_may} onChange={(event) => handleChange('ten_may', event.target.value)} /></label>
            <label className={labelClass}>Năm<input className={inputClass} value={formData.nam} onChange={(event) => handleChange('nam', event.target.value)} /></label>
            <label className={labelClass}>Loại<select className={inputClass} value={formData.loai} onChange={(event) => handleChange('loai', event.target.value)}><option value="">—</option><option>Vệ sinh</option><option>Bảo dưỡng</option></select></label>
            <label className={labelClass}>Tần suất<select className={inputClass} value={formData.tan_suat} onChange={(event) => handleChange('tan_suat', event.target.value)}><option value="">—</option><option>Hàng tuần</option><option>Hàng tháng</option><option>Hàng quý</option><option>Hàng năm</option></select></label>
            <label className={labelClass}>Ngày thực hiện<input type="date" className={inputClass} value={formData.ngay_thuc_hien} onChange={(event) => handleChange('ngay_thuc_hien', event.target.value)} /></label>
            <label className={labelClass}>Nội dung<input className={inputClass} value={formData.noi_dung} onChange={(event) => handleChange('noi_dung', event.target.value)} /></label>
            <label className={labelClass}>Người thực hiện<input className={inputClass} value={formData.nguoi_thuc_hien} onChange={(event) => handleChange('nguoi_thuc_hien', event.target.value)} /></label>
            <label className={labelClass}>Ghi chú<input className={inputClass} value={formData.ghi_chu} onChange={(event) => handleChange('ghi_chu', event.target.value)} /></label>
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
