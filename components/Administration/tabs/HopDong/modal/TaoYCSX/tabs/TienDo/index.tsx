"use client";

import React, { useState } from 'react';

export default function TienDoTab() {
  const todayISO = new Date().toISOString().split('T')[0];

  const [tgBatDau, setTgBatDau] = useState(todayISO);
  const [tgKetThuc, setTgKetThuc] = useState('');
  const [tongThoiGian, setTongThoiGian] = useState('');
  const [nghiemThu1, setNghiemThu1] = useState('');
  const [nghiemThuCuoi, setNghiemThuCuoi] = useState('');
  const [duKienVC, setDuKienVC] = useState('');
  const [duKienLD, setDuKienLD] = useState('');
  const [soNhanSu, setSoNhanSu] = useState('');
  const [touched, setTouched] = useState(false);

  const inputDate = "w-full text-xs bg-white border border-slate-200/90 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all cursor-pointer";

  return (
    <div className="space-y-4 text-xs text-slate-700 px-1 no-scrollbar">

      {/* Thời gian bắt đầu & Thời gian kết thúc */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Thời gian bắt đầu</label>
          <input
            type="date"
            value={tgBatDau}
            onChange={(e) => setTgBatDau(e.target.value)}
            className={inputDate}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Thời gian kết thúc</label>
          <input
            type="date"
            value={tgKetThuc}
            onChange={(e) => setTgKetThuc(e.target.value)}
            className={inputDate}
          />
        </div>
      </div>

      {/* Tổng thời gian thực hiện (ngày) */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-700">
          Tổng thời gian thực hiện (ngày)
        </label>
        <input
          type="number"
          min={0}
          value={tongThoiGian}
          onChange={(e) => setTongThoiGian(e.target.value)}
          placeholder=""
          className="w-full text-xs bg-white border border-slate-200/90 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
        />
      </div>

      {/* Nghiệm thu lần 1 & Nghiệm thu cuối cùng */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Nghiệm thu lần 1</label>
          <input
            type="date"
            value={nghiemThu1}
            onChange={(e) => setNghiemThu1(e.target.value)}
            className={inputDate}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Nghiệm thu cuối cùng</label>
          <input
            type="date"
            value={nghiemThuCuoi}
            onChange={(e) => setNghiemThuCuoi(e.target.value)}
            className={inputDate}
          />
        </div>
      </div>

      {/* Dự kiến vận chuyển & Dự kiến lắp đặt */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Dự kiến vận chuyển</label>
          <input
            type="date"
            value={duKienVC}
            onChange={(e) => setDuKienVC(e.target.value)}
            className={inputDate}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Dự kiến lắp đặt</label>
          <input
            type="date"
            value={duKienLD}
            onChange={(e) => setDuKienLD(e.target.value)}
            className={inputDate}
          />
        </div>
      </div>

      {/* Số nhân sự đi lắp đặt */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-700">
          Số nhân sự đi lắp đặt <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={soNhanSu}
          onChange={(e) => setSoNhanSu(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="VD: 3 người"
          className={`w-full text-xs bg-white border rounded-lg px-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 transition-all ${
            touched && !soNhanSu
              ? 'border-red-400 focus:ring-red-400'
              : 'border-slate-200/90 focus:ring-[#406c89]'
          }`}
        />
        {touched && !soNhanSu && (
          <p className="text-[11px] text-red-500 font-medium mt-0.5">
            Vui lòng nhập số nhân sự đi lắp đặt
          </p>
        )}
      </div>

    </div>
  );
}
