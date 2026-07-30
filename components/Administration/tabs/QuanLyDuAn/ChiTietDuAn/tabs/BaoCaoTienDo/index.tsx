"use client";

import React from 'react';
import { IconTrendingUp } from '@tabler/icons-react';
import { DuAnItem } from '../../../index';

interface BaoCaoTienDoTabProps {
  project: DuAnItem;
}

export default function BaoCaoTienDoTab({ project }: BaoCaoTienDoTabProps) {
  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center space-y-2 animate-fade-in">
      <IconTrendingUp size={36} className="text-[#406c89] mx-auto" />
      <h4 className="font-bold text-sm text-slate-800">Báo cáo Tiến độ thực hiện</h4>
      <p className="text-xs text-slate-500">
        Thống kê chỉ số tiến độ từng giai đoạn dự án <strong className="font-mono text-slate-700">{project.maDuAn}</strong>.
      </p>
    </div>
  );
}
