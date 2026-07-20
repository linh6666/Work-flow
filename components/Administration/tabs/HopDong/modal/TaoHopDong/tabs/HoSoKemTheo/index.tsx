"use client";

import React from 'react';

interface HoSoKemTheoTabProps {
  filesAttached?: string[];
  setFilesAttached?: React.Dispatch<React.SetStateAction<string[]>> | ((val: any) => void);
  [key: string]: any;
}

export default function HoSoKemTheoTab({
  filesAttached = [],
  setFilesAttached,
}: HoSoKemTheoTabProps) {
  
  const handleToggle = (itemTitle: string) => {
    if (!setFilesAttached) return;
    if (filesAttached.includes(itemTitle)) {
      setFilesAttached((prev: string[]) => prev.filter((i) => i !== itemTitle));
    } else {
      setFilesAttached((prev: string[]) => [...prev, itemTitle]);
    }
  };

  // Group 1: VN Tiếng Việt
  const tiengVietItems = [
    'Đề nghị Tạm ứng (Việt)',
    'Biên bản XN khối lượng HT (lần 1) - Việt',
    'Đề nghị Thanh toán lần 1 (Việt)',
    'Biên bản Nghiệm thu & Thanh lý HĐ (Việt)',
    'Đề nghị Thanh toán cuối cùng (Việt)',
    'Biên bản Bàn giao Mô hình (Việt)',
  ];

  // Group 2: GB English
  const englishItems = [
    'Request for Advance Payment (ENG)',
    'Model Completed Workload Confirmation (1st) - ENG',
    'Request for 1st Payment (ENG)',
    'Model Check & Take Over and Contract Liquidation (ENG)',
    'Request for Final Payment (ENG)',
    'Model Delivery Minutes (ENG)',
  ];

  // Group 3: VNGB Song ngữ
  const songNguItems = [
    'Phiếu Bảo hành Mô hình (Việt - ENG)',
  ];

  return (
    <div className="space-y-5 animate-fade-in text-xs text-slate-700">
      
      {/* Top Title Subtitle */}
      <p className="text-xs font-normal text-slate-500 leading-relaxed select-none">
        Chọn các mẫu hồ sơ để tự động tạo cùng hợp đồng (dữ liệu tự điền từ HĐ):
      </p>

      {/* GROUP 1: VN Tiếng Việt */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5 select-none">
          <span className="text-slate-400 font-normal">VN</span>
          <span>Tiếng Việt</span>
        </h4>

        <div className="space-y-2">
          {tiengVietItems.map((item) => {
            const isChecked = filesAttached.includes(item);
            return (
              <label
                key={item}
                onClick={() => handleToggle(item)}
                className={`p-3 border rounded-xl flex items-center gap-3 cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-amber-50/60 border-amber-300/80 shadow-2xs'
                    : 'bg-[#f8fafc]/90 border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="w-4 h-4 rounded border-slate-300 text-[#406c89] focus:ring-[#406c89] cursor-pointer"
                />
                <span className={`text-xs ${isChecked ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                  {item}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* GROUP 2: GB English */}
      <div className="space-y-2.5 pt-1">
        <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5 select-none">
          <span className="text-slate-400 font-normal">GB</span>
          <span>English</span>
        </h4>

        <div className="space-y-2">
          {englishItems.map((item) => {
            const isChecked = filesAttached.includes(item);
            return (
              <label
                key={item}
                onClick={() => handleToggle(item)}
                className={`p-3 border rounded-xl flex items-center gap-3 cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-amber-50/60 border-amber-300/80 shadow-2xs'
                    : 'bg-[#f8fafc]/90 border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="w-4 h-4 rounded border-slate-300 text-[#406c89] focus:ring-[#406c89] cursor-pointer"
                />
                <span className={`text-xs ${isChecked ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                  {item}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* GROUP 3: VNGB Song ngữ */}
      <div className="space-y-2.5 pt-1">
        <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5 select-none">
          <span className="text-slate-400 font-normal">VNGB</span>
          <span>Song ngữ</span>
        </h4>

        <div className="space-y-2">
          {songNguItems.map((item) => {
            const isChecked = filesAttached.includes(item);
            return (
              <label
                key={item}
                onClick={() => handleToggle(item)}
                className={`p-3 border rounded-xl flex items-center gap-3 cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-amber-50/60 border-amber-300/80 shadow-2xs'
                    : 'bg-[#f8fafc]/90 border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="w-4 h-4 rounded border-slate-300 text-[#406c89] focus:ring-[#406c89] cursor-pointer"
                />
                <span className={`text-xs ${isChecked ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                  {item}
                </span>
              </label>
            );
          })}
        </div>
      </div>

    </div>
  );
}
