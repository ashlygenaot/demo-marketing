export type Campaign = {
  id: string
  name: string
  platform: string
  impressions: number
  clicks: number
  spend: number
  status: "active" | "paused"
  dailyClicks: { date: string; clicks: number }[]
}

export const sampleCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Google Search - Promo",
    platform: "Google",
    impressions: 12000,
    clicks: 430,
    spend: 380,
    status: "active",
    dailyClicks: [
      { date: "Mon", clicks: 40 },
      { date: "Tue", clicks: 55 },
      { date: "Wed", clicks: 70 },
      { date: "Thu", clicks: 60 },
      { date: "Fri", clicks: 80 }
    ]
  },
  {
    id: "2",
    name: "Facebook Local Promo",
    platform: "Facebook",
    impressions: 9000,
    clicks: 310,
    spend: 220,
    status: "active",
    dailyClicks: [
      { date: "Mon", clicks: 30 },
      { date: "Tue", clicks: 45 },
      { date: "Wed", clicks: 50 },
      { date: "Thu", clicks: 65 },
      { date: "Fri", clicks: 70 }
    ]
  },
  {
    id: "3",
    name: "Post Promo",
    platform: "Instagram",
    impressions: 10000,
    clicks: 400,
    spend: 300,
    status: "active",
    dailyClicks: [
      { date: "Mon", clicks: 70 },
      { date: "Tue", clicks: 65 },
      { date: "Wed", clicks: 35 },
      { date: "Thu", clicks: 40 },
      { date: "Fri", clicks: 60 }
    ]
  },
{
    id: "4",
    name: "Facebook Local Promo",
    platform: "Facebook",
    impressions: 3000,
    clicks: 500,
    spend: 220,
    status: "active",
    dailyClicks: [
      { date: "Mon", clicks: 25 },
      { date: "Tue", clicks: 80 },
      { date: "Wed", clicks: 30 },
      { date: "Thu", clicks: 60 },
      { date: "Fri", clicks: 50 }
    ]
  },
  {
    id: "5",
    name: "Google Search - Promo",
    platform: "Google",
    impressions: 9000,
    clicks: 310,
    spend: 220,
    status: "active",
    dailyClicks: [
      { date: "Mon", clicks: 300 },
      { date: "Tue", clicks: 20 },
      { date: "Wed", clicks: 50 },
      { date: "Thu", clicks: 65 },
      { date: "Fri", clicks: 75 }
    ]
  }
]
