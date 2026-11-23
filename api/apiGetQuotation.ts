import { BASE_API_FASTAPI } from "../config";

export interface QuotationRecord {
  id: string;
  quote_number?: string;
  code?: string;
  project_name?: string;
  customer_name?: string;
  scale?: string;
  size?: string;
  total_after_tax?: string | number;
  subtotal_after_discount?: string | number;
  approval_status?: string;
  status?: string;
  [key: string]: any;
}

/**
 * Lấy danh sách báo giá (Quotation) từ backend
 * Endpoint: GET /api/v1/entities/Quotation?limit={limit}
 */
export async function getQuotationList(limit = 200): Promise<QuotationRecord[]> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const url = `${BASE_API_FASTAPI}/api/v1/entities/Quotation?limit=${limit}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { api_key: apiKey } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json)) return json;
      if (Array.isArray(json?.items)) return json.items;
      if (Array.isArray(json?.data)) return json.data;
    }
  } catch (err) {
    console.warn("Lỗi khi gọi API danh sách Quotation:", err);
  }

  return [];
}

/**
 * Lấy chi tiết một bản ghi báo giá theo ID
 * Endpoint: GET /api/v1/entities/Quotation/{id}
 */
export async function getQuotationById(id: string): Promise<QuotationRecord | null> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const url = `${BASE_API_FASTAPI}/api/v1/entities/Quotation/${id}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { api_key: apiKey } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Lỗi khi lấy chi tiết Quotation [${id}]:`, err);
  }

  return null;
}
