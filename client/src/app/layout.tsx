import type { Metadata } from "next";
import {Montserrat, Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

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
        <div className="flex justify-center gap-1 items-center">
        <div className="absolute top-4 left-4">
          <h2 className="text-xl font-bold font-head "><a href="/">Fridge Peek</a></h2>
        </div>
        <NavBar/>
        </div>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
