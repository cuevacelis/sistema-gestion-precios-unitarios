"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function SubmitButtonComponent() {
  const { pending } = useFormStatus();
  return (
    <>
      {/* {pending && <ModalLoading />} */}
      <Button
        type="submit"
        className="btn btn-primary"
        aria-disabled={pending}
        disabled={pending}
      >
        {pending ? "Guardando, por favor espere..." : "Guardar"}
      </Button>
    </>
  );
}
