"use client";

import { MailIconComponent } from "@/app/_components/ui/icon/mail";
import { Input } from "@nextui-org/input";
import { useFormStatus } from "react-dom";

export default function InputUserComponent() {
  const { pending } = useFormStatus();

  return (
    <Input
      required
      readOnly={pending}
      label="Usuario"
      name="user"
      autoComplete="username user"
      placeholder="Ingresa tu usuario."
      className="w-full mb-6"
      color="primary"
      variant="underlined"
      size="lg"
      type="text"
      startContent={<MailIconComponent className="text-default-400 text-lg" />}
    />
  );
}
