// "use client";
// import { IFetchUserLogged } from "@/lib/types/types";
// import { Avatar } from "@/components/ui/avatar";
// import LogoComponent from "@/components/ui/logo/logo";
// import { actionsSignOut } from "@/lib/actions/actionsServer";
// import { useTheme } from "next-themes";

// export default function NavbarLoggedComponent(props: {
//   dataInfoUser: IFetchUserLogged;
// }) {
//   const { theme, setTheme } = useTheme();

//   return (
//     <Navbar isBordered maxWidth="full" position="sticky">
//       <NavbarContent justify="start" className="gap-10">
//         <Link color="foreground" href={"/dashboard"}>
//           <NavbarBrand className="flex-grow-0">
//             <LogoComponent />
//             <p className="font-bold text-inherit">SGPU</p>
//           </NavbarBrand>
//         </Link>
//       </NavbarContent>

//       <NavbarContent as="div" justify="end">
//         <Dropdown
//           radius="sm"
//           classNames={{
//             base: "before:bg-default-200",
//             content: "p-0 border-small border-divider bg-background",
//           }}
//         >
//           <DropdownTrigger>
//             <Avatar
//               isBordered
//               as="button"
//               className="transition-transform"
//               color="primary"
//               name={String(props.dataInfoUser?.data?.usu_NomApellidos)}
//               showFallback
//               size="sm"
//             />
//           </DropdownTrigger>
//           <DropdownMenu aria-label="sgpu menu">
//             <DropdownSection aria-label="Preferences" showDivider>
//               <DropdownItem
//                 isReadOnly
//                 key="theme"
//                 className="cursor-default"
//                 endContent={
//                   <select
//                     className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
//                     id="theme"
//                     name="theme"
//                     defaultValue={theme}
//                     onChange={(e) => setTheme(String(e.target.value))}
//                   >
//                     <option value={"dark"}>Oscuro</option>
//                     <option value={"light"}>Claro</option>
//                   </select>
//                 }
//               >
//                 Tema
//               </DropdownItem>
//             </DropdownSection>

//             <DropdownSection aria-label="Help & Feedback">
//               <DropdownItem
//                 key="logout"
//                 color="danger"
//                 className="text-danger"
//                 onClick={async () => {
//                   await actionsSignOut();
//                 }}
//               >
//                 Cerrar sesión
//               </DropdownItem>
//             </DropdownSection>
//           </DropdownMenu>
//         </Dropdown>
//       </NavbarContent>
//     </Navbar>
//   );
// }
"use client";
import { useState } from "react";
import SidebarComponent from "./_components/sidebar";
import TopBarComponent from "./_components/topbar";

interface IProps {
  children: React.ReactNode;
}

export default function NavbarLoggedComponent(props: IProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // await simulateLongWait(1000);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <SidebarComponent {...{ isExpanded, setIsExpanded }} />
      <div className="flex flex-col">
        <TopBarComponent />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {props.children}
        </main>
      </div>
    </div>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-muted/40">
      <div className="grid grid-cols-[auto,1fr]">
        <SidebarComponent {...{ isExpanded, setIsExpanded }} />
        <section className="flex flex-col sm:gap-4">
          <TopBarComponent />
          {props.children}
        </section>
      </div>
      {/* <SidebarComponent {...{ isExpanded, setIsExpanded }} />
      <section
        className={`flex flex-col sm:gap-4  ${isExpanded ? "sm:pl-44" : "sm:pl-14"}`}
      >
        <TopBarComponent />
        {props.children}
      </section> */}
    </div>
  );
}
