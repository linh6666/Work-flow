export interface ProjectItem {
  id: string;
  name: string;
  subName: string;
  priority: number | null;
  status: 'Đang thực hiện' | 'Đã hoàn thành' | 'Tạm dừng';
  evaluation: 'Đúng tiến độ' | 'Vượt tiến độ' | 'Chưa đánh giá' | 'Chậm tiến độ';
  progressPct: number;
  completedTasks: string; // e.g. "87/158"
  actualHours: string; // e.g. "197.0/380h"
  weekReport: string | null; // e.g. "Tuần 32/2028"
  latestRemark?: string;
}
