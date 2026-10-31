"use client";

import "../../app/globals.css";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../api/apiLogin';
import { NotificationExtension } from '../../common/extension/NotificationExtension';
import { ForgotPasswordModal } from './modal-forgot-password';

// PasswordField component với toggle hiện/ẩn mật khẩu
function PasswordField({
  value,
  onChange,
  inputRef,
  onForgotPassword,
}: {
  value: string;
  onChange: (val: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  onForgotPassword?: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <label htmlFor="password" className="block text-[11px] font-bold tracking-widest text-slate-500 uppercase select-none">
          Mật khẩu <span className="text-red-500">*</span>
        </label>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-xs text-slate-400 hover:text-[#406c89] transition-colors cursor-pointer select-none"
        >
          Quên mật khẩu?
        </button>
      </div>
      <div className="relative">
        <input
          ref={inputRef}
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Nhập mật khẩu..."
          className="w-full h-12 px-4 pr-12 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
          aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
        >
          {showPassword ? (
            <svg className="w-4.5 h-4.5 w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default function PageLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Tự động chuyển tiếp nếu đã đăng nhập và có token
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (token) {
      window.location.href = '/Administration/tong-quan';
    } else {
      setIsCheckingAuth(false);
    }
  }, []);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!username.trim()) {
      NotificationExtension.Warn("Vui lòng nhập Email.");
      usernameRef.current?.focus();
      return;
    }

    if (!password) {
      NotificationExtension.Warn("Vui lòng nhập mật khẩu.");
      passwordRef.current?.focus();
      return;
    }

    setIsLoading(true);
    try {
      await loginUser(username.trim(), password);
      localStorage.setItem('user_email', username.trim());
      NotificationExtension.Success("Đăng nhập thành công! Đang chuyển hướng...");
      setTimeout(() => {
        window.location.href = '/Administration/tong-quan';
      }, 500);
    } catch (err: any) {
      const msg = err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản hoặc mật khẩu!';
      NotificationExtension.Fails(msg);
      // Xóa ô mật khẩu để nhập lại và trỏ chuột vào ô mật khẩu
      setPassword('');
      passwordRef.current?.focus();
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-sky-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100 font-sans">
      
      {/* PHẦN BÊN TRÁI: BANNER / ILLUSTRATION (Ẩn trên màn hình nhỏ) */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 p-12 bg-[#294b61] relative overflow-hidden border-r border-slate-800">
        
        {/* Lưới nền (Grid Pattern Background) */}
        <div className="absolute inset-0 z-0 select-none">
          <svg className="absolute w-full h-full text-slate-800/40" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
          {/* Radial Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/20 via-slate-950/70 to-indigo-950/90" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
        </div>

        {/* Logo Hệ thống */}
        

        {/* Khối hình ảnh mô phỏng UI Đăng nhập ở giữa */}
        <div className="flex justify-center items-center mb-2 z-10 select-none">
          <Image src="/logo/signin-hero.svg" alt="Workflow hero" width={400} height={400} className="w-full max-w-[400px] object-contain" priority />
        </div>
        {/* Nội dung chào mừng & Badge tính năng ở dưới cùng */}
        <div className="space-y-1 z-10 select-none text-center flex flex-col items-center w-full -mt-2">
          <div className="space-y-1">
           
            <h2 className="text-sm font-bold leading-snug">
              Đăng nhập để tiếp tục quản lý <br />
              <span className="text-[#0091ff]">quy trình công việc của bạn.</span>
            </h2>
          </div>
          
          {/* Các Badge tính năng */}
          <div className="flex flex-wrap items-center justify-center gap-1 text-[10px]">
            <span className="flex items-center gap-1 px-2.5 py-1 bg-slate-900/60 border border-slate-800 rounded-full text-slate-300 font-medium">
              {/* Shield Icon */}
              <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Bảo mật cao
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1 bg-slate-900/60 border border-slate-800 rounded-full text-slate-300 font-medium">
              {/* Zap Icon */}
              <svg className="w-3 h-3 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              Truy cập nhanh
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1 bg-slate-900/60 border border-slate-800 rounded-full text-slate-300 font-medium">
              {/* Monitor Icon */}
              <svg className="w-3 h-3 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              Đa nền tảng
            </span>
          </div>
        </div>
      </div>

      {/* PHẦN BÊN PHẢI: FORM ĐĂNG NHẬP */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 md:p-20 bg-white text-slate-900">
        
        {/* Logo phụ hiện trên Mobile */}
      

        {/* Khu vực Form chính */}
        <div className="my-auto max-w-md w-full mx-auto space-y-6">
          <div className="space-y-3">
            {/* Badge Chào mừng trở lại */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-500 rounded-full text-xs font-semibold select-none">
              <svg className="w-3.5 h-3.5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Chào mừng trở lại
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#294b61]">
              Đăng nhập
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              Nhập tên đăng nhập và mật khẩu để truy cập hệ thống.
            </p>
          </div>

          {/* Form đăng nhập */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Tên đăng nhập */}
            <div className="space-y-1.5">
              <label htmlFor="username" className="block text-[11px] font-bold tracking-widest text-slate-500 uppercase select-none">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                ref={usernameRef}
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="nguyenvana@gmail.com"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Mật khẩu */}
            <PasswordField value={password} onChange={setPassword} inputRef={passwordRef} onForgotPassword={() => setIsForgotPasswordOpen(true)} />

            {/* Nút Đăng nhập */}
            <div className="pt-1">
              <button
                id="btn-login"
                type="submit"
                disabled={isLoading}
                className={`w-full h-12 px-5 rounded-xl bg-[#294b61] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 select-none ${
                  isLoading
                    ? 'opacity-75 cursor-wait'
                    : 'hover:bg-[#1e3a4f] hover:shadow-lg cursor-pointer active:scale-[0.99]'
                }`}
              >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Đang đăng nhập...</span>
                </>
              ) : (
                <>
                  {/* Arrow right icon */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  <span>Đăng nhập</span>
                </>
              )}
            </button>
            </div>
          </form>

          {/* Link đăng ký */}
          <div className="pt-1">
            <p className="text-sm text-center text-slate-500">
              Chưa có tài khoản?{' '}
              <a href="/sign-up" className="font-bold text-[#294b61] hover:underline">Đăng ký ngay</a>
            </p>
          </div>

        </div>
      </div>

      {/* MODAL QUÊN MẬT KHẨU */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </div>
  );
}
