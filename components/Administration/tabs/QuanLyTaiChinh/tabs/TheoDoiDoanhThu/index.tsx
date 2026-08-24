"use client";

import React, { useState } from 'react';
import { IconFileText, IconUsers } from '@tabler/icons-react';
import DanhSachHopDongTab from './tabs/DanhSachHopDong';
import DoanhThuKhachHangTab from './tabs/DoanhThuKhachHang';

export default function TheoDoiDoanhThuTab() {
  const [subTab, setSubTab] = useState<'hop-dong' | 'khach-hang'>('hop-dong');

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden space-y-3">
      {/* Sub-tab Navigation Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-1 shadow-xs shrink-0">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSubTab('hop-dong')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              subTab === 'hop-dong'
                ? 'bg-[#ebf4f8] text-[#406c89] shadow-2xs'
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <IconFileText size={14} className={subTab === 'hop-dong' ? 'text-[#406c89]' : 'text-slate-400'} />
            <span>Danh sách Hợp đồng & Doanh thu</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('khach-hang')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              subTab === 'khach-hang'
                ? 'bg-[#ebf4f8] text-[#406c89] shadow-2xs'
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <IconUsers size={14} className={subTab === 'khach-hang' ? 'text-[#406c89]' : 'text-slate-400'} />
            <span>Doanh thu đã thu theo Khách hàng</span>
          </button>
        </div>
      </div>

      {/* Sub-tab Content Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {subTab === 'hop-dong' ? <DanhSachHopDongTab /> : <DoanhThuKhachHangTab />}
      </div>
    </div>
  );
}


