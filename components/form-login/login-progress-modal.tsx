import { useFormStatus } from "react-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoadingProgressModal() {
  const { pending } = useFormStatus();

  return (
    <Dialog open={pending}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center p-6">
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
          <div className="mt-6 w-full max-w-[200px] h-2 bg-secondary rounded-full overflow-hidden">
            <div className={cn("h-full bg-primary", "animate-progress")} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
