import { useReducedMotion } from "motion/react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; t: number }

/**
 * Partículas douradas que sobem devagar e cintilam (canvas). Para quando
 * sai da tela; desligado com “reduzir movimento”.
 */
export function GoldDust({ className, count = 46 }: { className?: string; count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || reduced) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const parts: P[] = []

    const spawn = (y?: number): P => ({
      x: Math.random() * w,
      y: y ?? h + Math.random() * 40,
      r: 0.6 + Math.random() * 1.8,
      vy: 0.12 + Math.random() * 0.35,
      vx: (Math.random() - 0.5) * 0.15,
      a: 0.25 + Math.random() * 0.55,
      t: Math.random() * Math.PI * 2,
    })
    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    for (let i = 0; i < count; i++) parts.push(spawn(Math.random() * h))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        p.y -= p.vy
        p.x += p.vx
        p.t += 0.03
        if (p.y < -10) Object.assign(p, spawn())
        const twinkle = 0.55 + 0.45 * Math.sin(p.t)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(214,196,178,${p.a * twinkle})`
        ctx.shadowColor = "rgba(196,172,150,0.8)"
        ctx.shadowBlur = 6
        ctx.fill()
      }
      raf = visible ? requestAnimationFrame(draw) : 0
    }
    raf = requestAnimationFrame(draw)

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(draw)
    })
    io.observe(canvas)
    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener("resize", resize)
    }
  }, [count, reduced])

  return <canvas ref={ref} aria-hidden="true" className={cn("pointer-events-none absolute inset-0 size-full", className)} />
}
