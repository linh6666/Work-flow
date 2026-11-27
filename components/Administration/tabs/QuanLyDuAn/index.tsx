"use client";

import React, { useState, useEffect, useMemo } from 'react';
import TaoDuAnModal from './modal/TaoDuAn';
import SuaDuAnModal from './modal/SuaDuAn';
import QuanLyTemplateModal from './modal/QuanLyTemplate';
import XoaDuAnModal from './modal/XoaDuAn';
import ChiTietDuAn from './ChiTietDuAn';
import { getListProject, ProjectItem } from '@/api/apiGetlistProject';
import { getAllDeptProjectForms, DeptProjectFormItem } from '@/api/apiGetDeptProjectForms';
import { createProject } from '@/api/apiCreatProject';
import { updateProject } from '@/api/apiUpdateProject';
import { deleteProject } from '@/api/apiDeleteProject';
import { NotificationExtension } from '@/common/extension/NotificationExtension';
import {
  IconPlus,
  IconSearch,
  IconTrash,
  IconEdit,
  IconChevronRight,
  IconClipboardList,
  IconArrowRight,
  IconFlag,
  IconBooks,
  IconCopy,
  IconX,
  IconLoader2,
  IconRefresh,
} from '@tabler/icons-react';

export interface MilestoneItem {
  id: string;
  label: string;
  dateText: string;
  positionPercent: number; // e.g. 75 (%)
  color: 'blue' | 'red';
}

export interface DuAnItem {
  id: string;
  maDuAn: string;
  tenDuAn: string;
  moTa: string;
  ngayBatDau: string;
  ngayKetThuc: string;
  tienDo: number; // 0 - 100
  indexText: string; // e.g. "—", "6", "5"
  trangThai: 'Đang thực hiện' | 'Hoàn thành' | 'Tạm dừng' | 'Chưa bắt đầu';
  tienDoText: 'Chưa đánh giá' | 'Đúng tiến độ' | 'Trễ tiến độ' | 'Vượt tiến độ' | 'Chậm tiến độ, lỗi khách quan';
  milestones?: MilestoneItem[];
  diaDiem?: string;
  baselineBatDau?: string;
  baselineKetThuc?: string;
  ycsxId?: string;
  templateId?: string;
  capDoDuAn?: string;
  tyLe?: string;
  kichThuoc?: string;
  khachHang?: string;
  diaDiemLapDat?: string;
  duKienNtLan1?: string;
  duKienNtCuoi?: string;
  duKienVanChuyen?: string;
  duKienLapDat?: string;
  soNvLapDat?: string;
  khoiLuongNtLan1?: string;
}

// Department data for "Chờ khởi tạo theo Phòng ban"
interface DeptItem {
  id: string;
  name: string;
  count: number;
}

const DEPARTMENTS: DeptItem[] = [
  { id: 'bgd', name: 'Ban Giám đốc', count: 1 },
  { id: 'kvp', name: 'Khối Văn phòng', count: 7 },
  { id: 'pkt', name: 'Phòng Khai triển', count: 1 },
  { id: 'pcat', name: 'Phòng Cắt', count: 5 },
  { id: 'pghep', name: 'Phòng Ghép', count: 1 },
  { id: 'pms', name: 'Phòng Mộc Sơn', count: 2 },
  { id: 'pdien', name: 'Phòng Điện', count: 1 },
  { id: 'pcq', name: 'Phòng Cảnh Quan', count: 0 },
  { id: 'pcntkiet', name: 'Phòng Công nghệ và Thiết kế', count: 7 },
];

type SortKeyType = 'maDuAn' | 'tenDuAn' | 'tienDo' | 'indexText' | 'trangThai' | 'khachHang' | 'ngayBatDau' | 'ngayKetThuc' | 'tienDoText' | null;

export default function QuanLyDuAn() {
  const [projects, setProjects] = useState<DuAnItem[]>([]);
  const [deptForms, setDeptForms] = useState<DeptProjectFormItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<DuAnItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKeyType>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  // Helper chuyển đổi từ dữ liệu API ProjectItem sang DuAnItem hiển thị giao diện
  const mapApiProjectToDuAnItem = (item: ProjectItem, index: number): DuAnItem => {
    const rawStatus = (item.status || '').trim();
    let trangThai: DuAnItem['trangThai'] = 'Chưa bắt đầu';
    if (rawStatus === 'Đang thực hiện') trangThai = 'Đang thực hiện';
    else if (rawStatus === 'Hoàn thành') trangThai = 'Hoàn thành';
    else if (rawStatus === 'Tạm dừng') trangThai = 'Tạm dừng';
    else if (rawStatus === 'Chưa bắt đầu') trangThai = 'Chưa bắt đầu';
    else if (rawStatus) trangThai = 'Đang thực hiện';

    const rawTienDoText = (item.director_evaluation || '').trim();
    let tienDoText: DuAnItem['tienDoText'] = 'Chưa đánh giá';
    if (rawTienDoText === 'Đúng tiến độ') tienDoText = 'Đúng tiến độ';
    else if (rawTienDoText === 'Trễ tiến độ') tienDoText = 'Trễ tiến độ';
    else if (rawTienDoText === 'Vượt tiến độ') tienDoText = 'Vượt tiến độ';
    else if (rawTienDoText === 'Chậm tiến độ, lỗi khách quan') tienDoText = 'Chậm tiến độ, lỗi khách quan';

    const numProgress = typeof item.progress === 'number'
      ? item.progress
      : typeof item.progress === 'string'
      ? parseFloat(item.progress) || 0
      : 0;

    const projectId = item.id || item._id || `da-api-${index}`;
    const ma = item.code || item.maDuAn || `DA-${projectId.slice(0, 6)}`;
    const ten = item.name || item.project_name || item.tenDuAn || 'Dự án chưa đặt tên';

    // Tính toán cờ mốc nghiệm thu (milestones) trên thanh tiến độ
    const milestones: MilestoneItem[] = [];

    // Helper format ngày hiển thị dạng "DD-MM"
    const formatMilestoneDate = (dStr: string) => {
      if (!dStr) return '';
      const parts = dStr.split('-');
      if (parts.length === 3) return `${parts[2]}-${parts[1]}`;
      return dStr;
    };

    // Helper tính % vị trí trên trục thời gian của dự án từ start_date đến end_date
    const calcPositionPercent = (
      targetDate: string,
      defaultPercent: number
    ): number => {
      if (!targetDate || !item.start_date || !item.end_date) return defaultPercent;
      const start = new Date(item.start_date).getTime();
      const end = new Date(item.end_date).getTime();
      const target = new Date(targetDate).getTime();
      if (isNaN(start) || isNaN(end) || isNaN(target) || end <= start) {
        return defaultPercent;
      }
      const pct = Math.round(((target - start) / (end - start)) * 100);
      return Math.min(98, Math.max(10, pct));
    };

    if (item.acceptance_date_1) {
      milestones.push({
        id: `ms-1-${projectId}`,
        label: 'NT lần 1 (80%)',
        dateText: formatMilestoneDate(item.acceptance_date_1),
        positionPercent: calcPositionPercent(item.acceptance_date_1, 80),
        color: 'blue',
      });
    }

    if (item.acceptance_date_final) {
      milestones.push({
        id: `ms-2-${projectId}`,
        label: 'NT cuối (100%)',
        dateText: formatMilestoneDate(item.acceptance_date_final),
        positionPercent: calcPositionPercent(item.acceptance_date_final, 95),
        color: 'red',
      });
    }

    return {
      id: projectId,
      maDuAn: ma,
      tenDuAn: ten,
      moTa: item.description || '',
      ngayBatDau: item.start_date || '',
      ngayKetThuc: item.end_date || '',
      tienDo: Math.min(100, Math.max(0, Math.round(numProgress))),
      indexText: item.priority ? String(item.priority) : `${index + 1}`,
      trangThai,
      tienDoText,
      milestones: milestones.length > 0 ? milestones : undefined,
      khachHang: item.customer_name || '',
      diaDiem: item.install_location || '',
      baselineBatDau: item.baseline_start || '',
      baselineKetThuc: item.baseline_end || '',
      capDoDuAn: item.project_level || 'V',
      tyLe: item.scale || '',
      kichThuoc: item.size || '',
      diaDiemLapDat: item.install_location || '',
      duKienNtLan1: item.acceptance_date_1 || '',
      duKienNtCuoi: item.acceptance_date_final || '',
      duKienVanChuyen: item.transport_date || '',
      duKienLapDat: item.install_date || '',
      soNvLapDat: item.install_staff_count || '',
      khoiLuongNtLan1: item.acceptance_milestone_1 || '',
    };
  };

  // Hàm load danh sách dự án từ API getListProject
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const [data, formsData] = await Promise.all([
        getListProject({ limit: 200 }),
        getAllDeptProjectForms(500).catch(() => []),
      ]);
      setDeptForms(formsData);
      let list: ProjectItem[] = [];
      if (Array.isArray(data)) {
        list = data;
      } else if (data && Array.isArray((data as any).data)) {
        list = (data as any).data;
      } else if (data && Array.isArray((data as any).items)) {
        list = (data as any).items;
      }

      if (list && list.length > 0) {
        const mapped = list.map((item, idx) => mapApiProjectToDuAnItem(item, idx));
        setProjects(mapped);
        NotificationExtension.Success(`Đã tải ${mapped.length} dự án!`);
      } else {
        setProjects([]);
        NotificationExtension.Fails('Không có dữ liệu dự án từ server!');
      }
    } catch (err) {
      console.error('Không thể tải danh sách dự án từ API:', err);
      setProjects([]);
      NotificationExtension.Fails('Không thể tải danh sách dự án từ API!');
    } finally {
      setLoading(false);
    }
  };

  // Gọi API lấy danh sách dự án khi load trang
  useEffect(() => {
    fetchProjects();
  }, []);

  // URL là nguồn trạng thái chính; quay lại tab không tự khôi phục chi tiết cũ.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkUrlParam = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const paramId = urlParams.get('id');
      if (paramId && projects.length > 0) {
        const found = projects.find(p => p.id === paramId || p.maDuAn === paramId);
        if (found) {
          setSelectedProject(found);
          return;
        }
      }
      setSelectedProject(null);
    };

    checkUrlParam();

    const handleReset = () => {
      setSelectedProject(null);
      const url = new URL(window.location.href);
      url.searchParams.delete('id');
      url.searchParams.delete('dept');
      window.history.pushState({}, '', url.toString());
    };

    window.addEventListener('popstate', checkUrlParam);
    window.addEventListener('reset-quan-ly-du-an', handleReset);
    return () => {
      window.removeEventListener('popstate', checkUrlParam);
      window.removeEventListener('reset-quan-ly-du-an', handleReset);
    };
  }, [projects]);

  const handleSelectProject = (item: DuAnItem) => {
    setSelectedProject(item);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedProjectId', item.id);
      const url = new URL(window.location.href);
      url.searchParams.set('id', item.id);
      window.history.pushState({}, '', url.toString());
    }
  };

  const handleBack = () => {
    setSelectedProject(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('selectedProjectId');
      localStorage.removeItem('selectedDepartmentName');
      const url = new URL(window.location.href);
      url.searchParams.delete('id');
      url.searchParams.delete('dept');
      window.history.pushState({}, '', url.toString());
    }
  };

  // Modal creation states
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<DuAnItem | null>(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingProject, setDeletingProject] = useState<DuAnItem | null>(null);

  const handleOpenEditModal = (item: DuAnItem) => {
    setEditingProject(item);
    setIsEditModalOpen(true);
  };

  const handleUpdateProject = async (updatedData: DuAnItem) => {
    try {
      // Gọi API cập nhật lên backend
      await updateProject(updatedData.id, {
        code: updatedData.maDuAn,
        name: updatedData.tenDuAn,
        description: updatedData.moTa,
        start_date: updatedData.ngayBatDau,
        end_date: updatedData.ngayKetThuc,
        baseline_start: updatedData.baselineBatDau,
        baseline_end: updatedData.baselineKetThuc,
        progress: updatedData.tienDo,
        status: updatedData.trangThai,
        director_evaluation: updatedData.tienDoText,
        customer_name: updatedData.khachHang,
        scale: updatedData.tyLe,
        size: updatedData.kichThuoc,
        project_level: updatedData.capDoDuAn,
        install_location: updatedData.diaDiemLapDat || updatedData.diaDiem,
        acceptance_date_1: updatedData.duKienNtLan1,
        acceptance_date_final: updatedData.duKienNtCuoi,
        transport_date: updatedData.duKienVanChuyen,
        install_date: updatedData.duKienLapDat,
        install_staff_count: updatedData.soNvLapDat,
        acceptance_milestone_1: updatedData.khoiLuongNtLan1,
        priority: updatedData.indexText && updatedData.indexText !== '—' ? Number(updatedData.indexText) || 0 : 0,
      });

      setProjects(prev =>
        prev.map(p => (p.id === updatedData.id ? updatedData : p))
      );
      NotificationExtension.Success(`Cập nhật dự án "${updatedData.tenDuAn}" thành công!`);
    } catch (err: any) {
      console.error('Lỗi khi gọi API cập nhật dự án:', err);
      // Fallback cập nhật state local nếu backend gặp sự cố
      setProjects(prev =>
        prev.map(p => (p.id === updatedData.id ? updatedData : p))
      );
      NotificationExtension.Warn(
        err?.message || `Cập nhật dự án "${updatedData.tenDuAn}" (đã lưu tạm thời)!`
      );
    }
  };

  const handleOpenDeleteModal = (item: DuAnItem) => {
    setDeletingProject(item);
    setIsDeleteModalOpen(true);
  };

  // --- Handlers ---
  const handleCreateProject = async (data: {
    maDuAn: string;
    tenDuAn: string;
    moTa: string;
    ngayBatDau: string;
    ngayKetThuc: string;
    tienDo: number;
    indexText: string;
    trangThai: 'Đang thực hiện' | 'Hoàn thành' | 'Tạm dừng' | 'Chưa bắt đầu';
    tienDoText: 'Chưa đánh giá' | 'Đúng tiến độ' | 'Trễ tiến độ' | 'Vượt tiến độ' | 'Chậm tiến độ, lỗi khách quan';
    diaDiem?: string;
    baselineBatDau?: string;
    baselineKetThuc?: string;
    ycsxId?: string;
    templateId?: string;
    khachHang?: string;
    tyLe?: string;
    kichThuoc?: string;
    capDoDuAn?: string;
    diaDiemLapDat?: string;
    duKienNtLan1?: string;
    duKienNtCuoi?: string;
    duKienVanChuyen?: string;
    duKienLapDat?: string;
    soNvLapDat?: string;
    khoiLuongNtLan1?: string;
  }) => {
    setIsSubmitting(true);
    try {
      // Gọi API createProject để lưu vào backend
      const res = await createProject({
        code: data.maDuAn,
        name: data.tenDuAn,
        description: data.moTa,
        start_date: data.ngayBatDau,
        end_date: data.ngayKetThuc,
        baseline_start: data.baselineBatDau,
        baseline_end: data.baselineKetThuc,
        progress: data.tienDo,
        status: data.trangThai,
        director_evaluation: data.tienDoText,
        customer_name: data.khachHang,
        scale: data.tyLe,
        size: data.kichThuoc,
        project_level: data.capDoDuAn,
        install_location: data.diaDiemLapDat || data.diaDiem,
        acceptance_date_1: data.duKienNtLan1,
        acceptance_date_final: data.duKienNtCuoi,
        transport_date: data.duKienVanChuyen,
        install_date: data.duKienLapDat,
        install_staff_count: data.soNvLapDat,
        acceptance_milestone_1: data.khoiLuongNtLan1,
        priority: data.indexText && data.indexText !== '—' ? Number(data.indexText) || 0 : 0,
      });

      // Tạo item hiển thị lên state
      const createdId = res?.id || res?._id || `da-${Date.now()}`;
      const newProj: DuAnItem = {
        id: createdId,
        ...data,
        milestones: data.tienDoText === 'Đúng tiến độ' ? [
          { id: 'ms-1', label: 'NT lần 1', dateText: '15-08', positionPercent: 70, color: 'blue' },
          { id: 'ms-2', label: 'NT cuối', dateText: '30-08', positionPercent: 90, color: 'red' }
        ] : undefined
      };

      setProjects(prev => [newProj, ...prev]);
      setIsProjectModalOpen(false);
      NotificationExtension.Success(`Tạo dự án "${data.tenDuAn}" thành công!`);
    } catch (err: any) {
      console.error('Lỗi khi gọi API tạo dự án:', err);
      // Fallback lưu local nếu API có lỗi kết nối
      const newProj: DuAnItem = {
        id: `da-${Date.now()}`,
        ...data,
        milestones: data.tienDoText === 'Đúng tiến độ' ? [
          { id: 'ms-1', label: 'NT lần 1', dateText: '15-08', positionPercent: 70, color: 'blue' },
          { id: 'ms-2', label: 'NT cuối', dateText: '30-08', positionPercent: 90, color: 'red' }
        ] : undefined
      };
      setProjects(prev => [newProj, ...prev]);
      setIsProjectModalOpen(false);
      NotificationExtension.Warn(
        err?.message || 'Tạo dự án thành công (đã lưu bộ nhớ tạm)!'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      setIsDeleteModalOpen(false);
      NotificationExtension.Success('Đã xóa dự án thành công!');
    } catch (err: any) {
      console.error('Lỗi khi xóa dự án trên API:', err);
      NotificationExtension.Fails(err?.message || 'Xóa dự án thất bại!');
      // KHÔNG xóa dự án khỏi state nếu API báo lỗi
    }
  };

  // --- Filtering & Sorting ---
  const filtered = projects.filter(item => {
    const q = searchQuery.toLowerCase();
    return (
      item.maDuAn.toLowerCase().includes(q) ||
      item.tenDuAn.toLowerCase().includes(q)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    if (sortKey === 'tienDo') {
      return sortDir === 'asc' ? a.tienDo - b.tienDo : b.tienDo - a.tienDo;
    }
    const va = (a[sortKey] ?? '').toString().toLowerCase();
    const vb = (b[sortKey] ?? '').toString().toLowerCase();
    return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  const handleSort = (key: NonNullable<SortKeyType>) => {
    if (sortKey === key) {
      if (sortDir === 'asc') {
        setSortDir('desc');
      } else {
        setSortKey(null);
      }
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  // --- Counters ---
  const countTotal = projects.length;
  const computedDepartments = useMemo(() => {
    return DEPARTMENTS.map((dept) => {
      if (projects.length === 0) return { ...dept, count: 0 };
      const missingCount = projects.filter(
        (p) =>
          !deptForms.some(
            (f) =>
              f.project_id === p.id &&
              (f.department || '').trim().toLowerCase() === dept.name.trim().toLowerCase()
          )
      ).length;
      return { ...dept, count: missingCount };
    });
  }, [projects, deptForms]);

  const countChoKhoiTao = computedDepartments.reduce((sum, d) => sum + d.count, 0);
  const countDangThucHien = projects.filter(p => p.trangThai === 'Đang thực hiện').length;
  const countHoanThanh = projects.filter(p => p.trangThai === 'Hoàn thành').length;
  const countTamDung = projects.filter(p => p.trangThai === 'Tạm dừng').length;

  // Format Helper for Date
  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parseInt(parts[2])}/${parseInt(parts[1])}/${parts[0]}`;
    }
    return dateString;
  };

  // Helper for progress bar color logic
  const getProgressColorClass = (tienDo: number) => {
    if (tienDo <= 30) return 'bg-[#FF0000]';
    if (tienDo <= 60) return 'bg-[#22863a]';
    if (tienDo <= 80) return 'bg-[#ba8e3a]';
    return 'bg-[#406c89]';
  };

  const sortButtons: { key: NonNullable<SortKeyType>; label: string }[] = [
    { key: 'maDuAn', label: 'Mã dự án' },
    { key: 'tenDuAn', label: 'Tên dự án' },
    { key: 'tienDo', label: 'KL hoàn thành' },
    { key: 'indexText', label: 'Ưu tiên' },
    { key: 'trangThai', label: 'Trạng thái' },
    { key: 'khachHang', label: 'Khách hàng' },
    { key: 'ngayBatDau', label: 'Ngày bắt đầu' },
    { key: 'ngayKetThuc', label: 'Ngày kết thúc' },
    { key: 'tienDoText', label: 'Đánh giá' },
  ];

  if (selectedProject) {
    return (
      <ChiTietDuAn
        project={selectedProject}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden text-slate-700 w-full bg-slate-50">

      {/* ══ ZONE 1: FIXED TOP HEADER ══ */}
      <div className="shrink-0 bg-slate-50 border-b border-slate-200/80 px-3 sm:px-6 pt-3 sm:pt-4 pb-3 z-30 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-tight">Quản lý Dự án</h2>
          <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] w-full sm:w-auto">
            <button
              type="button"
              onClick={fetchProjects}
              disabled={loading}
              className="flex items-center justify-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 text-xs font-semibold rounded-lg shadow-2xs border border-slate-200 transition-all cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-50"
              title="Làm mới danh sách từ server"
            >
              <IconRefresh size={14} className={loading ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Làm mới</span>
            </button>
            <button
              type="button"
              onClick={() => setIsTemplateModalOpen(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-2.5 sm:py-1.5 bg-[#ba8e3a] hover:bg-[#a87d2f] active:scale-95 text-white text-xs font-semibold rounded-lg shadow-sm border border-[#a3792c] transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <IconBooks size={14} />
              <span>Quản lý Template DA</span>
            </button>
            <button
              type="button"
              onClick={() => setIsProjectModalOpen(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-2.5 sm:py-1.5 bg-[#406c89] hover:bg-[#345972] active:scale-95 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <IconPlus size={14} />
              <span>Tạo Dự án</span>
            </button>
          </div>
        </div>
      </div>

      {/* ══ ZONE 2: SCROLLABLE BODY ══ */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 pt-3 sm:pt-4 pb-6 space-y-3 sm:space-y-4 overscroll-y-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

        {/* 1. Workflow Bar */}
        <div className="bg-white border border-slate-200/80 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-1.5 sm:gap-2 overflow-x-auto shadow-xs touch-pan-x overscroll-x-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {[
            { label: 'Tạo YCSX', color: 'text-purple-700 bg-purple-50 border-purple-200' },
            { label: 'PGD đã duyệt YCSX', color: 'text-orange-600 bg-orange-50 border-orange-200' },
            { label: 'Khởi tạo Dự án từ YCSX', color: 'text-blue-700 bg-blue-50 border-blue-200' },
          ].map((step, i) => (
            <React.Fragment key={i}>
              <span className={`${step.color} border font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs whitespace-nowrap shrink-0`}>
                {step.label}
              </span>
              <IconArrowRight size={13} className="text-slate-300 shrink-0" />
            </React.Fragment>
          ))}
          <span className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-300 text-indigo-700 font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs whitespace-nowrap shrink-0">
            Đang thực hiện
            <span className="bg-[#406c89] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{countDangThucHien}</span>
          </span>
          <IconArrowRight size={13} className="text-slate-300 shrink-0" />
          <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 text-emerald-700 font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs whitespace-nowrap shrink-0">
            Hoàn thành
            <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{countHoanThanh}</span>
          </span>
        </div>

        {/* 2. Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 sm:gap-2">
          {[
            { label: 'Tổng dự án', value: countTotal, color: 'text-[#406c89]' },
            { label: 'Chờ khởi tạo', value: countChoKhoiTao, color: 'text-orange-500' },
            { label: 'Đang thực hiện', value: countDangThucHien, color: 'text-orange-500' },
            { label: 'Hoàn thành', value: countHoanThanh, color: 'text-emerald-600' },
            { label: 'Tạm dừng', value: countTamDung, color: 'text-orange-400' },
          ].map((stat, idx) => (
            <div
              key={stat.label}
              className={`bg-white border border-slate-200/80 rounded-lg sm:rounded-xl p-2 sm:px-3 sm:py-2.5 shadow-xs ${
                idx === 4 ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">{stat.label}</p>
              <p className={`text-lg sm:text-xl font-black ${stat.color} leading-tight mt-0.5`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* 3. Chờ khởi tạo theo Phòng ban */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-3 sm:p-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-2 sm:mb-2.5">
            <p className="text-xs font-bold text-slate-700">Chờ khởi tạo theo Phòng ban</p>
            <p className="text-[10px] sm:text-[11px] text-slate-400">
              Tổng: <span className="font-bold text-orange-500">{countChoKhoiTao}</span> hồ sơ chưa tạo
            </p>
          </div>
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {computedDepartments.map(dept => {
              const isSelected = selectedDept === dept.id;
              const isZero = dept.count === 0;
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => setSelectedDept(isSelected ? null : dept.id)}
                  className={`flex flex-col items-start px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg border text-left transition-all cursor-pointer active:scale-95 ${
                    isSelected ? 'bg-emerald-50 border-emerald-400 ring-1 ring-emerald-400'
                    : isZero ? 'bg-green-50 border-green-200'
                    : 'bg-rose-50 border-rose-200 hover:bg-orange-50 hover:border-orange-300'
                  }`}
                >
                  <span className="text-[9px] sm:text-[10px] font-medium leading-tight text-slate-600">{dept.name}</span>
                  <span className={`text-sm sm:text-base font-extrabold ${isSelected ? 'text-emerald-600' : isZero ? 'text-emerald-500' : 'text-orange-500'}`}>
                    {dept.count}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-[9px] sm:text-[10px] text-slate-400 mt-2">
            * Bấm vào ô phòng của bạn (nổi bật màu cam) để xem &amp; khởi tạo.
          </p>
        </div>

        {/* 4. Search & Sort (In original position, sticky on scroll gaplessly) */}
        <div className="sticky top-0 z-20 bg-slate-50 -mt-3 sm:-mt-4 pt-2 pb-2.5 space-y-2 border-b border-slate-200/80 -mx-3 sm:-mx-6 px-3 sm:px-6 shadow-xs">
          <div className="bg-white border border-slate-200/80 rounded-xl px-3 sm:px-3.5 py-1.5 sm:py-2 flex items-center gap-2 shadow-sm">
            <IconSearch size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên hoặc mã dự án..."
              className="w-full bg-transparent text-xs sm:text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer transition-colors shrink-0"
                title="Xóa tìm kiếm"
              >
                <IconX size={15} />
              </button>
            )}
          </div>
          <div className="overflow-x-auto [scrollbar-width:none] touch-pan-x overscroll-x-contain [-webkit-overflow-scrolling:touch]">
            <div className="flex items-center gap-1 sm:gap-1.5 text-xs select-none min-w-max pb-0.5">
              <span className="text-slate-400 font-medium shrink-0 text-[11px] sm:text-xs">Sắp xếp:</span>
              {sortButtons.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleSort(key)}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-medium whitespace-nowrap active:scale-95 text-[11px] sm:text-xs ${
                    sortKey === key
                      ? 'bg-[#406c89] text-white border-transparent shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {label}{sortKey === key && (sortDir === 'asc' ? ' ↑' : ' ↓')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Project Cards */}
        <div className="space-y-3 pb-4">
          {loading && projects.length === 0 ? (
            <div className="bg-white border border-slate-200/80 rounded-xl sm:rounded-2xl py-14 sm:py-20 flex flex-col items-center justify-center text-center shadow-xs">
              <IconLoader2 size={36} className="text-[#406c89] animate-spin mb-2" />
              <p className="text-xs text-slate-500 font-medium">Đang tải danh sách dự án...</p>
            </div>
          ) : sorted.length === 0 ? (
            <div className="bg-white border border-slate-200/80 rounded-xl sm:rounded-2xl py-14 sm:py-20 flex flex-col items-center justify-center text-center shadow-xs">
              <IconClipboardList size={40} className="sm:w-12 sm:h-12 text-slate-300 stroke-[1.25] mb-2" />
              <p className="text-xs text-slate-400 font-medium">Chưa có dự án nào.</p>
            </div>
          ) : (
            sorted.map(item => {
              const hasGreenBorder = item.tienDoText === 'Đúng tiến độ' || item.tienDoText === 'Vượt tiến độ';
              const hasRedBorder = item.tienDoText === 'Chậm tiến độ, lỗi khách quan' || item.tienDoText === 'Trễ tiến độ';
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 shadow-xs flex flex-col gap-2.5 sm:gap-3 transition-all border ${
                    hasGreenBorder ? 'border-emerald-500/60'
                    : hasRedBorder ? 'border-rose-300/60'
                    : 'border-slate-200/80'
                  }`}
                >
                  {/* Card header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-[#406c89]/10 text-[#406c89] border border-[#406c89]/20">
                        {item.maDuAn}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#fffbeb] text-[#d97706] border border-[#fde68a]">
                        {item.trangThai}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        item.tienDoText === 'Vượt tiến độ' ? 'bg-[#2fa047] text-white'
                        : hasGreenBorder ? 'bg-[#22863a] text-white'
                        : hasRedBorder ? 'bg-rose-50 text-rose-600 border border-rose-200/50'
                        : 'bg-slate-50 text-slate-400 border border-slate-200/50'
                      }`}>
                        {item.tienDoText}
                      </span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 active:scale-95 transition-colors cursor-pointer"
                          title="Chỉnh sửa dự án"
                        >
                          <IconEdit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const copied: DuAnItem = {
                              ...item,
                              id: `da-${Date.now()}`,
                              maDuAn: `${item.maDuAn}-SAO`,
                              tenDuAn: `${item.tenDuAn} (Bản sao)`,
                            };
                            setProjects(prev => [copied, ...prev]);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 active:scale-95 transition-colors cursor-pointer"
                          title="Sao chép dự án"
                        >
                          <IconCopy size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenDeleteModal(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 active:scale-95 transition-colors cursor-pointer"
                          title="Xóa dự án"
                        >
                          <IconTrash size={16} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSelectProject(item)}
                        className="flex items-center gap-1 bg-[#406c89] hover:bg-[#345972] active:scale-95 text-white px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer shadow-xs transition-all ml-1"
                      >
                        Chi tiết
                        <IconChevronRight size={12} stroke={2.5} />
                      </button>
                    </div>
                  </div>

                  {/* Title row */}
                  <div className="flex items-start sm:items-center gap-2 sm:gap-2.5">
                    <div className="bg-slate-100 border border-slate-200 text-slate-500 font-semibold px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] min-w-[24px] sm:min-w-[28px] text-center select-none shrink-0 mt-0.5 sm:mt-0">
                      {item.indexText}
                    </div>
                    <h3
                      onClick={() => handleSelectProject(item)}
                      className="text-sm font-extrabold text-[#406c89] hover:underline cursor-pointer tracking-tight leading-snug break-words"
                    >
                      {item.tenDuAn}
                    </h3>
                  </div>

                  {/* Description */}
                  {item.moTa && (
                    <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">{item.moTa}</p>
                  )}

                  {/* Dates & Customer */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 text-xs text-slate-600 font-medium">
                    <div className="flex flex-wrap gap-2.5 sm:gap-4">
                      <span className="text-[11px] sm:text-xs">Bắt đầu: <strong className="text-slate-700 font-semibold">{formatDateDisplay(item.ngayBatDau)}</strong></span>
                      <span className="text-[11px] sm:text-xs">Kết thúc: <strong className="text-slate-700 font-semibold">{formatDateDisplay(item.ngayKetThuc)}</strong></span>
                    </div>
                    {item.khachHang && (
                      <span className="text-[11px] sm:text-xs text-slate-500">Khách hàng: <strong className="text-slate-700 font-semibold">{item.khachHang}</strong></span>
                    )}
                  </div>

                  {/* Progress bar + Milestones Displayed Directly ABOVE Tick Line */}
                  <div className="space-y-1 pt-1">
                    {/* Milestone Flags Positioned Directly ABOVE Ticks */}
                    {item.milestones && item.milestones.length > 0 && (
                      <div className="relative h-4 w-full pr-11">
                        {item.milestones.map(ms => (
                          <div
                            key={ms.id}
                            className={`absolute bottom-0 -translate-x-1/2 flex items-center gap-0.5 text-[10px] sm:text-[11px] font-bold whitespace-nowrap ${
                              ms.color === 'blue' ? 'text-blue-600' : 'text-rose-500'
                            }`}
                            style={{ left: `${ms.positionPercent}%` }}
                          >
                            <IconFlag size={11} className="shrink-0" />
                            <span>{ms.dateText}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Progress Bar & Tick Lines */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="relative flex-1 bg-slate-100 rounded-full h-2">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${getProgressColorClass(item.tienDo)}`}
                          style={{ width: `${item.tienDo}%` }}
                        />
                        {item.milestones?.map(ms => (
                          <div
                            key={ms.id}
                            className={`absolute top-0 bottom-0 w-0.5 z-10 -translate-x-1/2 ${
                              ms.color === 'blue' ? 'bg-blue-600' : 'bg-red-500'
                            }`}
                            style={{ left: `${ms.positionPercent}%` }}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-400 font-bold w-8 text-right select-none">{item.tienDo}%</span>
                    </div>

                    {/* Milestone Bottom Legend */}
                    {item.milestones && item.milestones.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-[10px] sm:text-[11px] pt-1">
                        {item.milestones.map(ms => (
                          <div key={ms.id} className="flex items-center gap-1 font-bold">
                            <span className={`w-0.5 h-3 inline-block rounded-full ${ms.color === 'blue' ? 'bg-blue-600' : 'bg-red-500'}`} />
                            <span className={ms.color === 'blue' ? 'text-blue-700' : 'text-rose-600'}>{ms.label}</span>
                            <span className="text-slate-400 font-mono">({ms.dateText})</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* MODALS */}
      <TaoDuAnModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSubmit={handleCreateProject}
      />

      <SuaDuAnModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingProject(null);
        }}
        project={editingProject}
        onSubmit={handleUpdateProject}
      />

      <QuanLyTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
      />

      <XoaDuAnModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        project={deletingProject}
        onConfirmDelete={handleDeleteProject}
      />
    </div>
  );
}


