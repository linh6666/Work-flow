import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter";

export interface CompetencyCriteria {
  name: string;
  weight: number;
  level: string | number;
  question: string;
}

export interface CompetencyFrameworkRecord {
  id: string;
  position_code: string;
  position_title: string;
  department: string;
  criteria_json: string;
  notes?: string | null;
  created_by_id?: string | null;
  created_date?: string;
  updated_date?: string;
}

export interface CompetencyFrameworkItem {
  id: string;
  position_code: string;
  position_title: string;
  department: string;
  criteria: CompetencyCriteria[];
  notes?: string | null;
}

/**
 * Lấy danh sách Khung đánh giá năng lực theo vị trí (CompetencyFramework)
 * Method: GET
 * Endpoint: /api/v1/entities/CompetencyFramework?limit=100
 */
export async function getCompetencyFrameworkList(): Promise<CompetencyFrameworkItem[]> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const url = `${BASE_API_FASTAPI}${API_ROUTE.COMPETENCY_FRAMEWORK_LIST || "/api/v1/entities/CompetencyFramework"}?limit=100`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "X-API-Key": apiKey } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = Array.isArray(errorData.detail)
      ? errorData.detail.map((d: any) => d.msg || d).join(", ")
      : errorData.detail || errorData.message || `Lấy khung đánh giá năng lực thất bại (HTTP ${res.status})`;
    throw new Error(message);
  }

  const rawData: CompetencyFrameworkRecord[] = await res.json();

  const formatted: CompetencyFrameworkItem[] = rawData.map((item) => {
    let parsedCriteria: CompetencyCriteria[] = [];
    try {
      if (item.criteria_json) {
        parsedCriteria = JSON.parse(item.criteria_json);
      }
    } catch {
      parsedCriteria = [];
    }

    return {
      id: item.id,
      position_code: item.position_code,
      position_title: item.position_title,
      department: item.department,
      criteria: parsedCriteria,
      notes: item.notes,
    };
  });

  // Sắp xếp theo thứ tự mã vị trí P01, P02, ..., P31
  formatted.sort((a, b) => {
    const numA = parseInt(a.position_code.replace(/\D/g, ""), 10) || 0;
    const numB = parseInt(b.position_code.replace(/\D/g, ""), 10) || 0;
    return numA - numB;
  });

  return formatted;
}
