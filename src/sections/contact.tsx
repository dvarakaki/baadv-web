import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react"
import { useRef, useState, type ReactNode } from "react"
import { WhatsAppIcon } from "@/components/brand/icons"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal"
import { areas, contact } from "@/data/site"
import { cn } from "@/lib/utils"

type Field = "nome" | "email" | "telefone" | "mensagem"
type Errors = Partial<Record<Field, string>>

const rules: Record<Field, (v: string) => string> = {
  nome: (v) => (v.trim().length >= 3 ? "" : "Informe seu nome completo."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Informe um e-mail válido, como nome@empresa.com.br."),
  telefone: (v) => {
    const d = v.replace(/\D/g, "")
    return d === "" || d.length >= 10 ? "" : "Informe o telefone com DDD, como (11) 90000-0000."
  },
  mensagem: (v) => (v.trim().length >= 10 ? "" : "Descreva brevemente a sua demanda (mínimo de 10 caracteres)."),
}

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11)
  if (d.length > 6) return `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`
  if (d.length > 2) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return d
}

const inputClass =
  "w-full min-h-[52px] rounded-md border border-line-strong bg-sand-50 px-4 py-3 text-base text-ink transition-[border-color,box-shadow,background-color] placeholder:text-[#6f7b7c] hover:border-brand-500 focus:border-brand-600 focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-600 aria-invalid:border-destructive aria-invalid:bg-[#fdf6f5]"

function FormField({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-brand-900">
        {label} {required && <span className="text-destructive" aria-hidden="true">*</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-err`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[0.8125rem] font-medium text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")

  const validate = (name: Field, value: string) => {
    const msg = rules[name](value)
    setErrors((e) => ({ ...e, [name]: msg || undefined }))
    return !msg
  }

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as Field
    if (rules[name] && (e.target.value || errors[name])) validate(name, e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    const next: Errors = {}
    ;(Object.keys(rules) as Field[]).forEach((k) => {
      const msg = rules[k](data[k] ?? "")
      if (msg) next[k] = msg
    })
    setErrors(next)
    const first = Object.keys(next)[0]
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    // Sem backend configurado: prepara o e-mail no aplicativo do visitante.
    const subject = `Contato pelo site${data.assunto ? ` – ${data.assunto}` : ""}`
    const body = [
      `Nome: ${data.nome}`,
      data.empresa ? `Empresa: ${data.empresa}` : null,
      `E-mail: ${data.email}`,
      data.telefone ? `Telefone: ${data.telefone}` : null,
      data.assunto ? `Assunto: ${data.assunto}` : null,
      "",
      data.mensagem,
    ]
      .filter((l) => l !== null)
      .join("\n")
    setStatus("sending")
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.setTimeout(() => setStatus("sent"), 900)
  }

  const errCount = Object.values(errors).filter(Boolean).length

  return (
    <section id="contato" aria-labelledby="contato-title" className="section-y bg-sand-100">
      <div className="container-site">
        <div className="mb-14 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow">Contato</p>
            </Reveal>
            <VerticalCutReveal
              inView
              id="contato-title"
              className="text-[clamp(2.1rem,4.2vw,3.4rem)]"
              segments={[{ text: "Conte-nos sobre a sua " }, { text: "demanda.", className: "display-em" }]}
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[46ch] text-ink-muted lg:justify-self-end">
              Descubra como a BAADV pode apoiar o seu negócio. Nossa equipe retornará o contato o quanto antes.
            </p>
          </Reveal>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
          <Reveal>
            <form
              ref={formRef}
              noValidate
              onSubmit={onSubmit}
              className="grid gap-5 rounded-2xl border border-line bg-white p-6 shadow-[0_10px_30px_-12px_rgba(20,37,38,0.18)] sm:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField id="f-nome" label="Nome" required error={errors.nome}>
                  <input id="f-nome" name="nome" autoComplete="name" required onBlur={onBlur} aria-invalid={!!errors.nome} aria-describedby={errors.nome ? "f-nome-err" : undefined} className={inputClass} />
                </FormField>
                <FormField id="f-empresa" label="Empresa">
                  <input id="f-empresa" name="empresa" autoComplete="organization" className={inputClass} />
                </FormField>
                <FormField id="f-email" label="E-mail" required error={errors.email}>
                  <input id="f-email" name="email" type="email" inputMode="email" autoComplete="email" required onBlur={onBlur} aria-invalid={!!errors.email} aria-describedby={errors.email ? "f-email-err" : undefined} className={inputClass} />
                </FormField>
                <FormField id="f-tel" label="Telefone" error={errors.telefone}>
                  <input
                    id="f-tel"
                    name="telefone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(11) 90000-0000"
                    value={phone}
                    onChange={(e) => setPhone(maskPhone(e.target.value))}
                    onBlur={onBlur}
                    aria-invalid={!!errors.telefone}
                    aria-describedby={errors.telefone ? "f-tel-err" : undefined}
                    className={inputClass}
                  />
                </FormField>
              </div>
              <FormField id="f-assunto" label="Assunto">
                <div className="relative">
                  <select id="f-assunto" name="assunto" defaultValue="" className={cn(inputClass, "cursor-pointer appearance-none pr-11")}>
                    <option value="">Selecione uma área</option>
                    {areas.map((a) => (
                      <option key={a.id}>{a.title}</option>
                    ))}
                    <option>Assessoria jurídica recorrente</option>
                    <option>Outro assunto</option>
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-5 -mt-1.5 size-2 rotate-45 border-r-[1.6px] border-b-[1.6px] border-brand-700" />
                </div>
              </FormField>
              <FormField id="f-msg" label="Mensagem" required error={errors.mensagem}>
                <textarea id="f-msg" name="mensagem" rows={5} required onBlur={onBlur} placeholder="Descreva brevemente a situação da sua empresa" aria-invalid={!!errors.mensagem} aria-describedby={errors.mensagem ? "f-msg-err" : undefined} className={cn(inputClass, "min-h-36 resize-y leading-relaxed")} />
              </FormField>

              <div className="mt-1 grid items-center gap-5 sm:grid-cols-[1fr_auto]">
                <p className="text-[0.8125rem] leading-normal text-ink-muted">
                  <span className="text-destructive">*</span> Campos obrigatórios. Seus dados são usados apenas para
                  retornarmos o contato.
                </p>
                <Button type="submit" variant="primary" disabled={status === "sending"}>
                  {status === "sending" ? "Abrindo seu e-mail…" : "Enviar mensagem"}
                  <ArrowRight data-icon="arrow" />
                </Button>
              </div>

              <div role="status" aria-live="polite">
                <AnimatePresence mode="wait">
                  {errCount > 0 && (
                    <motion.p key="err" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-md border border-[#efcdca] bg-[#fbeceb] px-4 py-3 text-[0.925rem] text-destructive">
                      {errCount === 1 ? "Revise o campo destacado para continuar." : `Revise os ${errCount} campos destacados para continuar.`}
                    </motion.p>
                  )}
                  {status === "sent" && errCount === 0 && (
                    <motion.p key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-2.5 rounded-md border border-[#c4ddcf] bg-[#eaf3ee] px-4 py-3 text-[0.925rem] text-[#2f6b4f]">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                      Sua mensagem foi preparada no seu aplicativo de e-mail. Se preferir, fale conosco pelo WhatsApp {contact.whatsapp}.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.12} className="grid gap-6">
            <ul className="grid rounded-2xl bg-brand-900 p-6 text-[0.95rem] leading-relaxed text-sand-100/75 sm:p-9" aria-label="Informações de contato">
              {[
                { icon: Phone, label: "Telefone", body: <a href={contact.phoneHref}>{contact.phone}</a> },
                {
                  icon: WhatsAppIcon,
                  label: "WhatsApp",
                  body: (
                    <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noopener">
                      {contact.whatsapp}
                    </a>
                  ),
                },
                { icon: Mail, label: "E-mail", body: <a href={`mailto:${contact.email}`}>{contact.email}</a> },
                { icon: MapPin, label: "Endereço", body: <>{contact.addressLine1}<br />{contact.addressLine2}</> },
                { icon: Clock, label: "Horário de atendimento", body: <>{contact.hours[0]}<br />{contact.hours[1]}</> },
              ].map(({ icon: Icon, label, body }) => (
                <li key={label} className="flex gap-4 border-b border-white/10 py-4 first:pt-0 last:border-0 last:pb-0">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-caramel-400/40 text-caramel-400">
                    <Icon className="size-[18px]" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="[&_a]:font-medium [&_a]:text-white [&_a]:transition-colors [&_a:hover]:text-caramel-400">
                    <span className="mb-0.5 block text-[0.7rem] font-bold tracking-[0.16em] text-caramel-400 uppercase">{label}</span>
                    {body}
                  </span>
                </li>
              ))}
            </ul>
            <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-sand-200">
              <iframe
                title="Mapa: BAADV na Av. das Nações Unidas, 18801, São Paulo"
                src={contact.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full border-0 grayscale-[0.4]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
