import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetSoft - Pet daycare made simple",
  description: "Take care of people's pets responsibly with PetSoft",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen text-sm text-zinc-900`}
        style={{
          backgroundImage: "linear-gradient(-20deg, #00cdac  0%, #95eec2 100%)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
