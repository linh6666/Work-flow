"use client";

import React, { useState } from 'react';
import { IconChevronUp, IconChevronDown, IconX } from '@tabler/icons-react';
import { DuAnItem } from '../../../index';

interface PheDuyetBaoCaoTabProps {
  project: DuAnItem;
}

export default function PheDuyetBaoCaoTab({ project }: PheDuyetBaoCaoTabProps) {
  const [isSectionOpen, setIsSectionOpen] = useState(true);
  const [selectedDeptIndex, setSelectedDeptIndex] = useState(0);

  // Department filter list matching image reference exactly
  const deptPills = [
    { name: 'Ban Giám đốc', hours: '18h' },
    { name: 'Khối Văn phòng', hours: '48h' },
    { name: 'Khai triển', hours: '150.5h' },
    { name: 'Cắt', hours: '216h' },
    { name: 'Ghép', hours: '854.5h' },
    { name: 'Mộc Sơn', hours: '271h' },
    { name: 'Điện', hours: '253h' },
    { name: 'Cảnh Quan', hours: '796.1h' },
    { name: 'Công nghệ và Thiết kế', hours: '57h' }
  ];

  return (
    <div className="bg-[#f8fafc] space-y-5 text-slate-800 font-sans animate-fade-in">
      {isSectionOpen && (
        <div className="space-y-6">

          {/* 3 STAT CARDS: QUÁ HẠN, CHƯA BÁO CÁO, BC CŨ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Card 1: Quá hạn */}
            <div className="bg-[#fff5f5] border border-rose-200/90 rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center justify-center shadow-2xs">
              <span className="font-extrabold text-xs text-[#c93b2b]">
                Quá hạn
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#c93b2b] tracking-tight mt-1">
                24
              </span>
            </div>

            {/* Card 2: Chưa báo cáo */}
            <div className="bg-[#fffdf0] border border-amber-200/90 rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center justify-center shadow-2xs">
              <span className="font-extrabold text-xs text-[#b58900]">
                Chưa báo cáo
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#b58900] tracking-tight mt-1">
                7
              </span>
            </div>

            {/* Card 3: BC cũ (>2 ngày) */}
            <div className="bg-[#fffbf5] border border-orange-200/90 rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center justify-center shadow-2xs">
              <span className="font-extrabold text-xs text-[#d97706]">
                BC cũ (&gt;2 ngày)
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#d97706] tracking-tight mt-1">
                0
              </span>
            </div>
          </div>

      

        </div>
      )}

    </div>
  );
}
