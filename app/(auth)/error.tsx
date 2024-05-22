"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center h-home">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            ¡Oops! Algo salió mal
          </CardTitle>
          <CardDescription>
            Se ha producido un error inesperado. Por favor, intenta nuevamente.
            <br />
            Si el el problema persiste, te recomendamos limpiar la caché de tu
            navegador.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Detalles del error:
              </p>
              <p className="text-sm text-muted-foreground text-red-400">
                {error.message}
              </p>
            </div>
          </div>
          <Button className="w-full" onClick={() => reset()} variant="default">
            Intentar de nuevo
          </Button>
          <Button className="w-full" onClick={reloadPage} variant="destructive">
            Recargar la página
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
