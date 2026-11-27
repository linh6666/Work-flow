"use client";

import React, { useState, useEffect } from 'react';
import {
  IconX,
  IconCheck,
  IconCalendar,
  IconChevronDown,
  IconLoader2,
  IconPencil,
} from '@tabler/icons-react';
import { ReportTask } from '../../index';
import { getTaskById } from '@/api/apiGetTask';

interface SuaCongViecModalProps {
  isOpen: boolean;
  departmentName?: string;
  task: ReportTask | null;
  availableAssignees?: string[];
  existingGroups?: string[];
  onClose: () => void;
  onUpdateTask: (task: ReportTask) => Promise<void> | void;
}

export default function SuaCongViecModal({
  isOpen,
  departmentName = '',
  task,
  availableAssignees = [],
  existingGroups = [],
  onClose,
  onUpdateTask,
}: SuaCongViecModalProps) {
  const [title, setTitle] = useState('');
  const [group, setGroup] = useState('');
  const [customGroup, setCustomGroup] = useState('');
  const [isCustomGroup, setIsCustomGroup] = useState(false);
  const [assignee, setAssignee] = useState('');
  const [customAssignee, setCustomAssignee] = useState('');
  const [isCustomAssignee, setIsCustomAssignee] = useState(false);
  const [plannedHours, setPlannedHours] = useState('1h');
  const [actualHours, setActualHours] = useState('—');
  const [klDk, setKlDk] = useState<number | string>(1);
  const [klDp, setKlDp] = useState<number | string>(0);
  const [date, setDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('Chưa bắt đầu');
  const [rowTheme, setRowTheme] = useState<'blue' | 'gold' | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && task) {
      setTitle(task.title === 'Tên công việc...' ? '' : task.title || '');
      setGroup(task.group || '');
      setCustomGroup('');
      setIsCustomGroup(false);

      setAssignee(task.assignee || '');
      setCustomAssignee('');
      setIsCustomAssignee(false);

      setPlannedHours(task.plannedHours != null ? String(task.plannedHours) : '1h');
      setActualHours(task.actualHours != null ? String(task.actualHours) : '—');
      setKlDk(task.klDk ?? 1);
      setKlDp(task.klDp ?? 0);
      setDate(task.date || '');
      setDeadline(task.deadline || task.date || '');
      setStatus(task.status || 'Chưa bắt đầu');
      setRowTheme(task.rowTheme);
      setErrorMsg('');

      if (task.id) {
        getTaskById(task.id).then((detail) => {
          if (!detail) return;
          if (detail.name) setTitle(detail.name === 'Tên công việc...' ? '' : detail.name);
          if (detail.status) setStatus(detail.status);
          if (detail.quantity_planned !== undefined) setKlDk(Number(detail.quantity_planned) || 0);
          if (detail.quantity_done !== undefined) setKlDp(Number(detail.quantity_done) || 0);
          if (detail.scheduled_work !== undefined) setPlannedHours(`${detail.scheduled_work}h`);
          if (detail.actual_work !== undefined) setActualHours(`${detail.actual_work}h`);
          if (detail.start_date) setDate(detail.start_date);
          if (detail.end_date) setDeadline(detail.end_date);
        });
      }
    }
  }, [isOpen, task]);

  if (!isOpen || !task) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Vui lòng nhập tên công việc!');
      return;
    }

    const finalGroup = isCustomGroup && customGroup.trim()
      ? customGroup.trim().toUpperCase()
      : (group || '').toUpperCase();

    const finalAssignee = isCustomAssignee && customAssignee.trim()
      ? customAssignee.trim()
      : (assignee || 'Chưa phân công');

    const formattedPlannedHours = plannedHours.toString().endsWith('h')
      ? plannedHours
      : `${plannedHours}h`;

    const updatedTask: ReportTask = {
      ...task,
      title: title.trim().toUpperCase(),
      group: finalGroup,
      assignee: finalAssignee,
      assignees: finalAssignee ? [finalAssignee] : [],
      date: date || '—',
      deadline: deadline || date || '—',
      plannedHours: formattedPlannedHours,
      actualHours: actualHours || '—',
      status: status || 'Chưa bắt đầu',
      klDk: Number(klDk) || 0,
      klDp: Number(klDp) || 0,
      rowTheme: rowTheme,
    };

    try {
      setIsSubmitting(true);
      await onUpdateTask(updatedTask);
      onClose();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Có lỗi khi cập nhật công việc lên máy chủ');
    } finally {
      setIsSubmitting(false);
    }
  };

  const allGroups = Array.from(new Set(existingGroups.filter(Boolean)));

  return (
    <div className="fixed inset-0 z-60 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#406c89]/10 text-[#406c89] flex items-center justify-center shrink-0">
              <IconPencil size={18} stroke={2.5} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Chỉnh sửa thông tin công việc</h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Phòng ban: <strong className="text-slate-700">{departmentName || 'Dự án'}</strong>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4 text-xs">
          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Tên công việc */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Tên công việc <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="VD: PHÊ DUYỆT BẢN VẼ CHI TIẾT..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89]/20 text-xs text-slate-800 placeholder:text-slate-300 font-medium transition"
            />
          </div>

          {/* Nhóm công việc */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nhóm công việc
            </label>
            {!isCustomGroup ? (
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <select
                    disabled
                    value={group}
                    onChange={(e) => {
                      if (e.target.value === '__custom__') {
                        setIsCustomGroup(true);
                      } else {
                        setGroup(e.target.value);
                      }
                    }}
                    className="w-full h-9 px-3 pr-8 border border-slate-200 rounded-lg outline-none bg-slate-100 text-xs text-slate-500 appearance-none cursor-not-allowed"
                  >
                    <option value="">— Không thuộc nhóm —</option>
                    {group && !allGroups.includes(group) && (
                      <option value={group}>{group}</option>
                    )}
                    {allGroups.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                    <option value="__custom__">+ Nhập nhóm mới...</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập tên nhóm mới..."
                  value={customGroup}
                  onChange={(e) => setCustomGroup(e.target.value)}
                  className="flex-1 h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89] text-xs"
                />
                <button
                  type="button"
                  onClick={() => setIsCustomGroup(false)}
                  className="px-2.5 h-9 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-[11px]"
                >
                  Chọn có sẵn
                </button>
              </div>
            )}
          </div>

          {/* Nhân sự phụ trách */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nhân sự phụ trách
            </label>
            {!isCustomAssignee ? (
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <select
                    disabled
                    value={assignee}
                    onChange={(e) => {
                      if (e.target.value === '__custom__') {
                        setIsCustomAssignee(true);
                      } else {
                        setAssignee(e.target.value);
                      }
                    }}
                    className="w-full h-9 px-3 pr-8 border border-slate-200 rounded-lg outline-none bg-slate-100 text-xs text-slate-500 appearance-none cursor-not-allowed"
                  >
                    <option value="">-- Chưa phân công --</option>
                    {assignee && !availableAssignees.includes(assignee) && (
                      <option value={assignee}>{assignee}</option>
                    )}
                    {availableAssignees.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                    <option value="__custom__">+ Nhập tên nhân sự mới...</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập họ tên nhân sự..."
                  value={customAssignee}
                  onChange={(e) => setCustomAssignee(e.target.value)}
                  className="flex-1 h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89] text-xs"
                />
                <button
                  type="button"
                  onClick={() => setIsCustomAssignee(false)}
                  className="px-2.5 h-9 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-[11px]"
                >
                  Chọn có sẵn
                </button>
              </div>
            )}
          </div>

          {/* Row: Giờ DK + Giờ TT + KL DK + KL DP */}
          <div className="grid grid-cols-4 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Giờ DK
              </label>
              <input
                type="text"
                placeholder="1h"
                value={plannedHours}
                onChange={(e) => setPlannedHours(e.target.value)}
                className="w-full h-9 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-[#406c89] text-xs text-center font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Giờ TT
              </label>
              <input
                type="text"
                placeholder="—"
                value={actualHours}
                disabled
                className="w-full h-9 px-2.5 border border-slate-200 rounded-lg outline-none text-xs text-center font-medium bg-slate-100 text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                KL DK
              </label>
              <input
                type="number"
                min="0"
                value={klDk}
                onChange={(e) => setKlDk(Number(e.target.value))}
                className="w-full h-9 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-[#406c89] text-xs text-center font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                KL DP
              </label>
              <input
                type="number"
                min="0"
                value={klDp}
                disabled
                className="w-full h-9 px-2.5 border border-slate-200 rounded-lg outline-none text-xs text-center font-medium bg-slate-100 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Row: Bắt đầu + Kết thúc */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Ngày bắt đầu
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-9 pl-3 pr-8 border border-slate-200 rounded-lg outline-none focus:border-[#406c89] text-xs font-medium"
                />
                <input
                  id="sua-cv-start-picker"
                  type="date"
                  value={/^\d{4}-\d{2}-\d{2}$/.test(date) ? date : ''}
                  onChange={(e) => setDate(e.target.value)}
                  className="sr-only"
                />
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('sua-cv-start-picker') as HTMLInputElement | null;
                    el?.showPicker?.();
                    el?.click();
                  }}
                  aria-label="Chọn ngày bắt đầu"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-[#406c89] cursor-pointer"
                >
                  <IconCalendar size={14} />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Hạn kết thúc
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full h-9 pl-3 pr-8 border border-slate-200 rounded-lg outline-none focus:border-[#406c89] text-xs font-medium"
                />
                <input
                  id="sua-cv-end-picker"
                  type="date"
                  value={/^\d{4}-\d{2}-\d{2}$/.test(deadline) ? deadline : ''}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="sr-only"
                />
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('sua-cv-end-picker') as HTMLInputElement | null;
                    el?.showPicker?.();
                    el?.click();
                  }}
                  aria-label="Chọn hạn kết thúc"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-[#406c89] cursor-pointer"
                >
                  <IconCalendar size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 font-medium text-xs cursor-pointer transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-[#406c89] hover:bg-[#345870] disabled:opacity-70 text-white font-semibold text-xs cursor-pointer transition shadow-xs flex items-center gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <IconLoader2 size={15} className="animate-spin" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <IconCheck size={15} stroke={2.5} />
                  <span>Lưu thay đổi</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
