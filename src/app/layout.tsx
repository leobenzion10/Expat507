import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import ChatbotWidget from "@/components/ui/ChatbotWidget";
import Analytics from "@/components/ui/Analytics";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://expat507.com"),
  title: {
    default: "Expat507 — Tu guía insider para vivir e invertir en Panamá",
    template: "%s | Expat507",
  },
  description:
    "La plataforma de referencia para expatriados e inversionistas que quieren establecerse o invertir en Panamá. Guías de migración, bienes raíces, banca, y vida expat.",
  keywords: [
    "panamá expatriados",
    "invertir en panamá",
    "visa panamá",
    "bienes raíces panamá",
    "banca panamá",
    "residencia panamá",
    "expat507",
  ],
  authors: [{ name: "Expat507" }],
  creator: "Expat507",
  openGraph: {
    type: "website",
    locale: "es_PA",
    url: "https://expat507.com",
    siteName: "Expat507",
    title: "Expat507 — Tu guía insider para vivir e invertir en Panamá",
    description:
      "La plataforma de referencia para expatriados e inversionistas que quieren establecerse o invertir en Panamá.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Expat507",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expat507 — Tu guía insider para vivir e invertir en Panamá",
    description: "La plataforma de referencia para expatriados e inversionistas en Panamá.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Analytics />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppWidget />
        <ChatbotWidget />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0A1628",
              color: "#fff",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#C9A84C",
                secondary: "#0A1628",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
