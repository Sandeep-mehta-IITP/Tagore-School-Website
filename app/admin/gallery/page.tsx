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
import { ArrowLeft, Plus, Edit, Trash2, ImageIcon, Video, Upload, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

// Mock data - in production this would come from a database
const initialGalleryItems = [
  {
    id: 1,
    type: "photo",
    category: "Events",
    title: "Annual Sports Day 2024",
    image: "/school-sports-day-athletics.png",
    description: "Students participating in various sports activities and competitions",
  },
  {
    id: 2,
    type: "video",
    category: "Events",
    title: "Science Exhibition Highlights",
    image: "/science-lab-students.png",
    videoUrl: "https://example.com/video1.mp4",
    description: "Best moments from our annual science exhibition showcasing student innovations",
  },
]

export default function GalleryManagement() {
  const router = useRouter()
  const fileInputRef = useRef(null)
  const [galleryItems, setGalleryItems] = useState(initialGalleryItems)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [formData, setFormData] = useState({
    type: "photo",
    category: "Events",
    title: "",
    image: "",
    videoUrl: "",
    description: "",
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

    if (editingItem) {
      // Update existing item
      setGalleryItems((items) =>
        items.map((item) => (item.id === editingItem.id ? { ...formData, id: editingItem.id } : item)),
      )
      setEditingItem(null)
    } else {
      // Add new item
      const newItem = {
        ...formData,
        id: Date.now(), // Simple ID generation
      }
      setGalleryItems((items) => [...items, newItem])
    }

    // Reset form
    setFormData({
      type: "photo",
      category: "Events",
      title: "",
      image: "",
      videoUrl: "",
      description: "",
    })
    setUploadedImage(null)
    setShowAddForm(false)
  }

  const handleEdit = (item) => {
    setFormData(item)
    setEditingItem(item)
    setUploadedImage(item.image)
    setShowAddForm(true)
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setGalleryItems((items) => items.filter((item) => item.id !== id))
    }
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setEditingItem(null)
    setUploadedImage(null)
    setFormData({
      type: "photo",
      category: "Events",
      title: "",
      image: "",
      videoUrl: "",
      description: "",
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
                <h1 className="text-lg sm:text-xl font-bold text-[#E0E0E0]">Gallery Management</h1>
                <p className="text-xs sm:text-sm text-[#B0B0B0]">Manage school gallery images and videos</p>
              </div>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] hover:from-[#2563EB] hover:to-[#0891B2] text-white w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Item
            </Button>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Add/Edit Form - Enhanced with image upload and better mobile layout */}
          {showAddForm && (
            <Card className="mb-8 bg-[#1E1E1E] border-[#2E2E2E]">
              <CardHeader>
                <CardTitle className="text-[#E0E0E0] text-lg sm:text-xl">
                  {editingItem ? "Edit Gallery Item" : "Add New Gallery Item"}
                </CardTitle>
                <CardDescription className="text-[#B0B0B0] text-sm">
                  {editingItem
                    ? "Update the gallery item details below"
                    : "Fill in the details to add a new item to the gallery"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Type and Category - Better mobile layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-[#E0E0E0] text-sm font-medium">
                        Content Type *
                      </Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1E1E1E] border-[#2E2E2E]">
                          <SelectItem value="photo" className="text-[#E0E0E0]">
                            📷 Photo
                          </SelectItem>
                          <SelectItem value="video" className="text-[#E0E0E0]">
                            🎥 Video
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-[#E0E0E0] text-sm font-medium">
                        Category *
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1E1E1E] border-[#2E2E2E]">
                          <SelectItem value="Events" className="text-[#E0E0E0]">
                            🎉 Events
                          </SelectItem>
                          <SelectItem value="Photos" className="text-[#E0E0E0]">
                            📸 Photos
                          </SelectItem>
                          <SelectItem value="Activities" className="text-[#E0E0E0]">
                            🏃 Activities
                          </SelectItem>
                          <SelectItem value="Achievements" className="text-[#E0E0E0]">
                            🏆 Achievements
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-[#E0E0E0] text-sm font-medium">
                      Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                      placeholder="Enter a descriptive title"
                      required
                    />
                  </div>

                  {/* Image Upload Section - Added comprehensive image upload */}
                  <div className="space-y-4">
                    <Label className="text-[#E0E0E0] text-sm font-medium">
                      Image * {formData.type === "video" && "(Thumbnail)"}
                    </Label>

                    {/* Upload Button */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="border-[#2E2E2E] text-[#B0B0B0] hover:text-[#E0E0E0] hover:bg-[#2E2E2E] bg-transparent h-11"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose from Device
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
                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden border-2 border-[#2E2E2E]">
                          <Image src={uploadedImage || formData.image} alt="Preview" fill className="object-cover" />
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
                      💡 Tip: Upload high-quality images (recommended: 800x600px or higher)
                    </p>
                  </div>

                  {/* Video URL for videos */}
                  {formData.type === "video" && (
                    <div className="space-y-2">
                      <Label htmlFor="videoUrl" className="text-[#E0E0E0] text-sm font-medium">
                        Video URL
                      </Label>
                      <Input
                        id="videoUrl"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] h-11"
                        placeholder="Enter YouTube, Vimeo, or direct video URL"
                      />
                    </div>
                  )}

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-[#E0E0E0] text-sm font-medium">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-[#121212] border-[#2E2E2E] text-[#E0E0E0] placeholder:text-[#B0B0B0] min-h-[100px]"
                      placeholder="Write a detailed description of this content..."
                      rows={4}
                      required
                    />
                  </div>

                  {/* Action Buttons - Better mobile layout */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] hover:from-[#2563EB] hover:to-[#0891B2] text-white h-11 order-2 sm:order-1"
                      disabled={!formData.title || !formData.image || !formData.description}
                    >
                      {editingItem ? "✅ Update Item" : "➕ Add Item"}
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

          {/* Gallery Items Grid - Improved responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {galleryItems.map((item) => (
              <Card
                key={item.id}
                className="bg-[#1E1E1E] border-[#2E2E2E] overflow-hidden hover:border-[#3B82F6] transition-colors"
              >
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={400}
                    height={250}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant={item.type === "video" ? "destructive" : "secondary"} className="text-xs">
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
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="bg-black/50 text-white border-white/20 text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-sm sm:text-base font-semibold text-[#E0E0E0] mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-[#B0B0B0] text-xs sm:text-sm mb-4 line-clamp-3">{item.description}</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={() => handleEdit(item)}
                      size="sm"
                      variant="outline"
                      className="border-[#2E2E2E] text-[#B0B0B0] hover:text-[#E0E0E0] hover:bg-[#2E2E2E] text-xs flex-1"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.id)}
                      size="sm"
                      variant="outline"
                      className="border-[#F87171] text-[#F87171] hover:bg-[#F87171] hover:text-white text-xs flex-1"
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
          {galleryItems.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="w-12 h-12 sm:w-16 sm:h-16 text-[#B0B0B0] mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-[#E0E0E0] mb-2">No Gallery Items</h3>
              <p className="text-[#B0B0B0] mb-4 text-sm sm:text-base">Start by adding your first gallery item</p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] hover:from-[#2563EB] hover:to-[#0891B2] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Item
              </Button>
            </div>
          )}
        </div>
      </div>
    </AdminAuth>
  )
}
