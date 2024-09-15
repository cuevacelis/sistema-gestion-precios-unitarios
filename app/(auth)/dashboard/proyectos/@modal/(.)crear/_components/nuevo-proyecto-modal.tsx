"use client";

import { useRouter } from "next/navigation";
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
  const [isOpen, setIsOpen] = useState(true);

  const onDismiss = useCallback(() => {
    setIsOpen(false);
    router.back();
  }, [router]);

  const handleChangeModal = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      if (!open) {
        router.back();
      }
    },
    [router]
  );

  // Efecto para manejar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onDismiss();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onDismiss]);

  return (
    <Dialog open={isOpen} onOpenChange={handleChangeModal}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
        </DialogHeader>
        <NuevoProyecto
          dataClientes={dataClientes}
          session={session}
          // onDismiss={onDismiss}
        />
      </DialogContent>
    </Dialog>
  );
}
