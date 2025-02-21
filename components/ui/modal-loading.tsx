"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Portal from "../portal/portal";

interface IPropsLoadingModal {
  message?: string;
}

export default function LoadingModal({ message }: IPropsLoadingModal) {
  return (
    <Portal>
      <Dialog open={true} modal={true}>
        <DialogContent
          className="sm:max-w-[425px]"
          onPointerDownOutside={(e) => e.preventDefault()}
          hidden={true}
        >
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6">
            <div className="h-32 w-32 animate-spin rounded-full border-4 border-blue-300 border-t-4 border-t-blue-500"></div>
            <p className="mt-4 text-lg font-semibold">
              {message || "Cargando, por favor espere..."}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </Portal>
  );
}
