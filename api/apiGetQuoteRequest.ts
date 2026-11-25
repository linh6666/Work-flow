import { BASE_API_FASTAPI } from "../config";

export interface QuoteRequestRecord {
  id: string;
  request_number?: string;
  project_name?: string;
  customer_name?: string;
  customer_id?: string;
  contact_person?: string;
  contact_phone?: string;
  contact_company?: string;
  model_scale?: string;
  model_size?: string;
  model_needing_time?: string;
  install_location?: string;
  leg_type?: string;
  glass_type?: string;
  approval_status?: string;
  drawing_status?: string;
  notes?: string;
  quoting_content?: string;
  date?: string;
  submitter_name?: string;
  created_date?: string;
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
 * 1. Lấy danh sách yêu cầu báo giá (QuoteRequest)
 * Endpoint: GET /api/v1/entities/QuoteRequest?limit={limit}
 */
export async function getQuoteRequestList(limit = 200): Promise<QuoteRequestRecord[]> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/QuoteRequest?limit=${limit}`;

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
      console.warn("Lỗi khi tải danh sách QuoteRequest:", res.status, res.statusText);
    }
  } catch (err) {
    console.warn("Lỗi khi gọi API danh sách QuoteRequest:", err);
  }

  return [];
}

/**
 * 2. Lấy chi tiết yêu cầu báo giá theo ID
 * Endpoint: GET /api/v1/entities/QuoteRequest/{id}
 */
export async function getQuoteRequestById(id: string): Promise<QuoteRequestRecord | null> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/QuoteRequest/${id}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: getHeaders(),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Lỗi khi lấy chi tiết QuoteRequest [${id}]:`, err);
  }

  return null;
}
