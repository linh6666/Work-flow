import { BASE_API_FASTAPI } from "../config";
import { QuoteRequestRecord, getQuoteRequestHeaders } from "./types/quoteRequest";

/**
 * Cập nhật yêu cầu báo giá (QuoteRequest)
 * Endpoint: PUT /api/v1/entities/QuoteRequest/{id}
 */
export async function updateQuoteRequest(
  id: string,
  payload: Partial<QuoteRequestRecord>
): Promise<{ success: boolean; data?: any; error?: string }> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/QuoteRequest/${id}`;

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: getQuoteRequestHeaders(),
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
    console.error(`Lỗi khi cập nhật QuoteRequest [${id}]:`, err);
    return { success: false, error: err?.message || "Không thể kết nối đến máy chủ" };
  }
}
