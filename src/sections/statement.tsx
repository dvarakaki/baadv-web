import { motion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useRef } from "react"
import { Reveal } from "@/components/ui/reveal"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { pillars } from "@/data/site"

const TEXT =
  "Mais do que soluções pontuais: um parceiro estratégico capaz de antecipar riscos, estruturar negócios e proteger patrimônios."
const EMPHASIS = new Set(["antecipar", "riscos,"])

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  const em = EMPHASIS.has(children)
  return (
    <motion.span style={{ opacity }} className={em ? "font-medium text-caramel-700 italic" : undefined}>
      {children}
    </motion.span>
  )
}

/** Frase de posicionamento que “acende” palavra por palavra conforme a rolagem. */
export function Statement() {
  const ref = useRef<HTMLHeadingElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] })
  const words = TEXT.split(" ")

  return (
    <section className="section-y bg-sand-50" aria-labelledby="proposta-title">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow">Nossa proposta</p>
        </Reveal>
        <h2
          ref={ref}
          id="proposta-title"
          aria-label={TEXT}
          className="max-w-[24ch] text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.15] font-medium"
        >
          {words.map((w, i) => {
            const start = i / words.length
            return (
              <span key={i} aria-hidden="true">
                <Word progress={scrollYProgress} range={[start, start + 1 / words.length]}>
                  {w}
                </Word>{" "}
              </span>
            )
          })}
        </h2>

        <ul className="mt-[clamp(56px,8vw,96px)] grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.1} deal={[-6, 4, -3, 5][i]} className="h-full">
                <SpotlightCard className="h-full rounded-2xl border border-line bg-white/60 p-8 transition-[background-color,box-shadow,translate] duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_24px_48px_-28px_rgba(20,37,38,0.45)] lg:p-9">
                  <span className="mb-7 grid size-14 place-items-center rounded-full border border-line-strong text-brand-700 transition-[background-color,color,border-color,transform] duration-500 group-hover/spot:-rotate-6 group-hover/spot:border-brand-700 group-hover/spot:bg-brand-700 group-hover/spot:text-white">
                    <Icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mb-3 text-2xl lg:min-h-[2.4em]">{title}</h3>
                  <p className="text-[0.975rem] text-ink-muted">{text}</p>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
