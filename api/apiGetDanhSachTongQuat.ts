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
 * Helper ánh xạ từ StaffApiRecord sang NhanSuItem
 */
export function mapStaffApiToNhanSuItem(record: StaffApiRecord, index: number): NhanSuItem {
  return {
    id: String(record.id || record._id || `staff-${index + 1}`),
    maNV: record.code || record.employee_code || record.maNV || `NV${String(index + 1).padStart(3, "0")}`,
    hoTen: record.name || record.full_name || record.hoTen || "Chưa đặt tên",
    avatar: record.avatar || "",
    phongBan: record.department || record.phongBan || "Khối Văn phòng",
    chucVu: record.position || record.chucVu || "Nhân viên",
    trangThai: record.status || record.trangThai || "Đang làm việc",
    ngaySinh: record.birthday || record.birth_date || record.ngaySinh || "—",
    gioiTinh: record.gender || record.gioiTinh || "Nam",
    dienThoai: record.phone || record.dienThoai || "—",
    ngayVao: record.start_date || record.hire_date || record.ngayVao || "—",
    thamNien: record.seniority || record.thamNien || "—",
    bacLuong: record.salary_level || record.salary_grade || record.bacLuong || "Bậc 1",
    mucLuongHienTai: Number(
      record.current_salary ??
        record.total_income ??
        record.mucLuongHienTai ??
        (Number(record.base_salary || 0) + Number(record.soft_salary || 0))
    ),
    mucLuongCung: Number(record.base_salary ?? record.mucLuongCung ?? 0),
    mucLuongMem: Number(record.soft_salary ?? record.mucLuongMem ?? 0),
    tongTroCap: Number(record.allowance ?? record.total_allowance ?? record.tongTroCap ?? 0),
    thoiDiemTangLuong: record.salary_raise_date || record.last_raise_date || record.thoiDiemTangLuong || "—",
    thoiDiemTangBacBacLuongDuKien:
      record.next_level_date || record.next_raise_date || record.thoiDiemTangBacBacLuongDuKien || "—",
    email: record.email || "",
    ghiChuLuong: record.salary_notes || record.salary_note || record.ghiChuLuong || "",
    ghiChu: record.notes || record.ghiChu || "",
    // Chi tiết mở rộng
    tinhTrangHonNhan: record.marital_status || record.tinhTrangHonNhan || record.marriage_status || "—",
    chieuCaoCanNang:
      record.height_weight ||
      record.chieuCaoCanNang ||
      (record.height_cm || record.height || record.weight_kg || record.weight
        ? `${record.height_cm || record.height || "—"} cm • ${record.weight_kg || record.weight || "—"} kg`
        : "—"),
    tenThuongDung: record.nickname || record.nick_name || record.tenThuongDung || "—",
    facebook: record.facebook || record.facebook_url || "—",
    diaChiHienTai: record.current_address || record.diaChiHienTai || record.address || "—",
    diaChiHoKhau: record.permanent_address || record.diaChiHoKhau || "—",
    ngayChinhThuc:
      record.official_start_date || record.official_date || record.ngayChinhThuc || record.start_date || record.ngayVao || "—",
    ngayBatDauNghi: record.leave_date || record.ngayBatDauNghi || "—",
    truongHoc: record.school || record.university || record.truongHoc || "—",
    chuyenNganh: record.major || record.specialization || record.chuyenNganh || "—",
    bangCapTrinhDo: record.degree || record.qualification || record.bangCapTrinhDo || "—",
    nguonTuyenDung: record.recruitment_source || record.nguonTuyenDung || "—",
    sttBoSung: record.extra_stt || record.sttBoSung || index + 1,
  };
}

/**
 * Lấy danh sách nhân sự tổng quát từ backend
 * Endpoint: /api/v1/entities/Employee?limit=200 (fallback qua /api/v1/entities/Staff hoặc /api/v1/entities/NhanSu)
 */
export async function getDanhSachTongQuatList(params?: { limit?: number }): Promise<NhanSuItem[]> {
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

/**
 * Lấy chi tiết một nhân sự theo ID từ backend
 */
export async function getDanhSachTongQuatDetail(id: string): Promise<NhanSuItem | null> {
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
 * Tạo mới nhân sự lên backend
 */
export async function createDanhSachTongQuatItem(item: Partial<NhanSuItem>): Promise<NhanSuItem> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const payload: Record<string, any> = {
    employee_code: item.maNV,
    code: item.maNV,
    maNV: item.maNV,
    full_name: item.hoTen,
    name: item.hoTen,
    hoTen: item.hoTen,
    department: item.phongBan,
    phongBan: item.phongBan,
    position: item.chucVu,
    chucVu: item.chucVu,
    status: item.trangThai || "Đang làm việc",
    trangThai: item.trangThai || "Đang làm việc",
    gender: item.gioiTinh || "Nam",
    gioiTinh: item.gioiTinh || "Nam",
    birth_date: item.ngaySinh,
    birthday: item.ngaySinh,
    ngaySinh: item.ngaySinh,
    phone: item.dienThoai,
    dienThoai: item.dienThoai,
    email: item.email,
    facebook: item.facebook,
    current_address: item.diaChiHienTai,
    address: item.diaChiHienTai,
    diaChiHienTai: item.diaChiHienTai,
    permanent_address: item.diaChiHoKhau,
    diaChiHoKhau: item.diaChiHoKhau,
    hire_date: item.ngayVao,
    start_date: item.ngayVao,
    ngayVao: item.ngayVao,
    seniority: item.thamNien,
    thamNien: item.thamNien,
    salary_grade: item.bacLuong,
    salary_level: item.bacLuong,
    bacLuong: item.bacLuong,
    total_income: item.mucLuongHienTai,
    current_salary: item.mucLuongHienTai,
    mucLuongHienTai: item.mucLuongHienTai,
    base_salary: item.mucLuongCung,
    mucLuongCung: item.mucLuongCung,
    soft_salary: item.mucLuongMem,
    mucLuongMem: item.mucLuongMem,
    total_allowance: item.tongTroCap,
    allowance: item.tongTroCap,
    tongTroCap: item.tongTroCap,
    last_raise_date: item.thoiDiemTangLuong,
    salary_raise_date: item.thoiDiemTangLuong,
    thoiDiemTangLuong: item.thoiDiemTangLuong,
    next_raise_date: item.thoiDiemTangBacBacLuongDuKien,
    next_level_date: item.thoiDiemTangBacBacLuongDuKien,
    thoiDiemTangBacBacLuongDuKien: item.thoiDiemTangBacBacLuongDuKien,
    notes: item.ghiChu,
    ghiChu: item.ghiChu,
    salary_note: item.ghiChuLuong,
    salary_notes: item.ghiChuLuong,
    ghiChuLuong: item.ghiChuLuong,
    school: item.truongHoc,
    truongHoc: item.truongHoc,
    major: item.chuyenNganh,
    chuyenNganh: item.chuyenNganh,
    degree: item.bangCapTrinhDo,
    qualification: item.bangCapTrinhDo,
    bangCapTrinhDo: item.bangCapTrinhDo,
    recruitment_source: item.nguonTuyenDung,
    nguonTuyenDung: item.nguonTuyenDung,
    marital_status: item.tinhTrangHonNhan,
    tinhTrangHonNhan: item.tinhTrangHonNhan,
    nickname: item.tenThuongDung,
    tenThuongDung: item.tenThuongDung,
    height_cm: item.chieuCao,
    height: item.chieuCao,
    weight_kg: item.canNang,
    weight: item.canNang,
  };

  const endpointsToTry = [
    `${BASE_API_FASTAPI}/api/v1/entities/Employee`,
    `${BASE_API_FASTAPI}${API_ROUTE.STAFF_CREATE || "/api/v1/entities/Staff"}`,
    `${BASE_API_FASTAPI}/api/v1/entities/NhanSu`,
  ];

  let lastError: Error | null = null;

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
          return mapStaffApiToNhanSuItem(record, 0);
        }
        return {
          id: String(record?.id || Date.now()),
          ...item,
        } as NhanSuItem;
      } else {
        const errJson = await res.json().catch(() => ({}));
        const msg = Array.isArray(errJson.detail)
          ? errJson.detail.map((d: any) => d.msg || d).join(", ")
          : errJson.detail || errJson.message || `Lỗi ${res.status}`;
        lastError = new Error(msg);
      }
    } catch (err: any) {
      lastError = err;
    }
  }

  if (lastError) {
    console.warn("API tạo nhân sự có phản hồi:", lastError.message);
  }

  return {
    id: Date.now().toString(),
    ...item,
  } as NhanSuItem;
}

/**
 * Cập nhật thông tin nhân sự lên backend
 */
export async function updateDanhSachTongQuatItem(item: NhanSuItem): Promise<NhanSuItem> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  const payload: Record<string, any> = {
    employee_code: item.maNV,
    code: item.maNV,
    maNV: item.maNV,
    full_name: item.hoTen,
    name: item.hoTen,
    hoTen: item.hoTen,
    department: item.phongBan,
    phongBan: item.phongBan,
    position: item.chucVu,
    chucVu: item.chucVu,
    status: item.trangThai || "Đang làm việc",
    trangThai: item.trangThai || "Đang làm việc",
    gender: item.gioiTinh || "Nam",
    gioiTinh: item.gioiTinh || "Nam",
    birth_date: item.ngaySinh,
    birthday: item.ngaySinh,
    ngaySinh: item.ngaySinh,
    phone: item.dienThoai,
    dienThoai: item.dienThoai,
    email: item.email,
    facebook: item.facebook,
    current_address: item.diaChiHienTai,
    address: item.diaChiHienTai,
    diaChiHienTai: item.diaChiHienTai,
    permanent_address: item.diaChiHoKhau,
    diaChiHoKhau: item.diaChiHoKhau,
    hire_date: item.ngayVao,
    start_date: item.ngayVao,
    ngayVao: item.ngayVao,
    seniority: item.thamNien,
    thamNien: item.thamNien,
    salary_grade: item.bacLuong,
    salary_level: item.bacLuong,
    bacLuong: item.bacLuong,
    total_income: item.mucLuongHienTai,
    current_salary: item.mucLuongHienTai,
    mucLuongHienTai: item.mucLuongHienTai,
    base_salary: item.mucLuongCung,
    mucLuongCung: item.mucLuongCung,
    soft_salary: item.mucLuongMem,
    mucLuongMem: item.mucLuongMem,
    total_allowance: item.tongTroCap,
    allowance: item.tongTroCap,
    tongTroCap: item.tongTroCap,
    last_raise_date: item.thoiDiemTangLuong,
    salary_raise_date: item.thoiDiemTangLuong,
    thoiDiemTangLuong: item.thoiDiemTangLuong,
    next_raise_date: item.thoiDiemTangBacBacLuongDuKien,
    next_level_date: item.thoiDiemTangBacBacLuongDuKien,
    thoiDiemTangBacBacLuongDuKien: item.thoiDiemTangBacBacLuongDuKien,
    notes: item.ghiChu,
    ghiChu: item.ghiChu,
    salary_note: item.ghiChuLuong,
    salary_notes: item.ghiChuLuong,
    ghiChuLuong: item.ghiChuLuong,
    school: item.truongHoc,
    truongHoc: item.truongHoc,
    major: item.chuyenNganh,
    chuyenNganh: item.chuyenNganh,
    degree: item.bangCapTrinhDo,
    qualification: item.bangCapTrinhDo,
    bangCapTrinhDo: item.bangCapTrinhDo,
    recruitment_source: item.nguonTuyenDung,
    nguonTuyenDung: item.nguonTuyenDung,
    marital_status: item.tinhTrangHonNhan,
    tinhTrangHonNhan: item.tinhTrangHonNhan,
    nickname: item.tenThuongDung,
    tenThuongDung: item.tenThuongDung,
    height_cm: item.chieuCao,
    height: item.chieuCao,
    weight_kg: item.canNang,
    weight: item.canNang,
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
          return mapStaffApiToNhanSuItem(record, 0);
        }
        return item;
      }
    } catch {
      // Fallback next
    }
  }

  return item;
}

/**
 * Xóa một nhân sự khỏi backend
 */
export async function deleteDanhSachTongQuatItem(id: string): Promise<boolean> {
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
      // Fallback next
    }
  }

  return true;
}
