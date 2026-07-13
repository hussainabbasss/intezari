import type { Metadata } from "next";
import {
  Aref_Ruqaa,
  Geist,
  JetBrains_Mono,
  Source_Serif_4,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const arefRuqaa = Aref_Ruqaa({
  variable: "--font-aref-ruqaa",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/hussainabbasss/intezari"),
  title: "Al-Ansaar — الانصار | Readiness for Imam al-Asr",
  description:
    "Local-first readiness training for the Shia community. Physical, intellectual, and spiritual preparation for Intizar — waiting for Imam al-Mahdi (atfs).",
  openGraph: {
    title: "Al-Ansaar — الانصار",
    description:
      "Active Intizar: physical readiness, intellectual grounding, spiritual mindfulness.",
    images: ["/banner.png"],
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
      className={`${geistSans.variable} ${jetbrains.variable} ${sourceSerif.variable} ${arefRuqaa.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-on-surface">
        {children}
      </body>
    </html>
  );
}
