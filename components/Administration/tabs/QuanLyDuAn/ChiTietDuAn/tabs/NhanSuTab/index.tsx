"use client";

import React from 'react';
import { IconChevronRight, IconClock, IconAlertTriangle, IconEye } from '@tabler/icons-react';

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
      ]
    },
    {
      groupName: 'PHÒNG CẮT',
      staffList: [
        { stt: 6, name: 'Lê Trung Hiếu', dept: 'Phòng Cắt', cvLich: 0, chuaTrienKhai: 2, daBaoCao: 1, chuaBaoCao: 1, baoCaoTre: 1, cvTre: 2 },
      ]
    },
    {
      groupName: 'PHÒNG GHÉP',
      staffList: [
        { stt: 7, name: 'Đinh Đức Lợi', dept: 'Phòng Ghép', cvLich: 0, chuaTrienKhai: 1, daBaoCao: 0, chuaBaoCao: 1, baoCaoTre: 0, cvTre: 0 },
      ]
    },
    {
      groupName: 'PHÒNG ĐIỆN',
      staffList: [
        { stt: 8, name: 'Lâm Vĩnh Hưng', dept: 'Phòng Điện', cvLich: 0, chuaTrienKhai: 1, daBaoCao: 0, chuaBaoCao: 1, baoCaoTre: 0, cvTre: 1 },
      ]
    },
    {
      groupName: 'PHÒNG KHAI TRIỂN',
      staffList: [
        { stt: 9, name: 'Đào Văn Thọ', dept: 'Phòng Khai triển', cvLich: 0, chuaTrienKhai: 4, daBaoCao: 2, chuaBaoCao: 2, baoCaoTre: 0, cvTre: 1 },
      ]
    },
    {
      groupName: 'PHÒNG MỘC SƠN',
      staffList: [
        { stt: 10, name: 'Hoàng Quyết Thắng', dept: 'Phòng Mộc Sơn', cvLich: 0, chuaTrienKhai: 3, daBaoCao: 1, chuaBaoCao: 2, baoCaoTre: 0, cvTre: 2 },
      ]
    },
    {
      groupName: 'PHÒNG CẢNH QUAN',
      staffList: [
        { stt: 11, name: 'Phạm Văn Thành', dept: 'Phòng Cảnh Quan', cvLich: 0, chuaTrienKhai: 5, daBaoCao: 2, chuaBaoCao: 3, baoCaoTre: 1, cvTre: 3 },
      ]
    },
    {
      groupName: 'PHÒNG CÔNG NGHỆ VÀ THIẾT KẾ',
      staffList: [
        { stt: 12, name: 'Đặng Quốc Nam', dept: 'Phòng Công nghệ và Thiết kế', cvLich: 0, chuaTrienKhai: 2, daBaoCao: 1, chuaBaoCao: 1, baoCaoTre: 0, cvTre: 1 },
      ]
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-auto select-none animate-fade-in font-sans max-h-[415px] relative">
      <table className="w-full text-left text-xs border-collapse">
        {/* HEADER ROW STICKY TOP */}
        <thead className="sticky top-0 z-20 shadow-2xs">
          <tr className="bg-[#f8fafc] text-slate-600 font-bold border-b border-slate-200/90 text-[11px]">
            <th className="sticky top-0 bg-[#f8fafc] py-3 px-4 w-14 text-center z-20">STT</th>
            <th className="sticky top-0 bg-[#f8fafc] py-3 px-4 min-w-[200px] z-20">Nhân sự</th>
            <th className="sticky top-0 bg-[#f8fafc] py-3 px-4 min-w-[140px] z-20">Phòng ban</th>
            <th className="sticky top-0 bg-[#f8fafc] py-3 px-3 text-center min-w-[90px] z-20">CV theo lịch</th>
            <th className="sticky top-0 bg-[#f8fafc] py-3 px-3 text-center min-w-[100px] z-20">Chưa triển khai</th>
            <th className="sticky top-0 bg-[#f8fafc] py-3 px-3 text-center min-w-[90px] z-20">Đã báo cáo</th>
            <th className="sticky top-0 bg-[#f8fafc] py-3 px-3 text-center min-w-[100px] z-20">Chưa báo cáo</th>
            <th className="sticky top-0 bg-[#f8fafc] py-3 px-3 text-center min-w-[95px] z-20">Báo cáo trễ</th>
            <th className="sticky top-0 bg-[#f8fafc] py-3 px-4 text-center min-w-[80px] text-rose-600 font-extrabold z-20">CV trễ</th>
            <th className="sticky top-0 bg-[#f8fafc] py-3 px-3 text-center min-w-[90px] z-20">Hành động</th>
          </tr>
        </thead>

          {/* TABLE BODY WITH DEPARTMENT BANNER ROWS */}
          <tbody className="divide-y divide-slate-100">
            {deptGroups.map((group, gIdx) => (
              <React.Fragment key={gIdx}>
                {/* DEPARTMENT BANNER ROW */}
                <tr className="bg-[#edf2f8] border-y border-slate-200/80">
                  <td colSpan={10} className="py-2.5 px-4 font-extrabold text-[11px] text-[#2b5278] uppercase tracking-wider">
                    {group.groupName}
                  </td>
                </tr>

                {/* STAFF ROWS */}
                {group.staffList.map((row) => (
                  <tr key={row.stt} className="hover:bg-slate-50/80 transition-colors">
                    {/* STT COLUMN */}
                    <td className="py-3 px-4 text-center text-slate-500 font-medium">
                      {row.stt}
                    </td>

                    {/* STAFF NAME */}
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {row.name}
                    </td>

                    {/* DEPARTMENT NAME */}
                    <td className="py-3 px-4 text-slate-400 font-medium">
                      {row.dept}
                    </td>

                    {/* CV THEO LỊCH */}
                    <td className="py-3 px-3 text-center font-medium text-emerald-600">
                      {row.cvLich}
                    </td>

                    {/* CHƯA TRIỂN KHAI */}
                    <td className="py-3 px-3 text-center font-semibold text-amber-600">
                      {row.chuaTrienKhai > 0 ? (
                        <div className="inline-flex items-center justify-center gap-1.5">
                          <IconClock size={14} className="text-amber-500 shrink-0" />
                          <span>{row.chuaTrienKhai}</span>
                        </div>
                      ) : (
                        <span>0</span>
                      )}
                    </td>

                    {/* ĐÃ BÁO CÁO */}
                    <td className="py-3 px-3 text-center font-medium text-emerald-600">
                      {row.daBaoCao}
                    </td>

                    {/* CHƯA BÁO CÁO */}
                    <td className="py-3 px-3 text-center font-semibold text-rose-600">
                      {row.chuaBaoCao > 0 ? (
                        <div className="inline-flex items-center justify-center gap-1.5">
                          <IconAlertTriangle size={14} className="text-rose-500 shrink-0" />
                          <span>{row.chuaBaoCao}</span>
                        </div>
                      ) : (
                        <span>0</span>
                      )}
                    </td>

                    {/* BÁO CÁO TRỄ */}
                    <td className="py-3 px-3 text-center font-medium text-amber-600">
                      {row.baoCaoTre}
                    </td>

                    {/* CV TRỄ */}
                    <td className="py-3 px-4 text-center font-extrabold text-rose-600 text-sm">
                      {row.cvTre > 0 ? row.cvTre : <span className="text-slate-400 font-medium text-xs">0</span>}
                    </td>

                    {/* HÀNH ĐỘNG (ICON MẮT) */}
                    <td className="py-3 px-3 text-center">
                      <button
                        type="button"
                        className="p-1.5 text-slate-500 hover:text-[#2b5278] hover:bg-slate-100 rounded-md transition-all cursor-pointer inline-flex items-center justify-center"
                        title="Xem chi tiết"
                      >
                        <IconEye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
    </div>
  );
}
