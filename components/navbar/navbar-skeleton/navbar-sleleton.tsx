import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleUser } from "lucide-react";

export default function NavbarSkeletonComponent() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 justify-between">
            <Skeleton className="flex items-center h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Skeleton className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary h-4 w-52 mb-6 mt-4" />
              <Skeleton className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary h-4 w-52 mb-6 mt-4" />
              <Skeleton className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary h-4 w-52 mb-6 mt-4" />
              <Skeleton className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary h-4 w-52 mb-6 mt-4" />
              <Skeleton className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary h-4 w-52 mb-6 mt-4" />
              <Skeleton className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary h-4 w-52 mb-6 mt-4" />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Skeleton className="w-full h-4 pl-8 shadow-none md:w-2/3 lg:w-1/3" />
              </div>
            </form>
          </div>
          <Skeleton>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
            </Button>
          </Skeleton>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <section className="h-home flex justify-center items-center">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"></div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
