import { CaretSortIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import CustomMenuDropdownComponent from "./CustomMenuDropdown";

interface IProps {
  name?: string;
  selectionType: "single" | "multiple";
  disabled?: boolean;
  titleSelect?: string;
  listElements?: Array<{ key: string; name: string }>;
  defaultSelect?: { key: string; name: string };
  selectedItem: Array<{ key: string; name: string }>;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<
      {
        key: string;
        name: string;
      }[]
    >
  >;
  isLoading: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  isVirtualized?: boolean;
  isTooltip?: boolean;
}

export default function Combobox(props: IProps) {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(
    function assignSelectedDefault() {
      if (!props.isLoading && props.defaultSelect?.key) {
        props.setSelectedItem([props.defaultSelect]);
      }
    },
    [props.isLoading, props.defaultSelect?.key]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={clsx("w-full justify-between", {
            disabled: props.disabled,
          })}
        >
          {props.selectedItem.length === 0
            ? props?.name || "Seleccione"
            : props.selectedItem.length === 1 &&
                Boolean(props.selectedItem[0]?.key)
              ? props.selectedItem[0]?.name
              : `${props.selectedItem.length} de ${props.listElements?.length} seleccionados`}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <p>fsdfsdfsdf</p>
        {/* <CustomMenuDropdownComponent
          setIsShow={setOpen}
          selectionType={props.selectionType}
          titleSelect={props.titleSelect}
          listElements={props.listElements}
          selectedItem={props.selectedItem}
          setSelectedItem={props.setSelectedItem}
          isVirtualized={Boolean(props.isVirtualized)}
          isTooltip={props.isTooltip}
        /> */}
      </PopoverContent>
    </Popover>
  );
}
