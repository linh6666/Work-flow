"use client";

import React, { useState } from 'react';
import { IconX } from '@tabler/icons-react';
import { YearlyPlanRow } from '../../types';

interface TaoKeHoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newPlan: YearlyPlanRow) => void;
}

export default function TaoKeHoachModal({
  isOpen,
  onClose,
  onSave,
}: TaoKeHoachModalProps) {
  const [namKeHoach, setNamKeHoach] = useState<number>(2027);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    const newEntry: YearlyPlanRow = {
      id: String(Date.now()),
      nam: `Năm ${namKeHoach}`,
      nguoiLap: 'Thao Phung',
      ngayLap: formattedDate,
      viTriTuyenDung: 0,
      tongChiPhi: '0',
      trangThai: 'Chờ QL KD duyệt',
    };
    onSave(newEntry);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-[420px] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="px-6 pt-5 pb-3 flex items-start justify-between">
          <h3 className="font-bold text-lg text-slate-900 tracking-tight">
            Tạo kế hoạch nhân sự năm mới
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition p-1 -mr-1 -mt-1 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <IconX size={18} stroke={1.8} />
          </button>
        </div>

        {/* Content & Form */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="px-6 pt-1 pb-4">
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Năm kế hoạch <span className="text-red-500">*</span>
            </label>

            {/* Input number / select */}
            <div className="relative">
              <input
                type="number"
                min={2020}
                max={2050}
                value={namKeHoach}
                onChange={(e) => setNamKeHoach(Number(e.target.value) || 2027)}
                className="w-full px-3.5 py-2 text-sm font-semibold text-slate-800 bg-white border border-[#8b9cf5] rounded-xl focus:border-[#4f46e5] focus:ring-2 focus:ring-[#e0e7ff] focus:outline-none transition-all"
                required
              />
            </div>

            <p className="text-xs text-slate-400 mt-2">
              Mỗi năm chỉ có 1 bảng kế hoạch nhân sự.
            </p>
          </div>

          {/* Footer Buttons */}
          <div className="px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#406c89] hover:bg-[#345970] text-white text-xs font-semibold shadow-sm shadow-[#406c89]/20 transition-all cursor-pointer"
            >
              Tạo & lập kế hoạch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
