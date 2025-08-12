"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
  Heart,
  Star,
} from "lucide-react"
import Link from "next/link"

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Admissions", href: "/contact" },
  { name: "Faculty", href: "/teachers" },
  { name: "Results", href: "/results" },
  { name: "Gallery", href: "/gallery" },
]

const academics = [
  { name: "Primary School", href: "#" },
  { name: "Secondary School", href: "#" },
  { name: "Higher Secondary", href: "#" },
  { name: "Extracurricular", href: "#" },
  { name: "Sports", href: "#" },
]

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "#",
    color: "hover:text-blue-600",
    bgColor: "hover:bg-blue-600",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "#",
    color: "hover:text-blue-400",
    bgColor: "hover:bg-blue-400",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "#",
    color: "hover:text-pink-600",
    bgColor: "hover:bg-pink-600",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "#",
    color: "hover:text-red-600",
    bgColor: "hover:bg-red-600",
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 px-6  text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Newsletter Section */}
      <section className="relative mx-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-16 rounded-2xl">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                <Star className="h-5 w-5 text-yellow-300 mr-2" />
                <span className="text-white font-medium">Stay Connected</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Join Our School Community</h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                Subscribe to receive the latest updates about admissions, events, and achievements from Tagore Bal
                Vidhya Niketan School.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white backdrop-blur-sm rounded-xl h-12"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-white text-purple-600 hover:bg-gray-100 shadow-xl rounded-xl h-12 px-6 font-semibold">
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* School Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">Tagore Bal Vidhya Niketan</span>
                  <p className="text-gray-400 text-sm">Excellence in Education</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Nurturing young minds with excellence in education, rooted in Indian values and modern teaching
                methodologies at Danta, Kelwara Block, Shahabad, Baran, Rajasthan.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 transition-all duration-300 ${social.bgColor} hover:text-white hover:shadow-lg`}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Academics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold mb-6 text-white">Academics</h4>
              <ul className="space-y-3">
                {academics.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold mb-6 text-white">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Tagore Bal Vidhya Niketan School
                      <br />
                      Danta, Kelwara Block
                      <br />
                      Shahabad, Dist Baran
                      <br />
                      Rajasthan - 325216, India
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">+91 7465 234567</p>
                    <p className="text-gray-300 text-sm">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">info@tagorebalvidhya.edu</p>
                    <p className="text-gray-300 text-sm">admissions@tagorebalvidhya.edu</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800 py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center text-gray-400 text-sm text-center sm:text-left"
            >
              <span className="mb-1 sm:mb-0">
                © {new Date().getFullYear()} Tagore Bal Vidhya Niketan School. Made with{" "}
              </span>
              <div className="flex items-center">
                <Heart className="h-4 w-4 text-red-500 mx-1" />
                <span>for education.</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-center"
            >
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
