export type CampaignStatus = "active" | "paused"

export interface DailyClick {
  date: string
  clicks: number
}

export interface Campaign {
  id: string
  name: string
  platform: string
  status: CampaignStatus
  startDate: number // timestamp
  impressions: number
  clicks: number
  spend: number
  dailyClicks: DailyClick[]
  conversions: number
}