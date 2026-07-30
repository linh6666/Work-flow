"use client";

import React from 'react';
import { IconFlag } from '@tabler/icons-react';
import { DuAnItem } from '../../../index';

interface NghiemThuTabProps {
  project: DuAnItem;
}

export default function NghiemThuTab({ project }: NghiemThuTabProps) {
  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center space-y-2 animate-fade-in">
      <IconFlag size={36} className="text-[#406c89] mx-auto" />
      <h4 className="font-bold text-sm text-slate-800">Nghiệm thu 80% / 100%</h4>
      <p className="text-xs text-slate-500">
        Hồ sơ biên bản nghiệm thu giai đoạn 80% và nghiệm thu bàn giao 100%.
      </p>
    </div>
  );
}
