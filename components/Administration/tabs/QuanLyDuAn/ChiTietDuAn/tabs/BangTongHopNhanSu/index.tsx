"use client";

import React from 'react';

interface StaffItem {
  name: string;
  tasks: number;
  hours: string;
  percent: string;
}

interface DeptSummary {
  id: string;
  name: string;
  totalHoursStr: string;
  color: string;
  staffList: StaffItem[];
}

export default function BangTongHopNhanSuTab() {
  const summaryData: DeptSummary[] = [
    {
      id: 'bgd',
      name: 'Ban Giám đốc',
      totalHoursStr: '16h tổng',
      color: '#406c89',
      staffList: [
        { name: 'Nguyễn Thanh Tuấn', tasks: 6, hours: '7h', percent: '43.8%' },
        { name: 'Phùng Bích Thảo', tasks: 6, hours: '5h', percent: '31.3%' },
        { name: 'Nguyễn Đức Việt', tasks: 2, hours: '2h', percent: '12.5%' },
        { name: 'Nguyễn Thanh Tuấn, Phùng Bích Thảo, Nguyễn Đức Việt', tasks: 2, hours: '2h', percent: '12.5%' },
      ]
    },
    {
      id: 'kvp',
      name: 'Khối Văn phòng',
      totalHoursStr: '63h tổng',
      color: '#b45309',
      staffList: [
        { name: 'Bùi Thị Duyên', tasks: 50, hours: '63h', percent: '100.0%' },
      ]
    },
    {
      id: 'pkt',
      name: 'PB Khai triển',
      totalHoursStr: '349.5h tổng',
      color: '#16a34a',
      staffList: [
        { name: 'Nguyễn Thanh Tuấn', tasks: 5, hours: '120h', percent: '34.3%' },
        { name: 'Đào Văn Thọ', tasks: 14, hours: '110h', percent: '31.5%' },
        { name: 'Trần Diễm My', tasks: 13, hours: '43.5h', percent: '12.4%' },
        { name: 'Dương Việt Anh', tasks: 4, hours: '40h', percent: '11.4%' },
        { name: 'Nguyễn Thiên Hương', tasks: 4, hours: '16h', percent: '4.6%' },
        { name: 'Lê Quốc Long', tasks: 2, hours: '9h', percent: '2.6%' },
        { name: 'Đào Văn Thọ, Dương Việt Anh, Phạm Tiến Thành', tasks: 1, hours: '8h', percent: '2.3%' },
        { name: 'Phạm Tiến Thành', tasks: 2, hours: '3h', percent: '0.9%' },
      ]
    },
    {
      id: 'pcat',
      name: 'PB Cắt',
      totalHoursStr: '272h tổng',
      color: '#dc2626',
      staffList: [
        { name: 'Lê Trung Hiếu', tasks: 18, hours: '68h', percent: '25.0%' },
        { name: 'Máy 1 (CMH 1390-B-A)', tasks: 8, hours: '64h', percent: '23.5%' },
        { name: 'Hoàng Hữu Vinh', tasks: 14, hours: '56h', percent: '20.6%' },
        { name: 'Máy 4 (CMH 1390-B-A)', tasks: 6, hours: '48h', percent: '17.6%' },
        { name: 'Nguyễn Tuấn Việt', tasks: 5, hours: '20h', percent: '7.4%' },
        { name: 'Máy 2 (CMH 1390-B-A)', tasks: 2, hours: '16h', percent: '5.9%' },
      ]
    },
    {
      id: 'pghep',
      name: 'PB Ghép',
      totalHoursStr: '544h tổng',
      color: '#7c3aed',
      staffList: [
        { name: 'Đỗ Thị Luyên', tasks: 20, hours: '182h', percent: '33.5%' },
        { name: 'Đinh Đức Lợi', tasks: 20, hours: '154h', percent: '28.3%' },
        { name: 'Nguyễn Quang Lợi', tasks: 10, hours: '68h', percent: '12.5%' },
        { name: 'Đặng Văn Điệp', tasks: 10, hours: '60h', percent: '11.0%' },
        { name: 'Nguyễn Quỳnh Châu', tasks: 4, hours: '36h', percent: '6.6%' },
        { name: 'Ninh Quang Vinh', tasks: 5, hours: '36h', percent: '6.6%' },
        { name: 'Nguyễn Phi Hùng', tasks: 1, hours: '8h', percent: '1.5%' },
      ]
    },
    {
      id: 'pmoc',
      name: 'PB Mộc Sơn',
      totalHoursStr: '40h tổng',
      color: '#0891b2',
      staffList: [
        { name: 'Hoàng Quyết Thắng', tasks: 18, hours: '23h', percent: '57.5%' },
        { name: 'Quản Minh Hoàng', tasks: 17, hours: '10h', percent: '25.0%' },
        { name: 'Đinh Hữu Sử', tasks: 2, hours: '7h', percent: '17.5%' },
      ]
    },
    {
      id: 'pdien',
      name: 'PB Điện',
      totalHoursStr: '102h tổng',
      color: '#ea580c',
      staffList: [
        { name: 'Lâm Vinh Hưng', tasks: 18, hours: '102h', percent: '100.0%' },
      ]
    },
    {
      id: 'pcq',
      name: 'PB Cảnh Quan',
      totalHoursStr: '191h tổng',
      color: '#2563eb',
      staffList: [
        { name: 'Tống Thị Thu', tasks: 6, hours: '48h', percent: '25.1%' },
        { name: 'Nguyễn Thị Hồng Ngọc', tasks: 1, hours: '48h', percent: '25.1%' },
        { name: 'Sắm Thị Thủy', tasks: 7, hours: '43h', percent: '22.5%' },
        { name: 'Đỗ Ngọc Duyên', tasks: 8, hours: '36h', percent: '18.8%' },
        { name: 'Phạm Thị Thu Trang', tasks: 5, hours: '16h', percent: '8.4%' },
      ]
    },
    {
      id: 'pcntk',
      name: 'PB Công nghệ và Thiết kế',
      totalHoursStr: '48h tổng',
      color: '#65a30d',
      staffList: [
        { name: 'Lưu Quốc Nhật', tasks: 2, hours: '14h', percent: '29.2%' },
        { name: 'Cao Trường Thiên', tasks: 2, hours: '10h', percent: '20.8%' },
        { name: 'Nguyễn Quang Triệu', tasks: 2, hours: '8h', percent: '16.7%' },
        { name: 'Nguyễn Quang Linh', tasks: 1, hours: '8h', percent: '16.7%' },
        { name: 'Tạ Hiền Trang', tasks: 1, hours: '8h', percent: '16.7%' },
      ]
    }
  ];

  return (
    <div className="space-y-3 pt-2">
      <h3 className="font-extrabold text-xs text-[#2b5278] uppercase tracking-wider px-1">
        BẢNG TỔNG HỢP TẤT CẢ NHÂN SỰ
      </h3>

      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200/80 bg-slate-50/50">
                <th className="py-2.5 px-4 font-bold w-48">PHÒNG BAN</th>
                <th className="py-2.5 px-4 font-bold">NHÂN SỰ</th>
                <th className="py-2.5 px-4 font-bold text-right w-28">CÔNG VIỆC</th>
                <th className="py-2.5 px-4 font-bold text-right w-28">GIỜ KH</th>
                <th className="py-2.5 px-4 font-bold text-right w-28">% / PHÒNG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {summaryData.map((dept) => (
                <React.Fragment key={dept.id}>
                  {dept.staffList.map((staff, sIdx) => {
                    const isFirst = sIdx === 0;
                    return (
                      <tr key={sIdx} className="hover:bg-slate-50/70 transition-colors">
                        {/* Department Column (RowSpan on first item) */}
                        {isFirst && (
                          <td
                            rowSpan={dept.staffList.length}
                            className="py-3 px-4 align-top border-r border-slate-100 bg-white"
                            style={{ borderLeft: `4px solid ${dept.color}` }}
                          >
                            <div className="font-extrabold text-slate-900 text-xs">
                              {dept.name}
                            </div>
                            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                              {dept.totalHoursStr}
                            </div>
                          </td>
                        )}

                        {/* Staff Name */}
                        <td className="py-2.5 px-4 font-semibold text-slate-700">
                          {staff.name}
                        </td>

                        {/* Tasks Count */}
                        <td className="py-2.5 px-4 text-right text-slate-600 font-medium">
                          {staff.tasks}
                        </td>

                        {/* Hours */}
                        <td className="py-2.5 px-4 text-right text-slate-600 font-medium">
                          {staff.hours}
                        </td>

                        {/* Percentage */}
                        <td className="py-2.5 px-4 text-right text-slate-600 font-medium">
                          {staff.percent}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}

              {/* FOOTER TOTAL ROW */}
              <tr className="bg-slate-50/90 font-bold border-t-2 border-slate-200">
                <td colSpan={3} className="py-3 px-4 text-right text-slate-900 font-extrabold">
                  Tổng toàn dự án:
                </td>
                <td className="py-3 px-4 text-right text-[#6366f1] font-extrabold text-xs">
                  1625.5h
                </td>
                <td className="py-3 px-4 text-center text-slate-400 font-medium">
                  —
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
