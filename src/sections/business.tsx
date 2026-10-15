import { motion } from "motion/react"
import { ArrowRight, Check } from "lucide-react"
import { OrbitLines } from "@/components/brand/orbit-lines"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/ui/magnetic"
import { Reveal } from "@/components/ui/reveal"
import { Timeline } from "@/components/ui/timeline"
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal"
import { steps, support } from "@/data/site"

export function Business() {

  return (
    <section id="empresas" aria-labelledby="empresas-title" className="section-y relative isolate overflow-hidden bg-brand-900 text-sand-100">
      <OrbitLines variant="dark" />
      <div className="container-site">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow eyebrow-light">BAADV para empresas</p>
            </Reveal>
            <VerticalCutReveal
              inView
              id="empresas-title"
              className="mb-6 text-[clamp(2.1rem,4.2vw,3.4rem)] text-white"
              segments={[
                { text: "Muito mais do que um escritório: o " },
                { text: "jurídico", className: "font-medium italic text-caramel-400" },
                { text: " da sua empresa." },
              ]}
            />
            <Reveal delay={0.1}>
              <p className="max-w-[48ch] text-lg text-sand-100/75">
                Oferecemos acompanhamento jurídico contínuo para empresas que querem crescer com segurança, funcionando
                como o departamento jurídico do seu negócio.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="rounded-2xl border border-white/12 bg-white/[0.03] p-7 sm:p-10">
            <h3 className="mb-6 font-sans text-xs font-bold tracking-[0.2em] text-caramel-400 uppercase">
              Como apoiamos sua empresa
            </h3>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            >
              {support.map((s) => (
                <motion.li
                  key={s}
                  variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
                  className="flex items-start gap-3.5 border-b border-white/10 py-3.5 text-[0.975rem] last:border-0 last:pb-0"
                >
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-caramel-500/15 text-caramel-400">
                    <Check className="size-3.5" strokeWidth={2.4} aria-hidden="true" />
                  </span>
                  {s}
                </motion.li>
              ))}
            </motion.ul>
          </Reveal>
        </div>

        <div className="mt-[clamp(80px,10vw,128px)] border-t border-white/12 pt-[clamp(56px,7vw,80px)]">
          <Reveal>
            <h3 className="text-[clamp(1.9rem,3vw,2.6rem)] text-white">Como funciona a contratação</h3>
          </Reveal>
          <Timeline
            data={steps.map((step) => ({
              title: step.title,
              content: (
                <div className="max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                  <p className="text-[1.05rem] text-sand-100/85">{step.text}</p>
                  <ul className="mt-6 space-y-2.5">
                    {step.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-[0.95rem] text-sand-100/70">
                        <span className="size-1.5 shrink-0 rounded-full bg-caramel-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            }))}
          />
          <Reveal className="pl-20 md:pl-0">
            <Magnetic>
              <Button asChild variant="accent">
                <a href="#contato">
                  Solicitar diagnóstico <ArrowRight data-icon="arrow" />
                </a>
              </Button>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
