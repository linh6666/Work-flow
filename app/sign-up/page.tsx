import type { Metadata } from "next";
import PageSingnup from "../../components/Signup";
import PageSignup from "../../components/Signup";
export const metadata: Metadata = {
  title: "Quản lý quy trình công việc",
  description: "Trang đăng ký cho hệ thống",
};

export default function SignUpPage() {
  return (
   <>
    <PageSignup />
   </>
  );
}
