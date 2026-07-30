"use client";

import React from 'react';
import { IconUsers } from '@tabler/icons-react';
import { DuAnItem } from '../../../index';

interface NhanSuCongViecTabProps {
  project: DuAnItem;
}

export default function NhanSuCongViecTab({ project }: NhanSuCongViecTabProps) {
  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center space-y-2 animate-fade-in">
      <IconUsers size={36} className="text-[#406c89] mx-auto" />
      <h4 className="font-bold text-sm text-slate-800">Nhân sự & Phân công Công việc</h4>
      <p className="text-xs text-slate-500">
        Danh sách nhân sự phụ trách các hạng mục công việc trong dự án <strong className="font-mono text-slate-700">{project.maDuAn}</strong>.
      </p>
    </div>
  );
}
