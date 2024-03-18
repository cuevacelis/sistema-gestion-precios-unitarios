"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { useFormStatus } from "react-dom";

export default function SubmitButtonComponent() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      isLoading={pending}
      aria-disabled={pending}
      className="w-full mt-4"
      color="primary"
      variant="solid"
      radius="sm"
      endContent={<ArrowRightIcon className="w-4 ml-auto" />}
    >
      {pending ? "Validando..." : "Iniciar sesión"}
    </Button>
  );
}
