"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { IconX } from '@tabler/icons-react';
import { ThamNienItem } from '../../index';

interface ThemThamNienModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: ThamNienItem) => void;
}

function formatDateVN(iso: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

export default function ThemThamNienModal({
  isOpen,
  onClose,
  onAdd,
}: ThemThamNienModalProps) {
  const [hoTen, setHoTen] = useState('');
  const [phongBan, setPhongBan] = useState('Ban Giám đốc');
  const [ngayVaoIso, setNgayVaoIso] = useState('');
  const [ngayChinhThucIso, setNgayChinhThucIso] = useState('');
  const [ngayNghiViecIso, setNgayNghiViecIso] = useState('');
  const [trangThai, setTrangThai] = useState('Đang làm việc');

  useEffect(() => {
    if (!isOpen) return;
    setHoTen('');
    setPhongBan('Ban Giám đốc');
    setNgayVaoIso('');
    setNgayChinhThucIso('');
    setNgayNghiViecIso('');
    setTrangThai('Đang làm việc');
  }, [isOpen]);

  const computed = useMemo(() => {
    if (!ngayVaoIso) {
      return {
        thamNienText: '—',
        soNam: 0,
        soThang: 0,
        nextDateStr: '—',
        conLaiStr: '—',
      };
    }

    const start = new Date(`${ngayVaoIso}T00:00:00`);
    const end =
      trangThai === 'Đã nghỉ' && ngayNghiViecIso
        ? new Date(`${ngayNghiViecIso}T00:00:00`)
        : new Date();

    let totalMonths =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    if (end.getDate() < start.getDate()) totalMonths -= 1;
    totalMonths = Math.max(0, totalMonths);

    const soNam = Math.floor(totalMonths / 12);
    const soThang = totalMonths % 12;
    const thamNienText = `${soNam} năm ${soThang} tháng`;

    if (trangThai === 'Đã nghỉ') {
      return {
        thamNienText,
        soNam,
        soThang,
        nextDateStr: '—',
        conLaiStr: '—',
      };
    }

    const today = new Date();
    const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let nextYear = todayZero.getFullYear();
    let nextDate = new Date(nextYear, start.getMonth(), start.getDate());
    if (nextDate <= todayZero) {
      nextYear += 1;
      nextDate = new Date(nextYear, start.getMonth(), start.getDate());
    }
    const diffDays = Math.round(
      (nextDate.getTime() - todayZero.getTime()) / (1000 * 60 * 60 * 24)
    );
    const dd = String(start.getDate()).padStart(2, '0');
    const mm = String(start.getMonth() + 1).padStart(2, '0');

    return {
      thamNienText,
      soNam,
      soThang,
      nextDateStr: `${dd}/${mm}/${nextYear}`,
      conLaiStr: `${diffDays} ngày`,
    };
  }, [ngayVaoIso, ngayNghiViecIso, trangThai]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ngayVaoIso) return;

    const ngayVao = formatDateVN(ngayVaoIso);
    const ngayChinhThuc = ngayChinhThucIso ? formatDateVN(ngayChinhThucIso) : ngayVao;

    onAdd({
      id: String(Date.now()),
      maNV: `NV${String(Math.floor(100 + Math.random() * 900))}`,
      hoTen: hoTen.trim() || 'Nhân sự mới',
      phongBan,
      chucVu: 'Nhân viên',
      ngayVao,
      ngayChinhThuc,
      soNam: computed.soNam,
      soThang: computed.soThang,
      thamNienText: computed.thamNienText,
      mocKhenThuong: '—',
      troCapThamNien: 0,
      trangThai,
      ghiChu: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 backdrop-blur-[1px] p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <h3 className="text-base font-bold text-slate-800">Thêm nhân sự</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Banner nhân sự */}
          <div className="bg-[#496d89] text-white rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center text-base font-bold shrink-0">
              ?
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold leading-snug">
                {hoTen.trim() || 'Nhân sự mới'}
              </div>
              <div className="text-[11.5px] text-white/80">{phongBan}</div>
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[10.5px] font-medium">
                  {trangThai}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[10.5px] font-medium">
                  {phongBan}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[10.5px] font-medium">
                  Chưa xếp bậc · — đ
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[10.5px] font-medium">
                  Hồ sơ: 0 giấy tờ
                </span>
              </div>
            </div>
          </div>

          {/* Card 1: Mốc thời gian công tác */}
          <div className="border border-slate-200/90 rounded-xl p-4 space-y-3.5 bg-white">
            <div className="flex items-baseline gap-2">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                Mốc thời gian công tác
              </span>
              <span className="text-[11px] text-slate-400">
                Các mốc dùng để tính thâm niên
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10.5px] font-semibold text-slate-500 uppercase mb-1">
                  Ngày vào (thử việc)
                </label>
                <input
                  type="date"
                  value={ngayVaoIso}
                  onChange={(e) => setNgayVaoIso(e.target.value)}
                  className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs text-slate-700 outline-none focus:border-[#406c89]"
                />
              </div>
              <div>
                <label className="block text-[10.5px] font-semibold text-slate-500 uppercase mb-1">
                  Ngày chính thức
                </label>
                <input
                  type="date"
                  value={ngayChinhThucIso}
                  onChange={(e) => setNgayChinhThucIso(e.target.value)}
                  className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs text-slate-700 outline-none focus:border-[#406c89]"
                />
              </div>
              <div>
                <label className="block text-[10.5px] font-semibold text-slate-500 uppercase mb-1">
                  Ngày bắt đầu nghỉ việc
                </label>
                <input
                  type="date"
                  value={ngayNghiViecIso}
                  onChange={(e) => setNgayNghiViecIso(e.target.value)}
                  className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs text-slate-700 outline-none focus:border-[#406c89]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10.5px] font-semibold text-slate-500 uppercase mb-1">
                  Trạng thái
                </label>
                <select
                  value={trangThai}
                  onChange={(e) => setTrangThai(e.target.value)}
                  className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white outline-none focus:border-[#406c89]"
                >
                  <option value="Đang làm việc">Đang làm việc</option>
                  <option value="Thử việc">Thử việc</option>
                  <option value="Đã nghỉ">Đã nghỉ</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 2: Thâm niên */}
          <div className="border border-slate-200/90 rounded-xl p-4 space-y-3 bg-white">
            <div className="flex items-baseline gap-2">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                Thâm niên
              </span>
              <span className="text-[11px] text-slate-400">
                Tự động tính từ ngày vào làm
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-[10.5px] font-semibold text-slate-400 uppercase mb-0.5">
                  Thâm niên
                </div>
                <div className="text-sm font-bold text-slate-800">{computed.thamNienText}</div>
                <div className="text-[10.5px] text-slate-400">tính đến hôm nay</div>
              </div>
              <div>
                <div className="text-[10.5px] font-semibold text-slate-400 uppercase mb-0.5">
                  Kỷ niệm ngày vào làm kế tiếp
                </div>
                <div className="text-sm font-bold text-slate-800">{computed.nextDateStr}</div>
              </div>
              <div>
                <div className="text-[10.5px] font-semibold text-slate-400 uppercase mb-0.5">
                  Còn lại
                </div>
                <div className="text-sm font-bold text-slate-800">{computed.conLaiStr}</div>
              </div>
            </div>
          </div>

          {/* Card 3: Các mốc thâm niên */}
          <div className="border border-slate-200/90 rounded-xl p-4 space-y-2.5 bg-white">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
              Các mốc thâm niên
            </div>
            <div className="px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50/70 text-xs text-slate-500">
              {ngayVaoIso
                ? `Mốc hiện tại: ${computed.thamNienText} (tính từ ${formatDateVN(ngayVaoIso)}).`
                : 'Chưa có ngày vào làm để tính mốc thâm niên.'}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={!ngayVaoIso}
              className="px-4 py-2 rounded-lg bg-[#406c89] hover:bg-[#345972] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-semibold cursor-pointer transition-colors"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
