"use client";

import React from 'react';
import { IconGitBranch } from '@tabler/icons-react';

interface PhanBoTheoDuAnProps {
  selectedYear?: string;
}

export default function PhanBoTheoDuAn({
  selectedYear = '2026',
}: PhanBoTheoDuAnProps) {
  return (
    <div className="p-8 text-center bg-slate-50/50 rounded-xl border border-slate-200">
      <IconGitBranch size={32} className="mx-auto text-slate-400 mb-2" />
      <h4 className="text-sm font-semibold text-slate-700">
        Phân bổ NVL theo dự án — Năm {selectedYear}
      </h4>
      <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
        Báo cáo tổng hợp hạn mức và tỷ lệ phân bổ chi phí vật tư cho từng công trình, dự án trọng điểm.
      </p>
    </div>
  );
}
