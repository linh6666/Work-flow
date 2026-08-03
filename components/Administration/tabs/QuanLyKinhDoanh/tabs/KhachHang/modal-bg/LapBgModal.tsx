/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from 'react';
import {
  IconX,
  IconFileText,
  IconInfoCircle,
  IconListDetails,
  IconReceipt,
  IconPaperclip,
  IconUpload,
  IconTrash,
} from '@tabler/icons-react';
import { KhachHangItem } from '../../../../KhachHang';
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
  danhSachFile?: File[];
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
  const [activeTab, setActiveTab] = useState<'info' | 'items' | 'terms' | 'files'>('info');
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

  // Danh sách file đính kèm
  const [danhSachFile, setDanhSachFile] = useState<File[]>([]);

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
      setNguoiLienHe(customer.nguoiLienHe);
      setDienThoai(customer.dienThoai);
      setEmail(customer.email);
      setTenDuAn('');
      
      // Khởi tạo mẫu section mặc định
      setSections([
        {
          id: 'sec-1',
          tenPhan: 'I. BÁO GIÁ SẢN XUẤT MÔ HÌNH',
          ck: true,
          isCollapsed: false,
          items: [
            {
              id: 'sec-1-1',
              tenHangMuc: 'Mô hình quy hoạch / công trình kiến trúc',
              moTa: 'Sản xuất theo bản vẽ thiết kế được duyệt',
              donViTinh: 'Bộ',
              soLuong: 1,
              donGia: 0,
            }
          ]
        }
      ]);

      setVatPercent(10);
      setGhiChu('');
      setDieuKhoanThanhToan('');
      setDanhSachFile([]);
    }
  }, [isOpen, customer]);

  if (!isOpen || !customer) return null;

  const handleCustomerChange = (id: string) => {
    setSelectedCustomerId(id);
    const found = customers.find(c => c.id === id);
    if (found) {
      setDonViLienHe(found.ten);
      setNguoiLienHe(found.nguoiLienHe);
      setDienThoai(found.dienThoai);
      setEmail(found.email);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setDanhSachFile(prev => [...prev, ...filesArray]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setDanhSachFile(prev => prev.filter((_, i) => i !== index));
  };

  // Tính toán tổng tiền
  const subtotal = sections.reduce((secAcc, section) => {
    const sectionSum = section.items.reduce((itemAcc, item) => {
      return itemAcc + (item.soLuong || 0) * (item.donGia || 0);
    }, 0);
    return secAcc + sectionSum;
  }, 0);

  const vatAmount = Math.round((subtotal * (vatPercent || 0)) / 100);
  const total = subtotal + vatAmount;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(amount)
      .replace('𝄲', 'đ')
      .replace('₫', 'đ');
  };

  const validateTab1 = () => {
    if (!soBaoGia.trim() || !ngay || !donViLienHe.trim() || !nguoiLienHe.trim()) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc ở tab Thông tin chung');
      return false;
    }
    return true;
  };

  const validateTab2 = () => {
    if (sections.length === 0) {
      alert('Vui lòng thêm ít nhất một phần hạng mục báo giá');
      return false;
    }
    return true;
  };

  const handleTabClick = (tab: 'info' | 'items' | 'terms' | 'files') => {
    if (tab === 'items' && !validateTab1()) return;
    if (tab === 'terms' && (!validateTab1() || !validateTab2())) return;
    if (tab === 'files' && (!validateTab1() || !validateTab2())) return;
    setActiveTab(tab);
  };

  // Thêm section mẫu
  const handleAddPresetSections = (titles: string[]) => {
    setSections(prev => {
      const nextId = prev.length + 1;
      const newSections: SectionBaoGia[] = titles.map((title, idx) => {
        const secId = `sec-${nextId + idx}`;
        return {
          id: secId,
          tenPhan: title,
          ck: true,
          isCollapsed: false,
          items: [
            { id: `${secId}-1`, tenHangMuc: '', moTa: '', donViTinh: 'Bộ', soLuong: 1, donGia: 0 }
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
          return { ...s, items: [...s.items, newItem] };
        }
        return s;
      })
    );
  };

  const handleRemoveItem = (sectionId: string, itemId: string) => {
    setSections(prev =>
      prev.map(s => {
        if (s.id === sectionId) {
          const filtered = s.items.filter(i => i.id !== itemId);
          return { ...s, items: filtered };
        }
        return s;
      })
    );
  };

  const handleItemChange = (sectionId: string, itemId: string, key: keyof ItemBaoGia, value: any) => {
    setSections(prev =>
      prev.map(s => {
        if (s.id === sectionId) {
          const updatedItems = s.items.map(i => {
            if (i.id === itemId) {
              return { ...i, [key]: value };
            }
            return i;
          });
          return { ...s, items: updatedItems };
        }
        return s;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateTab1() || !validateTab2()) return;

    // Gom phẳng tất cả items từ các sections
    const flatItems: ItemBaoGia[] = [];
    sections.forEach(sec => {
      sec.items.forEach(item => {
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
      danhSachFile,
    });

    alert('Lập báo giá thành công!');
    onClose();
  };

  const currentSelectedCustomer = customers.find(c => c.id === selectedCustomerId) || customer;

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
            <IconFileText size={22} className="text-[#406c89]" />
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
        <div className="px-6 border-b border-slate-100 flex gap-6 shrink-0 bg-slate-50/50 select-none overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => handleTabClick('info')}
            className={`py-3 flex items-center gap-2 border-b-2 text-sm font-bold transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
              activeTab === 'info'
                ? 'border-[#406c89] text-[#406c89]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <IconInfoCircle size={18} />
            <span>Thông tin chung</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabClick('items')}
            className={`py-3 flex items-center gap-2 border-b-2 text-sm font-bold transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
              activeTab === 'items'
                ? 'border-[#406c89] text-[#406c89]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <IconListDetails size={18} />
            <span>Danh mục & Giá</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
              activeTab === 'items' ? 'bg-sky-100 text-[#406c89]' : 'bg-slate-100 text-slate-600'
            }`}>
              {sections.reduce((sum, s) => sum + s.items.length, 0)}
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleTabClick('terms')}
            className={`py-3 flex items-center gap-2 border-b-2 text-sm font-bold transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
              activeTab === 'terms'
                ? 'border-[#406c89] text-[#406c89]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <IconReceipt size={18} />
            <span>Điều kiện báo giá</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabClick('files')}
            className={`py-3 flex items-center gap-2 border-b-2 text-sm font-bold transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
              activeTab === 'files'
                ? 'border-[#406c89] text-[#406c89]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <IconPaperclip size={18} />
            <span>Hồ sơ đính kèm</span>
            {danhSachFile.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-extrabold bg-[#406c89] text-white">
                {danhSachFile.length}
              </span>
            )}
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
                currentSelectedCustomer={currentSelectedCustomer}
              />
            )}

            {activeTab === 'items' && (
              <ChiTietHangMuc
                sections={sections}
                handleAddSection={(title) => handleAddPresetSections([title || 'Hạng mục mới'])}
                handleAddMultipleSections={handleAddPresetSections}
                handleClearAllSections={handleClearAllSections}
                handleSectionChange={handleSectionChange}
                handleRemoveSection={handleRemoveSection}
                handleAddItemToSection={handleAddItemToSection}
                handleItemChangeInSection={(sectionId, itemId, key, val) => handleItemChange(sectionId, itemId, key, val)}
                handleRemoveItemFromSection={(sectionId, itemId) => handleRemoveItem(sectionId, itemId)}
                subtotal={subtotal}
                vatPercent={vatPercent}
                setVatPercent={setVatPercent}
                vatAmount={vatAmount}
                total={total}
                formatCurrency={formatCurrency}
              />
            )}

            {activeTab === 'terms' && (
              <DieuKhoanTongHop
                ghiChu={ghiChu}
                setGhiChu={setGhiChu}
                dieuKhoanThanhToan={dieuKhoanThanhToan}
                setDieuKhoanThanhToan={setDieuKhoanThanhToan}
                subtotal={subtotal}
                vatPercent={vatPercent}
                setVatPercent={setVatPercent}
                vatAmount={vatAmount}
                total={total}
                formatCurrency={formatCurrency}
              />
            )}

            {activeTab === 'files' && (
              <div className="tab-content-active space-y-4 text-left">
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900">
                    Tài liệu / Hình ảnh đính kèm (phục vụ phê duyệt)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Tải lên bản vẽ, hồ sơ, hình ảnh tham khảo... để phục vụ phê duyệt báo giá.
                  </p>
                  <div className="pt-1">
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer">
                      <IconUpload size={15} className="text-[#406c89]" />
                      <span>Chọn tệp để tải lên</span>
                      <input type="file" multiple className="hidden" onChange={handleFileUpload} />
                    </label>
                  </div>

                  {/* List preview of uploaded files */}
                  {danhSachFile.length > 0 && (
                    <div className="space-y-2 pt-2">
                      {danhSachFile.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg text-xs">
                          <span className="font-medium text-slate-800">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(idx)}
                            className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer transition-colors"
                            title="Xóa tệp"
                          >
                            <IconTrash size={15} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
            <div>
              {activeTab !== 'info' && (
                <button
                  type="button"
                  onClick={() => {
                    if (activeTab === 'items') setActiveTab('info');
                    else if (activeTab === 'terms') setActiveTab('items');
                    else if (activeTab === 'files') setActiveTab('terms');
                  }}
                  className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-2xs"
                >
                  Quay lại
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-2xs"
              >
                Hủy
              </button>
              {activeTab !== 'files' ? (
                <button
                  type="button"
                  onClick={() => {
                    if (activeTab === 'info' && validateTab1()) setActiveTab('items');
                    else if (activeTab === 'items' && validateTab2()) setActiveTab('terms');
                    else if (activeTab === 'terms') setActiveTab('files');
                  }}
                  className="px-5 py-2.5 bg-[#406c89] hover:bg-[#345972] active:scale-95 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-sm shadow-[#406c89]/15"
                >
                  Tiếp tục
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#406c89] hover:bg-[#345972] active:scale-95 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-sm shadow-[#406c89]/15"
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
