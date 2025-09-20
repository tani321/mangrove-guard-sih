"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Leaf, MapPin, TrendingUp, Shield, Wallet, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Web3Wallet } from "./web3-wallet"

const certificationData = [
  {
    id: "MRV-001",
    project: "Mangrove Restoration - Sundarbans",
    area: "1,250 ha",
    co2: "3,200 tCO₂",
    status: "verified",
    progress: 100,
  },
  {
    id: "MRV-002",
    project: "Seagrass Conservation - Great Barrier",
    area: "890 ha",
    co2: "2,100 tCO₂",
    status: "pending",
    progress: 75,
  },
  {
    id: "MRV-003",
    project: "Salt Marsh Protection - California",
    area: "2,100 ha",
    co2: "5,800 tCO₂",
    status: "tokenized",
    progress: 100,
  },
  {
    id: "MRV-004",
    project: "Kelp Forest Restoration - Norway",
    area: "650 ha",
    co2: "1,400 tCO₂",
    status: "review",
    progress: 45,
  },
]

const analyticsData = [
  { month: "Jan", co2: 1200, area: 450 },
  { month: "Feb", co2: 1800, area: 680 },
  { month: "Mar", co2: 2400, area: 920 },
  { month: "Apr", co2: 3200, area: 1250 },
  { month: "May", co2: 4100, area: 1580 },
  { month: "Jun", co2: 5200, area: 2100 },
]

const statusColors = {
  verified: "bg-chart-1",
  pending: "bg-yellow-500",
  tokenized: "bg-chart-4",
  review: "bg-orange-500",
}

const statusIcons = {
  verified: CheckCircle,
  pending: Clock,
  tokenized: Wallet,
  review: AlertCircle,
}

export function MRVDashboard() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total CO₂ Sequestered</CardTitle>
            <Leaf className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,500 tCO₂</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Area Covered</CardTitle>
            <MapPin className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,890 ha</div>
            <p className="text-xs text-muted-foreground">Across 12 projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Credits</CardTitle>
            <Shield className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">Ready for tokenization</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Token Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45.20</div>
            <p className="text-xs text-muted-foreground">Per tCO₂ credit</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="certifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="certifications">MRV Certifications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="wallet">Wallet & Tokens</TabsTrigger>
        </TabsList>

        <TabsContent value="certifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Certifications</CardTitle>
              <CardDescription>Monitor verification status and progress of blue carbon projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certificationData.map((project) => {
                  const StatusIcon = statusIcons[project.status as keyof typeof statusIcons]
                  return (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-3 h-3 rounded-full ${statusColors[project.status as keyof typeof statusColors]}`}
                        />
                        <div>
                          <div className="font-medium">{project.project}</div>
                          <div className="text-sm text-muted-foreground">
                            {project.id} • {project.area} • {project.co2}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <StatusIcon className="w-4 h-4" />
                            <Badge variant={project.status === "verified" ? "default" : "secondary"}>
                              {project.status}
                            </Badge>
                          </div>
                          <Progress value={project.progress} className="w-24 mt-2" />
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>CO₂ Sequestration Trend</CardTitle>
                <CardDescription>Monthly carbon sequestration progress</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="co2" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Area Coverage</CardTitle>
                <CardDescription>Hectares under restoration by month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="area" fill="hsl(var(--chart-2))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-6">
          <Web3Wallet />
        </TabsContent>
      </Tabs>
    </div>
  )
}
