import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UserSync } from "@/components/UserSync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DORANDISHI - AI Match Outcome & MVP Predictions",
  description:
    "Predict League of Legends match outcomes and MVP candidates using advanced AI analysis",
  icons: {
    icon: "/convex.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ClerkProvider dynamic>
          <ConvexClientProvider>
            <UserSync />
            <Header />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
