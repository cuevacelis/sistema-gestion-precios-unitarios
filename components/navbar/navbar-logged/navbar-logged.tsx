"use client";
import { ISpModuloObtenerModulosXPusuario } from "@/lib/types";
import { Session } from "next-auth";
import { useState } from "react";
import TopBarSkeleton from "./_components/topbar-skeleton";
import dynamic from "next/dynamic";
import SkeletonSidebarComponent from "./_components/sidebar-skeleton";

const TopBarComponent = dynamic(() => import("./_components/topbar"), {
  ssr: false,
  loading: () => <TopBarSkeleton />,
});

const SidebarComponent = dynamic(() => import("./_components/sidebar"), {
  ssr: false,
  loading: () => <SkeletonSidebarComponent />,
});

interface IPropsNavbarLogged {
  children: React.ReactNode;
  session: Session | null;
  modulesByUser: ISpModuloObtenerModulosXPusuario[];
}

export default function NavbarLoggedComponent({
  children,
  session,
  modulesByUser,
}: IPropsNavbarLogged) {
  const [stateSidebar, setStateSidebar] = useState(true);

  return (
    <div className="flex max-h-screen h-screen overflow-hidden">
      <SidebarComponent
        session={session}
        modulesByUser={modulesByUser}
        stateSidebar={stateSidebar}
        setStateSidebar={setStateSidebar}
      />
      <div className="flex-1 overflow-auto items-start gap-4 p-sm:px-6 sm:py-0 md:gap-8 bg-muted dark:bg-muted/50">
        <TopBarComponent
          session={session}
          modulesByUser={modulesByUser}
          stateSidebar={stateSidebar}
          setStateSidebar={setStateSidebar}
        />
        <main className="block overflow-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
