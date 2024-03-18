import MenuLateralComponent from "./_components/menu-lateral";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MenuLateralComponent>{children}</MenuLateralComponent>
    </>
  );
}
