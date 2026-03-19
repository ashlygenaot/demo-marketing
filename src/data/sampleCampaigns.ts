import type { Campaign } from "@/types"

export const sampleCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Google Search - Spring Promo",
    platform: "Google",
    status: "active",
    startDate: new Date("2026-02-20").getTime(),
    impressions: 14200,
    clicks: 426,   // CTR 3.0%
    spend: 384,    // CPC ~$0.90
    conversions: 30, // CVR ~7%
    dailyClicks: [
      { date: "Mon", clicks: 72 },
      { date: "Tue", clicks: 88 },
      { date: "Wed", clicks: 95 },
      { date: "Thu", clicks: 84 },
      { date: "Fri", clicks: 87 },
    ], // sum = 426
  },
  {
    id: "2",
    name: "Facebook Local Promo",
    platform: "Facebook",
    status: "active",
    startDate: new Date("2026-02-18").getTime(),
    impressions: 18500,
    clicks: 370,   // CTR 2.0%
    spend: 296,    // CPC ~$0.80
    conversions: 22, // CVR ~6%
    dailyClicks: [
      { date: "Mon", clicks: 62 },
      { date: "Tue", clicks: 78 },
      { date: "Wed", clicks: 80 },
      { date: "Thu", clicks: 74 },
      { date: "Fri", clicks: 76 },
    ], // sum = 370
  },
  {
    id: "3",
    name: "Instagram Post Promo",
    platform: "Instagram",
    status: "active",
    startDate: new Date("2026-02-15").getTime(),
    impressions: 22000,
    clicks: 440,   // CTR 2.0%
    spend: 352,    // CPC ~$0.80
    conversions: 18, // CVR ~4%
    dailyClicks: [
      { date: "Mon", clicks: 80 },
      { date: "Tue", clicks: 92 },
      { date: "Wed", clicks: 88 },
      { date: "Thu", clicks: 94 },
      { date: "Fri", clicks: 86 },
    ], // sum = 440
  },
  {
    id: "4",
    name: "Facebook Brand Awareness",
    platform: "Facebook",
    status: "paused",
    startDate: new Date("2026-02-12").getTime(),
    impressions: 31000,
    clicks: 465,   // CTR 1.5%
    spend: 372,    // CPC ~$0.80
    conversions: 16, // CVR ~3.4%
    dailyClicks: [
      { date: "Mon", clicks: 88 },
      { date: "Tue", clicks: 96 },
      { date: "Wed", clicks: 90 },
      { date: "Thu", clicks: 100 },
      { date: "Fri", clicks: 91 },
    ], // sum = 465
  },
  {
    id: "5",
    name: "Google Search Promo 2",
    platform: "Google",
    status: "active",
    startDate: new Date("2026-02-10").getTime(),
    impressions: 16800,
    clicks: 504,   // CTR 3.0%
    spend: 453,    // CPC ~$0.90
    conversions: 35, // CVR ~6.9%
    dailyClicks: [
      { date: "Mon", clicks: 98 },
      { date: "Tue", clicks: 104 },
      { date: "Wed", clicks: 96 },
      { date: "Thu", clicks: 108 },
      { date: "Fri", clicks: 98 },
    ], // sum = 504
  },
]
 