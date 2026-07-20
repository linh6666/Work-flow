"use client";

import React, { useState } from 'react';

interface TinhTienThanhToanTabProps {
  tongSauThue?: number;
  [key: string]: any;
}

export default function TinhTienThanhToanTab({
  tongSauThue: propTongSauThue = 0,
}: TinhTienThanhToanTabProps) {
  // Section 1: Tạm ứng
  const [tamUngPercent, setTamUngPercent] = useState<number>(50);
  const [tamUngAmountInput, setTamUngAmountInput] = useState<string>('0');

  // Section 2: Thanh toán lần 1
  const [lan1Percent, setLan1Percent] = useState<number>(40);
  const [lan1AmountInput, setLan1AmountInput] = useState<string>('0');
  const [lan1DieuKhoan, setLan1DieuKhoan] = useState('sau khi đạt 90% khối lượng công việc');

  // Section 3: Thanh toán cuối cùng
  const [cuoiCungPercent, setCuoiCungPercent] = useState<number>(10);
  const [cuoiCungAmountInput, setCuoiCungAmountInput] = useState<string>('0');
  const [cuoiCungDieuKhoan, setCuoiCungDieuKhoan] = useState('sau khi bàn giao và nghiệm thu hoàn thành');

  const formattedTongSauThue = propTongSauThue.toLocaleString('vi-VN');

  return (
    <div className="space-y-4 animate-fade-in text-xs text-slate-700">
      
      {/* Top Banner Card: Tổng giá trị HĐ (sau thuế) */}
      <div className="bg-[#f4f6ff]/70 border border-[#dbe0fe] rounded-2xl p-4 sm:p-5 select-none space-y-1">
        <div className="text-xs font-bold text-[#406c89]">
          Tổng giá trị HĐ (sau thuế)
        </div>
        <div className="text-xl sm:text-2xl font-extrabold text-[#2C4159]">
          {formattedTongSauThue} VND
        </div>
      </div>

      {/* SECTION 1: TẠM ỨNG (50%) */}
      <div className="bg-[#f8fafc]/80 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
        
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-800 text-xs">Tạm ứng</span>
          <span className="font-bold text-[#406c89] text-xs">{tamUngPercent}%</span>
        </div>

        {/* Amount Input */}
        <div className="space-y-1">
          <input
            type="text"
            value={tamUngAmountInput}
            onChange={(e) => setTamUngAmountInput(e.target.value)}
            placeholder="0"
            className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] font-mono transition-all"
          />
        </div>

        {/* Tỷ lệ: */}
        <div className="space-y-1">
          <label className="block text-xs font-normal text-slate-500">
            Tỷ lệ:
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={tamUngPercent}
            onChange={(e) => setTamUngPercent(parseFloat(e.target.value) || 0)}
            className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] font-mono transition-all"
          />
        </div>

      </div>

      {/* SECTION 2: THANH TOÁN LẦN 1 (40%) */}
      <div className="bg-[#f8fafc]/80 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
        
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-800 text-xs">Thanh toán lần 1</span>
          <span className="font-bold text-[#406c89] text-xs">{lan1Percent}%</span>
        </div>

        {/* Amount Input */}
        <div className="space-y-1">
          <input
            type="text"
            value={lan1AmountInput}
            onChange={(e) => setLan1AmountInput(e.target.value)}
            placeholder="0"
            className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] font-mono transition-all"
          />
        </div>

        {/* Tỷ lệ: */}
        <div className="space-y-1">
          <label className="block text-xs font-normal text-slate-500">
            Tỷ lệ:
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={lan1Percent}
            onChange={(e) => setLan1Percent(parseFloat(e.target.value) || 0)}
            className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] font-mono transition-all"
          />
        </div>

        {/* Điều kiện: */}
        <div className="space-y-1">
          <label className="block text-xs font-normal text-slate-500">
            Điều kiện:
          </label>
          <input
            type="text"
            value={lan1DieuKhoan}
            onChange={(e) => setLan1DieuKhoan(e.target.value)}
            placeholder="sau khi đạt 90% khối lượng công việc"
            className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
          />
        </div>

      </div>

      {/* SECTION 3: THANH TOÁN CUỐI CÙNG (10%) */}
      <div className="bg-[#f8fafc]/80 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
        
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-800 text-xs">Thanh toán cuối cùng</span>
          <span className="font-bold text-[#406c89] text-xs">{cuoiCungPercent}%</span>
        </div>

        {/* Amount Input */}
        <div className="space-y-1">
          <input
            type="text"
            value={cuoiCungAmountInput}
            onChange={(e) => setCuoiCungAmountInput(e.target.value)}
            placeholder="0"
            className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] font-mono transition-all"
          />
        </div>

        {/* Tỷ lệ: */}
        <div className="space-y-1">
          <label className="block text-xs font-normal text-slate-500">
            Tỷ lệ:
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={cuoiCungPercent}
            onChange={(e) => setCuoiCungPercent(parseFloat(e.target.value) || 0)}
            className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] font-mono transition-all"
          />
        </div>

        {/* Điều kiện: */}
        <div className="space-y-1">
          <label className="block text-xs font-normal text-slate-500">
            Điều kiện:
          </label>
          <input
            type="text"
            value={cuoiCungDieuKhoan}
            onChange={(e) => setCuoiCungDieuKhoan(e.target.value)}
            placeholder="sau khi bàn giao và nghiệm thu hoàn thành"
            className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
          />
        </div>

      </div>

    </div>
  );
}
