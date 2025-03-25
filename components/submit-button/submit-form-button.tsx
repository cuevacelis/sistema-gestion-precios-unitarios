"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	Loader2,
	LoaderCircle,
	LoaderIcon,
	LoaderPinwheel,
} from "lucide-react";

interface IProps {
	disabled?: boolean;
	isPending: boolean;
	name?: React.ReactNode;
	nameLoading?: React.ReactNode;
	className?: string;
}

export default function SubmitFormButtonComponent({
	disabled,
	isPending,
	name = "Guardar",
	nameLoading = "Guardando...",
	className,
}: IProps) {
	return (
		<Button
			type="submit"
			className={cn("btn btn-primary max-w-full truncate", className)}
			aria-disabled={isPending || disabled}
			disabled={isPending || disabled}
		>
			{isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
			{isPending ? nameLoading : name}
		</Button>
	);
}
