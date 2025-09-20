"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { MRVDashboard } from "@/components/mrv-dashboard"
import { TokenizationInterface } from "@/components/tokenization-interface"
import { DataVisualization } from "@/components/data-visualization"
import { AdminPanel } from "@/components/admin-panel"
import { SettingsPage } from "@/components/settings-page"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Blue Carbon Registry & MRV System</h1>
            <p className="text-muted-foreground">
              Blockchain-based monitoring, reporting, and verification for carbon credits
            </p>
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
