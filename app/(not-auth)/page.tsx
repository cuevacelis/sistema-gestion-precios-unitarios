"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInterval } from "usehooks-ts";
import { TypeAnimation } from "react-type-animation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";

import imgBeneficio1 from "@/resources/images/beneficios1.jpg";
import imgBeneficio2 from "@/resources/images/beneficios2.jpg";
import imgHome1 from "@/resources/images/logo.jpeg";
import imgHome2 from "@/resources/images/home-sgpu-1.webp";
import imgHome3 from "@/resources/images/home-sgpu-3.webp";
import backgroundSection1 from "@/resources/images/mejores-construccion-software.png";

export default function HomePage() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [imgHome1, imgHome2, imgHome3];

  useInterval(() => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  }, 3000);

  return (
    <div className="flex flex-col items-center justify-between">
      <section className="container mx-auto px-4 py-16 md:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter">
              La Plataforma Colaborativa para Proyectos de Obra y Precios
              Unitarios
            </h1>
            <div className="text-lg text-muted-foreground">
              <TypeAnimation
                sequence={[
                  "Software que permite elaborar proyectos por obra, y considera los de tipo venta, meta y línea Base.",
                  1000,
                  "Los cuales son asignados a proyectos que serán realizados para la planificación y control de labores que se realizan en el modulo de gerencia de proyectos.",
                  1000,
                ]}
                wrapper="p"
                speed={55}
                repeat={Infinity}
              />
            </div>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/login">
                Iniciar sesión <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex-1 flex justify-center relative w-full h-[500px]">
            {images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Sistema de gestión de precios unitarios ${index + 1}`}
                className={`rounded-lg shadow-xl absolute transition-opacity duration-1000 ${
                  index === currentImage ? "opacity-100" : "opacity-0"
                }`}
                fill
                style={{ objectFit: "cover" }}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full py-24">
        <Image
          src={backgroundSection1}
          alt="Fondo de construcción"
          className="object-cover"
          fill
          sizes="100vw"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-2xl md:text-3xl text-white font-semibold max-w-2xl text-center md:text-left">
              Gestiona tus proyectos de construcción de manera efectiva y
              eficiente
            </p>
            <Button asChild size="lg" className="w-full md:w-auto">
              <Link href="/login">
                Iniciar sesión <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="text-lg text-primary font-semibold mb-4">BENEFICIOS</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sácale más provecho a Proyectos
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Este módulo cuenta con una variedad de funciones que te permitirán
            hacer más que sólo proyectos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <Image
            src={imgBeneficio1}
            alt="Beneficio 1"
            className="rounded-lg shadow-lg"
          />
          <Card>
            <CardHeader>
              <CardTitle>Características principales</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Definición de títulos, partidas y recursos por tipo y familia",
                  "Creación de proyectos y sub-proyectos venta y meta",
                  "Análisis de precios unitarios",
                  "Análisis de subpartidas",
                  "Formulación de conceptos de pie de presupuesto",
                  "Elaboración fórmula polinómica",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <Card className="md:order-2">
            <CardHeader>
              <CardTitle>Funcionalidades avanzadas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Registro de proyecto y asignación proyectos a planificar",
                  "Definición de calendario",
                  "Registro de wbs y asignación de partidas",
                  "Administración de los periodos",
                  "Registro de la planificación por metrados y/o porcentajes",
                  "Registro de avances por metrados y/o porcentajes",
                  "Planificación automática de utilización de recursos",
                  "Sincronización con Microsoft Project y Excel",
                  "Reportes varios por análisis y según los formatos de país",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Image
            src={imgBeneficio2}
            alt="Beneficio 2"
            className="rounded-lg shadow-lg md:order-1"
          />
        </div>
      </section>
    </div>
  );
}
