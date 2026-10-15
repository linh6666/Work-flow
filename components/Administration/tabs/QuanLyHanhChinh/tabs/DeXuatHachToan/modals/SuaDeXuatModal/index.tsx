"use client";

import React, { useState, useEffect } from 'react';
import {
  IconX,
  IconPencil,
  IconCheck,
  IconFileText,
  IconReceipt,
} from '@tabler/icons-react';
import type { DeXuatHachToanItem } from '../../types';

export type MonthRecord = DeXuatHachToanItem;

interface SuaDeXuatModalProps {
  isOpen: boolean;
  record: DeXuatHachToanItem | null;
  onClose: () => void;
  onSubmit: (updatedData: DeXuatHachToanItem) => void;
}

export default function SuaDeXuatModal({
  isOpen,
  record,
  onClose,
  onSubmit,
}: SuaDeXuatModalProps) {
  const [soDeXuat, setSoDeXuat] = useState('');
  const [thang, setThang] = useState('Tháng 10');
  const [nam, setNam] = useState<number>(2026);
  const [dienGiai, setDienGiai] = useState('');
  const [soMuc, setSoMuc] = useState<number | string>(1);
  const [tongTien, setTongTien] = useState('');
  const [trangThaiDuyet, setTrangThaiDuyet] = useState('Chờ PGĐ duyệt');
  const [soHT, setSoHT] = useState('');
  const [tongTienHT, setTongTienHT] = useState('—');
  const [trangThaiHT, setTrangThaiHT] = useState('—');

  useEffect(() => {
    if (record) {
      setSoDeXuat(record.soDeXuat ?? '');
      setThang(record.thang ?? 'Tháng 10');
      setNam(record.nam ?? 2026);
      setDienGiai(record.dienGiai ?? '');
      setSoMuc(record.soMuc ?? 1);
      setTongTien(record.tongTien ?? '');
      setTrangThaiDuyet(record.trangThaiDuyet ?? 'Chờ PGĐ duyệt');
      setSoHT(record.soHT ?? '');
      setTongTienHT(record.tongTienHT ?? '—');
      setTrangThaiHT(record.trangThaiHT ?? '—');
    }
  }, [record]);

  if (!isOpen || !record) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!record) return;

    const updated: DeXuatHachToanItem = {
      ...record,
      soDeXuat: soDeXuat.trim(),
      thang: thang.trim(),
      nam: Number(nam) || record.nam,
      dienGiai: dienGiai.trim(),
      soMuc: Number(soMuc) || record.soMuc,
      tongTien: tongTien.trim(),
      trangThaiDuyet,
      soHT: soHT.trim() || '+ Lập hạch toán',
      tongTienHT: tongTienHT.trim(),
      trangThaiHT,
    };

    onSubmit(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-[#6366f1] border border-indigo-200">
              <IconPencil size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Chỉnh sửa đề xuất / hạch toán
              </h2>
              <p className="text-xs text-slate-500">
                Cập nhật thông tin chi tiết của đề xuất <span className="font-semibold text-slate-700">{record.soDeXuat}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 text-xs overflow-y-auto flex-1">
          {/* Section 1: Thông tin đề xuất */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <IconFileText size={14} className="text-[#406c89]" />
              <span>Thông tin đề xuất duyệt chi</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Số đề xuất <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={soDeXuat}
                  onChange={(e) => setSoDeXuat(e.target.value)}
                  placeholder="VD: 41-2026/ĐXDC-HC"
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-[#6366f1] focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tháng áp dụng <span className="text-rose-500">*</span>
                </label>
                <select
                  value={thang}
                  onChange={(e) => setThang(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer"
                >
                  {Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`).map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Năm <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={nam}
                  onChange={(e) => setNam(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Diễn giải nội dung <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={2}
                required
                value={dienGiai}
                onChange={(e) => setDienGiai(e.target.value)}
                placeholder="Nhập nội dung diễn giải của đề xuất chi..."
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Số mục <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={soMuc}
                  onChange={(e) => setSoMuc(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tổng tiền đề xuất <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={tongTien}
                  onChange={(e) => setTongTien(e.target.value)}
                  placeholder="VD: 4.000.000 đ"
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-[#406c89] focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Trạng thái duyệt đề xuất
                </label>
                <select
                  value={trangThaiDuyet}
                  onChange={(e) => setTrangThaiDuyet(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer"
                >
                  <option value="Chờ PGĐ duyệt">Chờ PGĐ duyệt</option>
                  <option value="PGĐ đã duyệt">PGĐ đã duyệt</option>
                  <option value="Chờ QL KD duyệt">Chờ QL KD duyệt</option>
                  <option value="Từ chối">Từ chối</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Thông tin hạch toán liên kết */}
          <div className="space-y-3 pt-3 border-t border-slate-200/80">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <IconReceipt size={14} className="text-amber-600" />
              <span>Thông tin hạch toán</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Số HT (Chứng từ HT)
                </label>
                <input
                  type="text"
                  value={soHT}
                  onChange={(e) => setSoHT(e.target.value)}
                  placeholder="VD: 41-2026/HT-HC hoặc + Lập hạch toán"
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tổng tiền HT
                </label>
                <input
                  type="text"
                  value={tongTienHT}
                  onChange={(e) => setTongTienHT(e.target.value)}
                  placeholder="VD: 4.000.000 đ hoặc —"
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Trạng thái HT
                </label>
                <select
                  value={trangThaiHT}
                  onChange={(e) => setTrangThaiHT(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer"
                >
                  <option value="—">— (Chưa lập hạch toán)</option>
                  <option value="Chờ QL KD duyệt">Chờ QL KD duyệt</option>
                  <option value="Chờ PGĐ duyệt">Chờ PGĐ duyệt</option>
                  <option value="PGĐ đã duyệt">PGĐ đã duyệt</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#406c89] hover:bg-[#345870] rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <IconCheck size={15} />
              <span>Lưu thay đổi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
