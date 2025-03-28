"use client";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { useMediaQuery } from "usehooks-ts";

interface Option {
	value: string;
	label: string;
}

export interface ComboboxSingleSelectionProps {
	options: Option[];
	onSelect: (value: string | null) => void;
	placeholder?: string;
	disabled?: boolean;
	value: string | null;
	className?: string;
	messageEmpty?: React.ReactNode;
}

const normalizeText = (text: string): string => {
	return text
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();
};

export default function ComboboxSingleSelection({
	options,
	onSelect,
	placeholder = "Selecciona una opción...",
	disabled = false,
	value,
	className,
	messageEmpty = "No se encontró ninguna opción.",
}: ComboboxSingleSelectionProps) {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const safeOptions = React.useMemo(
		() => (Array.isArray(options) ? options : []),
		[options],
	);

	const handleSelect = (selectedValue: string) => {
		onSelect(value === selectedValue ? null : selectedValue);
		setOpen(false);
	};

	const content = (
		<Command>
			<CommandInput placeholder="Buscar opción..." />
			<CommandList>
				<CommandEmpty>{messageEmpty}</CommandEmpty>
				<CommandGroup>
					{safeOptions.map((option) => (
						<CommandItem
							key={option.value}
							value={normalizeText(option.label)}
							onSelect={() => handleSelect(option.value)}
							className="w-full"
						>
							<Check
								className={cn(
									"mr-2 h-4 w-4",
									value === option.value ? "opacity-100" : "opacity-0",
								)}
							/>
							{option.label}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);

	const trigger = (
		<Button
			variant="outline"
			role="combobox"
			aria-expanded={open}
			className="w-full justify-between flex items-center gap-2 overflow-hidden"
			disabled={disabled}
		>
			<span className="max-w-full truncate">
				{value
					? safeOptions.find((option) => option.value === value)?.label
					: placeholder}
			</span>
			<ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
		</Button>
	);

	if (isDesktop) {
		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild className={cn(className, "")}>
					{trigger}
				</PopoverTrigger>
				<PopoverContent
					className="w-full p-0"
					style={{ width: "var(--radix-popover-trigger-width)" }}
				>
					{content}
				</PopoverContent>
			</Popover>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild className={cn(className)}>
				{trigger}
			</DrawerTrigger>
			<DrawerContent>
				<div className="mt-4 border-t">{content}</div>
			</DrawerContent>
		</Drawer>
	);
}
