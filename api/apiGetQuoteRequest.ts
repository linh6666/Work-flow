import { BASE_API_FASTAPI } from "../config";
import { QuoteRequestRecord, getQuoteRequestHeaders } from "./types/quoteRequest";

export * from "./types/quoteRequest";

/**
 * 1. Lấy danh sách yêu cầu báo giá (QuoteRequest)
 * Endpoint: GET /api/v1/entities/QuoteRequest?limit={limit}
 */
export async function getQuoteRequestList(limit = 200): Promise<QuoteRequestRecord[]> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/QuoteRequest?limit=${limit}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: getQuoteRequestHeaders(),
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
      headers: getQuoteRequestHeaders(),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Lỗi khi lấy chi tiết QuoteRequest [${id}]:`, err);
  }

  return null;
}
