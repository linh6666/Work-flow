"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconPencil } from '@tabler/icons-react';
import { GioTTStaffRow } from '../../index';

interface SuaGioTTModalProps {
  item: GioTTStaffRow | null;
  onClose: () => void;
  onSave: (updated: GioTTStaffRow) => void;
}

export default function SuaGioTTModal({ item, onClose, onSave }: SuaGioTTModalProps) {
  const [hoTen, setHoTen] = useState('');
  const [phongBan, setPhongBan] = useState('');
  const [ngayBC, setNgayBC] = useState('');
  const [gioTT, setGioTT] = useState('');
  const [tbNgay, setTbNgay] = useState('');
  const [chuan8h, setChuan8h] = useState('');
  const [chenh, setChenh] = useState('');

  useEffect(() => {
    if (!item) return;
    setHoTen(item.hoTen);
    setPhongBan(item.phongBan);
    setNgayBC(String(item.ngayBC));
    setGioTT(item.gioTT);
    setTbNgay(item.tbNgay);
    setChuan8h(item.chuan8h);
    setChenh(item.chenh);
  }, [item]);

  if (!item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...item,
      hoTen: hoTen.trim() || item.hoTen,
      phongBan: phongBan.trim() || item.phongBan,
      ngayBC: Number(ngayBC) || 0,
      gioTT: gioTT.trim() || item.gioTT,
      tbNgay: tbNgay.trim() || item.tbNgay,
      chuan8h: chuan8h.trim() || item.chuan8h,
      chenh: chenh.trim() || item.chenh,
      isNegative: chenh.trim().startsWith('-'),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 backdrop-blur-[1px] p-4">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#406c89] text-white">
          <div className="flex items-center gap-2">
            <IconPencil size={18} />
            <h3 className="text-sm font-bold">Chỉnh sửa Giờ TT</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/15 transition-colors cursor-pointer"
          >
            <IconX size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Nhân sự</label>
              <input
                type="text"
                value={hoTen}
                onChange={(e) => setHoTen(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Phòng ban</label>
              <input
                type="text"
                value={phongBan}
                onChange={(e) => setPhongBan(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Ngày BC</label>
              <input
                type="number"
                value={ngayBC}
                onChange={(e) => setNgayBC(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Giờ TT</label>
              <input
                type="text"
                value={gioTT}
                onChange={(e) => setGioTT(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">TB/ngày</label>
              <input
                type="text"
                value={tbNgay}
                onChange={(e) => setTbNgay(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Chuẩn 8h</label>
              <input
                type="text"
                value={chuan8h}
                onChange={(e) => setChuan8h(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Chênh</label>
              <input
                type="text"
                value={chenh}
                onChange={(e) => setChenh(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#406c89] hover:bg-[#345972] text-white font-semibold cursor-pointer"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
