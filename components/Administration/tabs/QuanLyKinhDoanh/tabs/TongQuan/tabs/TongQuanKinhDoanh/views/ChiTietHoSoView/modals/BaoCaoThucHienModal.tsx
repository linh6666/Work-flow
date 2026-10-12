"use client";

import React, { useState, useEffect } from 'react';
import {
  IconX,
  IconHistory,
  IconChevronDown,
  IconPhotoPlus,
  IconTrash,
} from '@tabler/icons-react';

export interface FullTaskItem {
  stt: number;
  group: 'BÁO GIÁ' | 'HỢP ĐỒNG' | 'QL DỰ ÁN';
  bcBadge: string;
  status: string;
  title: string;
  klDk: number;
  klDp: number;
  assignee: string;
  gioDk: string;
  gioTt: string;
  startDate: string;
  endDate: string;
  rowBgColor?: 'blue' | 'yellow' | 'white';
}

interface BaoCaoThucHienModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: FullTaskItem | null;
  onSaveReport?: (updatedTask: FullTaskItem, reportNote: string) => void;
}

export default function BaoCaoThucHienModal({
  isOpen,
  onClose,
  task,
  onSaveReport,
}: BaoCaoThucHienModalProps) {
  const [status, setStatus] = useState<string>('Chưa bắt đầu');
  const [assignee, setAssignee] = useState<string>('Bùi Phương Uyên');
  const [slTt, setSlTt] = useState<number>(0);
  const [gioTt, setGioTt] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('10/08/2026 03:00');
  const [endDate, setEndDate] = useState<string>('10/08/2026 03:00');
  const [percentToday, setPercentToday] = useState<number>(0);
  const [percentAccumulated, setPercentAccumulated] = useState<number>(0);
  const [reportTimestamp, setReportTimestamp] = useState<string>('');
  const [qualityEvaluation, setQualityEvaluation] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [attachedImages, setAttachedImages] = useState<string[]>([]);

  useEffect(() => {
    if (task) {
      setStatus(task.status || 'Chưa bắt đầu');
      setAssignee(task.assignee || 'Bùi Phương Uyên');
      setSlTt(0);
      setGioTt(task.gioTt === '—' ? 0 : parseInt(task.gioTt) || 0);
      setStartDate(`${task.startDate || '10/08/2026'} 03:00`);
      setEndDate(`${task.endDate || '10/08/2026'} 03:00`);
      setPercentToday(0);
      setPercentAccumulated(0);
      setQualityEvaluation('');
      setNote('');
      setAttachedImages([]);

      // Generate current formatted time for report timestamp
      const now = new Date();
      const formattedDate = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(
        now.getDate()
      ).padStart(2, '0')}/${now.getFullYear()} ${now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })}`;
      setReportTimestamp(formattedDate);
    }
  }, [task, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask: FullTaskItem = {
      ...task,
      status,
      assignee,
      gioTt: `${gioTt}h`,
    };
    if (onSaveReport) {
      onSaveReport(updatedTask, note);
    }
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => URL.createObjectURL(f));
      setAttachedImages((prev) => [...prev, ...newFiles]);
    }
  };

  const totalKl = (task.klDk || 1) + (task.klDp || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── 1. MODAL HEADER ── */}
        <div className="flex items-start justify-between p-4 bg-white border-b border-slate-100">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug pr-4">
            Báo cáo thực tế — <span className="font-extrabold uppercase">{task.title}</span>
          </h2>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => alert('Xem lịch sử thay đổi')}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[#406c89] font-medium transition-colors cursor-pointer"
            >
              <IconHistory size={15} />
              <span>Lịch sử thay đổi</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <IconX size={18} />
            </button>
          </div>
        </div>

        {/* ── 2. MODAL BODY ── */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs no-scrollbar">
          {/* ── TOP 4 SUMMARY STAT CARDS ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Card 1: Tổng giờ KH */}
            <div className="bg-slate-50 border border-slate-200/90 p-3 rounded-xl text-center space-y-1">
              <p className="text-[11px] font-semibold text-slate-500">Tổng giờ KH</p>
              <p className="text-base font-extrabold text-slate-800">{task.gioDk || '1h'}</p>
            </div>

            {/* Card 2: Tổng giờ TT */}
            <div className="bg-[#fffbeb] border border-[#fef08a] p-3 rounded-xl text-center space-y-1">
              <p className="text-[11px] font-semibold text-amber-700">Tổng giờ TT</p>
              <p className="text-base font-extrabold text-[#ca8a04]">{gioTt}h</p>
            </div>

            {/* Card 3: Tổng KL DK+DP */}
            <div className="bg-[#eff6ff] border border-[#bfdbfe] p-3 rounded-xl text-center space-y-1">
              <p className="text-[11px] font-semibold text-blue-700">Tổng KL DK+DP</p>
              <p className="text-base font-extrabold text-[#3b82f6]">{totalKl}</p>
            </div>

            {/* Card 4: Tổng KL đã thực hiện */}
            <div className="bg-[#f0fdf4] border border-[#bbf7d0] p-3 rounded-xl text-center space-y-1">
              <p className="text-[11px] font-semibold text-emerald-700">Tổng KL đã thực hiện</p>
              <p className="text-base font-extrabold text-[#16a34a]">{slTt}</p>
            </div>
          </div>

          {/* ── SUBHEADER ── */}
          <div className="space-y-0.5 pt-1">
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
              Cập nhật báo cáo thực tế
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Các ô màu là nội dung cần báo cáo. Ô xám là thông tin kế hoạch (chỉ xem).
            </p>
          </div>

          {/* ── MAIN FORM FIELDS BOX ── */}
          <form onSubmit={handleFormSubmit} className="space-y-3">
            {/* ROW 1: Trạng thái & Nhân sự */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Trạng thái (Blue box) */}
              <div className="border border-indigo-200/90 bg-indigo-50/20 p-2.5 rounded-xl space-y-1">
                <label className="block text-[11px] font-bold text-indigo-900">Trạng thái</label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full appearance-none pl-3 pr-8 py-1.5 bg-white border border-indigo-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#406c89] cursor-pointer"
                  >
                    <option value="Chưa bắt đầu">Chưa bắt đầu</option>
                    <option value="Đang thực hiện">Đang thực hiện</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                    <option value="Tạm dừng">Tạm dừng</option>
                  </select>
                  <IconChevronDown
                    size={14}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Nhân sự (Purple box) */}
              <div className="border border-[#ddd6fe] bg-[#f5f3ff]/30 p-2.5 rounded-xl space-y-1">
                <label className="block text-[11px] font-bold text-purple-900">Nhân sự</label>
                <div className="relative">
                  <select
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    className="w-full appearance-none pl-3 pr-8 py-1.5 bg-white border border-purple-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#406c89] cursor-pointer"
                  >
                    <option value="Bùi Phương Uyên">Bùi Phương Uyên</option>
                    <option value="Bùi Thị Duyên">Bùi Thị Duyên</option>
                  </select>
                  <IconChevronDown
                    size={14}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* ROW 2: SL DK+DP, SL TT *, Giờ DK, Giờ TT * */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* SL DK+DP (Gray read-only) */}
              <div className="bg-slate-100/80 border border-slate-200 p-2 rounded-xl space-y-1">
                <label className="block text-[10.5px] font-bold text-slate-600">SL DK+DP</label>
                <input
                  type="text"
                  readOnly
                  value={totalKl}
                  className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-bold text-slate-700 text-left focus:outline-none cursor-default"
                />
              </div>

              {/* SL TT * (Green box) */}
              <div className="border border-[#bbf7d0] bg-[#f0fdf4]/50 p-2 rounded-xl space-y-1">
                <label className="block text-[10.5px] font-bold text-emerald-800">
                  SL TT <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  value={slTt}
                  onChange={(e) => setSlTt(parseInt(e.target.value) || 0)}
                  className="w-full px-2.5 py-1 bg-white border border-emerald-200 rounded-md text-xs font-bold text-emerald-800 text-left focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Giờ DK (Gray read-only) */}
              <div className="bg-slate-100/80 border border-slate-200 p-2 rounded-xl space-y-1">
                <label className="block text-[10.5px] font-bold text-slate-600">Giờ DK</label>
                <input
                  type="text"
                  readOnly
                  value={task.gioDk || '1'}
                  className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-bold text-slate-700 text-left focus:outline-none cursor-default"
                />
              </div>

              {/* Giờ TT * (Yellow box) */}
              <div className="border border-[#fef08a] bg-[#fefce8]/60 p-2 rounded-xl space-y-1">
                <label className="block text-[10.5px] font-bold text-amber-800">
                  Giờ TT <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  value={gioTt}
                  onChange={(e) => setGioTt(parseInt(e.target.value) || 0)}
                  className="w-full px-2.5 py-1 bg-white border border-amber-200 rounded-md text-xs font-bold text-amber-800 text-left focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* ROW 3: Bắt đầu *, Kết thúc *, %HT trong ngày *, % HT Lũy tiến */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Bắt đầu * (Blue box) */}
              <div className="border border-[#bfdbfe] bg-[#eff6ff]/50 p-2 rounded-xl space-y-1">
                <label className="block text-[10.5px] font-bold text-blue-800">
                  Bắt đầu <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-blue-200 rounded-md text-[11px] font-mono text-slate-800 focus:outline-none focus:border-blue-400"
                />
              </div>

              {/* Kết thúc * (Blue box) */}
              <div className="border border-[#bfdbfe] bg-[#eff6ff]/50 p-2 rounded-xl space-y-1">
                <label className="block text-[10.5px] font-bold text-blue-800">
                  Kết thúc <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-blue-200 rounded-md text-[11px] font-mono text-slate-800 focus:outline-none focus:border-blue-400"
                />
              </div>

              {/* %HT trong ngày * (Purple box) */}
              <div className="border border-[#ddd6fe] bg-[#f5f3ff]/50 p-2 rounded-xl space-y-1">
                <label className="block text-[10.5px] font-bold text-purple-800">
                  %HT trong ngày <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  value={percentToday}
                  onChange={(e) => setPercentToday(parseInt(e.target.value) || 0)}
                  className="w-full px-2.5 py-1 bg-white border border-purple-200 rounded-md text-xs font-bold text-purple-900 text-left focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* % HT Lũy tiến (Purple box) */}
              <div className="border border-[#ddd6fe] bg-[#f5f3ff]/50 p-2 rounded-xl space-y-1">
                <label className="block text-[10.5px] font-bold text-purple-800">
                  % HT Lũy tiến
                </label>
                <input
                  type="text"
                  value={`${percentAccumulated}%`}
                  onChange={(e) => {
                    const val = parseInt(e.target.value.replace('%', '')) || 0;
                    setPercentAccumulated(val);
                  }}
                  className="w-full px-2.5 py-1 bg-white border border-purple-200 rounded-md text-xs font-extrabold text-purple-700 text-center focus:outline-none"
                />
              </div>
            </div>

            {/* ROW 4: Thời gian thực tế báo cáo (Yellow Alert Container) */}
            <div className="border border-[#fef08a] bg-[#fefce8]/60 p-3 rounded-xl space-y-1">
              <label className="block text-[11px] font-bold text-amber-900">
                Thời gian thực tế báo cáo
              </label>
              <input
                type="text"
                readOnly
                value={reportTimestamp || '10/08/2026 03:46 PM'}
                className="w-full px-3 py-2 bg-[#fefce8] border border-[#fef08a] rounded-lg text-xs font-semibold text-amber-950 focus:outline-none cursor-default"
              />
              <p className="text-[10.5px] text-amber-700 font-medium pt-0.5">
                Tự động ghi nhận thời điểm lập báo cáo trên hệ thống (không thể thay đổi)
              </p>
            </div>

            {/* ROW 5: Đánh giá chất lượng & tiến độ (Red Box) */}
            <div className="border border-[#fecaca] bg-[#fef2f2]/40 p-3 rounded-xl space-y-1">
              <label className="block text-[11px] font-bold text-rose-800">
                Đánh giá chất lượng & tiến độ
              </label>
              <input
                type="text"
                value={qualityEvaluation}
                onChange={(e) => setQualityEvaluation(e.target.value)}
                placeholder="Đánh giá..."
                className="w-full px-3 py-2 bg-white border border-rose-200 rounded-lg text-xs text-slate-800 placeholder:text-rose-300 focus:outline-none focus:border-rose-400"
              />
            </div>

            {/* ROW 6: Ghi chú (Blue/Gray Box) */}
            <div className="border border-slate-200/90 bg-slate-50/40 p-3 rounded-xl space-y-1">
              <label className="block text-[11px] font-bold text-slate-800">Ghi chú</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ghi chú..."
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#406c89]"
              />
            </div>

            {/* ROW 7: Ảnh đính kèm */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-bold text-slate-900">Ảnh đính kèm</label>

              <div className="flex flex-wrap items-center gap-2">
                {/* Dashed Image Upload Box */}
                <label className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-dashed border-slate-300 hover:border-[#406c89] bg-slate-50 hover:bg-slate-100/80 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors shrink-0">
                  <IconPhotoPlus size={22} className="text-slate-400" />
                  <span className="text-[11px] text-slate-600 font-bold">Thêm ảnh</span>
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                </label>

                {/* Render Attached Images Preview */}
                {attachedImages.map((imgSrc, idx) => (
                  <div key={idx} className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-slate-200 group shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgSrc} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setAttachedImages((prev) => prev.filter((_, i) => i !== idx))}
                      className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <IconTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ── MODAL FOOTER ── */}
            <div className="flex items-center justify-end gap-2.5 pt-4 pb-1 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200/90 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Hủy
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-[#406c89] hover:bg-[#32566d] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Gửi báo cáo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
