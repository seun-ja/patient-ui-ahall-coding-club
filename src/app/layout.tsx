import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Health Portal",
  description: "Appointment Management",
  openGraph: {
    title: "Health Portal",
    description: "Appointment Management",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Health Portal Favicon Preview",
      },
    ],
    siteName: "Health Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Health Portal",
    description: "Appointment Management",
    images: ["/favicon.ico"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
