"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import exportToExcelWithColor from "@/components/export/exportToExcelWithColor";

interface ExportButtonProps {
  data: any[];
}

export function ExportButton({ data }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportToExcelWithColor(data, "Listado_de_Proyectos", "Datos");
    } catch (error) {
      console.error("Error exporting data:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section>
      <Button onClick={handleExport} disabled={isExporting}>
        {isExporting ? "Exportando..." : "Exportar a Excel"}
      </Button>
    </section>
  );
}
