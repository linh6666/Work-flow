import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter";

export async function registerUser(
  email: string,
  full_name?: string,
  password?: string,
  phone?: string,
  confirm_password?: string
) {
  const payload: Record<string, any> = {
    email,
    password,
  };

  if (full_name && full_name.trim()) {
    payload.full_name = full_name.trim();
  }

  if (phone && phone.trim()) {
    payload.phone = phone.trim();
  }

  if (confirm_password) {
    payload.confirm_password = confirm_password;
  }

  const res = await fetch(`${BASE_API_FASTAPI}${API_ROUTE.REGISTER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = Array.isArray(errorData.detail)
      ? errorData.detail.map((d: any) => d.msg || d).join(", ")
      : (errorData.detail || "Đăng ký thất bại");
    throw new Error(message);
  }

  const data = await res.json();
  return data;
}
