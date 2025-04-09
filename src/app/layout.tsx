import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClickSparkEffect } from "@/components/ui/click-spark";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SparkMint",
  description: "Create and launch full dApps from a simple idea",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-spark-dark text-white min-h-screen`}>
        {children}
        <ClickSparkEffect color="#FDE533" />
      </body>
    </html>
  );
}
