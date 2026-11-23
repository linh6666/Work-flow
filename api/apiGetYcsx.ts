import { BASE_API_FASTAPI } from "../config";
import { YcsxItem } from "../components/Administration/tabs/YeuCauSanXuat";

export interface ProductionRequestRecord {
  id?: string;
  request_number?: string;
  code?: string;
  project_name?: string;
  name?: string;
  customer_name?: string;
  submitter_name?: string;
  scale?: string;
  size?: string;
  start_date?: string;
  end_date?: string;
  approval_status?: string;
  project_code?: string;
  notes?: string;
  [key: string]: any;
}

/**
 * Ánh xạ bản ghi ProductionRequest từ Backend sang YcsxItem hiển thị trên giao diện
 */
export function mapProductionRequestToYcsxItem(record: ProductionRequestRecord, index: number): YcsxItem {
  // Chuẩn hóa định dạng ngày (YYYY-MM-DD -> DD/MM/YYYY)
  const formatDate = (dStr?: string) => {
    if (!dStr) return "—";
    const parts = dStr.split("T")[0].split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dStr;
  };

  return {
    id: String(record.id || `ycsx-${index + 1}`),
    soYcsx: record.request_number || record.code || `YCSX-${index + 1}`,
    tenDuAn: record.project_name || record.name || "Chưa đặt tên",
    khachHang: record.customer_name || "—",
    khachHangMaDa: record.customer_name ? `${record.customer_name} · ${record.project_code || ""}` : undefined,
    nguoiLap: record.submitter_name || "—",
    tyLe: record.scale || "—",
    kichThuoc: record.size || "—",
    ngayBatDau: formatDate(record.start_date),
    ngayKetThuc: formatDate(record.end_date),
    trangThai: record.approval_status || "Bản nháp",
  };
}

/**
 * Lấy danh sách YCSX từ Backend
 * Endpoint: /api/v1/entities/ProductionRequest?limit={limit}
 */
export async function getYcsxList(params?: { limit?: number }): Promise<YcsxItem[]> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const limit = params?.limit || 200;
  const url = `${BASE_API_FASTAPI}/api/v1/entities/ProductionRequest?limit=${limit}`;

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
      const records: ProductionRequestRecord[] = Array.isArray(json)
        ? json
        : Array.isArray(json?.items)
        ? json.items
        : Array.isArray(json?.data)
        ? json.data
        : [];

      return records.map((r, i) => mapProductionRequestToYcsxItem(r, i));
    }
  } catch (err) {
    console.warn("Lỗi khi gọi API danh sách ProductionRequest:", err);
  }

  return [];
}

/**
 * Cập nhật trạng thái YCSX
 * Endpoint: PUT /api/v1/entities/ProductionRequest/{id}
 */
export async function updateYcsxStatus(id: string, newStatus: string): Promise<boolean> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const url = `${BASE_API_FASTAPI}/api/v1/entities/ProductionRequest/${id}`;

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { api_key: apiKey } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ approval_status: newStatus }),
    });

    return res.ok;
  } catch (err) {
    console.warn("Lỗi khi cập nhật trạng thái YCSX:", err);
    return false;
  }
}

/**
 * Xóa một YCSX
 * Endpoint: DELETE /api/v1/entities/ProductionRequest/{id}
 */
export async function deleteYcsx(id: string): Promise<boolean> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const url = `${BASE_API_FASTAPI}/api/v1/entities/ProductionRequest/${id}`;

  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { api_key: apiKey } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    return res.ok;
  } catch (err) {
    console.warn("Lỗi khi xóa YCSX:", err);
    return false;
  }
}

export { createProductionRequest } from "./apiCreateProductionRequest";

