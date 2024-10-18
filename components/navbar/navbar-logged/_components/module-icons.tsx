import {
  Box,
  BracesIcon,
  Clock,
  Download,
  EyeIcon,
  File,
  FileStack,
  FileText,
  FolderTree,
  LayoutDashboardIcon,
  MapPinIcon,
  PencilLine,
  PlusCircle,
  Trash,
  UserRoundCogIcon,
  UsersRoundIcon,
} from "lucide-react";

interface IProps {
  modNombre: string;
  className?: string;
}

export default function ModuleIconsComponent({ modNombre, className }: IProps) {
  if (modNombre.toLowerCase().includes("cliente")) {
    return <UsersRoundIcon className={className} />;
  } else if (modNombre.toLowerCase().includes("usuario")) {
    return <UserRoundCogIcon className={className} />;
  } else if (modNombre.toLowerCase().includes("proyecto")) {
    return <FolderTree className={className} />;
  } else if (modNombre.toLowerCase().includes("grupos de partida")) {
    return <FileStack className={className} />;
  } else if (modNombre.toLowerCase().includes("partida")) {
    return <File className={className} />;
  } else if (modNombre.toLowerCase().includes("recurso")) {
    return <Box className={className} />;
  } else if (modNombre.toLowerCase().includes("dashboard")) {
    return <LayoutDashboardIcon className={className} />;
  } else if (modNombre.toLowerCase().includes("editar")) {
    return <PencilLine className={className} />;
  } else if (modNombre.toLowerCase().includes("crear")) {
    return <PlusCircle className={className} />;
  } else if (modNombre.toLowerCase().includes("exportar")) {
    return <Download className={className} />;
  } else if (modNombre.toLowerCase().includes("eliminar")) {
    return <Trash className={className} />;
  } else if (modNombre.toLowerCase().includes("ver detalle")) {
    return <EyeIcon className={className} />;
  } else if (modNombre.toLowerCase().includes("jornal")) {
    return <Clock className={className} />;
  } else if (modNombre.toLowerCase().includes("ubicacion")) {
    return <MapPinIcon className={className} />;
  } else if (modNombre.toLowerCase().includes("hoja del presupuesto")) {
    return <FileText className={className} />;
  } else if (modNombre.toLowerCase().includes("hoja de presupuesto")) {
    return <FileText className={className} />;
  } else {
    return <BracesIcon className={className} />;
  }
}
