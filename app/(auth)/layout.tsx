import NavbarLoggedComponent from "@/components/navbar/navbar-logged/navbar-logged";
import NavbarSkeletonComponent from "@/components/navbar/navbar-skeleton/navbar-sleleton";
import { Suspense } from "react";

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
