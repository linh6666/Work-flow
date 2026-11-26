import { BASE_API_FASTAPI } from "../config";
import { getTaskHeaders } from "./types/task";

/**
 * Xóa công việc (Task) theo ID
 * Endpoint: DELETE /api/v1/entities/Task/{id}
 */
export async function deleteTask(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/Task/${id}`;

  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: getTaskHeaders(),
    });

    if (res.ok) {
      return { success: true };
    }

    const errText = await res.text().catch(() => res.statusText);
    return { success: false, error: `HTTP ${res.status}: ${errText}` };
  } catch (err: any) {
    return { success: false, error: err?.message || "Lỗi kết nối mạng" };
  }
}
