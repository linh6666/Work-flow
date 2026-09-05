"use client";

import React from 'react';

export interface TonKhoItem {
  ma: string;
  ten: string;
  nhom: string;
  dvt: string;
  ton: number;
  min: number;
  gia: number;
}

export const mockTonKho: TonKhoItem[] = [
  { ma: 'VT001', ten: 'Thép hộp 40x40',   nhom: 'Kim loại',              dvt: 'kg',    ton: 1250, min: 500,  gia: 18_500  },
  { ma: 'VT002', ten: 'Nhôm tấm 3mm',     nhom: 'Kim loại',              dvt: 'tấm',   ton: 84,   min: 20,   gia: 420_000 },
  { ma: 'VT003', ten: 'Sơn epoxy xám',    nhom: 'Sơn & hoá chất',        dvt: 'thùng', ton: 12,   min: 10,   gia: 680_000 },
  { ma: 'VT004', ten: 'Bu lông M10',      nhom: 'Kim loại',              dvt: 'cái',   ton: 3200, min: 1000, gia: 2_500   },
  { ma: 'VT005', ten: 'Dây điện 2.5mm',   nhom: 'Điện – điện tử',        dvt: 'cuộn',  ton: 45,   min: 10,   gia: 155_000 },
  { ma: 'VT006', ten: 'Ống PVC Ø27',      nhom: 'Gỗ & vật liệu xây dựng',dvt: 'cây',   ton: 8,    min: 20,   gia: 35_000  },
  { ma: 'VT007', ten: 'Gỗ ván ép 18mm',   nhom: 'Gỗ & vật liệu xây dựng',dvt: 'tấm',   ton: 130,  min: 30,   gia: 320_000 },
];

interface TonKhoProps {
  search?: string;
  nhom?: string;
}

export default function TonKho({ search = '', nhom = 'Tất cả nhóm hàng' }: TonKhoProps) {
  const filtered = mockTonKho.filter((row) => {
    const matchNhom = nhom === 'Tất cả nhóm hàng' || row.nhom === nhom;
    const matchSearch =
      row.ma.toLowerCase().includes(search.toLowerCase()) ||
      row.ten.toLowerCase().includes(search.toLowerCase()) ||
      row.nhom.toLowerCase().includes(search.toLowerCase());
    return matchNhom && matchSearch;
  });

  return (
    <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
      <div className="overflow-auto flex-1">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              {['Mã VT', 'Tên vật tư', 'Nhóm hàng', 'ĐVT', 'Tồn kho', 'Tồn tối thiểu', 'Đơn giá', 'Trạng thái'].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                  Không tìm thấy dữ liệu tồn kho phù hợp
                </td>
              </tr>
            ) : (
              filtered.map((v, i) => {
                const isLow = v.ton <= v.min;
                return (
                  <tr
                    key={v.ma}
                    className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${
                      i % 2 === 0 ? '' : 'bg-slate-50/30'
                    }`}
                  >
                    <td className="px-4 py-2.5 font-mono text-slate-500">{v.ma}</td>
                    <td className="px-4 py-2.5 font-semibold text-slate-700 whitespace-nowrap">{v.ten}</td>
                    <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{v.nhom}</td>
                    <td className="px-4 py-2.5 text-slate-500">{v.dvt}</td>
                    <td className={`px-4 py-2.5 font-bold text-right ${isLow ? 'text-red-500' : 'text-slate-700'}`}>
                      {v.ton.toLocaleString()}
                    </td>
                    <td className="px-4 py-2.5 text-slate-500 text-right">{v.min.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-slate-600 text-right">{v.gia.toLocaleString()}đ</td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          isLow ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                        }`}
                      >
                        {isLow ? '⚠ Sắp hết' : '✓ Đủ hàng'}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
