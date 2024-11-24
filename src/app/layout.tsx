import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from '../utils/theme'
import AuthProvider from "@/providers/AuthProvider";
import Navbar from "@/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <div className="container">
              <Navbar />
              {children}
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
