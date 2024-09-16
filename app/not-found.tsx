"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PawPrint, Home, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotFound() {
  const [randomImageUrl, setRandomImageUrl] = useState<string | null>(null);
  const [blurHash, setBlurHash] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?page=1&per_page=1&query=dogs&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
        );
        const data = await response.json();
        setRandomImageUrl(data.urls?.regular || "/placeholder.svg");
        setBlurHash(data.blur_hash || "");
      } catch (error) {
        console.error("Error fetching random image:", error);
        setRandomImageUrl("/placeholder.svg");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRandomImage();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary flex flex-col justify-center items-center p-4 text-center">
      <div className="max-w-2xl w-full bg-background/80 backdrop-blur-sm rounded-lg shadow-xl p-8 space-y-6">
        {/* <PawPrint className="w-16 h-16 text-primary mx-auto mb-4" /> */}
        <h1 className="text-4xl md:text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Página no encontrada
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          Lo sentimos, no pudimos encontrar la página que estás buscando. Es
          posible que haya sido eliminada o que nunca haya existido.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Volver a Inicio
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Ir Atrás
          </Button>
        </div>
        <div className="relative w-full aspect-video max-w-md mx-auto overflow-hidden rounded-lg shadow-lg">
          {isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <Image
              src={randomImageUrl || "/placeholder.svg"}
              alt="Imagen aleatoria de un perro"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              blurDataURL={blurHash}
              placeholder={blurHash ? "blur" : "empty"}
            />
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          {isLoading
            ? "Cargando una imagen aleatoria de un perro..."
            : "Aquí tienes una imagen aleatoria de un perro para alegrar tu día 🐾"}
        </p>
      </div>
    </main>
  );
}
