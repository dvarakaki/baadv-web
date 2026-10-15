/**
 * Adaptado de “Services Stack” (21st.dev · @ivarunchaudhary).
 *
 * Mantido do original: painéis de altura total que se empilham ao rolar
 * (sticky), o cartão de baixo encolhe e esmaece quando o próximo desliza por
 * cima, títulos fixos à esquerda que trocam com a área ativa, fundo que muda
 * por painel e os “chips” de capacidades que acendem em sequência.
 *
 * Trocado para a BAADV: as cenas SVG genéricas viraram um selo orbital com o
 * ícone da área (o motivo de linhas do Instagram), as fotos de fundo viraram
 * gradientes da marca com granulação local, e o conteúdo vem de `areas`.
 */
import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { ArrowRight } from "lucide-react"
import type { Area } from "@/data/site"
import { cn } from "@/lib/utils"

const REDUCED = "(prefers-reduced-motion: reduce)"
const subscribeReduced = (cb: () => void) => {
  const m = window.matchMedia(REDUCED)
  m.addEventListener("change", cb)
  return () => m.removeEventListener("change", cb)
}
const useReducedMotionSync = () =>
  useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false)

/** Gradientes de fundo por área, todos dentro da paleta. */
const BACKDROPS = [
  "radial-gradient(900px 600px at 80% 20%, rgba(83,123,127,.45), transparent 60%), linear-gradient(180deg,#1c3133,#142526)",
  "radial-gradient(900px 600px at 20% 80%, rgba(177,151,129,.22), transparent 60%), linear-gradient(180deg,#1c3133,#142526)",
  "radial-gradient(900px 600px at 70% 70%, rgba(70,103,105,.55), transparent 60%), linear-gradient(180deg,#1c3133,#142526)",
  "radial-gradient(900px 600px at 30% 20%, rgba(157,179,177,.25), transparent 60%), linear-gradient(180deg,#1c3133,#142526)",
  "radial-gradient(900px 600px at 85% 85%, rgba(196,172,150,.22), transparent 60%), linear-gradient(180deg,#1c3133,#142526)",
  "radial-gradient(900px 600px at 15% 40%, rgba(83,123,127,.4), transparent 60%), linear-gradient(180deg,#1c3133,#142526)",
]

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")"

const panelClass =
  "mx-auto grid w-full max-w-[1280px] content-center items-center px-5 py-24 sm:px-8 lg:grid-cols-12 lg:px-10 lg:py-20"

export type ServicesStackProps = {
  areas: Area[]
  eyebrow?: string
  /** Link de contato para cada área (ex.: WhatsApp com mensagem pronta). */
  ctaHref: (area: Area) => string
  className?: string
}

export function ServicesStack({ areas, eyebrow = "Áreas de atuação", ctaHref, className }: ServicesStackProps) {
  const root = useRef<HTMLElement>(null)
  const cards = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)
  const reduced = useReducedMotionSync()

  useEffect(() => {
    const el = root.current
    if (!el) return
    const panels = Array.from(el.querySelectorAll<HTMLElement>("[data-panel]"))
    let raf = 0
    // Painel mais alto que a tela gruda pela base, para o cartão inteiro ficar alcançável.
    const fit = () => {
      const vh = window.innerHeight
      panels.forEach((panel) => {
        panel.style.top = `${Math.min(0, vh - panel.offsetHeight)}px`
      })
    }
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      let idx = 0
      panels.forEach((panel, i) => {
        if (panel.getBoundingClientRect().top <= vh * 0.5) idx = i
        const next = panels[i + 1]
        const card = cards.current[i]
        if (!card || reduced) return
        // Quanto o próximo painel já cobriu este (0..1)
        const covered = next ? Math.min(1, Math.max(0, 1 - next.getBoundingClientRect().top / vh)) : 0
        // Só começa a esmaecer quando o próximo já cobriu ~25% (mantém a leitura)
        card.style.opacity = String(Math.min(1, Math.max(0, 1 - (covered - 0.25) * 1.6)))
        card.style.transform = `scale(${1 - covered * 0.06}) translateY(${-covered * 40}px)`
      })
      setActive(idx)
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    const onResize = () => {
      fit()
      schedule()
    }
    fit()
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(raf)
    }
  }, [areas.length, reduced])

  return (
    <section ref={root} className={cn("relative isolate w-full text-ink", className)} aria-label={eyebrow}>
      {areas.map((area, i) => (
        <div key={area.id} data-panel className={cn(panelClass, reduced ? "relative py-10 lg:py-14" : "sticky top-0 min-h-svh")}>
          <div
            className="mx-auto w-full max-w-[38rem] lg:col-span-7 lg:col-start-6 lg:mx-0 lg:max-w-none"
            ref={(el) => {
              cards.current[i] = el
            }}
            style={{ transformOrigin: "top center", willChange: "transform, opacity" }}
          >
            <p className="mb-5 flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-caramel-400 uppercase lg:hidden">
              <span className="h-px w-8 bg-current" />
              {eyebrow} · {String(i + 1).padStart(2, "0")}
            </p>
            <AreaCard area={area} index={i} total={areas.length} href={ctaHref(area)} reduced={reduced} />
          </div>
        </div>
      ))}

      {/* Fundo fixo: títulos à esquerda + gradientes que trocam + granulação */}
      <div className="absolute inset-0 -z-10 overflow-clip" aria-hidden="true">
        <div className="sticky top-0 h-svh w-full overflow-hidden">
          {areas.map((a, i) => (
            <div
              key={a.id}
              className={cn("absolute inset-0 transition-opacity duration-1000", i !== active && "opacity-0")}
              style={{ background: BACKDROPS[i % BACKDROPS.length] }}
            />
          ))}
          <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />

          {/* Órbitas: giram um pouco a cada área */}
          <svg
            viewBox="0 0 800 800"
            className="absolute top-1/2 -left-[20%] h-[140svh] -translate-y-1/2 fill-none stroke-caramel-400/20 transition-transform duration-[1400ms] ease-(--ease-out-expo)"
            style={{ transform: `translateY(-50%) rotate(${active * 28}deg)` }}
          >
            <circle cx="400" cy="400" r="380" />
            <circle cx="400" cy="400" r="290" strokeDasharray="2 10" />
            <circle cx="780" cy="400" r="6" className="fill-caramel-500 stroke-none" />
          </svg>

          <div className="mx-auto hidden h-full w-full max-w-[1280px] grid-cols-12 px-10 lg:grid">
            <div className="col-span-5 flex h-full flex-col justify-center gap-8 pr-8">
              <p className="flex items-center gap-3.5 text-xs font-bold tracking-[0.2em] text-caramel-400 uppercase">
                <span className="h-px w-8 bg-current" />
                {eyebrow}
              </p>
              <div className="relative h-[3.4em] font-display text-[clamp(2.4rem,3.6vw,3.4rem)] leading-[1.08] font-semibold text-white">
                {areas.map((a, i) => (
                  <span
                    key={a.id}
                    className={cn(
                      "absolute inset-x-0 top-0 transition duration-500 ease-(--ease-out-expo)",
                      i !== active && (i < active ? "-translate-y-8 opacity-0" : "translate-y-8 opacity-0")
                    )}
                  >
                    {a.title}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <span className="font-display text-2xl font-semibold text-caramel-400 tabular-nums">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="relative h-px w-40 bg-white/15">
                  <span
                    className="absolute inset-y-0 left-0 bg-caramel-500 transition-[width] duration-700 ease-(--ease-out-expo)"
                    style={{ width: `${((active + 1) / areas.length) * 100}%` }}
                  />
                </span>
                <span className="font-display text-2xl font-semibold text-white/40 tabular-nums">
                  {String(areas.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AreaCard({
  area,
  index,
  total,
  href,
  reduced,
}: {
  area: Area
  index: number
  total: number
  href: string
  reduced: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [lit, setLit] = useState(-1)
  const Icon = area.icon

  // Os chips acendem em sequência enquanto o cartão está na tela (como no original).
  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    let timer = 0
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer)
      if (entry.isIntersecting) {
        setLit(0)
        timer = window.setInterval(() => setLit((n) => (n + 1) % area.capabilities.length), 1600)
      } else setLit(-1)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearInterval(timer)
    }
  }, [area.capabilities.length, reduced])

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl bg-gradient-to-b from-sand-100 to-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]"
    >
      {/* Selo orbital */}
      <div className="relative flex items-center justify-between gap-6 border-b border-line px-6 pt-6 pb-6 sm:px-10 sm:pt-8">
        <div className="relative grid size-24 shrink-0 place-items-center sm:size-28">
          <svg viewBox="0 0 120 120" className={cn("absolute inset-0 size-full fill-none", !reduced && "animate-spin-slow")} aria-hidden="true">
            <circle cx="60" cy="60" r="58" className="stroke-line-strong" strokeWidth="1" />
            <circle cx="60" cy="60" r="44" className="stroke-caramel-400/50" strokeWidth="1" strokeDasharray="2 6" />
            <circle cx="118" cy="60" r="4" className="fill-caramel-500" />
          </svg>
          <span className="grid size-14 place-items-center rounded-full bg-brand-700 text-white sm:size-16">
            <Icon className="size-6 sm:size-7" strokeWidth={1.5} aria-hidden="true" />
          </span>
        </div>
        <span className="font-display text-[clamp(3.5rem,8vw,5.5rem)] leading-none font-semibold text-brand-100 tabular-nums" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
          <span className="text-[0.4em] text-line-strong">/{String(total).padStart(2, "0")}</span>
        </span>
      </div>

      <div className="px-6 pt-7 pb-8 sm:px-10 sm:pt-9 sm:pb-10">
        <h3 className="text-[clamp(1.6rem,2.6vw,2.1rem)]">{area.title}</h3>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink">{area.text}</p>

        <div className="mt-6 rounded-r-md border-l-2 border-caramel-500 bg-sand-100 px-5 py-4">
          <p className="mb-1 text-[0.7rem] font-bold tracking-[0.18em] text-caramel-700 uppercase">O desafio</p>
          <p className="text-[0.95rem] leading-relaxed text-ink-muted">{area.challenge}</p>
        </div>

        <p
          id={`area-cap-${area.id}`}
          className="mt-7 text-[0.7rem] font-bold tracking-[0.18em] text-ink-muted uppercase"
        >
          Como atuamos
        </p>
        <ul className="mt-3 grid grid-cols-2 gap-2 text-[0.9rem] leading-tight" aria-labelledby={`area-cap-${area.id}`}>
          {area.capabilities.map((c, i) => (
            <li
              key={c}
              className={cn(
                "flex items-baseline gap-2 rounded-lg bg-brand-100/60 px-3 pt-2.5 pb-3 text-brand-900 transition-colors duration-500",
                "before:size-2 before:shrink-0 before:-translate-y-[10%] before:rounded-full before:bg-brand-600 before:transition-colors before:duration-500",
                i === lit && "bg-caramel-300/60 before:bg-caramel-700"
              )}
            >
              {c}
            </li>
          ))}
        </ul>

        <a
          href={href}
          target="_blank"
          rel="noopener"
          className="group mt-8 inline-flex min-h-11 items-center gap-2.5 border-b border-line-strong font-semibold text-brand-700 transition-[gap,border-color] duration-300 hover:gap-3.5 hover:border-brand-700"
        >
          Fale com um advogado sobre {area.short.toLowerCase()}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}

export default ServicesStack
