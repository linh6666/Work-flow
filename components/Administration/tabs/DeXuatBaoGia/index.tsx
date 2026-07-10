import React from 'react';
import { IconLayoutGrid } from '@tabler/icons-react';

export default function DeXuatBaoGia() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 text-center bg-slate-50 h-full">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-400 shadow-sm border border-slate-200/50">
        <IconLayoutGrid size={28} />
      </div>
      <h3 className="font-bold text-slate-700 text-sm">Phân hệ Đề xuất Báo giá</h3>
      <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
        Giao diện cho phân hệ **Đề xuất Báo giá** đang được phát triển ở file riêng biệt.
      </p>
    </div>
  );
}
