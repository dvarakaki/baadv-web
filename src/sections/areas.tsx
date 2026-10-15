import { ServicesStack } from "@/components/ui/services-stack"
import { Reveal } from "@/components/ui/reveal"
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal"
import { areas, whatsappLink } from "@/data/site"

export function Areas() {
  return (
    <section id="atuacao" aria-labelledby="atuacao-title" className="bg-brand-900">
      <div className="container-site grid gap-6 pt-[clamp(88px,11vw,144px)] pb-4 text-sand-100 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow eyebrow-light">Áreas de atuação</p>
          </Reveal>
          <VerticalCutReveal
            inView
            id="atuacao-title"
            className="text-[clamp(2.1rem,4.2vw,3.4rem)] text-white"
            segments={[
              { text: "Soluções jurídicas completas para empresas que buscam " },
              { text: "segurança", className: "font-medium italic text-caramel-400" },
              { text: " e crescimento." },
            ]}
          />
        </div>
        <Reveal delay={0.15}>
          <p className="max-w-[46ch] text-sand-100/70 lg:justify-self-end">
            Role para percorrer as seis frentes em que atuamos: o desafio que encontramos nas empresas e como
            trabalhamos em cada uma.
          </p>
        </Reveal>
      </div>

      <ServicesStack
        areas={areas}
        ctaHref={(a) => whatsappLink(`Olá! Gostaria de falar com um advogado da BAADV sobre ${a.title}.`)}
      />
    </section>
  )
}
