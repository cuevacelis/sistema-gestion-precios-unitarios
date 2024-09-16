"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCw, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <html lang="es">
      <body className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg text-center">
          <AlertTriangle
            className="mx-auto h-12 w-12 text-red-500 mb-4"
            aria-hidden="true"
          />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Algo salió mal
          </h1>
          <p className="text-gray-600 mb-6">
            Lo sentimos, ha ocurrido un error inesperado. Nuestro equipo ha sido
            notificado.
          </p>
          <div className="space-y-4">
            <Button onClick={() => reset()} className="w-full">
              <RotateCw className="mr-2 h-4 w-4" />
              Intentar otra vez
            </Button>
            <Button onClick={reloadPage} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Recargar la página
            </Button>
          </div>
          {error.digest && (
            <p className="mt-4 text-sm text-gray-500">
              Código de error: <code className="font-mono">{error.digest}</code>
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
