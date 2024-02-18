"use client";

import { Input } from "@nextui-org/input";
import { useFormStatus } from "react-dom";

export default function InputUserComponent() {
  const { pending } = useFormStatus();
  return (
    <Input
      type="text"
      label="Usuario"
      color="primary"
      name="user"
      readOnly={pending}
      required
      autoComplete="username user"
      className="w-64 mb-5"
    />
  );
}
