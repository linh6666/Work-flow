import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter";

export async function sendPasswordResetEmail(email: string) {
  const res = await fetch(`${BASE_API_FASTAPI}${API_ROUTE.SENDEMAIL.replace('{email}', encodeURIComponent(email.trim()))}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.trim() }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = Array.isArray(errorData.detail)
      ? errorData.detail.map((d: any) => d.msg || d).join(", ")
      : (errorData.detail || errorData.message || "Gửi email khôi phục mật khẩu thất bại");
    throw new Error(message);
  }

  const data = await res.json().catch(() => ({}));
  return data;
}

// Alias hỗ trợ cả 2 tên gọi
export const recoverPassword = sendPasswordResetEmail;
