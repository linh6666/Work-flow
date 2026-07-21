"use client";

import React, { useState } from 'react';
import { IconX, IconFileText, IconCheck } from '@tabler/icons-react';

import ThongTinChungTab from './tabs/ThongTinChung';
import YeuCauKyThuatTab from './tabs/YeuCauKyThuat';
import TienDoTab from './tabs/TienDo';

interface TaoYCSXModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (data: any) => void;
}

export default function TaoYCSXModal({ isOpen, onClose, onSubmitSuccess }: TaoYCSXModalProps) {
  const [activeTab, setActiveTab] = useState<'thongTinChung' | 'yeuCauKyThuat' | 'tienDo'>('thongTinChung');

  // Form State
  const [soYcsx, setSoYcsx] = useState('09-2026/YCSX-MHV');
  const [tenDuAn, setTenDuAn] = useState('');
  const [khachHang, setKhachHang] = useState('');
  const [maDuAn, setMaDuAn] = useState('');
  const [tyLe, setTyLe] = useState('1/100');
  const [ngayBietTienDo, setNgayBietTienDo] = useState('2026-07-25');
  const [ngayGiaoHang, setNgayGiaoHang] = useState('2026-08-15');
  const [moTaChiTiet, setMoTaChiTiet] = useState('');

  // Kỹ thuật state
  const [loaiMoHinh, setLoaiMoHinh] = useState('Quy hoạch tổng thể');
  const [kichThuocSaBan, setKichThuocSaBan] = useState('2000mm x 1500mm');
  const [heThongDen, setHeThongDen] = useState('Đèn LED cảm ứng lập trình');
  const [vatLieuChinh, setVatLieuChinh] = useState('Mica trong suốt, Gỗ công nghiệp, Nhựa ABS');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newYcsxData = {
      id: `ycsx-${Date.now()}`,
      soYcsx,
      tenDuAn: tenDuAn || 'DỰ ÁN MỚI TẠO',
      khachHangMaDa: `${khachHang || 'Khách hàng mới'} · ${maDuAn || '09-2026/DA-MHV'}`,
      tyLe,
      ngayTao: new Date().toLocaleDateString('vi-VN'),
      trangThai: 'QL KD đã duyệt',
    };

    if (onSubmitSuccess) {
      onSubmitSuccess(newYcsxData);
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
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                TẠO YÊU CẦU SẢN XUẤT MÔ HÌNH
              </h3>
              <p className="text-xs text-slate-400 font-normal">
                Nhập đầy đủ thông tin để khởi tạo YCSX mô hình mới
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

        {/* 2. Navigation Tabs (Matching exact screenshot design: Clean text tabs without icons) */}
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

        {/* 3. Form Content Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 [scrollbar-width:thin]">
          
          {/* TAB 1: THÔNG TIN CHUNG */}
          {activeTab === 'thongTinChung' && (
            <ThongTinChungTab
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
              ngayBietTienDo={ngayBietTienDo}
              setNgayBietTienDo={setNgayBietTienDo}
              ngayGiaoHang={ngayGiaoHang}
              setNgayGiaoHang={setNgayGiaoHang}
              moTaChiTiet={moTaChiTiet}
              setMoTaChiTiet={setMoTaChiTiet}
            />
          )}

          {/* TAB 2: YÊU CẦU KỸ THUẬT */}
          {activeTab === 'yeuCauKyThuat' && (
            <YeuCauKyThuatTab
              loaiMoHinh={loaiMoHinh}
              setLoaiMoHinh={setLoaiMoHinh}
              kichThuocSaBan={kichThuocSaBan}
              setKichThuocSaBan={setKichThuocSaBan}
              heThongDen={heThongDen}
              setHeThongDen={setHeThongDen}
              vatLieuChinh={vatLieuChinh}
              setVatLieuChinh={setVatLieuChinh}
            />
          )}

          {/* TAB 3: TIẾN ĐỘ */}
          {activeTab === 'tienDo' && (
            <TienDoTab
              ngayBietTienDo={ngayBietTienDo}
              setNgayBietTienDo={setNgayBietTienDo}
              ngayGiaoHang={ngayGiaoHang}
              setNgayGiaoHang={setNgayGiaoHang}
            />
          )}

          {/* 4. Footer Buttons Inside Form */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 select-none">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              Hủy bỏ
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <IconCheck size={16} />
              <span>Tạo YCSX mới</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
