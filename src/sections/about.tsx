import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { ArrowRight } from "lucide-react"
import { useRef } from "react"
import { Monogram } from "@/components/brand/logo"
import { Reveal } from "@/components/ui/reveal"
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal"
import { asset } from "@/lib/utils"

const tags = ["Empresarial", "Societário", "Tributário", "Trabalhista", "Holdings", "Sucessório"]

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <section id="sobre" className="section-y bg-sand-100" aria-labelledby="sobre-title">
      <div className="container-site grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <figure ref={ref} className="relative">
          <div className="pointer-events-none absolute -top-4 right-4 bottom-4 -left-4 hidden rounded-2xl border border-line-strong sm:block" />
          {/* A foto se revela de baixo para cima e desliza levemente ao rolar */}
          <motion.div
            className="relative overflow-hidden rounded-2xl shadow-[0_10px_30px_-12px_rgba(20,37,38,0.18)]"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.picture className="block" style={reduced ? undefined : { y: imgY, scale: 1.18 }}>
              <source type="image/webp" srcSet={asset("/img/team.webp")} />
              <img
                src={asset("/img/team.jpg")}
                alt="Equipe da BAADV Advocacia Empresarial reunida em evento corporativo"
                width={1400}
                height={933}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.picture>
          </motion.div>
          <Reveal
            delay={0.5}
            className="relative mt-4 flex max-w-none items-center gap-3.5 rounded-xl bg-brand-900 p-5 text-[0.85rem] leading-normal text-sand-100/75 shadow-[0_30px_60px_-24px_rgba(20,37,38,0.5)] sm:absolute sm:-right-2 sm:-bottom-7 sm:mt-0 sm:max-w-[300px]"
          >
            <Monogram className="h-[42px] w-10 shrink-0 text-caramel-500" />
            <figcaption>
              <strong className="block text-[0.95rem] text-white">Equipe BAADV</strong>
              Visão completa e integrada do ambiente jurídico da sua empresa.
            </figcaption>
          </Reveal>
        </figure>

        <div>
          <Reveal>
            <p className="eyebrow">Sobre a BAADV</p>
          </Reveal>
          <VerticalCutReveal
            inView
            id="sobre-title"
            className="mb-7 text-[clamp(2.1rem,4.2vw,3.4rem)]"
            segments={[{ text: "Um escritório criado para quem " }, { text: "empreende.", className: "display-em" }]}
          />
          <Reveal delay={0.1} className="space-y-4 text-ink-muted">
            <p>
              A BAADV Advocacia Empresarial foi criada para atender empresários que buscam mais do que soluções jurídicas
              pontuais: eles precisam de um parceiro estratégico capaz de antecipar riscos, estruturar negócios e proteger
              patrimônios.
            </p>
            <p>
              Nossa atuação vai além do contencioso tradicional. Trabalhamos de forma consultiva e preventiva, apoiando
              gestores e empreendedores nas decisões que realmente importam para o crescimento sustentável da empresa.
            </p>
          </Reveal>
          <motion.ul
            aria-label="Especialidades"
            className="my-8 flex flex-wrap gap-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
          >
            {tags.map((t) => (
              <motion.li
                key={t}
                variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
                className="rounded-full border border-line-strong px-3.5 py-1.5 text-[0.8125rem] font-medium text-brand-800 transition-colors hover:border-brand-700 hover:bg-brand-700 hover:text-white"
              >
                {t}
              </motion.li>
            ))}
          </motion.ul>
          <Reveal delay={0.2}>
            <a
              href="#atuacao"
              className="inline-flex min-h-11 items-center gap-2.5 border-b border-line-strong font-semibold text-brand-700 transition-[gap,border-color] duration-300 hover:gap-3.5 hover:border-brand-700"
            >
              Conheça nossas áreas de atuação
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
