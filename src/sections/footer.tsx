import { motion } from "motion/react"
import { Mail } from "lucide-react"
import { InstagramIcon, WhatsAppIcon } from "@/components/brand/icons"
import { Wordmark } from "@/components/brand/logo"
import { areas, contact, nav } from "@/data/site"
import { asset } from "@/lib/utils"

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-950 pt-[clamp(64px,8vw,96px)] pb-28 text-[0.925rem] md:pb-8 text-sand-100/70">
      <div className="container-site">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-14">
          <div>
            <img src={asset("/img/logo-full.png")} alt="BAADV Advocacia Empresarial" width={132} height={132} loading="lazy" className="mb-6 w-[132px]" />
            <p className="max-w-[32ch]">Advocacia empresarial estratégica para proteger e potencializar o seu negócio.</p>
            <div className="mt-6 flex gap-2">
              {[
                { href: contact.instagram, label: "Instagram da BAADV (@advocacia_baa)", icon: <InstagramIcon className="size-[18px]" /> },
                { href: `https://wa.me/${contact.whatsappNumber}`, label: "WhatsApp da BAADV", icon: <WhatsAppIcon className="size-[18px]" /> },
                { href: `mailto:${contact.email}`, label: "E-mail da BAADV", icon: <Mail className="size-[18px]" strokeWidth={1.6} /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener"
                  className="grid size-11 place-items-center rounded-full border border-white/12 text-sand-100 transition-colors hover:border-caramel-500 hover:bg-caramel-500 hover:text-brand-950"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="mb-5 font-sans text-[0.72rem] font-bold tracking-[0.2em] text-caramel-400 uppercase">Navegação</h2>
            <ul className="grid gap-1">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="inline-block py-1.5 transition-colors hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-5 font-sans text-[0.72rem] font-bold tracking-[0.2em] text-caramel-400 uppercase">Áreas</h2>
            <ul className="grid gap-1">
              {areas.map((a) => (
                <li key={a.id} className="py-1.5">{a.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-5 font-sans text-[0.72rem] font-bold tracking-[0.2em] text-caramel-400 uppercase">Contato</h2>
            <ul className="grid gap-1 [&_a]:transition-colors [&_a:hover]:text-white">
              <li className="py-1.5"><a href={contact.phoneHref}>{contact.phone}</a></li>
              <li className="py-1.5"><a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noopener">{contact.whatsapp} · WhatsApp</a></li>
              <li className="py-1.5"><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li className="py-1.5">{contact.addressLine1}<br />Santo Amaro, São Paulo – SP</li>
            </ul>
          </div>
        </div>

        {/* Marca grande que sobe ao entrar na tela */}
        <motion.div
          aria-hidden="true"
          className="mt-16 overflow-hidden"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Wordmark className="aspect-[1900/490] w-full text-white/[0.05]" />
        </motion.div>

        <div className="mt-8 grid gap-4 border-t border-white/12 pt-7 text-[0.8125rem] leading-relaxed lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
          <p className="max-w-[90ch]">
            <strong className="font-semibold text-sand-100">Aviso legal:</strong> as informações disponibilizadas neste site
            possuem caráter meramente informativo e não constituem consultoria jurídica individualizada. Para orientações
            específicas sobre o seu caso, entre em contato com nossa equipe.
          </p>
          <p>© {new Date().getFullYear()} BAADV Advocacia Empresarial. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
