export type RoleType = 'Superadmin' | 'Admin' | 'Quản lý Kinh doanh' | 'Nhân viên';
export type StatusType = 'Hoạt động' | 'Tạm dừng';

export interface UserItem {
  id: string;
  fullName: string;
  email: string;
  username: string;
  role: RoleType;
  status: StatusType;
  createdDate: string;
}
