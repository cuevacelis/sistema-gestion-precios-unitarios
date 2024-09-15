"use client";

import { Button } from "@/components/ui/button";
import { Download, PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function OptionsTable() {
  const pathname = usePathname();

  const createPath = `${pathname}/crear`;
  const exportPath = `${pathname}/exportar`;

  return (
    <>
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
    </>
  );
}
