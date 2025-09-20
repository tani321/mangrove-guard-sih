"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
} from "recharts"
import { MapPin, Satellite, TrendingUp, Activity, Layers, Filter, Download, Eye, Thermometer } from "lucide-react"

const projectLocations = [
  {
    id: 1,
    name: "Mangrove Restoration - Sundarbans",
    lat: 21.9497,
    lng: 89.1833,
    co2: 3200,
    area: 1250,
    status: "active",
  },
  {
    id: 2,
    name: "Seagrass Conservation - Great Barrier",
    lat: -16.2839,
    lng: 145.7781,
    co2: 2100,
    area: 890,
    status: "monitoring",
  },
  {
    id: 3,
    name: "Salt Marsh Protection - California",
    lat: 37.7749,
    lng: -122.4194,
    co2: 5800,
    area: 2100,
    status: "completed",
  },
  {
    id: 4,
    name: "Kelp Forest Restoration - Norway",
    lat: 59.9139,
    lng: 10.7522,
    co2: 1400,
    area: 650,
    status: "active",
  },
  {
    id: 5,
    name: "Mangrove Conservation - Philippines",
    lat: 14.5995,
    lng: 120.9842,
    co2: 2800,
    area: 1100,
    status: "monitoring",
  },
]

const sensorData = [
  { time: "00:00", temperature: 24.5, salinity: 35.2, ph: 8.1, turbidity: 2.3 },
  { time: "04:00", temperature: 24.2, salinity: 35.4, ph: 8.0, turbidity: 2.1 },
  { time: "08:00", temperature: 25.1, salinity: 35.1, ph: 8.2, turbidity: 2.5 },
  { time: "12:00", temperature: 26.3, salinity: 34.9, ph: 8.3, turbidity: 2.8 },
  { time: "16:00", temperature: 26.8, salinity: 34.8, ph: 8.2, turbidity: 3.1 },
  { time: "20:00", temperature: 25.4, salinity: 35.0, ph: 8.1, turbidity: 2.6 },
]

const ecosystemData = [
  { name: "Mangroves", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Seagrass", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Salt Marshes", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Kelp Forests", value: 10, color: "hsl(var(--chart-4))" },
]

const droneData = [
  { area: 100, biomass: 45, co2: 120 },
  { area: 150, biomass: 68, co2: 180 },
  { area: 200, biomass: 89, co2: 240 },
  { area: 250, biomass: 112, co2: 300 },
  { area: 300, biomass: 134, co2: 360 },
  { area: 350, biomass: 156, co2: 420 },
  { area: 400, biomass: 178, co2: 480 },
]

const heatmapData = [
  { x: 0, y: 0, value: 0.2 },
  { x: 1, y: 0, value: 0.4 },
  { x: 2, y: 0, value: 0.6 },
  { x: 3, y: 0, value: 0.8 },
  { x: 0, y: 1, value: 0.3 },
  { x: 1, y: 1, value: 0.5 },
  { x: 2, y: 1, value: 0.7 },
  { x: 3, y: 1, value: 0.9 },
  { x: 0, y: 2, value: 0.4 },
  { x: 1, y: 2, value: 0.6 },
  { x: 2, y: 2, value: 0.8 },
  { x: 3, y: 2, value: 1.0 },
  { x: 0, y: 3, value: 0.5 },
  { x: 1, y: 3, value: 0.7 },
  { x: 2, y: 3, value: 0.9 },
  { x: 3, y: 3, value: 0.8 },
]

export function DataVisualization() {
  const [selectedProject, setSelectedProject] = useState<string>("all")
  const [selectedMetric, setSelectedMetric] = useState<string>("co2")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-chart-1"
      case "monitoring":
        return "bg-yellow-500"
      case "completed":
        return "bg-chart-4"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Data Filters & Controls
          </CardTitle>
          <CardDescription>Filter and customize data visualization views</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Project:</label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {projectLocations.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Metric:</label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="co2">CO₂ Sequestration</SelectItem>
                  <SelectItem value="area">Area Coverage</SelectItem>
                  <SelectItem value="biomass">Biomass Density</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="ml-auto bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="maps" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="maps">Project Maps</TabsTrigger>
          <TabsTrigger value="sensors">Sensor Data</TabsTrigger>
          <TabsTrigger value="drone">Drone Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="maps" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Interactive Map Placeholder */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Project Locations Map
                </CardTitle>
                <CardDescription>Interactive map showing blue carbon restoration sites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">Interactive Map</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Real-world implementation would integrate with mapping services
                    </p>
                    <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
                      {projectLocations.slice(0, 4).map((project) => (
                        <div key={project.id} className="flex items-center gap-2 p-2 bg-white rounded border">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                          <span className="text-xs truncate">{project.name.split(" - ")[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project List */}
            <Card>
              <CardHeader>
                <CardTitle>Active Projects</CardTitle>
                <CardDescription>Current restoration sites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {projectLocations.map((project) => (
                    <div key={project.id} className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                        <span className="font-medium text-sm">{project.name.split(" - ")[0]}</span>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>Location: {project.name.split(" - ")[1]}</div>
                        <div>CO₂: {project.co2} tCO₂</div>
                        <div>Area: {project.area} ha</div>
                      </div>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {project.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ecosystem Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ecosystem Distribution</CardTitle>
                <CardDescription>Breakdown of blue carbon ecosystems</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ecosystemData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {ecosystemData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Carbon Sequestration Heatmap</CardTitle>
                <CardDescription>Spatial distribution of CO₂ absorption rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg border flex items-center justify-center">
                  <div className="text-center">
                    <Layers className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Heatmap Visualization</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Shows CO₂ sequestration intensity across project areas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sensors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5" />
                  Environmental Sensors
                </CardTitle>
                <CardDescription>Real-time water quality and environmental data</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sensorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="temperature" stroke="hsl(var(--chart-1))" name="Temperature (°C)" />
                    <Line type="monotone" dataKey="salinity" stroke="hsl(var(--chart-2))" name="Salinity (ppt)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Water Quality Metrics</CardTitle>
                <CardDescription>pH and turbidity measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sensorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="ph" stroke="hsl(var(--chart-3))" name="pH Level" />
                    <Line type="monotone" dataKey="turbidity" stroke="hsl(var(--chart-4))" name="Turbidity (NTU)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Sensor Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { name: "Temperature", value: "25.4°C", status: "normal", icon: Thermometer },
              { name: "Salinity", value: "35.1 ppt", status: "normal", icon: Activity },
              { name: "pH Level", value: "8.2", status: "optimal", icon: TrendingUp },
              { name: "Turbidity", value: "2.6 NTU", status: "good", icon: Eye },
            ].map((sensor, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{sensor.name}</p>
                      <p className="text-lg font-bold">{sensor.value}</p>
                    </div>
                    <sensor.icon className="w-5 h-5 text-chart-1" />
                  </div>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {sensor.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drone" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Satellite className="w-5 h-5" />
                  Drone Survey Data
                </CardTitle>
                <CardDescription>Aerial biomass and area coverage analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={droneData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="area" name="Area (ha)" />
                    <YAxis dataKey="biomass" name="Biomass (t/ha)" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter dataKey="biomass" fill="hsl(var(--chart-1))" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CO₂ Sequestration Correlation</CardTitle>
                <CardDescription>Relationship between area and carbon absorption</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={droneData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="area" name="Area (ha)" />
                    <YAxis dataKey="co2" name="CO₂ (tCO₂)" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter dataKey="co2" fill="hsl(var(--chart-2))" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Drone Mission Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Drone Missions</CardTitle>
              <CardDescription>Latest aerial survey results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    mission: "Mission #047",
                    location: "Mangrove Restoration - Sundarbans",
                    date: "2024-01-15",
                    coverage: "1,250 ha",
                    images: 2847,
                    status: "completed",
                  },
                  {
                    mission: "Mission #046",
                    location: "Salt Marsh Protection - California",
                    date: "2024-01-12",
                    coverage: "2,100 ha",
                    images: 3921,
                    status: "processing",
                  },
                  {
                    mission: "Mission #045",
                    location: "Seagrass Conservation - Great Barrier",
                    date: "2024-01-10",
                    coverage: "890 ha",
                    images: 1654,
                    status: "completed",
                  },
                ].map((mission, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-chart-1/20 rounded-lg flex items-center justify-center">
                        <Satellite className="w-5 h-5 text-chart-1" />
                      </div>
                      <div>
                        <div className="font-medium">{mission.mission}</div>
                        <div className="text-sm text-muted-foreground">{mission.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{mission.date}</div>
                      <div className="text-xs text-muted-foreground">
                        {mission.coverage} • {mission.images} images
                      </div>
                      <Badge variant={mission.status === "completed" ? "default" : "secondary"} className="mt-1">
                        {mission.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>Automated MRV reports and data summaries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Monthly MRV Summary - January 2024",
                    type: "MRV Report",
                    date: "2024-01-31",
                    size: "2.4 MB",
                    projects: 12,
                  },
                  {
                    title: "Drone Survey Analysis - Sundarbans",
                    type: "Technical Report",
                    date: "2024-01-28",
                    size: "8.7 MB",
                    projects: 1,
                  },
                  {
                    title: "Carbon Credit Verification Report",
                    type: "Certification",
                    date: "2024-01-25",
                    size: "1.8 MB",
                    projects: 5,
                  },
                  {
                    title: "Environmental Impact Assessment",
                    type: "Impact Report",
                    date: "2024-01-20",
                    size: "4.2 MB",
                    projects: 8,
                  },
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-chart-3/20 rounded-lg flex items-center justify-center">
                        <Activity className="w-5 h-5 text-chart-3" />
                      </div>
                      <div>
                        <div className="font-medium">{report.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {report.type} • {report.projects} projects • {report.size}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{report.date}</span>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
