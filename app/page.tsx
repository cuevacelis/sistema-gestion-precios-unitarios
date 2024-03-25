import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Metadata } from "next";
import Image from "next/image";
import imgBeneficio1 from "./_resources/images/beneficios1.jpg";
import imgBeneficio2 from "./_resources/images/beneficios2.jpg";
import imgHome from "./_resources/images/logo.jpeg";
import backgroundSection1 from "./_resources/images/mejores-construccion-software.png";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Programa de precios unitarios en línea con análisis y rendimiento de costos para obra pública y privada.",
};

export default async function HomePage() {
  return (
    <main className="flex flex-col items-center justify-between">
      <section className="flex flex-col gap-4 items-center mx-10 mt-10 mb-20 object-center md:flex-row md:gap-40">
        <div className="flex flex-col">
          <h1 className="text-black dark:text-stone-300 text-5xl text-center sm:text-left">
            La Plataforma Colaborativa para Presupuestos de Obra y Precios
            Unitarios
            <br />
          </h1>
          <p className="text-black dark:text-[#EDEDED] text-lg opacity-50 mt-5">
            Software que permite elaborar presupuestos por obra, y considera los
            de tipo venta, meta y línea Base.
          </p>
          <p className="text-black dark:text-[#EDEDED] text-lg opacity-50 mt-5">
            Los cuales son asignados a proyectos que serán realizados para la
            planificación y control de labores que se realizan en el modulo de
            gerencia de proyectos
          </p>
          <Button
            href="/login"
            as={Link}
            color="primary"
            className="w-fit mt-5"
          >
            Inicia sesión
          </Button>
        </div>
        <div className="flex justify-center">
          <Image
            className="w-1/2 sm:w-full"
            src={imgHome}
            alt="sistema de gestion de precios unitarios"
            placeholder="blur"
          />
        </div>
      </section>

      <section className="relative w-full h-48 mb-20">
        <Image
          className="object-cover z-[-1]"
          src={backgroundSection1}
          alt="sistema de gestion de precios unitarios"
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
        />
        <div className="flex flex-row text-center items-center justify-around h-full flex-wrap">
          <p className="text-2xl text-white">
            Gestiona tus proyectos de construcción de manera efectiva y
            eficiente
          </p>
          <Button
            href="/login"
            as={Link}
            color="primary"
            className="w-fit mt-5"
          >
            Inicia sesión
          </Button>
        </div>
      </section>

      <section className="flex items-center flex-wrap flex-col mb-20">
        <p className="text-lg text-orange-300 mb-5">BENEFICIOS</p>
        <p className="text-4xl mb-5">Sácale más provecho a Presupuestos</p>
        <p className="text-black dark:text-[#EDEDED] text-lg opacity-50 mb-8">
          Este módulo cuenta con una variedad de funciones que te permitirán
          hacer más que sólo presupuestos
        </p>
        <div className="flex flex-row gap-3 mb-16">
          <Image
            className="w-60"
            src={imgBeneficio1}
            alt="beneficio 2"
            placeholder="blur"
          />
          <ul className="list-disc list-inside text-black dark:text-[#EDEDED] text-lg opacity-70">
            <li>
              Definición de títulos, partidas y recursos por tipo y familia
            </li>
            <li>Creación de presupuestos y sub-presupuestos venta y meta</li>
            <li>Análisis de precios unitarios</li>
            <li>Análisis de subpartidas</li>
            <li>Formulación de conceptos de pie de presupuesto</li>
            <li>Elaboración fórmula polinómica.</li>
          </ul>
        </div>

        <div className="flex flex-row gap-3 mb-10">
          <ul className="list-disc list-inside text-black dark:text-[#EDEDED] text-lg opacity-70">
            <li>Registro de proyecto y asignación presupuestos a planificar</li>
            <li>Definición de calendario</li>
            <li>Registro de wbs y asignación de partidas</li>
            <li>Administración de los periodos</li>
            <li>Registro de la planificación por metrados y/o porcentajes</li>
            <li>Registro de avances por metrados y/o porcentajes</li>
            <li>Planificación automática de utilización de recursos.</li>
            <li>Sincronización con Microsoft Project y Excel</li>
            <li>Reportes varios por análisis y según los formatos de país</li>
          </ul>
          <Image
            className="w-60"
            src={imgBeneficio2}
            alt="beneficio 1"
            placeholder="blur"
          />
        </div>
      </section>
    </main>
  );
}
