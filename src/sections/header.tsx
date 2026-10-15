import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { LogoLockup } from "@/components/brand/logo"
import { WhatsAppIcon } from "@/components/brand/icons"
import { Button } from "@/components/ui/button"
import { contact, nav, whatsappLink } from "@/data/site"
import { cn } from "@/lib/utils"

const CONSULT = whatsappLink("Olá! Gostaria de agendar uma consulta com a BAADV.")

/**
 * Cabeçalho fixo: transparente sobre o hero, sólido depois; some ao rolar
 * para baixo e volta ao rolar para cima (padrão “Scroll Direction: Hide
 * Header” do 21st.dev). Indica a seção ativa.
 */
export function Header() {
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>("")
  const [hovered, setHovered] = useState<string | null>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > 24)
    setHidden(y > 640 && y > prev && !open)
  })

  // Seção ativa
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    )
    nav.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  // Menu móvel: trava a rolagem, isola o fundo, fecha com Esc
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    document.querySelectorAll<HTMLElement>("main, footer, [data-float]").forEach((el) => (el.inert = open))
    if (open) requestAnimationFrame(() => firstLinkRef.current?.focus())
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  const light = !solid || open

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,height] duration-300",
        open ? "bg-brand-950" : solid ? "bg-sand-50/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl backdrop-saturate-150" : "bg-transparent"
      )}
    >
      <div className={cn("container-site flex items-center justify-between gap-6 transition-[height] duration-300", solid ? "h-[68px]" : "h-20")}>
        <a href="#inicio" aria-label="BAADV Advocacia Empresarial — início" className="min-h-11">
          <LogoLockup tone={light ? "light" : "dark"} />
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          {/* Pílula que desliza até o link sob o mouse (ou o da seção ativa) */}
          <ul className="flex items-center gap-1" onPointerLeave={() => setHovered(null)}>
            {nav.map((item) => {
              const isActive = active === item.id
              const pill = (hovered ?? active) === item.id
              return (
                <li key={item.id} className="relative">
                  {pill && (
                    <motion.span
                      layoutId="nav-pill"
                      className={cn("absolute inset-x-0 inset-y-1.5 -z-10 rounded-full", light ? "bg-white/10" : "bg-brand-700/8")}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    onPointerEnter={() => setHovered(item.id)}
                    onFocus={() => setHovered(item.id)}
                    onBlur={() => setHovered(null)}
                    className={cn(
                      "relative inline-flex min-h-11 items-center px-4 text-[0.9rem] font-medium transition-colors",
                      light ? "text-sand-100/80 hover:text-white" : "text-ink/75 hover:text-ink",
                      isActive && (light ? "text-white" : "text-ink")
                    )}
                  >
                    {item.label}
                    {isActive && <span className="absolute bottom-2 left-1/2 size-1 -translate-x-1/2 rounded-full bg-caramel-500" />}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="accent" size="sm" className="hidden lg:inline-flex">
            <a href={CONSULT} target="_blank" rel="noopener">
              Agendar consulta
            </a>
          </Button>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movel"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className={cn("grid size-12 place-items-center rounded-full lg:hidden", light ? "text-sand-100" : "text-ink")}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-movel"
            aria-label="Menu"
            initial={{ clipPath: "circle(0px at calc(100% - 2.75rem) -1.75rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.75rem) -1.75rem)" }}
            exit={{ clipPath: "circle(0px at calc(100% - 2.75rem) -1.75rem)", transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-x-0 top-20 bottom-0 flex flex-col justify-between overflow-y-auto bg-brand-950 px-5 pt-6 pb-8 text-sand-100 sm:px-8 lg:hidden"
          >
            <ul>
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block border-b border-white/10 py-4 font-display text-3xl font-medium",
                      active === item.id && "text-caramel-400"
                    )}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 grid gap-4 text-center text-sm text-sand-100/70">
              <Button asChild variant="accent" className="w-full">
                <a href={CONSULT} target="_blank" rel="noopener">
                  <WhatsAppIcon /> Agendar consulta
                </a>
              </Button>
              <p>
                {contact.phone} · {contact.email}
              </p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
