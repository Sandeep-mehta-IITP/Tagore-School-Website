"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/modern-school-students.png"
            alt="Contact Us"
            fill
            className="object-cover brightness-75"
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
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-contrast">
            Get in touch with us for admissions and inquiries
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-20">
        <div className="container-mobile">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <Card className="bg-[#1E1E1E] border-[#2E2E2E] card-hover h-full shadow-lg">
                <CardContent className="p-6 md:p-8 h-full flex flex-col">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#E0E0E0]">
                    Send us a Message
                  </h2>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 flex-1 flex flex-col justify-center bg-[#272727] rounded-md"
                    >
                      <CheckCircle className="h-16 w-16 text-[#4ADE80] mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-[#4ADE80] mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-[#B0B0B0]">
                        Thank you for contacting us. We'll get back to you
                        within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-6 flex-1 flex flex-col"
                    >
                      <div className="flex-1 space-y-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium mb-2 text-[#E0E0E0]"
                          >
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`form-input ${
                              errors.name
                                ? "border-[#F87171] ring-[#F87171]"
                                : "border-[#2E2E2E] focus:border-[#3B82F6]"
                            } bg-[#272727]`}
                            placeholder="Enter your full name"
                          />
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-[#F87171] text-sm mt-1"
                            >
                              {errors.name}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-2 text-[#E0E0E0]"
                          >
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`form-input ${
                              errors.email
                                ? "border-[#F87171] ring-[#F87171]"
                                : "border-[#2E2E2E] focus:border-[#3B82F6]"
                            } bg-[#272727]`}
                            placeholder="Enter your email address"
                          />
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-[#F87171] text-sm mt-1"
                            >
                              {errors.email}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium mb-2 text-[#E0E0E0]"
                          >
                            Phone Number *
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`form-input ${
                              errors.phone
                                ? "border-[#F87171] ring-[#F87171]"
                                : "border-[#2E2E2E] focus:border-[#3B82F6]"
                            } bg-[#272727]`}
                            placeholder="Enter your phone number"
                          />
                          {errors.phone && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-[#F87171] text-sm mt-1"
                            >
                              {errors.phone}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium mb-2 text-[#E0E0E0]"
                          >
                            Message *
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className={`min-h-[120px] form-input resize-none ${
                              errors.message
                                ? "border-[#F87171] ring-[#F87171]"
                                : "border-[#2E2E2E] focus:border-[#3B82F6]"
                            } bg-[#272727]`}
                            placeholder="Enter your message or inquiry"
                          />
                          {errors.message && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-[#F87171] text-sm mt-1"
                            >
                              {errors.message}
                            </motion.p>
                          )}
                        </div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full btn-primary py-3 text-base font-medium hover:bg-blue-700 transition-colors"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Sending...
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <Send className="h-4 w-4 mr-2" />
                              Send Message
                            </div>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 md:space-y-8 order-1 lg:order-2"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[#E0E0E0]">
                  Get in Touch
                </h2>
                <p className="text-[#B0B0B0] text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                  We're here to help with any questions about admissions,
                  academics, or school life. Reach out to us through any of the
                  following channels.
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: "Address",
                    content:
                      "Tagore Bal Vidhya Niketan School\nDanta, Kelwara Block, Shahabad\nDist Baran, Rajasthan 325216",
                    color: "#F87171",
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    content: "+91 7465 234567\n+91 98765 43210 (Mobile)",
                    color: "#4ADE80",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    content:
                      "info@tagorebalvidhya.edu\nadmissions@tagorebalvidhya.edu",
                    color: "#3B82F6",
                  },
                  {
                    icon: Clock,
                    title: "Office Hours",
                    content:
                      "Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed",
                    color: "#8B5CF6",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="bg-[#1E1E1E] border-[#2E2E2E] card-hover shadow-md">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-start space-x-4">
                          <div
                            className="p-3 rounded-full flex-shrink-0 shadow-sm"
                            style={{ backgroundColor: `${item.color}20` }}
                          >
                            <item.icon
                              className="h-5 w-5 md:h-6 md:w-6"
                              style={{ color: item.color }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base md:text-lg font-bold mb-2 text-[#E0E0E0]">
                              {item.title}
                            </h3>
                            <p className="text-[#B0B0B0] text-sm md:text-base whitespace-pre-line break-words">
                              {item.content}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-20 bg-[#1A1A1A]">
        <div className="container-mobile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#E0E0E0]">
              Find Us
            </h2>
            <p className="text-[#B0B0B0] text-base md:text-lg">
              Located in Danta, Kelwara Block with easy access from main roads
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="rounded-lg overflow-hidden shadow-2xl"
          >
            <div className="relative h-64 md:h-96 bg-[#2E2E2E]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.877!2d76.8807437!3d25.1373417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDA4JzE0LjQiTiA3NsKwNTInNTAuNyJF!5e0!3m2!1sen!2sin!4v1723456789012"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute top-4 left-4 bg-[#1E1E1E] glass-effect p-3 md:p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 text-[#F87171]" />
                  <span className="font-medium text-[#E0E0E0] text-sm md:text-base">
                    Tagore Bal Vidhya Niketan School
                  </span>
                </div>
                <p className="text-xs md:text-sm text-[#B0B0B0] mt-1">
                  Danta, Kelwara Block, Baran, Rajasthan
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
