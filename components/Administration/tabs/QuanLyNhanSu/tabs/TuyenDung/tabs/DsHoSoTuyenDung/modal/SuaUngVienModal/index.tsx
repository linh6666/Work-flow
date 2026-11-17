"use client";

import React, { useState, useEffect } from 'react';
import {
  IconX,
  IconPrinter,
  IconFileSpreadsheet,
  IconDownload,
  IconUpload,
  IconCalendar,
  IconClock,
} from '@tabler/icons-react';
import { HoSoTuyenDungItem } from '../../index';

interface SuaUngVienModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: HoSoTuyenDungItem | null;
  onSave: (updated: HoSoTuyenDungItem) => void;
}

export default function SuaUngVienModal({
  isOpen,
  onClose,
  candidate,
  onSave,
}: SuaUngVienModalProps) {
  const [formData, setFormData] = useState<Partial<HoSoTuyenDungItem>>({});

  useEffect(() => {
    if (candidate) {
      setFormData({ ...candidate });
    }
  }, [candidate]);

  if (!isOpen || !candidate) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hoTen?.trim()) {
      alert('Vui lòng nhập Họ và tên ứng viên');
      return;
    }

    const updated: HoSoTuyenDungItem = {
      ...candidate,
      ...(formData as HoSoTuyenDungItem),
      hoTen: formData.hoTen || candidate.hoTen,
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#fcfdfd] rounded-xl shadow-2xl border border-slate-300 w-full max-w-5xl max-h-[94vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-auto">
        {/* Top Control Bar */}
        <div className="p-3 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20">
          {/* Action buttons (Left) */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition"
            >
              <IconPrinter className="w-4 h-4 text-slate-700" />
              <span>In</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition"
            >
              <IconFileSpreadsheet className="w-4 h-4 text-slate-700" />
              <span>Excel</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition"
            >
              <IconDownload className="w-4 h-4 text-slate-700" />
              <span>PDF</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition"
            >
              <IconUpload className="w-4 h-4 text-slate-700" />
              <span>Import từ Excel</span>
            </button>
          </div>

          {/* Month selector & Close button (Right) */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#2d526a] tracking-wider uppercase">
                THÁNG
              </span>
              <select
                name="thang"
                value={formData.thang || 'Tháng 11'}
                onChange={handleChange}
                className="bg-white border border-slate-300 rounded-md px-3 py-1 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#406c89]"
              >
                <option value="Tháng 01">Tháng 01</option>
                <option value="Tháng 02">Tháng 02</option>
                <option value="Tháng 03">Tháng 03</option>
                <option value="Tháng 04">Tháng 04</option>
                <option value="Tháng 05">Tháng 05</option>
                <option value="Tháng 06">Tháng 06</option>
                <option value="Tháng 07">Tháng 07</option>
                <option value="Tháng 08">Tháng 08</option>
                <option value="Tháng 09">Tháng 09</option>
                <option value="Tháng 10">Tháng 10</option>
                <option value="Tháng 11">Tháng 11</option>
                <option value="Tháng 12">Tháng 12</option>
              </select>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 transition p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <IconX size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
            {/* ========================================================= */}
            {/* I. THÔNG TIN ỨNG VIÊN */}
            {/* ========================================================= */}
            <div className="border border-[#b49a53] rounded-md overflow-hidden bg-white shadow-xs">
              <div className="bg-[#b49a53] text-white font-bold text-xs uppercase px-4 py-2 tracking-wide flex items-center justify-between">
                <span>I. THÔNG TIN ỨNG VIÊN (CHỈNH SỬA)</span>
                <span className="text-[11px] font-normal opacity-90">ID: {candidate.id}</span>
              </div>

              {/* Row 1: STT, HỌ VÀ TÊN, NGÀY SINH */}
              <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200">
                <div className="p-2.5 md:border-r border-b md:border-b-0 border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    STT
                  </label>
                  <input
                    type="text"
                    name="stt"
                    value={formData.stt ?? candidate.stt}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>

                <div className="p-2.5 md:border-r border-b md:border-b-0 border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    HỌ VÀ TÊN <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="hoTen"
                    value={formData.hoTen ?? ''}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs font-semibold text-slate-800 py-1 outline-none"
                  />
                </div>

                <div className="p-2.5 relative">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    NGÀY SINH
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="ngaySinh"
                      value={formData.ngaySinh ?? ''}
                      onChange={handleChange}
                      placeholder="mm/dd/yyyy"
                      className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 pr-6 outline-none"
                    />
                    <IconCalendar className="w-4 h-4 text-slate-400 absolute right-1 top-1.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 2: GIỚI TÍNH, TÌNH TRẠNG HÔN NHÂN, CHIỀU CAO */}
              <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200">
                <div className="p-2.5 md:border-r border-b md:border-b-0 border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    GIỚI TÍNH
                  </label>
                  <input
                    type="text"
                    name="gioiTinh"
                    value={formData.gioiTinh ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>

                <div className="p-2.5 md:border-r border-b md:border-b-0 border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    TÌNH TRẠNG HÔN NHÂN
                  </label>
                  <input
                    type="text"
                    name="tinhTrangHonNhan"
                    value={formData.tinhTrangHonNhan ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>

                <div className="p-2.5">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    CHIỀU CAO
                  </label>
                  <input
                    type="text"
                    name="chieuCao"
                    value={formData.chieuCao ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>
              </div>

              {/* Row 3: CÂN NẶNG + empty */}
              <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200">
                <div className="p-2.5 md:border-r border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    CÂN NẶNG
                  </label>
                  <input
                    type="text"
                    name="canNang"
                    value={formData.canNang ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>
                <div className="md:col-span-2 hidden md:block bg-white"></div>
              </div>

              {/* Row 4: ĐỊA CHỈ HỘ KHẨU */}
              <div className="p-2.5 border-b border-slate-200">
                <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                  ĐỊA CHỈ HỘ KHẨU
                </label>
                <textarea
                  name="diaChiHoKhau"
                  value={formData.diaChiHoKhau ?? ''}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none resize-y"
                />
              </div>

              {/* Row 5: ĐỊA CHỈ ĐANG Ở */}
              <div className="p-2.5 border-b border-slate-200">
                <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                  ĐỊA CHỈ ĐANG Ở
                </label>
                <textarea
                  name="diaChiDangO"
                  value={formData.diaChiDangO ?? ''}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none resize-y"
                />
              </div>

              {/* Row 6: ĐIỆN THOẠI, EMAIL, SĐT NGƯỜI THÂN */}
              <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200">
                <div className="p-2.5 md:border-r border-b md:border-b-0 border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    ĐIỆN THOẠI <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="dienThoai"
                    value={formData.dienThoai ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>

                <div className="p-2.5 md:border-r border-b md:border-b-0 border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>

                <div className="p-2.5">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    SĐT NGƯỜI THÂN
                  </label>
                  <input
                    type="text"
                    name="sdtNguoiThan"
                    value={formData.sdtNguoiThan ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>
              </div>

              {/* Row 7: NGƯỜI THÂN (HỌ TÊN, QUAN HỆ) + empty */}
              <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200">
                <div className="p-2.5 md:border-r border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    NGƯỜI THÂN (HỌ TÊN, QUAN HỆ)
                  </label>
                  <input
                    type="text"
                    name="nguoiThan"
                    value={formData.nguoiThan ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>
                <div className="md:col-span-2 hidden md:block bg-white"></div>
              </div>

              {/* Row 8: CÁ TÍNH VÀ ĐIỂM MẠNH */}
              <div className="p-2.5 border-b border-slate-200">
                <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                  CÁ TÍNH VÀ ĐIỂM MẠNH
                </label>
                <textarea
                  name="caTinhVaDiemManh"
                  value={formData.caTinhVaDiemManh ?? ''}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none resize-y"
                />
              </div>

              {/* Row 9: SỞ THÍCH + empty */}
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="p-2.5 md:border-r border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    SỞ THÍCH
                  </label>
                  <input
                    type="text"
                    name="soThich"
                    value={formData.soThich ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>
                <div className="md:col-span-2 hidden md:block bg-white"></div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* II. HỌC VẤN & KINH NGHIỆM */}
            {/* ========================================================= */}
            <div className="border border-[#b49a53] rounded-md overflow-hidden bg-white shadow-xs">
              <div className="bg-[#b49a53] text-white font-bold text-xs uppercase px-4 py-2 tracking-wide">
                II. HỌC VẤN & KINH NGHIỆM
              </div>

              {/* Row 1: TRƯỜNG HỌC, CHUYÊN NGÀNH, KẾT QUẢ TỐT NGHIỆP */}
              <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200">
                <div className="p-2.5 md:border-r border-b md:border-b-0 border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    TRƯỜNG HỌC
                  </label>
                  <input
                    type="text"
                    name="truongHoc"
                    value={formData.truongHoc ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>

                <div className="p-2.5 md:border-r border-b md:border-b-0 border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    CHUYÊN NGÀNH
                  </label>
                  <input
                    type="text"
                    name="chuyenNganh"
                    value={formData.chuyenNganh ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>

                <div className="p-2.5">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    KẾT QUẢ TỐT NGHIỆP
                  </label>
                  <input
                    type="text"
                    name="ketQuaTotNghiep"
                    value={formData.ketQuaTotNghiep ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>
              </div>

              {/* Row 2: TRÌNH ĐỘ HỌC VẤN + empty */}
              <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200">
                <div className="p-2.5 md:border-r border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    TRÌNH ĐỘ HỌC VẤN
                  </label>
                  <input
                    type="text"
                    name="trinhDoHocVan"
                    value={formData.trinhDoHocVan ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>
                <div className="md:col-span-2 hidden md:block bg-white"></div>
              </div>

              {/* Row 3: THỜI GIAN ĐÃ LÀM */}
              <div className="p-2.5 border-b border-slate-200">
                <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                  THỜI GIAN ĐÃ LÀM
                </label>
                <textarea
                  name="thoiGianDaLam"
                  value={formData.thoiGianDaLam ?? ''}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none resize-y"
                />
              </div>

              {/* Row 4: CÔNG TY/ĐƠN VỊ ĐÃ LÀM */}
              <div className="p-2.5 border-b border-slate-200">
                <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                  CÔNG TY/ĐƠN VỊ ĐÃ LÀM
                </label>
                <textarea
                  name="congTyDonViDaLam"
                  value={formData.congTyDonViDaLam ?? ''}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none resize-y"
                />
              </div>

              {/* Row 5: VỊ TRÍ ĐÃ ĐẢM NHIỆM */}
              <div className="p-2.5">
                <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                  VỊ TRÍ ĐÃ ĐẢM NHIỆM
                </label>
                <textarea
                  name="viTriDaDamNhiem"
                  value={formData.viTriDaDamNhiem ?? ''}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none resize-y"
                />
              </div>
            </div>

            {/* ========================================================= */}
            {/* III. VỊ TRÍ ỨNG TUYỂN & NGUỒN */}
            {/* ========================================================= */}
            <div className="border border-[#b49a53] rounded-md overflow-hidden bg-white shadow-xs">
              <div className="bg-[#b49a53] text-white font-bold text-xs uppercase px-4 py-2 tracking-wide">
                III. VỊ TRÍ ỨNG TUYỂN & NGUỒN
              </div>

              {/* Row 1: CHỨC VỤ, PHÒNG BAN, NGÀY GỬI CV */}
              <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200">
                <div className="p-2.5 md:border-r border-b md:border-b-0 border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    CHỨC VỤ
                  </label>
                  <input
                    type="text"
                    name="chucVu"
                    value={formData.chucVu ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>

                <div className="p-2.5 md:border-r border-b md:border-b-0 border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    PHÒNG BAN
                  </label>
                  <input
                    type="text"
                    name="phongBan"
                    value={formData.phongBan ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>

                <div className="p-2.5 relative">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    NGÀY GỬI CV
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="ngayGuiCv"
                      value={formData.ngayGuiCv ?? ''}
                      onChange={handleChange}
                      placeholder="mm/dd/yyyy"
                      className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 pr-6 outline-none"
                    />
                    <IconCalendar className="w-4 h-4 text-slate-400 absolute right-1 top-1.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 2: NGUỒN TUYỂN DỤNG, LINK FB, empty */}
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="p-2.5 md:border-r border-b md:border-b-0 border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    NGUỒN TUYỂN DỤNG
                  </label>
                  <input
                    type="text"
                    name="nguonTuyenDung"
                    value={formData.nguonTuyenDung ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>

                <div className="p-2.5 md:border-r border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    LINK FB
                  </label>
                  <input
                    type="text"
                    name="linkFb"
                    value={formData.linkFb ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>

                <div className="hidden md:block bg-white"></div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* IV. SÀNG LỌC HỒ SƠ & BÀI KIỂM TRA */}
            {/* ========================================================= */}
            <div className="border border-[#b49a53] rounded-md overflow-hidden bg-white shadow-xs">
              <div className="bg-[#b49a53] text-white font-bold text-xs uppercase px-4 py-2 tracking-wide">
                IV. SÀNG LỌC HỒ SƠ & BÀI KIỂM TRA
              </div>

              {/* Row 1: LỌC CV, SL HS NỘP, HS UV ĐẠT */}
              <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200">
                <div className="p-2.5 md:border-r border-b md:border-b-0 border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    LỌC CV
                  </label>
                  <input
                    type="text"
                    name="locCv"
                    value={formData.locCv ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>

                <div className="p-2.5 md:border-r border-b md:border-b-0 border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    SL HS NỘP
                  </label>
                  <input
                    type="text"
                    name="slHsNop"
                    value={formData.slHsNop ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>

                <div className="p-2.5">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    HS UV ĐẠT
                  </label>
                  <input
                    type="text"
                    name="hsUvDat"
                    value={formData.hsUvDat ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>
              </div>

              {/* Row 2: UV ĐƯỢC YÊU CẦU LÀM BÀI, NGÀY GỬI ĐỀ KIỂM TRA, NGÀY NỘP BÀI LÀM */}
              <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200">
                <div className="p-2.5 md:border-r border-b md:border-b-0 border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    UV ĐƯỢC YÊU CẦU LÀM BÀI
                  </label>
                  <input
                    type="text"
                    name="uvDuocYeuCauLamBai"
                    value={formData.uvDuocYeuCauLamBai ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>

                <div className="p-2.5 md:border-r border-b md:border-b-0 border-slate-200 relative">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    NGÀY GỬI ĐỀ KIỂM TRA
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="ngayGuiDeKiemTra"
                      value={formData.ngayGuiDeKiemTra ?? ''}
                      onChange={handleChange}
                      placeholder="mm/dd/yyyy"
                      className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 pr-6 outline-none"
                    />
                    <IconCalendar className="w-4 h-4 text-slate-400 absolute right-1 top-1.5 pointer-events-none" />
                  </div>
                </div>

                <div className="p-2.5 relative">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    NGÀY NỘP BÀI LÀM
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="ngayNopBaiLam"
                      value={formData.ngayNopBaiLam ?? ''}
                      onChange={handleChange}
                      placeholder="mm/dd/yyyy"
                      className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 pr-6 outline-none"
                    />
                    <IconCalendar className="w-4 h-4 text-slate-400 absolute right-1 top-1.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 3: KẾT QUẢ/PHẢN HỒI BÀI TEST */}
              <div className="p-2.5 border-b border-slate-200">
                <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                  KẾT QUẢ/PHẢN HỒI BÀI TEST
                </label>
                <textarea
                  name="ketQuaPhanHoiBaiTest"
                  value={formData.ketQuaPhanHoiBaiTest ?? ''}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none resize-y"
                />
              </div>

              {/* Row 4: UV BÀI LÀM ĐẠT + empty */}
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="p-2.5 md:border-r border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    UV BÀI LÀM ĐẠT
                  </label>
                  <input
                    type="text"
                    name="uvBaiLamDat"
                    value={formData.uvBaiLamDat ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>
                <div className="md:col-span-2 hidden md:block bg-white"></div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* V. PHÒNG VẤN & KẾT QUẢ */}
            {/* ========================================================= */}
            <div className="border border-[#b49a53] rounded-md overflow-hidden bg-white shadow-xs">
              <div className="bg-[#b49a53] text-white font-bold text-xs uppercase px-4 py-2 tracking-wide">
                V. PHÒNG VẤN & KẾT QUẢ
              </div>

              {/* Row 1: LỊCH PV 1 (NGÀY-GIỜ), GIỜ PV, UV ĐƯỢC HẸN PV */}
              <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200">
                <div className="p-2.5 md:border-r border-b md:border-b-0 border-slate-200 relative">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    LỊCH PV 1 (NGÀY-GIỜ)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="lichPv1"
                      value={formData.lichPv1 ?? ''}
                      onChange={handleChange}
                      placeholder="mm/dd/yyyy"
                      className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 pr-6 outline-none"
                    />
                    <IconCalendar className="w-4 h-4 text-slate-400 absolute right-1 top-1.5 pointer-events-none" />
                  </div>
                </div>

                <div className="p-2.5 md:border-r border-b md:border-b-0 border-slate-200 relative">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    GIỜ PV
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="gioPv"
                      value={formData.gioPv ?? ''}
                      onChange={handleChange}
                      placeholder="--:-- --"
                      className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 pr-6 outline-none"
                    />
                    <IconClock className="w-4 h-4 text-slate-400 absolute right-1 top-1.5 pointer-events-none" />
                  </div>
                </div>

                <div className="p-2.5">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    UV ĐƯỢC HẸN PV
                  </label>
                  <input
                    type="text"
                    name="uvDuocHenPv"
                    value={formData.uvDuocHenPv ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>
              </div>

              {/* Row 2: UV THAM GIA PV + empty */}
              <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200">
                <div className="p-2.5 md:border-r border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    UV THAM GIA PV
                  </label>
                  <input
                    type="text"
                    name="uvThamGiaPv"
                    value={formData.uvThamGiaPv ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>
                <div className="md:col-span-2 hidden md:block bg-white"></div>
              </div>

              {/* Row 3: TỔNG KẾT KẾT QUẢ KT VÀ LÝ DO */}
              <div className="p-2.5 border-b border-slate-200">
                <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                  TỔNG KẾT KẾT QUẢ KT VÀ LÝ DO
                </label>
                <textarea
                  name="tongKetKetQuaKtVaLyDo"
                  value={formData.tongKetKetQuaKtVaLyDo ?? ''}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none resize-y"
                />
              </div>

              {/* Row 4: UV ĐẠT YÊU CẦU, UV NHẬN VIỆC, NGÀY BẮT ĐẦU ĐI LÀM/THỬ VIỆC */}
              <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200">
                <div className="p-2.5 md:border-r border-b md:border-b-0 border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    UV ĐẠT YÊU CẦU
                  </label>
                  <input
                    type="text"
                    name="uvDatYeuCau"
                    value={formData.uvDatYeuCau ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>

                <div className="p-2.5 md:border-r border-b md:border-b-0 border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    UV NHẬN VIỆC
                  </label>
                  <input
                    type="text"
                    name="uvNhanViec"
                    value={formData.uvNhanViec ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>

                <div className="p-2.5 relative">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    NGÀY BẮT ĐẦU ĐI LÀM/THỬ VIỆC
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="ngayBatDauDiLamThuViec"
                      value={formData.ngayBatDauDiLamThuViec ?? ''}
                      onChange={handleChange}
                      placeholder="mm/dd/yyyy"
                      className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 pr-6 outline-none"
                    />
                    <IconCalendar className="w-4 h-4 text-slate-400 absolute right-1 top-1.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 5: KẾT QUẢ + empty */}
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="p-2.5 md:border-r border-slate-200">
                  <label className="block text-[11px] font-bold text-[#2d526a] uppercase mb-1">
                    KẾT QUẢ
                  </label>
                  <input
                    type="text"
                    name="ketQua"
                    value={formData.ketQua ?? ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-dotted border-slate-300 focus:border-solid focus:border-[#406c89] text-xs text-slate-800 py-1 outline-none"
                  />
                </div>
                <div className="md:col-span-2 hidden md:block bg-white"></div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 z-20">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-xs font-semibold text-white bg-[#406c89] rounded-lg hover:bg-[#345870] transition-colors shadow-xs"
            >
              Cập nhật hồ sơ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
