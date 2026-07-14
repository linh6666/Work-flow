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
  moTa: string;
  donViTinh: string;
  soLuong: number;
  donGia: number;
}

export interface SectionBaoGia {
  id: string;
  tenPhan: string;
  ck: boolean;
  isCollapsed: boolean;
  items: ItemBaoGia[];
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
  sections?: SectionBaoGia[];
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
  
  // Bảng hạng mục báo giá phân theo từng phần
  const [sections, setSections] = useState<SectionBaoGia[]>([]);
  
  // VAT & Ghi chú
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
      
      // Tự sinh số báo giá tạm thời: BG-YYYYMMDD-ID
      const dateCompact = todayStr.replace(/-/g, '');
      setSoBaoGia(`BG-${dateCompact}-${customer.ma}`);
      
      // Hạn hiệu lực mặc định là 30 ngày sau
      const expiryDate = new Date();
      expiryDate.setDate(today.getDate() + 30);
      setHanHieuLuc(expiryDate.toISOString().split('T')[0]);

      setSelectedCustomerId(customer.id);
      setDonViLienHe(customer.ten);
      setNguoiLienHe(customer.nguoiLienHe || '');
      setDienThoai(customer.dienThoai || '');
      setEmail(customer.email || '');
      setTenDuAn('');
      
      setSections([]);
      setVatPercent(10);
      setGhiChu('Báo giá chưa bao gồm chi phí vận chuyển ngoài phạm vi nội thành.');
      setDieuKhoanThanhToan('Tạm ứng 50% sau khi ký hợp đồng, 50% còn lại thanh toán khi bàn giao nghiệm thu.');
    }
  }, [isOpen, customer]);

  if (!isOpen || !customer) return null;

  const validateTab1 = () => {
    if (!ngay || !soBaoGia.trim() || !donViLienHe.trim() || !tenDuAn.trim()) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc ở phần Thông tin chung.');
      return false;
    }
    return true;
  };

  const validateTab2 = () => {
    if (sections.length === 0) {
      alert('Vui lòng thêm ít nhất một phần báo giá.');
      return false;
    }
    for (const section of sections) {
      if (!section.tenPhan.trim()) {
        alert('Vui lòng điền tên cho tất cả các phần.');
        return false;
      }
      const invalidItem = section.items.find(item => !item.tenHangMuc.trim());
      if (invalidItem) {
        alert(`Vui lòng nhập tên cho tất cả các hạng mục trong phần "${section.tenPhan}".`);
        return false;
      }
    }
    return true;
  };

  const handleTabClick = (tab: 'info' | 'items' | 'terms') => {
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

  // Các hàm quản lý phần (Section)
  const handleAddSection = (title?: string) => {
    const nextId = (Math.max(...sections.map(s => parseInt(s.id) || 0), 0) + 1).toString();
    setSections(prev => [
      ...prev,
      {
        id: nextId,
        tenPhan: title || 'PHẦN MỚI',
        ck: true,
        isCollapsed: false,
        items: [
          { id: `${nextId}-1`, tenHangMuc: '', moTa: '', donViTinh: 'Bộ', soLuong: 1, donGia: 0 }
        ]
      }
    ]);
  };

  const handleAddMultipleSections = (titles: string[]) => {
    setSections(prev => {
      let currentMaxId = Math.max(...prev.map(s => parseInt(s.id) || 0), 0);
      const newSections = titles.map(title => {
        currentMaxId += 1;
        const newId = currentMaxId.toString();
        return {
          id: newId,
          tenPhan: title,
          ck: true,
          isCollapsed: false,
          items: [
            { id: `${newId}-1`, tenHangMuc: '', moTa: '', donViTinh: 'Bộ', soLuong: 1, donGia: 0 }
          ]
        };
      });
      return [...prev, ...newSections];
    });
  };

  const handleRemoveSection = (sectionId: string) => {
    setSections(prev => prev.filter(s => s.id !== sectionId));
  };

  const handleClearAllSections = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả các phần không?')) {
      setSections([]);
    }
  };

  const handleSectionChange = (sectionId: string, key: keyof SectionBaoGia, value: any) => {
    setSections(prev =>
      prev.map(s => {
        if (s.id === sectionId) {
          return { ...s, [key]: value };
        }
        return s;
      })
    );
  };

  // Các hàm quản lý hạng mục con (Item) trong từng phần
  const handleAddItemToSection = (sectionId: string) => {
    setSections(prev =>
      prev.map(s => {
        if (s.id === sectionId) {
          const nextSubId = (Math.max(...s.items.map(item => {
            const parts = item.id.split('-');
            return parseInt(parts[parts.length - 1]) || 0;
          }), 0) + 1).toString();
          const newItem: ItemBaoGia = {
            id: `${s.id}-${nextSubId}`,
            tenHangMuc: '',
            moTa: '',
            donViTinh: 'Bộ',
            soLuong: 1,
            donGia: 0
          };
          return {
            ...s,
            items: [...s.items, newItem]
          };
        }
        return s;
      })
    );
  };

  const handleRemoveItemFromSection = (sectionId: string, itemId: string) => {
    setSections(prev =>
      prev.map(s => {
        if (s.id === sectionId) {
          if (s.items.length <= 1) {
            alert('Mỗi phần phải có ít nhất một hạng mục. Hoặc bạn có thể xóa cả phần.');
            return s;
          }
          return {
            ...s,
            items: s.items.filter(item => item.id !== itemId)
          };
        }
        return s;
      })
    );
  };

  const handleItemChangeInSection = (sectionId: string, itemId: string, key: keyof ItemBaoGia, value: any) => {
    setSections(prev =>
      prev.map(s => {
        if (s.id === sectionId) {
          return {
            ...s,
            items: s.items.map(item => {
              if (item.id === itemId) {
                return { ...item, [key]: value };
              }
              return item;
            })
          };
        }
        return s;
      })
    );
  };

  // Tính toán số tiền
  const calculateSubtotal = () => {
    return sections.reduce((sum, s) => {
      return sum + s.items.reduce((itemSum, item) => itemSum + (item.soLuong * item.donGia), 0);
    }, 0);
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

    // Làm phẳng items trước khi gửi đi để tương thích ngược
    const flatItems: ItemBaoGia[] = [];
    sections.forEach(s => {
      s.items.forEach(item => {
        flatItems.push({
          id: item.id,
          tenHangMuc: item.tenHangMuc,
          moTa: item.moTa || '',
          donViTinh: item.donViTinh,
          soLuong: item.soLuong,
          donGia: item.donGia
        });
      });
    });

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
      items: flatItems,
      sections,
      subtotal,
      vatPercent,
      vatAmount,
      total,
      ghiChu: ghiChu.trim(),
      dieuKhoanThanhToan: dieuKhoanThanhToan.trim(),
    });

    alert('Lập báo giá thành công!');
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
              {sections.reduce((sum, s) => sum + s.items.length, 0)}
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
                sections={sections}
                handleAddSection={handleAddSection}
                handleAddMultipleSections={handleAddMultipleSections}
                handleRemoveSection={handleRemoveSection}
                handleClearAllSections={handleClearAllSections}
                handleSectionChange={handleSectionChange}
                handleAddItemToSection={handleAddItemToSection}
                handleRemoveItemFromSection={handleRemoveItemFromSection}
                handleItemChangeInSection={handleItemChangeInSection}
                formatCurrency={formatCurrency}
                subtotal={subtotal}
                vatPercent={vatPercent}
                vatAmount={vatAmount}
                total={total}
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
