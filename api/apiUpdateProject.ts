import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter";

/**
 * Interface mô tả schema body cập nhật bản ghi Project theo Swagger
 */
export interface UpdateProjectPayload {
  code?: string;
  name?: string;
  contract_id?: string;
  production_request_id?: string;
  quotation_id?: string;
  customer_id?: string;
  customer_name?: string;
  contract_value?: number | string;
  status?: string;
  paused_date?: string;
  start_date?: string;
  end_date?: string;
  baseline_start?: string;
  baseline_end?: string;
  scale?: string;
  size?: string;
  products_json?: string;
  project_level?: string;
  install_location?: string;
  acceptance_date_1?: string;
  acceptance_date_final?: string;
  transport_date?: string;
  install_date?: string;
  install_staff_count?: string;
  acceptance_milestone_1?: string;
  description?: string;
  progress?: number | string;
  staffing_approval_json?: string;
  priority?: number | string;
  director_evaluation?: string;
  daily_capacity_hours?: number | string;
  [key: string]: any;
}

/**
 * Hàm gọi API cập nhật thông tin một dự án theo Project ID (UUID)
 * Method: PUT
 * Endpoint: /api/v1/entities/Project/{Project_id}
 *
 * @param projectId UUID của dự án cần cập nhật
 * @param payload Dữ liệu dự án cần cập nhật
 * @returns Bản ghi dự án sau khi cập nhật
 */
export async function updateProject(
  projectId: string,
  payload: UpdateProjectPayload
): Promise<any> {
  if (!projectId || !projectId.trim()) {
    throw new Error("ID dự án không hợp lệ để cập nhật.");
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const url = `${BASE_API_FASTAPI}${API_ROUTE.PROJECT_UPDATE_BY_ID.replace(
    "{Project_id}",
    encodeURIComponent(projectId.trim())
  )}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "api_key": apiKey } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = Array.isArray(errorData.detail)
      ? errorData.detail.map((d: any) => d.msg || d).join(", ")
      : errorData.detail || errorData.message || `Cập nhật dự án thất bại (HTTP ${res.status})`;
    throw new Error(message);
  }

  const data = await res.json();
  return data;
}

export default updateProject;
