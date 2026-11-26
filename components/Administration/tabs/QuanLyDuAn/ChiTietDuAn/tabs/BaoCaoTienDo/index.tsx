"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  IconTrendingUp,
  IconCircleCheck,
  IconClock,
  IconMessageCircle,
  IconPlus,
  IconLoader2,
} from '@tabler/icons-react';
import { DuAnItem } from '../../../index';
import { getTaskList, TaskRecord } from '@/api/apiGetTask';

interface BaoCaoTienDoTabProps {
  project: DuAnItem;
}

export default function BaoCaoTienDoTab({ project }: BaoCaoTienDoTabProps) {
  const [comments, setComments] = useState<string[]>([]);
  const [showAddCommentInput, setShowAddCommentInput] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [tasks, setTasks] = useState<TaskRecord[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  useEffect(() => {
    if (!project?.id) return;
    setIsLoadingTasks(true);
    getTaskList(500, project.id)
      .then((data) => {
        if (Array.isArray(data)) setTasks(data);
      })
      .finally(() => setIsLoadingTasks(false));
  }, [project?.id]);

  const taskSummary = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(
      (t) => Number(t.progress) >= 100 || (t.status || '').toLowerCase().includes('hoàn thành')
    ).length;
    const inProgress = tasks.filter((t) => (t.status || '').toLowerCase().includes('đang')).length;
    const plannedHours = tasks.reduce((sum, t) => sum + (Number(t.scheduled_work) || 0), 0);
    const actualHours = tasks.reduce((sum, t) => sum + (Number(t.actual_work) || 0), 0);
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, inProgress, plannedHours, actualHours, percent };
  }, [tasks]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    setComments((prev) => [newCommentText.trim(), ...prev]);
    setNewCommentText('');
    setShowAddCommentInput(false);
  };

  return (
    <div className="space-y-5 text-xs text-slate-700 animate-fade-in">
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 font-semibold">
            <span>Tiến độ tổng thể</span>
            <IconTrendingUp size={16} className="text-[#406c89]" />
          </div>
          <div className="mt-2 text-2xl font-bold text-[#406c89]">{taskSummary.percent}%</div>
          <div className="mt-1 text-[11px] text-slate-400">
            {taskSummary.completed}/{taskSummary.total} công việc hoàn thành
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 font-semibold">
            <span>Đã hoàn thành</span>
            <IconCircleCheck size={16} className="text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-600">{taskSummary.completed}</div>
          <div className="mt-1 text-[11px] text-slate-400">Công việc đạt 100%</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 font-semibold">
            <span>Đang thực hiện</span>
            <IconClock size={16} className="text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-600">{taskSummary.inProgress}</div>
          <div className="mt-1 text-[11px] text-slate-400">Công việc đang xử lý</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 font-semibold">
            <span>Giờ công (KH / TH)</span>
            <IconClock size={16} className="text-slate-400" />
          </div>
          <div className="mt-2 text-lg font-bold text-slate-800">
            {taskSummary.plannedHours.toFixed(1)}h / {taskSummary.actualHours.toFixed(1)}h
          </div>
          <div className="mt-1 text-[11px] text-slate-400">Kế hoạch vs Thực tế</div>
        </div>
      </div>

      {/* Task List Table from API */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <span className="font-bold text-slate-800 text-sm">
            Danh sách công việc dự án ({tasks.length})
          </span>
          {isLoadingTasks && (
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <IconLoader2 size={14} className="animate-spin" />
              Đang tải dữ liệu...
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-4 py-2.5 font-bold whitespace-nowrap">STT</th>
                <th className="px-4 py-2.5 font-bold">Tên công việc</th>
                <th className="px-4 py-2.5 font-bold whitespace-nowrap">Bắt đầu</th>
                <th className="px-4 py-2.5 font-bold whitespace-nowrap">Kết thúc</th>
                <th className="px-4 py-2.5 font-bold whitespace-nowrap text-right">Giờ KH</th>
                <th className="px-4 py-2.5 font-bold whitespace-nowrap text-right">Giờ TH</th>
                <th className="px-4 py-2.5 font-bold whitespace-nowrap text-right">Tiến độ</th>
                <th className="px-4 py-2.5 font-bold whitespace-nowrap">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {!isLoadingTasks && tasks.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400">
                    Chưa có công việc nào cho dự án này.
                  </td>
                </tr>
              ) : (
                tasks.map((task, idx) => {
                  const prog = Math.round(Number(task.progress) || 0);
                  return (
                    <tr key={task.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-2.5 text-slate-500">{idx + 1}</td>
                      <td className="px-4 py-2.5 font-medium text-slate-800">{task.name || '—'}</td>
                      <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap">{task.start_date || '—'}</td>
                      <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap">{task.end_date || '—'}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-slate-600">
                        {Number(task.scheduled_work || 0).toFixed(1)}h
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono text-slate-600">
                        {Number(task.actual_work || 0).toFixed(1)}h
                      </td>
                      <td className="px-4 py-2.5 text-right font-bold text-[#406c89]">{prog}%</td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                          {task.status || 'Chưa bắt đầu'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comments Section */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
            <IconMessageCircle size={16} className="text-[#406c89]" />
            <span>Ghi chú / Trao đổi tiến độ</span>
          </div>
          <button
            type="button"
            onClick={() => setShowAddCommentInput((v) => !v)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
          >
            <IconPlus size={13} />
            Thêm ghi chú
          </button>
        </div>

        {showAddCommentInput && (
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Nhập ghi chú tiến độ..."
              className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-[#406c89]"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-lg bg-[#406c89] text-white text-xs font-semibold hover:bg-[#345a73] cursor-pointer"
            >
              Lưu
            </button>
          </form>
        )}

        {comments.length === 0 ? (
          <p className="text-slate-400 text-xs">Chưa có ghi chú nào.</p>
        ) : (
          <ul className="space-y-1.5">
            {comments.map((c, i) => (
              <li key={i} className="rounded-lg bg-slate-50 px-3 py-2 text-slate-700 border border-slate-100">
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
