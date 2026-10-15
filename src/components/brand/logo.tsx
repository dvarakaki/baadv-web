import type { CSSProperties } from "react"
import { cn, asset } from "@/lib/utils"

const mask = (url: string) => ({ "--mask": `url("${url}")` }) as CSSProperties

/** Monograma do logo, colorido via `currentColor`. */
export function Monogram({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("logo-mask block", className)} style={mask(asset("/img/logo-monogram.png"))} />
}

/** Marca nominativa “BAADV”, colorida via `currentColor`. */
export function Wordmark({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("logo-mask block", className)} style={mask(asset("/img/logo-wordmark.png"))} />
}

/** Assinatura horizontal: monograma + BAADV + “Advocacia Empresarial”. */
export function LogoLockup({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Monogram className="h-[42px] w-10 text-caramel-500" />
      <span className="flex flex-col gap-1">
        <Wordmark
          className={cn("h-6 w-[92px] transition-colors duration-300", tone === "light" ? "text-sand-100" : "text-brand-800")}
        />
        <span
          className={cn(
            "text-[0.56rem] font-semibold tracking-[0.24em] whitespace-nowrap uppercase transition-colors duration-300",
            tone === "light" ? "text-sand-100/70" : "text-caramel-700"
          )}
        >
          Advocacia Empresarial
        </span>
      </span>
    </span>
  )
}
