"use client";

import React, { useState } from 'react';
import {
  IconSearch,
  IconChartBar,
  IconPlus,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';
import SuaAoDongPhucModal, { type AoDongPhucRecord } from './modals/SuaAoDongPhucModal';
import TaoMoiAoDongPhucModal from './modals/TaoMoiAoDongPhucModal';
import BaoCaoTongHopView from './views/BaoCaoTongHop';

/* ─── Mock data ─────────────────────────────────────────────── */
const YEARS = ['Tất cả năm', '2026', '2025', '2024', '2023', '2022'];

const mockAoDongPhuc = [
  // ── NĂM 2026 ──────────────────────────────────────────────────────────────
  { ma: '',          nam: 2026, ten_san_pham: 'ÁO YẾM',                            size: '',    nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 100, xuat_trong_ky: 28, ton_cuoi_ky: 72,  tong_con: 72  },
  { ma: '',          nam: 2026, ten_san_pham: 'ÁO NAM XÁM',                        size: 'L',   nhap_ban_dau: 20,  ton_dau_ky: 14,  nhap_trong_ky: 0,   xuat_trong_ky: 7,  ton_cuoi_ky: 7,   tong_con: 0   },
  { ma: '',          nam: 2026, ten_san_pham: 'ÁO NAM XÁM',                        size: 'M',   nhap_ban_dau: 96,  ton_dau_ky: 26,  nhap_trong_ky: 0,   xuat_trong_ky: 23, ton_cuoi_ky: 3,   tong_con: 13  },
  { ma: '',          nam: 2026, ten_san_pham: 'ÁO NỮ ĐEN',                         size: 'S',   nhap_ban_dau: 40,  ton_dau_ky: 30,  nhap_trong_ky: 0,   xuat_trong_ky: 16, ton_cuoi_ky: 14,  tong_con: 0   },
  { ma: '',          nam: 2026, ten_san_pham: 'ÁO NỮ ĐEN',                         size: 'XS',  nhap_ban_dau: 34,  ton_dau_ky: 2,   nhap_trong_ky: 0,   xuat_trong_ky: 2,  ton_cuoi_ky: 0,   tong_con: 17  },
  { ma: '',          nam: 2026, ten_san_pham: 'ÁO NAM ĐEN',                        size: 'M',   nhap_ban_dau: 3,   ton_dau_ky: 3,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 3,   tong_con: 0   },
  { ma: '',          nam: 2026, ten_san_pham: 'ÁO NỮ ĐEN',                         size: 'M',   nhap_ban_dau: 15,  ton_dau_ky: 6,   nhap_trong_ky: 0,   xuat_trong_ky: 3,  ton_cuoi_ky: 3,   tong_con: 0   },
  { ma: 'BHLD-5',   nam: 2026, ten_san_pham: 'BỘ BẢO HỘ LAO ĐỘNG (màu ghi chì)', size: '5',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'BHLD-6',   nam: 2026, ten_san_pham: 'BỘ BẢO HỘ LAO ĐỘNG (màu ghi chì)', size: '6',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'BHLD-7',   nam: 2026, ten_san_pham: 'BỘ BẢO HỘ LAO ĐỘNG (màu ghi chì)', size: '7',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 2,   xuat_trong_ky: 2,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'BHLD-GIAY',nam: 2026, ten_san_pham: 'GIÀY LÓT SẮT',                      size: '40',  nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 1,   xuat_trong_ky: 1,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'NTM-3XL',  nam: 2026, ten_san_pham: 'ÁO NAM (xanh công)',                size: '3XL', nhap_ban_dau: 4,   ton_dau_ky: 0,   nhap_trong_ky: 12,  xuat_trong_ky: 4,  ton_cuoi_ky: 8,   tong_con: 0   },
  { ma: 'NTM-4XL',  nam: 2026, ten_san_pham: 'ÁO NAM (xanh công)',                size: '4XL', nhap_ban_dau: 4,   ton_dau_ky: 0,   nhap_trong_ky: 10,  xuat_trong_ky: 2,  ton_cuoi_ky: 8,   tong_con: 0   },
  { ma: 'NTM-L',    nam: 2026, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'L',   nhap_ban_dau: 62,  ton_dau_ky: 28,  nhap_trong_ky: 18,  xuat_trong_ky: 2,  ton_cuoi_ky: 44,  tong_con: 0   },
  { ma: 'NTM-M',    nam: 2026, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'M',   nhap_ban_dau: 22,  ton_dau_ky: 11,  nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 11,  tong_con: 0   },
  { ma: 'NTM-XL',   nam: 2026, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'XL',  nhap_ban_dau: 27,  ton_dau_ky: 0,   nhap_trong_ky: 35,  xuat_trong_ky: 4,  ton_cuoi_ky: 31,  tong_con: 0   },
  { ma: 'NTM-XXL',  nam: 2026, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'XXL', nhap_ban_dau: 12,  ton_dau_ky: 0,   nhap_trong_ky: 45,  xuat_trong_ky: 3,  ton_cuoi_ky: 42,  tong_con: 144 },
  { ma: 'NTN-L',    nam: 2026, ten_san_pham: 'ÁO NỮ (xanh công)',                 size: 'L',   nhap_ban_dau: 18,  ton_dau_ky: 3,   nhap_trong_ky: 40,  xuat_trong_ky: 2,  ton_cuoi_ky: 41,  tong_con: 0   },
  { ma: 'NTN-M',    nam: 2026, ten_san_pham: 'ÁO NỮ (xanh công)',                 size: 'M',   nhap_ban_dau: 45,  ton_dau_ky: 12,  nhap_trong_ky: 30,  xuat_trong_ky: 2,  ton_cuoi_ky: 40,  tong_con: 0   },
  { ma: 'NTN-XL',   nam: 2026, ten_san_pham: 'ÁO NỮ (xanh công)',                 size: 'XL',  nhap_ban_dau: 6,   ton_dau_ky: 4,   nhap_trong_ky: 10,  xuat_trong_ky: 4,  ton_cuoi_ky: 10,  tong_con: 91  },

  // ── NĂM 2025 ──────────────────────────────────────────────────────────────
  { ma: '',          nam: 2025, ten_san_pham: 'ÁO NỮ ĐEN',                         size: 'M',   nhap_ban_dau: 0,   ton_dau_ky: 15,  nhap_trong_ky: 0,   xuat_trong_ky: 9,  ton_cuoi_ky: 6,   tong_con: 0   },
  { ma: '',          nam: 2025, ten_san_pham: 'ÁO NAM XÁM',                        size: 'L',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 20,  xuat_trong_ky: 13, ton_cuoi_ky: 7,   tong_con: 0   },
  { ma: '',          nam: 2025, ten_san_pham: 'ÁO NỮ ĐEN',                         size: 'XS',  nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 34,  xuat_trong_ky: 32, ton_cuoi_ky: 2,   tong_con: 38  },
  { ma: '',          nam: 2025, ten_san_pham: 'ÁO NỮ ĐEN',                         size: 'S',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 40,  xuat_trong_ky: 10, ton_cuoi_ky: 30,  tong_con: 0   },
  { ma: '',          nam: 2025, ten_san_pham: 'ÁO NAM ĐEN',                        size: 'M',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 3,   xuat_trong_ky: 0,  ton_cuoi_ky: 3,   tong_con: 0   },
  { ma: '',          nam: 2025, ten_san_pham: 'ÁO YẾM',                            size: '',    nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: '',          nam: 2025, ten_san_pham: 'ÁO NAM XÁM',                        size: 'M',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 96,  xuat_trong_ky: 70, ton_cuoi_ky: 26,  tong_con: 36  },
  { ma: 'BHLD-5',   nam: 2025, ten_san_pham: 'BỘ BẢO HỘ LAO ĐỘNG (màu ghi chì)', size: '5',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'BHLD-6',   nam: 2025, ten_san_pham: 'BỘ BẢO HỘ LAO ĐỘNG (màu ghi chì)', size: '6',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'BHLD-7',   nam: 2025, ten_san_pham: 'BỘ BẢO HỘ LAO ĐỘNG (màu ghi chì)', size: '7',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'BHLD-GIAY',nam: 2025, ten_san_pham: 'GIÀY LÓT SẮT',                      size: '40',  nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'NTM-3XL',  nam: 2025, ten_san_pham: 'ÁO NAM (xanh công)',                size: '3XL', nhap_ban_dau: 4,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'NTM-4XL',  nam: 2025, ten_san_pham: 'ÁO NAM (xanh công)',                size: '4XL', nhap_ban_dau: 4,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 39  },
  { ma: 'NTM-L',    nam: 2025, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'L',   nhap_ban_dau: 62,  ton_dau_ky: 38,  nhap_trong_ky: 0,   xuat_trong_ky: 10, ton_cuoi_ky: 28,  tong_con: 0   },
  { ma: 'NTM-M',    nam: 2025, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'M',   nhap_ban_dau: 22,  ton_dau_ky: 11,  nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 11,  tong_con: 0   },
  { ma: 'NTM-XL',   nam: 2025, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'XL',  nhap_ban_dau: 27,  ton_dau_ky: 8,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 8,   tong_con: 0   },
  { ma: 'NTM-XXL',  nam: 2025, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'XXL', nhap_ban_dau: 12,  ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'NTN-L',    nam: 2025, ten_san_pham: 'ÁO NỮ (xanh công)',                 size: 'L',   nhap_ban_dau: 18,  ton_dau_ky: 7,   nhap_trong_ky: 0,   xuat_trong_ky: 4,  ton_cuoi_ky: 3,   tong_con: 0   },
  { ma: 'NTN-M',    nam: 2025, ten_san_pham: 'ÁO NỮ (xanh công)',                 size: 'M',   nhap_ban_dau: 45,  ton_dau_ky: 18,  nhap_trong_ky: 0,   xuat_trong_ky: 6,  ton_cuoi_ky: 12,  tong_con: 0   },
  { ma: 'NTN-XL',   nam: 2025, ten_san_pham: 'ÁO NỮ (xanh công)',                 size: 'XL',  nhap_ban_dau: 6,   ton_dau_ky: 6,   nhap_trong_ky: 0,   xuat_trong_ky: 2,  ton_cuoi_ky: 4,   tong_con: 19  },

  // ── NĂM 2024 ──────────────────────────────────────────────────────────────
  { ma: '',          nam: 2024, ten_san_pham: 'ÁO YẾM',                            size: '',    nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'BHLD-5',   nam: 2024, ten_san_pham: 'BỘ BẢO HỘ LAO ĐỘNG (màu ghi chì)', size: '5',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'BHLD-6',   nam: 2024, ten_san_pham: 'BỘ BẢO HỘ LAO ĐỘNG (màu ghi chì)', size: '6',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'BHLD-7',   nam: 2024, ten_san_pham: 'BỘ BẢO HỘ LAO ĐỘNG (màu ghi chì)', size: '7',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 4,   xuat_trong_ky: 4,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'BHLD-GIAY',nam: 2024, ten_san_pham: 'GIÀY LÓT SẮT',                      size: '40',  nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 2,   xuat_trong_ky: 2,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'NTM-3XL',  nam: 2024, ten_san_pham: 'ÁO NAM (xanh công)',                size: '3XL', nhap_ban_dau: 4,   ton_dau_ky: 3,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'NTM-4XL',  nam: 2024, ten_san_pham: 'ÁO NAM (xanh công)',                size: '4XL', nhap_ban_dau: 4,   ton_dau_ky: 2,   nhap_trong_ky: 0,   xuat_trong_ky: 2,  ton_cuoi_ky: 0,   tong_con: 57  },
  { ma: 'NTM-L',    nam: 2024, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'L',   nhap_ban_dau: 62,  ton_dau_ky: 41,  nhap_trong_ky: 0,   xuat_trong_ky: 3,  ton_cuoi_ky: 38,  tong_con: 0   },
  { ma: 'NTM-M',    nam: 2024, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'M',   nhap_ban_dau: 22,  ton_dau_ky: 12,  nhap_trong_ky: 0,   xuat_trong_ky: 1,  ton_cuoi_ky: 11,  tong_con: 0   },
  { ma: 'NTM-XL',   nam: 2024, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'XL',  nhap_ban_dau: 27,  ton_dau_ky: 8,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 8,   tong_con: 0   },
  { ma: 'NTM-XXL',  nam: 2024, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'XXL', nhap_ban_dau: 12,  ton_dau_ky: 5,   nhap_trong_ky: 0,   xuat_trong_ky: 5,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'NTN-L',    nam: 2024, ten_san_pham: 'ÁO NỮ (xanh công)',                 size: 'L',   nhap_ban_dau: 18,  ton_dau_ky: 9,   nhap_trong_ky: 0,   xuat_trong_ky: 2,  ton_cuoi_ky: 7,   tong_con: 0   },
  { ma: 'NTN-M',    nam: 2024, ten_san_pham: 'ÁO NỮ (xanh công)',                 size: 'M',   nhap_ban_dau: 45,  ton_dau_ky: 23,  nhap_trong_ky: 0,   xuat_trong_ky: 5,  ton_cuoi_ky: 18,  tong_con: 0   },
  { ma: 'NTN-XL',   nam: 2024, ten_san_pham: 'ÁO NỮ (xanh công)',                 size: 'XL',  nhap_ban_dau: 6,   ton_dau_ky: 6,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 6,   tong_con: 31  },

  // ── NĂM 2023 ──────────────────────────────────────────────────────────────
  { ma: '',          nam: 2023, ten_san_pham: 'ÁO YẾM',                            size: '',    nhap_ban_dau: 0,   ton_dau_ky: 5,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'BHLD-5',   nam: 2023, ten_san_pham: 'BỘ BẢO HỘ LAO ĐỘNG (màu ghi chì)', size: '5',   nhap_ban_dau: 0,   ton_dau_ky: 3,   nhap_trong_ky: 0,   xuat_trong_ky: 3,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'BHLD-6',   nam: 2023, ten_san_pham: 'BỘ BẢO HỘ LAO ĐỘNG (màu ghi chì)', size: '6',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'BHLD-7',   nam: 2023, ten_san_pham: 'BỘ BẢO HỘ LAO ĐỘNG (màu ghi chì)', size: '7',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'BHLD-GIAY',nam: 2023, ten_san_pham: 'GIÀY LÓT SẮT',                      size: '40',  nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'NTM-L',    nam: 2023, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'L',   nhap_ban_dau: 0,   ton_dau_ky: 1,   nhap_trong_ky: 0,   xuat_trong_ky: 1,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'NTM-M',    nam: 2023, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'M',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'NTM-S',    nam: 2023, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'S',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'NTM-XL',   nam: 2023, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'XL',  nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'NTN-L',    nam: 2023, ten_san_pham: 'ÁO NỮ (xanh công)',                 size: 'L',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'NTN-M',    nam: 2023, ten_san_pham: 'ÁO NỮ (xanh công)',                 size: 'M',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 1,  ton_cuoi_ky: 1,   tong_con: 0   },
  { ma: 'NTN-S',    nam: 2023, ten_san_pham: 'ÁO NỮ (xanh công)',                 size: 'S',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },

  // ── NĂM 2022 ──────────────────────────────────────────────────────────────
  { ma: '',          nam: 2022, ten_san_pham: 'ÁO YẾM',                            size: '',    nhap_ban_dau: 0,   ton_dau_ky: 10,  nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 10,  tong_con: 10  },
  { ma: 'BHLD-5',   nam: 2022, ten_san_pham: 'BỘ BẢO HỘ LAO ĐỘNG (màu ghi chì)', size: '5',   nhap_ban_dau: 0,   ton_dau_ky: 4,   nhap_trong_ky: 0,   xuat_trong_ky: 1,  ton_cuoi_ky: 3,   tong_con: 3   },
  { ma: 'BHLD-6',   nam: 2022, ten_san_pham: 'BỘ BẢO HỘ LAO ĐỘNG (màu ghi chì)', size: '6',   nhap_ban_dau: 0,   ton_dau_ky: 4,   nhap_trong_ky: 0,   xuat_trong_ky: 1,  ton_cuoi_ky: 3,   tong_con: 0   },
  { ma: 'BHLD-7',   nam: 2022, ten_san_pham: 'BỘ BẢO HỘ LAO ĐỘNG (màu ghi chì)', size: '7',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'BHLD-GIAY',nam: 2022, ten_san_pham: 'GIÀY LÓT SẮT',                      size: '40',  nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'NTM-L',    nam: 2022, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'L',   nhap_ban_dau: 0,   ton_dau_ky: 10,  nhap_trong_ky: 0,   xuat_trong_ky: 1,  ton_cuoi_ky: 9,   tong_con: 0   },
  { ma: 'NTM-M',    nam: 2022, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'M',   nhap_ban_dau: 0,   ton_dau_ky: 2,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 2,   tong_con: 0   },
  { ma: 'NTM-S',    nam: 2022, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'S',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'NTM-XL',   nam: 2022, ten_san_pham: 'ÁO NAM (xanh công)',                size: 'XL',  nhap_ban_dau: 0,   ton_dau_ky: 6,   nhap_trong_ky: 0,   xuat_trong_ky: 3,  ton_cuoi_ky: 3,   tong_con: 14  },
  { ma: 'NTN-L',    nam: 2022, ten_san_pham: 'ÁO NỮ (xanh công)',                 size: 'L',   nhap_ban_dau: 0,   ton_dau_ky: 10,  nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 10,  tong_con: 10  },
  { ma: 'NTN-M',    nam: 2022, ten_san_pham: 'ÁO NỮ (xanh công)',                 size: 'M',   nhap_ban_dau: 0,   ton_dau_ky: 0,   nhap_trong_ky: 0,   xuat_trong_ky: 0,  ton_cuoi_ky: 0,   tong_con: 0   },
  { ma: 'NTN-S',    nam: 2022, ten_san_pham: 'ÁO NỮ (xanh công)',                 size: 'S',   nhap_ban_dau: 0,   ton_dau_ky: 2,   nhap_trong_ky: 0,   xuat_trong_ky: 2,  ton_cuoi_ky: 0,   tong_con: 0   },
];

/* ─── Component ─────────────────────────────────────────────── */
export default function AoDongPhucTab() {
  const [search, setSearch]         = useState('');
  const [namFilter, setNamFilter]   = useState('Tất cả năm');
  const [page, setPage]             = useState(1);
  const [editRecord, setEditRecord] = useState<AoDongPhucRecord | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createDefault, setCreateDefault] = useState<Partial<AoDongPhucRecord> | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'bao-cao'>('list');
  const PAGE_SIZE = 15;

  const filtered = mockAoDongPhuc.filter((v) => {
    const q = search.trim().toLowerCase();
    const matchSearch =
      !q ||
      v.ten_san_pham.toLowerCase().includes(q) ||
      v.ma.toLowerCase().includes(q) ||
      v.size.toLowerCase().includes(q);
    const matchNam = namFilter === 'Tất cả năm' || String(v.nam) === namFilter;
    return matchSearch && matchNam;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const paged      = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleSearch = (val: string) => { setSearch(val); setPage(1); };

  if (viewMode === 'bao-cao') {
    return (
      <BaoCaoTongHopView
        onBack={() => setViewMode('list')}
        data={mockAoDongPhuc}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden gap-3.5 pt-2.5 pb-1">
      {/* ── Toolbar: Search + Filter năm + Báo cáo tổng hợp + Tạo mới ── */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Search */}
        <div className="relative flex-1">
          <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Tìm theo tên, mã, size..."
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>

        {/* Dropdown Năm */}
        <div className="relative shrink-0">
          <select
            value={namFilter}
            onChange={(e) => {
              setNamFilter(e.target.value);
              setPage(1);
            }}
            className="appearance-none pl-3.5 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 font-normal focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <IconChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Báo cáo tổng hợp */}
        <button
          type="button"
          onClick={() => setViewMode('bao-cao')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-normal rounded-lg hover:bg-slate-50 transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
        >
          <IconChartBar size={14} className="text-slate-500" />
          <span>Báo cáo tổng hợp</span>
        </button>

        {/* Tạo mới */}
        <button
          type="button"
          onClick={() => {
            setCreateDefault(null);
            setIsCreateOpen(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#406c89] text-white text-xs font-medium rounded-lg hover:bg-[#345870] transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
        >
          <IconPlus size={14} />
          <span>Tạo mới</span>
        </button>
      </div>

      {/* ── Table ── */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="overflow-auto flex-1">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100 text-center w-10">STT</th>
                <th className="px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100 text-center">Năm</th>
                <th className="px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100 text-left">Tên sản phẩm</th>
                <th className="px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100 text-center">Mã</th>
                <th className="px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100 text-center">Size</th>
                <th className="px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100 text-right">Nhập ban đầu</th>
                <th className="px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100 text-right">Tồn đầu kỳ</th>
                <th className="px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100 text-right">Nhập trong kỳ</th>
                <th className="px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100 text-right">Xuất trong kỳ</th>
                <th className="px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100 text-right">Tồn cuối kỳ</th>
                <th className="px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100 text-right">Tổng còn</th>
                <th className="px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((v, i) => (
                <tr key={`${v.nam}-${v.ma}-${v.ten_san_pham}-${v.size}`} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                  <td className="px-4 py-2.5 text-slate-500 text-center w-10">{(safePage - 1) * PAGE_SIZE + i + 1}</td>
                  <td className="px-4 py-2.5 text-slate-600 text-center tabular-nums font-medium">{v.nam}</td>
                  <td className="px-4 py-2.5 font-semibold text-slate-700 whitespace-nowrap">{v.ten_san_pham}</td>
                  <td className="px-4 py-2.5 font-mono text-slate-500 text-center">{v.ma}</td>
                  <td className="px-4 py-2.5 font-bold text-slate-700 text-center">{v.size}</td>
                  <td className="px-4 py-2.5 text-slate-600 text-right tabular-nums">{v.nhap_ban_dau}</td>
                  <td className="px-4 py-2.5 text-slate-600 text-right tabular-nums">{v.ton_dau_ky}</td>
                  <td className="px-4 py-2.5 text-emerald-600 font-semibold text-right tabular-nums">{v.nhap_trong_ky}</td>
                  <td className="px-4 py-2.5 text-rose-500 font-semibold text-right tabular-nums">{v.xuat_trong_ky}</td>
                  <td className="px-4 py-2.5 text-slate-700 font-semibold text-right tabular-nums">{v.ton_cuoi_ky}</td>
                  <td className="px-4 py-2.5 text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                      {v.tong_con}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1">
                      <button
                        className="w-6 h-6 flex items-center justify-center rounded border border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition-colors"
                        onClick={() => {
                          setCreateDefault(null);
                          setIsCreateOpen(true);
                        }}
                      >
                        <IconPlus size={12} />
                      </button>
                      <button
                        className="w-6 h-6 flex items-center justify-center rounded border border-blue-200 text-blue-500 hover:bg-blue-50 transition-colors"
                        onClick={() => setEditRecord(v)}
                      >
                        <IconPencil size={12} />
                      </button>
                      <button className="w-6 h-6 flex items-center justify-center rounded border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
                        <IconTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Pagination bar ── */}
        <div className="shrink-0 flex items-center justify-between px-4 py-2.5 border-t border-slate-100 bg-slate-50/60">
          <span className="text-[11px] text-slate-500">
            Hiển <span className="font-semibold text-slate-700">{(safePage - 1) * PAGE_SIZE + 1}</span>
            {'–'}
            <span className="font-semibold text-slate-700">{Math.min(safePage * PAGE_SIZE, filtered.length)}</span>
            {' '}/{ ' '}
            <span className="font-semibold text-slate-700">{filtered.length}</span> bản ghi
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="p-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <IconChevronLeft size={13} />
            </button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
              .reduce<(number | '...')[]>((acc, p, i, arr) => {
                if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('...');
                acc.push(p);
                return acc;
              }, [])
              .map((p, idx) =>
                p === '...' ? (
                  <span key={`ellipsis-${idx}`} className="px-1 text-xs text-slate-400">...</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p as number)}
                    className={`min-w-[26px] h-[26px] text-[11px] rounded border font-medium transition-colors ${
                      safePage === p
                        ? 'bg-[#406c89] text-white border-[#406c89]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="p-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <IconChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Sửa modal ── */}
      <SuaAoDongPhucModal
        record={editRecord}
        onClose={() => setEditRecord(null)}
        onSave={(updated) => {
          // TODO: gọi API cập nhật dữ liệu thực tế
          console.log('Lưu bản ghi:', updated);
          setEditRecord(null);
        }}
      />

      {/* ── Tạo mới modal ── */}
      <TaoMoiAoDongPhucModal
        isOpen={isCreateOpen}
        defaultData={createDefault}
        onClose={() => {
          setIsCreateOpen(false);
          setCreateDefault(null);
        }}
        onSave={(newRecord) => {
          // TODO: gọi API tạo mới dữ liệu thực tế
          console.log('Tạo mới bản ghi:', newRecord);
          setIsCreateOpen(false);
          setCreateDefault(null);
        }}
      />
    </div>
  );
}
