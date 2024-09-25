import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import { auth } from "@/auth";
import dynamic from "next/dynamic";
import AblySuscriptionProvider from "@/context/context-ably-suscription";
import ThemeProvider from "@/components/theme-provider";
const AblyPimary = dynamic(() => import("@/context/ably"), {
  ssr: false,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1fb155" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

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
  const session = await auth();
  return (
    <html lang="es" className="dark">
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
          enableColorScheme={true}
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <AblyPimary session={session}>
            <AblySuscriptionProvider>{children}</AblySuscriptionProvider>
          </AblyPimary>
        </ThemeProvider>
      </body>
    </html>
  );
}
