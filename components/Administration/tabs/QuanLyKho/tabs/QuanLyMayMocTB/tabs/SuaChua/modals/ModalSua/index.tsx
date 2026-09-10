"use client";

import React, { useState } from 'react';
import type { PhieuSuaChuaItem } from '../../index';

interface SuaChuaEditModalProps {
  isOpen: boolean;
  item: PhieuSuaChuaItem | null;
  onClose: () => void;
  onSave: (item: PhieuSuaChuaItem) => void;
}

export default function SuaChuaEditModal({ isOpen, item, onClose, onSave }: SuaChuaEditModalProps) {
  const [formData, setFormData] = useState<PhieuSuaChuaItem | null>(item ? { ...item } : null);

  if (!isOpen || !formData) return null;

  const handleChange = <K extends keyof PhieuSuaChuaItem>(field: K, value: PhieuSuaChuaItem[K]) => {
    setFormData((current) => {
      if (!current) return current;
      const updated = { ...current, [field]: value };
      if (field === 'so_luong' || field === 'don_gia' || field === 'thue_vat') {
        updated.thanh_tien = updated.so_luong * updated.don_gia * (1 + updated.thue_vat / 100);
      }
      return updated;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(formData);
    onClose();
  };

  const inputClass = 'mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-[#406c89] focus:outline-none focus:ring-1 focus:ring-[#406c89]';
  const labelClass = 'block text-xs font-medium text-slate-500';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-1 backdrop-blur-sm sm:p-2">
      <div className="max-h-[calc(100vh-1rem)] w-full max-w-[680px] overflow-y-auto rounded-lg border border-slate-200/80 bg-white shadow-2xl sm:max-h-[calc(100vh-2rem)]">
        <div className="px-6 pt-6 sm:px-6 sm:pt-7"><h3 className="text-sm font-bold text-slate-800">Sửa bản ghi</h3></div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-2 gap-y-3 px-6 py-5 sm:grid-cols-2 sm:gap-x-2 sm:gap-y-3">
            <label className={labelClass}>Phòng ban<input className={inputClass} value={formData.phong_ban} onChange={(event) => handleChange('phong_ban', event.target.value)} /></label>
            <label className={labelClass}>Mã máy<input className={inputClass} value={formData.ma_may} onChange={(event) => handleChange('ma_may', event.target.value)} /></label>
            <label className={labelClass}>Tên máy<input className={inputClass} value={formData.ten_may} onChange={(event) => handleChange('ten_may', event.target.value)} /></label>
            <label className={labelClass}>Năm<input className={inputClass} value={formData.nam} onChange={(event) => handleChange('nam', event.target.value)} /></label>
            <label className={labelClass}>Ngày báo lỗi<input className={inputClass} value={formData.ngay_bao_loi} onChange={(event) => handleChange('ngay_bao_loi', event.target.value)} /></label>
            <label className={labelClass}>Tình trạng báo lỗi<input className={inputClass} value={formData.tinh_trang_bao_loi} onChange={(event) => handleChange('tinh_trang_bao_loi', event.target.value)} /></label>
            <label className={labelClass}>Người báo<input className={inputClass} value={formData.nguoi_bao_loi} onChange={(event) => handleChange('nguoi_bao_loi', event.target.value)} /></label>
            <label className={labelClass}>Phương án xử lý<input className={inputClass} value={formData.phuong_an_xu_ly} onChange={(event) => handleChange('phuong_an_xu_ly', event.target.value)} /></label>
            <label className={labelClass}>Ngày thay LK<input className={inputClass} value={formData.ngay_thay_linh_kien} onChange={(event) => handleChange('ngay_thay_linh_kien', event.target.value)} /></label>
            <label className={labelClass}>Nội dung<input className={inputClass} value={formData.noi_dung} onChange={(event) => handleChange('noi_dung', event.target.value)} /></label>
            <label className={labelClass}>Đơn vị<input className={inputClass} value={formData.don_vi_tinh} onChange={(event) => handleChange('don_vi_tinh', event.target.value)} /></label>
            <label className={labelClass}>Số lượng<input className={inputClass} type="number" min="0" value={formData.so_luong} onChange={(event) => handleChange('so_luong', Number(event.target.value) || 0)} /></label>
            <label className={labelClass}>Đơn giá<input className={inputClass} type="number" min="0" value={formData.don_gia} onChange={(event) => handleChange('don_gia', Number(event.target.value) || 0)} /></label>
            <label className={labelClass}>VAT<input className={inputClass} type="number" min="0" value={formData.thue_vat} onChange={(event) => handleChange('thue_vat', Number(event.target.value) || 0)} /></label>
            <label className={labelClass}>Thành tiền<input className={inputClass} type="number" min="0" value={formData.thanh_tien} onChange={(event) => handleChange('thanh_tien', Number(event.target.value) || 0)} /></label>
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