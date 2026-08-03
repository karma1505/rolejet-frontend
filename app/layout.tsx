import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// layout components handled locally where needed
export const metadata: Metadata = {
  title: "RoleJet | Apply less. Hear back more.",
  description: "An intelligence-first career and job application terminal.",
};

import { ThemeProvider } from "./components/providers/ThemeProvider";
import { UserProvider } from "./components/providers/UserProvider";
import GoogleOneTap from "./components/auth/GoogleOneTap";
import SmoothScroll from "./components/providers/SmoothScroll";
import BackgroundGlow from "./components/ui/BackgroundGlow";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-sans bg-background text-text-primary transition-colors duration-300 relative">
        <BackgroundGlow />
        <ThemeProvider>
          <UserProvider>
            <SmoothScroll>
              {children}
            </SmoothScroll>
            <GoogleOneTap />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
