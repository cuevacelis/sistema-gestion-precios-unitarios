"use client";

import { Button } from "@nextui-org/button";
import { useFormStatus } from "react-dom";

export default function SubmitButtonComponent() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      isLoading={pending}
      aria-disabled={pending}
      color="primary"
      variant="shadow"
      className="mx-auto"
    >
      {pending ? "Validando..." : "Iniciar sesión"}
    </Button>
  );
}
