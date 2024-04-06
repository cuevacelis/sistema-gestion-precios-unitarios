import { Card, CardBody, CardHeader } from "@/components/ui/card";
import LogoComponent from "../../components/ui/logo/logo";
import LoginComponent from "./_components/form/login";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Card shadow="sm" radius="sm" className="mt-10 mb-10">
        <CardBody className="flex flex-row items-center px-10 w-96 bg-blue-500">
          <LogoComponent coloricon={"white"} />
          <p className="text-white">SGPU</p>
        </CardBody>
      </Card>
      <Card shadow="sm" radius="sm">
        <CardHeader className="px-10">
          <h1 className="text-2xl text-left pt-5">
            Inicia sesión para continuar.
          </h1>
        </CardHeader>
        <CardBody className="px-10 w-96">
          <LoginComponent />
        </CardBody>
      </Card>
    </main>
  );
}
