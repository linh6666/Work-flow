"use client";

import React, { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { DuAnItem } from '../../../index';

interface ChiPhiPhongBanTabProps {
  project: DuAnItem;
}

interface StaffCostRow {
  name: string;
  hours: string;
  days: string;
  unitPrice: string;
  hasPrice: boolean;
  totalCost: string;
}

interface DeptCostGroup {
  id: string;
  name: string;
  subText: string;
  totalCost: string;
  staffList: StaffCostRow[];
}

export default function ChiPhiPhongBanTab({ project }: ChiPhiPhongBanTabProps) {
  const [expandedDepts, setExpandedDepts] = useState<string[]>([
    'bgd', 'kvp', 'pkt', 'pcat', 'pghep', 'pmoc', 'pdien', 'pcq', 'pcntk'
  ]);

  const toggleDept = (deptId: string) => {
    setExpandedDepts(prev =>
      prev.includes(deptId) ? prev.filter(id => id !== deptId) : [...prev, deptId]
    );
  };

  const departments: DeptCostGroup[] = [
    {
      id: 'bgd',
      name: 'Ban Giám đốc',
      subText: '4 nhân sự · 16h',
      totalCost: '2.475.331đ',
      staffList: [
        { name: 'Phùng Bích Thảo', hours: '5h', days: '0.6 ngày', unitPrice: '1.353.284đ', hasPrice: true, totalCost: '845.803đ' },
        { name: 'Nguyễn Đức Việt', hours: '2h', days: '0.3 ngày', unitPrice: '1.467.515đ', hasPrice: true, totalCost: '366.879đ' },
        { name: 'Nguyễn Thanh Tuấn', hours: '7h', days: '0.9 ngày', unitPrice: '1.443.028đ', hasPrice: true, totalCost: '1.262.650đ' },
        { name: 'Nguyễn Thanh Tuấn, Phùng Bích Thảo, Nguyễn Đức Việt', hours: '2h', days: '0.3 ngày', unitPrice: 'Chưa có đơn giá', hasPrice: false, totalCost: '—' },
      ]
    },
    {
      id: 'kvp',
      name: 'Khối Văn phòng',
      subText: '1 nhân sự · 63h',
      totalCost: '7.982.612đ',
      staffList: [
        { name: 'Bùi Thị Duyên', hours: '63h', days: '7.9 ngày', unitPrice: '1.013.665đ', hasPrice: true, totalCost: '7.982.612đ' }
      ]
    },
    {
      id: 'pkt',
      name: 'PB Khai triển',
      subText: '8 nhân sự · 349.5h',
      totalCost: '32.410.500đ',
      staffList: [
        { name: 'Nguyễn Thanh Tuấn', hours: '120h', days: '15.0 ngày', unitPrice: '1.443.028đ', hasPrice: true, totalCost: '21.645.420đ' },
        { name: 'Đào Văn Thọ', hours: '110h', days: '13.8 ngày', unitPrice: '780.000đ', hasPrice: true, totalCost: '10.765.080đ' },
        { name: 'Trần Diễm My', hours: '43.5h', days: '5.4 ngày', unitPrice: 'Chưa có đơn giá', hasPrice: false, totalCost: '—' }
      ]
    },
    {
      id: 'pcat',
      name: 'PB Cắt',
      subText: '6 nhân sự · 272h',
      totalCost: '18.520.000đ',
      staffList: [
        { name: 'Lê Trung Hiếu', hours: '68h', days: '8.5 ngày', unitPrice: '850.000đ', hasPrice: true, totalCost: '7.225.000đ' },
        { name: 'Máy 1 (CMH 1390-B-A)', hours: '64h', days: '8.0 ngày', unitPrice: '600.000đ', hasPrice: true, totalCost: '4.800.000đ' },
        { name: 'Hoàng Hữu Vinh', hours: '56h', days: '7.0 ngày', unitPrice: '920.000đ', hasPrice: true, totalCost: '6.495.000đ' }
      ]
    },
    {
      id: 'pghep',
      name: 'PB Ghép',
      subText: '7 nhân sự · 544h',
      totalCost: '38.250.000đ',
      staffList: [
        { name: 'Đỗ Thị Luyên', hours: '182h', days: '22.8 ngày', unitPrice: '900.000đ', hasPrice: true, totalCost: '20.520.000đ' },
        { name: 'Đinh Đức Lợi', hours: '154h', days: '19.3 ngày', unitPrice: '919.170đ', hasPrice: true, totalCost: '17.730.000đ' }
      ]
    },
    {
      id: 'pmoc',
      name: 'PB Mộc Sơn',
      subText: '3 nhân sự · 40h',
      totalCost: '4.120.000đ',
      staffList: [
        { name: 'Hoàng Quyết Thắng', hours: '23h', days: '2.9 ngày', unitPrice: '950.000đ', hasPrice: true, totalCost: '2.755.000đ' },
        { name: 'Quản Minh Hoàng', hours: '10h', days: '1.3 ngày', unitPrice: '1.050.000đ', hasPrice: true, totalCost: '1.365.000đ' }
      ]
    },
    {
      id: 'pdien',
      name: 'PB Điện',
      subText: '1 nhân sự · 102h',
      totalCost: '9.435.000đ',
      staffList: [
        { name: 'Lâm Vinh Hưng', hours: '102h', days: '12.8 ngày', unitPrice: '737.109đ', hasPrice: true, totalCost: '9.435.000đ' }
      ]
    },
    {
      id: 'pcq',
      name: 'PB Cảnh Quan',
      subText: '5 nhân sự · 191h',
      totalCost: '16.216.437đ',
      staffList: [
        { name: 'Tống Thị Thu', hours: '48h', days: '6.0 ngày', unitPrice: '920.000đ', hasPrice: true, totalCost: '5.520.000đ' },
        { name: 'Nguyễn Thị Hồng Ngọc', hours: '48h', days: '6.0 ngày', unitPrice: '880.000đ', hasPrice: true, totalCost: '5.280.000đ' },
        { name: 'Sắm Thị Thủy', hours: '43h', days: '5.4 ngày', unitPrice: '1.003.044đ', hasPrice: true, totalCost: '5.416.437đ' }
      ]
    },
    {
      id: 'pcntk',
      name: 'PB Công nghệ và Thiết kế',
      subText: '5 nhân sự · 48h',
      totalCost: '6.160.000đ',
      staffList: [
        { name: 'Lưu Quốc Nhật', hours: '14h', days: '1.8 ngày', unitPrice: '1.200.000đ', hasPrice: true, totalCost: '2.160.000đ' },
        { name: 'Cao Trường Thiên', hours: '10h', days: '1.3 ngày', unitPrice: '1.100.000đ', hasPrice: true, totalCost: '1.430.000đ' },
        { name: 'Nguyễn Quang Triệu', hours: '8h', days: '1.0 ngày', unitPrice: '1.250.000đ', hasPrice: true, totalCost: '1.250.000đ' }
      ]
    }
  ];

  return (
    <div className="space-y-4 text-xs animate-fade-in select-none max-h-[600px] overflow-y-auto pr-2 pb-8">
      {/* 1. TOP STAT CARD: TỔNG CHI PHÍ NHÂN CÔNG TOÀN DỰ ÁN */}
      <div className="bg-[#f8f9ff] border border-indigo-100/90 rounded-2xl p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4">
        <div>
          <span className="font-extrabold text-[11px] text-[#4f46e5]/80 uppercase tracking-wider block">
            TỔNG CHI PHÍ NHÂN CÔNG TOÀN DỰ ÁN
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#312e81] tracking-tight mt-1">
            121.569.880đ
          </h2>
        </div>

        <div className="text-right shrink-0">
          <span className="block text-xs font-semibold text-slate-500">9 phòng ban</span>
          <span className="block text-xs font-medium text-slate-400 mt-0.5">40 nhân sự</span>
        </div>
      </div>

      {/* 2. DEPARTMENT ACCORDION CARDS WITH COST TABLES */}
      <div className="space-y-3.5">
        {departments.map((dept) => {
          const isExpanded = expandedDepts.includes(dept.id);
          return (
            <div key={dept.id} className="bg-[#fcfdfe] border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
              {/* Accordion Header */}
              <div
                onClick={() => toggleDept(dept.id)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-100/60 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <IconChevronDown
                    size={16}
                    className={`text-slate-500 transition-transform duration-200 ${isExpanded ? '' : '-rotate-90'}`}
                  />
                  <h3 className="font-extrabold text-xs text-slate-900">
                    {dept.name}
                  </h3>
                  <span className="text-slate-400 font-normal text-xs">
                    ({dept.subText})
                  </span>
                </div>

                <div className="font-extrabold text-xs text-emerald-600">
                  {dept.totalCost}
                </div>
              </div>

              {/* Accordion Content Table */}
              {isExpanded && (
                <div className="bg-white border-t border-slate-100 p-4 pt-1">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2.5">
                          <th className="py-2.5 font-bold">NHÂN SỰ</th>
                          <th className="py-2.5 font-bold text-center">GIỜ KH</th>
                          <th className="py-2.5 font-bold text-center">NGÀY QUY ĐỔI</th>
                          <th className="py-2.5 font-bold text-right">ĐƠN GIÁ/NGÀY</th>
                          <th className="py-2.5 font-bold text-right">THÀNH TIỀN</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {dept.staffList.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-3 font-semibold text-slate-800">
                              {row.name}
                            </td>
                            <td className="py-3 text-center text-slate-700 font-medium">
                              {row.hours}
                            </td>
                            <td className="py-3 text-center text-slate-700 font-medium">
                              {row.days}
                            </td>
                            <td className="py-3 text-right">
                              {row.hasPrice ? (
                                <span className="font-medium text-slate-700">{row.unitPrice}</span>
                              ) : (
                                <span className="italic text-amber-600 font-medium">{row.unitPrice}</span>
                              )}
                            </td>
                            <td className="py-3 text-right font-bold text-emerald-600">
                              {row.totalCost}
                            </td>
                          </tr>
                        ))}

                        {/* Summary Footer Row */}
                        <tr className="font-bold border-t border-slate-200/90 bg-slate-50/40">
                          <td colSpan={4} className="py-3 text-right text-slate-500 font-bold">
                            Tổng {dept.name}:
                          </td>
                          <td className="py-3 text-right text-emerald-600 font-extrabold text-xs">
                            {dept.totalCost}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. SUMMARY TABLE CARD AT VERY BOTTOM: TỔNG HỢP CHI PHÍ THEO PHÒNG BAN */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs p-5 space-y-3">
        <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 tracking-tight">
          Tổng hợp chi phí theo phòng ban
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 bg-slate-50/50">
                <th className="py-2.5 px-4 font-bold">PHÒNG BAN</th>
                <th className="py-2.5 px-4 font-bold text-center">NHÂN SỰ</th>
                <th className="py-2.5 px-4 font-bold text-right">TỔNG GIỜ</th>
                <th className="py-2.5 px-4 font-bold text-right">CHI PHÍ</th>
                <th className="py-2.5 px-4 font-bold text-right">TỶ TRỌNG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Ban Giám đốc', staffCount: 4, hours: '16h', cost: '2.475.331đ', percent: '2.0%', barWidth: '2.0%' },
                { name: 'Khối Văn phòng', staffCount: 1, hours: '63h', cost: '7.982.612đ', percent: '6.6%', barWidth: '6.6%' },
                { name: 'Phòng Khai triển', staffCount: 8, hours: '349.5h', cost: '41.434.551đ', percent: '34.1%', barWidth: '34.1%' },
                { name: 'Phòng Cắt', staffCount: 6, hours: '272h', cost: '10.459.056đ', percent: '8.6%', barWidth: '8.6%' },
                { name: 'Phòng Ghép', staffCount: 7, hours: '544h', cost: '30.104.575đ', percent: '24.8%', barWidth: '24.8%' },
                { name: 'Phòng Mộc Sơn', staffCount: 3, hours: '40h', cost: '3.169.408đ', percent: '2.6%', barWidth: '2.6%' },
                { name: 'Phòng Điện', staffCount: 1, hours: '102h', cost: '9.548.756đ', percent: '7.9%', barWidth: '7.9%' },
                { name: 'Phòng Cảnh Quan', staffCount: 5, hours: '191h', cost: '12.763.029đ', percent: '10.5%', barWidth: '10.5%' },
                { name: 'Phòng Công nghệ và Thiết kế', staffCount: 5, hours: '48h', cost: '3.632.563đ', percent: '3.0%', barWidth: '3.0%' }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-slate-800">
                    {row.name}
                  </td>
                  <td className="py-2.5 px-4 text-center font-medium text-slate-700">
                    {row.staffCount}
                  </td>
                  <td className="py-2.5 px-4 text-right font-medium text-slate-700">
                    {row.hours}
                  </td>
                  <td className="py-2.5 px-4 text-right font-extrabold text-slate-900">
                    {row.cost}
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#4338ca] h-1.5 rounded-full" style={{ width: row.barWidth }} />
                      </div>
                      <span className="font-bold text-slate-700 text-xs w-10 text-right">{row.percent}</span>
                    </div>
                  </td>
                </tr>
              ))}

              {/* FOOTER TOTAL ROW */}
              <tr className="bg-slate-50/80 font-bold border-t border-slate-200">
                <td colSpan={3} className="py-3 px-4 text-right text-slate-900 font-extrabold">
                  Tổng cộng:
                </td>
                <td className="py-3 px-4 text-right text-[#4338ca] font-extrabold text-xs">
                  121.569.880đ
                </td>
                <td className="py-3 px-4 text-right text-slate-900 font-extrabold">
                  100%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FOOTNOTE NOTE */}
        <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic pt-1">
          * Chi phí tính theo công thức: <span className="font-semibold text-slate-500 not-italic">Giờ kế hoạch ÷ 8 × Đơn giá/ngày</span> từ bảng cấu hình mẫu nhân sự. Nhân sự chưa có đơn giá trong bảng cấu hình sẽ không được tính chi phí.
        </p>
      </div>
    </div>
  );
}
