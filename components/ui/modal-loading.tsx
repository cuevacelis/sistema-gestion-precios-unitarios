"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Portal from "../portal/portal";

export default function LoadingModal() {
  return (
    <Portal>
      <Dialog open={true} modal={true}>
        <DialogContent
          className="sm:max-w-[425px]"
          onPointerDownOutside={(e) => e.preventDefault()}
          hidden={true}
        >
          <div className="flex flex-col items-center justify-center p-6">
            <div className="h-32 w-32 animate-spin rounded-full border-4 border-blue-300 border-t-4 border-t-blue-500"></div>
            <p className="mt-4 text-lg font-semibold">
              Cargando, por favor espere...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </Portal>
  );
}
