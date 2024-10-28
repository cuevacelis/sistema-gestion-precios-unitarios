"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface IProps {
  disabled?: boolean;
  isPending: boolean;
  name?: string;
  nameLoading?: string;
}

export default function SubmitFormButtonComponent({
  disabled,
  isPending,
  name = "Guardar",
  nameLoading = "Guardando...",
}: IProps) {
  // const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="btn btn-primary"
      aria-disabled={isPending || disabled}
      disabled={isPending || disabled}
    >
      {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
      {isPending ? nameLoading : name}
    </Button>
  );
}
