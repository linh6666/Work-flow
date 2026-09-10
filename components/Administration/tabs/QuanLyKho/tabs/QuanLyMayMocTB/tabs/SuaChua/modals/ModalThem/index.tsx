"use client";

import React, { useState } from 'react';
import type { PhieuSuaChuaItem } from '../../index';

interface ModalThemProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: PhieuSuaChuaItem) => void;
}

type NewRepairForm = Omit<PhieuSuaChuaItem, 'id' | 'thanh_tien'>;

const initialForm: NewRepairForm = {
  phong_ban: '',
  ma_may: '',
  ten_may: '',
  nam: String(new Date().getFullYear()),
  ngay_bao_loi: '',
  tinh_trang_bao_loi: '',
  nguoi_bao_loi: '',
  phuong_an_xu_ly: '',
  ngay_thay_linh_kien: '',
  noi_dung: '',
  don_vi_tinh: '',
  so_luong: 0,
  don_gia: 0,
  thue_vat: 0,
  ghi_chu: '',
};

export default function ModalThem({ isOpen, onClose, onSave }: ModalThemProps) {
  const [formData, setFormData] = useState<NewRepairForm>(initialForm);

  if (!isOpen) return null;

  const handleChange = <K extends keyof NewRepairForm>(field: K, value: NewRepairForm[K]) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({
      ...formData,
      id: `repair-${Date.now()}`,
      thanh_tien: formData.so_luong * formData.don_gia * (1 + formData.thue_vat / 100),
    });
    setFormData(initialForm);
  };

  const inputClass = 'mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-[#406c89] focus:outline-none focus:ring-1 focus:ring-[#406c89]';
  const labelClass = 'block text-xs font-medium text-slate-500';
  const total = formData.so_luong * formData.don_gia * (1 + formData.thue_vat / 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-1 backdrop-blur-sm sm:p-2">
      <div className="max-h-[calc(100vh-1rem)] w-full max-w-[680px] overflow-y-auto rounded-lg border border-slate-200/80 bg-white shadow-2xl sm:max-h-[calc(100vh-2rem)]">
        <div className="px-6 pt-6 pb-2"><h3 className="text-sm font-bold text-slate-800">Thêm bản ghi sửa chữa</h3></div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-2 gap-y-3 px-6 py-5 sm:grid-cols-2">
            <label className={labelClass}>Phòng ban<input required className={inputClass} value={formData.phong_ban} onChange={(event) => handleChange('phong_ban', event.target.value)} /></label>
            <label className={labelClass}>Mã máy<input required className={inputClass} value={formData.ma_may} onChange={(event) => handleChange('ma_may', event.target.value)} /></label>
            <label className={labelClass}>Tên máy<input required className={inputClass} value={formData.ten_may} onChange={(event) => handleChange('ten_may', event.target.value)} /></label>
            <label className={labelClass}>Năm<input className={inputClass} value={formData.nam} onChange={(event) => handleChange('nam', event.target.value)} /></label>
            <label className={labelClass}>Ngày báo lỗi<input className={inputClass} value={formData.ngay_bao_loi} onChange={(event) => handleChange('ngay_bao_loi', event.target.value)} /></label>
            <label className={labelClass}>Tình trạng báo lỗi<input className={inputClass} value={formData.tinh_trang_bao_loi} onChange={(event) => handleChange('tinh_trang_bao_loi', event.target.value)} /></label>
            <label className={labelClass}>Người báo<input className={inputClass} value={formData.nguoi_bao_loi} onChange={(event) => handleChange('nguoi_bao_loi', event.target.value)} /></label>
            <label className={labelClass}>Phương án xử lý<input className={inputClass} value={formData.phuong_an_xu_ly} onChange={(event) => handleChange('phuong_an_xu_ly', event.target.value)} /></label>
            <label className={labelClass}>Ngày thay LK<input className={inputClass} value={formData.ngay_thay_linh_kien} onChange={(event) => handleChange('ngay_thay_linh_kien', event.target.value)} /></label>
            <label className={labelClass}>Nội dung<input className={inputClass} value={formData.noi_dung} onChange={(event) => handleChange('noi_dung', event.target.value)} /></label>
            <label className={labelClass}>Đơn vị<input className={inputClass} value={formData.don_vi_tinh} onChange={(event) => handleChange('don_vi_tinh', event.target.value)} /></label>
            <label className={labelClass}>Số lượng<input type="number" min="0" className={inputClass} value={formData.so_luong} onChange={(event) => handleChange('so_luong', Number(event.target.value) || 0)} /></label>
            <label className={labelClass}>Đơn giá<input type="number" min="0" className={inputClass} value={formData.don_gia} onChange={(event) => handleChange('don_gia', Number(event.target.value) || 0)} /></label>
            <label className={labelClass}>VAT<input type="number" min="0" className={inputClass} value={formData.thue_vat} onChange={(event) => handleChange('thue_vat', Number(event.target.value) || 0)} /></label>
            <label className={labelClass}>Thành tiền<input readOnly className={`${inputClass} bg-slate-50`} value={total} /></label>
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
