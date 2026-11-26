"use client";

import React, { useState, useEffect } from 'react';
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
  IconGripVertical,
  IconRefresh,
  IconLoader2
} from '@tabler/icons-react';
import XoaCongViecModal from './modal/XoaCongViecModal';
import XemBaoCaoModal from './modal/XemBaoCaoModal';
import ThemCongViecModal from './modal/ThemCongViecModal';
import SuaCongViecModal from './modal/SuaCongViecModal';
import ThemHangModal from './modal/ThemHang/ThemHangModal';
import ThemMainTaskModal from './modal/ThemMainTask/ThemMainTaskModal';
import {
  getDeptProjectForms,
  updateDeptProjectForm,
  createDeptProjectForm,
  DeptProjectFormItem,
} from '@/api/apiGetDeptProjectForms';
import { NotificationExtension } from '@/common/extension/NotificationExtension';
import { deleteTask } from '@/api/apiDeleteTask';
import { createTask } from '@/api/apiCreateTask';

export interface DepartmentItem {
  name: string;
  statusText: string;
  rawForm?: DeptProjectFormItem;
}

interface ChiTietBaoCaoPhongBanProps {
  department: DepartmentItem;
  projectCode?: string;
  projectName?: string;
  projectId?: string;
  onBack: () => void;
  onBackToProjectList?: () => void;
}

export interface ReportTask {
  id: string;
  code?: string;
  title: string;
  group?: string;
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
  projectCode = '',
  projectName = '',
  projectId,
  onBack,
  onBackToProjectList,
}: ChiTietBaoCaoPhongBanProps) {
  // Adapter chuẩn hóa dữ liệu công việc từ API sang cấu trúc ReportTask của bảng
  const mapApiTaskToReportTask = (apiTask: any, index: number): ReportTask => {
    const rawAssignee = apiTask.assignee || '';
    const assigneesList = rawAssignee.includes(',')
      ? rawAssignee.split(',').map((s: string) => s.trim()).filter(Boolean)
      : (Array.isArray(apiTask.assignees) ? apiTask.assignees : []);

    const rawPlannedHours = apiTask.planned_hours ?? apiTask.plannedHours ?? 1;
    const formattedPlannedHours = typeof rawPlannedHours === 'number'
      ? `${rawPlannedHours}h`
      : (String(rawPlannedHours).endsWith('h') ? String(rawPlannedHours) : `${rawPlannedHours}h`);

    const rawActualHours = apiTask.actual_hours ?? apiTask.actualHours;
    const formattedActualHours = rawActualHours != null && rawActualHours !== ''
      ? (typeof rawActualHours === 'number' ? `${rawActualHours}h` : String(rawActualHours))
      : '—';

    // Parse ngày tháng nếu có (ví dụ 2026-11-13 -> 13/11/2026 hoặc giữ nguyên)
    const formatDate = (dStr?: string) => {
      if (!dStr) return '';
      if (dStr.includes('-') && dStr.length === 10) {
        const [y, m, d] = dStr.split('-');
        return `${d}/${m}/${y}`;
      }
      return dStr;
    };

    return {
      id: apiTask.task_uid || apiTask.id || `rpt-api-${index + 1}`,
      title: apiTask.name || apiTask.title || `Công việc ${index + 1}`,
      assignee: rawAssignee || 'Chưa phân công',
      assignees: assigneesList.length > 1 ? assigneesList : (apiTask.assignees || undefined),
      date: formatDate(apiTask.start_date || apiTask.date) || '—',
      deadline: formatDate(apiTask.end_date || apiTask.deadline || apiTask.start_date || apiTask.date) || '—',
      plannedHours: formattedPlannedHours,
      actualHours: formattedActualHours,
      status: apiTask.status || 'Chưa bắt đầu',
      klDk: apiTask.qty_real ?? apiTask.klDk ?? 1,
      klDp: apiTask.qty_backup ?? apiTask.klDp ?? 0,
      rowTheme: apiTask.rowTheme,
      group: apiTask.group || 'KHỞI TẠO VÀ PHÊ DUYỆT',
    };
  };

  // Memory cache lưu các tasks đã parse theo URL hoặc chuỗi JSON để không phải fetch lại
  const tasksCacheRef = React.useRef<Map<string, ReportTask[]>>(new Map());

  // Helper hàm tải và parse danh sách tasks từ tasks_json (hỗ trợ cả chuỗi JSON và link URL)
  const parseTasksJson = async (tasksJson?: string | null): Promise<ReportTask[]> => {
    if (!tasksJson || !tasksJson.trim()) return [];
    
    // Kiểm tra cache trước
    if (tasksCacheRef.current.has(tasksJson)) {
      return tasksCacheRef.current.get(tasksJson)!;
    }

    try {
      let rawData: any = null;
      if (tasksJson.startsWith('http')) {
        // Link JSON lưu trên cloud CDN
        const res = await fetch(tasksJson);
        if (res.ok) {
          rawData = await res.json();
        }
      } else {
        rawData = JSON.parse(tasksJson);
      }
      if (Array.isArray(rawData)) {
        const mapped = rawData.map(mapApiTaskToReportTask);
        tasksCacheRef.current.set(tasksJson, mapped);
        return mapped;
      }
    } catch (err) {
      console.warn('Lỗi khi parse tasks_json:', err);
    }
    return [];
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroupCollapse = (groupTitle: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupTitle]: !prev[groupTitle],
    }));
  };
  const [reportRows, setReportRows] = useState<ReportTask[]>(() => {
    // Nếu có rawForm sẵn và tasks_json hợp lệ
    if (department.rawForm?.tasks_json && !department.rawForm.tasks_json.startsWith('http')) {
      try {
        const parsed = JSON.parse(department.rawForm.tasks_json);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(mapApiTaskToReportTask);
        }
      } catch (e) {
        console.warn('Lỗi parse ban đầu tasks_json:', e);
      }
    }
    return [];
  });
  const [formRecordId, setFormRecordId] = useState<string | null>(department.rawForm?.id || null);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [savingData, setSavingData] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const loadTasks = async () => {
      setLoadingData(true);
      try {
        let tasksStr = department.rawForm?.tasks_json;
        let recordId = department.rawForm?.id || null;

        // Gọi API fetch dữ liệu phòng ban của dự án
        if (projectId) {
          const data = await getDeptProjectForms(projectId);
          if (data && data.length > 0) {
            const match = data.find(
              (d) => (d.department || '').trim().toLowerCase() === (department.name || '').trim().toLowerCase()
            );
            if (match) {
              recordId = match.id || null;
              tasksStr = match.tasks_json;
            }
          }
        }

        if (isMounted) {
          if (recordId) setFormRecordId(recordId);
          if (tasksStr) {
            const parsedList = await parseTasksJson(tasksStr);
            if (isMounted) setReportRows(parsedList);
          } else {
            setReportRows([]);
          }
        }
      } catch (err) {
        console.error('Lỗi khi tải báo cáo phòng ban từ API:', err);
        if (isMounted) setReportRows([]);
      } finally {
        if (isMounted) setLoadingData(false);
      }
    };

    loadTasks();
    return () => {
      isMounted = false;
    };
  }, [projectId, department.name]);

  // Hàm đồng bộ và lưu danh sách công việc xuống API
  const saveTasksToApi = async (tasks: ReportTask[]) => {
    try {
      const apiPayloadTasks = tasks.map((r) => {
        let plannedHoursNum = typeof r.plannedHours === 'number'
          ? r.plannedHours
          : (parseInt(String(r.plannedHours).replace(/[^\d]/g, '')) || 1);

        let actualHoursVal: number | string = '';
        if (r.actualHours && r.actualHours !== '—') {
          const parsed = parseInt(String(r.actualHours).replace(/[^\d]/g, ''));
          actualHoursVal = isNaN(parsed) ? r.actualHours : parsed;
        }

        const toApiDate = (dStr?: string) => {
          if (!dStr || dStr === '—') return '';
          if (dStr.includes('/')) {
            const parts = dStr.split('/');
            if (parts.length === 3) {
              const [d, m, y] = parts;
              return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
            }
          }
          return dStr;
        };

        const assigneeStr = r.assignees && r.assignees.length > 0 ? r.assignees.join(', ') : r.assignee;

        return {
          task_uid: r.id,
          name: r.title,
          group: r.group || 'KHỞI TẠO VÀ PHÊ DUYỆT',
          assignee: assigneeStr,
          planned_hours: plannedHoursNum,
          actual_hours: actualHoursVal,
          start_date: toApiDate(r.date),
          end_date: toApiDate(r.deadline),
          status: r.status,
          qty_real: Number(r.klDk) || 1,
          qty_backup: Number(r.klDp) || 0,
          quantity_unit: '',
          rowTheme: r.rowTheme,
          progress: r.status === 'Hoàn thành' ? 100 : (r.status === 'Đang thực hiện' ? 50 : 0),
          notes: r.note || '',
        };
      });

      const tasksJson = JSON.stringify(apiPayloadTasks);
      if (formRecordId) {
        await updateDeptProjectForm(formRecordId, {
          department: department.name,
          tasks_json: tasksJson,
          status: 'Đang triển khai',
        });
      } else if (projectId) {
        const created = await createDeptProjectForm({
          project_id: projectId,
          project_name: projectName,
          department: department.name,
          tasks_json: tasksJson,
          status: 'Đang triển khai',
        });
        if (created?.id) setFormRecordId(created.id);
      }
    } catch (err) {
      console.error('Lỗi khi tự động lưu dữ liệu xuống API:', err);
    }
  };

  // Hàm gọi API Lưu báo cáo công việc (PUT hoặc POST) khi bấm nút Lưu thủ công
  const handleSaveReport = async () => {
    setSavingData(true);
    try {
      await saveTasksToApi(reportRows);
      NotificationExtension.Success('Đã lưu báo cáo công việc phòng ban thành công!');
    } catch (err: any) {
      console.error('Lỗi khi lưu báo cáo:', err);
      NotificationExtension.Fails(err.message || 'Lưu báo cáo thất bại, vui lòng thử lại.');
    } finally {
      setSavingData(false);
    }
  };
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };
  const [draggedReportId, setDraggedReportId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [dropPosition, setDropPosition] = useState<'before' | 'after' | null>(null);
  const [activeModal, setActiveModal] = useState<{ type: 'delete' | 'view' | 'add' | 'edit'; taskId?: string; taskTitle?: string; targetItem?: ReportTask } | null>(null);
  const [reportGroupById, setReportGroupById] = useState<Record<string, string>>({});
  const [isThemHangOpen, setIsThemHangOpen] = useState(false);
  const [isThemMainTaskOpen, setIsThemMainTaskOpen] = useState(false);

  const selectedTask = activeModal?.taskId ? reportRows.find((item) => item.id === activeModal.taskId) ?? null : null;

  const handleOpenViewModal = (item: ReportTask) => setActiveModal({ type: 'view', taskId: item.id, taskTitle: item.title });
  const handleOpenDeleteModal = (item: ReportTask) => setActiveModal({ type: 'delete', taskId: item.id, taskTitle: item.title });
  const handleOpenAddModal = (item?: ReportTask) => setActiveModal({ type: 'add', taskId: item?.id, taskTitle: item?.title, targetItem: item });
  const handleOpenEditModal = (item: ReportTask) => setActiveModal({ type: 'edit', taskId: item.id, taskTitle: item.title, targetItem: item });

  const handleConfirmUpdateTask = async (updatedTask: ReportTask) => {
    const nextReports = reportRows.map((item) => (item.id === updatedTask.id ? updatedTask : item));
    setReportRows(nextReports);
    await saveTasksToApi(nextReports);
    NotificationExtension.Success(`Đã cập nhật công việc "${updatedTask.title}" thành công!`);
    showToast(`Đã cập nhật công việc "${updatedTask.title}" thành công!`);
  };

  const handleConfirmAddTask = async (newTask: ReportTask) => {
    const nextReports = [...reportRows];
    if (activeModal?.targetItem) {
      const currentIndex = nextReports.findIndex((report) => report.id === activeModal.targetItem!.id);
      if (currentIndex >= 0) {
        nextReports.splice(currentIndex + 1, 0, newTask);
      } else {
        nextReports.push(newTask);
      }
    } else {
      nextReports.push(newTask);
    }
    setReportRows(nextReports);
    await saveTasksToApi(nextReports);
    NotificationExtension.Success(`Đã thêm công việc "${newTask.title}" thành công!`);
    showToast(`Đã thêm công việc "${newTask.title}" thành công!`);
  };

  const getReportGroup = (reportId: string) => {
    if (['rpt-15', 'rpt-16'].includes(reportId)) return 'HOẠT ĐỘNG DOANH NGHIỆP';
    if (['rpt-17', 'rpt-18'].includes(reportId)) return 'HOẠT ĐỘNG TRUNG THU';
    if (reportId === 'rpt-19') return 'QUẢN LÝ WEBSITE DOANH NGHIỆP';
    if (['rpt-20', 'rpt-21'].includes(reportId)) return 'TRUYỀN THÔNG HỢP QUẢN LÝ DỰ ÁN';
    return reportGroupById[reportId] || null;
  };

  const handleAddTaskAfter = (item: ReportTask) => {
    const parentGroup = item.group || 'KHỞI TẠO VÀ PHÊ DUYỆT';
    const newTask: ReportTask = {
      id: `rpt-new-${Date.now()}`,
      title: 'CÔNG VIỆC MỚI',
      group: parentGroup,
      assignee: item.assignee,
      assignees: item.assignees,
      date: item.date,
      deadline: item.deadline || item.date,
      plannedHours: '1h',
      actualHours: '—',
      status: 'Chưa bắt đầu',
      klDk: 1,
      klDp: 0,
      rowTheme: item.rowTheme,
    };

    const nextReports = [...reportRows];
    const currentIndex = nextReports.findIndex((report) => report.id === item.id);
    if (currentIndex >= 0) {
      nextReports.splice(currentIndex + 1, 0, newTask);
    } else {
      nextReports.push(newTask);
    }
    setReportRows(nextReports);
    saveTasksToApi(nextReports);
  };

  const handleDeleteTask = async () => {
    if (!activeModal?.taskId) return;
    await deleteTask(activeModal.taskId);
    const updated = reportRows.filter((item) => item.id !== activeModal.taskId);
    setReportRows(updated);
    saveTasksToApi(updated);
    setActiveModal(null);
  };

  const moveReport = (fromId: string, toId: string, position: 'before' | 'after' = 'before') => {
    const fromIndex = reportRows.findIndex((item) => item.id === fromId);
    const toIndex = reportRows.findIndex((item) => item.id === toId);

    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
      return;
    }

    const nextReports = [...reportRows];
    const [movedItem] = nextReports.splice(fromIndex, 1);

    // Giữ nguyên group của công việc (không tự ý đổi group),
    // việc gộp hay tách hoàn toàn phụ thuộc vào việc trường group của các dòng có giống nhau hay không.
    const newToIndex = nextReports.findIndex((item) => item.id === toId);
    const insertionIndex = position === 'after' ? newToIndex + 1 : newToIndex;
    nextReports.splice(Math.max(0, insertionIndex), 0, movedItem);

    setReportRows(nextReports);
    // Tự động lưu vị trí sắp xếp mới xuống API
    saveTasksToApi(nextReports);
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

  // Danh sách nhân sự động từ dữ liệu thực tế
  const availableAssignees = React.useMemo(() => {
    const set = new Set<string>();
    reportRows.forEach((r) => {
      if (r.assignee && r.assignee !== 'Chưa phân công') {
        r.assignee.split(',').forEach((a) => {
          const trimmed = a.trim();
          if (trimmed) set.add(trimmed);
        });
      }
      if (r.assignees) {
        r.assignees.forEach((a) => {
          const trimmed = a.trim();
          if (trimmed) set.add(trimmed);
        });
      }
    });
    return Array.from(set);
  }, [reportRows]);

  // Gom nhóm công việc theo thứ tự thực tế:
  // Các dòng liền kề có cùng trường `group` sẽ được gộp chung vào 1 nhóm.
  // Nếu trường `group` khác nhau thì sẽ tách thành nhóm riêng biệt.
  const dynamicGroups = React.useMemo(() => {
    const groups: { id: string; title: string; items: ReportTask[] }[] = [];

    filteredReports.forEach((item, idx) => {
      const gName = (item.group || '').trim().toUpperCase();
      const currentGroup = groups[groups.length - 1];

      if (currentGroup && currentGroup.title === gName) {
        currentGroup.items.push(item);
      } else {
        groups.push({
          id: `group-${groups.length}-${gName}`,
          title: gName,
          items: [item],
        });
      }
    });

    return groups;
  }, [filteredReports]);

  return (
    <div className="w-full h-full min-h-0 bg-white p-3 sm:p-5 flex flex-col space-y-2.5 animate-fade-in select-none overflow-x-auto no-scrollbar relative">
      {/* ── Toast Notification Banner ── */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-70 flex items-center gap-2.5 bg-slate-900/95 text-white px-4 py-3 rounded-xl shadow-2xl text-xs font-medium border border-slate-700/50 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <IconCheck size={15} stroke={2.5} />
          </div>
          <span className="leading-tight">{toastMessage}</span>
        </div>
      )}

      <div className="min-w-[1250px] flex-1 flex flex-col min-h-0 space-y-2.5">
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
        <ThemCongViecModal
          isOpen={activeModal?.type === 'add'}
          departmentName={department.name}
          defaultGroup={activeModal?.targetItem?.group || 'KHỞI TẠO VÀ PHÊ DUYỆT'}
          targetTask={activeModal?.targetItem || null}
          availableAssignees={availableAssignees}
          existingGroups={dynamicGroups.map((g) => g.title)}
          onClose={() => setActiveModal(null)}
          onAddTask={handleConfirmAddTask}
        />
        <ThemHangModal
          isOpen={isThemHangOpen}
          departmentName={department.name}
          onClose={() => setIsThemHangOpen(false)}
          onSubmit={async (newTask) => {
            let createdId = Date.now().toString();
            if (projectId) {
              const res = await createTask({
                project_id: projectId,
                name: newTask.title,
                status: newTask.status,
                quantity_planned: String(newTask.klDk ?? 0),
                quantity_done: String(newTask.klDp ?? 0),
                scheduled_work: String(newTask.plannedHours).replace('h', ''),
                actual_work: String(newTask.actualHours || '0').replace('h', ''),
                start_date: newTask.date,
                end_date: newTask.deadline || newTask.date,
              });
              if (res.success && res.data?.id) {
                createdId = res.data.id;
              }
            }
            const updated = [...reportRows, { ...newTask, id: createdId }];
            setReportRows(updated);
            saveTasksToApi(updated);
            NotificationExtension.Success('Đã thêm hàng công việc mới!');
          }}
        />

        <ThemMainTaskModal
          isOpen={isThemMainTaskOpen}
          departmentName={department.name}
          onClose={() => setIsThemMainTaskOpen(false)}
          onSubmit={(newTasks) => {
            const baseId = Date.now();
            setReportRows((prev) => [
              ...prev,
              ...newTasks.map((t, i) => ({ ...t, id: `${baseId}-${i}` })),
            ]);
            NotificationExtension.Success(`Đã thêm Main task + ${newTasks.length - 1} Subtask!`);
          }}
        />

        <SuaCongViecModal
          isOpen={activeModal?.type === 'edit'}
          departmentName={department.name}
          task={activeModal?.targetItem || selectedTask || null}
          availableAssignees={availableAssignees}
          existingGroups={dynamicGroups.map((g) => g.title)}
          onClose={() => setActiveModal(null)}
          onUpdateTask={handleConfirmUpdateTask}
        />
      
      {/* ROW 1: TITLE & TOP ACTION BUTTONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 shrink-0">
        
        {/* Title & Subtitle with Back Button & Breadcrumbs */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="w-7 h-7 rounded-md bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-all cursor-pointer shadow-2xs shrink-0"
            title="Quay lại chi tiết dự án"
          >
            <IconArrowLeft size={14} />
          </button>

          <div>
            {onBackToProjectList && (
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 mb-0.5">
                <button
                  type="button"
                  onClick={onBackToProjectList}
                  className="hover:text-[#406c89] hover:underline cursor-pointer transition-colors"
                >
                  Quản lý dự án
                </button>
                <span>/</span>
                <button
                  type="button"
                  onClick={onBack}
                  className="hover:text-[#406c89] hover:underline cursor-pointer transition-colors truncate max-w-[200px]"
                >
                  {projectName}
                </button>
                <span>/</span>
                <span className="text-slate-600 font-bold">{department.name}</span>
              </div>
            )}
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
              {department.name}
            </h1>
            <p className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">
              <span className="text-slate-600">{department.statusText ? department.statusText.split('·')[0].trim() : 'Đang triển khai'}</span>
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
            onClick={handleSaveReport}
            disabled={savingData}
            className="px-3.5 py-1.5 bg-[#406c89] hover:bg-[#345870] disabled:opacity-60 text-white rounded-md text-[11px] font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            {savingData ? (
              <IconLoader2 size={14} className="animate-spin" />
            ) : (
              <IconDeviceFloppy size={14} />
            )}
            <span>{savingData ? 'Đang lưu...' : 'Lưu'}</span>
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
            {availableAssignees.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
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

        <button
          type="button"
          onClick={() => setIsThemHangOpen(true)}
          className="inline-flex items-center gap-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md px-2.5 py-1 text-[11px] font-medium cursor-pointer shadow-2xs transition-colors"
        >
          <IconPlus size={13} />
          <span>Thêm hàng</span>
        </button>

        <button
          type="button"
          onClick={() => setIsThemMainTaskOpen(true)}
          className="inline-flex items-center gap-1 bg-white border border-indigo-200 hover:bg-indigo-50 text-indigo-600 rounded-md px-2.5 py-1 text-[11px] font-medium cursor-pointer shadow-2xs transition-colors"
        >
          <IconPlus size={13} />
          <span>Thêm Main task + 5 Subtask</span>
        </button>

      </div>

      {/* ROW 3: ASSIGNED PERSONNEL TAG */}
      {availableAssignees.length > 0 && (
        <div className="flex items-center gap-1.5 text-[11px] shrink-0 flex-wrap">
          <span className="font-semibold text-slate-600">Nhân sự:</span>
          {availableAssignees.map((name) => (
            <span
              key={name}
              className="bg-[#335b75] text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs"
            >
              {name}
            </span>
          ))}
        </div>
      )}

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
              {dynamicGroups.length > 0 ? (
                dynamicGroups.map((group) => {
                  const isCollapsed = !!collapsedGroups[group.id];
                  return (
                    <React.Fragment key={group.id}>
                      {/* GROUP HEADER ROW */}
                      {group.title && (
                      <tr className="bg-[#f8fafc] border-b border-slate-200">
                        <td colSpan={12} className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <IconGridDots size={14} className="text-slate-400 shrink-0 cursor-grab" />
                            <button
                              type="button"
                              onClick={() => toggleGroupCollapse(group.id)}
                              className="w-5 h-5 rounded border border-slate-300 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 shadow-2xs shrink-0 cursor-pointer"
                            >
                              <IconChevronDown
                                size={13}
                                className={`transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`}
                              />
                            </button>
                            <span className="font-bold text-slate-800 text-xs tracking-wide uppercase">
                              {group.title}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium">
                              ({group.items.length} công việc)
                            </span>
                          </div>
                        </td>
                      </tr>
                      )}

                      {/* DATA ROWS */}
                      {!isCollapsed && group.items.map((item, idx) => {
                        const isGold = item.rowTheme === 'gold';
                        const isBlue = item.rowTheme === 'blue';
                        const rowBgClass = isGold
                          ? 'bg-[#dbae57] hover:bg-[#cf9e47] text-white'
                          : isBlue
                          ? 'bg-[#5c8ba7] hover:bg-[#527d97] text-white'
                          : 'bg-white hover:bg-slate-50 text-slate-800';
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
                              onDragOver={(event) => {
                                event.preventDefault();
                                event.dataTransfer.dropEffect = 'move';
                                const rect = event.currentTarget.getBoundingClientRect();
                                const relativeY = event.clientY - rect.top;
                                const nextPosition = relativeY < rect.height / 2 ? 'before' : 'after';
                                if (dragOverId !== item.id || dropPosition !== nextPosition) {
                                  setDragOverId(item.id);
                                  setDropPosition(nextPosition);
                                }
                              }}
                              onDrop={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                const draggedId = event.dataTransfer.getData('text/plain') || draggedReportId;
                                if (draggedId && draggedId !== item.id) {
                                  moveReport(draggedId, item.id, dropPosition ?? 'before');
                                }
                                setDraggedReportId(null);
                                setDragOverId(null);
                                setDropPosition(null);
                              }}
                              className={`${rowBgClass} transition-colors text-xs ${draggedReportId === item.id ? 'opacity-40' : ''}`}
                            >
                              {/* # CỘT DRAG HANDLE CHÍNH */}
                              <td
                                draggable
                                onDragStart={(event) => {
                                  event.stopPropagation();
                                  event.dataTransfer.effectAllowed = 'move';
                                  event.dataTransfer.setData('text/plain', item.id);
                                  setDraggedReportId(item.id);
                                }}
                                onDragEnd={() => {
                                  setDraggedReportId(null);
                                  setDragOverId(null);
                                  setDropPosition(null);
                                }}
                                className={`px-2 py-2.5 text-center ${borderClass} whitespace-nowrap cursor-grab active:cursor-grabbing hover:bg-black/15 transition-colors select-none`}
                                title="Giữ và kéo biểu tượng này để đổi thứ tự công việc"
                              >
                                <div className="flex items-center justify-center gap-1.5">
                                  <IconGridDots size={14} className="opacity-80 shrink-0 cursor-grab active:cursor-grabbing" />
                                  <span className="font-semibold text-xs">{reportRows.findIndex((r) => r.id === item.id) + 1}</span>
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
                                <div className="flex items-center justify-center gap-1.5 ">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenAddModal(item)}
                                    className="hover:opacity-100 hover:scale-110 transition-transform p-0.5 cursor-pointer"
                                    title="Thêm công việc phía dưới"
                                  >
                                    <IconPlus size={13} strokeWidth={2.5} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditModal(item)}
                                    className="hover:opacity-100 hover:scale-110 transition-transform p-0.5 cursor-pointer"
                                    title="Chỉnh sửa công việc"
                                  >
                                    <IconEdit size={13} strokeWidth={2} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleOpenDeleteModal(item)}
                                    className="hover:opacity-100 hover:scale-110 transition-transform p-0.5 cursor-pointer"
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
                                <span className="font-bold  uppercase text-[11px] tracking-wide block leading-snug">
                                  {item.title}
                                </span>
                              </td>

                              {/* KL DK */}
                              <td className={`px-2 py-2.5 text-center ${borderClass} whitespace-nowrap font-semibold  text-xs`}>
                                {item.klDk ?? 1}
                              </td>

                              {/* KL DP */}
                              <td className={`px-2 py-2.5 text-center ${borderClass} whitespace-nowrap font-semibold  text-xs`}>
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
                                  <div className="flex items-center justify-between gap-1  text-xs font-medium cursor-pointer hover:opacity-90">
                                    <span className="whitespace-nowrap">{item.assignee}</span>
                                    <IconChevronDown size={12} className="opacity-70 shrink-0" />
                                  </div>
                                )}
                              </td>

                              {/* GIỜ DK */}
                              <td className={`px-2 py-2.5 text-center ${borderClass} whitespace-nowrap font-semibold  text-xs`}>
                                {item.plannedHours}
                              </td>

                              {/* GIỜ TT */}
                              <td className={`px-2 py-2.5 text-center ${borderClass} whitespace-nowrap font-bold text-xs`}>
                                <span className="text-[#f87171]">{item.actualHours || '—'}</span>
                              </td>

                              {/* BẮT ĐẦU */}
                              <td className={`px-2.5 py-2.5 ${borderClass} whitespace-nowrap`}>
                                <div className="flex items-center justify-between gap-1.5  text-[11px] font-medium">
                                  <span>{item.date}</span>
                                  <IconCalendar size={13} className="opacity-80 shrink-0" />
                                </div>
                              </td>

                              {/* KẾT THÚC */}
                              <td className={`px-2.5 py-2.5 border-b ${isGold ? 'border-white/25' : 'border-white/20'} whitespace-nowrap`}>
                                <div className="flex items-center justify-between gap-1.5  text-[11px] font-medium">
                                  <span>{item.deadline || item.date}</span>
                                  <IconCalendar size={13} className="opacity-80 shrink-0" />
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
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={12} className="text-center py-10 text-slate-400 bg-white">
                    {loadingData ? (
                      <div className="flex items-center justify-center gap-2 text-slate-500 font-medium">
                        <IconLoader2 size={16} className="animate-spin text-[#406c89]" />
                        <span>Đang tải danh sách công việc báo cáo...</span>
                      </div>
                    ) : (
                      <p className="font-semibold text-xs">Phòng ban này chưa có công việc báo cáo nào.</p>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
