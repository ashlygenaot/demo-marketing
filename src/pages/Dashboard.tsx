import { sampleCampaigns } from "@/data/sampleCampaigns"
import { MetricCard } from "@/components/common/MetricCard"
import { ClicksLineChart } from "@/components/charts/ClicksLineChart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
 
export default function Dashboard() {
  const activeCampaigns = sampleCampaigns.filter(c => c.status === "active")
 
  const totalImpressions = activeCampaigns.reduce((sum, c) => sum + c.impressions, 0)
  const totalClicks = activeCampaigns.reduce((sum, c) => sum + c.clicks, 0)
  const totalSpend = activeCampaigns.reduce((sum, c) => sum + c.spend, 0)
  const totalConversions = activeCampaigns.reduce((sum, c) => sum + c.conversions, 0)
  const avgCpc = totalClicks > 0 ? (totalSpend / totalClicks).toFixed(2) : "0"
  const convRate = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(1) : "0"
 
  return (
    <div className="space-y-8 p-6">
 
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Showing data from {activeCampaigns.length} active campaigns
        </p>
      </div>
 
      {/* Metrics */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Impressions" value={totalImpressions.toLocaleString()} />
        <MetricCard title="Clicks" value={totalClicks.toLocaleString()} />
        <MetricCard title="Total Spend" value={`$${totalSpend.toLocaleString()}`} />
        <MetricCard title="Avg CPC" value={`$${avgCpc}`} />
      </div>
 
      {/* Chart + Active Campaigns */}
      <div className="grid gap-4 lg:grid-cols-3">
 
        {/* Chart */}
        <Card className="metric-card lg:col-span-2 bg-background-card shadow-none">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <p style={{ color: "#7c3aed" }} className="text-sm font-medium uppercase tracking-widest">
Clicks Over Time
</p>
              <Badge className="badge-active">
                {activeCampaigns[0]?.name}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ClicksLineChart data={activeCampaigns[0].dailyClicks} />
          </CardContent>
        </Card>
 
        {/* Active Campaigns */}
        <Card className="metric-card bg-background-card shadow-none">
          <CardHeader className="pb-2">
           <p style={{ color: "#7c3aed" }} className="text-sm font-medium uppercase tracking-widest">
Active Campaigns
</p>
          </CardHeader>
          <CardContent className="space-y-1">
            {activeCampaigns.slice(0, 5).map(c => {
              const ctr = c.impressions > 0
                ? ((c.clicks / c.impressions) * 100).toFixed(1)
                : "0"
              return (
                <div
                  key={c.id}
                  className="flex items-center justify-between py-2 border-b border-accent/10 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {c.name}
                    </p>
                    <p style={{ color: "#7c3aed" }} className="text-xs">
                      {c.platform} . {ctr}% CTR
                    </p>
                  </div>
                 <Badge variant="active" className="badge-active">Active</Badge>
                </div>
              )
            })}
 
            {/* Summary row */}
            <div className="pt-3 mt-1 grid grid-cols-2 gap-2">
              <div className="bg-accent/8 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Conv. rate</p>
                <p className="text-base font-semibold text-foreground">{convRate}%</p>
              </div>
              <div className="bg-accent/8 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Conversions</p>
                <p className="text-base font-semibold text-foreground">
                  {totalConversions.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}