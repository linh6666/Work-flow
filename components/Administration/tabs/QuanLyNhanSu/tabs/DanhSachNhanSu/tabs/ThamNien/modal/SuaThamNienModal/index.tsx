"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconPencil } from '@tabler/icons-react';
import { ThamNienItem } from '../../index';

interface SuaThamNienModalProps {
  item: ThamNienItem | null;
  onClose: () => void;
  onSave: (item: ThamNienItem) => void;
}

export default function SuaThamNienModal({
  item,
  onClose,
  onSave,
}: SuaThamNienModalProps) {
  const [maNV, setMaNV] = useState('');
  const [hoTen, setHoTen] = useState('');
  const [phongBan, setPhongBan] = useState('');
  const [chucVu, setChucVu] = useState('');
  const [ngayVao, setNgayVao] = useState('');
  const [ngayChinhThuc, setNgayChinhThuc] = useState('');
  const [thamNienText, setThamNienText] = useState('');
  const [trangThai, setTrangThai] = useState('Đang làm việc');
  const [ghiChu, setGhiChu] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!item) return;
    setErrorMsg('');
    setMaNV(item.maNV);
    setHoTen(item.hoTen);
    setPhongBan(item.phongBan);
    setChucVu(item.chucVu);
    setNgayVao(item.ngayVao);
    setNgayChinhThuc(item.ngayChinhThuc || item.ngayVao);
    setThamNienText(item.thamNienText);
    setTrangThai(item.trangThai);
    setGhiChu(item.ghiChu || '');
  }, [item]);

  if (!item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hoTen.trim()) {
      setErrorMsg('Vui lòng nhập họ tên nhân sự.');
      return;
    }
    if (!ngayVao.trim()) {
      setErrorMsg('Vui lòng nhập ngày vào (dd/mm/yyyy).');
      return;
    }

    const ym = thamNienText.match(/(\d+)\s*năm/);
    const mm = thamNienText.match(/(\d+)\s*tháng/);

    onSave({
      ...item,
      maNV: maNV.trim() || item.maNV,
      hoTen: hoTen.trim(),
      phongBan: phongBan.trim(),
      chucVu: chucVu.trim() || 'Nhân viên',
      ngayVao: ngayVao.trim(),
      ngayChinhThuc: ngayChinhThuc.trim() || ngayVao.trim(),
      soNam: ym ? parseInt(ym[1], 10) : 0,
      soThang: mm ? parseInt(mm[1], 10) : 0,
      thamNienText: thamNienText.trim() || '0 năm 0 tháng',
      trangThai,
      ghiChu: ghiChu.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 backdrop-blur-[1px] p-4">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#406c89] text-white">
          <div className="flex items-center gap-2">
            <IconPencil size={18} />
            <h3 className="text-sm font-bold">Chỉnh sửa thâm niên nhân sự</h3>
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
          {errorMsg && (
            <div className="px-3 py-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 font-medium">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Mã NV</label>
              <input
                type="text"
                value={maNV}
                onChange={(e) => setMaNV(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89]"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Nhân sự <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={hoTen}
                onChange={(e) => setHoTen(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Phòng ban</label>
              <input
                type="text"
                value={phongBan}
                onChange={(e) => setPhongBan(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Chức vụ</label>
              <input
                type="text"
                value={chucVu}
                onChange={(e) => setChucVu(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Ngày vào <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={ngayVao}
                onChange={(e) => setNgayVao(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Ngày chính thức</label>
              <input
                type="text"
                value={ngayChinhThuc}
                onChange={(e) => setNgayChinhThuc(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Thâm niên</label>
              <input
                type="text"
                value={thamNienText}
                onChange={(e) => setThamNienText(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Trạng thái</label>
              <select
                value={trangThai}
                onChange={(e) => setTrangThai(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89] bg-white"
              >
                <option value="Đang làm việc">Đang làm việc</option>
                <option value="Thử việc">Thử việc</option>
                <option value="Đã nghỉ">Đã nghỉ</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Ghi chú</label>
            <input
              type="text"
              value={ghiChu}
              onChange={(e) => setGhiChu(e.target.value)}
              className="w-full h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89]"
            />
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
