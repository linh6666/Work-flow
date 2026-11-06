"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconPlus, IconChevronDown, IconCalendar, IconClock, IconUser, IconLayersLinked } from '@tabler/icons-react';
import { FullTaskItem } from '../../index';

interface ThemCongViecModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGroup?: 'BÁO GIÁ' | 'HỢP ĐỒNG' | 'QL DỰ ÁN';
  onAddTask: (newTask: Omit<FullTaskItem, 'stt'>) => void;
}

export default function ThemCongViecModal({
  isOpen,
  onClose,
  defaultGroup = 'BÁO GIÁ',
  onAddTask,
}: ThemCongViecModalProps) {
  const [title, setTitle] = useState('');
  const [group, setGroup] = useState<'BÁO GIÁ' | 'HỢP ĐỒNG' | 'QL DỰ ÁN'>(defaultGroup);
  const [assignee, setAssignee] = useState('Bùi Phương Uyên');
  const [status, setStatus] = useState('Chưa bắt đầu');
  const [klDk, setKlDk] = useState(1);
  const [klDp, setKlDp] = useState(0);
  const [gioDk, setGioDk] = useState('1h');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rowBgColor, setRowBgColor] = useState<'white' | 'blue' | 'yellow'>('white');
  const [errorMsg, setErrorMsg] = useState('');

  // Format today as MM/DD/YYYY helper
  const getTodayFormatted = () => {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const yyyy = now.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setGroup(defaultGroup || 'BÁO GIÁ');
      setAssignee('Bùi Phương Uyên');
      setStatus('Chưa bắt đầu');
      setKlDk(1);
      setKlDp(0);
      setGioDk('1h');
      const today = getTodayFormatted();
      setStartDate(today);
      setEndDate(today);
      setRowBgColor('white');
      setErrorMsg('');
    }
  }, [isOpen, defaultGroup]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Vui lòng nhập tên công việc');
      return;
    }

    onAddTask({
      group,
      bcBadge: '📄BC',
      status,
      title: title.trim().toUpperCase(),
      klDk: Number(klDk) || 1,
      klDp: Number(klDp) || 0,
      assignee,
      gioDk: gioDk.trim() || '1h',
      gioTt: '—',
      startDate: startDate || getTodayFormatted(),
      endDate: endDate || getTodayFormatted(),
      rowBgColor,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-3 sm:p-4 animate-fade-in overflow-y-auto">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-lg p-5 sm:p-6 space-y-4 text-slate-700 animate-scale-up my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#406c89]/10 text-[#406c89] flex items-center justify-center shrink-0">
              <IconPlus size={18} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Thêm công việc mới
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Khởi tạo đầu việc vào hồ sơ kinh doanh
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Đóng (Esc)"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {errorMsg && (
            <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg text-xs font-semibold text-rose-600">
              {errorMsg}
            </div>
          )}

          {/* 1. Tên công việc */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">
              Tên công việc <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              autoFocus
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="VD: LẬP BÁO GIÁ SƠ BỘ VÀ TRÌNH BGĐ..."
              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89]"
            />
          </div>

          {/* 2. Nhóm công việc & Nhân sự */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1">
                <IconLayersLinked size={13} className="text-[#406c89]" />
                <span>Nhóm công việc</span>
              </label>
              <div className="relative">
                <select
                  value={group}
                  onChange={(e) => setGroup(e.target.value as any)}
                  className="w-full appearance-none pl-3 pr-8 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#406c89] cursor-pointer"
                >
                  <option value="BÁO GIÁ">BÁO GIÁ</option>
                  <option value="HỢP ĐỒNG">HỢP ĐỒNG</option>
                  <option value="QL DỰ ÁN">QL DỰ ÁN</option>
                </select>
                <IconChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1">
                <IconUser size={13} className="text-[#406c89]" />
                <span>Nhân sự phụ trách</span>
              </label>
              <div className="relative">
                <select
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="w-full appearance-none pl-3 pr-8 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#406c89] cursor-pointer"
                >
                  <option value="Bùi Phương Uyên">Bùi Phương Uyên</option>
                  <option value="Bùi Thị Duyên">Bùi Thị Duyên</option>
                  <option value="">— Chưa phân công —</option>
                </select>
                <IconChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* 3. Trạng thái & Giờ DK */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Trạng thái
              </label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full appearance-none pl-3 pr-8 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#406c89] cursor-pointer"
                >
                  <option value="Chưa bắt đầu">Chưa bắt đầu</option>
                  <option value="Đang thực hiện">Đang thực hiện</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                  <option value="Tạm dừng">Tạm dừng</option>
                </select>
                <IconChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1">
                <IconClock size={13} className="text-[#406c89]" />
                <span>Giờ dự kiến (Giờ DK)</span>
              </label>
              <input
                type="text"
                value={gioDk}
                onChange={(e) => setGioDk(e.target.value)}
                placeholder="VD: 1h, 2h, 0.5h..."
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#406c89]"
              />
            </div>
          </div>

          {/* 4. Khối lượng DK & DP */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                KL DK (Khối lượng DK)
              </label>
              <input
                type="number"
                min={0}
                value={klDk}
                onChange={(e) => setKlDk(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#406c89]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                KL DP (Khối lượng DP)
              </label>
              <input
                type="number"
                min={0}
                value={klDp}
                onChange={(e) => setKlDp(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#406c89]"
              />
            </div>
          </div>

          {/* 5. Ngày Bắt đầu & Kết thúc */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1">
                <IconCalendar size={13} className="text-[#406c89]" />
                <span>Bắt đầu (MM/DD/YYYY)</span>
              </label>
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="MM/DD/YYYY"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#406c89]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1">
                <IconCalendar size={13} className="text-[#406c89]" />
                <span>Kết thúc (MM/DD/YYYY)</span>
              </label>
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="MM/DD/YYYY"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#406c89]"
              />
            </div>
          </div>

          {/* 6. Kiểu màu dòng nổi bật */}
          <div className="space-y-1 pt-0.5">
            <label className="block text-xs font-bold text-slate-700">
              Kiểu màu hiển thị dòng
            </label>
            <div className="flex items-center gap-3 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="rowBgColor"
                  checked={rowBgColor === 'white'}
                  onChange={() => setRowBgColor('white')}
                  className="accent-[#406c89]"
                />
                <span className="font-medium text-slate-700">Mặc định (Trắng)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="rowBgColor"
                  checked={rowBgColor === 'blue'}
                  onChange={() => setRowBgColor('blue')}
                  className="accent-[#5281a0]"
                />
                <span className="font-medium text-[#406c89]">Xanh dương (Giai đoạn)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="rowBgColor"
                  checked={rowBgColor === 'yellow'}
                  onChange={() => setRowBgColor('yellow')}
                  className="accent-[#cb9935]"
                />
                <span className="font-medium text-[#cb9935]">Vàng đồng (Báo giá)</span>
              </label>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 border border-slate-200/90 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 text-xs font-semibold rounded-lg transition-all cursor-pointer shadow-2xs"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-1.5 bg-[#406c89] hover:bg-[#345972] active:scale-95 text-white text-xs font-bold rounded-lg shadow-sm shadow-[#406c89]/20 transition-all cursor-pointer"
            >
              <IconPlus size={14} />
              <span>Thêm công việc</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

