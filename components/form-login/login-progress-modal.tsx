"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Loader2, Lock } from 'lucide-react';
import { useState } from "react";
import { useInterval } from 'usehooks-ts';

interface IProps {
  isPending: boolean;
}

export default function LoadingProgressModal({ isPending }: IProps) {
  const [progress, setProgress] = useState(0);

  useInterval(
    () => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 1));
    },
    isPending ? 50 : null
  );

  return (
    <Dialog open={isPending}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <section className="flex flex-col items-center justify-center p-6">
          <div className="relative">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <Lock className="h-8 w-8 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">
            Iniciando sesión
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Por favor, espere mientras verificamos sus credenciales...
          </p>
          <Progress value={progress} className="w-full max-w-[200px] mt-6" />
        </section>
      </DialogContent>
    </Dialog>
  );
}

