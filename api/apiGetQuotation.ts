import { BASE_API_FASTAPI } from "../config";

export interface QuotationRecord {
  id: string;
  quote_number?: string;
  code?: string;
  project_name?: string;
  customer_name?: string;
  type?: string;
  scale?: string;
  size?: string;
  creator_name?: string;
  quote_date?: string;
  valid_days?: number;
  total_after_tax?: string | number;
  subtotal_after_discount?: string | number;
  vat_percent?: number;
  discount_percent?: number;
  approval_status?: string;
  status?: string;
  terms?: string;
  notes?: string;
  [key: string]: any;
}

export interface CreateQuotationPayload {
  quote_number?: string;
  code?: string;
  project_name?: string;
  customer_name?: string;
  type?: string;
  scale?: string;
  size?: string;
  creator_name?: string;
  quote_date?: string;
  valid_days?: number;
  total_after_tax?: number | string;
  subtotal_after_discount?: number | string;
  vat_percent?: number;
  discount_percent?: number;
  approval_status?: string;
  status?: string;
  notes?: string;
  [key: string]: any;
}

export interface UpdateQuotationPayload extends Partial<CreateQuotationPayload> {
  id?: string;
}

const getHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  return {
    "Content-Type": "application/json",
    ...(apiKey ? { "X-API-Key": apiKey } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * 1. Lấy danh sách báo giá (Quotation) từ backend
 * Endpoint: GET /api/v1/entities/Quotation?limit={limit}
 */
export async function getQuotationList(limit = 200): Promise<QuotationRecord[]> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/Quotation?limit=${limit}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: getHeaders(),
    });

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json)) return json;
      if (Array.isArray(json?.items)) return json.items;
      if (Array.isArray(json?.data)) return json.data;
    } else {
      console.warn("Lỗi khi tải danh sách Quotation:", res.status, res.statusText);
    }
  } catch (err) {
    console.warn("Lỗi khi gọi API danh sách Quotation:", err);
  }

  return [];
}

/**
 * 2. Lấy chi tiết một bản ghi báo giá theo ID
 * Endpoint: GET /api/v1/entities/Quotation/{id}
 */
export async function getQuotationById(id: string): Promise<QuotationRecord | null> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/Quotation/${id}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: getHeaders(),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Lỗi khi lấy chi tiết Quotation [${id}]:`, err);
  }

  return null;
}

/**
 * 3. Tạo mới một báo giá
 * Endpoint: POST /api/v1/entities/Quotation
 */
export async function createQuotation(payload: CreateQuotationPayload): Promise<{ success: boolean; data?: any; error?: string }> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/Quotation`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, data };
    }

    const errJson = await res.json().catch(() => null);
    return {
      success: false,
      error: errJson?.detail || errJson?.message || `Lỗi server: ${res.status}`,
    };
  } catch (err: any) {
    console.error("Lỗi khi gọi POST /api/v1/entities/Quotation:", err);
    return { success: false, error: err?.message || "Không thể kết nối đến máy chủ" };
  }
}

/**
 * 4. Cập nhật một báo giá theo ID
 * Endpoint: PUT /api/v1/entities/Quotation/{id}
 */
export async function updateQuotation(id: string, payload: UpdateQuotationPayload): Promise<{ success: boolean; data?: any; error?: string }> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/Quotation/${id}`;

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, data };
    }

    const errJson = await res.json().catch(() => null);
    return {
      success: false,
      error: errJson?.detail || errJson?.message || `Lỗi server: ${res.status}`,
    };
  } catch (err: any) {
    console.error(`Lỗi khi gọi PUT /api/v1/entities/Quotation/${id}:`, err);
    return { success: false, error: err?.message || "Không thể kết nối đến máy chủ" };
  }
}

/**
 * 5. Xóa một báo giá theo ID
 * Endpoint: DELETE /api/v1/entities/Quotation/{id}
 */
export async function deleteQuotation(id: string): Promise<{ success: boolean; error?: string }> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/Quotation/${id}`;

  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (res.ok) {
      return { success: true };
    }

    const errJson = await res.json().catch(() => null);
    return {
      success: false,
      error: errJson?.detail || errJson?.message || `Lỗi server: ${res.status}`,
    };
  } catch (err: any) {
    console.error(`Lỗi khi gọi DELETE /api/v1/entities/Quotation/${id}:`, err);
    return { success: false, error: err?.message || "Không thể kết nối đến máy chủ" };
  }
}
