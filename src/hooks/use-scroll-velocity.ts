import { useEffect, useRef } from "react"

type Listener = (velocity: number) => void

/**
 * Velocidade de rolagem suavizada (px/ms), compartilhada por todas as faixas.
 * Um único loop rAF só roda enquanto há rolagem; quando para, a velocidade
 * decai até zero.
 */
const listeners = new Set<Listener>()
let velocity = 0
let lastY = 0
let lastT = 0
let raf = 0

function frame(now: number) {
  const y = window.scrollY
  const dt = Math.max(1, now - lastT)
  velocity += ((y - lastY) / dt - velocity) * 0.15
  lastY = y
  lastT = now
  listeners.forEach((l) => l(velocity))
  if (Math.abs(velocity) > 0.001) raf = requestAnimationFrame(frame)
  else {
    velocity = 0
    listeners.forEach((l) => l(0))
    raf = 0
  }
}

function kick() {
  if (!raf) {
    lastT = performance.now()
    raf = requestAnimationFrame(frame)
  }
}

export function useScrollVelocity(listener: Listener) {
  const ref = useRef(listener)
  ref.current = listener

  useEffect(() => {
    const l: Listener = (v) => ref.current(v)
    listeners.add(l)
    if (listeners.size === 1) {
      lastY = window.scrollY
      window.addEventListener("scroll", kick, { passive: true })
    }
    return () => {
      listeners.delete(l)
      if (listeners.size === 0) window.removeEventListener("scroll", kick)
    }
  }, [])
}
