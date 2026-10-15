import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"

type MarqueeProps = {
  children: ReactNode
  className?: string
  /** Duração de uma volta completa, em segundos. */
  duration?: number
  reverse?: boolean
}

/**
 * Faixa infinita com bordas esmaecidas e pausa ao passar o mouse
 * (padrão “Marquee” do 21st.dev). A cópia duplicada fica oculta
 * para leitores de tela.
 */
export function Marquee({ children, className, duration = 40, reverse }: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div
        className={cn(
          "flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
