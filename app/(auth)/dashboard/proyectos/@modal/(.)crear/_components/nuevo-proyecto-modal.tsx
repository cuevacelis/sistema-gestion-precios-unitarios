"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NuevoProyecto from "../../../crear/_components/nuevo-proyecto";

interface NuevoProyectoModalProps {
  dataClientes: any; // Reemplaza 'any' con el tipo correcto
  session: any; // Reemplaza 'any' con el tipo correcto
}

export default function NuevoProyectoModal({
  dataClientes,
  session,
}: NuevoProyectoModalProps) {
  const router = useRouter();

  const handleChangeModal = useCallback(
    (open: boolean) => {
      if (!open) {
        router.back();
      }
    },
    [router]
  );

  return (
    <Dialog
      key="modal-crear-proyecto"
      defaultOpen={true}
      open={true}
      onOpenChange={handleChangeModal}
    >
      <DialogContent
        aria-describedby="description"
        className="sm:max-w-[800px] h-[500px] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
        </DialogHeader>
        <NuevoProyecto dataClientes={dataClientes} session={session} />
      </DialogContent>
    </Dialog>
  );
}
