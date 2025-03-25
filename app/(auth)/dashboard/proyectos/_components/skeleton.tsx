import { Skeleton } from "@/components/ui/skeleton";

export function ProjectsRecentsSkeleton() {
	return (
		<section className="container p-6 space-y-6">
			<Skeleton className="h-10 w-full" />
			<Skeleton className="h-10 w-full" />
			<Skeleton className="h-10 w-full" />
		</section>
	);
}
