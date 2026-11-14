"use client";

import React, { useMemo } from 'react';
import {
  IconX,
} from '@tabler/icons-react';
import { ReportItem } from '../../types';

interface ChiTietBaoCaoModalProps {
  item: {
    projectName: string;
    report: ReportItem;
  } | null;
  onClose: () => void;
}

interface TaskDetailItem {
  id: string;
  category: string;
  title: string;
  quantity: number | string;
  hours: string;
  progressPct: string;
  status: 'Hoàn thành' | 'Đang thực hiện' | 'Chờ duyệt';
}

export default function ChiTietBaoCaoModal({
  item,
  onClose,
}: ChiTietBaoCaoModalProps) {
  if (!item) return null;

  const { projectName, report } = item;

  // Danh sách chi tiết các công việc theo phòng ban (mặc định khớp ảnh 100%)
  const tasks: TaskDetailItem[] = useMemo(() => {
    if (report.department === 'Ban Giám đốc') {
      return [
        { id: 't1', category: 'khởi tạo và phê duyệt', title: 'PHÊ DUYỆT ĐỀ XUẤT BÁO GIÁ', quantity: 20, hours: '2h', progressPct: '100%', status: 'Hoàn thành' },
        { id: 't2', category: 'khởi tạo và phê duyệt', title: 'PHÊ DUYỆT BÁO GIÁ', quantity: 10, hours: '1h', progressPct: '100%', status: 'Hoàn thành' },
        { id: 't3', category: 'khởi tạo và phê duyệt', title: 'PHÊ DUYỆT HỢP ĐỒNG', quantity: 10, hours: '1h', progressPct: '100%', status: 'Hoàn thành' },
        { id: 't4', category: 'khởi tạo và phê duyệt', title: 'PHÊ DUYỆT BẢN VẼ XÁC NHẬN VỚI KHÁCH HÀNG', quantity: 10, hours: '1h', progressPct: '100%', status: 'Hoàn thành' },
        { id: 't5', category: 'khởi tạo và phê duyệt', title: 'PHÊ DUYỆT KẾ HOẠCH TRIỂN KHAI DỰ ÁN', quantity: 15, hours: '2h', progressPct: '100%', status: 'Hoàn thành' },
        { id: 't6', category: 'khởi tạo và phê duyệt', title: 'PHÊ DUYỆT DANH SÁCH NHÂN SỰ DỰ ÁN', quantity: 8, hours: '1h', progressPct: '100%', status: 'Hoàn thành' },
        { id: 't7', category: 'khởi tạo và phê duyệt', title: 'PHÊ DUYỆT ĐỀ XUẤT MUA SẮM VẬT TƯ ĐẶC BIỆT', quantity: 12, hours: '2h', progressPct: '100%', status: 'Hoàn thành' },
        { id: 't8', category: 'quản lý & điều hành', title: 'THEO DÕI TIẾN ĐỘ THI CÔNG TUẦN 1 & 2', quantity: 14, hours: '2h', progressPct: '100%', status: 'Hoàn thành' },
        { id: 't9', category: 'quản lý & điều hành', title: 'CHỈ ĐẠO GIẢI QUYẾT PHÁT SINH THIẾT KẾ', quantity: 10, hours: '1.5h', progressPct: '100%', status: 'Hoàn thành' },
        { id: 't10', category: 'quản lý & điều hành', title: 'HỌP GIAO BAN ĐIỀU PHỐI LIÊN PHÒNG BAN', quantity: 16, hours: '2h', progressPct: '100%', status: 'Hoàn thành' },
        { id: 't11', category: 'kiểm tra chất lượng', title: 'ĐÁNH GIÁ MẪU CẮT CNC ĐẦU TIÊN', quantity: 10, hours: '1h', progressPct: '100%', status: 'Hoàn thành' },
        { id: 't12', category: 'kiểm tra chất lượng', title: 'KIỂM TRA MẪU MÀU SƠN VÀ ĐỘ BÓNG MÔ HÌNH', quantity: 8, hours: '1h', progressPct: '100%', status: 'Hoàn thành' },
        { id: 't13', category: 'nghiệm thu giai đoạn', title: 'NGHIỆM THU NỘI BỘ PHÂN ĐOẠN 1 (50%)', quantity: 15, hours: '2h', progressPct: '100%', status: 'Hoàn thành' },
        { id: 't14', category: 'nghiệm thu giai đoạn', title: 'ĐÁNH GIÁ RÀNG BUỘC KỸ THUẬT PHÒNG ĐIỆN & CẢNH QUAN', quantity: 10, hours: '1h', progressPct: '100%', status: 'Hoàn thành' },
        { id: 't15', category: 'nghiệm thu giai đoạn', title: 'XÁC NHẬN MỐC NGHIỆM THU 80% DỰ ÁN', quantity: 20, hours: '2h', progressPct: '100%', status: 'Hoàn thành' },
        { id: 't16', category: 'bàn giao & lưu trữ', title: 'TỔNG HỢP HỒ SƠ NGHIỆM THU 80%', quantity: 10, hours: '1.5h', progressPct: '100%', status: 'Hoàn thành' },
      ];
    }

    // Với các phòng ban khác, sinh dữ liệu thực tế tương ứng
    return [
      { id: 't1', category: 'chuẩn bị & bóc tách', title: `BÓC TÁCH KHỐI LƯỢNG HẠNG MỤC ${report.department.toUpperCase()}`, quantity: 25, hours: '12h', progressPct: '100%', status: 'Hoàn thành' },
      { id: 't2', category: 'gia công chế tạo', title: `GIA CÔNG CHI TIẾT KỸ THUẬT ĐỢT 1`, quantity: 120, hours: '35h', progressPct: '100%', status: 'Hoàn thành' },
      { id: 't3', category: 'gia công chế tạo', title: `GIA CÔNG LẮP RÁP HẠNG MỤC CHÍNH`, quantity: 85, hours: '40h', progressPct: '100%', status: 'Hoàn thành' },
      { id: 't4', category: 'lắp ghép & hoàn thiện', title: `XỬ LÝ MỐI NỐI VÀ TẠO BỀ MẶT`, quantity: 45, hours: '28h', progressPct: '100%', status: 'Hoàn thành' },
      { id: 't5', category: 'nghiệm thu', title: `NGHIỆM THU MỐC 80% ${report.department.toUpperCase()}`, quantity: 20, hours: '15h', progressPct: '100%', status: 'Hoàn thành' },
    ];
  }, [report.department]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Hoàn thành').length;

  return (
    <div
      className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150 select-none font-sans"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white shrink-0">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Nội dung báo cáo — Báo cáo nghiệm thu 80% · {report.department}
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 min-h-0 no-scrollbar bg-white">
          
          {/* ── BOX 1: BÁO CÁO HOÀN THÀNH HẠNG MỤC ── */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 shadow-2xs space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              BÁO CÁO HOÀN THÀNH HẠNG MỤC
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
              {projectName}
            </h2>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-600 pt-1">
              <span>
                <span className="text-slate-400 font-normal">Mốc: </span>
                <strong className="text-slate-800 font-bold">80%</strong>
              </span>
              <span>
                <span className="text-slate-400 font-normal">Phòng: </span>
                <strong className="text-slate-800 font-bold">{report.department}</strong>
              </span>
              <span>
                <span className="text-slate-400 font-normal">Người lập: </span>
                <strong className="text-slate-800 font-bold">{report.reporter}</strong>
              </span>
              <span>
                <span className="text-slate-400 font-normal">Ngày lập: </span>
                <strong className="text-slate-800 font-bold">{report.date}</strong>
              </span>
            </div>
          </div>

          {/* ── BOX 2: 4 THẺ METRICS (TỔNG HẠNG MỤC, HOÀN THÀNH, TỔNG GIỜ TT, %HT TB) ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* 1. Tổng hạng mục */}
            <div className="bg-[#f5f6ff] border border-[#dcdffd] rounded-xl p-3.5 shadow-2xs">
              <span className="text-[11px] font-bold text-[#4338ca] uppercase tracking-wide block">
                TỔNG HẠNG MỤC
              </span>
              <span className="text-2xl font-black text-[#4338ca] mt-0.5 block">
                {totalTasks}
              </span>
            </div>

            {/* 2. Hoàn thành */}
            <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-3.5 shadow-2xs">
              <span className="text-[11px] font-bold text-[#15803d] uppercase tracking-wide block">
                HOÀN THÀNH
              </span>
              <span className="text-2xl font-black text-[#15803d] mt-0.5 block">
                {completedTasks}/{totalTasks}
              </span>
            </div>

            {/* 3. Tổng giờ TT */}
            <div className="bg-[#fefce8] border border-[#fef08a] rounded-xl p-3.5 shadow-2xs">
              <span className="text-[11px] font-bold text-[#b45309] uppercase tracking-wide block">
                TỔNG GIỜ TT
              </span>
              <span className="text-2xl font-black text-[#b45309] mt-0.5 block">
                {report.hours}
              </span>
            </div>

            {/* 4. %HT TB */}
            <div className="bg-[#faf5ff] border border-[#e9d5ff] rounded-xl p-3.5 shadow-2xs">
              <span className="text-[11px] font-bold text-[#7c3aed] uppercase tracking-wide block">
                %HT TB
              </span>
              <span className="text-2xl font-black text-[#7c3aed] mt-0.5 block">
                {report.progressPct}
              </span>
            </div>
          </div>

          {/* ── BOX 3: 2 THẺ TÓM TẮT (TÓM TẮT KHỐI LƯỢNG & TÓM TẮT CHẤT LƯỢNG) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Tóm tắt khối lượng */}
            <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-3.5 shadow-2xs">
              <span className="text-xs font-bold text-[#15803d] block">
                Tóm tắt khối lượng
              </span>
              <span className="text-xs text-slate-700 mt-0.5 block">
                Đã hoàn thành
              </span>
            </div>

            {/* Tóm tắt chất lượng */}
            <div className="bg-[#f5f6ff] border border-[#dcdffd] rounded-xl p-3.5 shadow-2xs">
              <span className="text-xs font-bold text-[#4338ca] block">
                Tóm tắt chất lượng
              </span>
              <span className="text-xs text-slate-700 mt-0.5 block">
                Đạt yêu cầu
              </span>
            </div>
          </div>

          {/* ── BOX 4: BẢNG DANH MỤC KHỐI LƯỢNG ĐÃ THỰC HIỆN ── */}
          <div className="bg-white border border-slate-200/90 rounded-xl shadow-2xs overflow-hidden">
            <div className="p-3.5 pb-2.5">
              <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight">
                Danh mục khối lượng đã thực hiện
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse min-w-[650px]">
                <thead className="border-b border-slate-100 bg-white">
                  <tr className="text-slate-400 font-semibold text-xs">
                    <th className="py-2.5 px-4 font-semibold">Hạng mục</th>
                    <th className="py-2.5 px-3 text-center font-semibold whitespace-nowrap">
                      KL thực hiện
                    </th>
                    <th className="py-2.5 px-3 text-center font-semibold whitespace-nowrap">
                      Giờ TT
                    </th>
                    <th className="py-2.5 px-3 text-center font-semibold whitespace-nowrap">
                      %HT
                    </th>
                    <th className="py-2.5 px-4 text-center font-semibold whitespace-nowrap">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Hạng mục */}
                      <td className="py-3 px-4 text-slate-800">
                        <span className="text-slate-400 text-xs font-normal mr-1">
                          [{task.category} ]
                        </span>
                        <span className="font-bold text-xs uppercase tracking-tight text-slate-800">
                          {task.title}
                        </span>
                      </td>

                      {/* KL thực hiện */}
                      <td className="py-3 px-3 text-center font-bold text-[#059669]">
                        {task.quantity}
                      </td>

                      {/* Giờ TT */}
                      <td className="py-3 px-3 text-center font-bold text-[#d97706]">
                        {task.hours}
                      </td>

                      {/* %HT */}
                      <td className="py-3 px-3 text-center font-extrabold text-[#4f46e5]">
                        {task.progressPct}
                      </td>

                      {/* Trạng thái */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#dcfce7] text-[#15803d]">
                          {task.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end px-6 py-3 border-t border-slate-100 bg-white shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-md text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
