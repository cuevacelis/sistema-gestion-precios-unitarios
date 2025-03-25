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
import { AlertTriangle, RefreshCw, RotateCcw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	const reloadPage = () => {
		window.location.reload();
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary p-4">
			<Card className="w-full max-w-md shadow-lg">
				<CardHeader className="text-center">
					<AlertTriangle
						className="w-12 h-12 text-destructive mx-auto mb-4"
						aria-hidden="true"
					/>
					<CardTitle className="text-3xl font-bold">
						¡Oops! Algo salió mal
					</CardTitle>
					<CardDescription className="text-lg mt-2">
						Se ha producido un error inesperado. Por favor, intenta nuevamente.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="rounded-md border border-destructive/50 bg-destructive/10 p-4">
						<p className="text-sm font-medium mb-2">Detalles del error:</p>
						<p className="text-sm text-destructive break-words">
							{error.message}
						</p>
						{error.digest && (
							<p className="text-xs text-muted-foreground mt-2">
								ID del error: <code className="font-mono">{error.digest}</code>
							</p>
						)}
					</div>
					<p className="text-sm text-muted-foreground">
						Si el problema persiste, te recomendamos limpiar la caché de tu
						navegador o contactar con soporte.
					</p>
				</CardContent>
				<CardFooter className="flex flex-col space-y-2">
					<Button className="w-full" onClick={() => reset()} variant="default">
						<RotateCcw className="mr-2 h-4 w-4" /> Intentar de nuevo
					</Button>
					<Button className="w-full" onClick={reloadPage} variant="outline">
						<RefreshCw className="mr-2 h-4 w-4" /> Recargar la página
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
