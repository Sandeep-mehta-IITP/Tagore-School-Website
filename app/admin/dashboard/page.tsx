"use client"
import { useRouter } from "next/navigation"
import { AdminAuth } from "@/components/admin-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ImageIcon, Trophy, LogOut, Plus, Eye, BarChart3, School } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin")
  }

  const stats = [
    { title: "Total Teachers", value: "12", icon: Users, color: "from-[#3B82F6] to-[#22D3EE]" },
    { title: "Gallery Images", value: "48", icon: ImageIcon, color: "from-[#4ADE80] to-[#22D3EE]" },
    { title: "Student Results", value: "156", icon: Trophy, color: "from-[#FACC15] to-[#F87171]" },
    { title: "Achievements", value: "24", icon: BarChart3, color: "from-[#F87171] to-[#FACC15]" },
  ]

  const quickActions = [
    {
      title: "Manage Gallery",
      description: "Add, edit, or remove gallery images",
      icon: ImageIcon,
      href: "/admin/gallery",
    },
    {
      title: "Manage Teachers",
      description: "Add new teachers or update existing profiles",
      icon: Users,
      href: "/admin/teachers",
    },
    {
      title: "Manage Results",
      description: "Update student results and achievements",
      icon: Trophy,
      href: "/admin/results",
    },
  ]

  return (
    <AdminAuth>
      <div className="min-h-screen bg-[#121212]">
        {/* Header */}
        <div className="bg-[#1E1E1E] border-b border-[#2E2E2E] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] rounded-lg flex items-center justify-center">
                <School className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#E0E0E0]">Admin Dashboard</h1>
                <p className="text-sm text-[#B0B0B0]">Tagore Bal Vidhya Niketan School</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-[#2E2E2E] text-[#B0B0B0] hover:text-[#E0E0E0] hover:bg-[#2E2E2E] bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-[#1E1E1E] border-[#2E2E2E]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#B0B0B0] mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-[#E0E0E0]">{stat.value}</p>
                    </div>
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="bg-[#1E1E1E] border-[#2E2E2E] hover:bg-[#2A2A2A] transition-colors cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] rounded-lg flex items-center justify-center">
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-[#E0E0E0]">{action.title}</CardTitle>
                      <CardDescription className="text-[#B0B0B0]">{action.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => router.push(action.href)}
                      className="flex-1 bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] hover:from-[#2563EB] hover:to-[#0891B2] text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New
                    </Button>
                    <Button
                      onClick={() => router.push(action.href)}
                      variant="outline"
                      className="border-[#2E2E2E] text-[#B0B0B0] hover:text-[#E0E0E0] hover:bg-[#2E2E2E]"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card className="mt-8 bg-[#1E1E1E] border-[#2E2E2E]">
            <CardHeader>
              <CardTitle className="text-[#E0E0E0]">Recent Activity</CardTitle>
              <CardDescription className="text-[#B0B0B0]">Latest updates and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Added new teacher profile", time: "2 hours ago", type: "teacher" },
                  { action: "Updated gallery with 5 new images", time: "1 day ago", type: "gallery" },
                  { action: "Published Class 12 results", time: "3 days ago", type: "results" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-[#121212] rounded-lg">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === "teacher"
                          ? "bg-[#3B82F6]"
                          : activity.type === "gallery"
                            ? "bg-[#4ADE80]"
                            : "bg-[#FACC15]"
                      }`}
                    >
                      {activity.type === "teacher" ? (
                        <Users className="w-4 h-4 text-white" />
                      ) : activity.type === "gallery" ? (
                        <ImageIcon className="w-4 h-4 text-white" />
                      ) : (
                        <Trophy className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-[#E0E0E0] text-sm">{activity.action}</p>
                      <p className="text-[#B0B0B0] text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminAuth>
  )
}
