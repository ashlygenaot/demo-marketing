import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "@/pages/Dashboard"
import Campaigns from "@/pages/Campaigns"
import CampaignDetails from "@/pages/CampaignDetails"
import { Navbar } from "@/components/navigation/Navbar"

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar visible on all pages */}
      <Navbar />

      {/* Main content */}
      <div className="mt-4 min-h-screen bg-background text-foreground p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/analytics/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}