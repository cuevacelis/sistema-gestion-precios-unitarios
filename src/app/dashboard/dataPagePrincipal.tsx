"use client";

import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";

export function FunctionPagePrincipal(props: any) {
  console.log("feef", props);
  return (
    <section className="flex gap-x-4 gap-y-3">
      {props.dataFetch.data.map((data: any) => (
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">{data.pre_Nombre}</p>
              <p className="text-small text-default-500">
                {data.pre_FecHorRegistro}
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>
              {data.cli_NomApeRazSocial}, {data.ubi_Departamento},
              {data.ubi_Provincia}, {data.ubi_Distrito}
            </p>
          </CardBody>
          <Divider />
        </Card>
      ))}
    </section>
  );
}
