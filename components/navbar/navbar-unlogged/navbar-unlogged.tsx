import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@/components/ui/navbar";
import LogoComponent from "../../ui/logo/logo";

export default function NavbarUnloggedComponent() {
  return (
    <Navbar isBordered maxWidth="full" position="sticky">
      <NavbarContent justify="start" className="gap-10">
        <Link color="foreground" href={"/"}>
          <NavbarBrand className="flex-grow-0">
            <LogoComponent />
            <p className="font-bold text-inherit">SGPU</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Link color="foreground" href="/" aria-current="page">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Link color="foreground" href="/manual" aria-current="page">
            Manual
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/login" variant="flat">
            Inciar sesión
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
