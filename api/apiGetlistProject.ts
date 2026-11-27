import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter";

/**
 * Interface mô tả một bản ghi Dự án (Project) theo schema Swagger
 */
export interface ProjectItem {
  id?: string;
  _id?: string;
  project_name?: string;
  quotation_id?: string;
  customer_id?: string;
  customer_name?: string;
  contract_value?: string | number;
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
  progress?: string | number;
  staffing_approval_json?: string;
  priority?: string | number;
  director_evaluation?: string;
  daily_capacity_hours?: string;
  created_date?: string;
  [key: string]: any;
}

/**
 * Query parameters cho API lấy danh sách dự án:
 * - q: Bộ lọc JSON tùy chọn (ví dụ: {"status":"active"})
 * - limit: Giới hạn từ 1 đến 1000 bản ghi (mặc định 100)
 * - skip: Số bản ghi bỏ qua để phân trang (mặc định 0)
 * - sort_by: Tên cột, thêm tiền tố '-' để sắp xếp giảm dần (ví dụ: "-created_date")
 */
export interface GetListProjectParams {
  q?: string | Record<string, any> | null;
  limit?: number;
  skip?: number;
  sort_by?: string | null;
}

/**
 * Hàm gọi API lấy danh sách Project
 * Method: GET
 * Endpoint: /api/v1/entities/Project
 */
export async function getListProject(
  params?: GetListProjectParams
): Promise<ProjectItem[]> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const searchParams = new URLSearchParams();

  if (params) {
    if (params.q !== undefined && params.q !== null) {
      const qVal =
        typeof params.q === "object" ? JSON.stringify(params.q) : params.q;
      if (qVal.trim()) {
        searchParams.append("q", qVal);
      }
    }

    if (params.limit !== undefined && params.limit !== null) {
      searchParams.append("limit", params.limit.toString());
    }

    if (params.skip !== undefined && params.skip !== null) {
      searchParams.append("skip", params.skip.toString());
    }

    if (params.sort_by) {
      searchParams.append("sort_by", params.sort_by.trim());
    }
  }

  const queryString = searchParams.toString();
  const url = `${BASE_API_FASTAPI}${API_ROUTE.PROJECT_LIST}${queryString ? `?${queryString}` : ""
    }`;

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
      : errorData.detail || errorData.message || "Lấy danh sách dự án thất bại";
    throw new Error(message);
  }

  const data = await res.json();
  return data;
}

// Export alias để linh hoạt khi import
export const apiGetlistProject = getListProject;
export default getListProject;
