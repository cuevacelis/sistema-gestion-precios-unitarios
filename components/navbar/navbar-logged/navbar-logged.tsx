import { auth } from "@/auth";
import { getModulosByUserId } from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";

interface IProps {
  children: React.ReactNode;
}

const SidebarComponent = dynamic(() => import("./_components/sidebar"), {
  ssr: true,
  loading: () => <p className="text-center w-60">Loading...</p>,
});
const TopBarComponent = dynamic(() => import("./_components/topbar"), {
  ssr: true,
  loading: () => <p>Loading...</p>,
});

export default async function NavbarLoggedComponent(props: IProps) {
  const session = await auth();
  const modulesByUser = await getModulosByUserId(Number(session?.user?.id));
  return (
    <div className="flex max-h-screen overflow-hidden">
      <SidebarComponent {...{ session, modulesByUser }} />

      <div className="flex-1 overflow-auto items-start gap-4 p-sm:px-6 sm:py-0 md:gap-8 bg-muted dark:bg-muted/50">
        <TopBarComponent {...{ session, modulesByUser }} />
        <main className="block overflow-auto p-4 lg:p-6">{props.children}</main>
      </div>
    </div>
  );
}
