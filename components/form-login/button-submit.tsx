"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function SubmitButtonComponent() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full text-white"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? "Validando, por favor espere..." : "Iniciar sesión"}
    </Button>
  );
}
