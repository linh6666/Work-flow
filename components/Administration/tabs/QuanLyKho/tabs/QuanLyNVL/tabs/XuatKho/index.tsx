"use client";

import React from 'react';

export interface XuatKhoItem {
  ma: string;
  ten: string;
  nhom: string;
  dvt: string;
  so_luong: number;
  don_gia: number;
  thanh_tien: number;
  du_an: string;
  ngay: string;
}

export const mockXuatKho: XuatKhoItem[] = [
  { ma: 'VT001', ten: 'Thép hộp 40x40',   nhom: 'Kim loại',   dvt: 'kg',    so_luong: 200, don_gia: 18_500,  thanh_tien: 3_700_000,  du_an: 'DA-HN-01',  ngay: '2026-08-11' },
  { ma: 'VT003', ten: 'Sơn epoxy xám',    nhom: 'Sơn & hoá chất', dvt: 'thùng', so_luong: 3, don_gia: 680_000, thanh_tien: 2_040_000, du_an: 'DA-HN-01',  ngay: '2026-08-13' },
  { ma: 'VT005', ten: 'Dây điện 2.5mm',   nhom: 'Điện – điện tử', dvt: 'cuộn', so_luong: 10, don_gia: 155_000, thanh_tien: 1_550_000, du_an: 'DA-HCM-02', ngay: '2026-08-17' },
];

interface XuatKhoProps {
  search?: string;
  nhom?: string;
}

export default function XuatKho({ search = '', nhom = 'Tất cả nhóm hàng' }: XuatKhoProps) {
  const filtered = mockXuatKho.filter((row) => {
    const matchNhom = nhom === 'Tất cả nhóm hàng' || row.nhom === nhom;
    const matchSearch =
      row.ma.toLowerCase().includes(search.toLowerCase()) ||
      row.ten.toLowerCase().includes(search.toLowerCase()) ||
      row.nhom.toLowerCase().includes(search.toLowerCase()) ||
      row.du_an.toLowerCase().includes(search.toLowerCase());
    return matchNhom && matchSearch;
  });

  return (
    <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
      <div className="overflow-auto flex-1">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              {['Mã VT', 'Tên vật tư', 'Nhóm hàng', 'ĐVT', 'Số lượng', 'Đơn giá', 'Thành tiền', 'Dự án', 'Ngày xuất'].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-slate-400">
                  Không tìm thấy dữ liệu xuất kho phù hợp
                </td>
              </tr>
            ) : (
              filtered.map((v, i) => (
                <tr
                  key={`${v.ma}-${i}`}
                  className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${
                    i % 2 === 0 ? '' : 'bg-slate-50/30'
                  }`}
                >
                  <td className="px-4 py-2.5 font-mono text-slate-500">{v.ma}</td>
                  <td className="px-4 py-2.5 font-semibold text-slate-700 whitespace-nowrap">{v.ten}</td>
                  <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{v.nhom}</td>
                  <td className="px-4 py-2.5 text-slate-500">{v.dvt}</td>
                  <td className="px-4 py-2.5 font-medium text-slate-700 text-right">{v.so_luong.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-slate-600 text-right">{v.don_gia.toLocaleString()}đ</td>
                  <td className="px-4 py-2.5 font-bold text-slate-700 text-right">{v.thanh_tien.toLocaleString()}đ</td>
                  <td className="px-4 py-2.5 text-[#406c89] font-medium">{v.du_an}</td>
                  <td className="px-4 py-2.5 text-slate-400">{v.ngay}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
