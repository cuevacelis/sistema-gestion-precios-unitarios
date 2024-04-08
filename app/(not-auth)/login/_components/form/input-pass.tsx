"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function InputPassComponent() {
  const { pending } = useFormStatus();
  const [isVisiblePass, setIsVisiblePass] = useState<boolean>(false);

  return (
    <div className="grid gap-2">
      <div className="flex items-center">
        <Label htmlFor="password">Contraseña</Label>
        <Link
          href="/forgot-password"
          className="sm:hidden ml-auto inline-block text-sm underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
      <div className="relative">
        <Input
          id="password"
          name="password"
          readOnly={pending}
          autoComplete="password"
          type={isVisiblePass ? "text" : "password"}
          required
          className="pr-10"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={() => setIsVisiblePass(!isVisiblePass)}
        >
          {isVisiblePass ? (
            <EyeOffIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
}
