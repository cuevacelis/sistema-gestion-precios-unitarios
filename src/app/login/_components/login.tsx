"use client";

import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormDataLogin = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>();

  const onSubmit = (data: any) => {
    // console.log(data);
    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col pt-10 mb-5"
    >
      <Input
        type="text"
        label="Correo"
        {...register("email", {
          required: "*Se requiere el campo de correo.",
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: "*Ingrese un correo válido.",
          },
        })}
        errorMessage={errors.email?.message?.toString()}
        validationState={errors.email ? "invalid" : "valid"}
        autoComplete="username email"
        className="w-64 mb-5"
      />

      <Input
        type="password"
        {...register("password", {
          required: "*Se requiere el campo de contraseña.",
        })}
        label="Contraseña"
        errorMessage={errors.password?.message?.toString()}
        validationState={errors.password ? "invalid" : "valid"}
        autoComplete="new-password"
        className="w-64 mb-4"
      />
      <div className="flex flex-col text-center">
        <Button
          type="submit"
          isLoading={false}
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
    </form>
  );
}
