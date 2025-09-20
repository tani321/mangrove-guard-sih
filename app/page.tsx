"use client"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Mangrove Guard - Blue Carbon Registry
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Smart India Hackathon 2024 Project
          </p>
          <p className="text-lg">
            Blockchain-based monitoring, reporting, and verification for carbon credits
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">MRV Dashboard</h3>
            <p className="text-sm text-muted-foreground">Monitor carbon data</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Tokenization</h3>
            <p className="text-sm text-muted-foreground">Convert to blockchain tokens</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Data Visualization</h3>
            <p className="text-sm text-muted-foreground">View analytics and reports</p>
          </div>
        </div>
      </div>
    </div>
  )
}
