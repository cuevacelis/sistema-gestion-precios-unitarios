import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDateToDateTime } from "@/lib/utils";
import ModuleIconsComponent from "@/components/navbar/navbar-logged/_components/module-icons";
import {
  IDataDBObtenerPartidasPaginados,
  IDataDBObtenerUsuariosId,
} from "@/lib/types/types";

interface IPropsDetallePartida {
  data: IDataDBObtenerUsuariosId;
}

export default function DetallePartida({ data }: IPropsDetallePartida) {
  return (
    <div className="space-y-6 pt-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold">{data.usu_nomapellidos}</h2>
          <p className="text-sm text-muted-foreground">
            usu_correo: {data.usu_correo}
          </p>
        </div>
      </div>
    </div>
  );
}
