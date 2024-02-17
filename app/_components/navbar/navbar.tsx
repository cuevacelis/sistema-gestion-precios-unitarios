import { auth } from "@/auth";
import NavbarLoggedComponent from "./navbar-logged";
import NavbarUnloggedComponent from "./navbar-unlogged";

export default async function NavbarComponent() {
  const session = await auth();

  if (!session) {
    return <NavbarUnloggedComponent />;
  } else {
    return <NavbarLoggedComponent session={session} />;
  }
}
