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
import { getLocale } from "@/lib/i18n/locale";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isEn = locale === "en";

  const title = isEn
    ? "Expat507 — Your insider guide to living and investing in Panama"
    : "Expat507 — Tu guía insider para vivir e invertir en Panamá";
  const description = isEn
    ? "The go-to platform for expatriates and investors looking to settle or invest in Panama. Guides on migration, real estate, banking, and expat life."
    : "La plataforma de referencia para expatriados e inversionistas que quieren establecerse o invertir en Panamá. Guías de migración, bienes raíces, banca, y vida expat.";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s | Expat507",
    },
    description,
    keywords: isEn
      ? ["panama expats", "invest in panama", "panama visa", "panama real estate", "panama banking", "panama residency", "expat507"]
      : ["panamá expatriados", "invertir en panamá", "visa panamá", "bienes raíces panamá", "banca panamá", "residencia panamá", "expat507"],
    authors: [{ name: "Expat507" }],
    creator: "Expat507",
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "es_PA",
      url: SITE_URL,
      siteName: "Expat507",
      title,
      description,
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
      title,
      description,
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
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen flex flex-col">
        <LocaleProvider initialLocale={locale}>
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
        </LocaleProvider>
      </body>
    </html>
  );
}
