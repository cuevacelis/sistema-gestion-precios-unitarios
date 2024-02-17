"use client";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useFormState, useFormStatus } from "react-dom";
import { authenticateCredentialsOnlyServer } from "../../_utils/actionsAuthenticate";

function SubmitButton() {
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
      {pending ? "Iniciando..." : "Iniciar sesión"}
    </Button>
  );
}

export default function LoginFormComponent() {
  const [errorMessage, formActionSignInCredentials] = useFormState(
    authenticateCredentialsOnlyServer,
    undefined
  );

  return (
    <form
      action={formActionSignInCredentials}
      className="flex flex-col pt-10 mb-5"
    >
      <Input
        type="text"
        label="Usuario"
        color="primary"
        name="user"
        // {...register("user", {
        //   required: "*Se requiere el campo de usuario.",
        // })}
        // errorMessage={formState.errors.user?.message?.toString()}
        // isInvalid={formState.errors.user ? true : false}
        autoComplete="username user"
        className="w-64 mb-5"
      />

      <Input
        type="password"
        label="Contraseña"
        color="primary"
        name="password"
        // {...register("password", {
        //   required: "*Se requiere el campo de contraseña.",
        // })}
        // errorMessage={formState.errors.password?.message?.toString()}
        // isInvalid={formState.errors.password ? true : false}
        autoComplete="password"
        className="w-64 mb-4"
      />
      <div className="flex flex-col text-center">
        <SubmitButton />
      </div>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}
