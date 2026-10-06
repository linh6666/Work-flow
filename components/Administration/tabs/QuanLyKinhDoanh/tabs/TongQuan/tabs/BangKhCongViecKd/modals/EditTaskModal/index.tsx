"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconCalendar, IconChevronDown } from '@tabler/icons-react';

export interface TaskItem {
  id: string;
  stt: number;
  assignee: string;
  code: string;
  title: string;
  kichThuoc?: string;
  tyLe?: string;
  tgSx?: number;
  startDate?: string;
  dueDate?: string;
  ghiChu?: string;
  groupId?: string;
  t1?: string[];
  t2?: string[];
  t3?: string[];
  t4?: string[];
  t5?: string[];
}

const GROUP_OPTIONS = [
  { id: 'g1', label: 'I - DỰ ÁN ĐÃ BÀN GIAO, CHỜ BÀN GIAO' },
  { id: 'g2', label: 'II - DỰ ÁN ĐANG TRIỂN KHAI' },
  { id: 'g3', label: 'III - DỰ ÁN TẠM DỪNG' },
  { id: 'g4', label: 'IV - DỰ ÁN ĐÃ KÝ HD, CHỜ SẢN XUẤT' },
  { id: 'g5', label: 'V - DỰ ÁN ĐÃ BÁO GIÁ VÀ ĐÃ NỘP HỒ SƠ' },
  { id: 'g6', label: 'VI - DỰ ÁN MỚI LIÊN HỆ VÀ ĐANG BÁO GIÁ' },
];

const ASSIGNEE_OPTIONS = [
  'Nguyễn Phú Quang',
  'Bùi Thị Duyên',
  'Bùi Phương Uyên',
];

interface EditTaskModalProps {
  isOpen: boolean;
  task: TaskItem | null;
  onClose: () => void;
  onSave: (updatedTask: TaskItem) => void;
}

export default function EditTaskModal({
  isOpen,
  task,
  onClose,
  onSave,
}: EditTaskModalProps) {
  const [formData, setFormData] = useState<Partial<TaskItem>>({});

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        groupId: task.groupId || 'g1',
        ghiChu: task.ghiChu || '',
      });
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.code) return;
    onSave(formData as TaskItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-[24px] shadow-2xl border border-slate-200/80 w-full max-w-[490px] overflow-hidden flex flex-col p-6 space-y-4 max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-lg font-bold text-slate-900">Sửa dòng dự án</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-3.5 overflow-y-auto pr-0.5 text-xs">
          {/* Nhóm dự án */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1 text-xs">
              Nhóm dự án
            </label>
            <div className="relative">
              <select
                value={formData.groupId || 'g1'}
                onChange={(e) => setFormData({ ...formData, groupId: e.target.value })}
                className="w-full h-10 px-3.5 pr-8 bg-[#f8fafc] border-2 border-[#406c89] rounded-xl text-xs font-semibold text-slate-800 focus:outline-none appearance-none cursor-pointer"
              >
                {GROUP_OPTIONS.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.label}
                  </option>
                ))}
              </select>
              <IconChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />
            </div>
          </div>

          {/* Phụ trách KD & Mã dự án */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 text-xs">
                Phụ trách KD
              </label>
              <div className="relative">
                <select
                  value={formData.assignee || 'Nguyễn Phú Quang'}
                  onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                  className="w-full h-10 px-3.5 pr-8 bg-[#f8fafc] border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#406c89] appearance-none cursor-pointer"
                >
                  {ASSIGNEE_OPTIONS.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <IconChevronDown
                  size={15}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 text-xs">
                Mã dự án
              </label>
              <input
                type="text"
                required
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full h-10 px-3.5 bg-[#f8fafc] border border-slate-200/80 rounded-xl text-xs font-mono font-medium text-slate-800 focus:bg-white focus:border-[#406c89] focus:outline-none transition-colors"
                placeholder="02-2025/DA-MHV"
              />
            </div>
          </div>

          {/* Tên dự án * */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1 text-xs">
              Tên dự án *
            </label>
            <input
              type="text"
              required
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full h-10 px-3.5 bg-[#f8fafc] border border-slate-200/80 rounded-xl text-xs font-bold text-slate-800 uppercase focus:bg-white focus:border-[#406c89] focus:outline-none transition-colors"
              placeholder="LUMIO PHUKET THAILAND"
            />
          </div>

          {/* Kích thước (mm) & Tỷ lệ */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 text-xs">
                Kích thước (mm)
              </label>
              <input
                type="text"
                value={formData.kichThuoc || ''}
                onChange={(e) => setFormData({ ...formData, kichThuoc: e.target.value })}
                className="w-full h-10 px-3.5 bg-[#f8fafc] border border-slate-200/80 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:border-[#406c89] focus:outline-none transition-colors"
                placeholder="2000×1000"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 text-xs">
                Tỷ lệ
              </label>
              <input
                type="text"
                value={formData.tyLe || ''}
                onChange={(e) => setFormData({ ...formData, tyLe: e.target.value })}
                className="w-full h-10 px-3.5 bg-[#f8fafc] border border-slate-200/80 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:border-[#406c89] focus:outline-none transition-colors"
                placeholder="1/200"
              />
            </div>
          </div>

          {/* Thời gian SX (ngày) & Ngày bắt đầu */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 text-xs">
                Thời gian SX (ngày)
              </label>
              <input
                type="number"
                value={formData.tgSx ?? ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tgSx: e.target.value ? parseInt(e.target.value, 10) : undefined,
                  })
                }
                className="w-full h-10 px-3.5 bg-[#f8fafc] border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#406c89] focus:outline-none transition-colors"
                placeholder="40"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 text-xs">
                Ngày bắt đầu
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.startDate || ''}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full h-10 px-3.5 pr-9 bg-[#f8fafc] border border-slate-200/80 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-[#406c89] focus:outline-none transition-colors"
                  placeholder="02/03/2025"
                />
                <IconCalendar
                  size={16}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Ngày kết thúc */}
          <div className="w-1/2 pr-1.5">
            <label className="block font-semibold text-slate-700 mb-1 text-xs">
              Ngày kết thúc
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.dueDate || ''}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full h-10 px-3.5 pr-9 bg-[#f8fafc] border border-slate-200/80 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-[#406c89] focus:outline-none transition-colors"
                placeholder="03/15/2025"
              />
              <IconCalendar
                size={16}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Ghi chú */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1 text-xs">
              Ghi chú
            </label>
            <input
              type="text"
              value={formData.ghiChu || ''}
              onChange={(e) => setFormData({ ...formData, ghiChu: e.target.value })}
              className="w-full h-10 px-3.5 bg-[#f8fafc] border border-slate-200/80 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-[#406c89] focus:outline-none transition-colors"
              placeholder=""
            />
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 bg-[#406c89] hover:bg-[#32566d] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
