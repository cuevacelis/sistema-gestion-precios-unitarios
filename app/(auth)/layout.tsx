import NavbarSkeletonComponent from "@/components/navbar/navbar-skeleton/navbar-sleleton";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NavbarLoggedComponent = dynamic(
  () => import("@/components/navbar/navbar-logged/navbar-logged")
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<NavbarSkeletonComponent />}>
      <NavbarLoggedComponent>{children}</NavbarLoggedComponent>
    </Suspense>
  );
}
