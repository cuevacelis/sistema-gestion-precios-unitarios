"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";

export default function InputUserComponent() {
  const { pending } = useFormStatus();

  return (
    <div className="grid gap-2">
      <Label htmlFor="email">Correo electrónico</Label>
      <Input
        id="email"
        name="email"
        type="email"
        autoComplete="username"
        readOnly={pending}
        placeholder="Ingresa tu correo electrónico."
        required
      />
    </div>
  );
}
