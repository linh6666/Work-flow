"use client";

import React, { useState, useMemo } from 'react';
import {
  IconBuilding,
  IconCircleCheck,
  IconClock,
  IconClockPlay,
  IconAlertTriangle,
  IconFileText,
  IconSearch,
  IconFilter,
  IconMessageDots,
  IconTable,
  IconX,
} from '@tabler/icons-react';

import { ProjectItem } from './types';
import { INITIAL_PROJECTS } from './data';
import TongHopTienDo from './tabs/TongHopTienDo';
import NhanXetChuNhiem from './tabs/NhanXetChuNhiem';

export default function BaoCaoTienDo() {
  const [projects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [subTab, setSubTab] = useState<'table' | 'remarks'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [evaluationFilter, setEvaluationFilter] = useState<string>('ALL');

  // Filtered Count for Tab Badges
  const filteredCount = useMemo(() => {
    return projects.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesEval =
        evaluationFilter === 'ALL' || p.evaluation === evaluationFilter;
      return matchesQuery && matchesEval;
    }).length;
  }, [projects, searchQuery, evaluationFilter]);

  const remarksCount = useMemo(() => {
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
    }).length;
  }, [projects, searchQuery, evaluationFilter]);

  return (
    <div className="space-y-4 text-left font-sans select-none pb-6">
      {/* ── 1. KPI TOP METRICS ROW (6 Cards) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* Card 1: Dự án ĐT */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-slate-600">
            <IconBuilding size={16} className="text-slate-500 shrink-0" />
            <span className="text-[11px] font-semibold text-slate-500 truncate">Dự án ĐT</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-800 tracking-tight">13</span>
            <span className="text-[10px] text-slate-400 font-medium">đang chạy</span>
          </div>
        </div>

        {/* Card 2: CV hoàn thành */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-emerald-600">
            <IconCircleCheck size={16} className="text-emerald-500 shrink-0" />
            <span className="text-[11px] font-semibold text-slate-500 truncate">CV hoàn thành</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-black text-emerald-600 tracking-tight">3138/4612</span>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded">68%</span>
          </div>
        </div>

        {/* Card 3: Giờ KH tổng */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-indigo-600">
            <IconClock size={16} className="text-indigo-500 shrink-0" />
            <span className="text-[11px] font-semibold text-slate-500 truncate">Giờ KH tổng</span>
          </div>
          <div className="mt-2">
            <span className="text-xl font-black text-indigo-600 tracking-tight">25764h</span>
          </div>
        </div>

        {/* Card 4: Giờ TH tổng */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-amber-600">
            <IconClockPlay size={16} className="text-amber-500 shrink-0" />
            <span className="text-[11px] font-semibold text-slate-500 truncate">Giờ TH tổng</span>
          </div>
          <div className="mt-2">
            <span className="text-xl font-black text-amber-600 tracking-tight">18672.0h</span>
          </div>
        </div>

        {/* Card 5: CV quá hạn */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-rose-600">
            <IconAlertTriangle size={16} className="text-rose-500 shrink-0" />
            <span className="text-[11px] font-semibold text-slate-500 truncate">CV quá hạn</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-rose-600 tracking-tight">446</span>
          </div>
        </div>

        {/* Card 6: CV chưa BC */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-amber-600">
            <IconFileText size={16} className="text-amber-500 shrink-0" />
            <span className="text-[11px] font-semibold text-slate-500 truncate">CV chưa BC</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-amber-600 tracking-tight">1695</span>
          </div>
        </div>
      </div>

      {/* ── 2. SUB-TABS NAVIGATION BAR & SEARCH / FILTER BAR ── */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
          {/* Sub-tab Switches */}
          <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-lg shrink-0">
            <button
              onClick={() => setSubTab('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                subTab === 'table'
                  ? 'bg-white text-[#406c89] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <IconTable size={15} />
              <span>Tổng hợp Tiến độ dự án</span>
              <span
                className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  subTab === 'table'
                    ? 'bg-indigo-50 text-[#406c89]'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {filteredCount}
              </span>
            </button>

            <button
              onClick={() => setSubTab('remarks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                subTab === 'remarks'
                  ? 'bg-white text-[#406c89] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <IconMessageDots size={15} />
              <span>Nhận xét Chủ nhiệm dự án</span>
              <span
                className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  subTab === 'remarks'
                    ? 'bg-indigo-50 text-[#406c89]'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {remarksCount}
              </span>
            </button>
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-2">
            <IconFilter size={14} className="text-slate-400" />
            <select
              value={evaluationFilter}
              onChange={(e) => setEvaluationFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer"
            >
              <option value="ALL">Tất cả đánh giá ({projects.length})</option>
              <option value="Đúng tiến độ">Đúng tiến độ</option>
              <option value="Vượt tiến độ">Vượt tiến độ</option>
              <option value="Chưa đánh giá">Chưa đánh giá</option>
            </select>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              subTab === 'table'
                ? 'Tìm theo tên dự án, đối tác, mã dự án...'
                : 'Tìm kiếm nội dung nhận xét, dự án, tuần báo cáo...'
            }
            className="w-full pl-8 pr-8 py-1.5 bg-slate-50/70 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <IconX size={13} />
            </button>
          )}
        </div>
      </div>

      {/* ── 3. SUB-TAB CONTENT AREA ── */}
      {subTab === 'table' ? (
        <TongHopTienDo
          projects={projects}
          searchQuery={searchQuery}
          evaluationFilter={evaluationFilter}
        />
      ) : (
        <NhanXetChuNhiem
          projects={projects}
          searchQuery={searchQuery}
          evaluationFilter={evaluationFilter}
        />
      )}
    </div>
  );
}
