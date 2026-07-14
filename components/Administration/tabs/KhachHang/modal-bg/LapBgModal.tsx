/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconFileText, IconInfoCircle, IconListDetails, IconReceipt } from '@tabler/icons-react';
import { KhachHangItem } from '../index';
import ThongTinChung from './ThongTinChung/ThongTinChung';
import ChiTietHangMuc from './ChiTietHangMuc/ChiTietHangMuc';
import DieuKhoanTongHop from './DieuKhoanTongHop/DieuKhoanTongHop';

export interface ItemBaoGia {
  id: string;
  tenHangMuc: string;
  donViTinh: string;
  soLuong: number;
  donGia: number;
}

export interface BaoGiaData {
  ngay: string;
  soBaoGia: string;
  hanHieuLuc: string;
  khachHangId: string;
  donViLienHe: string;
  nguoiLienHe: string;
  dienThoai: string;
  email: string;
  tenDuAn: string;
  items: ItemBaoGia[];
  subtotal: number;
  vatPercent: number;
  vatAmount: number;
  total: number;
  ghiChu: string;
  dieuKhoanThanhToan: string;
}

interface LapBgModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: BaoGiaData) => void;
  customer: KhachHangItem | null;
  customers: KhachHangItem[];
}

export default function LapBgModal({
  isOpen,
  onClose,
  onSave,
  customer,
  customers = [],
}: LapBgModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'items' | 'terms'>('info');
  const [ngay, setNgay] = useState('');
  const [soBaoGia, setSoBaoGia] = useState('');
  const [hanHieuLuc, setHanHieuLuc] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [donViLienHe, setDonViLienHe] = useState('');
  const [nguoiLienHe, setNguoiLienHe] = useState('');
  const [dienThoai, setDienThoai] = useState('');
  const [email, setEmail] = useState('');
  const [tenDuAn, setTenDuAn] = useState('');
  
  // Bảng hạng mục báo giá
  const [items, setItems] = useState<ItemBaoGia[]>([
    { id: '1', tenHangMuc: 'Mô hình kiến trúc dự án', donViTinh: 'Bộ', soLuong: 1, donGia: 0 }
  ]);
  
  // VAT & Ghi chÃº
  const [vatPercent, setVatPercent] = useState<number>(10);
  const [ghiChu, setGhiChu] = useState('');
  const [dieuKhoanThanhToan, setDieuKhoanThanhToan] = useState('');

  // Reset and pre-fill fields when modal opens
  useEffect(() => {
    if (isOpen && customer) {
      setActiveTab('info');
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      setNgay(todayStr);
      
      // Tá»± sinh sá»‘ bÃ¡o giÃ¡ táº¡m thá»i: BG-YYYYMMDD-ID
      const dateCompact = todayStr.replace(/-/g, '');
      setSoBaoGia(`BG-${dateCompact}-${customer.ma}`);
      
      // Háº¡n hiá»‡u lá»±c máº·c Ä‘á»‹nh lÃ  30 ngÃ y sau
      const expiryDate = new Date();
      expiryDate.setDate(today.getDate() + 30);
      setHanHieuLuc(expiryDate.toISOString().split('T')[0]);

      setSelectedCustomerId(customer.id);
      setDonViLienHe(customer.ten);
      setNguoiLienHe(customer.nguoiLienHe || '');
      setDienThoai(customer.dienThoai || '');
      setEmail(customer.email || '');
      setTenDuAn('');
      
      setItems([
        { id: '1', tenHangMuc: 'Thi công mô hình kiến trúc tỷ lệ 1/500', donViTinh: 'Gói', soLuong: 1, donGia: 50000000 }
      ]);
      setVatPercent(10);
      setGhiChu('BÃ¡o giÃ¡ chÆ°a bao gá»“m chi phÃ­ váº­n chuyá»ƒn ngoÃ i pháº¡m vi ná»™i thÃ nh.');
      setDieuKhoanThanhToan('Táº¡m á»©ng 50% sau khi kÃ½ há»£p Ä‘á»“ng, 50% cÃ²n láº¡i thanh toÃ¡n khi bÃ n giao nghiá»‡m thu.');
    }
  }, [isOpen, customer]);

  if (!isOpen || !customer) return null;

  const validateTab1 = () => {
    if (!ngay || !soBaoGia.trim() || !donViLienHe.trim() || !tenDuAn.trim()) {
      alert('Vui lÃ²ng Ä‘iá»n Ä‘áº§y Ä‘á»§ cÃ¡c thÃ´ng tin báº¯t buá»™c á»Ÿ pháº§n ThÃ´ng tin chung.');
      return false;
    }
    return true;
  };

  const validateTab2 = () => {
    const invalidItem = items.find(item => !item.tenHangMuc.trim());
    if (invalidItem) {
      alert('Vui lÃ²ng nháº­p tÃªn cho táº¥t cáº£ cÃ¡c háº¡ng má»¥c bÃ¡o giÃ¡.');
      return false;
    }
    return true;
  };

  const handleTabClick = (tab: 'info' | 'items' | 'terms') => {
    // Directly switch tabs without validation as per user request
    setActiveTab(tab);
  };

  const handleCustomerChange = (id: string) => {
    setSelectedCustomerId(id);
    const found = customers.find(c => c.id === id);
    if (found) {
      setDonViLienHe(found.ten);
      setNguoiLienHe(found.nguoiLienHe || '');
      setDienThoai(found.dienThoai || '');
      setEmail(found.email || '');
    }
  };

  const handleAddItem = () => {
    const nextId = (Math.max(...items.map(item => parseInt(item.id) || 0), 0) + 1).toString();
    setItems(prev => [
      ...prev,
      { id: nextId, tenHangMuc: '', donViTinh: 'Bộ', soLuong: 1, donGia: 0 }
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) {
      alert('BÃ¡o giÃ¡ pháº£i cÃ³ Ã­t nháº¥t má»™t háº¡ng má»¥c.');
      return;
    }
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleItemChange = (id: string, key: keyof ItemBaoGia, value: string | number) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, [key]: value };
        }
        return item;
      })
    );
  };

  // TÃ­nh toÃ¡n sá»‘ tiá»n
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.soLuong * item.donGia), 0);
  };

  const subtotal = calculateSubtotal();
  const vatAmount = Math.round(subtotal * (vatPercent / 100));
  const total = subtotal + vatAmount;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateTab1()) {
      setActiveTab('info');
      return;
    }

    if (!validateTab2()) {
      setActiveTab('items');
      return;
    }

    onSave({
      ngay,
      soBaoGia: soBaoGia.trim(),
      hanHieuLuc,
      khachHangId: selectedCustomerId,
      donViLienHe: donViLienHe.trim(),
      nguoiLienHe: nguoiLienHe.trim(),
      dienThoai: dienThoai.trim(),
      email: email.trim(),
      tenDuAn: tenDuAn.trim(),
      items,
      subtotal,
      vatPercent,
      vatAmount,
      total,
      ghiChu: ghiChu.trim(),
      dieuKhoanThanhToan: dieuKhoanThanhToan.trim(),
    });

    alert('Láº­p bÃ¡o giÃ¡ thÃ nh cÃ´ng!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in p-4">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .tab-content-active {
          animation: tabFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes tabFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[95vh] transform transition-all scale-100 animate-scale-up">
        
        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <IconFileText size={22} className="text-amber-600" />
            <h3 className="text-lg font-bold text-slate-800">Tạo báo giá mới</h3>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-6 border-b border-slate-100 flex gap-6 shrink-0 bg-slate-50/50 select-none">
          <button
            type="button"
            onClick={() => handleTabClick('info')}
            className={`py-3 flex items-center gap-2 border-b-2 text-sm font-bold transition-all cursor-pointer focus:outline-none ${
              activeTab === 'info'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <IconInfoCircle size={18} />
            <span>Thông tin chung</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabClick('items')}
            className={`py-3 flex items-center gap-2 border-b-2 text-sm font-bold transition-all cursor-pointer focus:outline-none ${
              activeTab === 'items'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <IconListDetails size={18} />
            <span>Danh mục & Giá</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
              activeTab === 'items' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
            }`}>
              {items.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleTabClick('terms')}
            className={`py-3 flex items-center gap-2 border-b-2 text-sm font-bold transition-all cursor-pointer focus:outline-none ${
              activeTab === 'terms'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <IconReceipt size={18} />
            <span>Điều kiện báo giá</span>
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          
          {/* Scrollable Form Body */}
          <div 
            className="flex-1 overflow-y-auto no-scrollbar px-6 py-5 text-left h-[400px]"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            
            {activeTab === 'info' && (
              <ThongTinChung
                soBaoGia={soBaoGia}
                setSoBaoGia={setSoBaoGia}
                ngay={ngay}
                setNgay={setNgay}
                hanHieuLuc={hanHieuLuc}
                setHanHieuLuc={setHanHieuLuc}
                selectedCustomerId={selectedCustomerId}
                handleCustomerChange={handleCustomerChange}
                donViLienHe={donViLienHe}
                setDonViLienHe={setDonViLienHe}
                nguoiLienHe={nguoiLienHe}
                setNguoiLienHe={setNguoiLienHe}
                dienThoai={dienThoai}
                setDienThoai={setDienThoai}
                email={email}
                setEmail={setEmail}
                tenDuAn={tenDuAn}
                setTenDuAn={setTenDuAn}
                customers={customers}
              />
            )}

            {activeTab === 'items' && (
              <ChiTietHangMuc
                items={items}
                handleAddItem={handleAddItem}
                handleRemoveItem={handleRemoveItem}
                handleItemChange={handleItemChange}
                formatCurrency={formatCurrency}
              />
            )}

            {activeTab === 'terms' && (
              <DieuKhoanTongHop
                dieuKhoanThanhToan={dieuKhoanThanhToan}
                setDieuKhoanThanhToan={setDieuKhoanThanhToan}
                ghiChu={ghiChu}
                setGhiChu={setGhiChu}
                subtotal={subtotal}
                vatPercent={vatPercent}
                setVatPercent={setVatPercent}
                vatAmount={vatAmount}
                total={total}
                formatCurrency={formatCurrency}
              />
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
              {activeTab !== 'terms' ? (
                <button
                  type="button"
                  onClick={() => {
                    if (activeTab === 'info' && validateTab1()) setActiveTab('items');
                    else if (activeTab === 'items' && validateTab2()) setActiveTab('terms');
                  }}
                  className="px-5 py-2.5 bg-indigo-700 hover:bg-indigo-800 active:scale-95 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-sm shadow-indigo-700/15"
                >
                  Tiếp tục
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-700 hover:bg-indigo-800 active:scale-95 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-sm shadow-indigo-700/15"
                >
                  Lưu báo giá
                </button>
              )}
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
