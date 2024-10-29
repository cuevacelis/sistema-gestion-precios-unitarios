import { auth } from "@/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  obtenerProyectosPaginados,
  obtenerUltimaFechaPreciosRecomendados,
} from "@/lib/services/sql-queries";
import {
  ArrowRight,
  FileText,
  FolderTree,
  Package,
  RocketIcon,
  Users,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ProjectsRecents from "./_components/recents-projects";
import StatsIndicesDePreciosUnificados from "./_components/stats-inidices-precios-unificados";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <section className="container p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Panel de Control</h1>
        <Button asChild variant="outline">
          <Link href="/dashboard/configuracion/general">
            <Users className="mr-2 h-4 w-4" />
            Mi Perfil
          </Link>
        </Button>
      </div>

      <Alert className="border-blue-200 dark:border-blue-800">
        <RocketIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-800 dark:text-blue-200">
          Recomendación
        </AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          Te recomendamos que uses el índice unificado de precios, para la
          creación de precios unitarios.{" "}
          <Link
            href="/dashboard/indices_de_precios_unificados"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            Ver más
          </Link>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl">Proyectos Recientes</CardTitle>
            <CardDescription>
              Los últimos 5 proyectos añadidos al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <GetDataProjectsRecents />
            </Suspense>
          </CardContent>
          <CardFooter>
            <Button asChild variant="default">
              <Link href="/dashboard/proyectos">
                <ArrowRight className="mr-2 h-4 w-4" />
                Mostrar todos los proyectos
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Acciones Rápidas</CardTitle>
              <CardDescription>
                Accesos directos a funciones comunes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                {[
                  {
                    title: "Nuevo Proyecto",
                    href: "/dashboard/proyectos/crear",
                    icon: FolderTree,
                    color: "text-green-600 dark:text-green-400",
                  },
                  {
                    title: "Hoja de Presupuesto",
                    href: "/dashboard/hoja_del_presupuesto",
                    icon: FileText,
                    color: "text-blue-600 dark:text-blue-400",
                  },
                  {
                    title: "Gestionar Recursos",
                    href: "/dashboard/recursos",
                    icon: Package,
                    color: "text-purple-600 dark:text-purple-400",
                  },
                ].map((action, index) => (
                  <Link key={index} href={action.href}>
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <action.icon className={`mr-2 h-5 w-5 ${action.color}`} />
                      <span className="font-medium">{action.title}</span>
                      <ArrowRight className="ml-auto h-4 w-4" />
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Índices unificados</CardTitle>
              <CardDescription>
                Resumen de índices unificados de precios de la construcción
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-64 w-full" />}>
                <GetDataStatsIndicesDePreciosUnificados />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

async function GetDataProjectsRecents() {
  const session = await auth();
  const dataProyectos = await obtenerProyectosPaginados(
    String(session?.user?.id),
    5,
    1,
    ""
  );

  return <ProjectsRecents dataProyectos={dataProyectos} />;
}

async function GetDataStatsIndicesDePreciosUnificados() {
  const dataLastDateIndicesDePreciosUnificados =
    await obtenerUltimaFechaPreciosRecomendados();

  return (
    <StatsIndicesDePreciosUnificados
      dataLastDateIndicesDePreciosUnificados={
        dataLastDateIndicesDePreciosUnificados
      }
    />
  );
}
