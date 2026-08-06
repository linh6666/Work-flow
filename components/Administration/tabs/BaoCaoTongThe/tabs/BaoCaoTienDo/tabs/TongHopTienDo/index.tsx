"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
  IconChevronLeft,
  IconChevronRight,
  IconEye,
} from '@tabler/icons-react';
import { ProjectItem } from '../../types';

interface TongHopTienDoProps {
  projects: ProjectItem[];
  searchQuery: string;
  evaluationFilter: string;
}

function Avatar({ name }: { name: string }) {
  const words = name.trim().split(/\s+/);
  const letter = words[words.length - 1]?.[0]?.toUpperCase() || 'P';

  return (
    <div className="w-8 h-8 rounded-full bg-sky-50 text-[#406c89] font-bold text-xs flex items-center justify-center shrink-0 border border-sky-100 shadow-2xs">
      {letter}
    </div>
  );
}

export default function TongHopTienDo({
  projects,
  searchQuery,
  evaluationFilter,
}: TongHopTienDoProps) {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<keyof ProjectItem | null>('priority');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Reset page when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, evaluationFilter, sortKey, sortDir, itemsPerPage]);

  // Filtered & Sorted Projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        const matchesQuery =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesEval =
          evaluationFilter === 'ALL' || p.evaluation === evaluationFilter;
        return matchesQuery && matchesEval;
      })
      .sort((a, b) => {
        if (!sortKey) return 0;
        let va = a[sortKey];
        let vb = b[sortKey];

        if (va === null || va === undefined) va = sortDir === 'asc' ? 999 : -999;
        if (vb === null || vb === undefined) vb = sortDir === 'asc' ? 999 : -999;

        if (typeof va === 'number' && typeof vb === 'number') {
          return sortDir === 'asc' ? va - vb : vb - va;
        }

        const strA = String(va).toLowerCase();
        const strB = String(vb).toLowerCase();
        return sortDir === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
      });
  }, [projects, searchQuery, evaluationFilter, sortKey, sortDir]);

  // Paginated Projects
  const totalFiltered = filteredProjects.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalFiltered);
  const paginatedProjects = useMemo(() => {
    return filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProjects, startIndex, itemsPerPage]);

  const handleSort = (key: keyof ProjectItem) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  const getEvaluationBadgeStyle = (evalType: ProjectItem['evaluation']) => {
    switch (evalType) {
      case 'Đúng tiến độ':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Vượt tiến độ':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
      case 'Chưa đánh giá':
        return 'bg-slate-100 text-slate-500 border-slate-200';
      case 'Chậm tiến độ':
        return 'bg-rose-50 text-rose-700 border-rose-200 font-bold';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* TABLE MATCHING KHACH HANG TAB EXACTLY */}
      <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
        <table className="w-full text-xs text-left border-collapse min-w-[980px]">
          <thead className="sticky top-0 z-10 bg-slate-50 shadow-2xs border-b border-slate-200">
            <tr className="bg-slate-50">
              <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200">
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold"
                  onClick={() => handleSort('name')}
                >
                  <span>Dự án</span>
                  <span className="text-slate-400 text-[10px]">↕</span>
                </button>
              </th>
              <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center w-16">
                <button
                  type="button"
                  className="flex items-center justify-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold w-full"
                  onClick={() => handleSort('priority')}
                >
                  <span>Ưu tiên</span>
                  <span className="text-slate-400 text-[10px]">↕</span>
                </button>
              </th>
              <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center w-28">
                Tình trạng
              </th>
              <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center w-32">
                Đánh giá TĐ
              </th>
              <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center w-20">
                <button
                  type="button"
                  className="flex items-center justify-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold w-full"
                  onClick={() => handleSort('progressPct')}
                >
                  <span>Tiến độ</span>
                  <span className="text-slate-400 text-[10px]">↕</span>
                </button>
              </th>
              <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center w-24">
                Hoàn thành
              </th>
              <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center w-32">
                Giờ TH/KH
              </th>
              <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center w-28">
                TB Tuần
              </th>
              <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center w-24">
                Biểu đồ
              </th>
              <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-right w-28">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedProjects.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-10 text-slate-400">
                  <p className="font-semibold text-xs">Không tìm thấy dự án nào</p>
                </td>
              </tr>
            ) : (
              paginatedProjects.map((p) => {
                const isExpanded = expandedRowId === p.id;
                return (
                  <React.Fragment key={p.id}>
                    <tr
                      className={`hover:bg-slate-50/70 transition-colors group cursor-pointer ${
                        isExpanded ? 'bg-indigo-50/30' : ''
                      }`}
                      onClick={() => toggleExpand(p.id)}
                    >
                      {/* Tên dự án + Avatar */}
                      <td className="px-4 py-3.5 align-middle">
                        <div className="flex items-center gap-3">
                          <Avatar name={p.name} />
                          <div className="min-w-0 max-w-[240px]">
                            <p className="font-bold text-[#406c89] hover:underline cursor-pointer leading-snug text-xs uppercase">
                              {p.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-medium mt-0.5 uppercase">
                              {p.subName}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Ưu tiên */}
                      <td className="px-4 py-3.5 align-middle text-center">
                        {p.priority !== null ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-bold text-[11px] border border-slate-200">
                            {p.priority}
                          </span>
                        ) : (
                          <span className="text-slate-300 font-medium">—</span>
                        )}
                      </td>

                      {/* Tình trạng */}
                      <td className="px-4 py-3.5 align-middle text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
                          {p.status}
                        </span>
                      </td>

                      {/* Đánh giá TĐ */}
                      <td className="px-4 py-3.5 align-middle text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${getEvaluationBadgeStyle(
                            p.evaluation
                          )}`}
                        >
                          {p.evaluation}
                        </span>
                      </td>

                      {/* Tiến độ (%) */}
                      <td className="px-4 py-3.5 align-middle text-center font-bold text-[#406c89] text-xs">
                        {p.progressPct}%
                      </td>

                      {/* Hoàn thành */}
                      <td className="px-4 py-3.5 align-middle text-center font-bold text-emerald-600 text-xs">
                        {p.completedTasks}
                      </td>

                      {/* Giờ TH/KH */}
                      <td className="px-4 py-3.5 align-middle text-center font-bold text-amber-600 text-xs">
                        {p.actualHours}
                      </td>

                      {/* TB Tuần */}
                      <td className="px-4 py-3.5 align-middle text-center text-xs">
                        {p.weekReport ? (
                          <span className="inline-flex items-center gap-1 text-slate-600 font-medium text-[11px]">
                            <span>{p.weekReport}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#406c89] shrink-0" />
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>

                      {/* Biểu đồ bar graph */}
                      <td className="px-4 py-3.5 align-middle text-center">
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                          <div
                            className="h-full rounded-full bg-[#406c89] transition-all duration-500 shadow-2xs"
                            style={{ width: `${p.progressPct}%` }}
                          />
                        </div>
                      </td>

                      {/* THAO TÁC (Action Button styled like KhachHang table) */}
                      <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap">
                        <div className="flex flex-row items-center justify-end gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(p.id);
                            }}
                            className="py-1 px-2.5 rounded-md border border-sky-200 text-[#406c89] hover:bg-sky-50 text-[10px] font-bold flex items-center justify-center gap-1 transition-colors bg-white cursor-pointer shadow-2xs whitespace-nowrap"
                            title="Xem chi tiết"
                          >
                            <IconEye size={12} />
                            <span>Xem</span>
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Detail Row */}
                    {isExpanded && (
                      <tr className="bg-slate-50/90 border-b border-slate-200">
                        <td colSpan={10} className="p-4">
                          <div className="bg-white border border-slate-200/80 rounded-lg p-3.5 shadow-2xs space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-900">
                                  Chi tiết dự án: {p.name}
                                </span>
                                <span className="text-[11px] text-slate-500">
                                  ({p.subName})
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-[11px]">
                                <span className="text-slate-500">Người phụ trách:</span>
                                <span className="font-semibold text-slate-700">Chủ nhiệm dự án</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                              <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200/60">
                                <span className="text-slate-500 font-semibold block mb-1">Thống kê công việc</span>
                                <div className="flex justify-between items-center py-1 border-b border-slate-200/40">
                                  <span className="text-slate-600">Đã hoàn thành:</span>
                                  <span className="font-bold text-emerald-600">{p.completedTasks}</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                  <span className="text-slate-600">Tỷ lệ tiến độ:</span>
                                  <span className="font-bold text-[#406c89]">{p.progressPct}%</span>
                                </div>
                              </div>

                              <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200/60">
                                <span className="text-slate-500 font-semibold block mb-1">Thời gian thực hiện</span>
                                <div className="flex justify-between items-center py-1 border-b border-slate-200/40">
                                  <span className="text-slate-600">Giờ TH / Kế hoạch:</span>
                                  <span className="font-bold text-amber-600">{p.actualHours}</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                  <span className="text-slate-600">Báo cáo tuần:</span>
                                  <span className="font-semibold text-slate-700">{p.weekReport || 'Chưa cập nhật'}</span>
                                </div>
                              </div>

                              <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200/60">
                                <span className="text-slate-500 font-semibold block mb-1">Đánh giá chung</span>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className={`px-2 py-0.5 rounded-full text-[11px] ${getEvaluationBadgeStyle(p.evaluation)}`}>
                                    {p.evaluation}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {p.latestRemark && (
                              <div className="mt-2 bg-amber-50/50 border border-amber-200/80 rounded-md p-2.5 text-xs">
                                <span className="font-bold text-amber-900 block mb-1">
                                  Nhận xét gần nhất:
                                </span>
                                <p className="text-slate-700 leading-relaxed text-[11px]">
                                  {p.latestRemark}
                                </p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION FOOTER MATCHING KHACH HANG TAB EXACTLY */}
      <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
        <div>
          Hiển thị <span className="font-bold text-slate-700">{totalFiltered > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số <span className="font-bold text-slate-700">{totalFiltered}</span> dự án
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <IconChevronLeft size={13} />
            <span>Trước</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer ${
                currentPage === page
                  ? 'bg-[#406c89] text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Sau</span>
            <IconChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
