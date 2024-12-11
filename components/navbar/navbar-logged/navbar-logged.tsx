import { ISpModuloObtenerModulosXPusuario } from "@/lib/types/types";
import { Session } from "next-auth";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SidebarComponent from "./_components/sidebar";
import TopBarComponent from "./_components/topbar";

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
  return (
    <SidebarProvider>
      <SidebarComponent session={session} modulesByUser={modulesByUser} />
      <SidebarInset className="bg-muted dark:bg-muted/50 overflow-auto">
        <TopBarComponent session={session} modulesByUser={modulesByUser} />
        <section className="p-4 lg:p-6">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
