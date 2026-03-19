import { useState, useEffect } from "react"
import type { Campaign, CampaignStatus } from "@/types"
import { sampleCampaigns } from "@/data/sampleCampaigns"
 
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
 
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
 
import { Badge } from "@/components/ui/badge"
 
const STORAGE_KEY = "campaigns"
// Bump this version string whenever the Campaign type changes shape.
// A mismatch clears stale localStorage and reseeds from sampleCampaigns.
const STORAGE_VERSION = "v2"
const STORAGE_VERSION_KEY = "campaigns_version"
 
const emptyForm = {
  name: "",
  platform: "",
  startDate: "",
  spend: "" as number | "",
  conversions: "" as number | "",
  status: "active" as CampaignStatus,
}
 
function parseDateLocal(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number)
  return new Date(y, m - 1, d).getTime()
}
 
function isValidCampaign(c: unknown): c is Campaign {
  if (!c || typeof c !== "object") return false
  const campaign = c as Record<string, unknown>
  return (
    typeof campaign.id === "string" &&
    typeof campaign.name === "string" &&
    typeof campaign.platform === "string" &&
    (campaign.status === "active" || campaign.status === "paused") &&
    typeof campaign.startDate === "number" &&
    typeof campaign.impressions === "number" &&
    typeof campaign.clicks === "number" &&
    typeof campaign.spend === "number" &&
    typeof campaign.conversions === "number" &&
    Array.isArray(campaign.dailyClicks)
  )
}
 
function loadCampaigns(): Campaign[] {
  try {
    const version = localStorage.getItem(STORAGE_VERSION_KEY)
    if (version !== STORAGE_VERSION) {
      // Stale or missing version — wipe and reseed
      localStorage.removeItem(STORAGE_KEY)
      localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION)
      return sampleCampaigns
    }
 
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return sampleCampaigns
 
    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return sampleCampaigns
 
    // Validate every campaign has the expected shape
    const valid = parsed.filter(isValidCampaign)
    return valid.length > 0 ? valid : sampleCampaigns
  } catch {
    return sampleCampaigns
  }
}
 
export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(loadCampaigns)
  const [editing, setEditing] = useState<Campaign | null>(null)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState("")
 
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns))
      localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION)
    } catch {
      // Fail silently
    }
  }, [campaigns])
 
  const resetForm = () => {
    setForm(emptyForm)
    setEditing(null)
    setError("")
  }
 
  const handleSubmit = () => {
    if (!form.name.trim()) return setError("Name is required.")
    if (!form.platform.trim()) return setError("Platform is required.")
    if (!form.startDate) return setError("Start date is required.")
    if (form.spend === "" || Number(form.spend) < 0) return setError("Enter a valid spend amount.")
    if (form.conversions === "" || Number(form.conversions) < 0) return setError("Enter a valid conversions count.")
 
    setError("")
    const startDate = parseDateLocal(form.startDate)
    const spend = Number(form.spend)
    const conversions = Number(form.conversions)
 
    if (editing) {
      setCampaigns(prev =>
        prev.map(c =>
          c.id === editing.id
            ? { ...c, name: form.name, platform: form.platform, startDate, spend, conversions, status: form.status }
            : c
        )
      )
    } else {
      const newCampaign: Campaign = {
        id: Date.now().toString(),
        name: form.name,
        platform: form.platform,
        status: form.status,
        startDate,
        spend,
        conversions,
        impressions: 0,
        clicks: 0,
        dailyClicks: [],
      }
      setCampaigns(prev => [...prev, newCampaign])
    }
 
    setOpen(false)
    resetForm()
  }
 
  const handleEdit = (campaign: Campaign) => {
    setEditing(campaign)
    setError("")
    setForm({
      name: campaign.name,
      platform: campaign.platform,
      startDate: new Date(campaign.startDate).toISOString().split("T")[0],
      spend: campaign.spend,
      conversions: campaign.conversions,
      status: campaign.status,
    })
    setOpen(true)
  }
 
  const handleDelete = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id))
  }
 
  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Campaign Manager</CardTitle>
 
          <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) resetForm() }}>
            <DialogTrigger asChild>
              <Button className="table-btn" onClick={resetForm}>Add Campaign</Button>
            </DialogTrigger>
 
            <DialogContent className="dialog-content">
              <DialogHeader>
                <DialogTitle>{editing ? "Edit Campaign" : "New Campaign"}</DialogTitle>
              </DialogHeader>
 
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Google Search – Spring Promo"
                  />
                </div>
 
                <div>
                  <Label>Platform</Label>
                  <Input
                    value={form.platform}
                    onChange={e => setForm({ ...form, platform: e.target.value })}
                    placeholder="e.g. Google, Facebook, Instagram"
                  />
                </div>
 
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={form.startDate}
                    onChange={e => setForm({ ...form, startDate: e.target.value })}
                  />
                </div>
 
                <div>
                  <Label>Spend ($)</Label>
                  <Input
                    type="number"
                    min={0}
                    value={form.spend}
                    onChange={e => setForm({ ...form, spend: e.target.value === "" ? "" : Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
 
                <div>
                  <Label>Conversions</Label>
                  <Input
                    type="number"
                    min={0}
                    value={form.conversions}
                    onChange={e => setForm({ ...form, conversions: e.target.value === "" ? "" : Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
 
                <div>
                  <Label>Status</Label>
                  <Select
                    value={form.status}
                    onValueChange={value => setForm({ ...form, status: value as CampaignStatus })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
 
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
 
                <Button className="w-full" onClick={handleSubmit}>
                  {editing ? "Update Campaign" : "Create Campaign"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
 
        <CardContent>
          <Table className="table">
            <TableHeader>
              <TableRow>
                <TableHead className="text text-md font-medium uppercase tracking-widest">Name</TableHead>
                <TableHead className="text text-md font-medium uppercase tracking-widest">Platform</TableHead>
                <TableHead className="text text-md font-medium uppercase tracking-widest">Start Date</TableHead>
                <TableHead className="text text-md font-medium uppercase tracking-widest">Spend</TableHead>
                <TableHead className="text text-md font-medium uppercase tracking-widest">Conversions</TableHead>
                <TableHead className="text text-md font-medium uppercase tracking-widest">Status</TableHead>
                <TableHead className="text text-md font-medium uppercase tracking-widest text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
 
            <TableBody>
              {campaigns.map(c => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.platform}</TableCell>
                  <TableCell>
                    {new Date(c.startDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </TableCell>
                  <TableCell>${c.spend.toLocaleString()}</TableCell>
                  <TableCell>{c.conversions.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={c.status === "active" ? "default" : "secondary"}>
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" className='table-btn'onClick={() => handleEdit(c)}>
                      Edit
                    </Button>
 
                    <AlertDialog>
                  
                      <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="delete-btn">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="alert-dialog-content">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete "{c.name}"?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="table-btn">Cancel</AlertDialogCancel>
                          <AlertDialogAction className="delete-btn" onClick={() => handleDelete(c.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
 
              {campaigns.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No campaigns yet. Click "Add Campaign" to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
 