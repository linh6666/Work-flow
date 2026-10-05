"use client";

import React, { useState } from 'react';
import {
  IconSearch,
  IconPlus,
  IconCalendar,
  IconCheck,
  IconClock,
  IconAlertTriangle,
  IconEdit,
  IconEye,
  IconListCheck,
  IconTrendingUp,
  IconFolder,
  IconRefresh,
  IconDeviceFloppy,
  IconPrinter,
  IconMaximize,
  IconSettings,
  IconWand,
} from '@tabler/icons-react';

interface TaskItem {
  id: string;
  code: string;
  title: string;
  project: string;
  assignee: string;
  startDate: string;
  dueDate: string;
  priority: 'Cao' | 'Trung bình' | 'Thấp';
  progress: number;
  status: 'Đang thực hiện' | 'Hoàn thành' | 'Chờ duyệt' | 'Trễ hạn';
}

const INITIAL_TASKS: TaskItem[] = [
  {
    id: '1',
    code: 'KH-KD-001',
    title: 'Khảo sát hiện trạng & tiếp xúc CĐT VSIP Lạng Sơn',
    project: 'VSIP Lạng Sơn',
    assignee: 'Nguyễn Văn Anh',
    startDate: '01/10/2026',
    dueDate: '10/10/2026',
    priority: 'Cao',
    progress: 75,
    status: 'Đang thực hiện',
  },
  {
    id: '2',
    code: 'KH-KD-002',
    title: 'Lập đề xuất phương án thi công sa bàn 22 Liễu Giai',
    project: '22 Liễu Giai',
    assignee: 'Trần Thị Bình',
    startDate: '02/10/2026',
    dueDate: '08/10/2026',
    priority: 'Cao',
    progress: 100,
    status: 'Hoàn thành',
  },
  {
    id: '3',
    code: 'KH-KD-003',
    title: 'Trình duyệt báo giá chi tiết dự án Flamingo Đông Anh',
    project: 'Flamingo Đông Anh',
    assignee: 'Lê Hoàng Cường',
    startDate: '03/10/2026',
    dueDate: '12/10/2026',
    priority: 'Trung bình',
    progress: 40,
    status: 'Chờ duyệt',
  },
  {
    id: '4',
    code: 'KH-KD-004',
    title: 'Thương thảo hợp đồng nguyên tắc Khu đô thị Nam Thăng Long',
    project: 'Nam Thăng Long',
    assignee: 'Phạm Văn Dũng',
    startDate: '25/09/2026',
    dueDate: '04/10/2026',
    priority: 'Cao',
    progress: 30,
    status: 'Trễ hạn',
  },
  {
    id: '5',
    code: 'KH-KD-005',
    title: 'Tổng hợp báo cáo doanh số & dự báo KD Q4/2026',
    project: 'Nội bộ Kinh doanh',
    assignee: 'Nguyễn Văn Anh',
    startDate: '05/10/2026',
    dueDate: '15/10/2026',
    priority: 'Thấp',
    progress: 20,
    status: 'Đang thực hiện',
  },
];

export default function BangKhCongViecKdTab() {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<{
    code: string;
    title: string;
    project: string;
    assignee: string;
    startDate: string;
    dueDate: string;
    priority: 'Cao' | 'Trung bình' | 'Thấp';
    status: 'Đang thực hiện' | 'Hoàn thành' | 'Chờ duyệt' | 'Trễ hạn';
  }>({
    code: `KH-KD-00${tasks.length + 1}`,
    title: '',
    project: '',
    assignee: 'Nguyễn Văn Anh',
    startDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    priority: 'Trung bình',
    status: 'Đang thực hiện',
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;

    const item: TaskItem = {
      id: Date.now().toString(),
      code: newTask.code || `KH-KD-00${tasks.length + 1}`,
      title: newTask.title,
      project: newTask.project || 'Kinh doanh',
      assignee: newTask.assignee,
      startDate: newTask.startDate,
      dueDate: newTask.dueDate || '30/10/2026',
      priority: newTask.priority,
      progress: 0,
      status: newTask.status,
    };

    setTasks([item, ...tasks]);
    setIsAddModalOpen(false);
    setNewTask({
      code: `KH-KD-00${tasks.length + 2}`,
      title: '',
      project: '',
      assignee: 'Nguyễn Văn Anh',
      startDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      priority: 'Trung bình',
      status: 'Đang thực hiện',
    });
  };

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  // Calculate statistics
  const totalTasks = tasks.length;
  const inProgressCount = tasks.filter((t) => t.status === 'Đang thực hiện').length;
  const completedCount = tasks.filter((t) => t.status === 'Hoàn thành').length;
  const pendingCount = tasks.filter((t) => t.status === 'Chờ duyệt').length;
  const overdueCount = tasks.filter((t) => t.status === 'Trễ hạn').length;

  return (
    <div className="flex flex-col h-full bg-white space-y-3.5 p-1 overflow-y-auto">
      {/* ── 1. HEADER INFO BAR ── */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 font-medium">
        <h2 className="text-sm font-bold text-slate-900">
          Bảng KH công việc KD
        </h2>
        <span className="text-slate-400">— T7-T8/2026</span>
        <span className="text-slate-300">|</span>
        <span>Người cập nhật: <strong className="text-slate-700 font-bold">Bùi Phương Uyên</strong></span>
        <span className="text-slate-300">|</span>
        <span>Ngày: <strong>07/09/2026</strong></span>
        <span className="text-slate-300">|</span>
        <span className="text-emerald-600 font-semibold">Tự làm mới lúc: 14:17:29</span>
      </div>

      {/* ── 2. CONTROL TOOLBAR ROW 1 ── */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {/* Dropdown 1 */}
        <select className="px-3 py-1.5 bg-white border border-indigo-400/80 rounded-lg font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer shadow-2xs">
          <option value="T7-T8-T9/2026">T7-T8-T9/2026</option>
          <option value="T4-T5-T6/2026">T4-T5-T6/2026</option>
          <option value="T1-T2-T3/2026">T1-T2-T3/2026</option>
        </select>

        {/* Dropdown 2 */}
        <select className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-medium text-slate-700 focus:outline-none focus:border-slate-400 cursor-pointer shadow-2xs">
          <option value="2 tháng">2 tháng</option>
          <option value="1 tháng">1 tháng</option>
          <option value="3 tháng">3 tháng</option>
        </select>

        {/* Dropdown 3 */}
        <select className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-medium text-slate-500 focus:outline-none focus:border-slate-400 cursor-pointer shadow-2xs">
          <option value="">Xem quý đã lưu</option>
          <option value="Q3-2026">Quý 3/2026</option>
          <option value="Q2-2026">Quý 2/2026</option>
        </select>

        {/* Action Buttons */}
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <IconPlus size={14} className="text-slate-500" />
          <span>Thêm kỳ mới</span>
        </button>

        <button
          type="button"
          onClick={() => alert('Đồng bộ dữ liệu từ kỳ trước')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <IconRefresh size={14} className="text-slate-500" />
          <span>Đồng bộ từ kỳ trước</span>
        </button>

        <button
          type="button"
          onClick={() => alert('Đã lưu quý')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <IconDeviceFloppy size={14} className="text-slate-500" />
          <span>Lưu quý</span>
        </button>

        <button
          type="button"
          onClick={() => alert('In PDF')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <IconPrinter size={14} className="text-slate-500" />
          <span>In PDF</span>
        </button>

        <button
          type="button"
          onClick={() => alert('Toàn màn hình')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <IconMaximize size={14} className="text-slate-500" />
          <span>Toàn màn hình</span>
        </button>

        <button
          type="button"
          onClick={() => alert('Quản lý nhóm')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <IconSettings size={14} className="text-slate-500" />
          <span>Quản lý nhóm</span>
        </button>
      </div>

      {/* ── 3. ROW 2 BUTTONS ── */}
      <div className="flex items-center gap-2 pt-0.5">
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#453AD4] hover:bg-[#372eb0] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <IconPlus size={16} />
          <span>Thêm dòng</span>
        </button>

        <button
          type="button"
          onClick={() => alert('Chọn nhiều ô')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <IconWand size={15} className="text-slate-500" />
          <span>Chọn nhiều ô</span>
        </button>
      </div>

      {/* ── 4. STATUS PILLS LEGEND ── */}
      <div className="flex flex-wrap gap-2 pt-1 pb-1">
        <span className="px-2.5 py-1.5 bg-[#4caf50] text-white text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          ĐTK = DỰ ÁN ĐANG TRIỂN KHAI
        </span>
        <span className="px-2.5 py-1.5 bg-[#7c8ce6] text-white text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          NT L1 = NGHIỆM THU LẦN 1
        </span>
        <span className="px-2.5 py-1.5 bg-[#204a87] text-white text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          NTCC = NGHIỆM THU CUỐI CÙNG
        </span>
        <span className="px-2.5 py-1.5 bg-[#38b6ff] text-white text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          HTCS = HOÀN THÀNH CHỈNH SỬA
        </span>
        <span className="px-2.5 py-1.5 bg-[#a66a1e] text-white text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          LĐ-BG = LẮP ĐẶT, BÀN GIAO
        </span>
        <span className="px-2.5 py-1.5 bg-[#ffd230] text-slate-900 text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          NTTT L1 = KÍ NTTT LẦN 1 VỚI KH
        </span>
        <span className="px-2.5 py-1.5 bg-[#f58220] text-white text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          TT L1 = NHẬN TT LẦN 1
        </span>
        <span className="px-2.5 py-1.5 bg-[#e2ef34] text-slate-900 text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          HT KHS = HOÀN THÀNH KÍ HỒ SƠ
        </span>
        <span className="px-2.5 py-1.5 bg-[#cc1f1a] text-white text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          HT TTCC = HOÀN THÀNH TTCC
        </span>
        <span className="px-2.5 py-1.5 bg-[#e014d0] text-white text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          TDSX = TẠM DỪNG SX
        </span>
      </div>





      {/* ── 7. TASK TABLE LIST MATCHING KHACH HANG TAB ── */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[880px]">
            <thead className="sticky top-0 z-10 bg-slate-50 shadow-2xs border-b border-slate-200">
              <tr className="bg-slate-50">
                <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 w-24">
                  Mã KH
                </th>
                <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200">
                  Tên công việc & Dự án
                </th>
                <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 w-36">
                  Người thực hiện
                </th>
                <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 w-40">
                  Thời gian
                </th>
                <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 w-28">
                  Ưu tiên
                </th>
                <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 w-32">
                  Tiến độ
                </th>
                <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 w-32">
                  Trạng thái
                </th>
                <th className="px-4 py-3 font-semibold text-slate-500 text-xs text-right bg-slate-50 border-b border-slate-200 w-24">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="px-4 py-3.5 align-middle font-mono font-bold text-slate-600">{t.code}</td>
                    <td className="px-4 py-3.5 align-middle">
                      <p className="font-bold text-[#406c89] hover:underline cursor-pointer leading-snug text-xs">{t.title}</p>
                      <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-medium mt-0.5">
                        <IconFolder size={12} className="text-slate-400" />
                        {t.project}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 align-middle">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-sky-50 text-[#406c89] font-bold text-[11px] flex items-center justify-center shrink-0 border border-sky-100 shadow-2xs">
                          {t.assignee.charAt(0)}
                        </div>
                        <span className="font-medium text-slate-700 text-xs truncate">{t.assignee}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 align-middle text-xs">
                      <div className="flex items-center gap-1 text-slate-600">
                        <IconCalendar size={13} className="text-slate-400 shrink-0" />
                        <span>{t.startDate} - {t.dueDate}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 align-middle">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          t.priority === 'Cao'
                            ? 'bg-rose-50 text-rose-600 border-rose-200'
                            : t.priority === 'Trung bình'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                      >
                        {t.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 align-middle">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${
                              t.progress === 100
                                ? 'bg-emerald-500'
                                : t.progress > 50
                                ? 'bg-[#406c89]'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${t.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 w-7 text-right">
                          {t.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 align-middle">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${
                          t.status === 'Hoàn thành'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                            : t.status === 'Đang thực hiện'
                            ? 'bg-sky-50 text-[#406c89] border-sky-200'
                            : t.status === 'Chờ duyệt'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => alert(`Xem chi tiết: ${t.title}`)}
                          className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                          title="Xem chi tiết"
                        >
                          <IconEye size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => alert(`Chỉnh sửa: ${t.title}`)}
                          className="p-1.5 rounded border border-slate-200 hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                          title="Chỉnh sửa"
                        >
                          <IconEdit size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400 text-xs font-semibold">
                    Không tìm thấy kế hoạch công việc phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 8. MODAL THÊM KẾ HOẠCH CÔNG VIỆC MỚI */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="px-5 py-4 bg-[#406c89] text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Thêm Kế hoạch công việc KD</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-200 hover:text-white text-base font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTask} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mã Kế hoạch</label>
                <input
                  type="text"
                  value={newTask.code}
                  onChange={(e) => setNewTask({ ...newTask, code: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tên công việc KD *</label>
                <input
                  type="text"
                  placeholder="Nhập tên kế hoạch công việc..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Dự án / Hạng mục</label>
                <input
                  type="text"
                  placeholder="Tên dự án hoặc đối tác..."
                  value={newTask.project}
                  onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Người thực hiện</label>
                  <input
                    type="text"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mức độ ưu tiên</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                  >
                    <option value="Cao">Cao</option>
                    <option value="Trung bình">Trung bình</option>
                    <option value="Thấp">Thấp</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Ngày bắt đầu</label>
                  <input
                    type="date"
                    value={newTask.startDate}
                    onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hạn hoàn thành</label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#406c89] hover:bg-[#32566d] text-[#ffffff] rounded-lg font-semibold cursor-pointer"
                >
                  Lưu kế hoạch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
