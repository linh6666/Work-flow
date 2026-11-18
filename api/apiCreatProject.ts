import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter";

/**
 * Interface mô tả schema body tạo mới bản ghi Project theo Swagger
 */
export interface CreateProjectPayload {
  id?: string;
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
  created_date?: string;
  updated_date?: string;
  created_by_id?: string;
  [key: string]: any;
}

/**
 * Hàm gọi API tạo một bản ghi Project mới
 * Method: POST
 * Endpoint: /api/v1/entities/Project
 *
 * @param payload Dữ liệu dự án cần tạo (chỉ các trường được gửi mới được đưa vào thao tác tạo)
 */
export async function createProject(
  payload: CreateProjectPayload
): Promise<any> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const res = await fetch(`${BASE_API_FASTAPI}${API_ROUTE.PROJECT_CREATE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = Array.isArray(errorData.detail)
      ? errorData.detail.map((d: any) => d.msg || d).join(", ")
      : errorData.detail || errorData.message || "Tạo dự án thất bại";
    throw new Error(message);
  }

  const data = await res.json();
  return data;
}

// Export các alias để thuận tiện cho việc import ở mọi nơi
export const apiCreatProject = createProject;
export const apiCreateProject = createProject;
export default createProject;
