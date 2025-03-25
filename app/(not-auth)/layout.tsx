import NavbarUnloggedComponent from "@/components/navbar/navbar-unlogged/navbar-unlogged";

export default function NotAuthDashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<NavbarUnloggedComponent />
			{children}
		</>
	);
}
