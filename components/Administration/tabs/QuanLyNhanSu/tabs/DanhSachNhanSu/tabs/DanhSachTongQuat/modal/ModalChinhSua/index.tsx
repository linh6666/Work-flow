"use client";

import React, { useState, useEffect } from 'react';
import { IconX } from '@tabler/icons-react';
import {
  NhanSuItem,
  PHONG_BAN_LIST,
  TRANG_THAI_LIST,
  GIOI_TINH_LIST,
  BAC_LUONG_LIST,
  formatVND,
} from '../../index';

interface ModalChinhSuaProps {
  isOpen: boolean;
  item: NhanSuItem | null;
  onSave: (updated: NhanSuItem) => void;
  onClose: () => void;
}

export default function ModalChinhSua({
  isOpen,
  item,
  onSave,
  onClose,
}: ModalChinhSuaProps) {
  const [formData, setFormData] = useState<Partial<NhanSuItem>>({});

  useEffect(() => {
    if (item) {
      setFormData({ ...item });
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hoTen || !formData.maNV) {
      alert('Vui lòng nhập đầy đủ Mã NV và Họ tên!');
      return;
    }

    const updated: NhanSuItem = {
      ...item,
      ...formData,
      mucLuongHienTai:
        Number(formData.mucLuongCung || 0) +
        Number(formData.mucLuongMem || 0) +
        Number(formData.tongTroCap || 0),
    } as NhanSuItem;

    onSave(updated);
    onClose();
  };

  const inputCls =
    'w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400 text-xs bg-white text-slate-800';
  const labelCls = 'block font-semibold text-slate-700 mb-1 text-xs';
  const selectCls =
    'w-full h-8 px-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-400 bg-white text-xs text-slate-800';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-[#406c89] text-white">
          <h3 className="text-sm font-bold">Chỉnh sửa thông tin nhân sự</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs max-h-[75vh] overflow-y-auto">
          {/* Row 1: Mã NV + Họ tên */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Mã nhân viên <span className="text-rose-500">*</span></label>
              <input
                type="text"
                value={formData.maNV || ''}
                onChange={(e) => setFormData({ ...formData, maNV: e.target.value })}
                className={inputCls}
                placeholder="NV001..."
                required
              />
            </div>
            <div>
              <label className={labelCls}>Họ và tên <span className="text-rose-500">*</span></label>
              <input
                type="text"
                value={formData.hoTen || ''}
                onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })}
                className={inputCls}
                placeholder="Nguyễn Văn A..."
                required
              />
            </div>
          </div>

          {/* Row 2: Phòng ban + Chức vụ */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Phòng ban</label>
              {PHONG_BAN_LIST.length > 0 ? (
                <select
                  value={formData.phongBan || ''}
                  onChange={(e) => setFormData({ ...formData, phongBan: e.target.value })}
                  className={selectCls}
                >
                  <option value="">-- Chọn phòng ban --</option>
                  {PHONG_BAN_LIST.map((pb) => (
                    <option key={pb} value={pb}>{pb}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formData.phongBan || ''}
                  onChange={(e) => setFormData({ ...formData, phongBan: e.target.value })}
                  className={inputCls}
                  placeholder="Nhập phòng ban..."
                />
              )}
            </div>
            <div>
              <label className={labelCls}>Chức vụ</label>
              <input
                type="text"
                value={formData.chucVu || ''}
                onChange={(e) => setFormData({ ...formData, chucVu: e.target.value })}
                className={inputCls}
                placeholder="Chức vụ..."
              />
            </div>
          </div>

          {/* Row 3: Trạng thái + Giới tính + Ngày sinh */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={labelCls}>Trạng thái</label>
              {TRANG_THAI_LIST.length > 0 ? (
                <select
                  value={formData.trangThai || ''}
                  onChange={(e) => setFormData({ ...formData, trangThai: e.target.value })}
                  className={selectCls}
                >
                  <option value="">-- Chọn trạng thái --</option>
                  {TRANG_THAI_LIST.map((tt) => (
                    <option key={tt} value={tt}>{tt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formData.trangThai || ''}
                  onChange={(e) => setFormData({ ...formData, trangThai: e.target.value })}
                  className={inputCls}
                  placeholder="Trạng thái..."
                />
              )}
            </div>
            <div>
              <label className={labelCls}>Giới tính</label>
              <select
                value={formData.gioiTinh || 'Nam'}
                onChange={(e) => setFormData({ ...formData, gioiTinh: e.target.value })}
                className={selectCls}
              >
                {GIOI_TINH_LIST.map((gt) => (
                  <option key={gt} value={gt}>{gt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Ngày sinh</label>
              <input
                type="text"
                value={formData.ngaySinh || ''}
                onChange={(e) => setFormData({ ...formData, ngaySinh: e.target.value })}
                className={inputCls}
                placeholder="dd/mm/yyyy"
              />
            </div>
          </div>

          {/* Row 4: Điện thoại + Email */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Điện thoại</label>
              <input
                type="text"
                value={formData.dienThoai || ''}
                onChange={(e) => setFormData({ ...formData, dienThoai: e.target.value })}
                className={inputCls}
                placeholder="0912..."
              />
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputCls}
                placeholder="email@workflow.vn"
              />
            </div>
          </div>

          {/* Row 5: Ngày vào + Thâm niên */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Ngày vào làm</label>
              <input
                type="text"
                value={formData.ngayVao || ''}
                onChange={(e) => setFormData({ ...formData, ngayVao: e.target.value })}
                className={inputCls}
                placeholder="dd/mm/yyyy"
              />
            </div>
            <div>
              <label className={labelCls}>Thâm niên</label>
              <input
                type="text"
                value={formData.thamNien || ''}
                onChange={(e) => setFormData({ ...formData, thamNien: e.target.value })}
                className={inputCls}
                placeholder="ví dụ: 2 năm 3 tháng"
              />
            </div>
          </div>

          {/* Row 6: Bậc lương + Lương cứng + Lương mềm + Trợ cấp */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className={labelCls}>Bậc lương</label>
              {BAC_LUONG_LIST.length > 0 ? (
                <select
                  value={formData.bacLuong || ''}
                  onChange={(e) => setFormData({ ...formData, bacLuong: e.target.value })}
                  className={selectCls}
                >
                  <option value="">-- Chọn bậc lương --</option>
                  {BAC_LUONG_LIST.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formData.bacLuong || ''}
                  onChange={(e) => setFormData({ ...formData, bacLuong: e.target.value })}
                  className={inputCls}
                  placeholder="Bậc lương..."
                />
              )}
            </div>
            <div>
              <label className={labelCls}>Lương cứng</label>
              <input
                type="number"
                value={formData.mucLuongCung ?? 0}
                onChange={(e) => setFormData({ ...formData, mucLuongCung: Number(e.target.value) })}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Lương mềm</label>
              <input
                type="number"
                value={formData.mucLuongMem ?? 0}
                onChange={(e) => setFormData({ ...formData, mucLuongMem: Number(e.target.value) })}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Trợ cấp</label>
              <input
                type="number"
                value={formData.tongTroCap ?? 0}
                onChange={(e) => setFormData({ ...formData, tongTroCap: Number(e.target.value) })}
                className={inputCls}
              />
            </div>
          </div>

          {/* Row 7: Ghi chú */}
          <div>
            <label className={labelCls}>Ghi chú</label>
            <textarea
              rows={2}
              value={formData.ghiChu || ''}
              onChange={(e) => setFormData({ ...formData, ghiChu: e.target.value })}
              className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-400 text-xs bg-white text-slate-800"
              placeholder="Nhập ghi chú thêm..."
            />
          </div>

          {/* Footer Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[#ba8e3a] hover:bg-[#a67d32] text-white font-bold cursor-pointer transition shadow-sm"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
