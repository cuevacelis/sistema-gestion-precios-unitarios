import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Logueate en el SGPU",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}