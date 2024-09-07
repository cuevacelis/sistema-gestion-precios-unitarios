"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-background border border-border rounded-lg shadow-sm">
      <AlertCircle
        className="w-12 h-12 text-destructive mb-4"
        aria-hidden="true"
      />
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        Oops! Algo salió mal
      </h2>
      <p className="text-muted-foreground text-center mb-4 max-w-md">
        Lo sentimos, ha ocurrido un error inesperado.
      </p>
      {process.env.NODE_ENV === "development" && (
        <pre className="text-sm bg-muted p-4 rounded-md overflow-auto max-w-full mb-4">
          <code>{error.message}</code>
        </pre>
      )}
      <Button
        onClick={reset}
        className="flex items-center gap-2"
        variant="outline"
      >
        Intentar de nuevo
      </Button>
    </div>
  );
}
