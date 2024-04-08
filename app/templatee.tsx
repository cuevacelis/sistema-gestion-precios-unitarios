import { auth } from "@/auth";
import NavbarLoggedComponent from "@/components/navbar/navbar-logged/navbar-logged";
import NavbarUnloggedComponent from "@/components/navbar/navbar-unlogged/navbar-unlogged";
import { Suspense } from "react";

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <>
      {!Boolean(session?.user) ? (
        <Suspense fallback={<div>Loading...</div>}>
          <NavbarLoggedComponent>{children}</NavbarLoggedComponent>
        </Suspense>
      ) : (
        <>
          <NavbarUnloggedComponent />
          {children}
        </>
      )}
    </>
  );

  // if (Boolean(session?.user)) {
  //   const dataInfoUser = await fetchLoggedUser({
  //     token: String(session?.user?.token),
  //   });
  //   return (
  //     <>
  //       <Suspense fallback={<NavbarSkeletonComponent />}>
  //         <NavbarLoggedComponent
  //         // dataInfoUser={dataInfoUser}
  //         >
  //           {children}
  //         </NavbarLoggedComponent>
  //       </Suspense>
  //     </>
  //   );
  // } else {
  //   return (
  //     <>
  //       <NavbarUnloggedComponent />
  //       {children}
  //     </>
  //   );
  // }
}
