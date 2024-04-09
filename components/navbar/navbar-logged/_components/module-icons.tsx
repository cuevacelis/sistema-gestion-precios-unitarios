import {
  BracesIcon,
  FolderOpenDotIcon,
  LayoutDashboardIcon,
  NotebookPenIcon,
  UserRoundCogIcon,
  UsersRoundIcon,
  WalletIcon,
} from "lucide-react";

interface IProps {
  modNombre: string;
}

export default function ModuleIconsComponent({ modNombre }: IProps) {
  switch (modNombre) {
    case "Usuario":
      return <UserRoundCogIcon className="h-4 w-4" />;
    case "Presuspuesto":
      return <NotebookPenIcon className="h-4 w-4" />;
    case "Partida":
      return <FolderOpenDotIcon className="h-4 w-4" />;
    case "Proyecto":
      return <WalletIcon className="h-4 w-4" />;
    case "Cliente":
      return <UsersRoundIcon className="h-4 w-4" />;
    case "DashBoard":
      return <LayoutDashboardIcon className="h-4 w-4" />;
    default:
      return <BracesIcon className="h-4 w-4" />;
  }
}
