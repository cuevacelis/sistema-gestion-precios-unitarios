"use client";

import { Button } from "@/components/ui/button";
import { replaceSegmentInPath } from "@/lib/utils";
import { Download, PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProps {
  isChildrenLastGrupoPartida: boolean;
}

export default function OptionsTable({ isChildrenLastGrupoPartida }: IProps) {
  const pathname = usePathname();

  const createPath = replaceSegmentInPath(pathname, "subgrupos", "crear");
  const exportPath = replaceSegmentInPath(pathname, "subgrupos", "exportar");

  return (
    <section className="flex flex-wrap items-center gap-4">
      <Link href={createPath}>
        <Button size="default" variant="default" className="h-9 gap-1">
          <PlusCircle className="w-4" />
          <span>Nuevo grupo de partida</span>
        </Button>
      </Link>
      {isChildrenLastGrupoPartida && (
        <Link href={exportPath}>
          <Button size="default" variant="default" className="h-9 gap-1">
            <PlusCircle className="w-4" />
            <span>Añadir partida</span>
          </Button>
        </Link>
      )}
    </section>
  );
}
