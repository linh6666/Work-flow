"use client";

import React, { useState } from 'react';
import { IconChevronDown, IconX } from '@tabler/icons-react';
import type { KeHoachBaoCaoItem } from '../../index';

interface ModalKhoiTaoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: KeHoachBaoCaoItem) => void;
}

export default function ModalKhoiTao({ isOpen, onClose, onSave }: ModalKhoiTaoProps) {
  const [loai, setLoai] = useState('Báo cáo tuần');
  const [kyBaoCao, setKyBaoCao] = useState('');
  const [tieuDe, setTieuDe] = useState('');
  const [ghiChu, setGhiChu] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({
      ma: `BC-${Date.now()}`,
      ten: tieuDe.trim() || `${loai} - ${kyBaoCao.trim()}`,
      loai,
      ngay: new Date().toISOString().slice(0, 10),
      trang_thai: 'Bản nháp',
      ky_bao_cao: kyBaoCao.trim(),
      ghi_chu: ghiChu.trim(),
    });
    setLoai('Báo cáo tuần');
    setKyBaoCao('');
    setTieuDe('');
    setGhiChu('');
  };

  const inputClass = 'mt-1 w-full rounded-lg border border-slate-200 bg-slate-50/40 px-3 py-2 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600';
  const labelClass = 'block text-sm font-medium text-slate-800';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-[520px] rounded-lg border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between px-6 pt-5">
          <h2 className="text-lg font-bold text-slate-900">Khởi tạo kế hoạch / báo cáo</h2>
          <button type="button" onClick={onClose} aria-label="Đóng" className="rounded p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"><IconX size={17} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-6 py-4">
            <label className={labelClass}>Loại báo cáo
              <span className="relative block"><select value={loai} onChange={(event) => setLoai(event.target.value)} className={`${inputClass} appearance-none pr-9`}><option>Báo cáo tuần</option><option>Báo cáo tháng</option><option>Kế hoạch tuần</option><option>Kế hoạch tháng</option></select><IconChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" /></span>
            </label>
            <label className={labelClass}>Kỳ báo cáo <span className="text-rose-500">*</span><input required value={kyBaoCao} onChange={(event) => setKyBaoCao(event.target.value)} placeholder="VD: Tuần 32/2026 hoặc Tháng 07/2026" className={inputClass} /></label>
            <label className={labelClass}>Tiêu đề<input value={tieuDe} onChange={(event) => setTieuDe(event.target.value)} placeholder="Tiêu đề tự sinh, có thể chỉnh sửa..." className={inputClass} /></label>
            <label className={labelClass}>Ghi chú<textarea value={ghiChu} onChange={(event) => setGhiChu(event.target.value)} placeholder="Ghi chú thêm..." rows={2} className={`${inputClass} resize-none`} /></label>
          </div>
          <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50">Hủy</button>
            <button type="submit" className="rounded-lg bg-[#406c89] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#355a75]">Khởi tạo</button>
          </div>
        </form>
      </div>
    </div>
  );
}
