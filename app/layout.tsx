import type { Metadata } from "next";
import "./globals.css";
import { Sen } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

const nycd = Sen({
  subsets: ["latin"],
  variable: "--font-nycd",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aom World Live Leaderboard",
    template: "%s | Aom World",
  },
  description: "View the leaderboard of the live AOM World.",

  /*twitter: {
    card: "summary_large_image",
  },*/

  keywords: [
    "aom",
    "aom world",
    "aom world live leaderboard",
    "aom live leaderboard",
    "aom live",
    "aom leaderboard",
    "aom world leaderboard",
    "aom leaderboard live",
    "aom leaderboard live leaderboard",
    "aom leaderboard live leaderboard",
    "aom leaderboard live leaderboard",
  ],
};

import { NextUIProvider } from "@nextui-org/react";
import Header from "@/components/Header";
import Footer from "@/components/main/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nycd.variable} antialiased font-nycd`}>
        <Analytics />
        <Header />

        <NextUIProvider>
          <main className="container mx-auto dark text-foreground bg-background font-sen">
            <Toaster position="bottom-right" />
            {children}
          </main>
        </NextUIProvider>
        <Footer />
      </body>
    </html>
  );
}
