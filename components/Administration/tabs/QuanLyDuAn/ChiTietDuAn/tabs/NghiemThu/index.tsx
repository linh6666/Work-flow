"use client";

import React, { useState } from 'react';
import { IconFlag, IconRefresh, IconPlus, IconX, IconCheck, IconFileCheck } from '@tabler/icons-react';
import { DuAnItem } from '../../../index';

interface NghiemThuTabProps {
  project: DuAnItem;
}

export default function NghiemThuTab({ project }: NghiemThuTabProps) {
  const [reports80, setReports80] = useState<Array<{ id: string; dept: string; date: string; status: string }>>([]);
  const [reports100, setReports100] = useState<Array<{ id: string; dept: string; date: string; status: string }>>([]);

  const [selectedDeptForReport, setSelectedDeptForReport] = useState<{ dept: string; milestone: '80' | '100' } | null>(null);
  const [reportNote, setReportNote] = useState('');

  const handleRefresh = () => {
    // Refresh action
    setReportNote('');
    setSelectedDeptForReport(null);
  };

  const handleCreateReport = () => {
    if (!selectedDeptForReport) return;

    const newReport = {
      id: `rep-${Date.now()}`,
      dept: selectedDeptForReport.dept,
      date: new Date().toLocaleDateString('vi-VN'),
      status: 'Chờ Ban giám đốc phê duyệt'
    };

    if (selectedDeptForReport.milestone === '80') {
      setReports80(prev => [newReport, ...prev]);
    } else {
      setReports100(prev => [newReport, ...prev]);
    }

    setSelectedDeptForReport(null);
    setReportNote('');
  };

  const depts80 = [
    'Ban Giám đốc',
    'Khối Văn phòng',
    'Phòng Khai triển',
    'Phòng Công nghệ và Thiết kế',
    'Phòng Cắt',
    'Phòng Ghép',
    'Phòng Mộc Sơn',
    'Phòng Điện',
    'Phòng Cảnh Quan'
  ];

  const depts100 = [
    'Phòng Khai triển',
    'Phòng Công nghệ và Thiết kế',
    'Phòng Mộc Sơn',
    'Phòng Cảnh Quan'
  ];

  return (
    <div className="space-y-4 animate-fade-in font-sans text-slate-800 select-none">
      
      {/* 1. TOP HEADER WITH REFRESH BUTTON */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <IconFlag size={18} className="text-[#3b49df]" />
          <h2 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
            Báo cáo nghiệm thu 80% &amp; 100%
          </h2>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200/90 rounded-lg hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
        >
          <IconRefresh size={14} className="text-slate-600" />
          <span>Làm mới</span>
        </button>
      </div>

      {/* 2. AUTOMATIC SYSTEM NOTIFICATION BANNER */}
      <div className="bg-blue-50/80 border border-blue-200/80 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-blue-950 leading-relaxed shadow-2xs">
        <IconFlag size={16} className="text-[#3b49df] shrink-0 mt-0.5" />
        <div>
          Hệ thống tự động nhắc lập báo cáo khi đạt mốc 80%/100%: phòng ban nào hoàn thành khối lượng công việc của mình trước sẽ được nhắc lập báo cáo riêng (không phải chờ tổng thể dự án). Báo cáo gửi Ban giám đốc phê duyệt.
        </div>
      </div>

      {/* 3. SECTION 1: MỐC NGHIỆM THU 80% */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
        {/* Section Header */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-emerald-100/90 text-emerald-800 font-extrabold text-[11px] px-2.5 py-0.5 rounded-md border border-emerald-200/80">
            Đã đạt mốc
          </span>
          <h3 className="text-sm sm:text-base font-bold text-slate-800">
            Mốc nghiệm thu 80%
          </h3>
          <span className="text-xs text-slate-400 font-medium">
            (Tiến độ dự án: 90% · 293/324 CV)
          </span>
        </div>

        {/* Action Buttons for 80% */}
        <div className="flex flex-wrap items-center gap-2">
          {depts80.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setSelectedDeptForReport({ dept, milestone: '80' })}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200/90 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
            >
              <IconPlus size={14} className="text-slate-500" />
              <span>Lập báo cáo - {dept}</span>
            </button>
          ))}
        </div>

        {/* Reports Content or Empty Placeholder */}
        {reports80.length > 0 ? (
          <div className="space-y-2">
            {reports80.map((rep) => (
              <div key={rep.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <IconFileCheck size={16} className="text-emerald-600" />
                  <span className="font-bold text-slate-800">{rep.dept}</span>
                  <span className="text-slate-400">({rep.date})</span>
                </div>
                <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md text-[11px]">
                  {rep.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50/50 border border-slate-200/80 rounded-xl py-6 px-4 text-center text-xs text-slate-400 font-medium">
            Chưa có báo cáo nào cho mốc này.
          </div>
        )}
      </div>

      {/* 4. SECTION 2: MỐC NGHIỆM THU 100% */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
        {/* Section Header */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-emerald-100/90 text-emerald-800 font-extrabold text-[11px] px-2.5 py-0.5 rounded-md border border-emerald-200/80">
            Đã đạt mốc
          </span>
          <h3 className="text-sm sm:text-base font-bold text-slate-800">
            Mốc nghiệm thu 100%
          </h3>
          <span className="text-xs text-slate-400 font-medium">
            (Tiến độ dự án: 90% · 293/324 CV)
          </span>
        </div>

        {/* Action Buttons for 100% */}
        <div className="flex flex-wrap items-center gap-2">
          {depts100.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setSelectedDeptForReport({ dept, milestone: '100' })}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200/90 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
            >
              <IconPlus size={14} className="text-slate-500" />
              <span>Lập báo cáo - {dept}</span>
            </button>
          ))}
        </div>

        {/* Reports Content or Empty Placeholder */}
        {reports100.length > 0 ? (
          <div className="space-y-2">
            {reports100.map((rep) => (
              <div key={rep.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <IconFileCheck size={16} className="text-emerald-600" />
                  <span className="font-bold text-slate-800">{rep.dept}</span>
                  <span className="text-slate-400">({rep.date})</span>
                </div>
                <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md text-[11px]">
                  {rep.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50/50 border border-slate-200/80 rounded-xl py-6 px-4 text-center text-xs text-slate-400 font-medium">
            Chưa có báo cáo nào cho mốc này.
          </div>
        )}
      </div>

      {/* MODAL: LẬP BÁO CÁO NGHIỆM THU */}
      {selectedDeptForReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden select-none font-sans">
            <div className="px-5 py-3.5 bg-[#f8fafc] border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
                <IconFileCheck size={18} className="text-[#3b49df]" />
                <span>Lập Báo cáo Nghiệm thu {selectedDeptForReport.milestone}%</span>
              </h3>
              <button
                type="button"
                onClick={() => setSelectedDeptForReport(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <IconX size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Phòng ban thực hiện:</label>
                <input
                  type="text"
                  readOnly
                  value={selectedDeptForReport.dept}
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 font-bold text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Dự án:</label>
                <input
                  type="text"
                  readOnly
                  value={project.tenDuAn}
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ghi chú / Nội dung nghiệm thu:</label>
                <textarea
                  rows={3}
                  value={reportNote}
                  onChange={(e) => setReportNote(e.target.value)}
                  placeholder="Nhập chi tiết nội dung nghiệm thu gửi Ban Giám Đốc..."
                  className="w-full bg-white border border-slate-200 rounded-lg p-3 text-xs outline-none focus:border-[#3b49df]"
                />
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedDeptForReport(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-100"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleCreateReport}
                className="px-4 py-2 rounded-lg bg-[#3b49df] text-white font-bold text-xs hover:bg-[#2e3bb8] flex items-center gap-1.5 shadow-2xs"
              >
                <IconCheck size={16} />
                <span>Gửi Báo cáo</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
