import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter";

/**
 * Hàm gọi API xóa bản ghi Project theo id.
 * Backend hỗ trợ 2 cơ chế:
 * 1. DELETE /api/v1/entities/Project với request body { id: projectId } (chuẩn Base44 delete_many)
 * 2. Fallback DELETE /api/v1/entities/Project/{Project_id}
 *
 * @param projectId ID của dự án cần xóa
 */
export async function deleteProject(projectId: string): Promise<any> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

    // Thử phương thức 1: DELETE /api/v1/entities/Project với filter body { id: projectId }
    const urlBulk = `${BASE_API_FASTAPI}${API_ROUTE.PROJECT_LIST}`;
    let res = await fetch(urlBulk, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { "api_key": apiKey } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ id: projectId }),
    });

    // Nếu endpoint bulk trả về 404 hoặc 405 thì thử sang endpoint path /entities/Project/{id}
    if(!res.ok && (res.status === 404 || res.status === 405)) {
      const urlPath = `${BASE_API_FASTAPI}${API_ROUTE.PROJECT_DELETE_BY_ID.replace(
        "{Project_id}",
        encodeURIComponent(projectId)
      )}`;
  res = await fetch(urlPath, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "api_key": apiKey } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}

if (!res.ok) {
  const errorData = await res.json().catch(() => ({}));
  const message = Array.isArray(errorData.detail)
    ? errorData.detail.map((d: any) => d.msg || d).join(", ")
      : errorData.detail || errorData.message || `Xóa dự án thất bại (HTTP ${res.status})`;
  throw new Error(message);
}

const data = await res.json().catch(() => ({ success: true }));
return data;
}

export const apiDeleteProject = deleteProject;
export default deleteProject;
