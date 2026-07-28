"use client";

import React, { useState, useEffect } from 'react';
import { 
  IconArrowLeft, 
  IconPencil, 
  IconCircleCheck, 
  IconFolderFilled,
  IconChevronDown,
  IconChevronUp,
  IconUsers,
  IconReportMoney,
  IconBulb,
  IconDeviceFloppy
} from '@tabler/icons-react';
import EditNhanSuModal from '../editNhanSuModal/EditNhanSuModal';

interface NhanSuData {
  id: string;
  duAn: string;
  maKH: string;
  khachHang: string;
  nvLap: string;
  ngayLap: string;
  trangThai: 'dang-dien' | 'da-tong-hop';
  lienKetDeXuat?: string;
  tyLeMoHinh?: string;
  kichThuocDuKien?: string;
  diaDiemLapDat?: string;
  duongDanHoSo?: string;
  loaiChan?: string;
  kinh?: string;
  anhSang?: string[];
  congNghe?: string[];
  ghiChu?: string;
}

interface XemNhanSuProps {
  plan: NhanSuData;
  onClose: () => void;
  onPlanUpdate?: (updated: NhanSuData) => void;
}

const DEPARTMENTS = [
  'Khai triển',
  'Cắt',
  'Ghép',
  'Mộc Sơn',
  'Điện',
  'Cảnh Quan',
  'Công nghệ và Thiết kế',
  'Lắp đặt'
];

const JOBS_BY_DEPT: Record<string, string[]> = {
  'Khai triển': [
    'Thống kê',
    'Lập hồ sơ xác nhận khai triển với khách hàng',
    'Khai triển khung chân, kính bảo vệ',
    'Khai triển nền',
    'Khai triển công trình',
    'Khai triển nội thất',
    'Lắp đặt mô hình'
  ],
  'Cắt': [
    'Thống kê',
    'Cắt khung bảng',
    'Cắt nền',
    'Cắt công trình',
    'Cắt nội thất',
    'Lắp đặt mô hình'
  ],
  'Ghép': [
    'Thống kê',
    'Ghép nền',
    'Ghép công trình',
    'Ghép nội thất',
    'Lắp đặt mô hình'
  ],
  'Mộc Sơn': [
    'Thống kê',
    'Sơn nền',
    'Sơn công trình',
    'Sơn nội thất',
    'Lắp đặt mô hình'
  ],
  'Điện': [
    'Thống kê',
    'Lắp điện lõi',
    'Lắp điện công trình',
    'Lắp hệ thống điều khiển ánh sáng',
    'Lắp đặt mô hình'
  ],
  'Cảnh Quan': [
    'Thống kê',
    'Cảnh quan nền',
    'Cảnh quan công trình',
    'Lắp đặt mô hình'
  ],
  'Công nghệ và Thiết kế': [
    'Thống kê',
    'Thiết kế mô hình 3D',
    'Thiết kế bản vẽ kỹ thuật',
    'Hỗ trợ khai triển'
  ],
  'Lắp đặt': [
    'Đóng gói, kiểm tra trước vận chuyển',
    'Vận chuyển mô hình',
    'Lắp đặt tại địa điểm',
    'Kiểm tra & bàn giao'
  ]
};

const STAFF_BY_DEPT: Record<string, { id: string; name: string; role: string; price: string }[]> = {
  'Khai triển': [
    { id: 'NV101', name: 'Nguyễn Văn Tiến', role: 'KTV chính', price: '350.000 đ' },
    { id: 'NV102', name: 'Trần Minh Quân', role: 'KTV phụ', price: '250.000 đ' },
  ],
  'Cắt': [
    { id: 'MV046', name: 'MÁY CẮT 4 - CMA1390', role: 'KTV chính', price: '0 đ' },
    { id: 'NV040', name: 'Hoàng Hữu Vinh', role: 'Trưởng phòng', price: '500.000 đ' },
    { id: 'NV042', name: 'Nguyễn Tuấn Việt', role: 'KTV chính', price: '350.000 đ' },
  ],
  'Ghép': [
    { id: 'NV201', name: 'Đỗ Hoàng Anh', role: 'KTV chính', price: '350.000 đ' },
    { id: 'NV202', name: 'Phạm Đức Huy', role: 'KTV phụ', price: '250.000 đ' },
  ],
  'Mộc Sơn': [
    { id: 'NV301', name: 'Trịnh Xuân Hùng', role: 'KTV chính', price: '350.000 đ' },
    { id: 'NV302', name: 'Phùng Bùi Nam', role: 'KTV phụ', price: '240.000 đ' },
  ],
  'Điện': [
    { id: 'NV401', name: 'Lê Thiết Hùng', role: 'KTV chính', price: '350.000 đ' },
    { id: 'NV402', name: 'Đỗ Văn Cường', role: 'KTV phụ', price: '250.000 đ' },
  ],
  'Cảnh Quan': [
    { id: 'NV501', name: 'Vũ Ngọc Hân', role: 'KTV chính', price: '350.000 đ' },
    { id: 'NV502', name: 'Nguyễn Thị Hoa', role: 'KTV phụ', price: '250.000 đ' },
  ],
  'Công nghệ và Thiết kế': [
    { id: '15 NV018', name: 'Nguyễn Quang Linh', role: 'KTV chính', price: '400.000 đ' },
    { id: 'NV010', name: 'Nguyễn Quang Triệu', role: 'Trưởng phòng', price: '550.000 đ' },
  ],
  'Lắp đặt': [
    { id: 'NV601', name: 'Phan Văn Nam', role: 'KTV chính', price: '350.000 đ' },
    { id: 'NV602', name: 'Nguyễn Khắc Phục', role: 'KTV phụ', price: '250.000 đ' },
  ]
};

export default function XemNhanSu({ plan, onClose, onPlanUpdate }: XemNhanSuProps) {
  const [currentPlan, setCurrentPlan] = useState<NhanSuData>(plan);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'nhan-su' | 'chi-phi'>('nhan-su');
  const [expandedDepts, setExpandedDepts] = useState<Record<string, boolean>>({});
  const [savedDepts, setSavedDepts] = useState<Record<string, boolean>>({});
  const [daysMatrix, setDaysMatrix] = useState<Record<string, Record<string, string>>>({});

  // Sync with prop when changed from parent
  useEffect(() => {
    setCurrentPlan(plan);
  }, [plan]);

  const toggleDept = (dept: string) => {
    setExpandedDepts(prev => ({
      ...prev,
      [dept]: !prev[dept]
    }));
  };

  const handleSaveDeptMatrix = (dept: string) => {
    setSavedDepts(prev => ({ ...prev, [dept]: true }));
    alert(`Đã lưu bảng dự kiến nhân nhật cho phòng ban: ${dept}`);
  };

  const handleMatrixChange = (dept: string, key: string, value: string) => {
    setDaysMatrix(prev => ({
      ...prev,
      [dept]: {
        ...(prev[dept] || {}),
        [key]: value
      }
    }));
  };

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

  const getDeptFilledCount = () => {
    return Object.keys(savedDepts).filter(k => savedDepts[k]).length;
  };

  const handleSaveEditModal = (updatedPlan: NhanSuData) => {
    setCurrentPlan(updatedPlan);
    if (onPlanUpdate) {
      onPlanUpdate(updatedPlan);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-200 text-xs">
      
      {/* ── HEADER REGION ── */}
      <div className="px-8 pt-6 pb-5 flex flex-col md:flex-row md:items-start justify-between gap-5 shrink-0 border-b border-slate-50/50">
        
        {/* Left column: Back Button + Meta info */}
        <div className="flex items-start gap-3 flex-1">
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-slate-200 bg-white transition-all cursor-pointer shadow-3xs active:scale-95 flex items-center justify-center shrink-0"
          >
            <IconArrowLeft size={16} />
          </button>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight leading-tight">
                {currentPlan.duAn}
              </h2>
              {currentPlan.trangThai === 'dang-dien' ? (
                <span className="inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-full text-amber-700 bg-amber-50 border border-amber-100">
                  Đang điền
                </span>
              ) : (
                <span className="inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-full text-emerald-700 bg-emerald-50 border border-emerald-100">
                  Đã tổng hợp
                </span>
              )}
            </div>

            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
              {currentPlan.maKH || 'DKNS-004-2026'} - KH: {currentPlan.khachHang || 'N/A'} - Lập: {currentPlan.nvLap} - {currentPlan.ngayLap}
            </p>

            <p className="text-[10px] text-slate-400 italic font-medium">
              Ghi chú: {currentPlan.ghiChu || `Tự động tạo khi PGĐ phê duyệt Đề xuất ${currentPlan.lienKetDeXuat || 'ĐXBG-002-2026'}`}
            </p>

            <div className="pt-1">
              <a 
                href={currentPlan.duongDanHoSo || '#'} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-indigo-700 font-bold hover:underline text-xs"
              >
                <IconFolderFilled size={15} className="text-amber-400" />
                <span className="underline">Hồ sơ dự án</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right column: Action buttons */}
        <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
          <button
            type="button"
            onClick={() => setIsEditOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all cursor-pointer active:scale-95 shadow-3xs"
          >
            <IconPencil size={15} className="text-slate-500" />
            Chỉnh sửa thông tin
          </button>
          
          <button
            type="button"
            onClick={() => alert('Đang tổng hợp kế hoạch nhân sự ngay...')}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-600 bg-white hover:bg-emerald-50/50 border border-emerald-500 rounded-xl shadow-3xs transition-all active:scale-95 cursor-pointer"
          >
            <IconCircleCheck size={16} className="text-emerald-500" />
            Tổng hợp ngay
          </button>
        </div>

      </div>

      {/* ── CONTENT BODY ── */}
      <div className="flex-1 overflow-y-auto px-8 py-5 space-y-5 no-scrollbar bg-slate-50/10">
        
        {/* Specs Card */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-3.5 shadow-3xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-6 text-[11px] text-slate-455">
            <div>
              Tỷ lệ: <strong className="text-slate-800 font-extrabold">{currentPlan.tyLeMoHinh || '1/500'}</strong>
            </div>
            <div>
              Kích thước: <strong className="text-slate-800 font-extrabold">{currentPlan.kichThuocDuKien || '3000×4000mm'}</strong>
            </div>
            <div>
              Địa điểm lắp: <strong className="text-slate-800 font-extrabold">{currentPlan.diaDiemLapDat || 'Đông Anh, Hà Nội'}</strong>
            </div>
            <div>
              Loại chân: <strong className="text-slate-800 font-extrabold">{currentPlan.loaiChan || 'Chân mô hình vát'}</strong>
            </div>
            <div>
              Kính: <strong className="text-slate-800 font-extrabold">{currentPlan.kinh || 'Lồng kính'}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 flex-wrap text-[11px]">
            <span className="text-slate-455 font-semibold">Ánh sáng:</span>
            <div className="flex flex-wrap gap-2">
              {currentPlan.anhSang && currentPlan.anhSang.length > 0 ? (
                currentPlan.anhSang.map((opt) => (
                  <span key={opt} className="px-3 py-1 rounded-full bg-[#fef9c3] text-[#854d0e] font-extrabold text-[10px]">
                    {opt}
                  </span>
                ))
              ) : (
                <span className="text-slate-400 italic text-[10px]">Chưa cấu hình</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-[11px]">
            <span className="text-slate-455 font-semibold">Công nghệ:</span>
            <div className="flex flex-wrap gap-2">
              {currentPlan.congNghe && currentPlan.congNghe.length > 0 ? (
                currentPlan.congNghe.map((opt) => (
                  <span key={opt} className="px-3 py-1 rounded-full bg-[#f3e8ff] text-[#6b21a8] font-extrabold text-[10px]">
                    {opt}
                  </span>
                ))
              ) : (
                <span className="text-slate-400 italic text-[10px]">Chưa cấu hình</span>
              )}
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-4 shadow-3xs">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Tiến độ điền thông tin
            </h3>
            <span className="text-xs text-slate-400 font-bold">
              {getDeptFilledCount()}/{DEPARTMENTS.length} phòng đã điền
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {DEPARTMENTS.map((dept) => {
              const isFilled = savedDepts[dept];
              return (
                <span 
                  key={dept} 
                  className={`px-3 py-1.5 rounded-full font-bold text-[10px] tracking-wide border transition-all ${
                    isFilled 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' 
                      : 'text-slate-500 bg-slate-50 border-slate-100'
                  }`}
                >
                  {dept}
                </span>
              );
            })}
          </div>
        </div>

        {/* ── LOWER SECTION: TABS AND WORKDAYS GRID ── */}
        <div className="space-y-4 pt-2">
          
          {/* Sub-tabs header */}
          <div className="flex items-center gap-6 border-b border-slate-200 shrink-0">
            <button
              type="button"
              onClick={() => setActiveSubTab('nhan-su')}
              className={`pb-3 font-bold text-xs inline-flex items-center gap-1.5 transition-all border-b-2 cursor-pointer ${
                activeSubTab === 'nhan-su'
                  ? 'border-indigo-600 text-indigo-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <IconUsers size={15} />
              Bảng nhân sự theo phòng
            </button>
            
            <button
              type="button"
              onClick={() => setActiveSubTab('chi-phi')}
              className={`pb-3 font-bold text-xs inline-flex items-center gap-1.5 transition-all border-b-2 cursor-pointer ${
                activeSubTab === 'chi-phi'
                  ? 'border-indigo-600 text-indigo-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <IconReportMoney size={15} />
              Bảng tổng hợp chi phí
            </button>
          </div>

          {/* Sub-tab 1: Personnel by Department Accordions */}
          {activeSubTab === 'nhan-su' && (
            <div className="space-y-3.5">
              
              {/* Notice Bar */}
              <div className="flex items-start gap-2 p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 text-indigo-900 leading-normal text-xs font-semibold">
                <IconBulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Mỗi phòng hiển thị bảng <strong>Hạng mục công việc × Nhân sự</strong>. Điền số ngày cho từng ô. Nhấn <strong>Lưu phòng này</strong> để lưu lại.
                </span>
              </div>

              {/* Accordions */}
              <div className="space-y-3">
                {DEPARTMENTS.map((deptName) => {
                  const isExpanded = !!expandedDepts[deptName];
                  const jobs = JOBS_BY_DEPT[deptName] || [];
                  const staff = STAFF_BY_DEPT[deptName] || [];
                  const isSaved = !!savedDepts[deptName];

                  return (
                    <div 
                      key={deptName} 
                      className="bg-white rounded-xl border border-slate-200/80 shadow-3xs overflow-hidden flex flex-col transition-all"
                    >
                      {/* Accordion Trigger Header */}
                      <button
                        type="button"
                        onClick={() => toggleDept(deptName)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/20 bg-white transition-colors border-0 focus:outline-hidden"
                      >
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-bold text-slate-800 text-[13px] tracking-wide">
                            {getDeptDisplayName(deptName)}
                          </span>
                          
                          {/* Saved or Not Saved Status Badge */}
                          {isSaved ? (
                            <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 border border-emerald-100">
                              Đã điền
                            </span>
                          ) : (
                            <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full text-amber-700 bg-amber-50 border border-amber-100">
                              Chưa điền
                            </span>
                          )}

                          <span className="text-[11px] text-slate-400 font-semibold">
                            {jobs.length} hạng mục
                          </span>
                        </div>

                        <div className="text-slate-400">
                          {isExpanded ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                        </div>
                      </button>

                      {/* Accordion Expandable Content */}
                      {isExpanded && (
                        <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 animate-in slide-in-from-top-1 duration-150">
                          {jobs.length === 0 || staff.length === 0 ? (
                            <div className="p-8 text-center text-slate-400 bg-slate-50/30 rounded-xl border border-slate-100/50">
                              Không tìm thấy hạng mục công việc hoặc danh sách nhân sự mặc định của phòng ban này.
                            </div>
                          ) : (
                            <div className="space-y-4">
                              
                              {/* Horizontal scrollable wrapper for input matrix table */}
                              <div className="overflow-x-auto border border-slate-150 rounded-xl no-scrollbar">
                                <table className="w-full text-left text-xs border-collapse">
                                  <thead>
                                    <tr className="bg-slate-50 border-b border-slate-150">
                                      <th className="px-4 py-3 font-bold text-slate-700 min-w-[280px]">Hạng mục công việc</th>
                                      {staff.map((person) => (
                                        <th key={person.id} className="px-4 py-3 font-bold text-slate-700 text-center min-w-[120px]">
                                          <div className="flex flex-col items-center">
                                            <span className="font-bold text-slate-800">{person.name}</span>
                                            <span className="text-[9px] text-slate-400 font-semibold mt-0.5">{person.role} ({person.price})</span>
                                          </div>
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 bg-white">
                                    {jobs.map((jobName, jobIdx) => {
                                      const code = `${jobIdx + 1}`;
                                      return (
                                        <tr key={jobName} className="hover:bg-slate-50/30">
                                          <td className="px-4 py-3 font-medium text-slate-700 leading-tight">
                                            <span className="text-slate-400 font-bold mr-2 w-6 inline-block">{code}</span>
                                            {jobName}
                                          </td>
                                          
                                          {/* Input for each employee */}
                                          {staff.map((person) => {
                                            const cellKey = `${deptName}-${person.id}-${jobIdx}`;
                                            const val = daysMatrix[deptName]?.[cellKey] || '';
                                            return (
                                              <td key={person.id} className="px-4 py-2.5 text-center">
                                                <input
                                                  type="number"
                                                  min="0"
                                                  value={val}
                                                  onChange={(e) => handleMatrixChange(deptName, cellKey, e.target.value)}
                                                  placeholder="0"
                                                  className="w-16 px-2 py-1.5 border border-slate-200 rounded-lg text-center font-bold text-slate-800 placeholder-slate-350 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                                />
                                              </td>
                                            );
                                          })}
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>

                              {/* Matrix Save Action Button */}
                              <div className="flex items-center justify-end">
                                <button
                                  type="button"
                                  onClick={() => handleSaveDeptMatrix(deptName)}
                                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#2b2c7c] hover:bg-[#1e1f57] rounded-xl transition-all cursor-pointer shadow-3xs active:scale-95 border-0"
                                >
                                  <IconDeviceFloppy size={15} />
                                  Lưu phòng này
                                </button>
                              </div>

                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* Sub-tab 2: Cost Summary read-only table */}
          {activeSubTab === 'chi-phi' && (
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-3xs overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-150">
                    <th className="px-5 py-3.5 font-bold text-slate-700">Phòng ban</th>
                    <th className="px-5 py-3.5 font-bold text-slate-700 text-center">Số lượng nhân sự</th>
                    <th className="px-5 py-3.5 font-bold text-slate-700 text-center">Tổng số ngày công</th>
                    <th className="px-5 py-3.5 font-bold text-slate-700 text-right">Tổng chi phí dự kiến</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                  
                  {/* Rows */}
                  <tr className="hover:bg-slate-50/30">
                    <td className="px-5 py-3.5 font-semibold text-slate-800">Phòng Khai triển</td>
                    <td className="px-5 py-3.5 text-center">6 người</td>
                    <td className="px-5 py-3.5 text-center">45 ngày</td>
                    <td className="px-5 py-3.5 text-right text-indigo-750 font-bold">15.750.000 đ</td>
                  </tr>
                  <tr className="hover:bg-slate-50/30">
                    <td className="px-5 py-3.5 font-semibold text-slate-800">Phòng Cắt</td>
                    <td className="px-5 py-3.5 text-center">10 người</td>
                    <td className="px-5 py-3.5 text-center">30 ngày</td>
                    <td className="px-5 py-3.5 text-right text-indigo-750 font-bold">10.500.000 đ</td>
                  </tr>
                  <tr className="hover:bg-slate-50/30">
                    <td className="px-5 py-3.5 font-semibold text-slate-800">Phòng Ghép</td>
                    <td className="px-5 py-3.5 text-center">17 người</td>
                    <td className="px-5 py-3.5 text-center">85 ngày</td>
                    <td className="px-5 py-3.5 text-right text-indigo-750 font-bold">29.750.000 đ</td>
                  </tr>
                  <tr className="hover:bg-slate-50/30">
                    <td className="px-5 py-3.5 font-semibold text-slate-800">Phòng Mộc Sơn</td>
                    <td className="px-5 py-3.5 text-center">4 người</td>
                    <td className="px-5 py-3.5 text-center">20 ngày</td>
                    <td className="px-5 py-3.5 text-right text-indigo-750 font-bold">7.000.000 đ</td>
                  </tr>
                  <tr className="hover:bg-slate-50/30">
                    <td className="px-5 py-3.5 font-semibold text-slate-800">Phòng Điện</td>
                    <td className="px-5 py-3.5 text-center">2 người</td>
                    <td className="px-5 py-3.5 text-center">12 ngày</td>
                    <td className="px-5 py-3.5 text-right text-indigo-750 font-bold">4.200.000 đ</td>
                  </tr>
                  <tr className="hover:bg-slate-50/30">
                    <td className="px-5 py-3.5 font-semibold text-slate-800">Phòng Cảnh Quan</td>
                    <td className="px-5 py-3.5 text-center">2 người</td>
                    <td className="px-5 py-3.5 text-center">15 ngày</td>
                    <td className="px-5 py-3.5 text-right text-indigo-750 font-bold">5.250.000 đ</td>
                  </tr>
                  <tr className="hover:bg-slate-50/30">
                    <td className="px-5 py-3.5 font-semibold text-slate-800">Phòng Công nghệ và Thiết kế</td>
                    <td className="px-5 py-3.5 text-center">5 người</td>
                    <td className="px-5 py-3.5 text-center">25 ngày</td>
                    <td className="px-5 py-3.5 text-right text-indigo-750 font-bold">11.250.000 đ</td>
                  </tr>
                  <tr className="hover:bg-slate-50/30">
                    <td className="px-5 py-3.5 font-semibold text-slate-800">Lắp đặt</td>
                    <td className="px-5 py-3.5 text-center">2 người</td>
                    <td className="px-5 py-3.5 text-center">8 ngày</td>
                    <td className="px-5 py-3.5 text-right text-indigo-750 font-bold">2.800.000 đ</td>
                  </tr>

                  {/* Summary Total Footer Row */}
                  <tr className="bg-slate-50 border-t border-slate-200">
                    <td className="px-5 py-4 font-bold text-slate-800">Tổng cộng</td>
                    <td className="px-5 py-4 text-center font-bold text-slate-800">48 người</td>
                    <td className="px-5 py-4 text-center font-bold text-slate-800">240 ngày</td>
                    <td className="px-5 py-4 text-right text-indigo-850 font-extrabold text-sm">86.500.000 đ</td>
                  </tr>

                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>

      {/* Edit Nhan Su Modal rendered directly here to fix early return React render tree bug */}
      <EditNhanSuModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        plan={currentPlan}
        onSave={handleSaveEditModal}
      />

    </div>
  );
}
