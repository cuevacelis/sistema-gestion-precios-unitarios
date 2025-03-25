"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import type { ISpModuloObtenerModulosXPusuario } from "@/lib/types/types";
import { cn, convertirEspaciosAGuionesBajos } from "@/lib/utils";
import {
	ChevronLeft,
	ChevronRight,
	Home,
	PanelLeftCloseIcon,
	PanelRightCloseIcon,
} from "lucide-react";
import type { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModuleIconsComponent from "./module-icons";

interface SidebarProps {
	session: Session | null;
	modulesByUser: ISpModuloObtenerModulosXPusuario[];
}

export default function SidebarComponent({
	session,
	modulesByUser,
}: SidebarProps) {
	const pathname = usePathname();
	const { toggleSidebar, state: stateSidebar } = useSidebar();

	return (
		<Sidebar className="border-r" collapsible="icon">
			<SidebarHeader className="pt-4">
				<div className="flex items-center justify-between">
					{stateSidebar === "expanded" && (
						<Link href="/" className="flex items-center">
							<span className="ml-2 font-bold text-lg bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent transition-all duration-300 ease-in-out transform group-hover:scale-105">
								CALCPU
							</span>
						</Link>
					)}
					<Button
						variant="ghost"
						size="icon"
						className="ml-auto"
						onClick={toggleSidebar}
					>
						{stateSidebar === "expanded" ? (
							<PanelLeftCloseIcon className="h-4 w-4" />
						) : (
							<PanelRightCloseIcon className="h-4 w-4" />
						)}
					</Button>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<ScrollArea className="h-[calc(100vh-5rem)]">
					<SidebarGroup>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton asChild>
										<Link
											href="/dashboard"
											className={cn(
												"flex items-center rounded-lg text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
												pathname === "/dashboard" &&
													"bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
											)}
										>
											<Home className="h-5 w-5" />
											<span>Inicio</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
								{modulesByUser.map((module) => (
									<SidebarMenuItem key={module.mod_nombre}>
										<SidebarMenuButton asChild>
											<Link
												href={`/dashboard/${convertirEspaciosAGuionesBajos(module.mod_nombre.toLowerCase())}`}
												className={cn(
													"flex items-center rounded-lg text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
													pathname.startsWith(
														`/dashboard/${convertirEspaciosAGuionesBajos(module.mod_nombre.toLowerCase())}`,
													) &&
														"bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
												)}
											>
												<ModuleIconsComponent
													className="h-5 w-5"
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
				</ScrollArea>
			</SidebarContent>
		</Sidebar>
	);
}
