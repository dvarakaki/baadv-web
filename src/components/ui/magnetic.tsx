import { motion, useReducedMotion, useSpring } from "motion/react"
import { useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Leve atração do elemento em direção ao cursor (no máximo 6px). */
export function Magnetic({
  children,
  strength = 0.18,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const x = useSpring(0, { stiffness: 220, damping: 18 })
  const y = useSpring(0, { stiffness: 220, damping: 18 })

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set(Math.max(-6, Math.min(6, (e.clientX - (r.left + r.width / 2)) * strength)))
    y.set(Math.max(-6, Math.min(6, (e.clientY - (r.top + r.height / 2)) * strength)))
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span ref={ref} onPointerMove={onMove} onPointerLeave={reset} style={{ x, y }} className={cn("inline-flex", className)}>
      {children}
    </motion.span>
  )
}
