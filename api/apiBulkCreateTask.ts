import { BASE_API_FASTAPI } from "../config";
import { TaskRecord, getTaskHeaders } from "./types/task";

/**
 * Tạo nhiều công việc (Main task + Subtask) cùng lúc
 * Endpoint: POST /api/v1/entities/Task/bulk
 */
export async function bulkCreateTask(
  items: Partial<TaskRecord>[]
): Promise<{ success: boolean; data?: TaskRecord[]; error?: string }> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/Task/bulk`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: getTaskHeaders(),
      body: JSON.stringify(items),
    });

    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.items)
        ? data.items
        : Array.isArray(data?.data)
        ? data.data
        : [];
      return { success: true, data: list };
    }

    const errText = await res.text().catch(() => res.statusText);
    return { success: false, error: `HTTP ${res.status}: ${errText}` };
  } catch (err: any) {
    return { success: false, error: err?.message || "Lỗi kết nối mạng" };
  }
}
