import { Link, useLocation } from "react-router-dom"
import { ModeToggle } from "@/components/common/ModeToggle"
 
export function Navbar() {
  const location = useLocation()
 
  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Campaigns", path: "/campaigns" },
    { label: "Analytics", path: "/analytics/1" },
  ]
 
  return (
    <nav className="bg-background-card border-0 px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-sm bg-accent" />
        <span className="text-xl font-semibold text-foreground tracking-tight">
          Tracklytics
        </span>
      </div>
 
      {/* Nav links */}
      <div className="flex items-center gap-1">
        {navItems.map(item => {
          const active = location.pathname === item.path
          return (
            <Link key={item.path} to={item.path}>
              <span
                className={`text-sm px-3 py-1.5 rounded-md transition-colors font-medium ${
    active ? "nav-item-active" : "nav-item"
  }
                `}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
        <div className="ml-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
 