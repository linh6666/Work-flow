"use client";

import React, { useEffect } from 'react';
import { IconAlertTriangle, IconX, IconTrash } from '@tabler/icons-react';
import { FullTaskItem } from '../../index';

interface XoaCongViecModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: FullTaskItem | null;
  onConfirmDelete: (stt: number) => void;
}

export default function XoaCongViecModal({
  isOpen,
  onClose,
  task,
  onConfirmDelete,
}: XoaCongViecModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  const handleConfirm = () => {
    onConfirmDelete(task.stt);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-3 sm:p-4 animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-sm sm:max-w-md p-5 sm:p-6 space-y-4 text-slate-700 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
              <IconAlertTriangle size={18} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Xác nhận xóa công việc
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Nhóm: <span className="font-semibold text-slate-600">{task.group}</span> · STT #{task.stt}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Đóng"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Content Message */}
        <div className="space-y-2">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Bạn có chắc chắn muốn xóa công việc{' '}
            <span className="font-bold text-slate-900">"{task.title}"</span>?
          </p>
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-[11px] space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span>Trạng thái:</span>
              <span className="font-semibold text-slate-700">{task.status}</span>
            </div>
            {task.assignee && (
              <div className="flex items-center justify-between text-slate-500">
                <span>Nhân sự phụ trách:</span>
                <span className="font-semibold text-slate-700">{task.assignee}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-slate-500">
              <span>Thời gian dự kiến:</span>
              <span className="font-semibold text-slate-700">{task.startDate} → {task.endDate} ({task.gioDk})</span>
            </div>
          </div>
          <p className="text-[11px] text-rose-500 font-medium italic">
            * Hành động này sẽ xóa dòng công việc khỏi danh sách và không thể hoàn tác.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 sm:px-4 py-1.5 border border-slate-200/90 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 text-xs font-semibold rounded-lg transition-all cursor-pointer shadow-2xs"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-1.5 bg-[#406c89] hover:bg-[#345972] active:scale-95 text-white text-xs font-bold rounded-lg shadow-sm shadow-[#406c89]/20 transition-all cursor-pointer"
          >
            <IconTrash size={14} />
            <span>Xác nhận xóa</span>
          </button>
        </div>
      </div>
    </div>
  );
}

