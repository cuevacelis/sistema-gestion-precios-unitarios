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

interface IProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string | JSX.Element;
  classNameButtonAction?: string;
}

export default function ModalConfirmacionComponent(props: IProps) {
  const handleClose = () => {
    props.onClose();
  };

  const handleConfirm = () => {
    props.onConfirm();
  };

  return (
    <AlertDialog open={props.show}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {props.title || "¿Está seguro de procesar la solicitud?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {props.message ||
              "Esta acción es irreversible y no se puede deshacer. Una vez que la ejecutes, no habrá manera de revertirla ni de recuperar el estado anterior."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={cn(props.classNameButtonAction)}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
