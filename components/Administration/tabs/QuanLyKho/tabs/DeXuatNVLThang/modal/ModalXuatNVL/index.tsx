"use client";

import React, { useState, useEffect } from 'react';
import {
  IconX,
  IconPackage,
  IconPencil,
  IconTrash,
  IconArrowRight,
} from '@tabler/icons-react';
import { DeXuatNVLItem } from '../../index';

interface XuatKhoRow {
  maNVL: string;
  tenHang: string;
  dvt: string;
  duAn: string;
  slXuat: number;
}

interface BangXuatKho {
  id: string;
  ten: string;
  trangThai: string;
  slXuat: number;
  rows: XuatKhoRow[];
}

interface ModalXuatNVLProps {
  isOpen: boolean;
  item: DeXuatNVLItem | null;
  onClose: () => void;
  onSave: (itemId: string) => void;
}

const MOCK_BANG_XUAT: BangXuatKho[] = [
  {
    id: 'bxk-1',
    ten: 'Bảng xuất kho 1',
    trangThai: 'Đã xác nhận nhận',
    slXuat: 30,
    rows: [
      {
        maNVL: 'CON 90',
        tenHang: 'Cồn 90 độ vệ sinh resin',
        dvt: 'Lit',
        duAn: '31-2026/DA.01-MHV · CHỈNH SỬA',
        slXuat: 30,
      },
    ],
  },
];

export default function ModalXuatNVL({
  isOpen,
  item,
  onClose,
  onSave,
}: ModalXuatNVLProps) {
  const [bangXuat, setBangXuat] = useState<BangXuatKho[]>(MOCK_BANG_XUAT);

  useEffect(() => {
    if (isOpen) {
      setBangXuat(MOCK_BANG_XUAT);
    }
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const steps = [
    '1. Lập bảng',
    '2. QL KD duyệt',
    '3. Tạo Xuất kho',
    '4. Phòng ban nhận',
  ];

  const handleConfirm = () => {
    onSave(item.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* ── Header ── */}
        <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex items-start justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <IconPackage size={20} className="text-[#406c89] shrink-0" />
            <h3 className="text-[15px] font-bold text-slate-800">
              Xuất NVL {item.phongBan} — {item.thangNam}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* ── Stepper ── */}
        <div className="px-5 py-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {steps.map((step, idx) => (
              <React.Fragment key={step}>
                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                    idx === 0
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : idx === 1
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : idx === 2
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  }`}
                >
                  {step}
                </span>
                {idx < steps.length - 1 && (
                  <IconArrowRight size={12} className="text-slate-400 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-xs">

          {/* Nút Tạo bảng xuất kho */}
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#406c89] hover:bg-[#345973] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <IconPackage size={16} />
            <span>Tạo bảng Xuất kho {item.phongBan}</span>
          </button>

          {/* Danh sách bảng xuất kho */}
          <div>
            <p className="text-[11px] text-slate-500 mb-2">Danh sách bảng Xuất kho đã lập</p>

            <div className="space-y-3">
              {bangXuat.map((bang) => (
                <div
                  key={bang.id}
                  className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs"
                >
                  {/* Card header */}
                  <div className="px-3 py-2.5 flex items-center justify-between bg-slate-50/70 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800 text-xs">{bang.ten}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        {bang.trangThai}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <button type="button" className="p-1 hover:text-[#406c89] hover:bg-slate-100 rounded transition-colors cursor-pointer">
                        <IconPencil size={13} />
                      </button>
                      <button type="button" className="p-1 hover:text-rose-500 hover:bg-slate-100 rounded transition-colors cursor-pointer">
                        <IconTrash size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="px-3 py-1.5 text-[11px] text-slate-500 border-b border-slate-100">
                    SL xuất: <span className="font-bold text-slate-700">{bang.slXuat}</span>
                  </div>

                  {/* Table rows */}
                  <table className="w-full text-[11px] border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
                      <tr>
                        <th className="px-3 py-2 text-left w-24">Mã NVL</th>
                        <th className="px-3 py-2 text-left">Tên hàng</th>
                        <th className="px-3 py-2 text-center w-16">ĐVT</th>
                        <th className="px-3 py-2 text-center">Dự án · Chỉnh sửa</th>
                        <th className="px-3 py-2 text-center w-16">SL xuất</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {bang.rows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-3 py-2 font-mono text-slate-600">{row.maNVL}</td>
                          <td className="px-3 py-2 text-slate-700">{row.tenHang}</td>
                          <td className="px-3 py-2 text-center text-slate-600">{row.dvt}</td>
                          <td className="px-3 py-2 text-center text-slate-500">{row.duAn}</td>
                          <td className="px-3 py-2 text-center font-bold text-slate-800">{row.slXuat}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>

          {/* Phê duyệt */}
          <div>
            <p className="font-semibold text-slate-800 text-[13px] mb-2.5">
              Phê duyệt xuất NVL {item.thangNam}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Người lập */}
              <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/60">
                <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wide mb-1">Người lập</p>
                <p className="font-bold text-amber-900 text-xs">{item.nguoiLap || 'Nguyễn Mai Lâm'}</p>
                <p className="text-[10px] text-amber-600 mt-0.5">Ngày Xuất kho: {item.ngayLap || '09/10/2026'}</p>
              </div>

              {/* QL Kinh doanh */}
              <div className="p-3 rounded-lg border border-purple-200 bg-purple-50/60">
                <p className="text-[10px] font-bold text-purple-700 uppercase tracking-wide mb-1">QL Kinh doanh</p>
                <p className="font-bold text-purple-900 text-xs">Bùi Thị Duyên</p>
                <p className="text-[10px] text-purple-600 mt-0.5">Ngày duyệt: 09/10/2026</p>
              </div>

              {/* QL Phòng ban */}
              <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/60">
                <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide mb-1">QL Phòng ban</p>
                <p className="font-bold text-emerald-900 text-xs">Trần Diễm My</p>
                <p className="text-[10px] text-emerald-600 mt-0.5">Ngày nhận: 12/10/2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="px-5 py-3 border-t border-slate-100 flex justify-end gap-2 shrink-0 bg-slate-50/60">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#406c89] hover:bg-[#345973] rounded-lg transition-colors cursor-pointer"
          >
            Xác nhận xuất NVL
          </button>
        </div>
      </div>
    </div>
  );
}
