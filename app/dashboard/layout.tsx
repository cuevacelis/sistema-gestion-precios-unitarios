import { Metadata } from "next";
import MenuLateralComponent from "./_components/MenuLateralComponent";

export const metadata: Metadata = {
  title: "Dashboard",
};

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
