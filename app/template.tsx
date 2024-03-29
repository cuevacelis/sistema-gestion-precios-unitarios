import { auth } from "@/auth";
import { Suspense } from "react";
import NavbarLoggedComponent from "./_components/navbar/navbar-logged/navbar-logged";
import NavbarSkeletonComponent from "./_components/navbar/navbar-skeleton/navbar-sleleton";
import NavbarUnloggedComponent from "./_components/navbar/navbar-unlogged/navbar-unlogged";
import { fetchLoggedUser } from "./_lib/data/fetch";

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (Boolean(session?.user)) {
    const dataInfoUser = await fetchLoggedUser({
      token: String(session?.user?.token),
    });
    return (
      <>
        <Suspense fallback={<NavbarSkeletonComponent />}>
          <NavbarLoggedComponent dataInfoUser={dataInfoUser} />
        </Suspense>
        {children}
      </>
    );
  } else {
    return (
      <>
        <NavbarUnloggedComponent />
        {children}
      </>
    );
  }
}
