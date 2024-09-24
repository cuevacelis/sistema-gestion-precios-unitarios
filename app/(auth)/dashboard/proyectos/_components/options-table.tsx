"use client";

import { Button } from "@/components/ui/button";
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
import { Session } from "next-auth";
import { toast } from "sonner";

export default function OptionsTable({ session }: { session: Session | null }) {
  const pathname = usePathname();

  const createPath = `${pathname}/crear`;

  const handleExport = async () => {
    try {
      toast.info("Exportación iniciada", {
        description:
          "Su solicitud de exportación se ha iniciado, se le notificará cuando esté lista para descarga.",
      });
      await actionsQueueExportS3Presupuestos({
        userId: String(session?.user?.id),
        prefixNameFile: "presupuestos",
      });
    } catch (error) {
      toast.error("No se pudo iniciar la exportación, inténtelo de nuevo.");
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
              Cuando la exportación haya terminado, se le enviará una
              notificación con el enlace de descarga.
              <br />
              <span className="font-bold text-red-500">
                El enlace tiene una expiración de 7 días desde la fecha de
                generación, por lo que debe ser descargado antes de esa fecha.
              </span>
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
