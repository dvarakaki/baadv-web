import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react"
import { ArrowUp, Phone } from "lucide-react"
import { useState } from "react"
import { WhatsAppIcon } from "@/components/brand/icons"
import { contact, whatsappLink } from "@/data/site"

const RING = 2 * Math.PI * 25

/**
 * Ações flutuantes:
 * - desktop: “voltar ao topo” com anel de progresso + WhatsApp com anel pulsante;
 * - mobile: barra fixa com WhatsApp e Ligar (aparece após o hero).
 */
export function WhatsAppFloat() {
  const { scrollY, scrollYProgress } = useScroll()
  const [show, setShow] = useState(false)
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })
  const dash = useTransform(progress, (p) => RING * (1 - p))
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > window.innerHeight * 0.6))

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
    document.getElementById("inicio")?.focus({ preventScroll: true })
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Desktop / tablet */}
          <motion.div
            key="float"
            data-float
            className="fixed right-[max(20px,env(safe-area-inset-right))] bottom-[max(20px,env(safe-area-inset-bottom))] z-40 hidden flex-col items-center gap-3 md:flex"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <button
              type="button"
              onClick={toTop}
              aria-label="Voltar ao topo"
              className="group relative grid size-[54px] place-items-center rounded-full bg-sand-50 text-brand-800 shadow-[0_12px_28px_-10px_rgba(20,37,38,0.4)] transition-colors hover:bg-white"
            >
              <svg viewBox="0 0 54 54" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
                <circle cx="27" cy="27" r="25" className="fill-none stroke-line" strokeWidth="2" />
                <motion.circle
                  cx="27"
                  cy="27"
                  r="25"
                  className="fill-none stroke-caramel-500"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={RING}
                  style={{ strokeDashoffset: dash }}
                />
              </svg>
              <ArrowUp className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
            </button>
            <a
              href={whatsappLink("Olá! Gostaria de falar com a BAADV.")}
              target="_blank"
              rel="noopener"
              aria-label="Conversar com a BAADV pelo WhatsApp"
              className="relative grid size-[58px] place-items-center rounded-full bg-brand-700 text-white shadow-[0_12px_28px_-8px_rgba(20,37,38,0.55)] transition-colors hover:bg-brand-800"
            >
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-600" aria-hidden="true" />
              <WhatsAppIcon className="relative size-[26px]" />
            </a>
          </motion.div>

          {/* Mobile */}
          <motion.nav
            key="mbar"
            data-float
            aria-label="Ações rápidas"
            className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-white/10 bg-brand-950/95 px-3 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%", transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <a
              href={whatsappLink("Olá! Gostaria de agendar uma consulta com a BAADV.")}
              target="_blank"
              rel="noopener"
              className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-caramel-500 text-sm font-semibold text-brand-950 active:scale-[0.98]"
            >
              <WhatsAppIcon className="size-[18px]" /> Agendar consulta
            </a>
            <a
              href={contact.phoneHref}
              className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 text-sm font-semibold text-sand-100 active:scale-[0.98]"
            >
              <Phone className="size-[18px]" strokeWidth={1.8} /> Ligar
            </a>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
