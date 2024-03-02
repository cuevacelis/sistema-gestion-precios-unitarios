import { Link } from "@nextui-org/link";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import { Skeleton } from "@nextui-org/react";
import { AcmeLogoComponent } from "../../logo/acme-logo";

export default function NavbarSkeletonComponent() {
  return (
    <Navbar isBordered maxWidth="full" position="sticky">
      <NavbarContent justify="start" className="gap-10">
        <Link color="foreground" href={"/dashboard"}>
          <NavbarBrand className="flex-grow-0">
            <AcmeLogoComponent />
            <p className="font-bold text-inherit">SGPU</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Skeleton className="flex rounded-full w-9 h-9" />
      </NavbarContent>
    </Navbar>
  );
}
