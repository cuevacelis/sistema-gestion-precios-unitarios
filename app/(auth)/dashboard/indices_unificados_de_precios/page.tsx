import { Suspense } from "react";
import { obtenerPreciosRecomendados } from "@/lib/services/sql-queries";
import IndicesDePreciosUnificados from "./_components/content-page";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExternalLinkIcon, RocketIcon, InfoIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IProjectPage {}

export default async function IndicesDePreciosUnificadosPage({}: IProjectPage) {
  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Índices Unificados de Precios para la Construcción
      </h1>

      <Alert
        className="mb-8 border-blue-200 dark:border-blue-800 shadow-md"
        variant={"default"}
      >
        <RocketIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-lg font-semibold text-blue-800 dark:text-blue-200">
          Fuente Oficial
        </AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300 mt-2">
          <p className="mb-2">
            Los datos presentados en esta página provienen de una fuente oficial
            que recopila y unifica los índices de precios para la construcción
            en seis áreas del país.
          </p>
          <Link
            href="https://busquedas.elperuano.pe/?start=0&query=indices+Unificados+de+Precios+de+la+Construccion"
            target="_blank"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            Ver fuente
            <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <InfoIcon className="h-5 w-5 text-primary" />
              Leyenda de Áreas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              {[
                {
                  area: "Área 1",
                  regions:
                    "Tumbes, Piura, Lambayeque, La Libertad, Cajamarca, Amazonas y San Martín",
                },
                {
                  area: "Área 2",
                  regions:
                    "Ancash, Lima, Provincia Constitucional del Callao e Ica",
                },
                {
                  area: "Área 3",
                  regions:
                    "Huánuco, Pasco, Junín, Huancavelica, Ayacucho y Ucayali",
                },
                { area: "Área 4", regions: "Arequipa, Moquegua y Tacna" },
                { area: "Área 5", regions: "Loreto" },
                {
                  area: "Área 6",
                  regions: "Cusco, Puno, Apurímac y Madre de Dios",
                },
              ].map(({ area, regions }) => (
                <li key={area} className="flex">
                  <span className="font-semibold min-w-[60px]">{area}:</span>
                  <span className="text-muted-foreground">{regions}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <InfoIcon className="h-5 w-5 text-primary" />
              Sobre los Índices Unificados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Los Índices unificados de precios para la construcción son
              indicadores que muestran la variación de precios de los recursos
              de construcción en diferentes regiones del país.
            </p>
            <h3 className="font-medium mb-2">
              Estos índices son fundamentales para:
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
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
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Datos de Índices Unificados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<SkeletonLoadingIndicesDePreciosUnificados />}>
            <GetDataIndicesDePreciosUnificados />
          </Suspense>
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

function SkeletonLoadingIndicesDePreciosUnificados() {
  return (
    <div className="w-full space-y-4 p-4">
      <div className="flex items-center justify-center py-8">
        <div className="text-center space-y-4">
          <div className="text-xl text-muted-foreground animate-pulse">
            Cargando datos de índices unificados de precios, por favor espere...
          </div>
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-primary/20 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded-md animate-pulse" />
        ))}
      </div>
    </div>
  );
}
