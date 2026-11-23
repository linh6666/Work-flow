import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter";
import { HoSoPhapLyItem } from "../components/Administration/tabs/QuanLyNhanSu/tabs/DanhSachNhanSu/tabs/HoSoPhapLy";
import { NhanSuItem } from "../components/Administration/tabs/QuanLyNhanSu/tabs/DanhSachNhanSu/tabs/DanhSachTongQuat";
import { mapStaffApiToNhanSuItem } from "./apiGetStaffList";

/**
 * Interface cho dữ liệu nhân sự thô từ Backend
 */
export interface EmployeeApiRecord {
  id?: string;
  employee_code?: string;
  code?: string;
  maNV?: string;
  full_name?: string;
  name?: string;
  hoTen?: string;
  department?: string;
  phongBan?: string;
  position?: string;
  chucVu?: string;
  id_number?: string;
  soCCCD?: string;
  cccd?: string;
  id_issue_date?: string;
  ngayCapCCCD?: string;
  id_issue_place?: string;
  noiCapCCCD?: string;
  tax_code?: string;
  mstCaNhan?: string;
  social_insurance_no?: string;
  soBHXH?: string;
  notes?: string;
  ghiChu?: string;
  [key: string]: any;
}

/**
 * Helper ánh xạ từ EmployeeApiRecord sang HoSoPhapLyItem
 */
export function mapEmployeeToHoSoPhapLy(record: EmployeeApiRecord, index: number): HoSoPhapLyItem {
  const cccd = (record.id_number || record.soCCCD || record.cccd || "").trim();
  const bhxh = (record.social_insurance_no || record.soBHXH || "").trim();
  const mst = (record.tax_code || record.mstCaNhan || "").trim();
  const ngayCap = (record.id_issue_date || record.ngayCapCCCD || "").trim();
  const noiCap = (record.id_issue_place || record.noiCapCCCD || "").trim();

  // Tự động phân loại trạng thái hồ sơ dựa vào các giấy tờ cơ bản
  let tinhTrang: HoSoPhapLyItem["tinhTrangHoSo"] = "Đầy đủ";
  if (!cccd && !bhxh && !mst) {
    tinhTrang = "Chưa nộp";
  } else if (!cccd) {
    tinhTrang = "Thiếu CCCD";
  } else if (!bhxh) {
    tinhTrang = "Thiếu BHXH";
  } else if (!mst) {
    tinhTrang = "Thiếu MST";
  }

  const rawItem: NhanSuItem = mapStaffApiToNhanSuItem(record, index);

  return {
    id: String(record.id || `hspl-${index + 1}`),
    maNV: record.employee_code || record.code || record.maNV || `NV${String(index + 1).padStart(3, "0")}`,
    hoTen: record.full_name || record.name || record.hoTen || "—",
    phongBan: record.department || record.phongBan || "—",
    chucVu: record.position || record.chucVu || "—",
    soCCCD: cccd || "—",
    ngayCapCCCD: ngayCap || "—",
    noiCapCCCD: noiCap || "—",
    mstCaNhan: mst || "—",
    soBHXH: bhxh || "—",
    nganHang: record.bank_name || record.nganHang || "—",
    soTaiKhoan: record.bank_account || record.soTaiKhoan || "—",
    tinhTrangHoSo: tinhTrang,
    ghiChu: record.notes || record.ghiChu || "",
    rawItem,
  };
}

/**
 * Lấy danh sách Hồ sơ Pháp lý từ Backend
 */
export async function getHoSoPhapLyList(params?: { limit?: number }): Promise<HoSoPhapLyItem[]> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const limit = params?.limit || 200;

  const endpointsToTry = [
    `${BASE_API_FASTAPI}/api/v1/entities/Employee?limit=${limit}`,
    `${BASE_API_FASTAPI}${API_ROUTE.STAFF_LIST || "/api/v1/entities/Staff"}?limit=${limit}`,
    `${BASE_API_FASTAPI}/api/v1/entities/NhanSu?limit=${limit}`,
  ];

  for (const url of endpointsToTry) {
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
        const records: EmployeeApiRecord[] = Array.isArray(json)
          ? json
          : Array.isArray(json?.items)
          ? json.items
          : Array.isArray(json?.data)
          ? json.data
          : [];

        if (records.length > 0) {
          return records.map((record, index) => mapEmployeeToHoSoPhapLy(record, index));
        }
      }
    } catch (err) {
      console.warn(`Lỗi khi gọi endpoint ${url}:`, err);
    }
  }

  return [];
}

/**
 * Lấy chi tiết hồ sơ pháp lý theo ID
 */
export async function getHoSoPhapLyDetail(id: string): Promise<HoSoPhapLyItem | null> {
  if (!id) return null;
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const endpointsToTry = [
    `${BASE_API_FASTAPI}/api/v1/entities/Employee/${id}`,
    `${BASE_API_FASTAPI}${API_ROUTE.STAFF_LIST || "/api/v1/entities/Staff"}/${id}`,
    `${BASE_API_FASTAPI}/api/v1/entities/NhanSu/${id}`,
  ];

  for (const url of endpointsToTry) {
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
        const record = json?.data || json?.item || json;
        if (record && (record.id || record._id || record.name || record.full_name || record.employee_code || record.code)) {
          return mapEmployeeToHoSoPhapLy(record, 0);
        }
      }
    } catch {
      // Continue next
    }
  }

  return null;
}

/**
 * Thêm mới hồ sơ pháp lý (Tạo nhân sự kèm thông tin giấy tờ)
 */
export async function createHoSoPhapLy(item: Partial<HoSoPhapLyItem>): Promise<HoSoPhapLyItem> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const payload: Record<string, any> = {
    employee_code: item.maNV,
    code: item.maNV,
    full_name: item.hoTen,
    name: item.hoTen,
    department: item.phongBan,
    position: item.chucVu,
    id_number: item.soCCCD,
    id_issue_date: item.ngayCapCCCD,
    id_issue_place: item.noiCapCCCD,
    tax_code: item.mstCaNhan,
    social_insurance_no: item.soBHXH,
    bank_name: item.nganHang,
    bank_account: item.soTaiKhoan,
    notes: item.ghiChu,
    status: "Đang làm việc",
  };

  const endpointsToTry = [
    `${BASE_API_FASTAPI}/api/v1/entities/Employee`,
    `${BASE_API_FASTAPI}${API_ROUTE.STAFF_CREATE || "/api/v1/entities/Staff"}`,
    `${BASE_API_FASTAPI}/api/v1/entities/NhanSu`,
  ];

  for (const url of endpointsToTry) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { api_key: apiKey } : {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const json = await res.json();
        const record = json?.data || json?.item || json;
        if (record && (record.id || record._id)) {
          return mapEmployeeToHoSoPhapLy(record, 0);
        }
        return {
          id: String(record?.id || Date.now()),
          ...item,
        } as HoSoPhapLyItem;
      }
    } catch (err) {
      console.warn(`Lỗi khi tạo hồ sơ ${url}:`, err);
    }
  }

  return {
    id: Date.now().toString(),
    ...item,
  } as HoSoPhapLyItem;
}

/**
 * Cập nhật thông tin hồ sơ pháp lý (CCCD, Ngày cấp, Nơi cấp, BHXH, MST...)
 */
export async function updateHoSoPhapLy(item: HoSoPhapLyItem): Promise<HoSoPhapLyItem> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const payload: Record<string, any> = {
    employee_code: item.maNV,
    full_name: item.hoTen,
    department: item.phongBan,
    position: item.chucVu,
    id_number: item.soCCCD,
    id_issue_date: item.ngayCapCCCD,
    id_issue_place: item.noiCapCCCD,
    tax_code: item.mstCaNhan,
    social_insurance_no: item.soBHXH,
    bank_name: item.nganHang,
    bank_account: item.soTaiKhoan,
    notes: item.ghiChu,
  };

  const endpointsToTry = [
    `${BASE_API_FASTAPI}/api/v1/entities/Employee/${item.id}`,
    `${BASE_API_FASTAPI}${API_ROUTE.STAFF_UPDATE?.replace("{Staff_id}", item.id) || `/api/v1/entities/Staff/${item.id}`}`,
    `${BASE_API_FASTAPI}/api/v1/entities/NhanSu/${item.id}`,
  ];

  for (const url of endpointsToTry) {
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { api_key: apiKey } : {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const json = await res.json();
        const record = json?.data || json?.item || json;
        if (record && (record.id || record._id)) {
          return mapEmployeeToHoSoPhapLy(record, 0);
        }
        return item;
      }
    } catch (err) {
      console.warn(`Lỗi khi cập nhật hồ sơ ${url}:`, err);
    }
  }

  return item;
}

/**
 * Xóa hồ sơ pháp lý
 */
export async function deleteHoSoPhapLy(id: string): Promise<boolean> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const endpointsToTry = [
    `${BASE_API_FASTAPI}/api/v1/entities/Employee/${id}`,
    `${BASE_API_FASTAPI}${API_ROUTE.STAFF_DELETE?.replace("{Staff_id}", id) || `/api/v1/entities/Staff/${id}`}`,
    `${BASE_API_FASTAPI}/api/v1/entities/NhanSu/${id}`,
  ];

  for (const url of endpointsToTry) {
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { api_key: apiKey } : {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (res.ok) {
        return true;
      }
    } catch {
      // Continue next
    }
  }

  return true;
}
