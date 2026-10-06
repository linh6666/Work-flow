"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconChevronDown } from '@tabler/icons-react';

interface TaoQuanLyDuAnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (data: any) => void;
}

const DEMO_PROJECT_OPTIONS = [
  'MODEL VIETTEL THANG LONG 1&2',
  'DỰ ÁN NHÓM NHÀ Ở ĐÔNG NAM',
  "DỰ ÁN L'EXQUISE HÀ NỘI",
  'TIỆN ÍCH TẦNG 1 DỰ ÁN HANOI PARKCENTRIC',
  'QUY HOẠCH TỈNH HƯNG YÊN',
  'THE HERITAGE TÂY NINH',
  'BÁO CÁO NGOÀI DỰ ÁN',
  'HERITAGE VILLAGE MOC CHAU',
  'VSIP LẠNG SƠN',
  '22 LIỄU GIAI',
  'PHÒNG HỌP MHV',
];

export default function TaoQuanLyDuAnModal({
  isOpen,
  onClose,
  onSubmitSuccess,
}: TaoQuanLyDuAnModalProps) {
  const [scope, setScope] = useState<string>('QL Dự án');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [projectContext, setProjectContext] = useState<string>('');
  const [reportTitle, setReportTitle] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setScope('QL Dự án');
      setSelectedProject('');
      setProjectContext('');
      setReportTitle('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      scope,
      selectedProject,
      projectContext,
      title: reportTitle || (selectedProject ? `Báo cáo - ${selectedProject}` : 'Báo cáo QL Dự án mới'),
      typeTag: 'Khối VP',
      status: 'Đang thực hiện',
      evaluation: 'Đúng tiến độ',
      progress: 10,
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200">
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden relative p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Khởi tạo báo cáo công việc KD
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg cursor-pointer"
            title="Đóng (Esc)"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Phạm vi báo cáo */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-800">
              Phạm vi báo cáo
            </label>
            <div className="relative">
              <select
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-white border-2 border-[#406c89] rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#406c89]/20 font-medium cursor-pointer appearance-none"
              >
                <option value="QL Dự án">QL Dự án</option>
                <option value="Theo tháng">Theo tháng</option>
                <option value="Theo hợp đồng">Theo hợp đồng</option>
                <option value="Theo báo giá">Theo báo giá</option>
                <option value="Tất cả">Tất cả</option>
              </select>
              <IconChevronDown
                size={18}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />
            </div>
          </div>

          {/* 2. Dự án * */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-800">
              Dự án <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                required
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50/70 border border-slate-200/90 rounded-xl text-slate-800 focus:outline-none focus:bg-white focus:border-[#406c89] transition-all font-normal cursor-pointer appearance-none"
              >
                <option value="" disabled>
                  — Chọn dự án —
                </option>
                {DEMO_PROJECT_OPTIONS.map((proj, idx) => (
                  <option key={idx} value={proj}>
                    {proj}
                  </option>
                ))}
              </select>
              <IconChevronDown
                size={18}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />
            </div>
          </div>

          {/* 3. Dự án / Mô hình (ngữ cảnh) */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-800">
              Dự án / Mô hình (ngữ cảnh)
            </label>
            <input
              type="text"
              value={projectContext}
              onChange={(e) => setProjectContext(e.target.value)}
              placeholder="VD: Dự án: VSIP LẠNG SƠN"
              className="w-full px-4 py-2.5 text-sm bg-slate-50/70 border border-slate-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#406c89] transition-all font-normal"
            />
          </div>

          {/* 4. Tiêu đề báo cáo */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-800">
              Tiêu đề báo cáo
            </label>
            <input
              type="text"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              placeholder="Tiêu đề tự sinh, có thể chỉnh sửa..."
              className="w-full px-4 py-2.5 text-sm bg-slate-50/70 border border-slate-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#406c89] transition-all font-normal"
            />
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 text-sm font-medium rounded-xl transition-colors cursor-pointer"
            >
              Hủy
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#406c89] hover:bg-[#32566d] text-white text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Đang khởi tạo...' : 'Khởi tạo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
