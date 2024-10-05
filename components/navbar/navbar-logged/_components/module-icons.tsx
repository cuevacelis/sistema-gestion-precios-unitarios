import {
  BracesIcon,
  Download,
  EyeIcon,
  FileBox,
  Files,
  FileSpreadsheet,
  Folders,
  Hourglass,
  LayoutDashboardIcon,
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
    return <Folders className={className} />;
  } else if (modNombre.toLowerCase().includes("grupos de partida")) {
    return <Files className={className} />;
  } else if (modNombre.toLowerCase().includes("partida")) {
    return <FileSpreadsheet className={className} />;
  } else if (modNombre.toLowerCase().includes("recurso")) {
    return <FileBox className={className} />;
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
    return <Hourglass className={className} />;
  } else {
    return <BracesIcon className={className} />;
  }
}
