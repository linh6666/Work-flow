"use client";

import React from 'react';
import { IconAlertTriangle, IconFileDescription, IconTrash, IconX } from '@tabler/icons-react';

export interface XoaCongViecModalProps {
  isOpen: boolean;
  taskTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function XoaCongViecModal({ isOpen, taskTitle, onClose, onConfirm }: XoaCongViecModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/65 p-4">
      <div className="w-full max-w-[448px] overflow-hidden rounded-lg border border-slate-200 bg-[#f8fafc] shadow-2xl">
        <div className="flex items-center justify-between px-6 pb-2 pt-4">
          <div className="flex items-center gap-2 text-[#cf2f2f]">
            <IconTrash size={17} strokeWidth={2} />
            <h3 className="text-lg font-semibold leading-none">Xác nhận xóa dòng công việc</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
            aria-label="Đóng modal"
          >
            <IconX size={16} strokeWidth={1.8} />
          </button>
        </div>

        <div className="space-y-3 px-6 pb-4 pt-2">
          <div className="flex items-start gap-2 text-[15px] leading-5 text-slate-700">
            <IconAlertTriangle size={17} className="mt-0.5 shrink-0 text-[#f59e0b]" strokeWidth={2} />
            <p>
              Bạn sắp xóa công việc <span className="font-bold text-slate-800">&quot;{taskTitle}&quot;</span>.
            </p>
          </div>

          <div className="rounded-lg border border-[#f2bd24] bg-[#fffdf0] px-3.5 py-2.5 text-[#9a5510]">
            <div className="flex items-center gap-2 text-[15px] font-medium">
              <IconFileDescription size={17} className="shrink-0 text-[#d97706]" strokeWidth={1.8} />
              <span>Có 1 báo cáo công việc đi kèm (1h).</span>
            </div>
            <p className="ml-6 mt-1 text-[13px] leading-4">
              Các báo cáo này sẽ được <span className="font-bold">chuyển vào thùng rác</span> (tự xóa vĩnh viễn sau 7 ngày, có thể khôi phục trước đó). Tiến độ dự án sẽ được tính lại.
            </p>
          </div>

          <p className="px-6 text-[13px] leading-4 text-slate-500">
            Hành động này có hiệu lực khi bạn nhấn Lưu. Trước khi lưu, bạn vẫn có thể khôi phục bằng nút &quot;Khôi phục&quot;.
          </p>
        </div>

        <div className="flex justify-end gap-2 px-6 pb-5 pt-0">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 rounded-md bg-[#f04444] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#dc3636]"
          >
            <IconTrash size={16} strokeWidth={2} />
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
