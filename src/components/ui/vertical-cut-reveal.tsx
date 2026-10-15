import { motion, type Variants } from "motion/react"
import { Fragment } from "react"
import { cn } from "@/lib/utils"

export type Segment = { text: string; className?: string }

type VerticalCutRevealProps = {
  /** Texto em segmentos, para permitir trechos com estilo próprio (ex.: itálico). */
  segments: Segment[]
  className?: string
  delay?: number
  stagger?: number
  as?: "h1" | "h2" | "p"
  id?: string
  /** Revela quando entra na tela em vez de ao montar. */
  inView?: boolean
}

const word: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], opacity: { duration: 0.5 } } },
}

/**
 * Revela palavra por palavra com corte vertical (padrão “Vertical Cut Reveal”
 * do 21st.dev). Leitores de tela recebem a frase inteira via aria-label.
 */
export function VerticalCutReveal({
  segments,
  className,
  delay = 0,
  stagger = 0.06,
  as = "h2",
  id,
  inView = false,
}: VerticalCutRevealProps) {
  const Tag = motion[as]
  const full = segments.map((s) => s.text).join("")

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } }
    : { animate: "show" }

  return (
    <Tag id={id} className={className} aria-label={full} initial="hidden" variants={container} {...trigger}>
      {segments.map((seg, si) => (
        <Fragment key={si}>
          {seg.text.split(/(\s+)/).map((w, wi) =>
            w.trim() === "" ? (
              <Fragment key={wi}>{w}</Fragment>
            ) : (
              <span key={wi} aria-hidden="true" className="-mb-[0.14em] inline-flex overflow-hidden pb-[0.14em] align-bottom">
                <motion.span variants={word} className={cn("inline-block", seg.className)}>
                  {w}
                </motion.span>
              </span>
            )
          )}
        </Fragment>
      ))}
    </Tag>
  )
}
