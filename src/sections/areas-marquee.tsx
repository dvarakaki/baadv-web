import { Monogram } from "@/components/brand/logo"
import { VelocityMarquee } from "@/components/ui/velocity-marquee"
import { cn } from "@/lib/utils"

const items = [
  "Direito Societário",
  "Contratos Empresariais",
  "Planejamento Tributário",
  "Direito Trabalhista",
  "Holdings Familiares",
  "Planejamento Sucessório",
  "Contencioso Estratégico",
  "Governança Corporativa",
]

/** Letreiro de especialidades sob o hero: acelera com a rolagem. */
export function AreasMarquee() {
  return (
    <div className="border-y border-white/8 bg-brand-950 py-5 text-sand-100">
      <VelocityMarquee label="Especialidades" speed={0.7} className="[mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
        {items.map((item, i) => (
          <span key={item} className="flex items-center">
            <span
              className={cn(
                "px-7 font-display text-[clamp(1.5rem,2.6vw,2.2rem)] font-semibold whitespace-nowrap uppercase tracking-[0.04em]",
                i % 2 === 1 && "text-transparent [-webkit-text-stroke:1px_rgba(244,240,234,0.7)]"
              )}
            >
              {item}
            </span>
            <Monogram className="size-6 text-caramel-500" />
          </span>
        ))}
      </VelocityMarquee>
    </div>
  )
}
