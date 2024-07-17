"use client";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { convertirRutaAItems, divideArrayToBreadcrumbItems } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

export default function BreadcrumbResponsive() {
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const items = convertirRutaAItems(pathname);
  const ITEMS_TO_DISPLAY = isDesktop ? 4 : 2;
  const arraySplit = divideArrayToBreadcrumbItems(items, ITEMS_TO_DISPLAY);

  const mainItems = arraySplit[0];
  const overflowItems = arraySplit[1];
  const endItems = arraySplit[2];

  return (
    <Breadcrumb>
      <BreadcrumbList className="truncate">
        {mainItems.map((item, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink asChild>
              <Link href={item.href}>{item.label}</Link>
            </BreadcrumbLink>
            {index < mainItems.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
        {overflowItems.length > 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isDesktop ? (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="flex items-center gap-1"
                    aria-label="Toggle menu"
                  >
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {overflowItems.map((item, index) => (
                      <DropdownMenuItem key={index}>
                        <Link href={item.href}>{item.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Drawer>
                  <DrawerTrigger aria-label="Toggle Menu">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>Navegar a</DrawerTitle>
                      <DrawerDescription>
                        Seleccione una página para navegar.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-1 px-4">
                      {overflowItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="py-1 text-sm"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <DrawerFooter className="pt-4">
                      <DrawerClose asChild>
                        <Button variant="outline">Cerrar</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </BreadcrumbItem>
          </>
        )}
        {endItems.map((item, index) => (
          <>
            {mainItems.length > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem key={index}>
              {item.href ? (
                <BreadcrumbLink
                  asChild
                  className="max-w-20 truncate md:max-w-none"
                >
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                  {item.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
