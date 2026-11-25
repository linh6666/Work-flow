"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconPlus, IconTrash } from '@tabler/icons-react';
import type { ThanNhanItem } from '../../index';

interface ConItem {
  id: string;
  hoTen: string;
  ngaySinh: string;
  laNguoiPhuThuoc: boolean;
  maSoThueNPT: string;
}

interface SuaThanNhanModalProps {
  isOpen: boolean;
  item: ThanNhanItem | null;
  onClose: () => void;
  onSubmit: (updated: ThanNhanItem) => void;
}

export default function SuaThanNhanModal({ isOpen, item, onClose, onSubmit }: SuaThanNhanModalProps) {
  const [maNV, setMaNV] = useState('');
  const [hoTenNV, setHoTenNV] = useState('');
  const [phongBan, setPhongBan] = useState('');

  // Vợ / Chồng
  const [tinhTrangHonNhan, setTinhTrangHonNhan] = useState('');
  const [soCccd, setSoCccd] = useState('');
  const [ngayCap, setNgayCap] = useState('');
  const [noiCap, setNoiCap] = useState('');

  // Người thân liên hệ
  const [hoTenVaQuanHe, setHoTenVaQuanHe] = useState('');
  const [soDienThoai, setSoDienThoai] = useState('');

  // Con & Người phụ thuộc
  const [danhSachCon, setDanhSachCon] = useState<ConItem[]>([]);

  useEffect(() => {
    if (isOpen && item) {
      setMaNV(item.maNV || '');
      setHoTenNV(item.hoTenNV || '');
      setPhongBan(item.phongBan || '');
      setTinhTrangHonNhan(item.ghiChu || '');
      setSoCccd('');
      setNgayCap('');
      setNoiCap('');
      setHoTenVaQuanHe(
        item.hoTenThanNhan && item.moiQuanHe
          ? `${item.hoTenThanNhan} - ${item.moiQuanHe}`
          : item.hoTenThanNhan || ''
      );
      setSoDienThoai(item.soDienThoai === '—' ? '' : item.soDienThoai || '');

      if (item.moiQuanHe === 'Con') {
        setDanhSachCon([
          {
            id: item.id,
            hoTen: item.hoTenThanNhan || '',
            ngaySinh: item.ngaySinh === '—' ? '' : item.ngaySinh || '',
            laNguoiPhuThuoc: item.laNguoiPhuThuoc,
            maSoThueNPT: item.maSoThueNPT === '—' ? '' : item.maSoThueNPT || '',
          },
        ]);
      } else {
        setDanhSachCon([]);
      }
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const handleAddChild = () => {
    setDanhSachCon((prev) => [
      ...prev,
      {
        id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
        hoTen: '',
        ngaySinh: '',
        laNguoiPhuThuoc: false,
        maSoThueNPT: '',
      },
    ]);
  };

  const handleUpdateChild = <K extends keyof ConItem>(id: string, key: K, value: ConItem[K]) => {
    setDanhSachCon((prev) => prev.map((c) => (c.id === id ? { ...c, [key]: value } : c)));
  };

  const handleRemoveChild = (id: string) => {
    setDanhSachCon((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const [parsedTen, parsedQuanHe] = hoTenVaQuanHe.split('-').map((s) => s.trim());
    const validMoiQuanHe: ThanNhanItem['moiQuanHe'][] = ['Bố', 'Mẹ', 'Vợ', 'Chồng', 'Con', 'Anh/Chị/Em'];
    const moiQuanHe = validMoiQuanHe.includes(parsedQuanHe as ThanNhanItem['moiQuanHe'])
      ? (parsedQuanHe as ThanNhanItem['moiQuanHe'])
      : danhSachCon.length > 0
      ? 'Con'
      : item.moiQuanHe;

    const firstChild = danhSachCon[0];
    const hasDependent = danhSachCon.some((c) => c.laNguoiPhuThuoc);

    onSubmit({
      ...item,
      maNV: maNV.trim() || item.maNV,
      hoTenNV: hoTenNV.trim() || item.hoTenNV,
      phongBan: phongBan.trim() || item.phongBan,
      hoTenThanNhan: parsedTen || firstChild?.hoTen.trim() || item.hoTenThanNhan,
      moiQuanHe,
      ngaySinh: firstChild?.ngaySinh || item.ngaySinh || '—',
      soDienThoai: soDienThoai.trim() || '—',
      laNguoiPhuThuoc: danhSachCon.length > 0 ? hasDependent : item.laNguoiPhuThuoc,
      maSoThueNPT: firstChild?.maSoThueNPT.trim() || item.maSoThueNPT || '—',
      ghiChu: [tinhTrangHonNhan, soCccd ? `CCCD: ${soCccd}` : '', noiCap].filter(Boolean).join(' · '),
    });

    onClose();
  };

  const soNguoiPhuThuoc = danhSachCon.filter((c) => c.laNguoiPhuThuoc).length;
  const inputClass =
    'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89]/20';
  const labelClass = 'mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-slate-500';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
      <form
        onSubmit={handleSubmit}
        className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <h2 className="text-base font-bold text-slate-800">Chỉnh sửa thân nhân</h2>
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
          {/* Top Slate-Blue Banner */}
          <div className="rounded-xl bg-[#40627c] px-5 py-4 text-white flex items-center gap-4">
            <div className="h-11 w-11 shrink-0 rounded-full bg-white/15 flex items-center justify-center text-base font-bold">
              {(hoTenNV.trim() || '?').charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold truncate">{hoTenNV.trim() || 'Nhân sự'}</div>
              <div className="text-xs text-white/80 truncate">{phongBan.trim() || 'Chưa phân phòng'}</div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-medium">Đang làm việc</span>
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-medium">
                  {phongBan.trim() || 'Chưa phân phòng'}
                </span>
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-medium">
                  {maNV.trim() || 'Chưa có mã NV'}
                </span>
              </div>
            </div>
          </div>

          {/* Card 1: VỢ / CHỒNG */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3.5">
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700">VỢ / CHỒNG</h3>
              <span className="text-xs text-slate-400">Tình trạng hôn nhân và giấy tờ của vợ/chồng</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label>
                <span className={labelClass}>TÌNH TRẠNG HÔN NHÂN</span>
                <input
                  value={tinhTrangHonNhan}
                  onChange={(e) => setTinhTrangHonNhan(e.target.value)}
                  placeholder="Độc thân / Đã lập gia đình..."
                  className={inputClass}
                />
              </label>
              <label>
                <span className={labelClass}>SỐ CMT/CCCD</span>
                <input
                  value={soCccd}
                  onChange={(e) => setSoCccd(e.target.value)}
                  className={inputClass}
                />
              </label>
              <label>
                <span className={labelClass}>NGÀY CẤP</span>
                <input
                  type="date"
                  value={ngayCap}
                  onChange={(e) => setNgayCap(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label>
                <span className={labelClass}>NƠI CẤP</span>
                <input
                  value={noiCap}
                  onChange={(e) => setNoiCap(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
          </div>

          {/* Card 2: NGƯỜI THÂN LIÊN HỆ */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700">NGƯỜI THÂN LIÊN HỆ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label>
                <span className={labelClass}>HỌ TÊN & QUAN HỆ</span>
                <input
                  value={hoTenVaQuanHe}
                  onChange={(e) => setHoTenVaQuanHe(e.target.value)}
                  placeholder="Nguyễn Thị A - Vợ"
                  className={inputClass}
                />
              </label>
              <label>
                <span className={labelClass}>SỐ ĐIỆN THOẠI</span>
                <input
                  type="tel"
                  value={soDienThoai}
                  onChange={(e) => setSoDienThoai(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
          </div>

          {/* Card 3: CON */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700">CON</h3>
                <span className="text-xs text-slate-400">Danh sách con và người phụ thuộc</span>
              </div>
              <span className="rounded-full bg-amber-50 border border-amber-200/70 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
                {danhSachCon.length} con · {soNguoiPhuThuoc} người phụ thuộc
              </span>
            </div>

            {danhSachCon.length === 0 ? (
              <div className="rounded-lg border border-slate-200 px-3 py-2.5 text-xs text-slate-400">
                Chưa khai báo con.
              </div>
            ) : (
              <div className="space-y-2.5">
                {danhSachCon.map((child, idx) => (
                  <div
                    key={child.id}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center rounded-lg border border-slate-200 bg-slate-50/50 p-2.5"
                  >
                    <div className="sm:col-span-4">
                      <input
                        value={child.hoTen}
                        onChange={(e) => handleUpdateChild(child.id, 'hoTen', e.target.value)}
                        placeholder={`Họ tên con #${idx + 1}`}
                        className={inputClass}
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <input
                        type="date"
                        value={child.ngaySinh}
                        onChange={(e) => handleUpdateChild(child.id, 'ngaySinh', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <input
                        value={child.maSoThueNPT}
                        onChange={(e) => handleUpdateChild(child.id, 'maSoThueNPT', e.target.value)}
                        placeholder="MST NPT"
                        className={inputClass}
                      />
                    </div>
                    <label className="sm:col-span-2 flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={child.laNguoiPhuThuoc}
                        onChange={(e) => handleUpdateChild(child.id, 'laNguoiPhuThuoc', e.target.checked)}
                        className="accent-[#406c89]"
                      />
                      Phụ thuộc
                    </label>
                    <div className="sm:col-span-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleRemoveChild(child.id)}
                        aria-label="Xóa con"
                        className="rounded p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
                      >
                        <IconTrash size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={handleAddChild}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <IconPlus size={14} />
              Thêm con
            </button>
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
