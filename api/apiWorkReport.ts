import { BASE_API_FASTAPI } from "../config";
import { getTaskHeaders } from "./types/task";

export interface CreateWorkReportPayload {
  task_id?: string;
  project_id?: string;
  report_date?: string;
  reporter_id?: string;
  reporter_name?: string;
  reporter_dept?: string;
  actual_hours?: number;
  quantity_done?: number;
  quantity_unit?: string;
  description?: string;
  status?: string;
}

export async function createWorkReport(payload: CreateWorkReportPayload): Promise<any> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/WorkReport`;

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
