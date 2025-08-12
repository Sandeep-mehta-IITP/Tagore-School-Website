"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Award, BookOpen, Users, Star } from "lucide-react";
import Image from "next/image";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  qualification: string;
  experience: string;
  specialization: string;
  achievements: string[];
  image: string;
  email: string;
  phone: string;
}

const teachers: Teacher[] = [
  {
    id: 1,
    name: "Dr. Sunita Verma",
    subject: "Mathematics",
    qualification: "M.Sc, Ph.D Mathematics",
    experience: "15 Years",
    specialization: "Advanced Calculus, Statistics",
    achievements: [
      "Best Teacher Award 2023",
      "Research Publication in Mathematics Journal",
    ],
    image: "/indian-female-teacher-professional.png",
    email: "sunita.verma@tagorebalvidhya.edu",
    phone: "+91 98765 43210",
  },
  {
    id: 2,
    name: "Prof. Rajesh Kumar",
    subject: "Physics",
    qualification: "M.Sc Physics, B.Ed",
    experience: "12 Years",
    specialization: "Quantum Physics, Electronics",
    achievements: ["Science Fair Judge", "Physics Olympiad Mentor"],
    image: "/indian-male-teacher-professional.png",
    email: "rajesh.kumar@tagorebalvidhya.edu",
    phone: "+91 98765 43211",
  },
  {
    id: 3,
    name: "Mrs. Kavita Singh",
    subject: "English Literature",
    qualification: "M.A English, B.Ed",
    experience: "10 Years",
    specialization: "Creative Writing, Poetry",
    achievements: ["Literary Club Coordinator", "Published Author"],
    image: "/indian-female-teacher-friendly.png",
    email: "kavita.singh@tagorebalvidhya.edu",
    phone: "+91 98765 43212",
  },
  {
    id: 4,
    name: "Mr. Amit Gupta",
    subject: "Chemistry",
    qualification: "M.Sc Chemistry, B.Ed",
    experience: "8 Years",
    specialization: "Organic Chemistry, Lab Management",
    achievements: ["Lab Safety Expert", "Chemistry Olympiad Coach"],
    image: "/He-teacher.png",
    email: "amit.gupta@tagorebalvidhya.edu",
    phone: "+91 98765 43213",
  },
  {
    id: 5,
    name: "Dr. Priya Sharma",
    subject: "Biology",
    qualification: "M.Sc, Ph.D Biology",
    experience: "14 Years",
    specialization: "Genetics, Molecular Biology",
    achievements: ["Research Scholar", "Science Exhibition Winner"],
    image: "/indian-school-director-professional.png",
    email: "priya.sharma@tagorebalvidhya.edu",
    phone: "+91 98765 43214",
  },
  {
    id: 6,
    name: "Mrs. Shivani Joshi",
    subject: "History",
    qualification: "M.A History, B.Ed",
    experience: "11 Years",
    specialization: "Ancient Indian History, Archaeology",
    achievements: ["Heritage Walk Organizer", "Historical Research"],
    image: "/She-Teacher.png",
    email: "shivani.joshi@tagorebalvidhya.edu",
    phone: "+91 98765 43215",
  },
  {
    id: 7,
    name: "Mrs. Neha Patel",
    subject: "Geography",
    qualification: "M.A Geography, B.Ed",
    experience: "9 Years",
    specialization: "Environmental Geography, GIS",
    achievements: ["Environmental Club Head", "Green School Initiative"],
    image: "/Female teacher.png", // Renamed to avoid spaces in filename for better compatibility
    email: "neha.patel@tagorebalvidhya.edu",
    phone: "+91 98765 43216",
  },
  {
    id: 8,
    name: "Mr. Suresh Reddy",
    subject: "Computer Science",
    qualification: "MCA, B.Tech CSE",
    experience: "7 Years",
    specialization: "Programming, Web Development",
    achievements: ["Coding Competition Judge", "Tech Innovation Award"],
    image: "/indian-male-teacher-computer.png",
    email: "suresh.reddy@tagorebalvidhya.edu",
    phone: "+91 98765 43217",
  },
  {
    id: 9,
    name: "Mrs. Anjali Mehta",
    subject: "Economics",
    qualification: "M.A Economics, B.Ed",
    experience: "13 Years",
    specialization: "Microeconomics, Development Economics",
    achievements: ["Economics Quiz Master", "Policy Research"],
    image: "/indian-female-teacher-economics.png",
    email: "anjali.mehta@tagorebalvidhya.edu",
    phone: "+91 98765 43218",
  },
];

export default function TeachersPage() {
  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/teachers-classroom.png"
            alt="Our Teachers"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-contrast">
            Our Teachers
          </h1>
          <p className="text-lg md:text-xl text-contrast">
            Dedicated educators shaping bright futures
          </p>
        </motion.div>
      </section>

      {/* Teachers Grid */}
      <section className="py-12 md:py-20">
        <div className="container-mobile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#E0E0E0]">
              Meet Our Faculty
            </h2>
            <p className="text-[#B0B0B0] text-base md:text-lg max-w-2xl mx-auto">
              Our experienced and passionate educators are committed to
              providing the highest quality education and nurturing each
              student's potential.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden card-hover h-full bg-[#1E1E1E] border-[#2E2E2E] shadow-lg rounded-xl">
                  <div className="relative overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={
                          teacher.image ||
                          "/placeholder.svg?height=200&width=200&text=Professional+Teacher+Portrait"
                        }
                        alt={teacher.name}
                        width={400}
                        height={300}
                        className="w-full h-48 md:h-64 object-cover transition-transform duration-300"
                      />
                    </motion.div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[#3B82F6] text-white border-0 px-3 py-1 rounded-full">
                        {teacher.experience}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4 md:p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl md:text-2xl font-bold mb-1 text-[#E0E0E0]">
                        {teacher.name}
                      </h3>
                      <p className="text-[#3B82F6] font-medium mb-2">
                        {teacher.subject}
                      </p>
                      <p className="text-[#B0B0B0] text-sm italic">
                        {teacher.qualification}
                      </p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start text-sm text-[#B0B0B0]">
                        <BookOpen className="h-5 w-5 mr-3 text-[#4ADE80] mt-0.5" />
                        <span className="break-words flex-1">
                          {teacher.specialization}
                        </span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-base mb-3 flex items-center text-[#E0E0E0]">
                        <Award className="h-5 w-5 mr-2 text-[#FACC15]" />
                        Achievements
                      </h4>
                      <div className="space-y-2">
                        {teacher.achievements.map((achievement, idx) => (
                          <div
                            key={idx}
                            className="flex items-start text-sm text-[#B0B0B0]"
                          >
                            <Star className="h-4 w-4 mr-2 text-[#FACC15] flex-shrink-0 mt-0.5" />
                            <span className="break-words flex-1">
                              {achievement}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-[#2E2E2E] pt-4 space-y-3">
                      <motion.a
                        href={`mailto:${teacher.email}`}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center text-sm text-[#B0B0B0] hover:text-[#3B82F6] transition-colors"
                      >
                        <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate text-xs flex-1">
                          {teacher.email}
                        </span>
                      </motion.a>
                      <motion.a
                        href={`tel:${teacher.phone}`}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center text-sm text-[#B0B0B0] hover:text-[#3B82F6] transition-colors"
                      >
                        <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{teacher.phone}</span>
                      </motion.a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Stats */}
      <section className="py-12 md:py-20 bg-[#1A1A1A]">
        <div className="container-mobile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#E0E0E0]">
              Faculty Excellence
            </h2>
            <p className="text-[#B0B0B0] text-base md:text-lg">
              Our commitment to quality education
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                icon: Users,
                number: "25+",
                label: "Qualified Teachers",
                color: "#3B82F6",
              },
              {
                icon: Award,
                number: "15+",
                label: "Years Average Experience",
                color: "#4ADE80",
              },
              {
                icon: BookOpen,
                number: "12+",
                label: "Subject Specializations",
                color: "#8B5CF6",
              },
              {
                icon: Star,
                number: "100%",
                label: "Student Satisfaction",
                color: "#FACC15",
              },
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
                      <stat.icon
                        className="h-6 w-6 md:h-8 md:w-8"
                        style={{ color: stat.color }}
                      />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 text-[#E0E0E0]">
                      {stat.number}
                    </h3>
                    <p className="text-[#B0B0B0] text-sm md:text-base">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
