import { Metadata } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import img_login_light from "@/resources/images/img-login-light.webp";
import img_login_dark from "@/resources/images/img-login-dark2.webp";

const LoginComponent = dynamic(() => import("@/components/form-login/login"), {
  ssr: false,
  loading: () => <LoginFormSkeleton />,
});

export const metadata: Metadata = {
  title: "Inicio de sesión",
  description: "Ingrese sus credenciales para acceder a su cuenta.",
};

export default function LoginPage() {
  return (
    <div className="h-home flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src={img_login_light}
          alt="Imagen de fondo para inicio de sesión"
          className="object-cover dark:hidden"
          placeholder="blur"
          priority
          fill
        />
        <Image
          src={img_login_dark}
          alt="Imagen de fondo para inicio de sesión (modo oscuro)"
          className="hidden dark:block object-cover dark:brightness-75"
          placeholder="blur"
          priority
          fill
        />
      </div>
      <div className="flex items-center justify-center p-8 lg:w-1/2">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Inicio de sesión
            </CardTitle>
            <CardDescription className="text-center">
              Ingrese sus credenciales para acceder a su cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginComponent />
            {/* <p className="mt-4 text-center text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Regístrate
              </Link>
            </p> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LoginFormSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
