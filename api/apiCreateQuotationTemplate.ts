import { BASE_API_FASTAPI } from "../config";
import { QuotationTemplateRecord, getQuotationTemplateHeaders } from "./types/quotationTemplate";

/**
 * Tạo mới mẫu báo giá
 * Endpoint: POST /api/v1/entities/QuotationTemplate
 */
export async function createQuotationTemplate(
  payload: Partial<QuotationTemplateRecord>
): Promise<{ success: boolean; data?: any; error?: string }> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/QuotationTemplate`;

  try {
    const res = await fetch(url, {
      method: "POST",
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
    console.error("Lỗi khi tạo QuotationTemplate:", err);
    return { success: false, error: err?.message || "Không thể kết nối đến máy chủ" };
  }
}
