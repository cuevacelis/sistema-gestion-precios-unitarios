"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	actionsQueueExportPresupuestoGeneralS3,
	actionsQueueExportS3Presupuestos,
} from "@/lib/actions/actions";
import { formatDateTimeForFilename } from "@/lib/utils";
import { Download, PlusCircle } from "lucide-react";
import type { Session } from "next-auth";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function OptionsTable({
	session,
	proyectoId,
}: {
	session: Session | null;
	proyectoId: string | null;
}) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const createPath = `${pathname}/crear?${searchParams.toString()}`;

	const handleExport = async () => {
		try {
			toast.info("Exportación iniciada", {
				description:
					"Su solicitud de exportación se ha iniciado, se le notificará cuando esté lista para descarga.",
				duration: 3000,
			});
			await actionsQueueExportPresupuestoGeneralS3({
				userId: String(session?.user?.id),
				prefixNameFile: `Proyectos-${formatDateTimeForFilename()}`,
				email: String(session?.user?.email),
				pre_id: String(proyectoId),
			});
		} catch (error) {
			toast.error("No se pudo iniciar la exportación, inténtelo de nuevo.");
		}
	};

	return (
		<section className="flex flex-wrap items-center gap-4">
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						size="default"
						variant="secondary"
						className="h-9 gap-1"
						disabled={proyectoId === null || String(proyectoId) === "null"}
					>
						<Download className="w-4" />
						<span>Exportar a PDF</span>
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Confirmar exportación a PDF</AlertDialogTitle>
						<AlertDialogDescription>
							Cuando la exportación haya terminado, se le enviará una
							notificación y un correo electrónico con el enlace de descarga que
							tiene una expiración de 7 días.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction onClick={handleExport}>
							Iniciar exportación
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</section>
	);
}
