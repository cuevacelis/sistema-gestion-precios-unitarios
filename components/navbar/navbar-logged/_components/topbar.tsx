"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGestionEstudiantesLogged } from "@/context/context-gestion-estudiantes-logged";
import { actionsSignOut } from "@/lib/actions";
import { IDataDBSidebar } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  CheckIcon,
  CircleUser,
  ComputerIcon,
  LifeBuoy,
  LogOut,
  Menu,
  MoonIcon,
  Settings,
  SidebarOpen,
  SunIcon,
  User,
} from "lucide-react";
import { IResult } from "mssql";
import { Session } from "next-auth";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModuleIconsComponent from "./module-icons";

interface IProps {
  modulesByUser: IResult<IDataDBSidebar>;
  session: Session | null;
}

export default function TopBarComponent(props: IProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { stateSidebar, setStateSidebar } = useGestionEstudiantesLogged();

  return (
    <header className="sticky top-0 z-20 w-full flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 bg-background border-l">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-light">
            <SheetClose asChild>
              <Link href="/" className="flex items-center gap-2">
                <span className="mb-2">SGPU</span>
              </Link>
            </SheetClose>
            {props.modulesByUser.recordset.map((module) => {
              return (
                <SheetClose asChild key={module.Mod_Id}>
                  <Link
                    href={`/dashboard/${module.Mod_Nombre.toLowerCase()}s`}
                    key={module.Mod_Id}
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
                </SheetClose>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        {!stateSidebar && (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 hidden md:flex"
            onClick={() => {
              setStateSidebar(!stateSidebar);
            }}
          >
            <SidebarOpen className="h-5 w-5" />
          </Button>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="space-y-1">
            <h4 className="text-sm font-medium leading-none">
              {props.session?.user?.name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {props.session?.user?.email}
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/configuracion"
                className="flex items-center w-full"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Tema</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={() => setTheme("system")}
                  >
                    <ComputerIcon className="w-3" />
                    <span className="text-xs">Sistema</span>
                    {theme === "system" && <CheckIcon className="w-3" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={() => setTheme("light")}
                  >
                    <SunIcon className="w-3" />
                    <span className="text-xs">Claro</span>
                    {theme === "light" && <CheckIcon className="w-3" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={() => setTheme("dark")}
                  >
                    <MoonIcon className="w-3" />
                    <span className="text-xs">Oscuro</span>
                    {theme === "dark" && <CheckIcon className="w-3" />}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a
              target="_blank"
              href="https://github.com/cuevacelis/sistema-gestion-precios-unitarios"
            >
              <GitHubLogoIcon className="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Soporte</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-red-500 hover:text-red-600"
            onClick={async () => {
              await actionsSignOut();
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
