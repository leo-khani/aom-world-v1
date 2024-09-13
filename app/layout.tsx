import type { Metadata } from "next";
import "./globals.css";
import { Sen } from "next/font/google";
import { Toaster } from "react-hot-toast";

const sen = Sen({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Aom World",
  description: "World of Age of Mythology",
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
      <body className={`${sen} antialiased`}>
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
