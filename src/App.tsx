import { MotionConfig } from "motion/react"
import { IntroProvider } from "@/components/brand/intro"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { useLenis } from "@/hooks/use-lenis"
import { About } from "@/sections/about"
import { Areas } from "@/sections/areas"
import { AreasMarquee } from "@/sections/areas-marquee"
import { Business } from "@/sections/business"
import { Contact } from "@/sections/contact"
import { Content } from "@/sections/content"
import { Faq } from "@/sections/faq"
import { Footer } from "@/sections/footer"
import { Header } from "@/sections/header"
import { Hero } from "@/sections/hero"
import { Statement } from "@/sections/statement"
import { StatementBand } from "@/sections/statement-band"
import { WhatsAppFloat } from "@/sections/whatsapp-float"

export default function App() {
  useLenis()

  return (
    <MotionConfig reducedMotion="user">
      <IntroProvider>
      <a
        href="#conteudo"
        className="fixed top-3 left-3 z-[100] -translate-y-[160%] rounded-md bg-brand-900 px-4 py-2.5 text-white transition-transform focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <ScrollProgress />
      <Header />
      <main id="conteudo">
        <Hero />
        <AreasMarquee />
        <Statement />
        <About />
        <StatementBand />
        <Areas />
        <Business />
        <Content />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      </IntroProvider>
    </MotionConfig>
  )
}
