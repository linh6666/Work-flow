import { BASE_API_FASTAPI } from "../config";
import { TaskRecord, getTaskHeaders } from "./types/task";

/**
 * Cập nhật công việc (Task) theo ID
 * Endpoint: PUT /api/v1/entities/Task/{id}
 */
export async function updateTask(
  id: string,
  payload: Partial<TaskRecord>
): Promise<{ success: boolean; data?: TaskRecord; error?: string }> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/Task/${id}`;

  try {
    const res = await fetch(url, {
      method: "PUT",
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
