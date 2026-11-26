/**
 * Kiểu dữ liệu thực thể Task (Công việc dự án)
 */
export interface TaskRecord {
  id: string;
  project_id?: string;
  task_id_ext?: string;
  name?: string;
  status?: string;
  progress?: number | string;
  scheduled_work?: number | string;
  actual_work?: number | string;
  baseline_work?: number | string;
  quantity_planned?: number | string;
  quantity_done?: number | string;
  quantity_unit?: string;
  start_date?: string;
  end_date?: string;
  baseline_start?: string | null;
  baseline_end?: string | null;
  level?: number | string;
  sort_order?: number | string;
  notes?: string | null;
  department?: string;
  assignee_name?: string;
  created_date?: string;
  updated_date?: string;
  [key: string]: any;
}

export const getTaskHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const apiKey =
    (typeof window !== "undefined" ? localStorage.getItem("api_key") : null) ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "";

  return {
    "Content-Type": "application/json",
    ...(apiKey ? { api_key: apiKey } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};
