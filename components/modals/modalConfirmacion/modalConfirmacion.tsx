import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface IProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string | JSX.Element;
  message?: string | JSX.Element;
  classNameButtonAction?: string;
  isLoading?: boolean;
  messageActionButton?: string;
  messageActionButtonLoading?: string;
}

export default function ModalConfirmacionComponent({
  show,
  onClose,
  onConfirm,
  title = "¿Está seguro de procesar la solicitud?",
  message = "",
  classNameButtonAction,
  isLoading,
  messageActionButton = "Continuar",
  messageActionButtonLoading = "Cargando",
}: IProps) {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <AlertDialog open={show}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={cn(classNameButtonAction)}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            {isLoading ? messageActionButtonLoading : messageActionButton}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
