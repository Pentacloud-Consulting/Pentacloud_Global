import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pentacloud.in'),
  title: {
    default: "Pentacloud Consulting | Salesforce, Zoho & Cloud IT Partner",
    template: "%s | Pentacloud Consulting"
  },
  description: "Pentacloud Consulting is a certified Salesforce, Zoho, Cloud Solutions, App Development, and Digital Transformation partner operating in India, UAE, and Qatar.",
  keywords: [
    "Salesforce Consulting India",
    "Salesforce Partner Dubai",
    "Zoho Implementation Partner",
    "Cloud Consulting Bengaluru",
    "Pentacloud Consulting",
    "Digital Marketing Services RT Nagar",
    "IT Consulting Qatar"
  ],
  authors: [{ name: "Pentacloud Consulting" }],
  creator: "Pentacloud Consulting",
  publisher: "Pentacloud Consulting",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Pentacloud Consulting | Salesforce, Zoho & Cloud IT Partner",
    description: "Empowering businesses with Salesforce, Zoho, Cloud Services, and Digital Transformation across India, UAE, and Qatar.",
    url: "https://pentacloud.in/",
    siteName: "Pentacloud Consulting",
    images: [
      {
        url: "/Logo/Penta Favicon.png",
        width: 1200,
        height: 630,
        alt: "Pentacloud Consulting Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pentacloud Consulting | Salesforce, Zoho & Cloud IT Partner",
    description: "Empowering businesses with Salesforce, Zoho, Cloud Services, and Digital Transformation.",
    images: ["/Logo/Penta Favicon.png"],
  },
  icons: {
    icon: "/Logo/Penta Favicon.png",
    shortcut: "/Logo/Penta Favicon.png",
    apple: "/Logo/Penta Favicon.png",
  },
};

import WhatsApp from "@/Details/WhatsApp/WhatsApp";
import SplashWrapper from "@/Animation/SplashWrapper";
import JsonLdSchema from "@/Component/JsonLdSchema";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <JsonLdSchema />
        <SplashWrapper>
          {children}
          <WhatsApp />
        </SplashWrapper>
      </body>
    </html>
  );
}
