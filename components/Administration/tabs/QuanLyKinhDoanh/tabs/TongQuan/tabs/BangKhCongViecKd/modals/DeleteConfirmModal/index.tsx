"use client";

import React from 'react';
import { IconAlertTriangle, IconX, IconTrash } from '@tabler/icons-react';
import { TaskItem } from '../EditTaskModal';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  task: TaskItem | null;
  onClose: () => void;
  onConfirm: (taskId: string) => void;
}

export default function DeleteConfirmModal({
  isOpen,
  task,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-rose-50/50">
          <div className="flex items-center gap-2 text-rose-600">
            <IconAlertTriangle size={20} />
            <h3 className="font-bold text-sm text-rose-950">Xác nhận xóa dòng công việc</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3 text-xs">
          <p className="text-slate-600 leading-relaxed">
            Bạn có chắc chắn muốn xóa dòng công việc này ra khỏi kế hoạch công việc không?
          </p>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1 font-mono">
            <p className="font-bold text-slate-900 text-xs">{task.title}</p>
            <p className="text-[11px] text-slate-500">
              Mã: <span className="font-semibold text-slate-700">{task.code}</span> | Phụ trách: <span className="font-semibold text-slate-700">{task.assignee}</span>
            </p>
          </div>

          <p className="text-[11px] text-rose-500 font-medium italic">
            * Lưu ý: Hành động này không thể hoàn tác sau khi thực hiện.
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-slate-100 bg-[#fafbfc]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(task.id);
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-sm"
          >
            <IconTrash size={14} />
            <span>Xác nhận Xóa</span>
          </button>
        </div>
      </div>
    </div>
  );
}
