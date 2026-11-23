"use client";

import React, { useState } from 'react';
import { IconX, IconPlus, IconLoader2, IconShieldCheck } from '@tabler/icons-react';
import { HoSoPhapLyItem } from '../index';
import { createHoSoPhapLy } from '@/api/apiGetHoSoPhapLy';
import { PHONG_BAN_LIST } from '../../DanhSachTongQuat';

interface ModalThemHoSoProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ModalThemHoSo({
  isOpen,
  onClose,
  onSuccess,
}: ModalThemHoSoProps) {
  const [formData, setFormData] = useState<Partial<HoSoPhapLyItem>>({
    phongBan: 'Phòng Kinh doanh',
    chucVu: 'Nhân viên',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hoTen?.trim() || !formData.maNV?.trim()) {
      alert('Vui lòng nhập Mã NV và Họ và tên!');
      return;
    }

    try {
      setIsSubmitting(true);
      await createHoSoPhapLy({
        maNV: formData.maNV.trim(),
        hoTen: formData.hoTen.trim(),
        phongBan: formData.phongBan || 'Khối Văn phòng',
        chucVu: formData.chucVu || 'Nhân viên',
        soCCCD: formData.soCCCD || '—',
        ngayCapCCCD: formData.ngayCapCCCD || '—',
        noiCapCCCD: formData.noiCapCCCD || '—',
        mstCaNhan: formData.mstCaNhan || '—',
        soBHXH: formData.soBHXH || '—',
        nganHang: formData.nganHang || '—',
        soTaiKhoan: formData.soTaiKhoan || '—',
        ghiChu: formData.ghiChu || '',
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Lỗi khi thêm hồ sơ:', err);
      alert(err?.message || 'Không thể tạo mới hồ sơ');
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelCls = 'block text-[11px] font-semibold text-slate-600 mb-1';
  const inputCls =
    'w-full h-8.5 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89]/20 text-xs text-slate-800 bg-white transition';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#406c89] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconPlus size={18} className="text-white/90" />
            <h3 className="font-bold text-sm tracking-wide">Thêm mới Hồ sơ Pháp lý</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-5 max-h-[80vh] overflow-y-auto space-y-3 text-xs">
            {/* Thông tin nhân sự cơ bản */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>
                  Mã nhân sự <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.maNV || ''}
                  onChange={(e) => setFormData((p) => ({ ...p, maNV: e.target.value }))}
                  placeholder="VD: NV099"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>
                  Họ và tên <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.hoTen || ''}
                  onChange={(e) => setFormData((p) => ({ ...p, hoTen: e.target.value }))}
                  placeholder="Nguyễn Văn A"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Phòng ban</label>
                <select
                  value={formData.phongBan || 'Phòng Kinh doanh'}
                  onChange={(e) => setFormData((p) => ({ ...p, phongBan: e.target.value }))}
                  className={inputCls}
                >
                  {PHONG_BAN_LIST.map((pb) => (
                    <option key={pb} value={pb}>
                      {pb}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelCls}>Chức vụ</label>
                <input
                  type="text"
                  value={formData.chucVu || ''}
                  onChange={(e) => setFormData((p) => ({ ...p, chucVu: e.target.value }))}
                  placeholder="VD: Chuyên viên"
                  className={inputCls}
                />
              </div>

              {/* Thông tin giấy tờ pháp lý */}
              <div>
                <label className={labelCls}>Số CCCD / CMND</label>
                <input
                  type="text"
                  value={formData.soCCCD || ''}
                  onChange={(e) => setFormData((p) => ({ ...p, soCCCD: e.target.value }))}
                  placeholder="12 chữ số"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Ngày cấp</label>
                <input
                  type="text"
                  value={formData.ngayCapCCCD || ''}
                  onChange={(e) => setFormData((p) => ({ ...p, ngayCapCCCD: e.target.value }))}
                  placeholder="DD/MM/YYYY"
                  className={inputCls}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls}>Nơi cấp CCCD</label>
                <input
                  type="text"
                  value={formData.noiCapCCCD || ''}
                  onChange={(e) => setFormData((p) => ({ ...p, noiCapCCCD: e.target.value }))}
                  placeholder="VD: Cục Cảnh sát QLHC về TTXH"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Số sổ BHXH</label>
                <input
                  type="text"
                  value={formData.soBHXH || ''}
                  onChange={(e) => setFormData((p) => ({ ...p, soBHXH: e.target.value }))}
                  placeholder="Mã số BHXH"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Mã số thuế (MST)</label>
                <input
                  type="text"
                  value={formData.mstCaNhan || ''}
                  onChange={(e) => setFormData((p) => ({ ...p, mstCaNhan: e.target.value }))}
                  placeholder="Mã số thuế"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Ngân hàng</label>
                <input
                  type="text"
                  value={formData.nganHang || ''}
                  onChange={(e) => setFormData((p) => ({ ...p, nganHang: e.target.value }))}
                  placeholder="VD: Vietcombank"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Số tài khoản</label>
                <input
                  type="text"
                  value={formData.soTaiKhoan || ''}
                  onChange={(e) => setFormData((p) => ({ ...p, soTaiKhoan: e.target.value }))}
                  placeholder="Số tài khoản"
                  className={inputCls}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls}>Ghi chú</label>
                <textarea
                  rows={2}
                  value={formData.ghiChu || ''}
                  onChange={(e) => setFormData((p) => ({ ...p, ghiChu: e.target.value }))}
                  placeholder="Ghi chú về tình trạng nộp hồ sơ..."
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89]/20 text-xs text-slate-800 bg-white transition resize-none"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#ba8e3a] hover:bg-[#a67c2e] text-white font-bold text-xs shadow-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <IconLoader2 size={14} className="animate-spin" />
                  <span>Đang thêm...</span>
                </>
              ) : (
                <>
                  <IconPlus size={14} />
                  <span>Thêm hồ sơ</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
