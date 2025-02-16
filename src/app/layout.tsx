import type { Metadata } from "next";
import "./globals.css";
import { TranslationProvider } from "@/components/translation-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { geist } from "./fonts";

export const metadata: Metadata = {
  title: "Speedchars",
  description: "This analytics tool for speedwriting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased w-screen h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <TranslationProvider>{children}</TranslationProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
