import img_login_dark from "@/resources/images/img-login-dark2.webp";
import img_login_light from "@/resources/images/img-login-light.webp";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Ingrese su usuario a continuación para iniciar sesión en su cuenta.",
};

const LoginComponent = dynamic(() => import("@/components/form-login/login"), {
  ssr: true,
});

export default async function LoginPage() {
  return (
    <section className="w-full h-home flex items-center justify-center lg:grid lg:grid-cols-2">
      <section className="h-home items-center w-full justify-center hidden lg:flex">
        <Image
          src={img_login_light}
          placeholder="blur"
          alt="Imagen login light"
          className="dark:hidden h-full object-cover"
        />
        <Image
          src={img_login_dark}
          placeholder="blur"
          alt="Imagen login dark"
          className="hidden dark:block h-full object-cover dark:brightness-[0.8]"
        />
      </section>
      <section className="flex items-center justify-center">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Inicio de sesión</h1>
          </div>
          <LoginComponent />
          {/* <div className="mt-4 text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link href="#" className="underline">
              Regístrate
            </Link>
          </div> */}
        </div>
      </section>
    </section>
  );
}
