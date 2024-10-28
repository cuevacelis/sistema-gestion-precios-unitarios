"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { SidebarClose } from "lucide-react";
import Link from "next/link";

export default function SkeletonSidebarComponent() {
  return (
    <section
      className={cn(
        "transition-all duration-400 ease-in-out items-center gap-4 sm:py-4 overflow-hidden",
        "w-64 px-4 lg:px-6 hidden md:block"
      )}
    >
      <div className="flex justify-between items-center text-muted-foreground mb-4 font-normal">
        <Button variant="outline" size="icon" className="h-8 w-8" disabled>
          <SidebarClose className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1">
        <nav className="grid items-start text-sm font-normal">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-lg px-3 py-2 mt-4"
            >
              <Skeleton className="h-6 w-6 rounded-md" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
