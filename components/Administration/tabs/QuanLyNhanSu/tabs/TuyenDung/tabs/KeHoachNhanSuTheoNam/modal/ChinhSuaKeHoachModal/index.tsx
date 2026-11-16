"use client";

import React, { useState, useEffect } from 'react';
import {
  IconX,
  IconPencil,
  IconCalendar,
  IconUser,
  IconCheck,
} from '@tabler/icons-react';
import { YearlyPlanRow } from '../../types';

interface ChinhSuaKeHoachModalProps {
  isOpen: boolean;
  item: YearlyPlanRow | null;
  onClose: () => void;
  onSave: (updated: YearlyPlanRow) => void;
}

export default function ChinhSuaKeHoachModal({
  isOpen,
  item,
  onClose,
  onSave,
}: ChinhSuaKeHoachModalProps) {
  const [formData, setFormData] = useState<YearlyPlanRow | null>(item);

  useEffect(() => {
    setFormData(item);
  }, [item]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#406c89] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <IconPencil size={18} />
            <h3 className="font-bold text-sm">
              Chỉnh sửa Kế hoạch Nhân sự ({formData.nam})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Năm áp dụng</label>
            <input
              type="text"
              value={formData.nam}
              onChange={(e) => setFormData({ ...formData, nam: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-[#406c89] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Người lập</label>
              <input
                type="text"
                value={formData.nguoiLap}
                onChange={(e) => setFormData({ ...formData, nguoiLap: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-[#406c89] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Ngày lập</label>
              <input
                type="text"
                value={formData.ngayLap}
                onChange={(e) => setFormData({ ...formData, ngayLap: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-[#406c89] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tổng số vị trí tuyển dụng</label>
              <input
                type="number"
                value={formData.viTriTuyenDung}
                onChange={(e) => setFormData({ ...formData, viTriTuyenDung: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-[#406c89] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tổng chi phí dự kiến (VNĐ)</label>
              <input
                type="text"
                value={formData.tongChiPhi}
                onChange={(e) => setFormData({ ...formData, tongChiPhi: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-[#406c89] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Trạng thái phê duyệt</label>
            <select
              value={formData.trangThai}
              onChange={(e) => setFormData({ ...formData, trangThai: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-[#406c89] focus:outline-none bg-white cursor-pointer"
            >
              <option value="Chờ QL KD duyệt">Chờ QL KD duyệt</option>
              <option value="Chờ BGĐ duyệt">Chờ BGĐ duyệt</option>
              <option value="Đã phê duyệt">Đã phê duyệt</option>
              <option value="Yêu cầu điều chỉnh">Yêu cầu điều chỉnh</option>
            </select>
          </div>

          {/* Footer actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#406c89] hover:bg-[#345970] text-white font-bold shadow-sm cursor-pointer transition"
            >
              <IconCheck size={16} />
              <span>Lưu thay đổi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
