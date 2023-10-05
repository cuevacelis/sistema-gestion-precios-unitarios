import { getSessionUser } from "../utils/getSessionUser";
import MenuLateral from "./_components/menuLateral";
import NavbarDashboard from "./_components/navbarDashboard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dataFetch = await getSessionUser();

  return (
    <>
      <NavbarDashboard dataFetch={dataFetch} />
      <MenuLateral>{children}</MenuLateral>
    </>
  );
}
