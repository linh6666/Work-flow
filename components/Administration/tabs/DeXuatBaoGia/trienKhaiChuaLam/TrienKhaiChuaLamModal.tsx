"use client";

import React from 'react';
import { IconX, IconArrowRight, IconUsers, IconFileText } from '@tabler/icons-react';
import { DeXuat } from '../index';

interface TrienKhaiChuaLamModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: DeXuat | null;
  onUpdateSteps?: (proposalId: string, steps: number) => void;
}

export default function TrienKhaiChuaLamModal({ isOpen, onClose, proposal, onUpdateSteps }: TrienKhaiChuaLamModalProps) {
  if (!isOpen || !proposal) return null;

  const handleStartStep1 = () => {
    if (onUpdateSteps) {
      onUpdateSteps(proposal.id, 1);
      alert("Đã lập Bảng Dự kiến Nhân sự thành công!");
    }
  };

  const handleStartStep2 = () => {
    if (onUpdateSteps) {
      onUpdateSteps(proposal.id, 2);
      alert("Đã lập Báo giá nháp thành công!");
    }
  };

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
              
              {/* STEP 1 CARD (Uncompleted / Chua Lam) */}
              <div className="flex-1 w-full bg-white rounded-2xl p-5 border border-[#fcd34d] shadow-sm space-y-4 flex flex-col justify-between min-h-[220px]">
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#fef3c7] text-[#b45309]">
                        1
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">Lập Bản Dự kiến Nhân sự</h4>
                    </div>
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
                    onClick={handleStartStep1}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#e29c1d] hover:bg-[#c58514] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer active:scale-95"
                  >
                    <IconUsers size={14} />
                    Lập bảng nhân sự
                  </button>
                </div>
              </div>

              {/* ARROW */}
              <div className="shrink-0 text-slate-400">
                <IconArrowRight size={22} className="rotate-90 md:rotate-0" />
              </div>

              {/* STEP 2 CARD (Uncompleted / Chua Lam) */}
              <div className="flex-1 w-full bg-white rounded-2xl p-5 border border-blue-200 shadow-sm space-y-4 flex flex-col justify-between min-h-[220px]">
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#dbeafe] text-[#2563eb]">
                        2
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">Lập Báo giá nháp</h4>
                    </div>
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
                    onClick={handleStartStep2}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-white text-xs font-semibold shadow-sm transition-all cursor-pointer active:scale-95 bg-[#4f46e5] hover:bg-[#3f37c9]"
                  >
                    <IconFileText size={14} />
                    Lập báo giá nháp
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
