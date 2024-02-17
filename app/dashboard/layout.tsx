import { Metadata } from "next";
import MenuLateral from "./_components/menuLateral";

export const metadata: Metadata = {
  title: "SGPU Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MenuLateral>{children}</MenuLateral>
    </>
  );
}
