"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Eye, Heart, Users, BookOpen, Star, Quote } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const timeline = [
  {
    year: "2010",
    event:
      "Foundation of Tagore Bal Vidhya Niketan with 75 students in Danta, Kelwara",
  },
  {
    year: "2013",
    event:
      "Expansion to secondary education and new academic block construction",
  },
  {
    year: "2016",
    event:
      "Introduction of smart classrooms and digital learning infrastructure",
  },
  {
    year: "2019",
    event: "Achievement of 98% pass rate and state recognition for excellence",
  },
  {
    year: "2021",
    event:
      "Launch of online learning platform during pandemic with 100% student engagement",
  },
  {
    year: "2024",
    event:
      "Celebrating 14 years of educational excellence in Baran district with 500+ students",
  },
];

const values = [
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for the highest standards in everything we do, fostering a culture of continuous improvement.",
  },
  {
    icon: Heart,
    title: "Compassion",
    description:
      "We care deeply about each student's wellbeing and create a nurturing environment for growth.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We believe in building strong relationships between students, teachers, and families.",
  },
  {
    icon: BookOpen,
    title: "Learning",
    description:
      "We promote lifelong learning and curiosity, encouraging students to explore and discover.",
  },
];

const testimonials = [
  {
    name: "Mrs. Sharma",
    role: "Parent",
    content:
      "Tagore Bal Vidhya Niketan has been instrumental in shaping my daughter's character and academic excellence. The teachers are dedicated and caring.",
    image: "/indian-professional-mother.png",
  },
  {
    name: "Rohit Patel",
    role: "Alumni (Class of 2020)",
    content:
      "The foundation I received at Tagore Bal Vidhya Niketan helped me excel in engineering college. The values and knowledge I gained here are invaluable.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Dr. Gupta",
    role: "Parent",
    content:
      "The holistic approach to education at Tagore Bal Vidhya Niketan ensures that children develop not just academically but also as responsible citizens.",
    image: "/placeholder.svg?height=80&width=80",
  },
];

export default function AboutPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/modern-school-architecture.png"
            alt="School Building"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-contrast">
            About Us
          </h1>
          <p className="text-xl text-contrast">
            Discover our journey of educational excellence
          </p>
        </motion.div>
      </section>

      {/* School History Timeline */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="text-gray-400 text-lg">
              14 years of educational excellence
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>

              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative mb-8 md:mb-12"
                >
                  <div className="md:hidden">
                    <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700 p-6 hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <Badge className="mb-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                          {item.year}
                        </Badge>
                        <p className="text-gray-300 leading-relaxed">
                          {item.event}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div
                    className={`hidden md:flex items-center ${
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`w-5/12 ${
                        index % 2 === 0 ? "pr-8 text-left" : "pl-8 text-left"
                      }`}
                      style={{ direction: index % 2 === 0 ? "rtl" : "ltr" }}
                    >
                      <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700 p-6 hover:shadow-lg transition-shadow">
                        <CardContent
                          className="p-0"
                          style={{ direction: "ltr" }}
                        >
                          <Badge className="mb-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                            {item.year}
                          </Badge>
                          <p className="text-gray-300 leading-relaxed">
                            {item.event}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-gray-900 shadow-lg"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Director's Message */}
      <section className="py-12 md:py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Director's Message
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                <div className="relative inline-block">
                  <div className="w-[300px] h-[300px] rounded-full overflow-hidden border-4 border-blue-500 mx-auto lg:mx-0">
                    <Image
                      src="/indian-male-teacher-professional.png"
                      alt="Director"
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full shadow-lg"
                  >
                    <Quote className="h-6 w-6" />
                  </motion.div>
                </div>
                <h3 className="text-2xl font-bold mt-6 mb-2 text-white">
                  Dr. Rajesh Kumar Mehta
                </h3>
                <p className="text-blue-400 font-medium">
                  Director & Principal
                </p>
                <p className="text-gray-400 mt-2">
                  M.Ed, Ph.D in Educational Leadership
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="text-6xl text-blue-500/20">
                  <Quote className="h-12 w-12" />
                </div>
                <blockquote className="text-lg text-gray-300 leading-relaxed italic">
                  "At Tagore Bal Vidhya Niketan, we believe in nurturing not
                  just academic excellence but also strong moral values rooted
                  in our rich Indian heritage. Located in the heart of Danta,
                  Kelwara, Baran, we are committed to providing quality
                  education that prepares our students for global challenges
                  while keeping them connected to their cultural roots. Every
                  child is unique, and our mission is to help them discover
                  their potential and shine bright in their chosen paths."
                </blockquote>
                <div className="flex items-center space-x-4 pt-4">
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <p className="text-gray-400 font-medium">
                    Dr. Rajesh Kumar Sharma
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Values */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Foundation
            </h2>
            <p className="text-gray-400 text-lg">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700 p-8 h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full mr-4">
                      <Eye className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Our Vision
                    </h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    To be a leading educational institution that empowers
                    students to become innovative thinkers, compassionate
                    leaders, and responsible global citizens who contribute
                    positively to society.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700 p-8 h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-full mr-4">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Our Mission
                    </h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    To provide quality education that nurtures intellectual
                    curiosity, develops critical thinking, and instills strong
                    moral values while preparing students for success in an
                    ever-changing world.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700 p-6 text-center h-full hover:shadow-lg transition-all">
                  <CardContent className="p-0">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <value.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {value.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              What People Say
            </h2>
            <p className="text-gray-400 text-lg">
              Testimonials from our community
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700 p-8 text-center">
                <CardContent className="p-0">
                  <div className="mb-6">
                    <div className="w-[80px] h-[80px] rounded-full overflow-hidden border-4 border-blue-500 mx-auto">
                      <Image
                        src={
                          testimonials[currentTestimonial].image ||
                          "/placeholder.svg?height=80&width=80&query=indian parent professional"
                        }
                        alt={testimonials[currentTestimonial].name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full object-center"
                      />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-lg text-gray-300 mb-6 italic leading-relaxed">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                  <div>
                    <h4 className="font-bold text-lg text-white">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-400">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial
                      ? "bg-blue-500"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
