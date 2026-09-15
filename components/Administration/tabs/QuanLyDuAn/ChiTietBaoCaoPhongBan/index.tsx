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
  IconMaximize,
  IconArrowsDiff,
  IconGridDots,
  IconDeviceFloppy,
  IconChevronDown,
  IconBulb,
  IconUser,
  IconFilter,
  IconChevronLeft,
  IconChevronRight
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
  klDk?: number | string;
  klDp?: number | string;
  bcTh?: string;
  note?: string;
}

export default function ChiTietBaoCaoPhongBan({
  department,
  projectCode = 'CT00-2026/DA-MHV',
  projectName = 'THE HERITAGE TÂY NINH - Lắp đặt tại Tây Ninh',
  onBack,
}: ChiTietBaoCaoPhongBanProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Sample reports for this department
  const sampleReports: ReportTask[] = [
    {
      id: 'rpt-1',
      code: 'BC-01/2026',
      title: 'Duyệt Kế hoạch Tổng thể & Ngân sách dự án triển khai Q3/2026',
      assignee: 'Nguyễn Phú Quang',
      role: 'Trưởng ban',
      date: '12/07/2026',
      deadline: '15/07/2026',
      plannedHours: 16,
      actualHours: 15.5,
      progress: 100,
      status: 'Hoàn thành',
      attachmentsCount: 3,
      klDk: '1 gói',
      klDp: '0 gói',
      bcTh: 'BC TH',
      note: 'Đã hoàn thành đúng hạn',
    },
    {
      id: 'rpt-2',
      code: 'BC-02/2026',
      title: 'Họp giao ban tiến độ & Phê duyệt phương án thi công kết cấu',
      assignee: 'Nguyễn Phú Quang',
      role: 'Trưởng ban',
      date: '15/07/2026',
      deadline: '18/07/2026',
      plannedHours: 8,
      actualHours: 8,
      progress: 100,
      status: 'Hoàn thành',
      attachmentsCount: 2,
      klDk: '1 buổi',
      klDp: '0',
      bcTh: 'BC TH',
      note: 'Đã thông qua biên bản',
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
      klDk: '1 khu vực',
      klDp: '1 khu vực',
      bcTh: 'BC TH',
      note: 'Đang theo dõi thời tiết',
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
      klDk: '3 bộ',
      klDp: '0 bộ',
      bcTh: 'BC TH',
      note: 'Đợi ký phụ lục',
    },
    {
      id: 'rpt-5',
      code: 'BC-05/2026',
      title: 'Báo cáo nghiệm thu kỹ thuật vật liệu đầu vào gỗ & chất sơn',
      assignee: 'Nguyễn Phú Quang',
      role: 'Chuyên viên QC',
      date: '28/07/2026',
      deadline: '31/07/2026',
      plannedHours: 10,
      actualHours: 10,
      progress: 100,
      status: 'Hoàn thành',
      attachmentsCount: 1,
      klDk: '1 đợt',
      klDp: '0',
      bcTh: 'BC TH',
      note: 'Đạt chuẩn 100%',
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
      klDk: '1 tờ trình',
      klDp: '0',
      bcTh: 'BC TH',
      note: 'Chờ BGĐ phê duyệt',
    },
    {
      id: 'rpt-7',
      code: 'BC-07/2026',
      title: 'Kiểm tra chất lượng mộc & sơn bề mặt mẫu thử đợt cuối',
      assignee: 'Nguyễn Phú Quang',
      role: 'Kỹ sư Giám sát',
      date: '05/08/2026',
      deadline: '08/08/2026',
      plannedHours: 16,
      actualHours: 16,
      progress: 100,
      status: 'Hoàn thành',
      attachmentsCount: 6,
      klDk: '1 đợt',
      klDp: '0',
      bcTh: 'BC TH',
      note: 'Đã nghiệm thu xong',
    },
  ];

  // Filtering
  const filteredReports = sampleReports.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignee.toLowerCase().includes(searchTerm.toLowerCase());

    const matchAssignee = selectedAssignee === 'all' || item.assignee === selectedAssignee;

    let matchStatus = true;
    if (selectedStatusFilter === 'Hoàn thành') matchStatus = item.status === 'Hoàn thành';
    else if (selectedStatusFilter === 'Đang triển khai') matchStatus = item.status === 'Đang thực hiện';
    else if (selectedStatusFilter === 'Chờ duyệt') matchStatus = item.status === 'Chờ duyệt';

    return matchSearch && matchAssignee && matchStatus;
  });

  const totalCount = sampleReports.length;
  const completedCount = sampleReports.filter((r) => r.status === 'Hoàn thành').length;
  const inProgressCount = sampleReports.filter((r) => r.status === 'Đang thực hiện').length;
  const totalHours = sampleReports.reduce((acc, r) => acc + r.actualHours, 0);

  return (
    <div className="w-full h-screen max-h-screen bg-white p-4 sm:p-5 flex flex-col space-y-2.5 animate-fade-in select-none overflow-hidden">
      
      {/* ROW 1: TITLE & TOP ACTION BUTTONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 shrink-0">
        
        {/* Title & Subtitle with Back Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="w-7 h-7 rounded-md bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-all cursor-pointer shadow-2xs shrink-0"
            title="Quay lại trang trước"
          >
            <IconArrowLeft size={14} />
          </button>

          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
              {department.name}
            </h1>
            <p className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">
              Người tạo: <span className="text-slate-700 font-semibold">Nguyễn Phú Quang</span> · <span className="text-slate-600">{department.statusText ? department.statusText.split('·')[0].trim() : 'Đang triển khai'}</span>
            </p>
          </div>
        </div>

        {/* 5 Top Right Action Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={onBack}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-md text-[11px] font-semibold text-slate-700 flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
          >
            <IconMaximize size={14} className="text-slate-600" />
            <span>Toàn màn hình</span>
          </button>

          <button
            type="button"
            className="px-2.5 py-1.5 bg-white border border-[#f5d089] hover:bg-amber-50/60 rounded-md text-[11px] font-semibold text-[#b45309] flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
          >
            <IconArrowsDiff size={14} className="text-[#b45309]" />
            <span>Di chuyển sang dự án</span>
          </button>

          <button
            type="button"
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-md text-[11px] font-semibold text-slate-700 flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
          >
            <IconTrash size={14} className="text-slate-600" />
            <span>Thùng rác công việc</span>
          </button>

          <button
            type="button"
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-md text-[11px] font-semibold text-slate-700 flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
          >
            <IconGridDots size={14} className="text-slate-600" />
            <span>Lưu Template</span>
          </button>

          <button
            type="button"
            className="px-3.5 py-1.5 bg-[#9496f8] hover:bg-[#8385f5] text-white rounded-md text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
          >
            <IconDeviceFloppy size={14} />
            <span>Lưu</span>
          </button>
        </div>

      </div>

      {/* ROW 2: FILTERS (SELECT PERSONNEL, SELECT STATUS, DATE RANGE) */}
      <div className="flex flex-wrap items-center gap-2 shrink-0">
        
        {/* Select Personnel */}
        <div className="relative">
          <select
            value={selectedAssignee}
            onChange={(e) => setSelectedAssignee(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-md pl-2.5 pr-7 py-1 text-[11px] font-medium text-slate-700 focus:outline-none focus:border-[#406c89] cursor-pointer shadow-2xs"
          >
            <option value="all">Tất cả nhân sự</option>
            <option value="Nguyễn Phú Quang">Nguyễn Phú Quang</option>
            <option value="Thảo Phùng">Thảo Phùng</option>
            <option value="Trần Diễm My">Trần Diễm My</option>
          </select>
          <IconChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Select Status */}
        <div className="relative">
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-md pl-2.5 pr-7 py-1 text-[11px] font-medium text-slate-700 focus:outline-none focus:border-[#406c89] cursor-pointer shadow-2xs"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="Hoàn thành">Hoàn thành</option>
            <option value="Đang triển khai">Đang triển khai</option>
            <option value="Chờ duyệt">Chờ duyệt</option>
          </select>
          <IconChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Date Inputs Range */}
        <div className="flex items-center gap-1">
          <div className="relative">
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-white border border-slate-200 rounded-md pl-2.5 pr-7 py-1 text-[11px] text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#406c89] w-28 shadow-2xs"
            />
            <IconCalendar size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <span className="text-slate-400 text-[11px] font-mono">→</span>

          <div className="relative">
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-white border border-slate-200 rounded-md pl-2.5 pr-7 py-1 text-[11px] text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#406c89] w-28 shadow-2xs"
            />
            <IconCalendar size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* ROW 3: ASSIGNED PERSONNEL TAG */}
      <div className="flex items-center gap-1.5 text-[11px] shrink-0">
        <span className="font-semibold text-slate-600">Nhân sự:</span>
        <span className="bg-[#335b75] text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs">
          Nguyễn Phú Quang
        </span>
      </div>

      {/* ROW 4: LIGHTBULB BANNER NOTE */}
      <div className="bg-[#f0f3ff] border border-[#d6dbff] rounded-lg px-3.5 py-2 flex items-center gap-2 text-[11px] text-[#5c68e2] font-medium leading-relaxed shadow-2xs shrink-0">
        <IconBulb size={16} className="text-[#5c68e2] shrink-0" />
        <span>
          Bạn có quyền bổ sung nhân sự từ các phòng ban khác vào form phòng <strong className="font-bold">{department.name}</strong> (xem tag [Phòng ban] trong danh sách chọn nhân sự).
        </span>
      </div>

      {/* 3. WORK REPORT TABLE CONTAINER - FIXED FULL HEIGHT LIKE KHACH HANG */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[1250px]">
            <thead className="sticky top-0 z-20 bg-slate-50 shadow-2xs border-b border-slate-200">
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center whitespace-nowrap">
                    #
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                    <button
                      type="button"
                      className="flex items-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold"
                    >
                      <span>BC TH</span>
                      <span className="text-slate-400 text-[10px]">↕</span>
                    </button>
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center whitespace-nowrap">
                    Thao tác
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                    <button
                      type="button"
                      className="flex items-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold"
                    >
                      <span>Trạng thái</span>
                      <span className="text-slate-400 text-[10px]">↕</span>
                    </button>
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                    <button
                      type="button"
                      className="flex items-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold"
                    >
                      <span>Tên công việc</span>
                      <span className="text-slate-400 text-[10px]">↕</span>
                    </button>
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center whitespace-nowrap">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold"
                    >
                      <span>KL DK</span>
                      <span className="text-slate-400 text-[10px]">↕</span>
                    </button>
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center whitespace-nowrap">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold"
                    >
                      <span>KL DP</span>
                      <span className="text-slate-400 text-[10px]">↕</span>
                    </button>
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                    <button
                      type="button"
                      className="flex items-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold"
                    >
                      <span>Nhân sự</span>
                      <span className="text-slate-400 text-[10px]">↕</span>
                    </button>
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center whitespace-nowrap">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold"
                    >
                      <span>Giờ DK</span>
                      <span className="text-slate-400 text-[10px]">↕</span>
                    </button>
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center whitespace-nowrap">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold"
                    >
                      <span>Giờ TT</span>
                      <span className="text-slate-400 text-[10px]">↕</span>
                    </button>
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                    <button
                      type="button"
                      className="flex items-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold"
                    >
                      <span>Bắt đầu</span>
                      <span className="text-slate-400 text-[10px]">↕</span>
                    </button>
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                    <button
                      type="button"
                      className="flex items-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold"
                    >
                      <span>Kết thúc</span>
                      <span className="text-slate-400 text-[10px]">↕</span>
                    </button>
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center whitespace-nowrap">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold"
                    >
                      <span>%HT</span>
                      <span className="text-slate-400 text-[10px]">↕</span>
                    </button>
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                    <button
                      type="button"
                      className="flex items-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold"
                    >
                      <span>Ghi chú</span>
                      <span className="text-slate-400 text-[10px]">↕</span>
                    </button>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredReports.length > 0 ? (
                  filteredReports.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors group">
                      {/* # */}
                      <td className="px-4 py-3.5 align-middle text-center font-mono text-slate-400 font-semibold text-xs whitespace-nowrap">
                        {idx + 1}
                      </td>

                      {/* BC TH */}
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                        <button
                          type="button"
                          className="py-1 px-2.5 rounded-md border border-sky-200 text-[#406c89] hover:bg-sky-50 text-[10px] font-bold flex items-center justify-center gap-1 transition-colors bg-white cursor-pointer shadow-2xs whitespace-nowrap"
                        >
                          <IconFileText size={12} />
                          <span>{item.bcTh || 'Báo cáo'}</span>
                        </button>
                      </td>

                      {/* THAO TÁC */}
                      <td className="px-4 py-3.5 align-middle text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1 text-slate-400">
                          <button
                            type="button"
                            className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-[#406c89] transition-colors cursor-pointer"
                            title="Xem chi tiết"
                          >
                            <IconEye size={13} />
                          </button>
                          <button
                            type="button"
                            className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                            title="Chỉnh sửa"
                          >
                            <IconEdit size={13} />
                          </button>
                          <button
                            type="button"
                            className="p-1.5 rounded border border-slate-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Xóa"
                          >
                            <IconTrash size={13} />
                          </button>
                        </div>
                      </td>

                      {/* TRẠNG THÁI */}
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${
                            item.status === 'Hoàn thành'
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                              : item.status === 'Đang thực hiện'
                              ? 'bg-amber-50 text-amber-600 border border-amber-200'
                              : 'bg-sky-50 text-[#406c89] border border-sky-200'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* TÊN CÔNG VIỆC */}
                      <td className="px-4 py-3.5 align-middle min-w-[240px] max-w-sm">
                        <div className="min-w-0">
                          <p className="font-bold text-[#406c89] hover:underline cursor-pointer leading-snug text-xs">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{item.code}</p>
                        </div>
                      </td>

                      {/* KL DK */}
                      <td className="px-4 py-3.5 align-middle text-center whitespace-nowrap font-semibold text-slate-600 text-xs">
                        {item.klDk ?? '1'}
                      </td>

                      {/* KL DP */}
                      <td className="px-4 py-3.5 align-middle text-center whitespace-nowrap font-semibold text-slate-600 text-xs">
                        {item.klDp ?? '0'}
                      </td>

                      {/* NHÂN SỰ */}
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-sky-50 text-[#406c89] font-bold text-xs flex items-center justify-center shrink-0 border border-sky-100 shadow-2xs">
                            {item.assignee.trim().split(/\s+/).slice(-1)[0]?.[0]?.toUpperCase() || 'N'}
                          </div>
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-700 text-xs block whitespace-nowrap">{item.assignee}</span>
                            <span className="text-[10px] text-slate-400 font-medium block">{item.role}</span>
                          </div>
                        </div>
                      </td>

                      {/* GIỜ DK */}
                      <td className="px-4 py-3.5 align-middle text-center whitespace-nowrap font-semibold text-slate-600 text-xs">
                        {item.plannedHours}h
                      </td>

                      {/* GIỜ TT */}
                      <td className="px-4 py-3.5 align-middle text-center whitespace-nowrap font-bold text-[#406c89] text-xs">
                        {item.actualHours}h
                      </td>

                      {/* BẮT ĐẦU */}
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap font-medium text-slate-600 text-xs">
                        {item.date}
                      </td>

                      {/* KẾT THÚC */}
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap font-medium text-slate-600 text-xs">
                        {item.deadline}
                      </td>

                      {/* %HT */}
                      <td className="px-4 py-3.5 align-middle text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${
                            item.progress === 100
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                              : item.progress >= 70
                              ? 'bg-sky-50 text-[#406c89] border border-sky-200'
                              : 'bg-amber-50 text-amber-600 border border-amber-200'
                          }`}
                        >
                          {item.progress}%
                        </span>
                      </td>

                      {/* GHI CHÚ */}
                      <td className="px-4 py-3.5 align-middle text-slate-400 text-xs truncate max-w-[140px]">
                        {item.note || <span className="text-slate-300 font-normal">—</span>}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={14} className="text-center py-10 text-slate-400">
                      <p className="font-semibold text-xs">Không tìm thấy báo cáo nào phù hợp.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION FOOTER EXACTLY LIKE KHACH HANG */}
          <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
            <div>
              Hiển thị <span className="font-bold text-slate-700">{filteredReports.length > 0 ? 1 : 0}</span> - <span className="font-bold text-slate-700">{filteredReports.length}</span> trên tổng số <span className="font-bold text-slate-700">{totalCount}</span> báo cáo
            </div>

            {/* Page Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled
                className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <IconChevronLeft size={13} />
                <span>Trước</span>
              </button>

              <button
                type="button"
                className="w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer bg-[#406c89] text-white shadow-2xs"
              >
                1
              </button>

              <button
                type="button"
                disabled
                className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Sau</span>
                <IconChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>

    </div>
  );
}
