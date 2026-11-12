export interface WeeklyRemarkItem {
  id: string;
  week: string; // e.g. "Tuần 45/2026"
  dateRange: string; // e.g. "30/10/2026 — 06/11/2026"
  evaluation: 'Đúng tiến độ' | 'Vượt tiến độ' | 'Chưa đánh giá' | 'Chậm tiến độ';
  author: string; // e.g. "Trần Diễm My"
  date: string; // e.g. "06/11/2026"
  content: string;
}

export interface YcsxDeptItem {
  id: string;
  name: string;
  conCv: number;
  tongCv: number;
  daXong?: number;
  gioThKh?: string;
  trangThai?: 'Hoàn thành' | 'Đang thực hiện' | 'Chậm tiến độ' | 'Chờ triển khai';
}

export interface YcsxProgressData {
  title?: string;
  conCv: number;
  tongCv: number;
  soNgay: number;
  hanNgay: string;
  maYcsx: string;
  ghiChu?: string;
  departments: YcsxDeptItem[];
}

export interface ProjectItem {
  id: string;
  name: string;
  subName: string;
  customer?: string;
  priority: number | null;
  status: 'Đang thực hiện' | 'Hoàn thành' | 'Đã hoàn thành' | 'Tạm dừng';
  evaluation: 'Đúng tiến độ' | 'Vượt tiến độ' | 'Chưa đánh giá' | 'Chậm tiến độ';
  progressPct: number;
  completedTasks: string; // e.g. "87/158"
  actualHours: string; // e.g. "197.0/380h"
  weekReport: string | null; // e.g. "Tuần 32/2028"
  latestRemark?: string;
  tienDoYcsx?: 'Chậm tiến độ' | 'Còn công việc' | 'Đạt 100%' | 'Chưa đủ dữ liệu';
  tienDoYcsxText?: string;
  weeklyRemarks?: WeeklyRemarkItem[];
  ycsxData?: YcsxProgressData;
}
