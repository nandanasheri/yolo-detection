import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Inter } from "next/font/google";
import "./globals.css";

const Montserrat_Font = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const Inter_Font = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FridgePeek",
  description: "Save on groceries, get recipes based off of your Fridge!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Montserrat_Font.variable} ${Inter_Font.variable} antialiased`}
      >
        <main> 
        {children}
        </main>
      </body>
    </html>
  );
}
