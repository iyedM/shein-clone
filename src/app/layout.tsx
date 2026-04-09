import type { Metadata } from "next";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastViewport } from "@/components/ui/ToastViewport";
import { NewsletterPopup } from "@/components/ui/NewsletterPopup";
import { RecentlyViewed } from "@/components/ui/RecentlyViewed";
import { SmartBar } from "@/components/layout/SmartBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://fr.shein-clone.local"),
  title: {
    default: "SHEIN AI | Hyper-Fluid Commerce",
    template: "%s | SHEIN AI",
  },
  description: "Mode 2026 : l'expérience shopping la plus fluide au monde.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased font-satoshi">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@700,800&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[#FAFAF8] text-[#111111] selection:bg-[#E8393A]/10 selection:text-[#E8393A] transition-colors duration-500">
        <TopBar />
        <Header />
        <Navbar />
        <main className="min-h-[60vh] relative">{children}</main>
        <Footer />
        <ToastViewport />
        <NewsletterPopup />
        <RecentlyViewed />
        <SmartBar />
      </body>
    </html>
  );
}

