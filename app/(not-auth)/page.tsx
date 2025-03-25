"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ArrowRight,
	BarChart2,
	CheckCircle,
	FileSpreadsheet,
	Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { useInterval } from "usehooks-ts";

import imgBeneficio1 from "@/resources/images/beneficios1.jpg";
import imgBeneficio2 from "@/resources/images/beneficios2.jpg";
import imgHome2 from "@/resources/images/home-sgpu-1.webp";
import imgHome3 from "@/resources/images/home-sgpu-3.webp";
import imgHome1 from "@/resources/images/logo.jpeg";
import backgroundSection1 from "@/resources/images/mejores-construccion-software.png";

export default function HomePage() {
	const [currentImage, setCurrentImage] = useState(0);
	const images = [imgHome1, imgHome2, imgHome3];

	useInterval(() => {
		setCurrentImage((prevImage) => (prevImage + 1) % images.length);
	}, 5000);

	return (
		<div className="flex flex-col items-center justify-between">
			<section className="w-full bg-gradient-to-b from-primary/10 to-background">
				<div className="container mx-auto px-4 py-20 md:py-32">
					<div className="flex flex-col lg:flex-row items-center gap-12">
						<div className="flex-1 space-y-8">
							<h1 className="text-4xl lg:text-6xl font-bold tracking-tighter leading-tight">
								CALCPU: Sistema de Gestión de Precios Unitarios
							</h1>
							<div className="text-xl text-muted-foreground h-24">
								<TypeAnimation
									sequence={[
										"Elabora proyectos por obra, incluyendo tipos venta, meta y línea base.",
										2000,
										"Planifica y controla labores en el módulo de gerencia de proyectos.",
										2000,
										"Optimiza la gestión de precios unitarios en la construcción.",
										2000,
									]}
									wrapper="p"
									speed={50}
									repeat={Number.POSITIVE_INFINITY}
								/>
							</div>
							<div className="flex gap-4">
								<Button asChild size="lg">
									<Link href="/login">
										Iniciar sesión <ArrowRight className="ml-2 h-5 w-5" />
									</Link>
								</Button>
								<Button asChild size="lg" variant="outline">
									<Link href="#beneficios">Ver funcionalidades</Link>
								</Button>
							</div>
						</div>
						<div className="flex-1 flex justify-center relative w-full h-[500px] rounded-lg overflow-hidden shadow-2xl">
							{images.map((img, index) => (
								<Image
									key={index}
									src={img}
									alt={`Sistema CALCPU ${index + 1}`}
									className={`absolute transition-opacity duration-1000 ${
										index === currentImage ? "opacity-100" : "opacity-0"
									}`}
									fill
									style={{ objectFit: "cover" }}
									priority={index === 0}
								/>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="w-full py-16 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-3 gap-8 text-center">
						<div className="space-y-2">
							<Users className="mx-auto h-12 w-12" />
							<h3 className="text-2xl font-semibold">Gestión de Clientes</h3>
							<p>Administra eficientemente los clientes de tus proyectos</p>
						</div>
						<div className="space-y-2">
							<BarChart2 className="mx-auto h-12 w-12" />
							<h3 className="text-2xl font-semibold">
								Análisis de Precios Unitarios
							</h3>
							<p>
								Realiza análisis detallados de precios unitarios y subpartidas
							</p>
						</div>
						<div className="space-y-2">
							<FileSpreadsheet className="mx-auto h-12 w-12" />
							<h3 className="text-2xl font-semibold">Exportación a Excel</h3>
							<p>Exporta fácilmente tus proyectos y datos a hojas de cálculo</p>
						</div>
					</div>
				</div>
			</section>

			<section className="relative w-full py-32">
				<Image
					src={backgroundSection1}
					alt="Fondo de construcción"
					className="object-cover"
					fill
					sizes="100vw"
					quality={100}
				/>
				<div className="absolute inset-0 bg-black/70" />
				<div className="container mx-auto px-4 relative z-10">
					<div className="flex flex-col md:flex-row items-center justify-between gap-8">
						<p className="text-3xl md:text-4xl text-white font-semibold max-w-2xl text-center md:text-left">
							Optimiza la gestión de tus proyectos de construcción con CALCPU
						</p>
						<Button asChild size="lg" className="w-full md:w-auto">
							<Link href="/login">
								Comenzar ahora <ArrowRight className="ml-2 h-5 w-5" />
							</Link>
						</Button>
					</div>
				</div>
			</section>

			<section
				id="beneficios"
				className="container mx-auto px-4 py-20 md:py-32"
			>
				<div className="text-center mb-16">
					<p className="text-lg text-primary font-semibold mb-4">
						FUNCIONALIDADES
					</p>
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						Características Principales de CALCPU
					</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Descubre las potentes herramientas que CALCPU ofrece para optimizar
						tus proyectos de construcción
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-16 mb-20">
					<Image
						src={imgBeneficio1}
						alt="Gestión de Proyectos"
						className="rounded-lg shadow-lg"
					/>
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								Gestión de Proyectos y Recursos
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-4">
								{[
									"Creación y gestión de proyectos",
									"Definición de títulos, partidas y recursos por tipo",
									"Análisis detallado de precios unitarios y subpartidas",
									"Gestión eficiente de clientes para cada proyecto",
								].map((item, index) => (
									<li key={index} className="flex items-start">
										<CheckCircle className="mr-3 h-6 w-6 text-primary flex-shrink-0" />
										<span className="text-lg">{item}</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</div>

				<div className="grid md:grid-cols-2 gap-16">
					<Card className="md:order-2">
						<CardHeader>
							<CardTitle className="text-2xl">
								Planificación y Control Avanzado
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-4">
								{[
									"Asignación de partidas",
									"Sincronización con Microsoft Project y Excel",
									"Generación de reportes por análisis y formatos del país",
									"Visualización de índices de precios unificados",
								].map((item, index) => (
									<li key={index} className="flex items-start">
										<CheckCircle className="mr-3 h-6 w-6 text-primary flex-shrink-0" />
										<span className="text-lg">{item}</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
					<Image
						src={imgBeneficio2}
						alt="Planificación Avanzada"
						className="rounded-lg shadow-lg md:order-1"
					/>
				</div>
			</section>

			<section className="w-full bg-primary text-primary-foreground py-20">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-6">
						Optimiza tu Gestión de Proyectos con CALCPU
					</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Únete a nuestra plataforma y descubre cómo CALCPU puede ayudarte a
						mejorar la eficiencia y precisión en tus proyectos de construcción.
					</p>
					<Button asChild size="lg" variant="secondary">
						<Link href="/login">
							Comenzar ahora <ArrowRight className="ml-2 h-5 w-5" />
						</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}
