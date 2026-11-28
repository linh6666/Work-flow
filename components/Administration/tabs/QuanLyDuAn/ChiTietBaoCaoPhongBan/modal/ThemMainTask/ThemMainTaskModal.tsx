"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconPlus, IconTrash } from '@tabler/icons-react';
import type { ReportTask } from '../../index';
import { getStaffList } from '@/api/apiGetStaffList';

interface ThemMainTaskModalProps {
  isOpen: boolean;
  departmentName?: string;
  onClose: () => void;
  onSubmit: (tasks: Omit<ReportTask, 'id'>[]) => void;
}

interface SubtaskDraft {
  title: string;
  plannedHours: string;
  klDk: string;
  date: string;
  deadline: string;
}

function getTodayIso(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDateVN(iso: string): string {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

function createEmptySubtask(todayIso: string): SubtaskDraft {
  return {
    title: '',
    plannedHours: '',
    klDk: '',
    date: todayIso,
    deadline: todayIso,
  };
}

export default function ThemMainTaskModal({ isOpen, departmentName, onClose, onSubmit }: ThemMainTaskModalProps) {
  const [mainTitle, setMainTitle] = useState('');
  const [assignee, setAssignee] = useState('');
  const [rowTheme, setRowTheme] = useState<'blue' | 'gold' | ''>('');
  const [staffNames, setStaffNames] = useState<string[]>([]);
  const [subtasks, setSubtasks] = useState<SubtaskDraft[]>(() => {
    const today = getTodayIso();
    return Array.from({ length: 5 }, () => createEmptySubtask(today));
  });

  useEffect(() => {
    if (isOpen) {
      const today = getTodayIso();
      setMainTitle('');
      setAssignee('');
      setRowTheme('');
      setSubtasks(Array.from({ length: 5 }, () => createEmptySubtask(today)));
      getStaffList({ limit: 500 }).then((list) => {
        const dept = (departmentName || '').trim().toLowerCase();
        const filtered = dept
          ? list.filter((s) => {
              const pb = (s.phongBan || '').trim().toLowerCase();
              return pb && (pb.includes(dept) || dept.includes(pb));
            })
          : list;
        const names = filtered.map((s) => s.hoTen).filter(Boolean);
        setStaffNames(Array.from(new Set(names)));
      });
    }
  }, [isOpen, departmentName]);

  if (!isOpen) return null;

  const handleSubtaskChange = (idx: number, field: keyof SubtaskDraft, val: string) => {
    setSubtasks((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, [field]: val } : s))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainTitle.trim()) return;

    const assigned = assignee.trim() || '— Chọn —';

    const created: Omit<ReportTask, 'id'>[] = subtasks
      .filter((st) => st.title.trim())
      .map((st) => {
        const ph = st.plannedHours.trim() || '1h';
        return {
          title: st.title.trim(),
          group: mainTitle.trim(),
          assignee: assigned,
          date: formatDateVN(st.date),
          deadline: formatDateVN(st.deadline),
          plannedHours: ph.endsWith('h') ? ph : `${ph}h`,
          actualHours: '0h',
          status: 'Chưa bắt đầu',
          klDk: Number(st.klDk) || 1,
          klDp: 0,
          rowTheme: rowTheme || undefined,
        };
      });

    if (created.length === 0) return;

    onSubmit(created);
    const today = getTodayIso();
    setMainTitle('');
    setAssignee('');
    setRowTheme('');
    setSubtasks(Array.from({ length: 5 }, () => createEmptySubtask(today)));
    onClose();
  };

  const inputClass =
    'w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 outline-none focus:border-[#406c89] focus:ring-2 focus:ring-[#406c89]/10';
  const labelClass = 'block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl max-h-[88vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
      >
        <div className="shrink-0 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#406c89]">Thêm Main task</h3>
            <p className="text-[11px] text-slate-400">Tạo nhóm công việc chính và các công việc con</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        <div className="p-6 space-y-3.5 flex-1 flex flex-col min-h-0">
          <label className="block">
            <span className={labelClass}>Tên Main task *</span>
            <input
              required
              value={mainTitle}
              onChange={(e) => setMainTitle(e.target.value)}
              placeholder="Nhập tên công việc chính..."
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className={labelClass}>Người thực hiện</span>
            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className={inputClass}
            >
              <option value="">Chọn người thực hiện...</option>
              {staffNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <div className="space-y-1.5">
            <span className={labelClass}>TÔNG MÀU DÒNG</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setRowTheme(rowTheme === 'blue' ? '' : 'blue')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                  rowTheme === 'blue'
                    ? 'bg-[#406c89] text-white border-[#406c89] shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#406c89] border border-white/60" />
                Xanh (#406c89)
              </button>
              <button
                type="button"
                onClick={() => setRowTheme(rowTheme === 'gold' ? '' : 'gold')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                  rowTheme === 'gold'
                    ? 'bg-[#b7791f] text-white border-[#b7791f] shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#d69e2e] border border-white/60" />
                Vàng cam
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-0 space-y-2.5 pt-1">
            <div className="shrink-0 flex items-center justify-between">
              <span className={labelClass}>Danh sách công việc con ({subtasks.length} task)</span>
              <button
                type="button"
                onClick={() => setSubtasks((prev) => [...prev, createEmptySubtask(getTodayIso())])}
                className="text-[11px] font-bold text-[#406c89] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <IconPlus size={12} /> Thêm dòng
              </button>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0 pr-1 space-y-3">
              {subtasks.map((st, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#406c89]">Công việc #{idx + 1}</span>
                    {subtasks.length > 1 && (
                      <button
                        type="button"
                        title="Xóa dòng"
                        onClick={() => setSubtasks((prev) => prev.filter((_, i) => i !== idx))}
                        className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <IconTrash size={14} />
                      </button>
                    )}
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Tên công việc {idx === 0 ? <span className="text-rose-500">*</span> : ''}
                    </span>
                    <input
                      value={st.title}
                      onChange={(e) => handleSubtaskChange(idx, 'title', e.target.value)}
                      placeholder={`Nhập tên công việc ${idx + 1}...`}
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div>
                      <span className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Giờ DK
                      </span>
                      <input
                        value={st.plannedHours}
                        onChange={(e) => handleSubtaskChange(idx, 'plannedHours', e.target.value)}
                        placeholder="1h"
                        className={`${inputClass} text-center`}
                      />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        KL DK
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={st.klDk}
                        onChange={(e) => handleSubtaskChange(idx, 'klDk', e.target.value)}
                        placeholder="0"
                        className={`${inputClass} text-center`}
                      />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Ngày bắt đầu
                      </span>
                      <input
                        type="date"
                        value={st.date}
                        onChange={(e) => handleSubtaskChange(idx, 'date', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Hạn kết thúc
                      </span>
                      <input
                        type="date"
                        value={st.deadline}
                        onChange={(e) => handleSubtaskChange(idx, 'deadline', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold shadow-sm cursor-pointer"
          >
            Thêm Main task
          </button>
        </div>
      </form>
    </div>
  );
}
