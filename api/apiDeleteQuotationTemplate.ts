import { BASE_API_FASTAPI } from "../config";
import { getQuotationTemplateHeaders } from "./types/quotationTemplate";

/**
 * Xóa mẫu báo giá
 * Endpoint: DELETE /api/v1/entities/QuotationTemplate/{id}
 */
export async function deleteQuotationTemplate(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/QuotationTemplate/${id}`;

  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: getQuotationTemplateHeaders(),
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
