"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AlertTriangle, ChevronDown, RefreshCw, RotateCw } from "lucide-react";
import { useState } from "react";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const [isOpen, setIsOpen] = useState(false);

	const reloadPage = () => {
		window.location.reload();
	};

	return (
		<html lang="es">
			<body className="flex items-center justify-center min-h-screen bg-background text-foreground p-4">
				<Card className="w-full max-w-md shadow-lg">
					<CardHeader>
						<div className="flex justify-center mb-4">
							<AlertTriangle
								className="h-12 w-12 text-destructive"
								aria-hidden="true"
							/>
						</div>
						<CardTitle className="text-2xl font-bold text-center">
							Algo salió mal
						</CardTitle>
						<CardDescription className="text-center">
							Lo sentimos, ha ocurrido un error inesperado. Nuestro equipo ha
							sido notificado.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Button onClick={() => reset()} className="w-full">
							<RotateCw className="mr-2 h-4 w-4" />
							Intentar otra vez
						</Button>
						<Button onClick={reloadPage} variant="outline" className="w-full">
							<RefreshCw className="mr-2 h-4 w-4" />
							Recargar la página
						</Button>
					</CardContent>
					<CardFooter className="flex flex-col items-start">
						<Collapsible
							open={isOpen}
							onOpenChange={setIsOpen}
							className="w-full"
						>
							<CollapsibleTrigger asChild>
								<Button variant="link" className="p-0 h-auto">
									<ChevronDown
										className={`h-4 w-4 mr-2 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
									/>
									{isOpen ? "Ocultar detalles" : "Mostrar detalles"}
								</Button>
							</CollapsibleTrigger>
							<CollapsibleContent className="mt-2">
								<p className="text-sm text-muted-foreground">
									Mensaje de error:{" "}
									<span className="font-mono">{error.message}</span>
								</p>
								{error.digest && (
									<p className="text-sm text-muted-foreground mt-1">
										Código de error:{" "}
										<span className="font-mono">{error.digest}</span>
									</p>
								)}
							</CollapsibleContent>
						</Collapsible>
					</CardFooter>
				</Card>
			</body>
		</html>
	);
}
