"use client";

import React, { useState, useEffect } from 'react';
import { IconX } from '@tabler/icons-react';
import { DinhKhoanItem } from '../../index';

export interface ThemMaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<DinhKhoanItem, 'id'>) => void;
  editingItem?: DinhKhoanItem | null;
}

export default function ThemMaModal({
  isOpen,
  onClose,
  onSubmit,
  editingItem,
}: ThemMaModalProps) {
  const [maDk, setMaDk] = useState('');
  const [acc, setAcc] = useState('');
  const [noiDung, setNoiDung] = useState('');
  const [nhom, setNhom] = useState('Khác');
  const [thuTu, setThuTu] = useState('0');
  const [dienGiai, setDienGiai] = useState('');

  useEffect(() => {
    if (editingItem) {
      setMaDk(editingItem.maDk);
      setAcc(editingItem.acc || '');
      setNoiDung(editingItem.noiDung);
      setNhom(editingItem.nhom || 'Khác');
      setDienGiai(editingItem.dienGiai || '');
      setThuTu('0');
    } else {
      setMaDk('');
      setAcc('');
      setNoiDung('');
      setNhom('Khác');
      setThuTu('0');
      setDienGiai('');
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noiDung) return;
    onSubmit({
      maDk,
      acc: acc || '—',
      noiDung,
      nhom,
      dienGiai: dienGiai || '—',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[580px] border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="text-base font-semibold text-slate-800">
            {editingItem ? 'Sửa mã định khoản' : 'Thêm mã định khoản'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">
          {/* Row 1: Mã ĐK + Mã chi phí (Acc) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-1.5">Mã ĐK</label>
              <input
                value={maDk}
                onChange={(e) => setMaDk(e.target.value)}
                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-1.5">Mã chi phí (Acc)</label>
              <input
                value={acc}
                onChange={(e) => setAcc(e.target.value)}
                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Row 2: Nội dung */}
          <div>
            <label className="block text-sm text-slate-700 mb-1.5">
              Nội dung <span className="text-slate-500">*</span>
            </label>
            <input
              required
              value={noiDung}
              onChange={(e) => setNoiDung(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Row 3: Nhóm + Thứ tự */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-1.5">Nhóm</label>
              <select
                value={nhom}
                onChange={(e) => setNhom(e.target.value)}
                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
              >
                <option value="Khác">Khác</option>
                <option value="Bảng lương">Bảng lương</option>
                <option value="Tuyển dụng và đào tạo">Tuyển dụng và đào tạo</option>
                <option value="Sử dụng các NVL khác có mức kiểm soát">Sử dụng các NVL khác có mức kiểm soát</option>
                <option value="Nguyên vật liệu mua mới">Nguyên vật liệu mua mới</option>
                <option value="Công cụ dụng cụ">Công cụ dụng cụ</option>
                <option value="Chi phí văn phòng">Chi phí văn phòng</option>
                <option value="Thuế, phí và phụ phí">Thuế, phí và phụ phí</option>
                <option value="Vận chuyển hàng hoá">Vận chuyển hàng hoá</option>
                <option value="Phí cho các nhà dịch vụ chuyên nghiệp">Phí cho các nhà dịch vụ chuyên nghiệp</option>
                <option value="Truyền thông">Truyền thông</option>
                <option value="Dịch vụ công cộng và thuê ngoài">Dịch vụ công cộng và thuê ngoài</option>
                <option value="Quyền lợi của Nhân viên và các Ưu đãi">Quyền lợi của Nhân viên và các Ưu đãi</option>
                <option value="Chi phí đi lại - Trong nước">Chi phí đi lại - Trong nước</option>
                <option value="Chi phí đi lại - Nước ngoài">Chi phí đi lại - Nước ngoài</option>
                <option value="Bán hàng và Marketing">Bán hàng và Marketing</option>
                <option value="Sửa chữa và bảo trì">Sửa chữa và bảo trì</option>
                <option value="Phải trả người bán">Phải trả người bán</option>
                <option value="Chi phí">Chi phí</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-1.5">Thứ tự</label>
              <input
                type="number"
                value={thuTu}
                onChange={(e) => setThuTu(e.target.value)}
                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Row 4: Diễn giải (textarea) */}
          <div>
            <label className="block text-sm text-slate-700 mb-1.5">Diễn giải</label>
            <textarea
              value={dienGiai}
              onChange={(e) => setDienGiai(e.target.value)}
              rows={3}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
            />
          </div>

          {/* Footer buttons */}
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-md border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Huỷ
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-[#406c89] hover:bg-[#345972] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
