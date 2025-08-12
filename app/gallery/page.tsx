"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Play, ImageIcon, Video } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const categories = ["All", "Photos", "Videos", "Events"];

interface GalleryItem {
  id: number;
  type: "photo" | "video";
  category: string;
  title: string;
  image: string;
  description: string;
  videoUrl?: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    type: "photo",
    category: "Events",
    title: "Annual Sports Day 2024",
    image: "/school-sports-day-athletics.png",
    description:
      "Students participating in various sports activities and competitions",
  },
  {
    id: 2,
    type: "video",
    category: "Events",
    title: "Science Exhibition Highlights",
    image: "/modern-science-lab.png",
    videoUrl: "https://example.com/video1.mp4",
    description:
      "Best moments from our annual science exhibition showcasing student innovations",
  },
  {
    id: 3,
    type: "photo",
    category: "Photos",
    title: "Interactive Classroom Learning",
    image: "/classroom-learning.png",
    description:
      "Modern teaching methods and interactive learning sessions in progress",
  },
  {
    id: 4,
    type: "photo",
    category: "Events",
    title: "Cultural Festival Performance",
    image: "/school-cultural-dance.png",
    description:
      "Students showcasing their cultural talents and traditional dance forms",
  },
  {
    id: 5,
    type: "video",
    category: "Events",
    title: "Independence Day Celebration",
    image: "/school-annual-function-stage.png",
    videoUrl: "https://example.com/video2.mp4",
    description:
      "Patriotic celebration with flag hoisting ceremony and cultural programs",
  },
  {
    id: 6,
    type: "photo",
    category: "Photos",
    title: "Modern Computer Laboratory",
    image: "/school-computer-lab-students.png",
    description:
      "Students learning digital skills in our state-of-the-art computer lab",
  },
  {
    id: 7,
    type: "photo",
    category: "Photos",
    title: "School Campus Architecture",
    image: "/modern-school-exterior.png",
    description:
      "Beautiful and modern school campus with excellent infrastructure",
  },
  {
    id: 8,
    type: "video",
    category: "Events",
    title: "Annual Day Performance",
    image: "/school-annual-function-stage.png",
    videoUrl: "https://example.com/video3.mp4",
    description:
      "Spectacular performances by our talented students during annual day celebration",
  },
  {
    id: 9,
    type: "photo",
    category: "Photos",
    title: "Science Laboratory Session",
    image: "/school-science-fair.png",
    description:
      "Hands-on learning experience in our well-equipped science laboratory",
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const filteredItems = galleryItems.filter(
    (item) =>
      selectedCategory === "All" ||
      item.category === selectedCategory ||
      (selectedCategory === "Photos" && item.type === "photo") ||
      (selectedCategory === "Videos" && item.type === "video")
  );

  const openLightbox = (item: GalleryItem) => {
    setLightboxImage(item);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/modern-school-exterior.png"
            alt="Gallery"
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
            Gallery
          </h1>
          <p className="text-xl text-contrast">
            Capturing moments of learning and joy
          </p>
        </motion.div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.div
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className={`relative ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0"
                      : "border-gray-600 text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-0"
                  }`}
                >
                  {category}
                  {selectedCategory === category && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"
                    />
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => openLightbox(item)}
                className="cursor-pointer"
              >
                <Card className="bg-gray-800/50 rounded-xl backdrop-blur-md border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative group flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-48 md:h-64 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="text-white"
                      >
                        {item.type === "video" ? (
                          <Play className="h-12 w-12" />
                        ) : (
                          <ImageIcon className="h-12 w-12" />
                        )}
                      </motion.div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant={
                          item.type === "video" ? "destructive" : "secondary"
                        }
                      >
                        {item.type === "video" ? (
                          <>
                            <Video className="h-3 w-3 mr-1" /> Video
                          </>
                        ) : (
                          <>
                            <ImageIcon className="h-3 w-3 mr-1" /> Photo
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4 md:p-6 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold mb-2 text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>

            {lightboxImage.type === "video" ? (
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <video
                  controls
                  className="w-full max-h-[70vh]"
                  poster={lightboxImage.image}
                >
                  <source src={lightboxImage.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">
                    {lightboxImage.title}
                  </h3>
                  <p className="text-gray-300">{lightboxImage.description}</p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <Image
                  src={lightboxImage.image || "/placeholder.svg"}
                  alt={lightboxImage.title}
                  width={800}
                  height={600}
                  className="w-full max-h-[70vh] object-contain"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {lightboxImage.title}
                  </h3>
                  <p className="text-gray-400">{lightboxImage.description}</p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
