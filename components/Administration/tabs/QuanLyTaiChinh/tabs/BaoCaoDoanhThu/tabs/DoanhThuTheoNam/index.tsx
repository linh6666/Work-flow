"use client";

import React from 'react';

interface DoanhThuNamItem {
  nam: number | string;
  soDuAn: number;
  doanhThu: number;
  tyLe: string;
}

const DATA_DOANH_THU_NAM: DoanhThuNamItem[] = [
  { nam: 2013, soDuAn: 1, doanhThu: 344_397_000, tyLe: '0.3%' },
  { nam: 2014, soDuAn: 4, doanhThu: 10_514_714_000, tyLe: '9.8%' },
  { nam: 2015, soDuAn: 4, doanhThu: 1_333_442_000, tyLe: '1.2%' },
  { nam: 2017, soDuAn: 5, doanhThu: 8_348_997_106, tyLe: '7.8%' },
  { nam: 2018, soDuAn: 13, doanhThu: 13_500_971_197, tyLe: '12.6%' },
  { nam: 2019, soDuAn: 111, doanhThu: 37_656_529_960, tyLe: '35.0%' },
  { nam: 2020, soDuAn: 76, doanhThu: 13_720_859_064, tyLe: '12.8%' },
  { nam: 2021, soDuAn: 51, doanhThu: 22_052_449_425, tyLe: '20.5%' },
];

const formatVND = (val: number) => {
  return new Intl.NumberFormat('vi-VN').format(val) + ' đ';
};

interface DoanhThuTheoNamProps {
  selectedNam?: string;
}

export default function DoanhThuTheoNam({ selectedNam }: DoanhThuTheoNamProps) {
  const tongSoDuAn = DATA_DOANH_THU_NAM.reduce((acc, curr) => acc + curr.soDuAn, 0);
  const tongDoanhThu = DATA_DOANH_THU_NAM.reduce((acc, curr) => acc + curr.doanhThu, 0);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="bg-white border border-slate-200/90 rounded-xl shadow-2xs overflow-hidden flex flex-col">
        {/* Table Title */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <h3 className="text-xs font-bold text-slate-800">
            Doanh thu theo năm ký hợp đồng (DOANH THU)
          </h3>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 font-semibold">
                <th className="py-3 px-4 font-semibold text-slate-500">Năm</th>
                <th className="py-3 px-4 text-center font-semibold text-slate-500">Số dự án</th>
                <th className="py-3 px-4 text-right font-semibold text-emerald-600">Doanh thu</th>
                <th className="py-3 px-4 text-right font-semibold text-slate-500">Tỷ lệ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {DATA_DOANH_THU_NAM.map((row) => (
                <tr
                  key={row.nam}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="py-2.5 px-4 font-medium">{row.nam}</td>
                  <td className="py-2.5 px-4 text-center font-medium">{row.soDuAn}</td>
                  <td className="py-2.5 px-4 text-right font-medium text-emerald-600">
                    {formatVND(row.doanhThu)}
                  </td>
                  <td className="py-2.5 px-4 text-right font-medium text-slate-500">{row.tyLe}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-200 bg-slate-50/40 font-bold text-slate-800">
                <td className="py-3 px-4">Tổng</td>
                <td className="py-3 px-4 text-center">{tongSoDuAn}</td>
                <td className="py-3 px-4 text-right text-emerald-700">
                  {formatVND(tongDoanhThu)}
                </td>
                <td className="py-3 px-4 text-right text-slate-700">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
