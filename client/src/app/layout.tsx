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
        <main className="flex flex-col gap-2 pt-5 px-5 items-center"> 
          <NavBar/>
        {children}
        </main>
      </body>
    </html>
  );
}
