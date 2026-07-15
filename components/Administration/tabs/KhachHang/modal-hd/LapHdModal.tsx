/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from 'react';
import {
  IconX,
  IconSignature,
  IconInfoCircle,
  IconCreditCard,
  IconFileText,
  IconClipboardList,
  IconPaperclip,
} from '@tabler/icons-react';
import { KhachHangItem } from '../index';
import ThongTinChung from './ThongTinChung/ThongTinChung';
import HangMucGiaTriTab from './HangMucGiaTriTab/HangMucGiaTriTab';
import TinhTienTab from './TinhTienTab/TinhTienTab';
import DieuKhoanTab from './DieuKhoanTab/DieuKhoanTab';
import HoSoKemTheoTab from './HoSoKemTheoTab/HoSoKemTheoTab';

export interface HdData {
  soHopDong: string;
  ngayHopDong: string;
  khachHangId: string;
  donViLienHe: string;
  daiDienHoTen: string;
  daiDienChucDanh: string;
  diaChi: string;
  dienThoai: string;
  email: string;
  tenDuAn: string;
  giaTriHopDong: number;
  vatPercent: number;
  vatAmount: number;
  tongThanhToan: number;
  dieuKhoanThanhToan: string;
  ghiChu: string;
  danhSachFile: { name: string; size: number; type: string }[];
}

interface LapHdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: HdData) => void;
  customer: KhachHangItem | null;
  customers: KhachHangItem[];
}

export default function LapHdModal({
  isOpen,
  onClose,
  onSave,
  customer,
  customers = [],
}: LapHdModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'payment' | 'terms' | 'dieukhoan' | 'files'>('info');

  // --- Tab: Thông tin chung ---
  const [soHopDong, setSoHopDong] = useState('');
  const [ngayHopDong, setNgayHopDong] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [donViLienHe, setDonViLienHe] = useState('');
  const [daiDienHoTen, setDaiDienHoTen] = useState('');
  const [daiDienChucDanh, setDaiDienChucDanh] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [dienThoai, setDienThoai] = useState('');
  const [email, setEmail] = useState('');
  const [tenDuAn, setTenDuAn] = useState('');

  // --- Tab: Hạng mục & Giá trị ---
  const [giaTriHopDong, setGiaTriHopDong] = useState<number>(0);
  const [vatPercent, setVatPercent] = useState<number>(10);

  // --- Tab: Tính tiền / Ghi chú ---
  const [ghiChu, setGhiChu] = useState('');

  // --- Tab: Điều khoản ---
  const [dieuKhoanThanhToan, setDieuKhoanThanhToan] = useState('');

  // --- Tab: Hồ sơ kèm theo ---
  const [danhSachFile, setDanhSachFile] = useState<File[]>([]);

  // Tự sinh số hợp đồng và nạp dữ liệu khi mở modal
  useEffect(() => {
    if (isOpen && customer) {
      setActiveTab('info');
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      setNgayHopDong(todayStr);
      const dateCompact = todayStr.replace(/-/g, '');
      setSoHopDong(`HĐ-${dateCompact}-${customer.ma}`);
      setSelectedCustomerId(customer.id);
      setDonViLienHe(customer.ten);
      setDaiDienHoTen(customer.daiDienHoTen || '');
      setDaiDienChucDanh(customer.daiDienChucDanh || 'Giám đốc');
      setDiaChi(customer.diaChi || '');
      setDienThoai(customer.dienThoai || '');
      setEmail(customer.email || '');
      setTenDuAn('');
      setGiaTriHopDong(0);
      setVatPercent(10);
      setGhiChu('');
      setDieuKhoanThanhToan('Tạm ứng 50% sau khi ký hợp đồng, 50% còn lại thanh toán sau khi bàn giao nghiệm thu.');
      setDanhSachFile([]);
    }
  }, [isOpen, customer]);

  if (!isOpen || !customer) return null;

  const vatAmount = Math.round(giaTriHopDong * (vatPercent / 100));
  const tongThanhToan = giaTriHopDong + vatAmount;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  const handleCustomerChange = (id: string) => {
    setSelectedCustomerId(id);
    const found = customers.find((c) => c.id === id);
    if (found) {
      setDonViLienHe(found.ten);
      setDaiDienHoTen(found.daiDienHoTen || '');
      setDaiDienChucDanh(found.daiDienChucDanh || 'Giám đốc');
      setDiaChi(found.diaChi || '');
      setDienThoai(found.dienThoai || '');
      setEmail(found.email || '');
    }
  };

  const validateTab1 = () => {
    if (!ngayHopDong || !soHopDong.trim() || !donViLienHe.trim() || !tenDuAn.trim()) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc ở tab Thông tin chung.');
      return false;
    }
    return true;
  };

  const validateTab2 = () => {
    if (giaTriHopDong <= 0) {
      alert('Vui lòng nhập giá trị hợp đồng hợp lệ.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateTab1()) { setActiveTab('info'); return; }
    if (!validateTab2()) { setActiveTab('payment'); return; }

    onSave({
      soHopDong: soHopDong.trim(),
      ngayHopDong,
      khachHangId: selectedCustomerId,
      donViLienHe: donViLienHe.trim(),
      daiDienHoTen: daiDienHoTen.trim(),
      daiDienChucDanh: daiDienChucDanh.trim(),
      diaChi: diaChi.trim(),
      dienThoai: dienThoai.trim(),
      email: email.trim(),
      tenDuAn: tenDuAn.trim(),
      giaTriHopDong,
      vatPercent,
      vatAmount,
      tongThanhToan,
      dieuKhoanThanhToan: dieuKhoanThanhToan.trim(),
      ghiChu: ghiChu.trim(),
      danhSachFile: danhSachFile.map((f) => ({ name: f.name, size: f.size, type: f.type })),
    });

    alert('Lập hợp đồng thành công!');
    onClose();
  };

  const tabBtnClass = (key: string) =>
    `py-3 flex items-center gap-2 border-b-2 text-sm font-bold transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
      activeTab === key
        ? 'border-emerald-600 text-emerald-600'
        : 'border-transparent text-slate-500 hover:text-slate-700'
    }`;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in p-4">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .tab-content-active { animation: tabFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes tabFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[95vh] transform transition-all scale-100 animate-scale-up">

        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <IconSignature size={22} className="text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-800">Chỉnh sửa hợp đồng</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="px-6 border-b border-slate-100 flex gap-5 shrink-0 bg-slate-50/50 select-none">
          <button type="button" onClick={() => setActiveTab('info')} className={tabBtnClass('info')}>
            <IconInfoCircle size={16} />
            <span>Thông tin chung</span>
          </button>
          <button type="button" onClick={() => setActiveTab('payment')} className={tabBtnClass('payment')}>
            <IconCreditCard size={16} />
            <span>Hạng mục &amp; Giá trị</span>
          </button>
          <button type="button" onClick={() => setActiveTab('terms')} className={tabBtnClass('terms')}>
            <IconFileText size={16} />
            <span>Tính tiền thanh toán</span>
          </button>
          <button type="button" onClick={() => setActiveTab('dieukhoan')} className={tabBtnClass('dieukhoan')}>
            <IconClipboardList size={16} />
            <span>Điều khoản &amp; Thanh toán</span>
          </button>
          <button type="button" onClick={() => setActiveTab('files')} className={tabBtnClass('files')}>
            <IconPaperclip size={16} />
            <span>Hồ sơ kèm theo</span>
            {danhSachFile.length > 0 && (
              <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-bold">
                {danhSachFile.length}
              </span>
            )}
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div
            className="flex-1 overflow-y-auto no-scrollbar px-6 py-5 text-left h-[400px]"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {activeTab === 'info' && (
              <ThongTinChung
                soHopDong={soHopDong} setSoHopDong={setSoHopDong}
                ngayHopDong={ngayHopDong} setNgayHopDong={setNgayHopDong}
                selectedCustomerId={selectedCustomerId} handleCustomerChange={handleCustomerChange}
                customers={customers}
                donViLienHe={donViLienHe} setDonViLienHe={setDonViLienHe}
                daiDienHoTen={daiDienHoTen} setDaiDienHoTen={setDaiDienHoTen}
                daiDienChucDanh={daiDienChucDanh} setDaiDienChucDanh={setDaiDienChucDanh}
                tenDuAn={tenDuAn} setTenDuAn={setTenDuAn}
                dienThoai={dienThoai} setDienThoai={setDienThoai}
                email={email} setEmail={setEmail}
                diaChi={diaChi} setDiaChi={setDiaChi}
              />
            )}
            {activeTab === 'payment' && (
              <HangMucGiaTriTab
                giaTriHopDong={giaTriHopDong} setGiaTriHopDong={setGiaTriHopDong}
                vatPercent={vatPercent} setVatPercent={setVatPercent}
                vatAmount={vatAmount}
                tongThanhToan={tongThanhToan}
                formatCurrency={formatCurrency}
              />
            )}
            {activeTab === 'terms' && (
              <TinhTienTab ghiChu={ghiChu} setGhiChu={setGhiChu} />
            )}
            {activeTab === 'dieukhoan' && (
              <DieuKhoanTab
                dieuKhoanThanhToan={dieuKhoanThanhToan}
                setDieuKhoanThanhToan={setDieuKhoanThanhToan}
              />
            )}
            {activeTab === 'files' && (
              <HoSoKemTheoTab danhSachFile={danhSachFile} setDanhSachFile={setDanhSachFile} />
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-2xs"
              >
                Hủy
              </button>
              {activeTab !== 'files' ? (
                <button
                  type="button"
                  onClick={() => {
                    if (activeTab === 'info' && validateTab1()) setActiveTab('payment');
                    else if (activeTab === 'payment' && validateTab2()) setActiveTab('terms');
                    else if (activeTab === 'terms') setActiveTab('dieukhoan');
                    else if (activeTab === 'dieukhoan') setActiveTab('files');
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-sm"
                >
                  Tiếp tục
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-sm"
                >
                  Lưu hợp đồng
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
