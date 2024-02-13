import { auth } from "@/auth";
import { Metadata } from "next";
import MenuLateral from "./_components/menuLateral";
import NavbarDashboard from "./_components/navbarDashboard";

export const metadata: Metadata = {
  title: "SGPU Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      <NavbarDashboard session={session} />
      <MenuLateral>{children}</MenuLateral>
    </>
  );
}
