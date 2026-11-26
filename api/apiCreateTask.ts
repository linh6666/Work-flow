import { BASE_API_FASTAPI } from "../config";
import { TaskRecord, getTaskHeaders } from "./types/task";

/**
 * Tạo mới công việc (Task)
 * Endpoint: POST /api/v1/entities/Task
 */
export async function createTask(
  payload: Partial<TaskRecord>
): Promise<{ success: boolean; data?: TaskRecord; error?: string }> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/Task`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: getTaskHeaders(),
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, data };
    }

    const errText = await res.text().catch(() => res.statusText);
    return { success: false, error: `HTTP ${res.status}: ${errText}` };
  } catch (err: any) {
    return { success: false, error: err?.message || "Lỗi kết nối mạng" };
  }
}
