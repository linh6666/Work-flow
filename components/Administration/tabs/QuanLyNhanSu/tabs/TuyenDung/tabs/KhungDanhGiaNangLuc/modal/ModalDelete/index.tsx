"use client";

import React, { useEffect } from "react";
import { IconTrash, IconX, IconAlertTriangle } from "@tabler/icons-react";
import { CompetencyFrameworkItem } from "@/api/apiGetCompetencyFramework";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CompetencyFrameworkItem | null;
  onConfirm: (item: CompetencyFrameworkItem) => void;
}

export default function ModalDeleteKhungDanhGia({
  isOpen,
  onClose,
  data,
  onConfirm,
}: DeleteModalProps) {
  // Đóng modal khi bấm Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 space-y-5 flex flex-col relative"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <IconX size={18} />
        </button>

        {/* Icon & Cảnh báo */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100 shadow-2xs">
            <IconAlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Xác nhận xóa vị trí
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Hành động này không thể hoàn tác sau khi xác nhận.
            </p>
          </div>
        </div>

        {/* Chi tiết vị trí cần xóa */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Mã vị trí:</span>
            <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
              {data.position_code}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Chức danh:</span>
            <span className="font-semibold text-slate-700">
              {data.position_title}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Phòng ban:</span>
            <span className="text-slate-600">{data.department}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Số tiêu chuẩn:</span>
            <span className="font-medium text-slate-700">
              {data.criteria.length} tiêu chí
            </span>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex items-center justify-end gap-2.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(data);
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <IconTrash size={15} />
            <span>Xác nhận xóa</span>
          </button>
        </div>
      </div>
    </div>
  );
}
