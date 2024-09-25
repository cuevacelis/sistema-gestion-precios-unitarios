import { auth } from "@/auth";
import { getModulosByUserId } from "@/lib/services/sql-queries";
import { Suspense } from "react";
import NavbarLoggedClientSkeleton from "./_components/navbar-logged-client-skeleton";
import NavbarLoggedClientComponent from "./_components/navbar-logged-client";

interface IProps {
  children: React.ReactNode;
}

export default function NavbarLoggedComponent({ children }: IProps) {
  return (
    <Suspense fallback={<NavbarLoggedClientSkeleton />}>
      <GetDataNavbar>{children}</GetDataNavbar>
    </Suspense>
  );
}

async function GetDataNavbar({ children }: IProps) {
  const session = await auth();
  const modulesByUser = await getModulosByUserId(Number(session?.user?.id));
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  return (
    <NavbarLoggedClientComponent
      session={session}
      modulesByUser={modulesByUser}
    >
      {children}
    </NavbarLoggedClientComponent>
  );
}
