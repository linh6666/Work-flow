import { BASE_API_FASTAPI } from "../config";

export interface ContractRecord {
  id: string;
  contract_number?: string;
  project_name?: string;
  customer_name?: string;
  quotation_id?: string;
  scale?: string;
  size?: string;
  total_after_tax?: string | number;
  status?: string;
  approval_status?: string;
  [key: string]: any;
}

/**
 * Lấy danh sách hợp đồng (Contract) từ backend
 * Endpoint: GET /api/v1/entities/Contract?limit={limit}
 */
export async function getContractList(limit = 200): Promise<ContractRecord[]> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const url = `${BASE_API_FASTAPI}/api/v1/entities/Contract?limit=${limit}`;

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
      if (Array.isArray(json)) return json;
      if (Array.isArray(json?.items)) return json.items;
      if (Array.isArray(json?.data)) return json.data;
    }
  } catch (err) {
    console.warn("Lỗi khi gọi API danh sách Contract:", err);
  }

  return [];
}
