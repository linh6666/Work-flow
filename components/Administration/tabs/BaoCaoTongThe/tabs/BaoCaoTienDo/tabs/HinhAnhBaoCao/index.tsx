"use client";

import React, { useState, useMemo } from 'react';
import {
  IconPhoto,
  IconCalendar,
  IconFolderDown,
  IconEye,
  IconChevronRight,
  IconChevronDown,
  IconX,
  IconDownload,
} from '@tabler/icons-react';
import { ProjectItem } from '../../types';

interface DepartmentPhotoReport {
  id: string;
  name: string;
  count: number;
  photos?: Array<{
    id: string;
    title: string;
    date: string;
    author: string;
    bg: string;
  }>;
}

interface ProjectPhotoData {
  id: string;
  name: string;
  totalPhotos: number;
  departments: DepartmentPhotoReport[];
}

interface HinhAnhBaoCaoProps {
  projects: ProjectItem[];
  searchQuery?: string;
  evaluationFilter?: string;
}

// Danh sách dữ liệu dự án & ảnh báo cáo chuẩn theo thiết kế thực tế
const PROJECT_PHOTO_LIST: ProjectPhotoData[] = [
  {
    id: 'proj-1',
    name: '03 MÔ HÌNH ĐẢO CHÂU ÂU THUỘC DỰ ÁN ECO CENTRAL PARK VINH',
    totalPhotos: 62,
    departments: [
      {
        id: 'd1',
        name: 'Khối Văn phòng',
        count: 3,
        photos: [
          { id: 'p1-1', title: 'Họp giao ban tiến độ tuần đảo Châu Âu', date: '06/11/2026', author: 'Trần Diễm My', bg: 'from-blue-600/85 to-indigo-800/85' },
          { id: 'p1-2', title: 'Biên bản thống nhất màu sơn thực tế', date: '05/11/2026', author: 'Lê Hoàng Anh', bg: 'from-slate-600/85 to-zinc-800/85' },
          { id: 'p1-3', title: 'Kiểm tra tài liệu kỹ thuật bản vẽ kiến trúc', date: '03/11/2026', author: 'Trần Diễm My', bg: 'from-cyan-600/85 to-blue-800/85' },
        ],
      },
      {
        id: 'd2',
        name: 'Phòng Khai triển',
        count: 3,
        photos: [
          { id: 'p2-1', title: 'Xuất file cắt CNC chi tiết đảo Châu Âu', date: '06/11/2026', author: 'Trần Văn Mạnh', bg: 'from-teal-600/85 to-emerald-800/85' },
          { id: 'p2-2', title: 'Bản vẽ chi tiết phân khu biệt thự ven sông', date: '04/11/2026', author: 'Vũ Minh Tuấn', bg: 'from-emerald-600/85 to-teal-800/85' },
          { id: 'p2-3', title: 'Bóc tách khối lượng vật tư Acrylic', date: '02/11/2026', author: 'Trần Văn Mạnh', bg: 'from-sky-600/85 to-indigo-800/85' },
        ],
      },
      {
        id: 'd3',
        name: 'Phòng Ghép',
        count: 25,
        photos: [
          { id: 'p3-1', title: 'Lắp ráp khung mô hình phân khu 1', date: '06/11/2026', author: 'Phạm Đức Huy', bg: 'from-amber-600/85 to-orange-800/85' },
          { id: 'p3-2', title: 'Ghép khối nhà liền kề mẫu A2', date: '05/11/2026', author: 'Nguyễn Văn Nam', bg: 'from-rose-600/85 to-pink-800/85' },
          { id: 'p3-3', title: 'Kiểm tra độ khít khớp nối các module', date: '05/11/2026', author: 'Phạm Đức Huy', bg: 'from-violet-600/85 to-purple-800/85' },
          { id: 'p3-4', title: 'Dán chỉ tường và lan can ban công', date: '04/11/2026', author: 'Lê Văn Toàn', bg: 'from-indigo-600/85 to-blue-800/85' },
        ],
      },
      {
        id: 'd4',
        name: 'Phòng Cảnh Quan',
        count: 31,
        photos: [
          { id: 'p4-1', title: 'Trồng cây công viên trung tâm đảo Châu Âu', date: '06/11/2026', author: 'Đỗ Thùy Linh', bg: 'from-emerald-600/85 to-green-800/85' },
          { id: 'p4-2', title: 'Phun sơn tạo màu mặt nước kênh đào', date: '05/11/2026', author: 'Hoàng Anh Tuấn', bg: 'from-cyan-600/85 to-teal-800/85' },
          { id: 'p4-3', title: 'Lắp đặt hệ thống đèn led đường dạo bộ', date: '04/11/2026', author: 'Đỗ Thùy Linh', bg: 'from-amber-600/85 to-yellow-800/85' },
          { id: 'p4-4', title: 'Bố trí tiểu cảnh bến du thuyền cao cấp', date: '03/11/2026', author: 'Vũ Minh Tuấn', bg: 'from-blue-600/85 to-indigo-800/85' },
        ],
      },
    ],
  },
  {
    id: 'proj-2',
    name: 'BÁO CÁO NGOÀI DỰ ÁN',
    totalPhotos: 131,
    departments: [
      { id: 'd2-1', name: 'Khối Văn phòng', count: 12 },
      { id: 'd2-2', name: 'Phòng Khai triển', count: 28 },
      { id: 'd2-3', name: 'Phòng Ghép', count: 45 },
      { id: 'd2-4', name: 'Phòng Cảnh Quan', count: 46 },
    ],
  },
  {
    id: 'proj-3',
    name: 'CHỈNH SỬA 02 MÔ HÌNH QUY HOẠCH ECOPARK VINH TỶ LỆ 1-500 & 1-2000',
    totalPhotos: 99,
    departments: [
      { id: 'd3-1', name: 'Khối Văn phòng', count: 4 },
      { id: 'd3-2', name: 'Phòng Khai triển', count: 25 },
      { id: 'd3-3', name: 'Phòng Ghép', count: 38 },
      { id: 'd3-4', name: 'Phòng Cảnh Quan', count: 32 },
    ],
  },
  {
    id: 'proj-4',
    name: 'CHỈNH SỬA MÔ HÌNH VIN UNIVERSITY',
    totalPhotos: 6,
    departments: [
      { id: 'd4-1', name: 'Phòng Khai triển', count: 2 },
      { id: 'd4-2', name: 'Phòng Ghép', count: 4 },
    ],
  },
  {
    id: 'proj-5',
    name: 'DỰ ÁN KHU ĐÔ THỊ PHÍA ĐÔNG CÔNG SỞ THỊ TRẤN TÂN PHONG',
    totalPhotos: 34,
    departments: [
      { id: 'd5-1', name: 'Khối Văn phòng', count: 4 },
      { id: 'd5-2', name: 'Phòng Khai triển', count: 10 },
      { id: 'd5-3', name: 'Phòng Ghép', count: 12 },
      { id: 'd5-4', name: 'Phòng Cảnh Quan', count: 8 },
    ],
  },
  {
    id: 'proj-6',
    name: 'KHU NHÀ Ở THƯƠNG MẠI 319, XÃ YÊN MỸ, TỈNH HƯNG YÊN',
    totalPhotos: 291,
    departments: [
      { id: 'd6-1', name: 'Khối Văn phòng', count: 15 },
      { id: 'd6-2', name: 'Phòng Khai triển', count: 65 },
      { id: 'd6-3', name: 'Phòng Ghép', count: 112 },
      { id: 'd6-4', name: 'Phòng Cảnh Quan', count: 99 },
    ],
  },
  {
    id: 'proj-7',
    name: 'KIEN GIANG MASTER PLAN PROJECT MODEL',
    totalPhotos: 249,
    departments: [
      { id: 'd7-1', name: 'Khối Văn phòng', count: 14 },
      { id: 'd7-2', name: 'Phòng Khai triển', count: 50 },
      { id: 'd7-3', name: 'Phòng Ghép', count: 95 },
      { id: 'd7-4', name: 'Phòng Cảnh Quan', count: 90 },
    ],
  },
  {
    id: 'proj-8',
    name: 'MODEL VIETTEL THANG LONG 1&2',
    totalPhotos: 4,
    departments: [
      { id: 'd8-1', name: 'Phòng Khai triển', count: 2 },
      { id: 'd8-2', name: 'Phòng Ghép', count: 2 },
    ],
  },
  {
    id: 'proj-9',
    name: 'PHÒNG HỌP MHV',
    totalPhotos: 4,
    departments: [
      { id: 'd9-1', name: 'Khối Văn phòng', count: 4 },
    ],
  },
  {
    id: 'proj-10',
    name: 'QUY HOẠCH THÀNH PHỐ ĐÀ NẴNG',
    totalPhotos: 52,
    departments: [
      { id: 'd10-1', name: 'Khối Văn phòng', count: 4 },
      { id: 'd10-2', name: 'Phòng Khai triển', count: 16 },
      { id: 'd10-3', name: 'Phòng Ghép', count: 20 },
      { id: 'd10-4', name: 'Phòng Cảnh Quan', count: 12 },
    ],
  },
  {
    id: 'proj-11',
    name: 'QUY HOẠCH TỈNH HƯNG YÊN',
    totalPhotos: 16,
    departments: [
      { id: 'd11-1', name: 'Phòng Khai triển', count: 6 },
      { id: 'd11-2', name: 'Phòng Ghép', count: 10 },
    ],
  },
];

export default function HinhAnhBaoCao({
  projects: _projects,
  searchQuery = '',
}: HinhAnhBaoCaoProps) {
  // Filter states
  const [selectedProject, setSelectedProject] = useState<string>('ALL');
  const [selectedStaff, setSelectedStaff] = useState<string>('ALL');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [groupBy, setGroupBy] = useState<string>('date');

  // Accordion state: Set of open project IDs (mặc định mở proj-1 như hình ảnh)
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({
    'proj-1': true,
  });

  // Department open state for photo cards gallery
  const [expandedDepts, setExpandedDepts] = useState<Record<string, boolean>>({});

  // Lightbox modal state
  const [viewingPhoto, setViewingPhoto] = useState<{
    title: string;
    date: string;
    author: string;
    projectName: string;
    deptName: string;
  } | null>(null);

  // Toggle Project Box
  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  // Toggle Department inside Project Box
  const toggleDepartment = (deptKey: string) => {
    setExpandedDepts((prev) => ({
      ...prev,
      [deptKey]: !prev[deptKey],
    }));
  };

  // Filtered project list
  const filteredProjects = useMemo(() => {
    return PROJECT_PHOTO_LIST.filter((p) => {
      const matchesProject =
        selectedProject === 'ALL' || p.id === selectedProject || p.name.includes(selectedProject);

      const matchesQuery =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.departments.some((d) => d.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesProject && matchesQuery;
    });
  }, [selectedProject, searchQuery]);

  const handleExportPhotos = () => {
    alert('Đang xuất toàn bộ 975 tệp ảnh báo cáo công việc (định dạng .ZIP)!');
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-2.5 text-left font-sans select-none overflow-hidden">
      
      {/* ── 1. THANH BỘ LỌC ẢNH BÁO CÁO CÔNG VIỆC ── */}
      <div className="shrink-0 py-1 px-0.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Title & Stats */}
          <div className="flex items-center gap-2 shrink-0">
            <IconPhoto size={18} className="text-[#4338ca] shrink-0" stroke={2} />
            <h2 className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight whitespace-nowrap">
              Ảnh báo cáo công việc
            </h2>
            <span className="text-xs text-slate-400 font-normal whitespace-nowrap ml-1">
              975 ảnh · 15 ngày báo cáo
            </span>
          </div>

          {/* Right: All Filter Controls & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* 1. Tất cả dự án */}
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer shadow-2xs"
            >
              <option value="ALL">Tất cả dự án</option>
              {PROJECT_PHOTO_LIST.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            {/* 2. Tất cả nhân sự */}
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer shadow-2xs"
            >
              <option value="ALL">Tất cả nhân sự</option>
              <option value="1">Trần Diễm My</option>
              <option value="2">Nguyễn Phú Quang</option>
              <option value="3">Trần Văn Mạnh</option>
              <option value="4">Lê Hoàng Anh</option>
              <option value="5">Phạm Đức Huy</option>
              <option value="6">Vũ Minh Tuấn</option>
              <option value="7">Đỗ Thùy Linh</option>
            </select>

            {/* 3. Date Picker: mm/dd/yyyy -> mm/dd/yyyy */}
            <div className="flex items-center gap-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-28 bg-white border border-slate-200 text-slate-700 text-xs rounded-md pl-2 pr-6 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-2xs placeholder:text-slate-400"
                />
                <IconCalendar
                  size={14}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                />
              </div>

              <span className="text-slate-400 text-xs font-semibold px-0.5">→</span>

              <div className="relative">
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-28 bg-white border border-slate-200 text-slate-700 text-xs rounded-md pl-2 pr-6 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-2xs placeholder:text-slate-400"
                />
                <IconCalendar
                  size={14}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                />
              </div>
            </div>

            {/* 4. Theo ngày báo cáo */}
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer shadow-2xs"
            >
              <option value="date">Theo ngày báo cáo</option>
              <option value="project">Theo dự án</option>
              <option value="staff">Theo nhân sự</option>
            </select>

            {/* 5. Nút Xuất ảnh */}
            <button
              type="button"
              onClick={handleExportPhotos}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#406c89] hover:bg-[#345972] text-white rounded-md text-xs font-semibold shadow-2xs transition-colors cursor-pointer select-none whitespace-nowrap"
            >
              <IconFolderDown size={14} stroke={2} />
              <span>Xuất ảnh</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. DANH SÁCH Ô BOX ACCORDION DỰ ÁN & PHÒNG BAN GIỐNG HÌNH ẢNH ── */}
      <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar space-y-2.5 pb-6">
        {filteredProjects.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs font-medium bg-white rounded-xl border border-slate-200/80">
            Không tìm thấy dự án hoặc hình ảnh nào phù hợp với bộ lọc.
          </div>
        ) : (
          filteredProjects.map((p) => {
            const isExpanded = Boolean(expandedProjects[p.id]);

            return (
              <div key={p.id} className="w-full transition-all">
                {/* ─ HEADER BOX DỰ ÁN (XANH GHI ĐẬM CHUẨN MÀU #476378) ─ */}
                <div
                  onClick={() => toggleProject(p.id)}
                  className={`flex items-center justify-between px-3.5 sm:px-4 py-2.5 bg-[#476378] hover:bg-[#3f576b] text-white cursor-pointer transition-colors shadow-2xs select-none ${
                    isExpanded ? 'rounded-t-md' : 'rounded-md'
                  }`}
                >
                  {/* Left: Chevron & Uppercase Project Name */}
                  <div className="flex items-center gap-2 min-w-0 pr-3">
                    {isExpanded ? (
                      <IconChevronDown size={17} className="text-white shrink-0" stroke={2.5} />
                    ) : (
                      <IconChevronRight size={17} className="text-white shrink-0" stroke={2.5} />
                    )}
                    <span className="font-bold text-white text-xs sm:text-[13px] uppercase tracking-normal truncate leading-tight">
                      {p.name}
                    </span>
                  </div>

                  {/* Right: Số lượng ảnh */}
                  <div className="shrink-0 text-white text-xs sm:text-[13px] font-normal tracking-wide">
                    {p.totalPhotos} ảnh
                  </div>
                </div>

                {/* ─ BODY EXPANDED: DANH SÁCH CÁC PHÒNG BAN (NỀN TRẮNG, VIỀN MẢNH) ─ */}
                {isExpanded && (
                  <div className="bg-white border-x border-b border-slate-200 rounded-b-md shadow-2xs divide-y divide-slate-100 overflow-hidden">
                    {p.departments.map((dept) => {
                      const deptKey = `${p.id}-${dept.id}`;
                      const isDeptExpanded = Boolean(expandedDepts[deptKey]);

                      return (
                        <div key={deptKey} className="group">
                          {/* Department Row */}
                          <div
                            onClick={() => toggleDepartment(deptKey)}
                            className="flex items-center justify-between px-4 sm:px-5 py-2.5 hover:bg-slate-50/70 transition-colors cursor-pointer select-none"
                          >
                            {/* Left: Chevron & Pill Tag phòng ban màu tím nhạt (#f0effb) */}
                            <div className="flex items-center gap-2.5">
                              {isDeptExpanded ? (
                                <IconChevronDown
                                  size={15}
                                  className="text-slate-400 group-hover:text-slate-600 shrink-0 transition-colors"
                                  stroke={2}
                                />
                              ) : (
                                <IconChevronRight
                                  size={15}
                                  className="text-slate-400 group-hover:text-slate-600 shrink-0 transition-colors"
                                  stroke={2}
                                />
                              )}
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-[#f0effb] border border-[#e2e0fb] text-[#4338ca]">
                                {dept.name}
                              </span>
                            </div>

                            {/* Right: Số lượng ảnh của phòng ban */}
                            <span className="text-xs text-slate-400 font-normal">
                              {dept.count} ảnh
                            </span>
                          </div>

                          {/* Expanded Photo Gallery for Department */}
                          {isDeptExpanded && (
                            <div className="bg-slate-50/70 p-3.5 border-t border-slate-100">
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                {(dept.photos || [
                                  { id: 'ph1', title: `Ảnh báo cáo 1 - ${dept.name}`, date: '06/11/2026', author: 'Kỹ thuật viên', bg: 'from-blue-600/85 to-indigo-800/85' },
                                  { id: 'ph2', title: `Ảnh báo cáo 2 - ${dept.name}`, date: '05/11/2026', author: 'Chủ nhiệm dự án', bg: 'from-emerald-600/85 to-teal-800/85' },
                                  { id: 'ph3', title: `Ảnh hiện trường - ${dept.name}`, date: '04/11/2026', author: 'Phụ trách kỹ thuật', bg: 'from-amber-600/85 to-orange-800/85' },
                                  { id: 'ph4', title: `Kiểm tra nghiệm thu - ${dept.name}`, date: '03/11/2026', author: 'Giám sát viên', bg: 'from-violet-600/85 to-purple-800/85' },
                                ]).map((photo) => (
                                  <div
                                    key={photo.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setViewingPhoto({
                                        title: photo.title,
                                        date: photo.date,
                                        author: photo.author,
                                        projectName: p.name,
                                        deptName: dept.name,
                                      });
                                    }}
                                    className="group/photo relative rounded-lg border border-slate-200 overflow-hidden bg-slate-100 aspect-video flex flex-col justify-end p-2 cursor-pointer shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5"
                                  >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${photo.bg} opacity-90 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center text-white`}>
                                      <IconPhoto size={24} className="opacity-80 group-hover/photo:scale-110 transition-transform" />
                                    </div>
                                    <div className="relative z-10 text-white">
                                      <p className="text-[10px] font-bold truncate leading-tight drop-shadow-xs">
                                        {photo.title}
                                      </p>
                                      <p className="text-[9px] text-white/85 truncate drop-shadow-xs">
                                        {photo.author} · {photo.date}
                                      </p>
                                    </div>
                                    <div className="absolute top-1.5 right-1.5 z-10 opacity-0 group-hover/photo:opacity-100 transition-opacity bg-black/50 p-1 rounded-md text-white">
                                      <IconEye size={12} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ── 3. MODAL XEM CHI TIẾT ẢNH BÁO CÁO (LIGHTBOX) ── */}
      {viewingPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setViewingPhoto(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
              <div className="min-w-0 pr-2">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-[#f0effb] border border-[#e2e0fb] text-[#4338ca] mb-1">
                  {viewingPhoto.deptName}
                </span>
                <h4 className="text-xs font-bold text-slate-800 truncate">
                  {viewingPhoto.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setViewingPhoto(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/60 transition-colors"
              >
                <IconX size={18} />
              </button>
            </div>

            {/* Modal Body / Image Preview */}
            <div className="p-4 bg-slate-900 flex items-center justify-center min-h-[260px] relative">
              <div className="flex flex-col items-center justify-center text-white/60 space-y-2">
                <IconPhoto size={64} className="text-white/40 animate-pulse" />
                <span className="text-xs font-medium text-white/80">Hình ảnh báo cáo hiện trường thi công</span>
                <span className="text-[11px] text-white/50">{viewingPhoto.projectName}</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-white border-t border-slate-100 text-xs text-slate-600">
              <div>
                <span>Người chụp: </span>
                <strong className="text-slate-800 font-semibold">{viewingPhoto.author}</strong>
                <span className="mx-2 text-slate-300">|</span>
                <span>Ngày: </span>
                <strong className="text-slate-800 font-semibold">{viewingPhoto.date}</strong>
              </div>
              <button
                type="button"
                onClick={() => alert(`Tải xuống tệp ảnh: ${viewingPhoto.title}.jpg`)}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#476378] hover:bg-[#3f576b] text-white rounded text-xs font-medium transition-colors"
              >
                <IconDownload size={13} />
                <span>Tải ảnh</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
