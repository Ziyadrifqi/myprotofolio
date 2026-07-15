import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import Preloader from "@/components/Preloader";
import { PreloaderProvider } from "@/components/PreloaderContext";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ZiyadRifqi Permana — Full Stack Developer",
   icons: {
    icon: "/images/foto.png",
  },
  description:
    "Portofolio Ziyad Rifqi Permana, Full Stack Developer yang membangun produk web dari sistem backend sampai pengalaman antarmuka.",
  keywords: [
    "ZiyadRifqi Permana",
    "Full Stack Developer",
    "Web Developer Indonesia",
    "Next.js Developer",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${inter.variable} h-full scroll-smooth`}
      style={{ "--font-mono": "ui-monospace, monospace" } as React.CSSProperties}
    >
      <body className="min-h-full bg-ink text-fog antialiased">
        <PreloaderProvider>
          <Preloader />
          {children}
        </PreloaderProvider>
      </body>
    </html>
  );
}
