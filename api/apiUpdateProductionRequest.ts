import { BASE_API_FASTAPI } from "../config";

/**
 * Payload interface để cập nhật Yêu cầu sản xuất (ProductionRequest)
 * Dựa trên schema OpenAPI: PUT /api/v1/entities/ProductionRequest/{ProductionRequest_id}
 */
export interface UpdateProductionRequestPayload {
  request_number?: string;
  project_code?: string;
  project_name?: string;
  customer_name?: string;
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

export interface UpdateProductionRequestResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Lấy chi tiết một bản ghi ProductionRequest theo ID
 * Method: GET
 * Endpoint: /api/v1/entities/ProductionRequest/{id}
 */
export async function getProductionRequestById(id: string): Promise<any | null> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const url = `${BASE_API_FASTAPI}/api/v1/entities/ProductionRequest/${id}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { "X-API-Key": apiKey } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Lỗi khi lấy chi tiết ProductionRequest [${id}]:`, err);
  }
  return null;
}

/**
 * Cập nhật một bản ghi ProductionRequest
 * Method: PUT
 * Endpoint: /api/v1/entities/ProductionRequest/{id}
 */
export async function updateProductionRequest(
  id: string,
  payload: UpdateProductionRequestPayload
): Promise<UpdateProductionRequestResponse> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const url = `${BASE_API_FASTAPI}/api/v1/entities/ProductionRequest/${id}`;

  // Lọc bỏ undefined để không ghi đè dữ liệu rỗng ngoài ý muốn
  const cleanPayload: Record<string, any> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined && value !== null) {
      cleanPayload[key] = value;
    }
  }

  try {
    const res = await fetch(url, {
      method: "PUT",
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
    console.error(`Lỗi khi gọi API updateProductionRequest [${id}]:`, err);
    return {
      success: false,
      error: err?.message || "Không thể kết nối đến máy chủ API",
    };
  }
}
