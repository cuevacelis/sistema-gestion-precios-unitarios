"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Key, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NavLinksSettings() {
  const pathname = usePathname();
  const navItems = [
    {
      title: "General",
      href: "/dashboard/configuracion/general",
      icon: Settings,
    },
    {
      title: "Autenticación",
      href: "/dashboard/configuracion/autenticacion",
      icon: Key,
    },
  ];
  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
