"use client";

import React from 'react';
import { IconX, IconArrowRight, IconUsers, IconFileText } from '@tabler/icons-react';
import { DeXuat } from '../index';

interface TrienKhaiHoanTatModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: DeXuat | null;
}

export default function TrienKhaiHoanTatModal({ isOpen, onClose, proposal }: TrienKhaiHoanTatModalProps) {
  if (!isOpen || !proposal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 transition-all">
      <div 
        className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-800">Thông tin triển khai đề xuất - {proposal.soDX}</h3>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto no-scrollbar">
          
          {/* Mint Green Container Wrapper */}
          <div className="p-6 md:p-8 rounded-2xl border border-[#dcfae6] bg-[#f4fbf7] space-y-6">
            
            {/* Title Line */}
            <div className="flex items-center gap-1.5 text-[#047857] font-bold text-sm uppercase tracking-wide">
              <span>✓ ĐỀ XUẤT ĐÃ ĐƯỢC PHÊ DUYỆT — TRIỂN KHAI TIẾP THEO</span>
            </div>

            {/* Steps Row */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-5">
              
              {/* STEP 1 CARD (Completed) */}
              <div className="flex-1 w-full bg-white rounded-2xl p-5 border border-[#10b981] shadow-sm space-y-4 flex flex-col justify-between min-h-[220px]">
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-emerald-100 text-emerald-800">
                        1
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">Lập Bản Dự kiến Nhân sự</h4>
                    </div>
                    <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                      ✓ Đã lập
                    </span>
                  </div>

                  {/* Card Description */}
                  <p className="text-[12px] text-slate-500 leading-relaxed">
                    Tạo bảng dự kiến nhân sự → hệ thống gửi tới các phòng ban → trưởng phòng điền thông tin nhân viên, số ngày, đơn giá → tổng hợp chi phí nhân công.
                  </p>
                </div>

                {/* Card Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => alert("Đang mở bảng dự kiến nhân sự...")}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg border border-emerald-500 bg-white text-xs font-semibold text-emerald-600 hover:bg-emerald-50/50 transition-all cursor-pointer"
                  >
                    <IconUsers size={14} />
                    Xem bảng nhân sự
                  </button>
                </div>
              </div>

              {/* ARROW */}
              <div className="shrink-0 text-slate-400">
                <IconArrowRight size={22} className="rotate-90 md:rotate-0" />
              </div>

              {/* STEP 2 CARD (Completed) */}
              <div className="flex-1 w-full bg-white rounded-2xl p-5 border border-[#10b981] shadow-sm space-y-4 flex flex-col justify-between min-h-[220px]">
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-emerald-100 text-emerald-800">
                        2
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">Lập Báo giá nháp</h4>
                    </div>
                    <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                      ✓ Đã lập
                    </span>
                  </div>

                  {/* Card Description */}
                  <p className="text-[12px] text-slate-500 leading-relaxed">
                    Tạo báo giá nháp để tính toán thử, chuẩn bị các hạng mục và con số trước khi gửi chính thức cho khách hàng.
                  </p>
                </div>

                {/* Card Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => alert("Đang mở báo giá nháp...")}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg border border-emerald-500 bg-white text-xs font-semibold text-emerald-600 hover:bg-emerald-50/50 transition-all cursor-pointer"
                  >
                    <IconFileText size={14} />
                    Xem báo giá
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Sticky Footer */}
        <div className="px-6 py-4 flex items-center justify-end border-t border-slate-100 bg-[#f8fafc] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer transition-all active:scale-95 bg-white"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
