import type { Metadata } from "next";
import PageForgotPasswword from "../../components/ForgotPassword";
export const metadata: Metadata = {
  title: "Quản lý quy trình công việc",
  description: "Trang quên mật khẩu cho hệ thống",
};

export default function ForgotPasswordPage() {
  return (
   <>
    <PageForgotPasswword />
   </>
  );
}
