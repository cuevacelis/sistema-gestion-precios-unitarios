"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
import AsignarRecursoPartida from "../crear/asignar-recurso";

interface IProps {
  idPartida: string;
}

export default function OptionsTable({ idPartida }: IProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createPath = `${pathname}/crear?${searchParams.toString()}`;

  return (
    <section className="flex flex-wrap items-center gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="default" variant="default" className="h-9 gap-1">
            <PlusCircle className="w-4" />
            <span>Nuevo</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Agregar</DialogTitle>
            <DialogDescription>:v</DialogDescription>
          </DialogHeader>
          <AsignarRecursoPartida idPartida={idPartida} />
        </DialogContent>
      </Dialog>
    </section>
  );
}
