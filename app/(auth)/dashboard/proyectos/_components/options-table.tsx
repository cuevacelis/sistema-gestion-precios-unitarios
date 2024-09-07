"use client";
import { Button } from "@/components/ui/button";
import {  Download, Edit, PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OptionsTable() {
  const router = useRouter();

  return (
    <>
      <Button
        size="default"
        variant="default"
        className="h-9 gap-1"
        onClick={() => router.push("/dashboard/proyectos/crear")}
      >
        <PlusCircle className="w-4" />
        <span>Nuevo</span>
      </Button>
      <Button
        size="default"
        variant="secondary"
        className="h-9 gap-1"
        onClick={() => router.push("/dashboard/proyectos/exportar")}
      >
        <Download className="w-4" />
        <span>Exportar</span>
      </Button>
    </>
  );
}
