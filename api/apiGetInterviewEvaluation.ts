import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter";

export interface InterviewEvaluationRecord {
  id: string;
  candidate_id?: string | null;
  candidate_name: string;
  position: string;
  candidate_department: string;
  total_score: string | number;
  max_score?: string | number;
  decision: string;
  contract_type: string;
  interviewer_name: string;
  evaluation_date: string;
  vp_approver_name?: string | null;
  dept_approver_name?: string | null;
  pgd_approver_name?: string | null;
  approval_status: string;
  [key: string]: any;
}

/**
 * Lấy danh sách kết quả phỏng vấn/tuyển dụng cần phê duyệt
 * GET /api/v1/entities/InterviewEvaluation?limit=100
 */
export async function getInterviewEvaluationList(): Promise<InterviewEvaluationRecord[]> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const url = `${BASE_API_FASTAPI}${API_ROUTE.INTERVIEW_EVALUATION_LIST}?limit=100`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "api_key": apiKey } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = Array.isArray(errorData.detail)
      ? errorData.detail.map((d: any) => d.msg || d).join(", ")
      : errorData.detail || errorData.message || `Lấy danh sách phê duyệt thất bại (HTTP ${res.status})`;
    throw new Error(message);
  }

  const data: InterviewEvaluationRecord[] = await res.json();
  return data;
}

/**
 * Cập nhật phê duyệt kết quả phỏng vấn
 * PUT /api/v1/entities/InterviewEvaluation/{id}
 */
export async function updateInterviewEvaluation(
  id: string,
  payload: Partial<InterviewEvaluationRecord>
): Promise<any> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const url = `${BASE_API_FASTAPI}${API_ROUTE.INTERVIEW_EVALUATION_UPDATE.replace(
    "{InterviewEvaluation_id}",
    encodeURIComponent(id)
  )}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "api_key": apiKey } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = Array.isArray(errorData.detail)
      ? errorData.detail.map((d: any) => d.msg || d).join(", ")
      : errorData.detail || errorData.message || `Cập nhật phê duyệt thất bại (HTTP ${res.status})`;
    throw new Error(message);
  }

  return await res.json();
}

/**
 * Xóa bản ghi phê duyệt kết quả phỏng vấn
 * DELETE /api/v1/entities/InterviewEvaluation/{id}
 */
export async function deleteInterviewEvaluation(id: string): Promise<any> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const url = `${BASE_API_FASTAPI}${API_ROUTE.INTERVIEW_EVALUATION_DELETE.replace(
    "{InterviewEvaluation_id}",
    encodeURIComponent(id)
  )}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "api_key": apiKey } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = Array.isArray(errorData.detail)
      ? errorData.detail.map((d: any) => d.msg || d).join(", ")
      : errorData.detail || errorData.message || `Xóa phê duyệt thất bại (HTTP ${res.status})`;
    throw new Error(message);
  }

  return await res.json();
}
