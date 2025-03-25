import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	BarChart2,
	BookOpen,
	Database,
	FileSpreadsheet,
	FileText,
	FolderTree,
	HelpCircle,
	LogIn,
	Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Manual de Usuario - Cálculo de Precios Unitarios",
	description:
		"Guía detallada para utilizar el sistema de Cálculo de Precios Unitarios en línea con análisis y rendimiento de costos para obra pública y privada.",
};

export default function ManualPage() {
	return (
		<main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
			<Card className="mb-8">
				<CardHeader>
					<CardTitle className="text-3xl font-bold">
						Manual de Usuario
					</CardTitle>
					<CardDescription>
						Sistema de Cálculo de Precios Unitarios
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground">
						Este manual proporciona una guía detallada para utilizar el Sistema
						de Gestión de Precios Unitarios, diseñado para el análisis y
						rendimiento de costos en obras públicas y privadas. Aprenda a
						gestionar proyectos, partidas, recursos y generar reportes precisos.
					</p>
				</CardContent>
			</Card>

			<Accordion type="single" collapsible className="w-full space-y-4">
				<AccordionItem value="intro" className="border rounded-lg">
					<AccordionTrigger className="px-4">
						<div className="flex items-center">
							<BookOpen className="mr-2 h-5 w-5" />
							Introducción al Sistema
						</div>
					</AccordionTrigger>
					<AccordionContent className="px-4 pb-4">
						<p className="mb-2">
							El Sistema de Cálculo de Precios Unitarios es una herramienta
							integral diseñada para profesionales de la construcción. Ofrece:
						</p>
						<ul className="list-disc list-inside space-y-1">
							<li>Gestión eficiente de proyectos de construcción</li>
							<li>Cálculo preciso de precios unitarios</li>
							<li>Análisis detallado de costos y rendimientos</li>
							<li>Generación de reportes personalizados</li>
							<li>Interfaz intuitiva y fácil de usar</li>
						</ul>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="access" className="border rounded-lg">
					<AccordionTrigger className="px-4">
						<div className="flex items-center">
							<LogIn className="mr-2 h-5 w-5" />
							Acceso al Sistema
						</div>
					</AccordionTrigger>
					<AccordionContent className="px-4 pb-4">
						<p className="mb-2">Para acceder al sistema, siga estos pasos:</p>
						<ol className="list-decimal list-inside space-y-1">
							<li>Visite la página de inicio de sesión en su navegador</li>
							<li>Ingrese su nombre de usuario y contraseña proporcionados</li>
							<li>Haga clic en el botón &apos;Iniciar Sesión&apos;</li>
							<li>Si es su primera vez, se le pedirá cambiar su contraseña</li>
						</ol>
						<Button asChild className="mt-4">
							<Link href="/login">Ir a la página de inicio de sesión</Link>
						</Button>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="projects" className="border rounded-lg">
					<AccordionTrigger className="px-4">
						<div className="flex items-center">
							<FolderTree className="mr-2 h-5 w-5" />
							Gestión de Proyectos
						</div>
					</AccordionTrigger>
					<AccordionContent className="px-4 pb-4">
						<p className="mb-2">
							La gestión de proyectos es el núcleo del sistema. Aquí podrá:
						</p>
						<ul className="list-disc list-inside space-y-1">
							<li>Crear nuevos proyectos de obra</li>
							<li>Editar detalles de proyectos existentes</li>
							<li>Asignar personal y recursos a proyectos</li>
							<li>Establecer cronogramas y presupuestos</li>
							<li>Monitorear el progreso de los proyectos</li>
						</ul>
						<p className="mt-2">
							Para crear un nuevo proyecto, vaya a la sección
							&apos;Proyectos&apos; y haga clic en &apos;Nuevo Proyecto&apos;.
						</p>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="partidas" className="border rounded-lg">
					<AccordionTrigger className="px-4">
						<div className="flex items-center">
							<FileText className="mr-2 h-5 w-5" />
							Gestión de Partidas
						</div>
					</AccordionTrigger>
					<AccordionContent className="px-4 pb-4">
						<p className="mb-2">
							Las partidas son componentes esenciales de cada proyecto. En esta
							sección, usted puede:
						</p>
						<ul className="list-disc list-inside space-y-1">
							<li>Crear nuevos grupos de partidas</li>
							<li>Añadir partidas individuales a los grupos</li>
							<li>
								Definir los detalles de cada partida (descripción, unidad de
								medida, etc.)
							</li>
							<li>Asignar recursos y mano de obra a las partidas</li>
							<li>Calcular los costos unitarios de las partidas</li>
						</ul>
						<p className="mt-2">
							Para gestionar partidas, seleccione un proyecto y navegue a la
							sección &apos;Partidas&apos;.
						</p>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="resources" className="border rounded-lg">
					<AccordionTrigger className="px-4">
						<div className="flex items-center">
							<Database className="mr-2 h-5 w-5" />
							Gestión de Recursos
						</div>
					</AccordionTrigger>
					<AccordionContent className="px-4 pb-4">
						<p className="mb-2">
							La gestión eficiente de recursos es crucial para el éxito del
							proyecto. En esta sección puede:
						</p>
						<ul className="list-disc list-inside space-y-1">
							<li>
								Añadir nuevos recursos (materiales, equipos, mano de obra)
							</li>
							<li>Actualizar precios y disponibilidad de recursos</li>
							<li>Categorizar recursos para una fácil referencia</li>
							<li>Asignar recursos a partidas específicas</li>
							<li>Monitorear el uso de recursos en diferentes proyectos</li>
						</ul>
						<p className="mt-2">
							Acceda a la gestión de recursos desde el menú principal en
							&apos;Recursos&apos;.
						</p>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="budget" className="border rounded-lg">
					<AccordionTrigger className="px-4">
						<div className="flex items-center">
							<FileSpreadsheet className="mr-2 h-5 w-5" />
							Hojas de Presupuesto
						</div>
					</AccordionTrigger>
					<AccordionContent className="px-4 pb-4">
						<p className="mb-2">
							Las hojas de presupuesto proporcionan una visión general de los
							costos del proyecto. Aquí puede:
						</p>
						<ul className="list-disc list-inside space-y-1">
							<li>Generar hojas de presupuesto detalladas</li>
							<li>Visualizar el costo total del proyecto</li>
							<li>Desglosar costos por partidas y recursos</li>
							<li>Ajustar cantidades y precios según sea necesario</li>
							<li>Exportar presupuestos en varios formatos (PDF, Excel)</li>
						</ul>
						<p className="mt-2">
							Para acceder a las hojas de presupuesto, seleccione un proyecto y
							haga clic en &apos;Ver Presupuesto&apos;.
						</p>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="reports" className="border rounded-lg">
					<AccordionTrigger className="px-4">
						<div className="flex items-center">
							<BarChart2 className="mr-2 h-5 w-5" />
							Reportes y Análisis
						</div>
					</AccordionTrigger>
					<AccordionContent className="px-4 pb-4">
						<p className="mb-2">
							El sistema ofrece potentes herramientas de reportes y análisis:
						</p>
						<ul className="list-disc list-inside space-y-1">
							<li>Análisis detallado de precios unitarios</li>
							<li>Comparativas de costos entre diferentes proyectos</li>
							<li>
								Seguimiento de la evolución de precios a lo largo del tiempo
							</li>
							<li>Reportes de rendimiento de recursos y mano de obra</li>
							<li>Exportación de datos de proyectos completos</li>
						</ul>
						<p className="mt-2">
							Para generar un reporte, vaya a la sección &apos;Reportes&apos;,
							seleccione el tipo de informe deseado y configure los parámetros
							necesarios.
						</p>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="support" className="border rounded-lg">
					<AccordionTrigger className="px-4">
						<div className="flex items-center">
							<HelpCircle className="mr-2 h-5 w-5" />
							Soporte y Ayuda
						</div>
					</AccordionTrigger>
					<AccordionContent className="px-4 pb-4">
						<p className="mb-2">Si necesita ayuda adicional, puede:</p>
						<ul className="list-disc list-inside space-y-1">
							<li>Consultar la sección de Preguntas Frecuentes (FAQ)</li>
							<li>Ver tutoriales en video sobre funciones específicas</li>
							<li>
								Contactar al soporte técnico por correo electrónico o chat en
								vivo
							</li>
							<li>Solicitar una sesión de capacitación personalizada</li>
						</ul>
						<Button asChild className="mt-4">
							<Link href="/support">Acceder al Centro de Ayuda</Link>
						</Button>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</main>
	);
}
