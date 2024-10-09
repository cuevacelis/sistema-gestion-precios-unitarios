"use client";

import { Button } from "@/components/ui/button";
import { ISpModuloObtenerModulosXPusuario } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import { SidebarClose } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModuleIconsComponent from "./module-icons";

interface SidebarProps {
  session: Session | null;
  modulesByUser: ISpModuloObtenerModulosXPusuario[];
  stateSidebar: boolean;
  setStateSidebar: (state: boolean) => void;
}

export default function SidebarComponent(props: SidebarProps) {
  const pathname = usePathname();

  return (
    <section
      className={cn(
        "transition-all duration-400 ease-in-out items-center gap-4 sm:py-4 overflow-hidden",
        {
          "w-0 p-0": !props.stateSidebar,
          "w-60 px-4 lg:px-6 hidden md:block": props.stateSidebar,
        }
      )}
    >
      <div className="flex justify-between items-center text-muted-foreground mb-4 font-normal">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => props.setStateSidebar(!props.stateSidebar)}
        >
          <SidebarClose className="h-5 w-5" />
        </Button>
        <Link href="/" className="flex items-center gap-2 ml-auto">
          <span className="">SGPU</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start text-sm font-normal">
          {props.modulesByUser.map((module) => {
            return (
              <Link
                key={module.mod_nombre}
                href={`/dashboard/${module.mod_nombre.toLowerCase()}`}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 mt-4 transition-all hover:text-primary",
                  pathname.startsWith(
                    `/dashboard/${module.mod_nombre.toLowerCase()}`
                  ) && "bg-muted text-primary"
                )}
              >
                <ModuleIconsComponent
                  className="h-6 w-6"
                  modNombre={module.mod_nombre}
                />
                {module.mod_nombre}
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
