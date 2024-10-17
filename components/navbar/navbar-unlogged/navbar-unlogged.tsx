import { ModeToggle } from "@/components/theme-switch/mode-toggle";
import LogoComponent from "@/components/ui/logo/logo";
import Link from "next/link";

export default function NavbarUnloggedComponent() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <LogoComponent />
          <span className="font-bold">CALCPU</span>
        </Link>
        <div className="flex items-center gap-4 text-sm lg:gap-6 justify-end">
          <nav className="items-center gap-4 text-sm lg:gap-6 hidden sm:flex">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Home
            </Link>
            <Link
              href="/manual"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Manual
            </Link>
            <Link
              href="/login"
              className="transition-colors hover:text-foreground/80 text-foreground bg-primary text-white px-4 py-2 rounded-md"
            >
              Iniciar sesión
            </Link>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
