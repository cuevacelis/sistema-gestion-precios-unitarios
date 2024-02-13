import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SGPU Register",
  description: "Registrate en el SGPU",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
