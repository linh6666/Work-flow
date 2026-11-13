"use client";

import React, { useState, useMemo } from 'react';
import {
  IconMessageDots,
  IconPhoto,
  IconCalendar,
  IconFolderDown,
  IconEye,
} from '@tabler/icons-react';
import { ProjectItem } from '../../types';

interface HinhAnhBaoCaoProps {
  projects: ProjectItem[];
  searchQuery?: string;
  evaluationFilter?: string;
}

// Sample photo data for projects to enrich the photo reports gallery
const SAMPLE_PHOTOS = [
  { id: 'p1', title: 'Lắp ráp mô hình khung thép', date: '06/11/2026', author: 'Trần Diễm My', bg: 'from-blue-600/80 to-indigo-800/80' },
  { id: 'p2', title: 'Cắt phôi Laser CNC chi tiết', date: '05/11/2026', author: 'Trần Văn Mạnh', bg: 'from-emerald-600/80 to-teal-800/80' },
  { id: 'p3', title: 'Hoàn thiện bề mặt sơn kiến trúc', date: '04/11/2026', author: 'Phạm Đức Huy', bg: 'from-amber-600/80 to-orange-800/80' },
  { id: 'p4', title: 'Kiểm tra hệ thống đèn LED điện tử', date: '03/11/2026', author: 'Vũ Minh Tuấn', bg: 'from-violet-600/80 to-purple-800/80' },
];

export default function HinhAnhBaoCao({
  projects,
  searchQuery = '',
  evaluationFilter = 'ALL',
}: HinhAnhBaoCaoProps) {
  // Filter states
  const [selectedProject, setSelectedProject] = useState<string>('ALL');
  const [selectedStaff, setSelectedStaff] = useState<string>('ALL');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [groupBy, setGroupBy] = useState<string>('date');

  // Filter projects with manager remarks
  const projectsWithRemarks = useMemo(() => {
    return projects.filter((p) => {
      const hasRemark = Boolean(p.latestRemark);
      if (!hasRemark) return false;

      const matchesProject =
        selectedProject === 'ALL' || p.id === selectedProject;

      const matchesQuery =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.latestRemark && p.latestRemark.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesEval =
        evaluationFilter === 'ALL' || p.evaluation === evaluationFilter;

      return matchesProject && matchesQuery && matchesEval;
    });
  }, [projects, selectedProject, searchQuery, evaluationFilter]);

  const handleExportPhotos = () => {
    alert('Đang xuất toàn bộ 975 tệp ảnh báo cáo công việc (định dạng .ZIP)!');
  };

  const getEvaluationBadgeStyle = (evalType: ProjectItem['evaluation']) => {
    switch (evalType) {
      case 'Đúng tiến độ':
        return 'bg-[#4da052] text-white font-bold border-[#438f47]';
      case 'Vượt tiến độ':
        return 'bg-[#1b5e20] text-white font-bold border-[#144718]';
      case 'Chưa đánh giá':
        return 'bg-white text-slate-500 font-semibold border-slate-300 hover:bg-slate-50';
      case 'Chậm tiến độ':
        return 'bg-rose-600 text-white font-bold border-rose-700';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-2.5 text-left font-sans select-none overflow-hidden">
      
      {/* ── 1. THANH BỘ LỌC ẢNH BÁO CÁO CÔNG VIỆC (CÙNG 1 HÀNG - ĐÃ ẨN VIỀN/BOX BAO QUANH) ── */}
      <div className="shrink-0 py-1 px-0.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Title & Stats */}
          <div className="flex items-center gap-2 shrink-0">
            <IconPhoto size={18} className="text-[#4338ca] shrink-0" stroke={2} />
            <h2 className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight whitespace-nowrap">
              Ảnh báo cáo công việc
            </h2>
            <span className="text-xs text-slate-400 font-normal whitespace-nowrap ml-1">
              975 ảnh · 15 ngày báo cáo
            </span>
          </div>

          {/* Right: All Filter Controls & Action Buttons on the SAME 1 LINE */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* 1. Tất cả dự án */}
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer shadow-2xs"
            >
              <option value="ALL">Tất cả dự án</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name.includes('—') ? p.name.split('—')[1].trim() : p.name}
                </option>
              ))}
            </select>

            {/* 2. Tất cả nhân sự */}
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer shadow-2xs"
            >
              <option value="ALL">Tất cả nhân sự</option>
              <option value="1">Trần Diễm My</option>
              <option value="2">Nguyễn Phú Quang</option>
              <option value="3">Trần Văn Mạnh</option>
              <option value="4">Lê Hoàng Anh</option>
              <option value="5">Phạm Đức Huy</option>
              <option value="6">Vũ Minh Tuấn</option>
              <option value="7">Đỗ Thùy Linh</option>
            </select>

            {/* 3. Date Picker: mm/dd/yyyy -> mm/dd/yyyy */}
            <div className="flex items-center gap-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-28 bg-white border border-slate-200 text-slate-700 text-xs rounded-md pl-2 pr-6 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-2xs placeholder:text-slate-400"
                />
                <IconCalendar
                  size={14}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                />
              </div>

              <span className="text-slate-400 text-xs font-semibold px-0.5">→</span>

              <div className="relative">
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-28 bg-white border border-slate-200 text-slate-700 text-xs rounded-md pl-2 pr-6 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-2xs placeholder:text-slate-400"
                />
                <IconCalendar
                  size={14}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                />
              </div>
            </div>

            {/* 4. Theo ngày báo cáo */}
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer shadow-2xs"
            >
              <option value="date">Theo ngày báo cáo</option>
              <option value="project">Theo dự án</option>
              <option value="staff">Theo nhân sự</option>
            </select>

            {/* 5. Nút Xuất ảnh */}
            <button
              type="button"
              onClick={handleExportPhotos}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#406c89] hover:bg-[#345972] text-white rounded-md text-xs font-semibold shadow-2xs transition-colors cursor-pointer select-none whitespace-nowrap"
            >
              <IconFolderDown size={14} stroke={2} />
              <span>Xuất ảnh</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. BOX NỘI DUNG DANH SÁCH BÁO CÁO & ẢNH HIỆN TRƯỜNG ── */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/90 rounded-xl shadow-2xs p-4 overflow-hidden">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <IconMessageDots size={18} className="text-indigo-600 shrink-0" />
            <h3 className="text-xs font-bold text-slate-900 tracking-tight">
              Nhận xét tuần gần nhất & Hình ảnh hiện trường của Chủ nhiệm dự án
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            {projectsWithRemarks.length} dự án có báo cáo
          </span>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar divide-y divide-slate-100">
          {projectsWithRemarks.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs font-medium">
              Không tìm thấy báo cáo hoặc hình ảnh nào phù hợp với bộ lọc.
            </div>
          ) : (
            projectsWithRemarks.map((p) => (
              <div
                key={`remark-${p.id}`}
                className="py-4 first:pt-0 last:pb-0 hover:bg-slate-50/60 p-3 rounded-xl transition-colors space-y-3"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-3">
                  <div className="w-full md:w-64 shrink-0 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs uppercase leading-snug tracking-tight">
                        {p.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {p.weekReport && (
                        <span className="text-[11px] font-medium text-slate-400">
                          {p.weekReport}
                        </span>
                      )}
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] ${getEvaluationBadgeStyle(
                          p.evaluation
                        )}`}
                      >
                        {p.evaluation}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-2.5">
                    <div className="text-xs text-slate-700 leading-relaxed font-normal bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/60">
                      {p.latestRemark}
                    </div>

                    {/* Photo Thumbnails Gallery for each project */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      {SAMPLE_PHOTOS.map((photo) => (
                        <div
                          key={`${p.id}-${photo.id}`}
                          className="group relative rounded-lg border border-slate-200 overflow-hidden bg-slate-100 aspect-video flex flex-col justify-end p-2 cursor-pointer shadow-2xs hover:shadow-xs transition-all"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${photo.bg} opacity-85 group-hover:opacity-95 transition-opacity flex items-center justify-center text-white`}>
                            <IconPhoto size={24} className="opacity-80 group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="relative z-10 text-white">
                            <p className="text-[10px] font-bold truncate leading-tight drop-shadow-xs">
                              {photo.title}
                            </p>
                            <p className="text-[9px] text-white/80 truncate drop-shadow-xs">
                              {photo.author} · {photo.date}
                            </p>
                          </div>
                          <div className="absolute top-1.5 right-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 p-1 rounded-md text-white">
                            <IconEye size={12} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
