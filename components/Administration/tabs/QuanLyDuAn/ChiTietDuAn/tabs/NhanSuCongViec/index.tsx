"use client";

import React, { useState } from 'react';
import {
  IconAward,
  IconClock,
  IconChartBar,
  IconPencil,
  IconCheck,
  IconX,
  IconChevronUp,
  IconChevronDown,
  IconBuilding
} from '@tabler/icons-react';
import { DuAnItem } from '../../../index';
import PheDuyetBaoCaoTab from './PheDuyetBaoCao';
import BangTongHopNhanSuTab from '../BangTongHopNhanSu';

interface NhanSuCongViecTabProps {
  project: DuAnItem;
}

export default function NhanSuCongViecTab({ project }: NhanSuCongViecTabProps) {
  const [isSection1Open, setIsSection1Open] = useState(true);
  const [isSection2Open, setIsSection2Open] = useState(true);
  const [isSection3Open, setIsSection3Open] = useState(true);
  const [selectedReportDeptIdx, setSelectedReportDeptIdx] = useState(0);

  // Expanded department cards in Layer 2
  const [expandedL2Depts, setExpandedL2Depts] = useState<string[]>(['bgd', 'kvp', 'pkt', 'pcat', 'pghep', 'pmoc', 'pdien', 'pcq', 'pcntk']);

  const toggleL2Dept = (deptId: string) => {
    setExpandedL2Depts(prev =>
      prev.includes(deptId) ? prev.filter(id => id !== deptId) : [...prev, deptId]
    );
  };

  const [approvalStatus, setApprovalStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [deptPercents, setDeptPercents] = useState<Record<string, number>>({
    bgd: 0.0,
    kvp: 0.0,
    pkt: 0.0,
    pcat: 0.0,
    pghep: 0.0,
    pmoc: 0.0,
    pdien: 0.0,
    pcq: 0.0,
    pcntk: 0.0,
  });

  const [editingDept, setEditingDept] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const handleStartEdit = (deptId: string, currentVal: number) => {
    setEditingDept(deptId);
    setEditValue(currentVal.toString());
  };

  const handleSaveEdit = (deptId: string) => {
    const val = parseFloat(editValue);
    if (!isNaN(val)) {
      setDeptPercents(prev => ({ ...prev, [deptId]: val }));
    }
    setEditingDept(null);
  };

  // Department report data matching user reference image exactly
  const deptRows = [
    { id: 'bgd', name: 'Ban Giám đốc', gioKh: '18h', gioTt: '19h', gioTtPercent: '0.6%' },
    { id: 'kvp', name: 'Khối Văn phòng', gioKh: '48h', gioTt: '32h', gioTtPercent: '1.0%' },
    { id: 'pkt', name: 'Phòng Khai triển', gioKh: '150.5h', gioTt: '168.5h', gioTtPercent: '5.5%' },
    { id: 'pcat', name: 'Phòng Cắt', gioKh: '216h', gioTt: '636h', gioTtPercent: '20.7%' },
    { id: 'pghep', name: 'Phòng Ghép', gioKh: '854.5h', gioTt: '854.5h', gioTtPercent: '27.8%' },
    { id: 'pmoc', name: 'Phòng Mộc Sơn', gioKh: '271h', gioTt: '271h', gioTtPercent: '8.8%' },
    { id: 'pdien', name: 'Phòng Điện', gioKh: '253h', gioTt: '253h', gioTtPercent: '8.2%' },
    { id: 'pcq', name: 'Phòng Cảnh Quan', gioKh: '796.1h', gioTt: '790.6h', gioTtPercent: '25.7%' },
    { id: 'pcntk', name: 'Phòng Công nghệ và Thiết kế', gioKh: '57h', gioTt: '53h', gioTtPercent: '1.7%' },
  ];

  const totalParticipation = Object.values(deptPercents).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="space-y-5 text-xs animate-fade-in select-none max-h-[600px] overflow-y-auto pr-2 pb-8">
      
      {/* OUTER CARD: BÁO CÁO THAM GIA DỰ ÁN */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
        
        {/* Accordion Header */}
        <div
          onClick={() => setIsSection1Open(!isSection1Open)}
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-100"
        >
          <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
            Báo cáo Tham gia Dự án
          </h3>
          <button type="button" className="text-slate-400 hover:text-slate-600 transition-colors">
            <IconChevronUp size={18} className={`transition-transform duration-200 ${isSection1Open ? '' : 'rotate-180'}`} />
          </button>
        </div>

        {isSection1Open && (
          <div className="p-5 space-y-5">
            
            {/* SUB-HEADER BANNER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#406c89]/5 border border-[#406c89]/20 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#406c89]/10 text-[#406c89] shrink-0 border border-[#406c89]/20">
                  <IconAward size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 tracking-tight">
                    Báo cáo % Tham gia Dự án
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    PGĐ Kỹ thuật đánh giá % phòng · Trưởng phòng đánh giá % main task · Tự động tính % nhân sự
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0 self-start sm:self-center">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/90 shadow-2xs">
                  <IconClock size={15} />
                  <span>
                    {approvalStatus === 'pending' && 'Chờ phê duyệt'}
                    {approvalStatus === 'approved' && 'Đã phê duyệt'}
                    {approvalStatus === 'rejected' && 'Đã từ chối'}
                  </span>
                </span>
              </div>
            </div>

            {/* TABLE BLOCK 1: LỚP 1 — % THAM GIA CỦA TỪNG PHÒNG BAN */}
            <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs">
              
              {/* Table Bar Header */}
              <div className="bg-slate-100/60 p-3 px-4 flex items-center justify-between border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <IconChartBar size={16} className="text-[#406c89]" />
                  <span className="font-bold text-xs text-slate-800">
                    Lớp 1 — % Tham gia của từng Phòng ban
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal italic hidden md:inline">
                    (Giám đốc / PGĐ Kinh doanh / PGĐ Kỹ thuật đánh giá)
                  </span>
                </div>

                <div className="font-bold text-xs text-amber-600">
                  Tổng: {totalParticipation.toFixed(1)}% ≠ 100%
                </div>
              </div>

              {/* Table Data */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[11px] font-bold text-slate-400 border-b border-slate-100 bg-slate-50/50">
                      <th className="py-2.5 px-4 font-bold">Phòng ban</th>
                      <th className="py-2.5 px-4 font-bold text-center">% Tham gia dự án</th>
                      <th className="py-2.5 px-4 font-bold text-center">Giờ KH</th>
                      <th className="py-2.5 px-4 font-bold text-center">Giờ TT</th>
                      <th className="py-2.5 px-4 font-bold text-center">% Giờ TT (tự động)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {deptRows.map((row) => {
                      const isEditing = editingDept === row.id;
                      const val = deptPercents[row.id] || 0;

                      return (
                        <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                          {/* Dept Name */}
                          <td className="py-3 px-4 font-bold text-slate-800 flex items-center gap-2">
                            <IconBuilding size={16} className="text-slate-400 shrink-0" />
                            <span>{row.name}</span>
                          </td>

                          {/* % Tham gia (Editable) */}
                          <td className="py-3 px-4 text-center font-bold text-[#406c89]">
                            {isEditing ? (
                              <div className="flex items-center justify-center gap-1">
                                <input
                                  type="number"
                                  step="0.1"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-16 px-2 py-0.5 border border-[#406c89] rounded outline-none text-xs font-bold text-center"
                                  autoFocus
                                />
                                <button
                                  type="button"
                                  onClick={() => handleSaveEdit(row.id)}
                                  className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                                >
                                  <IconCheck size={14} />
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleStartEdit(row.id, val)}
                                className="inline-flex items-center gap-1 text-[#406c89] hover:underline cursor-pointer"
                              >
                                <span>{val.toFixed(1)}%</span>
                                <IconPencil size={13} className="text-slate-400 hover:text-[#406c89]" />
                              </button>
                            )}
                          </td>

                          {/* Giờ KH */}
                          <td className="py-3 px-4 text-center text-slate-500 font-medium">
                            {row.gioKh}
                          </td>

                          {/* Giờ TT */}
                          <td className="py-3 px-4 text-center font-bold text-amber-600">
                            {row.gioTt}
                          </td>

                          {/* % Giờ TT (tự động) */}
                          <td className="py-3 px-4 text-center text-slate-500 font-medium">
                            {row.gioTtPercent}
                          </td>
                        </tr>
                      );
                    })}

                    {/* SUMMARY ROW */}
                    <tr className="bg-slate-100/70 font-bold border-t-2 border-slate-200">
                      <td className="py-3 px-4 text-slate-900 font-extrabold">
                        Tổng cộng
                      </td>
                      <td className="py-3 px-4 text-center text-amber-600 font-extrabold text-sm">
                        {totalParticipation.toFixed(1)}%
                      </td>
                      <td className="py-3 px-4 text-center text-slate-900 font-extrabold">
                        2664.1h
                      </td>
                      <td className="py-3 px-4 text-center text-amber-600 font-extrabold">
                        3077.6h
                      </td>
                      <td className="py-3 px-4 text-center text-slate-900 font-extrabold">
                        100.0%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>

            {/* FOOTER TIP & APPROVAL BAR LỚP 1 */}
            <div className="space-y-3 pt-1 border-b border-slate-200/80 pb-5">
              <p className="text-xs text-slate-400 italic flex items-center gap-1.5">
                <span>💡</span>
                <span>Nhấn vào số % để chỉnh sửa. Tổng nên bằng 100%.</span>
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <span>Phê duyệt Lớp 1:</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[11px]">
                    <IconClock size={13} />
                    <span>Chờ phê duyệt</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setApprovalStatus('approved')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                  >
                    <IconCheck size={15} stroke={3} />
                    <span>Phê duyệt</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setApprovalStatus('rejected')}
                    className="bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs px-4 py-2 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                  >
                    <IconX size={15} stroke={3} />
                    <span>Từ chối</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION: LỚP 2 — % ĐÓNG GÓP CỦA MAIN TASK TRONG TỪNG PHÒNG */}
            <div className="space-y-3.5 pt-2">
              
              {/* Header Title */}
              <div className="flex items-center gap-2 px-1">
                <IconChartBar size={16} className="text-[#406c89]" />
                <span className="font-extrabold text-xs text-[#406c89]">
                  Lớp 2 — % đóng góp của Main Task trong từng Phòng
                </span>
                <span className="text-[11px] text-slate-400 font-normal italic">
                  (Trưởng phòng đánh giá)
                </span>
              </div>

              {/* CARD 1: BAN GIÁM ĐỐC */}
              <div className="bg-[#406c89]/5 border border-[#406c89]/20 rounded-2xl overflow-hidden shadow-2xs">
                <div
                  onClick={() => toggleL2Dept('bgd')}
                  className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-[#406c89]/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <IconChevronDown size={16} className={`text-[#406c89] transition-transform duration-200 ${expandedL2Depts.includes('bgd') ? '' : '-rotate-90'}`} />
                    <IconBuilding size={16} className="text-[#406c89]" />
                    <h4 className="font-extrabold text-xs text-[#406c89]">Ban Giám đốc</h4>
                    <span className="text-[11px] text-[#406c89]/70 italic font-normal">— bạn có thể chỉnh sửa</span>
                  </div>
                  <div className="font-extrabold text-xs text-[#406c89]">
                    Tổng: 0.0%
                  </div>
                </div>

                {expandedL2Depts.includes('bgd') && (
                  <div className="bg-white border-t border-[#406c89]/15 p-4 space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-[11px] font-bold text-[#406c89] border-b border-[#406c89]/15 pb-2">
                            <th className="pb-2 font-bold">Tên Main Task / Nhóm</th>
                            <th className="pb-2 font-bold text-center">Giờ DK</th>
                            <th className="pb-2 font-bold text-center">Giờ TT</th>
                            <th className="pb-2 font-bold text-center">% đóng góp trong phòng</th>
                            <th className="pb-2 font-bold text-center">% đóng góp dự án</th>
                            <th className="pb-2 font-bold">Nhân sự</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="py-2.5 font-bold text-[#406c89]">khởi tạo và phê duyệt</td>
                            <td className="py-2.5 text-center text-slate-500 font-medium">18h</td>
                            <td className="py-2.5 text-center text-amber-600 font-bold">19h</td>
                            <td className="py-2.5 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">
                                0.0% <IconPencil size={13} className="text-slate-400" />
                              </span>
                            </td>
                            <td className="py-2.5 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2.5 text-slate-500 font-medium">Phùng Bích Thảo (8.666h), Nguyễn Thanh Tuấn (7.6...</td>
                          </tr>
                          <tr className="font-bold border-t border-slate-200 bg-slate-50/60">
                            <td className="py-2.5 font-extrabold text-[#406c89]">Tổng Ban Giám đốc</td>
                            <td className="py-2.5 text-center text-slate-800">18h</td>
                            <td className="py-2.5 text-center text-amber-600">19h</td>
                            <td className="py-2.5 text-center text-amber-600 font-extrabold">0.0%</td>
                            <td className="py-2.5 text-center text-slate-800 font-extrabold">0%</td>
                            <td className="py-2.5"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <span>Phê duyệt Main Task — Ban Giám đốc:</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[11px]">
                          <IconClock size={13} />
                          <span>Chờ phê duyệt</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
                          <IconCheck size={14} /> <span>Phê duyệt</span>
                        </button>
                        <button type="button" className="bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
                          <IconX size={14} /> <span>Từ chối</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CARD 2: KHỐI VĂN PHÒNG */}
              <div className="bg-[#406c89]/5 border border-[#406c89]/20 rounded-2xl overflow-hidden shadow-2xs">
                <div
                  onClick={() => toggleL2Dept('kvp')}
                  className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-[#406c89]/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <IconChevronDown size={16} className={`text-[#406c89] transition-transform duration-200 ${expandedL2Depts.includes('kvp') ? '' : '-rotate-90'}`} />
                    <IconBuilding size={16} className="text-[#406c89]" />
                    <h4 className="font-extrabold text-xs text-[#406c89]">Khối Văn phòng</h4>
                    <span className="text-[11px] text-[#406c89]/70 italic font-normal">— bạn có thể chỉnh sửa</span>
                  </div>
                  <div className="font-extrabold text-xs text-[#406c89]">
                    Tổng: 0.0%
                  </div>
                </div>

                {expandedL2Depts.includes('kvp') && (
                  <div className="bg-white border-t border-[#406c89]/15 p-4 space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-[11px] font-bold text-[#406c89] border-b border-[#406c89]/15 pb-2">
                            <th className="pb-2 font-bold">Tên Main Task / Nhóm</th>
                            <th className="pb-2 font-bold text-center">Giờ DK</th>
                            <th className="pb-2 font-bold text-center">Giờ TT</th>
                            <th className="pb-2 font-bold text-center">% đóng góp trong phòng</th>
                            <th className="pb-2 font-bold text-center">% đóng góp dự án</th>
                            <th className="pb-2 font-bold">Nhân sự</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="py-2.5 font-bold text-slate-800">CHUẨN BỊ HỢP ĐỒNG</td>
                            <td className="py-2.5 text-center text-slate-500 font-medium">8h</td>
                            <td className="py-2.5 text-center text-amber-600 font-bold">6h</td>
                            <td className="py-2.5 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2.5 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2.5 text-slate-500 font-medium">Nguyễn Phú Quang (3.5h), Bùi Thị Duyên (2.5h)</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-bold text-slate-800">KHỞI TẠO DỰ ÁN</td>
                            <td className="py-2.5 text-center text-slate-500 font-medium">10h</td>
                            <td className="py-2.5 text-center text-amber-600 font-bold">5.5h</td>
                            <td className="py-2.5 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2.5 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2.5 text-slate-500 font-medium">Nguyễn Phú Quang (5.5h)</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-bold text-slate-800">THEO DÕI THỰC HIỆN HỢP ĐỒNG</td>
                            <td className="py-2.5 text-center text-slate-500 font-medium">14h</td>
                            <td className="py-2.5 text-center text-amber-600 font-bold">14h</td>
                            <td className="py-2.5 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2.5 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2.5 text-slate-500 font-medium">Nguyễn Phú Quang (13h), Bùi Thị Duyên (1h)</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-bold text-slate-800">CHỈNH SỬA VÀ VẬN CHUYỂN</td>
                            <td className="py-2.5 text-center text-slate-500 font-medium">16h</td>
                            <td className="py-2.5 text-center text-amber-600 font-bold">6.5h</td>
                            <td className="py-2.5 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2.5 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2.5 text-slate-500 font-medium">Nguyễn Phú Quang (6.5h)</td>
                          </tr>
                          <tr className="font-bold border-t border-slate-200 bg-slate-50/60">
                            <td className="py-2.5 font-extrabold text-[#406c89]">Tổng Khối Văn phòng</td>
                            <td className="py-2.5 text-center text-slate-800">48h</td>
                            <td className="py-2.5 text-center text-amber-600">32h</td>
                            <td className="py-2.5 text-center text-amber-600 font-extrabold">0.0%</td>
                            <td className="py-2.5 text-center text-slate-800 font-extrabold">0%</td>
                            <td className="py-2.5"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <span>Phê duyệt Main Task — Khối Văn phòng:</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[11px]">
                          <IconClock size={13} />
                          <span>Chờ phê duyệt</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
                          <IconCheck size={14} /> <span>Phê duyệt</span>
                        </button>
                        <button type="button" className="bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
                          <IconX size={14} /> <span>Từ chối</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CARD 3: PHÒNG KHAI TRIỂN */}
              <div className="bg-[#406c89]/5 border border-[#406c89]/20 rounded-2xl overflow-hidden shadow-2xs">
                <div
                  onClick={() => toggleL2Dept('pkt')}
                  className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-[#406c89]/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <IconChevronDown size={16} className={`text-[#406c89] transition-transform duration-200 ${expandedL2Depts.includes('pkt') ? '' : '-rotate-90'}`} />
                    <IconBuilding size={16} className="text-[#406c89]" />
                    <h4 className="font-extrabold text-xs text-[#406c89]">Phòng Khai triển</h4>
                    <span className="text-[11px] text-[#406c89]/70 italic font-normal">— bạn có thể chỉnh sửa</span>
                  </div>
                  <div className="font-extrabold text-xs text-emerald-600">
                    Tổng: 100.0%
                  </div>
                </div>

                {expandedL2Depts.includes('pkt') && (
                  <div className="bg-white border-t border-[#406c89]/15 p-4 space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-[11px] font-bold text-[#406c89] border-b border-[#406c89]/15 pb-2">
                            <th className="pb-2 font-bold">Tên Main Task / Nhóm</th>
                            <th className="pb-2 font-bold text-center">Giờ DK</th>
                            <th className="pb-2 font-bold text-center">Giờ TT</th>
                            <th className="pb-2 font-bold text-center">% đóng góp trong phòng</th>
                            <th className="pb-2 font-bold text-center">% đóng góp dự án</th>
                            <th className="pb-2 font-bold">Nhân sự</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KHỞI TẠO DỰ ÁN - NHÓM 1</td>
                            <td className="py-2 text-center text-slate-500 font-medium">4h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">4h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">3.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Trần Diễm My (4h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KHỞI TẠO DỰ ÁN - NHÓM 2</td>
                            <td className="py-2 text-center text-slate-500 font-medium">9h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">9h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">1.9% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Trần Diễm My (8h), Lê Quốc Long (1h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KHỞI TẠO DỰ ÁN - NHÓM 3</td>
                            <td className="py-2 text-center text-slate-500 font-medium">0.5h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">0.5h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.1% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Trần Diễm My (0.5h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KHUNG CHÂN - MẶT BẰNG</td>
                            <td className="py-2 text-center text-slate-500 font-medium">2h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">4h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">8.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Lê Quốc Long (4h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KÍNH BIÊN/ LỒNG KÍNH</td>
                            <td className="py-2 text-center text-slate-500 font-medium">1h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">1h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">8.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Lê Quốc Long (1h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KHAI TRIỂN NỀN MÔ HÌNH</td>
                            <td className="py-2 text-center text-slate-500 font-medium">1h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">1h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">16.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Trần Diễm My (1h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KHAI TRIỂN PHỤ TRỢ MÔ HÌNH</td>
                            <td className="py-2 text-center text-slate-500 font-medium">2h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">2h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">2.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Trần Diễm My (2h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KHAI TRIỂN NỀN TÍT + CHỦ THÍCH MÔ HÌNH</td>
                            <td className="py-2 text-center text-slate-500 font-medium">4h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">4h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">2.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Trần Diễm My (2h), Nguyễn Thiên Hương (2h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KHAI TRIỂN CÔNG TRÌNH - NHÓM 1</td>
                            <td className="py-2 text-center text-slate-500 font-medium">84h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">84h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">44.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Phạm Tiến Thành (30h), Nguyễn Thiên Hương ...</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KHAI TRIỂN CÔNG TRÌNH - NHÓM 2</td>
                            <td className="py-2 text-center text-slate-500 font-medium">1h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">1h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Lê Thanh An (1h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">XẾP & VẬN HÀNH LỆNH IN 3D</td>
                            <td className="py-2 text-center text-slate-500 font-medium">16h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">24h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">5.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Trần Diễm My (24h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">VẬN CHUYỂN, LẮP ĐẶT & BÀN GIAO MÔ HÌNH</td>
                            <td className="py-2 text-center text-slate-500 font-medium">26h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">34h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">10.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Lê Quốc Long (32h), Đào Văn Thọ (1h), Dương ...</td>
                          </tr>
                          <tr className="font-bold border-t border-slate-200 bg-slate-50/60">
                            <td className="py-2.5 font-extrabold text-[#406c89]">Tổng Phòng Khai triển</td>
                            <td className="py-2.5 text-center text-slate-800">150.5h</td>
                            <td className="py-2.5 text-center text-amber-600">168.5h</td>
                            <td className="py-2.5 text-center text-emerald-600 font-extrabold">100.0%</td>
                            <td className="py-2.5 text-center text-slate-800 font-extrabold">0%</td>
                            <td className="py-2.5"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <span>Phê duyệt Main Task — Phòng Khai triển:</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[11px]">
                          <IconClock size={13} />
                          <span>Chờ phê duyệt</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
                          <IconCheck size={14} /> <span>Phê duyệt</span>
                        </button>
                        <button type="button" className="bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
                          <IconX size={14} /> <span>Từ chối</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CARD 4: PHÒNG CẮT */}
              <div className="bg-[#406c89]/5 border border-[#406c89]/20 rounded-2xl overflow-hidden shadow-2xs">
                <div
                  onClick={() => toggleL2Dept('pcat')}
                  className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-[#406c89]/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <IconChevronDown size={16} className={`text-[#406c89] transition-transform duration-200 ${expandedL2Depts.includes('pcat') ? '' : '-rotate-90'}`} />
                    <IconBuilding size={16} className="text-[#406c89]" />
                    <h4 className="font-extrabold text-xs text-[#406c89]">Phòng Cắt</h4>
                    <span className="text-[11px] text-[#406c89]/70 italic font-normal">— bạn có thể chỉnh sửa</span>
                  </div>
                  <div className="font-extrabold text-xs text-amber-600">
                    Tổng: 0.0%
                  </div>
                </div>

                {expandedL2Depts.includes('pcat') && (
                  <div className="bg-white border-t border-[#406c89]/15 p-4 space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-[11px] font-bold text-[#406c89] border-b border-[#406c89]/15 pb-2">
                            <th className="pb-2 font-bold">Tên Main Task / Nhóm</th>
                            <th className="pb-2 font-bold text-center">Giờ DK</th>
                            <th className="pb-2 font-bold text-center">Giờ TT</th>
                            <th className="pb-2 font-bold text-center">% đóng góp trong phòng</th>
                            <th className="pb-2 font-bold text-center">% đóng góp dự án</th>
                            <th className="pb-2 font-bold">Nhân sự</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KHỞI TẠO DỰ ÁN - NHÓM 1</td>
                            <td className="py-2 text-center text-slate-500 font-medium">4h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">4h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">HOÀNG HỮU VINH (4h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">XẾP CẮT CÔNG TRÌNH</td>
                            <td className="py-2 text-center text-slate-500 font-medium">28h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">112h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">LÊ TRUNG HIẾU (64h), HOÀNG HỮU VINH (...</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">TRÔNG MÁY CẮT, RA VÀO PHÔI CẮT CÔNG TRÌNH</td>
                            <td className="py-2 text-center text-slate-500 font-medium">28h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">112h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">LÊ TRUNG HIẾU (64h), HOÀNG HỮU VINH (...</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">CẮT CÔNG TRÌNH</td>
                            <td className="py-2 text-center text-slate-500 font-medium">56h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">112h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Máy 1 (CMH 1390-B-A) (64h), Máy 4 (CMH 1...</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">XẾP CẮT ĐỊA HÌNH</td>
                            <td className="py-2 text-center text-slate-500 font-medium">8h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">32h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">NGUYỄN TUẤN VIỆT (32h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">TRÔNG MÁY CẮT, RA VÀO PHÔI CẮT ĐỊA HÌNH</td>
                            <td className="py-2 text-center text-slate-500 font-medium">8h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">32h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">NGUYỄN TUẤN VIỆT (32h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">CẮT ĐỊA HÌNH</td>
                            <td className="py-2 text-center text-slate-500 font-medium">16h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">32h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Máy 2 (CMH 1390-B-A) (32h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">XẾP CẮT NỀN</td>
                            <td className="py-2 text-center text-slate-500 font-medium">8h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">32h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">HOÀNG HỮU VINH (32h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">TRÔNG MÁY CẮT, RA VÀO PHÔI CẮT NỀN</td>
                            <td className="py-2 text-center text-slate-500 font-medium">8h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">32h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">HOÀNG HỮU VINH (32h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">CẮT NỀN</td>
                            <td className="py-2 text-center text-slate-500 font-medium">16h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">32h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Máy 4 (CMH 1390-B-A) (32h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">XẾP CẮT PHỤ TRỢ</td>
                            <td className="py-2 text-center text-slate-500 font-medium">4h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">16h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">NGUYỄN TUẤN VIỆT (16h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">XẾP CẮT TÍT</td>
                            <td className="py-2 text-center text-slate-500 font-medium">4h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">16h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">LÊ TRUNG HIẾU (16h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">TRÔNG MÁY CẮT, RA VÀO PHÔI CẮT PHỤ TRỢ</td>
                            <td className="py-2 text-center text-slate-500 font-medium">4h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">16h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">NGUYỄN TUẤN VIỆT (16h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">TRÔNG MÁY CẮT, RA VÀO PHÔI CẮT TÍT</td>
                            <td className="py-2 text-center text-slate-500 font-medium">4h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">16h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">LÊ TRUNG HIẾU (16h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">CẮT PHỤ TRỢ</td>
                            <td className="py-2 text-center text-slate-500 font-medium">8h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">16h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Máy 2 (CMH 1391-B-A) (16h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">CẮT TÍT</td>
                            <td className="py-2 text-center text-slate-500 font-medium">8h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">16h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Máy 1 (CMH 1390-B-A) (16h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">VẬN CHUYỂN, LẮP ĐẶT & BÀN GIAO MÔ HÌNH</td>
                            <td className="py-2 text-center text-slate-500 font-medium">4h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">8h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Hoàng Hữu Vinh (4h), NGUYỄN TUẤN VIỆT (...</td>
                          </tr>
                          <tr className="font-bold border-t border-slate-200 bg-slate-50/60">
                            <td className="py-2.5 font-extrabold text-[#406c89]">Tổng Phòng Cắt</td>
                            <td className="py-2.5 text-center text-slate-800">216h</td>
                            <td className="py-2.5 text-center text-amber-600">636h</td>
                            <td className="py-2.5 text-center text-amber-600 font-extrabold">0.0%</td>
                            <td className="py-2.5 text-center text-slate-800 font-extrabold">0%</td>
                            <td className="py-2.5"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <span>Phê duyệt Main Task — Phòng Cắt:</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[11px]">
                          <IconClock size={13} />
                          <span>Chờ phê duyệt</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
                          <IconCheck size={14} /> <span>Phê duyệt</span>
                        </button>
                        <button type="button" className="bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
                          <IconX size={14} /> <span>Từ chối</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CARD 5: PHÒNG GHÉP */}
              <div className="bg-[#406c89]/5 border border-[#406c89]/20 rounded-2xl overflow-hidden shadow-2xs">
                <div
                  onClick={() => toggleL2Dept('pghep')}
                  className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-[#406c89]/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <IconChevronDown size={16} className={`text-[#406c89] transition-transform duration-200 ${expandedL2Depts.includes('pghep') ? '' : '-rotate-90'}`} />
                    <IconBuilding size={16} className="text-[#406c89]" />
                    <h4 className="font-extrabold text-xs text-[#406c89]">Phòng Ghép</h4>
                    <span className="text-[11px] text-[#406c89]/70 italic font-normal">— bạn có thể chỉnh sửa</span>
                  </div>
                  <div className="font-extrabold text-xs text-amber-600">
                    Tổng: 0.0%
                  </div>
                </div>

                {expandedL2Depts.includes('pghep') && (
                  <div className="bg-white border-t border-[#406c89]/15 p-4 space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-[11px] font-bold text-[#406c89] border-b border-[#406c89]/15 pb-2">
                            <th className="pb-2 font-bold">Tên Main Task / Nhóm</th>
                            <th className="pb-2 font-bold text-center">Giờ DK</th>
                            <th className="pb-2 font-bold text-center">Giờ TT</th>
                            <th className="pb-2 font-bold text-center">% đóng góp trong phòng</th>
                            <th className="pb-2 font-bold text-center">% đóng góp dự án</th>
                            <th className="pb-2 font-bold">Nhân sự</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KHỞI TẠO DỰ ÁN - NHÓM 1</td>
                            <td className="py-2 text-center text-slate-500 font-medium">3h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">3h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Đinh Đức Lợi (3h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KHỞI TẠO DỰ ÁN - NHÓM 2</td>
                            <td className="py-2 text-center text-slate-500 font-medium">1h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">1h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Đinh Đức Lợi (1h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">QUẢN LÝ VÀ CHỦ TRÌ DỰ ÁN</td>
                            <td className="py-2 text-center text-slate-500 font-medium">16h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">16h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Đinh Đức Lợi (8h), Đỗ Thị Luyện (8h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">GHÉP THÔ NỀN - NHÓM 2.</td>
                            <td className="py-2 text-center text-slate-500 font-medium">10h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">10h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Đinh Đức Lợi (10h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">GHÉP THÔ NỀN - NHÓM 2</td>
                            <td className="py-2 text-center text-slate-500 font-medium">106.5h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">106.5h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Nguyễn Tuân (75.5h), Nguyễn hoàng phi ...</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">GHÉP THÔ NỀN - NHÓM 1</td>
                            <td className="py-2 text-center text-slate-500 font-medium">72h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">72h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Đinh Đức Lợi (72h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">HOÀN THIỆN NỀN - NHÓM 1</td>
                            <td className="py-2 text-center text-slate-500 font-medium">80h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">80h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Nguyễn hoàng phi hùng (47h), Đinh Đức ...</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">GHÉP THÔ CÔNG TRÌNH - NHÓM 1</td>
                            <td className="py-2 text-center text-slate-500 font-medium">124.5h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">124.5h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Đỗ Thị Luyện (87.5h), Nguyễn hoàng phi h...</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">HOÀN THIỆN NỀN - NHÓM 2</td>
                            <td className="py-2 text-center text-slate-500 font-medium">65h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">65h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Nguyễn hoàng phi hùng (44h), Đinh Đức ...</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">HOÀN THIỆN NỀN - NHÓM 2</td>
                            <td className="py-2 text-center text-slate-500 font-medium">11h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">11h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Nguyễn hoàng phi hùng (11h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">HOÀN THIỆN CÔNG TRÌNH</td>
                            <td className="py-2 text-center text-slate-500 font-medium">166.5h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">166.5h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Đỗ Thị Luyện (93.5h), Lương Ngọc Thành ...</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">GHÉP THÔ CÔNG TRÌNH - NHÓM 2</td>
                            <td className="py-2 text-center text-slate-500 font-medium">44.5h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">44.5h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Lương Ngọc Thành (34h), Đỗ Thị Luyện (1...</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">ĐÓNG GÓI, VẬN CHUYỂN LẮP ĐẶT MÔ HÌNH - NHÓM 2</td>
                            <td className="py-2 text-center text-slate-500 font-medium">7.5h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">7.5h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Lương Ngọc Thành (4h), Nguyễn Tuân (3....</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">ĐÓNG GÓI, VẬN CHUYỂN LẮP ĐẶT MÔ HÌNH - NHÓM 1</td>
                            <td className="py-2 text-center text-slate-500 font-medium">15h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">15h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Nguyễn Tuân (11h), Đinh Đức Lợi (4h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">CÔNG VIỆC NHÂN VIÊN BÁN THỜI GIAN</td>
                            <td className="py-2 text-center text-slate-500 font-medium">132h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">132h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Đặng Văn Điệp (BTG) (40h), Thân Thị Ngu...</td>
                          </tr>
                          <tr className="font-bold border-t border-slate-200 bg-slate-50/60">
                            <td className="py-2.5 font-extrabold text-[#406c89]">Tổng Phòng Ghép</td>
                            <td className="py-2.5 text-center text-slate-800">854.5h</td>
                            <td className="py-2.5 text-center text-amber-600">854.5h</td>
                            <td className="py-2.5 text-center text-amber-600 font-extrabold">0.0%</td>
                            <td className="py-2.5 text-center text-slate-800 font-extrabold">0%</td>
                            <td className="py-2.5"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <span>Phê duyệt Main Task — Phòng Ghép:</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[11px]">
                          <IconClock size={13} />
                          <span>Chờ phê duyệt</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
                          <IconCheck size={14} /> <span>Phê duyệt</span>
                        </button>
                        <button type="button" className="bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
                          <IconX size={14} /> <span>Từ chối</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CARD 6: PHÒNG MỘC SƠN */}
              <div className="bg-[#406c89]/5 border border-[#406c89]/20 rounded-2xl overflow-hidden shadow-2xs">
                <div
                  onClick={() => toggleL2Dept('pmoc')}
                  className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-[#406c89]/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <IconChevronDown size={16} className={`text-[#406c89] transition-transform duration-200 ${expandedL2Depts.includes('pmoc') ? '' : '-rotate-90'}`} />
                    <IconBuilding size={16} className="text-[#406c89]" />
                    <h4 className="font-extrabold text-xs text-[#406c89]">Phòng Mộc Sơn</h4>
                    <span className="text-[11px] text-[#406c89]/70 italic font-normal">— bạn có thể chỉnh sửa</span>
                  </div>
                  <div className="font-extrabold text-xs text-amber-600">
                    Tổng: 0.0%
                  </div>
                </div>

                {expandedL2Depts.includes('pmoc') && (
                  <div className="bg-white border-t border-[#406c89]/15 p-4 space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-[11px] font-bold text-[#406c89] border-b border-[#406c89]/15 pb-2">
                            <th className="pb-2 font-bold">Tên Main Task / Nhóm</th>
                            <th className="pb-2 font-bold text-center">Giờ DK</th>
                            <th className="pb-2 font-bold text-center">Giờ TT</th>
                            <th className="pb-2 font-bold text-center">% đóng góp trong phòng</th>
                            <th className="pb-2 font-bold text-center">% đóng góp dự án</th>
                            <th className="pb-2 font-bold">Nhân sự</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KHỞI TẠO DỰ ÁN - NHÓM 1</td>
                            <td className="py-2 text-center text-slate-500 font-medium">1h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">1h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Đinh Hữu Sử (1h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KHỞI TẠO DỰ ÁN - NHÓM 2</td>
                            <td className="py-2 text-center text-slate-500 font-medium">0.5h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">0.5h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Đinh Hữu Sử (0.5h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">QUẢN LÝ DỰ ÁN</td>
                            <td className="py-2 text-center text-slate-500 font-medium">6h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">6h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Đinh Hữu Sử (6h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">NHÓM MỘC 1</td>
                            <td className="py-2 text-center text-slate-500 font-medium">129h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">129h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Đinh Hữu Sử (129h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">NHÓM MỘC 2</td>
                            <td className="py-2 text-center text-slate-500 font-medium">77h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">77h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Nguyễn Minh Hiếu (77h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">NHÓM MỘC 3</td>
                            <td className="py-2 text-center text-slate-500 font-medium">12h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">12h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Nguyễn Minh Hiếu (8h), Đinh Hữu Sử (4h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">NHÓM SƠN 1</td>
                            <td className="py-2 text-center text-slate-500 font-medium">16h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">16h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Hoàng Quyết Thắng (14h), Quan Minh Hoàng (2h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">NHÓM SƠN 2</td>
                            <td className="py-2 text-center text-slate-500 font-medium">7h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">7h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Quan Minh Hoàng (7h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">NHÓM SƠN 3</td>
                            <td className="py-2 text-center text-slate-500 font-medium">2.5h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">2.5h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Quan Minh Hoàng (2.5h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">vận chuyển, lắp đặt mô hình</td>
                            <td className="py-2 text-center text-slate-500 font-medium">20h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">20h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Hoàng Quyết Thắng (10h), Nguyễn Minh Hiếu (10h)</td>
                          </tr>
                          <tr className="font-bold border-t border-slate-200 bg-slate-50/60">
                            <td className="py-2.5 font-extrabold text-[#406c89]">Tổng Phòng Mộc Sơn</td>
                            <td className="py-2.5 text-center text-slate-800">271h</td>
                            <td className="py-2.5 text-center text-amber-600">271h</td>
                            <td className="py-2.5 text-center text-amber-600 font-extrabold">0.0%</td>
                            <td className="py-2.5 text-center text-slate-800 font-extrabold">0%</td>
                            <td className="py-2.5"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <span>Phê duyệt Main Task — Phòng Mộc Sơn:</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[11px]">
                          <IconClock size={13} />
                          <span>Chờ phê duyệt</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
                          <IconCheck size={14} /> <span>Phê duyệt</span>
                        </button>
                        <button type="button" className="bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
                          <IconX size={14} /> <span>Từ chối</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CARD 7: PHÒNG ĐIỆN */}
              <div className="bg-[#406c89]/5 border border-[#406c89]/20 rounded-2xl overflow-hidden shadow-2xs">
                <div
                  onClick={() => toggleL2Dept('pdien')}
                  className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-[#406c89]/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <IconChevronDown size={16} className={`text-[#406c89] transition-transform duration-200 ${expandedL2Depts.includes('pdien') ? '' : '-rotate-90'}`} />
                    <IconBuilding size={16} className="text-[#406c89]" />
                    <h4 className="font-extrabold text-xs text-[#406c89]">Phòng Điện</h4>
                    <span className="text-[11px] text-[#406c89]/70 italic font-normal">— bạn có thể chỉnh sửa</span>
                  </div>
                  <div className="font-extrabold text-xs text-amber-600">
                    Tổng: 0.0%
                  </div>
                </div>

                {expandedL2Depts.includes('pdien') && (
                  <div className="bg-white border-t border-[#406c89]/15 p-4 space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-[11px] font-bold text-[#406c89] border-b border-[#406c89]/15 pb-2">
                            <th className="pb-2 font-bold">Tên Main Task / Nhóm</th>
                            <th className="pb-2 font-bold text-center">Giờ DK</th>
                            <th className="pb-2 font-bold text-center">Giờ TT</th>
                            <th className="pb-2 font-bold text-center">% đóng góp trong phòng</th>
                            <th className="pb-2 font-bold text-center">% đóng góp dự án</th>
                            <th className="pb-2 font-bold">Nhân sự</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KHỞI TẠO DỰ ÁN - NHÓM 1</td>
                            <td className="py-2 text-center text-slate-500 font-medium">7h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">7h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Bùi Văn Lộc (7h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KHỞI TẠO DỰ ÁN - NHÓM 3</td>
                            <td className="py-2 text-center text-slate-500 font-medium">1h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">1h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Bùi Văn Lộc (1h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">CHUẨN BỊ TỦ NGUỒN - NHÓM 2</td>
                            <td className="py-2 text-center text-slate-500 font-medium">16h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">16h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Bùi Văn Lộc (16h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">CHUẨN BỊ HÀN MODUL ĐÈN - NHÓM 3</td>
                            <td className="py-2 text-center text-slate-500 font-medium">16h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">16h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Lâm Vĩnh Hưng (8h), Bùi Văn Lộc (8h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">CHUẨN BỊ ĐÈN ĐƯỜNG CẢNH QUAN - NHÓM 2</td>
                            <td className="py-2 text-center text-slate-500 font-medium">56h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">56h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Bùi Văn Lộc (24h), Hà Tùng Lâm (24h), Lâm...</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">HOÀN THIỆN KHUNG CHÂN - NHÓM 2</td>
                            <td className="py-2 text-center text-slate-500 font-medium">1h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">1h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Bùi Văn Lộc (1h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">VẬN HÀNH THỬ - NHÓM 3</td>
                            <td className="py-2 text-center text-slate-500 font-medium">11h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">11h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Bùi Văn Lộc (11h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">CHỈNH SỬA SAU NGHIỆM THU - NHÓM 2</td>
                            <td className="py-2 text-center text-slate-500 font-medium">1h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">1h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Bùi Văn Lộc (1h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">HOÀN THIỆN CÔNG TRÌNH - NHÓM 2</td>
                            <td className="py-2 text-center text-slate-500 font-medium">80h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">80h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Bùi Văn Lộc (44h), Hà Tùng Lâm (28h), Lâm...</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">CHUẨN BỊ ĐÈN ĐƯỜNG CẢNH QUAN - (BTG) - NHÓM 4</td>
                            <td className="py-2 text-center text-slate-500 font-medium">64h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">64h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Phạm Văn Trọng (BTG) (36h), Nguyễn An...</td>
                          </tr>
                          <tr className="font-bold border-t border-slate-200 bg-slate-50/60">
                            <td className="py-2.5 font-extrabold text-[#406c89]">Tổng Phòng Điện</td>
                            <td className="py-2.5 text-center text-slate-800">253h</td>
                            <td className="py-2.5 text-center text-amber-600">253h</td>
                            <td className="py-2.5 text-center text-amber-600 font-extrabold">0.0%</td>
                            <td className="py-2.5 text-center text-slate-800 font-extrabold">0%</td>
                            <td className="py-2.5"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <span>Phê duyệt Main Task — Phòng Điện:</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[11px]">
                          <IconClock size={13} />
                          <span>Chờ phê duyệt</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
                          <IconCheck size={14} /> <span>Phê duyệt</span>
                        </button>
                        <button type="button" className="bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
                          <IconX size={14} /> <span>Từ chối</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CARD 8: PHÒNG CẢNH QUAN */}
              <div className="bg-[#406c89]/5 border border-[#406c89]/20 rounded-2xl overflow-hidden shadow-2xs">
                <div
                  onClick={() => toggleL2Dept('pcq')}
                  className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-[#406c89]/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <IconChevronDown size={16} className={`text-[#406c89] transition-transform duration-200 ${expandedL2Depts.includes('pcq') ? '' : '-rotate-90'}`} />
                    <IconBuilding size={16} className="text-[#406c89]" />
                    <h4 className="font-extrabold text-xs text-[#406c89]">Phòng Cảnh Quan</h4>
                    <span className="text-[11px] text-[#406c89]/70 italic font-normal">— bạn có thể chỉnh sửa</span>
                  </div>
                  <div className="font-extrabold text-xs text-amber-600">
                    Tổng: 0.0%
                  </div>
                </div>

                {expandedL2Depts.includes('pcq') && (
                  <div className="bg-white border-t border-[#406c89]/15 p-4 space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-[11px] font-bold text-[#406c89] border-b border-[#406c89]/15 pb-2">
                            <th className="pb-2 font-bold">Tên Main Task / Nhóm</th>
                            <th className="pb-2 font-bold text-center">Giờ DK</th>
                            <th className="pb-2 font-bold text-center">Giờ TT</th>
                            <th className="pb-2 font-bold text-center">% đóng góp trong phòng</th>
                            <th className="pb-2 font-bold text-center">% đóng góp dự án</th>
                            <th className="pb-2 font-bold">Nhân sự</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KHỞI TẠO DỰ ÁN - NHÓM 1</td>
                            <td className="py-2 text-center text-slate-500 font-medium">3h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">3h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Đỗ Ngọc Duyên (3h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KHỞI TẠO DỰ ÁN - NHÓM 2</td>
                            <td className="py-2 text-center text-slate-500 font-medium">0.5h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">0.5h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Đỗ Ngọc Duyên (0.5h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">CHUẨN BỊ - NHÓM 1</td>
                            <td className="py-2 text-center text-slate-500 font-medium">84.5h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">84.5h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Tống Thị Thu (49.5h), Đỗ Ngọc Duyên (28h), Nguyễn T...</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">QUẢN LÝ VÀ CHỦ TRÌ DỰ ÁN</td>
                            <td className="py-2 text-center text-slate-500 font-medium">16h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">16h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Phạm Thị Thu Trang (8h), Đỗ Ngọc Duyên (8h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">CHUẨN BỊ - NHÓM 2</td>
                            <td className="py-2 text-center text-slate-500 font-medium">342.5h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">342h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Sắm Thị Thủy (89h), Vũ Minh Hằng (84h), Đỗ Ngọc Duy...</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">HOÀN THIỆN TRÊN NỀN - NHÓM 1</td>
                            <td className="py-2 text-center text-slate-500 font-medium">129.5h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">129.5h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Đỗ Ngọc Duyên (67h), Sắm Thị Thủy (44.5h), Nguyễn N...</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">HOÀN THIỆN TRÊN NỀN - NHÓM 2</td>
                            <td className="py-2 text-center text-slate-500 font-medium">188.6h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">183.6h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Vũ Minh Hằng (65.5h), Nguyễn Ngọc Lan Anh (55.6h), ...</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">CHỈNH SỬA SAU NGHIỆM THU</td>
                            <td className="py-2 text-center text-slate-500 font-medium">31.5h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">31.5h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">0.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Đỗ Ngọc Duyên (19.5h), Vũ Minh Hằng (12h)</td>
                          </tr>
                          <tr className="font-bold border-t border-slate-200 bg-slate-50/60">
                            <td className="py-2.5 font-extrabold text-[#406c89]">Tổng Phòng Cảnh Quan</td>
                            <td className="py-2.5 text-center text-slate-800">796.1h</td>
                            <td className="py-2.5 text-center text-amber-600">790.6h</td>
                            <td className="py-2.5 text-center text-amber-600 font-extrabold">0.0%</td>
                            <td className="py-2.5 text-center text-slate-800 font-extrabold">0%</td>
                            <td className="py-2.5"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <span>Phê duyệt Main Task — Phòng Cảnh Quan:</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[11px]">
                          <IconClock size={13} />
                          <span>Chờ phê duyệt</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
                          <IconCheck size={14} /> <span>Phê duyệt</span>
                        </button>
                        <button type="button" className="bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
                          <IconX size={14} /> <span>Từ chối</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CARD 9: PHÒNG CÔNG NGHỆ VÀ THIẾT KẾ */}
              <div className="bg-[#406c89]/5 border border-[#406c89]/20 rounded-2xl overflow-hidden shadow-2xs">
                <div
                  onClick={() => toggleL2Dept('pcntk')}
                  className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-[#406c89]/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <IconChevronDown size={16} className={`text-[#406c89] transition-transform duration-200 ${expandedL2Depts.includes('pcntk') ? '' : '-rotate-90'}`} />
                    <IconBuilding size={16} className="text-[#406c89]" />
                    <h4 className="font-extrabold text-xs text-[#406c89]">Phòng Công nghệ và Thiết kế</h4>
                    <span className="text-[11px] text-[#406c89]/70 italic font-normal">— bạn có thể chỉnh sửa</span>
                  </div>
                  <div className="font-extrabold text-xs text-emerald-600">
                    Tổng: 100.0%
                  </div>
                </div>

                {expandedL2Depts.includes('pcntk') && (
                  <div className="bg-white border-t border-[#406c89]/15 p-4 space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-[11px] font-bold text-[#406c89] border-b border-[#406c89]/15 pb-2">
                            <th className="pb-2 font-bold">Tên Main Task / Nhóm</th>
                            <th className="pb-2 font-bold text-center">Giờ DK</th>
                            <th className="pb-2 font-bold text-center">Giờ TT</th>
                            <th className="pb-2 font-bold text-center">% đóng góp trong phòng</th>
                            <th className="pb-2 font-bold text-center">% đóng góp dự án</th>
                            <th className="pb-2 font-bold">Nhân sự</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">KHỞI TẠO DỰ ÁN</td>
                            <td className="py-2 text-center text-slate-500 font-medium">1h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">1h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">24.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Nguyễn Quang Triệu (1h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">NGHIỆM THU 80%</td>
                            <td className="py-2 text-center text-slate-500 font-medium">2h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">2h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">14.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Cao Trường Thiên (2h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">NGHIỆM THU 100%</td>
                            <td className="py-2 text-center text-slate-500 font-medium">2h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">2h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">14.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Cao Trường Thiên (2h)</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">TRUYỀN THÔNG DỰ ÁN</td>
                            <td className="py-2 text-center text-slate-500 font-medium">40h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">36h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">38.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Tạ Hiển Trang (8h), Lưu Quốc Nhật (8h), Nguy...</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#406c89]">VẬN CHUYỂN, LẮP ĐẶT & BÀN GIAO MÔ HÌNH</td>
                            <td className="py-2 text-center text-slate-500 font-medium">12h</td>
                            <td className="py-2 text-center text-amber-600 font-bold">12h</td>
                            <td className="py-2 text-center font-bold text-[#406c89]">
                              <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">10.0% <IconPencil size={13} className="text-slate-400" /></span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-medium">0.00%</td>
                            <td className="py-2 text-slate-500 font-medium">Cao Trường Thiên (10h), Nguyễn Quang Linh (...</td>
                          </tr>
                          <tr className="font-bold border-t border-slate-200 bg-slate-50/60">
                            <td className="py-2.5 font-extrabold text-[#406c89]">Tổng Phòng Công nghệ và Thiết kế</td>
                            <td className="py-2.5 text-center text-slate-800">57h</td>
                            <td className="py-2.5 text-center text-amber-600">53h</td>
                            <td className="py-2.5 text-center text-emerald-600 font-extrabold">100.0%</td>
                            <td className="py-2.5 text-center text-slate-800 font-extrabold">0%</td>
                            <td className="py-2.5"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <span>Phê duyệt Main Task — Phòng Công nghệ và Thiết kế:</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[11px]">
                          <IconClock size={13} />
                          <span>Chờ phê duyệt</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
                          <IconCheck size={14} /> <span>Phê duyệt</span>
                        </button>
                        <button type="button" className="bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
                          <IconX size={14} /> <span>Từ chối</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* SECTION: LỚP 3 — % THAM GIA DỰ ÁN CỦA TỪNG NHÂN SỰ (TỰ ĐỘNG) */}
            <div className="space-y-3.5 pt-4 border-t border-slate-200/80">
              
              {/* Header Title Layer 3 */}
              <div className="bg-emerald-50 border border-emerald-200/80 p-3 px-4 rounded-xl flex items-center justify-between">
                <div
                  onClick={() => setIsSection3Open(!isSection3Open)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <IconChevronDown size={16} className={`text-emerald-700 transition-transform duration-200 ${isSection3Open ? '' : '-rotate-90'}`} />
                  <IconChartBar size={16} className="text-emerald-700" />
                  <span className="font-extrabold text-xs text-emerald-800">
                    Lớp 3 — % Tham gia dự án của từng Nhân sự (tự động)
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-500">52 nhân sự</span>
              </div>

              {isSection3Open && (
                <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-[11px] font-bold text-slate-400 border-b border-slate-200 bg-slate-50/70">
                          <th className="py-2.5 px-4 font-bold w-24">Mã NV</th>
                          <th className="py-2.5 px-4 font-bold">Nhân sự</th>
                          <th className="py-2.5 px-4 font-bold text-center">% Tham gia dự án</th>
                          <th className="py-2.5 px-4 font-bold text-center">% Trong phòng ban</th>
                          <th className="py-2.5 px-4 font-bold text-right">Chi tiết</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {/* Group: Ban Giám đốc */}
                        <tr className="bg-emerald-50/60 border-y border-emerald-100">
                          <td colSpan={5} className="py-2 px-4 font-extrabold text-xs text-emerald-900">Ban Giám đốc</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0109</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Nguyễn Thanh Tuấn</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]">
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div>
                              <span>0.00%</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0108</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Phùng Bích Thảo</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]">
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div>
                              <span>0.00%</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0119</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Nguyễn Thanh Tùng</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]">
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div>
                              <span>0.00%</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>

                        {/* Group: Khối Văn phòng */}
                        <tr className="bg-emerald-50/60 border-y border-emerald-100">
                          <td colSpan={5} className="py-2 px-4 font-extrabold text-xs text-emerald-900">Khối Văn phòng</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0111</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Bùi Thị Duyên</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]">
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div>
                              <span>0.00%</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 2 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0127</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Nguyễn Phú Quang</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]">
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div>
                              <span>0.00%</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 4 công việc</button></td>
                        </tr>

                        {/* Group: Phòng Khai triển */}
                        <tr className="bg-emerald-50/60 border-y border-emerald-100">
                          <td colSpan={5} className="py-2 px-4 font-extrabold text-xs text-emerald-900">Phòng Khai triển</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">-</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Lê Thanh An</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">-</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Lê Quốc Long</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 5 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0113</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Trần Diễm My</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 7 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0111</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Phạm Tiến Thành</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0117</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Dương Việt Anh</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0117</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Nguyễn Thiên Hương</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 2 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0117</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Đào Văn Thọ</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>

                        {/* Group: Phòng Cắt */}
                        <tr className="bg-emerald-50/60 border-y border-emerald-100">
                          <td colSpan={5} className="py-2 px-4 font-extrabold text-xs text-emerald-900">Phòng Cắt</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">-</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">HOÀNG HỮU VINH</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 5 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">-</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">LÊ TRUNG HIẾU</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 4 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">-</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Máy 1 (CMH 1390-B-A)</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 2 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">-</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Máy 2 (CMH 1390-B-A)</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">-</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Máy 2 (CMH 1391-B-A)</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">-</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Máy 4 (CMH 1390-B-A)</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 2 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">-</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">NGUYỄN TUẤN VIỆT</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 7 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">-</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Hoàng Hữu Vinh</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>

                        {/* Group: Phòng Ghép */}
                        <tr className="bg-emerald-50/60 border-y border-emerald-100">
                          <td colSpan={5} className="py-2 px-4 font-extrabold text-xs text-emerald-900">Phòng Ghép</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">-</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Nguyễn hoàng phi hùng</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 5 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0112</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Đinh Đức Lợi</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 8 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0112</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Nguyễn Tuân</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 4 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0111</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Đỗ Thị Luyện</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 4 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0116</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Lương Ngọc Thành</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 3 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0117</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Nguyễn Thị Duyên Thảo (BTG)</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0111</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Nguyễn Quang Linh (BTG)</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0114</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Đặng Việt Hiệp (BTG)</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0114</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Trịnh Quang Minh (BTG)</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">-</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Thân Thị Nguyệt</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>

                        {/* Group: Phòng Mộc Sơn */}
                        <tr className="bg-emerald-50/60 border-y border-emerald-100">
                          <td colSpan={5} className="py-2 px-4 font-extrabold text-xs text-emerald-900">Phòng Mộc Sơn</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0113</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Nguyễn Minh Hiếu</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 3 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0108</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Đinh Hữu Sử</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 5 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0118</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Hoàng Quyết Thắng</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 2 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0118</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Quan Minh Hoàng</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 3 công việc</button></td>
                        </tr>

                        {/* Group: Phòng Điện */}
                        <tr className="bg-emerald-50/60 border-y border-emerald-100">
                          <td colSpan={5} className="py-2 px-4 font-extrabold text-xs text-emerald-900">Phòng Điện</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">-</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Đinh Quang Huy (BTG)</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0115</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Bùi Văn Lộc</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 8 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0111</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Lâm Vĩnh Hưng</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 2 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0111</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Hà Tùng Lâm</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 2 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0111</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Nguyễn Văn Đức (BTG)</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0118</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Phạm Văn Trọng (BTG)</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>

                        {/* Group: Phòng Cảnh Quan */}
                        <tr className="bg-emerald-50/60 border-y border-emerald-100">
                          <td colSpan={5} className="py-2 px-4 font-extrabold text-xs text-emerald-900">Phòng Cảnh Quan</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0119</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Phạm Thị Thu Trang</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0118</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Vũ Minh Hằng</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 3 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0118</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Nguyễn Ngọc Lan Anh</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0111</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Đỗ Ngọc Duyên</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 6 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0115</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Sắm Thị Thủy</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 2 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0116</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Tống Thị Thu</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0118</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Nguyễn Phương Ngọc</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>

                        {/* Group: Phòng Công nghệ và Thiết kế */}
                        <tr className="bg-emerald-50/60 border-y border-emerald-100">
                          <td colSpan={5} className="py-2 px-4 font-extrabold text-xs text-emerald-900">Phòng Công nghệ và Thiết kế</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0114</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Cao Trường Thiên</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 3 công việc</button></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-400 font-mono">NV0114</td>
                          <td className="py-2.5 px-4 font-bold text-slate-800">Nguyễn Quang Linh</td>
                          <td className="py-2.5 px-4 text-center font-bold text-[#406c89]"><div className="flex items-center justify-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#406c89] h-1.5 rounded-full w-0" /></div><span>0.00%</span></div></td>
                          <td className="py-2.5 px-4 text-center text-amber-600 font-bold">0.0%</td>
                          <td className="py-2.5 px-4 text-right"><button type="button" className="text-[#406c89] hover:underline font-semibold cursor-pointer">Xem 1 công việc</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-700 uppercase tracking-wider">Phê duyệt Báo cáo</span>
                    <button type="button" className="bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs px-4 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
                      <IconX size={14} /> <span>Từ chối</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* SECTION: BÁO CÁO KHỐI LƯỢNG CÔNG VIỆC (ANALYTICS REPORT DASHBOARD) */}
        <div className="pt-6 border-t-2 border-slate-200 space-y-6">
          <PheDuyetBaoCaoTab project={project} />
          <BangTongHopNhanSuTab />
        </div>

      </div>

    </div>
  );
}
