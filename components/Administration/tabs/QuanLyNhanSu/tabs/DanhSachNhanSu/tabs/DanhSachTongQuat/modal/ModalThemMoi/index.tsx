"use client";

import React, { useState, useEffect, useRef } from 'react';
import { IconX, IconChevronDown, IconLoader2, IconCalendar, IconCheck } from '@tabler/icons-react';
import {
  NhanSuItem,
  PHONG_BAN_LIST,
  TRANG_THAI_LIST,
  GIOI_TINH_LIST,
  BAC_LUONG_LIST,
  formatVND,
} from '../../index';
import { createStaff } from '@/api/apiGetStaffList';

interface ModalThemMoiProps {
  isOpen: boolean;
  defaultMaNV?: string;
  onSave: (newItem: NhanSuItem) => void;
  onClose: () => void;
}

export default function ModalThemMoi({
  isOpen,
  defaultMaNV = '',
  onSave,
  onClose,
}: ModalThemMoiProps) {
  const birthDatePickerRef = useRef<HTMLInputElement>(null);
  const deptDropdownRef = useRef<HTMLDivElement>(null);
  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (deptDropdownRef.current && !deptDropdownRef.current.contains(e.target as Node)) {
        setIsDeptOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [formData, setFormData] = useState<Partial<NhanSuItem>>({
    maNV: defaultMaNV,
    hoTen: '',
    gioiTinh: 'Nam',
    ngaySinh: '',
    tinhTrangHonNhan: '',
    tenThuongDung: '',
    chieuCao: '',
    canNang: '',
    ghiChu: '',
    dienThoai: '',
    email: '',
    facebook: '',
    diaChiHienTai: '',
    diaChiHoKhau: '',
    phongBan: 'Ban Giám đốc',
    chucVu: '',
    trangThai: 'Đang làm việc',
    truongHoc: '',
    chuyenNganh: '',
    bangCapTrinhDo: '',
    nguonTuyenDung: '',
    ngayVao: '',
    thamNien: '',
    bacLuong: '',
    mucLuongCung: 0,
    mucLuongMem: 0,
    tongTroCap: 0,
    thoiDiemTangLuong: '',
    thoiDiemTangBacBacLuongDuKien: '',
    ghiChuLuong: '',
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        maNV: '',
        hoTen: '',
        gioiTinh: 'Nam',
        ngaySinh: '',
        tinhTrangHonNhan: '',
        tenThuongDung: '',
        chieuCao: '',
        canNang: '',
        ghiChu: '',
        dienThoai: '',
        email: '',
        facebook: '',
        diaChiHienTai: '',
        diaChiHoKhau: '',
        phongBan: PHONG_BAN_LIST[0] || 'Ban Giám đốc',
        chucVu: '',
        trangThai: TRANG_THAI_LIST[0] || 'Đang làm việc',
        truongHoc: '',
        chuyenNganh: '',
        bangCapTrinhDo: '',
        nguonTuyenDung: '',
        ngayVao: '',
        thamNien: '',
        bacLuong: '',
        mucLuongCung: 0,
        mucLuongMem: 0,
        tongTroCap: 0,
        thoiDiemTangLuong: '',
        thoiDiemTangBacBacLuongDuKien: '',
        ghiChuLuong: '',
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hoTen?.trim() || !formData.maNV?.trim()) {
      alert('Vui lòng nhập đầy đủ Mã NV và Họ tên!');
      return;
    }

    const totalIncome =
      Number(formData.mucLuongCung || 0) +
      Number(formData.mucLuongMem || 0) +
      Number(formData.tongTroCap || 0);

    const chieuCaoCanNangStr =
      formData.chieuCao || formData.canNang
        ? `${formData.chieuCao || '—'} cm • ${formData.canNang || '—'} kg`
        : '';

    const newItem: Partial<NhanSuItem> = {
      maNV: formData.maNV.trim(),
      hoTen: formData.hoTen.trim(),
      gioiTinh: formData.gioiTinh || 'Nam',
      ngaySinh: formData.ngaySinh || '',
      tinhTrangHonNhan: formData.tinhTrangHonNhan || '',
      tenThuongDung: formData.tenThuongDung || '',
      chieuCao: formData.chieuCao || '',
      canNang: formData.canNang || '',
      chieuCaoCanNang: chieuCaoCanNangStr,
      ghiChu: formData.ghiChu || '',
      dienThoai: formData.dienThoai || '',
      email: formData.email || '',
      facebook: formData.facebook || '',
      diaChiHienTai: formData.diaChiHienTai || '',
      diaChiHoKhau: formData.diaChiHoKhau || '',
      phongBan: formData.phongBan || 'Ban Giám đốc',
      chucVu: formData.chucVu || '',
      trangThai: formData.trangThai || 'Đang làm việc',
      truongHoc: formData.truongHoc || '',
      chuyenNganh: formData.chuyenNganh || '',
      bangCapTrinhDo: formData.bangCapTrinhDo || '',
      nguonTuyenDung: formData.nguonTuyenDung || '',
      ngayVao: formData.ngayVao || '',
      thamNien: formData.thamNien || '',
      bacLuong: formData.bacLuong || '',
      mucLuongHienTai: totalIncome,
      mucLuongCung: Number(formData.mucLuongCung || 0),
      mucLuongMem: Number(formData.mucLuongMem || 0),
      tongTroCap: Number(formData.tongTroCap || 0),
      thoiDiemTangLuong: formData.thoiDiemTangLuong || '',
      thoiDiemTangBacBacLuongDuKien: formData.thoiDiemTangBacBacLuongDuKien || '',
      ghiChuLuong: formData.ghiChuLuong || '',
    };

    try {
      setIsSubmitting(true);
      const createdItem = await createStaff(newItem);
      onSave(createdItem);
      onClose();
    } catch (err: any) {
      console.error("Lỗi khi thêm nhân sự:", err);
      alert(err?.message || "Không thể thêm nhân sự lên máy chủ");
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelCls = 'block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5';
  const inputCls =
    'w-full h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89]/20 text-xs bg-white text-slate-800 placeholder:text-slate-300 placeholder:text-[11px] placeholder:font-normal transition';
  const selectCls =
    'w-full h-9 px-3 pr-8 border border-slate-200 rounded-lg outline-none focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89]/20 bg-white text-xs text-slate-800 transition appearance-none cursor-pointer';

  const basicSalary = Number(formData.mucLuongCung || 0) + Number(formData.mucLuongMem || 0);
  const totalSalary = basicSalary + Number(formData.tongTroCap || 0);

  const departments =
    PHONG_BAN_LIST.length > 0
      ? PHONG_BAN_LIST
      : [
          'Ban Giám đốc',
          'Khối Văn phòng',
          'Phòng Khai triển',
          'Phòng Công nghệ và Thiết kế',
          'Phòng Cắt',
          'Phòng Ghép',
          'Phòng Mộc Sơn',
          'Phòng Điện',
          'Phòng Cảnh Quan',
          'Lắp đặt',
        ];
  const statuses = TRANG_THAI_LIST.length > 0 ? TRANG_THAI_LIST : ['Đang làm việc', 'Thử việc', 'Nghỉ thai sản', 'Đã nghỉ việc'];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]">
        
        {/* ── 1. Modal Header ── */}
        <div className="px-6 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Thêm nhân sự</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* ── Scrollable Form Body ── */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto no-scrollbar p-5 sm:p-6 space-y-4 bg-white text-xs">
          
          {/* ── 2. Top Profile Hero Card (#406c89) ── */}
          <div className="bg-[#406c89] text-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              {/* Avatar circle with '?' */}
              <div className="w-12 h-12 rounded-full bg-white/20 border border-white/30 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-inner">
                ?
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">
                  {formData.hoTen || 'Nhân sự mới'}
                </h3>
                <p className="text-xs text-white/80 font-medium mt-0.5">
                  {formData.phongBan || 'Ban Giám đốc'}
                </p>
                {/* Badges / Pill Tags */}
                <div className="flex items-center gap-2 flex-wrap mt-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 text-white border border-white/25">
                    {formData.trangThai || 'Đang làm việc'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 text-white border border-white/25">
                    {formData.phongBan || 'Ban Giám đốc'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 text-white border border-white/25">
                    Chưa xếp bậc · — đ
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 text-white border border-white/25">
                    Hồ sơ: 0 giấy tờ
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── GHI CHÚ: TABS ĐÃ ĐƯỢC ẨN HOÀN TOÀN THEO YÊU CẦU ── */}

          {/* ── 3. THÔNG TIN CÁ NHÂN ── */}
          <div className="border border-slate-200/90 rounded-xl p-4 sm:p-5 bg-white shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="font-bold text-xs text-[#406c89] tracking-wider uppercase">THÔNG TIN CÁ NHÂN</span>
              <span className="text-xs text-slate-400 font-normal">Định danh và đặc điểm cá nhân</span>
            </div>

            {/* Row 1: MÃ NHÂN VIÊN (3 col) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className={labelCls}>MÃ NHÂN VIÊN</label>
                <input
                  type="text"
                  required
                  value={formData.maNV || ''}
                  onChange={(e) => setFormData({ ...formData, maNV: e.target.value })}
                  className={inputCls}
                  placeholder="VD: NV001"
                />
              </div>
              <div>
                <label className={labelCls}>
                  HỌ VÀ TÊN <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.hoTen || ''}
                  onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })}
                  className={inputCls}
                  placeholder="Nhập họ và tên..."
                />
              </div>
              <div>
                <label className={labelCls}>GIỚI TÍNH</label>
                <div className="relative">
                  <select
                    value={formData.gioiTinh || 'Nam'}
                    onChange={(e) => setFormData({ ...formData, gioiTinh: e.target.value })}
                    className={selectCls}
                  >
                    {GIOI_TINH_LIST.map((gt) => (
                      <option key={gt} value={gt}>{gt}</option>
                    ))}
                  </select>
                  <IconChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 2: NGÀY SINH + HÔN NHÂN + TÊN THƯỜNG DÙNG (3 col) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className={labelCls}>NGÀY SINH</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={formData.ngaySinh || ''}
                    onChange={(e) => setFormData({ ...formData, ngaySinh: e.target.value })}
                    className={`${inputCls} pr-9 cursor-pointer`}
                    placeholder="mm/dd/yyyy"
                    onClick={() => {
                      try {
                        birthDatePickerRef.current?.showPicker();
                      } catch {}
                    }}
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <IconCalendar
                      size={16}
                      className="text-slate-600 hover:text-[#406c89] transition-colors pointer-events-none"
                    />
                    <input
                      ref={birthDatePickerRef}
                      type="date"
                      tabIndex={-1}
                      aria-label="Chọn ngày sinh"
                      value={
                        formData.ngaySinh && formData.ngaySinh.includes('/')
                          ? formData.ngaySinh.split('/').reverse().join('-')
                          : formData.ngaySinh || ''
                      }
                      onChange={(e) => {
                        const val = e.target.value; // "YYYY-MM-DD"
                        if (val) {
                          const [y, m, d] = val.split('-');
                          setFormData((prev) => ({ ...prev, ngaySinh: `${d}/${m}/${y}` }));
                        } else {
                          setFormData((prev) => ({ ...prev, ngaySinh: '' }));
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-6 h-6"
                      title="Chọn ngày"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className={labelCls}>TÌNH TRẠNG HÔN NHÂN</label>
                <input
                  type="text"
                  value={formData.tinhTrangHonNhan || ''}
                  onChange={(e) => setFormData({ ...formData, tinhTrangHonNhan: e.target.value })}
                  className={inputCls}
                  placeholder="Độc thân / Đã lập gia đình..."
                />
              </div>
              <div>
                <label className={labelCls}>NICK / TÊN THƯỜNG DÙNG</label>
                <input
                  type="text"
                  value={formData.tenThuongDung || ''}
                  onChange={(e) => setFormData({ ...formData, tenThuongDung: e.target.value })}
                  className={inputCls}
                  placeholder="VD: Tuấn Anh..."
                />
              </div>
            </div>

            {/* Row 3: CHIỀU CAO + CÂN NẶNG (3 col) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className={labelCls}>CHIỀU CAO (CM)</label>
                <input
                  type="text"
                  value={formData.chieuCao || ''}
                  onChange={(e) => setFormData({ ...formData, chieuCao: e.target.value })}
                  className={inputCls}
                  placeholder="VD: 175"
                />
              </div>
              <div>
                <label className={labelCls}>CÂN NẶNG (KG)</label>
                <input
                  type="text"
                  value={formData.canNang || ''}
                  onChange={(e) => setFormData({ ...formData, canNang: e.target.value })}
                  className={inputCls}
                  placeholder="VD: 68"
                />
              </div>
              <div className="hidden sm:block" />
            </div>

            {/* Row 4: GHI CHÚ (full width) */}
            <div>
              <label className={labelCls}>GHI CHÚ</label>
              <textarea
                rows={2}
                value={formData.ghiChu || ''}
                onChange={(e) => setFormData({ ...formData, ghiChu: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89]/20 text-xs bg-white text-slate-800 placeholder:text-slate-300 placeholder:text-[11px] placeholder:font-normal transition resize-none"
                placeholder="Ghi chú thời điểm bắt đầu làm việc, nghỉ việc hoặc lưu ý khác..."
              />
            </div>
          </div>

          {/* ── 4. LIÊN HỆ ── */}
          <div className="border border-slate-200/90 rounded-xl p-4 sm:p-5 bg-white shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="font-bold text-xs text-[#406c89] tracking-wider uppercase">LIÊN HỆ</span>
              <span className="text-xs text-slate-400 font-normal">Điện thoại, email và địa chỉ</span>
            </div>

            {/* Row 1: ĐIỆN THOẠI + EMAIL + FACEBOOK (3 col) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className={labelCls}>ĐIỆN THOẠI</label>
                <input
                  type="text"
                  value={formData.dienThoai || ''}
                  onChange={(e) => setFormData({ ...formData, dienThoai: e.target.value })}
                  className={inputCls}
                  placeholder="VD: 0912345678"
                />
              </div>
              <div>
                <label className={labelCls}>EMAIL</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputCls}
                  placeholder="VD: email@example.com"
                />
              </div>
              <div>
                <label className={labelCls}>FACEBOOK</label>
                <input
                  type="text"
                  value={formData.facebook || ''}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  className={inputCls}
                  placeholder="VD: https://facebook.com/..."
                />
              </div>
            </div>

            {/* Row 2: ĐỊA CHỈ ĐANG Ở (full width) */}
            <div>
              <label className={labelCls}>ĐỊA CHỈ ĐANG Ở</label>
              <input
                type="text"
                value={formData.diaChiHienTai || ''}
                onChange={(e) => setFormData({ ...formData, diaChiHienTai: e.target.value })}
                className={inputCls}
                placeholder="VD: Số nhà, đường, phường/xã, quận/huyện..."
              />
            </div>

            {/* Row 3: ĐỊA CHỈ HỘ KHẨU (full width) */}
            <div>
              <label className={labelCls}>ĐỊA CHỈ HỘ KHẨU</label>
              <input
                type="text"
                value={formData.diaChiHoKhau || ''}
                onChange={(e) => setFormData({ ...formData, diaChiHoKhau: e.target.value })}
                className={inputCls}
                placeholder="VD: Địa chỉ thường trú theo hộ khẩu..."
              />
            </div>
          </div>

          {/* ── 5. CÔNG TÁC ── */}
          <div className="border border-slate-200/90 rounded-xl p-4 sm:p-5 bg-white shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="font-bold text-xs text-[#406c89] tracking-wider uppercase">CÔNG TÁC</span>
              <span className="text-xs text-slate-400 font-normal">Vị trí và trạng thái làm việc</span>
            </div>

            {/* Row 1: PHÒNG BAN + CHỨC VỤ + TRẠNG THÁI (3 col) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="relative" ref={deptDropdownRef}>
                <label className={labelCls}>PHÒNG BAN</label>
                <button
                  type="button"
                  onClick={() => setIsDeptOpen(!isDeptOpen)}
                  className="w-full h-9 px-3 border border-slate-200 rounded-lg outline-none focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89]/20 bg-white text-xs text-slate-800 transition flex items-center justify-between cursor-pointer"
                >
                  <span className="font-medium text-slate-800">
                    {formData.phongBan || departments[0]}
                  </span>
                  <IconChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform ${isDeptOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown Menu matching screenshot */}
                {isDeptOpen && (
                  <div className="absolute z-50 left-0 right-0 bottom-full mb-1 bg-white border border-slate-200 rounded-xl shadow-2xl py-1.5 max-h-72 overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
                    {departments.map((dept) => {
                      const isSelected = (formData.phongBan || departments[0]) === dept;
                      return (
                        <div
                          key={dept}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, phongBan: dept }));
                            setIsDeptOpen(false);
                          }}
                          className={`px-3.5 py-2 text-xs flex items-center justify-between cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-slate-50/90 font-medium text-slate-900'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <span>{dept}</span>
                          {isSelected && <IconCheck size={16} className="text-slate-800 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div>
                <label className={labelCls}>CHỨC VỤ</label>
                <input
                  type="text"
                  value={formData.chucVu || ''}
                  onChange={(e) => setFormData({ ...formData, chucVu: e.target.value })}
                  className={inputCls}
                  placeholder="VD: Nhân viên, Kỹ thuật viên..."
                />
              </div>
              <div>
                <label className={labelCls}>TRẠNG THÁI</label>
                <div className="relative">
                  <select
                    value={formData.trangThai || 'Đang làm việc'}
                    onChange={(e) => setFormData({ ...formData, trangThai: e.target.value })}
                    className={selectCls}
                  >
                    {statuses.map((tt) => (
                      <option key={tt} value={tt}>{tt}</option>
                    ))}
                  </select>
                  <IconChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* ── 6. HỌC VẤN & TUYỂN DỤNG ── */}
          <div className="border border-slate-200/90 rounded-xl p-4 sm:p-5 bg-white shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="font-bold text-xs text-[#406c89] tracking-wider uppercase">HỌC VẤN & TUYỂN DỤNG</span>
            </div>

            {/* Row 1: TRƯỜNG HỌC + CHUYÊN NGÀNH + BẰNG CẤP + NGUỒN TUYỂN DỤNG (4 col) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div>
                <label className={labelCls}>TRƯỜNG HỌC</label>
                <input
                  type="text"
                  value={formData.truongHoc || ''}
                  onChange={(e) => setFormData({ ...formData, truongHoc: e.target.value })}
                  className={inputCls}
                  placeholder="VD: Đại học Xây dựng..."
                />
              </div>
              <div>
                <label className={labelCls}>CHUYÊN NGÀNH</label>
                <input
                  type="text"
                  value={formData.chuyenNganh || ''}
                  onChange={(e) => setFormData({ ...formData, chuyenNganh: e.target.value })}
                  className={inputCls}
                  placeholder="VD: Kiến trúc..."
                />
              </div>
              <div>
                <label className={labelCls}>BẰNG CẤP / TRÌNH ĐỘ</label>
                <input
                  type="text"
                  value={formData.bangCapTrinhDo || ''}
                  onChange={(e) => setFormData({ ...formData, bangCapTrinhDo: e.target.value })}
                  className={inputCls}
                  placeholder="VD: Cử nhân, Kỹ sư..."
                />
              </div>
              <div>
                <label className={labelCls}>NGUỒN TUYỂN DỤNG</label>
                <input
                  type="text"
                  value={formData.nguonTuyenDung || ''}
                  onChange={(e) => setFormData({ ...formData, nguonTuyenDung: e.target.value })}
                  className={inputCls}
                  placeholder="VD: VietnamWorks, Giới thiệu..."
                />
              </div>
            </div>
          </div>

          {/* ── 8. Footer Action Buttons ── */}
          <div className="flex items-center justify-end gap-3 pt-3 pb-1 border-t border-slate-100 bg-white sticky bottom-0">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 font-medium text-xs cursor-pointer transition shadow-2xs"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg bg-[#406c89] hover:bg-[#345870] disabled:opacity-70 text-white font-medium text-xs cursor-pointer transition shadow-xs flex items-center gap-1.5"
            >
              {isSubmitting && <IconLoader2 size={14} className="animate-spin" />}
              <span>{isSubmitting ? 'Đang lưu...' : 'Lưu'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
