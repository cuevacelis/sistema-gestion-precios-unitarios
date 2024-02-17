"use client";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { Form, useForm } from "react-hook-form";
import { TUserLogin } from "../../_types/userTypes";
import { authenticateCredentialsOnlyServer } from "../../_utils/actionsAuthenticate";

export default function LoginFormComponent() {
  const { register, formState, control } = useForm<TUserLogin>();
  const [errorMessage, formActionSignInCredentials] = useFormState(
    authenticateCredentialsOnlyServer,
    undefined
  );
  const { pending } = useFormStatus();

  return (
    <Form
      onSubmit={async (data) => {
        formActionSignInCredentials(data.formData);
      }}
      control={control}
      className="flex flex-col pt-10 mb-5"
    >
      <Input
        type="text"
        label="Usuario"
        color="primary"
        {...register("user", {
          required: "*Se requiere el campo de usuario.",
        })}
        errorMessage={formState.errors.user?.message?.toString()}
        isInvalid={formState.errors.user ? true : false}
        autoComplete="username user"
        className="w-64 mb-5"
      />

      <Input
        type="password"
        label="Contraseña"
        color="primary"
        {...register("password", {
          required: "*Se requiere el campo de contraseña.",
        })}
        errorMessage={formState.errors.password?.message?.toString()}
        isInvalid={formState.errors.password ? true : false}
        autoComplete="password"
        className="w-64 mb-4"
      />
      <div className="flex flex-col text-center">
        <Button
          type="submit"
          isLoading={pending}
          aria-disabled={pending}
          color="primary"
          variant="shadow"
          className="mx-auto"
        >
          Iniciar Sesión
        </Button>
        <Link href={"/"} className="opacity-70">
          cancelar
        </Link>
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
    </Form>
  );
}
