"use client";

import React, { useState } from 'react';
import {
  IconTrendingUp,
  IconCircleCheck,
  IconClock,
  IconAlertTriangle,
  IconMessageCircle,
  IconBell,
  IconPlus,
  IconChevronRight
} from '@tabler/icons-react';
import { DuAnItem } from '../../../index';

interface BaoCaoTienDoTabProps {
  project: DuAnItem;
}

export default function BaoCaoTienDoTab({ project }: BaoCaoTienDoTabProps) {
  const [comments, setComments] = useState<string[]>([]);
  const [showAddCommentInput, setShowAddCommentInput] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  
  // State for expanded department task breakdown tables
  const [expandedDepts, setExpandedDepts] = useState<string[]>(['bgd', 'kvp', 'pkt', 'pcat', 'pghep', 'pmoc', 'pdien', 'pcq', 'pcntk']);

  const toggleDeptDetails = (deptId: string) => {
    setExpandedDepts(prev =>
      prev.includes(deptId)
        ? prev.filter(id => id !== deptId)
        : [...prev, deptId]
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    setComments(prev => [newCommentText.trim(), ...prev]);
    setNewCommentText('');
    setShowAddCommentInput(false);
  };

  // Detailed 9 department progress stats
  const deptProgressList = [
    {
      name: 'Ban Giám đốc',
      color: '#3b82f6',
      percent: 100,
      tongCv: 16,
      hieuSuat: '~ -6% hiệu suất',
      hieuSuatType: 'neg',
      hoanThanh: 16,
      dangLam: 0,
      slKeHoach: 17,
      gioKh: '18h',
      gioTh: '19.0h'
    },
    {
      name: 'Khối Văn phòng',
      color: '#a855f7',
      percent: 93,
      tongCv: 43,
      hieuSuat: '~ +33% hiệu suất',
      hieuSuatType: 'pos',
      hoanThanh: 40,
      dangLam: 0,
      slKeHoach: 42,
      gioKh: '48h',
      gioTh: '32.0h'
    },
    {
      name: 'Phòng Khai triển',
      color: '#f97316',
      percent: 100,
      tongCv: 27,
      hieuSuat: '~ -12% hiệu suất',
      hieuSuatType: 'neg',
      hoanThanh: 27,
      dangLam: 0,
      slKeHoach: 35,
      gioKh: '151h',
      gioTh: '168.5h'
    },
    {
      name: 'Phòng Cắt',
      color: '#06b6d4',
      percent: 100,
      tongCv: 39,
      hieuSuat: '~ -194% hiệu suất',
      hieuSuatType: 'neg',
      hoanThanh: 39,
      dangLam: 0,
      slKeHoach: 107,
      gioKh: '216h',
      gioTh: '636.0h'
    },
    {
      name: 'Phòng Ghép',
      color: '#22c55e',
      percent: 100,
      tongCv: 94,
      hieuSuat: '— 0% hiệu suất',
      hieuSuatType: 'neutral',
      hoanThanh: 94,
      dangLam: 0,
      slKeHoach: 1541,
      gioKh: '855h',
      gioTh: '854.5h'
    },
    {
      name: 'Phòng Mộc Sơn',
      color: '#eab308',
      percent: 100,
      tongCv: 40,
      hieuSuat: '— 0% hiệu suất',
      hieuSuatType: 'neutral',
      hoanThanh: 40,
      dangLam: 0,
      slKeHoach: 533,
      gioKh: '271h',
      gioTh: '271.0h'
    },
    {
      name: 'Phòng Điện',
      color: '#ec4899',
      percent: 100,
      tongCv: 52,
      hieuSuat: '— 0% hiệu suất',
      hieuSuatType: 'neutral',
      hoanThanh: 52,
      dangLam: 0,
      slKeHoach: 11177,
      gioKh: '253h',
      gioTh: '253.0h'
    },
    {
      name: 'Phòng Cảnh Quan',
      color: '#6366f1',
      percent: 100,
      tongCv: 158,
      hieuSuat: '~ +1% hiệu suất',
      hieuSuatType: 'pos',
      hoanThanh: 158,
      dangLam: 0,
      slKeHoach: 34554,
      gioKh: '796h',
      gioTh: '790.6h'
    },
    {
      name: 'Phòng Công nghệ và Thiết kế',
      color: '#8b5cf6',
      percent: 100,
      tongCv: 10,
      hieuSuat: '~ +7% hiệu suất',
      hieuSuatType: 'pos',
      hoanThanh: 10,
      dangLam: 0,
      slKeHoach: 10,
      gioKh: '57h',
      gioTh: '53.0h'
    }
  ];

  return (
    <div className="space-y-4 text-xs animate-fade-in select-none max-h-[550px] overflow-y-auto pr-2 pb-8 [scrollbar-width:thin]">
      
      {/* 1. TOP ROW: 4 METRIC CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Card 1: Tiến độ tổng thể */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <IconTrendingUp size={18} className="text-[#406c89] shrink-0" />
            <span className="font-semibold text-slate-500 text-xs">Tiến độ tổng thể</span>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-[#406c89] tracking-tight">
              {project?.tienDo || 99}%
            </h3>
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              9/7 phòng đã triển khai
            </p>
          </div>
        </div>

        {/* Card 2: CV hoàn thành */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <IconCircleCheck size={18} className="text-emerald-600 shrink-0" />
            <span className="font-semibold text-slate-500 text-xs">CV hoàn thành</span>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-emerald-600 tracking-tight">
              476/479
            </h3>
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              công việc
            </p>
          </div>
        </div>

        {/* Card 3: Giờ công KH */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <IconClock size={18} className="text-[#406c89] shrink-0" />
            <span className="font-semibold text-slate-500 text-xs">Giờ công KH</span>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-[#406c89] tracking-tight">
              2664h
            </h3>
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              tổng kế hoạch
            </p>
          </div>
        </div>

        {/* Card 4: Giờ công TH */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <IconAlertTriangle size={18} className="text-amber-600 shrink-0" />
            <span className="font-semibold text-slate-500 text-xs">Giờ công TH</span>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-amber-600 tracking-tight">
              3077.6h
            </h3>
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              thực tế báo cáo
            </p>
          </div>
        </div>

      </div>

      {/* 2. MIDDLE CARD: TIẾN ĐỘ HOÀN THÀNH TỔNG DỰ ÁN */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
            Tiến độ hoàn thành tổng dự án
          </h3>
          <span className="font-extrabold text-sm text-[#406c89]">
            {project?.tienDo || 99}%
          </span>
        </div>

        {/* Thick Blue Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-200/60">
          <div
            className="bg-[#406c89] h-full rounded-full transition-all duration-500"
            style={{ width: `${project?.tienDo || 99}%` }}
          />
        </div>

        {/* Sub-info below bar */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="text-xs text-slate-400 font-medium">
            476 / 479 công việc hoàn thành
          </span>

          <span className="inline-flex items-center gap-1 bg-rose-50 border border-rose-200/80 text-rose-600 font-bold text-xs px-3 py-1 rounded-full shadow-2xs">
            ~ Chậm hơn KH 16%
          </span>
        </div>
      </div>

      {/* 3. BOTTOM CARD: NHẬN XÉT HÀNG TUẦN CỦA CHỦ NHIỆM DỰ ÁN */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <IconMessageCircle size={18} className="text-[#406c89] shrink-0" />
            <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
              Nhận xét hàng tuần của Chủ nhiệm dự án
            </h3>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#406c89]/10 text-[#406c89] border border-[#406c89]/20 shrink-0">
              Đánh giá hiện tại: Vượt tiến độ
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/90 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <IconBell size={15} className="text-slate-500" />
              <span>Thông báo phát sinh báo cáo tuần</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAddCommentInput(!showAddCommentInput)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200/90 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <IconPlus size={15} className="text-slate-500" />
              <span>Thêm nhận xét</span>
            </button>
          </div>
        </div>

        {/* Input box to add comment */}
        {showAddCommentInput && (
          <form onSubmit={handleAddComment} className="flex gap-2 pt-2">
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Nhập nội dung nhận xét hàng tuần..."
              className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 focus:border-[#406c89] focus:ring-2 focus:ring-[#406c89]/20 outline-none text-xs text-slate-800 font-medium"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#406c89] text-white rounded-xl font-bold text-xs hover:bg-[#345972] transition-colors"
            >
              Lưu
            </button>
          </form>
        )}

        {/* Comment list or Centered Empty State */}
        {comments.length > 0 ? (
          <div className="space-y-2 pt-2">
            {comments.map((comment, index) => (
              <div key={index} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 font-medium">
                • {comment}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-slate-400 font-medium text-xs">
            Chưa có nhận xét hàng tuần nào.
          </div>
        )}
      </div>

      {/* 4. SECTION: TIẾN ĐỘ THEO TỪNG PHÒNG BAN */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
          Tiến độ theo từng phòng ban
        </h3>

        <div className="divide-y divide-slate-100 space-y-4">
          {deptProgressList.map((dept, index) => (
            <div key={index} className="pt-3.5 first:pt-0 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                    style={{ backgroundColor: dept.color }}
                  />
                  <h4 className="font-bold text-xs text-slate-900">{dept.name}</h4>
                </div>
                <span
                  className="font-extrabold text-xs"
                  style={{ color: dept.color }}
                >
                  {dept.percent}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${dept.percent}%`, backgroundColor: dept.color }}
                />
              </div>

              {/* 6 Metric Columns Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-[11px] pt-1">
                <div>
                  <span className="font-extrabold text-slate-800 text-xs block">{dept.tongCv}</span>
                  <span className="text-slate-400 font-medium block">Tổng CV</span>
                  <span className={`font-bold text-[10px] mt-0.5 block ${
                    dept.hieuSuatType === 'pos'
                      ? 'text-emerald-600'
                      : dept.hieuSuatType === 'neg'
                      ? 'text-rose-500'
                      : 'text-slate-400'
                  }`}>
                    {dept.hieuSuat}
                  </span>
                </div>

                <div>
                  <span className="font-extrabold text-emerald-600 text-xs block">{dept.hoanThanh}</span>
                  <span className="text-slate-400 font-medium block">Hoàn thành</span>
                </div>

                <div>
                  <span className="font-extrabold text-blue-600 text-xs block">{dept.dangLam}</span>
                  <span className="text-slate-400 font-medium block">Đang làm</span>
                </div>

                <div>
                  <span className="font-extrabold text-slate-700 text-xs block">{dept.slKeHoach}</span>
                  <span className="text-slate-400 font-medium block">SL kế hoạch</span>
                </div>

                <div>
                  <span className="font-extrabold text-slate-700 text-xs block">{dept.gioKh}</span>
                  <span className="text-slate-400 font-medium block">Giờ KH</span>
                </div>

                <div>
                  <span className="font-extrabold text-amber-600 text-xs block">{dept.gioTh}</span>
                  <span className="text-slate-400 font-medium block">Giờ TH</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. SECTION: BẢNG CHI TIẾT ĐẦU MỤC CÔNG VIỆC THEO PHÒNG BAN (EXPANDABLE) */}
      <div className="space-y-3 pt-2">
        
        {/* Department 1: Ban Giám đốc */}
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
          <div
            onClick={() => toggleDeptDetails('bgd')}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block shrink-0" />
              <h4 className="font-extrabold text-xs text-slate-900">Ban Giám đốc</h4>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>16/16 CV · 100%</span>
              <IconChevronRight
                size={16}
                className={`transition-transform duration-200 ${expandedDepts.includes('bgd') ? 'rotate-90' : ''}`}
              />
            </div>
          </div>

          {expandedDepts.includes('bgd') && (
            <div className="border-t border-slate-100 p-4 pt-2 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[11px] font-bold text-slate-400 border-b border-slate-100 pb-2">
                    <th className="pb-2 font-bold">Đầu mục công việc</th>
                    <th className="pb-2 font-bold text-center">Giờ KH</th>
                    <th className="pb-2 font-bold text-center">Giờ TH</th>
                    <th className="pb-2 font-bold text-center">%HT</th>
                    <th className="pb-2 font-bold text-center">Hoàn thành</th>
                    <th className="pb-2 font-bold text-center">Đang làm</th>
                    <th className="pb-2 font-bold text-center">Tổng CV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80">
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">khởi tạo và phê duyệt</td>
                    <td className="py-2.5 text-center text-slate-500 font-medium">18h</td>
                    <td className="py-2.5 text-center text-amber-600 font-semibold">19.0h</td>
                    <td className="py-2.5 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2.5 text-center font-bold text-emerald-600">16/16</td>
                    <td className="py-2.5 text-center font-medium text-slate-400">0</td>
                    <td className="py-2.5 text-center font-semibold text-slate-700">16</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Department 2: Khối Văn phòng */}
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
          <div
            onClick={() => toggleDeptDetails('kvp')}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block shrink-0" />
              <h4 className="font-extrabold text-xs text-slate-900">Khối Văn phòng</h4>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>40/43 CV · 93%</span>
              <IconChevronRight
                size={16}
                className={`transition-transform duration-200 ${expandedDepts.includes('kvp') ? 'rotate-90' : ''}`}
              />
            </div>
          </div>

          {expandedDepts.includes('kvp') && (
            <div className="border-t border-slate-100 p-4 pt-2 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[11px] font-bold text-slate-400 border-b border-slate-100 pb-2">
                    <th className="pb-2 font-bold">Đầu mục công việc</th>
                    <th className="pb-2 font-bold text-center">Giờ KH</th>
                    <th className="pb-2 font-bold text-center">Giờ TH</th>
                    <th className="pb-2 font-bold text-center">%HT</th>
                    <th className="pb-2 font-bold text-center">Hoàn thành</th>
                    <th className="pb-2 font-bold text-center">Đang làm</th>
                    <th className="pb-2 font-bold text-center">Tổng CV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80">
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">CHUẨN BỊ HỢP ĐỒNG</td>
                    <td className="py-2.5 text-center text-slate-500 font-medium">8h</td>
                    <td className="py-2.5 text-center text-amber-600 font-semibold">6.0h</td>
                    <td className="py-2.5 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2.5 text-center font-bold text-emerald-600">8/8</td>
                    <td className="py-2.5 text-center font-medium text-slate-400">0</td>
                    <td className="py-2.5 text-center font-semibold text-slate-700">8</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">KHỞI TẠO DỰ ÁN</td>
                    <td className="py-2.5 text-center text-slate-500 font-medium">10h</td>
                    <td className="py-2.5 text-center text-amber-600 font-semibold">5.5h</td>
                    <td className="py-2.5 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2.5 text-center font-bold text-emerald-600">10/10</td>
                    <td className="py-2.5 text-center font-medium text-slate-400">0</td>
                    <td className="py-2.5 text-center font-semibold text-slate-700">10</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">THEO DÕI THỰC HIỆN HỢP ĐỒNG</td>
                    <td className="py-2.5 text-center text-slate-500 font-medium">14h</td>
                    <td className="py-2.5 text-center text-amber-600 font-semibold">14.0h</td>
                    <td className="py-2.5 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2.5 text-center font-bold text-emerald-600">14/14</td>
                    <td className="py-2.5 text-center font-medium text-slate-400">0</td>
                    <td className="py-2.5 text-center font-semibold text-slate-700">14</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">CHỈNH SỬA VÀ VẬN CHUYỂN</td>
                    <td className="py-2.5 text-center text-slate-500 font-medium">16h</td>
                    <td className="py-2.5 text-center text-amber-600 font-semibold">6.5h</td>
                    <td className="py-2.5 text-center font-extrabold text-blue-600">73%</td>
                    <td className="py-2.5 text-center font-bold text-slate-800">8/11</td>
                    <td className="py-2.5 text-center font-medium text-slate-400">0</td>
                    <td className="py-2.5 text-center font-semibold text-slate-700">11</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Department 3: Phòng Khai triển */}
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
          <div
            onClick={() => toggleDeptDetails('pkt')}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block shrink-0" />
              <h4 className="font-extrabold text-xs text-slate-900">Phòng Khai triển</h4>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>27/27 CV · 100%</span>
              <IconChevronRight
                size={16}
                className={`transition-transform duration-200 ${expandedDepts.includes('pkt') ? 'rotate-90' : ''}`}
              />
            </div>
          </div>

          {expandedDepts.includes('pkt') && (
            <div className="border-t border-slate-100 p-4 pt-2 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[11px] font-bold text-slate-400 border-b border-slate-100 pb-2">
                    <th className="pb-2 font-bold">Đầu mục công việc</th>
                    <th className="pb-2 font-bold text-center">Giờ KH</th>
                    <th className="pb-2 font-bold text-center">Giờ TH</th>
                    <th className="pb-2 font-bold text-center">%HT</th>
                    <th className="pb-2 font-bold text-center">Hoàn thành</th>
                    <th className="pb-2 font-bold text-center">Đang làm</th>
                    <th className="pb-2 font-bold text-center">Tổng CV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80">
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KHỞI TẠO DỰ ÁN - NHÓM 1</td>
                    <td className="py-2 text-center text-slate-500 font-medium">4h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">4.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KHỞI TẠO DỰ ÁN - NHÓM 2</td>
                    <td className="py-2 text-center text-slate-500 font-medium">9h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">9.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">5/5</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">5</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KHỞI TẠO DỰ ÁN - NHÓM 3</td>
                    <td className="py-2 text-center text-slate-500 font-medium">0.5h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">0.5h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KHUNG CHÂN - MẶT BẢNG</td>
                    <td className="py-2 text-center text-slate-500 font-medium">2h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">4.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">2/2</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">2</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KÍNH BIỂN/ LỐNG KÍNH</td>
                    <td className="py-2 text-center text-slate-500 font-medium">1h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">1.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KHAI TRIỂN NỀN MÔ HÌNH</td>
                    <td className="py-2 text-center text-slate-500 font-medium">1h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">1.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KHAI TRIỂN PHỤ TRỢ MÔ HÌNH</td>
                    <td className="py-2 text-center text-slate-500 font-medium">2h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">2.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KHAI TRIỂN NỀN TÍT + CHỦ THÍCH MÔ HÌNH</td>
                    <td className="py-2 text-center text-slate-500 font-medium">4h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">4.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">2/2</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">2</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KHAI TRIỂN CÔNG TRÌNH - NHÓM 1</td>
                    <td className="py-2 text-center text-slate-500 font-medium">84h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">84.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">7/7</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">7</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KHAI TRIỂN CÔNG TRÌNH - NHÓM 2</td>
                    <td className="py-2 text-center text-slate-500 font-medium">1h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">1.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">XẾP & VẬN HÀNH LỆNH IN 3D</td>
                    <td className="py-2 text-center text-slate-500 font-medium">16h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">24.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">3/3</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">3</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">VẬN CHUYỂN, LẮP ĐẶT & BÀN GIAO MÔ HÌNH</td>
                    <td className="py-2 text-center text-slate-500 font-medium">26h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">34.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">2/2</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Department 4: Phòng Cắt */}
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
          <div
            onClick={() => toggleDeptDetails('pcat')}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block shrink-0" />
              <h4 className="font-extrabold text-xs text-slate-900">Phòng Cắt</h4>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>39/39 CV · 100%</span>
              <IconChevronRight
                size={16}
                className={`transition-transform duration-200 ${expandedDepts.includes('pcat') ? 'rotate-90' : ''}`}
              />
            </div>
          </div>

          {expandedDepts.includes('pcat') && (
            <div className="border-t border-slate-100 p-4 pt-2 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[11px] font-bold text-slate-400 border-b border-slate-100 pb-2">
                    <th className="pb-2 font-bold">Đầu mục công việc</th>
                    <th className="pb-2 font-bold text-center">Giờ KH</th>
                    <th className="pb-2 font-bold text-center">Giờ TH</th>
                    <th className="pb-2 font-bold text-center">%HT</th>
                    <th className="pb-2 font-bold text-center">Hoàn thành</th>
                    <th className="pb-2 font-bold text-center">Đang làm</th>
                    <th className="pb-2 font-bold text-center">Tổng CV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80">
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KHỞI TẠO DỰ ÁN - NHÓM 1</td>
                    <td className="py-2 text-center text-slate-500 font-medium">4h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">4.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">4/4</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">4</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">XẾP CẮT CÔNG TRÌNH</td>
                    <td className="py-2 text-center text-slate-500 font-medium">28h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">112.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">7/7</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">7</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">TRÔNG MÁY CẮT, RA VÀO PHÔI CẮT CÔNG TRÌNH</td>
                    <td className="py-2 text-center text-slate-500 font-medium">28h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">112.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">7/7</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">7</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">CẮT CÔNG TRÌNH</td>
                    <td className="py-2 text-center text-slate-500 font-medium">56h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">112.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">7/7</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">7</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">XẾP CẮT ĐỊA HÌNH</td>
                    <td className="py-2 text-center text-slate-500 font-medium">8h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">32.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">TRÔNG MÁY CẮT, RA VÀO PHÔI CẮT ĐỊA HÌNH</td>
                    <td className="py-2 text-center text-slate-500 font-medium">8h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">32.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">CẮT ĐỊA HÌNH</td>
                    <td className="py-2 text-center text-slate-500 font-medium">16h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">32.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">XẾP CẮT NỀN</td>
                    <td className="py-2 text-center text-slate-500 font-medium">8h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">32.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">TRÔNG MÁY CẮT, RA VÀO PHÔI CẮT NỀN</td>
                    <td className="py-2 text-center text-slate-500 font-medium">8h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">32.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">CẮT NỀN</td>
                    <td className="py-2 text-center text-slate-500 font-medium">16h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">32.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">XẾP CẮT PHỤ TRỢ</td>
                    <td className="py-2 text-center text-slate-500 font-medium">4h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">16.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">XẾP CẮT TÍT</td>
                    <td className="py-2 text-center text-slate-500 font-medium">4h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">16.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">TRÔNG MÁY CẮT, RA VÀO PHÔI CẮT PHỤ TRỢ</td>
                    <td className="py-2 text-center text-slate-500 font-medium">4h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">16.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">TRÔNG MÁY CẮT, RA VÀO PHÔI CẮT TÍT</td>
                    <td className="py-2 text-center text-slate-500 font-medium">4h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">16.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">CẮT PHỤ TRỢ</td>
                    <td className="py-2 text-center text-slate-500 font-medium">8h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">16.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">CẮT TÍT</td>
                    <td className="py-2 text-center text-slate-500 font-medium">8h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">16.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">VẬN CHUYỂN, LẮP ĐẶT & BÀN GIAO MÔ HÌNH</td>
                    <td className="py-2 text-center text-slate-500 font-medium">4h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">8.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">2/2</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Department 5: Phòng Ghép */}
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
          <div
            onClick={() => toggleDeptDetails('pghep')}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shrink-0" />
              <h4 className="font-extrabold text-xs text-slate-900">Phòng Ghép</h4>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>94/94 CV · 100%</span>
              <IconChevronRight
                size={16}
                className={`transition-transform duration-200 ${expandedDepts.includes('pghep') ? 'rotate-90' : ''}`}
              />
            </div>
          </div>

          {expandedDepts.includes('pghep') && (
            <div className="border-t border-slate-100 p-4 pt-2 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[11px] font-bold text-slate-400 border-b border-slate-100 pb-2">
                    <th className="pb-2 font-bold">Đầu mục công việc</th>
                    <th className="pb-2 font-bold text-center">Giờ KH</th>
                    <th className="pb-2 font-bold text-center">Giờ TH</th>
                    <th className="pb-2 font-bold text-center">%HT</th>
                    <th className="pb-2 font-bold text-center">Hoàn thành</th>
                    <th className="pb-2 font-bold text-center">Đang làm</th>
                    <th className="pb-2 font-bold text-center">Tổng CV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80">
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KHỞI TẠO DỰ ÁN - NHÓM 1</td>
                    <td className="py-2 text-center text-slate-500 font-medium">3h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">3.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">2/2</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">2</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KHỞI TẠO DỰ ÁN - NHÓM 2</td>
                    <td className="py-2 text-center text-slate-500 font-medium">1h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">1.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">QUẢN LÝ VÀ CHỦ TRÌ DỰ ÁN</td>
                    <td className="py-2 text-center text-slate-500 font-medium">16h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">16.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">2/2</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">2</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">GHÉP THÔ NỀN - NHÓM 2.</td>
                    <td className="py-2 text-center text-slate-500 font-medium">10h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">10.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">GHÉP THÔ NỀN - NHÓM 2</td>
                    <td className="py-2 text-center text-slate-500 font-medium">106.5h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">106.5h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">10/10</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">10</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">GHÉP THÔ NỀN - NHÓM 1</td>
                    <td className="py-2 text-center text-slate-500 font-medium">72h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">72.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">6/6</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">6</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">HOÀN THIỆN NỀN - NHÓM 1</td>
                    <td className="py-2 text-center text-slate-500 font-medium">80h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">80.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">7/7</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">7</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">GHÉP THÔ CÔNG TRÌNH - NHÓM 1</td>
                    <td className="py-2 text-center text-slate-500 font-medium">124.5h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">124.5h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">11/11</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">11</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">HOÀN THIỆN NỀN - NHÓM 2</td>
                    <td className="py-2 text-center text-slate-500 font-medium">65h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">65.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">6/6</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">6</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">hOÀN THIỆN NỀN - NHÓM 2</td>
                    <td className="py-2 text-center text-slate-500 font-medium">11h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">11.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">HOÀN THIỆN CÔNG TRÌNH</td>
                    <td className="py-2 text-center text-slate-500 font-medium">166.5h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">166.5h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">15/15</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">15</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">GHÉP THÔ CÔNG TRÌNH - NHÓM 2</td>
                    <td className="py-2 text-center text-slate-500 font-medium">44.5h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">44.5h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">4/4</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">4</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">ĐÓNG GÓI, VẬN CHUYỂN LẮP ĐẶT MÔ HÌNH - NHÓM 2</td>
                    <td className="py-2 text-center text-slate-500 font-medium">7.5h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">7.5h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">2/2</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">2</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">ĐÓNG GÓI, VẬN CHUYỂN LẮP ĐẶT MÔ HÌNH - NHÓM 1</td>
                    <td className="py-2 text-center text-slate-500 font-medium">15h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">15.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">2/2</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">2</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">CÔNG VIỆC NHÂN VIÊN BÁN THỜI GIAN</td>
                    <td className="py-2 text-center text-slate-500 font-medium">132h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">132.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">24/24</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">24</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Department 6: Phòng Mộc Sơn */}
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
          <div
            onClick={() => toggleDeptDetails('pmoc')}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shrink-0" />
              <h4 className="font-extrabold text-xs text-slate-900">Phòng Mộc Sơn</h4>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>40/40 CV · 100%</span>
              <IconChevronRight
                size={16}
                className={`transition-transform duration-200 ${expandedDepts.includes('pmoc') ? 'rotate-90' : ''}`}
              />
            </div>
          </div>

          {expandedDepts.includes('pmoc') && (
            <div className="border-t border-slate-100 p-4 pt-2 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[11px] font-bold text-slate-400 border-b border-slate-100 pb-2">
                    <th className="pb-2 font-bold">Đầu mục công việc</th>
                    <th className="pb-2 font-bold text-center">Giờ KH</th>
                    <th className="pb-2 font-bold text-center">Giờ TH</th>
                    <th className="pb-2 font-bold text-center">%HT</th>
                    <th className="pb-2 font-bold text-center">Hoàn thành</th>
                    <th className="pb-2 font-bold text-center">Đang làm</th>
                    <th className="pb-2 font-bold text-center">Tổng CV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80">
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KHỞI TẠO DỰ ÁN - NHÓM 1</td>
                    <td className="py-2 text-center text-slate-500 font-medium">1h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">1.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">2/2</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">2</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KHỞI TẠO DỰ ÁN - NHÓM 2</td>
                    <td className="py-2 text-center text-slate-500 font-medium">0.5h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">0.5h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">QUẢN LÝ DỰ ÁN</td>
                    <td className="py-2 text-center text-slate-500 font-medium">6h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">6.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">NHÓM MỘC 1</td>
                    <td className="py-2 text-center text-slate-500 font-medium">129h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">129.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">5/5</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">5</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">NHÓM MỘC 2</td>
                    <td className="py-2 text-center text-slate-500 font-medium">77h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">77.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">3/3</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">3</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">NHÓM MỘC 3</td>
                    <td className="py-2 text-center text-slate-500 font-medium">12h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">12.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">3/3</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">3</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">NHÓM SƠN 1</td>
                    <td className="py-2 text-center text-slate-500 font-medium">16h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">16.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">9/9</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">9</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">NHÓM SƠN 2</td>
                    <td className="py-2 text-center text-slate-500 font-medium">7h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">7.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">7/7</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">7</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">NHÓM SƠN 3</td>
                    <td className="py-2 text-center text-slate-500 font-medium">2.5h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">2.5h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">5/5</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">5</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">vận chuyển, lắp đặt mô hình</td>
                    <td className="py-2 text-center text-slate-500 font-medium">20h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">20.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">4/4</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Department 7: Phòng Điện */}
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
          <div
            onClick={() => toggleDeptDetails('pdien')}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block shrink-0" />
              <h4 className="font-extrabold text-xs text-slate-900">Phòng Điện</h4>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>52/52 CV · 100%</span>
              <IconChevronRight
                size={16}
                className={`transition-transform duration-200 ${expandedDepts.includes('pdien') ? 'rotate-90' : ''}`}
              />
            </div>
          </div>

          {expandedDepts.includes('pdien') && (
            <div className="border-t border-slate-100 p-4 pt-2 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[11px] font-bold text-slate-400 border-b border-slate-100 pb-2">
                    <th className="pb-2 font-bold">Đầu mục công việc</th>
                    <th className="pb-2 font-bold text-center">Giờ KH</th>
                    <th className="pb-2 font-bold text-center">Giờ TH</th>
                    <th className="pb-2 font-bold text-center">%HT</th>
                    <th className="pb-2 font-bold text-center">Hoàn thành</th>
                    <th className="pb-2 font-bold text-center">Đang làm</th>
                    <th className="pb-2 font-bold text-center">Tổng CV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80">
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KHỞI TẠO DỰ ÁN - NHÓM 1</td>
                    <td className="py-2 text-center text-slate-500 font-medium">7h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">7.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">4/4</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">4</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KHỞI TẠO DỰ ÁN - NHÓM 3</td>
                    <td className="py-2 text-center text-slate-500 font-medium">1h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">1.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">CHUẨN BỊ TỦ NGUỒN - NHÓM 2</td>
                    <td className="py-2 text-center text-slate-500 font-medium">16h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">16.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">4/4</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">4</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">CHUẨN BỊ HÀN MODUL ĐÈN - NHÓM 3</td>
                    <td className="py-2 text-center text-slate-500 font-medium">16h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">16.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">2/2</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">2</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">CHUẨN BỊ ĐÈN ĐƯỜNG CẢNH QUAN - NHÓM 2</td>
                    <td className="py-2 text-center text-slate-500 font-medium">56h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">56.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">9/9</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">9</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">HOÀN THIỆN KHUNG CHÂN - NHÓM 2</td>
                    <td className="py-2 text-center text-slate-500 font-medium">1h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">1.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">VẬN HÀNH THỬ - NHÓM 3</td>
                    <td className="py-2 text-center text-slate-500 font-medium">11h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">11.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">4/4</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">4</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">CHỈNH SỬA SAU NGHIỆM THU - NHÓM 2</td>
                    <td className="py-2 text-center text-slate-500 font-medium">1h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">1.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">HOÀN THIỆN CÔNG TRÌNH - NHÓM 2</td>
                    <td className="py-2 text-center text-slate-500 font-medium">80h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">80.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">12/12</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">12</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">CHUẨN BỊ ĐÈN ĐƯỜNG CẢNH QUAN - (BTG) - NHÓM 4</td>
                    <td className="py-2 text-center text-slate-500 font-medium">64h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">64.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">14/14</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">14</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Department 8: Phòng Cảnh Quan */}
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
          <div
            onClick={() => toggleDeptDetails('pcq')}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block shrink-0" />
              <h4 className="font-extrabold text-xs text-slate-900">Phòng Cảnh Quan</h4>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>158/158 CV · 100%</span>
              <IconChevronRight
                size={16}
                className={`transition-transform duration-200 ${expandedDepts.includes('pcq') ? 'rotate-90' : ''}`}
              />
            </div>
          </div>

          {expandedDepts.includes('pcq') && (
            <div className="border-t border-slate-100 p-4 pt-2 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[11px] font-bold text-slate-400 border-b border-slate-100 pb-2">
                    <th className="pb-2 font-bold">Đầu mục công việc</th>
                    <th className="pb-2 font-bold text-center">Giờ KH</th>
                    <th className="pb-2 font-bold text-center">Giờ TH</th>
                    <th className="pb-2 font-bold text-center">%HT</th>
                    <th className="pb-2 font-bold text-center">Hoàn thành</th>
                    <th className="pb-2 font-bold text-center">Đang làm</th>
                    <th className="pb-2 font-bold text-center">Tổng CV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80">
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KHỞI TẠO DỰ ÁN - NHÓM 1</td>
                    <td className="py-2 text-center text-slate-500 font-medium">3h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">3.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">2/2</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">2</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KHỞI TẠO DỰ ÁN - NHÓM 2</td>
                    <td className="py-2 text-center text-slate-500 font-medium">0.5h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">0.5h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">CHUẨN BỊ - NHÓM 1</td>
                    <td className="py-2 text-center text-slate-500 font-medium">84.5h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">84.5h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">11/11</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">11</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">QUẢN LÝ VÀ CHỦ TRÌ DỰ ÁN</td>
                    <td className="py-2 text-center text-slate-500 font-medium">16h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">16.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">2/2</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">2</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">CHUẨN BỊ - NHÓM 2</td>
                    <td className="py-2 text-center text-slate-500 font-medium">342.5h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">342.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">62/62</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">62</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">HOÀN THIỆN TRÊN NỀN - NHÓM 1</td>
                    <td className="py-2 text-center text-slate-500 font-medium">129.5h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">129.5h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">33/33</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">33</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">HOÀN THIỆN TRÊN NỀN - NHÓM 2</td>
                    <td className="py-2 text-center text-slate-500 font-medium">188.6h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">183.6h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">44/44</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">44</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">CHỈNH SỬA SAU NGHIỆM THU</td>
                    <td className="py-2 text-center text-slate-500 font-medium">31.5h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">31.5h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">3/3</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Department 9: Phòng Công nghệ và Thiết kế */}
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
          <div
            onClick={() => toggleDeptDetails('pcntk')}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-600 inline-block shrink-0" />
              <h4 className="font-extrabold text-xs text-slate-900">Phòng Công nghệ và Thiết kế</h4>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>10/10 CV · 100%</span>
              <IconChevronRight
                size={16}
                className={`transition-transform duration-200 ${expandedDepts.includes('pcntk') ? 'rotate-90' : ''}`}
              />
            </div>
          </div>

          {expandedDepts.includes('pcntk') && (
            <div className="border-t border-slate-100 p-4 pt-2 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[11px] font-bold text-slate-400 border-b border-slate-100 pb-2">
                    <th className="pb-2 font-bold">Đầu mục công việc</th>
                    <th className="pb-2 font-bold text-center">Giờ KH</th>
                    <th className="pb-2 font-bold text-center">Giờ TH</th>
                    <th className="pb-2 font-bold text-center">%HT</th>
                    <th className="pb-2 font-bold text-center">Hoàn thành</th>
                    <th className="pb-2 font-bold text-center">Đang làm</th>
                    <th className="pb-2 font-bold text-center">Tổng CV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80">
                  <tr>
                    <td className="py-2 font-bold text-slate-800">KHỞI TẠO DỰ ÁN</td>
                    <td className="py-2 text-center text-slate-500 font-medium">1h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">1.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">NGHIỆM THU 80%</td>
                    <td className="py-2 text-center text-slate-500 font-medium">2h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">2.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">NGHIỆM THU 100%</td>
                    <td className="py-2 text-center text-slate-500 font-medium">2h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">2.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">1/1</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">1</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">TRUYỀN THÔNG DỰ ÁN</td>
                    <td className="py-2 text-center text-slate-500 font-medium">40h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">36.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">5/5</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">5</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">VẬN CHUYỂN, LẮP ĐẶT & BÀN GIAO MÔ HÌNH</td>
                    <td className="py-2 text-center text-slate-500 font-medium">12h</td>
                    <td className="py-2 text-center text-amber-600 font-semibold">12.0h</td>
                    <td className="py-2 text-center font-extrabold text-emerald-600">100%</td>
                    <td className="py-2 text-center font-bold text-emerald-600">2/2</td>
                    <td className="py-2 text-center font-medium text-slate-400">0</td>
                    <td className="py-2 text-center font-semibold text-slate-700">2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
