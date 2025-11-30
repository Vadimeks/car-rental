// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/styles/GlobalStyles";
import Header from "@/components/Header/Header";
import { Manrope, Inter } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "RentalCar App - Your best car rental choice",
  description:
    "Web application for the RentalCar company, allowing users to browse, filter, and rent vehicles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <div className="container">
            <Header />
            {children}
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
