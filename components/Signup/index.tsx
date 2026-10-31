"use client";

import "../../app/globals.css";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { registerUser } from '../../api/apiRegister';
import { NotificationExtension } from '../../common/extension/NotificationExtension';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  // Chặn người dùng đã đăng nhập quay lại trang đăng ký
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (token) {
      window.location.href = '/Administration/tong-quan';
    } else {
      setIsCheckingAuth(false);
    }
  }, []);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      NotificationExtension.Warn('Vui lòng nhập họ và tên.');
      fullNameRef.current?.focus();
      return;
    }
    if (!email.trim()) {
      NotificationExtension.Warn('Vui lòng nhập email.');
      emailRef.current?.focus();
      return;
    }
    if (!email.includes('@')) {
      NotificationExtension.Warn('Email không đúng định dạng.');
      setEmail('');
      emailRef.current?.focus();
      return;
    }
    if (!password) {
      NotificationExtension.Warn('Vui lòng nhập mật khẩu.');
      passwordRef.current?.focus();
      return;
    }
    if (password.length < 8) {
      NotificationExtension.Warn('Mật khẩu phải có ít nhất 8 ký tự.');
      // Xóa ô mật khẩu sai để nhập lại
      setPassword('');
      passwordRef.current?.focus();
      return;
    }
    if (!phone.trim()) {
      NotificationExtension.Warn('Vui lòng nhập số điện thoại.');
      phoneRef.current?.focus();
      return;
    }
    if (!/^[0-9+]{9,15}$/.test(phone.trim())) {
      NotificationExtension.Warn('Số điện thoại không hợp lệ (từ 9 đến 15 chữ số).');
      // Xóa ô số điện thoại sai để nhập lại
      setPhone('');
      phoneRef.current?.focus();
      return;
    }

    setIsLoading(true);
    try {
      await registerUser(
        email.trim(),
        fullName.trim() || undefined,
        password,
        phone.trim() || undefined
      );
      NotificationExtension.Success('Đăng ký tài khoản thành công!');
      setTimeout(() => {
        router.push('/sign-in');
      }, 1500);
    } catch (err: any) {
      const msg = err.message || 'Đăng ký thất bại. Vui lòng thử lại!';
      NotificationExtension.Fails(msg);
      if (msg.toLowerCase().includes('email') || msg.toLowerCase().includes('exists')) {
        setEmail('');
        emailRef.current?.focus();
      } else {
        setPassword('');
        passwordRef.current?.focus();
      }
    } finally {
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
     <div className="hidden lg:flex flex-col justify-center w-1/2 p-12 bg-[#294b61] relative overflow-hidden border-r border-[#3a647f]">
        
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
        

        {/* Khối hình ảnh mô phỏng UI Đăng ký ở giữa */}
        <div className="flex justify-center items-center mb-2 z-10 select-none">
          <Image src="/logo/signup-hero.svg" alt="Workflow hero" width={380} height={380} className="w-full max-w-[380px] object-contain" priority />
        </div>
        {/* Nội dung chào mừng & Badge tính năng ở dưới cùng */}
        <div className="space-y-1 z-10 select-none text-center flex flex-col items-center w-full -mt-2">
          <div className="space-y-1">
           
            <h2 className="text-sm font-bold leading-snug">
              Đăng ký để tiếp tục quản lý <br />
              <span className="text-[#0091ff]">quy trình công việc của bạn.</span>
            </h2>
          </div>
          
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
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-4 sm:p-6 md:p-8 bg-white text-slate-900">
        
        {/* Logo phụ hiện trên Mobile */}
      

        {/* Khu vực Form chính */}
        <div className="my-auto max-w-md w-full mx-auto space-y-4">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-xs font-semibold select-none">
              {/* User icon */}
              <svg className="w-3 h-3 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Tạo tài khoản mới
            </span>
         <h1 className="text-2xl font-extrabold tracking-tight text-[#294b61]">
  Đăng ký
</h1>
            <p className="text-xs text-slate-500">Nhập thông tin tài khoản để đăng ký.</p>
          </div>


            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Họ và tên */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">Họ và tên <span className="text-red-500">*</span></label>
                <input
                  ref={fullNameRef}
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border-2 border-slate-200 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-sm"
                  placeholder="Nhập họ và tên..."
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">Email <span className="text-red-500">*</span></label>
                <input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border-2 border-slate-200 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-sm"
                  placeholder="name@example.com"
                />
              </div>

              {/* Mật khẩu */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">Mật khẩu <span className="text-red-500">*</span></label>
                </div>
                <div className="relative">
                  <input 
                    ref={passwordRef}
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border-2 border-slate-200 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all pr-10 font-medium text-sm"
                    placeholder="Tối thiểu 8 ký tự..."
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
                  >
                    {showPassword ? (
                      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Số điện thoại */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">Số điện thoại <span className="text-red-500">*</span></label>
                <input
                  ref={phoneRef}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border-2 border-slate-200 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-sm"
                  placeholder="Nhập số điện thoại..."
                  required
                />
              </div>

              {/* Nút Đăng ký */}
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#294b61] hover:bg-[#007ee6] text-white font-semibold py-2.5 px-3 rounded-xl shadow-lg shadow-sky-500/10 transition-all flex items-center justify-center gap-2 active:scale-[0.99] text-sm ${
                isLoading ? 'opacity-70 cursor-wait' : 'cursor-pointer'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Đang xử lý đăng ký...</span>
                </>
              ) : (
                <>
                  {/* User plus Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"/><path d="M16 19h6"/><path d="M19 16v6"/><path d="M6 21v-2a4 4 0 0 1 4 -4h4"/></svg>
                  <span>Đăng ký</span>
                </>
              )}
            </button>
          </form>

          {/* Các phương thức Đăng nhập mở rộng */}
     

          {/* Đăng ký */}
          <p className="text-center text-sm text-slate-500 select-none">
            Đã có tài khoản?{' '}
         <a href="/sign-in" className="font-bold text-[#294b61] hover:underline">
  Đăng nhập ngay
</a>
          </p>

          {/* Làm mới trình duyệt */}
        
        </div>
      </div>

    </div>
  );
}
