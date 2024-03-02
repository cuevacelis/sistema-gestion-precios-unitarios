import { fetchUserLogged } from "@/app/_lib/fetch-api/user";
import { Link } from "@nextui-org/link";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import { Session } from "next-auth";
import { AcmeLogoComponent } from "../../logo/acme-logo";
import NavbarLoggedContent from "./_components/navbar-logged-content";

export default async function NavbarLoggedComponent(props: {
  session: Session;
}) {
  await new Promise((resolve, reject) => setTimeout(resolve, 1000));
  const dataInfoUser = await fetchUserLogged({
    token: String(props.session.user?.token),
  });

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

      <NavbarLoggedContent dataInfoUser={dataInfoUser} />
    </Navbar>
  );
}
