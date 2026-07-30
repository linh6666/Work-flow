"use client";

import React, { useState } from 'react';
import { DuAnItem } from '../index';
import {
  IconArrowLeft,
  IconCalendar,
  IconCheck,
  IconClock,
  IconCopy,
  IconFileText,
  IconFolder,
  IconUser,
  IconUsers,
  IconBuildingFactory2,
  IconClipboardList,
  IconFlag,
  IconMapPin,
  IconPaperclip,
  IconDownload,
  IconAlertCircle,
  IconListCheck,
  IconTrendingUp,
  IconTrash,
  IconPlus,
  IconChevronRight
} from '@tabler/icons-react';

interface ChiTietDuAnProps {
  project: DuAnItem;
  onBack: () => void;
  onUpdateProject?: (updated: DuAnItem) => void;
}

export default function ChiTietDuAn({ project, onBack }: ChiTietDuAnProps) {
  const [activeTab, setActiveTab] = useState<'tong-quan' | 'cong-viec' | 'nhan-su' | 'tai-lieu'>('tong-quan');

  // Dummy task list for project details demonstration
  const [tasks, setTasks] = useState([
    { id: 't-1', name: 'Khai triển bản vẽ 3D & Khảo sát mặt bằng', dept: 'Phòng Khai triển', assignee: 'Trần Văn A', status: 'Hoàn thành', priority: 'Cao', dueDate: '2026-07-10' },
    { id: 't-2', name: 'Cắt CNC gỗ & chuẩn bị vật tư khung kim loại', dept: 'Phòng Cắt', assignee: 'Nguyễn Văn B', status: 'Đang thực hiện', priority: 'Khẩn cấp', dueDate: '2026-07-18' },
    { id: 't-3', name: 'Ghép chi tiết & Sơn hoàn thiện bề mặt', dept: 'Phòng Mộc Sơn', assignee: 'Lê Hoàng C', status: 'Chưa bắt đầu', priority: 'Bình thường', dueDate: '2026-07-25' },
    { id: 't-4', name: 'Lắp ráp hệ thống điện & chiếu sáng mô hình', dept: 'Phòng Điện', assignee: 'Phạm Minh D', status: 'Chưa bắt đầu', priority: 'Bình thường', dueDate: '2026-08-01' },
    { id: 't-5', name: 'Kiểm tra chất lượng (QC) & Đóng gói vận chuyển', dept: 'Ban Giám đốc', assignee: 'Đỗ Tiến E', status: 'Chưa bắt đầu', priority: 'Cao', dueDate: '2026-08-05' },
  ]);

  const hasGreenBorder = project.tienDoText === 'Đúng tiến độ' || project.tienDoText === 'Vượt tiến độ';
  const hasRedBorder = project.tienDoText === 'Chậm tiến độ, lỗi khách quan' || project.tienDoText === 'Trễ tiến độ';

  const getProgressColorClass = (val: number, text: string) => {
    if (text === 'Chậm tiến độ, lỗi khách quan' || text === 'Trễ tiến độ') return 'bg-rose-500';
    if (val >= 70) return 'bg-emerald-500';
    if (val >= 40) return 'bg-blue-600';
    return 'bg-amber-500';
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fafbfc] overflow-hidden select-none">
      
      {/* 1. HEADER & BREADCRUMB */}
      <div className="sticky top-0 z-10 bg-[#fafbfc] px-4 sm:px-8 pt-5 pb-4 border-b border-slate-200/80 shrink-0 shadow-2xs">
        <div className="flex flex-col gap-3">
          {/* Back button & Action buttons */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#406c89] hover:text-[#2d4d62] bg-white border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-lg shadow-2xs transition-all cursor-pointer"
            >
              <IconArrowLeft size={16} />
              <span>Quay lại danh sách dự án</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                Mã dự án: <strong className="font-mono text-slate-700">{project.maDuAn}</strong>
              </span>
            </div>
          </div>

          {/* Project Title Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-[#406c89]/10 text-[#406c89] border border-[#406c89]/20">
                  {project.maDuAn}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-200/50">
                  {project.trangThai}
                </span>
                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${
                  hasGreenBorder ? 'bg-emerald-600 text-white border-transparent'
                  : hasRedBorder ? 'bg-rose-50 text-rose-600 border-rose-200/50'
                  : 'bg-slate-50 text-slate-400 border-slate-200/50'
                }`}>
                  {project.tienDoText}
                </span>
                {project.khachHang && (
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                    Khách hàng: {project.khachHang}
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {project.tenDuAn}
              </h1>
            </div>

            {/* Overall progress indicator */}
            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex items-center gap-4 min-w-[220px]">
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-slate-500">Tiến độ tổng thể</span>
                  <span className="font-extrabold text-[#406c89] text-sm">{project.tienDo}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${getProgressColorClass(project.tienDo, project.tienDoText)}`}
                    style={{ width: `${project.tienDo}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tab Selection Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200 pt-2 overflow-x-auto [scrollbar-width:none]">
            <button
              onClick={() => setActiveTab('tong-quan')}
              className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'tong-quan'
                  ? 'border-[#406c89] text-[#406c89] bg-[#406c89]/5 rounded-t-lg'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60 rounded-t-lg'
              }`}
            >
              <IconFolder size={16} />
              <span>Tổng quan & Mốc tiến độ</span>
            </button>

            <button
              onClick={() => setActiveTab('cong-viec')}
              className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'cong-viec'
                  ? 'border-[#406c89] text-[#406c89] bg-[#406c89]/5 rounded-t-lg'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60 rounded-t-lg'
              }`}
            >
              <IconListCheck size={16} />
              <span>Danh sách Hạng mục & Công việc ({tasks.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('nhan-su')}
              className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'nhan-su'
                  ? 'border-[#406c89] text-[#406c89] bg-[#406c89]/5 rounded-t-lg'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60 rounded-t-lg'
              }`}
            >
              <IconUsers size={16} />
              <span>Phân công & Phòng ban</span>
            </button>

            <button
              onClick={() => setActiveTab('tai-lieu')}
              className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'tai-lieu'
                  ? 'border-[#406c89] text-[#406c89] bg-[#406c89]/5 rounded-t-lg'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60 rounded-t-lg'
              }`}
            >
              <IconPaperclip size={16} />
              <span>Tài liệu & YCSX</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. SCROLLABLE CONTENT BODY */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-6">

        {/* TAB 1: TỔNG QUAN */}
        {activeTab === 'tong-quan' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            {/* Left Col (2 cols): Core Info & Milestones */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Mo ta du an */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <IconFileText size={18} className="text-[#406c89]" />
                  <span>Mô tả & Phạm vi công việc</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                  {project.moTa || 'Chưa có mô tả chi tiết cho dự án này.'}
                </p>
              </div>

              {/* Milestones Timeline */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <IconFlag size={18} className="text-[#406c89]" />
                    <span>Mốc tiến độ quan trọng (Milestones)</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    {project.milestones?.length || 0} mốc nghiệm thu
                  </span>
                </div>

                {project.milestones && project.milestones.length > 0 ? (
                  <div className="space-y-4 pt-2">
                    {/* Visual Milestone Bar */}
                    <div className="relative pt-6 pb-2">
                      {/* Milestone Flags */}
                      <div className="relative h-6 w-full mb-1">
                        {project.milestones.map(ms => (
                          <div
                            key={ms.id}
                            className={`absolute bottom-0 -translate-x-1/2 flex items-center gap-1 text-[11px] font-bold whitespace-nowrap px-2 py-0.5 rounded-full border shadow-2xs ${
                              ms.color === 'blue'
                                ? 'text-blue-600 bg-blue-50 border-blue-200'
                                : 'text-red-600 bg-red-50 border-red-200'
                            }`}
                            style={{ left: `${ms.positionPercent}%` }}
                          >
                            <IconFlag size={12} />
                            <span>{ms.label}</span>
                            <span className="font-mono text-[10px] text-slate-400">({ms.dateText})</span>
                          </div>
                        ))}
                      </div>

                      {/* Main Progress Bar */}
                      <div className="relative flex-1 bg-slate-100 rounded-full h-3">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${getProgressColorClass(project.tienDo, project.tienDoText)}`}
                          style={{ width: `${project.tienDo}%` }}
                        />
                        {project.milestones.map(ms => (
                          <div
                            key={ms.id}
                            className={`absolute top-0 bottom-0 w-0.5 z-10 -translate-x-1/2 ${
                              ms.color === 'blue' ? 'bg-blue-600' : 'bg-red-500'
                            }`}
                            style={{ left: `${ms.positionPercent}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Milestone Detail List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {project.milestones.map(ms => (
                        <div
                          key={ms.id}
                          className={`p-3 rounded-xl border flex items-center justify-between ${
                            ms.color === 'blue'
                              ? 'bg-blue-50/40 border-blue-100'
                              : 'bg-rose-50/40 border-rose-100'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`p-2 rounded-lg ${ms.color === 'blue' ? 'bg-blue-600 text-white' : 'bg-red-500 text-white'}`}>
                              <IconFlag size={14} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800">{ms.label}</p>
                              <p className="text-[11px] text-slate-500">Mốc hoàn thành: {ms.dateText}</p>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-600">{ms.positionPercent}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 font-medium py-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    Chưa thiết lập mốc mốc nghiệm thu cho dự án này.
                  </p>
                )}
              </div>

              {/* Detail parameters grid */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <IconBuildingFactory2 size={18} className="text-[#406c89]" />
                  <span>Kế hoạch Vận chuyển & Lắp đặt</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400">Dự kiến Nghiệm thu Lần 1</span>
                    <p className="text-xs font-bold text-slate-800">{project.duKienNtLan1 || 'Chưa cập nhật'}</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400">Dự kiến Nghiệm thu Cuối</span>
                    <p className="text-xs font-bold text-slate-800">{project.duKienNtCuoi || 'Chưa cập nhật'}</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400">Dự kiến Vận chuyển</span>
                    <p className="text-xs font-bold text-slate-800">{project.duKienVanChuyen || 'Chưa cập nhật'}</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400">Dự kiến Lắp đặt</span>
                    <p className="text-xs font-bold text-slate-800">{project.duKienLapDat || 'Chưa cập nhật'}</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400">Số lượng NV Lắp đặt</span>
                    <p className="text-xs font-bold text-slate-800">{project.soNvLapDat ? `${project.soNvLapDat} nhân sự` : 'Chưa cập nhật'}</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400">Khối lượng NT Lần 1</span>
                    <p className="text-xs font-bold text-slate-800">{project.khoiLuongNtLan1 || 'Chưa cập nhật'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col (1 col): Meta & Attributes */}
            <div className="space-y-6">
              
              {/* Quick Info Box */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">
                  Thông tin dự án
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Mã dự án:</span>
                    <span className="font-mono font-bold text-[#406c89]">{project.maDuAn}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Khách hàng:</span>
                    <span className="font-semibold text-slate-700">{project.khachHang || 'Nội bộ'}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Trạng thái:</span>
                    <span className="font-bold text-amber-600">{project.trangThai}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Đánh giá tiến độ:</span>
                    <span className="font-bold text-emerald-600">{project.tienDoText}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Ngày bắt đầu:</span>
                    <span className="font-medium text-slate-700">{project.ngayBatDau}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Ngày kết thúc:</span>
                    <span className="font-medium text-slate-700">{project.ngayKetThuc}</span>
                  </div>

                  {project.diaDiemLapDat && (
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-slate-400 font-medium block mb-1">Địa điểm lắp đặt:</span>
                      <span className="font-medium text-slate-700 flex items-start gap-1">
                        <IconMapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
                        {project.diaDiemLapDat}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-3">
                <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">
                  Thông số Kỹ thuật
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cấp độ dự án:</span>
                    <span className="font-bold text-slate-700">{project.capDoDuAn || 'Tiêu chuẩn'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tỷ lệ mô hình:</span>
                    <span className="font-bold text-slate-700">{project.tyLe || '1/100'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kích thước:</span>
                    <span className="font-bold text-slate-700">{project.kichThuoc || 'Chưa cập nhật'}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: DANH SÁCH CÔNG VIỆC */}
        {activeTab === 'cong-viec' && (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Danh sách Hạng mục công việc</h3>
                <p className="text-xs text-slate-400">Các nhiệm vụ con cần hoàn thành trong dự án {project.maDuAn}</p>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 bg-[#406c89] hover:bg-[#345972] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-2xs transition-all cursor-pointer"
              >
                <IconPlus size={14} />
                <span>Thêm công việc con</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Tên công việc / Hạng mục</th>
                    <th className="px-4 py-3">Phòng ban</th>
                    <th className="px-4 py-3">Người phụ trách</th>
                    <th className="px-4 py-3">Mức độ ưu tiên</th>
                    <th className="px-4 py-3">Hạn hoàn thành</th>
                    <th className="px-4 py-3">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tasks.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-800">{t.name}</td>
                      <td className="px-4 py-3 text-slate-600">{t.dept}</td>
                      <td className="px-4 py-3 font-medium text-slate-700">{t.assignee}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.priority === 'Khẩn cấp' ? 'bg-rose-100 text-rose-700'
                          : t.priority === 'Cao' ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                        }`}>
                          {t.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 font-mono">{t.dueDate}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                          t.status === 'Hoàn thành' ? 'bg-emerald-100 text-emerald-700'
                          : t.status === 'Đang thực hiện' ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-100 text-slate-500'
                        }`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PHÂN CÔNG NHÂN SỰ */}
        {activeTab === 'nhan-su' && (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4 text-left">
            <h3 className="text-sm font-bold text-slate-800">Các phòng ban tham gia triển khai</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Phòng Khai triển', count: 3, leader: 'Trần Văn A', role: 'Bản vẽ & 3D' },
                { name: 'Phòng Cắt CNC & Ghép', count: 5, leader: 'Nguyễn Văn B', role: 'Cắt gọt vật tư' },
                { name: 'Phòng Mộc Sơn', count: 4, leader: 'Lê Hoàng C', role: 'Đóng khung & Phủ sơn' },
                { name: 'Phòng Công nghệ & Điện', count: 2, leader: 'Phạm Minh D', role: 'Mạch điện & Đèn' },
                { name: 'Khối Văn phòng', count: 2, leader: 'Đỗ Tiến E', role: 'Vận chuyển & Nghiệm thu' },
              ].map((dept, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-800 text-xs">{dept.name}</h4>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-[#406c89]/10 text-[#406c89] rounded">
                      {dept.count} nhân sự
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Trưởng nhóm: <strong className="text-slate-700">{dept.leader}</strong></p>
                  <p className="text-[11px] text-slate-400">Nhiệm vụ: {dept.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TÀI LIỆU & YCSX */}
        {activeTab === 'tai-lieu' && (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4 text-left">
            <h3 className="text-sm font-bold text-slate-800">Tài liệu & Yêu cầu sản xuất liên quan</h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-100 text-blue-700 rounded-lg">
                    <IconFileText size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Yêu cầu sản xuất (YCSX-2026-004)</h4>
                    <p className="text-[11px] text-slate-400">Phiếu thông số kỹ thuật và vật liệu mẫu</p>
                  </div>
                </div>
                <button type="button" className="text-xs text-[#406c89] hover:underline font-semibold flex items-center gap-1 cursor-pointer">
                  <IconDownload size={14} /> Tải xuống
                </button>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-lg">
                    <IconPaperclip size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Bản vẽ Kiến trúc & Cảnh quan (PDF)</h4>
                    <p className="text-[11px] text-slate-400">File CAD/PDF thiết kế tổng mặt bằng 1/100</p>
                  </div>
                </div>
                <button type="button" className="text-xs text-[#406c89] hover:underline font-semibold flex items-center gap-1 cursor-pointer">
                  <IconDownload size={14} /> Tải xuống
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
