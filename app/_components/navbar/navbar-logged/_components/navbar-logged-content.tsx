"use client";
import { actionsSignOut } from "@/app/_actions/authenticate";
import { IfetchUserLoggedResp } from "@/app/_types/user";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { NavbarContent } from "@nextui-org/navbar";
import { useTheme } from "next-themes";

export default function NavbarLoggedContent(props: {
  dataInfoUser: IfetchUserLoggedResp;
}) {
  const { theme, setTheme } = useTheme();
  return (
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
            name={String(props.dataInfoUser.data.usu_NomApellidos)}
            showFallback
            size="sm"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="sgpu menu">
          <DropdownSection aria-label="Preferences" showDivider>
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
            <DropdownItem
              key="logout"
              color="danger"
              className="text-danger"
              onClick={async () => {
                await actionsSignOut();
              }}
            >
              Cerrar sesión
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
}