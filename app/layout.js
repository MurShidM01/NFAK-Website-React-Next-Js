import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ustad Nusrat Fateh Ali Khan - A Tribute | Shahenshah-e-Qawwali",
  description: "A clean, minimalist tribute to the legendary Ustad Nusrat Fateh Ali Khan, celebrating his life, music, and eternal legacy in Qawwali and Sufi devotional music.",
  keywords: "Ustad Nusrat Fateh Ali Khan, Qawwali, Sufi Music, Pakistani Music, Tribute, 16 August, Death Anniversary, Shahenshah-e-Qawwali, Sufism",
  authors: [{ name: "Tribute Website" }],
  openGraph: {
    title: "Ustad Nusrat Fateh Ali Khan - A Tribute",
    description: "A peaceful tribute to the King of Qawwali",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
