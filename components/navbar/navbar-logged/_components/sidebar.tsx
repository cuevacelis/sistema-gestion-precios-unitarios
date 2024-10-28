"use client";

import { Button } from "@/components/ui/button";
import { ISpModuloObtenerModulosXPusuario } from "@/lib/types/types";
import { cn, convertirEspaciosAGuionesBajos } from "@/lib/utils";
import { SidebarClose, SidebarOpen } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModuleIconsComponent from "./module-icons";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface SidebarProps {
  session: Session | null;
  modulesByUser: ISpModuloObtenerModulosXPusuario[];
}

export default function SidebarComponent(props: SidebarProps) {
  const pathname = usePathname();
  const { toggleSidebar, state: stateSidebar } = useSidebar();

  return (
    <Sidebar className={cn("font-normal px-4")} collapsible="icon">
      <SidebarHeader>
        {stateSidebar === "expanded" && (
          <section className="flex justify-between items-center text-muted-foreground mt-2 font-normal">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 dark:text-white text-black"
              onClick={toggleSidebar}
            >
              <SidebarClose />
            </Button>
            <Link href="/" className="flex items-center gap-2 ml-auto">
              <span className="">CALCPU</span>
            </Link>
          </section>
        )}
        {stateSidebar === "collapsed" && (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 flex mt-2"
            onClick={toggleSidebar}
          >
            <SidebarOpen />
          </Button>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {props.modulesByUser.map((module) => (
                <SidebarMenuItem key={module.mod_nombre}>
                  <SidebarMenuButton asChild>
                    <Link
                      key={module.mod_nombre}
                      href={`/dashboard/${convertirEspaciosAGuionesBajos(module.mod_nombre.toLowerCase())}`}
                      className={cn(
                        "h-auto",
                        pathname.startsWith(
                          `/dashboard/${convertirEspaciosAGuionesBajos(module.mod_nombre.toLowerCase())}`
                        ) && "bg-muted text-primary"
                      )}
                    >
                      <ModuleIconsComponent
                        className={cn("", {
                          "!h-6 !w-6": stateSidebar === "expanded",
                        })}
                        modNombre={module.mod_nombre}
                      />
                      <span>{module.mod_nombre}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
