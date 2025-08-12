"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Trophy, Medal, Award } from "lucide-react"
import Image from "next/image"

const allToppers = [
  {
    name: "Arjun Sharma",
    score: "98.2%",
    subject: "Science",
    image: "/indian-student-boy-smiling.png",
    rank: 1,
    year: "2024",
  },
  {
    name: "Priya Patel",
    score: "97.8%",
    subject: "Commerce",
    image: "/indian-student-girl-smiling.png",
    rank: 2,
    year: "2024",
  },
  {
    name: "Rahul Kumar",
    score: "96.5%",
    subject: "Arts",
    image: "/confident-indian-student.png",
    rank: 3,
    year: "2024",
  },
  {
    name: "Anita Singh",
    score: "97.2%",
    subject: "Science",
    image: "/confident-indian-student.png",
    rank: 1,
    year: "2023",
  },
  {
    name: "Vikash Gupta",
    score: "96.8%",
    subject: "Commerce",
    image: "/happy-indian-student.png",
    rank: 2,
    year: "2023",
  },
  { name: "Meera Jain", score: "95.9%", subject: "Arts", image: "/indian-student-girl-smiling.png", rank: 3, year: "2023" },
  {
    name: "Rohit Verma",
    score: "96.5%",
    subject: "Science",
    image: "/indian-student-boy-studying.png",
    rank: 1,
    year: "2022",
  },
  {
    name: "Kavya Sharma",
    score: "95.7%",
    subject: "Commerce",
    image: "/indian-student-girl-books.png",
    rank: 2,
    year: "2022",
  },
  { name: "Amit Patel", score: "94.8%", subject: "Arts", image: "/confident-indian-student.png", rank: 3, year: "2022" },
]

export default function ToppersPage() {
  const groupedToppers = allToppers.reduce(
    (acc, topper) => {
      if (!acc[topper.year]) {
        acc[topper.year] = []
      }
      acc[topper.year].push(topper)
      return acc
    },
    {} as Record<string, typeof allToppers>,
  )

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return Trophy
      case 2:
        return Medal
      case 3:
        return Award
      default:
        return Star
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 to-yellow-600"
      case 2:
        return "from-gray-400 to-gray-600"
      case 3:
        return "from-orange-400 to-orange-600"
      default:
        return "from-blue-400 to-blue-600"
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center glass rounded-full px-6 py-3 mb-8">
              <Trophy className="h-6 w-6 text-yellow-300 mr-3" />
              <span className="text-yellow-300 font-medium text-lg">Hall of Fame</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-white text-contrast">
              Our{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Toppers
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto text-contrast">
              Celebrating the exceptional achievements of our brilliant students across the years
            </p>
          </motion.div>
        </div>
      </section>

      {/* Toppers by Year */}
      <section className="py-20">
        <div className="container">
          {Object.entries(groupedToppers)
            .sort(([a], [b]) => Number.parseInt(b) - Number.parseInt(a))
            .map(([year, toppers], yearIndex) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: yearIndex * 0.2 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Class of {year}
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {toppers.map((topper, index) => {
                    const RankIcon = getRankIcon(topper.rank)
                    return (
                      <motion.div
                        key={`${year}-${index}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="group"
                      >
                        <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                          <CardContent className="p-8 text-center relative">
                            {/* Rank Badge */}
                            <div className="absolute top-4 right-4">
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg bg-gradient-to-r ${getRankColor(topper.rank)}`}
                              >
                                <RankIcon className="h-6 w-6" />
                              </div>
                            </div>

                            {/* Student Image */}
                            <div className="relative mb-6">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative"
                              >
                                <Image
                                  src={topper.image || "/placeholder.svg"}
                                  alt={topper.name}
                                  width={120}
                                  height={120}
                                  className="w-28 h-28 rounded-full mx-auto border-4 border-yellow-400 shadow-lg"
                                />
                                <div className="absolute -bottom-2 -right-2">
                                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black border-0 px-3 py-1">
                                    <Star className="h-3 w-3 mr-1" />#{topper.rank}
                                  </Badge>
                                </div>
                              </motion.div>
                            </div>

                            {/* Student Details */}
                            <h3 className="text-2xl font-bold mb-3 text-white">{topper.name}</h3>
                            <div className="text-4xl font-bold text-yellow-300 mb-3">{topper.score}</div>
                            <p className="text-gray-300 font-medium mb-2">{topper.subject} Stream</p>
                            <p className="text-gray-400 text-sm">Class of {topper.year}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
        </div>
      </section>
    </div>
  )
}
