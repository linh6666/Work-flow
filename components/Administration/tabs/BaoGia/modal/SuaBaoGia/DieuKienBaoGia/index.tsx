"use client";

import React from 'react';
import { IconPlus, IconTrash } from '@tabler/icons-react';

export interface DieuKienItem {
  id: string;
  tieuDe: string;
  noiDung: string;
}

interface DieuKienBaoGiaTabProps {
  thoiGianSanXuat: number;
  setThoiGianSanXuat: (v: number) => void;
  baoHanhThang: number;
  setBaoHanhThang: (v: number) => void;
  phuongThucThanhToan: string;
  setPhuongThucThanhToan: (v: string) => void;
  
  dieuKienList: DieuKienItem[];
  onAddDieuKien: () => void;
  onUpdateDieuKien: (id: string, field: keyof DieuKienItem, value: string) => void;
  onDeleteDieuKien: (id: string) => void;
}

export default function DieuKienBaoGiaTab({
  thoiGianSanXuat,
  setThoiGianSanXuat,
  baoHanhThang,
  setBaoHanhThang,
  phuongThucThanhToan,
  setPhuongThucThanhToan,
  dieuKienList,
  onAddDieuKien,
  onUpdateDieuKien,
  onDeleteDieuKien,
}: DieuKienBaoGiaTabProps) {
  return (
    <div className="space-y-4 animate-fade-in text-xs text-slate-700">
      
      {/* 1. TOP PRODUCTION TIME & WARRANTY FIELDS */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-600 font-bold mb-1">Thời gian sản xuất (ngày làm việc)</label>
          <input
            type="number"
            min="1"
            required
            value={thoiGianSanXuat}
            onChange={(e) => setThoiGianSanXuat(parseInt(e.target.value) || 60)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
          <span className="text-[10px] text-slate-400 font-medium mt-1 block">
            Kể từ ngày tạm ứng và nhận đầy đủ bản vẽ
          </span>
        </div>
        <div>
          <label className="block text-slate-600 font-bold mb-1">Bảo hành (tháng)</label>
          <input
            type="number"
            min="1"
            required
            value={baoHanhThang}
            onChange={(e) => setBaoHanhThang(parseInt(e.target.value) || 18)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
          <span className="text-[10px] text-slate-400 font-medium mt-1 block">
            Kể từ ngày bàn giao mô hình
          </span>
        </div>
      </div>

      {/* 2. PAYMENT METHOD TEXTAREA */}
      <div>
        <label className="block text-slate-600 font-bold mb-1">Phương thức thanh toán</label>
        <textarea
          value={phuongThucThanhToan}
          onChange={(e) => setPhuongThucThanhToan(e.target.value)}
          rows={3}
          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
        />
      </div>

      {/* 3. CONDITIONS DYNAMIC LIST SECTION */}
      <div className="border-t border-slate-100 pt-3.5 space-y-3">
        <div className="flex items-center justify-between pb-1">
          <span className="text-sm font-bold text-slate-800">Điều kiện báo giá</span>
          <button
            type="button"
            onClick={onAddDieuKien}
            className="flex items-center gap-1.5 px-3 py-1.8 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 cursor-pointer shadow-xs text-xs h-9"
          >
            <IconPlus size={14} className="text-slate-500" />
            Thêm điều kiện
          </button>
        </div>

        {/* Dynamic Cards List */}
        <div className="space-y-4 max-h-[35vh] overflow-y-auto no-scrollbar pr-1">
          {dieuKienList.map((item, idx) => (
            <div key={item.id} className="p-4 border border-slate-200 rounded-xl bg-white flex flex-col gap-3 relative">
              <button
                type="button"
                onClick={() => onDeleteDieuKien(item.id)}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-all cursor-pointer"
                title="Xóa điều kiện"
              >
                <IconTrash size={15} />
              </button>

              <div className="space-y-3">
                {/* Title Input */}
                <div className="pr-6">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Tiêu đề</label>
                  <input
                    type="text"
                    required
                    value={item.tieuDe}
                    onChange={(e) => onUpdateDieuKien(item.id, 'tieuDe', e.target.value)}
                    placeholder={`Ví dụ: ${idx + 1}. Báo giá dựa trên hồ sơ`}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] text-slate-800 font-semibold"
                  />
                </div>

                {/* Content Textarea */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nội dung</label>
                  <textarea
                    required
                    value={item.noiDung}
                    onChange={(e) => onUpdateDieuKien(item.id, 'noiDung', e.target.value)}
                    rows={4}
                    placeholder="Mô tả nội dung chi tiết của điều kiện..."
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] text-slate-700 leading-relaxed"
                  />
                </div>
              </div>

            </div>
          ))}

          {dieuKienList.length === 0 && (
            <div className="p-8 text-center border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
              Chưa có điều kiện bổ sung nào. Hãy click "Thêm điều kiện" để khai báo chi tiết.
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
