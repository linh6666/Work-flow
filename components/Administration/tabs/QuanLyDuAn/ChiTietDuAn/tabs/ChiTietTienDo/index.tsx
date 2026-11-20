"use client";

import React, { useState } from 'react';
import {
  IconClipboardList,
  IconGridDots,
  IconCheck,
  IconDownload,
  IconCopy,
  IconChevronDown,
  IconLoader2
} from '@tabler/icons-react';
import { DuAnItem } from '../../../index';
import ChiTietBaoCaoPhongBan, { DepartmentItem } from '../../../ChiTietBaoCaoPhongBan';

interface ChiTietTienDoTabProps {
  project: DuAnItem;
  departments?: DepartmentItem[];
  loading?: boolean;
  onOpenLuuTemplate: () => void;
  onSelectDepartment?: (dept: DepartmentItem) => void;
}

export default function ChiTietTienDoTab({
  project,
  departments = [],
  loading = false,
  onOpenLuuTemplate,
  onSelectDepartment,
}: ChiTietTienDoTabProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentItem | null>(null);

  const handleSelectDept = (dept: DepartmentItem) => {
    if (onSelectDepartment) {
      onSelectDepartment(dept);
    } else {
      setSelectedDepartment(dept);
    }
  };

  // If a department is selected internally, render the detailed department report page
  if (selectedDepartment) {
    return (
      <ChiTietBaoCaoPhongBan
        department={selectedDepartment}
        projectCode={project.maDuAn}
        projectName={project.tenDuAn}
        onBack={() => setSelectedDepartment(null)}
      />
    );
  }

  return (
    <div className="space-y-3.5 animate-fade-in max-h-[600px] overflow-y-auto no-scrollbar pr-2 pb-8">
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

      {/* List of Department Cards */}
      {loading && departments.length === 0 ? (
        <div className="bg-white border border-slate-200/90 rounded-xl p-10 flex flex-col items-center justify-center text-center">
          <IconLoader2 size={32} className="text-[#406c89] animate-spin mb-2" />
          <p className="text-xs text-slate-500 font-medium">Đang tải danh sách phòng ban...</p>
        </div>
      ) : departments.length === 0 ? (
        <div className="bg-white border border-slate-200/90 rounded-xl p-10 flex flex-col items-center justify-center text-center">
          <IconClipboardList size={36} className="text-slate-300 stroke-[1.25] mb-2" />
          <p className="text-xs text-slate-400 font-medium">Dự án này chưa có phòng ban nào khởi tạo hồ sơ.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {departments.map((dept, index) => (
            <div
              key={index}
              onClick={() => handleSelectDept(dept)}
              className="bg-white border border-slate-200/90 hover:border-[#406c89]/60 hover:shadow-md rounded-xl p-3.5 flex items-center justify-between gap-3 transition-all cursor-pointer group"
            >
              {/* Left Side: Checkmark & Title */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border border-emerald-500 bg-emerald-50/70 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <IconCheck size={14} stroke={3} />
                </div>

                <div>
                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-[#406c89] transition-colors">{dept.name}</h4>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">{dept.statusText}</p>
                </div>
              </div>

              {/* Right Side: Action Icons */}
              <div className="flex items-center gap-1 text-slate-400">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectDept(dept);
                  }}
                  className="p-1.5 rounded-lg hover:text-[#406c89] hover:bg-[#406c89]/10 transition-colors cursor-pointer"
                  title="Ma trận"
                >
                  <IconGridDots size={16} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectDept(dept);
                  }}
                  className="p-1.5 rounded-lg hover:text-[#406c89] hover:bg-[#406c89]/10 transition-colors cursor-pointer"
                  title="Tải xuống"
                >
                  <IconDownload size={16} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectDept(dept);
                  }}
                  className="p-1.5 rounded-lg hover:text-[#406c89] hover:bg-[#406c89]/10 transition-colors cursor-pointer"
                  title="Sao chép"
                >
                  <IconCopy size={16} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectDept(dept);
                  }}
                  className="p-1.5 rounded-lg hover:text-[#406c89] hover:bg-[#406c89]/10 transition-colors cursor-pointer"
                  title="Chi tiết"
                >
                  <IconChevronDown size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


