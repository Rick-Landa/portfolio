import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rick Landa | Desarrollador Full Stack",
  description:
    "Portfolio profesional de Rick Landa, desarrollador Full Stack de Coatzacoalcos, Veracruz. Especializado en Next.js, React, TypeScript, NestJS y más.",
  keywords: [
    "Rick Landa",
    "desarrollador web",
    "full stack",
    "Next.js",
    "React",
    "TypeScript",
    "Coatzacoalcos",
    "Veracruz",
    "México",
  ],
  authors: [{ name: "Rick Landa", url: "https://github.com/Rick-Landa" }],
  openGraph: {
    title: "Rick Landa | Desarrollador Full Stack",
    description:
      "Portfolio profesional de Rick Landa, desarrollador Full Stack de Coatzacoalcos, Veracruz.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
