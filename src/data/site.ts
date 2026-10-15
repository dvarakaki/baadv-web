import {
  Briefcase,
  Building2,
  FileText,
  Landmark,
  Percent,
  Scale,
  ShieldCheck,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react"
import { asset } from "@/lib/utils"

export const contact = {
  phone: "(11) 5681-8704",
  phoneHref: "tel:+551156818704",
  whatsapp: "(11) 94778-2817",
  whatsappNumber: "5511947782817",
  email: "contato@baadv.adv.br",
  instagram: "https://www.instagram.com/advocacia_baa/",
  instagramHandle: "@advocacia_baa",
  blog: "https://baadv.adv.br/blog",
  addressLine1: "Av. das Nações Unidas, 18801 – Sala 601",
  addressLine2: "Santo Amaro, São Paulo – SP · CEP 04795-100",
  hours: ["Segunda a sexta: 8h às 18h", "Sábado: 9h às 13h"],
  mapEmbed:
    "https://www.google.com/maps?q=Av.+das+Na%C3%A7%C3%B5es+Unidas,+18801,+Santo+Amaro,+S%C3%A3o+Paulo+-+SP&output=embed",
}

export const whatsappLink = (message: string) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`

export const nav = [
  { id: "sobre", label: "Sobre" },
  { id: "atuacao", label: "Atuação" },
  { id: "empresas", label: "Para Empresas" },
  { id: "conteudos", label: "Conteúdos" },
  { id: "faq", label: "Dúvidas" },
  { id: "contato", label: "Contato" },
] as const

export const pillars: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ShieldCheck,
    title: "Atuação preventiva e estratégica",
    text: "Reduzimos riscos jurídicos antes que se tornem problemas, protegendo o seu negócio de forma proativa.",
  },
  {
    icon: Target,
    title: "Foco em resultados para empresas",
    text: "Soluções personalizadas, adaptadas à realidade e aos objetivos específicos de cada empresa.",
  },
  {
    icon: Users,
    title: "Atendimento próximo e ágil",
    text: "Um time dedicado que entende o seu negócio e responde quando você precisa.",
  },
  {
    icon: Landmark,
    title: "Proteção patrimonial",
    text: "Estruturamos a proteção do patrimônio pessoal e empresarial com planejamento sucessório inteligente.",
  },
]

export type Area = {
  id: string
  short: string
  title: string
  icon: LucideIcon
  text: string
  challenge: string
  capabilities: string[]
}

export const areas: Area[] = [
  {
    id: "societario",
    short: "Societário",
    title: "Direito Empresarial e Societário",
    icon: Building2,
    text: "Estruturação, reorganização e governança societária para proteger sócios e garantir segurança nas decisões estratégicas da empresa.",
    challenge:
      "Conflitos entre sócios, falta de clareza nos acordos e estrutura societária vulnerável comprometem o crescimento.",
    capabilities: ["Contratos sociais", "Acordos de sócios", "Reorganizações", "Governança corporativa"],
  },
  {
    id: "contratos",
    short: "Contratos",
    title: "Contratos Empresariais",
    icon: FileText,
    text: "Elaboração, revisão e negociação de contratos comerciais que protegem sua empresa e evitam disputas futuras.",
    challenge:
      "Contratos mal redigidos geram litígios caros e colocam em risco o patrimônio e a operação da empresa.",
    capabilities: ["Elaboração", "Revisão", "Negociação", "Gestão de riscos contratuais"],
  },
  {
    id: "tributario",
    short: "Tributário",
    title: "Direito Tributário e Planejamento Fiscal",
    icon: Percent,
    text: "Estratégias legais para reduzir a carga tributária e reorganizar a estrutura fiscal da empresa de forma eficiente.",
    challenge:
      "Empresas pagam mais impostos do que deveriam por falta de planejamento tributário adequado.",
    capabilities: ["Planejamento tributário", "Enquadramento fiscal", "Revisão de tributos", "Defesa em autuações"],
  },
  {
    id: "trabalhista",
    short: "Trabalhista",
    title: "Direito Trabalhista Empresarial",
    icon: Briefcase,
    text: "Apoio preventivo e contencioso para minimizar riscos trabalhistas, desde a contratação até o desligamento de colaboradores.",
    challenge:
      "Processos trabalhistas consomem tempo, recursos e comprometem a reputação da empresa.",
    capabilities: ["Políticas internas", "Compliance trabalhista", "Otimização de custos", "Defesa em reclamações"],
  },
  {
    id: "patrimonial",
    short: "Patrimonial",
    title: "Proteção Patrimonial e Planejamento Sucessório",
    icon: Landmark,
    text: "Estruturação de holdings familiares e patrimoniais para proteger bens e planejar a sucessão de forma estratégica.",
    challenge:
      "Patrimônio pessoal exposto a riscos empresariais e falta de planejamento para a sucessão familiar.",
    capabilities: ["Holdings familiares", "Holdings patrimoniais", "Planejamento sucessório", "Integralização de imóveis"],
  },
  {
    id: "contencioso",
    short: "Contencioso",
    title: "Contencioso Estratégico",
    icon: Scale,
    text: "Defesa empresarial em ações judiciais e administrativas, com foco em resultados e na proteção do negócio.",
    challenge:
      "Litígios mal conduzidos geram prejuízos financeiros e podem comprometer a continuidade da empresa.",
    capabilities: ["Ações judiciais", "Processos administrativos", "Negociação", "Solução de conflitos"],
  },
]

export const support = [
  "Consultoria jurídica contínua para decisões estratégicas do dia a dia",
  "Revisão preventiva de contratos e documentos societários",
  "Apoio na estruturação e reorganização societária",
  "Planejamento tributário e fiscal personalizado",
  "Gestão de passivos trabalhistas e compliance empresarial",
  "Acompanhamento em fusões, aquisições e reestruturações",
]

export const steps = [
  {
    title: "Diagnóstico inicial",
    text: "Analisamos a situação jurídica atual da sua empresa e identificamos riscos e oportunidades.",
    points: ["Entendimento do negócio e dos objetivos", "Mapeamento de riscos jurídicos", "Identificação de oportunidades"],
  },
  {
    title: "Proposta personalizada",
    text: "Elaboramos um plano de atuação específico para as necessidades do seu negócio.",
    points: ["Plano de atuação sob medida", "Prioridades definidas com a gestão", "Escopo claro de cada frente"],
  },
  {
    title: "Implementação e acompanhamento",
    text: "Executamos as estratégias definidas e acompanhamos continuamente a sua empresa.",
    points: ["Execução das estratégias", "Acompanhamento contínuo", "Apoio nas decisões do dia a dia"],
  },
]

export const posts = [
  { src: asset("/img/insta/p02.webp"), w: 512, h: 640, tag: "Trabalhista", alt: "Publicação: 7 formas legais de otimizar custos trabalhistas" },
  { src: asset("/img/insta/p11.webp"), w: 510, h: 640, tag: "Tributário", alt: "Publicação: LC 236/2026 — decadência e prescrição, 6 novas causas de interrupção" },
  { src: asset("/img/insta/p04.webp"), w: 360, h: 640, tag: "Patrimonial", alt: "Publicação: Vai colocar um imóvel na empresa? Não pague o ITBI antes de ver isso" },
  { src: asset("/img/insta/p06.webp"), w: 360, h: 640, tag: "Contratos", alt: "Publicação: Quando o cliente diz “Fechado, vamos assinar!” o planejamento vira contrato" },
  { src: asset("/img/insta/p09.webp"), w: 360, h: 640, tag: "Compliance", alt: "Publicação: A importância das políticas internas" },
  { src: asset("/img/insta/p07.webp"), w: 512, h: 640, tag: "Trabalhista", alt: "Publicação: 18 soluções trabalhistas para empresas — prevenção, conformidade e gestão de riscos" },
]

export const faq = [
  {
    q: "O que faz uma advocacia empresarial?",
    a: "A advocacia empresarial cuida das questões jurídicas do negócio, da prevenção à defesa: estrutura societária, contratos, tributos, relações trabalhistas, proteção do patrimônio e disputas judiciais. O foco é dar segurança para a empresa crescer sem sustos jurídicos.",
  },
  {
    q: "A BAADV atende empresas de qual porte e em quais regiões?",
    a: "A BAADV atende de pequenas e médias empresas a grupos empresariais. O escritório fica em São Paulo, na Av. das Nações Unidas, e atende clientes de todo o Brasil, de forma presencial e remota.",
  },
  {
    q: "Como funciona o primeiro atendimento?",
    a: "No primeiro contato entendemos a situação da empresa e o objetivo. A partir daí, indicamos os caminhos jurídicos possíveis e como podemos atuar. Você pode iniciar pelo WhatsApp ou pelo formulário de contato do site.",
  },
  {
    q: "Qual a diferença entre atuação preventiva e contenciosa?",
    a: "A atuação preventiva organiza contratos, estrutura e rotinas para evitar problemas antes que aconteçam. A contenciosa é a defesa da empresa quando o conflito já existe, em ações judiciais ou administrativas. A BAADV atua nas duas frentes.",
  },
  {
    q: "A BAADV oferece assessoria jurídica recorrente?",
    a: "Sim. Além de projetos pontuais, a BAADV oferece acompanhamento jurídico recorrente, funcionando como o departamento jurídico da empresa para apoiar as decisões do dia a dia.",
  },
]
