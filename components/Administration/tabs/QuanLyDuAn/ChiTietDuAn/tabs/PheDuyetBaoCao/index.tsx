"use client";

import React from 'react';
import { IconChartBar } from '@tabler/icons-react';
import { DuAnItem } from '../../../index';

interface PheDuyetBaoCaoTabProps {
  project: DuAnItem;
}

export default function PheDuyetBaoCaoTab({ project }: PheDuyetBaoCaoTabProps) {
  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center space-y-2 animate-fade-in">
      <IconChartBar size={36} className="text-[#406c89] mx-auto" />
      <h4 className="font-bold text-sm text-slate-800">Phê duyệt Báo cáo</h4>
      <p className="text-xs text-slate-500">
        Danh sách các phiếu báo cáo chờ duyệt từ Trưởng phòng và Ban Giám đốc.
      </p>
    </div>
  );
}
