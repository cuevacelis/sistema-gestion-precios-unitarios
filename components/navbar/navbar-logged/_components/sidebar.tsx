import { Button } from "@/components/ui/button";
import LogoComponent from "@/components/ui/logo/logo";
import { TooltipProvider } from "@/components/ui/tooltip";
import { modulo } from "@/lib/types/@prisma/client";
import { Bell } from "lucide-react";
import Link from "next/link";
import ModuleIconsComponent from "./module-icons";

interface SidebarProps {
  modulesByUser: modulo[];
}

export default function SidebarComponent(props: SidebarProps) {
  return (
    <TooltipProvider>
      <aside className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <LogoComponent />
              <span className="">SGPU</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {props.modulesByUser.map((module) => {
                return (
                  <Link
                    href={`/dashboard/${module.Mod_Nombre.toLowerCase()}s`}
                    key={module.Mod_Id}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <ModuleIconsComponent modNombre={module.Mod_Nombre} />
                    {module.Mod_Nombre + "s"}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
