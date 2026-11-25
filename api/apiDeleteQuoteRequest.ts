import { BASE_API_FASTAPI } from "../config";
import { getQuoteRequestHeaders } from "./types/quoteRequest";

/**
 * Xóa yêu cầu báo giá (QuoteRequest)
 * Endpoint: DELETE /api/v1/entities/QuoteRequest/{id}
 */
export async function deleteQuoteRequest(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/QuoteRequest/${id}`;

  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: getQuoteRequestHeaders(),
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
    console.error(`Lỗi khi xóa QuoteRequest [${id}]:`, err);
    return { success: false, error: err?.message || "Không thể kết nối đến máy chủ" };
  }
}
