/**
 * Kiểu dữ liệu thực thể QuoteRequest (Yêu cầu báo giá)
 */
export interface QuoteRequestRecord {
  id: string;
  request_number?: string;
  project_name?: string;
  customer_name?: string;
  customer_id?: string;
  contact_person?: string;
  contact_phone?: string;
  contact_company?: string;
  model_scale?: string;
  model_size?: string;
  model_needing_time?: string;
  install_location?: string;
  leg_type?: string;
  glass_type?: string;
  approval_status?: string;
  drawing_status?: string;
  notes?: string;
  quoting_content?: string;
  date?: string;
  submitter_name?: string;
  submitter_id?: string;
  created_date?: string;
  updated_date?: string;
  [key: string]: any;
}

export const getQuoteRequestHeaders = () => {
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
