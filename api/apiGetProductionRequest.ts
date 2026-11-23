import { BASE_API_FASTAPI } from "../config";

export interface ProductionRequestItem {
  id: string;
  request_number: string;
  project_name: string;
  project_code?: string;
  approval_status?: string;
  customer_name?: string;
  scale?: string;
  size?: string;
  install_location?: string;
  start_date?: string;
  end_date?: string;
  notes?: string;
  [key: string]: any;
}

/**
 * Lấy danh sách Yêu Cầu Sản Xuất (YCSX) từ Backend
 * Endpoint: /api/v1/entities/ProductionRequest?limit=100
 */
export async function getProductionRequestList(params?: { limit?: number }): Promise<ProductionRequestItem[]> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const limit = params?.limit || 100;
  const url = `${BASE_API_FASTAPI}/api/v1/entities/ProductionRequest?limit=${limit}`;

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
      const records: any[] = Array.isArray(json)
        ? json
        : Array.isArray(json?.items)
          ? json.items
          : Array.isArray(json?.data)
            ? json.data
            : [];

      return records.map((r) => ({
        id: String(r.id),
        request_number: r.request_number || r.code || "—",
        project_name: r.project_name || r.name || "Chưa đặt tên",
        project_code: r.project_code || "",
        approval_status: r.approval_status || "",
        customer_name: r.customer_name || "",
        scale: r.scale || "",
        size: r.size || "",
        install_location: r.install_location || "",
        start_date: r.start_date || "",
        end_date: r.end_date || "",
        notes: r.notes || "",
        ...r,
      }));
    }
  } catch (err) {
    console.warn("Lỗi khi tải danh sách ProductionRequest:", err);
  }

  return [];
}
