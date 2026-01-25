import { sampleCampaigns } from "@/data/sampleCampaigns"
import { MetricCard } from "@/components/common/MetricCard"
import { ClicksLineChart } from "@/components/charts/ClicksLineChart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/common/ModeToggle"

export default function Dashboard() {
  const activeCampaigns = sampleCampaigns.filter(
    c => c.status === "active"
  )

  const totalImpressions = activeCampaigns.reduce(
    (sum, c) => sum + c.impressions,
    0
  )

  const totalClicks = activeCampaigns.reduce(
    (sum, c) => sum + c.clicks,
    0
  )

  const totalSpend = activeCampaigns.reduce(
    (sum, c) => sum + c.spend,
    0
  )

  const avgCpc = (totalSpend / totalClicks).toFixed(2)

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Impressions" value={totalImpressions.toLocaleString()} />
        <MetricCard title="Clicks" value={totalClicks.toLocaleString()} />
        <MetricCard title="Spend" value={`$${totalSpend}`} />
        <MetricCard title="Avg CPC" value={`$${avgCpc}`} />
      </div>

      {/* Chart + Active Campaigns */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Clicks Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ClicksLineChart data={activeCampaigns[0].dailyClicks} />
          </CardContent>
        </Card>

        {/* Active Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeCampaigns.slice(0, 5).map(c => (
              <div
                key={c.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {c.platform}
                  </p>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
