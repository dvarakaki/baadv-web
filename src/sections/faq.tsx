import { Accordion as AccordionPrimitive } from "radix-ui"
import { Plus } from "lucide-react"
import { WhatsAppIcon } from "@/components/brand/icons"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal"
import { faq, whatsappLink } from "@/data/site"

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y bg-sand-50">
      <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="eyebrow">Perguntas frequentes</p>
          </Reveal>
          <VerticalCutReveal
            inView
            id="faq-title"
            className="mb-5 text-[clamp(2.1rem,4.2vw,3.4rem)]"
            segments={[{ text: "Dúvidas sobre a " }, { text: "atuação", className: "display-em" }, { text: " da BAADV." }]}
          />
          <Reveal delay={0.1}>
            <p className="mb-8 max-w-[40ch] text-ink-muted">
              Não encontrou o que procurava? Nossa equipe responde pelo WhatsApp em horário comercial.
            </p>
            <Button asChild variant="primary">
              <a href={whatsappLink("Olá! Tenho uma dúvida sobre a atuação da BAADV.")} target="_blank" rel="noopener">
                <WhatsAppIcon /> Falar pelo WhatsApp
              </a>
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          {/* Accordion do shadcn/ui (Radix), estilizado com a marca */}
          <AccordionPrimitive.Root type="single" collapsible defaultValue="item-0" className="border-t border-line">
            {faq.map((item, i) => (
              <AccordionPrimitive.Item key={item.q} value={`item-${i}`} className="border-b border-line">
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger className="group flex min-h-[76px] w-full items-center justify-between gap-6 py-5 text-left font-display text-[clamp(1.25rem,2vw,1.55rem)] leading-tight font-semibold text-brand-900 transition-colors hover:text-brand-600">
                    {item.q}
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-brand-700 transition-[transform,background-color,color,border-color] duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:border-brand-700 group-data-[state=open]:bg-brand-700 group-data-[state=open]:text-white">
                      <Plus className="size-4" aria-hidden="true" />
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="pr-0 pb-7 text-ink-muted sm:pr-16">{item.a}</p>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </Reveal>
      </div>
    </section>
  )
}
