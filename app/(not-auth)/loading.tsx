import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <div className="relative inline-block">
          <Sparkles className="h-16 w-16 text-primary animate-pulse" />
          <div className="absolute inset-0 animate-spin">
            <div className="h-2 w-2 bg-primary rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="h-2 w-2 bg-primary rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="h-2 w-2 bg-primary rounded-full absolute left-0 top-1/2 transform -translate-y-1/2"></div>
            <div className="h-2 w-2 bg-primary rounded-full absolute right-0 top-1/2 transform -translate-y-1/2"></div>
          </div>
        </div>
        <p className="mt-4 text-lg font-medium text-muted-foreground">
          Cargando...
        </p>
        <span className="sr-only">Cargando contenido, por favor espere</span>
      </div>
    </div>
  );
}
