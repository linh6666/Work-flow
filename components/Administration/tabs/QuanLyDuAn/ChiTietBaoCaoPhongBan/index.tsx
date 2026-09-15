"use client";

import React, { useState } from 'react';
import {
  IconArrowLeft,
  IconSearch,
  IconPlus,
  IconDownload,
  IconCheck,
  IconClock,
  IconFileText,
  IconCalendar,
  IconPaperclip,
  IconEye,
  IconEdit,
  IconTrash,
  IconUser,
  IconFilter,
  IconChevronRight,
  IconBuilding
} from '@tabler/icons-react';

export interface DepartmentItem {
  name: string;
  statusText: string;
}

interface ChiTietBaoCaoPhongBanProps {
  department: DepartmentItem;
  projectCode?: string;
  projectName?: string;
  onBack: () => void;
}

interface ReportTask {
  id: string;
  code: string;
  title: string;
  assignee: string;
  role: string;
  date: string;
  deadline: string;
  plannedHours: number;
  actualHours: number;
  progress: number;
  status: 'Hoàn thành' | 'Đang thực hiện' | 'Chờ duyệt' | 'Tạm dừng';
  attachmentsCount: number;
}

export default function ChiTietBaoCaoPhongBan({
  department,
  projectCode = 'CT00-2026/DA-MHV',
  projectName = 'THE HERITAGE TÂY NINH - Lắp đặt tại Tây Ninh',
  onBack,
}: ChiTietBaoCaoPhongBanProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [activeSubTab, setActiveSubTab] = useState<'reports' | 'members' | 'files'>('reports');

  // Comprehensive report items for selected department
  const sampleReports: ReportTask[] = [
    {
      id: 'rpt-1',
      code: 'BC-01/2026',
      title: 'Duyệt Kế hoạch Tổng thể & Ngân sách dự án triển khai Q3/2026',
      assignee: 'Thảo Phùng',
      role: 'Trưởng ban',
      date: '12/07/2026',
      deadline: '15/07/2026',
      plannedHours: 16,
      actualHours: 15.5,
      progress: 100,
      status: 'Hoàn thành',
      attachmentsCount: 3,
    },
    {
      id: 'rpt-2',
      code: 'BC-02/2026',
      title: 'Họp giao ban tiến độ & Phê duyệt phương án thi công kết cấu',
      assignee: 'Thảo Phùng',
      role: 'Trưởng ban',
      date: '15/07/2026',
      deadline: '18/07/2026',
      plannedHours: 8,
      actualHours: 8,
      progress: 100,
      status: 'Hoàn thành',
      attachmentsCount: 2,
    },
    {
      id: 'rpt-3',
      code: 'BC-03/2026',
      title: 'Kiểm tra khảo sát hiện trường & Đánh giá rủi ro giai đoạn 1',
      assignee: 'Trần Diễm My',
      role: 'Phó ban',
      date: '20/07/2026',
      deadline: '24/07/2026',
      plannedHours: 12,
      actualHours: 14,
      progress: 85,
      status: 'Đang thực hiện',
      attachmentsCount: 5,
    },
    {
      id: 'rpt-4',
      code: 'BC-04/2026',
      title: 'Phê duyệt hồ sơ kỹ thuật & Bản vẽ thi công chi tiết mô hình',
      assignee: 'Thảo Phùng',
      role: 'Trưởng ban',
      date: '25/07/2026',
      deadline: '30/07/2026',
      plannedHours: 24,
      actualHours: 18,
      progress: 90,
      status: 'Đang thực hiện',
      attachmentsCount: 4,
    },
    {
      id: 'rpt-5',
      code: 'BC-05/2026',
      title: 'Báo cáo nghiệm thu kỹ thuật vật liệu đầu vào gỗ & chất sơn',
      assignee: 'Nguyễn Văn Nam',
      role: 'Chuyên viên QC',
      date: '28/07/2026',
      deadline: '31/07/2026',
      plannedHours: 10,
      actualHours: 10,
      progress: 100,
      status: 'Hoàn thành',
      attachmentsCount: 1,
    },
    {
      id: 'rpt-6',
      code: 'BC-06/2026',
      title: 'Đề xuất điều chỉnh tiến độ và bổ sung nhân sự tăng ca',
      assignee: 'Trần Diễm My',
      role: 'Phó ban',
      date: '02/08/2026',
      deadline: '05/08/2026',
      plannedHours: 6,
      actualHours: 2,
      progress: 40,
      status: 'Chờ duyệt',
      attachmentsCount: 2,
    },
    {
      id: 'rpt-7',
      code: 'BC-07/2026',
      title: 'Kiểm tra chất lượng mộc & sơn bề mặt mẫu thử đợt cuối',
      assignee: 'Phan Văn Hùng',
      role: 'Kỹ sư Giám sát',
      date: '05/08/2026',
      deadline: '08/08/2026',
      plannedHours: 16,
      actualHours: 16,
      progress: 100,
      status: 'Hoàn thành',
      attachmentsCount: 6,
    },
  ];

  // Department staff list
  const sampleMembers = [
    { name: 'Thảo Phùng', role: 'Trưởng phòng / Trưởng ban', email: 'thao.phung@company.vn', reportsCount: 12, avatarBg: 'bg-indigo-600' },
    { name: 'Trần Diễm My', role: 'Phó phòng', email: 'my.tran@company.vn', reportsCount: 8, avatarBg: 'bg-emerald-600' },
    { name: 'Nguyễn Văn Nam', role: 'Kỹ sư Giám sát', email: 'nam.nguyen@company.vn', reportsCount: 5, avatarBg: 'bg-blue-600' },
    { name: 'Phan Văn Hùng', role: 'Chuyên viên Kỹ thuật', email: 'hung.phan@company.vn', reportsCount: 4, avatarBg: 'bg-amber-600' },
  ];

  // Filtered reports
  const filteredReports = sampleReports.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignee.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedStatusFilter === 'all') return matchSearch;
    if (selectedStatusFilter === 'completed') return matchSearch && item.status === 'Hoàn thành';
    if (selectedStatusFilter === 'in_progress') return matchSearch && item.status === 'Đang thực hiện';
    if (selectedStatusFilter === 'pending') return matchSearch && item.status === 'Chờ duyệt';
    return matchSearch;
  });

  const totalCount = sampleReports.length;
  const completedCount = sampleReports.filter((r) => r.status === 'Hoàn thành').length;
  const inProgressCount = sampleReports.filter((r) => r.status === 'Đang thực hiện').length;
  const pendingCount = sampleReports.filter((r) => r.status === 'Chờ duyệt').length;
  const totalHours = sampleReports.reduce((acc, r) => acc + r.actualHours, 0);

  return (
    <div className="w-full min-h-screen bg-[#f4f6fa] p-4 sm:p-6 md:p-8 space-y-6 animate-fade-in select-none">
      
      {/* 1. TOP FULL-WIDTH HEADER & BREADCRUMB */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div className="space-y-2">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <button
              type="button"
              onClick={onBack}
              className="hover:text-[#406c89] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <IconArrowLeft size={14} />
              <span>Quản lý Dự án</span>
            </button>
            <IconChevronRight size={12} className="text-slate-300" />
            <span className="font-mono text-[#406c89] bg-[#406c89]/10 px-2 py-0.5 rounded font-bold">
              {projectCode}
            </span>
            <IconChevronRight size={12} className="text-slate-300" />
            <span className="text-slate-800 font-bold">{department.name}</span>
          </div>

          {/* Main Title & Department Tag */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-10 h-10 rounded-xl bg-[#406c89]/10 text-[#406c89] flex items-center justify-center font-bold shrink-0">
              <IconBuilding size={22} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                Chi tiết Báo cáo Tiến độ — {department.name}
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Dự án: <strong className="text-slate-700">{projectName}</strong> · {department.statusText}
              </p>
            </div>
          </div>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-2.5 self-start md:self-center shrink-0">
          <button
            type="button"
            onClick={onBack}
            className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-2xs transition-all"
          >
            <IconArrowLeft size={16} />
            <span>Quay lại Dự án</span>
          </button>

          <button
            type="button"
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-2xs transition-all"
          >
            <IconDownload size={16} className="text-slate-500" />
            <span>Xuất báo cáo Excel</span>
          </button>

          <button
            type="button"
            className="bg-[#406c89] hover:bg-[#32566e] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-md shadow-[#406c89]/20 transition-all"
          >
            <IconPlus size={16} />
            <span>Tạo Báo cáo mới</span>
          </button>
        </div>

      </div>

      {/* 2. FULL-WIDTH KPI DASHBOARD METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tổng báo cáo</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{totalCount} <span className="text-xs font-normal text-slate-400">hạng mục</span></h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">100% cập nhật hệ thống</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <IconFileText size={24} />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Đã hoàn thành</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">{completedCount} <span className="text-xs font-normal text-slate-400">báo cáo</span></h3>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Tỷ lệ: {Math.round((completedCount/totalCount)*100)}%</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <IconCheck size={24} />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Đang triển khai</p>
            <h3 className="text-2xl font-black text-amber-600 mt-1">{inProgressCount} <span className="text-xs font-normal text-slate-400">báo cáo</span></h3>
            <p className="text-[11px] text-amber-600 font-semibold mt-1">Đúng tiến độ đề ra</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <IconClock size={24} />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tổng giờ thực hiện</p>
            <h3 className="text-2xl font-black text-indigo-600 mt-1">{totalHours}h <span className="text-xs font-normal text-slate-400">tổng cộng</span></h3>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Kế hoạch: 84h</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <IconCalendar size={24} />
          </div>
        </div>

      </div>

      {/* 3. MAIN CONTENT CONTAINER (TABS & TABLE) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden space-y-4 p-5 md:p-6">
        
        {/* SUB TABS & TOOLBAR */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          
          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveSubTab('reports')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'reports'
                  ? 'bg-[#406c89] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Danh sách Báo cáo ({totalCount})
            </button>
            
            <button
              type="button"
              onClick={() => setActiveSubTab('members')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'members'
                  ? 'bg-[#406c89] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Nhân sự Phòng ban ({sampleMembers.length})
            </button>
          </div>

          {/* Filter Badges & Search input */}
          {activeSubTab === 'reports' && (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              
              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    selectedStatusFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedStatusFilter('completed')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    selectedStatusFilter === 'completed'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Hoàn thành
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedStatusFilter('in_progress')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    selectedStatusFilter === 'in_progress'
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Đang triển khai
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedStatusFilter('pending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    selectedStatusFilter === 'pending'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Chờ duyệt
                </button>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64 shrink-0">
                <IconSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm báo cáo, người tạo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#406c89] focus:bg-white transition-all"
                />
              </div>

            </div>
          )}

        </div>

        {/* 4. SUB TAB CONTENT VIEW */}
        {activeSubTab === 'reports' ? (
          <div className="border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                
                {/* Header */}
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Mã Báo Cáo</th>
                    <th className="py-3.5 px-4">Tên Báo Cáo & Nội dung Hạng Mục</th>
                    <th className="py-3.5 px-4">Người Thực Hiện</th>
                    <th className="py-3.5 px-4">Hạn Chót</th>
                    <th className="py-3.5 px-4">Số Giờ</th>
                    <th className="py-3.5 px-4 text-center">Tiến Độ</th>
                    <th className="py-3.5 px-4">Trạng Thái</th>
                    <th className="py-3.5 px-4 text-center">Tệp đính kèm</th>
                    <th className="py-3.5 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredReports.length > 0 ? (
                    filteredReports.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/90 transition-colors">
                        
                        {/* Code */}
                        <td className="py-3.5 px-4 font-mono font-bold text-[#406c89] whitespace-nowrap">
                          {item.code}
                        </td>

                        {/* Title */}
                        <td className="py-3.5 px-4 max-w-md">
                          <p className="font-bold text-slate-900 leading-snug">{item.title}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">Ngày khởi tạo: {item.date}</p>
                        </td>

                        {/* Assignee */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#406c89] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                              {item.assignee.slice(0, 1)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 leading-none">{item.assignee}</p>
                              <span className="text-[10px] text-slate-400 leading-none">{item.role}</span>
                            </div>
                          </div>
                        </td>

                        {/* Deadline */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-slate-600 font-medium">
                          {item.deadline}
                        </td>

                        {/* Hours */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-bold text-slate-900 text-sm">{item.actualHours}h</span>
                          <span className="text-slate-400 text-[11px] ml-1">/ {item.plannedHours}h</span>
                        </td>

                        {/* Progress */}
                        <td className="py-3.5 px-4 whitespace-nowrap min-w-[140px]">
                          <div className="flex items-center gap-2.5">
                            <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${
                                  item.progress === 100
                                    ? 'bg-emerald-500'
                                    : item.progress >= 70
                                    ? 'bg-[#406c89]'
                                    : 'bg-amber-500'
                                }`}
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-slate-800 w-9 text-right">
                              {item.progress}%
                            </span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                              item.status === 'Hoàn thành'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : item.status === 'Đang thực hiện'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                item.status === 'Hoàn thành'
                                  ? 'bg-emerald-500'
                                  : item.status === 'Đang thực hiện'
                                  ? 'bg-amber-500'
                                  : 'bg-indigo-500'
                              }`}
                            />
                            {item.status}
                          </span>
                        </td>

                        {/* Attachments */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          {item.attachmentsCount > 0 ? (
                            <span className="inline-flex items-center gap-1 text-slate-700 hover:text-[#406c89] cursor-pointer font-bold text-xs bg-slate-100 px-2.5 py-1 rounded-lg hover:bg-slate-200 transition-colors">
                              <IconPaperclip size={14} />
                              {item.attachmentsCount} file
                            </span>
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5 text-slate-400">
                            <button
                              type="button"
                              className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-[#406c89] transition-colors cursor-pointer"
                              title="Xem chi tiết"
                            >
                              <IconEye size={17} />
                            </button>
                            <button
                              type="button"
                              className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                              title="Chỉnh sửa"
                            >
                              <IconEdit size={17} />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-slate-400 font-medium">
                        Không tìm thấy báo cáo nào phù hợp với bộ lọc tìm kiếm.
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>

            {/* Pagination Footer */}
            <div className="bg-slate-50 border-t border-slate-200 px-5 py-3.5 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Hiển thị <strong>{filteredReports.length}</strong> trên <strong>{totalCount}</strong> báo cáo</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-300 cursor-not-allowed font-medium"
                >
                  Trang trước
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg bg-[#406c89] text-white font-bold"
                >
                  1
                </button>
                <button
                  type="button"
                  disabled
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-300 cursor-not-allowed font-medium"
                >
                  Trang sau
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* Members Subtab */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-2">
            {sampleMembers.map((member, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 hover:bg-white hover:shadow-xs transition-all">
                <div className={`w-11 h-11 rounded-2xl ${member.avatarBg} text-white font-bold flex items-center justify-center text-base shrink-0 shadow-2xs`}>
                  {member.name.slice(0, 1)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{member.name}</h4>
                  <p className="text-xs text-slate-500">{member.role}</p>
                  <p className="text-[11px] text-[#406c89] font-semibold mt-1">{member.reportsCount} báo cáo đã nộp</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
