"use client";

import { Button } from "@/components/ui/button";
import LogoComponent from "@/components/ui/logo/logo";
import { IDataDBSidebar } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import { IResult } from "mssql";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModuleIconsComponent from "./module-icons";

interface SidebarProps {
  modulesByUser: IResult<IDataDBSidebar>;
}

export default function SidebarComponent(props: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 z-20 hidden border-r md:block bg-background">
      <div className="flex h-full flex-col gap-2">
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
            {props.modulesByUser.recordset.map((module) => {
              return (
                <Link
                  key={module.Mod_Id}
                  href={`/dashboard/${module.Mod_Nombre.toLowerCase()}s`}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 mt-4 text-muted-foreground transition-all hover:text-primary",
                    pathname.startsWith(
                      `/dashboard/${module.Mod_Nombre.toLowerCase()}s`
                    ) && "bg-muted text-primary"
                  )}
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
  );
}
