import { AcmeLogo } from "@/app/dashboard/_components/acmeLogo";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

export default function NavbarUnloggedComponent() {
  return (
    <Navbar isBordered maxWidth="full" position="sticky">
      <NavbarContent justify="start" className="gap-10">
        <Link href={"/"}>
          <NavbarBrand className="flex-grow-0">
            <AcmeLogo />
            <p className="font-bold text-inherit">SGPU</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem isActive>
          <Link color="foreground" href="/" aria-current="page">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/manual" aria-current="page">
            Manual
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} color="primary" href="/login" variant="flat">
            Inciar sesión
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="secondary"
            href="/register"
            variant="flat"
            disabled
          >
            Registrarse
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
