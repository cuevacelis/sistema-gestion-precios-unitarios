"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { obtenerPreciosRecomendados } from "@/lib/services/sql-queries";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "lucide-react";
import Link from "next/link";
import ComboboxSingleSelection from "@/components/combobox/combobox-single-selection";
import ContainerInput from "@/components/ui/container-input";
import { useMediaQuery } from "usehooks-ts";

const chartConfig = {
  date1: {
    label: "Fecha 1",
    color: "hsl(var(--chart-1))",
  },
  date2: {
    label: "Fecha 2",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface IProps {
  dataIndicesDePreciosUnificados: Awaited<
    ReturnType<typeof obtenerPreciosRecomendados>
  >;
}

export default function IndicesDePreciosUnificados({
  dataIndicesDePreciosUnificados,
}: IProps) {
  const uniqueRecursos = Array.from(
    new Set(dataIndicesDePreciosUnificados.map((item) => item.nombre))
  );
  const uniqueDates = Array.from(
    new Set(
      dataIndicesDePreciosUnificados.map((item) =>
        item.fecha_publicacion?.toISOString()
      )
    )
  );
  const [selectedRecurso, setSelectedRecurso] = useState(
    uniqueRecursos[0] || ""
  );
  const [selectedDate1, setSelectedDate1] = useState(uniqueDates[0] || null);
  const [selectedDate2, setSelectedDate2] = useState(uniqueDates[1] || null);
  const isMobile = useMediaQuery("(max-width: 640px)")

  const filteredData = useMemo(() => {
    return dataIndicesDePreciosUnificados.filter(
      (item) => item.nombre === selectedRecurso
    );
  }, [selectedRecurso]);

  const dateComparisonData = useMemo(() => {
    if (!selectedDate1 || !selectedDate2) return [];

    const date1Data = filteredData.filter(
      (item) => item.fecha_publicacion?.toISOString() === selectedDate1
    );
    const date2Data = filteredData.filter(
      (item) => item.fecha_publicacion?.toISOString() === selectedDate2
    );

    const date1Label = new Date(selectedDate1).toLocaleDateString();
    const date2Label = new Date(selectedDate2).toLocaleDateString();

    const allAreas = Array.from(
      new Set([...date1Data, ...date2Data].map((item) => item.codigo_area))
    );

    return allAreas.map((area) => {
      const date1Item = date1Data.find((item) => item.codigo_area === area);
      const date2Item = date2Data.find((item) => item.codigo_area === area);
      return {
        area: `Área ${area}`,
        [date1Label]: date1Item ? parseFloat(String(date1Item?.precio)) : null,
        [date2Label]: date2Item ? parseFloat(String(date2Item?.precio)) : null,
      };
    });
  }, [filteredData, selectedDate1, selectedDate2]);

  const recursosOptions = uniqueRecursos.map((recurso) => ({
    value: String(recurso),
    label: String(recurso),
  }));

  const datesOptions = uniqueDates.map((date) => ({
    value: String(date),
    label: new Date(String(date)).toLocaleDateString(),
  }));

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Índices de Precios Unificados</h1>

      <Alert className="mb-6" variant={"default"}>
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>Nota</AlertTitle>
        <AlertDescription>
          Los datos presentados en esta página provienen de una fuente oficial
          que recopila y unifica los índices de precios de recursoes de
          construcción en diferentes áreas y departamentos de Perú.
          <Link
            href="https://busquedas.elperuano.pe/dispositivo/NL/2335224-1"
            target="_blank"
            className="ml-2 underline underline-offset-4"
          >
            Ver fuente de datos
          </Link>
        </AlertDescription>
      </Alert>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Seleccionar Recurso y Fechas</CardTitle>
          <CardDescription>
            Elija un recurso y dos fechas para comparar los precios por área
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <ContainerInput
            nameLabel={"Recurso"}
            htmlFor="recurso"
            icon={"recurso"}
            className="col-span-2"
          >
            <ComboboxSingleSelection
              options={recursosOptions}
              onSelect={(value) => setSelectedRecurso(value || "")}
              placeholder="Seleccione un recurso"
              value={selectedRecurso}
              className="w-[200px]"
            />
          </ContainerInput>
          <ContainerInput
            nameLabel={"Fecha 1"}
            htmlFor="fecha1"
            icon={"fecha"}
            className="col-span-2"
          >
            <ComboboxSingleSelection
              options={datesOptions}
              onSelect={(value) => setSelectedDate1(value || "")}
              placeholder="Seleccione la primera fecha"
              value={selectedDate1}
              className="w-[200px]"
            />
          </ContainerInput>
          <ContainerInput
            nameLabel={"Fecha 2"}
            htmlFor="fecha2"
            icon={"fecha"}
            className="col-span-2"
          >
            <ComboboxSingleSelection
              options={datesOptions}
              onSelect={(value) => setSelectedDate2(value || "")}
              placeholder="Seleccione la segunda fecha"
              value={selectedDate2}
              className="w-[200px]"
            />
          </ContainerInput>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            Comparación de Precios por Fecha para {selectedRecurso}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="h-[300px] sm:h-[400px] md:h-[500px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dateComparisonData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="area"
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  angle={isMobile ? -45 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
                  height={isMobile ? 80 : 30}
                />
                <YAxis
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  width={isMobile ? 40 : 60}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend
                  wrapperStyle={{ fontSize: isMobile ? 10 : 12 }}
                  verticalAlign={isMobile ? "bottom" : "top"}
                  height={36}
                />
                {Object.keys(dateComparisonData[0] || {})
                  .filter((key) => key !== "area")
                  .map((dateKey, index) => (
                    <Line
                      key={dateKey}
                      type="monotone"
                      dataKey={dateKey}
                      stroke={
                        index === 0
                          ? chartConfig.date1.color
                          : chartConfig.date2.color
                      }
                      name={dateKey}
                      strokeWidth={2}
                    />
                  ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

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
          <CardTitle>¿Qué son los Índices de Precios Unificados?</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Los Índices de Precios Unificados son indicadores que muestran la
            variación de precios de los recursoes de construcción en diferentes
            regiones del país. Estos índices son fundamentales para:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              Comparar costos de recursoes entre diferentes áreas geográficas
            </li>
            <li>Analizar tendencias de precios a lo largo del tiempo</li>
            <li>
              Facilitar la toma de decisiones en proyectos de construcción
            </li>
            <li>
              Proporcionar una base para ajustes de contratos y presupuestos en
              el sector de la construcción
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
