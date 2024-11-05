import { cn } from "@/lib/utils";
import ModuleIconsComponent from "../navbar/navbar-logged/_components/module-icons";
import { Label } from "./label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";

interface IContainerInput {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  nameLabel?: React.ReactNode;
  htmlFor: string;
  tooltip?: React.ReactNode;
}

export default function ContainerInput({
  children,
  className,
  icon,
  nameLabel,
  htmlFor,
  tooltip,
}: IContainerInput) {
  return (
    <section className={cn("flex flex-col items-start gap-1", className)}>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex flex-row gap-1">
              {typeof icon === "string" ? (
                <ModuleIconsComponent className="w-5 h-5" modNombre={icon} />
              ) : (
                icon
              )}
              <Label className="text-sm font-medium" htmlFor={htmlFor}>
                {nameLabel}
              </Label>
            </div>
          </TooltipTrigger>

          {tooltip && (
            <TooltipContent>
              <TooltipArrow className="fill-primary" />
              <p>{tooltip}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      {children}
    </section>
  );
}
