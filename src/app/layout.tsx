import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppInitializer } from "@/components/AppInitializer";
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
  title: "Quiz App",
  description: "Simple Quiz App",
  openGraph: {
    title: "Create your quiz",
    description: "Build and share quizzes with Quiz App",
    url: "https://quiz-app-alpha-puce.vercel.app/",
    siteName: "Quiz App",
    images: [
      {
        url: "https://www.creativefabrica.com/wp-content/uploads/2020/09/02/Auto-car-logo-design-Graphics-5237528-1.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
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
        <AppInitializer />
        {children}
      </body>
    </html>
  );
}
