import { useReducedMotion } from "motion/react"
import { useEffect, useRef, type ReactNode } from "react"
import { useScrollVelocity } from "@/hooks/use-scroll-velocity"
import { cn } from "@/lib/utils"

type VelocityMarqueeProps = {
  children: ReactNode
  /** px por quadro (60fps) em repouso. */
  speed?: number
  /** -1 = para a esquerda, 1 = para a direita. */
  direction?: -1 | 1
  /** Inclina o texto conforme a velocidade da rolagem. */
  skew?: boolean
  className?: string
  trackClassName?: string
  label?: string
}

/**
 * Faixa contínua que anda sozinha, acelera e inclina com a velocidade da
 * rolagem e desacelera ao passar o mouse. Com “reduzir movimento”, anda
 * devagar e sem inclinar.
 */
export function VelocityMarquee({
  children,
  speed = 0.6,
  direction = -1,
  skew = true,
  className,
  trackClassName,
  label,
}: VelocityMarqueeProps) {
  const box = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const state = useRef({ x: 0, boost: 0, skew: 0, hover: false, visible: true, raf: 0, last: 0 })

  useScrollVelocity((v) => {
    if (reduced) return
    state.current.boost = Math.min(Math.abs(v) * 6, 14)
    state.current.skew = skew ? Math.max(-6, Math.min(6, -v * 3)) : 0
  })

  useEffect(() => {
    const el = track.current
    const wrap = box.current
    if (!el || !wrap) return
    const s = state.current
    if (direction > 0) s.x = -el.scrollWidth / 2

    const tick = (now: number) => {
      const dt = s.last ? Math.min(64, now - s.last) : 16.7
      s.last = now
      const half = el.scrollWidth / 2
      const base = (s.hover ? speed * 0.15 : speed) * (reduced ? 0.5 : 1)
      s.x += direction * (base + s.boost) * (dt / 16.7)
      if (s.x <= -half) s.x += half
      if (s.x > 0) s.x -= half
      el.style.transform = `translate3d(${s.x}px,0,0) skewX(${s.skew}deg)`
      // a inclinação volta suave quando a rolagem para
      s.skew *= 0.9
      s.boost *= 0.94
      s.raf = s.visible ? requestAnimationFrame(tick) : 0
    }

    const io = new IntersectionObserver(([e]) => {
      s.visible = e.isIntersecting
      if (s.visible && !s.raf) {
        s.last = 0
        s.raf = requestAnimationFrame(tick)
      }
    })
    io.observe(wrap)
    // Começa a andar já; o observer só pausa quando sai da tela
    if (!s.raf) s.raf = requestAnimationFrame(tick)
    const enter = () => (s.hover = true)
    const leave = () => (s.hover = false)
    wrap.addEventListener("pointerenter", enter)
    wrap.addEventListener("pointerleave", leave)
    wrap.addEventListener("focusin", enter)
    wrap.addEventListener("focusout", leave)
    return () => {
      io.disconnect()
      cancelAnimationFrame(s.raf)
      s.raf = 0
      wrap.removeEventListener("pointerenter", enter)
      wrap.removeEventListener("pointerleave", leave)
      wrap.removeEventListener("focusin", enter)
      wrap.removeEventListener("focusout", leave)
    }
  }, [direction, speed, reduced])

  return (
    <div ref={box} className={cn("relative overflow-hidden", className)} role={label ? "region" : undefined} aria-label={label}>
      <div ref={track} className={cn("flex w-max items-center will-change-transform", trackClassName)}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true" inert>
          {children}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true" inert>
          {children}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  )
}
