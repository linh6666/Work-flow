"use client";

import React from 'react';
import { IconX } from '@tabler/icons-react';

interface NhanSuData {
  id: string;
  duAn: string;
  maKH: string;
  khachHang: string;
  nvLap: string;
  ngayLap: string;
  trangThai: 'dang-dien' | 'da-tong-hop';
  lienKetDeXuat?: string;
  tyLeMoHinh?: string;
  kichThuocDuKien?: string;
  diaDiemLapDat?: string;
  duongDanHoSo?: string;
  loaiChan?: string;
  kinh?: string;
  anhSang?: string[];
  congNghe?: string[];
  ghiChu?: string;
}

interface ViewNhanSuModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: NhanSuData | null;
}

export default function ViewNhanSuModal({ isOpen, onClose, plan }: ViewNhanSuModalProps) {
  if (!isOpen || !plan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto no-scrollbar animate-in fade-in duration-200">
      
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content Card */}
      <div className="relative bg-white w-full max-w-[600px] my-8 rounded-2xl shadow-lg border border-slate-100/50 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 bg-white">
          <div>
            <h3 className="text-base font-bold text-slate-800">Chi tiết Bản dự kiến Nhân sự</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5 uppercase tracking-wider">{plan.maKH}</p>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-655 transition-colors cursor-pointer bg-transparent border-0"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Scrollable Detail Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs no-scrollbar">
          
          {/* Section 1: Thông tin dự án */}
          <div className="space-y-3.5">
            <h4 className="font-bold text-indigo-900 border-b border-indigo-50/60 pb-1 uppercase tracking-wide text-[10px]">
              Thông tin dự án
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50/50 px-4 py-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase">Tên dự án / mô hình</span>
                <span className="font-bold text-slate-800">{plan.duAn}</span>
              </div>
              <div className="bg-slate-50/50 px-4 py-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase">Khách hàng</span>
                <span className="font-semibold text-slate-800">{plan.khachHang || 'N/A'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50/50 px-4 py-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase">Người lập</span>
                <span className="font-semibold text-slate-700">{plan.nvLap}</span>
              </div>
              <div className="bg-slate-50/50 px-4 py-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase">Ngày lập</span>
                <span className="font-semibold text-slate-700">{plan.ngayLap}</span>
              </div>
              <div className="bg-slate-50/50 px-4 py-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase">Trạng thái</span>
                {plan.trangThai === 'dang-dien' ? (
                  <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full text-amber-700 bg-amber-50 border border-amber-200 mt-0.5">
                    Đang điền
                  </span>
                ) : (
                  <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 border border-emerald-200 mt-0.5">
                    Đã tổng hợp
                  </span>
                )}
              </div>
            </div>

            {plan.lienKetDeXuat && (
              <div className="bg-slate-50/50 px-4 py-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase">Liên kết Đề xuất báo giá</span>
                <span className="font-medium text-slate-800">{plan.lienKetDeXuat}</span>
              </div>
            )}
          </div>

          {/* Section 2: Thông số kỹ thuật */}
          <div className="space-y-3.5">
            <h4 className="font-bold text-indigo-900 border-b border-indigo-50/60 pb-1 uppercase tracking-wide text-[10px]">
              Thông số kỹ thuật mô hình
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50/50 px-4 py-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase">Tỷ lệ mô hình</span>
                <span className="font-semibold text-slate-800">{plan.tyLeMoHinh || 'Chưa cập nhật'}</span>
              </div>
              <div className="bg-slate-50/50 px-4 py-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase">Kích thước dự kiến</span>
                <span className="font-semibold text-slate-800">{plan.kichThuocDuKien || 'Chưa cập nhật'}</span>
              </div>
              <div className="bg-slate-50/50 px-4 py-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase">Địa điểm lắp đặt</span>
                <span className="font-semibold text-slate-800">{plan.diaDiemLapDat || 'Chưa cập nhật'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50/50 px-4 py-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase">Loại chân đế</span>
                <span className="font-semibold text-slate-800">{plan.loaiChan || 'Chưa cập nhật'}</span>
              </div>
              <div className="bg-slate-50/50 px-4 py-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase">Kính bảo vệ</span>
                <span className="font-semibold text-slate-800">{plan.kinh || 'Chưa cập nhật'}</span>
              </div>
            </div>

            {plan.duongDanHoSo && (
              <div className="bg-slate-50/50 px-4 py-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase">Đường dẫn hồ sơ thiết kế</span>
                <a 
                  href={plan.duongDanHoSo}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-indigo-600 hover:underline break-all"
                >
                  {plan.duongDanHoSo}
                </a>
              </div>
            )}
          </div>

          {/* Section 3: Ánh sáng & Công nghệ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Ánh sáng */}
            <div className="space-y-2">
              <h4 className="font-bold text-indigo-900 border-b border-indigo-50/60 pb-1 uppercase tracking-wide text-[10px]">
                Giải pháp ánh sáng
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {plan.anhSang && plan.anhSang.length > 0 ? (
                  plan.anhSang.map((opt) => (
                    <span key={opt} className="px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[10px] border border-indigo-100/50">
                      {opt}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 font-medium italic">Không có cấu hình ánh sáng</span>
                )}
              </div>
            </div>

            {/* Công nghệ */}
            <div className="space-y-2">
              <h4 className="font-bold text-indigo-900 border-b border-indigo-50/60 pb-1 uppercase tracking-wide text-[10px]">
                Công nghệ tích hợp
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {plan.congNghe && plan.congNghe.length > 0 ? (
                  plan.congNghe.map((opt) => (
                    <span key={opt} className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] border border-slate-200/50">
                      {opt}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 font-medium italic">Không có cấu hình công nghệ</span>
                )}
              </div>
            </div>

          </div>

          {/* Section 4: Ghi chú */}
          {plan.ghiChu && (
            <div className="space-y-2">
              <h4 className="font-bold text-indigo-900 border-b border-indigo-50/60 pb-1 uppercase tracking-wide text-[10px]">
                Ghi chú thêm
              </h4>
              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 font-semibold text-slate-655 leading-relaxed">
                {plan.ghiChu}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/30">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-bold text-slate-655 hover:bg-slate-50 rounded-xl transition-all cursor-pointer bg-white border border-slate-200"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
