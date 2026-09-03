"use client";

import "../../app/globals.css";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function PageLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    // Lưu email vào localStorage để Layout đọc
    if (email) {
      localStorage.setItem('user_email', email);
    }
    setTimeout(() => {
      router.push('/Administration/tong-quan');
    }, 800);
  };

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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-xs font-semibold select-none">
              <svg className="w-3.5 h-3.5 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Xác thực an toàn qua Google
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#294b61]">
              Đăng nhập
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              Nhấp vào nút bên dưới để liên kết và đăng nhập nhanh chóng bằng tài khoản Google của bạn.
            </p>
          </div>



          {/* Nút liên kết sang Google (Mô phỏng luồng đăng nhập) */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className={`w-full h-12 px-5 py-3 border border-slate-300 bg-white text-slate-700 font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-3 select-none ${
                isLoading
                  ? 'opacity-80 cursor-wait bg-slate-50'
                  : 'hover:border-slate-400 hover:bg-slate-50 hover:shadow-md cursor-pointer active:scale-[0.99]'
              }`}
            >
              {isLoading ? (
                <>
                  {/* Spinner hiệu ứng đang kết nối */}
                  <svg className="animate-spin h-5 w-5 text-[#4285F4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-sm font-semibold text-slate-600">
                    Đang kết nối tài khoản Google...
                  </span>
                </>
              ) : (
                <>
                  {/* Logo Google 4 màu chuẩn SVG */}
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="text-sm font-bold text-slate-700 hover:text-slate-900">
                    Đăng nhập với Google
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Điều khoản & Ghi chú */}
          <div className="pt-2">
            <p className="text-xs text-center text-slate-400 leading-relaxed">
              Bằng việc đăng nhập, bạn đồng ý với{' '}
              <a href="#" className="underline hover:text-slate-600">Điều khoản dịch vụ</a>{' '}
              và{' '}
              <a href="#" className="underline hover:text-slate-600">Chính sách quyền riêng tư</a>{' '}
              của hệ thống.
            </p>
          </div>


        </div>
      </div>

    </div>
  );
}
