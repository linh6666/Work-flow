"use client";

import React, { useState, useEffect } from 'react';
import { TonKhoItem } from '../../index';

interface SuaVatTuModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: TonKhoItem | null;
  onSave: (updatedItem: TonKhoItem) => void;
}

export default function SuaVatTuModal({
  isOpen,
  onClose,
  item,
  onSave,
}: SuaVatTuModalProps) {
  const [formData, setFormData] = useState<TonKhoItem>({
    ngay_nhap: '',
    nhom_hang_chinh: '',
    ma_hang: '',
    ten_hang: '',
    thong_so: '',
    dvt: '',
    ton_dau_ky: 0,
    sl_nhap: 0,
    sl_xuat: 0,
    ton_cuoi_ky: 0,
    don_gia_nhap_kho: 0,
    tt_nhap: 0,
    tt_xuat: 0,
    tt_ton_kho: 0,
    tinh_trang_hh: 'Đủ hàng',
    ma_ncc: '',
    ten_ncc: '',
  });

  useEffect(() => {
    if (isOpen && item) {
      setFormData({ ...item });
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const handleChange = (field: keyof TonKhoItem, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (
        field === 'ton_dau_ky' ||
        field === 'sl_nhap' ||
        field === 'sl_xuat' ||
        field === 'don_gia_nhap_kho'
      ) {
        const tonDau = field === 'ton_dau_ky' ? Number(value) : Number(updated.ton_dau_ky);
        const slNhap = field === 'sl_nhap' ? Number(value) : Number(updated.sl_nhap);
        const slXuat = field === 'sl_xuat' ? Number(value) : Number(updated.sl_xuat);
        const gia = field === 'don_gia_nhap_kho' ? Number(value) : Number(updated.don_gia_nhap_kho);

        const tonCuoi = tonDau + slNhap - slXuat;
        updated.ton_cuoi_ky = tonCuoi;
        updated.tt_nhap = slNhap * gia;
        updated.tt_xuat = slXuat * gia;
        updated.tt_ton_kho = tonCuoi * gia;
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;

    onSave({
      ...item,
      ...formData,
      ton_dau_ky: Number(formData.ton_dau_ky) || 0,
      sl_nhap: Number(formData.sl_nhap) || 0,
      sl_xuat: Number(formData.sl_xuat) || 0,
      ton_cuoi_ky: (Number(formData.ton_dau_ky) || 0) + (Number(formData.sl_nhap) || 0) - (Number(formData.sl_xuat) || 0),
      don_gia_nhap_kho: Number(formData.don_gia_nhap_kho) || 0,
      tt_nhap: (Number(formData.sl_nhap) || 0) * (Number(formData.don_gia_nhap_kho) || 0),
      tt_xuat: (Number(formData.sl_xuat) || 0) * (Number(formData.don_gia_nhap_kho) || 0),
      tt_ton_kho:
        ((Number(formData.ton_dau_ky) || 0) + (Number(formData.sl_nhap) || 0) - (Number(formData.sl_xuat) || 0)) *
        (Number(formData.don_gia_nhap_kho) || 0),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-[720px] max-h-[90vh] overflow-y-auto p-7 text-slate-800 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="text-base font-bold text-slate-900 mb-5">
          Sửa thông tin tồn kho
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-5 gap-y-3.5 text-xs">
            {/* Ngày nhập & Nhóm hàng chính */}
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                Ngày nhập
              </label>
              <input
                type="text"
                value={formData.ngay_nhap || ''}
                onChange={(e) => handleChange('ngay_nhap', e.target.value)}
                placeholder="VD: 20/01/2026"
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                Nhóm hàng chính
              </label>
              <input
                type="text"
                value={formData.nhom_hang_chinh}
                onChange={(e) => handleChange('nhom_hang_chinh', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                Mã hàng
              </label>
              <input
                type="text"
                value={formData.ma_hang}
                onChange={(e) => handleChange('ma_hang', e.target.value)}
                className="w-full px-3.5 py-2 text-sm font-mono text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>

            {/* Tên hàng & Thông số */}
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                Tên hàng
              </label>
              <input
                type="text"
                value={formData.ten_hang}
                onChange={(e) => handleChange('ten_hang', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                Thông số
              </label>
              <input
                type="text"
                value={formData.thong_so}
                onChange={(e) => handleChange('thong_so', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>

            {/* ĐVT & Tồn đầu kỳ */}
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                ĐVT
              </label>
              <input
                type="text"
                value={formData.dvt}
                onChange={(e) => handleChange('dvt', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                Tồn đầu kỳ
              </label>
              <input
                type="number"
                value={formData.ton_dau_ky === 0 ? '' : formData.ton_dau_ky}
                onChange={(e) => handleChange('ton_dau_ky', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>

            {/* SL nhập & SL xuất */}
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                SL nhập
              </label>
              <input
                type="number"
                value={formData.sl_nhap === 0 ? '' : formData.sl_nhap}
                onChange={(e) => handleChange('sl_nhap', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                SL xuất
              </label>
              <input
                type="number"
                value={formData.sl_xuat === 0 ? '' : formData.sl_xuat}
                onChange={(e) => handleChange('sl_xuat', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>

            {/* Tồn cuối kỳ & Đơn giá nhập kho */}
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                Tồn cuối kỳ (tự động tính)
              </label>
              <div className="w-full px-3.5 py-2 text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg">
                {formData.ton_cuoi_ky.toLocaleString()}
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                Đơn giá nhập kho (đ)
              </label>
              <input
                type="number"
                value={formData.don_gia_nhap_kho === 0 ? '' : formData.don_gia_nhap_kho}
                onChange={(e) => handleChange('don_gia_nhap_kho', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>

            {/* TT tồn kho & Tình trạng HH */}
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                TT tồn kho (tự động tính)
              </label>
              <div className="w-full px-3.5 py-2 text-sm font-bold text-[#406c89] bg-slate-50 border border-slate-200 rounded-lg">
                {formData.tt_ton_kho.toLocaleString()} đ
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                Tình trạng HH
              </label>
              <select
                value={formData.tinh_trang_hh}
                onChange={(e) => handleChange('tinh_trang_hh', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors bg-white cursor-pointer"
              >
                <option value="Đủ hàng">Đủ hàng</option>
                <option value="Tồn kho tốt">Tồn kho tốt</option>
                <option value="Sắp hết">Sắp hết</option>
                <option value="Cần bổ sung">Cần bổ sung</option>
                <option value="Hàng mới">Hàng mới</option>
                <option value="Đạt chuẩn">Đạt chuẩn</option>
              </select>
            </div>

            {/* Mã NCC & Tên NCC */}
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                Mã NCC
              </label>
              <input
                type="text"
                value={formData.ma_ncc}
                onChange={(e) => handleChange('ma_ncc', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                Tên NCC
              </label>
              <input
                type="text"
                value={formData.ten_ncc}
                onChange={(e) => handleChange('ten_ncc', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-7 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#406c89] hover:bg-[#345870] active:bg-[#2a475b] text-white text-sm font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
