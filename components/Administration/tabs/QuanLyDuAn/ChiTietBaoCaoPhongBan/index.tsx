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
  IconChevronRight,
  IconGripVertical
} from '@tabler/icons-react';
import XoaCongViecModal from './modal/XoaCongViecModal';
import XemBaoCaoModal from './modal/XemBaoCaoModal';

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
  code?: string;
  title: string;
  assignees?: string[];
  assignee: string;
  role?: string;
  date: string;
  deadline?: string;
  plannedHours: number | string;
  actualHours?: number | string;
  progress?: number;
  status: string;
  attachmentsCount?: number;
  klDk: number | string;
  klDp: number | string;
  bcTh?: string;
  note?: string;
  rowTheme?: 'blue' | 'gold';
}

export default function ChiTietBaoCaoPhongBan({
  department,
  projectCode = 'CT00-2026/DA-MHV',
  projectName = 'THE HERITAGE TÂY NINH - Lắp đặt tại Tây Ninh',
  onBack,
}: ChiTietBaoCaoPhongBanProps) {
  // Sample reports matching screenshot exactly
  const sampleReports: ReportTask[] = [
    {
      id: 'rpt-1',
      title: 'PHÊ DUYỆT ĐỀ XUẤT BÁO GIÁ',
      assignee: 'Phùng Bích Thảo',
      date: '08/03/2026',
      deadline: '08/03/2026',
      plannedHours: '1h',
      actualHours: '—',
      status: 'Chưa bắt đầu',
      klDk: 2,
      klDp: 0,
      rowTheme: 'blue',
    },
    {
      id: 'rpt-2',
      title: 'PHÊ DUYỆT BÁO GIÁ',
      assignee: 'Phùng Bích Thảo',
      date: '08/04/2026',
      deadline: '08/04/2026',
      plannedHours: '1h',
      actualHours: '—',
      status: 'Chưa bắt đầu',
      klDk: 1,
      klDp: 0,
      rowTheme: 'blue',
    },
    {
      id: 'rpt-3',
      title: 'PHÊ DUYỆT HỢP ĐỒNG',
      assignee: 'Phùng Bích Thảo',
      date: '08/05/2026',
      deadline: '08/05/2026',
      plannedHours: '1h',
      actualHours: '—',
      status: 'Chưa bắt đầu',
      klDk: 1,
      klDp: 0,
      rowTheme: 'blue',
    },
    {
      id: 'rpt-4',
      title: 'PHÊ DUYỆT BẢN VẼ XÁC NHẬN VỚI KHÁCH HÀNG',
      assignee: 'Nguyễn Đức Việt',
      date: '08/10/2026',
      deadline: '08/10/2026',
      plannedHours: '1h',
      actualHours: '—',
      status: 'Chưa bắt đầu',
      klDk: 1,
      klDp: 0,
      rowTheme: 'gold',
    },
    {
      id: 'rpt-5',
      title: 'PHÊ DUYỆT BẢNG MẪU MÀU',
      assignee: 'Nguyễn Đức Việt',
      date: '08/11/2026',
      deadline: '08/11/2026',
      plannedHours: '1h',
      actualHours: '—',
      status: 'Chưa bắt đầu',
      klDk: 1,
      klDp: 0,
      rowTheme: 'gold',
    },
    {
      id: 'rpt-6',
      title: 'PHÊ DUYỆT BẢNG MẪU CÂY',
      assignee: 'Phùng Bích Thảo',
      date: '08/06/2026',
      deadline: '08/06/2026',
      plannedHours: '2h',
      actualHours: '—',
      status: 'Chưa bắt đầu',
      klDk: 1,
      klDp: 0,
      rowTheme: 'blue',
    },
    {
      id: 'rpt-7',
      title: 'PHÊ DUYỆT BẢNG MẪU ÁNH SÁNG',
      assignee: 'Phùng Bích Thảo',
      date: '08/07/2026',
      deadline: '08/07/2026',
      plannedHours: '1h',
      actualHours: '—',
      status: 'Chưa bắt đầu',
      klDk: 1,
      klDp: 0,
      rowTheme: 'blue',
    },
    {
      id: 'rpt-8',
      title: 'THIẾT LẬP QUY CHUẨN KHAI TRIỂN CỦA DỰ ÁN',
      assignee: 'Nguyễn Thanh Tuấn',
      date: '08/10/2026',
      deadline: '08/10/2026',
      plannedHours: '2h',
      actualHours: '—',
      status: 'Chưa bắt đầu',
      klDk: 1,
      klDp: 0,
      rowTheme: 'blue',
    },
    {
      id: 'rpt-9',
      title: 'HỌP PHỔ BIẾN YÊU CẦU VỀ QUY CHUẨN KHAI TRIỂN',
      assignee: 'Nguyễn Thanh Tuấn',
      date: '08/11/2026',
      deadline: '08/11/2026',
      plannedHours: '1h',
      actualHours: '—',
      status: 'Chưa bắt đầu',
      klDk: 1,
      klDp: 0,
      rowTheme: 'blue',
    },
    {
      id: 'rpt-10',
      title: 'KIỂM TRA CÔNG VIỆC TUẦN 1',
      assignee: 'Nguyễn Thanh Tuấn',
      date: '08/12/2026',
      deadline: '08/12/2026',
      plannedHours: '1h',
      actualHours: '—',
      status: 'Chưa bắt đầu',
      klDk: 1,
      klDp: 0,
      rowTheme: 'blue',
    },
    {
      id: 'rpt-11',
      title: 'KIỂM TRA CÔNG VIỆC TUẦN 2',
      assignee: 'Nguyễn Thanh Tuấn',
      date: '08/13/2026',
      deadline: '08/13/2026',
      plannedHours: '1h',
      actualHours: '—',
      status: 'Chưa bắt đầu',
      klDk: 1,
      klDp: 0,
      rowTheme: 'blue',
    },
    {
      id: 'rpt-12',
      title: 'KIỂM TRA CÔNG VIỆC TUẦN 3',
      assignee: 'Nguyễn Thanh Tuấn',
      date: '08/14/2026',
      deadline: '08/14/2026',
      plannedHours: '1h',
      actualHours: '—',
      status: 'Chưa bắt đầu',
      klDk: 1,
      klDp: 0,
      rowTheme: 'blue',
    },
    {
      id: 'rpt-13',
      title: 'KIỂM TRA CÔNG VIỆC 80%',
      assignee: 'Nguyễn Thanh Tuấn',
      assignees: ['Nguyễn Thanh Tuấn', 'Phùng Bích Thảo', 'Nguyễn Đức Việt'],
      date: '08/31/2026',
      deadline: '08/31/2026',
      plannedHours: '1h',
      actualHours: '—',
      status: 'Chưa bắt đầu',
      klDk: 1,
      klDp: 0,
      rowTheme: 'gold',
    },
    {
      id: 'rpt-14',
      title: 'KIỂM TRA CÔNG VIỆC 100%',
      assignee: 'Nguyễn Thanh Tuấn',
      assignees: ['Nguyễn Thanh Tuấn', 'Phùng Bích Thảo'],
      date: '09/01/2026',
      deadline: '09/01/2026',
      plannedHours: '1h',
      actualHours: '—',
      status: 'Chưa bắt đầu',
      klDk: 1,
      klDp: 0,
      rowTheme: 'gold',
    },
    {
      id: 'rpt-15',
      title: 'QUAY CHỤP TƯ LIỆU LÀM VIỆC',
      assignee: 'Cao Trường Thiên',
      assignees: ['Cao Trường Thiên'],
      date: '09/07/2026',
      deadline: '09/07/2026',
      plannedHours: '1h',
      actualHours: '1h',
      status: 'Hoàn thành',
      klDk: 1,
      klDp: 0,
      rowTheme: 'blue',
    },
    {
      id: 'rpt-16',
      title: 'QUAY CHỤP TƯ LIỆU LÀM VIỆC',
      assignee: 'Cao Trường Thiên',
      assignees: ['Cao Trường Thiên'],
      date: '09/11/2026',
      deadline: '09/11/2026',
      plannedHours: '1h',
      actualHours: '2h',
      status: 'Hoàn thành',
      klDk: 1,
      klDp: 0,
      rowTheme: 'blue',
    },
    {
      id: 'rpt-17',
      title: 'LÊN KẾ HOẠCH CHƯƠNG TRÌNH SƠ BỘ',
      assignee: 'Cao Trường Thiên',
      assignees: ['Cao Trường Thiên'],
      date: '09/09/2026',
      deadline: '09/09/2026',
      plannedHours: '2h',
      actualHours: '2h',
      status: 'Hoàn thành',
      klDk: 0,
      klDp: 0,
      rowTheme: 'blue',
    },
    {
      id: 'rpt-18',
      title: 'LÊN DỰ KIẾN NHÂN SỰ KẾ HOẠCH TRUNG THU',
      assignee: 'Cao Trường Thiên',
      assignees: ['Cao Trường Thiên'],
      date: '09/09/2026',
      deadline: '09/09/2026',
      plannedHours: '1h',
      actualHours: '1h',
      status: 'Hoàn thành',
      klDk: 0,
      klDp: 0,
      rowTheme: 'blue',
    },
    {
      id: 'rpt-19',
      title: 'THIẾT KẾ TRANG MẪU DXBG - VIE',
      assignee: 'Cao Trường Thiên',
      assignees: ['Cao Trường Thiên'],
      date: '09/05/2026',
      deadline: '09/05/2026',
      plannedHours: '40h',
      actualHours: '38h',
      status: 'Hoàn thành',
      klDk: 1,
      klDp: 0,
      rowTheme: 'blue',
    },
    {
      id: 'rpt-20',
      title: 'ĐIỀU CHỈNH VIDEO HỌP QLDA LẦN 02',
      assignee: 'Cao Trường Thiên',
      assignees: ['Cao Trường Thiên'],
      date: '09/12/2026',
      deadline: '09/12/2026',
      plannedHours: '8h',
      actualHours: '8h',
      status: 'Hoàn thành',
      klDk: 0,
      klDp: 0,
      rowTheme: 'blue',
    },
    {
      id: 'rpt-21',
      title: 'ĐIỀU CHỈNH VIDEO HỌP QLDA LẦN 03',
      assignee: 'Cao Trường Thiên',
      assignees: ['Cao Trường Thiên'],
      date: '09/14/2026',
      deadline: '09/14/2026',
      plannedHours: '16h',
      actualHours: '8h',
      status: 'Đang thực hiện',
      klDk: 0,
      klDp: 0,
      rowTheme: 'gold',
    },
    {
      id: 'rpt-22',
      title: 'RÀ SOÁT HỒ SƠ PHÊ DUYỆT DỰ ÁN',
      assignee: 'Nguyễn Phú Quang',
      assignees: ['Nguyễn Phú Quang'],
      date: '09/15/2026',
      deadline: '09/17/2026',
      plannedHours: '6h',
      actualHours: '2h',
      status: 'Chờ duyệt',
      klDk: 2,
      klDp: 1,
      rowTheme: 'blue',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isGroupOpen, setIsGroupOpen] = useState<boolean>(true);
  const [reportRows, setReportRows] = useState<ReportTask[]>(sampleReports);
  const [draggedReportId, setDraggedReportId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [dropPosition, setDropPosition] = useState<'before' | 'after' | null>(null);
  const [activeModal, setActiveModal] = useState<{ type: 'delete' | 'view'; taskId?: string; taskTitle?: string } | null>(null);
  const [reportGroupById, setReportGroupById] = useState<Record<string, string>>({});

  const selectedTask = activeModal?.taskId ? reportRows.find((item) => item.id === activeModal.taskId) ?? null : null;

  const handleOpenViewModal = (item: ReportTask) => setActiveModal({ type: 'view', taskId: item.id, taskTitle: item.title });
  const handleOpenDeleteModal = (item: ReportTask) => setActiveModal({ type: 'delete', taskId: item.id, taskTitle: item.title });

  const getReportGroup = (reportId: string) => {
    if (['rpt-15', 'rpt-16'].includes(reportId)) return 'HOẠT ĐỘNG DOANH NGHIỆP';
    if (['rpt-17', 'rpt-18'].includes(reportId)) return 'HOẠT ĐỘNG TRUNG THU';
    if (reportId === 'rpt-19') return 'QUẢN LÝ WEBSITE DOANH NGHIỆP';
    if (['rpt-20', 'rpt-21'].includes(reportId)) return 'TRUYỀN THÔNG HỢP QUẢN LÝ DỰ ÁN';
    return reportGroupById[reportId] || null;
  };

  const handleAddTaskAfter = (item: ReportTask) => {
    const newTask: ReportTask = {
      id: `rpt-new-${Date.now()}`,
      title: 'CÔNG VIỆC MỚI',
      assignee: item.assignee,
      date: item.date,
      deadline: item.deadline || item.date,
      plannedHours: '1h',
      actualHours: '—',
      status: 'Chưa bắt đầu',
      klDk: 1,
      klDp: 0,
      rowTheme: item.rowTheme,
    };
    const sourceGroup = getReportGroup(item.id);

    setReportRows((currentReports) => {
      const nextReports = [...currentReports];
      const currentIndex = nextReports.findIndex((report) => report.id === item.id);
      if (currentIndex >= 0) nextReports.splice(currentIndex + 1, 0, newTask);
      return nextReports;
    });

    if (sourceGroup) {
      setReportGroupById((currentGroups) => ({ ...currentGroups, [newTask.id]: sourceGroup }));
    }
  };

  const handleDeleteTask = () => {
    if (!activeModal?.taskId) return;
    setReportRows((current) => current.filter((item) => item.id !== activeModal.taskId));
    setActiveModal(null);
  };

  const moveReport = (fromId: string, toId: string, position: 'before' | 'after' = 'before') => {
    setReportRows((currentReports) => {
      const nextReports = [...currentReports];
      const fromIndex = nextReports.findIndex((item) => item.id === fromId);
      const toIndex = nextReports.findIndex((item) => item.id === toId);

      if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
        return currentReports;
      }

      const [movedItem] = nextReports.splice(fromIndex, 1);
      const insertionIndex = position === 'after' ? toIndex + 1 : toIndex;
      nextReports.splice(Math.max(0, insertionIndex), 0, movedItem);
      return nextReports;
    });
  };

  // Filtering
  const filteredReports = reportRows.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignee.toLowerCase().includes(searchTerm.toLowerCase());

    const matchAssignee = selectedAssignee === 'all' || item.assignee === selectedAssignee;

    let matchStatus = true;
    if (selectedStatusFilter === 'Hoàn thành') matchStatus = item.status === 'Hoàn thành';
    else if (selectedStatusFilter === 'Đang triển khai') matchStatus = item.status === 'Đang thực hiện';
    else if (selectedStatusFilter === 'Chờ duyệt') matchStatus = item.status === 'Chờ duyệt';

    return matchSearch && matchAssignee && matchStatus;
  });

  const totalCount = reportRows.length;
  const completedCount = reportRows.filter((r) => r.status === 'Hoàn thành').length;
  const inProgressCount = reportRows.filter((r) => r.status === 'Đang thực hiện').length;
  const totalHours = reportRows.reduce(
    (acc, r) => acc + (typeof r.plannedHours === 'number' ? r.plannedHours : parseInt(String(r.plannedHours)) || 0),
    0
  );

  const secondaryGroupIds = ['rpt-15', 'rpt-16', 'rpt-17', 'rpt-18', 'rpt-19', 'rpt-20', 'rpt-21'];
  const primaryGroupReports = filteredReports.filter((item) => !secondaryGroupIds.includes(item.id) && !reportGroupById[item.id]);

  const secondaryGroups = [
    {
      title: 'HOẠT ĐỘNG DOANH NGHIỆP',
      items: filteredReports.filter((item) => getReportGroup(item.id) === 'HOẠT ĐỘNG DOANH NGHIỆP'),
    },
    {
      title: 'HOẠT ĐỘNG TRUNG THU',
      items: filteredReports.filter((item) => getReportGroup(item.id) === 'HOẠT ĐỘNG TRUNG THU'),
    },
    {
      title: 'QUẢN LÝ WEBSITE DOANH NGHIỆP',
      items: filteredReports.filter((item) => getReportGroup(item.id) === 'QUẢN LÝ WEBSITE DOANH NGHIỆP'),
    },
    {
      title: 'TRUYỀN THÔNG HỢP QUẢN LÝ DỰ ÁN',
      items: filteredReports.filter((item) => getReportGroup(item.id) === 'TRUYỀN THÔNG HỢP QUẢN LÝ DỰ ÁN'),
    },
  ];

  return (
    <div className="w-full h-screen max-h-screen bg-white p-4 sm:p-5 flex flex-col space-y-2.5 animate-fade-in select-none overflow-hidden">
      <XemBaoCaoModal
        isOpen={activeModal?.type === 'view'}
        taskTitle={activeModal?.taskTitle || selectedTask?.title || 'Công việc'}
        onClose={() => setActiveModal(null)}
      />
      <XoaCongViecModal
        isOpen={activeModal?.type === 'delete'}
        taskTitle={activeModal?.taskTitle || selectedTask?.title || 'Công việc'}
        onClose={() => setActiveModal(null)}
        onConfirm={handleDeleteTask}
      />
      
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
            <thead className="sticky top-0 z-20 bg-slate-50 shadow-2xs border-b border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
              <tr className="bg-slate-50">
                <th className="px-2.5 py-3 text-center whitespace-nowrap w-12 border-r border-slate-200">
                  #
                </th>
                <th className="px-2.5 py-3 text-center whitespace-nowrap w-16 border-r border-slate-200">
                  BC TH
                </th>
                <th className="px-2 py-2 text-center whitespace-nowrap w-16 leading-tight border-r border-slate-200">
                  <div>THAO</div>
                  <div>TÁC</div>
                </th>
                <th className="px-3 py-3 text-left whitespace-nowrap w-28 border-r border-slate-200">
                  TRẠNG THÁI
                </th>
                <th className="px-3.5 py-3 text-left whitespace-nowrap min-w-[280px] border-r border-slate-200">
                  TÊN CÔNG VIỆC
                </th>
                <th className="px-3 py-3 text-center whitespace-nowrap w-16 border-r border-slate-200">
                  KL DK
                </th>
                <th className="px-3 py-3 text-center whitespace-nowrap w-16 border-r border-slate-200">
                  KL DP
                </th>
                <th className="px-3 py-3 text-left whitespace-nowrap min-w-[170px] border-r border-slate-200">
                  NHÂN SỰ
                </th>
                <th className="px-3 py-3 text-center whitespace-nowrap w-16 border-r border-slate-200">
                  GIỜ DK
                </th>
                <th className="px-3 py-3 text-center whitespace-nowrap w-16 border-r border-slate-200">
                  GIỜ TT
                </th>
                <th className="px-3 py-3 text-left whitespace-nowrap w-32 border-r border-slate-200">
                  BẮT ĐẦU
                </th>
                <th className="px-3 py-3 text-left whitespace-nowrap w-32">
                  KẾT THÚC
                </th>
              </tr>
            </thead>

            <tbody>
              {/* GROUP ROW: KHỞI TẠO VÀ PHÊ DUYỆT */}
              <tr className="bg-[#f8fafc] border-b border-slate-200">
                <td colSpan={12} className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <IconGridDots size={14} className="text-slate-400 shrink-0 cursor-grab" />
                    <button
                      type="button"
                      onClick={() => setIsGroupOpen(!isGroupOpen)}
                      className="w-5 h-5 rounded border border-slate-300 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 shadow-2xs shrink-0 cursor-pointer"
                    >
                      <IconChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${isGroupOpen ? '' : '-rotate-90'}`}
                      />
                    </button>
                    <span className="font-bold text-slate-800 text-xs tracking-wide uppercase">
                      KHỞI TẠO VÀ PHÊ DUYỆT
                    </span>
                  </div>
                </td>
              </tr>

              {/* DATA ROWS */}
              {isGroupOpen && (
                primaryGroupReports.length > 0 || secondaryGroups.some((group) => group.items.length > 0) ? (
                  <>
                    {primaryGroupReports.map((item, idx) => {
                      const isGold = item.rowTheme === 'gold';
                      const rowBgClass = isGold
                        ? 'bg-[#dbae57] hover:bg-[#cf9e47]'
                        : 'bg-[#5c8ba7] hover:bg-[#527d97]';
                      const borderClass = isGold
                        ? 'border-r border-b border-white/25'
                        : 'border-r border-b border-white/20';

                      return (
                        <React.Fragment key={item.id}>
                          {dragOverId === item.id && dropPosition === 'before' && (
                            <tr className="bg-transparent">
                              <td colSpan={12} className="p-0">
                                <div className="h-1.5 w-full bg-white/90 rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.3)]" />
                              </td>
                            </tr>
                          )}

                          <tr
                            draggable
                            onDragStart={(event) => {
                              event.dataTransfer.effectAllowed = 'move';
                              event.dataTransfer.setData('text/plain', item.id);
                              setDraggedReportId(item.id);
                              setDragOverId(item.id);
                            }}
                            onDragOver={(event) => {
                              event.preventDefault();
                              event.dataTransfer.dropEffect = 'move';
                              const rect = event.currentTarget.getBoundingClientRect();
                              const relativeY = event.clientY - rect.top;
                              const nextPosition = relativeY < rect.height / 2 ? 'before' : 'after';
                              setDragOverId(item.id);
                              setDropPosition(nextPosition);
                            }}
                            onDrop={(event) => {
                              event.preventDefault();
                              event.dataTransfer.clearData();
                              if (draggedReportId && draggedReportId !== item.id) {
                                moveReport(draggedReportId, item.id, dropPosition ?? 'before');
                              }
                              setDraggedReportId(null);
                              setDragOverId(null);
                              setDropPosition(null);
                            }}
                            onDragEnd={() => {
                              setDraggedReportId(null);
                              setDragOverId(null);
                              setDropPosition(null);
                            }}
                            className={`${rowBgClass} transition-colors text-white text-xs cursor-grab active:cursor-grabbing ${dragOverId === item.id && dropPosition === 'before' ? 'ring-2 ring-white/70 ring-inset' : ''} ${dragOverId === item.id && dropPosition === 'after' ? 'ring-2 ring-white/70 ring-inset' : ''}`}
                            title="Kéo để sắp xếp thứ tự"
                          >
                            {/* # */}
                            <td className={`px-2 py-2.5 text-center ${borderClass} whitespace-nowrap`}>
                              <div className="flex items-center justify-center gap-1.5">
                                <IconGridDots size={13} className="text-white/50 shrink-0 cursor-grab" />
                                <span className="font-semibold text-white text-xs">{idx + 1}</span>
                              </div>
                            </td>

                            {/* BC TH */}
                            <td className={`px-2 py-2.5 text-center ${borderClass} whitespace-nowrap`}>
                              <button
                                type="button"
                                onClick={() => handleOpenViewModal(item)}
                                className="bg-white text-[#5c8ba7] font-bold text-[11px] px-2 py-0.5 rounded shadow-2xs inline-flex items-center gap-1 hover:bg-slate-50 transition-colors cursor-pointer"
                              >
                                <IconFileText size={12} className="text-[#5c8ba7]" />
                                <span>BC</span>
                              </button>
                            </td>

                            {/* THAO TÁC */}
                            <td className={`px-2 py-2.5 text-center ${borderClass} whitespace-nowrap`}>
                              <div className="flex items-center justify-center gap-2 text-white/90">
                                <button
                                  type="button"
                                  onClick={() => handleAddTaskAfter(item)}
                                  className="hover:text-white hover:scale-110 transition-transform p-0.5 cursor-pointer"
                                  title="Thêm"
                                >
                                  <IconPlus size={13} strokeWidth={2.5} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleOpenDeleteModal(item)}
                                  className="hover:text-white hover:scale-110 transition-transform p-0.5 cursor-pointer"
                                  title="Xóa"
                                >
                                  <IconTrash size={13} strokeWidth={2} />
                                </button>
                              </div>
                            </td>

                            {/* TRẠNG THÁI */}
                            <td className={`px-2.5 py-2.5 ${borderClass} whitespace-nowrap`}>
                              <span className="bg-[#e8f7ee] text-[#15803d] border border-[#a7f3d0] font-bold text-[11px] px-2.5 py-0.5 rounded-full inline-block shadow-2xs">
                                {item.status || 'Chưa bắt đầu'}
                              </span>
                            </td>

                            {/* TÊN CÔNG VIỆC */}
                            <td className={`px-3 py-2.5 ${borderClass}`}>
                              <span className="font-bold text-white uppercase text-[11px] tracking-wide block leading-snug">
                                {item.title}
                              </span>
                            </td>

                            {/* KL DK */}
                            <td className={`px-2 py-2.5 text-center ${borderClass} whitespace-nowrap font-semibold text-white text-xs`}>
                              {item.klDk ?? 1}
                            </td>

                            {/* KL DP */}
                            <td className={`px-2 py-2.5 text-center ${borderClass} whitespace-nowrap font-semibold text-white text-xs`}>
                              {item.klDp ?? 0}
                            </td>

                            {/* NHÂN SỰ */}
                            <td className={`px-2.5 py-2.5 ${borderClass}`}>
                              {item.assignees && item.assignees.length > 1 ? (
                                <div className="bg-[#4d7d9d] text-white rounded p-1.5 text-[11px] font-medium leading-snug space-y-0.5 shadow-2xs border border-white/20">
                                  {item.assignees.map((name, i) => (
                                    <div key={i} className="whitespace-nowrap">{name}</div>
                                  ))}
                                </div>
                              ) : (
                                <div className="flex items-center justify-between gap-1 text-white text-xs font-medium cursor-pointer hover:opacity-90">
                                  <span className="whitespace-nowrap">{item.assignee}</span>
                                  <IconChevronDown size={12} className="text-white/70 shrink-0" />
                                </div>
                              )}
                            </td>

                            {/* GIỜ DK */}
                            <td className={`px-2 py-2.5 text-center ${borderClass} whitespace-nowrap font-semibold text-white text-xs`}>
                              {item.plannedHours}
                            </td>

                            {/* GIỜ TT */}
                            <td className={`px-2 py-2.5 text-center ${borderClass} whitespace-nowrap font-bold text-xs`}>
                              <span className="text-[#f87171]">{item.actualHours || '—'}</span>
                            </td>

                            {/* BẮT ĐẦU */}
                            <td className={`px-2.5 py-2.5 ${borderClass} whitespace-nowrap`}>
                              <div className="flex items-center justify-between gap-1.5 text-white text-[11px] font-medium">
                                <span>{item.date}</span>
                                <IconCalendar size={13} className="text-white/80 shrink-0" />
                              </div>
                            </td>

                            {/* KẾT THÚC */}
                            <td className={`px-2.5 py-2.5 border-b ${isGold ? 'border-white/25' : 'border-white/20'} whitespace-nowrap`}>
                              <div className="flex items-center justify-between gap-1.5 text-white text-[11px] font-medium">
                                <span>{item.deadline || item.date}</span>
                                <IconCalendar size={13} className="text-white/80 shrink-0" />
                              </div>
                            </td>
                          </tr>

                          {dragOverId === item.id && dropPosition === 'after' && (
                            <tr className="bg-transparent">
                              <td colSpan={12} className="p-0">
                                <div className="h-1.5 w-full bg-white/90 rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.3)]" />
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}

                    {secondaryGroups.map((group) => (
                      <React.Fragment key={group.title}>
                        <tr className="bg-[#f8fafc] border-b border-slate-200">
                          <td colSpan={12} className="px-3 py-2">
                            <div className="flex items-center gap-2">
                              <IconGridDots size={14} className="text-slate-400 shrink-0 cursor-grab" />
                              <button
                                type="button"
                                className="w-5 h-5 rounded border border-slate-300 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 shadow-2xs shrink-0 cursor-pointer"
                              >
                                <IconChevronDown size={13} className="transition-transform duration-200" />
                              </button>
                              <span className="font-bold text-slate-800 text-xs tracking-wide uppercase">
                                {group.title}
                              </span>
                            </div>
                          </td>
                        </tr>

                        {group.items.length > 0 ? group.items.map((item, idx) => {
                          const isGold = item.rowTheme === 'gold';
                          const rowBgClass = isGold
                            ? 'bg-[#dbae57] hover:bg-[#cf9e47]'
                            : 'bg-[#5c8ba7] hover:bg-[#527d97]';
                          const borderClass = isGold
                            ? 'border-r border-b border-white/25'
                            : 'border-r border-b border-white/20';

                          return (
                            <React.Fragment key={`${group.title}-${item.id}`}>
                              {dragOverId === item.id && dropPosition === 'before' && (
                                <tr className="bg-transparent">
                                  <td colSpan={12} className="p-0">
                                    <div className="h-1.5 w-full bg-white/90 rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.3)]" />
                                  </td>
                                </tr>
                              )}

                              <tr
                                draggable
                                onDragStart={(event) => {
                                  event.dataTransfer.effectAllowed = 'move';
                                  event.dataTransfer.setData('text/plain', item.id);
                                  setDraggedReportId(item.id);
                                  setDragOverId(item.id);
                                }}
                                onDragOver={(event) => {
                                  event.preventDefault();
                                  event.dataTransfer.dropEffect = 'move';
                                  const rect = event.currentTarget.getBoundingClientRect();
                                  const relativeY = event.clientY - rect.top;
                                  const nextPosition = relativeY < rect.height / 2 ? 'before' : 'after';
                                  setDragOverId(item.id);
                                  setDropPosition(nextPosition);
                                }}
                                onDrop={(event) => {
                                  event.preventDefault();
                                  event.dataTransfer.clearData();
                                  if (draggedReportId && draggedReportId !== item.id) {
                                    moveReport(draggedReportId, item.id, dropPosition ?? 'before');
                                  }
                                  setDraggedReportId(null);
                                  setDragOverId(null);
                                  setDropPosition(null);
                                }}
                                onDragEnd={() => {
                                  setDraggedReportId(null);
                                  setDragOverId(null);
                                  setDropPosition(null);
                                }}
                                className={`${rowBgClass} transition-colors text-white text-xs cursor-grab active:cursor-grabbing ${dragOverId === item.id && dropPosition === 'before' ? 'ring-2 ring-white/70 ring-inset' : ''} ${dragOverId === item.id && dropPosition === 'after' ? 'ring-2 ring-white/70 ring-inset' : ''}`}
                                title="Kéo để sắp xếp thứ tự"
                              >
                                <td className={`px-2 py-2.5 text-center ${borderClass} whitespace-nowrap`}>
                                  <div className="flex items-center justify-center gap-1.5">
                                    <IconGridDots size={13} className="text-white/50 shrink-0 cursor-grab" />
                                    <span className="font-semibold text-white text-xs">{idx + 1}</span>
                                  </div>
                                </td>
                                <td className={`px-2 py-2.5 text-center ${borderClass} whitespace-nowrap`}>
                                  <button type="button" onClick={() => handleOpenViewModal(item)} className="bg-white text-[#5c8ba7] font-bold text-[11px] px-2 py-0.5 rounded shadow-2xs inline-flex items-center gap-1 hover:bg-slate-50 transition-colors cursor-pointer">
                                    <IconFileText size={12} className="text-[#5c8ba7]" />
                                    <span>BC</span>
                                  </button>
                                </td>
                                <td className={`px-2 py-2.5 text-center ${borderClass} whitespace-nowrap`}>
                                  <div className="flex items-center justify-center gap-2 text-white/90">
                                    <button type="button" onClick={() => handleAddTaskAfter(item)} className="hover:text-white hover:scale-110 transition-transform p-0.5 cursor-pointer" title="Thêm">
                                      <IconPlus size={13} strokeWidth={2.5} />
                                    </button>
                                    <button type="button" onClick={() => handleOpenDeleteModal(item)} className="hover:text-white hover:scale-110 transition-transform p-0.5 cursor-pointer" title="Xóa">
                                      <IconTrash size={13} strokeWidth={2} />
                                    </button>
                                  </div>
                                </td>
                                <td className={`px-2.5 py-2.5 ${borderClass} whitespace-nowrap`}>
                                  <span className="bg-[#e8f7ee] text-[#15803d] border border-[#a7f3d0] font-bold text-[11px] px-2.5 py-0.5 rounded-full inline-block shadow-2xs">
                                    {item.status || 'Chưa bắt đầu'}
                                  </span>
                                </td>
                                <td className={`px-3 py-2.5 ${borderClass}`}>
                                  <span className="font-bold text-white uppercase text-[11px] tracking-wide block leading-snug">
                                    {item.title}
                                  </span>
                                </td>
                                <td className={`px-2 py-2.5 text-center ${borderClass} whitespace-nowrap font-semibold text-white text-xs`}>
                                  {item.klDk ?? 1}
                                </td>
                                <td className={`px-2 py-2.5 text-center ${borderClass} whitespace-nowrap font-semibold text-white text-xs`}>
                                  {item.klDp ?? 0}
                                </td>
                                <td className={`px-2.5 py-2.5 ${borderClass}`}>
                                  <div className="flex items-center justify-between gap-1 text-white text-xs font-medium cursor-pointer hover:opacity-90">
                                    <span className="whitespace-nowrap">{item.assignee}</span>
                                    <IconChevronDown size={12} className="text-white/70 shrink-0" />
                                  </div>
                                </td>
                                <td className={`px-2 py-2.5 text-center ${borderClass} whitespace-nowrap font-semibold text-white text-xs`}>
                                  {item.plannedHours}
                                </td>
                                <td className={`px-2 py-2.5 text-center ${borderClass} whitespace-nowrap font-bold text-xs`}>
                                  <span className="text-[#f87171]">{item.actualHours || '—'}</span>
                                </td>
                                <td className={`px-2.5 py-2.5 ${borderClass} whitespace-nowrap`}>
                                  <div className="flex items-center justify-between gap-1.5 text-white text-[11px] font-medium">
                                    <span>{item.date}</span>
                                    <IconCalendar size={13} className="text-white/80 shrink-0" />
                                  </div>
                                </td>
                                <td className={`px-2.5 py-2.5 border-b ${isGold ? 'border-white/25' : 'border-white/20'} whitespace-nowrap`}>
                                  <div className="flex items-center justify-between gap-1.5 text-white text-[11px] font-medium">
                                    <span>{item.deadline || item.date}</span>
                                    <IconCalendar size={13} className="text-white/80 shrink-0" />
                                  </div>
                                </td>
                              </tr>

                              {dragOverId === item.id && dropPosition === 'after' && (
                                <tr className="bg-transparent">
                                  <td colSpan={12} className="p-0">
                                    <div className="h-1.5 w-full bg-white/90 rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.3)]" />
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        }) : (
                          <tr>
                            <td colSpan={12} className="text-center py-4 text-slate-400 bg-white">
                              <p className="font-semibold text-xs">Không có dữ liệu.</p>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan={12} className="text-center py-10 text-slate-400 bg-white">
                      <p className="font-semibold text-xs">Không tìm thấy báo cáo nào phù hợp.</p>
                    </td>
                  </tr>
                )
              )}
            </tbody>
            </table>
          </div>
        </div>

    </div>
  );
}
