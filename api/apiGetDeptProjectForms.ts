import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter";

export interface DeptProjectFormItem {
  id?: string;
  project_id: string;
  project_name?: string;
  department: string;
  status?: string;
  created_by_name?: string;
  created_by_id?: string;
  tasks_json?: string;
  change_log?: string;
  notes?: string;
  created_date?: string;
  updated_date?: string;
  [key: string]: any;
}

/**
 * Hàm gọi API lấy danh sách hồ sơ / báo cáo phòng ban của dự án:
 * GET /api/v1/entities/DeptProjectForm
 *
 * @param projectId UUID của dự án cần lấy danh sách phòng ban
 */
export async function getDeptProjectForms(
  projectId: string
): Promise<DeptProjectFormItem[]> {
  if (!projectId || !projectId.trim()) {
    return [];
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const searchParams = new URLSearchParams();
  searchParams.append("q", JSON.stringify({ project_id: projectId.trim() }));
  searchParams.append("limit", "100");

  const url = `${BASE_API_FASTAPI}${API_ROUTE.DEPT_PROJECT_FORM_LIST}?${searchParams.toString()}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "api_key": apiKey } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = Array.isArray(errorData.detail)
      ? errorData.detail.map((d: any) => d.msg || d).join(", ")
      : errorData.detail || errorData.message || `Lấy danh sách phòng ban thất bại (HTTP ${res.status})`;
    throw new Error(message);
  }

  const data: DeptProjectFormItem[] = await res.json();
  return Array.isArray(data) ? data : [];
}

export default getDeptProjectForms;
