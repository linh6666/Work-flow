import { BASE_API_FASTAPI } from "../config";
import { TaskRecord, getTaskHeaders } from "./types/task";

export type { TaskRecord };

/**
 * Lấy danh sách công việc (Task), có thể lọc theo projectId
 * Endpoint: GET /api/v1/entities/Task?limit={limit}
 */
export async function getTaskList(limit = 500, projectId?: string): Promise<TaskRecord[]> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/Task?limit=${limit}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: getTaskHeaders(),
    });

    if (res.ok) {
      const json = await res.json();
      const list: TaskRecord[] = Array.isArray(json)
        ? json
        : Array.isArray(json?.items)
        ? json.items
        : Array.isArray(json?.data)
        ? json.data
        : [];

      if (projectId) {
        return list.filter((t) => t.project_id === projectId);
      }
      return list;
    } else {
      console.warn("Lỗi khi tải danh sách Task:", res.status, res.statusText);
    }
  } catch (err) {
    console.warn("Lỗi khi gọi API danh sách Task:", err);
  }

  return [];
}

/**
 * Lấy chi tiết công việc (Task) theo ID
 * Endpoint: GET /api/v1/entities/Task/{id}
 */
export async function getTaskById(id: string): Promise<TaskRecord | null> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/Task/${id}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: getTaskHeaders(),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Lỗi khi lấy chi tiết Task [${id}]:`, err);
  }

  return null;
}
