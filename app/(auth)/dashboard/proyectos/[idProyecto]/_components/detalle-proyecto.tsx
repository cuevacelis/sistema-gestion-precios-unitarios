import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  CalendarIcon,
  MapPinIcon,
  CodeIcon,
  HashIcon,
  BuildingIcon,
  DollarSignIcon,
  ActivityIcon,
  Clock,
} from "lucide-react";
import { obtenerProyectoDetalle } from "@/lib/services/sql-queries";
import { formatDateToDateTimeWith12HourFormat } from "@/lib/utils";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import ContainerInput from "@/components/ui/container-input";

interface IPropsDetalleProyecto {
  dataDetalleProyecto: Awaited<ReturnType<typeof obtenerProyectoDetalle>>;
}

export default function DetalleProyecto({
  dataDetalleProyecto,
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
        fullWidth
      />
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
