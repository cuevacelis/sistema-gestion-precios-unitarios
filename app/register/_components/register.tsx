"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormDataLogin = {
  idUser: string;
  email: string;
  password: string;
};

export default function Register() {
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
        label="IdUsuario"
        {...register("idUser", {
          required: "*Se requiere el id del usuario.",
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: "*Ingrese un correo válido.",
          },
        })}
        errorMessage={errors.idUser?.message?.toString()}
        validationState={errors.idUser ? "invalid" : "valid"}
        autoComplete="username"
        className="w-64 mb-5"
      />
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
          Registrate
        </Button>
      </div>
    </form>
  );
}
