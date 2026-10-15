import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { VelocityMarquee } from "@/components/ui/velocity-marquee"
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal"
import { contact, posts } from "@/data/site"
import { cn, asset } from "@/lib/utils"

type Shot = { src: string; w: number; h: number; tag?: string; alt: string; square?: boolean }

const rowA: Shot[] = posts
const rowB: Shot[] = [
  { src: asset("/img/team.webp"), w: 1400, h: 933, alt: "Equipe da BAADV reunida em evento corporativo", square: true },
  ...[...posts].reverse().map((p) => ({ ...p, square: true })),
  { src: asset("/img/hero-office-900.webp"), w: 900, h: 509, alt: "Escritório da BAADV com o logo na parede", square: true },
]

function ShotCard({ shot }: { shot: Shot }) {
  return (
    <a
      href={contact.instagram}
      target="_blank"
      rel="noopener"
      className={cn(
        "group relative mr-4 block shrink-0 overflow-hidden rounded-xl bg-sand-200 shadow-sm",
        shot.square ? "aspect-square w-[clamp(170px,19vw,250px)]" : "aspect-[4/5] w-[clamp(200px,23vw,300px)]"
      )}
    >
      <img
        src={shot.src}
        alt={shot.alt}
        width={shot.w}
        height={shot.h}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="size-full object-cover object-[center_35%] transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-[1.06]"
      />
      <span className="absolute inset-0 bg-brand-950/0 transition-colors duration-300 group-hover:bg-brand-950/35" />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5 text-white">
        {shot.tag && (
          <span className="rounded-full border border-white/60 bg-brand-950/40 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.08em] uppercase backdrop-blur-sm">
            {shot.tag}
          </span>
        )}
        <span className="ml-auto grid size-9 translate-y-2 place-items-center rounded-full bg-white text-brand-900 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </span>
    </a>
  )
}

/** Conteúdos do Instagram em duas fileiras que correm em sentidos opostos. */
export function Content() {
  return (
    <section id="conteudos" aria-labelledby="conteudos-title" className="section-y overflow-hidden bg-sand-50">
      <div className="container-site">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow">Conteúdos jurídicos</p>
            </Reveal>
            <VerticalCutReveal
              inView
              id="conteudos-title"
              className="text-[clamp(2.1rem,4.2vw,3.4rem)]"
              segments={[{ text: "Informação prática para quem " }, { text: "decide.", className: "display-em" }]}
            />
          </div>
          <Reveal delay={0.15} className="grid gap-6 lg:justify-items-end lg:text-right">
            <p className="max-w-[46ch] text-ink-muted">
              Análises e orientações sobre Direito Empresarial, Tributário, Trabalhista e Planejamento Patrimonial,
              publicadas com frequência no nosso Instagram.
            </p>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener"
              className="group inline-flex min-h-[60px] items-center gap-3.5 justify-self-start rounded-full border border-line-strong bg-white py-2 pr-5 pl-2 text-left text-[0.8rem] leading-tight text-ink-muted transition-[border-color,box-shadow] hover:border-brand-600 hover:shadow-sm lg:justify-self-end"
            >
              <img src={asset("/img/insta/profile.webp")} alt="" width={44} height={44} className="size-11 rounded-full" />
              <span>
                <strong className="block text-[0.925rem] text-brand-900">{contact.instagramHandle}</strong>
                Seguir no Instagram
              </span>
              <ArrowUpRight className="size-4 text-brand-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>
      </div>

      <div className="grid gap-4" aria-label="Publicações do Instagram">
        <VelocityMarquee speed={0.35} direction={-1} skew={false}>
          {rowA.map((s) => (
            <ShotCard key={s.src} shot={s} />
          ))}
        </VelocityMarquee>
        <VelocityMarquee speed={0.35} direction={1} skew={false} trackClassName="items-center">
          {rowB.map((s) => (
            <ShotCard key={s.src} shot={s} />
          ))}
        </VelocityMarquee>
      </div>

      <div className="container-site mt-12 flex flex-wrap items-center justify-between gap-6">
        <p className="text-sm text-ink-muted">Passe o mouse para desacelerar · clique para abrir no Instagram</p>
        <Button asChild variant="outline">
          <a href={contact.blog} target="_blank" rel="noopener">
            Ver todos os artigos do blog <ArrowRight data-icon="arrow" />
          </a>
        </Button>
      </div>
    </section>
  )
}
