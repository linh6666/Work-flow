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

const inputClass =
  'h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-xs outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100';

const labelClass = 'mb-1.5 block text-xs font-medium text-slate-900';

const statusOptions = [
  'Bản nháp',
  'Đã gửi',
  'Đang theo dõi',
  'Đang bổ sung thông tin',
  'Đang đàm phán',
  'Tạm dừng',
  'Đã chốt',
  'Từ chối báo giá',
  'Không thực hiện',
];

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
    <section className="tab-content-active overflow-hidden rounded-lg border border-slate-200 bg-slate-50 text-left shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <h4 className="text-sm font-bold text-slate-950">Thông tin chung</h4>
        <span className="text-lg leading-none text-slate-400">⌃</span>
      </div>

      <div className="space-y-4 p-4">
        <div className="rounded-md border border-indigo-200 bg-indigo-50/60 p-3">
          <label className="mb-2 block text-xs font-semibold text-indigo-700">
            Ngôn ngữ báo giá *
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              className="h-9 rounded-md bg-indigo-700 text-xs font-bold text-white shadow-sm"
            >
              <span className="mr-1 text-[9px] font-extrabold">VN</span>Tiếng Việt
            </button>
            <button
              type="button"
              className="h-9 rounded-md border border-slate-200 bg-white text-xs font-semibold text-slate-500"
            >
              <span className="mr-1 text-[9px] font-extrabold">GB</span>Tiếng Anh
            </button>
            <button
              type="button"
              className="h-9 rounded-md border border-slate-200 bg-white text-xs font-semibold text-slate-500"
            >
              <span className="mr-1 text-[9px] font-extrabold">VNGB</span>Việt - Anh
            </button>
          </div>

          <label className="mb-2 mt-3 block text-xs font-semibold text-indigo-700">
            Loại báo giá *
          </label>
          <div className="relative">
            <select className={`${inputClass} appearance-none pr-9 font-medium`}>
              <option>Báo giá Mô hình Quy hoạch</option>
              <option>Báo giá Mô hình Kiến trúc</option>
              <option>Báo giá Mô hình Nội thất</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
             ⌄
            </span>
          </div>
          <p className="mt-2 text-xs text-indigo-600">
            Chỉ hiển thị mẫu hỗ trợ ngôn ngữ Tiếng Việt
          </p>
        </div>

        <div className="rounded-md border border-amber-300 bg-amber-50/50 p-3">
          <label className="mb-2 block text-xs font-semibold text-amber-700">
            Liên kết Đề xuất Báo giá (tùy chọn)
          </label>
          <div className="relative">
            <select className={`${inputClass} appearance-none pr-9 text-slate-500`}>
              <option>Chọn đề xuất để tự điền thông tin...</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
             ⌄
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={labelClass}>Số báo giá * (tự động)</label>
            <input
              type="text"
              required
              value={soBaoGia}
              onChange={(e) => setSoBaoGia(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Ngày báo giá</label>
            <input
              type="date"
              required
              value={ngay}
              onChange={(e) => setNgay(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Hiệu lực</label>
            <input
              type="date"
              required
              value={hanHieuLuc}
              onChange={(e) => setHanHieuLuc(e.target.value)}
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
            <label className={labelClass}>Tên khách hàng (nhập tay nếu chưa có) *</label>
            <input
              type="text"
              required
              value={donViLienHe}
              onChange={(e) => setDonViLienHe(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Tên mô hình / dự án *</label>
          <input
            type="text"
            required
            placeholder="MÔ HÌNH DỰ ÁN..."
            value={tenDuAn}
            onChange={(e) => setTenDuAn(e.target.value)}
            className={`${inputClass} uppercase placeholder:text-slate-400`}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Tỷ lệ</label>
            <input type="text" placeholder="1/800" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Kích thước</label>
            <input type="text" placeholder="2650X1900MM" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={labelClass}>Người liên hệ</label>
            <input
              type="text"
              value={nguoiLienHe}
              onChange={(e) => setNguoiLienHe(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Điện thoại</label>
            <input
              type="text"
              value={dienThoai}
              onChange={(e) => setDienThoai(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-3">
          <label className="mb-2 block text-xs font-bold text-slate-900">
            Trạng thái theo dõi
          </label>
          <div className="grid grid-cols-3 gap-2">
            {statusOptions.map((status, index) => (
              <button
                key={status}
                type="button"
                className={`h-8 rounded-md border px-3 text-left text-xs font-medium ${
                  index === 0
                    ? 'border-slate-700 bg-slate-50 text-slate-800 ring-1 ring-slate-700'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                {index === 0 ? '✓ ' : ''}
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
