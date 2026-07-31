"use client";

import React from 'react';
import { IconX, IconPencil } from '@tabler/icons-react';

export interface StaffDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  staffData: {
    stt: number;
    name: string;
    dept: string;
    cvLich: number;
    chuaTrienKhai: number;
    daBaoCao: number;
    chuaBaoCao: number;
    baoCaoTre: number;
    cvTre: number;
  } | null;
}

export default function ModalChiTietNhanSu({ isOpen, onClose, staffData }: StaffDetailModalProps) {
  if (!isOpen || !staffData) return null;

  // Sample tasks matching exact image reference
  const tasks = [
    {
      id: 1,
      name: 'PHÊ DUYỆT ĐỀ XUẤT BÁO GIÁ',
      startDate: '01-06',
      endDate: '01-06',
      isOverdueEnd: true,
      kh: '1',
      thucHien: '—',
      ht: '0%',
      dk: '100%',
      progressStatus: 'Quá hạn',
    },
    {
      id: 2,
      name: 'PHÊ DUYỆT BÁO GIÁ',
      startDate: '02-06',
      endDate: '02-06',
      isOverdueEnd: true,
      kh: '1',
      thucHien: '—',
      ht: '0%',
      dk: '100%',
      progressStatus: 'Quá hạn',
    },
    {
      id: 3,
      name: 'PHÊ DUYỆT HỢP ĐỒNG',
      startDate: '03-06',
      endDate: '03-06',
      isOverdueEnd: true,
      kh: '1',
      thucHien: '—',
      ht: '0%',
      dk: '100%',
      progressStatus: 'Quá hạn',
    },
    {
      id: 4,
      name: 'PHÊ DUYỆT BẢNG MẪU CÂY',
      startDate: '04-06',
      endDate: '04-06',
      isOverdueEnd: true,
      kh: '1',
      thucHien: '—',
      ht: '0%',
      dk: '100%',
      progressStatus: 'Quá hạn',
    },
    {
      id: 5,
      name: 'PHÊ DUYỆT BẢNG MẪU ÁNH SÁNG',
      startDate: '05-06',
      endDate: '05-06',
      isOverdueEnd: true,
      kh: '1',
      thucHien: '—',
      ht: '0%',
      dk: '100%',
      progressStatus: 'Quá hạn',
    },
    {
      id: 6,
      name: 'KỲ LỆNH XUẤT XƯỞNG MÔ HÌNH',
      startDate: '06-06',
      endDate: '—',
      isOverdueEnd: false,
      kh: '—',
      thucHien: '—',
      ht: '0%',
      dk: '—',
      progressStatus: 'dash',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-2 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden select-none font-sans">
        {/* MODAL HEADER */}
        <div className="px-3 sm:px-6 py-3 bg-[#f8fafc] border-b border-slate-200/90 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#edf4f9] text-[#2b5278] flex items-center justify-center font-extrabold text-xs sm:text-sm border border-[#2b5278]/20 shrink-0">
              {staffData.name.split(' ').pop()?.slice(0, 2).toUpperCase() || 'NS'}
            </div>
            <div className="min-w-0 truncate">
              <h3 className="font-extrabold text-xs sm:text-base text-slate-800 flex flex-wrap items-center gap-1.5 sm:gap-2 truncate">
                <span className="truncate">Chi tiết công việc - {staffData.name}</span>
                <span className="text-[10px] sm:text-xs font-semibold text-[#2b5278] bg-[#edf4f9] px-2 py-0.5 rounded-full shrink-0">
                  {staffData.dept}
                </span>
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-all cursor-pointer shrink-0"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* MODAL TABLE AREA WITH RESPONSIVE SWIPE SCROLL */}
        <div className="flex-1 overflow-auto p-2 sm:p-5 bg-white">
          <table className="w-full text-left text-xs border-collapse min-w-[680px]">
            <thead>
              <tr className="bg-[#f8fafc] text-slate-600 font-bold border-b border-slate-200/90 text-xs">
                <th className="py-2.5 px-3 min-w-[200px]">Công việc</th>
                <th className="py-2.5 px-2 text-center min-w-[65px]">Bắt đầu</th>
                <th className="py-2.5 px-2 text-center min-w-[65px]">Kết thúc</th>
                <th className="py-2.5 px-2 text-center min-w-[45px]">KH</th>
                <th className="py-2.5 px-2 text-center min-w-[65px]">Thực hiện</th>
                <th className="py-2.5 px-2 text-center min-w-[55px]">%HT</th>
                <th className="py-2.5 px-2 text-center min-w-[55px]">%ĐK</th>
                <th className="py-2.5 px-3 text-center min-w-[85px]">Tiến độ</th>
                <th className="py-2.5 px-3 text-center min-w-[110px]">Báo cáo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tasks.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* CÔNG VIỆC */}
                  <td className="py-3.5 px-4 font-bold text-slate-800 uppercase text-[11px]">
                    {t.name}
                  </td>

                  {/* BẮT ĐẦU */}
                  <td className="py-3.5 px-3 text-center text-slate-400 font-medium">
                    {t.startDate}
                  </td>

                  {/* KẾT THÚC */}
                  <td className="py-3.5 px-3 text-center">
                    {t.isOverdueEnd ? (
                      <span className="font-bold text-rose-600">{t.endDate}</span>
                    ) : (
                      <span className="text-slate-400 font-medium">{t.endDate}</span>
                    )}
                  </td>

                  {/* KH */}
                  <td className="py-3.5 px-3 text-center text-slate-400 font-medium">
                    {t.kh}
                  </td>

                  {/* THỰC HIỆN */}
                  <td className="py-3.5 px-3 text-center text-slate-400 font-medium">
                    {t.thucHien}
                  </td>

                  {/* %HT */}
                  <td className="py-3.5 px-3 text-center font-bold text-indigo-600">
                    {t.ht}
                  </td>

                  {/* %ĐK */}
                  <td className="py-3.5 px-3 text-center text-slate-400 font-medium">
                    {t.dk}
                  </td>

                  {/* TIẾN ĐỘ */}
                  <td className="py-3.5 px-4 text-center">
                    {t.progressStatus === 'Quá hạn' ? (
                      <span className="inline-block bg-rose-50 text-rose-500 border border-rose-200/90 px-3 py-0.5 rounded-full text-xs font-semibold">
                        Quá hạn
                      </span>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 text-xs font-bold mx-auto">
                        —
                      </div>
                    )}
                  </td>

                  {/* BÁO CÁO */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* CHƯA BÁO BUTTON BADGE */}
                      <div className="bg-[#fff0f0] border border-[#fecaca] text-[#dc2626] rounded-md px-2 py-1 text-[11px] font-semibold flex items-center gap-1 text-center leading-tight">
                        <IconX size={12} className="shrink-0 text-[#dc2626]" />
                        <span className="flex flex-col text-[10px] font-bold leading-tight">
                          <span>Chưa</span>
                          <span>báo</span>
                        </span>
                      </div>

                      {/* EDIT PENCIL BUTTON */}
                      <button
                        type="button"
                        className="bg-[#fffbeb] border border-[#fde68a] text-[#b45309] hover:bg-[#fef3c7] p-2 rounded-md transition-colors cursor-pointer flex items-center justify-center"
                        title="Cập nhật báo cáo"
                      >
                        <IconPencil size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-3 bg-[#f8fafc] border-t border-slate-200/90 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300/80 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
