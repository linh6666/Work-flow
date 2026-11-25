import { BASE_API_FASTAPI } from "../config";
import { QuotationTemplateRecord, getQuotationTemplateHeaders } from "./types/quotationTemplate";

export * from "./types/quotationTemplate";

/**
 * 1. Lấy danh sách mẫu báo giá (QuotationTemplate)
 * Endpoint: GET /api/v1/entities/QuotationTemplate?limit={limit}
 */
export async function getQuotationTemplateList(limit = 200): Promise<QuotationTemplateRecord[]> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/QuotationTemplate?limit=${limit}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: getQuotationTemplateHeaders(),
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
      headers: getQuotationTemplateHeaders(),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Lỗi khi lấy chi tiết QuotationTemplate [${id}]:`, err);
  }

  return null;
}
