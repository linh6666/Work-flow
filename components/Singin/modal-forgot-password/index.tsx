"use client";

import React, { useState, useRef, useEffect } from 'react';
import { IconMail, IconX, IconSend } from '@tabler/icons-react';
import { sendPasswordResetEmail } from '@/api/apiSendEmail';
import { NotificationExtension } from '@/common/extension/NotificationExtension';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Tự động focus vào ô email khi mở modal
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Đóng modal khi bấm Escape
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      NotificationExtension.Warn("Vui lòng nhập địa chỉ Email.");
      emailInputRef.current?.focus();
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      NotificationExtension.Warn("Email không đúng định dạng.");
      setEmail('');
      emailInputRef.current?.focus();
      return;
    }

    setIsLoading(true);
    try {
      const res = await sendPasswordResetEmail(email.trim());
      const msg = res?.message || "Đã gửi yêu cầu khôi phục mật khẩu! Vui lòng kiểm tra hộp thư email của bạn.";
      NotificationExtension.Success(msg);
      onClose();
    } catch (err: any) {
      const errMsg = err?.message || "Gửi yêu cầu thất bại. Vui lòng thử lại!";
      NotificationExtension.Fails(errMsg);
      setEmail('');
      emailInputRef.current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

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
          type="button"
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <IconX size={18} />
        </button>

        {/* Header với Icon */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#406c89]/10 border border-[#406c89]/20 flex items-center justify-center text-[#406c89] shrink-0">
            <IconMail size={22} className="stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Quên mật khẩu?
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Nhập email đăng ký để nhận liên kết khôi phục
            </p>
          </div>
        </div>

        {/* Form nhập email */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <label htmlFor="recovery-email" className="block text-[11px] font-bold tracking-widest text-slate-500 uppercase select-none">
              Địa chỉ Email <span className="text-red-500">*</span>
            </label>
            <input
              ref={emailInputRef}
              id="recovery-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nguyenvana@gmail.com"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#406c89] focus:border-transparent transition-all"
            />
          </div>

          <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 border border-slate-200/70 rounded-xl p-3">
            Hệ thống sẽ gửi email hướng dẫn tạo lại mật khẩu mới đến địa chỉ email này nếu tài khoản tồn tại trong hệ thống.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer active:scale-95 bg-white"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 rounded-xl text-white text-xs font-bold shadow-md shadow-[#406c89]/20 transition-all flex items-center gap-1.5 select-none ${
                isLoading
                  ? 'bg-[#406c89]/80 cursor-wait'
                  : 'bg-[#406c89] hover:bg-[#345870] active:scale-95 cursor-pointer'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Đang gửi...</span>
                </>
              ) : (
                <>
                  <IconSend size={14} />
                  <span>Gửi yêu cầu</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;

