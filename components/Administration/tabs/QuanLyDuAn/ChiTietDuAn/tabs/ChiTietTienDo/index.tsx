"use client";

import React from 'react';
import {
  IconClipboardList,
  IconGridDots,
  IconCheck,
  IconDownload,
  IconCopy,
  IconChevronDown
} from '@tabler/icons-react';
import { DuAnItem } from '../../../index';

interface ChiTietTienDoTabProps {
  project: DuAnItem;
  onOpenLuuTemplate: () => void;
}

export default function ChiTietTienDoTab({ project, onOpenLuuTemplate }: ChiTietTienDoTabProps) {
  // Department report list matching user reference image exactly
  const departments = [
    { name: 'Ban Giám đốc', statusText: 'Hoàn thành · 17 báo cáo · Tạo bởi: Thảo Phùng' },
    { name: 'Khối Văn phòng', statusText: 'Đang triển khai · 40 báo cáo · Tạo bởi: Thảo Phùng' },
    { name: 'Phòng Khai triển', statusText: 'Hoàn thành · 29 báo cáo · Tạo bởi: Trần Diễm My' },
    { name: 'Phòng Cắt', statusText: 'Hoàn thành · 39 báo cáo · Tạo bởi: Trần Diễm My' },
    { name: 'Phòng Ghép', statusText: 'Hoàn thành · 94 báo cáo · Tạo bởi: Trần Diễm My' },
    { name: 'Phòng Mộc Sơn', statusText: 'Đang triển khai · 70 báo cáo · Tạo bởi: Trần Diễm My' },
    { name: 'Phòng Điện', statusText: 'Hoàn thành · 77 báo cáo · Tạo bởi: Trần Diễm My' },
    { name: 'Phòng Cảnh Quan', statusText: 'Hoàn thành · 243 báo cáo · Tạo bởi: Trần Diễm My' },
    { name: 'Phòng Công nghệ và Thiết kế', statusText: 'Đang triển khai · 11 báo cáo · Tạo bởi: Thảo Phùng' },
  ];

  return (
    <div className="space-y-3.5 animate-fade-in max-h-[600px] overflow-y-auto pr-2 pb-8">
      {/* Banner Notification Note */}
      <div className="bg-[#406c89]/10 border border-[#406c89]/20 rounded-xl p-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <IconClipboardList size={16} className="text-[#406c89] shrink-0" />
          <span className="text-xs text-[#406c89] font-medium leading-relaxed">
            Bộ hồ sơ quản lý dự án theo phòng ban. Phòng Khai triển khởi tạo trước, sau đó các phòng khác lần lượt theo quy trình.
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenLuuTemplate}
          className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all shrink-0 ml-auto"
        >
          <IconGridDots size={14} className="text-slate-500" />
          <span>Lưu Template</span>
        </button>
      </div>

      {/* List of 9 Department Cards */}
      <div className="space-y-2.5">
        {departments.map((dept, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl p-3.5 flex items-center justify-between gap-3 transition-all shadow-2xs"
          >
            {/* Left Side: Checkmark & Title */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border border-emerald-500 bg-emerald-50/70 text-emerald-600 flex items-center justify-center shrink-0">
                <IconCheck size={14} stroke={3} />
              </div>

              <div>
                <h4 className="font-bold text-xs text-slate-900">{dept.name}</h4>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">{dept.statusText}</p>
              </div>
            </div>

            {/* Right Side: Action Icons */}
            <div className="flex items-center gap-1 text-slate-400">
              <button
                type="button"
                className="p-1 rounded hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Ma trận"
              >
                <IconGridDots size={16} />
              </button>
              <button
                type="button"
                className="p-1 rounded hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Tải xuống"
              >
                <IconDownload size={16} />
              </button>
              <button
                type="button"
                className="p-1 rounded hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Sao chép"
              >
                <IconCopy size={16} />
              </button>
              <button
                type="button"
                className="p-1 rounded hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Chi tiết"
              >
                <IconChevronDown size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
