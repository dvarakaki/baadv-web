import { motion, type HTMLMotionProps } from "motion/react"

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number
  y?: number
  /** Entrada “distribuída”, como uma carta sendo posta na mesa. */
  deal?: number
}

/**
 * Entrada suave ao rolar (opacidade + deslocamento). Com “reduzir
 * movimento”, o MotionConfig mantém só o fade.
 */
export function Reveal({ delay = 0, y = 28, deal, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={deal !== undefined ? { opacity: 0, y: 60, rotate: deal, scale: 0.92 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: deal !== undefined ? 0.9 : 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
