"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  Users,
  Activity,
  Lock,
  Eye,
  Download,
  Search,
  Filter,
} from "lucide-react"

interface PendingVerification {
  id: string
  project: string
  submitter: string
  submissionDate: string
  co2Amount: number
  area: string
  documents: number
  priority: "high" | "medium" | "low"
  status: "pending" | "under_review" | "approved" | "rejected"
}

const pendingVerifications: PendingVerification[] = [
  {
    id: "MRV-007",
    project: "Coral Reef Restoration - Maldives",
    submitter: "Ocean Conservation NGO",
    submissionDate: "2024-01-20",
    co2Amount: 1800,
    area: "750 ha",
    documents: 12,
    priority: "high",
    status: "pending",
  },
  {
    id: "MRV-008",
    project: "Wetland Protection - Louisiana",
    submitter: "Gulf Coast Foundation",
    submissionDate: "2024-01-18",
    co2Amount: 4200,
    area: "1,650 ha",
    documents: 15,
    priority: "medium",
    status: "under_review",
  },
  {
    id: "MRV-009",
    project: "Mangrove Expansion - Indonesia",
    submitter: "Tropical Forest Alliance",
    submissionDate: "2024-01-15",
    co2Amount: 6800,
    area: "2,800 ha",
    documents: 18,
    priority: "high",
    status: "pending",
  },
  {
    id: "MRV-010",
    project: "Seagrass Restoration - Mediterranean",
    submitter: "Marine Conservation Society",
    submissionDate: "2024-01-12",
    co2Amount: 2100,
    area: "890 ha",
    documents: 9,
    priority: "low",
    status: "under_review",
  },
]

const auditLogs = [
  {
    id: "LOG-001",
    action: "Verification Approved",
    project: "MRV-003",
    verifier: "Dr. Sarah Chen",
    timestamp: "2024-01-15 14:30:22",
    details: "Salt Marsh Protection project approved for 5,800 tCO₂ credits",
  },
  {
    id: "LOG-002",
    action: "Document Uploaded",
    project: "MRV-007",
    verifier: "System",
    timestamp: "2024-01-15 10:15:45",
    details: "Drone survey report uploaded by Ocean Conservation NGO",
  },
  {
    id: "LOG-003",
    action: "Verification Rejected",
    project: "MRV-006",
    verifier: "Dr. Michael Torres",
    timestamp: "2024-01-14 16:45:12",
    details: "Insufficient documentation for biomass calculations",
  },
  {
    id: "LOG-004",
    action: "Review Started",
    project: "MRV-008",
    verifier: "Dr. Emily Rodriguez",
    timestamp: "2024-01-14 09:20:33",
    details: "Wetland Protection project assigned for technical review",
  },
]

const blockchainProofs = [
  {
    hash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
    project: "MRV-003",
    action: "Verification Recorded",
    timestamp: "2024-01-15 14:30:45",
    gasUsed: "0.0023 ETH",
  },
  {
    hash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234",
    project: "MRV-001",
    action: "Token Minted",
    timestamp: "2024-01-12 11:15:22",
    gasUsed: "0.0045 ETH",
  },
  {
    hash: "0x3c4d5e6f7890abcdef1234567890abcdef123456",
    project: "MRV-002",
    action: "Data Hash Stored",
    timestamp: "2024-01-10 16:42:18",
    gasUsed: "0.0012 ETH",
  },
]

export function AdminPanel() {
  const [selectedVerification, setSelectedVerification] = useState<string>("")
  const [reviewDecision, setReviewDecision] = useState<string>("")
  const [reviewComments, setReviewComments] = useState<string>("")

  const handleReviewSubmit = () => {
    if (!selectedVerification || !reviewDecision) return
    // Handle review submission logic here
    console.log("Review submitted:", { selectedVerification, reviewDecision, reviewComments })
    // Reset form
    setSelectedVerification("")
    setReviewDecision("")
    setReviewComments("")
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "under_review":
        return "bg-blue-500"
      case "approved":
        return "bg-green-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return Clock
      case "under_review":
        return Eye
      case "approved":
        return CheckCircle
      case "rejected":
        return XCircle
      default:
        return Clock
    }
  }

  return (
    <div className="space-y-6">
      {/* Admin Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Awaiting verification</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Verifiers</CardTitle>
            <Users className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Certified reviewers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Approvals</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blockchain Txns</CardTitle>
            <Lock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Immutable records</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="verification" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="verification">Verification Queue</TabsTrigger>
          <TabsTrigger value="review">Review Projects</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain Proofs</TabsTrigger>
        </TabsList>

        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Verification Queue
              </CardTitle>
              <CardDescription>Projects awaiting MRV verification and approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingVerifications.map((verification) => {
                  const StatusIcon = getStatusIcon(verification.status)
                  return (
                    <div key={verification.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center gap-1">
                          <div className={`w-3 h-3 rounded-full ${getPriorityColor(verification.priority)}`} />
                          <span className="text-xs text-muted-foreground">{verification.priority}</span>
                        </div>
                        <div>
                          <div className="font-medium">{verification.project}</div>
                          <div className="text-sm text-muted-foreground">
                            {verification.id} • {verification.submitter} • {verification.submissionDate}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {verification.co2Amount} tCO₂ • {verification.area} • {verification.documents} docs
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <StatusIcon className="w-3 h-3" />
                          {verification.status.replace("_", " ")}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Review
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-2" />
                            Documents
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Review</CardTitle>
                <CardDescription>Approve or reject MRV submissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project">Select Project for Review</Label>
                  <Select value={selectedVerification} onValueChange={setSelectedVerification}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a project to review" />
                    </SelectTrigger>
                    <SelectContent>
                      {pendingVerifications
                        .filter((v) => v.status === "pending" || v.status === "under_review")
                        .map((verification) => (
                          <SelectItem key={verification.id} value={verification.id}>
                            {verification.project} - {verification.co2Amount} tCO₂
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="decision">Review Decision</Label>
                  <Select value={reviewDecision} onValueChange={setReviewDecision}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select decision" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approve">Approve Verification</SelectItem>
                      <SelectItem value="reject">Reject Submission</SelectItem>
                      <SelectItem value="request_info">Request Additional Information</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments">Review Comments</Label>
                  <Textarea
                    id="comments"
                    placeholder="Enter detailed review comments..."
                    value={reviewComments}
                    onChange={(e) => setReviewComments(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button
                  onClick={handleReviewSubmit}
                  disabled={!selectedVerification || !reviewDecision}
                  className="w-full"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Submit Review
                </Button>

                {reviewDecision === "approve" && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Approval will create an immutable blockchain record and enable tokenization.
                    </AlertDescription>
                  </Alert>
                )}

                {reviewDecision === "reject" && (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>
                      Rejection will notify the submitter and require resubmission with corrections.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Review Guidelines</CardTitle>
                <CardDescription>MRV verification criteria and standards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Documentation Requirements
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Baseline ecosystem assessment</li>
                      <li>• Restoration methodology documentation</li>
                      <li>• Monitoring data and measurements</li>
                      <li>• Third-party verification reports</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Technical Validation
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• CO₂ sequestration calculations</li>
                      <li>• Area coverage verification</li>
                      <li>• Biomass density measurements</li>
                      <li>• Long-term monitoring plan</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Common Issues
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Incomplete monitoring data</li>
                      <li>• Insufficient baseline documentation</li>
                      <li>• Questionable CO₂ calculations</li>
                      <li>• Missing third-party validation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                System Audit Logs
              </CardTitle>
              <CardDescription>Complete record of all verification activities and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter Logs
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline" size="sm" className="ml-auto bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Verifier</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.action}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{log.project}</TableCell>
                      <TableCell>{log.verifier}</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{log.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Blockchain Proofs
              </CardTitle>
              <CardDescription>Immutable records of all verification and tokenization events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {blockchainProofs.map((proof, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                        <Lock className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <div className="font-medium">{proof.action}</div>
                        <div className="text-sm text-muted-foreground">
                          {proof.project} • {proof.timestamp}
                        </div>
                        <code className="text-xs bg-muted px-2 py-1 rounded mt-1 inline-block">{proof.hash}</code>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{proof.gasUsed}</div>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        <Eye className="w-3 h-3 mr-1" />
                        View on Explorer
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
