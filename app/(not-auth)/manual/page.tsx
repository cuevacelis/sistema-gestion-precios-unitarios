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
              <li>
                Ingrese sus credenciales proporcionadas por la administración
              </li>
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
              Dentro del sistema, podrá gestionar los precios unitarios de
              diferentes servicios y productos. Las principales funciones
              incluyen:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Añadir nuevos precios unitarios</li>
              <li>Actualizar precios existentes</li>
              <li>Generar análisis de costos</li>
              <li>Comparar precios entre diferentes proyectos</li>
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
              <li>Resúmenes de presupuestos</li>
            </ul>
            <p className="mt-2">
              Para generar un reporte, vaya a la sección Reportes y seleccione
              el tipo de informe que desea crear.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="support">
          <AccordionTrigger>
            <div className="flex items-center">
              <HelpCircle className="mr-2 h-5 w-5" />
              Soporte
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p>Aun no disponible.</p>
            {/* <p>
              Si necesita asistencia o tiene alguna duda, puede contactar al
              equipo de soporte técnico de las siguientes maneras:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>A través de la sección de contacto en el sistema</li>
              <li>Enviando un correo electrónico a soporte@sgpu.com</li>
              <li>
                Llamando al número de atención al cliente: +1 (123) 456-7890
              </li>
            </ul>
            <Button asChild className="mt-4">
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" />
                Contactar Soporte
              </Link>
            </Button> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
