import { ShieldCheck } from "lucide-react";
import SkeletonSidebarComponent from "./sidebar-skeleton";
import TopBarSkeleton from "./topbar-skeleton";

export default function NavbarLoggedSkeleton() {
  return (
    <div className="flex max-h-screen h-screen overflow-hidden">
      <SkeletonSidebarComponent />
      <div className="flex-1 overflow-auto items-start gap-4 p-sm:px-6 sm:py-0 md:gap-8 bg-muted dark:bg-muted/50">
        <TopBarSkeleton />
        <main className="block overflow-auto p-4 lg:p-6">
          <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                <ShieldCheck className="absolute inset-0 h-8 w-8 m-auto text-primary animate-pulse" />
              </div>
              <p className="mt-4 text-lg font-medium text-muted-foreground">
                Cargando panel autenticado...
              </p>
              <span className="sr-only">
                Cargando panel de control autenticado, por favor espere
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
