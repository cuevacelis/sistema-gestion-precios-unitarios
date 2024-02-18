"use client";

import { Input } from "@nextui-org/input";
import { useFormStatus } from "react-dom";

export default function InputPassComponent() {
  const { pending } = useFormStatus();
  return (
    <Input
      type="password"
      label="Contraseña"
      color="primary"
      name="password"
      readOnly={pending}
      required
      // errorMessage={formState.errors.password?.message?.toString()}
      // isInvalid={formState.errors.password ? true : false}
      autoComplete="password"
      className="w-64 mb-4"
    />
  );
}
