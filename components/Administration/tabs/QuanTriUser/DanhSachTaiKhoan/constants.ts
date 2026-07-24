import { UserItem } from '../types';

export const DEFAULT_USERS: UserItem[] = [
  {
    id: 'usr-1',
    fullName: 'Thảo Phùng',
    email: 'pbthao@gmail.com',
    username: 'pbthao',
    roles: ['Quản trị viên hệ thống'],
    status: 'Hoạt động',
    createdDate: '2026-03-04'
  },
  {
    id: 'usr-2',
    fullName: 'congnghevathietke.mhv',
    email: 'congnghevathietke.mhv@gmail.com',
    username: 'congnghevathietke.mhv',
    roles: ['Quản trị viên hệ thống'],
    status: 'Hoạt động',
    createdDate: '2026-03-11',
    isCurrentUser: true
  },
  {
    id: 'usr-3',
    fullName: 'Trần Diễm My',
    email: 'trandiemmy86@gmail.com',
    username: 'diemmytrand',
    roles: ['Chủ nhiệm Dự án', 'QLDA Phòng Khai triển'],
    status: 'Hoạt động',
    createdDate: '2026-03-12'
  },
  {
    id: 'usr-4',
    fullName: 'Tạ Hiển Trang',
    email: 'marketing@mohinviet.com',
    username: 'trangth',
    roles: ['KTV Phòng Công nghệ & Thiết kế', 'QLDA Phòng Công nghệ & Thiết kế'],
    status: 'Hoạt động',
    createdDate: '2026-03-15'
  },
  {
    id: 'usr-5',
    fullName: 'Lưu Nhật',
    email: 'luunhat811@gmail.com',
    username: 'nhatl',
    roles: ['KTV Phòng Công nghệ & Thiết kế'],
    status: 'Hoạt động',
    createdDate: '2026-03-20'
  },
  {
    id: 'usr-6',
    fullName: 'Thảo B Phung',
    email: 'thao@mohinviet.com',
    username: 'thaobp',
    roles: ['Phó GĐ Kinh doanh – Hành chính'],
    status: 'Hoạt động',
    createdDate: '2026-03-22'
  },
  {
    id: 'usr-7',
    fullName: 'Dương Việt Anh',
    email: 'khaitrien.ktv04.mhv@gmail.com',
    username: 'vietanhd',
    roles: ['KTV Phòng Khai triển', 'QLDA Phòng Khai triển'],
    status: 'Hoạt động',
    createdDate: '2026-03-25'
  },
  {
    id: 'usr-8',
    fullName: 'Nguyễn Đức Việt',
    email: 'viet@mohinhviet.com',
    username: 'vietnd',
    roles: ['Giám đốc'],
    status: 'Hoạt động',
    createdDate: '2026-03-26'
  },
  {
    id: 'usr-9',
    fullName: 'Bùi Thị Duyên',
    email: 'duyenbui@mohinhviet.com',
    username: 'duyenbt',
    roles: ['Quản lý Kinh doanh'],
    status: 'Hoạt động',
    createdDate: '2026-03-27'
  },
  {
    id: 'usr-10',
    fullName: 'Nguyễn Thanh Tuấn',
    email: 'pgdkt.mhv@gmail.com',
    username: 'tuannt',
    roles: ['Phó GĐ Kỹ thuật'],
    status: 'Hoạt động',
    createdDate: '2026-03-28'
  },
  {
    id: 'usr-11',
    fullName: 'Vũ Thanh Thuỷ',
    email: 'nhansu@mohinhviet.com',
    username: 'thuyvt',
    roles: ['Quản lý Kinh doanh'],
    status: 'Hoạt động',
    createdDate: '2026-03-29'
  },
  {
    id: 'usr-12',
    fullName: 'Bùi Phương Uyên',
    email: 'khoivanphong.kd02.mhv@gmail.com',
    username: 'uyenbp',
    roles: ['Nhân viên Kinh doanh'],
    status: 'Hoạt động',
    createdDate: '2026-03-30'
  },
  {
    id: 'usr-13',
    fullName: 'Kỳ Anh',
    email: 'khoivanphong.kd03.mhv@gmail.com',
    username: 'anhk',
    roles: ['Nhân viên Kinh doanh'],
    status: 'Hoạt động',
    createdDate: '2026-03-31'
  },
  {
    id: 'usr-14',
    fullName: 'Lê Quốc Long',
    email: 'khaitrien.mhv@gmail.com',
    username: 'longlq',
    roles: ['Quản lý Phòng Khai triển'],
    status: 'Hoạt động',
    createdDate: '2026-04-01'
  },
  {
    id: 'usr-15',
    fullName: 'Đào Văn Thọ',
    email: 'khaitrien.ktv01.mhv@gmail.com',
    username: 'thodv',
    roles: ['KTV Phòng Khai triển', 'QLDA Phòng Khai triển'],
    status: 'Hoạt động',
    createdDate: '2026-04-02'
  },
  {
    id: 'usr-16',
    fullName: 'Nguyễn Thiên Hương',
    email: 'khaitrien.ktv03.mhv@gmail.com',
    username: 'huongnt',
    roles: ['KTV Phòng Khai triển', 'QLDA Phòng Khai triển'],
    status: 'Hoạt động',
    createdDate: '2026-04-03'
  },
  {
    id: 'usr-17',
    fullName: 'Hoàng Hữu Vinh',
    email: 'catlaser.mhv@gmail.com',
    username: 'vinhhh',
    roles: ['Quản lý Phòng Cắt'],
    status: 'Hoạt động',
    createdDate: '2026-04-04'
  },
  {
    id: 'usr-18',
    fullName: 'Lê Trung Hiếu',
    email: 'catlaser.ktv01.mhv@gmail.com',
    username: 'hieult',
    roles: ['KTV Phòng Cắt', 'QLDA Phòng Cắt'],
    status: 'Hoạt động',
    createdDate: '2026-04-05'
  },
  {
    id: 'usr-19',
    fullName: 'Nguyễn Tuấn Việt',
    email: 'catlaser.ktv02.mhv@gmail.com',
    username: 'vietnt',
    roles: ['KTV Phòng Cắt', 'QLDA Phòng Cắt'],
    status: 'Hoạt động',
    createdDate: '2026-04-06'
  },
  {
    id: 'usr-20',
    fullName: 'Bùi Ngọc Sỹ',
    email: 'ghepkythuat.mhv@gmail.com',
    username: 'sybn',
    roles: ['Quản lý Phòng Ghép'],
    status: 'Hoạt động',
    createdDate: '2026-04-07'
  },
  {
    id: 'usr-21',
    fullName: 'Đinh Đức Lợi',
    email: 'ghepkythuat.pp.mhv@gmail.com',
    username: 'loidd',
    roles: ['Quản lý Phòng Ghép'],
    status: 'Hoạt động',
    createdDate: '2026-04-08'
  },
  {
    id: 'usr-22',
    fullName: 'Đỗ Thị Luyên',
    email: 'ghepkythuat.qlda01.mhv@gmail.com',
    username: 'luyendt',
    roles: ['QLDA Phòng Ghép'],
    status: 'Hoạt động',
    createdDate: '2026-04-09'
  },
  {
    id: 'usr-23',
    fullName: 'Nguyễn Thị Lanh',
    email: 'ghepkythuat.qlda03.mhv@gmail.com',
    username: 'lanhnt',
    roles: ['QLDA Phòng Ghép'],
    status: 'Hoạt động',
    createdDate: '2026-04-10'
  },
  {
    id: 'usr-24',
    fullName: 'Nguyễn Tuân',
    email: 'ghepkythuat.qlda04.mhv@gmail.com',
    username: 'tuann',
    roles: ['QLDA Phòng Ghép'],
    status: 'Hoạt động',
    createdDate: '2026-04-11'
  },
  {
    id: 'usr-25',
    fullName: 'Bùi Văn Lộc',
    email: 'hethongdien.mhv@gmail.com',
    username: 'locbv',
    roles: ['Quản lý Phòng Điện'],
    status: 'Hoạt động',
    createdDate: '2026-04-12'
  },
  {
    id: 'usr-26',
    fullName: 'Lâm Vĩnh Hưng',
    email: 'hethongdien.pp.mhv@gmail.com',
    username: 'hunglv',
    roles: ['Quản lý Phòng Điện'],
    status: 'Hoạt động',
    createdDate: '2026-04-13'
  },
  {
    id: 'usr-27',
    fullName: 'Hà Tùng Lâm',
    email: 'hethongdien.qlda01.mhv@gmail.com',
    username: 'lamht',
    roles: ['QLDA Phòng Điện'],
    status: 'Hoạt động',
    createdDate: '2026-04-14'
  },
  {
    id: 'usr-28',
    fullName: 'Phạm Thị Thu Trang',
    email: 'canhquan.mhv@gmail.com',
    username: 'trangptt',
    roles: ['Quản lý Phòng Cảnh Quan'],
    status: 'Hoạt động',
    createdDate: '2026-04-15'
  },
  {
    id: 'usr-29',
    fullName: 'Đỗ Ngọc Duyên',
    email: 'canhquan.qlda01.mhv@gmail.com',
    username: 'duyendt',
    roles: ['QLDA Phòng Cảnh Quan'],
    status: 'Hoạt động',
    createdDate: '2026-04-16'
  },
  {
    id: 'usr-30',
    fullName: 'Tống Thị Thu',
    email: 'canhquan.qlda02.mhv@gmail.com',
    username: 'thutt',
    roles: ['QLDA Phòng Cảnh Quan'],
    status: 'Hoạt động',
    createdDate: '2026-04-17'
  },
  {
    id: 'usr-31',
    fullName: 'Đinh Hữu Sứ',
    email: 'mocson.mhv@gmail.com',
    username: 'sudh',
    roles: ['Quản lý Phòng Mộc Sơn'],
    status: 'Hoạt động',
    createdDate: '2026-04-18'
  },
  {
    id: 'usr-32',
    fullName: 'Hoàng Quyết Thắng',
    email: 'mocson.ktv01.mhv@gmail.com',
    username: 'thanghq',
    roles: ['QLDA Phòng Mộc Sơn'],
    status: 'Hoạt động',
    createdDate: '2026-04-19'
  },
  {
    id: 'usr-33',
    fullName: 'Nguyễn Minh Hiếu',
    email: 'mocson.ktv02.mhv@gmail.com',
    username: 'hieunm',
    roles: ['QLDA Phòng Mộc Sơn'],
    status: 'Hoạt động',
    createdDate: '2026-04-20'
  },
  {
    id: 'usr-34',
    fullName: 'Cao Trường Thiên',
    email: 'congnghevathietke.designer.mhv@gmail.com',
    username: 'thienct',
    roles: ['KTV Phòng Công nghệ & Thiết kế'],
    status: 'Hoạt động',
    createdDate: '2026-04-21'
  },
  {
    id: 'usr-35',
    fullName: 'Lưu Quốc Nhật',
    email: 'congnghevathietke.ltn.mhv@gmail.com',
    username: 'nhatlq',
    roles: ['KTV Phòng Công nghệ & Thiết kế'],
    status: 'Hoạt động',
    createdDate: '2026-04-22'
  },
  {
    id: 'usr-36',
    fullName: 'Nguyễn Quang Linh',
    email: 'congnghevathietke.ltweb.mhv@gmail.com',
    username: 'linhnq',
    roles: ['KTV Phòng Công nghệ & Thiết kế'],
    status: 'Hoạt động',
    createdDate: '2026-04-23'
  },
  {
    id: 'usr-37',
    fullName: 'Nguyễn Phú Quang',
    email: 'kd@mohinhviet.com',
    username: 'quangnp',
    roles: ['Nhân viên Kinh doanh'],
    status: 'Hoạt động',
    createdDate: '2026-04-24'
  },
  {
    id: 'usr-38',
    fullName: 'Bùi Phương Uyên',
    email: 'info@mohinhviet.com',
    username: 'uyenbp2',
    roles: ['Nhân viên Kinh doanh'],
    status: 'Hoạt động',
    createdDate: '2026-04-25'
  },
  {
    id: 'usr-39',
    fullName: 'Nguyễn Mai Lâm',
    email: 'khoivanphong.qlk.mhv@gmail.com',
    username: 'lamnm',
    roles: ['KTV Khối Văn phòng (KT)'],
    status: 'Hoạt động',
    createdDate: '2026-04-26'
  },
  {
    id: 'usr-40',
    fullName: 'Phạm Tiến Thành',
    email: 'khaitrien.ktv02.mhv@gmail.com',
    username: 'thanhpt',
    roles: ['KTV Phòng Khai triển', 'QLDA Phòng Khai triển'],
    status: 'Hoạt động',
    createdDate: '2026-04-27'
  }
];

export const ROLE_OPTIONS = [
  'Quản trị viên hệ thống',
  'Giám đốc',
  'Phó GĐ Kinh doanh – Hành chính',
  'Phó GĐ Kỹ thuật',
  'Quản lý Kinh doanh',
  'Quản lý Phòng Khai triển',
  'Quản lý Phòng Cắt',
  'Quản lý Phòng Ghép',
  'Quản lý Phòng Điện',
  'Quản lý Phòng Cảnh Quan',
  'Quản lý Phòng Mộc Sơn',
  'Chủ nhiệm Dự án',
  'QLDA Phòng Khai triển',
  'QLDA Phòng Công nghệ & Thiết kế',
  'QLDA Phòng Cắt',
  'QLDA Phòng Ghép',
  'QLDA Phòng Điện',
  'QLDA Phòng Cảnh Quan',
  'QLDA Phòng Mộc Sơn',
  'KTV Phòng Công nghệ & Thiết kế',
  'KTV Phòng Khai triển',
  'KTV Phòng Cắt',
  'KTV Khối Văn phòng (KT)',
  'Nhân viên Kinh doanh'
];
