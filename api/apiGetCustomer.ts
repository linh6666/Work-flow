import { BASE_API_FASTAPI } from "../config";

export interface CustomerRecord {
  id: string;
  name?: string;
  phone?: string;
  contact_person?: string;
  [key: string]: any;
}

const getHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  return {
    "Content-Type": "application/json",
    ...(apiKey ? { "X-API-Key": apiKey } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Lấy danh sách khách hàng CRM (Customer)
 * Endpoint: GET /api/v1/entities/Customer?limit={limit}
 */
export async function getCustomerList(limit = 500): Promise<CustomerRecord[]> {
  const url = `${BASE_API_FASTAPI}/api/v1/entities/Customer?limit=${limit}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: getHeaders(),
    });

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json)) return json;
      if (Array.isArray(json?.items)) return json.items;
      if (Array.isArray(json?.data)) return json.data;
    } else {
      console.warn("Lỗi khi tải danh sách Customer:", res.status, res.statusText);
    }
  } catch (err) {
    console.warn("Lỗi khi gọi API danh sách Customer:", err);
  }

  return [];
}
