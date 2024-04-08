import img_login_dark from "@/resources/images/img-login-dark2.webp";
import img_login_light from "@/resources/images/img-login-light.webp";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LoginComponent from "./_components/form/login";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Ingrese su usuario a continuación para iniciar sesión en su cuenta.",
};

export default function LoginPage() {
  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Ingrese su usuario a continuación para iniciar sesión en su cuenta
            </p>
          </div>
          <LoginComponent />
          <div className="hidden mt-4 text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link href="#" className="underline">
              Regístrate
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={img_login_light}
          placeholder="blur"
          alt="Image login"
          className="dark:hidden h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        <Image
          src={img_login_dark}
          placeholder="blur"
          alt="Image login"
          className="hidden dark:block h-full w-full object-cover dark:brightness-[0.8]"
        />
      </div>
    </div>
  );
}
