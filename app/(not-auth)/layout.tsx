import dynamic from "next/dynamic";

const NavbarUnloggedComponent = dynamic(
  () => import("@/components/navbar/navbar-unlogged/navbar-unlogged")
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarUnloggedComponent />
      {children}
    </>
  );
}
