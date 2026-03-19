import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

type Props = {
  data: { date: string; conversions: number }[]
}

function useCssVar(variable: string) {
  const [value, setValue] = useState("")
  useEffect(() => {
    setValue(
      getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim()
    )
  }, [variable])
  return value
}
export function ConversionsLineChart({ data }: Props) {
  const accent  = useCssVar("--accent")
  const mutedFg = useCssVar("--muted-foreground")
  const border  = useCssVar("--border")
  const bgCard  = useCssVar("--background-card")
  const fg      = useCssVar("--foreground")

  const accentColor = accent  ? `rgb(${accent})`         : "#8b5cf6"
  const mutedColor  = mutedFg ? `rgb(${mutedFg})`        : "#a78bfa"
  const borderColor = border  ? `rgb(${border} / 0.15)`  : "rgba(139,92,246,0.15)"
  const cardBg      = bgCard  ? `rgb(${bgCard})`         : "#120e1e"
  const fgColor     = fg      ? `rgb(${fg})`             : "#ede9fe"

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
        <CartesianGrid stroke={borderColor} strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          stroke={mutedColor}
          tick={{ fill: mutedColor, fontSize: 12 }}
          axisLine={{ stroke: borderColor }}
          tickLine={false}
        />
        <YAxis
          stroke={mutedColor}
          tick={{ fill: mutedColor, fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: cardBg,
            border: `1px solid ${accentColor}33`,
            borderRadius: "8px",
            color: fgColor,
            fontSize: "13px",
          }}
          labelStyle={{ color: mutedColor, marginBottom: "4px" }}
          cursor={{ stroke: accentColor, strokeOpacity: 0.3, strokeWidth: 1 }}
        />
        <Line
          type="monotone"
          dataKey="conversions"
          stroke={mutedColor}
          strokeWidth={2.5}
          dot={{ r: 3, fill: mutedColor, strokeWidth: 0 }}
          activeDot={{ r: 5, fill: mutedColor, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}