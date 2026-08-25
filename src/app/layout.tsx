import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/seo";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Premium Interior Designers in Hyderabad`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "Interior Designers Hyderabad",
    "Luxury Interior Design",
    "Home Renovation Hyderabad",
    "Turnkey Interiors",
    "Architecture Hyderabad",
    "Commercial Interiors",
    "Residential Interiors",
    "Construction Hyderabad",
    "WPC PVC Boards Hyderabad",
    "Triova Infradesigns",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: siteUrl,
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${outfit.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <LocalBusinessJsonLd />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <BackToTop />
        <MobileCallBar />
        {/* Clears the sticky mobile call bar so it never covers the footer. */}
        <div aria-hidden="true" className="h-14 sm:hidden" />
      </body>
    </html>
  );
}
