"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconFileText, IconCheck } from '@tabler/icons-react';

import ChinhSuaThongTinChungTab from './tabs/ThongTinChung';
import ChinhSuaYeuCauKyThuatTab from './tabs/YeuCauKyThuat';
import ChinhSuaTienDoTab from './tabs/TienDo';
import { YcsxItem } from '../../index';

interface ChinhSuaYCSXModalProps {
  isOpen: boolean;
  itemData: YcsxItem | null;
  onClose: () => void;
  onSaveSuccess?: (updatedData: YcsxItem) => void;
}

export default function ChinhSuaYCSXModal({
  isOpen,
  itemData,
  onClose,
  onSaveSuccess,
}: ChinhSuaYCSXModalProps) {
  const [activeTab, setActiveTab] = useState<'thongTinChung' | 'yeuCauKyThuat' | 'tienDo'>('thongTinChung');

  // Form State
  const [soYcsx, setSoYcsx] = useState('');
  const [tenDuAn, setTenDuAn] = useState('');
  const [khachHang, setKhachHang] = useState('');
  const [maDuAn, setMaDuAn] = useState('');
  const [tyLe, setTyLe] = useState('1/1000');

  useEffect(() => {
    if (itemData) {
      setSoYcsx(itemData.soYcsx || '');
      setTenDuAn(itemData.tenDuAn || '');
      setTyLe(itemData.tyLe || '1/1000');

      if (itemData.khachHangMaDa) {
        const parts = itemData.khachHangMaDa.split('·').map((s) => s.trim());
        setKhachHang(parts[0] || '');
        setMaDuAn(parts[1] || '');
      }
    }
  }, [itemData]);

  if (!isOpen || !itemData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData: YcsxItem = {
      ...itemData,
      soYcsx,
      tenDuAn,
      khachHangMaDa: `${khachHang} · ${maDuAn}`,
      tyLe,
    };

    if (onSaveSuccess) {
      onSaveSuccess(updatedData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden select-none animate-in fade-in zoom-in-95 duration-150">
        
        {/* 1. Header Modal */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#406c89]/10 text-[#406c89] flex items-center justify-center shrink-0">
              <IconFileText size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight uppercase">
                CHỈNH SỬA YÊU CẦU SẢN XUẤT MÔ HÌNH
              </h3>
              <p className="text-xs text-slate-400 font-normal">
                Cập nhật chi tiết thông tin cho YCSX: <span className="font-semibold text-[#406c89]">{itemData.soYcsx}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* 2. Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-slate-200/60 bg-white flex items-center gap-8 shrink-0 text-xs sm:text-sm font-semibold select-none">
          <button
            type="button"
            onClick={() => setActiveTab('thongTinChung')}
            className={`pb-2.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'thongTinChung'
                ? 'border-[#406c89] text-[#406c89] font-bold -mb-px'
                : 'border-transparent text-slate-600 hover:text-slate-900 font-medium -mb-px'
            }`}
          >
            <span>Thông tin chung</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('yeuCauKyThuat')}
            className={`pb-2.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'yeuCauKyThuat'
                ? 'border-[#406c89] text-[#406c89] font-bold -mb-px'
                : 'border-transparent text-slate-600 hover:text-slate-900 font-medium -mb-px'
            }`}
          >
            <span>Yêu cầu kỹ thuật</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tienDo')}
            className={`pb-2.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'tienDo'
                ? 'border-[#406c89] text-[#406c89] font-bold -mb-px'
                : 'border-transparent text-slate-600 hover:text-slate-900 font-medium -mb-px'
            }`}
          >
            <span>Tiến độ</span>
          </button>
        </div>

        {/* 3. Form Container */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
          
          {/* Form Content Body (Scrollable with hidden scrollbar) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            
            {/* TAB 1: THÔNG TIN CHUNG */}
            {activeTab === 'thongTinChung' && (
              <ChinhSuaThongTinChungTab
                soYcsx={soYcsx}
                setSoYcsx={setSoYcsx}
                maDuAn={maDuAn}
                setMaDuAn={setMaDuAn}
                tenDuAn={tenDuAn}
                setTenDuAn={setTenDuAn}
                khachHang={khachHang}
                setKhachHang={setKhachHang}
                tyLe={tyLe}
                setTyLe={setTyLe}
              />
            )}

            {/* TAB 2: YÊU CẦU KỸ THUẬT */}
            {activeTab === 'yeuCauKyThuat' && (
              <ChinhSuaYeuCauKyThuatTab />
            )}

            {/* TAB 3: TIẾN ĐỘ */}
            {activeTab === 'tienDo' && (
              <ChinhSuaTienDoTab />
            )}

          </div>

          {/* 4. Fixed Footer Buttons */}
          <div className="px-6 py-3.5 border-t border-slate-100 bg-white flex items-center justify-end gap-3 select-none shrink-0 shadow-2xs">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <IconCheck size={16} />
              <span>Cập nhật YCSX</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
