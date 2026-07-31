"use client";

import React, { useState } from 'react';
import { IconChevronRight, IconClock, IconAlertTriangle, IconEye, IconChevronLeft } from '@tabler/icons-react';
import ModalChiTietNhanSu from './ModalChiTietNhanSu';

interface StaffRowData {
  stt: number;
  name: string;
  dept: string;
  cvLich: number;
  chuaTrienKhai: number;
  daBaoCao: number;
  chuaBaoCao: number;
  baoCaoTre: number;
  cvTre: number;
}

interface DeptGroupData {
  groupName: string;
  staffList: StaffRowData[];
}

export default function NhanSuTab() {
  const [selectedStaff, setSelectedStaff] = useState<StaffRowData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleOpenModal = (staff: StaffRowData) => {
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const deptGroups: DeptGroupData[] = [
    {
      groupName: 'BAN GIÁM ĐỐC',
      staffList: [
        { stt: 1, name: 'Phùng Bích Thảo', dept: 'Ban Giám đốc', cvLich: 0, chuaTrienKhai: 6, daBaoCao: 0, chuaBaoCao: 6, baoCaoTre: 0, cvTre: 5 },
        { stt: 2, name: 'Nguyễn Thanh Tuấn', dept: 'Ban Giám đốc', cvLich: 0, chuaTrienKhai: 6, daBaoCao: 0, chuaBaoCao: 6, baoCaoTre: 0, cvTre: 6 },
        { stt: 3, name: 'Nguyễn Đức Việt', dept: 'Ban Giám đốc', cvLich: 0, chuaTrienKhai: 2, daBaoCao: 0, chuaBaoCao: 2, baoCaoTre: 0, cvTre: 2 },
        { stt: 4, name: 'Nguyễn Thanh Tuấn, Phùng Bích Thảo, Nguyễn Đức Việt', dept: 'Ban Giám đốc', cvLich: 0, chuaTrienKhai: 2, daBaoCao: 0, chuaBaoCao: 2, baoCaoTre: 0, cvTre: 0 },
      ]
    },
    {
      groupName: 'KHỐI VĂN PHÒNG',
      staffList: [
        { stt: 5, name: 'Bùi Thị Duyên', dept: 'Khối Văn phòng', cvLich: 0, chuaTrienKhai: 11, daBaoCao: 1, chuaBaoCao: 10, baoCaoTre: 1, cvTre: 8 },
        { stt: 6, name: 'Trần Minh Anh', dept: 'Khối Văn phòng', cvLich: 0, chuaTrienKhai: 4, daBaoCao: 2, chuaBaoCao: 2, baoCaoTre: 0, cvTre: 1 },
        { stt: 7, name: 'Phạm Thu Trang', dept: 'Khối Văn phòng', cvLich: 0, chuaTrienKhai: 5, daBaoCao: 1, chuaBaoCao: 4, baoCaoTre: 0, cvTre: 3 },
      ]
    },
    {
      groupName: 'PHÒNG CẮT',
      staffList: [
        { stt: 8, name: 'Lê Trung Hiếu', dept: 'Phòng Cắt', cvLich: 0, chuaTrienKhai: 2, daBaoCao: 1, chuaBaoCao: 1, baoCaoTre: 1, cvTre: 2 },
        { stt: 9, name: 'Vũ Quốc Huy', dept: 'Phòng Cắt', cvLich: 0, chuaTrienKhai: 3, daBaoCao: 0, chuaBaoCao: 3, baoCaoTre: 0, cvTre: 2 },
      ]
    },
    {
      groupName: 'PHÒNG GHÉP',
      staffList: [
        { stt: 10, name: 'Đinh Đức Lợi', dept: 'Phòng Ghép', cvLich: 0, chuaTrienKhai: 1, daBaoCao: 0, chuaBaoCao: 1, baoCaoTre: 0, cvTre: 0 },
        { stt: 11, name: 'Nguyễn Văn Hoàng', dept: 'Phòng Ghép', cvLich: 0, chuaTrienKhai: 4, daBaoCao: 1, chuaBaoCao: 3, baoCaoTre: 0, cvTre: 1 },
      ]
    },
    {
      groupName: 'PHÒNG ĐIỆN',
      staffList: [
        { stt: 12, name: 'Lâm Vĩnh Hưng', dept: 'Phòng Điện', cvLich: 0, chuaTrienKhai: 1, daBaoCao: 0, chuaBaoCao: 1, baoCaoTre: 0, cvTre: 1 },
        { stt: 13, name: 'Trịnh Hoàng Nam', dept: 'Phòng Điện', cvLich: 0, chuaTrienKhai: 5, daBaoCao: 2, chuaBaoCao: 3, baoCaoTre: 1, cvTre: 2 },
      ]
    },
    {
      groupName: 'PHÒNG KHAI TRIỂN',
      staffList: [
        { stt: 14, name: 'Đào Văn Thọ', dept: 'Phòng Khai triển', cvLich: 0, chuaTrienKhai: 4, daBaoCao: 2, chuaBaoCao: 2, baoCaoTre: 0, cvTre: 1 },
        { stt: 15, name: 'Ngô Tấn Phát', dept: 'Phòng Khai triển', cvLich: 0, chuaTrienKhai: 3, daBaoCao: 1, chuaBaoCao: 2, baoCaoTre: 0, cvTre: 1 },
      ]
    },
    {
      groupName: 'PHÒNG MỘC SƠN',
      staffList: [
        { stt: 16, name: 'Hoàng Quyết Thắng', dept: 'Phòng Mộc Sơn', cvLich: 0, chuaTrienKhai: 3, daBaoCao: 1, chuaBaoCao: 2, baoCaoTre: 0, cvTre: 2 },
        { stt: 17, name: 'Bùi Văn Tiến', dept: 'Phòng Mộc Sơn', cvLich: 0, chuaTrienKhai: 2, daBaoCao: 1, chuaBaoCao: 1, baoCaoTre: 0, cvTre: 0 },
      ]
    },
    {
      groupName: 'PHÒNG CẢNH QUAN',
      staffList: [
        { stt: 18, name: 'Phạm Văn Thành', dept: 'Phòng Cảnh Quan', cvLich: 0, chuaTrienKhai: 5, daBaoCao: 2, chuaBaoCao: 3, baoCaoTre: 1, cvTre: 3 },
        { stt: 19, name: 'Vũ Thị Lan', dept: 'Phòng Cảnh Quan', cvLich: 0, chuaTrienKhai: 2, daBaoCao: 1, chuaBaoCao: 1, baoCaoTre: 0, cvTre: 1 },
      ]
    },
    {
      groupName: 'PHÒNG CÔNG NGHỆ VÀ THIẾT KẾ',
      staffList: [
        { stt: 20, name: 'Đặng Quốc Nam', dept: 'Phòng Công nghệ và Thiết kế', cvLich: 0, chuaTrienKhai: 2, daBaoCao: 1, chuaBaoCao: 1, baoCaoTre: 0, cvTre: 1 },
        { stt: 21, name: 'Lê Thanh Tùng', dept: 'Phòng Công nghệ và Thiết kế', cvLich: 0, chuaTrienKhai: 4, daBaoCao: 2, chuaBaoCao: 2, baoCaoTre: 0, cvTre: 1 },
        { stt: 22, name: 'Nguyễn Thị Hoa', dept: 'Phòng Công nghệ và Thiết kế', cvLich: 0, chuaTrienKhai: 1, daBaoCao: 1, chuaBaoCao: 0, baoCaoTre: 0, cvTre: 0 },
      ]
    }
  ];

  // Flatten all staff members
  const allStaffList = deptGroups.flatMap(g => g.staffList);
  const totalItems = allStaffList.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Paginated staff slice
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedStaff = allStaffList.slice(startIndex, startIndex + pageSize);

  // Group paginated staff by department
  const paginatedGroups: DeptGroupData[] = [];
  deptGroups.forEach(g => {
    const matchingStaff = paginatedStaff.filter(s => g.staffList.some(item => item.stt === s.stt));
    if (matchingStaff.length > 0) {
      paginatedGroups.push({
        groupName: g.groupName,
        staffList: matchingStaff
      });
    }
  });

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="space-y-3">
      {/* UNIFIED CARD CONTAINER WITH PERMANENTLY PINNED PAGINATION */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col max-h-[480px] relative font-sans">
        {/* TABLE SCROLL CONTAINER */}
        <div className="flex-1 overflow-auto relative select-none">
          <table className="w-full text-left text-xs border-collapse min-w-[850px]">
            {/* HEADER ROW STICKY TOP */}
            <thead className="sticky top-0 z-20 shadow-2xs">
              <tr className="bg-[#f8fafc] text-slate-600 font-bold border-b border-slate-200/90 text-[11px]">
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-3 w-14 text-center z-20">STT</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-3.5 min-w-[190px] z-20">Nhân sự</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-3.5 min-w-[135px] z-20">Phòng ban</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-2.5 text-center min-w-[85px] z-20">CV theo lịch</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-2.5 text-center min-w-[95px] z-20">Chưa triển khai</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-2.5 text-center min-w-[85px] z-20">Đã báo cáo</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-2.5 text-center min-w-[95px] z-20">Chưa báo cáo</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-2.5 text-center min-w-[90px] z-20">Báo cáo trễ</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-3 text-center min-w-[75px] text-rose-600 font-extrabold z-20">CV trễ</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-2.5 text-center min-w-[85px] z-20">Hành động</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="divide-y divide-slate-100">
              {paginatedGroups.map((group, gIdx) => (
                <React.Fragment key={gIdx}>
                  {/* DEPARTMENT BANNER ROW */}
                  <tr className="bg-[#edf2f8] border-y border-slate-200/80">
                    <td colSpan={10} className="py-2 px-3 font-extrabold text-[11px] text-[#2b5278] uppercase tracking-wider">
                      {group.groupName}
                    </td>
                  </tr>

                  {/* STAFF ROWS */}
                  {group.staffList.map((row) => (
                    <tr key={row.stt} className="hover:bg-slate-50/80 transition-colors">
                      {/* STT COLUMN */}
                      <td className="py-2.5 px-3 text-center text-slate-500 font-medium text-xs">
                        {row.stt}
                      </td>

                      {/* STAFF NAME */}
                      <td className="py-2.5 px-3.5 font-bold text-slate-800 text-xs">
                        {row.name}
                      </td>

                      {/* DEPARTMENT NAME */}
                      <td className="py-2.5 px-3.5 text-slate-400 font-medium text-xs">
                        {row.dept}
                      </td>

                      {/* CV THEO LỊCH */}
                      <td className="py-2.5 px-2.5 text-center font-medium text-emerald-600 text-xs">
                        {row.cvLich}
                      </td>

                      {/* CHƯA TRIỂN KHAI */}
                      <td className="py-2.5 px-2.5 text-center font-semibold text-amber-600 text-xs">
                        {row.chuaTrienKhai > 0 ? (
                          <div className="inline-flex items-center justify-center gap-1">
                            <IconClock size={13} className="text-amber-500 shrink-0" />
                            <span>{row.chuaTrienKhai}</span>
                          </div>
                        ) : (
                          <span>0</span>
                        )}
                      </td>

                      {/* ĐÃ BÁO CÁO */}
                      <td className="py-2.5 px-2.5 text-center font-medium text-emerald-600 text-xs">
                        {row.daBaoCao}
                      </td>

                      {/* CHƯA BÁO CÁO */}
                      <td className="py-2.5 px-2.5 text-center font-semibold text-rose-600 text-xs">
                        {row.chuaBaoCao > 0 ? (
                          <div className="inline-flex items-center justify-center gap-1">
                            <IconAlertTriangle size={13} className="text-rose-500 shrink-0" />
                            <span>{row.chuaBaoCao}</span>
                          </div>
                        ) : (
                          <span>0</span>
                        )}
                      </td>

                      {/* BÁO CÁO TRỄ */}
                      <td className="py-2.5 px-2.5 text-center font-medium text-amber-600 text-xs">
                        {row.baoCaoTre}
                      </td>

                      {/* CV TRỄ */}
                      <td className="py-2.5 px-3 text-center font-extrabold text-rose-600 text-xs">
                        {row.cvTre > 0 ? row.cvTre : <span className="text-slate-400 font-medium text-xs">0</span>}
                      </td>

                      {/* HÀNH ĐỘNG (ICON MẮT) */}
                      <td className="py-2.5 px-2.5 text-center">
                        <button
                          type="button"
                          onClick={() => handleOpenModal(row)}
                          className="p-1.5 text-slate-500 hover:text-[#2b5278] hover:bg-slate-100 rounded-md transition-all cursor-pointer inline-flex items-center justify-center"
                          title="Xem chi tiết"
                        >
                          <IconEye size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* PERMANENTLY PINNED BOTTOM PAGINATION BAR */}
        <div className="shrink-0 z-30 bg-white border-t border-slate-200/90 shadow-md px-4 py-2 sm:py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs select-none">
          <div className="flex items-center gap-3 text-slate-500 font-medium text-xs">
            <div>
              Hiển thị <span className="font-bold text-slate-800">{totalItems > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + pageSize, totalItems)}</span> trên <span className="font-bold text-slate-800">{totalItems}</span> nhân sự
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-lg border transition-all ${
                currentPage === 1
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer'
              }`}
              title="Trang trước"
            >
              <IconChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  currentPage === pageNum
                    ? 'bg-[#2b5278] text-white shadow-2xs font-black'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-1.5 rounded-lg border transition-all ${
                currentPage === totalPages
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer'
              }`}
              title="Trang tiếp"
            >
              <IconChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL CHI TIẾT CÔNG VIỆC NHÂN SỰ */}
      <ModalChiTietNhanSu
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        staffData={selectedStaff}
      />
    </div>
  );
}
