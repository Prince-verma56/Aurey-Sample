import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Geist } from "next/font/google";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { PreloaderProvider } from "@/components/providers/PreloaderProvider";
import { Preloader } from "@/components/layout/Preloader";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aurey | Premium Beauty & Skincare",
  description: "Korean Beauty for Indian Skin. Rooted in ritual, not routine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("antialiased", cormorant.variable, inter.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-screen flex flex-col bg-canvas text-text-primary">
        <PreloaderProvider>
          <Preloader />
          <LenisProvider>
            {children}
          </LenisProvider>
        </PreloaderProvider>
      </body>
    </html>
  );
}
