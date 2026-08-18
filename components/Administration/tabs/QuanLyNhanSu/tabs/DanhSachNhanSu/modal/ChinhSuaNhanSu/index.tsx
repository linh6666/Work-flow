"use client";

import React from 'react';
import { IconX } from '@tabler/icons-react';
import { NhanSuItem, PHONG_BAN_LIST, BAC_LUONG_LIST, formatVND } from '../../index';

interface ChinhSuaNhanSuModalProps {
  isOpen: boolean;
  editingItem: NhanSuItem | null;
  formData: Partial<NhanSuItem>;
  setFormData: (data: Partial<NhanSuItem>) => void;
  onSave: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function ChinhSuaNhanSuModal({
  isOpen,
  editingItem,
  formData,
  setFormData,
  onSave,
  onClose,
}: ChinhSuaNhanSuModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-800">
            {editingItem ? 'Chỉnh sửa thông tin Nhân sự' : 'Thêm Nhân sự mới'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSave} className="p-5 space-y-3.5 text-xs max-h-[75vh] overflow-y-auto">
          {/* Row 1: Mã NV + Họ và tên */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mã NV <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={formData.maNV || ''}
                onChange={(e) => setFormData({ ...formData, maNV: e.target.value })}
                className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
                placeholder="VD: NV009"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={formData.hoTen || ''}
                onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })}
                className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
                placeholder="VD: Nguyễn Văn A"
              />
            </div>
          </div>

          {/* Row 2: Phòng ban + Chức vụ */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phòng ban</label>
              <select
                value={formData.phongBan}
                onChange={(e) => setFormData({ ...formData, phongBan: e.target.value })}
                className="w-full h-8 px-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-400 bg-white"
              >
                {PHONG_BAN_LIST.map((pb) => (
                  <option key={pb} value={pb}>{pb}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Chức vụ</label>
              <input
                type="text"
                value={formData.chucVu || ''}
                onChange={(e) => setFormData({ ...formData, chucVu: e.target.value })}
                className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
                placeholder="VD: Kỹ thuật viên"
              />
            </div>
          </div>

          {/* Row 3: Bậc lương */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Bậc lương</label>
            <select
              value={formData.bacLuong}
              onChange={(e) => setFormData({ ...formData, bacLuong: e.target.value })}
              className="w-full h-8 px-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-400 bg-white"
            >
              {BAC_LUONG_LIST.map((bl) => (
                <option key={bl} value={bl}>{bl}</option>
              ))}
            </select>
          </div>

          {/* Row 4: Mức lương cứng + Mức lương mềm */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mức lương cứng (VNĐ)</label>
              <input
                type="number"
                min={0}
                value={formData.mucLuongCung ?? 0}
                onChange={(e) => setFormData({ ...formData, mucLuongCung: Number(e.target.value) })}
                className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mức lương mềm (VNĐ)</label>
              <input
                type="number"
                min={0}
                value={formData.mucLuongMem ?? 0}
                onChange={(e) => setFormData({ ...formData, mucLuongMem: Number(e.target.value) })}
                className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
              />
            </div>
          </div>

          {/* Row 5: Tổng mức lương cơ bản (computed) + Tổng trợ cấp */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tổng mức lương cơ bản</label>
              <div className="h-8 px-2.5 border border-slate-100 bg-slate-50 rounded-lg flex items-center font-semibold text-slate-600">
                {formatVND((formData.mucLuongCung ?? 0) + (formData.mucLuongMem ?? 0))}
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tổng trợ cấp (VNĐ)</label>
              <input
                type="number"
                min={0}
                value={formData.tongTroCap ?? 0}
                onChange={(e) => setFormData({ ...formData, tongTroCap: Number(e.target.value) })}
                className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
              />
            </div>
          </div>

          {/* Row 6: Tổng thu nhập (computed) */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Tổng thu nhập</label>
            <div className="h-8 px-2.5 border border-emerald-100 bg-emerald-50 rounded-lg flex items-center font-bold text-emerald-700">
              {formatVND((formData.mucLuongCung ?? 0) + (formData.mucLuongMem ?? 0) + (formData.tongTroCap ?? 0))}
            </div>
          </div>

          {/* Row 7: Thời điểm tăng lương + Thời điểm tăng bậc */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Thời điểm tăng lương</label>
              <input
                type="text"
                value={formData.thoiDiemTangLuong || ''}
                onChange={(e) => setFormData({ ...formData, thoiDiemTangLuong: e.target.value })}
                className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
                placeholder="VD: 03/2025"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tăng bậc & bậc lương dự kiến</label>
              <input
                type="text"
                value={formData.thoiDiemTangBacBacLuongDuKien || ''}
                onChange={(e) => setFormData({ ...formData, thoiDiemTangBacBacLuongDuKien: e.target.value })}
                className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
                placeholder="VD: 03/2026 — Bậc 6"
              />
            </div>
          </div>

          {/* Row 8: Ghi chú */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Ghi chú</label>
            <input
              type="text"
              value={formData.ghiChu || ''}
              onChange={(e) => setFormData({ ...formData, ghiChu: e.target.value })}
              className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
              placeholder="Ghi chú thêm..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              style={{ backgroundColor: '#406c89' }}
              className="px-4 py-1.5 rounded-lg text-white font-bold shadow-sm cursor-pointer transition"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#30536b')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#406c89')}
            >
              {editingItem ? 'Lưu thay đổi' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
