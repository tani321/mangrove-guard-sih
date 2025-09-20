"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Leaf, MapPin, Shield, Settings, ChevronLeft, ChevronRight, Coins, FileCheck } from "lucide-react"

const navigationItems = [
  { id: "dashboard", icon: BarChart3, label: "Dashboard", active: true },
  { id: "certification", icon: FileCheck, label: "MRV Certification", count: 12 },
  { id: "tokenization", icon: Coins, label: "Tokenization", count: 3 },
  { id: "visualization", icon: MapPin, label: "Data Visualization" },
  { id: "admin", icon: Shield, label: "Admin Panel" },
  { id: "settings", icon: Settings, label: "Settings" },
]

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-semibold text-sidebar-foreground">BlueCarbon</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              onClick={() => onTabChange(item.id)}
              className={`w-full justify-start gap-3 ${collapsed ? "px-2" : "px-3"} ${
                activeTab === item.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.count && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.count}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          ))}
        </nav>

        {!collapsed && (
          <Card className="mt-8 p-4 bg-card">
            <div className="text-sm font-medium text-card-foreground mb-2">Carbon Credits</div>
            <div className="text-2xl font-bold text-accent mb-1">2,847</div>
            <div className="text-xs text-muted-foreground">Total verified credits</div>
          </Card>
        )}
      </div>
    </div>
  )
}
