"use client";

import React, { useState } from 'react';
import { IconCalendar, IconHistory, IconPhotoPlus, IconX } from '@tabler/icons-react';

export interface XemBaoCaoModalProps {
  isOpen: boolean;
  taskTitle: string;
  onClose: () => void;
}

export default function XemBaoCaoModal({ isOpen, taskTitle, onClose }: XemBaoCaoModalProps) {
  const [status, setStatus] = useState('Chưa bắt đầu');
  const [assignee, setAssignee] = useState('Phan Thị Hồng Ngọc (BTG)');
  const [actualHours, setActualHours] = useState('0');
  const [evaluation, setEvaluation] = useState('');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-2 sm:p-3">
      <style>{`.field-control{margin-top:3px;width:100%;height:24px;border-radius:4px;border:1px solid rgba(148,163,184,.28);background:#fff;padding:0 7px;font-size:11px;color:#334155;outline:none}.field-control:focus{border-color:#64748b;box-shadow:0 0 0 1px rgba(100,116,139,.15)}`}</style>
      <div className="flex max-h-[calc(100dvh-1rem)] w-full max-w-[680px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-[#f5f8fc] shadow-2xl sm:max-h-[calc(100dvh-1.5rem)]">
        <div className="flex shrink-0 items-start justify-between px-3 pb-1 pt-2.5 sm:px-4">
          <div className="min-w-0 pr-2">
            <h3 className="text-xs font-semibold text-slate-800">Báo cáo thực tế — thiết kế báo cáo</h3>
            <p className="mt-0.5 max-w-[calc(100vw-120px)] truncate text-[10px] text-slate-500 sm:max-w-[350px]">{taskTitle}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button type="button" className="inline-flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-700">
              <IconHistory size={12} /> <span className="hidden sm:inline">Lịch sử thay đổi</span>
            </button>
            <button type="button" onClick={onClose} className="rounded p-0.5 text-slate-500 hover:bg-slate-200" aria-label="Đóng modal">
              <IconX size={14} />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto px-3 pb-3 pt-1.5 sm:px-4">
          <div className="grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
            <Summary label="Tổng giờ KH" value="0h" />
            <Summary label="Tổng giờ TT" value={`${actualHours}h`} tone="yellow" />
            <Summary label="Tổng KL DK+DP" value="0" tone="blue" />
            <Summary label="Tổng KL đã thực hiện" value="0" tone="green" />
          </div>

          <section className="rounded-md border border-slate-200 bg-[#f8fafc] p-2.5 sm:p-3">
            <h4 className="text-xs font-bold text-slate-700">Cập nhật báo cáo thực tế</h4>
            <p className="mt-1 text-[10px] text-slate-500">Các ô màu là nội dung cần báo cáo. Ô xám là thông tin kế hoạch (chỉ xem).</p>

            <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              <Field label="Trạng thái" tone="blue">
                <select value={status} onChange={(event) => setStatus(event.target.value)} className="field-control">
                  <option>Chưa bắt đầu</option><option>Đang thực hiện</option><option>Hoàn thành</option>
                </select>
              </Field>
              <Field label="Nhân sự" tone="purple">
                <select value={assignee} onChange={(event) => setAssignee(event.target.value)} className="field-control">
                  <option>Phan Thị Hồng Ngọc (BTG)</option><option>Nguyễn Phú Quang</option><option>Cao Trường Thiên</option>
                </select>
              </Field>
              <Field label="SL DK+DP" tone="gray"><input value="0" readOnly className="field-control" /></Field>
              <Field label="SL TT" required tone="green"><input value="0" readOnly className="field-control" /></Field>
              <Field label="Giờ DK" tone="gray"><input value="0" readOnly className="field-control" /></Field>
              <Field label="Giờ TT" required tone="yellow"><input value={actualHours} onChange={(event) => setActualHours(event.target.value)} className="field-control" /></Field>
              <Field label="Bắt đầu" required tone="blue"><input value="09/16/2026 03:08 PM" readOnly className="field-control" /></Field>
              <Field label="Kết thúc" required tone="blue"><input value="09/16/2026 03:08 PM" readOnly className="field-control" /></Field>
              <Field label="%HT trong ngày" required tone="purple"><input value="0" readOnly className="field-control" /></Field>
              <Field label="% HT Lũy tiến" tone="purple"><input value="0%" readOnly className="field-control text-center" /></Field>
            </div>

            <div className="mt-2 rounded-md border border-[#f1c84b] bg-[#fffdf0] p-2">
              <label className="block text-[10px] font-semibold text-[#bd6b00]">Thời gian thực tế báo cáo</label>
              <div className="relative mt-1">
                <input value="09/16/2026 03:08 PM" readOnly className="w-full rounded-md border border-[#f1c84b] bg-[#fffbea] px-2 py-1.5 text-[11px] text-slate-700" />
                <IconCalendar size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#bd6b00]" />
              </div>
              <p className="mt-1 text-[10px] text-[#c47712]">Tự động ghi nhận thời điểm báo cáo trên hệ thống (không thể thay đổi)</p>
            </div>

            <div className="mt-2 rounded-md border border-[#ff9ba2] bg-[#fff2f3] p-2">
              <label className="block text-[10px] font-semibold text-[#d9485f]">Đánh giá chất lượng &amp; tiến độ</label>
              <input value={evaluation} onChange={(event) => setEvaluation(event.target.value)} placeholder="Đánh giá..." className="mt-1 w-full rounded-md border border-[#ffb8bd] bg-[#fff8f8] px-2 py-1.5 text-[11px] outline-none placeholder:text-slate-400" />
            </div>

            <div className="mt-2 rounded-md border border-slate-300 bg-slate-50 p-2">
              <label className="block text-[10px] font-semibold text-slate-600">Ghi chú</label>
              <input value={note} onChange={(event) => setNote(event.target.value)} placeholder="Ghi chú..." className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-[11px] outline-none placeholder:text-slate-400" />
            </div>

            <div className="mt-2">
              <p className="text-[10px] font-semibold text-slate-700">Ảnh đính kèm</p>
              <button type="button" className="mt-1 flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-md border border-dashed border-slate-300 bg-white text-[10px] text-slate-500 hover:bg-slate-50">
                <IconPhotoPlus size={16} />Thêm ảnh
              </button>
            </div>
          </section>
        </div>

        <div className="flex shrink-0 justify-end gap-2 px-3 pb-3 sm:px-4">
          <button type="button" onClick={onClose} className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-700 shadow-sm hover:bg-slate-50">Hủy</button>
          <button type="button" onClick={onClose} className="rounded-md bg-[#406c89] px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-[#345a73]">Gửi báo cáo</button>
        </div>
      </div>
    </div>
  );
}

function Summary({ label, value, tone = 'slate' }: { label: string; value: string; tone?: 'slate' | 'yellow' | 'blue' | 'green' }) {
  const toneClass = { slate: 'border-slate-200 bg-slate-50 text-slate-700', yellow: 'border-[#f2d66c] bg-[#fffdf0] text-[#b45309]', blue: 'border-[#b9d0ff] bg-[#f0f5ff] text-[#4f46e5]', green: 'border-[#9ce7ca] bg-[#effcf7] text-[#059669]' }[tone];
  return <div className={`rounded-md border px-2 py-1.5 ${toneClass}`}><p className="text-[10px] text-slate-500">{label}</p><p className="text-base font-bold leading-5">{value}</p></div>;
}

function Field({ label, required, tone, children }: { label: string; required?: boolean; tone: 'blue' | 'purple' | 'gray' | 'green' | 'yellow'; children: React.ReactNode }) {
  const toneClass = { blue: 'border-[#9fc1ff] bg-[#f1f6ff] text-[#315fce]', purple: 'border-[#cda8ff] bg-[#faf5ff] text-[#7e22ce]', gray: 'border-slate-200 bg-slate-100 text-slate-500', green: 'border-[#8ee0bf] bg-[#effdf7] text-[#16865b]', yellow: 'border-[#f1c84b] bg-[#fffbea] text-[#b45309]' }[tone];
  return <label className={`rounded-md border p-1 ${toneClass}`}><span className="block text-[10px] font-medium">{label}{required && <b className="ml-0.5">*</b>}</span>{children}</label>;
}
