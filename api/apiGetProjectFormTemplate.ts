import { BASE_API_FASTAPI } from "../config";

export interface ProjectFormTemplateItem {
  id: string;
  template_name: string;
  department?: string;
  description?: string;
  [key: string]: any;
}

/**
 * Lấy danh sách Mẫu hồ sơ phòng ban (ProjectFormTemplate) từ Backend
 * Endpoint: /api/v1/entities/ProjectFormTemplate?limit=100
 */
export async function getProjectFormTemplateList(params?: { limit?: number }): Promise<ProjectFormTemplateItem[]> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const limit = params?.limit || 100;
  const url = `${BASE_API_FASTAPI}/api/v1/entities/ProjectFormTemplate?limit=${limit}`;

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
        template_name: r.template_name || r.name || r.title || "Mẫu hồ sơ",
        department: r.department || "",
        description: r.description || "",
      }));
    }
  } catch (err) {
    console.warn("Lỗi khi tải danh sách ProjectFormTemplate:", err);
  }

  return [];
}
