import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import NavLinksSettings from "./_components/nav-links";

interface SettingsLayoutProps {
	children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
	return (
		<section className="container max-w-6xl mx-auto min-h-[calc(100vh-4rem)] py-8 px-4">
			<div className="space-y-0.5">
				<h1 className="text-3xl font-bold tracking-tight">
					Configuración de la cuenta
				</h1>
				<p className="text-muted-foreground">
					Administra las preferencias y configuración de tu cuenta
				</p>
			</div>
			<Separator className="my-6" />
			<div className="flex flex-col gap-10 md:flex-row">
				<NavLinksSettings />
				{children}
			</div>
		</section>
	);
}
