import { BASE_API_FASTAPI } from "../config";

/**
 * Payload interface để tạo mới một yêu cầu sản xuất (ProductionRequest)
 * Dựa trên schema OpenAPI từ FastAPI: POST /api/v1/entities/ProductionRequest
 */
export interface CreateProductionRequestPayload {
  request_number?: string;
  project_code?: string;
  project_name: string; // Bắt buộc
  customer_name: string; // Bắt buộc
  scale?: string;
  size?: string;
  project_level?: string;
  install_location?: string;
  contract_id?: string;
  contract_orientation?: string;
  technical_docs?: string;
  acceptance_milestone_1?: string;
  notes?: string;

  // Yêu cầu kỹ thuật
  frame_board?: string;
  base_legs?: string;
  buildings?: string;
  interior?: string;
  ground_landscape?: string;
  lighting_system?: string;
  special_lighting?: string;
  glass_cover?: string;
  transport_box?: string;
  other_requirements?: string;

  // Tiến độ & ngày tháng
  start_date?: string;
  end_date?: string;
  total_days?: number | string;
  acceptance_date_1?: string;
  acceptance_date_final?: string;
  transport_date?: string;
  install_date?: string;
  install_staff_count?: string;

  // Phê duyệt & người lập
  approval_status?: string;
  submitter_name?: string;
  [key: string]: any;
}

export interface CreateProductionRequestResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Gọi API POST /api/v1/entities/ProductionRequest để tạo mới YCSX
 */
export async function createProductionRequest(
  payload: CreateProductionRequestPayload
): Promise<CreateProductionRequestResponse> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const url = `${BASE_API_FASTAPI}/api/v1/entities/ProductionRequest`;

  // Lọc bỏ các trường undefined hoặc null để tránh lỗi validate
  const cleanPayload: Record<string, any> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined && value !== null && value !== "") {
      cleanPayload[key] = value;
    }
  }

  // Đảm bảo các trường bắt buộc luôn có
  cleanPayload.project_name = payload.project_name || "Chưa đặt tên";
  cleanPayload.customer_name = payload.customer_name || "Khách hàng mới";
  cleanPayload.approval_status = payload.approval_status || "Chờ QL KD duyệt";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { "X-API-Key": apiKey } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(cleanPayload),
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, data };
    } else {
      const errJson = await res.json().catch(() => null);
      const errMsg =
        errJson?.detail ||
        (Array.isArray(errJson?.detail)
          ? errJson.detail.map((d: any) => d.msg).join(", ")
          : null) ||
        `Lỗi HTTP: ${res.status} - ${res.statusText}`;
      return { success: false, error: errMsg };
    }
  } catch (err: any) {
    console.error("Lỗi khi gọi API createProductionRequest:", err);
    return {
      success: false,
      error: err?.message || "Không thể kết nối đến máy chủ API",
    };
  }
}
