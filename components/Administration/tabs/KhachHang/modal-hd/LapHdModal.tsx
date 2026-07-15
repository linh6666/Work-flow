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
  IconUpload,
  IconTrash
} from '@tabler/icons-react';
import { KhachHangItem } from '../index';

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

const inputClass =
  'h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-xs outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100';

const labelClass = 'mb-1.5 block text-xs font-medium text-slate-900';

const textareaClass =
  'w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100';

export default function LapHdModal({
  isOpen,
  onClose,
  onSave,
  customer,
  customers = [],
}: LapHdModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'payment' | 'terms' | 'dieukhoan' | 'files'>('info');
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
  
  // Thông tin giá trị
  const [giaTriHopDong, setGiaTriHopDong] = useState<number>(0);
  const [vatPercent, setVatPercent] = useState<number>(10);
  const [dieuKhoanThanhToan, setDieuKhoanThanhToan] = useState('');
  const [ghiChu, setGhiChu] = useState('');
  const [danhSachFile, setDanhSachFile] = useState<File[]>([]);

  // Tự sinh số hợp đồng và nạp dữ liệu khi mở modal
  useEffect(() => {
    if (isOpen && customer) {
      setActiveTab('info');
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      setNgayHopDong(todayStr);
      
      // Tự sinh số hợp đồng tạm thời: HĐ-YYYYMMDD-ID
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleCustomerChange = (id: string) => {
    setSelectedCustomerId(id);
    const found = customers.find(c => c.id === id);
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
    if (!validateTab1()) {
      setActiveTab('info');
      return;
    }
    if (!validateTab2()) {
      setActiveTab('payment');
      return;
    }

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
      danhSachFile: danhSachFile.map(f => ({ name: f.name, size: f.size, type: f.type })),
    });

    alert('Lập hợp đồng thành công!');
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

        {/* Tab Selection */}
        <div className="px-6 border-b border-slate-100 flex gap-5 shrink-0 bg-slate-50/50 select-none">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`py-3 flex items-center gap-2 border-b-2 text-sm font-bold transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
              activeTab === 'info'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <IconInfoCircle size={16} />
            <span>Thông tin chung</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('payment')}
            className={`py-3 flex items-center gap-2 border-b-2 text-sm font-bold transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
              activeTab === 'payment'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <IconCreditCard size={16} />
            <span>Hạng mục & Giá trị</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`py-3 flex items-center gap-2 border-b-2 text-sm font-bold transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
              activeTab === 'terms'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <IconFileText size={16} />
            <span>Tính tiền thanh toán</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dieukhoan')}
            className={`py-3 flex items-center gap-2 border-b-2 text-sm font-bold transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
              activeTab === 'dieukhoan'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <IconClipboardList size={16} />
            <span>Điều khoản & Thanh toán</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('files')}
            className={`py-3 flex items-center gap-2 border-b-2 text-sm font-bold transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
              activeTab === 'files'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
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
          
          {/* Scrollable Form Body */}
          <div 
            className="flex-1 overflow-y-auto no-scrollbar px-6 py-5 text-left h-[400px]"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {activeTab === 'info' && (
              <div className="tab-content-active space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Số hợp đồng *</label>
                    <input
                      type="text"
                      required
                      value={soHopDong}
                      onChange={(e) => setSoHopDong(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Ngày ký hợp đồng *</label>
                    <input
                      type="date"
                      required
                      value={ngayHopDong}
                      onChange={(e) => setNgayHopDong(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Khách hàng</label>
                    <div className="relative">
                      <select
                        value={selectedCustomerId}
                        onChange={(e) => handleCustomerChange(e.target.value)}
                        className={`${inputClass} appearance-none pr-9`}
                      >
                        {customers.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.ten}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                        ⌄
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Đơn vị liên hệ *</label>
                    <input
                      type="text"
                      required
                      value={donViLienHe}
                      onChange={(e) => setDonViLienHe(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Người đại diện ký</label>
                    <input
                      type="text"
                      value={daiDienHoTen}
                      onChange={(e) => setDaiDienHoTen(e.target.value)}
                      placeholder="Họ và tên..."
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Chức vụ đại diện</label>
                    <input
                      type="text"
                      value={daiDienChucDanh}
                      onChange={(e) => setDaiDienChucDanh(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Tên dự án / Mô hình *</label>
                  <input
                    type="text"
                    required
                    placeholder="MÔ HÌNH DỰ ÁN..."
                    value={tenDuAn}
                    onChange={(e) => setTenDuAn(e.target.value)}
                    className={`${inputClass} uppercase`}
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className={labelClass}>Điện thoại</label>
                    <input
                      type="text"
                      value={dienThoai}
                      onChange={(e) => setDienThoai(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Địa chỉ</label>
                  <input
                    type="text"
                    value={diaChi}
                    onChange={(e) => setDiaChi(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="tab-content-active space-y-4">
                <div className="grid grid-cols-3 gap-3 items-end">
                  <div className="col-span-2">
                    <label className={labelClass}>Giá trị hợp đồng (trước thuế) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={giaTriHopDong || ''}
                      onChange={(e) => setGiaTriHopDong(parseFloat(e.target.value) || 0)}
                      placeholder="VND"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>VAT (%)</label>
                    <select
                      value={vatPercent}
                      onChange={(e) => setVatPercent(parseInt(e.target.value) || 0)}
                      className={inputClass}
                    >
                      <option value="0">0%</option>
                      <option value="5">5%</option>
                      <option value="8">8%</option>
                      <option value="10">10%</option>
                    </select>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Giá trị hợp đồng:</span>
                    <strong className="text-slate-900">{formatCurrency(giaTriHopDong)}</strong>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Thuế VAT ({vatPercent}%):</span>
                    <span className="text-slate-700">{formatCurrency(vatAmount)}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
                    <span className="text-base font-extrabold text-slate-800">Tổng giá trị thanh toán:</span>
                    <strong className="text-base font-extrabold text-emerald-600">{formatCurrency(tongThanhToan)}</strong>
                  </div>
                </div>

              </div>
            )}

            {activeTab === 'dieukhoan' && (
              <div className="tab-content-active space-y-4">
                <div>
                  <label className={labelClass}>Điều khoản thanh toán</label>
                  <textarea
                    rows={4}
                    value={dieuKhoanThanhToan}
                    onChange={(e) => setDieuKhoanThanhToan(e.target.value)}
                    placeholder="Nhập điều khoản thanh toán..."
                    className={`${textareaClass} min-h-[110px]`}
                  />
                </div>
                <div>
                  <label className={labelClass}>Điều khoản bàn giao</label>
                  <textarea
                    rows={3}
                    placeholder="Mô tả thời gian và điều kiện bàn giao sản phẩm/dịch vụ..."
                    className={`${textareaClass} min-h-[90px]`}
                  />
                </div>
                <div>
                  <label className={labelClass}>Bảo hành & Hỗ trợ sau bán</label>
                  <textarea
                    rows={3}
                    placeholder="Mô tả chính sách bảo hành, thời gian bảo hành, hỗ trợ kỹ thuật..."
                    className={`${textareaClass} min-h-[90px]`}
                  />
                </div>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="tab-content-active space-y-4">
                <div>
                  <label className={labelClass}>Ghi chú hợp đồng</label>
                  <textarea
                    rows={6}
                    placeholder="Ghi chú thêm về điều khoản giao hàng, phạt vi phạm hợp đồng, bảo hành..."
                    value={ghiChu}
                    onChange={(e) => setGhiChu(e.target.value)}
                    className={`${textareaClass} min-h-[160px]`}
                  />
                </div>
              </div>
            )}

            {activeTab === 'files' && (
              <div className="tab-content-active space-y-4">
                {/* Drop zone */}
                <label
                  htmlFor="hd-file-upload"
                  className="flex flex-col items-center justify-center gap-3 w-full border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/60 py-8 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group"
                >
                  <div className="w-11 h-11 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-100 transition-all">
                    <IconUpload size={22} className="text-emerald-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-700">Nhấn để chọn file hoặc kéo thả vào đây</p>
                    <p className="text-xs text-slate-400 mt-0.5">PDF, DOCX, XLSX, JPG, PNG – tối đa 20MB mỗi file</p>
                  </div>
                  <input
                    id="hd-file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => {
                      const newFiles = Array.from(e.target.files || []);
                      setDanhSachFile(prev => [
                        ...prev,
                        ...newFiles.filter(nf => !prev.some(f => f.name === nf.name && f.size === nf.size))
                      ]);
                      e.target.value = '';
                    }}
                  />
                </label>

                {/* File list */}
                {danhSachFile.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {danhSachFile.length} tệp đã chọn
                    </p>
                    {danhSachFile.map((file, idx) => {
                      const sizeKb = (file.size / 1024).toFixed(1);
                      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
                      const displaySize = file.size > 1024 * 1024 ? `${sizeMb} MB` : `${sizeKb} KB`;
                      const ext = file.name.split('.').pop()?.toLowerCase() || '';
                      const extColors: Record<string, string> = {
                        pdf: 'bg-red-50 text-red-600 border-red-200',
                        doc: 'bg-blue-50 text-blue-600 border-blue-200',
                        docx: 'bg-blue-50 text-blue-600 border-blue-200',
                        xls: 'bg-green-50 text-green-600 border-green-200',
                        xlsx: 'bg-green-50 text-green-600 border-green-200',
                        jpg: 'bg-amber-50 text-amber-600 border-amber-200',
                        jpeg: 'bg-amber-50 text-amber-600 border-amber-200',
                        png: 'bg-purple-50 text-purple-600 border-purple-200',
                      };
                      const extColor = extColors[ext] || 'bg-slate-50 text-slate-600 border-slate-200';
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg border border-slate-100 bg-white shadow-xs hover:border-slate-200 transition-all"
                        >
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-md border text-[10px] font-extrabold uppercase ${extColor}`}>
                            {ext}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-800 truncate">{file.name}</p>
                            <p className="text-xs text-slate-400">{displaySize}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setDanhSachFile(prev => prev.filter((_, i) => i !== idx))}
                            className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                            title="Xóa tệp"
                          >
                            <IconTrash size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center text-xs text-slate-400 py-2">Chưa có tệp nào được chọn.</p>
                )}
              </div>
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
