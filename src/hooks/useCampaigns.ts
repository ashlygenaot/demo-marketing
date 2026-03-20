// src/hooks/useCampaigns.ts
import { useState, useEffect } from "react"
import { sampleCampaigns } from "@/data/sampleCampaigns"
import type { Campaign } from "@/types"

function getMergedCampaigns(): Campaign[] {
  const stored = localStorage.getItem("campaigns")
  if (!stored) return sampleCampaigns
  const parsed: Campaign[] = JSON.parse(stored)
  return [
    ...sampleCampaigns,
    ...parsed.filter(p => !sampleCampaigns.some(s => s.id === p.id))
  ]
}

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(getMergedCampaigns)

  useEffect(() => {
    // Handle changes from OTHER tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "campaigns") setCampaigns(getMergedCampaigns())
    }
    window.addEventListener("storage", handleStorage)

    // Handle changes in the SAME tab
    const handleCustom = () => setCampaigns(getMergedCampaigns())
    window.addEventListener("campaigns-updated", handleCustom)

    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("campaigns-updated", handleCustom)
    }
  }, [])

  return campaigns
}