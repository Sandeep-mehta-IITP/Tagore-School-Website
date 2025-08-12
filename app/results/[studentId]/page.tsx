"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Trophy,
  BookOpen,
  Target,
  User,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Subject {
  name: string;
  marks: number;
  maxMarks: number;
  grade: string;
}

interface Achievement {
  title: string;
  year: string;
  description: string;
  category: string;
}

interface Student {
  id: string;
  name: string;
  image: string;
  class: string;
  section: string;
  rollNumber: string;
  stream: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  address: string;
  phone: string;
  email: string;
  overallPercentage: string;
  overallGrade: string;
  rank: number;
  subjects: Subject[];
  achievements: Achievement[];
  teacherRemarks: string;
  attendance: string;
  extracurricular: string[];
}

const studentData: Record<string, Student> = {
  "arjun-sharma": {
    id: "arjun-sharma",
    name: "Arjun Sharma",
    image: "https://via.placeholder.com/140?text=AS",
    class: "XII",
    section: "A",
    rollNumber: "2024001",
    stream: "Science",
    fatherName: "Rajesh Sharma",
    motherName: "Sunita Sharma",
    dateOfBirth: "15/03/2006",
    address: "123 Gandhi Nagar, Baran, Rajasthan",
    phone: "+91 9876543210",
    email: "arjun.sharma@student.tagore.edu",
    overallPercentage: "98.5%",
    overallGrade: "A+",
    rank: 1,
    subjects: [
      { name: "Physics", marks: 98, maxMarks: 100, grade: "A+" },
      { name: "Chemistry", marks: 99, maxMarks: 100, grade: "A+" },
      { name: "Mathematics", marks: 100, maxMarks: 100, grade: "A+" },
      { name: "Biology", marks: 97, maxMarks: 100, grade: "A+" },
      { name: "English", marks: 96, maxMarks: 100, grade: "A+" },
    ],
    achievements: [
      {
        title: "State Topper in Mathematics",
        year: "2024",
        description:
          "Secured first position in state-level mathematics competition",
        category: "Academic",
      },
      {
        title: "Science Olympiad Gold Medal",
        year: "2024",
        description: "Won gold medal in National Science Olympiad",
        category: "Academic",
      },
      {
        title: "Best Student Award",
        year: "2024",
        description: "Overall best student of the academic year",
        category: "General",
      },
    ],
    teacherRemarks:
      "Exceptional student with outstanding academic performance and leadership qualities. Shows great potential in scientific research.",
    attendance: "98%",
    extracurricular: [
      "Science Club President",
      "Mathematics Society Member",
      "Debate Team Captain",
    ],
  },
  "priya-patel": {
    id: "priya-patel",
    name: "Priya Patel",
    image: "https://via.placeholder.com/140?text=PP",
    class: "XII",
    section: "B",
    rollNumber: "2024002",
    stream: "Commerce",
    fatherName: "Amit Patel",
    motherName: "Kavita Patel",
    dateOfBirth: "22/08/2006",
    address: "456 Market Street, Baran, Rajasthan",
    phone: "+91 9876543211",
    email: "priya.patel@student.tagore.edu",
    overallPercentage: "97.8%",
    overallGrade: "A+",
    rank: 2,
    subjects: [
      { name: "Accountancy", marks: 99, maxMarks: 100, grade: "A+" },
      { name: "Business Studies", marks: 98, maxMarks: 100, grade: "A+" },
      { name: "Economics", marks: 97, maxMarks: 100, grade: "A+" },
      { name: "Mathematics", marks: 98, maxMarks: 100, grade: "A+" },
      { name: "English", marks: 97, maxMarks: 100, grade: "A+" },
    ],
    achievements: [
      {
        title: "Commerce Quiz Champion",
        year: "2024",
        description: "Won inter-school commerce quiz competition",
        category: "Academic",
      },
      {
        title: "Best Business Plan Award",
        year: "2024",
        description:
          "Created winning business plan in entrepreneurship competition",
        category: "Academic",
      },
    ],
    teacherRemarks:
      "Brilliant student with excellent analytical skills and business acumen. Great leadership potential.",
    attendance: "97%",
    extracurricular: [
      "Commerce Club Secretary",
      "Entrepreneurship Society",
      "Cultural Committee",
    ],
  },
  "rahul-kumar": {
    id: "rahul-kumar",
    name: "Rahul Kumar",
    image: "https://via.placeholder.com/140?text=RK",
    class: "XII",
    section: "C",
    rollNumber: "2024003",
    stream: "Arts",
    fatherName: "Suresh Kumar",
    motherName: "Meera Kumar",
    dateOfBirth: "10/12/2005",
    address: "789 School Road, Baran, Rajasthan",
    phone: "+91 9876543212",
    email: "rahul.kumar@student.tagore.edu",
    overallPercentage: "96.9%",
    overallGrade: "A+",
    rank: 3,
    subjects: [
      { name: "History", marks: 98, maxMarks: 100, grade: "A+" },
      { name: "Political Science", marks: 97, maxMarks: 100, grade: "A+" },
      { name: "Geography", marks: 96, maxMarks: 100, grade: "A+" },
      { name: "Economics", marks: 97, maxMarks: 100, grade: "A+" },
      { name: "English", marks: 97, maxMarks: 100, grade: "A+" },
    ],
    achievements: [
      {
        title: "History Essay Competition Winner",
        year: "2024",
        description: "Won state-level history essay writing competition",
        category: "Academic",
      },
      {
        title: "Model UN Best Delegate",
        year: "2024",
        description: "Best delegate award in Model United Nations",
        category: "Academic",
      },
    ],
    teacherRemarks:
      "Outstanding student with deep understanding of humanities subjects. Excellent research and writing skills.",
    attendance: "96%",
    extracurricular: [
      "History Society President",
      "Model UN Club",
      "Literary Society",
    ],
  },
};

export default function StudentProfilePage() {
  const params = useParams();
  const studentId = params.studentId as string;
  const student = studentData[studentId];
  

  if (!student) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#E0E0E0] mb-4">
            Student Not Found
          </h1>
          <Link href="/results">
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Results
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#1A1A1A] to-[#121212] py-8 md:py-12 shadow-lg">
        <div className="container-mobile">
          <div className="flex items-center justify-between mb-8">
            <Link href="/results">
              <Button
                variant="outline"
                className="bg-transparent border-[#3B82F6]/50 text-[#3B82F6] hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Results
              </Button>
            </Link>
            <Badge className="bg-gradient-to-r from-[#FACC15] to-[#F59E0B] text-black font-bold border-0 px-4 py-1">
              Rank #{student.rank}
            </Badge>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="relative w-[140px] h-[140px] rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-500 to-purple-500 shadow-xl">
              <Image
                src={student.image}
                alt={student.name}
                fill
                className="object-cover scale-105 transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-extrabold text-[#E0E0E0] mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {student.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 text-[#B0B0B0] text-base md:text-lg">
                <span className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-[#3B82F6]" />{" "}
                  Class {student.class}-{student.section}
                </span>
                <span className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-[#3B82F6]" /> Roll No:{" "}
                  {student.rollNumber}
                </span>
                <span className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-[#3B82F6]" />{" "}
                  {student.stream} Stream
                </span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                <Badge className="bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] text-white border-0 px-4 py-1 text-base font-medium">
                  {student.overallPercentage}
                </Badge>
                <Badge className="bg-gradient-to-r from-[#4ADE80] to-[#22C55E] text-white border-0 px-4 py-1 text-base font-medium">
                  Grade {student.overallGrade}
                </Badge>
                <Badge className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white border-0 px-4 py-1 text-base font-medium">
                  {student.attendance} Attendance
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container-mobile">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-1"
            >
              <Card className="bg-[#1E1E1E]/80 backdrop-blur-md border-[#2E2E2E] rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#E0E0E0] mb-6 flex items-center">
                    <User className="h-6 w-6 mr-3 text-[#3B82F6]" />
                    Personal Information
                  </h3>
                  <div className="space-y-4 text-base">
                    <div className="flex justify-between border-b border-[#2E2E2E] pb-2">
                      <span className="text-[#B0B0B0] font-medium">
                        Father's Name:
                      </span>
                      <p className="text-[#E0E0E0] text-right">
                        {student.fatherName}
                      </p>
                    </div>
                    <div className="flex justify-between border-b border-[#2E2E2E] pb-2">
                      <span className="text-[#B0B0B0] font-medium">
                        Mother's Name:
                      </span>
                      <p className="text-[#E0E0E0] text-right">
                        {student.motherName}
                      </p>
                    </div>
                    <div className="flex justify-between border-b border-[#2E2E2E] pb-2">
                      <span className="text-[#B0B0B0] font-medium">
                        Date of Birth:
                      </span>
                      <p className="text-[#E0E0E0] text-right">
                        {student.dateOfBirth}
                      </p>
                    </div>
                    <div className="flex justify-between border-b border-[#2E2E2E] pb-2">
                      <span className="text-[#B0B0B0] font-medium">
                        Address:
                      </span>
                      <p className="text-[#E0E0E0] text-right max-w-[60%] break-words">
                        {student.address}
                      </p>
                    </div>
                    <div className="flex justify-between border-b border-[#2E2E2E] pb-2">
                      <span className="text-[#B0B0B0] font-medium">Phone:</span>
                      <p className="text-[#E0E0E0] text-right">
                        {student.phone}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#B0B0B0] font-medium">Email:</span>
                      <p className="text-[#E0E0E0] text-right max-w-[60%] break-all">
                        {student.email}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Extracurricular Activities */}
              <Card className="bg-[#1E1E1E]/80 backdrop-blur-md border-[#2E2E2E] rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 mt-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#E0E0E0] mb-6 flex items-center">
                    <Target className="h-6 w-6 mr-3 text-[#8B5CF6]" />
                    Extracurricular Activities
                  </h3>
                  <div className="space-y-3">
                    {student.extracurricular.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center space-x-3 bg-[#252525]/50 p-3 rounded-lg hover:bg-[#252525] transition-colors"
                      >
                        <div className="w-3 h-3 bg-[#8B5CF6] rounded-full flex-shrink-0 shadow-md" />
                        <span className="text-[#E0E0E0] font-medium">
                          {activity}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Academic Results */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="bg-[#1E1E1E]/80 backdrop-blur-md border-[#2E2E2E] rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#E0E0E0] mb-6 flex items-center">
                    <BookOpen className="h-6 w-6 mr-3 text-[#3B82F6]" />
                    Subject-wise Performance
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {student.subjects.map((subject, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-[#252525]/50 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-[#E0E0E0] text-lg">
                            {subject.name}
                          </h4>
                          <Badge className="bg-gradient-to-r from-[#4ADE80] to-[#22C55E] text-white border-0 px-3 py-1">
                            {subject.grade}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-base mb-3">
                          <span className="text-[#B0B0B0]">
                            Marks Obtained:
                          </span>
                          <span className="text-[#E0E0E0] font-bold">
                            {subject.marks}/{subject.maxMarks}
                          </span>
                        </div>
                        <div className="bg-[#1A1A1A] rounded-full h-3 overflow-hidden shadow-inner">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${
                                (subject.marks / subject.maxMarks) * 100
                              }%`,
                            }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] h-3 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="bg-[#1E1E1E]/80 backdrop-blur-md border-[#2E2E2E] rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#E0E0E0] mb-6 flex items-center">
                    <Trophy className="h-6 w-6 mr-3 text-[#FACC15]" />
                    Achievements & Awards
                  </h3>
                  <div className="space-y-5">
                    {student.achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        className="bg-[#252525]/50 p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-bold text-[#E0E0E0] text-lg flex-1 pr-4">
                            {achievement.title}
                          </h4>
                          <div className="flex items-center space-x-3 flex-shrink-0">
                            <Badge className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white border-0 px-3 py-1">
                              {achievement.category}
                            </Badge>
                            <span className="text-base text-[#B0B0B0] bg-[#1A1A1A] px-3 py-1 rounded-full">
                              {achievement.year}
                            </span>
                          </div>
                        </div>
                        <p className="text-[#B0B0B0] text-base">
                          {achievement.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Teacher's Remarks */}
              <Card className="bg-[#1E1E1E]/80 backdrop-blur-md border-[#2E2E2E] rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#E0E0E0] mb-6 flex items-center">
                    <GraduationCap className="h-6 w-6 mr-3 text-[#F87171]" />
                    Teacher's Remarks
                  </h3>
                  <div className="bg-[#252525]/50 p-6 rounded-lg shadow-md italic text-[#B0B0B0] text-base leading-relaxed border-l-4 border-[#F87171]">
                    "{student.teacherRemarks}"
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
