"use client";
import { Button } from "@/components/ui/button";
import { useGestionEstudiantesLogged } from "@/context/context-gestion-estudiantes-logged";
import { IDataDBSidebar } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SidebarClose } from "lucide-react";
import { IResult } from "mssql";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModuleIconsComponent from "./module-icons";

interface SidebarProps {
  session: Session | null;
  modulesByUser: IResult<IDataDBSidebar>;
}

export default function SidebarComponent(props: SidebarProps) {
  const pathname = usePathname();
  const { stateSidebar, setStateSidebar } = useGestionEstudiantesLogged();

  return (
    <section
      className={cn(
        "transition-all duration-400 ease-in-out items-center gap-4 sm:py-4 overflow-hidden",
        {
          "w-0 p-0": !stateSidebar,
          "w-60 px-4 lg:px-6 hidden md:block": stateSidebar,
        }
      )}
    >
      <div className="flex justify-between items-center text-muted-foreground mb-4 font-normal">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            setStateSidebar(!stateSidebar);
          }}
        >
          <SidebarClose className="h-5 w-5" />
        </Button>
        <Link href="/" className="flex items-center gap-2 ml-auto">
          <span className="">SGPU</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start text-sm font-normal">
          {props.modulesByUser.recordset.map((module) => {
            return (
              <Link
                key={module.Mod_Id}
                href={`/dashboard/${module.Mod_Nombre.toLowerCase()}s`}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 mt-4 transition-all hover:text-primary",
                  pathname.startsWith(
                    `/dashboard/${module.Mod_Nombre.toLowerCase()}s`
                  ) && "bg-muted text-primary"
                )}
              >
                <ModuleIconsComponent modNombre={module.Mod_Nombre} />
                {module.Mod_Nombre}
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
