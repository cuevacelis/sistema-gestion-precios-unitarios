import ModuleIconsComponent from "@/components/navbar/navbar-logged/_components/module-icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	type IDataDBObtenerClientesId,
	IDataDBObtenerPartidasPaginados,
} from "@/lib/types/types";
import { formatDateToDateTime } from "@/lib/utils";
import { CalendarIcon, MapPinIcon, UserIcon } from "lucide-react";

interface IPropsDetallePartida {
	data: IDataDBObtenerClientesId;
}

export default function DetallePartida({ data }: IPropsDetallePartida) {
	return (
		<div className="space-y-6 pt-2">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center">
				<div>
					<h2 className="text-2xl font-bold">{data.cli_nomaperazsocial}</h2>
					<p className="text-sm text-muted-foreground">
						cli_numdocumento: {data.cli_numdocumento}
					</p>
				</div>
			</div>
		</div>
	);
}
