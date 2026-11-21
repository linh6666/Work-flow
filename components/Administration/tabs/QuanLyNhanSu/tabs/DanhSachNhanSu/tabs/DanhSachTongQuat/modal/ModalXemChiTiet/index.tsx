"use client";

import React from 'react';
import {
  IconX,
  IconUser,
  IconBriefcase,
  IconCalendar,
  IconPhone,
  IconMail,
  IconCoin,
  IconAward,
  IconBuildingSkyscraper,
  IconIdBadge2,
} from '@tabler/icons-react';
import { NhanSuItem, formatVND } from '../../index';

interface ModalXemChiTietProps {
  isOpen: boolean;
  item: NhanSuItem | null;
  onClose: () => void;
}

export default function ModalXemChiTiet({ isOpen, item, onClose }: ModalXemChiTietProps) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#406c89] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              {item.hoTen.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span>{item.hoTen}</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                  {item.maNV}
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">{item.chucVu} • {item.phongBan}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto text-xs text-slate-700">
          {/* Status & Work Info */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50/70 p-4 rounded-xl border border-slate-100">
            <div>
              <span className="text-[11px] text-slate-400 block mb-1">Trạng thái</span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  item.trangThai === 'Đang làm việc'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : item.trangThai === 'Đã nghỉ'
                    ? 'bg-rose-50 text-rose-600 border-rose-300'
                    : 'bg-amber-50 text-amber-700 border-amber-300'
                }`}
              >
                {item.trangThai}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block mb-1">Giới tính</span>
              <span className="font-semibold text-slate-700">{item.gioiTinh || '—'}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block mb-1">Ngày sinh</span>
              <span className="font-mono font-semibold text-slate-700">{item.ngaySinh || '—'}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block mb-1">Số điện thoại</span>
              <span className="font-mono font-semibold text-slate-700 flex items-center gap-1">
                <IconPhone size={13} className="text-slate-400" />
                {item.dienThoai || '—'}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block mb-1">Email</span>
              <span className="font-semibold text-slate-700 flex items-center gap-1">
                <IconMail size={13} className="text-slate-400" />
                {item.email || '—'}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block mb-1">Ngày vào làm</span>
              <span className="font-mono font-semibold text-slate-700 flex items-center gap-1">
                <IconCalendar size={13} className="text-slate-400" />
                {item.ngayVao || '—'}
              </span>
            </div>
          </div>

          {/* Seniority & Salary Info */}
          <div>
            <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-1.5">
              <IconCoin size={15} className="text-[#ba8e3a]" />
              <span>Chế độ đãi ngộ & Thâm niên</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-amber-50/40 p-4 rounded-xl border border-amber-100">
              <div>
                <span className="text-[11px] text-slate-500 block mb-0.5">Thâm niên</span>
                <span className="font-bold text-indigo-700">{item.thamNien || '—'}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block mb-0.5">Bậc lương</span>
                <span className="font-bold text-slate-700">{item.bacLuong || '—'}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block mb-0.5">Mức lương cứng</span>
                <span className="font-mono font-bold text-slate-700">{formatVND(item.mucLuongCung)} đ</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block mb-0.5">Lương mềm / KPIs</span>
                <span className="font-mono font-bold text-slate-700">{formatVND(item.mucLuongMem)} đ</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block mb-0.5">Tổng trợ cấp</span>
                <span className="font-mono font-bold text-slate-700">{formatVND(item.tongTroCap)} đ</span>
              </div>
              <div className="sm:col-span-3">
                <span className="text-[11px] text-slate-500 block mb-0.5">Tổng thu nhập / Mức lương hiện tại</span>
                <span className="font-mono font-extrabold text-base text-emerald-700">
                  {formatVND(item.mucLuongHienTai || (item.mucLuongCung + item.mucLuongMem + item.tongTroCap))} đ
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {(item.ghiChu || item.ghiChuLuong) && (
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 block">Ghi chú:</span>
              <p className="text-slate-600">{item.ghiChu || item.ghiChuLuong}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-2xs cursor-pointer transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
