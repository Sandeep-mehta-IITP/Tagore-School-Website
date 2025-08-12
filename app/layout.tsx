import type React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title:
    "Tagore Bal Vidhya Niketan School - Excellence in Education | Danta, Kelwara, Baran",
  description:
    "Premier educational institution in Danta, Kelwara Block, Shahabad, Baran, Rajasthan. Providing quality education with strong moral values, modern teaching methodologies, and holistic development for students.",
  keywords:
    "school, education, Danta, Kelwara, Baran, Rajasthan, Tagore, Bal Vidhya Niketan, students, learning, admissions",
  authors: [{ name: "Tagore Bal Vidhya Niketan School" }],
  creator: "Tagore Bal Vidhya Niketan School",
  publisher: "Tagore Bal Vidhya Niketan School",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://tagorebalvidhya.edu",
    title: "Tagore Bal Vidhya Niketan School - Excellence in Education",
    description:
      "Premier educational institution in Danta, Kelwara Block, Shahabad, Baran, Rajasthan.",
    siteName: "Tagore Bal Vidhya Niketan School",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tagore Bal Vidhya Niketan School - Excellence in Education",
    description:
      "Premier educational institution in Danta, Kelwara Block, Shahabad, Baran, Rajasthan.",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${inter.className} ${poppins.variable}`}
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* SEO Meta Tags */}
        <meta name="description" content={metadata.description ?? ""} />
        <meta name="keywords" content={metadata.keywords ?? ""} />
        <meta name="author" content={metadata.authors?.[0]?.name ?? ""} />
        <meta name="robots" content={metadata.robots ?? "index, follow"} />

        {/* Open Graph */}
        <meta
          property="og:type"
          content={metadata.openGraph?.type ?? "website"}
        />
        <meta
          property="og:locale"
          content={metadata.openGraph?.locale ?? "en_IN"}
        />
        <meta property="og:url" content={metadata.openGraph?.url ?? ""} />
        <meta property="og:title" content={metadata.openGraph?.title ?? ""} />
        <meta
          property="og:description"
          content={metadata.openGraph?.description ?? ""}
        />
        <meta
          property="og:site_name"
          content={metadata.openGraph?.siteName ?? ""}
        />

        {/* Twitter */}
        <meta name="twitter:card" content={metadata.twitter?.card ?? ""} />
        <meta name="twitter:title" content={metadata.twitter?.title ?? ""} />
        <meta
          name="twitter:description"
          content={metadata.twitter?.description ?? ""}
        />

        {/* Fonts & Icons */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Canonical Link */}
        <link rel="canonical" href="https://tagorebalvidhya.edu" />

        {/* Theme & Favicon */}
        <meta name="theme-color" content="#121212" />
        <meta name="msapplication-TileColor" content="#121212" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="iNdeiN8BfEVDjIruJOBSCtXXpPtTgY9mRESTSL5XpyY"
        />

        {/* Optional: Yandex */}
        <meta
          name="yandex-verification"
          content="your-yandex-verification-code"
        />
      </head>
      <body className="font-sans antialiased bg-[#121212] text-[#E0E0E0]">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}
