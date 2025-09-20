"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Coins, CheckCircle, Clock, ExternalLink, History, Zap, FileText, Shield, TrendingUp } from "lucide-react"

interface TokenizationProject {
  id: string
  name: string
  co2Amount: number
  area: string
  status: "ready" | "processing" | "completed"
  verificationDate: string
  estimatedValue: number
}

const tokenizationProjects: TokenizationProject[] = [
  {
    id: "MRV-001",
    name: "Mangrove Restoration - Sundarbans",
    co2Amount: 3200,
    area: "1,250 ha",
    status: "ready",
    verificationDate: "2024-01-15",
    estimatedValue: 144640,
  },
  {
    id: "MRV-003",
    name: "Salt Marsh Protection - California",
    co2Amount: 5800,
    area: "2,100 ha",
    status: "completed",
    verificationDate: "2024-01-10",
    estimatedValue: 262160,
  },
  {
    id: "MRV-005",
    name: "Seagrass Restoration - Mediterranean",
    co2Amount: 2100,
    area: "890 ha",
    status: "processing",
    verificationDate: "2024-01-20",
    estimatedValue: 94920,
  },
]

const tokenHistory = [
  {
    id: "TXN-001",
    project: "Salt Marsh Protection - California",
    amount: 5800,
    tokenType: "ERC-721 NFT",
    date: "2024-01-10",
    hash: "0x1234567890abcdef",
    status: "completed",
  },
  {
    id: "TXN-002",
    project: "Kelp Forest Restoration - Norway",
    amount: 1400,
    tokenType: "ERC-20",
    date: "2024-01-08",
    hash: "0xabcdef1234567890",
    status: "completed",
  },
  {
    id: "TXN-003",
    project: "Mangrove Conservation - Philippines",
    amount: 2800,
    tokenType: "ERC-721 NFT",
    date: "2024-01-05",
    hash: "0x567890abcdef1234",
    status: "completed",
  },
]

export function TokenizationInterface() {
  const [selectedProject, setSelectedProject] = useState<string>("")
  const [tokenType, setTokenType] = useState<string>("")
  const [isTokenizing, setIsTokenizing] = useState(false)

  const handleTokenize = async () => {
    if (!selectedProject || !tokenType) return

    setIsTokenizing(true)
    // Simulate tokenization process
    setTimeout(() => {
      setIsTokenizing(false)
      // Reset form
      setSelectedProject("")
      setTokenType("")
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-chart-1"
      case "processing":
        return "bg-yellow-500"
      case "completed":
        return "bg-chart-4"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return CheckCircle
      case "processing":
        return Clock
      case "completed":
        return Coins
      default:
        return Clock
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="tokenize" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tokenize">Tokenize Credits</TabsTrigger>
          <TabsTrigger value="portfolio">Token Portfolio</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value="tokenize" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tokenization Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Create Carbon Credit Tokens
                </CardTitle>
                <CardDescription>
                  Convert verified carbon credits into blockchain tokens (NFTs or ERC-20)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project">Select Verified Project</Label>
                  <Select value={selectedProject} onValueChange={setSelectedProject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a verified project" />
                    </SelectTrigger>
                    <SelectContent>
                      {tokenizationProjects
                        .filter((p) => p.status === "ready")
                        .map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name} - {project.co2Amount} tCO₂
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tokenType">Token Standard</Label>
                  <Select value={tokenType} onValueChange={setTokenType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select token type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="erc721">ERC-721 NFT (Unique Project Token)</SelectItem>
                      <SelectItem value="erc20">ERC-20 (Fungible Carbon Credits)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedProject && (
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Project Details</h4>
                    {(() => {
                      const project = tokenizationProjects.find((p) => p.id === selectedProject)
                      if (!project) return null
                      return (
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">CO₂ Credits:</span>
                            <span className="font-medium">{project.co2Amount} tCO₂</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Area:</span>
                            <span className="font-medium">{project.area}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Estimated Value:</span>
                            <span className="font-medium text-accent">${project.estimatedValue.toLocaleString()}</span>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                )}

                <Button
                  onClick={handleTokenize}
                  disabled={!selectedProject || !tokenType || isTokenizing}
                  className="w-full"
                >
                  {isTokenizing ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Tokenizing...
                    </>
                  ) : (
                    <>
                      <Coins className="w-4 h-4 mr-2" />
                      Create Tokens
                    </>
                  )}
                </Button>

                {tokenType && (
                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                      {tokenType === "erc721"
                        ? "ERC-721 NFTs represent unique project ownership with metadata including location, verification details, and environmental impact."
                        : "ERC-20 tokens are fungible and can be traded fractionally, making them ideal for carbon credit marketplaces."}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Available Projects */}
            <Card>
              <CardHeader>
                <CardTitle>Available for Tokenization</CardTitle>
                <CardDescription>Verified projects ready for blockchain tokenization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tokenizationProjects.map((project) => {
                    const StatusIcon = getStatusIcon(project.status)
                    return (
                      <div key={project.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                            <span className="font-medium text-sm">{project.name}</span>
                          </div>
                          <Badge variant={project.status === "ready" ? "default" : "secondary"}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {project.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <div>CO₂: {project.co2Amount} tCO₂</div>
                          <div>Area: {project.area}</div>
                          <div>Verified: {project.verificationDate}</div>
                          <div className="text-accent font-medium">${project.estimatedValue.toLocaleString()}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
                <Coins className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">Across 8 projects</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total CO₂ Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18,400 tCO₂</div>
                <p className="text-xs text-muted-foreground">Tokenized credits</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$831,680</div>
                <p className="text-xs text-muted-foreground">Current market value</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Token Holdings</CardTitle>
              <CardDescription>Your tokenized carbon credit portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "ERC-721 NFT",
                    project: "Salt Marsh Protection - California",
                    amount: "5,800 tCO₂",
                    value: "$262,160",
                    tokenId: "#001",
                  },
                  {
                    type: "ERC-20",
                    project: "Kelp Forest Restoration - Norway",
                    amount: "1,400 tCO₂",
                    value: "$63,280",
                    tokenId: "1400 tokens",
                  },
                  {
                    type: "ERC-721 NFT",
                    project: "Mangrove Conservation - Philippines",
                    amount: "2,800 tCO₂",
                    value: "$126,560",
                    tokenId: "#003",
                  },
                ].map((token, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-chart-1 to-chart-2 rounded-lg flex items-center justify-center">
                        <Coins className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{token.project}</div>
                        <div className="text-sm text-muted-foreground">
                          {token.type} • {token.tokenId} • {token.amount}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-accent">{token.value}</div>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View on Explorer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Tokenization History
              </CardTitle>
              <CardDescription>Complete record of carbon credit tokenization transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tokenHistory.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-chart-4/20 rounded-lg flex items-center justify-center">
                        <Coins className="w-5 h-5 text-chart-4" />
                      </div>
                      <div>
                        <div className="font-medium">{transaction.project}</div>
                        <div className="text-sm text-muted-foreground">
                          {transaction.amount} tCO₂ • {transaction.tokenType}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{transaction.date}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="text-xs bg-muted px-2 py-1 rounded">{transaction.hash.slice(0, 10)}...</code>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
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
