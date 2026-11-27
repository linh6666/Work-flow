import { BASE_API_FASTAPI } from "../config";
import { getTaskHeaders } from "./types/task";

export interface CreateWorkReportPayload {
  form_id?: string;
  project_id: string;
  project_name?: string;
  department?: string;
  task_uid?: string;
  task_index?: number;
  task_name?: string;
  reporter_id?: string;
  reporter_name?: string;
  report_datetime?: string;
  actual_hours?: number;
  quantity_done?: number;
  quantity_unit?: string;
  quality_rating?: string;
  description?: string;
  photo_urls?: string;
  status?: string;
  task_status?: string;
  task_progress?: number;
  task_assignee?: string;
  task_planned_hours?: number;
  task_start_date?: string;
  task_end_date?: string;
  task_notes?: string;
}

export async function createWorkReport(payload: CreateWorkReportPayload): Promise<any> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/DeptWorkReport`;

  const res = await fetch(url, {
    method: "POST",
    headers: getTaskHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = Array.isArray(err?.detail)
      ? err.detail.map((d: any) => d.msg || d).join(", ")
      : err?.detail || err?.message || `Lỗi ${res.status}`;
    throw new Error(msg);
  }

  return res.json();
}
