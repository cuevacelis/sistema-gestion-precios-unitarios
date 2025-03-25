import { ShieldCheck } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex items-center justify-center h-home bg-background">
			<div className="text-center">
				<div className="relative inline-block">
					<div className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
					<ShieldCheck className="absolute inset-0 h-8 w-8 m-auto text-primary animate-pulse" />
				</div>
				<p className="mt-4 text-lg font-medium text-muted-foreground">
					Cargando panel autenticado...
				</p>
				<span className="sr-only">
					Cargando panel de control autenticado, por favor espere
				</span>
			</div>
		</div>
	);
}
