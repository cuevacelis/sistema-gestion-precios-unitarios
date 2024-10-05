import { IDataDBObtenerProyectosId } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDateToDateTime } from "@/lib/utils";
import ModuleIconsComponent from "@/components/navbar/navbar-logged/_components/module-icons";

interface IPropsDetalleProyecto {
  data: IDataDBObtenerProyectosId;
}

export default function DetalleProyecto({ data }: IPropsDetalleProyecto) {
  return (
    <div className="space-y-6 pt-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold">{data.pre_nombre}</h2>
          <p className="text-sm text-muted-foreground">
            Código: {data.pre_codigo}
          </p>
        </div>
        <Badge variant={data.pre_estado === 1 ? "default" : "destructive"}>
          {data.pre_estado === 1 ? "Activo" : "Inactivo"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <ModuleIconsComponent
                className="h-4 w-4 text-muted-foreground"
                modNombre="usuario"
              />
              <span className="font-medium">Usuario:</span>
              <span>{data.usu_nomapellidos}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Fecha de Registro:</span>
              <span>{formatDateToDateTime(data.pre_fechorregistro)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ModuleIconsComponent
                className="h-4 w-4 text-muted-foreground"
                modNombre="cliente"
              />
              <span className="font-medium">Cliente:</span>
              <span>{data.cli_nomaperazsocial}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ModuleIconsComponent
                className="h-4 w-4 text-muted-foreground"
                modNombre="jornal"
              />
              <span className="font-medium">Jornal:</span>
              <span>{data.pre_jornal}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ubicación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium">País:</span>
              <span>{data.pai_id}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">Departamento:</span>
              <span>{data.dep_id}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">Provincia:</span>
              <span>{data.prov_id}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">Distrito:</span>
              <span>{data.dist_id}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
