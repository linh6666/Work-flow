"use client";

import React from 'react';

export interface NhapKhoItem {
  ma: string;
  ten: string;
  nhom: string;
  dvt: string;
  so_luong: number;
  don_gia: number;
  thanh_tien: number;
  ncc: string;
  du_an: string;
  ngay: string;
}

export const mockNhapKho: NhapKhoItem[] = [
  { ma: 'VT001', ten: 'Thép hộp 40x40',   nhom: 'Kim loại',              dvt: 'kg',    so_luong: 500,  don_gia: 18_500,  thanh_tien: 9_250_000,  ncc: 'Thép Miền Nam',  du_an: 'DA-HN-01', ngay: '2026-08-10' },
  { ma: 'VT002', ten: 'Nhôm tấm 3mm',     nhom: 'Kim loại',              dvt: 'tấm',   so_luong: 30,   don_gia: 420_000, thanh_tien: 12_600_000, ncc: 'Nhôm Việt Pháp', du_an: 'DA-HCM-02', ngay: '2026-08-12' },
  { ma: 'VT003', ten: 'Sơn epoxy xám',    nhom: 'Sơn & hoá chất',        dvt: 'thùng', so_luong: 5,    don_gia: 680_000, thanh_tien: 3_400_000,  ncc: 'Bạch Tuyết',     du_an: 'DA-HN-01', ngay: '2026-08-14' },
  { ma: 'VT004', ten: 'Bu lông M10',      nhom: 'Kim loại',              dvt: 'cái',   so_luong: 1000, don_gia: 2_500,   thanh_tien: 2_500_000,  ncc: 'Thiết bị HP',    du_an: 'DA-DN-03', ngay: '2026-08-15' },
  { ma: 'VT005', ten: 'Dây điện 2.5mm',   nhom: 'Điện – điện tử',        dvt: 'cuộn',  so_luong: 20,   don_gia: 155_000, thanh_tien: 3_100_000,  ncc: 'Cadivi',         du_an: 'DA-HCM-02', ngay: '2026-08-16' },
  { ma: 'VT006', ten: 'Gỗ ván ép 18mm',   nhom: 'Gỗ & vật liệu xây dựng', dvt: 'tấm', so_luong: 50,  don_gia: 320_000, thanh_tien: 16_000_000, ncc: 'Gỗ Thuận Phát',  du_an: 'DA-DN-03', ngay: '2026-08-18' },
];

interface NhapKhoProps {
  search?: string;
  nhom?: string;
}

export default function NhapKho({ search = '', nhom = 'Tất cả nhóm hàng' }: NhapKhoProps) {
  const filtered = mockNhapKho.filter((row) => {
    const matchNhom = nhom === 'Tất cả nhóm hàng' || row.nhom === nhom;
    const matchSearch =
      row.ma.toLowerCase().includes(search.toLowerCase()) ||
      row.ten.toLowerCase().includes(search.toLowerCase()) ||
      row.nhom.toLowerCase().includes(search.toLowerCase()) ||
      row.ncc.toLowerCase().includes(search.toLowerCase()) ||
      row.du_an.toLowerCase().includes(search.toLowerCase());
    return matchNhom && matchSearch;
  });

  return (
    <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
      <div className="overflow-auto flex-1">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              {['Mã VT', 'Tên vật tư', 'Nhóm hàng', 'ĐVT', 'Số lượng', 'Đơn giá', 'Thành tiền', 'NCC', 'Dự án', 'Ngày nhập'].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-8 text-center text-slate-400">
                  Không tìm thấy dữ liệu nhập kho phù hợp
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
                  <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{v.ncc}</td>
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
