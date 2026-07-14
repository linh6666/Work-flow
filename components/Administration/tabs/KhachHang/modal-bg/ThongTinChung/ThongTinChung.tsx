import React from 'react';
import { KhachHangItem } from '../../index';

interface ThongTinChungProps {
  soBaoGia: string;
  setSoBaoGia: (val: string) => void;
  ngay: string;
  setNgay: (val: string) => void;
  hanHieuLuc: string;
  setHanHieuLuc: (val: string) => void;
  selectedCustomerId: string;
  handleCustomerChange: (id: string) => void;
  donViLienHe: string;
  setDonViLienHe: (val: string) => void;
  nguoiLienHe: string;
  setNguoiLienHe: (val: string) => void;
  dienThoai: string;
  setDienThoai: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  tenDuAn: string;
  setTenDuAn: (val: string) => void;
  customers: KhachHangItem[];
}

export default function ThongTinChung({
  soBaoGia,
  setSoBaoGia,
  ngay,
  setNgay,
  hanHieuLuc,
  setHanHieuLuc,
  selectedCustomerId,
  handleCustomerChange,
  donViLienHe,
  setDonViLienHe,
  nguoiLienHe,
  setNguoiLienHe,
  dienThoai,
  setDienThoai,
  email,
  setEmail,
  tenDuAn,
  setTenDuAn,
  customers = [],
}: ThongTinChungProps) {
  return (
    <div className="space-y-6 tab-content-active bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl py-4.5 px-6 text-center select-none shadow-sm bg-opacity-80 backdrop-blur-md">
        <h4 className="text-lg font-extrabold tracking-wider">BẢNG BÁO GIÁ CHI TIẾT</h4>
        <p className="text-[10px] text-amber-100 font-bold tracking-widest mt-0.5 uppercase">Official Quotation</p>
      </div>

      {/* General Info Row */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
            Số báo giá / Quotation No. *
          </label>
          <input 
            type="text" 
            required
            value={soBaoGia}
            onChange={(e) => setSoBaoGia(e.target.value)}
            className="w-full text-sm bg-white/30 backdrop-blur-md border border-white/30 rounded-lg px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors duration-200"
          />
        </div>
        
        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
            Ngày báo giá / Date *
          </label>
          <input 
            type="date" 
            required
            value={ngay}
            onChange={(e) => setNgay(e.target.value)}
            className="w-full text-sm bg-white/30 backdrop-blur-md border border-white/30 rounded-lg px-3 py-2 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer transition-colors duration-200"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
            Hạn hiệu lực / Validity *
          </label>
          <input 
            type="date" 
            required
            value={hanHieuLuc}
            onChange={(e) => setHanHieuLuc(e.target.value)}
            className="w-full text-sm bg-white/30 backdrop-blur-md border border-white/30 rounded-lg px-3 py-2 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer transition-colors duration-200"
          />
        </div>
      </div>

      {/* CRM Customer Info Box */}
      <div className="border border-amber-100 bg-amber-50/20 p-4 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-[12px] font-bold text-amber-700 uppercase tracking-wide">
            Khách hàng liên kết (CRM)
          </label>
          <span className="text-[11px] font-medium text-slate-400">Chọn khách hàng từ danh sách của bạn</span>
        </div>
        <div className="relative">
          <select
            value={selectedCustomerId}
            onChange={(e) => handleCustomerChange(e.target.value)}
            className="w-full text-sm bg-white/30 backdrop-blur-md border border-white/30 rounded-lg px-3.5 py-2 text-slate-800 font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer transition-colors duration-200"
          >
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                [{c.ma}] {c.ten}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>

        {/* Dynamic Customer Contact Fields */}
        <div className="grid grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Đơn vị liên hệ *
            </label>
            <input 
              type="text" 
              required
              value={donViLienHe}
              onChange={(e) => setDonViLienHe(e.target.value)}
              className="w-full text-xs bg-white/30 backdrop-blur-md border border-white/30 rounded-md px-3 py-1.5 text-slate-800"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Người liên hệ
            </label>
            <input 
              type="text" 
              value={nguoiLienHe}
              onChange={(e) => setNguoiLienHe(e.target.value)}
              className="w-full text-xs bg-white/30 backdrop-blur-md border border-white/30 rounded-md px-3 py-1.5 text-slate-800"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Điện thoại liên hệ
            </label>
            <input 
              type="text" 
              value={dienThoai}
              onChange={(e) => setDienThoai(e.target.value)}
              className="w-full text-xs bg-white/30 backdrop-blur-md border border-white/30 rounded-md px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Email liên hệ
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs bg-white/30 backdrop-blur-md border border-white/30 rounded-md px-3 py-1.5 text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Project Name */}
      <div>
        <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
          Tên mô hình / dự án *
        </label>
        <input 
          type="text" 
          required
          placeholder="Nhập tên dự án cần báo giá (VD: Mô hình dự án River Panorama)"
          value={tenDuAn}
          onChange={(e) => setTenDuAn(e.target.value)}
          className="w-full text-sm bg-white/30 backdrop-blur-md border border-white/30 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors duration-200 font-medium"
        />
      </div>
    </div>
  );
}
