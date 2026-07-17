"use client";

import React, { useState } from 'react';
import { 
  IconArrowLeft, 
  IconPlus, 
  IconFolderPlus, 
  IconPencil, 
  IconCopy, 
  IconTrash 
} from '@tabler/icons-react';

interface NhanSuConfigProps {
  onClose: () => void;
}

const DEPARTMENTS = [
  { name: 'Ban Giám đốc', count: 3 },
  { name: 'Văn phòng', count: 8 },
  { name: 'Lắp đặt', count: 2 },
  { name: 'Công nghệ và Thiết kế', count: 5 },
  { name: 'Cảnh Quan', count: 2 },
  { name: 'Cắt', count: 10 },
  { name: 'Ghép', count: 17 },
  { name: 'Khai triển', count: 6 },
  { name: 'Mộc Sơn', count: 4 },
  { name: 'Điện', count: 2 },
];

const STAFF_BY_DEPT: Record<string, { id: string; name: string; role: string; price: string }[]> = {
  'Ban Giám đốc': [
    { id: 'NV001', name: 'Nguyễn Đức Việt', role: 'Giám đốc', price: '500.000 đ' },
    { id: 'NV002', name: 'Phùng Bích Thảo', role: 'Phó Giám đốc', price: '450.000 đ' },
    { id: 'NV003', name: 'Nguyễn Thanh Tuấn', role: 'Phó Giám đốc', price: '450.000 đ' },
  ],
  'Văn phòng': [
    { id: 'NV004', name: 'Vũ Thanh Thủy', role: 'Trưởng phòng', price: '350.000 đ' },
    { id: 'NV005', name: 'Bùi Thị Duyên', role: 'Trưởng phòng', price: '400.000 đ' },
    { id: 'NV006', name: 'Nguyễn Mai Lâm', role: 'KTV chính', price: '350.000 đ' },
    { id: 'NV007', name: 'Trần Thị Quỳnh Xuân', role: 'KTV phụ', price: '300.000 đ' },
    { id: 'NV007_2', name: 'Trần Thị Quỳnh Xuân', role: 'KTV chính', price: '300.000 đ' },
    { id: 'NV008', name: 'Bùi Phương Uyên', role: 'KTV chính', price: '350.000 đ' },
    { id: 'NV009', name: 'Nguyễn Phú Quang', role: 'KTV chính', price: '350.000 đ' },
    { id: 'NV013', name: 'Trần Thị Loan', role: 'KTV phụ', price: '300.000 đ' },
  ],
  'Lắp đặt': [
    { id: 'NV110', name: 'Nhân viên lắp đặt 1', role: 'KTV chính', price: '350.000 đ' },
    { id: 'NV111', name: 'Nhân viên lắp đặt 2', role: 'KTV phụ', price: '250.000 đ' },
  ],
  'Công nghệ và Thiết kế': [
    { id: '15 NV018', name: 'Nguyễn Quang Linh', role: 'KTV chính', price: '400.000 đ' },
    { id: 'NV010', name: 'Nguyễn Quang Triệu', role: 'Trưởng phòng', price: '550.000 đ' },
    { id: 'NV015', name: 'Lưu Quốc Nhật', role: 'KTV chính', price: '450.000 đ' },
    { id: 'NV016', name: 'Cao Trường Thiên', role: 'KTV chính', price: '400.000 đ' },
    { id: 'NV017', name: 'Tạ Hiển Trang', role: 'KTV chính', price: '3.500.000 đ' },
  ],
  'Cảnh Quan': [
    { id: 'NV100', name: 'Trưởng phòng Cảnh Quan', role: 'Trưởng phòng', price: '500.000 đ' },
    { id: 'NV101', name: 'KTV Cảnh Quan 1', role: 'KTV chính', price: '350.000 đ' },
  ],
  'Cắt': [
    { id: 'MV046', name: 'MÁY CẮT 4 - CMA1390', role: 'KTV chính', price: '0 đ' },
    { id: 'NV040', name: 'Hoàng Hữu Vinh', role: 'Trưởng phòng', price: '500.000 đ' },
    { id: 'NV042', name: 'Nguyễn Tuấn Việt', role: 'KTV chính', price: '350.000 đ' },
    { id: 'NV043', name: 'Bùi Quang Nhật', role: 'KTV phụ', price: '240.000 đ' },
    { id: 'NV043_2', name: 'MÁY CẮT 1- CMA1390', role: 'KTV chính', price: '0 đ' },
    { id: 'NV043_3', name: 'Lê Trung Hiếu', role: 'KTV chính', price: '350.000 đ' },
    { id: 'nv044', name: 'MÁY CẮT 2 - CMA1390', role: 'KTV chính', price: '0 đ' },
    { id: 'NV046_2', name: 'MÁY CẮT 3- CMA1390-ST', role: 'KTV chính', price: '0 đ' },
    { id: 'NV047', name: 'MÁY CẮT 6 - BABYLON_6040', role: 'KTV chính', price: '0 đ' },
    { id: 'NV047_2', name: 'MÁY CẮT 5 - CMA1610', role: 'KTV chính', price: '0 đ' },
  ],
  'Ghép': [
    { id: 'BTG070', name: 'Thân Thị Nguyệt', role: 'KTV phụ', price: '240.000 đ' },
    { id: 'BTG071', name: 'Nguyễn Đăng Chính', role: 'KTV phụ', price: '240.000 đ' },
    { id: 'BTG076', name: 'Nguyễn Thị Thúy Kiều', role: 'KTV phụ', price: '240.000 đ' },
    { id: 'BTG077', name: 'Nguyễn Thị Quỳnh Châu', role: 'KTV phụ', price: '240.000 đ' },
    { id: 'BTG106', name: 'Vũ Thị Hà Ly', role: 'KTV phụ', price: '240.000 đ' },
    { id: 'BTG150', name: 'Nguyễn Thị Huyền', role: 'KTV phụ', price: '240.000 đ' },
    { id: 'BTG152', name: 'Nguyễn Quang Lợi', role: 'KTV phụ', price: '240.000 đ' },
    { id: 'BTG153', name: 'Đặng Văn Điệp', role: 'KTV phụ', price: '240.000 đ' },
    { id: 'BTG154', name: 'Ninh Quang Vinh', role: 'KTV phụ', price: '240.000 đ' },
    { id: 'NV050', name: 'Bùi Ngọc Sỹ', role: 'Trưởng phòng', price: '500.000 đ' },
    { id: 'NV052', name: 'Đinh Đức Lợi', role: 'KTV chính', price: '350.000 đ' },
    { id: 'NV053', name: 'Nguyễn Tuân', role: 'KTV chính', price: '350.000 đ' },
    { id: 'NV055', name: 'Đỗ Thị Luyên', role: 'KTV chính', price: '250.000 đ' },
    { id: 'NV056', name: 'Nguyễn Thị Lanh', role: 'KTV chính', price: '250.000 đ' },
    { id: 'NV057', name: 'Nguyễn Hoàng Phi Hùng', role: 'KTV phụ', price: '300.000 đ' },
    { id: 'NV058', name: 'Lương Ngọc Thành', role: 'KTV phụ', price: '300.000 đ' },
    { id: 'NV062', name: 'Nguyễn Chí Hiếu', role: 'KTV phụ', price: '300.000 đ' },
  ],
  'Khai triển': [
    { id: 'NV020', name: 'Lê Quốc Long', role: 'Trưởng phòng', price: '500.000 đ' },
    { id: 'NV021', name: 'Trần Diễm My', role: 'KTV chính', price: '350.000 đ' },
    { id: 'NV022', name: 'Phạm Tiến Thành', role: 'KTV chính', price: '350.000 đ' },
    { id: 'NV025', name: 'Dương Việt Anh', role: 'KTV chính', price: '350.000 đ' },
    { id: 'NV028', name: 'Đào Văn Thọ', role: 'KTV chính', price: '350.000 đ' },
    { id: 'NV111', name: 'Nguyễn Thiên Hương', role: 'KTV chính', price: '350.000 đ' },
  ],
  'Mộc Sơn': [
    { id: 'NV080', name: 'Đinh Hữu Sứ', role: 'Trưởng phòng', price: '50.000 đ' },
    { id: 'NV082', name: 'Hoàng Quyết Thắng', role: 'KTV chính', price: '500.000 đ' },
    { id: 'NV084', name: 'Nguyễn Minh Hoàng', role: 'KTV phụ', price: '350.000 đ' },
    { id: 'NV084_2', name: 'Nguyễn Minh Hiếu', role: 'KTV phụ', price: '350.000 đ' },
  ],
  'Điện': [
    { id: 'NV090', name: 'Trưởng phòng Điện', role: 'Trưởng phòng', price: '500.000 đ' },
    { id: 'NV091', name: 'KTV Điện 1', role: 'KTV chính', price: '350.000 đ' },
  ],
};

const JOBS_BY_DEPT: Record<string, { code: string; name: string }[]> = {
  'Văn phòng': [
    { code: '1', name: 'CHUẨN BỊ HỢP ĐỒNG' },
    { code: '2', name: 'KHỞI TẠO DỰ ÁN' },
    { code: '3', name: 'THEO DÕI THỰC HIỆN HỢP ĐỒNG' },
    { code: '4', name: 'CHỈNH SỬA VÀ VẬN CHUYỂN' },
    { code: '5', name: 'THEO DÕI THANH TOÁN VÀ SỬ DỤNG SẢN PHẨM' },
  ],
  'Lắp đặt': [
    { code: '8.1', name: 'Đóng gói, kiểm tra trước vận chuyển' },
    { code: '8.2', name: 'Vận chuyển mô hình' },
    { code: '8.3', name: 'Lắp đặt tại địa điểm' },
    { code: '8.4', name: 'Kiểm tra & bàn giao' },
  ],
  'Công nghệ và Thiết kế': [
    { code: '7.1', name: 'Thống kê' },
    { code: '7.2', name: 'Thiết kế mô hình 3D' },
    { code: '7.3', name: 'Thiết kế bản vẽ kỹ thuật' },
    { code: '7.4', name: 'Hỗ trợ khai triển' },
  ],
  'Cảnh Quan': [
    { code: '6.1', name: 'Thống kê' },
    { code: '6.2', name: 'Cảnh quan nền' },
    { code: '6.3', name: 'Cảnh quan công trình' },
    { code: '6.4', name: 'Lắp đặt mô hình' },
  ],
  'Cắt': [
    { code: '2.1', name: 'Thống kê' },
    { code: '2.2', name: 'Cắt khung bảng' },
    { code: '2.3', name: 'Cắt nền' },
    { code: '2.4', name: 'Cắt công trình' },
    { code: '2.5', name: 'Cắt nội thất' },
    { code: '2.6', name: 'Lắp đặt mô hình' },
  ],
  'Ghép': [
    { code: '3.1', name: 'Thống kê' },
    { code: '3.2', name: 'Ghép nền' },
    { code: '3.3', name: 'Ghép công trình' },
    { code: '3.4', name: 'Ghép nội thất' },
    { code: '3.5', name: 'Lắp đặt mô hình' },
  ],
  'Khai triển': [
    { code: '1.1', name: 'Thống kê' },
    { code: '1.2', name: 'Lập hồ sơ xác nhận khai triển với khách hàng' },
    { code: '1.3', name: 'Khai triển khung chân, kính bảo vệ' },
    { code: '1.4', name: 'Khai triển nền' },
    { code: '1.5', name: 'Khai triển công trình' },
    { code: '1.6', name: 'Khai triển nội thất' },
    { code: '1.7', name: 'Lắp đặt mô hình' },
  ],
  'Mộc Sơn': [
    { code: '4.1', name: 'Thống kê' },
    { code: '4.2', name: 'Sơn nền' },
    { code: '4.3', name: 'Sơn công trình' },
    { code: '4.4', name: 'Sơn nội thất' },
    { code: '4.5', name: 'Lắp đặt mô hình' },
  ],
  'Điện': [
    { code: '5.1', name: 'Thống kê' },
    { code: '5.2', name: 'Lắp điện lõi' },
    { code: '5.3', name: 'Lắp điện công trình' },
    { code: '5.4', name: 'Lắp hệ thống điều khiển ánh sáng' },
    { code: '5.5', name: 'Lắp đặt mô hình' },
  ],
  'Ban Giám đốc': [],
};

const FallbackStaff = (deptName: string) => [
  { id: 'NV101', name: `Nhân viên ${deptName} 1`, role: 'KTV chính', price: '350.000 đ' },
  { id: 'NV102', name: `Nhân viên ${deptName} 2`, role: 'KTV phụ', price: '250.000 đ' },
];

export default function NhanSuConfig({ onClose }: NhanSuConfigProps) {
  const [activeTab, setActiveTab] = useState('Điện'); // Default to Điện to match user context

  const activeCount = DEPARTMENTS.find(d => d.name === activeTab)?.count || 0;
  const staffList = STAFF_BY_DEPT[activeTab] || FallbackStaff(activeTab);
  const jobsList = JOBS_BY_DEPT[activeTab] || [];

  const getDeptDisplayName = (name: string) => {
    if (name === 'Văn phòng') return 'Khối Văn phòng';
    if (name === 'Công nghệ và Thiết kế') return 'Phòng Công nghệ và Thiết kế';
    if (name === 'Cảnh Quan') return 'Phòng Cảnh Quan';
    if (name === 'Cắt') return 'Phòng Cắt';
    if (name === 'Ghép') return 'Phòng Ghép';
    if (name === 'Khai triển') return 'Phòng Khai triển';
    if (name === 'Mộc Sơn') return 'Phòng Mộc Sơn';
    if (name === 'Điện') return 'Phòng Điện';
    return name;
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-200">
      
      {/* ── Header Area ── */}
      <div className="px-6 pt-5 pb-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 gap-4 shrink-0">
        
        {/* Left Back & Titles */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer bg-white active:scale-95 shadow-2xs shrink-0"
          >
            <IconArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">Cấu hình mẫu nhân sự & đơn giá</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Mặc định cho từng phòng ban khi lập bảng nhân sự dự án
            </p>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            type="button" 
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer shadow-2xs transition-all active:scale-95"
            onClick={() => alert("Thêm phòng ban mới...")}
          >
            <IconFolderPlus size={14} />
            Thêm phòng ban
          </button>
          
          <button 
            type="button" 
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-bold shadow-sm cursor-pointer transition-all active:scale-95 bg-[#2d3785] hover:bg-[#202760]"
            onClick={() => alert("Thêm nhân viên mới...")}
          >
            <IconPlus size={14} />
            Thêm nhân viên
          </button>
        </div>
      </div>

      {/* ── Tab Row ── */}
      <div className="border-b border-slate-100 shrink-0 bg-slate-50/20 px-6">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2 flex-nowrap whitespace-nowrap">
          {DEPARTMENTS.map((dept) => {
            const isSelected = dept.name === activeTab;
            return (
              <button
                key={dept.name}
                type="button"
                onClick={() => setActiveTab(dept.name)}
                className={`pb-2.5 pt-1.5 text-xs font-semibold relative transition-all cursor-pointer select-none ${
                  isSelected 
                    ? 'text-[#2d3785] font-bold border-b-2 border-[#2d3785]' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {dept.name} <span className="text-[10px] opacity-75">({dept.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Scrollable Body ── */}
      <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar bg-slate-50/30">
        
        {/* Two Panel Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT PANEL: Staff List */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-3xs overflow-hidden flex flex-col">
            
            {/* Panel Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                {getDeptDisplayName(activeTab)} — Danh sách nhân viên mặc định
              </h3>
              <span className="text-xs text-slate-400 font-semibold">{activeCount} người</span>
            </div>

            {/* Table */}
            <div className="overflow-auto no-scrollbar max-h-[500px]">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="sticky top-0 z-10 bg-slate-50 border-b border-slate-100">
                    <th className="px-5 py-3 bg-slate-50">Mã NV</th>
                    <th className="px-5 py-3 bg-slate-50">Họ tên</th>
                    <th className="px-5 py-3 bg-slate-50">Vai trò</th>
                    <th className="px-5 py-3 bg-slate-50">Đơn giá/Ngày</th>
                    <th className="px-5 py-3 bg-slate-50 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {staffList.map((row, idx) => {
                    const cleanId = row.id.split('_')[0]; // Strip internal uniqueness suffixes like _2
                    return (
                      <tr key={row.id + '-' + idx} className="hover:bg-slate-50/30 bg-white transition-colors">
                        <td className="px-5 py-3.5 font-bold text-indigo-900 text-xs leading-tight">
                          {cleanId.includes(' ') ? (
                            <div className="flex flex-col">
                              {cleanId.split(' ').map((part, pIdx) => (
                                <span key={pIdx} className={pIdx === 0 ? 'text-slate-400 text-[10px] font-semibold' : 'text-indigo-950 font-bold'}>{part}</span>
                              ))}
                            </div>
                          ) : (
                            cleanId
                          )}
                        </td>
                        <td className="px-5 py-3.5 font-bold text-slate-800 text-[13px]">{row.name}</td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center justify-center text-center text-[10px] font-bold py-0.5 px-2.5 rounded-full whitespace-nowrap ${
                            row.role === 'Trưởng phòng'
                              ? 'bg-[#fae8ff] text-[#a21caf]'
                              : row.role === 'KTV chính'
                              ? 'bg-[#dbeafe] text-[#1d4ed8]'
                              : row.role === 'KTV phụ'
                              ? 'bg-slate-100 text-slate-600'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {row.role}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-[#2d3785] font-extrabold text-sm">{row.price}</td>
                        <td className="px-5 py-3.5 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2.5 justify-end">
                            <button 
                              type="button" 
                              className="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                              onClick={() => alert(`Sửa nhân viên: ${row.name}`)}
                            >
                              <IconPencil size={16} />
                            </button>
                            <button 
                              type="button" 
                              className="text-slate-400 hover:text-indigo-655 transition-colors cursor-pointer"
                              onClick={() => alert(`Sao chép nhân viên: ${row.name}`)}
                            >
                              <IconCopy size={16} />
                            </button>
                            <button 
                              type="button" 
                              className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                              onClick={() => alert(`Xóa nhân viên: ${row.name}`)}
                            >
                              <IconTrash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>

          {/* RIGHT PANEL: Job / Work List */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-3xs overflow-hidden flex flex-col">
            
            {/* Panel Header */}
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  {getDeptDisplayName(activeTab)} — Danh mục công việc
                </h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{jobsList.length} hạng mục</p>
              </div>
              <button 
                type="button"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-655 hover:bg-slate-50 cursor-pointer shadow-3xs active:scale-95 transition-all"
                onClick={() => alert("Thêm công việc mới...")}
              >
                <IconPlus size={12} />
                Thêm CV
              </button>
            </div>

            {/* Body */}
            {jobsList.length > 0 ? (
              <div className="divide-y divide-slate-100 flex-1 overflow-y-auto no-scrollbar">
                {jobsList.map((job) => (
                  <div key={job.code + '-' + job.name} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50/20 bg-white transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-slate-400 font-bold w-6">{job.code}</span>
                      <span className="text-[11px] font-bold text-slate-800 tracking-wide">{job.name}</span>
                    </div>
                    <div className="inline-flex items-center gap-2">
                      <button 
                        type="button" 
                        className="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                        onClick={() => alert(`Sửa công việc: ${job.name}`)}
                      >
                        <IconPencil size={15} />
                      </button>
                      <button 
                        type="button" 
                        className="text-slate-400 hover:text-indigo-655 transition-colors cursor-pointer"
                        onClick={() => alert(`Sao chép công việc: ${job.name}`)}
                      >
                        <IconCopy size={15} />
                      </button>
                      <button 
                        type="button" 
                        className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                        onClick={() => alert(`Xóa công việc: ${job.name}`)}
                      >
                        <IconTrash size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center flex flex-col items-center justify-center min-h-[220px]">
                <p className="text-xs text-slate-400">
                  Chưa có hạng mục.{' '}
                  <button 
                    type="button"
                    onClick={() => alert("Thêm công việc mới...")}
                    className="text-indigo-600 hover:underline font-semibold bg-transparent cursor-pointer"
                  >
                    Thêm ngay
                  </button>
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
