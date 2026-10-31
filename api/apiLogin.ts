import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter";

export async function loginUser(username: string, password: string) {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("grant_type", "password"); // chuẩn OAuth2

  const res = await fetch(`${BASE_API_FASTAPI}${API_ROUTE.LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = Array.isArray(errorData.detail)
      ? errorData.detail.map((d: any) => d.msg || d).join(", ")
      : (errorData.detail || "Đăng nhập thất bại");
    throw new Error(message);
  }

  const data = await res.json();

  // Lưu access_token vào localStorage
  if (data.access_token) {
    localStorage.setItem("access_token", data.access_token);
  }

  return data;
}
