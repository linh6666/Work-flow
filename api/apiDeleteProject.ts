import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter";

/**
 * Hàm gọi API xóa một bản ghi Project theo id
 * Method: DELETE
 * Endpoint: /api/v1/entities/Project/{Project_id}
 *
 * @param projectId ID của dự án cần xóa
 */
export async function deleteProject(projectId: string): Promise<any> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const url = `${BASE_API_FASTAPI}${API_ROUTE.PROJECT_DELETE_BY_ID.replace(
    "{Project_id}",
    encodeURIComponent(projectId)
  )}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = Array.isArray(errorData.detail)
      ? errorData.detail.map((d: any) => d.msg || d).join(", ")
      : errorData.detail || errorData.message || "Xóa dự án thất bại";
    throw new Error(message);
  }

  const data = await res.json().catch(() => ({ success: true }));
  return data;
}

export const apiDeleteProject = deleteProject;
export default deleteProject;
