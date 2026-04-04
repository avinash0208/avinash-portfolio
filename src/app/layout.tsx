import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { IntroAnimation } from "@/components/intro-animation";
import { QueryProvider } from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "Avinash Gupta | Senior Frontend Engineer",
  description:
    "Senior frontend engineer portfolio with SSR/CSR demos, MDX blogs, accessibility, localization, and modern web architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <IntroAnimation>{children}</IntroAnimation>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
