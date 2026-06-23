import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Ziyad Rifqi Permana — Full Stack Developer",
  description:
    "Portofolio Ziyad Rifqi Permana, Full Stack Developer yang membangun produk web dari sistem backend sampai pengalaman antarmuka.",
  keywords: [
    "Ziyad Rifqi Permana",
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-ink text-fog antialiased">
        {children}
      </body>
    </html>
  );
}
