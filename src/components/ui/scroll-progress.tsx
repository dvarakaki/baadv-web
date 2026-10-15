import { motion, useScroll, useSpring } from "motion/react"
import { cn } from "@/lib/utils"

/** Barra de progresso de leitura com mola (padrão “Scroll Progress” do 21st.dev). */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className={cn("fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-caramel-500", className)}
    />
  )
}
