export type StatusType = 'Hoạt động' | 'Tạm dừng';

export interface UserItem {
  id: string;
  fullName: string;
  email: string;
  username: string;
  roles: string[];
  status: StatusType;
  createdDate: string;
  isCurrentUser?: boolean;
}
