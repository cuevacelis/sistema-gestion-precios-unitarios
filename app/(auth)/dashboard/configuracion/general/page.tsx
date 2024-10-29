import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { obtenerUsuarioLogeado } from "@/lib/services/sql-queries";
import Link from "next/link";

export default async function GeneralConfigurationPage() {
  const session = await auth();
  const dataUserLogged = await obtenerUsuarioLogeado(Number(session?.user?.id));

  return (
    <section className="flex-1 flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Nombre y apellido</CardTitle>
          <CardDescription>
            El nombre y apellido asociado a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form>
            <Input defaultValue={dataUserLogged?.usu_nomapellidos} readOnly />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button disabled>Guardar</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Correo electrónico</CardTitle>
          <CardDescription>
            El correo electrónico asociado a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input defaultValue={dataUserLogged?.usu_correo} readOnly />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button disabled>Guardar</Button>
        </CardFooter>
      </Card>
    </section>
  );
}
