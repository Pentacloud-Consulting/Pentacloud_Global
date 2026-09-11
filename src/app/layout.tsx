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
  title: "Pentacloud Consulting | Your Trusted Partner in Innovation & Technology",
  description: "Empowering businesses with the right technology to innovate, grow, and succeed.",
  openGraph: {
    title: "Pentacloud Consulting | Your Trusted Partner in Innovation & Technology",
    description: "Empowering businesses with the right technology to innovate, grow, and succeed.",
    url: "https://pentacloud.in/",
    siteName: "Pentacloud Consulting",
    type: "website",
  },
  icons: {
    icon: "/Logo/Penta Favicon.png",
    shortcut: "/Logo/Penta Favicon.png",
    apple: "/Logo/Penta Favicon.png",
  },
};

import WhatsApp from "@/Details/WhatsApp/WhatsApp";
import SplashWrapper from "@/Animation/SplashWrapper";

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
        <SplashWrapper>
          {children}
          <WhatsApp />
        </SplashWrapper>
      </body>
    </html>
  );
}
