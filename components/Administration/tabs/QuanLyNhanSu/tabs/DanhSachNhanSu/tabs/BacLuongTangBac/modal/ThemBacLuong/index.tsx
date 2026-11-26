"use client";

import React, { useState } from 'react';
import { IconX, IconPlus, IconTrash } from '@tabler/icons-react';
import type { BacLuongTangBacItem } from '../../index';

interface SalaryHistoryItem {
  id: string;
  nam: string;
  bacLuong: string;
  luongCung: string;
  troCap: string;
  mucLuong: string;
  dieuChinh: string;
  ghiChu: string;
}

interface ThemBacLuongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: Omit<BacLuongTangBacItem, 'id'>) => void;
}

export default function ThemBacLuongModal({ isOpen, onClose, onSubmit }: ThemBacLuongModalProps) {
  const [hoTen, setHoTen] = useState('');
  const [phongBan, setPhongBan] = useState('');

  // Card 1: Mức lương hiện tại
  const [bacLuongHienTai, setBacLuongHienTai] = useState('');
  const [mucLuongHienTai, setMucLuongHienTai] = useState('');
  const [luongCung, setLuongCung] = useState('');
  const [luongMem, setLuongMem] = useState('');
  const [tongLuongCoBan, setTongLuongCoBan] = useState('');
  const [tongTroCap, setTongTroCap] = useState('');
  const [dieuChinhGanNhat, setDieuChinhGanNhat] = useState('');
  const [tangBacDuKien, setTangBacDuKien] = useState('');
  const [ghiChuLuong, setGhiChuLuong] = useState('');

  // Card 2: Lịch sử bậc lương theo năm
  const [historyList, setHistoryList] = useState<SalaryHistoryItem[]>([]);

  if (!isOpen) return null;

  const resetForm = () => {
    setHoTen('');
    setPhongBan('');
    setBacLuongHienTai('');
    setMucLuongHienTai('');
    setLuongCung('');
    setLuongMem('');
    setTongLuongCoBan('');
    setTongTroCap('');
    setDieuChinhGanNhat('');
    setTangBacDuKien('');
    setGhiChuLuong('');
    setHistoryList([]);
  };

  const handleAddHistory = () => {
    setHistoryList((prev) => [
      ...prev,
      {
        id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
        nam: String(new Date().getFullYear()),
        bacLuong: bacLuongHienTai || '',
        luongCung: luongCung || '0',
        troCap: tongTroCap || '0',
        mucLuong: mucLuongHienTai || '0',
        dieuChinh: '',
        ghiChu: '',
      },
    ]);
  };

  const handleUpdateHistory = <K extends keyof SalaryHistoryItem>(
    id: string,
    key: K,
    value: SalaryHistoryItem[K]
  ) => {
    setHistoryList((prev) => prev.map((h) => (h.id === id ? { ...h, [key]: value } : h)));
  };

  const handleRemoveHistory = (id: string) => {
    setHistoryList((prev) => prev.filter((h) => h.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const salary = Number(mucLuongHienTai) || Number(tongLuongCoBan) || 0;
    onSubmit({
      maNV: 'NV-MOI',
      hoTen: hoTen.trim() || 'Nhân sự mới',
      phongBan: phongBan.trim() || 'Ban Giám đốc',
      chucVu: '',
      bacLuongHienTai: bacLuongHienTai.trim() || '—',
      mucLuongHienTai: salary,
      thoiDiemTangLuongGanNhat: dieuChinhGanNhat || '—',
      bacLuongDuKien: '—',
      mucLuongDuKien: salary,
      thoiDiemTangBacDuKien: tangBacDuKien.trim() || '—',
      dieuKienXetDuyet: '',
      trangThaiDuyet: 'Đang theo dõi',
      ghiChu: ghiChuLuong.trim(),
    });
    resetForm();
    onClose();
  };

  const formattedSalary = mucLuongHienTai
    ? `${Number(mucLuongHienTai).toLocaleString('vi-VN')} đ`
    : '— đ';

  const inputClass =
    'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89]/20';
  const labelClass = 'mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-slate-500';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
      <form
        onSubmit={handleSubmit}
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <h2 className="text-base font-bold text-slate-800">Thêm bậc lương</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 pb-5 space-y-4">
          {/* Top Slate-Blue Banner (No Tabs) */}
          <div className="rounded-xl bg-[#40627c] px-5 py-4 text-white flex items-center gap-4">
            <div className="h-11 w-11 shrink-0 rounded-full bg-white/15 flex items-center justify-center text-base font-bold">
              ?
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold truncate">{hoTen.trim() || 'Nhân sự mới'}</div>
              <div className="text-xs text-white/80 truncate">{phongBan.trim() || 'Ban Giám đốc'}</div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-medium">Đang làm việc</span>
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-medium">
                  {phongBan.trim() || 'Ban Giám đốc'}
                </span>
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-medium">
                  {bacLuongHienTai.trim() ? `${bacLuongHienTai.trim()} · ${formattedSalary}` : 'Chưa xếp bậc · — đ'}
                </span>
              </div>
            </div>
          </div>

          {/* Card 1: MỨC LƯƠNG HIỆN TẠI */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3.5">
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700">MỨC LƯƠNG HIỆN TẠI</h3>
              <span className="text-xs text-slate-400">Bậc lương và các thành phần thu nhập</span>
            </div>

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
                <span className={labelClass}>MỨC LƯƠNG CỨNG</span>
                <input
                  type="number"
                  min="0"
                  value={luongCung}
                  onChange={(e) => setLuongCung(e.target.value)}
                  className={inputClass}
                />
              </label>
              <label>
                <span className={labelClass}>MỨC LƯƠNG MỀM</span>
                <input
                  type="number"
                  min="0"
                  value={luongMem}
                  onChange={(e) => setLuongMem(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <label>
                <span className={labelClass}>TỔNG LƯƠNG CƠ BẢN</span>
                <input
                  type="number"
                  min="0"
                  value={tongLuongCoBan}
                  onChange={(e) => setTongLuongCoBan(e.target.value)}
                  className={inputClass}
                />
              </label>
              <label>
                <span className={labelClass}>TỔNG TRỢ CẤP</span>
                <input
                  type="number"
                  min="0"
                  value={tongTroCap}
                  onChange={(e) => setTongTroCap(e.target.value)}
                  className={inputClass}
                />
              </label>
              <label>
                <span className={labelClass}>ĐIỀU CHỈNH GẦN NHẤT</span>
                <input
                  type="date"
                  value={dieuChinhGanNhat}
                  onChange={(e) => setDieuChinhGanNhat(e.target.value)}
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

            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
              <span>Đã trôi qua: —</span>
              <span>Thời gian còn lại: —</span>
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

          {/* Card 2: LỊCH SỬ BẬC LƯƠNG THEO NĂM */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700">
                  LỊCH SỬ BẬC LƯƠNG THEO NĂM
                </h3>
                <span className="text-xs text-slate-400">Điều chỉnh từng kỳ dữ liệu</span>
              </div>
              <span className="text-[11px] font-medium text-slate-400">{historyList.length} kỳ dữ liệu</span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-100">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-100">
                  <tr>
                    <th className="px-3 py-2">NĂM</th>
                    <th className="px-3 py-2">BẬC LƯƠNG</th>
                    <th className="px-3 py-2">LƯƠNG CỨNG</th>
                    <th className="px-3 py-2">TRỢ CẤP</th>
                    <th className="px-3 py-2">MỨC LƯƠNG</th>
                    <th className="px-3 py-2">ĐIỀU CHỈNH</th>
                    <th className="px-3 py-2">GHI CHÚ</th>
                    {historyList.length > 0 && <th className="px-2 py-2" />}
                  </tr>
                </thead>
                <tbody>
                  {historyList.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-5 text-center text-xs text-slate-400">
                        Chưa có dữ liệu bậc lương.
                      </td>
                    </tr>
                  ) : (
                    historyList.map((row) => (
                      <tr key={row.id} className="border-b border-slate-100 last:border-none">
                        <td className="px-2 py-1.5">
                          <input
                            value={row.nam}
                            onChange={(e) => handleUpdateHistory(row.id, 'nam', e.target.value)}
                            className={inputClass}
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <input
                            value={row.bacLuong}
                            onChange={(e) => handleUpdateHistory(row.id, 'bacLuong', e.target.value)}
                            className={inputClass}
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <input
                            value={row.luongCung}
                            onChange={(e) => handleUpdateHistory(row.id, 'luongCung', e.target.value)}
                            className={inputClass}
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <input
                            value={row.troCap}
                            onChange={(e) => handleUpdateHistory(row.id, 'troCap', e.target.value)}
                            className={inputClass}
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <input
                            value={row.mucLuong}
                            onChange={(e) => handleUpdateHistory(row.id, 'mucLuong', e.target.value)}
                            className={inputClass}
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <input
                            value={row.dieuChinh}
                            onChange={(e) => handleUpdateHistory(row.id, 'dieuChinh', e.target.value)}
                            className={inputClass}
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <input
                            value={row.ghiChu}
                            onChange={(e) => handleUpdateHistory(row.id, 'ghiChu', e.target.value)}
                            className={inputClass}
                          />
                        </td>
                        <td className="px-2 py-1.5 text-right">
                          <button
                            type="button"
                            onClick={() => handleRemoveHistory(row.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                          >
                            <IconTrash size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleAddHistory}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <IconPlus size={14} />
                Thêm kỳ lương
              </button>
              <span className="text-xs text-slate-500">
                Mức lương hiện tại: <strong className="text-slate-700">{formattedSalary}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
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
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}
