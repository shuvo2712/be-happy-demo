import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import Navbar from "@/components/ui/Navbar";
import MobileTabBar from "@/components/ui/MobileTabBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Be Happy in Dhaka | Your Trusted Local Partner",
  description: "Everything You Need in Dhaka, One Call Away. Your comfort our commitment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body
        className={`${inter.className} min-h-full flex flex-col bg-slate-50 text-slate-900`}
        suppressHydrationWarning
      >
        <Navbar />
        {/* Add bottom padding on mobile so content is not hidden behind the tab bar */}
        <div className="flex-1 pb-[72px] md:pb-0">
          {children}
        </div>
        <FloatingActionButton />
        <MobileTabBar />
      </body>
    </html>
  );
}
