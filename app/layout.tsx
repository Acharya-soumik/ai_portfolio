import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Character Chat",
  description: "Neon cyberpunk AI chat interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
        ${geistSans.variable} 
        ${geistMono.variable} 
        antialiased 
        h-[100svh] 
        w-screen 
        bg-gradient-to-br 
        from-gray-900 
        via-purple-900 
        to-gray-900 
        overflow-hidden
      `}
      >
        <div className="relative w-full h-full flex flex-col-reverse md:flex-row justify-between items-center p-4 md:p-6">
          {children}
        </div>
      </body>
    </html>
  );
}
