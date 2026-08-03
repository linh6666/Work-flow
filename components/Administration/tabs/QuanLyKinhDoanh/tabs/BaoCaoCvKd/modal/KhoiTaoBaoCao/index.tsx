"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconChevronDown } from '@tabler/icons-react';
import { BaoCaoCvKdItem } from '../../index';

interface KhoiTaoBaoCaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (newReport: BaoCaoCvKdItem) => void;
}

const PHAM_VI_OPTIONS: BaoCaoCvKdItem['loai'][] = ['Theo tháng', 'Báo giá', 'Khách hàng'];

export default function KhoiTaoBaoCaoModal({
  isOpen,
  onClose,
  onSubmitSuccess,
}: KhoiTaoBaoCaoModalProps) {
  const [phamVi, setPhamVi] = useState<BaoCaoCvKdItem['loai']>('Theo tháng');
  const [kyThang, setKyThang] = useState('');
  const [duAnMoHinh, setDuAnMoHinh] = useState('');
  const [tieuDe, setTieuDe] = useState('');

  // Auto-generate title based on inputs if user hasn't manually overridden
  useEffect(() => {
    let generated = 'BC CV KD';
    if (phamVi === 'Theo tháng' && kyThang) {
      generated = `BC CV KD - Tháng ${kyThang}`;
    } else if (duAnMoHinh) {
      generated = `BC CV KD - ${duAnMoHinh}`;
    }
    setTieuDe(generated);
  }, [phamVi, kyThang, duAnMoHinh]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const finalTitle = tieuDe.trim() || `BC CV KD - ${kyThang || duAnMoHinh || 'Mới'}`;

    const newReport: BaoCaoCvKdItem = {
      id: `bc-${Date.now()}`,
      loai: phamVi,
      tieuDe: finalTitle,
      moTa: duAnMoHinh.trim() || (kyThang ? `Tháng ${kyThang}` : '—'),
      nguoiTao: 'Kỳ Anh',
      ngayTao: new Date().toISOString().split('T')[0],
      trangThai: 'Bản nháp',
    };

    if (onSubmitSuccess) {
      onSubmitSuccess(newReport);
    }

    alert('Khởi tạo báo cáo công việc KD thành công!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md flex flex-col animate-scale-up">

        {/* ── Header ── */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between shrink-0">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Khởi tạo báo cáo công việc KD
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-4 space-y-4 text-xs text-slate-700 max-h-[75vh] overflow-y-auto no-scrollbar">

          {/* Phạm vi báo cáo */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Phạm vi báo cáo</label>
            <div className="relative">
              <select
                value={phamVi}
                onChange={(e) => setPhamVi(e.target.value as BaoCaoCvKdItem['loai'])}
                className="w-full text-xs bg-white border border-indigo-200/90 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] appearance-none cursor-pointer pr-8"
              >
                {PHAM_VI_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <IconChevronDown size={14} />
              </div>
            </div>
          </div>

          {/* Kỳ tháng * */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Kỳ tháng <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={kyThang}
              onChange={(e) => setKyThang(e.target.value)}
              placeholder="VD: 07/2026"
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
            />
          </div>

          {/* Dự án / Mô hình (ngữ cảnh) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Dự án / Mô hình (ngữ cảnh)</label>
            <input
              type="text"
              value={duAnMoHinh}
              onChange={(e) => setDuAnMoHinh(e.target.value)}
              placeholder="VD: Dự án: VSIP LẠNG SƠN"
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
            />
          </div>

          {/* Tiêu đề báo cáo */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Tiêu đề báo cáo</label>
            <input
              type="text"
              value={tieuDe}
              onChange={(e) => setTieuDe(e.target.value)}
              placeholder="Tiêu đề tự sinh, có thể chỉnh sửa..."
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
            />
          </div>

        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Khởi tạo
          </button>
        </div>

      </div>
    </div>
  );
}
