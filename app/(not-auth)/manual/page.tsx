import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BookOpen, LogIn, BarChart2, HelpCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manual de Usuario",
  description:
    "Guía detallada para utilizar el Cálculo de Precios Unitarios en línea con análisis y rendimiento de costos para obra pública y privada.",
};

export default function ManualPage() {
  return (
    <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Manual de Usuario
          </CardTitle>
          <CardDescription>Cálculo de Precios Unitarios</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Este manual proporciona una guía detallada para utilizar el Sistema
            de Gestión de Precios Unitarios, diseñado para el análisis y
            rendimiento de costos en obras públicas y privadas.
          </p>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="intro">
          <AccordionTrigger>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Introducción
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Este manual le guiará a través de las principales funcionalidades
              del sistema, asegurando que pueda aprovechar al máximo todas sus
              características.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="access">
          <AccordionTrigger>
            <div className="flex items-center">
              <LogIn className="mr-2 h-5 w-5" />
              Acceso al Sistema
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p>Para acceder al sistema, siga estos pasos:</p>
            <ol className="list-decimal list-inside mt-2">
              <li>Visite la página de inicio de sesión</li>
              <li>Ingrese sus credenciales</li>
              <li>Haga clic en &apos;Iniciar Sesión&apos;</li>
            </ol>
            <Button asChild className="mt-4">
              <Link href="/login">Ir a la página de inicio de sesión</Link>
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="prices">
          <AccordionTrigger>
            <div className="flex items-center">
              <BarChart2 className="mr-2 h-5 w-5" />
              Gestión de Precios
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Dentro del sistema, podrá gestionar proyectos de obra y precios
              unitarios. Las principales funciones incluyen:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Gestionar nuevos proyectos de obra</li>
              <li>Gestionar nuevos grupos de partidas</li>
              <li>Gestionar nuevos partidas</li>
              <li>Gestionar nuevos recursos</li>
              <li>Ver hojas de presupuesto</li>
              {/* <li>Comparar precios entre diferentes proyectos</li> */}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="reports">
          <AccordionTrigger>
            <div className="flex items-center">
              <BarChart2 className="mr-2 h-5 w-5" />
              Reportes
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p>
              El sistema permite generar diversos tipos de reportes, incluyendo:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Análisis de precios unitarios</li>
              <li>Comparativas de costos entre proyectos</li>
              <li>Evolución de precios a lo largo del tiempo</li>
              <li>Exportacion de proyectos de obra</li>
            </ul>
            {/* <p className="mt-2">
              Para generar un reporte, vaya a la sección Reportes y seleccione
              el tipo de informe que desea crear.
            </p> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
