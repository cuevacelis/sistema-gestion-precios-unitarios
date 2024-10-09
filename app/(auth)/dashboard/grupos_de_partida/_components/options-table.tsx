"use client";

import { Button } from "@/components/ui/button";
import { replaceSegmentInPath } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface IProps {
  isTheLastChildInTheListGrupoPartida: boolean;
  isPartidasAssigned: boolean;
  lastGrupoPartidaId: number;
}

export default function OptionsTable({
  isTheLastChildInTheListGrupoPartida,
  isPartidasAssigned,
  lastGrupoPartidaId,
}: IProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createPath = `${replaceSegmentInPath(pathname, "subgrupos", "crear")}?${searchParams.toString()}`;
  const partidasPath = `/dashboard/partidas/crear?grupoPartidaId=${lastGrupoPartidaId}`;

  if (isPartidasAssigned) {
    return null;
  }

  return (
    <section className="flex flex-wrap items-center gap-4">
      <Link href={createPath} scroll={false}>
        <Button size="default" variant="default" className="h-9 gap-1">
          <PlusCircle className="w-4" />
          <span>Nuevo grupo de partida</span>
        </Button>
      </Link>
      {isTheLastChildInTheListGrupoPartida && (
        <Link href={partidasPath}>
          <Button size="default" variant="default" className="h-9 gap-1">
            <PlusCircle className="w-4" />
            <span>Añadir partida</span>
          </Button>
        </Link>
      )}
    </section>
  );
}
