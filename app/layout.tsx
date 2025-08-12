import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Tagore Bal Vidhya Niketan School - Excellence in Education | Danta, Kelwara, Baran",
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
    description: "Premier educational institution in Danta, Kelwara Block, Shahabad, Baran, Rajasthan.",
    siteName: "Tagore Bal Vidhya Niketan School",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tagore Bal Vidhya Niketan School - Excellence in Education",
    description: "Premier educational institution in Danta, Kelwara Block, Shahabad, Baran, Rajasthan.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${inter.className} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-[#121212] text-[#E0E0E0]">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
          <ScrollToTop />
        </div>
      </body>
    </html>
  )
}
