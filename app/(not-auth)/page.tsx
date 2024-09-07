import imgBeneficio1 from "@/resources/images/beneficios1.jpg";
import imgBeneficio2 from "@/resources/images/beneficios2.jpg";
import imgHome from "@/resources/images/logo.jpeg";
import backgroundSection1 from "@/resources/images/mejores-construccion-software.png";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SGPU",
  description:
    "Programa de precios unitarios en línea con análisis y rendimiento de costos para obra pública y privada.",
};

export default async function HomePage() {
  return (
    <section className="flex flex-col items-center justify-between">
      <section className="flex flex-col gap-4 items-center mx-10 mt-10 mb-20 object-center lg:flex-row md:gap-40">
        <div className="flex flex-col">
          <h1 className="text-foreground text-4xl lg:text-5xl text-center sm:text-left">
            La Plataforma Colaborativa para Proyectos de Obra y Precios
            Unitarios
            <br />
          </h1>
          <p className="text-foreground/80 dark:text-foreground/60 text-lg mt-5">
            Software que permite elaborar proyectos por obra, y considera los
            de tipo venta, meta y línea Base.
          </p>
          <p className="text-foreground/80 dark:text-foreground/60 text-lg mt-5">
            Los cuales son asignados a proyectos que serán realizados para la
            planificación y control de labores que se realizan en el modulo de
            gerencia de proyectos
          </p>
          <Link
            href="/login"
            className="transition-colors hover:text-foreground/80 text-foreground/60 bg-primary text-white px-4 py-2 rounded-md mt-4 items-center justify-center flex sm:hidden"
          >
            Iniciar sesión
          </Link>
        </div>
        <div className="flex justify-center">
          <Image
            className="w-70 md:w-80 lg:w-full"
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
          <Link
            href="/login"
            className="transition-colors hover:text-foreground/80 text-foreground bg-primary text-white px-4 py-2 rounded-md mt-4 items-center justify-center flex"
          >
            Iniciar sesión
          </Link>
        </div>
      </section>

      <section className="flex items-center flex-wrap flex-col mb-20 mx-4 md:mx-10 lg:mx-20">
        <p className="text-lg text-orange-300 mb-5">BENEFICIOS</p>
        <p className="text-4xl mb-5">Sácale más provecho a Proyectos</p>
        <p className="text-black dark:text-[#EDEDED] text-lg opacity-50 mb-8 text-center">
          Este módulo cuenta con una variedad de funciones que te permitirán
          hacer más que sólo proyectos
        </p>
        <div className="flex flex-col lg:flex-row gap-3 mb-16">
          <Image
            className="w-full lg:w-1/2"
            src={imgBeneficio1}
            alt="beneficio 2"
            placeholder="blur"
          />
          <ul className="list-disc list-inside text-black dark:text-[#EDEDED] text-lg opacity-70 p-4 lg:w-1/2">
            <li>
              Definición de títulos, partidas y recursos por tipo y familia
            </li>
            <li>Creación de proyectos y sub-proyectos venta y meta</li>
            <li>Análisis de precios unitarios</li>
            <li>Análisis de subpartidas</li>
            <li>Formulación de conceptos de pie de presupuesto</li>
            <li>Elaboración fórmula polinómica.</li>
          </ul>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 mb-10">
          <ul className="list-disc list-inside text-black dark:text-[#EDEDED] text-lg opacity-70 p-4 lg:w-1/2">
            <li>Registro de proyecto y asignación proyectos a planificar</li>
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
            className="w-full lg:w-1/2"
            src={imgBeneficio2}
            alt="beneficio 1"
            placeholder="blur"
          />
        </div>
      </section>
    </section>
  );
}
