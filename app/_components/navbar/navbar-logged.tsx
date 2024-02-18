"use client";

import { signOutActionServer } from "@/app/_utils/actionsAuthenticate";
import { AcmeLogo } from "@/app/dashboard/_components/acmeLogo";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Link } from "@nextui-org/link";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import { Session } from "next-auth";
import { useTheme } from "next-themes";

export default function NavbarLoggedComponent(props: { session: Session }) {
  const { theme, setTheme } = useTheme();

  return (
    <Navbar isBordered maxWidth="full" position="sticky">
      <NavbarContent justify="start" className="gap-10">
        <Link color="foreground" href={"/dashboard"}>
          <NavbarBrand className="flex-grow-0">
            <AcmeLogo />
            <p className="font-bold text-inherit">SGPU</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown
          radius="sm"
          classNames={{
            base: "before:bg-default-200",
            content: "p-0 border-small border-divider bg-background",
          }}
        >
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={String(props.session?.user?.name)}
              showFallback
              size="sm"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Custom menu">
            {/* <DropdownSection aria-label="Profile & Actions" showDivider>
              <DropdownItem
                isReadOnly
                key="profile"
                className="h-14 gap-2"
                textValue={props.session?.user?.usu_Correo}
              >
                <p className="font-semibold">Iniciado sesión como</p>
                <p className="font-semibold">
                  {props.session?.user?.usu_Correo}
                </p>
              </DropdownItem>
              <DropdownItem key="dashboard">Dashboard</DropdownItem>
              <DropdownItem key="settings">Configuración</DropdownItem>
              <DropdownItem
                key="new_project"
                endContent={<PlusIcon className="text-large" />}
              >
                Nuevo
              </DropdownItem>
            </DropdownSection> */}

            <DropdownSection aria-label="Preferences" showDivider>
              {/* <DropdownItem key="quick_search" shortcut="⌘K">
                Busqueda
              </DropdownItem> */}
              <DropdownItem
                isReadOnly
                key="theme"
                className="cursor-default"
                endContent={
                  <select
                    className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                    id="theme"
                    name="theme"
                    defaultValue={theme}
                    onChange={(e) => setTheme(String(e.target.value))}
                  >
                    <option value={"dark"}>Oscuro</option>
                    <option value={"light"}>Claro</option>
                  </select>
                }
              >
                Tema
              </DropdownItem>
            </DropdownSection>

            <DropdownSection aria-label="Help & Feedback">
              {/* <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem> */}
              <DropdownItem
                key="logout"
                color="danger"
                className="text-danger"
                onClick={async () => {
                  await signOutActionServer();
                }}
              >
                Cerrar sesión
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
