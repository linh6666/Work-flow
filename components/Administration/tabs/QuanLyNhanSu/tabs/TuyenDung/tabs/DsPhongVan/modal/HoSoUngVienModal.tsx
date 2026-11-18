"use client";

import React from 'react';
import {
  IconX,
  IconUser,
  IconBriefcase,
  IconPhone,
  IconBuilding,
  IconCalendar,
  IconClock,
  IconCheck,
  IconFileText,
  IconSchool,
} from '@tabler/icons-react';
import { PhongVanItem } from '../index';

interface HoSoUngVienModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: PhongVanItem | null;
}

export default function HoSoUngVienModal({
  isOpen,
  onClose,
  candidate,
}: HoSoUngVienModalProps) {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-xl overflow-hidden animate-scale-up text-slate-700 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold shadow-xs ${
              candidate.uvColor === 'green' ? 'bg-[#15803d]' : 'bg-[#c82333]'
            }`}>
              <IconUser size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Hồ Sơ Ứng Viên: {candidate.hoTenUv}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Vị trí: <span className="font-semibold text-slate-700">{candidate.chucVu}</span> — {candidate.phongBan}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* I. THÔNG TIN CƠ BẢN */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold text-[#ba8e3a] uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-100">
              <IconUser size={14} />
              <span>I. Thông Tin Cơ Bản</span>
            </h4>
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400">Họ và tên:</span>{' '}
                <strong className="text-slate-800 font-semibold">{candidate.hoTenUv}</strong>
              </div>
              <div>
                <span className="text-slate-400">Số điện thoại:</span>{' '}
                <strong className="text-slate-800 font-semibold">{candidate.dienThoai}</strong>
              </div>
              <div>
                <span className="text-slate-400">Chức vụ ứng tuyển:</span>{' '}
                <strong className="text-slate-800 font-semibold">{candidate.chucVu}</strong>
              </div>
              <div>
                <span className="text-slate-400">Phòng ban:</span>{' '}
                <strong className="text-slate-800 font-semibold">{candidate.phongBan}</strong>
              </div>
            </div>
          </div>

          {/* II. LỊCH PHỎNG VẤN & KẾT QUẢ */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold text-[#ba8e3a] uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-100">
              <IconCalendar size={14} />
              <span>II. Lịch Phỏng Vấn & Kết Quả</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block mb-0.5">Lịch PV:</span>
                <strong className="text-slate-800">{candidate.lichPv1Ngay}</strong>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Giờ PV:</span>
                <strong className="text-slate-800">{candidate.gioPv}</strong>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Tham gia PV:</span>
                <span className="font-semibold text-slate-800">{candidate.uvThamGiaPv === 1 ? 'Có tham gia' : candidate.uvThamGiaPv === 0 ? 'Vắng mặt' : '—'}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Đạt yêu cầu:</span>
                {candidate.uvDatYeuCau === 'PASS' ? (
                  <span className="px-2 py-0.5 bg-[#15803d] text-white rounded font-bold text-[10px]">PASS</span>
                ) : candidate.uvDatYeuCau === 'FAIL' ? (
                  <span className="px-2 py-0.5 bg-[#c82333] text-white rounded font-bold text-[10px]">FAIL</span>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Nhận việc:</span>
                {candidate.uvNhanViec === 'PASS' ? (
                  <span className="px-2 py-0.5 bg-[#15803d] text-white rounded font-bold text-[10px]">PASS</span>
                ) : candidate.uvNhanViec === 'FAIL' ? (
                  <span className="px-2 py-0.5 bg-[#c82333] text-white rounded font-bold text-[10px]">FAIL</span>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Kết quả chung:</span>
                {candidate.ketQua === 'PASS' ? (
                  <span className="px-2 py-0.5 bg-[#15803d] text-white rounded font-bold text-[10px]">PASS</span>
                ) : candidate.ketQua === 'FAIL' ? (
                  <span className="px-2 py-0.5 bg-[#c82333] text-white rounded font-bold text-[10px]">FAIL</span>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </div>
              <div className="col-span-2 sm:col-span-3 pt-1">
                <span className="text-slate-400 block mb-0.5">Ngày bắt đầu đi làm:</span>
                <strong className="text-slate-800">{candidate.ngayBatDauDiLam}</strong>
              </div>
            </div>
          </div>

          {/* III. GHI CHÚ ĐÁNH GIÁ */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold text-[#ba8e3a] uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-100">
              <IconFileText size={14} />
              <span>III. Ghi Chú & Đánh Giá Chi Tiết</span>
            </h4>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-slate-700 leading-relaxed">
              {candidate.ghiChu !== '—' ? candidate.ghiChu : 'Chưa có ghi chú bổ sung.'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-end bg-slate-50/60 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#406c89] hover:bg-[#345972] text-white font-medium rounded-lg text-xs transition-colors cursor-pointer shadow-xs"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
