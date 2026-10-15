import { useEffect } from "react"
import Lenis from "lenis"

/** Rolagem suave global. Desativada quando o usuário prefere menos movimento. */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) })
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Links âncora rolam com Lenis, respeitando a altura do cabeçalho
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute("href")!
      const target = id === "#" ? null : document.querySelector<HTMLElement>(id)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -72 })
      history.replaceState(null, "", id)
    }
    document.addEventListener("click", onClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("click", onClick)
      lenis.destroy()
    }
  }, [])
}
