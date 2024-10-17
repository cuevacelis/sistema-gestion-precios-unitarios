import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  CalendarIcon,
  MapPinIcon,
  CodeIcon,
  HashIcon,
  DollarSignIcon,
  ActivityIcon,
  FolderIcon,
  FileIcon,
} from "lucide-react";
import { obtenerProyectoDetalle } from "@/lib/services/sql-queries";
import { formatDateToDateTimeWith12HourFormat } from "@/lib/utils";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import ContainerInput from "@/components/ui/container-input";
import { IDataDBObtenerGruposDePartidasId } from "@/lib/types/types";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface IPropsDetalleProyecto {
  dataDetalleProyecto: Awaited<ReturnType<typeof obtenerProyectoDetalle>>;
  dataGruposDePartidas: IDataDBObtenerGruposDePartidasId[];
}

export default function DetalleProyecto({
  dataDetalleProyecto,
  dataGruposDePartidas,
}: IPropsDetalleProyecto) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
      <InfoItem
        icon={<ActivityIcon className="w-5 h-5" />}
        label="Estado"
        value={dataDetalleProyecto?.pre_estado === 1 ? "Activo" : "Inactivo"}
        badge
        fullWidth
      />
      <InfoItem
        icon={<HashIcon className="w-5 h-5" />}
        label="Id"
        value={dataDetalleProyecto?.pre_id || ""}
      />
      <InfoItem
        icon={<CodeIcon className="w-5 h-5" />}
        label="Código"
        value={dataDetalleProyecto?.pre_codigo || ""}
      />
      <InfoItem
        icon="proyecto"
        label="Nombre del proyecto"
        value={dataDetalleProyecto?.pre_nombre || ""}
        fullWidth
      />
      <InfoItem
        icon={<MapPinIcon className="w-5 h-5" />}
        label="País"
        value={dataDetalleProyecto?.pai_nombre || ""}
      />
      <InfoItem
        icon={<MapPinIcon className="w-5 h-5" />}
        label="Departamento"
        value={dataDetalleProyecto?.dep_nombre || ""}
      />
      <InfoItem
        icon={<MapPinIcon className="w-5 h-5" />}
        label="Provincia"
        value={dataDetalleProyecto?.prov_nombre || ""}
      />
      <InfoItem
        icon={<MapPinIcon className="w-5 h-5" />}
        label="Distrito"
        value={dataDetalleProyecto?.dist_nombre || ""}
      />
      <InfoItem
        icon={<CalendarIcon className="w-5 h-5" />}
        label="Fecha de registro"
        value={formatDateToDateTimeWith12HourFormat(
          String(dataDetalleProyecto?.pre_fechorregistro)
        )}
      />
      <InfoItem
        icon="jornal"
        label="Jornal"
        value={`${dataDetalleProyecto?.pre_jornal}h` || ""}
      />
      <InfoItem
        icon={<CurrencyDollarIcon className="w-5 h-5" />}
        label="Moneda"
        value="SOL"
      />
      <InfoItem
        icon={<DollarSignIcon className="w-5 h-5" />}
        label="Total de recursos"
        value={
          dataDetalleProyecto?.total_precio_recurso
            ? String(dataDetalleProyecto?.total_precio_recurso)
            : "0"
        }
      />
      <Separator className="col-span-full" />
      {dataGruposDePartidas?.length > 0 ? (
        <section className="col-span-full">
          <h2 className="text-2xl font-bold mb-4">Grupos de Partidas</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Tiene Hijos</TableHead>
                <TableHead>Tiene Partidas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataGruposDePartidas?.map((grupo) => (
                <TableRow key={grupo.grupar_id}>
                  <TableCell>{grupo.grupar_id}</TableCell>
                  <TableCell className="font-medium">
                    {grupo.grupar_nombre}
                  </TableCell>
                  <TableCell>{grupo.grupar_total}</TableCell>
                  <TableCell>
                    <Badge
                      variant={grupo.tiene_hijos ? "default" : "secondary"}
                    >
                      {grupo.tiene_hijos ? (
                        <FolderIcon className="w-4 h-4 mr-1" />
                      ) : (
                        <FileIcon className="w-4 h-4 mr-1" />
                      )}
                      {grupo.tiene_hijos ? "Sí" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={grupo.tiene_partidas ? "default" : "secondary"}
                    >
                      {grupo.tiene_partidas ? "Sí" : "No"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      ) : (
        <p className="col-span-full">
          No hay grupos de partidas asociados al proyecto.
        </p>
      )}
    </section>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  fullWidth?: boolean;
  badge?: boolean;
}

function InfoItem({
  icon,
  label,
  value,
  fullWidth = false,
  badge = false,
}: InfoItemProps) {
  return (
    <ContainerInput
      nameLabel={label}
      htmlFor=""
      icon={icon}
      className={`${fullWidth ? "col-span-full" : ""}`}
    >
      {badge ? (
        <Badge
          variant={value === "Activo" ? "default" : "secondary"}
          className="text-xs"
        >
          {value}
        </Badge>
      ) : (
        <Input
          type="text"
          className="flex-grow bg-secondary"
          readOnly
          value={value || ""}
        />
      )}
    </ContainerInput>
  );
}
