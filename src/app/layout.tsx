import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DSdle 95",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-teal-700")}>{children}</body>
    </html>
  );
}
