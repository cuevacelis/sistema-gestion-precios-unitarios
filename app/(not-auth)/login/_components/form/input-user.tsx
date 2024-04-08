"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";

export default function InputUserComponent() {
  const { pending } = useFormStatus();

  return (
    <div className="grid gap-2">
      <Label htmlFor="user">Usuario</Label>
      <Input
        id="user"
        type="text"
        autoComplete="username user"
        readOnly={pending}
        placeholder="Ingresa tu usuario."
        required
      />
    </div>
  );
}
