"use client"

import { useState, useRef } from "react"
import { AdminAuth } from "@/components/admin-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Edit, Trash2, Trophy, Award, Upload, Medal, User, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Mock data - in production this would come from a database
const initialAcademicResults = [
  {
    id: 1,
    year: "2024",
    passRate: "100%",
    toppers: [
      {
        name: "Arjun Sharma",
        percentage: "98.5%",
        stream: "Science",
        rank: 1,
        image: "/confident-indian-student.png",
      },
    ],
    highlights: ["15 students scored above 95%", "State topper in Mathematics"],
  },
]

const initialAchievements = [
  {
    id: 1,
    category: "Sports",
    title: "Inter-School Cricket Championship",
    year: "2024",
    position: "Winners",
    description: "Our cricket team won the district level championship",
    image: "/placeholder.svg",
  },
]

const initialStudentResults = [
  {
    id: 1,
    studentName: "John Doe",
    rollNumber: "2024001",
    class: "12",
    section: "A",
    year: "2023-24",
    examType: "Annual",
    subjects: [
      { name: "Mathematics", marks: "95", maxMarks: "100" },
      { name: "Science", marks: "90", maxMarks: "100" },
      { name: "English", marks: "85", maxMarks: "100" },
      { name: "Hindi", marks: "80", maxMarks: "100" },
      { name: "Social Studies", marks: "75", maxMarks: "100" },
    ],
    totalMarks: "445/500",
    percentage: "89%",
    grade: "A",
    rank: "2",
    remarks: "Good performance, needs improvement in Science.",
    studentImage: "/confident-indian-student.png",
  },
]

export default function ResultsManagement() {
  const router = useRouter()
  const fileInputRef = useRef(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [academicResults, setAcademicResults] = useState(initialAcademicResults)
  const [achievements, setAchievements] = useState(initialAchievements)
  const [studentResults, setStudentResults] = useState(initialStudentResults)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formType, setFormType] = useState("academic")
  const [activeTab, setActiveTab] = useState("academic")

  // Academic Results Form Data
  const [academicFormData, setAcademicFormData] = useState({
    year: "",
    passRate: "",
    toppers: "",
    highlights: "",
  })

  // Achievement Form Data
  const [achievementFormData, setAchievementFormData] = useState({
    category: "Sports",
    title: "",
    year: "",
    position: "",
    description: "",
    studentName: "",
    studentClass: "",
    image: "",
  })

  // Student Result Form Data
  const [studentResultFormData, setStudentResultFormData] = useState({
    studentName: "",
    rollNumber: "",
    class: "",
    section: "",
    stream: "",
    year: "",
    examType: "Annual",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    address: "",
    phone: "",
    email: "",
    subjects: [
      { name: "Mathematics", marks: "", maxMarks: "100" },
      { name: "Science", marks: "", maxMarks: "100" },
      { name: "English", marks: "", maxMarks: "100" },
      { name: "Hindi", marks: "", maxMarks: "100" },
      { name: "Social Studies", marks: "", maxMarks: "100" },
    ],
    totalMarks: "",
    percentage: "",
    grade: "",
    rank: "",
    attendance: "",
    extracurricular: "",
    remarks: "",
    studentImage: "",
  })

  const handleAcademicSubmit = (e) => {
    e.preventDefault()

    const resultData = {
      ...academicFormData,
      toppers: academicFormData.toppers
        .split("\n")
        .filter(Boolean)
        .map((line, index) => {
          const parts = line.split(",").map((p) => p.trim())
          return {
            name: parts[0] || "",
            percentage: parts[1] || "",
            stream: parts[2] || "",
            rank: index + 1,
            image: "/confident-indian-student.png",
          }
        }),
      highlights: academicFormData.highlights
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean),
    }

    if (editingItem && formType === "academic") {
      setAcademicResults((results) =>
        results.map((result) => (result.id === editingItem.id ? { ...resultData, id: editingItem.id } : result)),
      )
    } else {
      const newResult = { ...resultData, id: Date.now() }
      setAcademicResults((results) => [...results, newResult])
    }

    resetForms()
  }

  const handleAchievementSubmit = (e) => {
    e.preventDefault()

    if (editingItem && formType === "achievement") {
      setAchievements((achievements) =>
        achievements.map((achievement) =>
          achievement.id === editingItem.id ? { ...achievementFormData, id: editingItem.id } : achievement,
        ),
      )
    } else {
      const newAchievement = { ...achievementFormData, id: Date.now() }
      setAchievements((achievements) => [...achievements, newAchievement])
    }

    resetForms()
  }

  const handleStudentResultSubmit = (e) => {
    e.preventDefault()

    // Calculate total marks and percentage
    const totalObtained = studentResultFormData.subjects.reduce(
      (sum, subject) => sum + (Number.parseInt(subject.marks) || 0),
      0,
    )
    const totalMax = studentResultFormData.subjects.reduce(
      (sum, subject) => sum + (Number.parseInt(subject.maxMarks) || 0),
      0,
    )
    const calculatedPercentage = ((totalObtained / totalMax) * 100).toFixed(2)

    const newResult = {
      ...studentResultFormData,
      id: Date.now(),
      totalMarks: `${totalObtained}/${totalMax}`,
      percentage: `${calculatedPercentage}%`,
      studentImage: uploadedImage || studentResultFormData.studentImage,
    }

    if (editingItem) {
      setStudentResults(studentResults.map((result) => (result.id === editingItem.id ? newResult : result)))
    } else {
      setStudentResults([...studentResults, newResult])
    }

    resetForms()
    setShowAddForm(false)
  }

  const handleEdit = (item, type) => {
    if (type === "academic") {
      setAcademicFormData({
        year: item.year,
        passRate: item.passRate,
        toppers: item.toppers.map((t) => `${t.name}, ${t.percentage}, ${t.stream}`).join("\n"),
        highlights: item.highlights.join("\n"),
      })
    } else if (type === "achievement") {
      setAchievementFormData(item)
    } else if (type === "student") {
      setStudentResultFormData(item)
    }
    setEditingItem(item)
    setFormType(type)
    setShowAddForm(true)
  }

  const handleDelete = (id, type) => {
    if (confirm("Are you sure you want to delete this item?")) {
      if (type === "academic") {
        setAcademicResults((results) => results.filter((result) => result.id !== id))
      } else if (type === "achievement") {
        setAchievements((achievements) => achievements.filter((achievement) => achievement.id !== id))
      } else if (type === "student") {
        setStudentResults((results) => results.filter((result) => result.id !== id))
      }
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target.result
        setUploadedImage(imageUrl)

        if (formType === "student") {
          setStudentResultFormData({ ...studentResultFormData, studentImage: imageUrl })
        } else if (formType === "achievement") {
          setAchievementFormData({ ...achievementFormData, image: imageUrl })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const removeUploadedImage = () => {
    setUploadedImage(null)
    setAchievementFormData({ ...achievementFormData, image: "" })
    setStudentResultFormData({ ...studentResultFormData, studentImage: "" })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const resetForms = () => {
    setShowAddForm(false)
    setEditingItem(null)
    setUploadedImage(null)
    setAcademicFormData({
      year: "",
      passRate: "",
      toppers: "",
      highlights: "",
    })
    setAchievementFormData({
      category: "Sports",
      title: "",
      year: "",
      position: "",
      description: "",
      studentName: "",
      studentClass: "",
      image: "",
    })
    setStudentResultFormData({
      studentName: "",
      rollNumber: "",
      class: "",
      section: "",
      stream: "",
      year: "",
      examType: "Annual",
      fatherName: "",
      motherName: "",
      dateOfBirth: "",
      address: "",
      phone: "",
      email: "",
      subjects: [
        { name: "Mathematics", marks: "", maxMarks: "100" },
        { name: "Science", marks: "", maxMarks: "100" },
        { name: "English", marks: "", maxMarks: "100" },
        { name: "Hindi", marks: "", maxMarks: "100" },
        { name: "Social Studies", marks: "", maxMarks: "100" },
      ],
      totalMarks: "",
      percentage: "",
      grade: "",
      rank: "",
      attendance: "",
      extracurricular: "",
      remarks: "",
      studentImage: "",
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAddNew = (type) => {
    setFormType(type)
    setShowAddForm(true)
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
                <h1 className="text-lg sm:text-xl font-bold text-[#E0E0E0]">Results & Achievements</h1>
                <p className="text-xs sm:text-sm text-[#B0B0B0]">Manage academic results and student achievements</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={() => handleAddNew("academic")}
                variant="outline"
                className="border-[#2E2E2E] text-[#B0B0B0] hover:text-[#E0E0E0] hover:bg-[#2E2E2E] w-full sm:w-auto"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Add Result
              </Button>
              <Button
                onClick={() => handleAddNew("achievement")}
                className="bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] hover:from-[#2563EB] hover:to-[#0891B2] text-white w-full sm:w-auto"
              >
                <Award className="w-4 h-4 mr-2" />
                Add Achievement
              </Button>
              <Button
                onClick={() => handleAddNew("student")}
                className="bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] hover:from-[#2563EB] hover:to-[#0891B2] text-white w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Student Result
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#1E1E1E] border-[#2E2E2E]">
              <TabsTrigger value="academic" className="data-[state=active]:bg-[#3B82F6] data-[state=active]:text-white">
                Academic Results
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="data-[state=active]:bg-[#3B82F6] data-[state=active]:text-white"
              >
                Other Achievements
              </TabsTrigger>
              <TabsTrigger value="student" className="data-[state=active]:bg-[#3B82F6] data-[state=active]:text-white">
                Student Results
              </TabsTrigger>
            </TabsList>

            {/* Academic Results Tab */}
            <TabsContent value="academic" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#E0E0E0]">Academic Results</h2>
                <Button
                  onClick={() => handleAddNew("academic")}
                  className="bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] hover:from-[#2563EB] hover:to-[#0891B2] text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Academic Result
                </Button>
              </div>

              {/* Academic Results Form */}
              {showAddForm && formType === "academic" && (
                <Card className="bg-[#1E1E1E] border-[#2E2E2E]">
                  <CardHeader>
                    <CardTitle className="text-[#E0E0E0]">
                      {editingItem ? "Edit Academic Result" : "Add Academic Result"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAcademicSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="year" className="text-[#E0E0E0]">
                            Year
                          </Label>
                          <Input
                            id="year"
                            value={academicFormData.year}
                            onChange={(e) => setAcademicFormData({ ...academicFormData, year: e.target.value })}
                            className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0]"
                            placeholder="e.g., 2024"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="passRate" className="text-[#E0E0E0]">
                            Pass Rate
                          </Label>
                          <Input
                            id="passRate"
                            value={academicFormData.passRate}
                            onChange={(e) => setAcademicFormData({ ...academicFormData, passRate: e.target.value })}
                            className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0]"
                            placeholder="e.g., 100%"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="toppers" className="text-[#E0E0E0]">
                          Toppers (one per line: Name, Percentage, Stream)
                        </Label>
                        <Textarea
                          id="toppers"
                          value={academicFormData.toppers}
                          onChange={(e) => setAcademicFormData({ ...academicFormData, toppers: e.target.value })}
                          className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0]"
                          placeholder="Arjun Sharma, 98.5%, Science"
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="highlights" className="text-[#E0E0E0]">
                          Highlights (one per line)
                        </Label>
                        <Textarea
                          id="highlights"
                          value={academicFormData.highlights}
                          onChange={(e) => setAcademicFormData({ ...academicFormData, highlights: e.target.value })}
                          className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0]"
                          placeholder="15 students scored above 95%"
                          rows={4}
                        />
                      </div>

                      <div className="flex space-x-4">
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] hover:from-[#2563EB] hover:to-[#0891B2] text-white"
                        >
                          {editingItem ? "Update Result" : "Add Result"}
                        </Button>
                        <Button
                          type="button"
                          onClick={resetForms}
                          variant="outline"
                          className="border-[#2E2E2E] text-[#B0B0B0] hover:text-[#E0E0E0] hover:bg-[#2E2E2E] bg-transparent"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Academic Results List */}
              <div className="grid grid-cols-1 gap-6">
                {academicResults.map((result) => (
                  <Card key={result.id} className="bg-[#1E1E1E] border-[#2E2E2E]">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Trophy className="h-6 w-6 text-[#3B82F6]" />
                          <div>
                            <h3 className="text-xl font-bold text-[#E0E0E0] mb-1 line-clamp-1">
                              Class XII - {result.year}
                            </h3>
                            <p className="text-[#B0B0B0]">Pass Rate: {result.passRate}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleEdit(result, "academic")}
                            size="sm"
                            variant="outline"
                            className="border-[#2E2E2E] text-[#B0B0B0] hover:text-[#E0E0E0] hover:bg-[#2E2E2E]"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(result.id, "academic")}
                            size="sm"
                            variant="outline"
                            className="border-[#F87171] text-[#F87171] hover:bg-[#F87171] hover:text-white"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-[#E0E0E0] mb-3">Top Performers</h4>
                          <div className="space-y-2">
                            {result.toppers.map((topper, idx) => (
                              <div key={idx} className="flex items-center justify-between p-2 bg-[#252525] rounded">
                                <span className="text-[#E0E0E0] text-sm">{topper.name}</span>
                                <Badge className="bg-[#4ADE80]/20 text-[#4ADE80] border-0">{topper.percentage}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-[#E0E0E0] mb-3">Highlights</h4>
                          <div className="space-y-2">
                            {result.highlights.map((highlight, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <Medal className="h-4 w-4 text-[#8B5CF6]" />
                                <span className="text-[#B0B0B0] text-sm">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#E0E0E0]">Other Achievements</h2>
              </div>

              {/* Achievement Form - Enhanced with image upload and better mobile layout */}
              {showAddForm && formType === "achievement" && (
                <Card className="bg-[#1E1E1E] border-[#2E2E2E] mb-8">
                  <CardHeader>
                    <CardTitle className="text-[#E0E0E0] text-lg sm:text-xl">
                      {editingItem ? "Edit Achievement" : "Add Achievement"}
                    </CardTitle>
                    <CardDescription className="text-[#B0B0B0] text-sm">
                      Add student achievements with photos and detailed information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAchievementSubmit} className="space-y-6">
                      {/* Achievement Photo Upload */}
                      <div className="space-y-4">
                        <Label className="text-[#E0E0E0] text-sm font-medium">Achievement Photo</Label>
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          <div className="relative">
                            {uploadedImage || achievementFormData.image ? (
                              <div className="relative w-32 h-24 rounded-lg overflow-hidden border-2 border-[#3B82F6]">
                                <Image
                                  src={uploadedImage || achievementFormData.image}
                                  alt="Achievement"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-32 h-24 rounded-lg bg-[#252525] border-2 border-dashed border-[#2E2E2E] flex items-center justify-center">
                                <Trophy className="h-8 w-8 text-[#B0B0B0]" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              className="bg-transparent border-[#2E2E2E] text-[#B0B0B0] hover:bg-[#2E2E2E] w-full sm:w-auto"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Photo
                            </Button>
                            <p className="text-[#B0B0B0] text-xs mt-2">
                              Upload achievement photo or certificate (JPG, PNG, max 5MB)
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Achievement Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="achievementTitle" className="text-[#E0E0E0] text-sm font-medium">
                            Achievement Title *
                          </Label>
                          <Input
                            id="achievementTitle"
                            value={achievementFormData.title}
                            onChange={(e) => setAchievementFormData({ ...achievementFormData, title: e.target.value })}
                            className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                            placeholder="e.g., Science Olympiad Gold Medal"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="achievementCategory" className="text-[#E0E0E0] text-sm font-medium">
                            Category *
                          </Label>
                          <Select
                            value={achievementFormData.category}
                            onValueChange={(value) =>
                              setAchievementFormData({ ...achievementFormData, category: value })
                            }
                          >
                            <SelectTrigger className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] h-11">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1E1E1E] border-[#2E2E2E]">
                              <SelectItem value="Academic" className="text-[#E0E0E0]">
                                Academic
                              </SelectItem>
                              <SelectItem value="Sports" className="text-[#E0E0E0]">
                                Sports
                              </SelectItem>
                              <SelectItem value="Cultural" className="text-[#E0E0E0]">
                                Cultural
                              </SelectItem>
                              <SelectItem value="Leadership" className="text-[#E0E0E0]">
                                Leadership
                              </SelectItem>
                              <SelectItem value="Community Service" className="text-[#E0E0E0]">
                                Community Service
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="achievementYear" className="text-[#E0E0E0] text-sm font-medium">
                            Year *
                          </Label>
                          <Input
                            id="achievementYear"
                            value={achievementFormData.year}
                            onChange={(e) => setAchievementFormData({ ...achievementFormData, year: e.target.value })}
                            className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                            placeholder="2024"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="achievementPosition" className="text-[#E0E0E0] text-sm font-medium">
                            Position/Award *
                          </Label>
                          <Input
                            id="achievementPosition"
                            value={achievementFormData.position}
                            onChange={(e) =>
                              setAchievementFormData({ ...achievementFormData, position: e.target.value })
                            }
                            className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                            placeholder="e.g., 1st Place, Gold Medal, Winner"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="studentName" className="text-[#E0E0E0] text-sm font-medium">
                            Student Name
                          </Label>
                          <Input
                            id="studentName"
                            value={achievementFormData.studentName}
                            onChange={(e) =>
                              setAchievementFormData({ ...achievementFormData, studentName: e.target.value })
                            }
                            className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                            placeholder="Student who achieved this"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="studentClass" className="text-[#E0E0E0] text-sm font-medium">
                            Student Class
                          </Label>
                          <Input
                            id="studentClass"
                            value={achievementFormData.studentClass}
                            onChange={(e) =>
                              setAchievementFormData({ ...achievementFormData, studentClass: e.target.value })
                            }
                            className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                            placeholder="e.g., Class XII-A"
                          />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="achievementDescription" className="text-[#E0E0E0] text-sm font-medium">
                            Description *
                          </Label>
                          <Textarea
                            id="achievementDescription"
                            value={achievementFormData.description}
                            onChange={(e) =>
                              setAchievementFormData({ ...achievementFormData, description: e.target.value })
                            }
                            className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] min-h-[100px]"
                            placeholder="Describe the achievement, competition details, and significance..."
                            required
                          />
                        </div>
                      </div>

                      {/* Form Actions */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                          type="submit"
                          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white flex-1 sm:flex-none"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {editingItem ? "Update Achievement" : "Add Achievement"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setShowAddForm(false)
                            resetForms()
                          }}
                          className="bg-transparent border-[#2E2E2E] text-[#B0B0B0] hover:bg-[#2E2E2E] flex-1 sm:flex-none"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Achievements Grid - Improved responsive grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className="bg-[#1E1E1E] border-[#2E2E2E] overflow-hidden hover:border-[#3B82F6] transition-colors"
                  >
                    <div className="relative">
                      <Image
                        src={achievement.image || "/placeholder.svg"}
                        alt={achievement.title}
                        width={400}
                        height={250}
                        className="w-full h-40 sm:h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-[#4ADE80] text-black border-0 text-xs font-medium">
                          {achievement.category}
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge variant="outline" className="bg-black/50 text-white border-white/20 text-xs">
                          {achievement.year}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-3">
                        <h3 className="text-sm sm:text-base font-bold text-[#E0E0E0] mb-1 line-clamp-1">
                          {achievement.title}
                        </h3>
                        <p className="text-[#FACC15] font-medium text-sm mb-2">{achievement.position}</p>
                        <p className="text-[#B0B0B0] text-xs line-clamp-3">{achievement.description}</p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          onClick={() => handleEdit(achievement, "achievement")}
                          size="sm"
                          variant="outline"
                          className="flex-1 border-[#2E2E2E] text-[#B0B0B0] hover:text-[#E0E0E0] hover:bg-[#2E2E2E] text-xs"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(achievement.id, "achievement")}
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
            </TabsContent>

            {/* Student Results Tab */}
            <TabsContent value="student" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#E0E0E0]">Student Results</h2>
                <Button
                  onClick={() => handleAddNew("student")}
                  className="bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] hover:from-[#2563EB] hover:to-[#0891B2] text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Student Result
                </Button>
              </div>

              {/* Student Result Form */}
              {showAddForm && formType === "student" && (
                <Card className="bg-[#1E1E1E] border-[#2E2E2E] mb-8">
                  <CardHeader>
                    <CardTitle className="text-[#E0E0E0] text-lg sm:text-xl">
                      {editingItem ? "Edit Student Result" : "Add Student Result"}
                    </CardTitle>
                    <CardDescription className="text-[#B0B0B0] text-sm">
                      Fill in all details to create a comprehensive student profile with results
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleStudentResultSubmit} className="space-y-6">
                      {/* Student Photo Upload */}
                      <div className="space-y-4">
                        <Label className="text-[#E0E0E0] text-sm font-medium">Student Photo</Label>
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          <div className="relative">
                            {uploadedImage || studentResultFormData.studentImage ? (
                              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#3B82F6]">
                                <Image
                                  src={uploadedImage || studentResultFormData.studentImage}
                                  alt="Student"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-24 h-24 rounded-full bg-[#252525] border-2 border-dashed border-[#2E2E2E] flex items-center justify-center">
                                <User className="h-8 w-8 text-[#B0B0B0]" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              className="bg-transparent border-[#2E2E2E] text-[#B0B0B0] hover:bg-[#2E2E2E] w-full sm:w-auto"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Photo
                            </Button>
                            <p className="text-[#B0B0B0] text-xs mt-2">
                              Upload a clear photo of the student (JPG, PNG, max 5MB)
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Basic Information */}
                      <div className="space-y-4">
                        <h4 className="text-[#E0E0E0] font-medium text-base">Basic Information</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="studentName" className="text-[#E0E0E0] text-sm font-medium">
                              Student Name *
                            </Label>
                            <Input
                              id="studentName"
                              value={studentResultFormData.studentName}
                              onChange={(e) =>
                                setStudentResultFormData({ ...studentResultFormData, studentName: e.target.value })
                              }
                              className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                              placeholder="Enter full name"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="rollNumber" className="text-[#E0E0E0] text-sm font-medium">
                              Roll Number *
                            </Label>
                            <Input
                              id="rollNumber"
                              value={studentResultFormData.rollNumber}
                              onChange={(e) =>
                                setStudentResultFormData({ ...studentResultFormData, rollNumber: e.target.value })
                              }
                              className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                              placeholder="e.g., 2024001"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="class" className="text-[#E0E0E0] text-sm font-medium">
                              Class *
                            </Label>
                            <Select
                              value={studentResultFormData.class}
                              onChange={(e) =>
                                setStudentResultFormData({ ...studentResultFormData, class: e.target.value })
                              }
                            >
                              <SelectTrigger className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] h-11">
                                <SelectValue placeholder="Select class" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#1E1E1E] border-[#2E2E2E]">
                                {[...Array(12)].map((_, i) => (
                                  <SelectItem key={i + 1} value={`${i + 1}`} className="text-[#E0E0E0]">
                                    Class {i + 1}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="section" className="text-[#E0E0E0] text-sm font-medium">
                              Section *
                            </Label>
                            <Select
                              value={studentResultFormData.section}
                              onChange={(e) =>
                                setStudentResultFormData({ ...studentResultFormData, section: e.target.value })
                              }
                            >
                              <SelectTrigger className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] h-11">
                                <SelectValue placeholder="Select section" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#1E1E1E] border-[#2E2E2E]">
                                {["A", "B", "C", "D"].map((section) => (
                                  <SelectItem key={section} value={section} className="text-[#E0E0E0]">
                                    Section {section}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="stream" className="text-[#E0E0E0] text-sm font-medium">
                              Stream
                            </Label>
                            <Select
                              value={studentResultFormData.stream}
                              onChange={(e) =>
                                setStudentResultFormData({ ...studentResultFormData, stream: e.target.value })
                              }
                            >
                              <SelectTrigger className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] h-11">
                                <SelectValue placeholder="Select stream" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#1E1E1E] border-[#2E2E2E]">
                                <SelectItem value="Science" className="text-[#E0E0E0]">
                                  Science
                                </SelectItem>
                                <SelectItem value="Commerce" className="text-[#E0E0E0]">
                                  Commerce
                                </SelectItem>
                                <SelectItem value="Arts" className="text-[#E0E0E0]">
                                  Arts
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="year" className="text-[#E0E0E0] text-sm font-medium">
                              Academic Year *
                            </Label>
                            <Input
                              id="year"
                              value={studentResultFormData.year}
                              onChange={(e) =>
                                setStudentResultFormData({ ...studentResultFormData, year: e.target.value })
                              }
                              className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                              placeholder="e.g., 2023-24"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Personal Details */}
                      <div className="space-y-4">
                        <h4 className="text-[#E0E0E0] font-medium text-base">Personal Details</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fatherName" className="text-[#E0E0E0] text-sm font-medium">
                              Father's Name
                            </Label>
                            <Input
                              id="fatherName"
                              value={studentResultFormData.fatherName}
                              onChange={(e) =>
                                setStudentResultFormData({ ...studentResultFormData, fatherName: e.target.value })
                              }
                              className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                              placeholder="Enter father's name"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="motherName" className="text-[#E0E0E0] text-sm font-medium">
                              Mother's Name
                            </Label>
                            <Input
                              id="motherName"
                              value={studentResultFormData.motherName}
                              onChange={(e) =>
                                setStudentResultFormData({ ...studentResultFormData, motherName: e.target.value })
                              }
                              className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                              placeholder="Enter mother's name"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="dateOfBirth" className="text-[#E0E0E0] text-sm font-medium">
                              Date of Birth
                            </Label>
                            <Input
                              id="dateOfBirth"
                              type="date"
                              value={studentResultFormData.dateOfBirth}
                              onChange={(e) =>
                                setStudentResultFormData({ ...studentResultFormData, dateOfBirth: e.target.value })
                              }
                              className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] h-11"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-[#E0E0E0] text-sm font-medium">
                              Phone Number
                            </Label>
                            <Input
                              id="phone"
                              value={studentResultFormData.phone}
                              onChange={(e) =>
                                setStudentResultFormData({ ...studentResultFormData, phone: e.target.value })
                              }
                              className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                              placeholder="+91 9876543210"
                            />
                          </div>

                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="address" className="text-[#E0E0E0] text-sm font-medium">
                              Address
                            </Label>
                            <Textarea
                              id="address"
                              value={studentResultFormData.address}
                              onChange={(e) =>
                                setStudentResultFormData({ ...studentResultFormData, address: e.target.value })
                              }
                              className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] min-h-[80px]"
                              placeholder="Enter complete address"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-[#E0E0E0] text-sm font-medium">
                              Email Address
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={studentResultFormData.email}
                              onChange={(e) =>
                                setStudentResultFormData({ ...studentResultFormData, email: e.target.value })
                              }
                              className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                              placeholder="student@example.com"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="attendance" className="text-[#E0E0E0] text-sm font-medium">
                              Attendance %
                            </Label>
                            <Input
                              id="attendance"
                              type="number"
                              min="0"
                              max="100"
                              value={studentResultFormData.attendance}
                              onChange={(e) =>
                                setStudentResultFormData({ ...studentResultFormData, attendance: e.target.value })
                              }
                              className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                              placeholder="95"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Subject-wise Marks */}
                      <div className="space-y-4">
                        <h4 className="text-[#E0E0E0] font-medium text-base">Subject-wise Marks</h4>
                        <div className="space-y-4">
                          {studentResultFormData.subjects.map((subject, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#252525] rounded-lg"
                            >
                              <div className="space-y-2">
                                <Label className="text-[#B0B0B0] text-xs">Subject</Label>
                                <Input
                                  value={subject.name}
                                  onChange={(e) => {
                                    const newSubjects = [...studentResultFormData.subjects]
                                    newSubjects[index].name = e.target.value
                                    setStudentResultFormData({ ...studentResultFormData, subjects: newSubjects })
                                  }}
                                  className="bg-[#1A1A1A] border-[#2E2E2E] text-[#E0E0E0] h-10"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#B0B0B0] text-xs">Marks Obtained</Label>
                                <Input
                                  type="number"
                                  value={subject.marks}
                                  onChange={(e) => {
                                    const newSubjects = [...studentResultFormData.subjects]
                                    newSubjects[index].marks = e.target.value
                                    setStudentResultFormData({ ...studentResultFormData, subjects: newSubjects })
                                  }}
                                  className="bg-[#1A1A1A] border-[#2E2E2E] text-[#E0E0E0] h-10"
                                  placeholder="0"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#B0B0B0] text-xs">Max Marks</Label>
                                <Input
                                  type="number"
                                  value={subject.maxMarks}
                                  onChange={(e) => {
                                    const newSubjects = [...studentResultFormData.subjects]
                                    newSubjects[index].maxMarks = e.target.value
                                    setStudentResultFormData({ ...studentResultFormData, subjects: newSubjects })
                                  }}
                                  className="bg-[#1A1A1A] border-[#2E2E2E] text-[#E0E0E0] h-10"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Additional Information */}
                      <div className="space-y-4">
                        <h4 className="text-[#E0E0E0] font-medium text-base">Additional Information</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="rank" className="text-[#E0E0E0] text-sm font-medium">
                              Class Rank
                            </Label>
                            <Input
                              id="rank"
                              type="number"
                              value={studentResultFormData.rank}
                              onChange={(e) =>
                                setStudentResultFormData({ ...studentResultFormData, rank: e.target.value })
                              }
                              className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                              placeholder="1"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="grade" className="text-[#E0E0E0] text-sm font-medium">
                              Grade
                            </Label>
                            <Select
                              value={studentResultFormData.grade}
                              onChange={(e) =>
                                setStudentResultFormData({ ...studentResultFormData, grade: e.target.value })
                              }
                            >
                              <SelectTrigger className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] h-11">
                                <SelectValue placeholder="Select grade" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#1E1E1E] border-[#2E2E2E]">
                                <SelectItem value="A+" className="text-[#E0E0E0]">
                                  A+ (90-100%)
                                </SelectItem>
                                <SelectItem value="A" className="text-[#E0E0E0]">
                                  A (80-89%)
                                </SelectItem>
                                <SelectItem value="B+" className="text-[#E0E0E0]">
                                  B+ (70-79%)
                                </SelectItem>
                                <SelectItem value="B" className="text-[#E0E0E0]">
                                  B (60-69%)
                                </SelectItem>
                                <SelectItem value="C" className="text-[#E0E0E0]">
                                  C (50-59%)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="extracurricular" className="text-[#E0E0E0] text-sm font-medium">
                              Extracurricular Activities
                            </Label>
                            <Textarea
                              id="extracurricular"
                              value={studentResultFormData.extracurricular}
                              onChange={(e) =>
                                setStudentResultFormData({ ...studentResultFormData, extracurricular: e.target.value })
                              }
                              className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] min-h-[80px]"
                              placeholder="List student's extracurricular activities, clubs, sports, etc."
                            />
                          </div>

                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="remarks" className="text-[#E0E0E0] text-sm font-medium">
                              Teacher's Remarks
                            </Label>
                            <Textarea
                              id="remarks"
                              value={studentResultFormData.remarks}
                              onChange={(e) =>
                                setStudentResultFormData({ ...studentResultFormData, remarks: e.target.value })
                              }
                              className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] min-h-[100px]"
                              placeholder="Enter teacher's remarks about the student's performance, behavior, and potential..."
                            />
                          </div>
                        </div>
                      </div>

                      {/* Form Actions */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                          type="submit"
                          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white flex-1 sm:flex-none"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {editingItem ? "Update Result" : "Add Result"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setShowAddForm(false)
                            resetForms()
                          }}
                          className="bg-transparent border-[#2E2E2E] text-[#B0B0B0] hover:bg-[#2E2E2E] flex-1 sm:flex-none"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Student Results List */}
              <div className="grid grid-cols-1 gap-6">
                {studentResults.map((result) => (
                  <Card key={result.id} className="bg-[#1E1E1E] border-[#2E2E2E]">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Medal className="h-6 w-6 text-[#3B82F6]" />
                          <div>
                            <h3 className="text-xl font-bold text-[#E0E0E0] mb-1 line-clamp-1">
                              {result.studentName} - Class {result.class} {result.section}
                            </h3>
                            <p className="text-[#B0B0B0]">Roll Number: {result.rollNumber}</p>
                            <p className="text-[#B0B0B0]">Exam Type: {result.examType}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleEdit(result, "student")}
                            size="sm"
                            variant="outline"
                            className="border-[#2E2E2E] text-[#B0B0B0] hover:text-[#E0E0E0] hover:bg-[#2E2E2E]"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(result.id, "student")}
                            size="sm"
                            variant="outline"
                            className="border-[#F87171] text-[#F87171] hover:bg-[#F87171] hover:text-white"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-[#E0E0E0] mb-3">Subject-wise Marks</h4>
                          <div className="space-y-2">
                            {result.subjects.map((subject, idx) => (
                              <div key={idx} className="flex items-center justify-between p-2 bg-[#252525] rounded">
                                <span className="text-[#E0E0E0] text-sm">{subject.name}</span>
                                <Badge className="bg-[#4ADE80]/20 text-[#4ADE80] border-0">{`${subject.marks}/${subject.maxMarks}`}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-[#E0E0E0] mb-3">Additional Details</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Medal className="h-4 w-4 text-[#8B5CF6]" />
                              <span className="text-[#B0B0B0] text-sm">Total Marks: {result.totalMarks}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Medal className="h-4 w-4 text-[#8B5CF6]" />
                              <span className="text-[#B0B0B0] text-sm">Percentage: {result.percentage}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Medal className="h-4 w-4 text-[#8B5CF6]" />
                              <span className="text-[#B0B0B0] text-sm">Grade: {result.grade}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Medal className="h-4 w-4 text-[#8B5CF6]" />
                              <span className="text-[#B0B0B0] text-sm">Rank: {result.rank}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Medal className="h-4 w-4 text-[#8B5CF6]" />
                              <span className="text-[#B0B0B0] text-sm">Remarks: {result.remarks}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminAuth>
  )
}
