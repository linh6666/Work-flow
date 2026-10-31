import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter";

export async function resetPassword(token: string, new_password: string) {
  const res = await fetch(`${BASE_API_FASTAPI}${API_ROUTE.RESET_PASSWORD}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      new_password,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = Array.isArray(errorData.detail)
      ? errorData.detail.map((d: any) => d.msg || d).join(", ")
      : (errorData.detail || errorData.message || "Đổi mật khẩu thất bại!");
    throw new Error(message);
  }

  const data = await res.json().catch(() => ({}));
  return data;
}

