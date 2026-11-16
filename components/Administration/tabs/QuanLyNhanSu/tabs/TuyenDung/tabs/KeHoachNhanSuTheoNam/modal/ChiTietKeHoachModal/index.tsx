"use client";

import React from 'react';
import {
  IconX,
  IconClipboardList,
  IconCalendar,
  IconUser,
  IconCash,
  IconBriefcase,
  IconChecklist,
  IconDownload,
} from '@tabler/icons-react';
import { YearlyPlanRow } from '../../types';

interface ChiTietKeHoachModalProps {
  isOpen: boolean;
  item: YearlyPlanRow | null;
  onClose: () => void;
}

export default function ChiTietKeHoachModal({
  isOpen,
  item,
  onClose,
}: ChiTietKeHoachModalProps) {
  if (!isOpen || !item) return null;

  const defaultDetails = [
    { phongBan: 'Phòng Khai triển', chucDanh: 'Kỹ sư Khai triển 3D', soLuong: 4, duToan: '8.500.000', thoiGianCan: 'Quý I/2026', lyDo: 'Mở rộng dự án mới' },
    { phongBan: 'Phòng Mộc Sơn', chucDanh: 'Thợ sơn hoàn thiện', soLuong: 4, duToan: '7.200.000', thoiGianCan: 'Quý II/2026', lyDo: 'Tăng tải xưởng sản xuất' },
    { phongBan: 'Phòng Cảnh Quan', chucDanh: 'Chuyên viên Cảnh quan', soLuong: 2, duToan: '4.800.000', thoiGianCan: 'Quý II/2026', lyDo: 'Bổ sung chuyên viên' },
    { phongBan: 'Phòng Kinh doanh', chucDanh: 'Chuyên viên Kinh doanh dự án', soLuong: 5, duToan: '11.000.000', thoiGianCan: 'Quý I/2026', lyDo: 'Phát triển thị trường miền Bắc' },
    { phongBan: 'Phòng Điện', chucDanh: 'Kỹ sư Chiếu sáng LED', soLuong: 1, duToan: '4.700.000', thoiGianCan: 'Quý I/2026', lyDo: 'Bổ sung dự phòng' },
  ];

  const positions = item.chiTietCacViTri || defaultDetails;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#244b62] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <IconClipboardList size={20} />
            <h3 className="font-bold text-sm">
              Chi tiết Kế hoạch Nhân sự — {item.nam}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Info Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
              <span className="text-[11px] text-slate-500 font-medium">Năm áp dụng</span>
              <p className="text-sm font-bold text-[#406c89] mt-0.5">{item.nam}</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
              <span className="text-[11px] text-slate-500 font-medium">Người lập</span>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{item.nguoiLap}</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
              <span className="text-[11px] text-slate-500 font-medium">Ngày lập</span>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{item.ngayLap}</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
              <span className="text-[11px] text-slate-500 font-medium">Trạng thái</span>
              <div className="mt-0.5">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-medium bg-[#fef9c3] text-[#a16207] border border-[#fef08a]">
                  {item.trangThai}
                </span>
              </div>
            </div>
          </div>

          {/* Budget & Target Overview */}
          <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl flex items-center justify-between flex-wrap gap-3">
            <div>
              <span className="text-xs text-slate-500 font-medium">Tổng số vị trí dự kiến tuyển dụng:</span>
              <span className="text-base font-bold text-blue-700 ml-2">{item.viTriTuyenDung} chỉ tiêu</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Tổng chi phí dự kiến:</span>
              <span className="text-base font-bold text-emerald-700 ml-2">{item.tongChiPhi} VNĐ</span>
            </div>
          </div>

          {/* Breakdown Table */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <IconChecklist size={15} className="text-[#406c89]" />
              <span>Danh sách các vị trí chức danh cần tuyển</span>
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#f8fafc] text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3 w-10 text-center">STT</th>
                    <th className="py-2.5 px-3">PHÒNG BAN</th>
                    <th className="py-2.5 px-3">CHỨC DANH</th>
                    <th className="py-2.5 px-3 text-center">SỐ LƯỢNG</th>
                    <th className="py-2.5 px-3 text-right">DỰ TOÁN (VNĐ)</th>
                    <th className="py-2.5 px-3 text-center">THỜI HẠN</th>
                    <th className="py-2.5 px-3">LÝ DO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {positions.map((pos, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3 text-center text-slate-400 font-medium">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-800">{pos.phongBan}</td>
                      <td className="py-2.5 px-3 text-slate-700">{pos.chucDanh}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-blue-600">{pos.soLuong}</td>
                      <td className="py-2.5 px-3 text-right font-medium text-slate-700">{pos.duToan}</td>
                      <td className="py-2.5 px-3 text-center text-slate-600">{pos.thoiGianCan}</td>
                      <td className="py-2.5 px-3 text-slate-500 text-[11.5px]">{pos.lyDo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer transition"
          >
            <IconDownload size={15} />
            <span>Tải bản in PDF</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
