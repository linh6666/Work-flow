"use client";

import "../../app/globals.css";
import React, { useState } from 'react';
import Image from 'next/image';

export default function PageLogin() {
  const [email, setEmail] = useState('');
  // Removed password toggle state (no longer needed)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Forgot password request for:", { email });
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100 font-sans">
      
      {/* PHẦN BÊN TRÁI: BANNER / ILLUSTRATION (Ẩn trên màn hình nhỏ) */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 p-12 bg-slate-950 relative overflow-hidden border-r border-slate-800">
        
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
          <Image src="/logo/hero-benefits.svg" alt="Workflow hero" width={550} height={550} className="w-full max-w-[550px] object-contain" priority />
        </div>
        {/* Nội dung chào mừng & Badge tính năng ở dưới cùng */}
        <div className="space-y-1 z-10 select-none text-center flex flex-col items-center w-full -mt-2">
         
          
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
        <div className="my-auto max-w-md w-full mx-auto space-y-8">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-xs font-semibold select-none">
              {/* User icon */}
              <svg className="w-3 h-3 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Chào mừng trở lại
            </span>
           <h1 className="text-3xl font-extrabold tracking-tight text-[#294b61]">
  Quên mật khẩu
</h1>
            <p className="text-sm text-slate-500">Nhập địa chỉ email của bạn để nhận liên kết khôi phục mật khẩu.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-sm"
                placeholder="Nhập email..."
              />
            </div>

            {/* Nút Đăng nhập chính */}
            <button 
              type="submit"
              className="w-full bg-[#294b61] hover:bg-[#007ee6] text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-sky-500/10 transition-all flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer text-sm"
            >
              {/* Sign in Icon */}
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
              </svg>
              Tiếp tục
            </button>
          </form>

          {/* Các phương thức Đăng nhập mở rộng */}
     

          {/* Đăng ký */}
          <p className="text-center text-sm text-slate-500 select-none">
            Đã nhớ mật khẩu?{' '}
           <a
  href="/sign-in"
  className="font-bold text-[#294b61] hover:underline"
>
  Đăng nhập ngay
</a>
          </p>

          {/* Làm mới trình duyệt */}
       
        </div>
      </div>

    </div>
  );
}
