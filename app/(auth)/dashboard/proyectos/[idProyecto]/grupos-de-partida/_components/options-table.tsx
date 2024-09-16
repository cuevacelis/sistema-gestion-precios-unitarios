"use client";

import { Button } from "@/components/ui/button";
import { Download, PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function OptionsTable() {
  const pathname = usePathname();

  const insertAfterGruposDePartida = (path: string, insert: string) => {
    const segments = path.split("/");
    const gruposIndex = segments.findIndex(
      (segment) => segment === "grupos-de-partida"
    );

    if (gruposIndex !== -1) {
      // Si 'grupos-de-partida' es el último segmento o el penúltimo seguido por una cadena vacía
      if (
        gruposIndex === segments.length - 1 ||
        (gruposIndex === segments.length - 2 &&
          segments[segments.length - 1] === "")
      ) {
        segments.splice(gruposIndex + 1, 0, insert);
      } else {
        segments.splice(gruposIndex + 1, 0, insert);
      }
    }

    return segments.join("/");
  };

  const createPath = insertAfterGruposDePartida(pathname, "crear");
  const exportPath = insertAfterGruposDePartida(pathname, "exportar");

  return (
    <section className="flex flex-wrap items-center gap-4">
      <Link href={createPath}>
        <Button size="default" variant="default" className="h-9 gap-1">
          <PlusCircle className="w-4" />
          <span>Nuevo</span>
        </Button>
      </Link>
      <Link href={exportPath}>
        <Button size="default" variant="secondary" className="h-9 gap-1">
          <Download className="w-4" />
          <span>Exportar</span>
        </Button>
      </Link>
    </section>
  );
}
