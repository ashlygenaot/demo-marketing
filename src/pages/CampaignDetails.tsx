import { useState, useEffect } from "react"
import { sampleCampaigns } from "@/data/sampleCampaigns"
import type { Campaign } from "@/types"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { ClicksLineChart } from "@/components/charts/ClicksLineChart"
import { ConversionsLineChart } from "@/components/charts/ConversionsLineChart"

export default function CampaignDetails() {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(sampleCampaigns[0]?.id || "")
  const [campaign, setCampaign] = useState<Campaign | undefined>(sampleCampaigns[0])

  useEffect(() => {
    const found = sampleCampaigns.find(c => c.id === selectedCampaignId)
    setCampaign(found)
  }, [selectedCampaignId])

  if (!campaign) return <div className="p-6">Campaign not found</div>

  const { impressions, clicks, spend, dailyClicks, status, name, conversions } = campaign
  const cpc = clicks > 0 ? (spend / clicks).toFixed(2) : "0"
  const conversionRate = clicks > 0 ? ((conversions / clicks) * 100).toFixed(2) : "0"

  const dailyConversions = dailyClicks.map(dc => ({
    date: dc.date,
    conversions: Math.floor(dc.clicks * 0.1),
  }))

  return (
    <div className="pace-y-6 p-6">
      {/* Campaign Selector */}
      <Select value={selectedCampaignId} onValueChange={setSelectedCampaignId}>
        <SelectTrigger className="campaign-selector w-64 border-0 bg-background-card text-foreground focus:ring-ring z-50">
          <SelectValue placeholder="Select Campaign" />
        </SelectTrigger>
        <SelectContent className="campaign-selector bg-background-card border-0 shadow-lg shadow-accent/10 z-100">
          {sampleCampaigns.map(c => (
            <SelectItem
              key={c.id}
              value={c.id}
              className="text-foreground hover:bg-background-hover data-[highlighted]:bg-accent-subtle data-[highlighted]:text-accent transition-colors"
            >
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Campaign Info */}
      <Card className="border-border bg-background-card shadow-sm shadow-accent/10">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-foreground">{name}</CardTitle>
          <Badge
            variant={status === "active" ? "default" : "secondary"}
            className={
              status === "active"
                ? "bg-accent text-accent-foreground border-0"
                : "bg-accent-subtle text-muted border-0"
            }
          >
            {status}
          </Badge>
        </CardHeader>

        <CardContent className="text-sm font-medium uppercase tracking-widest metric-card grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard title="Impressions" value={impressions.toLocaleString()} />
          <MetricCard title="Clicks" value={clicks.toLocaleString()} />
          <MetricCard title="Spend" value={`$${spend.toFixed(2)}`} />
          <MetricCard title="CPC" value={`$${cpc}`} />
          <MetricCard title="Conversion Rate" value={`${conversionRate}%`}/>
          <MetricCard title="Conversions" value={conversions.toLocaleString()} />
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Clicks Chart */}
        <Card className="metric-card border-0 bg-background-card shadow-none">
  <CardHeader>
    <p style={{ color: "#7c3aed" }} className="text-sm font-medium uppercase tracking-widest">Daily Clicks Trend</p>
  </CardHeader>
  <CardContent>
    <ClicksLineChart data={dailyClicks} />
  </CardContent>
</Card>

<Card className="metric-card border-0 bg-background-card shadow-none">
  <CardHeader>
    <p style={{ color: "#7c3aed" }} className="text-sm font-medium uppercase tracking-widest">Daily Conversions Trend</p>
  </CardHeader>
  <CardContent>
    <ConversionsLineChart data={dailyConversions} />
  </CardContent>
</Card>
      </div>
    </div>
  )
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="p-4 border-border bg-background hover:bg-background-hover transition-colors shadow-none">
      <p className="text-muted-foreground text-sm">{title}</p>
      <p className="text-xl font-bold text-foreground">{value}</p>
    </Card>
  )
}