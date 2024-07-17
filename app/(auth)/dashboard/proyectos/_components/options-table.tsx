"use client";
import { Button } from "@/components/ui/button";
import { Copy, Download, Edit, PlusCircle, Trash2 } from "lucide-react";
import Link from "next/link";

export default function OptionsTable() {
  return (
    <>
      <Button asChild size="default" variant="default" className="h-9 gap-1">
        <Link href={"/dashboard/proyectos/crear"}>
          <PlusCircle className="w-4" />
          <span>Nuevo</span>
        </Link>
      </Button>
      <Button size="default" variant="secondary" className="h-9 gap-1">
        <Edit className="w-4" />
        <span>Editar</span>
      </Button>
      <Button size="default" variant="destructive" className="h-9 gap-1">
        <Trash2 className="w-4" />
        <span>Eliminar</span>
      </Button>
      <Button size="default" variant="secondary" className="h-9 gap-1">
        <Copy className="w-4" />
        <span>Duplicar</span>
      </Button>
      <Button size="default" variant="secondary" className="h-9 gap-1">
        <Download className="w-4" />
        <span>Exportar</span>
      </Button>
    </>
  );
}
