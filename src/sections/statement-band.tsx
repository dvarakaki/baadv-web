import { Monogram } from "@/components/brand/logo"
import { VelocityMarquee } from "@/components/ui/velocity-marquee"
import { cn } from "@/lib/utils"

type Word = { text: string; style: "solid" | "italic" | "outline" }

const ROW_A: Word[] = [
  { text: "Segurança", style: "solid" },
  { text: "jurídica", style: "italic" },
  { text: "Estratégia", style: "outline" },
  { text: "Proteção", style: "solid" },
  { text: "patrimonial", style: "italic" },
  { text: "Prevenção", style: "outline" },
]
const ROW_B: Word[] = [
  { text: "Empresas", style: "outline" },
  { text: "que crescem", style: "italic" },
  { text: "com segurança", style: "solid" },
  { text: "Advocacia", style: "outline" },
  { text: "empresarial", style: "italic" },
  { text: "BAADV", style: "solid" },
]

function Row({ words, tone }: { words: Word[]; tone: "dark" | "light" }) {
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="flex items-center">
          <span
            className={cn(
              "px-[clamp(0.6rem,1.6vw,1.5rem)] font-display text-[clamp(3rem,8vw,7rem)] leading-[1] whitespace-nowrap",
              w.style === "solid" && "font-semibold uppercase tracking-[-0.01em]",
              w.style === "italic" && "font-medium text-caramel-700 italic",
              w.style === "outline" &&
                cn(
                  "font-semibold uppercase tracking-[-0.01em] text-transparent",
                  tone === "dark" ? "[-webkit-text-stroke:1.25px_var(--color-brand-800)]" : "[-webkit-text-stroke:1.25px_rgba(244,240,234,0.75)]"
                )
            )}
          >
            {w.text}
          </span>
          <Monogram className="size-[clamp(1.6rem,3.5vw,3rem)] text-caramel-500" />
        </span>
      ))}
    </>
  )
}

/** Duas faixas gigantes em sentidos opostos, que aceleram e inclinam com a rolagem. */
export function StatementBand() {
  return (
    <section aria-label="Segurança jurídica, estratégia e proteção patrimonial para empresas" className="overflow-hidden border-t border-line bg-sand-50 py-[clamp(48px,7vw,96px)] text-brand-900">
      <div aria-hidden="true" className="grid gap-[clamp(0.5rem,1.5vw,1.25rem)]">
        <VelocityMarquee speed={0.6} direction={-1}>
          <Row words={ROW_A} tone="dark" />
        </VelocityMarquee>
        <VelocityMarquee speed={0.6} direction={1}>
          <Row words={ROW_B} tone="dark" />
        </VelocityMarquee>
      </div>
    </section>
  )
}
