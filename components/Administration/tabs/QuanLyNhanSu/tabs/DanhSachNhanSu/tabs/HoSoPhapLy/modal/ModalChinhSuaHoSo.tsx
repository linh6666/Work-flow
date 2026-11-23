"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconPencil, IconLoader2 } from '@tabler/icons-react';
import { HoSoPhapLyItem } from '../index';
import { updateHoSoPhapLy } from '@/api/apiGetHoSoPhapLy';

interface ModalChinhSuaHoSoProps {
  isOpen: boolean;
  item: HoSoPhapLyItem | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ModalChinhSuaHoSo({
  isOpen,
  item,
  onClose,
  onSuccess,
}: ModalChinhSuaHoSoProps) {
  const [formData, setFormData] = useState<Partial<HoSoPhapLyItem>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        soCCCD: item.soCCCD === '—' ? '' : item.soCCCD,
        ngayCapCCCD: item.ngayCapCCCD === '—' ? '' : item.ngayCapCCCD,
        noiCapCCCD: item.noiCapCCCD === '—' ? '' : item.noiCapCCCD,
        mstCaNhan: item.mstCaNhan === '—' ? '' : item.mstCaNhan,
        soBHXH: item.soBHXH === '—' ? '' : item.soBHXH,
        nganHang: item.nganHang === '—' ? '' : item.nganHang,
        soTaiKhoan: item.soTaiKhoan === '—' ? '' : item.soTaiKhoan,
        ghiChu: item.ghiChu || '',
      });
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const updatedItem: HoSoPhapLyItem = {
        ...item,
        soCCCD: formData.soCCCD || '—',
        ngayCapCCCD: formData.ngayCapCCCD || '—',
        noiCapCCCD: formData.noiCapCCCD || '—',
        mstCaNhan: formData.mstCaNhan || '—',
        soBHXH: formData.soBHXH || '—',
        nganHang: formData.nganHang || '—',
        soTaiKhoan: formData.soTaiKhoan || '—',
        ghiChu: formData.ghiChu || '',
      };

      await updateHoSoPhapLy(updatedItem);
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Lỗi khi cập nhật hồ sơ:', err);
      alert(err?.message || 'Có lỗi xảy ra khi cập nhật hồ sơ');
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
            <IconPencil size={18} className="text-white/90" />
            <h3 className="font-bold text-sm tracking-wide">Chỉnh sửa Hồ sơ Pháp lý</h3>
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
          <div className="p-5 max-h-[80vh] overflow-y-auto space-y-3.5 text-xs">
            {/* Nhân sự info header */}
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
              <div className="font-bold text-slate-800 text-sm">{item.hoTen}</div>
              <div className="text-slate-500 text-[11px] font-mono mt-0.5">
                Mã NV: <strong>{item.maNV}</strong> • {item.phongBan}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Số CCCD / CMND</label>
                <input
                  type="text"
                  value={formData.soCCCD || ''}
                  onChange={(e) => setFormData((p) => ({ ...p, soCCCD: e.target.value }))}
                  placeholder="Nhập 12 chữ số CCCD"
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
                <label className={labelCls}>Nơi cấp</label>
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
                  placeholder="Mã số BHXH 10 chữ số"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Mã số thuế (MST)</label>
                <input
                  type="text"
                  value={formData.mstCaNhan || ''}
                  onChange={(e) => setFormData((p) => ({ ...p, mstCaNhan: e.target.value }))}
                  placeholder="Mã số thuế cá nhân"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Ngân hàng</label>
                <input
                  type="text"
                  value={formData.nganHang || ''}
                  onChange={(e) => setFormData((p) => ({ ...p, nganHang: e.target.value }))}
                  placeholder="VD: Vietcombank, Techcombank"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Số tài khoản</label>
                <input
                  type="text"
                  value={formData.soTaiKhoan || ''}
                  onChange={(e) => setFormData((p) => ({ ...p, soTaiKhoan: e.target.value }))}
                  placeholder="Số tài khoản ngân hàng"
                  className={inputCls}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls}>Ghi chú hồ sơ</label>
                <textarea
                  rows={2}
                  value={formData.ghiChu || ''}
                  onChange={(e) => setFormData((p) => ({ ...p, ghiChu: e.target.value }))}
                  placeholder="Ghi chú thêm về giấy tờ còn thiếu hoặc cần bổ sung..."
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
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#406c89] hover:bg-[#345870] text-white font-semibold text-xs shadow-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <IconLoader2 size={14} className="animate-spin" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <span>Lưu thay đổi</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
