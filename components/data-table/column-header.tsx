import {
	ArrowDownIcon,
	ArrowUpIcon,
	CaretSortIcon,
	EyeNoneIcon,
} from "@radix-ui/react-icons";
import type { Column } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue> {
	column: Column<TData, TValue>;
	title: React.ReactNode;
	hideSort?: boolean;
	className?: string;
}

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	className,
	hideSort,
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>;
	}

	return (
		<div className={cn("flex items-center space-x-2", className)}>
			{hideSort ? (
				<Button
					variant="ghost"
					size="sm"
					className="-ml-3 h-8 data-[state=open]:bg-accent"
				>
					<span>{title}</span>
				</Button>
			) : (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							className="-ml-3 h-8 data-[state=open]:bg-accent"
						>
							<span>{title}</span>
							{column.getIsSorted() === "desc" ? (
								<ArrowDownIcon className="ml-2 h-4 w-4" />
							) : column.getIsSorted() === "asc" ? (
								<ArrowUpIcon className="ml-2 h-4 w-4" />
							) : (
								<CaretSortIcon className="ml-2 h-4 w-4" />
							)}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
							<ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
							Ascendente
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
							<ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
							Descendente
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	);
}
