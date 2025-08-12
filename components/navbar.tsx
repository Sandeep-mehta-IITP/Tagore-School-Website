"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, GraduationCap, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Results", href: "/results" },
  { name: "Teachers", href: "/teachers" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  if (!mounted) return null

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-500 ${
        isScrolled ? "bg-[#121212]/95 backdrop-blur-xl shadow-2xl border-b border-[#2E2E2E]/20" : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Mobile Optimized */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="relative"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#F87171] rounded-full flex items-center justify-center shadow-lg">
                <GraduationCap className="h-5 w-5 md:h-7 md:w-7 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#F87171] rounded-lg md:rounded-xl blur opacity-30 -z-10"></div>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-sm md:text-xl font-bold transition-colors leading-tight text-[#E0E0E0]">
                Tagore Bal Vidhya Niketan
              </span>
              <span className="text-xs transition-colors hidden sm:block text-[#B0B0B0]">Excellence in Education</span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on Mobile */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-xl ${
                    pathname === item.href
                      ? "text-white bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] shadow-lg"
                      : "text-[#E0E0E0] hover:text-[#FACC15] hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#FACC15] rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <Link href="/admin">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl transition-all duration-300 text-[#B0B0B0] hover:text-[#FACC15] hover:bg-white/10"
                  title="Admin Access"
                >
                  <Settings className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </motion.div>
            </Link>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                className="lg:hidden w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl transition-all duration-300 text-[#E0E0E0] hover:bg-white/10"
              >
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  {isOpen ? <X className="h-5 w-5 md:h-6 md:w-6" /> : <Menu className="h-5 w-5 md:h-6 md:w-6" />}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#121212]/95 backdrop-blur-xl border-t border-[#2E2E2E]/20"
          >
            <div className="container py-4">
              <div className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 text-base font-semibold transition-all duration-300 rounded-xl ${
                        pathname === item.href
                          ? "text-white bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] shadow-lg"
                          : "text-[#B0B0B0] hover:text-[#E0E0E0] hover:bg-gradient-to-r hover:from-[#3B82F6] hover:to-[#8B5CF6]"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                >
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-base font-semibold transition-all duration-300 rounded-xl text-[#B0B0B0] hover:text-[#FACC15] hover:bg-gradient-to-r hover:from-[#3B82F6] hover:to-[#8B5CF6] border-t border-[#2E2E2E] mt-2 pt-4"
                  >
                    <Settings className="inline w-6 h-6 mr-2" />
                    Admin Access
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
