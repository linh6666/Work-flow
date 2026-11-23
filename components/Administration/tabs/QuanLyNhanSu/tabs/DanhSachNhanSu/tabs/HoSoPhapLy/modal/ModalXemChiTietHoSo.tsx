"use client";

import React from 'react';
import { IconX, IconShieldCheck, IconUser } from '@tabler/icons-react';
import { HoSoPhapLyItem } from '../index';

interface ModalXemChiTietHoSoProps {
  isOpen: boolean;
  item: HoSoPhapLyItem | null;
  onClose: () => void;
}

export default function ModalXemChiTietHoSo({
  isOpen,
  item,
  onClose,
}: ModalXemChiTietHoSoProps) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#406c89] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconShieldCheck size={18} className="text-white/90" />
            <h3 className="font-bold text-sm tracking-wide">Chi tiết Hồ sơ Pháp lý</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[80vh] overflow-y-auto space-y-4 text-xs text-slate-700">
          {/* Nhân sự info card */}
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#406c89] text-white font-bold flex items-center justify-center text-sm shrink-0">
              {item.hoTen.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-sm text-slate-800">{item.hoTen}</div>
              <div className="text-slate-500 font-mono text-[11px] flex items-center gap-2">
                <span>Mã NV: <strong className="text-slate-700">{item.maNV}</strong></span>
                <span>•</span>
                <span>{item.phongBan}</span>
                {item.chucVu && item.chucVu !== '—' && (
                  <>
                    <span>•</span>
                    <span>{item.chucVu}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Chi tiết các trường pháp lý */}
          <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100 bg-white">
            <div className="grid grid-cols-3 p-2.5 hover:bg-slate-50/60">
              <span className="font-semibold text-slate-500">Số CCCD / CMND:</span>
              <span className="col-span-2 font-mono font-bold text-slate-800">{item.soCCCD}</span>
            </div>
            <div className="grid grid-cols-3 p-2.5 hover:bg-slate-50/60">
              <span className="font-semibold text-slate-500">Ngày cấp:</span>
              <span className="col-span-2 text-slate-700">{item.ngayCapCCCD}</span>
            </div>
            <div className="grid grid-cols-3 p-2.5 hover:bg-slate-50/60">
              <span className="font-semibold text-slate-500">Nơi cấp:</span>
              <span className="col-span-2 text-slate-700">{item.noiCapCCCD}</span>
            </div>
            <div className="grid grid-cols-3 p-2.5 hover:bg-slate-50/60">
              <span className="font-semibold text-slate-500">Số sổ BHXH:</span>
              <span className="col-span-2 font-mono font-semibold text-slate-800">{item.soBHXH}</span>
            </div>
            <div className="grid grid-cols-3 p-2.5 hover:bg-slate-50/60">
              <span className="font-semibold text-slate-500">Mã số thuế (MST):</span>
              <span className="col-span-2 font-mono font-semibold text-slate-800">{item.mstCaNhan}</span>
            </div>
            <div className="grid grid-cols-3 p-2.5 hover:bg-slate-50/60">
              <span className="font-semibold text-slate-500">Ngân hàng:</span>
              <span className="col-span-2 text-slate-700">{item.nganHang}</span>
            </div>
            <div className="grid grid-cols-3 p-2.5 hover:bg-slate-50/60">
              <span className="font-semibold text-slate-500">Số tài khoản:</span>
              <span className="col-span-2 font-mono text-slate-800">{item.soTaiKhoan}</span>
            </div>
            <div className="grid grid-cols-3 p-2.5 hover:bg-slate-50/60 items-center">
              <span className="font-semibold text-slate-500">Tình trạng hồ sơ:</span>
              <div className="col-span-2">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${
                    item.tinhTrangHoSo === 'Đầy đủ'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : item.tinhTrangHoSo === 'Chưa nộp'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {item.tinhTrangHoSo}
                </span>
              </div>
            </div>
            {item.ghiChu && (
              <div className="grid grid-cols-3 p-2.5 hover:bg-slate-50/60">
                <span className="font-semibold text-slate-500">Ghi chú:</span>
                <span className="col-span-2 text-slate-600 italic">{item.ghiChu}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
