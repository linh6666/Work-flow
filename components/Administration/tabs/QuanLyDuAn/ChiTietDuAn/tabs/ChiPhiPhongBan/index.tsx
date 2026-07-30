"use client";

import React from 'react';
import { IconCoin } from '@tabler/icons-react';
import { DuAnItem } from '../../../index';

interface ChiPhiPhongBanTabProps {
  project: DuAnItem;
}

export default function ChiPhiPhongBanTab({ project }: ChiPhiPhongBanTabProps) {
  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center space-y-2 animate-fade-in">
      <IconCoin size={36} className="text-[#406c89] mx-auto" />
      <h4 className="font-bold text-sm text-slate-800">Chi phí theo Phòng ban</h4>
      <p className="text-xs text-slate-500">
        Bảng phân bổ ngân sách và chi phí thực tế phát sinh của các phòng ban.
      </p>
    </div>
  );
}
