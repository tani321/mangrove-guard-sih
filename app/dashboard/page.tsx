"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { MRVDashboard } from "@/components/mrv-dashboard"
import { TokenizationInterface } from "@/components/tokenization-interface"
import { DataVisualization } from "@/components/data-visualization"
import { AdminPanel } from "@/components/admin-panel"
import { SettingsPage } from "@/components/settings-page"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const [userInfo] = useState({
    name: "John Doe",
    email: "demo@bluecarbonregistry.com",
    organization: "Blue Carbon Solutions",
  })

  useEffect(() => {
    const checkAuth = () => {
      // For demo purposes, we'll assume user is authenticated if they reached this page
      // In a real app, you would check localStorage, sessionStorage, or cookies for auth token
      const isLoggedIn = localStorage.getItem("isAuthenticated") === "true" || true // Always true for demo
      setIsAuthenticated(isLoggedIn)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    setIsAuthenticated(false)
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Blue Carbon Registry & MRV System</h1>
              <p className="text-muted-foreground">
                Blockchain-based monitoring, reporting, and verification for carbon credits
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{userInfo.name}</p>
                <p className="text-xs text-muted-foreground">{userInfo.organization}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setActiveTab("settings")}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="dashboard">MRV Dashboard</TabsTrigger>
              <TabsTrigger value="certification">MRV Certification</TabsTrigger>
              <TabsTrigger value="tokenization">Tokenization</TabsTrigger>
              <TabsTrigger value="visualization">Data Visualization</TabsTrigger>
              <TabsTrigger value="admin">Admin Panel</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <MRVDashboard />
            </TabsContent>

            <TabsContent value="certification">
              <MRVDashboard />
            </TabsContent>

            <TabsContent value="tokenization">
              <TokenizationInterface />
            </TabsContent>

            <TabsContent value="visualization">
              <DataVisualization />
            </TabsContent>

            <TabsContent value="admin">
              <AdminPanel />
            </TabsContent>

            <TabsContent value="settings">
              <SettingsPage />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

