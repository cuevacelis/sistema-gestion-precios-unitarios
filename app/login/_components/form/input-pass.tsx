"use client";

import { EyeIconComponent } from "@/components/ui/icon/eye";
import { EyeSlashIconComponent } from "@/components/ui/icon/eye-slash";
import { Input } from "@/components/ui/input";
import { KeyIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function InputPassComponent() {
  const { pending } = useFormStatus();
  const [isVisiblePass, setIsVisiblePass] = useState<boolean>(false);

  return (
    <Input
      label="Contraseña"
      name="password"
      placeholder="Ingresa tu contraseña."
      required
      readOnly={pending}
      color="primary"
      variant="underlined"
      size="lg"
      type={isVisiblePass ? "text" : "password"}
      // isInvalid={true}
      autoComplete="password"
      className="w-full mb-6"
      startContent={<KeyIcon className="text-default-400 w-5" />}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={() => setIsVisiblePass((prev) => !prev)}
        >
          {isVisiblePass ? (
            <EyeSlashIconComponent className="text-lg text-default-400 pointer-events-none" />
          ) : (
            <EyeIconComponent className="text-lg text-default-400 pointer-events-none" />
          )}
        </button>
      }
    />
  );
}
