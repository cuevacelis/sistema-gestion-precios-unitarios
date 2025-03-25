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
import { useSidebar } from "@/components/ui/sidebar";
import ValidateMutation from "@/components/validate/validateMutation";
import { useAblySuscription } from "@/context/context-ably-suscription";
import { actionsSignOut } from "@/lib/actions/actions";
import type {
	ISpModuloObtenerModulosXPusuario,
	TStatusResponseActions,
} from "@/lib/types/types";
import { obtenerHoraRelativa, obtenerSiglas } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
	Bell,
	BellOff,
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
import type { Session } from "next-auth";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

const BreadcrumbResponsive = dynamic(
	() => import("@/components/breadcrumbs/breadcrumbResponsive"),
	{ ssr: false },
);

interface IProps {
	modulesByUser: ISpModuloObtenerModulosXPusuario[];
	session: Session | null;
}

export default function TopBarComponent(props: IProps) {
	const { state: stateSidebar, toggleSidebar, isMobile } = useSidebar();
	const { theme, setTheme } = useTheme();
	const { messagesNotification, setMessagesNotification } =
		useAblySuscription();
	const [statusRespLogout, setStatusRespLogout] =
		useState<TStatusResponseActions>("idle");

	// Filtrar notificaciones no leídas
	const unreadNotifications = messagesNotification.filter(
		(notification) => !notification.extras.isRead,
	);

	const markAsRead = (id: string) => {
		setMessagesNotification((prevState) => {
			const updatedNotifications = prevState.map((notification) =>
				notification.id === id
					? {
							...notification,
							extras: { ...notification.extras, isRead: true },
						}
					: notification,
			);

			// Guardar en localStorage
			// localStorage.setItem(
			//   "notifications",
			//   JSON.stringify(updatedNotifications)
			// );

			return updatedNotifications;
		});
	};

	return (
		<ValidateMutation statusMutation={[statusRespLogout]}>
			<header className="sticky top-0 z-20 w-full flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 border-l bg-background">
				<div className="flex flex-row flex-1 items-center gap-x-4">
					{isMobile && (
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8 flex"
							onClick={toggleSidebar}
						>
							<Menu className="h-5 w-5" />
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
							{messagesNotification.length === 0 ? (
								<div className="flex flex-col items-center justify-center h-full space-y-2">
									<BellOff className="h-12 w-12 text-muted-foreground" />
									<p className="text-muted-foreground text-sm font-medium">
										No hay notificaciones
									</p>
									<p className="text-muted-foreground text-xs text-center">
										Las notificaciones aparecerán aquí cuando las recibas
									</p>
								</div>
							) : (
								messagesNotification.map((notification, index) => (
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
												notification.data.action?.();
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
													new Date(
														Number(notification.timestamp),
													).toISOString(),
												)}
											</span>
										</div>
										<div
											className="col-span-1 flex items-center"
											onClick={(e) => {
												e.stopPropagation(); // Evita que el evento se propague al padre
												markAsRead(String(notification.id));
											}}
										>
											<span className="text-blue-500 text-3xl">
												{notification.extras.isRead ? "" : "."}
											</span>
										</div>
									</section>
								))
							)}
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
					<DropdownMenuContent align="end" className="w-56 p-2">
						<DropdownMenuLabel className="font-normal">
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">
									{props.session?.user?.name}
								</p>
								<p className="text-xs leading-none text-muted-foreground">
									{props.session?.user?.email}
								</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem asChild>
								<Link
									href="/dashboard/configuracion/general"
									className="flex items-center w-full cursor-pointer"
								>
									<User className="mr-2 h-4 w-4" />
									<span>Perfil</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link
									href="/dashboard/configuracion"
									className="flex items-center w-full cursor-pointer"
								>
									<Settings className="mr-2 h-4 w-4" />
									<span>Configuración</span>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger className="cursor-pointer">
									<span className="flex items-center">
										{theme === "light" ? (
											<SunIcon className="mr-2 h-4 w-4" />
										) : theme === "dark" ? (
											<MoonIcon className="mr-2 h-4 w-4" />
										) : (
											<ComputerIcon className="mr-2 h-4 w-4" />
										)}
										<span>Tema</span>
									</span>
								</DropdownMenuSubTrigger>
								<DropdownMenuPortal>
									<DropdownMenuSubContent>
										<DropdownMenuItem
											className="cursor-pointer"
											onClick={() => setTheme("system")}
										>
											<ComputerIcon className="mr-2 h-4 w-4" />
											<span>Sistema</span>
											{theme === "system" && (
												<CheckIcon className="ml-auto h-4 w-4" />
											)}
										</DropdownMenuItem>
										<DropdownMenuItem
											className="cursor-pointer"
											onClick={() => setTheme("light")}
										>
											<SunIcon className="mr-2 h-4 w-4" />
											<span>Claro</span>
											{theme === "light" && (
												<CheckIcon className="ml-auto h-4 w-4" />
											)}
										</DropdownMenuItem>
										<DropdownMenuItem
											className="cursor-pointer"
											onClick={() => setTheme("dark")}
										>
											<MoonIcon className="mr-2 h-4 w-4" />
											<span>Oscuro</span>
											{theme === "dark" && (
												<CheckIcon className="ml-auto h-4 w-4" />
											)}
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
								className="flex items-center cursor-pointer"
								rel="noreferrer"
							>
								<GitHubLogoIcon className="mr-2 h-4 w-4" />
								<span>GitHub</span>
							</a>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950"
							onClick={async () => {
								setStatusRespLogout("pending");
								await actionsSignOut();
								setStatusRespLogout("idle");
							}}
						>
							<LogOut className="mr-2 h-4 w-4" />
							<span>Cerrar sesión</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</header>
		</ValidateMutation>
	);
}
