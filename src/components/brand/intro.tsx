import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { Monogram, Wordmark } from "@/components/brand/logo"

const KEY = "baadv-intro"
const ease = [0.76, 0, 0.24, 1] as const

type Intro = { mounted: boolean; delay: number }
const IntroContext = createContext<Intro>({ mounted: true, delay: 0 })

/** Atraso extra (s) para as animações de entrada do hero esperarem a cortina. */
export const useIntro = () => useContext(IntroContext)

function shouldPlay() {
  try {
    if (sessionStorage.getItem(KEY)) return false
    return true
  } catch {
    return false
  }
}

/**
 * Tela de carregamento (uma vez por sessão): o monograma é revelado de baixo
 * para cima e acende, “BAADV” sobe, a barra enche e a cortina sobe revelando
 * o site. Com “reduzir movimento”, sai com fade em vez da cortina.
 */
export function IntroProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [play] = useState(shouldPlay)
  const [mounted, setMounted] = useState(!play)
  const [cover, setCover] = useState(play)

  useEffect(() => {
    if (!play) return
    document.documentElement.style.overflow = "hidden"
    const t1 = window.setTimeout(() => setMounted(true), 1900)
    const t2 = window.setTimeout(() => {
      setCover(false)
      document.documentElement.style.overflow = ""
      try {
        sessionStorage.setItem(KEY, "1")
      } catch {
        /* armazenamento indisponível: a abertura volta na próxima visita */
      }
    }, 1900)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      document.documentElement.style.overflow = ""
    }
  }, [play])

  return (
    <IntroContext.Provider value={{ mounted, delay: play ? 0.15 : 0 }}>
      {children}
      <AnimatePresence>
        {cover && (
          <motion.div
            key="intro"
            role="status"
            aria-label="Carregando BAADV Advocacia Empresarial"
            className="fixed inset-0 z-[200] grid place-items-center bg-brand-950 text-sand-100"
            exit={reduced ? { opacity: 0, transition: { duration: 0.6 } } : { y: "-110%", transition: { duration: 1, ease } }}
          >
            <div className="grid justify-items-center gap-[1.1rem]">
              <Monogram className="intro-logo h-[clamp(84px,13vw,120px)] w-[clamp(79px,12vw,112px)] text-caramel-500" />
              <div className="intro-name overflow-visible">
                <Wordmark className="h-7 w-[108px] text-sand-100" />
              </div>
              <span className="h-0.5 w-[120px] overflow-hidden rounded-full bg-white/15">
                <i className="intro-bar block h-full origin-left bg-caramel-500" />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </IntroContext.Provider>
  )
}
