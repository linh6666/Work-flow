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
    <div className="w-full min-h-screen bg-white p-4 sm:p-6 space-y-4 animate-fade-in select-none">
      
      {/* ROW 1: TITLE & TOP ACTION BUTTONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        
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
      <div className="flex flex-wrap items-center gap-2">
        
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
      <div className="flex items-center gap-1.5 text-[11px]">
        <span className="font-semibold text-slate-600">Nhân sự:</span>
        <span className="bg-[#335b75] text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs">
          Nguyễn Phú Quang
        </span>
      </div>

      {/* ROW 4: LIGHTBULB BANNER NOTE */}
      <div className="bg-[#f0f3ff] border border-[#d6dbff] rounded-lg px-3.5 py-2 flex items-center gap-2 text-[11px] text-[#5c68e2] font-medium leading-relaxed shadow-2xs">
        <IconBulb size={16} className="text-[#5c68e2] shrink-0" />
        <span>
          Bạn có quyền bổ sung nhân sự từ các phòng ban khác vào form phòng <strong className="font-bold">{department.name}</strong> (xem tag [Phòng ban] trong danh sách chọn nhân sự).
        </span>
      </div>



      {/* 3. WORK REPORT TABLE */}
      
        {/* Table Toolbar - HIDDEN */}
        {/* <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <span>Danh sách công việc & Báo cáo</span>
            <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full font-semibold">
              {filteredReports.length}
            </span>
          </h3>

          <div className="relative w-full sm:w-64">
            <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm mã, tên báo cáo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#406c89] focus:bg-white transition-all"
            />
          </div>
        </div> */}

        {/* Data Table */}
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-3 text-center whitespace-nowrap">#</th>
                <th className="py-3 px-3 text-center whitespace-nowrap">BC TH</th>
                <th className="py-2 px-3 text-center whitespace-nowrap leading-tight">
                  THAO<br />TÁC
                </th>
                <th className="py-3 px-3 whitespace-nowrap">TRẠNG THÁI</th>
                <th className="py-3 px-4 whitespace-nowrap">TÊN CÔNG VIỆC</th>
                <th className="py-3 px-3 text-center whitespace-nowrap">KL DK</th>
                <th className="py-3 px-3 text-center whitespace-nowrap">KL DP</th>
                <th className="py-3 px-3 whitespace-nowrap">NHÂN SỰ</th>
                <th className="py-3 px-3 text-center whitespace-nowrap">GIỜ DK</th>
                <th className="py-3 px-3 text-center whitespace-nowrap">GIỜ TT</th>
                <th className="py-3 px-3 whitespace-nowrap">BẮT ĐẦU</th>
                <th className="py-3 px-3 whitespace-nowrap">KẾT THÚC</th>
                <th className="py-3 px-3 text-center whitespace-nowrap">%HT</th>
                <th className="py-3 px-4 whitespace-nowrap">GHI CHÚ</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredReports.length > 0 ? (
                filteredReports.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* # */}
                    <td className="py-3 px-3 text-center font-mono text-slate-400 font-semibold whitespace-nowrap">
                      {idx + 1}
                    </td>

                    {/* BC TH */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <button
                        type="button"
                        className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] transition-colors border border-slate-200/80 cursor-pointer shadow-2xs"
                        title="Báo cáo thực hiện"
                      >
                        {item.bcTh || 'BC TH'}
                      </button>
                    </td>

                    {/* THAO TÁC */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1 text-slate-400">
                        <button
                          type="button"
                          className="p-1 rounded hover:bg-slate-100 hover:text-[#406c89] transition-colors cursor-pointer"
                          title="Xem chi tiết"
                        >
                          <IconEye size={15} />
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                          title="Chỉnh sửa"
                        >
                          <IconEdit size={15} />
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded hover:bg-slate-100 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Xóa"
                        >
                          <IconTrash size={15} />
                        </button>
                      </div>
                    </td>

                    {/* TRẠNG THÁI */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
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

                    {/* TÊN CÔNG VIỆC */}
                    <td className="py-3 px-4 min-w-[220px] max-w-sm">
                      <p className="font-semibold text-slate-900 leading-snug">{item.title}</p>
                      <p className="text-[10px] font-mono text-[#406c89] mt-0.5">{item.code}</p>
                    </td>

                    {/* KL DK */}
                    <td className="py-3 px-3 text-center whitespace-nowrap font-medium text-slate-700">
                      {item.klDk ?? '1'}
                    </td>

                    {/* KL DP */}
                    <td className="py-3 px-3 text-center whitespace-nowrap font-medium text-slate-700">
                      {item.klDp ?? '0'}
                    </td>

                    {/* NHÂN SỰ */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-[#335b75] text-white flex items-center justify-center font-bold text-[9px] shrink-0">
                          {item.assignee.slice(0, 1)}
                        </div>
                        <span className="text-slate-800 font-medium text-xs">{item.assignee}</span>
                      </div>
                    </td>

                    {/* GIỜ DK */}
                    <td className="py-3 px-3 text-center whitespace-nowrap font-medium text-slate-700">
                      {item.plannedHours}h
                    </td>

                    {/* GIỜ TT */}
                    <td className="py-3 px-3 text-center whitespace-nowrap font-bold text-[#406c89]">
                      {item.actualHours}h
                    </td>

                    {/* BẮT ĐẦU */}
                    <td className="py-3 px-3 whitespace-nowrap text-slate-600 text-xs">
                      {item.date}
                    </td>

                    {/* KẾT THÚC */}
                    <td className="py-3 px-3 whitespace-nowrap text-slate-600 text-xs">
                      {item.deadline}
                    </td>

                    {/* %HT */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span
                        className={`inline-block font-bold text-xs ${
                          item.progress === 100
                            ? 'text-emerald-600'
                            : item.progress >= 70
                            ? 'text-[#406c89]'
                            : 'text-amber-600'
                        }`}
                      >
                        {item.progress}%
                      </span>
                    </td>

                    {/* GHI CHÚ */}
                    <td className="py-3 px-4 text-slate-500 text-xs min-w-[140px] max-w-xs">
                      {item.note || '—'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={14} className="py-8 text-center text-slate-400 font-medium">
                    Không tìm thấy báo cáo nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination - HIDDEN */}
        {/* <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Hiển thị {filteredReports.length} trên {totalCount} báo cáo</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled
              className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-300 cursor-not-allowed"
            >
              Trang trước
            </button>
            <button
              type="button"
              className="px-2.5 py-1 rounded bg-[#406c89] text-white font-bold"
            >
              1
            </button>
            <button
              type="button"
              disabled
              className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-300 cursor-not-allowed"
            >
              Trang sau
            </button>
          </div>
        </div> */}

    </div>
  );
}
