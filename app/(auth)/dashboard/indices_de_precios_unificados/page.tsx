import { Suspense } from "react";
import { obtenerPreciosRecomendados } from "@/lib/services/sql-queries";
import IndicesDePreciosUnificados from "./_components/content-page";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExternalLinkIcon, RocketIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IProjectPage {}

export default async function IndicesDePreciosUnificadosPage({}: IProjectPage) {
  return (
    <div className="container p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Índices de Precios Unificados</h1>

      <Alert
        className="mb-6 border-blue-200 dark:border-blue-800"
        variant={"default"}
      >
        <RocketIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-800 dark:text-blue-200">
          Fuente Oficial
        </AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          Los datos presentados en esta página provienen de una fuente oficial
          que recopila y unifica los índices de precios para la construcción en
          seis áreas del país.{" "}
          <Link
            href="https://busquedas.elperuano.pe/?start=0&query=indices+Unificados+de+Precios+de+la+Construccion"
            target="_blank"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            Ver fuente
            <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </AlertDescription>
      </Alert>
      <Suspense fallback={<SkeletonLoadingIndicesDePreciosUnificados />}>
        <GetDataIndicesDePreciosUnificados />
      </Suspense>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Leyenda de Áreas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <strong>Área 1:</strong> Tumbes, Piura, Lambayeque, La Libertad,
              Cajamarca, Amazonas y San Martín.
            </li>
            <li>
              <strong>Área 2:</strong> Ancash, Lima, Provincia Constitucional
              del Callao e Ica.
            </li>
            <li>
              <strong>Área 3:</strong> Huánuco, Pasco, Junín, Huancavelica,
              Ayacucho y Ucayali.
            </li>
            <li>
              <strong>Área 4:</strong> Arequipa, Moquegua y Tacna.
            </li>
            <li>
              <strong>Área 5:</strong> Loreto.
            </li>
            <li>
              <strong>Área 6:</strong> Cusco, Puno, Apurímac y Madre de Dios.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            ¿Qué son los Índices unificados de precios para la construcción?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Los Índices unificados de precios para la construcción son
            indicadores que muestran la variación de precios de los recursos de
            construcción en diferentes regiones del país.
          </p>
          <div className="space-y-2">
            <h3 className="font-medium">
              Estos índices son fundamentales para:
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>
                Comparar costos de recursos entre diferentes áreas geográficas
              </li>
              <li>Analizar tendencias de precios a lo largo del tiempo</li>
              <li>
                Facilitar la toma de decisiones en proyectos de construcción
              </li>
              <li>
                Proporcionar una base para ajustes de contratos y presupuestos
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

async function GetDataIndicesDePreciosUnificados() {
  const dataIndicesDePreciosUnificados = await obtenerPreciosRecomendados();
  return (
    <IndicesDePreciosUnificados
      dataIndicesDePreciosUnificados={dataIndicesDePreciosUnificados}
    />
  );
}

export function SkeletonLoadingIndicesDePreciosUnificados() {
  return (
    <div className="w-full space-y-4 p-4">
      <div className="flex items-center justify-center py-4">
        <div className="text-center space-y-2">
          <div className="text-xl text-muted-foreground animate-pulse">
            Cargando datos de índices de precios unificados, por favor espere...
          </div>
          <div className="flex justify-center gap-1">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/20 animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 rounded-full bg-muted-foreground/20 animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 rounded-full bg-muted-foreground/20 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
