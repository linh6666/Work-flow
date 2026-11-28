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
        ...(apiKey ? { "X-API-Key": apiKey } : {}),
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

export async function getProjectFormTemplateById(id: string): Promise<ProjectFormTemplateItem | null> {
  if (!id) return null;
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const url = `${BASE_API_FASTAPI}/api/v1/entities/ProjectFormTemplate/${id}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { "X-API-Key": apiKey } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) return null;
    const r = await res.json();
    return {
      id: String(r.id || id),
      template_name: r.template_name || r.name || r.title || "",
      department: r.department || "",
      description: r.description || "",
    };
  } catch {
    return null;
  }
}

export async function createProjectFormTemplate(payload: {
  template_name: string;
  scope?: string;
  department?: string;
  tasks_json?: string;
  all_depts_json?: string;
  description?: string;
  created_by_name?: string;
}): Promise<any> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const url = `${BASE_API_FASTAPI}/api/v1/entities/ProjectFormTemplate`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "X-API-Key": apiKey } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail || err?.message || `Lỗi ${res.status}`);
  }
  return res.json();
}

export async function updateProjectFormTemplate(
  id: string,
  payload: { template_name?: string; department?: string; description?: string }
): Promise<any> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const url = `${BASE_API_FASTAPI}/api/v1/entities/ProjectFormTemplate/${id}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "X-API-Key": apiKey } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail || err?.message || `Lỗi ${res.status}`);
  }
  return res.json();
}
