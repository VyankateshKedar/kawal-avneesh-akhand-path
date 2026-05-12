import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Kawalpreet & Avneesh — Wedding Invitation",
  description:
    "You are cordially invited to celebrate the wedding of Kawalpreet Kaur & Avneesh Singh. Join us for a journey of love, laughter, and togetherness.",
  keywords: ["wedding", "invitation", "Kawalpreet", "Avneesh", "Sikh wedding", "Anand Karaj"],
  openGraph: {
    title: "Kawalpreet & Avneesh — Wedding Invitation",
    description: "Celebrate the union of Kawalpreet Kaur & Avneesh Singh",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Gurmukhi:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream">{children}</body>
    </html>
  );
}
