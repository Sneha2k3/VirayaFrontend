import Footer from "@/shared/Footer/Footer";
import Nav from "@/shared/Navbar/Nav";
import ScrollToTop from "@/shared/ScrollToTop";
import Whatsapp from "@/shared/Whatsapp/Whatsapp";
import { Providers } from "@/store/providers";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Vitraya",
    template: "%s | Khandbari Rudraksha and Suppliers",
  },
  description:
    "Premium quality authentic Rudraksha from Nepal. Buy certified 1-21 Mukhi Rudraksha, Malas, Bracelets with guaranteed authenticity. Same-day shipping and spiritual consultation.",
  keywords: [
    "Rudraksha",
    "Nepali Rudraksha",
    "authentic Rudraksha",
    "Khandbari Rudraksha",
    "Rudraksha suppliers",
    "Rudraksha beads",
    "original Rudraksha",
    "certified Rudraksha",
    "1 Mukhi Rudraksha",
    "5 Mukhi Rudraksha",
    "Gauri Shankar",
    "Rudraksha mala",
    "Rudraksha bracelet",
    "spiritual jewelry",
    "Rudraksha benefits",
    "Nepal Rudraksha",
  ],
  authors: [
    {
      name: "Khandbari Rudraksha and Suppliers",
      url: "https://khandbarirudraksha.com",
    },
  ],
  creator: "Khandbari Rudraksha and Suppliers",
  publisher: "Khandbari Rudraksha and Suppliers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://khandbarirudraksha.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "hi-IN": "/hi-IN",
    },
  },
  openGraph: {
    title: "Khandbari Rudraksha and Suppliers | Authentic Nepali Rudraksha",
    description:
      "Premium quality authentic Rudraksha from Nepal. Buy certified 1-21 Mukhi Rudraksha, Malas, Bracelets with guaranteed authenticity.",
    url: "https://khandbarirudraksha.com",
    siteName: "Khandbari Rudraksha and Suppliers",
    images: [
      {
        url: "/bg-2.png",
        width: 1200,
        height: 630,
        alt: "Khandbari Rudraksha and Suppliers - Premium Authentic Rudraksha",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  category: "spiritual products",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#F4F6FF] text-black">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* Structured data for Product */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Khandbari Rudraksha and Suppliers",
              url: "https://khandbarirudraksha.com",
              logo: "https://khandbarirudraksha.com/Logo.webp",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+977-9849200954",
                contactType: "customer service",
                availableLanguage: ["English", "Nepali", "Hindi"],
              },
              description:
                "Premium quality authentic Rudraksha from Nepal. Buy certified Rudraksha with guaranteed authenticity.",
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${poppins.className} antialiased mx-auto max-w-screen-[2000px] bg-[#F4F6FF] text-black`}
      >
        <Providers>
          <Nav />
          <Toaster richColors />
          <main className="py-20">{children}</main>
          <ScrollToTop />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
