"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { actionsSignOut } from "@/lib/actions";
import { modulo } from "@prisma/client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  CircleUser,
  ComputerIcon,
  LifeBuoy,
  LogOut,
  Menu,
  MoonIcon,
  Settings,
  SunIcon,
  User,
} from "lucide-react";
import { Session } from "next-auth";
import { useTheme } from "next-themes";
import Link from "next/link";
import ModuleIconsComponent from "./module-icons";

interface IProps {
  modulesByUser: modulo[];
  session: Session | null;
}

export default function TopBarComponent(props: IProps) {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-10 w-full flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            {props.modulesByUser.map((module) => {
              return (
                <Link
                  href={`/dashboard/${module.Mod_Nombre.toLowerCase()}s`}
                  key={module.Mod_Id}
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <ModuleIconsComponent modNombre={module.Mod_Nombre} />
                  {module.Mod_Nombre + "s"}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        {/* <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form> */}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
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
            <DropdownMenuItem>
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
            <DropdownMenuItem>
              <span>Tema</span>
              <DropdownMenuShortcut>
                <Select
                  defaultValue={theme}
                  onValueChange={(newValue) => setTheme(newValue)}
                >
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="system">
                        <SelectLabel className="flex flex-row gap-1 items-center text-left">
                          <ComputerIcon className="w-3" />
                          <span className="text-xs">Sistema</span>
                        </SelectLabel>
                      </SelectItem>
                      <SelectItem value="light">
                        <SelectLabel className="flex flex-row gap-1 items-center text-left">
                          <SunIcon className="w-3" />
                          <span className="text-xs">Claro</span>
                        </SelectLabel>
                      </SelectItem>
                      <SelectItem value="dark">
                        <SelectLabel className="flex flex-row gap-1 items-center text-left">
                          <MoonIcon className="w-3" />
                          <span className="text-xs">Oscuro</span>
                        </SelectLabel>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <a
              className="flex items-center w-full"
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
