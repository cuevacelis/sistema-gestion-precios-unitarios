"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { ISpPresupuestoObtenPaginado } from "@/lib/types/types";
import { formatDateToDateTimeWith12HourFormat } from "@/lib/utils";
import { ArrowUpRight, Building, Calendar, MapPin, User } from "lucide-react";
import Link from "next/link";

interface IProps {
	dataProyectos: ISpPresupuestoObtenPaginado[];
}

export default function ProjectsRecents({ dataProyectos }: IProps) {
	const projects = dataProyectos[0]?.result?.data || [];

	return (
		<div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			{projects.map((project) => (
				<Card key={project.pre_id} className="flex flex-col h-full">
					<CardContent className="flex-grow p-4 sm:p-6">
						<h3 className="font-semibold text-base mb-2 leading-tight line-clamp-2">
							{project.pre_nombre}
						</h3>
						<div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
							<div className="flex items-center">
								<User className="mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
								<span className="truncate">{project.usu_nomapellidos}</span>
							</div>
							<div className="flex items-center">
								<Building className="mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
								<span className="truncate">{project.cli_nomaperazsocial}</span>
							</div>
							<div className="flex items-center">
								<MapPin className="mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
								<span className="truncate">{`${project.dist_nombre}, ${project.prov_nombre}, ${project.dep_nombre}`}</span>
							</div>
							<div className="flex items-center">
								<Calendar className="mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
								<span className="truncate">
									{formatDateToDateTimeWith12HourFormat(
										project.pre_fechorregistro,
									)}
								</span>
							</div>
						</div>
					</CardContent>
					<CardFooter className="p-4 sm:p-6 pt-0 sm:pt-0">
						<Link
							href={`/dashboard/proyectos/${project.pre_id}`}
							className="w-full"
							passHref
						>
							<Button variant="outline" className="w-full text-xs sm:text-sm">
								Ver detalles
								<ArrowUpRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
							</Button>
						</Link>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
