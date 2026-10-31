import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter";

/**
 * Gọi API đăng xuất hệ thống
 * Endpoint: POST /api/v1/logout
 * Header: Authorization: Bearer <access_token>
 */
export async function logoutUser(): Promise<any> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  try {
    const res = await fetch(`${BASE_API_FASTAPI}${API_ROUTE.LOGOUT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const message = Array.isArray(errorData.detail)
        ? errorData.detail.map((d: any) => d.msg || d).join(", ")
        : (errorData.detail || errorData.message || "Đăng xuất thất bại");
      throw new Error(message);
    }

    const text = await res.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    return data;
  } finally {
    // Luôn dọn dẹp access_token và user_email khỏi localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_email");
    }
  }
}
