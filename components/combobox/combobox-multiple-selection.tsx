"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Option {
	value: string;
	label: string;
}

interface ComboboxMultipleSelectionProps {
	options: Option[];
	onSelect: (values: string[]) => void;
	placeholder?: string;
	messageEmpty?: string;
}

export default function ComboboxMultipleSelection({
	options,
	onSelect,
	placeholder = "Selecciona opciones...",
	messageEmpty = "No se encontró ninguna opción.",
}: ComboboxMultipleSelectionProps) {
	const [open, setOpen] = React.useState(false);
	const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

	const handleSelect = (value: string) => {
		const newSelectedValues = selectedValues.includes(value)
			? selectedValues.filter((v) => v !== value)
			: [...selectedValues, value];
		setSelectedValues(newSelectedValues);
		onSelect(newSelectedValues);
	};

	const handleRemove = (value: string) => {
		const newSelectedValues = selectedValues.filter((v) => v !== value);
		setSelectedValues(newSelectedValues);
		onSelect(newSelectedValues);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					{selectedValues.length > 0 ? (
						<div className="flex flex-wrap gap-1">
							{selectedValues.map((value) => (
								<Badge key={value} variant="secondary" className="mr-1">
									{options.find((option) => option.value === value)?.label}
									<button
										className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												handleRemove(value);
											}
										}}
										onMouseDown={(e) => {
											e.preventDefault();
											e.stopPropagation();
										}}
										onClick={() => handleRemove(value)}
									>
										<X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
									</button>
								</Badge>
							))}
						</div>
					) : (
						placeholder
					)}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput placeholder="Buscar opción..." />
					<CommandEmpty>{messageEmpty}</CommandEmpty>
					<CommandGroup>
						{options.map((option) => (
							<CommandItem
								key={option.value}
								value={option.value}
								onSelect={() => handleSelect(option.value)}
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										selectedValues.includes(option.value)
											? "opacity-100"
											: "opacity-0",
									)}
								/>
								{option.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
