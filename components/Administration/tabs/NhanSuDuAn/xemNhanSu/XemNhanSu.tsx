"use client";

import React from 'react';
import { 
  IconArrowLeft, 
  IconPencil, 
  IconCircleCheck, 
  IconFolderFilled 
} from '@tabler/icons-react';

interface NhanSuData {
  id: string;
  duAn: string;
  maKH: string;
  khachHang: string;
  nvLap: string;
  ngayLap: string;
  trangThai: 'dang-dien' | 'da-tong-hop';
  lienKetDeXuat?: string;
  tyLeMoHinh?: string;
  kichThuocDuKien?: string;
  diaDiemLapDat?: string;
  duongDanHoSo?: string;
  loaiChan?: string;
  kinh?: string;
  anhSang?: string[];
  congNghe?: string[];
  ghiChu?: string;
}

interface XemNhanSuProps {
  plan: NhanSuData;
  onClose: () => void;
  onEdit: () => void;
}

const DEPARTMENTS = [
  'Khai triển',
  'Cắt',
  'Ghép',
  'Mộc Sơn',
  'Điện',
  'Cảnh Quan',
  'Công nghệ và Thiết kế',
  'Lắp đặt'
];

export default function XemNhanSu({ plan, onClose, onEdit }: XemNhanSuProps) {
  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-200 text-xs">
      
      {/* ── HEADER REGION ── */}
      <div className="px-8 pt-6 pb-5 flex flex-col md:flex-row md:items-start justify-between gap-5 shrink-0 border-b border-slate-50/50">
        
        {/* Left column: Back Button + Meta info */}
        <div className="flex items-start gap-3 flex-1">
          
          {/* Back button */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-slate-200 bg-white transition-all cursor-pointer shadow-3xs active:scale-95 flex items-center justify-center shrink-0"
          >
            <IconArrowLeft size={16} />
          </button>

          {/* Titles & Meta */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight leading-tight">
                {plan.duAn}
              </h2>
              {plan.trangThai === 'dang-dien' ? (
                <span className="inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-full text-amber-700 bg-amber-50 border border-amber-100">
                  Đang điền
                </span>
              ) : (
                <span className="inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-full text-emerald-700 bg-emerald-50 border border-emerald-100">
                  Đã tổng hợp
                </span>
              )}
            </div>

            {/* Subtitle description with hyphens to match mockup */}
            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
              {plan.maKH || 'DKNS-004-2026'} - KH: {plan.khachHang || 'N/A'} - Lập: {plan.nvLap} - {plan.ngayLap}
            </p>

            {/* Note info italic and gray */}
            <p className="text-[10px] text-slate-400 italic font-medium">
              Ghi chú: {plan.ghiChu || `Tự động tạo khi PGĐ phê duyệt Đề xuất ${plan.lienKetDeXuat || 'ĐXBG-002-2026'}`}
            </p>

            {/* Folder Link */}
            <div className="pt-1">
              <a 
                href={plan.duongDanHoSo || '#'} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-indigo-700 font-bold hover:underline text-xs"
              >
                <IconFolderFilled size={15} className="text-amber-400" />
                <span className="underline">Hồ sơ dự án</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right column: Action buttons styled exactly like mockup */}
        <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all cursor-pointer active:scale-95 shadow-3xs"
          >
            <IconPencil size={15} className="text-slate-500" />
            Chỉnh sửa thông tin
          </button>
          
          <button
            type="button"
            onClick={() => alert('Đang tổng hợp kế hoạch nhân sự ngay...')}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-600 bg-white hover:bg-emerald-50/50 border border-emerald-500 rounded-xl shadow-3xs transition-all active:scale-95 cursor-pointer"
          >
            <IconCircleCheck size={16} className="text-emerald-500" />
            Tổng hợp ngay
          </button>
        </div>

      </div>

      {/* ── CONTENT BODY (Stretches full width without max-width constraint) ── */}
      <div className="flex-1 overflow-y-auto px-8 py-5 space-y-5 no-scrollbar bg-slate-50/10">
        
        {/* Specs horizontal card */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-3.5 shadow-3xs">
          
          {/* Specs grid matching exact col columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-6 text-[11px] text-slate-450">
            <div>
              Tỷ lệ: <strong className="text-slate-800 font-extrabold">{plan.tyLeMoHinh || '1/500'}</strong>
            </div>
            <div>
              Kích thước: <strong className="text-slate-800 font-extrabold">{plan.kichThuocDuKien || '3000×4000mm'}</strong>
            </div>
            <div>
              Địa điểm lắp: <strong className="text-slate-800 font-extrabold">{plan.diaDiemLapDat || 'Đông Anh, Hà Nội'}</strong>
            </div>
            <div>
              Loại chân: <strong className="text-slate-800 font-extrabold">{plan.loaiChan || 'Chân mô hình vát'}</strong>
            </div>
            <div>
              Kính: <strong className="text-slate-800 font-extrabold">{plan.kinh || 'Lồng kính'}</strong>
            </div>
          </div>

          {/* Badges - Lights */}
          <div className="flex items-center gap-2 pt-1 flex-wrap text-[11px]">
            <span className="text-slate-450 font-semibold">Ánh sáng:</span>
            <div className="flex flex-wrap gap-2">
              {plan.anhSang && plan.anhSang.length > 0 ? (
                plan.anhSang.map((opt) => (
                  <span 
                    key={opt} 
                    className="px-3 py-1 rounded-full bg-[#fef9c3] text-[#854d0e] font-extrabold text-[10px]"
                  >
                    {opt}
                  </span>
                ))
              ) : (
                <span className="text-slate-400 italic text-[10px]">Chưa cấu hình</span>
              )}
            </div>
          </div>

          {/* Badges - Technology */}
          <div className="flex items-center gap-2 flex-wrap text-[11px]">
            <span className="text-slate-450 font-semibold">Công nghệ:</span>
            <div className="flex flex-wrap gap-2">
              {plan.congNghe && plan.congNghe.length > 0 ? (
                plan.congNghe.map((opt) => (
                  <span 
                    key={opt} 
                    className="px-3 py-1 rounded-full bg-[#f3e8ff] text-[#6b21a8] font-extrabold text-[10px]"
                  >
                    {opt}
                  </span>
                ))
              ) : (
                <span className="text-slate-400 italic text-[10px]">Chưa cấu hình</span>
              )}
            </div>
          </div>

        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-4 shadow-3xs">
          
          {/* Header of Progress */}
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Tiến độ điền thông tin
            </h3>
            <span className="text-xs text-slate-400 font-bold">
              0/{DEPARTMENTS.length} phòng đã điền
            </span>
          </div>

          {/* Department status pills list */}
          <div className="flex flex-wrap gap-2.5">
            {DEPARTMENTS.map((dept) => (
              <span 
                key={dept} 
                className="px-3 py-1.5 rounded-full text-slate-500 bg-slate-50 border border-slate-100 font-bold text-[10px] tracking-wide"
              >
                {dept}
              </span>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
