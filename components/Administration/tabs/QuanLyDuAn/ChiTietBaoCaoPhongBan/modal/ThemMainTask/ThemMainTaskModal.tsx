"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconPlus } from '@tabler/icons-react';
import type { ReportTask } from '../../index';
import { getStaffList } from '@/api/apiGetStaffList';

interface ThemMainTaskModalProps {
  isOpen: boolean;
  departmentName?: string;
  onClose: () => void;
  onSubmit: (tasks: Omit<ReportTask, 'id'>[]) => void;
}

export default function ThemMainTaskModal({ isOpen, departmentName, onClose, onSubmit }: ThemMainTaskModalProps) {
  const [mainTitle, setMainTitle] = useState('');
  const [assignee, setAssignee] = useState('');
  const [staffNames, setStaffNames] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
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
  const [subtasks, setSubtasks] = useState<string[]>([
    'Subtask 1',
    'Subtask 2',
    'Subtask 3',
    'Subtask 4',
    'Subtask 5',
  ]);

  if (!isOpen) return null;

  const handleSubtaskChange = (idx: number, val: string) => {
    setSubtasks((prev) => prev.map((s, i) => (i === idx ? val : s)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainTitle.trim()) return;

    const assigned = assignee.trim() || '— Chọn —';

    const created: Omit<ReportTask, 'id'>[] = subtasks
      .map((s) => s.trim())
      .filter(Boolean)
      .map((sub) => ({
        title: `↳ ${sub}`,
        group: mainTitle.trim(),
        assignee: assigned,
        date: '',
        plannedHours: '0h',
        actualHours: '0h',
        progress: 0,
        status: 'Chưa bắt đầu',
        klDk: 0,
        klDp: 0,
      }));

    onSubmit(created);
    setMainTitle('');
    setAssignee('');
    setSubtasks(['Subtask 1', 'Subtask 2', 'Subtask 3', 'Subtask 4', 'Subtask 5']);
    onClose();
  };

  const inputClass =
    'w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#406c89]';
  const labelClass = 'mb-1 block text-[11px] font-semibold text-slate-600';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl border border-slate-100 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#406c89]">
            <IconPlus size={18} />
            <h3 className="text-base font-bold text-slate-800">Thêm Main task + 5 Subtask</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        <div className="p-6 space-y-3.5 max-h-[70vh] overflow-y-auto">
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

          <div className="space-y-2 pt-1">
            <span className={labelClass}>Danh sách 5 Subtask</span>
            {subtasks.map((sub, idx) => (
              <input
                key={idx}
                value={sub}
                onChange={(e) => handleSubtaskChange(idx, e.target.value)}
                placeholder={`Subtask ${idx + 1}`}
                className={inputClass}
              />
            ))}
          </div>
        </div>

        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-[#406c89] text-white text-xs font-semibold hover:bg-[#345a73] cursor-pointer"
          >
            Tạo Main task + 5 Subtask
          </button>
        </div>
      </form>
    </div>
  );
}
