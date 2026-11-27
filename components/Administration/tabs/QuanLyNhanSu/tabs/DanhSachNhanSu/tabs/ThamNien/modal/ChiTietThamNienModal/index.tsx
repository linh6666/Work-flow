"use client";

import React from 'react';
import { IconX } from '@tabler/icons-react';
import { ThamNienItem } from '../../index';

interface ChiTietThamNienModalProps {
  item: ThamNienItem | null;
  anniversary: { dateStr: string; label: string } | null;
  onClose: () => void;
}

function toIsoDate(ddmmyyyy?: string): string {
  if (!ddmmyyyy || ddmmyyyy === '—') return '';
  const m = ddmmyyyy.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return '';
  return `${m[3]}-${m[2]}-${m[1]}`;
}

function getInitial(name: string): string {
  const parts = name.trim().split(/\s+/);
  const last = parts[parts.length - 1] || name;
  return last.charAt(0).toUpperCase() || '?';
}

export default function ChiTietThamNienModal({
  item,
  anniversary,
  onClose,
}: ChiTietThamNienModalProps) {
  if (!item) return null;

  const ngayVaoIso = toIsoDate(item.ngayVao);
  const ngayChinhThucIso = toIsoDate(item.ngayChinhThuc || item.ngayVao);
  const conLai = anniversary ? anniversary.label.split('·')[1]?.trim() || '—' : '—';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 backdrop-blur-[1px] p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <h3 className="text-base font-bold text-slate-800">Chi tiết thâm niên</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Banner nhân sự */}
          <div className="bg-[#496d89] text-white rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center text-base font-bold shrink-0">
              {getInitial(item.hoTen)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold leading-snug">{item.hoTen}</div>
              <div className="text-[11.5px] text-white/80">
                {item.chucVu} · {item.phongBan}
              </div>
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[10.5px] font-medium">
                  {item.trangThai}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[10.5px] font-medium">
                  {item.phongBan}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[10.5px] font-medium">
                  {item.maNV}
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
                  disabled
                  className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs text-slate-500 bg-slate-100 cursor-not-allowed outline-none"
                />
              </div>
              <div>
                <label className="block text-[10.5px] font-semibold text-slate-500 uppercase mb-1">
                  Ngày chính thức
                </label>
                <input
                  type="date"
                  value={ngayChinhThucIso}
                  disabled
                  className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs text-slate-500 bg-slate-100 cursor-not-allowed outline-none"
                />
              </div>
              <div>
                <label className="block text-[10.5px] font-semibold text-slate-500 uppercase mb-1">
                  Ngày bắt đầu nghỉ việc
                </label>
                <input
                  type="date"
                  value=""
                  disabled
                  className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs text-slate-500 bg-slate-100 cursor-not-allowed outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10.5px] font-semibold text-slate-500 uppercase mb-1">
                  Trạng thái
                </label>
                <select
                  value={item.trangThai}
                  disabled
                  className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs text-slate-500 bg-slate-100 cursor-not-allowed outline-none"
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
                <div className="text-sm font-bold text-slate-800">{item.thamNienText || '—'}</div>
                <div className="text-[10.5px] text-slate-400">tính đến hôm nay</div>
              </div>
              <div>
                <div className="text-[10.5px] font-semibold text-slate-400 uppercase mb-0.5">
                  Kỷ niệm ngày vào làm kế tiếp
                </div>
                <div className="text-sm font-bold text-slate-800">
                  {anniversary ? anniversary.dateStr : '—'}
                </div>
              </div>
              <div>
                <div className="text-[10.5px] font-semibold text-slate-400 uppercase mb-0.5">
                  Còn lại
                </div>
                <div className="text-sm font-bold text-slate-800">{conLai}</div>
              </div>
            </div>
          </div>

          {/* Card 3: Các mốc thâm niên */}
          <div className="border border-slate-200/90 rounded-xl p-4 space-y-2.5 bg-white">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
              Các mốc thâm niên
            </div>
            <div className="px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50/70 text-xs text-slate-500">
              {item.ngayVao && item.ngayVao !== '—'
                ? `Mốc hiện tại: ${item.thamNienText} (tính từ ${item.ngayVao}).`
                : 'Chưa có ngày vào làm để tính mốc thâm niên.'}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#406c89] hover:bg-[#345972] text-white text-xs font-semibold cursor-pointer transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
