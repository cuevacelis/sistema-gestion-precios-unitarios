import { ThemeProvider } from "@/components/theme-provider";
import { GestionEstudiantesProvider } from "@/context/context-gestion-estudiantes";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

export const metadata: Metadata = {
  title: {
    template: "%s | SGPU",
    default: "SGPU",
  },
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className="dark"
      style={{ colorScheme: "dark" }}
      // suppressHydrationWarning
    >
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <GestionEstudiantesProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </GestionEstudiantesProvider>
      </body>
    </html>
  );
}
