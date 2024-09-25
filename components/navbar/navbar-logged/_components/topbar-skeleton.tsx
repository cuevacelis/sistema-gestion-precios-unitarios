import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Menu, Bell } from "lucide-react";

export default function TopBarSkeleton() {
  return (
    <header className="sticky top-0 z-20 w-full flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 border-l bg-background">
      <Button variant="outline" size="icon" className="shrink-0 md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>

      <div className="flex flex-row flex-1 items-center gap-x-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </header>
  );
}
