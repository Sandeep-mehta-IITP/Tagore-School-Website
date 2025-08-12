"use client"

import { useState, useRef } from "react"
import { AdminAuth } from "@/components/admin-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Edit, Trash2, Users, Mail, Phone, Award, Upload, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

// Mock data - in production this would come from a database
const initialTeachers = [
  {
    id: 1,
    name: "Dr. Sunita Verma",
    subject: "Mathematics",
    qualification: "M.Sc, Ph.D Mathematics",
    experience: "15 Years",
    specialization: "Advanced Calculus, Statistics",
    achievements: ["Best Teacher Award 2023", "Research Publication in Mathematics Journal"],
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
]

export default function TeacherManagement() {
  const router = useRouter()
  const fileInputRef = useRef(null)
  const [teachers, setTeachers] = useState(initialTeachers)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    qualification: "",
    experience: "",
    specialization: "",
    achievements: "",
    image: "",
    email: "",
    phone: "",
  })

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target.result
        setUploadedImage(imageUrl)
        setFormData({ ...formData, image: imageUrl })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeUploadedImage = () => {
    setUploadedImage(null)
    setFormData({ ...formData, image: "" })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const teacherData = {
      ...formData,
      achievements: formData.achievements
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
    }

    if (editingTeacher) {
      // Update existing teacher
      setTeachers((teachers) =>
        teachers.map((teacher) =>
          teacher.id === editingTeacher.id ? { ...teacherData, id: editingTeacher.id } : teacher,
        ),
      )
      setEditingTeacher(null)
    } else {
      // Add new teacher
      const newTeacher = {
        ...teacherData,
        id: Date.now(), // Simple ID generation
      }
      setTeachers((teachers) => [...teachers, newTeacher])
    }

    // Reset form
    setFormData({
      name: "",
      subject: "",
      qualification: "",
      experience: "",
      specialization: "",
      achievements: "",
      image: "",
      email: "",
      phone: "",
    })
    setUploadedImage(null)
    setShowAddForm(false)
  }

  const handleEdit = (teacher) => {
    setFormData({
      ...teacher,
      achievements: teacher.achievements.join(", "),
    })
    setEditingTeacher(teacher)
    setUploadedImage(teacher.image)
    setShowAddForm(true)
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      setTeachers((teachers) => teachers.filter((teacher) => teacher.id !== id))
    }
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setEditingTeacher(null)
    setUploadedImage(null)
    setFormData({
      name: "",
      subject: "",
      qualification: "",
      experience: "",
      specialization: "",
      achievements: "",
      image: "",
      email: "",
      phone: "",
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <AdminAuth>
      <div className="min-h-screen bg-[#121212]">
        {/* Header - Improved mobile responsiveness */}
        <div className="bg-[#1E1E1E] border-b border-[#2E2E2E] px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.push("/admin/dashboard")}
                variant="outline"
                size="sm"
                className="border-[#2E2E2E] text-[#B0B0B0] hover:text-[#E0E0E0] hover:bg-[#2E2E2E]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-[#E0E0E0] mb-1 line-clamp-1">Teacher Management</h1>
                <p className="text-xs sm:text-sm text-[#B0B0B0]">Manage school faculty and staff</p>
              </div>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] hover:from-[#2563EB] hover:to-[#0891B2] text-white w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Teacher
            </Button>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Add/Edit Form - Enhanced with image upload and better mobile layout */}
          {showAddForm && (
            <Card className="mb-8 bg-[#1E1E1E] border-[#2E2E2E]">
              <CardHeader>
                <CardTitle className="text-[#E0E0E0] text-lg sm:text-xl">
                  {editingTeacher ? "Edit Teacher" : "Add New Teacher"}
                </CardTitle>
                <CardDescription className="text-[#B0B0B0] text-sm">
                  {editingTeacher
                    ? "Update the teacher's information below"
                    : "Fill in the details to add a new teacher to the faculty"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Profile Image Upload - Added comprehensive image upload */}
                  <div className="space-y-4">
                    <Label className="text-[#E0E0E0] text-sm font-medium">Profile Photo *</Label>

                    {/* Upload Button */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="border-[#2E2E2E] text-[#B0B0B0] hover:text-[#E0E0E0] hover:bg-[#2E2E2E] bg-transparent h-11"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Photo
                      </Button>

                      <div className="flex-1">
                        <Input
                          placeholder="Or paste image URL here"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                        />
                      </div>
                    </div>

                    {/* Hidden File Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    {/* Image Preview */}
                    {(uploadedImage || formData.image) && (
                      <div className="relative inline-block">
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-[#2E2E2E]">
                          <Image
                            src={uploadedImage || formData.image}
                            alt="Teacher Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <Button
                          type="button"
                          onClick={removeUploadedImage}
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    )}

                    <p className="text-xs text-[#B0B0B0]">
                      💡 Tip: Upload a professional headshot (recommended: square format, 400x400px)
                    </p>
                  </div>

                  {/* Name and Subject - Better mobile layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#E0E0E0] text-sm font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                        placeholder="Enter full name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-[#E0E0E0] text-sm font-medium">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                        placeholder="e.g., Mathematics, Physics"
                        required
                      />
                    </div>
                  </div>

                  {/* Qualification and Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="qualification" className="text-[#E0E0E0] text-sm font-medium">
                        Qualification *
                      </Label>
                      <Input
                        id="qualification"
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                        placeholder="e.g., M.Sc, Ph.D, B.Ed"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-[#E0E0E0] text-sm font-medium">
                        Experience *
                      </Label>
                      <Input
                        id="experience"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                        placeholder="e.g., 10 Years"
                        required
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#E0E0E0] text-sm font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                        placeholder="teacher@tagorebalvidhya.edu"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[#E0E0E0] text-sm font-medium">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>

                  {/* Specialization */}
                  <div className="space-y-2">
                    <Label htmlFor="specialization" className="text-[#E0E0E0] text-sm font-medium">
                      Specialization *
                    </Label>
                    <Input
                      id="specialization"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                      placeholder="e.g., Advanced Calculus, Statistics"
                      required
                    />
                  </div>

                  {/* Achievements */}
                  <div className="space-y-2">
                    <Label htmlFor="achievements" className="text-[#E0E0E0] text-sm font-medium">
                      Achievements & Awards
                    </Label>
                    <Textarea
                      id="achievements"
                      value={formData.achievements}
                      onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                      className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] min-h-[100px]"
                      placeholder="Enter achievements separated by commas (e.g., Best Teacher Award 2023, Research Publication)"
                      rows={3}
                    />
                    <p className="text-xs text-[#B0B0B0]">💡 Tip: Separate multiple achievements with commas</p>
                  </div>

                  {/* Action Buttons - Better mobile layout */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] hover:from-[#2563EB] hover:to-[#0891B2] text-white h-11 order-2 sm:order-1"
                      disabled={!formData.name || !formData.subject || !formData.image || !formData.email}
                    >
                      {editingTeacher ? "✅ Update Teacher" : "➕ Add Teacher"}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancel}
                      variant="outline"
                      className="border-[#2E2E2E] text-[#B0B0B0] hover:text-[#E0E0E0] hover:bg-[#2E2E2E] bg-transparent h-11 order-1 sm:order-2"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Teachers Grid - Improved responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {teachers.map((teacher) => (
              <Card
                key={teacher.id}
                className="bg-[#1E1E1E] border-[#2E2E2E] overflow-hidden hover:border-[#3B82F6] transition-colors"
              >
                <div className="relative">
                  <Image
                    src={teacher.image || "/placeholder.svg"}
                    alt={teacher.name}
                    width={400}
                    height={250}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-[#3B82F6] text-white border-0 text-xs">{teacher.experience}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="text-center mb-4">
                    <h3 className="text-sm sm:text-base font-bold text-[#E0E0E0] mb-1 line-clamp-1">{teacher.name}</h3>
                    <p className="text-[#3B82F6] font-medium mb-1 text-sm">{teacher.subject}</p>
                    <p className="text-[#B0B0B0] text-xs line-clamp-1">{teacher.qualification}</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-xs text-[#B0B0B0]">
                      <Mail className="h-3 w-3 mr-2 text-[#4ADE80] flex-shrink-0" />
                      <span className="truncate">{teacher.email}</span>
                    </div>
                    <div className="flex items-center text-xs text-[#B0B0B0]">
                      <Phone className="h-3 w-3 mr-2 text-[#4ADE80] flex-shrink-0" />
                      <span>{teacher.phone}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-[#B0B0B0] mb-2">
                      <strong className="text-[#E0E0E0]">Specialization:</strong>
                    </p>
                    <p className="text-xs text-[#B0B0B0] line-clamp-2">{teacher.specialization}</p>

                    {teacher.achievements.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-[#E0E0E0] mb-1 flex items-center">
                          <Award className="h-3 w-3 mr-1 text-[#FACC15]" />
                          Achievements:
                        </p>
                        <ul className="text-xs text-[#B0B0B0] space-y-1">
                          {teacher.achievements.slice(0, 2).map((achievement, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-1 flex-shrink-0">•</span>
                              <span className="line-clamp-1">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={() => handleEdit(teacher)}
                      size="sm"
                      variant="outline"
                      className="flex-1 border-[#2E2E2E] text-[#B0B0B0] hover:text-[#E0E0E0] hover:bg-[#2E2E2E] text-xs"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(teacher.id)}
                      size="sm"
                      variant="outline"
                      className="border-[#F87171] text-[#F87171] hover:bg-[#F87171] hover:text-white text-xs"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State - Better mobile layout */}
          {teachers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 sm:w-16 sm:h-16 text-[#B0B0B0] mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-[#E0E0E0] mb-2">No Teachers Added</h3>
              <p className="text-[#B0B0B0] mb-4 text-sm sm:text-base">Start by adding your first teacher</p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] hover:from-[#2563EB] hover:to-[#0891B2] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Teacher
              </Button>
            </div>
          )}
        </div>
      </div>
    </AdminAuth>
  )
}
