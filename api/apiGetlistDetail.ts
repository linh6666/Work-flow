import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter";
import { ProjectItem } from "./apiGetlistProject";

/**
 * Hàm gọi API lấy chi tiết một dự án theo Project ID (UUID)
 * Method: GET
 * Endpoint: /api/v1/entities/Project/{Project_id}
 *
 * @param projectId UUID của dự án cần lấy chi tiết
 * @returns Chi tiết bản ghi dự án (ProjectItem)
 */
export async function getProjectDetail(projectId: string): Promise<ProjectItem> {
  if (!projectId || !projectId.trim()) {
    throw new Error("ID dự án không hợp lệ.");
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const url = `${BASE_API_FASTAPI}${API_ROUTE.PROJECT_DETAIL.replace(
    "{Project_id}",
    encodeURIComponent(projectId.trim())
  )}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "X-API-Key": apiKey } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = Array.isArray(errorData.detail)
      ? errorData.detail.map((d: any) => d.msg || d).join(", ")
      : errorData.detail || errorData.message || `Lấy chi tiết dự án thất bại (HTTP ${res.status})`;
    throw new Error(message);
  }

  const data: ProjectItem = await res.json();
  return data;
}

export const apiGetListDetail = getProjectDetail;
export const apiGetProjectDetail = getProjectDetail;
export default getProjectDetail;
