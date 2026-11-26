"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconPlus } from '@tabler/icons-react';
import type { ReportTask } from '../../index';
import { getStaffList } from '@/api/apiGetStaffList';
import { NotificationExtension } from '@/common/extension/NotificationExtension';

interface ThemHangModalProps {
  isOpen: boolean;
  departmentName?: string;
  availableGroups?: string[];
  onClose: () => void;
  onSubmit: (task: Omit<ReportTask, 'id'>) => void;
}

export default function ThemHangModal({ isOpen, departmentName, availableGroups = [], onClose, onSubmit }: ThemHangModalProps) {
  const [title, setTitle] = useState('');
  const [group, setGroup] = useState('');
  const [klDk, setKlDk] = useState('');
  const [klDp, setKlDp] = useState('0');
  const [assignee, setAssignee] = useState('');
  const [plannedHours, setPlannedHours] = useState('');
  const [actualHours, setActualHours] = useState('0');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      NotificationExtension.Fails('Vui lòng nhập tên công việc!');
      return;
    }
    onSubmit({
      title: title.trim(),
      group: group || undefined,
      klDk: Number(klDk) || 0,
      klDp: Number(klDp) || 0,
      assignee: assignee.trim() || 'Chưa phân công',
      plannedHours: `${Number(plannedHours) || 0}h`,
      actualHours: `${Number(actualHours) || 0}h`,
      date: startDate || new Date().toISOString().slice(0, 10),
      deadline: endDate || undefined,
      progress: 0,
      status: 'Chưa bắt đầu',
    });
    setTitle('');
    setGroup('');
    setKlDk('');
    setKlDp('0');
    setAssignee('');
    setPlannedHours('');
    setActualHours('0');
    setStartDate('');
    setEndDate('');
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
            <h3 className="text-base font-bold text-slate-800">Thêm hàng công việc</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        <div className="p-6 space-y-3.5">
          <label className="block">
            <span className={labelClass}>TÊN CÔNG VIỆC *</span>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tên công việc..."
              className={inputClass}
            />
          </label>

          {availableGroups.length > 0 && (
            <label className="block">
              <span className={labelClass}>CHỦ ĐỀ / NHÓM</span>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className={inputClass}
              >
                <option value="">— Không thuộc chủ đề —</option>
                {availableGroups.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className={labelClass}>KL DK</span>
              <input
                type="number"
                min="0"
                step="0.5"
                value={klDk}
                onChange={(e) => setKlDk(e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className={labelClass}>GIỜ DK</span>
              <input
                type="number"
                min="0"
                step="0.5"
                value={plannedHours}
                onChange={(e) => setPlannedHours(e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </label>
          </div>

          <label className="block">
            <span className={labelClass}>NHÂN SỰ</span>
            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className={inputClass}
            >
              <option value="">Chọn nhân sự...</option>
              {staffNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className={labelClass}>BẮT ĐẦU</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className={labelClass}>KẾT THÚC</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={inputClass}
              />
            </label>
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
            Thêm hàng
          </button>
        </div>
      </form>
    </div>
  );
}
