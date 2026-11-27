"use client";

import React, { useState, useEffect, useRef } from 'react';
import { IconCalendar, IconHistory, IconPhotoPlus, IconX } from '@tabler/icons-react';
import { getTaskById } from '@/api/apiGetTask';
import { createWorkReport } from '@/api/apiWorkReport';
import { NotificationExtension } from '@/common/extension/NotificationExtension';

export interface XemBaoCaoModalProps {
  isOpen: boolean;
  projectId?: string;
  taskId?: string;
  taskTitle: string;
  taskData?: {
    status?: string;
    assignee?: string;
    plannedHours?: string | number;
    actualHours?: string | number;
    klDk?: string | number;
    klDp?: string | number;
    klTt?: string | number;
    date?: string;
    deadline?: string;
  } | null;
  onClose: () => void;
}

function formatDateWithTime(val: string | undefined, defaultTime: string): string {
  if (!val || val === '—') return '';
  const trimmed = val.trim();
  if (/\d{1,2}:\d{2}/.test(trimmed)) return trimmed;
  const iso = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) return `${iso[3]}/${iso[2]}/${iso[1]} ${defaultTime}`;
  return `${trimmed} ${defaultTime}`;
}

export default function XemBaoCaoModal({ isOpen, projectId, taskId, taskTitle, taskData, onClose }: XemBaoCaoModalProps) {
  const [title, setTitle] = useState(taskTitle);
  const [status, setStatus] = useState('');
  const [assignee, setAssignee] = useState('');
  const [plannedHours, setPlannedHours] = useState('');
  const [actualHours, setActualHours] = useState('');
  const [slDkDp, setSlDkDp] = useState('');
  const [slTt, setSlTt] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dailyPercent, setDailyPercent] = useState('0');
  const [reportTimestamp, setReportTimestamp] = useState('');
  const [evaluation, setEvaluation] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<{ name: string; url: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setTitle(taskTitle || '');
    setStatus(taskData?.status || '');
    setAssignee(taskData?.assignee || '');
    setPlannedHours(taskData?.plannedHours !== undefined ? String(taskData.plannedHours).replace(/h$/i, '') : '');
    setActualHours(taskData?.actualHours !== undefined ? String(taskData.actualHours).replace(/h$/i, '') : '');
    const dkDp = (Number(taskData?.klDk) || 0) + (Number(taskData?.klDp) || 0);
    setSlDkDp(taskData ? String(dkDp) : '');
    setSlTt(taskData?.klTt !== undefined ? String(taskData.klTt) : '');
    setStartDate(formatDateWithTime(taskData?.date, '08:00'));
    setEndDate(formatDateWithTime(taskData?.deadline, '17:30'));
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    setReportTimestamp(`${dd}/${mm}/${yyyy} ${hh}:${min}`);

    const isBackendId =
      !!taskId &&
      (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(taskId) ||
        /^\d+$/.test(taskId));
    if (!isBackendId) return;

    let cancelled = false;
    getTaskById(taskId).then((data) => {
      if (cancelled || !data) return;
      if (data.title || data.name) setTitle(data.title || data.name || taskTitle);
      if (data.status) setStatus(data.status);
      if (data.assignee_name || data.assignee) setAssignee(data.assignee_name || data.assignee || '');
      if (data.planned_hours !== undefined) setPlannedHours(String(data.planned_hours));
      if (data.actual_hours !== undefined) setActualHours(String(data.actual_hours));
      if (data.kl_dk !== undefined || data.kl_dp !== undefined) {
        setSlDkDp(String((Number(data.kl_dk) || 0) + (Number(data.kl_dp) || 0)));
      }
      if (data.kl_tt !== undefined) setSlTt(String(data.kl_tt));
      if (data.start_date) setStartDate(formatDateWithTime(data.start_date, '08:00'));
      if (data.end_date || data.deadline) setEndDate(formatDateWithTime(data.end_date || data.deadline, '17:30'));
    });

    return () => {
      cancelled = true;
    };
  }, [isOpen, taskId, taskTitle]);

  const handleSubmitReport = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const now = new Date();
      const pct = Math.min(100, Math.max(0, Number(dailyPercent) || 0));
      const computedStatus =
        pct >= 100 ? 'Hoàn thành' : pct > 0 ? 'Đang thực hiện' : 'Chưa bắt đầu';

      await createWorkReport({
        project_id: projectId || '',
        task_uid: taskId || undefined,
        task_name: title || undefined,
        reporter_name: assignee || undefined,
        report_datetime: now.toISOString(),
        actual_hours: Number(actualHours) || 0,
        quantity_done: Number(slTt) || 0,
        quality_rating: evaluation.trim() || undefined,
        description: note.trim() || undefined,
        photo_urls: attachments.length > 0 ? JSON.stringify(attachments.map((a) => a.url)) : undefined,
        status: 'Chờ duyệt',
        task_status: computedStatus,
        task_progress: pct,
        task_assignee: assignee || undefined,
        task_planned_hours: Number(plannedHours) || 0,
        task_start_date: startDate || undefined,
        task_end_date: endDate || undefined,
      });
      NotificationExtension.Success('Gửi báo cáo thành công!');
      onClose();
    } catch (err: any) {
      NotificationExtension.Fails(err?.message || 'Gửi báo cáo thất bại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-2 sm:p-3">
      <style>{`.field-control{margin-top:3px;width:100%;height:24px;border-radius:4px;border:1px solid rgba(148,163,184,.28);background:#fff;padding:0 7px;font-size:11px;color:#334155;outline:none}.field-control:focus{border-color:#64748b;box-shadow:0 0 0 1px rgba(100,116,139,.15)}`}</style>
      <div className="flex max-h-[calc(100dvh-1rem)] w-full max-w-[680px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-[#f5f8fc] shadow-2xl sm:max-h-[calc(100dvh-1.5rem)]">
        <div className="flex shrink-0 items-start justify-between px-3 pb-1 pt-2.5 sm:px-4">
          <div className="min-w-0 pr-2">
            <h3 className="text-xs font-semibold text-slate-800">Báo cáo thực tế — thiết kế báo cáo</h3>
            <p className="mt-0.5 max-w-[calc(100vw-120px)] truncate text-[10px] text-slate-500 sm:max-w-[350px]">{title}</p>
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
            <Summary label="Tổng giờ KH" value={`${plannedHours}h`} />
            <Summary label="Tổng giờ TT" value={`${actualHours}h`} tone="yellow" />
            <Summary label="Tổng KL DK+DP" value={slDkDp} tone="blue" />
            <Summary label="Tổng KL đã thực hiện" value={slTt} tone="green" />
          </div>

          <section className="rounded-md border border-slate-200 bg-[#f8fafc] p-2.5 sm:p-3">
            <h4 className="text-xs font-bold text-slate-700">Cập nhật báo cáo thực tế</h4>
            <p className="mt-1 text-[10px] text-slate-500">Các ô màu là nội dung cần báo cáo. Ô xám là thông tin kế hoạch (chỉ xem).</p>

            <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              <Field label="Trạng thái" tone="blue">
                <input value={status} readOnly className="field-control cursor-default" />
              </Field>
              <Field label="Nhân sự" tone="purple">
                <input value={assignee} readOnly className="field-control cursor-default" />
              </Field>
              <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                <Field label="SL DK+DP" tone="gray"><input value={slDkDp} readOnly className="field-control" /></Field>
                <Field label="SL TT" required tone="green"><input type="number" min="0" inputMode="decimal" value={slTt} onChange={(event) => setSlTt(event.target.value)} className="field-control" /></Field>
                <Field label="Giờ DK" tone="gray"><input value={plannedHours} readOnly className="field-control" /></Field>
                <Field label="Giờ TT" required tone="yellow"><input type="number" min="0" inputMode="decimal" value={actualHours} onChange={(event) => setActualHours(event.target.value)} className="field-control" /></Field>
              </div>
              <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                <Field label="Bắt đầu" required tone="blue"><input value={startDate} readOnly className="field-control" /></Field>
                <Field label="Kết thúc" required tone="blue"><input value={endDate} readOnly className="field-control" /></Field>
                <Field label="%HT trong ngày" required tone="purple"><input type="number" min="0" max="100" inputMode="decimal" value={dailyPercent} onChange={(event) => setDailyPercent(event.target.value)} className="field-control" /></Field>
                <Field label="% HT Lũy tiến" tone="purple"><input value={`${Math.min(100, Math.max(0, Number(dailyPercent) || 0))}%`} readOnly className="field-control text-center" /></Field>
              </div>
            </div>

            <div className="mt-2 rounded-md border border-[#f1c84b] bg-[#fffdf0] p-2">
              <label className="block text-[10px] font-semibold text-[#bd6b00]">Thời gian thực tế báo cáo</label>
              <div className="relative mt-1">
                <input value={reportTimestamp} disabled className="w-full rounded-md border border-[#f1c84b] bg-[#fffbea] px-2 py-1.5 text-[11px] text-slate-600 cursor-not-allowed outline-none" />
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
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  const next = files.map((f) => ({
                    name: f.name,
                    url: URL.createObjectURL(f),
                  }));
                  setAttachments((prev) => [...prev, ...next]);
                  e.target.value = '';
                }}
              />
              <div className="mt-1 flex flex-wrap items-center gap-2">
                {attachments.map((img, idx) => (
                  <div key={`${img.name}-${idx}`} className="relative h-16 w-16 rounded-md border border-slate-200 overflow-hidden bg-white">
                    <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setAttachments((prev) => prev.filter((_, i) => i !== idx))}
                      className="absolute top-0.5 right-0.5 rounded-full bg-slate-900/60 p-0.5 text-white hover:bg-slate-900 cursor-pointer"
                      aria-label="Xóa ảnh"
                    >
                      <IconX size={10} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-md border border-dashed border-slate-300 bg-white text-[10px] text-slate-500 hover:bg-slate-50 cursor-pointer"
                >
                  <IconPhotoPlus size={16} />Thêm ảnh
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="flex shrink-0 justify-end gap-2 px-3 pb-3 sm:px-4">
          <button type="button" onClick={onClose} className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-700 shadow-sm hover:bg-slate-50">Hủy</button>
          <button type="button" disabled={isSubmitting} onClick={handleSubmitReport} className="rounded-md bg-[#406c89] px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-[#345a73] disabled:opacity-50 cursor-pointer">{isSubmitting ? 'Đang gửi...' : 'Gửi báo cáo'}</button>
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
