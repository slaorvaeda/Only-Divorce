import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import SiteFooter from "./components/SiteFooter";
import { Providers } from "./providers";
import AOSProvider from "./components/AOSProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Only Divorce | Professional Support Platform",
  description: "Your trusted partner through life's most challenging transition. Compassionate support, practical guidance, and emotional understanding.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Homemade+Apple&family=Playwrite+NO:wght@100..400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased bg-[#f4f5fb]`}>
        <AOSProvider>
          <Providers>
            <Header />
            <main>{children}</main>
            <SiteFooter />
          </Providers>
        </AOSProvider>
      </body>
    </html>
  );
}
