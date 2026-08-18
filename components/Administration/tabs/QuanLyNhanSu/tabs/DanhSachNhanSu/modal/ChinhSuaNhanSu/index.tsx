"use client";

import React from 'react';
import { IconX } from '@tabler/icons-react';
import {
  NhanSuItem,
  PHONG_BAN_LIST,
  TRANG_THAI_LIST,
  GIOI_TINH_LIST,
  formatVND,
} from '../../index';

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

  const inputCls = 'w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400 text-xs';
  const labelCls = 'block font-semibold text-slate-700 mb-1 text-xs';
  const selectCls = 'w-full h-8 px-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-400 bg-white text-xs';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-800">
            {editingItem ? 'Chỉnh sửa nhân sự' : 'Thêm Nhân sự mới'}
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

          {/* Row 1: Mã nhân viên + Họ tên */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Mã nhân viên</label>
              <input
                type="text"
                required
                value={formData.maNV || ''}
                onChange={(e) => setFormData({ ...formData, maNV: e.target.value })}
                className={inputCls}
                placeholder="VD: NV009"
              />
            </div>
            <div>
              <label className={labelCls}>Họ tên <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={formData.hoTen || ''}
                onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })}
                className={inputCls}
                placeholder="VD: Nguyễn Văn A"
              />
            </div>
          </div>

          {/* Row 2: Phòng ban + Chức vụ */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Phòng ban</label>
              <select
                value={formData.phongBan || PHONG_BAN_LIST[0]}
                onChange={(e) => setFormData({ ...formData, phongBan: e.target.value })}
                className={selectCls}
              >
                {PHONG_BAN_LIST.map((pb) => (
                  <option key={pb} value={pb}>{pb}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Chức vụ</label>
              <input
                type="text"
                value={formData.chucVu || ''}
                onChange={(e) => setFormData({ ...formData, chucVu: e.target.value })}
                className={inputCls}
                placeholder="VD: BTG Điện"
              />
            </div>
          </div>

          {/* Row 3: Trạng thái + Bậc lương (hiện tại) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Trạng thái</label>
              <select
                value={formData.trangThai || TRANG_THAI_LIST[0]}
                onChange={(e) => setFormData({ ...formData, trangThai: e.target.value })}
                className={selectCls}
              >
                {TRANG_THAI_LIST.map((tt) => (
                  <option key={tt} value={tt}>{tt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Bậc lương (hiện tại)</label>
              <input
                type="text"
                value={formData.bacLuong || ''}
                onChange={(e) => setFormData({ ...formData, bacLuong: e.target.value })}
                className={inputCls}
                placeholder="VD: C.05.1"
              />
            </div>
          </div>

          {/* Row 4: Mức lương cứng + Mức lương mềm */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Mức lương cứng</label>
              <input
                type="number"
                min={0}
                value={formData.mucLuongCung ?? 0}
                onChange={(e) => setFormData({ ...formData, mucLuongCung: Number(e.target.value) })}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Mức lương mềm</label>
              <input
                type="number"
                min={0}
                value={formData.mucLuongMem ?? 0}
                onChange={(e) => setFormData({ ...formData, mucLuongMem: Number(e.target.value) })}
                className={inputCls}
              />
            </div>
          </div>

          {/* Row 5: Tổng mức lương cơ bản + Tổng trợ cấp */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Tổng mức lương cơ bản</label>
              <div className="h-8 px-2.5 border border-slate-100 bg-slate-50 rounded-lg flex items-center text-xs font-semibold text-slate-600">
                {formatVND((formData.mucLuongCung ?? 0) + (formData.mucLuongMem ?? 0))}
              </div>
            </div>
            <div>
              <label className={labelCls}>Tổng trợ cấp</label>
              <input
                type="number"
                min={0}
                value={formData.tongTroCap ?? 0}
                onChange={(e) => setFormData({ ...formData, tongTroCap: Number(e.target.value) })}
                className={inputCls}
              />
            </div>
          </div>

          {/* Row 6: Tổng thu nhập + Thời điểm tăng lương */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Tổng thu nhập</label>
              <div className="h-8 px-2.5 border border-emerald-100 bg-emerald-50 rounded-lg flex items-center text-xs font-bold text-emerald-700">
                {formatVND((formData.mucLuongCung ?? 0) + (formData.mucLuongMem ?? 0) + (formData.tongTroCap ?? 0))}
              </div>
            </div>
            <div>
              <label className={labelCls}>Thời điểm tăng lương</label>
              <input
                type="text"
                value={formData.thoiDiemTangLuong || ''}
                onChange={(e) => setFormData({ ...formData, thoiDiemTangLuong: e.target.value })}
                className={inputCls}
                placeholder="VD: 03/2025"
              />
            </div>
          </div>

          {/* Row 7: Thời điểm tăng bậc + Ngày vào */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Thời điểm tăng bậc & bậc lương dự kiến</label>
              <input
                type="text"
                value={formData.thoiDiemTangBacBacLuongDuKien || ''}
                onChange={(e) => setFormData({ ...formData, thoiDiemTangBacBacLuongDuKien: e.target.value })}
                className={inputCls}
                placeholder="VD: 03/2026 — Bậc 6"
              />
            </div>
            <div>
              <label className={labelCls}>Ngày vào</label>
              <input
                type="date"
                value={formData.ngayVao || ''}
                onChange={(e) => setFormData({ ...formData, ngayVao: e.target.value })}
                className={inputCls}
              />
            </div>
          </div>

          {/* Row 8: Giới tính + Điện thoại */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Giới tính</label>
              <select
                value={formData.gioiTinh || GIOI_TINH_LIST[0]}
                onChange={(e) => setFormData({ ...formData, gioiTinh: e.target.value })}
                className={selectCls}
              >
                {GIOI_TINH_LIST.map((gt) => (
                  <option key={gt} value={gt}>{gt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Điện thoại</label>
              <input
                type="text"
                value={formData.dienThoai || ''}
                onChange={(e) => setFormData({ ...formData, dienThoai: e.target.value })}
                className={inputCls}
                placeholder="VD: 0901234567"
              />
            </div>
          </div>

          {/* Row 9: Email */}
          <div>
            <label className={labelCls}>Email</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputCls}
              placeholder="VD: nguyen.van.a@company.com"
            />
          </div>

          {/* Row 10: Ghi chú lương */}
          <div>
            <label className={labelCls}>Ghi chú lương</label>
            <textarea
              rows={3}
              value={formData.ghiChuLuong || ''}
              onChange={(e) => setFormData({ ...formData, ghiChuLuong: e.target.value })}
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400 text-xs resize-y"
              placeholder="Ghi chú liên quan đến lương..."
            />
          </div>

          {/* Row 11: Ghi chú */}
          <div>
            <label className={labelCls}>Ghi chú</label>
            <textarea
              rows={3}
              value={formData.ghiChu || ''}
              onChange={(e) => setFormData({ ...formData, ghiChu: e.target.value })}
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400 text-xs resize-y"
              placeholder="Ghi chú thêm..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold cursor-pointer transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              style={{ backgroundColor: '#406c89' }}
              className="px-4 py-1.5 rounded-lg text-white text-xs font-bold shadow-sm cursor-pointer transition"
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
