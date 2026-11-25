/**
 * Kiểu dữ liệu thực thể QuotationTemplate (Mẫu báo giá)
 */
export interface QuotationTemplateRecord {
  id: string;
  template_name?: string;
  name?: string;
  quote_type?: string;
  quote_language?: string; // 'vi' | 'en' | 'vi-en'
  scale?: string;
  size?: string;
  project_name?: string;
  vat_percent?: number | string;
  production_days?: number | string;
  warranty_months?: number | string;
  valid_days?: number | string;
  is_system?: boolean;
  items_json?: string;
  notes?: string;
  payment_terms?: string;
  display_flags_json?: string;
  created_by_name?: string;
  created_date?: string;
  updated_date?: string;
  [key: string]: any;
}

export const getQuotationTemplateHeaders = () => {
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
