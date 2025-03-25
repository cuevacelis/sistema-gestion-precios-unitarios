import {
	BicepsFlexed,
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
	Package,
	PencilLine,
	PencilRuler,
	Pickaxe,
	PlusCircle,
	Trash,
	TrendingUpIcon,
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
	}
	if (modNombre.toLowerCase().includes("usuario")) {
		return <UserRoundCogIcon className={className} />;
	}
	if (modNombre.toLowerCase().includes("proyecto")) {
		return <FolderTree className={className} />;
	}
	if (modNombre.toLowerCase().includes("grupos de partida")) {
		return <FileStack className={className} />;
	}
	if (modNombre.toLowerCase().includes("partida")) {
		return <File className={className} />;
	}
	if (modNombre.toLowerCase().includes("recurso")) {
		return <Package className={className} />;
	}
	if (modNombre.toLowerCase().includes("dashboard")) {
		return <LayoutDashboardIcon className={className} />;
	}
	if (modNombre.toLowerCase().includes("editar")) {
		return <PencilLine className={className} />;
	}
	if (modNombre.toLowerCase().includes("crear")) {
		return <PlusCircle className={className} />;
	}
	if (modNombre.toLowerCase().includes("exportar")) {
		return <Download className={className} />;
	}
	if (modNombre.toLowerCase().includes("eliminar")) {
		return <Trash className={className} />;
	}
	if (modNombre.toLowerCase().includes("ver detalle")) {
		return <EyeIcon className={className} />;
	}
	if (modNombre.toLowerCase().includes("jornal")) {
		return <Clock className={className} />;
	}
	if (modNombre.toLowerCase().includes("ubicacion")) {
		return <MapPinIcon className={className} />;
	}
	if (modNombre.toLowerCase().includes("hoja del presupuesto")) {
		return <FileText className={className} />;
	}
	if (modNombre.toLowerCase().includes("hoja de presupuesto")) {
		return <FileText className={className} />;
	}
	if (modNombre.toLowerCase().includes("indices unificados")) {
		return <TrendingUpIcon className={className} />;
	}
	if (modNombre.toLowerCase().includes("unidad de medida")) {
		return <PencilRuler className={className} />;
	}
	if (modNombre.toLowerCase().includes("mano de obra")) {
		return <BicepsFlexed className={className} />;
	}
	if (modNombre.toLowerCase().includes("rendimiento de equipo")) {
		return <Pickaxe className={className} />;
	}
	return <BracesIcon className={className} />;
}
