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
import { obtenerProyectosPaginados } from "@/lib/services/sql-queries";
import {
  ArrowRight,
  FolderTree,
  Package,
  RocketIcon,
  Users,
} from "lucide-react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

const TableComponent = dynamic(
  () => import("./_components/data-table-proyectos"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-10 w-full" />,
  }
);

export default async function DashboardPage() {
  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Control</h1>
      <Alert>
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>Indices de precios unificados</AlertTitle>
        <AlertDescription>
          Te recomendamos que uses el índice de precios unificados, para la
          creación de precios unitarios.{" "}
          <Link
            href="https://busquedas.elperuano.pe/dispositivo/NL/2299081-1"
            target="_blank"
            className="underline"
          >
            Más información
          </Link>
        </AlertDescription>
      </Alert>
      <Card className="my-6">
        <CardHeader>
          <CardTitle>Proyectos Recientes</CardTitle>
          <CardDescription>
            Los últimos 5 proyectos añadidos al sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="h-32 w-full" />}>
            <GetDataTable />
          </Suspense>
        </CardContent>
        <CardFooter>
          <Button asChild variant="default">
            <Link href="/dashboard/proyectos">Mostrar todos</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>
            Accesos directos a funciones comunes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Nuevo Proyecto",
                href: "/dashboard/proyectos/crear",
                icon: FolderTree,
              },
              {
                title: "Añadir Cliente",
                href: "/dashboard/clientes/crear",
                icon: Users,
              },
              {
                title: "Gestionar Recursos",
                href: "/dashboard/recursos",
                icon: Package,
              },
            ].map((action, index) => (
              <Link key={index} href={action.href}>
                <Button variant="outline" className="w-full justify-start">
                  <action.icon className="mr-2 h-4 w-4" />
                  {action.title}
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

async function GetDataTable() {
  const session = await auth();
  const dataProyectos = await obtenerProyectosPaginados(
    String(session?.user?.id),
    5,
    1,
    ""
  );

  return <TableComponent dataProyectos={dataProyectos} />;
}
