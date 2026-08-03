"use client";

import React, { useState } from 'react';
import { IconX } from '@tabler/icons-react';
import ThongTinChungTab from './tabs/ThongTinChung';
import YeuCauKyThuatTab from './tabs/YeuCauKyThuat';
import TienDoTab from './tabs/TienDo';

interface TaoYCSXModalProps {
  isOpen: boolean;
  onClose: () => void;
  soHopDong?: string;
  khachHang?: string;
}

type TabKey = 'thongtin' | 'kythuat' | 'tiendo';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'thongtin', label: 'Thông tin chung' },
  { key: 'kythuat', label: 'Yêu cầu kỹ thuật' },
  { key: 'tiendo', label: 'Tiến độ' },
];

export default function TaoYCSXModal({
  isOpen,
  onClose,
}: TaoYCSXModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('thongtin');

  if (!isOpen) return null;

  const handleLuuNhap = () => {
    alert('Đã lưu nháp Bảng Yêu cầu Sản xuất thành công!');
    onClose();
  };

  const handleGuiDuyet = () => {
    alert('Đã gửi duyệt Bảng Yêu cầu Sản xuất thành công!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-2xl max-h-[90vh] flex flex-col animate-scale-up">

        {/* ── Header ── */}
        <div className="px-6 pt-5 pb-0 flex items-center justify-between shrink-0">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Tạo mới Bảng Yêu cầu Sản xuất Mô hình
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* ── Tab Navigation ── */}
        <div className="px-6 flex items-center gap-6 border-b border-slate-200 shrink-0 mt-4">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 text-sm whitespace-nowrap cursor-pointer transition-all border-b-2 -mb-px ${
                activeTab === tab.key
                  ? 'border-[#406c89] text-[#406c89] font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 font-normal'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Body (scrollable) ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5 min-h-0">
          {activeTab === 'thongtin' && <ThongTinChungTab />}
          {activeTab === 'kythuat' && <YeuCauKyThuatTab />}
          {activeTab === 'tiendo' && <TienDoTab />}
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleLuuNhap}
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            Lưu nháp
          </button>
          <button
            type="button"
            onClick={handleGuiDuyet}
            className="px-5 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Gửi duyệt
          </button>
        </div>

      </div>
    </div>
  );
}
