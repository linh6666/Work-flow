"use client";

import React, { useEffect } from "react";
import { IconTrash, IconX, IconAlertTriangle } from "@tabler/icons-react";
import { InterviewEvaluationRecord } from "@/api/apiGetInterviewEvaluation";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InterviewEvaluationRecord | null;
  onConfirm: (item: InterviewEvaluationRecord) => void;
}

export default function ModalXoaPheDuyet({
  isOpen,
  onClose,
  data,
  onConfirm,
}: DeleteModalProps) {
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

        {/* Nội dung cảnh báo */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-xl shrink-0">
            <IconAlertTriangle size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-slate-800">
              Xác nhận xóa bản ghi
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Bạn có chắc chắn muốn xóa bản ghi phê duyệt kết quả phỏng vấn của ứng viên{" "}
              <strong className="text-slate-700 font-semibold">
                &quot;{data.candidate_name}&quot;
              </strong>{" "}
              (Vị trí: {data.position || "—"})? Thao tác này không thể hoàn tác.
            </p>
          </div>
        </div>

        {/* Hành động */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(data);
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
          >
            <IconTrash size={15} />
            <span>Xác nhận xóa</span>
          </button>
        </div>
      </div>
    </div>
  );
}
