import type { Metadata } from "next";
import PageLogin from "../../components/Singin";
export const metadata: Metadata = {
  title: "Quản lý quy trình công việc",
  description: "Trang đăng nhập cho hệ thống",
};

export default function SignInPage() {
  return (
   <>
    <PageLogin />
   </>
  );
}
