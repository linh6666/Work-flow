"use client";

import React from 'react';

interface LoaiDAItem {
  kiHieu: string;
  phanLoai: string;
  soDuAn: number;
  doanhThu: number;
  doanhThuStr: string;
  tyLe: string;
}

const DATA_LOAI_DA: LoaiDAItem[] = [
  {
    kiHieu: 'QH',
    phanLoai: 'Quy hoạch',
    soDuAn: 29,
    doanhThu: 12_186_411_908.455,
    doanhThuStr: '12.186.411.908,455 đ',
    tyLe: '16.2%',
  },
  {
    kiHieu: 'CT',
    phanLoai: 'Công trình',
    soDuAn: 16,
    doanhThu: 4_576_136_220,
    doanhThuStr: '4.576.136.220 đ',
    tyLe: '6.1%',
  },
  {
    kiHieu: 'BT',
    phanLoai: 'Biệt thự',
    soDuAn: 19,
    doanhThu: 3_078_105_612.8,
    doanhThuStr: '3.078.105.612,8 đ',
    tyLe: '4.1%',
  },
  {
    kiHieu: 'CS',
    phanLoai: 'Chỉnh sửa',
    soDuAn: 72,
    doanhThu: 3_499_548_100,
    doanhThuStr: '3.499.548.100 đ',
    tyLe: '4.6%',
  },
  {
    kiHieu: 'KH',
    phanLoai: 'Khác',
    soDuAn: 129,
    doanhThu: 51_978_651_863,
    doanhThuStr: '51.978.651.863 đ',
    tyLe: '69.0%',
  },
];

interface DoanhThuTheoLoaiDAProps {
  selectedNam?: string;
}

export default function DoanhThuTheoLoaiDA({ selectedNam }: DoanhThuTheoLoaiDAProps) {
  const tongSoDuAn = 265;
  const tongDoanhThuStr = '75.318.853.704,255 đ';

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="bg-white border border-slate-200/90 rounded-xl shadow-2xs overflow-hidden flex flex-col">
        {/* Table Title */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <h3 className="text-xs font-bold text-slate-800">
            Doanh thu theo phân loại dự án (DOANH THU THEO LOẠI DỰ ÁN)
          </h3>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 font-semibold">
                <th className="py-3 px-4 font-semibold text-slate-500">Kí hiệu</th>
                <th className="py-3 px-4 font-semibold text-slate-500">Phân loại dự án</th>
                <th className="py-3 px-4 text-center font-semibold text-slate-500">Số dự án</th>
                <th className="py-3 px-4 text-right font-semibold text-emerald-600">Doanh thu</th>
                <th className="py-3 px-4 text-right font-semibold text-slate-500">Tỷ lệ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {DATA_LOAI_DA.map((row) => (
                <tr
                  key={row.kiHieu}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="py-2.5 px-4 font-medium">{row.kiHieu}</td>
                  <td className="py-2.5 px-4 font-medium">{row.phanLoai}</td>
                  <td className="py-2.5 px-4 text-center font-medium">{row.soDuAn}</td>
                  <td className="py-2.5 px-4 text-right font-medium text-emerald-600">
                    {row.doanhThuStr}
                  </td>
                  <td className="py-2.5 px-4 text-right font-medium text-slate-500">{row.tyLe}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-200 bg-slate-50/40 font-bold text-slate-800">
                <td className="py-3 px-4">Tổng</td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4 text-center">{tongSoDuAn}</td>
                <td className="py-3 px-4 text-right text-emerald-700">
                  {tongDoanhThuStr}
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
