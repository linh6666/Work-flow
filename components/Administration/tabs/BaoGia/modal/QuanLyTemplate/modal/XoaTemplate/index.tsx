"use client";

import React, { useState } from "react";
import { IconAlertTriangle, IconTrash, IconX, IconLoader2 } from "@tabler/icons-react";
import { QuotationTemplateRecord } from "@/api/types/quotationTemplate";
import { deleteQuotationTemplate } from "@/api/apiDeleteQuotationTemplate";
import { NotificationExtension } from "@/common/extension/NotificationExtension";

interface XoaTemplateModalProps {
  isOpen: boolean;
  template: QuotationTemplateRecord | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function XoaTemplateModal({
  isOpen,
  template,
  onClose,
  onSuccess,
}: XoaTemplateModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !template) return null;

  const templateName = template.template_name || template.name || "Template này";

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteQuotationTemplate(template.id);
      NotificationExtension.Success(`Đã xóa template "${templateName}" thành công!`);
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Lỗi khi xóa template:", err);
      NotificationExtension.Fails("Xóa template thất bại, vui lòng thử lại!");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-rose-50/60">
          <div className="flex items-center gap-2.5 text-rose-600">
            <div className="p-1.5 bg-rose-100 rounded-lg">
              <IconAlertTriangle size={18} />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Xác nhận xóa Template</h3>
          </div>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-lg transition-colors"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <p className="text-xs text-slate-600 leading-relaxed">
            Bạn có chắc chắn muốn xóa template báo giá{" "}
            <span className="font-bold text-slate-900">"{templateName}"</span> không?
          </p>
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 text-[11px] text-slate-500">
            ⚠️ Thao tác này sẽ xóa vĩnh viễn template khỏi hệ thống và không thể hoàn tác. Các báo giá đã lập trước đó từ mẫu này sẽ không bị ảnh hưởng.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-end gap-2.5 bg-slate-50/50">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
            className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-all cursor-pointer shadow-xs disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <IconLoader2 size={15} className="animate-spin" />
                <span>Đang xóa...</span>
              </>
            ) : (
              <>
                <IconTrash size={15} />
                <span>Xóa vĩnh viễn</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
