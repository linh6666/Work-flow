import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter";
import { NhanSuItem } from "../components/Administration/tabs/QuanLyNhanSu/tabs/DanhSachNhanSu/tabs/DanhSachTongQuat";

export interface StaffApiRecord {
  id?: string;
  code?: string;
  maNV?: string;
  name?: string;
  full_name?: string;
  hoTen?: string;
  avatar?: string;
  department?: string;
  phongBan?: string;
  position?: string;
  chucVu?: string;
  status?: string;
  trangThai?: string;
  birthday?: string;
  ngaySinh?: string;
  gender?: string;
  gioiTinh?: string;
  phone?: string;
  dienThoai?: string;
  start_date?: string;
  ngayVao?: string;
  seniority?: string;
  thamNien?: string;
  salary_level?: string;
  bacLuong?: string;
  current_salary?: number;
  mucLuongHienTai?: number;
  base_salary?: number;
  mucLuongCung?: number;
  soft_salary?: number;
  mucLuongMem?: number;
  allowance?: number;
  tongTroCap?: number;
  salary_raise_date?: string;
  thoiDiemTangLuong?: string;
  next_level_date?: string;
  thoiDiemTangBacBacLuongDuKien?: string;
  email?: string;
  salary_notes?: string;
  ghiChuLuong?: string;
  notes?: string;
  ghiChu?: string;
  [key: string]: any;
}

/**
 * Helper to map an API record to standard NhanSuItem
 */
export function mapStaffApiToNhanSuItem(record: StaffApiRecord, index: number): NhanSuItem {
  return {
    id: String(record.id || record._id || `staff-${index + 1}`),
    maNV: record.code || record.maNV || `NV${String(index + 1).padStart(3, "0")}`,
    hoTen: record.name || record.full_name || record.hoTen || "Chưa đặt tên",
    avatar: record.avatar || "",
    phongBan: record.department || record.phongBan || "Khối Văn phòng",
    chucVu: record.position || record.chucVu || "Nhân viên",
    trangThai: record.status || record.trangThai || "Đang làm việc",
    ngaySinh: record.birthday || record.ngaySinh || "—",
    gioiTinh: record.gender || record.gioiTinh || "Nam",
    dienThoai: record.phone || record.dienThoai || "—",
    ngayVao: record.start_date || record.ngayVao || "—",
    thamNien: record.seniority || record.thamNien || "—",
    bacLuong: record.salary_level || record.bacLuong || "Bậc 1",
    mucLuongHienTai: Number(record.current_salary ?? record.mucLuongHienTai ?? (Number(record.base_salary || 0) + Number(record.soft_salary || 0))),
    mucLuongCung: Number(record.base_salary ?? record.mucLuongCung ?? 0),
    mucLuongMem: Number(record.soft_salary ?? record.mucLuongMem ?? 0),
    tongTroCap: Number(record.allowance ?? record.tongTroCap ?? 0),
    thoiDiemTangLuong: record.salary_raise_date || record.thoiDiemTangLuong || "—",
    thoiDiemTangBacBacLuongDuKien: record.next_level_date || record.thoiDiemTangBacBacLuongDuKien || "—",
    email: record.email || "",
    ghiChuLuong: record.salary_notes || record.ghiChuLuong || "",
    ghiChu: record.notes || record.ghiChu || "",
    // Chi tiết mở rộng
    tinhTrangHonNhan: record.marital_status || record.tinhTrangHonNhan || record.marriage_status || "—",
    chieuCaoCanNang: record.height_weight || record.chieuCaoCanNang || (record.height && record.weight ? `${record.height} cm • ${record.weight} kg` : "—"),
    tenThuongDung: record.nickname || record.nick_name || record.tenThuongDung || "—",
    facebook: record.facebook || record.facebook_url || "—",
    diaChiHienTai: record.current_address || record.diaChiHienTai || record.address || "—",
    diaChiHoKhau: record.permanent_address || record.diaChiHoKhau || "—",
    ngayChinhThuc: record.official_start_date || record.ngayChinhThuc || record.start_date || record.ngayVao || "—",
    ngayBatDauNghi: record.leave_date || record.ngayBatDauNghi || "—",
    truongHoc: record.school || record.university || record.truongHoc || "—",
    chuyenNganh: record.major || record.specialization || record.chuyenNganh || "—",
    bangCapTrinhDo: record.degree || record.qualification || record.bangCapTrinhDo || "—",
    nguonTuyenDung: record.recruitment_source || record.nguonTuyenDung || "—",
    sttBoSung: record.extra_stt || record.sttBoSung || index + 1,
  };
}

/**
 * Lấy chi tiết một nhân sự theo ID từ backend
 * Endpoint: /api/v1/entities/Staff/{id} (fallback /api/v1/entities/Employee/{id} hoặc /NhanSu/{id})
 */
export async function getStaffDetail(id: string): Promise<NhanSuItem | null> {
  if (!id) return null;
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const endpointsToTry = [
    `${BASE_API_FASTAPI}${API_ROUTE.STAFF_LIST || "/api/v1/entities/Staff"}/${id}`,
    `${BASE_API_FASTAPI}/api/v1/entities/Employee/${id}`,
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
        if (record && (record.id || record._id || record.name || record.full_name || record.code)) {
          return mapStaffApiToNhanSuItem(record, 0);
        }
      }
    } catch {
      // Continue to next endpoint
    }
  }

  return null;
}

/**
 * Lấy danh sách nhân sự từ backend
 * Endpoint: /api/v1/entities/Staff?limit=200
 * Thử fallback qua /api/v1/entities/Employee hoặc /api/v1/entities/NhanSu nếu Staff chưa tồn tại
 */
export async function getStaffList(params?: { limit?: number }): Promise<NhanSuItem[]> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const limit = params?.limit || 200;

  const endpointsToTry = [
    `${BASE_API_FASTAPI}${API_ROUTE.STAFF_LIST || "/api/v1/entities/Staff"}?limit=${limit}`,
    `${BASE_API_FASTAPI}/api/v1/entities/Employee?limit=${limit}`,
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
        const records: StaffApiRecord[] = Array.isArray(json)
          ? json
          : Array.isArray(json?.items)
          ? json.items
          : Array.isArray(json?.data)
          ? json.data
          : [];

        if (records.length > 0) {
          return records.map((r, i) => mapStaffApiToNhanSuItem(r, i));
        }
      }
    } catch {
      // Continue to next fallback endpoint
    }
  }

  return [];
}
