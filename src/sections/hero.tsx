import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"
import { ArrowRight, Building2, Landmark, MapPin } from "lucide-react"
import { useRef } from "react"
import { GoldDust } from "@/components/brand/gold-dust"
import { useIntro } from "@/components/brand/intro"
import { Monogram } from "@/components/brand/logo"
import { OrbitLines } from "@/components/brand/orbit-lines"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/ui/magnetic"
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal"
import { whatsappLink } from "@/data/site"
import { asset } from "@/lib/utils"

const ease = [0.22, 1, 0.36, 1] as const

const facts = [
  { icon: Building2, text: "Empresas de pequeno porte a grupos empresariais" },
  { icon: MapPin, text: "Atendimento presencial e remoto em todo o Brasil" },
  { icon: Landmark, text: "Holdings e planejamento patrimonial" },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { mounted, delay: D } = useIntro()

  // Rolagem: texto sobe e esmaece, foto desce, fundo se aproxima
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const visualImgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  // Cursor: inclinação da foto + brilho que segue o mouse no fundo
  const gx = useMotionValue(70)
  const gy = useMotionValue(30)
  const glowX = useSpring(gx, { stiffness: 60, damping: 20 })
  const glowY = useSpring(gy, { stiffness: 60, damping: 20 })
  const glow = useMotionTemplate`radial-gradient(700px 500px at ${glowX}% ${glowY}%, rgba(83,123,127,.45), transparent 60%)`

  const onSectionMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== "mouse") return
    const r = e.currentTarget.getBoundingClientRect()
    gx.set(((e.clientX - r.left) / r.width) * 100)
    gy.set(((e.clientY - r.top) / r.height) * 100)
  }

  return (
    <section
      id="inicio"
      ref={ref}
      tabIndex={-1}
      aria-labelledby="hero-title"
      onPointerMove={onSectionMove}
      className="relative isolate flex min-h-[min(100svh,980px)] flex-col justify-center overflow-hidden bg-brand-900 pt-32 pb-10 text-sand-100"
    >
      <motion.div aria-hidden="true" className="absolute inset-0 -z-20" style={reduced ? undefined : { scale: bgScale }}>
        <div className="absolute inset-0 bg-[radial-gradient(800px_500px_at_0%_100%,rgba(177,151,129,.14),transparent_60%)]" />
        <motion.div className="absolute inset-0" style={{ backgroundImage: glow }} />
      </motion.div>
      <GoldDust className="-z-10" />
      <OrbitLines />

      {mounted && (
        <>
          <div className="container-site grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <motion.div style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}>
              <motion.p
                className="eyebrow eyebrow-light"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: D, ease }}
              >
                Advocacia Empresarial · São Paulo
              </motion.p>

              <VerticalCutReveal
                as="h1"
                id="hero-title"
                delay={D + 0.15}
                stagger={0.055}
                className="max-w-[19ch] text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[1.04] tracking-[-0.015em] text-white"
                segments={[
                  { text: "Advocacia empresarial estratégica para " },
                  { text: "proteger e potencializar", className: "font-medium italic text-caramel-400" },
                  { text: " o seu negócio." },
                ]}
              />

              <motion.p
                className="mt-7 max-w-[52ch] text-[clamp(1.05rem,1.4vw,1.2rem)] text-sand-100/75"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: D + 0.75, ease }}
              >
                Atuamos ao lado de empresários para reduzir riscos jurídicos, proteger patrimônios e apoiar decisões
                estratégicas com segurança e agilidade.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: D + 0.9, ease }}
              >
                <Magnetic className="w-full sm:w-auto">
                  <Button asChild variant="accent" className="w-full sm:w-auto">
                    <a href={whatsappLink("Olá! Gostaria de agendar uma consulta com a BAADV.")} target="_blank" rel="noopener">
                      Agendar consulta
                      <ArrowRight data-icon="arrow" />
                    </a>
                  </Button>
                </Magnetic>
                <Button asChild variant="ghost-light" className="w-full sm:w-auto">
                  <a href="#atuacao">Conheça as áreas de atuação</a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Foto institucional: retângulo limpo com moldura fina deslocada */}
            <motion.figure
              style={reduced ? undefined : { y: visualY }}
              className="relative mx-auto w-[min(88%,440px)] lg:mr-6 lg:w-full lg:max-w-[460px]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: D + 0.2, ease }}
            >
              <div aria-hidden="true" className="absolute -top-4 -right-4 h-full w-full rounded-lg border border-caramel-400/50" />
              <motion.div
                className="relative aspect-[4/5] overflow-hidden rounded-lg bg-brand-800 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                transition={{ duration: 1.2, delay: D + 0.3, ease }}
              >
                <motion.picture className="block size-full" style={reduced ? undefined : { scale: visualImgScale }}>
                  <source
                    type="image/webp"
                    srcSet={`${asset("/img/hero-office-900.webp")} 900w, ${asset("/img/hero-office.webp")} 1920w`}
                    sizes="(min-width: 1024px) 460px, 88vw"
                  />
                  <img
                    src={asset("/img/hero-office.jpg")}
                    alt="Escritório da BAADV Advocacia Empresarial, com o logo na parede"
                    width={1920}
                    height={1085}
                    fetchPriority="high"
                    className="size-full object-cover object-[27%_50%] [filter:saturate(0.75)_contrast(1.05)]"
                  />
                </motion.picture>
                <div aria-hidden="true" className="absolute inset-0 bg-brand-700/20 mix-blend-color" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950/75 via-transparent to-transparent" />
              </motion.div>

              <motion.figcaption
                className="absolute inset-x-0 bottom-0 flex items-center gap-4 p-5 sm:p-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: D + 1.1, ease }}
              >
                <Monogram className="h-10 w-9 shrink-0 text-caramel-400" />
                <span className="text-[0.85rem] leading-snug text-sand-100/80">
                  <strong className="block font-display text-lg font-semibold text-white">BAADV Advocacia Empresarial</strong>
                  Av. das Nações Unidas · Santo Amaro, São Paulo
                </span>
              </motion.figcaption>
            </motion.figure>
          </div>

          <div className="container-site">
            <motion.ul
              className="mt-[clamp(48px,7vw,80px)] grid gap-4 border-t border-white/12 pt-7 text-[0.9rem] text-sand-100/75 md:grid-cols-3 md:gap-8"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: D + 1.1 } } }}
            >
              {facts.map(({ icon: Icon, text }) => (
                <motion.li
                  key={text}
                  className="flex items-center gap-3"
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
                >
                  <Icon className="size-5 shrink-0 text-caramel-400" strokeWidth={1.6} aria-hidden="true" />
                  {text}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </>
      )}
    </section>
  )
}
