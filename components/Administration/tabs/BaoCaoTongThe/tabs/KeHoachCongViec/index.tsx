"use client";

import React, { useState } from 'react';
import {
  IconRefresh,
  IconSettings,
  IconPrinter,
  IconArrowsMaximize,
  IconChevronDown,
  IconPlus,
  IconArrowsUpDown,
} from '@tabler/icons-react';

// ─── Constants ────────────────────────────────────────────────────────────────

const WEEKS_IN_OCT = [
  { label: 'Tuần 1', sub: '01-07/10' },
  { label: 'Tuần 2', sub: '08-14/10' },
  { label: 'Tuần 3', sub: '15-21/10' },
  { label: 'Tuần 4', sub: '22-28/10' },
  { label: 'Tuần 5', sub: '29-31/10' },
];

const DEPARTMENTS = [
  { id: 'vp',    label: 'Khối Văn phòng',          color: 'border-emerald-400 text-emerald-700 bg-emerald-50',         activeColor: 'bg-emerald-500 text-white border-emerald-500' },
  { id: 'kt',    label: 'Phòng Khai triển',          color: 'border-blue-400 text-blue-700 bg-blue-50',                  activeColor: 'bg-blue-500 text-white border-blue-500' },
  { id: 'cat',   label: 'Phòng Cắt',                 color: 'border-sky-400 text-sky-700 bg-sky-50',                     activeColor: 'bg-sky-500 text-white border-sky-500' },
  { id: 'ghep',  label: 'Phòng Ghép',                color: 'border-blue-400 text-blue-700 bg-blue-50',                  activeColor: 'bg-blue-500 text-white border-blue-500' },
  { id: 'ms',    label: 'Phòng Mộc Sơn',             color: 'border-indigo-400 text-indigo-700 bg-indigo-50',            activeColor: 'bg-indigo-500 text-white border-indigo-500' },
  { id: 'dien',  label: 'Phòng Điện',                color: 'border-violet-400 text-violet-700 bg-violet-50',            activeColor: 'bg-violet-500 text-white border-violet-500' },
  { id: 'cq',    label: 'Phòng Cảnh Quan',           color: 'border-orange-400 text-orange-700 bg-orange-50',            activeColor: 'bg-orange-500 text-white border-orange-500' },
  { id: 'cntk',  label: 'Phòng Công nghệ và Thiết kế', color: 'border-cyan-400 text-cyan-700 bg-cyan-50',               activeColor: 'bg-cyan-500 text-white border-cyan-500' },
];

const PROJECT_GROUPS = [
  { id: 'I',   label: 'I - DỰ ÁN ĐÃ BÀN GIAO, CHỜ BÀN GIAO',          bg: 'bg-[#c8a84b]',   text: 'text-white' },
  { id: 'II',  label: 'II - DỰ ÁN ĐANG TRIỂN KHAI',                     bg: 'bg-[#2e6b3e]',   text: 'text-white' },
  { id: 'III', label: 'III - DỰ ÁN DỰ KIẾN TRIỂN KHAI',                 bg: 'bg-[#2e6b3e]',   text: 'text-white' },
  { id: 'V',   label: 'V - DỰ ÁN ĐÃ BÁO GIÁ VÀ ĐANG THEO DÕI',        bg: 'bg-[#7d8c2e]',   text: 'text-white' },
  { id: 'VI',  label: 'VI - DỰ ÁN MỚI LIÊN HỆ VÀ ĐANG BÁO GIÁ',       bg: 'bg-[#8c8c8c]',   text: 'text-white' },
];

const LEGEND = [
  { key: 'DT', label: 'Đang thực hiện', color: 'bg-emerald-500 text-white' },
  { key: 'HT', label: 'Hoàn thành',     color: 'bg-blue-500 text-white' },
  { key: 'TD', label: 'Tạm dừng',       color: 'bg-amber-400 text-white' },
  { key: 'CB', label: 'Chưa bắt đầu',   color: 'bg-rose-200 text-rose-700' },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function KeHoachCongViec() {
  const [activeDept, setActiveDept] = useState('cat');
  const [period, setPeriod]         = useState('T10-T11-T12/2026');
  const [duration, setDuration]     = useState('1 tháng');

  const activeDeptLabel = DEPARTMENTS.find(d => d.id === activeDept)?.label ?? '';

  return (
    <div className="flex-1 flex flex-col min-h-0 text-left font-sans select-none overflow-hidden space-y-2">

      {/* ── ROW 1: Title + Period dropdowns ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Kế hoạch công việc — T10/2026
        </h2>
        <div className="flex items-center gap-2">
          {/* Period selector */}
          <div className="relative">
            <select
              value={period}
              onChange={e => setPeriod(e.target.value)}
              className="appearance-none pl-2.5 pr-6 py-1 text-[11px] font-medium bg-white border border-slate-200 rounded-md text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-400 cursor-pointer shadow-2xs"
            >
              <option>T10-T11-T12/2026</option>
              <option>T7-T8-T9/2026</option>
              <option>T4-T5-T6/2026</option>
            </select>
            <IconChevronDown size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          {/* Duration selector */}
          <div className="relative">
            <select
              value={duration}
              onChange={e => setDuration(e.target.value)}
              className="appearance-none pl-2.5 pr-6 py-1 text-[11px] font-medium bg-white border border-slate-200 rounded-md text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-400 cursor-pointer shadow-2xs"
            >
              <option>1 tháng</option>
              <option>3 tháng</option>
            </select>
            <IconChevronDown size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── ROW 2: Department pills + Đồng bộ chi tiết TĐ ── */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {DEPARTMENTS.map(dept => (
          <button
            key={dept.id}
            onClick={() => setActiveDept(dept.id)}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border transition-all cursor-pointer whitespace-nowrap ${
              activeDept === dept.id ? dept.activeColor : dept.color
            }`}
          >
            {dept.label}
          </button>
        ))}
        {/* Right-aligned sync button */}
        <button className="ml-auto flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs cursor-pointer whitespace-nowrap">
          <IconRefresh size={12} className="text-slate-500" />
          Đồng bộ chi tiết TĐ
        </button>
      </div>

      {/* ── ROW 3: Action buttons ── */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs cursor-pointer">
          <IconRefresh size={12} className="text-slate-500" />
          Đồng bộ KH Kinh doanh
        </button>
        <button className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs cursor-pointer">
          <IconSettings size={12} className="text-slate-500" />
          Quản lý nhóm
        </button>
      </div>

      {/* ── MAIN PANEL ── */}
      <div className="flex-1 flex flex-col min-h-0 border border-slate-200 rounded-lg bg-white overflow-hidden shadow-2xs">

        {/* Panel header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 shrink-0">
          <span className="text-[12px] font-semibold text-slate-700">
            Kế hoạch công việc — {activeDeptLabel} (0 CV)
          </span>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-slate-600 hover:bg-slate-100 rounded transition-all cursor-pointer">
              <IconPrinter size={12} className="text-slate-500" />
              In PDF
            </button>
            <button className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-slate-600 hover:bg-slate-100 rounded transition-all cursor-pointer">
              <IconArrowsMaximize size={12} className="text-slate-500" />
              Toàn màn hình
            </button>
          </div>
        </div>

        {/* Legend row */}
        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-slate-100 shrink-0 flex-wrap">
          {LEGEND.map(item => (
            <span
              key={item.key}
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${item.color}`}
            >
              {item.key} = {item.label}
            </span>
          ))}
          <span className="text-[11px] text-slate-400 ml-1">Chưa có nhân sự.</span>
        </div>

        {/* Gantt table */}
        <div className="flex-1 overflow-auto min-h-0">
          <table className="w-full border-collapse text-[11px]">
            <thead className="sticky top-0 z-20">
              {/* Title row */}
              <tr>
                <th
                  colSpan={6 + WEEKS_IN_OCT.length}
                  className="bg-[#1a4a6b] text-white text-center py-1.5 font-bold text-[11px] tracking-wider uppercase"
                >
                  BẢNG KẾ HOẠCH CÔNG VIỆC THÁNG 10 NĂM 2026 — {activeDeptLabel.toUpperCase()}
                </th>
              </tr>
              {/* Column headers row 1 (month label over day columns) */}
              <tr className="bg-[#dce8f0] border-b border-slate-300">
                <th className="border border-slate-300 px-2 py-1 text-center font-semibold text-slate-700 w-8" rowSpan={2}>STT</th>
                <th className="border border-slate-300 px-2 py-1 text-center font-semibold text-slate-700 w-24" rowSpan={2}>
                  <span className="flex items-center justify-center gap-0.5">
                    PHỤ TRÁCH <IconArrowsUpDown size={9} className="text-slate-400" />
                  </span>
                </th>
                <th className="border border-slate-300 px-2 py-1 text-center font-semibold text-slate-700 w-20" rowSpan={2}>
                  <span className="flex items-center justify-center gap-0.5">
                    MÃ DA <IconArrowsUpDown size={9} className="text-slate-400" />
                  </span>
                </th>
                <th className="border border-slate-300 px-2 py-1 text-center font-semibold text-slate-700 w-36" rowSpan={2}>
                  <span className="flex items-center justify-center gap-0.5">
                    TÊN CV <IconArrowsUpDown size={9} className="text-slate-400" />
                  </span>
                </th>
                <th className="border border-slate-300 px-2 py-1 text-center font-semibold text-slate-700 w-20" rowSpan={2}>
                  <span className="flex items-center justify-center gap-0.5">
                    NGÀY BĐ <IconArrowsUpDown size={9} className="text-slate-400" />
                  </span>
                </th>
                <th className="border border-slate-300 px-2 py-1 text-center font-semibold text-slate-700 w-20" rowSpan={2}>
                  <span className="flex items-center justify-center gap-0.5">
                    NGÀY KT <IconArrowsUpDown size={9} className="text-slate-400" />
                  </span>
                </th>
                <th
                  colSpan={WEEKS_IN_OCT.length}
                  className="border border-slate-300 px-2 py-1 text-center font-bold text-slate-700 bg-[#f5c518]/30"
                >
                  THÁNG 10/2026
                </th>
              </tr>
              {/* Week columns row */}
              <tr className="bg-[#dce8f0]">
                {WEEKS_IN_OCT.map((w, i) => (
                  <th
                    key={w.label}
                    className={`border border-slate-200 text-center font-semibold text-slate-600 py-1 text-[10px] ${
                      i === 2 ? 'bg-[#f5c518]/30 text-amber-800' : ''
                    }`}
                  >
                    <div>{w.label}</div>
                    <div className="font-normal text-slate-400 text-[9px]">{w.sub}</div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Empty state message */}
              <tr>
                <td colSpan={6 + WEEKS_IN_OCT.length} className="py-4 text-center text-slate-400 text-[11px] italic border-b border-slate-100">
                  Chưa có dòng nào. Bấm &ldquo;Đồng bộ chi tiết TĐ&rdquo;, &ldquo;Đồng bộ KH Kinh doanh&rdquo; hoặc &ldquo;Thêm dòng&rdquo; để bắt đầu.
                </td>
              </tr>

              {/* Project group sections */}
              {PROJECT_GROUPS.map(group => (
                <React.Fragment key={group.id}>
                  {/* Group header */}
                  <tr>
                    <td
                      colSpan={6 + WEEKS_IN_OCT.length}
                      className={`${group.bg} ${group.text} px-3 py-1 font-bold text-[11px] tracking-wide`}
                    >
                      {group.label}
                    </td>
                  </tr>
                  {/* Add row button */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td colSpan={6 + WEEKS_IN_OCT.length} className="px-3 py-1">
                      <button className="flex items-center gap-1 text-[11px] text-sky-600 hover:text-sky-700 font-medium cursor-pointer transition-colors">
                        <IconPlus size={12} />
                        Thêm dòng
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
