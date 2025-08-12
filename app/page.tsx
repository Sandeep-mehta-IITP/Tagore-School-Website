"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  Users,
  BookOpen,
  Trophy,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Wifi,
  Microscope,
  Dumbbell,
  Computer,
  FlaskConical,
  Bus,
  Home,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

const heroImages = [
  "/modern-school-students.png",
  "/indian-student-boy-smiling.png",
  "/indian-student-girl-smiling.png",
  "/confident-indian-student.png",
]

const toppers = [
  {
    name: "Arjun Sharma",
    score: "98.2%",
    subject: "Science",
    image: "/indian-student-boy-smiling.png",
    rank: 1,
  },
  {
    name: "Priya Patel",
    score: "97.8%",
    subject: "Commerce",
    image: "/indian-student-girl-smiling.png",
    rank: 2,
  },
  {
    name: "Rahul Kumar",
    score: "96.5%",
    subject: "Arts",
    image: "/confident-indian-student.png",
    rank: 3,
  },
]

const facilities = [
  {
    icon: Wifi,
    title: "Smart Classrooms",
    description: "Modern digital learning environment with interactive boards and high-speed internet",
    image: "/smart-classroom.png",
    badge: "Digital Learning",
  },
  {
    icon: Microscope,
    title: "Science Laboratory",
    description: "Well-equipped physics, chemistry, and biology labs for hands-on experiments",
    image: "/modern-science-lab.png",
    badge: "Research",
  },
  {
    icon: Dumbbell,
    title: "Sports Complex",
    description: "Multi-purpose sports ground with facilities for cricket, football, and athletics",
    image: "/school-sports-complex-playground.png",
    badge: "Sports",
  },

  {
    icon: BookOpen,
    title: "Library",
    description: "Extensive collection of books, journals, and digital resources for learning",
    image: "/modern-school-library.png",
    badge: "Knowledge",
  },
  {
    icon: Bus,
    title: "Transport Facility",
    description: "Safe and reliable school bus service covering major routes in Baran district",
    image: "/school-bus-facility.png",
    badge: "Transport",
  },
  {
    icon: Home,
    title: "Hostel Facility",
    description: "Comfortable boarding facility with nutritious meals and 24/7 supervision",
    image: "/school-hostel-dormitory.png",
    badge: "Boarding",
  },
]

export default function HomePage() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImage ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`School Hero ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Navigation Arrows - Hidden on mobile */}
        <button
          onClick={prevImage}
          className="hidden md:flex absolute left-8 z-20 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextImage}
          className="hidden md:flex absolute right-8 z-20 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center glass rounded-full px-4 md:px-6 py-2 md:py-3 mb-6 md:mb-8">
              <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-yellow-300 mr-2 md:mr-3" />
              <span className="text-yellow-300 font-medium text-sm md:text-lg">Admissions Open 2024-25</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 text-contrast">
              Tagore Bal Vidhya{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Niketan School
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-pink-100 mb-6 md:mb-8 max-w-4xl mx-auto text-contrast">
              Nurturing Excellence in Education at Danta, Kelwara Block, Shahabad, Dist Baran, Rajasthan 325216
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/contact" className="flex items-center">
                  Admissions Open
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full backdrop-blur-md bg-transparent"
              >
                <Link href="/about">Know More</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImage ? "bg-white" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-[#1A1A1A]">
        <div className="container-mobile">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: Users, number: "500+", label: "Students", color: "#3B82F6" },
              { icon: BookOpen, number: "25+", label: "Teachers", color: "#4ADE80" },
              { icon: Trophy, number: "98%", label: "Success Rate", color: "#FACC15" },
              { icon: GraduationCap, number: "14+", label: "Years Excellence", color: "#8B5CF6" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center p-4 md:p-6 card-hover bg-[#1E1E1E] border-[#2E2E2E]">
                  <CardContent className="p-0">
                    <div
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <stat.icon className="h-6 w-6 md:h-8 md:w-8" style={{ color: stat.color }} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 text-[#E0E0E0]">{stat.number}</h3>
                    <p className="text-[#B0B0B0] text-sm md:text-base">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-12 md:py-20">
        <div className="container-mobile">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-[#E0E0E0]">About Our School</h2>
              <p className="text-[#B0B0B0] text-base md:text-lg mb-6 leading-relaxed">
                Tagore Bal Vidhya Niketan School has been a beacon of educational excellence in Baran district for over
                14 years. We are committed to providing quality education that nurtures both academic achievement and
                character development.
              </p>
              <p className="text-[#B0B0B0] text-base md:text-lg mb-8 leading-relaxed">
                Located in the heart of Danta, Kelwara, our school combines traditional values with modern teaching
                methodologies to prepare students for the challenges of tomorrow.
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Image
                src="/modern-school-students.png"
                alt="School Students"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Toppers Section */}
      <section className="py-12 md:py-20 bg-[#1A1A1A]">
        <div className="container-mobile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#E0E0E0]">Our Toppers</h2>
            <p className="text-[#B0B0B0] text-base md:text-lg">Celebrating academic excellence</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {toppers.map((topper, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center p-4 md:p-6 card-hover bg-[#1E1E1E] border-[#2E2E2E]">
                  <CardContent className="p-0">
                    <div className="relative mb-4 md:mb-6">
                      <Image
                        src={topper.image || "/placeholder.svg"}
                        alt={topper.name}
                        width={120}
                        height={120}
                        className="w-20 h-20 md:w-28 md:h-28 rounded-full mx-auto border-4 border-yellow-400"
                      />
                      <Badge className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black">
                        #{topper.rank}
                      </Badge>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-[#E0E0E0]">{topper.name}</h3>
                    <div className="text-2xl md:text-3xl font-bold text-yellow-300 mb-2">{topper.score}</div>
                    <p className="text-[#B0B0B0]">{topper.subject} Stream</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold">
              <Link href="/toppers">View All Toppers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* School Facilities */}
      <section className="py-12 md:py-20">
        <div className="container-mobile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#E0E0E0]">Our Facilities</h2>
            <p className="text-[#B0B0B0] text-base md:text-lg">Modern infrastructure for comprehensive education</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden card-hover h-full bg-[#1E1E1E] border-[#2E2E2E]">
                  <div className="relative">
                    <Image
                      src={facility.image || "/placeholder.svg"}
                      alt={facility.title}
                      width={300}
                      height={200}
                      className="w-full h-40 md:h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[#3B82F6] text-white border-0">{facility.badge}</Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-white/20 backdrop-blur-md p-2 rounded-full">
                        <facility.icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-[#E0E0E0]">{facility.title}</h3>
                    <p className="text-[#B0B0B0] text-sm md:text-base leading-relaxed">{facility.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Connected */}
      <section className="py-12 md:py-20 bg-[#1A1A1A]">
        <div className="container-mobile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#E0E0E0]">Stay Connected</h2>
            <p className="text-[#B0B0B0] text-base md:text-lg">Get in touch with us for admissions and inquiries</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: MapPin,
                title: "Visit Us",
                content: "Danta, Kelwara Block, Shahabad, Dist Baran, Rajasthan 325216",
                color: "#3B82F6",
              },
              {
                icon: Phone,
                title: "Call Us",
                content: "+91 98765 43210\n+91 98765 43211",
                color: "#4ADE80",
              },
              {
                icon: Mail,
                title: "Email Us",
                content: "info@tagorebalvidhya.edu\nadmissions@tagorebalvidhya.edu",
                color: "#8B5CF6",
              },
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center p-6 md:p-8 card-hover bg-[#1E1E1E] border-[#2E2E2E] h-full">
                  <CardContent className="p-0">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: `${contact.color}20` }}
                    >
                      <contact.icon className="h-8 w-8" style={{ color: contact.color }} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#E0E0E0]">{contact.title}</h3>
                    <p className="text-[#B0B0B0] whitespace-pre-line leading-relaxed">{contact.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold">
              <Link href="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
