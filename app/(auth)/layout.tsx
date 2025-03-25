import { auth } from "@/auth";
import NavbarLoggedSkeleton from "@/components/navbar/navbar-logged/_components/navbar-logged-skeleton";
import NavbarLoggedComponent from "@/components/navbar/navbar-logged/navbar-logged";
import { getModulosByUserId } from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const TanstackQueryProvider = dynamic(
	() => import("@/context/tanstack-query"),
	{
		loading: () => <NavbarLoggedSkeleton />,
	},
);

const AblyPimary = dynamic(() => import("@/context/ably"), {
	loading: () => <NavbarLoggedSkeleton />,
});

const AblySuscriptionProvider = dynamic(
	() => import("@/context/context-ably-suscription"),
	{
		loading: () => <NavbarLoggedSkeleton />,
	},
);

export default function AuthDashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Suspense fallback={<NavbarLoggedSkeleton />}>
			<GetDataNavbarLogged>{children}</GetDataNavbarLogged>
		</Suspense>
	);
}

async function GetDataNavbarLogged({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	const modulesByUser = await getModulosByUserId(Number(session?.user?.id));

	return (
		<TanstackQueryProvider>
			<AblyPimary session={session}>
				<AblySuscriptionProvider>
					<NavbarLoggedComponent
						session={session}
						modulesByUser={modulesByUser}
					>
						{children}
					</NavbarLoggedComponent>
				</AblySuscriptionProvider>
			</AblyPimary>
		</TanstackQueryProvider>
	);
}
