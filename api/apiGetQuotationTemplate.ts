import { BASE_API_FASTAPI } from "../config";

export interface QuotationTemplateRecord {
  id: string;
  template_name?: string;
  quote_type?: string;
  quote_language?: string; // 'vi' | 'en' | 'vi-en'
  scale?: string;
  size?: string;
  project_name?: string;
  vat_percent?: number | string;
  production_days?: number | string;
  warranty_months?: number | string;
  is_system?: boolean;
  items_json?: string;
  notes?: string;
  created_by_name?: string;
  created_date?: string;
  updated_date?: string;
  [key: string]: any;
}

const getHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  return {
    "Content-Type": "application/json",
    ...(apiKey ? { api_key: apiKey } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * 1. Lấy danh sách mẫu báo giá (QuotationTemplate)
 * Endpoint: GET /api/v1/entities/QuotationTemplate?limit={limit}
 */
export async function getQuotationTemplateList(limit = 200): Promise<QuotationTemplateRecord[]> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/QuotationTemplate?limit=${limit}`;

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
      console.warn("Lỗi khi tải danh sách QuotationTemplate:", res.status, res.statusText);
    }
  } catch (err) {
    console.warn("Lỗi khi gọi API danh sách QuotationTemplate:", err);
  }

  return [];
}

/**
 * 2. Lấy chi tiết mẫu báo giá theo ID
 * Endpoint: GET /api/v1/entities/QuotationTemplate/{id}
 */
export async function getQuotationTemplateById(id: string): Promise<QuotationTemplateRecord | null> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/QuotationTemplate/${id}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: getHeaders(),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Lỗi khi lấy chi tiết QuotationTemplate [${id}]:`, err);
  }

  return null;
}

/**
 * 3. Tạo mới mẫu báo giá
 * Endpoint: POST /api/v1/entities/QuotationTemplate
 */
export async function createQuotationTemplate(payload: Partial<QuotationTemplateRecord>): Promise<{ success: boolean; data?: any; error?: string }> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/QuotationTemplate`;

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
    console.error("Lỗi khi tạo QuotationTemplate:", err);
    return { success: false, error: err?.message || "Không thể kết nối đến máy chủ" };
  }
}

/**
 * 4. Cập nhật mẫu báo giá
 * Endpoint: PUT /api/v1/entities/QuotationTemplate/{id}
 */
export async function updateQuotationTemplate(id: string, payload: Partial<QuotationTemplateRecord>): Promise<{ success: boolean; data?: any; error?: string }> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/QuotationTemplate/${id}`;

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
    console.error(`Lỗi khi cập nhật QuotationTemplate [${id}]:`, err);
    return { success: false, error: err?.message || "Không thể kết nối đến máy chủ" };
  }
}

/**
 * 5. Xóa mẫu báo giá
 * Endpoint: DELETE /api/v1/entities/QuotationTemplate/{id}
 */
export async function deleteQuotationTemplate(id: string): Promise<{ success: boolean; error?: string }> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/QuotationTemplate/${id}`;

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
    console.error(`Lỗi khi xóa QuotationTemplate [${id}]:`, err);
    return { success: false, error: err?.message || "Không thể kết nối đến máy chủ" };
  }
}
