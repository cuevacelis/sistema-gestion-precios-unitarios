"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { actionsQueueExportS3Presupuestos } from "@/lib/actions";
import { Download, PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function OptionsTable() {
  const pathname = usePathname();
  const { toast } = useToast();

  const createPath = `${pathname}/crear`;

  const handleExport = async () => {
    try {
      toast({
        title: "Exportación iniciada",
        description:
          "Su solicitud de exportación se ha iniciado, se le notificará cuando esté lista para descarga.",
      });
      await actionsQueueExportS3Presupuestos();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo iniciar la exportación. Inténtelo de nuevo.",
        variant: "destructive",
      });
    } finally {
    }
  };

  return (
    <section className="flex flex-wrap items-center gap-4">
      <Link href={createPath}>
        <Button size="default" variant="default" className="h-9 gap-1">
          <PlusCircle className="w-4" />
          <span>Nuevo</span>
        </Button>
      </Link>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="default" variant="secondary" className="h-9 gap-1">
            <Download className="w-4" />
            <span>Exportar</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exportación</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Está seguro que desea iniciar la exportación de presupuestos?
              Este proceso puede tardar unos minutos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleExport}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
