"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface IProps {
  disabled?: boolean;
  name?: string;
  nameLoading?: string;
}

export default function SubmitFormButtonComponent({
  disabled,
  name = "Guardar",
  nameLoading = "Guardando...",
}: IProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="btn btn-primary"
      aria-disabled={pending || disabled}
      disabled={pending || disabled}
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
      {pending ? nameLoading : name}
    </Button>
  );
}
