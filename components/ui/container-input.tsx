import { cn } from "@/lib/utils";
import ModuleIconsComponent from "../navbar/navbar-logged/_components/module-icons";
import { Label } from "./label";

interface IContainerInput {
  children: React.ReactNode;
  className?: string;
  icon?: string | React.ReactNode;
  nameLabel?: string;
  htmlFor: string;
}

export default function ContainerInput({
  children,
  className,
  icon,
  nameLabel,
  htmlFor,
}: IContainerInput) {
  return (
    <section className={cn("flex flex-col items-start gap-1", className)}>
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
      {children}
    </section>
  );
}
