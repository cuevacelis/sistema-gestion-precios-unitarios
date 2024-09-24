"use client";

import { Button } from "@/components/ui/button";
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
      {pending ? nameLoading : name}
    </Button>
  );
}
