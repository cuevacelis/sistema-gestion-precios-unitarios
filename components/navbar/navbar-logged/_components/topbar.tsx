"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { ISpModuloObtenerModulosXPusuario } from "@/lib/types";
import { cn, obtenerHoraRelativa, obtenerSiglas } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  Bell,
  CheckIcon,
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
import { Session } from "next-auth";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModuleIconsComponent from "./module-icons";
import { useAblySuscription } from "@/context/context-ably-suscription";

const BreadcrumbResponsive = dynamic(
  () => import("@/components/breadcrumbs/breadcrumbResponsive"),
  { ssr: false }
);

interface IProps {
  modulesByUser: ISpModuloObtenerModulosXPusuario[];
  session: Session | null;
}

export default function TopBarComponent(props: IProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { stateSidebar, setStateSidebar } = useGestionEstudiantesLogged();
  const { messagesNotification, setMessagesNotification } =
    useAblySuscription();

  // Filtrar notificaciones no leídas
  const unreadNotifications = messagesNotification.filter(
    (notification) => !notification.extras.isRead
  );

  const markAsRead = (id: string) => {
    setMessagesNotification((prevState) => {
      const updatedNotifications = prevState.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              extras: { ...notification.extras, isRead: true },
            }
          : notification
      );

      // Guardar en localStorage
      localStorage.setItem(
        "notifications",
        JSON.stringify(updatedNotifications)
      );

      return updatedNotifications;
    });
  };

  return (
    <header className="sticky top-0 z-20 w-full flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 border-l bg-background">
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
            {props.modulesByUser.map((module) => {
              return (
                <SheetClose asChild key={module.mod_nombre}>
                  <Link
                    href={`/dashboard/${module.mod_nombre.toLowerCase()}s`}
                    key={module.mod_nombre}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 mt-4 transition-all hover:text-primary",
                      pathname.startsWith(
                        `/dashboard/${module.mod_nombre.toLowerCase()}s`
                      ) && "bg-muted text-primary"
                    )}
                  >
                    <ModuleIconsComponent modNombre={module.mod_nombre} />
                    {module.mod_nombre}
                  </Link>
                </SheetClose>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex flex-row flex-1 items-center gap-x-4">
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
        <BreadcrumbResponsive />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full relative"
          >
            <Bell className="h-5 w-5" />
            {unreadNotifications.length > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                {unreadNotifications.length}
              </span>
            )}
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
          <section className="flex flex-col gap-2 overflow-y-auto h-96 my-2">
            {messagesNotification.map((notification, index) => (
              <section
                key={index}
                className="bg-transparent hover:bg-secondary cursor-pointer grid grid-cols-9 gap-4 mx-2 p-1 rounded-sm"
                onClick={() => {
                  if (notification.data.link) {
                    const a = document.createElement("a");
                    a.href = notification.data.link;
                    a.download = "";
                    a.target = "_blank";
                    a.click();
                  } else {
                    notification.data.action && notification.data.action();
                  }
                  markAsRead(String(notification.id));
                }}
              >
                <div className="col-span-2">
                  <Avatar className="w-14 h-14">
                    <AvatarImage
                      src={
                        "https://scontent.ftru3-1.fna.fbcdn.net/v/t39.30808-1/369992082_6467305320033929_2090341200948135217_n.jpg?stp=cp0_dst-jpg_p56x56&_nc_cat=104&ccb=1-7&_nc_sid=6738e8&_nc_eui2=AeFzzZfFe2X4LzLcNx-Zq83OSkQE4FTtwUZKRATgVO3BRjnjaIp6esV1axwv50sdcOxMx1uQle-jOjYrUPO4cyeC&_nc_ohc=gjbd7-ZC3sEQ7kNvgH97Giv&_nc_ht=scontent.ftru3-1.fna&oh=00_AYDm0t5E53qZAfGDYuckbqoLn5OkFv_n9pSaoZfmzh35hQ&oe=66A46DB2"
                      }
                      alt="Avatar"
                      className="rounded-full"
                    />
                    <AvatarFallback>
                      {obtenerSiglas(String(props.session?.user?.name))}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="col-span-6">
                  <p className="text-sm font-medium truncate">
                    {notification.data.title}
                  </p>
                  <p className="text-sm text-muted-foreground truncate-multiline">
                    {notification.data.body}
                  </p>
                  <span className="text-sm text-muted-foreground text-blue-500">
                    {obtenerHoraRelativa(
                      new Date(Number(notification.timestamp)),
                      "America/Lima"
                    )}
                  </span>
                </div>
                <div className="col-span-1 flex items-center">
                  <span className="text-blue-500 text-3xl">
                    {notification.extras.isRead ? "" : "."}
                  </span>
                </div>
              </section>
            ))}
          </section>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>
              {obtenerSiglas(String(props.session?.user?.name))}
            </AvatarFallback>
          </Avatar>
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
