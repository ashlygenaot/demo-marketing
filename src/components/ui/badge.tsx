import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-accent/15 text-accent border-accent/20 [a&]:hover:bg-accent/25",
        secondary:
          "bg-accent/8 text-muted-foreground border-border/10 [a&]:hover:bg-accent/15",
        destructive:
          "bg-destructive text-white border-transparent [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/70",
        outline:
          "border-border/20 text-foreground [a&]:hover:bg-accent/10 [a&]:hover:text-accent",
        ghost:
          "border-transparent text-muted-foreground [a&]:hover:bg-accent/10 [a&]:hover:text-accent",
        active:
          "bg-accent/15 text-accent border-accent/20",
        paused:
          "bg-muted-foreground/10 text-muted-foreground border-border/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }