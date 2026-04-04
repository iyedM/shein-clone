import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastViewport } from "@/components/ui/ToastViewport";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fr.shein-clone.local"),
  title: {
    default: "SHEIN Clone FR",
    template: "%s | SHEIN Clone FR",
  },
  description: "Mode femme, homme, enfant et maison à prix mini.",
  openGraph: {
    title: "SHEIN Clone FR",
    description: "Découvrez les nouveautés mode, ventes flash et offres exclusives.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${syne.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#FAFAF8] text-[#111111] font-dm-sans">
        <TopBar />
        <Header />
        <Navbar />
        <main className="min-h-[60vh] page-transition-fade">{children}</main>
        <Footer />
        <ToastViewport />
      </body>
    </html>
  );
}

