"use client";

import React, { useState, useEffect } from 'react';
import {
  IconX,
  IconSignature,
  IconClipboardList,
  IconCoin,
  IconCreditCard,
  IconFileText,
  IconPaperclip,
  IconArrowRight,
  IconArrowLeft
} from '@tabler/icons-react';

import ThongTinChungTab from './tabs/ThongTinChung';
import HangMucGiaTriTab, { HangMucItem } from './tabs/HangMucGiaTri';
import TinhTienThanhToanTab from './tabs/TinhTienThanhToan';
import DieuKhoanThanhToanTab from './tabs/DieuKhoanThanhToan';
import HoSoKemTheoTab from './tabs/HoSoKemTheo';

interface TaoHopDongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (newHopDong: any) => void;
}

const TAB_ORDER = ['info', 'items', 'payment', 'terms', 'files'] as const;
type TabType = typeof TAB_ORDER[number];

export default function TaoHopDongModal({ isOpen, onClose, onSave }: TaoHopDongModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('info');

  useEffect(() => {
    if (isOpen) {
      setActiveTab('info');
    }
  }, [isOpen]);

  // --- Tab 1 State: Thông tin chung ---
  const [loaiHopDong, setLoaiHopDong] = useState('Mô hình Quy hoạch');
  const [soHopDong, setSoHopDong] = useState('01-2026/HĐ-MHV');
  const [tenHopDong, setTenHopDong] = useState('');
  const [ngayKy, setNgayKy] = useState(new Date().toISOString().split('T')[0]);
  const [khachHang, setKhachHang] = useState('');
  const [tenDuAn, setTenDuAn] = useState('');
  const [tyLe, setTyLe] = useState('1/500');
  const [kichThuoc, setKichThuoc] = useState('2000X1500MM');
  const [thoiGian, setThoiGian] = useState('30 ngày');

  // --- Tab 2 State: Hạng mục & Giá trị ---
  const [hangMucs, setHangMucs] = useState<HangMucItem[]>([]);

  // --- Tab 3 State: Tính tiền thanh toán ---
  const [chietKhauPercent, setChietKhauPercent] = useState(0);
  const [vatPercent, setVatPercent] = useState(8);

  // --- Tab 4 State: Điều khoản & Thanh toán ---
  const [dieuKhoan, setDieuKhoan] = useState(
    'Tạm ứng: 50% ngay sau khi ký hợp đồng. Thanh toán lần 1: 40% sau khi đạt 90% khối lượng công việc. Thanh toán cuối cùng: 10% sau khi bàn giao nghiệm thu.'
  );

  // --- Tab 5 State: Hồ sơ kèm theo ---
  const [filesAttached, setFilesAttached] = useState<string[]>([]);

  if (!isOpen) return null;

  // Calculation helpers
  const subtotal = hangMucs.reduce((sum, hm) => sum + hm.soLuong * hm.donGia, 0);
  const discountVal = (subtotal * chietKhauPercent) / 100;
  const afterDiscount = subtotal - discountVal;
  const vatVal = (afterDiscount * vatPercent) / 100;
  const tongSauThue = afterDiscount + vatVal;

  const currentTabIndex = TAB_ORDER.indexOf(activeTab);
  const isFirstTab = currentTabIndex === 0;
  const isLastTab = currentTabIndex === TAB_ORDER.length - 1;

  const handleNext = () => {
    if (!isLastTab) {
      setActiveTab(TAB_ORDER[currentTabIndex + 1]);
    }
  };

  const handleBack = () => {
    if (!isFirstTab) {
      setActiveTab(TAB_ORDER[currentTabIndex - 1]);
    }
  };

  const handleAddHangMuc = () => {
    const newHm: HangMucItem = {
      id: `hm-${Date.now()}`,
      tenHangMuc: '',
      soLuong: 1,
      donVi: 'Bộ',
      donGia: 0,
    };
    setHangMucs((prev) => [...prev, newHm]);
  };

  const handleUpdateHangMuc = (id: string, field: keyof HangMucItem, val: any) => {
    setHangMucs((prev) =>
      prev.map((hm) => (hm.id === id ? { ...hm, [field]: val } : hm))
    );
  };

  const handleDeleteHangMuc = (id: string) => {
    setHangMucs((prev) => prev.filter((hm) => hm.id !== id));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const newHopDong = {
      id: `hd-${Date.now()}`,
      soHopDong,
      tenHopDong,
      khachHang,
      tenDuAn,
      giaTri: tongSauThue,
      ngayKy,
      thoiGian,
      hangMucs,
      chietKhauPercent,
      vatPercent,
      dieuKhoan,
      filesCount: filesAttached.length,
      trangThai: 'Đang thực hiện',
    };

    if (onSave) onSave(newHopDong);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 sm:p-6 animate-fade-in">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-6xl overflow-hidden animate-scale-up flex flex-col h-[92vh] max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#406c89]/10 text-[#406c89] flex items-center justify-center shrink-0">
              <IconSignature size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base tracking-tight">Tạo hợp đồng</h3>
              <p className="text-[11px] text-slate-400 font-normal">Khởi tạo và cấu hình hợp đồng sản xuất mô hình</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Top 5 Horizontal Tabs Navigation Bar */}
        <div className="px-6 border-b border-slate-100 flex items-center gap-6 overflow-x-auto no-scrollbar bg-white shrink-0 pt-3 select-none">
          
          {/* Tab 1: Thông tin chung */}
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`pb-3 border-b-2 flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'info'
                ? 'border-[#406c89] text-[#406c89] font-bold -mb-px'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-semibold -mb-px'
            }`}
          >
            <IconClipboardList size={18} />
            <span>Thông tin chung</span>
          </button>

          {/* Tab 2: Hạng mục & Giá trị */}
          <button
            type="button"
            onClick={() => setActiveTab('items')}
            className={`pb-3 border-b-2 flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'items'
                ? 'border-[#406c89] text-[#406c89] font-bold -mb-px'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-semibold -mb-px'
            }`}
          >
            <IconCoin size={18} className="text-amber-600" />
            <span>Hạng mục & Giá trị</span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              activeTab === 'items' ? 'bg-[#406c89]/10 text-[#406c89]' : 'bg-slate-100 text-slate-600'
            }`}>
              {hangMucs.length}
            </span>
          </button>

          {/* Tab 3: Tính tiền thanh toán */}
          <button
            type="button"
            onClick={() => setActiveTab('payment')}
            className={`pb-3 border-b-2 flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'payment'
                ? 'border-[#406c89] text-[#406c89] font-bold -mb-px'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-semibold -mb-px'
            }`}
          >
            <IconCreditCard size={18} className="text-indigo-600" />
            <span>Tính tiền thanh toán</span>
          </button>

          {/* Tab 4: Điều khoản & Thanh toán */}
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`pb-3 border-b-2 flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'terms'
                ? 'border-[#406c89] text-[#406c89] font-bold -mb-px'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-semibold -mb-px'
            }`}
          >
            <IconFileText size={18} />
            <span>Điều khoản & Thanh toán</span>
          </button>

          {/* Tab 5: Hồ sơ kèm theo */}
          <button
            type="button"
            onClick={() => setActiveTab('files')}
            className={`pb-3 border-b-2 flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'files'
                ? 'border-amber-500 text-amber-900 font-bold -mb-px bg-amber-50/70 px-3 py-1 rounded-t-lg'
                : 'border-transparent text-amber-800/80 hover:text-amber-900 font-semibold -mb-px bg-amber-50/40 px-3 py-1 rounded-t-lg'
            }`}
          >
            <IconPaperclip size={18} className="text-amber-700" />
            <span>Hồ sơ kèm theo ({filesAttached.length} đã chọn)</span>
          </button>

        </div>

        {/* Tab Form Content (Scrollable Middle) */}
        <form id="tao-hop-dong-form" onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-5 bg-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          
          {/* TAB 1: THÔNG TIN CHUNG */}
          {activeTab === 'info' && (
            <ThongTinChungTab
              loaiHopDong={loaiHopDong}
              setLoaiHopDong={setLoaiHopDong}
              soHopDong={soHopDong}
              setSoHopDong={setSoHopDong}
              tenHopDong={tenHopDong}
              setTenHopDong={setTenHopDong}
              khachHang={khachHang}
              setKhachHang={setKhachHang}
              tenDuAn={tenDuAn}
              setTenDuAn={setTenDuAn}
              tyLe={tyLe}
              setTyLe={setTyLe}
              kichThuoc={kichThuoc}
              setKichThuoc={setKichThuoc}
              ngayKy={ngayKy}
              setNgayKy={setNgayKy}
              thoiGian={thoiGian}
              setThoiGian={setThoiGian}
            />
          )}

          {/* TAB 2: HẠNG MỤC & GIÁ TRỊ */}
          {activeTab === 'items' && (
            <HangMucGiaTriTab
              hangMucs={hangMucs}
              onAddHangMuc={handleAddHangMuc}
              onUpdateHangMuc={handleUpdateHangMuc}
              onDeleteHangMuc={handleDeleteHangMuc}
              subtotal={subtotal}
            />
          )}

          {/* TAB 3: TÍNH TIỀN THANH TOÁN */}
          {activeTab === 'payment' && (
            <TinhTienThanhToanTab
              chietKhauPercent={chietKhauPercent}
              setChietKhauPercent={setChietKhauPercent}
              vatPercent={vatPercent}
              setVatPercent={setVatPercent}
              subtotal={subtotal}
              discountVal={discountVal}
              vatVal={vatVal}
              tongSauThue={tongSauThue}
            />
          )}

          {/* TAB 4: ĐIỀU KHOẢN & THANH TOÁN */}
          {activeTab === 'terms' && (
            <DieuKhoanThanhToanTab
              dieuKhoan={dieuKhoan}
              setDieuKhoan={setDieuKhoan}
            />
          )}

          {/* TAB 5: HỒ SƠ KÈM THEO */}
          {activeTab === 'files' && (
            <HoSoKemTheoTab
              filesAttached={filesAttached}
              setFilesAttached={setFilesAttached}
            />
          )}

        </form>

        {/* ALWAYS VISIBLE STICKY FOOTER: Right-aligned buttons (Hủy, Tiếp tục / Lưu hợp đồng) */}
        <div className="px-6 py-3.5 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/60 shrink-0 z-30 shadow-xs">

          {/* Hủy button */}
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            Hủy
          </button>

          {/* Action button: Tiếp tục vs Lưu hợp đồng */}
          {!isLastTab ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <span>Tiếp tục</span>
              <IconArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="px-5 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Tạo hợp đồng
            </button>
          )}

        </div>

      </div>
    </div>
  );
}
