import { BASE_API_FASTAPI } from "../config";
import { QuoteRequestRecord, getQuoteRequestHeaders } from "./types/quoteRequest";

/**
 * Tạo nhiều đề xuất báo giá cùng lúc (Bulk Create)
 * Endpoint: POST /api/v1/entities/QuoteRequest/bulk
 */
export async function bulkCreateQuoteRequest(
  items: Partial<QuoteRequestRecord>[]
): Promise<{ success: boolean; data?: QuoteRequestRecord[]; error?: string }> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/QuoteRequest/bulk`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: getQuoteRequestHeaders(),
      body: JSON.stringify(items),
    });

    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data?.data)
            ? data.data
            : [];
      return { success: true, data: list };
    }

    const errText = await res.text().catch(() => res.statusText);
    return { success: false, error: `HTTP ${res.status}: ${errText}` };
  } catch (err: any) {
    return { success: false, error: err?.message || "Lỗi kết nối mạng" };
  }
}
