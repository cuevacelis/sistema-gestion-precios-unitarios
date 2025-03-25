import { Skeleton } from "@/components/ui/skeleton";

export default function EditarProyectoSkeleton() {
	return (
		<form className="grid grid-cols-1 gap-6 sm:grid-cols-2">
			{/* Nombre usuario */}
			<div className="space-y-2">
				<Skeleton className="h-4 w-[100px]" />
				<Skeleton className="h-10 w-full" />
			</div>

			{/* Cliente */}
			<div className="space-y-2">
				<Skeleton className="h-4 w-[100px]" />
				<Skeleton className="h-10 w-full" />
			</div>

			{/* Nombre del proyecto */}
			<div className="space-y-2">
				<Skeleton className="h-4 w-[150px]" />
				<Skeleton className="h-10 w-full" />
			</div>

			{/* País */}
			<div className="space-y-2">
				<Skeleton className="h-4 w-[100px]" />
				<Skeleton className="h-10 w-full" />
			</div>

			{/* Departamento */}
			<div className="space-y-2">
				<Skeleton className="h-4 w-[120px]" />
				<Skeleton className="h-10 w-full" />
			</div>

			{/* Provincia */}
			<div className="space-y-2">
				<Skeleton className="h-4 w-[100px]" />
				<Skeleton className="h-10 w-full" />
			</div>

			{/* Distrito */}
			<div className="space-y-2">
				<Skeleton className="h-4 w-[100px]" />
				<Skeleton className="h-10 w-full" />
			</div>

			{/* Jornal */}
			<div className="space-y-2">
				<Skeleton className="h-4 w-[100px]" />
				<Skeleton className="h-10 w-full" />
			</div>

			{/* Submit button */}
			<div className="col-span-full">
				<Skeleton className="h-10 w-full max-w-[200px]" />
			</div>
		</form>
	);
}
