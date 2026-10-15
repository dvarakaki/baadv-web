/**
 * Adaptado de “Timeline” (21st.dev · Aceternity / @manuarora700).
 *
 * Mantido do original: títulos fixos (sticky) por etapa e o “feixe” que
 * cresce acompanhando a rolagem. Ajustes: cores da marca para fundo escuro,
 * altura medida com ResizeObserver (o original só media uma vez), marcador
 * que acende quando a etapa é alcançada e suporte a movimento reduzido.
 */
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

export type TimelineEntry = {
  title: string
  content: ReactNode
}

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const markers = useRef<(HTMLDivElement | null)[]>([])
  const [height, setHeight] = useState(0)
  const [reached, setReached] = useState(-1)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => setHeight(el.getBoundingClientRect().height))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 60%"],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.06], [0, 1])

  // Etapa alcançada = feixe passou pelo marcador
  useMotionValueEvent(heightTransform, "change", (h) => {
    const top = ref.current?.getBoundingClientRect().top ?? 0
    let idx = -1
    markers.current.forEach((m, i) => {
      if (m && m.getBoundingClientRect().top - top + 20 <= h) idx = i
    })
    setReached(idx)
  })

  return (
    <div ref={containerRef} className="w-full">
      <div ref={ref} className="relative pb-10">
        {data.map((item, index) => {
          const on = reduced || index <= reached
          return (
            <div key={item.title} className="flex justify-start pt-10 md:gap-10 md:pt-28 first:md:pt-10">
              <div className="sticky top-32 z-10 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-md">
                <div
                  ref={(el) => {
                    markers.current[index] = el
                  }}
                  className="absolute left-3 flex size-10 items-center justify-center rounded-full bg-brand-900"
                >
                  <div
                    className={cn(
                      "size-4 rounded-full border transition-[transform,background-color,border-color,box-shadow] duration-500",
                      on ? "scale-110 border-caramel-400 bg-caramel-500 shadow-[0_0_0_6px_rgba(177,151,129,0.18)]" : "border-white/25 bg-brand-800"
                    )}
                  />
                </div>
                <h3
                  className={cn(
                    "hidden font-display text-4xl leading-tight font-semibold transition-colors duration-500 md:block md:pl-20 lg:text-5xl",
                    on ? "text-white" : "text-white/35"
                  )}
                >
                  <span className="mb-2 block font-sans text-sm font-bold tracking-[0.2em] text-caramel-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </h3>
              </div>

              <div className="relative w-full pr-2 pl-20 md:pl-4">
                <h3 className="mb-4 block text-left font-display text-3xl font-semibold text-white md:hidden">
                  <span className="mb-1 block font-sans text-xs font-bold tracking-[0.2em] text-caramel-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </h3>
                {item.content}
              </div>
            </div>
          )
        })}

        <div
          aria-hidden="true"
          style={{ height: `${height}px` }}
          className="absolute top-0 left-8 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-white/15 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: reduced ? height : heightTransform, opacity: reduced ? 1 : opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-caramel-400 from-[0%] via-caramel-500 via-[10%] to-transparent"
          />
        </div>
      </div>
    </div>
  )
}
