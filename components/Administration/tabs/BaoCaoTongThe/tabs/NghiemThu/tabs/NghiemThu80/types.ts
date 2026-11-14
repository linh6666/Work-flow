export interface ReportItem {
  id: string;
  department: string;
  date: string;
  reporter: string;
  quantity: string | number;
  hours: string;
  progressPct: string;
  status: 'BGĐ đã duyệt' | 'Chờ phê duyệt' | 'Trả lại điều chỉnh';
  approvedBy: string;
  photoCount?: number;
}

export interface ProjectReportGroup {
  id: string;
  name: string;
  reportCount: number;
  totalHours: string;
  hasReturned?: boolean;
  reports: ReportItem[];
}
