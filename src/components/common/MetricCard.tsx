import { Card, CardContent, CardHeader } from "@/components/ui/card"

type Props = {
  title: string
  value: string
}

export function MetricCard({ title, value }: Props) {
  return (
    <Card className="metric-card border-0 bg-background-card shadow-none">
        <CardHeader className="pb-2">
        <p style={{ color: "#7c3aed" }} className="text-sm font-medium uppercase tracking-widest">
  {title}
</p>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
      </CardContent>
    </Card>
  )
}