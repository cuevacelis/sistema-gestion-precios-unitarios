import { auth } from "@/auth";
import { getModulosByUserId } from "@/lib/data/sql-queries";
import SidebarComponent from "./_components/sidebar";
import TopBarComponent from "./_components/topbar";

interface IProps {
  children: React.ReactNode;
}

export default async function NavbarLoggedComponent(props: IProps) {
  const session = await auth();
  const modulesByUser = await getModulosByUserId(Number(session?.user?.id));

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <SidebarComponent {...{ modulesByUser }} />
      <div className="flex flex-col">
        <TopBarComponent {...{ session, modulesByUser }} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {props.children}
        </main>
      </div>
    </div>
  );
}
