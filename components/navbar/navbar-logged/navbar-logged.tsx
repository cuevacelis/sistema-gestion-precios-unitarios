import { auth } from "@/auth";
import { getModulosByUserId } from "@/lib/services/sql-queries";
import SidebarComponent from "./_components/sidebar";
import TopBarComponent from "./_components/topbar";

interface IProps {
  children: React.ReactNode;
}

export default async function NavbarLoggedComponent(props: IProps) {
  const session = await auth();
  const modulesByUser = await getModulosByUserId(Number(session?.user?.id));
  return (
    <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <SidebarComponent {...{ modulesByUser }} />
      <div className="overflow-auto bg-muted dark:bg-muted/50">
        <TopBarComponent {...{ session, modulesByUser }} />
        {props.children}
      </div>
    </div>
  );
}
