import { useRef, type ComponentProps } from "react"
import { cn } from "@/lib/utils"

/** Cartão com brilho que segue o cursor (apenas mouse; toque não é afetado). */
export function SpotlightCard({ className, children, ...props }: ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== "mouse") return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--x", `${e.clientX - r.left}px`)
    el.style.setProperty("--y", `${e.clientY - r.top}px`)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn(
        "group/spot relative isolate overflow-hidden",
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-500",
        "before:bg-[radial-gradient(420px_circle_at_var(--x,50%)_var(--y,50%),rgba(177,151,129,0.2),transparent_60%)]",
        "hover:before:opacity-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
