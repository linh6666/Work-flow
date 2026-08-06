"use client";

import React, { useMemo } from 'react';
import { IconMessageDots } from '@tabler/icons-react';
import { ProjectItem } from '../../types';

interface NhanXetChuNhiemProps {
  projects: ProjectItem[];
  searchQuery: string;
  evaluationFilter: string;
}

export default function NhanXetChuNhiem({
  projects,
  searchQuery,
  evaluationFilter,
}: NhanXetChuNhiemProps) {
  // Filter projects with manager remarks
  const projectsWithRemarks = useMemo(() => {
    return projects.filter((p) => {
      const hasRemark = Boolean(p.latestRemark);
      if (!hasRemark) return false;
      const matchesQuery =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.latestRemark && p.latestRemark.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesEval =
        evaluationFilter === 'ALL' || p.evaluation === evaluationFilter;
      return matchesQuery && matchesEval;
    });
  }, [projects, searchQuery, evaluationFilter]);

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
    <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/90 rounded-xl shadow-2xs p-4 overflow-hidden">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2">
          <IconMessageDots size={18} className="text-indigo-600 shrink-0" />
          <h2 className="text-xs font-bold text-slate-900 tracking-tight">
            Nhận xét tuần gần nhất của Chủ nhiệm dự án
          </h2>
        </div>
        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          {projectsWithRemarks.length} nhận xét
        </span>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar divide-y divide-slate-100">
        {projectsWithRemarks.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            Không tìm thấy nhận xét nào phù hợp.
          </div>
        ) : (
          projectsWithRemarks.map((p) => (
            <div
              key={`remark-${p.id}`}
              className="py-4 first:pt-0 last:pb-0 hover:bg-slate-50/60 p-3 rounded-xl transition-colors space-y-2"
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

                <div className="flex-1 text-xs text-slate-700 leading-relaxed font-normal bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/60">
                  {p.latestRemark}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
