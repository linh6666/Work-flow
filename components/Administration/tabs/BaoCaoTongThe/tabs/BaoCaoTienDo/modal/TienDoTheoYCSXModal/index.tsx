"use client";

import React, { useMemo } from 'react';
import {
  IconX,
  IconFlag,
  IconPrinter,
} from '@tabler/icons-react';
import { ProjectItem, YcsxProgressData } from '../../types';

interface TienDoTheoYCSXModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectItem | null;
}

export default function TienDoTheoYCSXModal({
  isOpen,
  onClose,
  project,
}: TienDoTheoYCSXModalProps) {
  if (!isOpen || !project) return null;

  // Extract display name matching user conventions
  const displayName = project.name.includes('—')
    ? project.name.split('—').slice(1).join('—').trim()
    : project.name;

  const customerName =
    project.customer ||
    (project.subName && project.subName !== '-'
      ? project.subName
      : 'CÔNG TY CỔ PHẦN ĐẦU TƯ & XÂY DỰNG');

  // Resolve YCSX data: uses project's custom ycsxData if provided,
  // or fallback matching the user's uploaded screenshot exactly
  const ycsxInfo: YcsxProgressData = useMemo(() => {
    if (project.ycsxData) {
      return project.ycsxData;
    }

    const maYcsx = project.name.includes('—')
      ? `${project.name.split('—')[0].trim().split('/')[0]}-2026/YCSX-MHV`
      : '85-2026/YCSX-MHV';

    return {
      title: 'Tiến độ theo YCSX (Nghiệm thu Cuối)',
      conCv: 149,
      tongCv: 370,
      soNgay: 25,
      hanNgay: '07/12/2026',
      maYcsx: maYcsx,
      ghiChu: `Chỉ tính công việc của các phòng ban kỹ thuật (không tính Khối Văn phòng). Hạn lấy theo YCSX ${maYcsx}.`,
      departments: [
        { id: '1', name: 'Phòng Ghép', conCv: 48, tongCv: 87 },
        { id: '2', name: 'Phòng Cảnh Quan', conCv: 28, tongCv: 72 },
        { id: '3', name: 'Phòng Mộc Sơn', conCv: 24, tongCv: 47 },
        { id: '4', name: 'Phòng Điện', conCv: 23, tongCv: 63 },
        { id: '5', name: 'Phòng Khai triển', conCv: 16, tongCv: 72 },
        { id: '6', name: 'Phòng Cắt', conCv: 8, tongCv: 26 },
        { id: '7', name: 'Phòng Công nghệ và Thiết kế', conCv: 2, tongCv: 3 },
      ],
    };
  }, [project]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150 select-none"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-3xl overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── MODAL HEADER ── */}
        <div className="px-6 pt-5 pb-3 border-b border-slate-100 flex items-start justify-between gap-4 shrink-0 bg-white">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-800">
              <IconFlag size={18} className="text-blue-600 shrink-0" stroke={1.8} />
              <h2 className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight">
                {ycsxInfo.title || 'Tiến độ theo YCSX (Nghiệm thu Cuối)'}
              </h2>
            </div>

            <div className="space-y-0.5 pl-6">
              <h3 className="text-xs sm:text-[13px] font-black text-slate-900 uppercase tracking-tight leading-snug">
                {displayName}
              </h3>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                <span>{customerName}</span>
                <span>•</span>
                <span className="text-blue-600 font-bold">{ycsxInfo.maYcsx}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200/90 hover:border-slate-300 rounded-md shadow-2xs text-xs font-semibold transition-all cursor-pointer select-none"
              title="In / Xuất Excel"
            >
              <IconPrinter size={15} className="text-slate-800 shrink-0" stroke={1.8} />
              <span>In / Excel</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              title="Đóng"
            >
              <IconX size={18} />
            </button>
          </div>
        </div>

        {/* ── MODAL BODY: EXACT VIEW FROM SCREENSHOT ── */}
        <div className="p-6 text-xs bg-white space-y-3">
          {/* Title Line with Flag Icon */}
          <div className="flex items-center gap-2 text-slate-900">
            <IconFlag size={18} className="text-slate-600 shrink-0" stroke={1.8} />
            <h3 className="font-bold text-slate-900 text-sm tracking-tight">
              {ycsxInfo.title || 'Tiến độ theo YCSX (Nghiệm thu Cuối)'}
            </h3>
          </div>

          {/* Subtitle with remaining tasks & countdown days */}
          <p className="text-xs sm:text-[13px] font-medium text-slate-800 leading-snug">
            Còn <strong className="text-slate-900 font-bold">{ycsxInfo.conCv}/{ycsxInfo.tongCv}</strong> công việc kỹ thuật, còn <strong className="text-amber-700 font-bold">{ycsxInfo.soNgay} ngày</strong> đến hạn <span className="font-bold text-slate-900">{ycsxInfo.hanNgay}</span>
          </p>

          {/* Department Pills in Red/Pink matching screenshot */}
          <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
            {ycsxInfo.departments.map((dept) => (
              <span
                key={dept.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-[#be123c] bg-[#fff1f2] border border-[#fecdd3] shadow-2xs hover:bg-rose-100/60 transition-colors select-none"
              >
                {dept.name}: còn {dept.conCv}/{dept.tongCv} CV
              </span>
            ))}
          </div>

          {/* Footnote text */}
          <p className="text-[11px] text-slate-500 font-normal leading-relaxed pt-1">
            {ycsxInfo.ghiChu || `Chỉ tính công việc của các phòng ban kỹ thuật (không tính Khối Văn phòng). Hạn lấy theo YCSX ${ycsxInfo.maYcsx}.`}
          </p>
        </div>

        {/* ── MODAL FOOTER ── */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/60 flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-md shadow-2xs transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
