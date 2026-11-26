"use client";

import React, { useState, useEffect } from 'react';
import { IconX } from '@tabler/icons-react';
import type { BacLuongTangBacItem } from '../../index';

interface SuaBacLuongModalProps {
  isOpen: boolean;
  item: BacLuongTangBacItem | null;
  onClose: () => void;
  onSubmit: (updated: BacLuongTangBacItem) => void;
}

export default function SuaBacLuongModal({ isOpen, item, onClose, onSubmit }: SuaBacLuongModalProps) {
  const [bacLuongHienTai, setBacLuongHienTai] = useState('');
  const [mucLuongHienTai, setMucLuongHienTai] = useState('');
  const [dieuChinhGanNhat, setDieuChinhGanNhat] = useState('');
  const [tangBacDuKien, setTangBacDuKien] = useState('');
  const [ghiChuLuong, setGhiChuLuong] = useState('');

  useEffect(() => {
    if (isOpen && item) {
      setBacLuongHienTai(item.bacLuongHienTai || '');
      setMucLuongHienTai(String(item.mucLuongHienTai || 0));
      setDieuChinhGanNhat(item.thoiDiemTangLuongGanNhat === '—' ? '' : item.thoiDiemTangLuongGanNhat || '');
      setTangBacDuKien(item.thoiDiemTangBacDuKien === '—' ? '' : item.thoiDiemTangBacDuKien || '');
      setGhiChuLuong(item.ghiChu || '');
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const salary = Number(mucLuongHienTai) || 0;
    onSubmit({
      ...item,
      bacLuongHienTai: bacLuongHienTai.trim() || '—',
      mucLuongHienTai: salary,
      thoiDiemTangLuongGanNhat: dieuChinhGanNhat.trim() || '—',
      thoiDiemTangBacDuKien: tangBacDuKien.trim() || '—',
      ghiChu: ghiChuLuong.trim(),
    });
    onClose();
  };

  const formattedSalary = `${(Number(mucLuongHienTai) || 0).toLocaleString('vi-VN')} đ`;
  const inputClass =
    'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#406c89]';
  const labelClass = 'mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-slate-500';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
      <form
        onSubmit={handleSubmit}
        className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <h2 className="text-base font-bold text-slate-800">Chỉnh sửa bậc lương</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-5 space-y-4">
          <div className="rounded-xl bg-[#40627c] px-5 py-4 text-white flex items-center gap-4">
            <div className="h-11 w-11 shrink-0 rounded-full bg-white/15 flex items-center justify-center text-base font-bold">
              {(item.hoTen || '?').charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold truncate">{item.hoTen}</div>
              <div className="text-xs text-white/80 truncate">{item.phongBan}</div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-medium">Đang làm việc</span>
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-medium">{item.phongBan}</span>
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-medium">
                  {bacLuongHienTai || '—'} · {formattedSalary}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <label>
                <span className={labelClass}>BẬC LƯƠNG HIỆN TẠI</span>
                <input
                  value={bacLuongHienTai}
                  onChange={(e) => setBacLuongHienTai(e.target.value)}
                  className={inputClass}
                />
              </label>
              <label>
                <span className={labelClass}>MỨC LƯƠNG HIỆN TẠI (VNĐ)</span>
                <input
                  type="number"
                  min="0"
                  value={mucLuongHienTai}
                  onChange={(e) => setMucLuongHienTai(e.target.value)}
                  className={inputClass}
                />
              </label>
              <label>
                <span className={labelClass}>ĐIỀU CHỈNH GẦN NHẤT</span>
                <input
                  value={dieuChinhGanNhat}
                  onChange={(e) => setDieuChinhGanNhat(e.target.value)}
                  placeholder="mm/dd/yyyy"
                  className={inputClass}
                />
              </label>
              <label>
                <span className={labelClass}>TĂNG BẬC DỰ KIẾN</span>
                <input
                  value={tangBacDuKien}
                  onChange={(e) => setTangBacDuKien(e.target.value)}
                  placeholder="03/2027 - B.01.3"
                  className={inputClass}
                />
              </label>
            </div>

            <label className="block">
              <span className={labelClass}>GHI CHÚ LƯƠNG</span>
              <textarea
                rows={2}
                value={ghiChuLuong}
                onChange={(e) => setGhiChuLuong(e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 bg-white px-6 py-3.5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="rounded-lg bg-[#406c89] px-5 py-2 text-xs font-semibold text-white hover:bg-[#345a73] cursor-pointer"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}
