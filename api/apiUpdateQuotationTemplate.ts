import { BASE_API_FASTAPI } from "../config";
import { QuotationTemplateRecord, getQuotationTemplateHeaders } from "./types/quotationTemplate";

/**
 * Cập nhật mẫu báo giá
 * Endpoint: PUT /api/v1/entities/QuotationTemplate/{id}
 */
export async function updateQuotationTemplate(
  id: string,
  payload: Partial<QuotationTemplateRecord>
): Promise<{ success: boolean; data?: any; error?: string }> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/QuotationTemplate/${id}`;

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: getQuotationTemplateHeaders(),
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
