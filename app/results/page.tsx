"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Medal,
  Star,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

interface Topper {
  name: string;
  percentage: string;
  stream: string;
  rank: number;
  image: string;
}

interface YearlyResult {
  year: string;
  passRate: string;
  toppers: Topper[];
  highlights: string[];
}

interface AchievementItem {
  title: string;
  year: string;
  position: string;
  description: string;
  image: string;
}

interface AchievementCategory {
  category: string;
  items: AchievementItem[];
}

const yearlyResults: YearlyResult[] = [
  {
    year: "2025",
    passRate: "99.5%",
    toppers: [
      {
        name: "Neha Singh",
        percentage: "99.2%",
        stream: "Science",
        rank: 1,
        image: "/indian-student-girl-smiling.png",
      },
      {
        name: "Aryan Mehta",
        percentage: "98.7%",
        stream: "Commerce",
        rank: 2,
        image: "/indian-student-boy-smiling.png",
      },
      {
        name: "Sofia Khan",
        percentage: "97.9%",
        stream: "Arts",
        rank: 3,
        image: "/indian-student-girl-smiling.png",
      },
    ],
    highlights: [
      "20 students scored above 95%",
      "50 students scored above 90%",
      "State topper in Physics",
      "District topper in Literature",
    ],
  },
  {
    year: "2024",
    passRate: "100%",
    toppers: [
      {
        name: "Arjun Sharma",
        percentage: "98.5%",
        stream: "Science",
        rank: 1,
        image: "/indian-student-boy-smiling.png",
      },
      {
        name: "Priya Patel",
        percentage: "97.8%",
        stream: "Commerce",
        rank: 2,
        image: "/indian-student-girl-smiling.png",
      },
      {
        name: "Rahul Kumar",
        percentage: "96.9%",
        stream: "Arts",
        rank: 3,
        image: "/indian-student-boy-smiling.png",
      },
    ],
    highlights: [
      "15 students scored above 95%",
      "45 students scored above 90%",
      "State topper in Mathematics",
      "District topper in English",
    ],
  },
  {
    year: "2023",
    passRate: "98.5%",
    toppers: [
      {
        name: "Sneha Gupta",
        percentage: "97.2%",
        stream: "Science",
        rank: 1,
        image: "/indian-student-girl-smiling.png",
      },
      {
        name: "Vikash Singh",
        percentage: "96.8%",
        stream: "Commerce",
        rank: 2,
        image: "/indian-student-boy-smiling.png",
      },
      {
        name: "Anita Rao",
        percentage: "95.5%",
        stream: "Arts",
        rank: 3,
        image: "/indian-student-girl-smiling.png",
      },
    ],
    highlights: [
      "12 students scored above 95%",
      "38 students scored above 90%",
      "Regional topper in Physics",
      "City topper in History",
    ],
  },
  {
    year: "2022",
    passRate: "97.8%",
    toppers: [
      {
        name: "Rohit Verma",
        percentage: "96.5%",
        stream: "Science",
        rank: 1,
        image: "/indian-student-boy-smiling.png",
      },
      {
        name: "Kavya Joshi",
        percentage: "95.9%",
        stream: "Commerce",
        rank: 2,
        image: "/indian-student-girl-smiling.png",
      },
      {
        name: "Amit Pandey",
        percentage: "94.8%",
        stream: "Arts",
        rank: 3,
        image: "/indian-student-boy-smiling.png",
      },
    ],
    highlights: [
      "10 students scored above 95%",
      "35 students scored above 90%",
      "District topper in Chemistry",
      "State rank in Economics",
    ],
  },
];

const achievements: AchievementCategory[] = [
  {
    category: "Sports",
    items: [
      {
        title: "Inter-School Cricket Championship",
        year: "2024",
        position: "Winners",
        description: "Our cricket team won the district level championship",
        image:
          "/placeholder.svg?height=200&width=300&text=Cricket+Championship",
      },
      {
        title: "State Level Athletics Meet",
        year: "2024",
        position: "2nd Place",
        description: "Outstanding performance in track and field events",
        image: "/placeholder.svg?height=200&width=300&text=Athletics+Meet",
      },
      {
        title: "Basketball Tournament",
        year: "2023",
        position: "Winners",
        description: "Undefeated season in inter-school basketball",
        image:
          "/placeholder.svg?height=200&width=300&text=Basketball+Tournament",
      },
    ],
  },
  {
    category: "Cultural",
    items: [
      {
        title: "Classical Dance Competition",
        year: "2024",
        position: "1st Place",
        description: "Bharatanatyam performance won state level competition",
        image: "/placeholder.svg?height=200&width=300&text=Dance+Competition",
      },
      {
        title: "Debate Championship",
        year: "2024",
        position: "Winners",
        description: "Regional debate competition victory",
        image: "/placeholder.svg?height=200&width=300&text=Debate+Championship",
      },
      {
        title: "Music Festival",
        year: "2023",
        position: "2nd Place",
        description: "Choir performance at state music festival",
        image: "/placeholder.svg?height=200&width=300&text=Music+Festival",
      },
    ],
  },
  {
    category: "Academic",
    items: [
      {
        title: "Science Olympiad",
        year: "2024",
        position: "Gold Medal",
        description: "National level science olympiad achievement",
        image: "/placeholder.svg?height=200&width=300&text=Science+Olympiad",
      },
      {
        title: "Mathematics Competition",
        year: "2024",
        position: "State Topper",
        description: "First position in state mathematics competition",
        image: "/placeholder.svg?height=200&width=300&text=Math+Competition",
      },
      {
        title: "Essay Writing Contest",
        year: "2023",
        position: "Winners",
        description: "Multiple winners in national essay competition",
        image: "/placeholder.svg?height=200&width=300&text=Essay+Contest",
      },
    ],
  },
];

export default function ResultsPage() {
  const [expandedYear, setExpandedYear] = useState<string>("2025");
  const [selectedCategory, setSelectedCategory] = useState<string>("Sports");

  const toggleYear = (year: string) => {
    setExpandedYear(expandedYear === year ? "" : year);
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "#FACC15"; // Gold
      case 2:
        return "#D1D5DB"; // Silver
      case 3:
        return "#CD7F32"; // Bronze
      default:
        return "#E0E0E0";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1A1A1A]">
      {/* Hero Banner */}
      <section className="relative h-64 md:h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/students-achievements.png"
            alt="Results & Achievements"
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-center text-white px-4 max-w-4xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-contrast tracking-tight">
            Results & Achievements
          </h1>
          <p className="text-xl md:text-2xl text-contrast/90">
            Celebrating excellence in academics and beyond at Tagore Bal Vidhya
            Niketan
          </p>
        </motion.div>
      </section>

      {/* Academic Results Section */}
      <section className="py-16 md:py-24">
        <div className="container-mobile">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#E0E0E0] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Academic Results
            </h2>
            <p className="text-[#B0B0B0] text-lg md:text-xl max-w-2xl mx-auto">
              Discover our outstanding academic performance year by year,
              showcasing student success and school excellence
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-6">
            {yearlyResults.map((result, index) => (
              <motion.div
                key={result.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden bg-[#1E1E1E]/80 backdrop-blur-sm border-[#2E2E2E] rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div
                    className="p-6 cursor-pointer hover:bg-[#252525] transition-colors flex items-center justify-between"
                    onClick={() => toggleYear(result.year)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full shadow-md">
                        <Trophy className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#E0E0E0]">
                          Class XII - {result.year}
                        </h3>
                        <p className="text-[#B0B0B0] text-base">
                          Pass Rate: {result.passRate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 px-3 py-1 text-base">
                        {result.passRate} Pass
                      </Badge>
                      {expandedYear === result.year ? (
                        <ChevronUp className="h-6 w-6 text-[#B0B0B0] hover:text-white transition-colors" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-[#B0B0B0] hover:text-white transition-colors" />
                      )}
                    </div>
                  </div>

                  {expandedYear === result.year && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="border-t border-[#2E2E2E]"
                    >
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Toppers */}
                          <div>
                            <h4 className="text-xl font-bold mb-6 flex items-center text-[#E0E0E0]">
                              <Star className="h-6 w-6 text-[#FACC15] mr-2 animate-pulse" />
                              Top Performers
                            </h4>
                            <div className="space-y-4">
                              {result.toppers.map((topper, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -30 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.5,
                                    delay: idx * 0.15,
                                  }}
                                >
                                  <Link
                                    href={`/results/${topper.name
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}`}
                                  >
                                    <div className="flex items-center space-x-4 p-4 bg-[#252525]/50 rounded-lg hover:bg-[#2A2A2A] transition-all duration-300 shadow-sm hover:shadow-md">
                                      <div className="flex items-center space-x-4 p-4 bg-[#252525]/50 rounded-lg hover:bg-[#2A2A2A] transition-all duration-300 shadow-sm hover:shadow-md">
                                        <div className="relative flex-shrink-0 w-16 h-16 rounded-full border-2 border-gray-700">
                                          <Image
                                            src={topper.image}
                                            alt={topper.name}
                                            fill
                                            className="object-cover rounded-full"
                                          />
                                          <div
                                            className="absolute -top-3 -right-3 w-6 h-6 flex items-center justify-center rounded-full shadow-md border border-gray-800 z-10"
                                            style={{
                                              backgroundColor: getRankColor(
                                                topper.rank
                                              ),
                                            }}
                                          >
                                            <span className="text-white font-bold text-xs">
                                              {topper.rank}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h5 className="font-bold text-[#E0E0E0] truncate text-lg">
                                            {topper.name}
                                          </h5>
                                          <p className="text-sm text-[#B0B0B0]">
                                            {topper.stream}
                                          </p>
                                          <p className="text-xs text-blue-400 mt-1 hover:underline cursor-pointer">
                                            View full profile →
                                          </p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                          <p className="text-xl font-bold text-[#4ADE80]">
                                            {topper.percentage}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Highlights */}
                          <div>
                            <h4 className="text-xl font-bold mb-6 flex items-center text-[#E0E0E0]">
                              <Award className="h-6 w-6 text-[#8B5CF6] mr-2 animate-pulse" />
                              Key Highlights
                            </h4>
                            <div className="space-y-4">
                              {result.highlights.map((highlight, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: 30 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.5,
                                    delay: idx * 0.15,
                                  }}
                                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#8B5CF6]/10 to-[#8B5CF6]/5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                >
                                  <Medal className="h-6 w-6 text-[#8B5CF6] flex-shrink-0" />
                                  <p className="text-[#E0E0E0] text-base">
                                    {highlight}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Achievements Section */}
      <section className="py-16 md:py-24 bg-[#1A1A1A]/80 backdrop-blur-sm">
        <div className="container-mobile">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#E0E0E0] bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Beyond Academics
            </h2>
            <p className="text-[#B0B0B0] text-lg md:text-xl max-w-2xl mx-auto">
              Explore our students' remarkable achievements in sports, cultural
              activities, and extracurricular pursuits
            </p>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {achievements.map((category) => (
              <motion.div
                key={category.category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={
                    selectedCategory === category.category
                      ? "default"
                      : "outline"
                  }
                  onClick={() => setSelectedCategory(category.category)}
                  className={`px-6 py-2 text-base font-medium rounded-full transition-all duration-300 ${
                    selectedCategory === category.category
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "bg-transparent text-[#B0B0B0] border-[#3B82F6]/30 hover:bg-[#3B82F6]/10 hover:text-white"
                  }`}
                >
                  {category.category}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Achievement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {achievements
              .find((cat) => cat.category === selectedCategory)
              ?.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="h-full"
                >
                  <Card className="overflow-hidden h-full flex flex-col bg-[#1E1E1E]/80 backdrop-blur-sm border-[#2E2E2E] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold border-0 px-3 py-1">
                          {item.position}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-[#E0E0E0] flex-1 pr-4">
                          {item.title}
                        </h3>
                        <span className="text-sm font-medium text-[#B0B0B0] bg-[#252525] px-2 py-1 rounded">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-[#B0B0B0] text-base line-clamp-3 flex-grow">
                        {item.description}
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
