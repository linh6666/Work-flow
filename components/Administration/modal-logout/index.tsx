"use client";

import React, { useEffect } from 'react';
import { IconLogout, IconX } from '@tabler/icons-react';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutConfirmModalProps) {
  // Đóng modal khi bấm phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 transition-all"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 space-y-4 border border-slate-100 flex flex-col relative animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng góc phải */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <IconX size={18} />
        </button>

        {/* Header với Icon đăng xuất */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#406c89]/10 border border-[#406c89]/20 flex items-center justify-center text-[#406c89] shrink-0">
            <IconLogout size={22} className="stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Xác nhận đăng xuất
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Bạn có chắc chắn muốn rời khỏi hệ thống?
            </p>
          </div>
        </div>

        {/* Nội dung thông báo */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-xs text-slate-600 leading-relaxed">
          Phiên làm việc hiện tại của bạn sẽ kết thúc. Bạn sẽ cần nhập lại thông tin tài khoản để truy cập vào lần tiếp theo.
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer active:scale-95 bg-white"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-md shadow-[#406c89]/20 transition-all cursor-pointer bg-[#406c89] hover:bg-[#345870] active:scale-95 flex items-center gap-1.5"
          >
            <IconLogout size={14} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmModal;

