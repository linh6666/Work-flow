"use client";

import React from 'react';
import { IconX, IconEye } from '@tabler/icons-react';
import { GioTTStaffRow } from '../../index';

interface ChiTietGioTTModalProps {
  item: GioTTStaffRow | null;
  onClose: () => void;
}

interface DailyTaskLog {
  id: number;
  dauViec: string;
  duAn: string;
  gioTT: string;
  gioDK: string;
  trangThai: string;
  gioBao: string;
}

interface DailyGroup {
  date: string;
  tongGioTT: string;
  chenhText: string;
  isNegative?: boolean;
  tasks: DailyTaskLog[];
}

const SAMPLE_DAILY_GROUPS: DailyGroup[] = [
  {
    date: '28/11/2026',
    tongGioTT: '10h',
    chenhText: 'Chênh +2h so với chuẩn 8h',
    tasks: [
      { id: 1, dauViec: 'IN NGƯỜI 3D - NGÀY 3', duAn: 'NHÓM NHÀ Ở ĐÔNG NAM ĐƯỜNG TỐ HỮU', gioTT: '8h', gioDK: '8h', trangThai: 'Hoàn thành', gioBao: '09:23' },
      { id: 2, dauViec: 'HỌP ONLINE VỚI KHÁCH HÀNG', duAn: 'NHÓM NHÀ Ở ĐÔNG NAM ĐƯỜNG TỐ HỮU', gioTT: '2h', gioDK: '2h', trangThai: 'Hoàn thành', gioBao: '09:26' },
    ],
  },
  {
    date: '26/11/2026',
    tongGioTT: '12h',
    chenhText: 'Chênh +4h so với chuẩn 8h',
    tasks: [
      { id: 1, dauViec: 'HỌP TIẾN ĐỘ DỰ ÁN', duAn: 'NHÓM NHÀ Ở ĐÔNG NAM ĐƯỜNG TỐ HỮU', gioTT: '2h', gioDK: '2h', trangThai: 'Hoàn thành', gioBao: '22:27' },
      { id: 2, dauViec: 'IN NGƯỜI 3D - NGÀY 2', duAn: 'NHÓM NHÀ Ở ĐÔNG NAM ĐƯỜNG TỐ HỮU', gioTT: '10h', gioDK: '10h', trangThai: 'Hoàn thành', gioBao: '22:30' },
    ],
  },
  {
    date: '25/11/2026',
    tongGioTT: '12h',
    chenhText: 'Chênh +4h so với chuẩn 8h',
    tasks: [
      { id: 1, dauViec: 'IN NGƯỜI 3D - NGÀY 1', duAn: 'NHÓM NHÀ Ở ĐÔNG NAM ĐƯỜNG TỐ HỮU', gioTT: '10h', gioDK: '10h', trangThai: 'Hoàn thành', gioBao: '22:25' },
      { id: 2, dauViec: 'HỌP Ý TƯỞNG + TRIỂN KHAI KỸ THUẬT DỰ ÁN', duAn: 'NHÓM NHÀ Ở ĐÔNG NAM ĐƯỜNG TỐ HỮU', gioTT: '2h', gioDK: '2h', trangThai: 'Hoàn thành', gioBao: '22:27' },
    ],
  },
  {
    date: '24/11/2026',
    tongGioTT: '2h',
    chenhText: 'Chênh -6h so với chuẩn 8h',
    isNegative: true,
    tasks: [
      { id: 1, dauViec: 'ĐIỀU CHỈNH THỐNG KÊ + NHẬP TIẾN ĐỘ CHI TIẾT', duAn: 'NHÓM NHÀ Ở ĐÔNG NAM ĐƯỜNG TỐ HỮU', gioTT: '1h', gioDK: '1h', trangThai: 'Hoàn thành', gioBao: '22:15' },
      { id: 2, dauViec: 'KIỂM TRA CHECKLIST + TMB XÁC NHẬN TRIỂN KHAI DỰ ÁN TRƯỚC KHI GỬI KH', duAn: 'NHÓM NHÀ Ở ĐÔNG NAM ĐƯỜNG TỐ HỮU', gioTT: '1h', gioDK: '1h', trangThai: 'Hoàn thành', gioBao: '22:19' },
    ],
  },
  {
    date: '23/11/2026',
    tongGioTT: '12h',
    chenhText: 'Chênh +4h so với chuẩn 8h',
    tasks: [
      { id: 1, dauViec: 'IN Ô TÔ 3D', duAn: 'NHÓM NHÀ Ở ĐÔNG NAM ĐƯỜNG TỐ HỮU', gioTT: '12h', gioDK: '12h', trangThai: 'Hoàn thành', gioBao: '21:09' },
    ],
  },
  {
    date: '21/11/2026',
    tongGioTT: '9h',
    chenhText: 'Chênh +1h so với chuẩn 8h',
    tasks: [
      { id: 1, dauViec: 'IN 3D CHI TIẾT MÁI DỐC - NGÀY 2', duAn: 'KHU ĐÔ THỊ PHÍA ĐÔNG CÔNG SỞ THỊ TRẤN TÂN PHONG', gioTT: '9h', gioDK: '9h', trangThai: 'Đang thực hiện', gioBao: '19:28' },
    ],
  },
  {
    date: '20/11/2026',
    tongGioTT: '20h',
    chenhText: 'Chênh +12h so với chuẩn 8h',
    tasks: [
      { id: 1, dauViec: 'CHUYỂN CẮT NỀN ĐỢT 2', duAn: 'KHU ĐÔ THỊ PHÍA ĐÔNG CÔNG SỞ THỊ TRẤN TÂN PHONG', gioTT: '4h', gioDK: '4h', trangThai: 'Hoàn thành', gioBao: '00:03' },
      { id: 2, dauViec: 'KHAI TRIỂN + CHUYỂN CẮT PHỤ TRỢ', duAn: 'KHU ĐÔ THỊ PHÍA ĐÔNG CÔNG SỞ THỊ TRẤN TÂN PHONG', gioTT: '4h', gioDK: '4h', trangThai: 'Hoàn thành', gioBao: '00:06' },
      { id: 3, dauViec: 'IN 3D CHI TIẾT MÁI DỐC - NGÀY 1', duAn: 'KHU ĐÔ THỊ PHÍA ĐÔNG CÔNG SỞ THỊ TRẤN TÂN PHONG', gioTT: '12h', gioDK: '12h', trangThai: 'Hoàn thành', gioBao: '21:45' },
    ],
  },
];

export default function ChiTietGioTTModal({ item, onClose }: ChiTietGioTTModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 backdrop-blur-[1px] p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-7xl max-h-[92vh] flex flex-col overflow-hidden">
        <div className="shrink-0 flex items-center justify-between px-5 py-3.5 bg-[#406c89] text-white">
          <div className="flex items-center gap-2">
            <IconEye size={18} />
            <h3 className="text-sm font-bold">
              Chi tiết Giờ TT — {item.hoTen} ({item.phongBan})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/15 transition-colors cursor-pointer"
          >
            <IconX size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/60 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {SAMPLE_DAILY_GROUPS.map((group) => (
            <div
              key={group.date}
              className="bg-white border border-slate-200/90 rounded-lg overflow-hidden shadow-2xs"
            >
              <div className="px-4 py-2 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center gap-3 text-xs">
                <span className="font-bold text-slate-800">Ngày {group.date}</span>
                <span className="text-slate-500">
                  Tổng Giờ TT: <strong className="text-indigo-700">{group.tongGioTT}</strong>
                </span>
                <span className="text-slate-400">{group.tasks.length} đầu việc</span>
                <span
                  className={`font-semibold ${
                    group.isNegative ? 'text-rose-600' : 'text-amber-600'
                  }`}
                >
                  {group.chenhText}
                </span>
              </div>

              <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <table className="min-w-max w-full text-[11.5px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10.5px] font-semibold text-slate-400">
                      <th className="px-3 py-1.5 w-8">#</th>
                      <th className="px-3 py-1.5">Đầu việc</th>
                      <th className="px-3 py-1.5">Dự án</th>
                      <th className="px-3 py-1.5 text-center">Giờ TT</th>
                      <th className="px-3 py-1.5 text-center">Giờ DK</th>
                      <th className="px-3 py-1.5 text-center">Trạng thái việc</th>
                      <th className="px-3 py-1.5">Người thực hiện</th>
                      <th className="px-3 py-1.5">Người BC</th>
                      <th className="px-3 py-1.5 text-right">Giờ báo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/80">
                    {group.tasks.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/60">
                        <td className="px-3 py-2 text-slate-400">{t.id}</td>
                        <td className="px-3 py-2 font-medium text-slate-800">{t.dauViec}</td>
                        <td className="px-3 py-2 text-slate-500">{t.duAn}</td>
                        <td className="px-3 py-2 text-center font-bold text-indigo-700">{t.gioTT}</td>
                        <td className="px-3 py-2 text-center text-slate-500">{t.gioDK}</td>
                        <td className="px-3 py-2 text-center text-slate-600">{t.trangThai}</td>
                        <td className="px-3 py-2 font-medium text-slate-700">{item.hoTen}</td>
                        <td className="px-3 py-2 text-slate-500">{item.hoTen}</td>
                        <td className="px-3 py-2 text-right text-slate-500 font-mono">{t.gioBao}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="shrink-0 px-5 py-3 bg-white border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#406c89] hover:bg-[#345972] text-white text-xs font-semibold cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
