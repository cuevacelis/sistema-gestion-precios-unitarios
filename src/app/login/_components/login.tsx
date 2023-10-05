"use client";

import { Button, Input } from "@nextui-org/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormDataLogin = {
  user: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>();

  const onSubmit = async (data: any) => {
    try {
      const responseLoginToken = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/Accounts/Login`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            usu_Correo: data.user,
            usu_Clave: data.password,
          }),
        }
      );

      const dataLoginToken = await responseLoginToken.json();

      if (dataLoginToken.isAuthSuccessful) {
        Cookies.set("token", dataLoginToken.token);
        router.push("/dashboard");
      } else {
        router.push("/login-faild");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col pt-10 mb-5"
    >
      <Input
        type="text"
        label="Correo"
        color="primary"
        {...register("user", {
          required: "*Se requiere el campo de usuario.",
        })}
        errorMessage={errors.user?.message?.toString()}
        validationState={errors.user ? "invalid" : "valid"}
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
