"use client";

import React, { useState } from 'react';
import {
  IconClipboardList,
  IconFileText,
  IconCalendarTime,
  IconAdjustmentsCheck,
  IconClipboardCheck,
} from '@tabler/icons-react';

import KeHoachNhanSuTheoNam from './tabs/KeHoachNhanSuTheoNam';
import DsHoSoTuyenDung from './tabs/DsHoSoTuyenDung';
import DsPhongVan from './tabs/DsPhongVan';
import KhungDanhGiaNangLuc from './tabs/KhungDanhGiaNangLuc';
import PheDuyetKqTuyenDung from './tabs/PheDuyetKqTuyenDung';

type TuyenDungSubTab =
  | 'ke-hoach-nhan-su'
  | 'ds-ho-so'
  | 'ds-phong-van'
  | 'khung-danh-gia'
  | 'phe-duyet-kq';

interface SubTabItem {
  id: TuyenDungSubTab;
  label: string;
  icon: React.ReactNode;
}

const SUB_TABS: SubTabItem[] = [
  {
    id: 'ke-hoach-nhan-su',
    label: 'Kế hoạch Nhân sự theo năm',
    icon: <IconClipboardList size={14} />,
  },
  {
    id: 'ds-ho-so',
    label: 'DS Hồ sơ tuyển dụng',
    icon: <IconFileText size={14} />,
  },
  {
    id: 'ds-phong-van',
    label: 'DS Phỏng vấn',
    icon: <IconCalendarTime size={14} />,
  },
  {
    id: 'khung-danh-gia',
    label: 'Khung đánh giá năng lực',
    icon: <IconAdjustmentsCheck size={14} />,
  },
  {
    id: 'phe-duyet-kq',
    label: 'Phê duyệt KQ tuyển dụng',
    icon: <IconClipboardCheck size={14} />,
  },
];

export default function TuyenDungTab() {
  const [activeSubTab, setActiveSubTab] = useState<TuyenDungSubTab>('ke-hoach-nhan-su');

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white select-none">
      {/* ── Sub-tab Navigation (Same UI style as Parent Tabs) ── */}
      <div className="px-5 pt-2 border-b border-slate-100 shrink-0 bg-white">
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {SUB_TABS.map((tab) => {
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSubTab(tab.id)}
                style={
                  isActive
                    ? {
                        color: '#406c89',
                        borderBottomColor: '#406c89',
                        backgroundColor: '#eef4f7',
                      }
                    : {}
                }
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg text-[11.5px] font-semibold transition-all cursor-pointer border-b-2 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'border-b-2'
                    : 'text-slate-600 bg-slate-50 border-transparent hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <span className={isActive ? 'text-[#406c89]' : 'text-slate-500'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Sub-tab Body Content ── */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden bg-white">
        {activeSubTab === 'ke-hoach-nhan-su' && <KeHoachNhanSuTheoNam />}
        {activeSubTab === 'ds-ho-so' && <DsHoSoTuyenDung />}
        {activeSubTab === 'ds-phong-van' && <DsPhongVan />}
        {activeSubTab === 'khung-danh-gia' && <KhungDanhGiaNangLuc />}
        {activeSubTab === 'phe-duyet-kq' && <PheDuyetKqTuyenDung />}
      </div>
    </div>
  );
}
