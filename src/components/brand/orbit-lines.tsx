import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Linhas orbitais finas com pontos — o motivo gráfico dos posts do
 * Instagram da BAADV. As linhas se desenham ao entrar na tela.
 */
export function OrbitLines({ className, variant = "hero" }: { className?: string; variant?: "hero" | "dark" }) {
  const reduced = useReducedMotion()
  const draw = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true },
          transition: { duration: 2.4, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 size-full fill-none", className)}
    >
      {variant === "hero" ? (
        <g className="stroke-caramel-400/30" strokeWidth={1}>
          <motion.circle cx={1140} cy={430} r={420} {...draw(0.2)} />
          <motion.circle cx={260} cy={1040} r={520} {...draw(0.5)} />
          <motion.path d="M980 -40 L1480 520" {...draw(0.8)} />
          <circle cx={742} cy={350} r={5} className="fill-caramel-500 stroke-none max-md:hidden" />
          <circle cx={1356} cy={790} r={5} className="fill-caramel-500 stroke-none max-md:hidden" />
        </g>
      ) : (
        <g className="stroke-caramel-400/15" strokeWidth={1}>
          <motion.circle cx={1320} cy={120} r={360} {...draw(0)} />
          <motion.circle cx={-40} cy={860} r={300} {...draw(0.3)} />
        </g>
      )}
    </svg>
  )
}
