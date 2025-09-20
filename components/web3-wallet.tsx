"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Wallet,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle,
  Coins,
  Send,
  ArrowUpDown,
  TrendingUp,
} from "lucide-react"

interface WalletState {
  isConnected: boolean
  address: string | null
  balance: string | null
  chainId: number | null
  isLoading: boolean
  error: string | null
}

interface CarbonToken {
  id: string
  name: string
  symbol: string
  balance: number
  value: number
  projectId: string
  tokenType: "ERC-721" | "ERC-20"
}

interface Transaction {
  hash: string
  type: "mint" | "transfer" | "trade"
  amount: number
  from: string
  to: string
  timestamp: string
  status: "pending" | "confirmed" | "failed"
  gasUsed: string
}

// Mock data for demonstration
const mockCarbonTokens: CarbonToken[] = [
  {
    id: "1",
    name: "Mangrove Carbon Credits",
    symbol: "MCC",
    balance: 1250,
    value: 56500,
    projectId: "MRV-001",
    tokenType: "ERC-20",
  },
  {
    id: "2",
    name: "Salt Marsh NFT",
    symbol: "SMNFT",
    balance: 1,
    value: 262160,
    projectId: "MRV-003",
    tokenType: "ERC-721",
  },
  {
    id: "3",
    name: "Seagrass Credits",
    symbol: "SGC",
    balance: 890,
    value: 40180,
    projectId: "MRV-002",
    tokenType: "ERC-20",
  },
]

const mockTransactions: Transaction[] = [
  {
    hash: "0x1234567890abcdef1234567890abcdef12345678",
    type: "mint",
    amount: 1250,
    from: "0x0000000000000000000000000000000000000000",
    to: "0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4",
    timestamp: "2024-01-15T14:30:22Z",
    status: "confirmed",
    gasUsed: "0.0023 ETH",
  },
  {
    hash: "0x2345678901bcdef12345678901cdef123456789a",
    type: "transfer",
    amount: 500,
    from: "0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4",
    to: "0x8ba1f109551bD432803012645Hac136c22C4C4C4",
    timestamp: "2024-01-12T11:15:22Z",
    status: "confirmed",
    gasUsed: "0.0015 ETH",
  },
  {
    hash: "0x3456789012cdef123456789012def1234567890b",
    type: "trade",
    amount: 200,
    from: "0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4",
    to: "0x9cb2f210662eE543904013756Iad247d33D5D5D5",
    timestamp: "2024-01-10T16:42:18Z",
    status: "pending",
    gasUsed: "0.0018 ETH",
  },
]

export function Web3Wallet() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
    isLoading: false,
    error: null,
  })

  const [copied, setCopied] = useState(false)
  const [carbonTokens, setCarbonTokens] = useState<CarbonToken[]>(mockCarbonTokens)
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [transferAmount, setTransferAmount] = useState("")
  const [transferTo, setTransferTo] = useState("")
  const [selectedToken, setSelectedToken] = useState("")

  // Check if MetaMask is installed or use mock wallet
  const isMetaMaskInstalled = () => {
    return typeof window !== "undefined" && typeof window.ethereum !== "undefined"
  }

  // Mock wallet connection for demo purposes
  const connectMockWallet = async () => {
    setWallet((prev) => ({ ...prev, isLoading: true, error: null }))

    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setWallet({
      isConnected: true,
      address: "0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4",
      balance: "2.4567",
      chainId: 1,
      isLoading: false,
      error: null,
    })
  }

  // Connect to MetaMask or use mock wallet
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      // Use mock wallet for demo
      await connectMockWallet()
      return
    }

    setWallet((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length > 0) {
        const address = accounts[0]

        // Get balance
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        })

        // Get chain ID
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        })

        // Convert balance from wei to ETH
        const balanceInEth = (Number.parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4)

        setWallet({
          isConnected: true,
          address,
          balance: balanceInEth,
          chainId: Number.parseInt(chainId, 16),
          isLoading: false,
          error: null,
        })
      }
    } catch (error: any) {
      setWallet((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Failed to connect wallet",
      }))
    }
  }

  // Mock transfer function
  const handleTransfer = async () => {
    if (!transferAmount || !transferTo || !selectedToken) return

    const newTransaction: Transaction = {
      hash: `0x${Math.random().toString(16).substr(2, 40)}`,
      type: "transfer",
      amount: Number(transferAmount),
      from: wallet.address!,
      to: transferTo,
      timestamp: new Date().toISOString(),
      status: "pending",
      gasUsed: "0.0012 ETH",
    }

    setTransactions((prev) => [newTransaction, ...prev])

    // Simulate transaction confirmation
    setTimeout(() => {
      setTransactions((prev) =>
        prev.map((tx) => (tx.hash === newTransaction.hash ? { ...tx, status: "confirmed" as const } : tx)),
      )
    }, 3000)

    // Reset form
    setTransferAmount("")
    setTransferTo("")
    setSelectedToken("")
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: null,
      balance: null,
      chainId: null,
      isLoading: false,
      error: null,
    })
  }

  // Copy address to clipboard
  const copyAddress = async () => {
    if (wallet.address) {
      await navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Get network name
  const getNetworkName = (chainId: number) => {
    const networks: { [key: number]: string } = {
      1: "Ethereum Mainnet",
      5: "Goerli Testnet",
      11155111: "Sepolia Testnet",
      137: "Polygon Mainnet",
      80001: "Polygon Mumbai",
    }
    return networks[chainId] || `Chain ID: ${chainId}`
  }

  // Listen for account changes (only if MetaMask is available)
  useEffect(() => {
    if (isMetaMaskInstalled() && wallet.isConnected) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else if (accounts[0] !== wallet.address) {
          connectWallet()
        }
      }

      const handleChainChanged = () => {
        if (wallet.isConnected) {
          connectWallet()
        }
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [wallet.address, wallet.isConnected])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Web3 Wallet Connection
          </CardTitle>
          <CardDescription>Connect your wallet to manage and trade tokenized carbon credits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {wallet.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{wallet.error}</AlertDescription>
            </Alert>
          )}

          {!wallet.isConnected ? (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-sm font-medium">Wallet Disconnected</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Connect your wallet to access carbon credit trading features
                </p>
              </div>

              <div className="space-y-2">
                <Button onClick={connectWallet} disabled={wallet.isLoading} className="w-full">
                  {wallet.isLoading ? (
                    "Connecting..."
                  ) : (
                    <>
                      <Wallet className="w-4 h-4 mr-2" />
                      {isMetaMaskInstalled() ? "Connect MetaMask" : "Connect Demo Wallet"}
                    </>
                  )}
                </Button>

                {!isMetaMaskInstalled() && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      MetaMask not detected. Using demo wallet for testing.{" "}
                      <a
                        href="https://metamask.io/download/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:no-underline"
                      >
                        Download MetaMask
                        <ExternalLink className="w-3 h-3 inline ml-1" />
                      </a>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-chart-1/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-chart-1 rounded-full" />
                  <span className="text-sm font-medium">Wallet Connected</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Address:</span>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded">{formatAddress(wallet.address!)}</code>
                      <Button variant="ghost" size="sm" onClick={copyAddress} className="h-6 w-6 p-0">
                        {copied ? <CheckCircle className="w-3 h-3 text-chart-1" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Balance:</span>
                    <span className="text-sm font-medium">{wallet.balance} ETH</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Network:</span>
                    <Badge variant="outline">{getNetworkName(wallet.chainId!)}</Badge>
                  </div>
                </div>
              </div>

              <Button variant="outline" onClick={disconnectWallet} className="w-full bg-transparent">
                Disconnect Wallet
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {wallet.isConnected && (
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="transfer">Transfer</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="w-5 h-5" />
                  Carbon Credit Portfolio
                </CardTitle>
                <CardDescription>Your tokenized blue carbon credits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Total Tokens</div>
                    <div className="text-2xl font-bold">{carbonTokens.length}</div>
                    <div className="text-xs text-muted-foreground">Different projects</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Total CO₂ Credits</div>
                    <div className="text-2xl font-bold">
                      {carbonTokens.reduce((sum, token) => sum + token.balance, 0).toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">tCO₂ equivalent</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Portfolio Value</div>
                    <div className="text-2xl font-bold text-accent">
                      ${carbonTokens.reduce((sum, token) => sum + token.value, 0).toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Current market value</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {carbonTokens.map((token) => (
                    <div key={token.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-chart-1 to-chart-2 rounded-lg flex items-center justify-center">
                          <Coins className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{token.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {token.symbol} • {token.tokenType} • Project {token.projectId}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-accent">${token.value.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          {token.balance.toLocaleString()} {token.tokenType === "ERC-721" ? "NFT" : "tokens"}
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transfer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Transfer Carbon Credits
                </CardTitle>
                <CardDescription>Send your carbon credit tokens to another address</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="token">Select Token</Label>
                  <select
                    id="token"
                    value={selectedToken}
                    onChange={(e) => setSelectedToken(e.target.value)}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="">Choose a token to transfer</option>
                    {carbonTokens.map((token) => (
                      <option key={token.id} value={token.id}>
                        {token.name} ({token.balance} {token.symbol})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount to transfer"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to">Recipient Address</Label>
                  <Input
                    id="to"
                    placeholder="0x..."
                    value={transferTo}
                    onChange={(e) => setTransferTo(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleTransfer}
                  disabled={!selectedToken || !transferAmount || !transferTo}
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Transfer Tokens
                </Button>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    This is a demo transfer. In production, this would interact with smart contracts on the blockchain.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpDown className="w-5 h-5" />
                  Transaction History
                </CardTitle>
                <CardDescription>Your carbon credit transaction history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.hash} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            tx.type === "mint"
                              ? "bg-chart-1/20"
                              : tx.type === "transfer"
                                ? "bg-chart-2/20"
                                : "bg-chart-3/20"
                          }`}
                        >
                          {tx.type === "mint" ? (
                            <Coins className="w-5 h-5 text-chart-1" />
                          ) : tx.type === "transfer" ? (
                            <Send className="w-5 h-5 text-chart-2" />
                          ) : (
                            <TrendingUp className="w-5 h-5 text-chart-3" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium capitalize">
                            {tx.type} - {tx.amount} tokens
                          </div>
                          <div className="text-sm text-muted-foreground">
                            From: {formatAddress(tx.from)} → To: {formatAddress(tx.to)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(tx.timestamp).toLocaleString()} • Gas: {tx.gasUsed}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            tx.status === "confirmed"
                              ? "default"
                              : tx.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {tx.status}
                        </Badge>
                        <div className="flex items-center gap-2 mt-2">
                          <code className="text-xs bg-muted px-2 py-1 rounded">{tx.hash.slice(0, 10)}...</code>
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
      )}
    </div>
  )
}
